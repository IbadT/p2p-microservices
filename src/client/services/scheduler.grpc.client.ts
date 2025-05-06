import { Injectable, Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { BaseGrpcClient } from '../base/base.grpc.client';
import { SCHEDULER_SERVICE } from '../constants';
import { CreateScheduledTaskDto } from '../interfaces/client.swagger';

@Injectable()
export class SchedulerGrpcClient extends BaseGrpcClient {
  constructor(
    @Inject(SCHEDULER_SERVICE) client: ClientGrpc,
  ) {
    super(client, 'SchedulerService');
  }

  /**
   * Создает новую задачу
   * @param dto - Данные для создания задачи
   * @returns {Promise<ScheduledTask>} Созданная задача
   */
  async createTask(dto: CreateScheduledTaskDto) {
    const service = this.getService<any>('SchedulerService');
    return this.callGrpcMethod(service.createTask, dto);
  }

  /**
   * Получает задачу по ID
   * @param taskId - ID задачи
   * @returns {Promise<ScheduledTask>} Задача
   */
  async getTask(taskId: string) {
    const service = this.getService<any>('SchedulerService');
    return this.callGrpcMethod(service.getTask, { taskId });
  }

  /**
   * Получает список задач
   * @returns {Promise<ScheduledTask[]>} Список задач
   */
  async getTasks() {
    const service = this.getService<any>('SchedulerService');
    return this.callGrpcMethod(service.getTasks, {});
  }

  /**
   * Обновляет задачу
   * @param taskId - ID задачи
   * @param dto - Данные для обновления
   * @returns {Promise<ScheduledTask>} Обновленная задача
   */
  async updateTask(taskId: string, dto: Partial<CreateScheduledTaskDto>) {
    const service = this.getService<any>('SchedulerService');
    return this.callGrpcMethod(service.updateTask, { taskId, ...dto });
  }

  /**
   * Удаляет задачу
   * @param taskId - ID задачи
   * @returns {Promise<void>}
   */
  async deleteTask(taskId: string) {
    const service = this.getService<any>('SchedulerService');
    return this.callGrpcMethod(service.deleteTask, { taskId });
  }

  /**
   * Включает/выключает задачу
   * @param taskId - ID задачи
   * @param enabled - Включена ли задача
   * @returns {Promise<ScheduledTask>} Обновленная задача
   */
  async toggleTask(taskId: string, enabled: boolean) {
    const service = this.getService<any>('SchedulerService');
    return this.callGrpcMethod(service.toggleTask, { taskId, enabled });
  }
} 