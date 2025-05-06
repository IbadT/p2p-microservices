import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
// import { KafkaService } from '../shared/kafka.service';
import { KafkaService } from 'src/kafka/kafka.service';
import { Prisma } from '@prisma/client';
import { Cron, CronExpression } from '@nestjs/schedule';
import { NotificationsGateway } from '../notifications/notifications.gateway';
import { AuditService } from '../audit/audit.service';

@Injectable()
export class DisputesService {
  constructor(
    private prisma: PrismaService,
    private kafka: KafkaService,
    private notificationsGateway: NotificationsGateway,
    private auditService: AuditService,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async archiveOldDisputes() {
    const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const disputes = await this.prisma.dispute.findMany({
      where: {
        status: 'RESOLVED',
        updatedAt: { lt: cutoff },
        // isActive: true, // если есть поле
      },
    });
    for (const dispute of disputes) {
      // await this.prisma.dispute.update({
      //   where: { id: dispute.id },
      //   data: { isActive: false },
      // });
      await this.kafka.sendEvent({
        type: 'dispute.archived',
        payload: { disputeId: dispute.id },
      });
      this.notificationsGateway.notifyUser(dispute.initiatorId, 'dispute.archived', { disputeId: dispute.id });
      await this.auditService.createAuditLog({
        userId: dispute.initiatorId,
        action: 'ARCHIVE_DISPUTE',
        entityType: 'Dispute',
        entityId: dispute.id,
        details: JSON.stringify({ reason: 'TTL' }),
        ipAddress: '',
      });
    }
  }

  async createDispute(
    transactionId: string,
    initiatorId: string,
    reason: string
  ) {
    const transaction = await this.prisma.exchangeTransaction.findUnique({
      where: { id: transactionId },
    });

    if (!transaction) {
      throw new Error('Transaction not found');
    }

    if (!transaction.canCustomerDispute && !transaction.canExchangerDispute) {
      throw new Error('Dispute cannot be created for this transaction');
    }

    const dispute = await this.prisma.dispute.create({
      data: {
        transactionId,
        initiatorId,
        reason,
        status: 'OPEN',
      },
    });

    // Update transaction status
    await this.prisma.exchangeTransaction.update({
      where: { id: transactionId },
      data: {
        status: 'DISPUTED',
        disputeId: dispute.id,
      },
    });

    // Emit Kafka event
    // await this.kafka.emit('dispute.created', {
    //   dispute,
    //   transactionId,
    //   initiatorId,
    // });
    await this.kafka.sendEvent({
      type: "dispute.created",
      payload: {
        dispute,
        transactionId,
        initiatorId,
      }
    })

    this.notificationsGateway.notifyUser(initiatorId, 'dispute.created', { disputeId: dispute.id });
    await this.auditService.createAuditLog({
      userId: initiatorId,
      action: 'CREATE_DISPUTE',
      entityType: 'Dispute',
      entityId: dispute.id,
      details: JSON.stringify({ transactionId, reason }),
      ipAddress: '',
    });
    return dispute;
  }

  async resolveDispute(
    disputeId: string,
    moderatorId: string,
    resolution: string,
    winnerUserId: string
  ) {
    const dispute = await this.prisma.dispute.findUnique({
      where: { id: disputeId },
      include: { transaction: true },
    });

    if (!dispute) {
      throw new Error('Dispute not found');
    }

    if (dispute.status !== 'OPEN') {
      throw new Error('Dispute is not open');
    }

    const resolvedDispute = await this.prisma.dispute.update({
      where: { id: disputeId },
      data: {
        status: 'RESOLVED',
        resolution,
        moderatorId,
        resolvedAt: new Date(),
      },
    });

    // Update transaction status
    await this.prisma.exchangeTransaction.update({
      where: { id: dispute.transactionId },
      data: {
        status: winnerUserId === dispute.transaction.customerId ? 'COMPLETED' : 'CANCELLED',
      },
    });

    // Emit Kafka event
    // await this.kafka.emit('dispute.resolved', {
    //   dispute: resolvedDispute,
    //   winnerUserId,
    //   moderatorId,
    // });
    await this.kafka.sendEvent({
      type: "dispute.resolved",
      payload: {
        dispute: resolvedDispute,
        winnerUserId,
        moderatorId,
      }
    })

    this.notificationsGateway.notifyUser(winnerUserId, 'dispute.resolved', { disputeId });
    await this.auditService.createAuditLog({
      userId: moderatorId,
      action: 'RESOLVE_DISPUTE',
      entityType: 'Dispute',
      entityId: disputeId,
      details: JSON.stringify({ resolution, winnerUserId }),
      ipAddress: '',
    });
    return resolvedDispute;
  }

  async getDisputesByUser(userId: string) {
    return this.prisma.dispute.findMany({
      where: {
        OR: [
          { initiatorId: userId },
          { transaction: { customerId: userId } },
          { transaction: { exchangerId: userId } },
        ],
      },
      include: {
        transaction: true,
        moderator: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });
  }

  async getOpenDisputes() {
    return this.prisma.dispute.findMany({
      where: {
        status: 'OPEN',
      },
      include: {
        transaction: true,
        moderator: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });
  }

  async addModeratorComment(disputeId: string, moderatorId: string, comment: string, resolution?: string) {
    // Проверка роли модератора (можно вынести в Guard)
    const moderator = await this.prisma.user.findUnique({ where: { id: moderatorId } });
    if (!moderator || moderator.role !== 'MODERATOR') {
      throw new Error('Only moderator can add comments');
    }
    return this.prisma.dispute.update({
      where: { id: disputeId },
      data: {
        resolution: comment || resolution || undefined,
        moderatorId,
        status: resolution ? 'RESOLVED' : undefined,
        resolvedAt: resolution ? new Date() : undefined,
      },
    });
  }
}
