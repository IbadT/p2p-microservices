import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SchedulerService } from '../scheduler/scheduler.service';
import { CreateTaskDto } from '../scheduler/dto/create-task.dto';
import { TaskStatus } from '@prisma/client';
import {
  ApiCreateScheduledTask,
  ApiGetAllScheduledTasks,
  ApiGetScheduledTaskById,
  ApiCancelScheduledTask
} from './swagger/client.swagger';

@ApiTags('scheduler')
@Controller('scheduler')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class SchedulerGatewayController {
  constructor(private readonly schedulerService: SchedulerService) {}

  @Post()
  @ApiCreateScheduledTask()
  async create(@Body() createTaskDto: CreateTaskDto) {
    return this.schedulerService.createScheduledTask({
      type: createTaskDto.type,
      data: createTaskDto.payload,
      scheduledAt: createTaskDto.scheduledTime
    });
  }

  @Get()
  @ApiGetAllScheduledTasks()
  async findAll() {
    return this.schedulerService.listScheduledTasks({});
  }

  @Get(':id')
  @ApiGetScheduledTaskById()
  async findOne(@Param('id') id: string) {
    return this.schedulerService.getScheduledTask(id);
  }

  @Post(':id/cancel')
  @ApiCancelScheduledTask()
  async cancel(@Param('id') id: string) {
    return this.schedulerService.updateScheduledTask(id, { status: TaskStatus.FAILED });
  }
} 