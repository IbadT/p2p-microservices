import { Injectable, Logger, BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ExchangeType, TransactionStatus, UserRole } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { KafkaProducerService } from 'src/kafka/kafka.producer';
import { NotificationType } from 'src/client/interfaces/enums';
import { AuditService } from 'src/audit/audit.service';
import { BankIntegrationService } from './bank-integration.service';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { PaymentNotificationService } from '../services/payment-notification.service';


interface BankTransactionResponse {
  status: string;
  reason?: string;
}

interface EscrowResponse {
  escrowId: string;
}

@Injectable()
export class PaymentVerificationService {
  private readonly logger = new Logger(PaymentVerificationService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly kafkaProducer: KafkaProducerService,
    private readonly paymentNotificationService: PaymentNotificationService,
    private readonly auditService: AuditService,
    private readonly bankIntegration: BankIntegrationService,
    private readonly httpService: HttpService
  ) {}

  async verifyPayment(transactionId: string, verifiedBy: string, proofData?: { 
    bankId?: string;
    bankTransactionId?: string;
    screenshotUrl?: string;
    additionalNotes?: string;
  }) {
    await this.validateVerifier(verifiedBy);

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

    if (transaction.status !== TransactionStatus.PENDING) {
      throw new BadRequestException('Transaction is not in pending status');
    }

    // Проверяем, не истекло ли время на верификацию
    const maxVerificationTime = this.configService.get('payment.verification.maxVerificationTime', 24 * 60 * 60 * 1000);
    const timeSinceCreation = Date.now() - transaction.createdAt.getTime();
    
    if (timeSinceCreation > maxVerificationTime) {
      throw new BadRequestException('Payment verification time has expired');
    }

    // Проверяем сумму транзакции
    const minAmount = this.configService.get('payment.security.minAmount', 10);
    const maxAmount = this.configService.get('payment.security.maxAmount', 10000);
    const kycThreshold = this.configService.get('payment.security.kycThreshold', 1000);

    if (transaction.listing.availableAmount < minAmount || transaction.listing.availableAmount > maxAmount) {
      throw new BadRequestException('Transaction amount is outside allowed limits');
    }

    // Проверяем KYC для больших сумм
    if (transaction.listing.availableAmount >= kycThreshold) {
      const customer = await this.prisma.user.findUnique({
        where: { id: transaction.customerId },
        select: { kycStatus: true, kycVerifiedAt: true }
      });

      if (!customer || customer.kycStatus !== 'VERIFIED' || !customer.kycVerifiedAt) {
        throw new BadRequestException('Customer KYC verification required for this amount');
      }
    }

    // Проверяем историю транзакций пользователей
    const customerTransactionCount = await this.prisma.exchangeTransaction.count({
      where: {
        customerId: transaction.customerId,
        status: TransactionStatus.FINISHED
      }
    });

    const exchangerTransactionCount = await this.prisma.exchangeTransaction.count({
      where: {
        exchangerId: transaction.exchangerId,
        status: TransactionStatus.FINISHED
      }
    });

    // Если это первая транзакция для обоих пользователей, требуем дополнительные доказательства
    if (customerTransactionCount === 0 && exchangerTransactionCount === 0) {
      this.logger.warn(`First transaction for both users: ${transactionId}`);
      if (!proofData?.bankTransactionId && !proofData?.screenshotUrl) {
        throw new BadRequestException('Additional proof required for first-time users');
      }
    }

    // Проверяем рейтинг пользователей
    const customerRating = await this.getUserRating(transaction.customerId);
    const exchangerRating = await this.getUserRating(transaction.exchangerId);

    // Для пользователей с низким рейтингом требуем дополнительные доказательства
    if (customerRating < 3 || exchangerRating < 3) {
      if (!proofData?.bankTransactionId && !proofData?.screenshotUrl) {
        throw new BadRequestException('Additional proof required for users with low rating');
      }
    }

    // Проверяем банковскую транзакцию, если предоставлен ID
    let bankVerification: {
      verified: boolean;
      reason?: string | null;
      details?: {
        amount: number;
        currency: string;
        senderAccount: string;
        receiverAccount: string;
        timestamp: string;
      };
    } | null = null;

    if (proofData?.bankId && proofData?.bankTransactionId) {
      bankVerification = await this.bankIntegration.verifyTransaction(
        proofData.bankId,
        proofData.bankTransactionId
      );

      if (!bankVerification.verified) {
        throw new BadRequestException(`Bank transaction verification failed: ${bankVerification.reason}`);
      }

      // Проверяем соответствие суммы и валюты
      if (bankVerification.details) {
        if (bankVerification.details.amount !== transaction.listing.availableAmount ||
            bankVerification.details.currency !== transaction.listing.fiatCurrency) {
          throw new BadRequestException('Transaction amount or currency mismatch');
        }
      }
    }

    // Создаем эскроу для защиты от мошенничества
    const escrowId = await this.createEscrow(transaction);

    // Формируем proof с дополнительной информацией
    const proof = {
      verifiedBy,
      verifiedAt: new Date().toISOString(),
      bankId: proofData?.bankId,
      bankTransactionId: proofData?.bankTransactionId,
      screenshotUrl: proofData?.screenshotUrl,
      additionalNotes: proofData?.additionalNotes,
      customerRating,
      exchangerRating,
      escrowId,
      bankVerification
    };

    // Обновляем статус транзакции
    const updatedTransaction = await this.prisma.exchangeTransaction.update({
      where: { id: transactionId },
      data: {
        status: TransactionStatus.PAYMENT_CONFIRMED,
        paymentProof: JSON.stringify(proof)
      }
    });

    // Отправляем уведомления
    await this.paymentNotificationService.notifyPaymentVerified(transaction);

    // Создаем запись аудита
    await this.auditService.createAuditLog({
      userId: verifiedBy,
      action: 'PAYMENT_VERIFIED',
      entityType: 'Transaction',
      entityId: transactionId,
      metadata: {
        transactionId,
        amount: transaction.listing.availableAmount,
        currency: transaction.listing.fiatCurrency,
        customerId: transaction.customerId,
        exchangerId: transaction.exchangerId,
        proof
      }
    });

    return {
      success: true,
      message: 'Payment verified successfully',
      transaction: updatedTransaction
    };
  }

