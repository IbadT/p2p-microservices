import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/prisma.service';
import { KafkaService } from '../shared/kafka.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class SchedulerService {
  constructor(
    private prisma: PrismaService,
    private kafka: KafkaService,
  ) {}

  async createScheduledTask(data: {
    name: string;
    type: string;
    schedule: string;
    data: string;
    enabled: boolean;
  }) {
    const task = await this.prisma.scheduledTask.create({
      data,
    });

    await this.kafka.emit('scheduler.task.created', {
      taskId: task.id,
      name: task.name,
      type: task.type,
      schedule: task.schedule,
    });

    return task;
  }

  async updateScheduledTask(taskId: string, data: {
    name?: string;
    schedule?: string;
    data?: string;
    enabled?: boolean;
  }) {
    const task = await this.prisma.scheduledTask.update({
      where: { id: taskId },
      data,
    });

    await this.kafka.emit('scheduler.task.updated', {
      taskId: task.id,
      name: task.name,
      schedule: task.schedule,
      enabled: task.enabled,
    });

    return task;
  }

  async getScheduledTask(taskId: string) {
    return this.prisma.scheduledTask.findUnique({
      where: { id: taskId },
    });
  }

  async listScheduledTasks(filters: {
    type?: string;
    enabled?: boolean;
    page?: number;
    limit?: number;
  }) {
    const { type, enabled, page = 1, limit = 10 } = filters;

    const where = {
      ...(type && { type }),
      ...(enabled !== undefined && { enabled }),
    };

    const [total, tasks] = await Promise.all([
      this.prisma.scheduledTask.count({ where }),
      this.prisma.scheduledTask.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return {
      tasks,
      total,
      page,
      limit,
    };
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async handleScheduledTasks() {
    const tasks = await this.prisma.scheduledTask.findMany({
      where: {
        enabled: true,
        nextRunAt: {
          lte: new Date(),
        },
      },
    });

    for (const task of tasks) {
      try {
        await this.kafka.emit('scheduler.task.executed', {
          taskId: task.id,
          name: task.name,
          type: task.type,
          data: task.data,
        });

        // Update next run time based on schedule
        const nextRunAt = this.calculateNextRunTime(task.schedule);
        await this.prisma.scheduledTask.update({
          where: { id: task.id },
          data: {
            lastRunAt: new Date(),
            nextRunAt,
          },
        });
      } catch (error) {
        await this.kafka.emit('scheduler.task.failed', {
          taskId: task.id,
          name: task.name,
          error: error.message,
        });
      }
    }
  }

  private calculateNextRunTime(schedule: string): Date {
    // Implement schedule parsing logic here
    // For now, just return a date 1 hour from now
    return new Date(Date.now() + 60 * 60 * 1000);
  }
}
