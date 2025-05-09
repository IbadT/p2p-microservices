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

@Injectable()
export class DisputesService {
  private readonly logger = new Logger(DisputesService.name);

  constructor(
    private prisma: PrismaService,
    private kafka: KafkaService,
    private notificationsGateway: NotificationsGateway,
    private auditService: AuditService,
    private chatGrpcClient: ChatGrpcClient,
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
    moderatorId: string,
    resolution: string,
    winnerUserId: string
  ) {
    // Start a transaction
    return this.prisma.$transaction(async (prisma) => {
      const dispute = await prisma.dispute.findUnique({
        where: { id: disputeId },
        include: { transaction: true },
      });

      if (!dispute) {
        throw new Error('Dispute not found');
      }

      if (dispute.status !== DisputeStatus.OPEN) {
        throw new Error('Dispute is not open');
      }

      const resolvedDispute = await prisma.dispute.update({
        where: { id: disputeId },
        data: {
          status: DisputeStatus.RESOLVED,
          resolution,
          moderatorId,
          resolvedAt: new Date(),
        },
      });

      const transaction = dispute.transaction;
      const isCustomerWinner = winnerUserId === transaction.customerId;

      try {
        // Handle funds based on resolution
        if (isCustomerWinner) {
          // If customer wins, they get their crypto back
          await prisma.userBalance.update({
            where: { userId: transaction.customerId },
            data: {
              cryptoBalance: {
                update: {
                  [transaction.cryptocurrency]: {
                    increment: transaction.cryptoAmount
                  }
                }
              },
              totalHoldAmount: {
                update: {
                  [transaction.cryptocurrency]: {
                    decrement: transaction.cryptoAmount
                  }
                }
              }
            }
          });

          // Log the balance update
          await this.auditService.createAuditLog({
            userId: transaction.customerId,
            action: 'BALANCE_UPDATE',
            entityType: 'UserBalance',
            entityId: transaction.customerId,
            metadata: {
              type: 'DISPUTE_RESOLUTION',
              amount: transaction.cryptoAmount,
              cryptocurrency: transaction.cryptocurrency,
              operation: 'INCREMENT'
            }
          });
        } else {
          // If exchanger wins, they get the crypto
          await prisma.userBalance.update({
            where: { userId: transaction.exchangerId },
            data: {
              cryptoBalance: {
                update: {
                  [transaction.cryptocurrency]: {
                    increment: transaction.cryptoAmount
                  }
                }
              }
            }
          });

          // Log the balance update
          await this.auditService.createAuditLog({
            userId: transaction.exchangerId,
            action: 'BALANCE_UPDATE',
            entityType: 'UserBalance',
            entityId: transaction.exchangerId,
            metadata: {
              type: 'DISPUTE_RESOLUTION',
              amount: transaction.cryptoAmount,
              cryptocurrency: transaction.cryptocurrency,
              operation: 'INCREMENT'
            }
          });
        }

        // Update transaction status and completion
        const finalStatus = isCustomerWinner ? TransactionStatus.FINISHED : TransactionStatus.CANCELLED;
        await prisma.exchangeTransaction.update({
          where: { id: transaction.id },
          data: {
            status: finalStatus,
            finishedAt: new Date(),
            isActive: false,
          },
        });

        // Emit Kafka event
        await this.kafka.sendEvent({
          type: NotificationType.DISPUTE_RESOLVED,
          payload: { 
            disputeId: resolvedDispute.id,
            transactionId: transaction.id,
            winnerUserId,
            finalStatus
          }
        });

        // Notify winner
        this.notificationsGateway.notifyUser(winnerUserId, NotificationType.DISPUTE_RESOLVED, { 
          disputeId: resolvedDispute.id,
          transactionId: transaction.id,
          resolution
        });

        // Notify loser
        const loserUserId = isCustomerWinner ? transaction.exchangerId : transaction.customerId;
        this.notificationsGateway.notifyUser(loserUserId, NotificationType.DISPUTE_RESOLVED, {
          disputeId: resolvedDispute.id,
          transactionId: transaction.id,
          resolution
        });

        await this.auditService.createAuditLog({
          userId: moderatorId,
          action: 'RESOLVE_DISPUTE',
          entityType: 'Dispute',
          entityId: disputeId,
          metadata: { 
            resolution, 
            winnerUserId,
            finalStatus,
            transactionId: transaction.id
          }
        });

        return resolvedDispute;
      } catch (error) {
        // Log the error
        this.logger.error(`Failed to resolve dispute ${disputeId}: ${error.message}`);
        
        // Create audit log for the failure
        await this.auditService.createAuditLog({
          userId: moderatorId,
          action: 'RESOLVE_DISPUTE_FAILED',
          entityType: 'Dispute',
          entityId: disputeId,
          metadata: { 
            error: error.message,
            resolution, 
            winnerUserId,
            transactionId: transaction.id
          }
        });

        throw new Error(`Failed to resolve dispute: ${error.message}`);
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
}
