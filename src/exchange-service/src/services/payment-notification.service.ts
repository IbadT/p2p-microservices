import { Injectable } from '@nestjs/common';
import { NotificationsGateway } from '../../../notifications/notifications.gateway';
import { NotificationType } from 'src/client/interfaces/enums';

@Injectable()
export class PaymentNotificationService {
  constructor(private readonly notificationsGateway: NotificationsGateway) {}

  async notifyPaymentVerified(transaction: any) {
    await this.notificationsGateway.notifyUser(
      transaction.customerId,
      NotificationType.PAYMENT_VERIFIED,
      {
        transactionId: transaction.id,
        amount: transaction.listing.availableAmount,
        currency: transaction.listing.fiatCurrency
      }
    );

    await this.notificationsGateway.notifyUser(
      transaction.exchangerId,
      NotificationType.PAYMENT_VERIFIED,
      {
        transactionId: transaction.id,
        amount: transaction.listing.availableAmount,
        currency: transaction.listing.fiatCurrency
      }
    );
  }

  async notifyPaymentRejected(transaction: any, reason: string) {
    await this.notificationsGateway.notifyUser(
      transaction.customerId,
      NotificationType.PAYMENT_REJECTED,
      {
        transactionId: transaction.id,
        amount: transaction.listing.availableAmount,
        currency: transaction.listing.fiatCurrency,
        reason
      }
    );

    await this.notificationsGateway.notifyUser(
      transaction.exchangerId,
      NotificationType.PAYMENT_REJECTED,
      {
        transactionId: transaction.id,
        amount: transaction.listing.availableAmount,
        currency: transaction.listing.fiatCurrency,
        reason
      }
    );
  }
} 