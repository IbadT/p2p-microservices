import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { SchedulerService } from './scheduler.service';
import { CreateScheduledTaskRequest, GetScheduledTaskRequest } from '../proto/generated/scheduler.pb';

@Controller()
export class SchedulerController {
  constructor(private readonly schedulerService: SchedulerService) {}

  @GrpcMethod('SchedulerService', 'CreateScheduledTask')
  async createTask(data: CreateScheduledTaskRequest) {
    return this.schedulerService.createScheduledTask({
      type: data.type,
      data: data.data,
      scheduledAt: new Date(data.schedule)
    });
  }

  @GrpcMethod('SchedulerService', 'GetScheduledTask')
  async getTask(data: GetScheduledTaskRequest) {
    return this.schedulerService.getScheduledTask(data.taskId);
  }
}