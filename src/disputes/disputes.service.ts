import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
// import { KafkaService } from '../shared/kafka.service';
import { KafkaService } from 'src/kafka/kafka.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class DisputesService {
  constructor(
    private prisma: PrismaService,
    private kafka: KafkaService
  ) {}

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
      type: "",
      payload: {
        dispute,
        transactionId,
        initiatorId,
      }
    })

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
      type: "",
      payload: {
        dispute: resolvedDispute,
        winnerUserId,
        moderatorId,
      }
    })

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
}
