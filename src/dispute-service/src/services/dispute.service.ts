import { Injectable } from '@nestjs/common';
// import { PrismaService } from '../prisma.service';
// import { KafkaService } from '../kafka.service';
import { KafkaService } from 'src/kafka/kafka.service';
import { PrismaService } from 'src/prisma.service';

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
          status: 'OPEN',
        },
      });

      // Update transaction status
      await prisma.exchangeTransaction.update({
        where: { id: transactionId },
        data: {
          status: 'DISPUTED',
          disputeId: dispute.id,
        },
      });

      // Create hold on funds if necessary
      // await this.kafka.emit('balance.hold.create', {
      //   userId: transaction.exchangerId,
      //   amount: transaction.cryptoAmount,
      //   type: 'DISPUTE',
      //   relatedTransactionId: transactionId,
      // });
      await this.kafka.sendEvent({
        type: "",
        payload: {
          userId: transaction.exchangerId,
          amount: transaction.cryptoAmount,
          type: 'DISPUTE',
          relatedTransactionId: transactionId,
        }
      })

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

      if (dispute.status !== 'OPEN') {
        throw new Error('Dispute already resolved');
      }

      // Update dispute
      await prisma.dispute.update({
        where: { id: disputeId },
        data: {
          status: 'RESOLVED',
          resolution,
          resolvedAt: new Date(),
          moderatorId,
        },
      });

      // Update transaction status
      await prisma.exchangeTransaction.update({
        where: { id: dispute.transactionId },
        data: {
          status: winnerUserId === dispute.transaction.customerId ? 'COMPLETED' : 'CANCELLED',
        },
      });

      // Transfer or return funds based on resolution
      if (winnerUserId === dispute.transaction.customerId) {
        // await this.kafka.emit('balance.transfer', {
        //   fromUserId: dispute.transaction.exchangerId,
        //   toUserId: dispute.transaction.customerId,
        //   amount: dispute.transaction.cryptoAmount,
        //   cryptocurrency: dispute.transaction.cryptocurrency,
        // });
        await this.kafka.sendEvent({
        type: "",
        payload: {
          fromUserId: dispute.transaction.exchangerId,
          toUserId: dispute.transaction.customerId,
          amount: dispute.transaction.cryptoAmount,
          cryptocurrency: dispute.transaction.cryptocurrency,
        }
      })
      } else {
        // await this.kafka.emit('balance.hold.release', {
        //   transactionId: dispute.transactionId,
        // });
        await this.kafka.sendEvent({
        type: "",
        payload: {
          transactionId: dispute.transactionId,
        }
      })
      }
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
        status: 'OPEN',
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
} 