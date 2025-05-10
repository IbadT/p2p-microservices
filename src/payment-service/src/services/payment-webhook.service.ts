import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
// import { PaymentVerificationService } from './payment-verification.service';
import { PaymentProvider, PaymentStatus } from '../dto/payment.dto';
import { PaymentVerificationService } from 'src/exchange-service/src/services/payment-verification.service';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class PaymentWebhookService {
  private readonly logger = new Logger(PaymentWebhookService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly paymentVerificationService: PaymentVerificationService,
    private readonly configService: ConfigService
  ) {}

  private verifyWebhookSignature(
    provider: PaymentProvider,
    signature: string,
    payload: string,
    timestamp: string
  ): boolean {
    const webhookSecret = this.configService.get(`payment.providers.${provider.toLowerCase()}.webhookSecret`);
    
    if (!webhookSecret) {
      this.logger.error(`No webhook secret configured for provider ${provider}`);
      return false;
    }

    // Проверка временной метки (не старше 5 минут)
    const timestampMs = parseInt(timestamp);
    if (isNaN(timestampMs) || Date.now() - timestampMs > 5 * 60 * 1000) {
      this.logger.error(`Webhook timestamp is too old or invalid: ${timestamp}`);
      return false;
    }

    // Проверка подписи в зависимости от провайдера
    switch (provider) {
      case PaymentProvider.STRIPE:
        return this.verifyStripeSignature(signature, payload, webhookSecret);
      case PaymentProvider.PAYPAL:
        return this.verifyPayPalSignature(signature, payload, webhookSecret);
      case PaymentProvider.WISE:
        return this.verifyWiseSignature(signature, payload, webhookSecret);
      case PaymentProvider.BANK_TRANSFER:
        return this.verifyBankTransferSignature(signature, payload, webhookSecret);
      default:
        this.logger.error(`Unsupported provider for signature verification: ${provider}`);
        return false;
    }
  }

  private verifyStripeSignature(signature: string, payload: string, secret: string): boolean {
    try {
      const [timestamp, signatureHash] = signature.split(',');
      const signedPayload = `${timestamp}.${payload}`;
      const expectedSignature = crypto
        .createHmac('sha256', secret)
        .update(signedPayload)
        .digest('hex');
      return signatureHash === expectedSignature;
    } catch (error) {
      this.logger.error(`Error verifying Stripe signature: ${error.message}`);
      return false;
    }
  }

  private verifyPayPalSignature(signature: string, payload: string, secret: string): boolean {
    try {
      const expectedSignature = crypto
        .createHmac('sha256', secret)
        .update(payload)
        .digest('hex');
      return signature === expectedSignature;
    } catch (error) {
      this.logger.error(`Error verifying PayPal signature: ${error.message}`);
      return false;
    }
  }

  private verifyWiseSignature(signature: string, payload: string, secret: string): boolean {
    try {
      const expectedSignature = crypto
        .createHmac('sha512', secret)
        .update(payload)
        .digest('hex');
      return signature === expectedSignature;
    } catch (error) {
      this.logger.error(`Error verifying Wise signature: ${error.message}`);
      return false;
    }
  }

  private verifyBankTransferSignature(signature: string, payload: string, secret: string): boolean {
    try {
      const expectedSignature = crypto
        .createHmac('sha256', secret)
        .update(payload)
        .digest('hex');
      return signature === expectedSignature;
    } catch (error) {
      this.logger.error(`Error verifying Bank Transfer signature: ${error.message}`);
      return false;
    }
  }

  async handleWebhook(data: {
    transactionId: string;
    status: PaymentStatus;
    provider: PaymentProvider;
    amount: number;
    currency: string;
    reference?: string;
    metadata?: Record<string, any>;
    signature?: string;
    timestamp?: string;
  }) {
    this.logger.log(`Received webhook from ${data.provider} for transaction ${data.transactionId}`);

    // Проверка подписи вебхука
    if (!data.signature || !data.timestamp) {
      throw new UnauthorizedException('Missing webhook signature or timestamp');
    }

    const payload = JSON.stringify({
      transactionId: data.transactionId,
      status: data.status,
      amount: data.amount,
      currency: data.currency,
      reference: data.reference,
      metadata: data.metadata
    });

    if (!this.verifyWebhookSignature(data.provider, data.signature, payload, data.timestamp)) {
      throw new UnauthorizedException('Invalid webhook signature');
    }

    const transaction = await this.prisma.exchangeTransaction.findUnique({
      where: { id: data.transactionId },
      include: {
        listing: true
      }
    });

    if (!transaction) {
      this.logger.error(`Transaction ${data.transactionId} not found`);
      return { success: false, message: 'Transaction not found' };
    }

    // Проверяем соответствие суммы и валюты
    if (transaction.fiatAmount !== data.amount || transaction.fiatCurrency !== data.currency) {
      this.logger.error(`Amount/currency mismatch for transaction ${data.transactionId}`);
      return { success: false, message: 'Amount/currency mismatch' };
    }

    // Обрабатываем статус платежа
    switch (data.status) {
      case PaymentStatus.COMPLETED:
        await this.paymentVerificationService.verifyPayment(
          data.transactionId,
          'PAYMENT_SYSTEM'
        );
        break;

      case PaymentStatus.FAILED:
        await this.paymentVerificationService.rejectPayment(
          data.transactionId,
          'PAYMENT_SYSTEM',
          `Payment failed according to ${data.provider}. Reference: ${data.reference}`
        );
        break;

      case PaymentStatus.PENDING:
        // Обновляем информацию о платеже
        await this.prisma.exchangeTransaction.update({
          where: { id: data.transactionId },
          data: {
            paymentProof: `Payment pending in ${data.provider}. Reference: ${data.reference}`,
            updatedAt: new Date()
          }
        });
        break;

      default:
        this.logger.warn(`Unhandled payment status: ${data.status}`);
    }

    // Создаем запись в аудит логе
    await this.prisma.auditLog.create({
      data: {
        userId: transaction.exchangerId,
        action: 'PAYMENT_WEBHOOK',
        entityType: 'Transaction',
        entityId: data.transactionId,
        metadata: {
          provider: data.provider,
          status: data.status,
          reference: data.reference,
          ...data.metadata
        }
      }
    });

    return { success: true, message: 'Webhook processed successfully' };
  }
} 