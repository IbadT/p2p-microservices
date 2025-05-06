import { Injectable } from '@nestjs/common';
// import { PrismaService } from '../prisma.service';
// import { KafkaService } from '../kafka.service';
import { KafkaService } from 'src/kafka/kafka.service';
import { PrismaService } from 'src/prisma.service';
import { NotificationType } from '../../../client/interfaces/enums';
import { TransactionStatus, DisputeStatus } from '@prisma/client';

@Injectable()
export class DisputeService {
  constructor(
    private prisma: PrismaService,
    private kafka: KafkaService
  ) {}

  async createDispute(
    transactionId: string,
    initiatorId: string,
    reason: string
  ) {
    return this.prisma.$transaction(async (prisma) => {
      const transaction = await prisma.exchangeTransaction.findUnique({
        where: { id: transactionId },
      });

      if (!transaction) {
        throw new Error('Transaction not found');
      }

      // Validate dispute ability
      if (
        (initiatorId === transaction.customerId && !transaction.canCustomerDispute) ||
        (initiatorId === transaction.exchangerId && !transaction.canExchangerDispute)
      ) {
        throw new Error('Not allowed to open dispute at this stage');
      }

      // Create dispute
      const dispute = await prisma.dispute.create({
        data: {
          transactionId,
          initiatorId,
          reason,
          status: DisputeStatus.OPEN,
        },
      });

      // Update transaction status
      await prisma.exchangeTransaction.update({
        where: { id: transactionId },
        data: {
          status: TransactionStatus.DISPUTE_OPEN,
          disputeId: dispute.id,
        },
      });

      // Create hold on funds if necessary
      await this.kafka.sendEvent({
        type: NotificationType.BALANCE_HOLD_CREATED,
        payload: {
          userId: transaction.exchangerId,
          amount: transaction.cryptoAmount,
          cryptocurrency: transaction.cryptocurrency,
        }
      });

      await this.kafka.sendEvent({
        type: NotificationType.DISPUTE,
        payload: { disputeId: dispute.id }
      });

      return dispute;
    });
  }

  async resolveDispute(
    disputeId: string,
    moderatorId: string,
    resolution: string,
    winnerUserId: string
  ) {
    return this.prisma.$transaction(async (prisma) => {
      const dispute = await prisma.dispute.findUnique({
        where: { id: disputeId },
        include: {
          transaction: true,
        },
      });

      if (!dispute) {
        throw new Error('Dispute not found');
      }

      if (dispute.status !== DisputeStatus.OPEN) {
        throw new Error('Dispute already resolved');
      }

      // Update dispute
      await prisma.dispute.update({
        where: { id: disputeId },
        data: {
          status: DisputeStatus.RESOLVED,
          resolution,
          resolvedAt: new Date(),
          moderatorId,
        },
      });

      // Update transaction status
      await prisma.exchangeTransaction.update({
        where: { id: dispute.transactionId },
        data: {
          status: winnerUserId === dispute.transaction.customerId ? TransactionStatus.FINISHED : TransactionStatus.CANCELLED,
        },
      });

      // Transfer or return funds based on resolution
      if (winnerUserId === dispute.transaction.customerId) {
        await this.kafka.sendEvent({
          type: NotificationType.BALANCE_TRANSFER,
          payload: {
            fromUserId: dispute.transaction.exchangerId,
            toUserId: dispute.transaction.customerId,
            amount: dispute.transaction.cryptoAmount,
            cryptocurrency: dispute.transaction.cryptocurrency,
          }
        });
      } else {
        await this.kafka.sendEvent({
          type: NotificationType.BALANCE_HOLD_RELEASED,
          payload: {
            userId: dispute.transaction.exchangerId,
            amount: dispute.transaction.cryptoAmount,
            cryptocurrency: dispute.transaction.cryptocurrency,
          }
        });
      }

      await this.kafka.sendEvent({
        type: NotificationType.DISPUTE_COMMENT_ADDED,
        payload: { disputeId, commentId: null }
      });

      await this.kafka.sendEvent({
        type: NotificationType.DISPUTE_STATUS_CHANGED,
        payload: { disputeId, status: DisputeStatus.RESOLVED }
      });

      await this.kafka.sendEvent({
        type: NotificationType.DISPUTE_RESOLUTION_ADDED,
        payload: { disputeId, resolution }
      });
    });
  }

  async getDisputesByUser(userId: string) {
    return this.prisma.dispute.findMany({
      where: {
        OR: [
          { initiatorId: userId },
          {
            transaction: {
              OR: [
                { customerId: userId },
                { exchangerId: userId },
              ],
            },
          },
        ],
      },
      include: {
        transaction: {
          include: {
            customer: {
              select: {
                id: true,
                email: true,
              },
            },
            exchanger: {
              select: {
                id: true,
                email: true,
              },
            },
          },
        },
      },
    });
  }

  async getOpenDisputes() {
    return this.prisma.dispute.findMany({
      where: {
        status: DisputeStatus.OPEN,
      },
      include: {
        transaction: {
          include: {
            customer: {
              select: {
                id: true,
                email: true,
              },
            },
            exchanger: {
              select: {
                id: true,
                email: true,
              },
            },
          },
        },
      },
    });
  }

  async addDisputeComment(
    disputeId: string,
    moderatorId: string,
    comment: string
  ) {
    return this.prisma.dispute.update({
      where: { id: disputeId },
      data: {
        resolution: comment,
        moderatorId,
      },
    });
  }

  async changeDisputeStatus(
    disputeId: string,
    newStatus: DisputeStatus
  ) {
    return this.prisma.dispute.update({
      where: { id: disputeId },
      data: {
        status: newStatus,
      },
    });
  }

  async addDisputeResolution(
    disputeId: string,
    moderatorId: string,
    resolution: string
  ) {
    return this.prisma.dispute.update({
      where: { id: disputeId },
      data: {
        resolution,
        moderatorId,
        status: DisputeStatus.RESOLVED,
        resolvedAt: new Date(),
      },
    });
  }
} 