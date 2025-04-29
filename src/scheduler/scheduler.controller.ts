import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { SchedulerService } from './scheduler.service';
import { 
  CreateScheduledTaskRequest, 
  UpdateScheduledTaskRequest, 
  GetScheduledTaskRequest, 
  ListScheduledTasksRequest 
} from '../proto/generated/scheduler.pb';


@Controller()
export class SchedulerController {
  constructor(private readonly schedulerService: SchedulerService) {}

  @GrpcMethod('SchedulerService', 'CreateScheduledTask')
  async createScheduledTask(data: CreateScheduledTaskRequest) {
    return this.schedulerService.createScheduledTask({
      name: data.name,
      type: data.type,
      schedule: data.schedule,
      data: data.data,
      enabled: data.enabled,
    });
  }

  @GrpcMethod('SchedulerService', 'UpdateScheduledTask')
  async updateScheduledTask(data: UpdateScheduledTaskRequest) {
    return this.schedulerService.updateScheduledTask(data.taskId, {
      name: data.name,
      schedule: data.schedule,
      data: data.data,
      enabled: data.enabled,
    });
  }

  @GrpcMethod('SchedulerService', 'GetScheduledTask')
  async getScheduledTask(data: GetScheduledTaskRequest) {
    return this.schedulerService.getScheduledTask(data.taskId);
  }

  @GrpcMethod('SchedulerService', 'ListScheduledTasks')
  async listScheduledTasks(data: ListScheduledTasksRequest) {
    return this.schedulerService.listScheduledTasks({
      type: data.type,
      enabled: data.enabled,
      page: data.page,
      limit: data.limit,
    });
  }
}