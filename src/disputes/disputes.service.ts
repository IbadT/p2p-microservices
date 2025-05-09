import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { KafkaService } from '../kafka/kafka.service';
import { Prisma, TransactionStatus, DisputeStatus } from '@prisma/client';
import { Cron, CronExpression } from '@nestjs/schedule';
import { NotificationsGateway } from '../notifications/notifications.gateway';
import { AuditService } from '../audit/audit.service';
import { NotificationType } from '../client/interfaces/enums';
import { DatabaseUtils } from '../shared/utils/database.utils';
import { ChatGrpcClient } from '../client/services/chat.grpc.client';
import { Logger } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { Comment } from '../proto/generated/chat.pb';
import { BalanceService } from '../balance/balance.service';

@Injectable()
export class DisputesService {
  private readonly logger = new Logger(DisputesService.name);

  constructor(
    private prisma: PrismaService,
    private kafka: KafkaService,
    private notificationsGateway: NotificationsGateway,
    private auditService: AuditService,
    private chatGrpcClient: ChatGrpcClient,
    private balanceService: BalanceService,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async archiveOldDisputes() {
    const cutoffDate = new Date();
    cutoffDate.setHours(cutoffDate.getHours() - 24);

    const disputes = await this.prisma.dispute.findMany({
      where: {
        status: DisputeStatus.RESOLVED,
        updatedAt: {
          lt: cutoffDate
        }
      }
    });

    for (const dispute of disputes) {
      await this.prisma.dispute.update({
        where: { id: dispute.id },
        data: { status: DisputeStatus.RESOLVED }
      });

      await this.kafka.sendEvent({
        type: NotificationType.DISPUTE_ARCHIVED,
        payload: { disputeId: dispute.id }
      });

      this.notificationsGateway.notifyUser(dispute.initiatorId, NotificationType.DISPUTE_ARCHIVED, { 
        disputeId: dispute.id 
      });
    }
  }

  async createDispute(
    transactionId: string,
    initiatorId: string,
    reason: string,
  ) {
    // Get transaction with participants
    const transaction = await this.prisma.exchangeTransaction.findUnique({
      where: { id: transactionId },
      include: {
        customer: true,
        exchanger: true
      }
    });

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    // Check if initiator is a participant
    const isCustomer = transaction.customerId === initiatorId;
    const isExchanger = transaction.exchangerId === initiatorId;

    if (!isCustomer && !isExchanger) {
      throw new ForbiddenException('Only transaction participants can create disputes');
    }

    // Check if dispute is allowed based on participant role
    if (isCustomer && !transaction.canCustomerDispute) {
      throw new ForbiddenException('Customer cannot create dispute for this transaction');
    }

    if (isExchanger && !transaction.canExchangerDispute) {
      throw new ForbiddenException('Exchanger cannot create dispute for this transaction');
    }

    // Check if dispute already exists
    const existingDispute = await this.prisma.dispute.findFirst({
      where: {
        transactionId,
        status: {
          not: DisputeStatus.RESOLVED
        }
      }
    });

    if (existingDispute) {
      throw new ForbiddenException('Active dispute already exists for this transaction');
    }

    // Create dispute
    const dispute = await this.prisma.dispute.create({
      data: {
        transactionId,
        initiatorId,
        reason,
        status: DisputeStatus.OPEN
      }
    });

    // Create chat for the dispute
    await this.chatGrpcClient.createDisputeChat(dispute.id, initiatorId);

    // Update transaction status
    await this.prisma.exchangeTransaction.update({
      where: { id: transactionId },
      data: {
        status: TransactionStatus.DISPUTE_OPEN,
        disputeId: dispute.id,
      },
    });

    // Emit Kafka event
    await this.kafka.sendEvent({
      type: NotificationType.DISPUTE_CREATED,
      payload: { 
        disputeId: dispute.id,
        transactionId,
        initiatorId,
        initiatorRole: isCustomer ? 'CUSTOMER' : 'EXCHANGER'
      }
    });

    // Notify both participants
    this.notificationsGateway.notifyUser(transaction.customerId, NotificationType.DISPUTE_CREATED, { 
      disputeId: dispute.id,
      transactionId,
      initiatorId,
      initiatorRole: isCustomer ? 'CUSTOMER' : 'EXCHANGER'
    });

    this.notificationsGateway.notifyUser(transaction.exchangerId, NotificationType.DISPUTE_CREATED, { 
      disputeId: dispute.id,
      transactionId,
      initiatorId,
      initiatorRole: isCustomer ? 'CUSTOMER' : 'EXCHANGER'
    });

    // Create audit log
    await this.auditService.createAuditLog({
      userId: initiatorId,
      action: 'CREATE_DISPUTE',
      entityType: 'Dispute',
      entityId: dispute.id,
      metadata: { 
        transactionId, 
        reason,
        initiatorRole: isCustomer ? 'CUSTOMER' : 'EXCHANGER'
      }
    });

    return dispute;
  }

  async resolveDispute(
    disputeId: string,
    resolution: string,
    moderatorId: string,
    winnerId: string,
  ) {
    const dispute = await this.prisma.dispute.findUnique({
      where: { id: disputeId },
      include: {
        transaction: {
          include: {
            customer: {
              include: { balance: true }
            },
            exchanger: {
              include: { balance: true }
            }
          }
        },
      },
    });

    if (!dispute) {
      throw new NotFoundException('Dispute not found');
    }

    if (dispute.status === DisputeStatus.RESOLVED) {
      throw new ForbiddenException('Dispute is already resolved');
    }

    // Проверяем, что транзакция существует и в статусе спора
    if (!dispute.transaction) {
      throw new NotFoundException('Transaction not found');
    }

    if (dispute.transaction.status !== TransactionStatus.DISPUTE_OPEN) {
      throw new ForbiddenException('Transaction is not in dispute status');
    }

    // Проверяем, что победитель является участником транзакции
    const isCustomerWinner = winnerId === dispute.transaction.customerId;
    const isExchangerWinner = winnerId === dispute.transaction.exchangerId;

    if (!isCustomerWinner && !isExchangerWinner) {
      throw new ForbiddenException('Winner must be either customer or exchanger');
    }

    // Start a transaction to ensure all operations are atomic
    return await this.prisma.$transaction(async (prisma) => {
      try {
        // Update dispute status
        const updatedDispute = await prisma.dispute.update({
          where: { id: disputeId },
          data: {
            status: DisputeStatus.RESOLVED,
            resolution,
            moderatorId,
            winnerId,
            resolvedAt: new Date(),
          },
        });

        const transaction = dispute.transaction;

        // Handle transaction completion and balance updates based on winner
        if (isCustomerWinner) {
          // If customer wins, return crypto to customer and mark transaction as cancelled
          // First release the hold
          await this.balanceService.releaseHold(transaction.id);
          
          // Then return crypto to customer if it was held by exchanger
          if (transaction.status === TransactionStatus.DISPUTE_OPEN) {
            await this.balanceService.transfer(
              transaction.exchangerId,
              transaction.customerId,
              transaction.cryptocurrency,
              transaction.cryptoAmount,
              transaction.id
            );
          }

          // Update transaction status
          await prisma.exchangeTransaction.update({
            where: { id: transaction.id },
            data: {
              status: TransactionStatus.CANCELLED,
              finishedAt: new Date(),
            },
          });

          // Create audit log for cancellation
          await this.auditService.createAuditLog({
            userId: moderatorId,
            action: 'DISPUTE_RESOLVED_CANCELLED',
            entityType: 'Dispute',
            entityId: disputeId,
            metadata: {
              transactionId: transaction.id,
              winnerId,
              resolution,
              balanceReturned: true,
              cryptoAmount: transaction.cryptoAmount,
              cryptocurrency: transaction.cryptocurrency
            },
          });

          // Emit Kafka event for cancellation
          await this.kafka.sendEvent({
            type: NotificationType.DISPUTE_RESOLVED,
            payload: {
              disputeId,
              transactionId: transaction.id,
              winnerId,
              finalStatus: 'CANCELLED',
              resolution,
              balanceReturned: true,
              cryptoAmount: transaction.cryptoAmount,
              cryptocurrency: transaction.cryptocurrency
            },
          });
        } else {
          // If exchanger wins, complete transaction and transfer crypto to exchanger
          await prisma.exchangeTransaction.update({
            where: { id: transaction.id },
            data: {
              status: TransactionStatus.FINISHED,
              finishedAt: new Date(),
            },
          });

          // Transfer crypto from customer to exchanger
          await this.balanceService.transfer(
            transaction.customerId,
            transaction.exchangerId,
            transaction.cryptocurrency,
            transaction.cryptoAmount,
            transaction.id
          );

          // Create audit log for completion
          await this.auditService.createAuditLog({
            userId: moderatorId,
            action: 'DISPUTE_RESOLVED_COMPLETED',
            entityType: 'Dispute',
            entityId: disputeId,
            metadata: {
              transactionId: transaction.id,
              winnerId,
              resolution,
              balanceTransferred: true,
              cryptoAmount: transaction.cryptoAmount,
              cryptocurrency: transaction.cryptocurrency
            },
          });

          // Emit Kafka event for completion
          await this.kafka.sendEvent({
            type: NotificationType.DISPUTE_RESOLVED,
            payload: {
              disputeId,
              transactionId: transaction.id,
              winnerId,
              finalStatus: 'FINISHED',
              resolution,
              balanceTransferred: true,
              cryptoAmount: transaction.cryptoAmount,
              cryptocurrency: transaction.cryptocurrency
            },
          });
        }

        // Notify both participants about the resolution
        this.notificationsGateway.notifyUser(transaction.customerId, NotificationType.DISPUTE_RESOLVED, {
          disputeId,
          transactionId: transaction.id,
          winnerId,
          finalStatus: isCustomerWinner ? 'CANCELLED' : 'FINISHED',
          resolution,
          cryptoAmount: transaction.cryptoAmount,
          cryptocurrency: transaction.cryptocurrency
        });

        this.notificationsGateway.notifyUser(transaction.exchangerId, NotificationType.DISPUTE_RESOLVED, {
          disputeId,
          transactionId: transaction.id,
          winnerId,
          finalStatus: isCustomerWinner ? 'CANCELLED' : 'FINISHED',
          resolution,
          cryptoAmount: transaction.cryptoAmount,
          cryptocurrency: transaction.cryptocurrency
        });

        return updatedDispute;
      } catch (error) {
        this.logger.error(`Failed to resolve dispute: ${error.message}`);
        throw new ForbiddenException(`Failed to resolve dispute: ${error.message}`);
      }
    });
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
        status: DisputeStatus.OPEN,
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
        status: resolution ? DisputeStatus.RESOLVED : undefined,
        resolvedAt: resolution ? new Date() : undefined,
      },
    });
  }

  async getDisputeChat(disputeId: string, userId: string, page: number = 1, limit: number = 20) {
    const dispute = await this.prisma.dispute.findUnique({
      where: { id: disputeId },
      include: { transaction: true }
    });

    if (!dispute) {
      throw new NotFoundException('Dispute not found');
    }

    const chat = await firstValueFrom(
      this.chatGrpcClient.getDisputeChat({ 
        disputeId, 
        userId,
        page,
        limit
      })
    );

    return chat;
  }

  async addDisputeComment(
    disputeId: string, 
    userId: string, 
    text: string,
    isModeratorComment: boolean = false
  ): Promise<Comment> {
    const dispute = await this.prisma.dispute.findUnique({
      where: { id: disputeId },
      include: { transaction: true }
    });

    if (!dispute) {
      throw new NotFoundException('Dispute not found');
    }

    const comment = await firstValueFrom(
      this.chatGrpcClient.addModeratorComment({
        disputeId,
        moderatorId: userId,
        text,
      })
    );

    return comment;
  }

  async getDisputeComments(
    disputeId: string, 
    userId: string,
    page: number = 1,
    limit: number = 20
  ): Promise<Comment[]> {
    const dispute = await this.prisma.dispute.findUnique({
      where: { id: disputeId },
      include: { transaction: true }
    });

    if (!dispute) {
      throw new NotFoundException('Dispute not found');
    }

    const response = await firstValueFrom(
      this.chatGrpcClient.getDisputeComments({
        disputeId,
        userId,
        page,
        limit
      })
    );

    return response.comments;
  }

  async notifyAboutModeratorComment(disputeId: string, comment: Comment) {
    const dispute = await this.prisma.dispute.findUnique({
      where: { id: disputeId },
      include: { transaction: true }
    });

    if (!dispute) {
      throw new NotFoundException('Dispute not found');
    }

    // Notify both customer and exchanger
    const notificationData = {
      disputeId,
      commentId: comment.id,
      moderatorId: comment.userId,
      text: comment.text
    };

    // Notify customer
    this.notificationsGateway.notifyUser(
      dispute.transaction.customerId, 
      NotificationType.MODERATOR_COMMENT_ADDED, 
      notificationData
    );

    // Notify exchanger
    this.notificationsGateway.notifyUser(
      dispute.transaction.exchangerId,
      NotificationType.MODERATOR_COMMENT_ADDED,
      notificationData
    );

    // Send Kafka event
    await this.kafka.sendEvent({
      type: NotificationType.MODERATOR_COMMENT_ADDED,
      payload: notificationData
    });
  }

  async getDisputeById(disputeId: string) {
    return this.prisma.dispute.findUnique({
      where: { id: disputeId },
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
}