  async rejectPayment(transactionId: string, rejectedBy: string, reason: string) {
    await this.validateVerifier(rejectedBy);

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

    if (transaction.status !== TransactionStatus.PENDING) {
      throw new BadRequestException('Transaction is not in pending status');
    }

    // Формируем proof с информацией об отклонении
    const proof = {
      rejectedBy,
      rejectedAt: new Date().toISOString(),
      reason
    };

    // Обновляем статус транзакции
    const updatedTransaction = await this.prisma.exchangeTransaction.update({
      where: { id: transactionId },
      data: {
        status: TransactionStatus.CANCELLED,
        paymentProof: JSON.stringify(proof)
      }
    });

    // Отправляем уведомления
    await this.paymentNotificationService.notifyPaymentRejected(transaction, reason);

    // Создаем запись аудита
    await this.auditService.createAuditLog({
      userId: rejectedBy,
      action: 'PAYMENT_REJECTED',
      entityType: 'Transaction',
      entityId: transactionId,
      metadata: {
        transactionId,
        amount: transaction.listing.availableAmount,
        currency: transaction.listing.fiatCurrency,
        customerId: transaction.customerId,
        exchangerId: transaction.exchangerId,
        reason
      }
    });

    return {
      success: true,
      message: 'Payment rejected successfully',
      transaction: updatedTransaction
    };
  }

  private async validateVerifier(verifiedBy: string) {
    const verifier = await this.prisma.user.findUnique({
      where: { id: verifiedBy },
      select: { role: true }
    });

    if (!verifier || (verifier.role !== 'ADMIN' && verifier.role !== 'MODERATOR')) {
      throw new ForbiddenException('Only admins and moderators can verify payments');
    }
  }

  private async getUserRating(userId: string): Promise<number> {
    const reviews = await this.prisma.review.findMany({
      where: {
        targetId: userId
      },
      select: {
        rating: true
      }
    });

    if (reviews.length === 0) {
      return 0;
    }

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / reviews.length;
  }

  private async createEscrow(transaction: any) {
    try {
      const response = await firstValueFrom(
        this.httpService.post<EscrowResponse>(
          `${this.configService.get('ESCROW_SERVICE_URL')}/escrows`,
          {
            amount: transaction.listing.availableAmount,
            currency: transaction.listing.fiatCurrency,
            transactionId: transaction.id,
            customerId: transaction.customerId,
            exchangerId: transaction.exchangerId
          }
        )
      );

      return response.data.escrowId;
    } catch (error) {
      this.logger.error(`Failed to create escrow: ${error.message}`);
      throw new BadRequestException('Failed to create escrow for transaction');
    }
  }
} 