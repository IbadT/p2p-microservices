import { Injectable } from '@nestjs/common';
// import { PrismaService } from '../shared/prisma.service';
// import { KafkaService } from '../shared/kafka.service';
import { KafkaService } from 'src/kafka/kafka.service';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuditService {
  constructor(
    private prisma: PrismaService,
    private kafka: KafkaService,
  ) {}

  async createAuditLog(data: {
    userId: string;
    action: string;
    entityType: string;
    entityId: string;
    details: string;
    ipAddress: string;
  }) {
    const auditLog = await this.prisma.auditLog.create({
      data,
    });

    // await this.kafka.emit('audit.log.created', {
    //   auditLogId: auditLog.id,
    //   userId: auditLog.userId,
    //   action: auditLog.action,
    //   entityType: auditLog.entityType,
    //   entityId: auditLog.entityId,
    // });
    await this.kafka.sendEvent({
      type: "audit.log.created",
      payload: {
        auditLogId: auditLog.id,
        userId: auditLog.userId,
        action: auditLog.action,
        entityType: auditLog.entityType,
        entityId: auditLog.entityId,
      }
    });

    return auditLog;
  }

  async getAuditLogs(filters: {
    userId?: string;
    entityType?: string;
    entityId?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
  }) {
    const { userId, entityType, entityId, startDate, endDate, page = 1, limit = 10 } = filters;

    const where = {
      ...(userId && { userId }),
      ...(entityType && { entityType }),
      ...(entityId && { entityId }),
      ...(startDate && endDate && {
        createdAt: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      }),
    };

    const [total, logs] = await Promise.all([
      this.prisma.auditLog.count({ where }),
      this.prisma.auditLog.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return {
      logs,
      total,
      page,
      limit,
    };
  }
}
