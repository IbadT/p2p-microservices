import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
// import { KafkaService } from '../shared/kafka.service';
import { KafkaService } from 'src/kafka/kafka.service';
import { Prisma, TransactionStatus } from '@prisma/client';

@Injectable()
export class TransactionsService {
  constructor(
    private prisma: PrismaService,
    private kafka: KafkaService
  ) {}

  async updateTransactionStatus(
    transactionId: string,
    userId: string,
    data: {
      status: string;
      paymentProof?: string;
    }
  ) {
    const transaction = await this.prisma.exchangeTransaction.findUnique({
      where: { id: transactionId },
      include: { listing: true },
    });

    if (!transaction) {
      throw new Error('Transaction not found');
    }

    // Validate status transition
    this.validateStatusTransition(transaction.status, data.status);

    // Update transaction status
    const updatedTransaction = await this.prisma.exchangeTransaction.update({
      where: { id: transactionId },
      data: {
        status: data.status as TransactionStatus,
        paymentProof: data.paymentProof,
        canCustomerDispute: this.calculateCustomerDisputeAbility(data.status),
        canExchangerDispute: this.calculateExchangerDisputeAbility(data.status),
      },
    });

    // Emit Kafka event
    // await this.kafka.emit('exchange.transaction.statusChanged', {
    //   transaction: updatedTransaction,
    //   previousStatus: transaction.status,
    //   newStatus: data.status,
    //   updatedBy: userId,
    // });
    await this.kafka.sendEvent({
      type: "exchange.transaction.statusChanged",
      payload: {
        transaction: updatedTransaction,
        previousStatus: transaction.status,
        newStatus: data.status,
        updatedBy: userId,
      }
    });

    // Handle status-specific actions
    await this.handleStatusChange(updatedTransaction);

    return updatedTransaction;
  }

  private validateStatusTransition(currentStatus: string, newStatus: string): void {
    const validTransitions = {
      PENDING_OFFER: ['PENDING_PAYMENT', 'CANCELLED', 'DECLINED'],
      PENDING_PAYMENT: ['PAYMENT_SENT', 'CANCELLED'],
      PAYMENT_SENT: ['PAYMENT_CONFIRMED', 'DISPUTED'],
      PAYMENT_CONFIRMED: ['COMPLETED', 'DISPUTED'],
      COMPLETED: ['FINISHED'],
      DISPUTED: ['COMPLETED', 'CANCELLED'],
    };

    if (!validTransitions[currentStatus]?.includes(newStatus)) {
      throw new Error(`Invalid status transition from ${currentStatus} to ${newStatus}`);
    }
  }

  private calculateCustomerDisputeAbility(status: string): boolean {
    return ['PAYMENT_SENT', 'PAYMENT_CONFIRMED'].includes(status);
  }

  private calculateExchangerDisputeAbility(status: string): boolean {
    return ['PAYMENT_SENT', 'PAYMENT_CONFIRMED'].includes(status);
  }

  private async handleStatusChange(transaction: any): Promise<void> {
    switch (transaction.status) {
      case 'COMPLETED':
        // Release crypto to buyer
        // await this.kafka.emit('balance.transfer', {
        //   fromUserId: transaction.exchangerId,
        //   toUserId: transaction.customerId,
        //   amount: transaction.cryptoAmount,
        //   cryptocurrency: transaction.cryptocurrency,
        // });
        await this.kafka.sendEvent({
          type: "balance.transfer",
          payload: {
            fromUserId: transaction.exchangerId,
            toUserId: transaction.customerId,
            amount: transaction.cryptoAmount,
            cryptocurrency: transaction.cryptocurrency,
          }
        });
        break;

      case 'CANCELLED':
      case 'DECLINED':
        // Return held funds
        // await this.kafka.emit('balance.hold.release', {
        //   transactionId: transaction.id,
        // });
        await this.kafka.sendEvent({
          type: "balance.hold.release",
          payload: {
            transactionId: transaction.id,
          }
        });
        break;

      case 'FINISHED':
        // Mark transaction as finished after 24 hours
        await this.prisma.exchangeTransaction.update({
          where: { id: transaction.id },
          data: {
            finishedAt: new Date(),
            isActive: false,
          },
        });
        // await this.kafka.emit('exchange.transaction.finished', { transaction });
        await this.kafka.sendEvent({
          type: "exchange.transaction.finished",
          payload: {
            transaction
          }
        });
        break;
    }
  }

  async getActiveExchanges(userId: string) {
    return this.prisma.exchangeTransaction.findMany({
      where: {
        OR: [
          { customerId: userId },
          { exchangerId: userId },
        ],
        AND: {
          isActive: true,
          finishedAt: null,
        },
      },
      include: {
        listing: true,
        offer: true,
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
    });
  }

  async updateTransaction(id: string, data: {
    status?: TransactionStatus;
  }) {
    return this.prisma.exchangeTransaction.update({
      where: { id },
      data: {
        status: data.status as TransactionStatus,
      },
    });
  }
}
