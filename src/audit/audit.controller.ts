import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AuditService } from './audit.service';
import { CreateAuditLogRequest, GetAuditLogsRequest } from '../proto/generated/audit.pb';
import { Logger } from '@nestjs/common';
import { GrpcError } from '../client/interfaces/grpc.interfaces';
import { AuditLog } from './interfaces/audit.interface';

@Controller()
export class AuditController {
  private readonly logger = new Logger(AuditController.name);

  constructor(private readonly auditService: AuditService) {}

  @GrpcMethod('AuditService', 'CreateAuditLog')
  async createAuditLog(data: CreateAuditLogRequest): Promise<AuditLog> {
    try {
      const auditLog = await this.auditService.createAuditLog({
        userId: data.userId,
        action: data.action,
        entityType: data.entityType,
        entityId: data.entityId,
        details: data.details,
        ipAddress: data.ipAddress,
      });
      return auditLog as unknown as AuditLog;
    } catch (error) {
      this.logger.error(`Failed to create audit log: ${error.message}`, error.stack);
      throw new GrpcError(error.message, 'INTERNAL');
    }
  }

  @GrpcMethod('AuditService', 'GetAuditLogs')
  async getAuditLogs(data: GetAuditLogsRequest): Promise<{ logs: AuditLog[] }> {
    try {
      const logs = await this.auditService.getAuditLogs({
        userId: data.userId,
        entityType: data.entityType,
        entityId: data.entityId,
        startDate: data.startDate,
        endDate: data.endDate,
        page: data.page,
        limit: data.limit,
      });
      return { logs: logs as unknown as AuditLog[] };
    } catch (error) {
      this.logger.error(`Failed to get audit logs: ${error.message}`, error.stack);
      throw new GrpcError(error.message, 'INTERNAL');
    }
  }
}