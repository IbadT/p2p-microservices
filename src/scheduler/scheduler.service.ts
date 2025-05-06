import { Injectable } from '@nestjs/common';
// import { PrismaService } from '../shared/prisma.service';
// import { KafkaService } from '../shared/kafka.service';
import { KafkaService } from 'src/kafka/kafka.service';
import { PrismaService } from 'src/prisma.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Prisma, ScheduledTask, TaskStatus } from '@prisma/client';

@Injectable()
export class SchedulerService {
  constructor(
    private prisma: PrismaService,
    private kafka: KafkaService,
  ) {}

  async createScheduledTask(data: {
    type: string;
    data: any;
    scheduledAt: Date;
  }) {
    return this.prisma.scheduledTask.create({
      data: {
        type: data.type,
        data: data.data,
        scheduledAt: data.scheduledAt,
        status: TaskStatus.PENDING,
      },
    });
  }

  async updateScheduledTask(id: string, data: {
    status?: TaskStatus;
    data?: any;
    scheduledAt?: Date;
    executedAt?: Date;
  }) {
    return this.prisma.scheduledTask.update({
      where: { id },
      data: {
        status: data.status,
        data: data.data,
        scheduledAt: data.scheduledAt,
        executedAt: data.executedAt,
      },
    });
  }

  async getScheduledTask(id: string) {
    return this.prisma.scheduledTask.findUnique({
      where: { id },
    });
  }

  async listScheduledTasks(filters: {
    type?: string;
    status?: TaskStatus;
    page?: number;
    limit?: number;
  }) {
    const { type, status, page = 1, limit = 10 } = filters;
    
    const where = {
      ...(type && { type }),
      ...(status && { status }),
    };

    const [total, tasks] = await Promise.all([
      this.prisma.scheduledTask.count({ where }),
      this.prisma.scheduledTask.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { scheduledAt: 'asc' },
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
        status: TaskStatus.PENDING,
        scheduledAt: {
          lte: new Date(),
        },
      },
    });

    for (const task of tasks) {
      try {
        await this.kafka.sendEvent({
          type: "exchanger.status.checked",
          payload: {
            taskId: task.id,
            type: task.type,
            data: task.data,
          }
        });

        await this.kafka.sendEvent({
          type: "exchanger.status.frozen",
          payload: {
            taskId: task.id,
            type: task.type,
            data: task.data,
          }
        });

        await this.prisma.scheduledTask.update({
          where: { id: task.id },
          data: {
            status: TaskStatus.COMPLETED,
            executedAt: new Date(),
          },
        });
      } catch (error) {
        await this.kafka.sendEvent({
          type: "scheduler.task.failed",
          payload: {
            taskId: task.id,
            error: error.message,
          }
        });
      }
    }
  }
}
