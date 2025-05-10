import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ExchangeType, TransactionStatus } from '@prisma/client';

@Injectable()
export class ReserveService {
  private readonly logger = new Logger(ReserveService.name);

  constructor(private readonly prisma: PrismaService) {}

  async reserveCryptocurrency(transactionId: string) {
    const transaction = await this.prisma.exchangeTransaction.findUnique({
      where: { id: transactionId },
      include: {
        listing: true,
        exchanger: {
          include: {
            balance: true
          }
        }
      }
    });

    if (!transaction) {
      throw new BadRequestException('Transaction not found');
    }

    if (transaction.listing.type !== ExchangeType.FIAT_TO_CRYPTO) {
      throw new BadRequestException('Reservation is only available for Fiat2Crypto transactions');
    }

    // Проверяем достаточность средств
    const requiredAmount = transaction.listing.availableAmount;
    const cryptoBalance = transaction.exchanger.balance?.cryptoBalance as Record<string, number>;
    if (!cryptoBalance || cryptoBalance[transaction.listing.cryptocurrency] < requiredAmount) {
      throw new BadRequestException('Insufficient funds for reservation');
    }

    // Резервируем средства
    await this.prisma.$transaction([
      // Уменьшаем баланс эксчейнджера
      this.prisma.userBalance.update({
        where: { userId: transaction.exchangerId },
        data: {
          cryptoBalance: {
            ...cryptoBalance,
            [transaction.listing.cryptocurrency]: cryptoBalance[transaction.listing.cryptocurrency] - requiredAmount
          }
        }
      }),
      // Уменьшаем доступное количество в листинге
      this.prisma.exchangeListing.update({
        where: { id: transaction.listingId },
        data: {
          availableAmount: {
            decrement: requiredAmount
          }
        }
      }),
      // Обновляем статус транзакции
      this.prisma.exchangeTransaction.update({
        where: { id: transactionId },
        data: {
          status: TransactionStatus.CRYPTO_RESERVED,
          updatedAt: new Date()
        }
      })
    ]);

    return { success: true, message: 'Cryptocurrency reserved successfully' };
  }

  async releaseReservation(transactionId: string) {
    const transaction = await this.prisma.exchangeTransaction.findUnique({
      where: { id: transactionId },
      include: {
        listing: true,
        exchanger: {
          include: {
            balance: true
          }
        }
      }
    });

    if (!transaction) {
      throw new BadRequestException('Transaction not found');
    }

    if (transaction.status !== TransactionStatus.CRYPTO_RESERVED) {
      throw new BadRequestException('Transaction is not in reserved state');
    }

    const reservedAmount = transaction.listing.availableAmount;
    const cryptoBalance = transaction.exchanger.balance?.cryptoBalance as Record<string, number>;

    // Возвращаем средства
    await this.prisma.$transaction([
      // Возвращаем баланс эксчейнджера
      this.prisma.userBalance.update({
        where: { userId: transaction.exchangerId },
        data: {
          cryptoBalance: {
            ...cryptoBalance,
            [transaction.listing.cryptocurrency]: cryptoBalance[transaction.listing.cryptocurrency] + reservedAmount
          }
        }
      }),
      // Возвращаем доступное количество в листинге
      this.prisma.exchangeListing.update({
        where: { id: transaction.listingId },
        data: {
          availableAmount: {
            increment: reservedAmount
          }
        }
      }),
      // Обновляем статус транзакции
      this.prisma.exchangeTransaction.update({
        where: { id: transactionId },
        data: {
          status: TransactionStatus.CANCELLED,
          updatedAt: new Date()
        }
      })
    ]);

    return { success: true, message: 'Reservation released successfully' };
  }
} 