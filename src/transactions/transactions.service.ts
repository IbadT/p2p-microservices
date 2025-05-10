import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
// import { KafkaService } from '../shared/kafka.service';
import { KafkaService } from '../kafka/kafka.service';
import { Prisma, TransactionStatus, ExchangeTransaction, User, ExchangeListing, ExchangeOffer } from '@prisma/client';
import { NotificationType } from '../client/interfaces/enums';

export interface ExchangeTransactionWithRelations extends ExchangeTransaction {
  listing: ExchangeListing;
  offer: ExchangeOffer | null;
  customer: Pick<User, 'id' | 'email'>;
  exchanger: Pick<User, 'id' | 'email'>;
}

interface TransactionStatusUpdateData {
  transactionId: string;
  status: TransactionStatus;
  paymentProof?: string;
}

@Injectable()
export class TransactionsService {
  constructor(
    private prisma: PrismaService,
    private kafka: KafkaService
  ) {}

  async updateTransactionStatus(data: TransactionStatusUpdateData): Promise<ExchangeTransaction> {
    const transaction = await this.prisma.exchangeTransaction.findUnique({
      where: { id: data.transactionId },
      include: { listing: true },
    });

    if (!transaction) {
      throw new Error('Transaction not found');
    }

    // Validate status transition
    this.validateStatusTransition(transaction.status, data.status);

    // Update transaction status
    const updatedTransaction = await this.prisma.exchangeTransaction.update({
      where: { id: data.transactionId },
      data: {
        status: data.status,
        paymentProof: data.paymentProof,
        canCustomerDispute: this.calculateCustomerDisputeAbility(data.status),
        canExchangerDispute: this.calculateExchangerDisputeAbility(data.status),
      },
    });

    // Emit Kafka event
    await this.kafka.sendEvent({
      type: NotificationType.TRANSACTION_STATUS_CHANGED,
      payload: { transactionId: transaction.id, status: data.status }
    });

    // Handle status-specific actions
    await this.handleStatusChange(updatedTransaction);

    return updatedTransaction;
  }

  private validateStatusTransition(currentStatus: TransactionStatus, newStatus: TransactionStatus): void {
    const validTransitions = {
      [TransactionStatus.PENDING]: [TransactionStatus.ACCEPTED, TransactionStatus.DECLINED, TransactionStatus.CANCELLED],
      [TransactionStatus.ACCEPTED]: [TransactionStatus.PAYMENT_CONFIRMED, TransactionStatus.CANCELLED],
      [TransactionStatus.PAYMENT_CONFIRMED]: [TransactionStatus.RECEIPT_CONFIRMED, TransactionStatus.DISPUTE_OPEN],
      [TransactionStatus.RECEIPT_CONFIRMED]: [TransactionStatus.FINISHED, TransactionStatus.DISPUTE_OPEN],
      [TransactionStatus.FINISHED]: [],
      [TransactionStatus.CANCELLED]: [],
      [TransactionStatus.DISPUTE_OPEN]: [TransactionStatus.DISPUTE_RESOLVED],
      [TransactionStatus.DISPUTE_RESOLVED]: [TransactionStatus.FINISHED, TransactionStatus.CANCELLED],
    };

    if (!validTransitions[currentStatus]?.includes(newStatus)) {
      throw new Error(`Invalid status transition from ${currentStatus} to ${newStatus}`);
    }
  }

  private calculateCustomerDisputeAbility(status: TransactionStatus): boolean {
    return status === TransactionStatus.PAYMENT_CONFIRMED || 
           status === TransactionStatus.RECEIPT_CONFIRMED;
  }

  private calculateExchangerDisputeAbility(status: TransactionStatus): boolean {
    return status === TransactionStatus.PAYMENT_CONFIRMED || 
           status === TransactionStatus.RECEIPT_CONFIRMED;
  }

  private async handleStatusChange(transaction: ExchangeTransaction): Promise<void> {
    switch (transaction.status) {
      case TransactionStatus.FINISHED:
        // Release crypto to buyer
        await this.kafka.sendEvent({
          type: NotificationType.BALANCE_TRANSFER,
          payload: {
            fromUserId: transaction.exchangerId,
            toUserId: transaction.customerId,
            amount: transaction.cryptoAmount,
            cryptocurrency: transaction.cryptocurrency,
          }
        });
        break;

      case TransactionStatus.CANCELLED:
      case TransactionStatus.DECLINED:
        // Return held funds
        await this.kafka.sendEvent({
          type: NotificationType.BALANCE_HOLD_RELEASED,
          payload: {
            userId: transaction.customerId,
            amount: transaction.cryptoAmount,
            cryptocurrency: transaction.cryptocurrency,
          }
        });
        break;

      case TransactionStatus.FINISHED:
        // Mark transaction as finished after 24 hours
        await this.prisma.exchangeTransaction.update({
          where: { id: transaction.id },
          data: {
            finishedAt: new Date(),
            isActive: false,
          },
        });
        await this.kafka.sendEvent({
          type: NotificationType.TRANSACTION_FINISHED,
          payload: { transactionId: transaction.id }
        });
        break;
    }
  }

  async getActiveExchanges(userId: string): Promise<ExchangeTransactionWithRelations[]> {
    return this.prisma.exchangeTransaction.findMany({
      where: {
        OR: [
          { customerId: userId },
          { exchangerId: userId }
        ],
        isActive: true,
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
  }): Promise<ExchangeTransaction> {
    return this.prisma.exchangeTransaction.update({
      where: { id },
      data: {
        status: data.status,
      },
    });
  }
}
