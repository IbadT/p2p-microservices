import { Injectable, Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { BaseGrpcClient } from '../base/base.grpc.client';
import { AUDIT_SERVICE } from '../constants';
import { CreateAuditLogDto } from '../interfaces/client.swagger';

@Injectable()
export class AuditGrpcClient extends BaseGrpcClient {
  constructor(
    @Inject(AUDIT_SERVICE) client: ClientGrpc,
  ) {
    super(client, 'AuditService');
  }

  /**
   * Создает запись аудита
   * @param dto - Данные для создания записи
   * @returns {Promise<AuditLog>} Созданная запись
   */
  async createAuditLog(dto: CreateAuditLogDto) {
    const service = this.getService<any>('AuditService');
    return this.callGrpcMethod(service.createAuditLog, dto);
  }

  /**
   * Получает записи аудита пользователя
   * @param userId - ID пользователя
   * @returns {Promise<AuditLog[]>} Список записей
   */
  async getUserAuditLogs(userId: string) {
    const service = this.getService<any>('AuditService');
    return this.callGrpcMethod(service.getUserAuditLogs, { userId });
  }

  /**
   * Получает записи аудита сущности
   * @param entityType - Тип сущности
   * @param entityId - ID сущности
   * @returns {Promise<AuditLog[]>} Список записей
   */
  async getEntityAuditLogs(entityType: string, entityId: string) {
    const service = this.getService<any>('AuditService');
    return this.callGrpcMethod(service.getEntityAuditLogs, { entityType, entityId });
  }

  /**
   * Получает записи аудита по действию
   * @param action - Действие
   * @returns {Promise<AuditLog[]>} Список записей
   */
  async getActionAuditLogs(action: string) {
    const service = this.getService<any>('AuditService');
    return this.callGrpcMethod(service.getActionAuditLogs, { action });
  }
} 