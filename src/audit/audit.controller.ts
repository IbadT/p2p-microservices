import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AuditService } from './audit.service';
import { CreateAuditLogRequest, GetAuditLogsRequest } from '../proto/generated/audit.pb';

@Controller()
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @GrpcMethod('AuditService', 'CreateAuditLog')
  async createAuditLog(data: CreateAuditLogRequest) {
    return this.auditService.createAuditLog({
      userId: data.userId,
      action: data.action,
      entityType: data.entityType,
      entityId: data.entityId,
      details: data.details,
      ipAddress: data.ipAddress,
    });
  }

  @GrpcMethod('AuditService', 'GetAuditLogs')
  async getAuditLogs(data: GetAuditLogsRequest) {
    return this.auditService.getAuditLogs({
      userId: data.userId,
      entityType: data.entityType,
      entityId: data.entityId,
      startDate: data.startDate,
      endDate: data.endDate,
      page: data.page,
      limit: data.limit,
    });
  }
}