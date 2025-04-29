import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/prisma.service';
import { KafkaService } from '../shared/kafka.service';
import { Prisma } from '@prisma/client';
import { CryptoBalance, HoldAmount, UserBalanceData } from '../types/balance.types';

@Injectable()
export class BalanceService {
  constructor(
    private prisma: PrismaService,
    private kafka: KafkaService
  ) {}

  async getBalance(userId: string) {
    return this.prisma.balance.findUnique({
      where: { userId },
    });
  }

  async updateBalance(userId: string, data: {
    amount: number;
    currency: string;
    type: 'CREDIT' | 'DEBIT';
  }) {
    const balance = await this.prisma.balance.findUnique({
      where: { userId },
    });

    if (!balance) {
      throw new Error('Balance not found');
    }

    const updatedBalance = await this.prisma.balance.update({
      where: { userId },
      data: {
        amount: data.type === 'CREDIT' 
          ? balance.amount + data.amount 
          : balance.amount - data.amount,
      },
    });

    await this.kafka.emit('balance.updated', {
      userId,
      amount: updatedBalance.amount,
      currency: updatedBalance.currency,
    });

    return updatedBalance;
  }

  async createTransaction(data: {
    userId: string;
    amount: number;
    currency: string;
    type: 'DEPOSIT' | 'WITHDRAWAL' | 'TRANSFER';
    status: 'PENDING' | 'COMPLETED' | 'FAILED';
    description?: string;
  }) {
    const transaction = await this.prisma.transaction.create({
      data,
    });

    await this.kafka.emit('transaction.created', {
      transactionId: transaction.id,
      userId: transaction.userId,
      amount: transaction.amount,
      type: transaction.type,
      status: transaction.status,
    });

    return transaction;
  }

  async getTransaction(transactionId: string) {
    return this.prisma.transaction.findUnique({
      where: { id: transactionId },
    });
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

      // Emit Kafka event
      await this.kafka.emit('balance.hold.created', {
        hold,
        userId,
        cryptocurrency,
        amount,
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

      // Emit Kafka event
      await this.kafka.emit('balance.hold.released', {
        holdId,
        userId: hold.userId,
        cryptocurrency: hold.cryptocurrency,
        amount: hold.amount,
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

      // Emit Kafka event
      await this.kafka.emit('balance.transferred', {
        fromUserId,
        toUserId,
        cryptocurrency,
        amount,
      });
    });
  }

  async deposit(userId: string, cryptocurrency: string, amount: number) {
    const balance = await this.getBalance(userId);
    const currentAmount = balance.cryptoBalance[cryptocurrency] || 0;

    const updatedBalance = await this.prisma.userBalance.update({
      where: { userId },
      data: {
        cryptoBalance: {
          ...balance.cryptoBalance,
          [cryptocurrency]: currentAmount + amount,
        },
      },
    });

    // Emit Kafka event
    await this.kafka.emit('balance.deposited', {
      userId,
      cryptocurrency,
      amount,
      newBalance: updatedBalance.cryptoBalance[cryptocurrency],
    });

    return updatedBalance;
  }

  async withdraw(userId: string, cryptocurrency: string, amount: number) {
    return this.prisma.$transaction(async (prisma) => {
      const balance = await this.getBalance(userId);
      const currentAmount = balance.cryptoBalance[cryptocurrency] || 0;
      const currentHold = balance.totalHoldAmount[cryptocurrency] || 0;

      if (currentAmount - currentHold < amount) {
        throw new Error('Insufficient balance');
      }

      const updatedBalance = await prisma.userBalance.update({
        where: { userId },
        data: {
          cryptoBalance: {
            ...balance.cryptoBalance,
            [cryptocurrency]: currentAmount - amount,
          },
        },
      });

      // Emit Kafka event
      await this.kafka.emit('balance.withdrawn', {
        userId,
        cryptocurrency,
        amount,
        newBalance: updatedBalance.cryptoBalance[cryptocurrency],
      });

      return updatedBalance;
    });
  }
}
