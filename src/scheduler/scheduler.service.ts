import { Injectable } from '@nestjs/common';
// import { PrismaService } from '../shared/prisma.service';
// import { KafkaService } from '../shared/kafka.service';
import { KafkaService } from 'src/kafka/kafka.service';
import { PrismaService } from 'src/prisma.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Prisma, ScheduledTask, TaskStatus } from '@prisma/client';
import { NotificationType } from 'src/client/interfaces/enums';
// import { NotificationType } from 'src/kafka/notification-type.enum';

export type ScheduledTaskData = Prisma.InputJsonValue;

export interface CreateScheduledTaskData {
  type: string;
  data: ScheduledTaskData;
  scheduledAt: Date;
}

export interface UpdateScheduledTaskData {
  status?: TaskStatus;
  data?: ScheduledTaskData;
  scheduledAt?: Date;
  executedAt?: Date;
}

export interface ListScheduledTasksFilters {
  type?: string;
  status?: TaskStatus;
  page?: number;
  limit?: number;
}

export interface ListScheduledTasksResult {
  tasks: ScheduledTask[];
  total: number;
  page: number;
  limit: number;
}

@Injectable()
export class SchedulerService {
  constructor(
    private prisma: PrismaService,
    private kafka: KafkaService,
  ) {}

  async createScheduledTask(data: CreateScheduledTaskData): Promise<ScheduledTask> {
    return this.prisma.scheduledTask.create({
      data: {
        type: data.type,
        data: data.data,
        scheduledAt: data.scheduledAt,
        status: TaskStatus.PENDING,
      },
    });
  }

  async updateScheduledTask(id: string, data: UpdateScheduledTaskData): Promise<ScheduledTask> {
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

  async getScheduledTask(id: string): Promise<ScheduledTask | null> {
    return this.prisma.scheduledTask.findUnique({
      where: { id },
    });
  }

  async listScheduledTasks(filters: ListScheduledTasksFilters): Promise<ListScheduledTasksResult> {
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

  @Cron(CronExpression.EVERY_HOUR)
  async checkExchangerStatus() {
    const inactiveThreshold = new Date(Date.now() - 24 * 60 * 60 * 1000); // 24 hours
    const inactiveExchangers = await this.prisma.user.findMany({
      where: {
        isExchangerActive: true,
        updatedAt: { lt: inactiveThreshold }
      },
      include: {
        exchangerStatus: true
      }
    });

    for (const exchanger of inactiveExchangers) {
      try {
        await this.kafka.sendEvent({
          type: NotificationType.EXCHANGER_STATUS_CHECKED,
          payload: {
            exchangerId: exchanger.id,
            status: exchanger.isExchangerActive
          }
        });

        await this.prisma.user.update({
          where: { id: exchanger.id },
          data: { isExchangerActive: false }
        });

        await this.kafka.sendEvent({
          type: NotificationType.EXCHANGER_STATUS_FROZEN,
          payload: {
            exchangerId: exchanger.id,
            reason: 'Inactive for too long'
          }
        });
      } catch (error) {
        await this.kafka.sendEvent({
          type: NotificationType.SCHEDULER_TASK_FAILED,
          payload: {
            taskId: exchanger.id,
            error: error instanceof Error ? error.message : 'Unknown error'
          }
        });
      }
    }
  }
}
