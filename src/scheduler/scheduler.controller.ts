import { Controller, Post, Get, Body, Param, Query } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { TaskStatus } from '@prisma/client';

@Controller('scheduler')
export class SchedulerController {
  constructor(private readonly schedulerService: SchedulerService) {}

  @Post('tasks')
  async createTask(@Body() data: {
    type: string;
    data: any;
    scheduledAt: Date;
  }) {
    return this.schedulerService.createScheduledTask(data);
  }

  @Post('tasks/:id')
  async updateTask(
    @Param('id') id: string,
    @Body() data: {
      status?: TaskStatus;
      data?: any;
      scheduledAt?: Date;
      executedAt?: Date;
    }
  ) {
    return this.schedulerService.updateScheduledTask(id, data);
  }

  @Get('tasks')
  async listTasks(@Query() data: {
    type?: string;
    status?: TaskStatus;
    page?: number;
    limit?: number;
  }) {
    return this.schedulerService.listScheduledTasks(data);
  }

  @Get('tasks/:id')
  async getTask(@Param('id') id: string) {
    return this.schedulerService.getScheduledTask(id);
  }
}