import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SchedulerService } from '../scheduler/scheduler.service';
import { CreateTaskDto } from '../scheduler/dto/create-task.dto';
import { TaskStatus } from '@prisma/client';

@ApiTags('scheduler')
@Controller('scheduler')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class SchedulerGatewayController {
  constructor(private readonly schedulerService: SchedulerService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new scheduled task' })
  @ApiResponse({ status: 201, description: 'The task has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async create(@Body() createTaskDto: CreateTaskDto) {
    return this.schedulerService.createScheduledTask({
      type: createTaskDto.type,
      data: createTaskDto.payload,
      scheduledAt: createTaskDto.scheduledTime
    });
  }

  @Get()
  @ApiOperation({ summary: 'Get all scheduled tasks' })
  @ApiResponse({ status: 200, description: 'Return all scheduled tasks.' })
  async findAll() {
    return this.schedulerService.listScheduledTasks({});
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a scheduled task by id' })
  @ApiResponse({ status: 200, description: 'Return the scheduled task.' })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  async findOne(@Param('id') id: string) {
    return this.schedulerService.getScheduledTask(id);
  }

  @Post(':id/cancel')
  @ApiOperation({ summary: 'Cancel a scheduled task' })
  @ApiResponse({ status: 200, description: 'The task has been successfully cancelled.' })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  async cancel(@Param('id') id: string) {
    return this.schedulerService.updateScheduledTask(id, { status: TaskStatus.FAILED });
  }
} 