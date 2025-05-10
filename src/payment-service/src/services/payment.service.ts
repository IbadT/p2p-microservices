import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { KafkaService } from 'src/kafka/kafka.service';
import { PaymentWebhookDto, PaymentStatus } from '../dto/payment.dto';
import { NotificationType } from 'src/client/interfaces/enums';

@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly kafka: KafkaService,
  ) {}

  async handleWebhook(data: PaymentWebhookDto) {
    try {
      const transaction = await this.prisma.exchangeTransaction.findUnique({
        where: { id: data.transactionId },
        include: {
          customer: true,
          exchanger: true,
          listing: true
        }
      });

      if (!transaction) {
        throw new NotFoundException('Transaction not found');
      }

      // Обновляем статус транзакции
      await this.prisma.exchangeTransaction.update({
        where: { id: data.transactionId },
        data: {
          status: this.mapPaymentStatusToTransactionStatus(data.status),
          updatedAt: new Date()
        }
      });

      // Отправляем уведомления
      if (data.status === PaymentStatus.COMPLETED) {
        await this.notifyPaymentCompleted(transaction);
      } else if (data.status === PaymentStatus.FAILED) {
        await this.notifyPaymentFailed(transaction);
      }

      return { success: true };
    } catch (error) {
      this.logger.error(`Error handling payment status update: ${error.message}`, error.stack);
      throw error;
    }
  }

  async getPaymentStatus(transactionId: string) {
    try {
      const transaction = await this.prisma.exchangeTransaction.findUnique({
        where: { id: transactionId },
        include: {
          customer: true,
          exchanger: true,
          listing: true
        }
      });

      if (!transaction) {
        throw new NotFoundException('Transaction not found');
      }

      return {
        status: transaction.status,
        provider: transaction.listing.paymentMethods[0],
        amount: transaction.listing.availableAmount,
        currency: transaction.listing.fiatCurrency,
        reference: transaction.paymentProof
      };
    } catch (error) {
      this.logger.error(`Error getting payment status: ${error.message}`, error.stack);
      throw error;
    }
  }

  private async notifyPaymentCompleted(transaction: any) {
    await this.kafka.sendEvent({
      type: NotificationType.PAYMENT,
      payload: {
        userId: transaction.exchangerId,
        message: `Payment received for transaction ${transaction.id}`,
        transactionId: transaction.id
      }
    });

    await this.kafka.sendEvent({
      type: NotificationType.PAYMENT,
      payload: {
        userId: transaction.customerId,
        message: `Your payment for transaction ${transaction.id} has been confirmed`,
        transactionId: transaction.id
      }
    });
  }

  private async notifyPaymentFailed(transaction: any) {
    await this.kafka.sendEvent({
      type: NotificationType.PAYMENT,
      payload: {
        userId: transaction.exchangerId,
        message: `Payment failed for transaction ${transaction.id}`,
        transactionId: transaction.id
      }
    });

    await this.kafka.sendEvent({
      type: NotificationType.PAYMENT,
      payload: {
        userId: transaction.customerId,
        message: `Your payment for transaction ${transaction.id} has failed`,
        transactionId: transaction.id
      }
    });
  }

  private mapPaymentStatusToTransactionStatus(status: PaymentStatus) {
    switch (status) {
      case PaymentStatus.COMPLETED:
        return 'PAYMENT_CONFIRMED';
      case PaymentStatus.FAILED:
        return 'CANCELLED';
      case PaymentStatus.CANCELLED:
        return 'CANCELLED';
      default:
        return 'PENDING';
    }
  }
} 