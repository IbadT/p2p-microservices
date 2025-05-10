import { Injectable, Logger, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ExchangeType, TransactionStatus, UserRole } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PaymentVerificationService {
  private readonly logger = new Logger(PaymentVerificationService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService
  ) {}

  private async validateLargeAmount(transaction: any, verifiedBy: string) {
    const kycThreshold = this.configService.get('payment.security.kycThreshold', 1000);
    const requireKyc = this.configService.get('payment.security.requireKyc', true);

    if (transaction.listing.availableAmount >= kycThreshold && requireKyc) {
      // Проверяем KYC статус пользователя
      const user = await this.prisma.user.findUnique({
        where: { id: transaction.customerId },
        select: {
          kycStatus: true,
          kycVerifiedAt: true
        }
      });

      if (!user?.kycStatus || user.kycStatus !== 'VERIFIED') {
        throw new ForbiddenException('KYC verification required for large amounts');
      }

      if (!user.kycVerifiedAt) {
        throw new ForbiddenException('KYC verification date is missing');
      }
      const kycAge = Date.now() - new Date(user.kycVerifiedAt).getTime();
      if (kycAge > 365 * 24 * 60 * 60 * 1000) {
        throw new ForbiddenException('KYC verification is too old, please update');
      }
    }

    // Проверяем историю транзакций пользователя
    const userTransactions = await this.prisma.exchangeTransaction.findMany({
      where: {
        customerId: transaction.customerId,
        status: TransactionStatus.FINISHED,
        createdAt: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // последние 30 дней
        }
      }
    });

    const totalVolume = userTransactions.reduce((sum, t) => sum + t.fiatAmount, 0);
    const maxVolume = this.configService.get('payment.security.maxVolume', 50000);

    if (totalVolume + transaction.fiatAmount > maxVolume) {
      throw new ForbiddenException('Transaction volume exceeds monthly limit');
    }
  }

  private async validateVerifier(verifiedBy: string) {
    const verifier = await this.prisma.user.findUnique({
      where: { id: verifiedBy },
      select: {
        role: true,
        isActive: true
      }
    });

    if (!verifier || !verifier.isActive) {
      throw new ForbiddenException('Verifier is not active');
    }

    if (verifier.role !== UserRole.MODERATOR && verifier.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Only moderators and admins can verify payments');
    }
  }

  async verifyPayment(transactionId: string, verifiedBy: string) {
    const transaction = await this.prisma.exchangeTransaction.findUnique({
      where: { id: transactionId },
      include: {
        listing: true,
        exchanger: true,
        customer: true
      }
    });

    if (!transaction) {
      throw new BadRequestException('Transaction not found');
    }

    if (transaction.listing.type !== ExchangeType.FIAT_TO_CRYPTO) {
      throw new BadRequestException('Verification is only available for Fiat2Crypto transactions');
    }

    if (transaction.status !== TransactionStatus.CRYPTO_RESERVED) {
      throw new BadRequestException('Transaction must be in CRYPTO_RESERVED state');
    }

    // Проверяем верификатора
    await this.validateVerifier(verifiedBy);

    // Проверяем большие суммы
    await this.validateLargeAmount(transaction, verifiedBy);

    // Проверяем, не было ли уже верификации
    const existingVerification = await this.prisma.auditLog.findFirst({
      where: {
        entityType: 'Transaction',
        entityId: transactionId,
        action: 'PAYMENT_VERIFICATION'
      }
    });

    if (existingVerification) {
      throw new BadRequestException('Payment already verified');
    }

    // Обновляем статус транзакции и добавляем информацию о верификации
    await this.prisma.exchangeTransaction.update({
      where: { id: transactionId },
      data: {
        status: TransactionStatus.PAYMENT_CONFIRMED,
        paymentProof: `Verified by ${verifiedBy} at ${new Date().toISOString()}`,
        updatedAt: new Date()
      }
    });

    // Создаем запись в аудит логе
    await this.prisma.auditLog.create({
      data: {
        userId: verifiedBy,
        action: 'PAYMENT_VERIFICATION',
        entityType: 'Transaction',
        entityId: transactionId,
        metadata: {
          transactionId,
          amount: transaction.listing.availableAmount,
          currency: transaction.listing.fiatCurrency,
          verifiedBy,
          verificationTimestamp: new Date().toISOString()
        }
      }
    });

    return { success: true, message: 'Payment verified successfully' };
  }

  async rejectPayment(transactionId: string, rejectedBy: string, reason: string) {
    const transaction = await this.prisma.exchangeTransaction.findUnique({
      where: { id: transactionId },
      include: {
        listing: true,
        exchanger: true,
        customer: true
      }
    });

    if (!transaction) {
      throw new BadRequestException('Transaction not found');
    }

    if (transaction.listing.type !== ExchangeType.FIAT_TO_CRYPTO) {
      throw new BadRequestException('Rejection is only available for Fiat2Crypto transactions');
    }

    if (transaction.status !== TransactionStatus.CRYPTO_RESERVED) {
      throw new BadRequestException('Transaction must be in CRYPTO_RESERVED state');
    }

    // Проверяем верификатора
    await this.validateVerifier(rejectedBy);

    // Обновляем статус транзакции
    await this.prisma.exchangeTransaction.update({
      where: { id: transactionId },
      data: {
        status: TransactionStatus.CANCELLED,
        paymentProof: `Rejected by ${rejectedBy} at ${new Date().toISOString()}. Reason: ${reason}`,
        updatedAt: new Date()
      }
    });

    // Создаем запись в аудит логе
    await this.prisma.auditLog.create({
      data: {
        userId: rejectedBy,
        action: 'PAYMENT_REJECTION',
        entityType: 'Transaction',
        entityId: transactionId,
        metadata: {
          transactionId,
          reason,
          amount: transaction.listing.availableAmount,
          currency: transaction.listing.fiatCurrency,
          rejectedBy,
          rejectionTimestamp: new Date().toISOString()
        }
      }
    });

    return { success: true, message: 'Payment rejected successfully' };
  }
} 