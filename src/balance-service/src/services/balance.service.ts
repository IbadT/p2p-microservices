import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
import { CryptoBalance, HoldAmount, UserBalanceData } from '../../../types/balance.types';

@Injectable()
export class BalanceService {
  constructor(private prisma: PrismaService) {}

  async getBalance(userId: string) {
    const balance = await this.prisma.userBalance.findUnique({
      where: { userId },
    });

    if (!balance) {
      return this.prisma.userBalance.create({
        data: {
          userId,
          cryptoBalance: {} as CryptoBalance,
          totalHoldAmount: {} as HoldAmount,
        },
      });
    }

    return balance as UserBalanceData;
  }

  async createHold(
    userId: string,
    cryptocurrency: string,
    amount: number,
    type: 'EXCHANGE_OFFER' | 'DISPUTE' | 'SYSTEM',
    relatedTransactionId?: string
  ) {
    return this.prisma.$transaction(async (prisma) => {
      const balance = await this.getBalance(userId);
      const currentBalance = balance.cryptoBalance[cryptocurrency] || 0;
      const currentHold = balance.totalHoldAmount[cryptocurrency] || 0;

      if (currentBalance - currentHold < amount) {
        throw new Error('Insufficient balance');
      }

      // Create hold
      const hold = await prisma.balanceHold.create({
        data: {
          userId,
          cryptocurrency,
          amount,
          type,
          relatedTransactionId,
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
        },
      });

      // Update total hold amount
      await prisma.userBalance.update({
        where: { userId },
        data: {
          totalHoldAmount: {
            ...balance.totalHoldAmount,
            [cryptocurrency]: currentHold + amount,
          },
        },
      });

      return hold;
    });
  }

  async releaseHold(holdId: string) {
    return this.prisma.$transaction(async (prisma) => {
      const hold = await prisma.balanceHold.findUnique({
        where: { id: holdId },
      });

      if (!hold) {
        throw new Error('Hold not found');
      }

      const balance = await this.getBalance(hold.userId);
      const currentHold = balance.totalHoldAmount[hold.cryptocurrency] || 0;

      // Update total hold amount
      await prisma.userBalance.update({
        where: { userId: hold.userId },
        data: {
          totalHoldAmount: {
            ...balance.totalHoldAmount,
            [hold.cryptocurrency]: Math.max(0, currentHold - hold.amount),
          },
        },
      });

      // Delete hold
      await prisma.balanceHold.delete({
        where: { id: holdId },
      });
    });
  }

  async transfer(
    fromUserId: string,
    toUserId: string,
    cryptocurrency: string,
    amount: number
  ) {
    return this.prisma.$transaction(async (prisma) => {
      const [fromBalance, toBalance] = await Promise.all([
        this.getBalance(fromUserId),
        this.getBalance(toUserId),
      ]);

      const fromAmount = fromBalance.cryptoBalance[cryptocurrency] || 0;
      const fromHold = fromBalance.totalHoldAmount[cryptocurrency] || 0;
      const toAmount = toBalance.cryptoBalance[cryptocurrency] || 0;

      if (fromAmount - fromHold < amount) {
        throw new Error('Insufficient balance');
      }

      // Update balances
      await Promise.all([
        prisma.userBalance.update({
          where: { userId: fromUserId },
          data: {
            cryptoBalance: {
              ...fromBalance.cryptoBalance,
              [cryptocurrency]: fromAmount - amount,
            },
          },
        }),
        prisma.userBalance.update({
          where: { userId: toUserId },
          data: {
            cryptoBalance: {
              ...toBalance.cryptoBalance,
              [cryptocurrency]: toAmount + amount,
            },
          },
        }),
      ]);
    });
  }

  async deposit(userId: string, cryptocurrency: string, amount: number) {
    const balance = await this.getBalance(userId);
    const currentAmount = balance.cryptoBalance[cryptocurrency] || 0;

    return this.prisma.userBalance.update({
      where: { userId },
      data: {
        cryptoBalance: {
          ...balance.cryptoBalance,
          [cryptocurrency]: currentAmount + amount,
        },
      },
    });
  }

  async withdraw(userId: string, cryptocurrency: string, amount: number) {
    return this.prisma.$transaction(async (prisma) => {
      const balance = await this.getBalance(userId);
      const currentAmount = balance.cryptoBalance[cryptocurrency] || 0;
      const currentHold = balance.totalHoldAmount[cryptocurrency] || 0;

      if (currentAmount - currentHold < amount) {
        throw new Error('Insufficient balance');
      }

      return prisma.userBalance.update({
        where: { userId },
        data: {
          cryptoBalance: {
            ...balance.cryptoBalance,
            [cryptocurrency]: currentAmount - amount,
          },
        },
      });
    });
  }
} 