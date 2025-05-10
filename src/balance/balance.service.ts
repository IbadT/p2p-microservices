import { Injectable, Logger } from '@nestjs/common';
// import { PrismaService } from '../shared/prisma.service';
// import { KafkaService } from '../shared/kafka.service';
import { KafkaProducerService } from '../kafka/kafka.producer';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import { CryptoBalance, HoldAmount, UserBalanceData } from '../types/balance.types';
import { NotificationType } from '../client/interfaces/enums';

@Injectable()
export class BalanceService {
  private readonly logger = new Logger(BalanceService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly kafkaProducer: KafkaProducerService,
  ) {}

  async getBalance(userId: string) {
    const balance = await this.prisma.userBalance.findUnique({
      where: { userId },
    });

    if (!balance) {
      return this.prisma.userBalance.create({
        data: {
          userId,
          cryptoBalance: {} as CryptoBalance,
          fiatBalance: {},
          totalHoldAmount: {} as HoldAmount,
        },
      });
    }

    return balance;
  }

  async updateBalance(userId: string, data: Prisma.UserBalanceUpdateInput) {
    try {
      const updatedBalance = await this.prisma.userBalance.update({
        where: { userId },
        data,
      });

      if (data.cryptoBalance && typeof data.cryptoBalance === 'object') {
        const cryptoBalance = data.cryptoBalance as CryptoBalance;
        await this.kafkaProducer.sendMessage('balance', {
          type: 'UPDATE',
          data: {
            userId,
            cryptocurrency: cryptoBalance.cryptocurrency,
            newBalance: (updatedBalance.cryptoBalance as CryptoBalance)[cryptoBalance.cryptocurrency],
            change: cryptoBalance.amount,
          },
          timestamp: new Date().toISOString()
        });
      }

      return updatedBalance;
    } catch (error) {
      this.logger.error(`Failed to update balance for user ${userId}: ${error.message}`);
      throw error;
    }
  }

  async createTransaction(data: Prisma.ExchangeTransactionCreateInput) {
    return this.prisma.exchangeTransaction.create({
      data,
    });
  }

  async getTransaction(id: string) {
    return this.prisma.exchangeTransaction.findUnique({
      where: { id },
    });
  }

  async updateTransaction(id: string, data: Prisma.ExchangeTransactionUpdateInput) {
    return this.prisma.exchangeTransaction.update({
      where: { id },
      data,
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
      if (!balance) throw new Error('Balance not found');

      const currentBalance = (balance.cryptoBalance as CryptoBalance)[cryptocurrency] || 0;
      const currentHold = (balance.totalHoldAmount as HoldAmount)[cryptocurrency] || 0;

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
            ...(balance.totalHoldAmount as HoldAmount),
            [cryptocurrency]: currentHold + amount,
          },
        },
      });

      // Emit Kafka event
      await this.kafkaProducer.sendMessage('balance', {
        type: 'HOLD_CREATED',
        data: {
          userId,
          amount,
          currency: cryptocurrency,
          holdId: hold.id
        },
        timestamp: new Date().toISOString()
      });
      return hold;
    })
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
      if (!balance) throw new Error('Balance not found');

      const currentHold = (balance.totalHoldAmount as HoldAmount)[hold.cryptocurrency] || 0;

      // Update total hold amount
      await prisma.userBalance.update({
        where: { userId: hold.userId },
        data: {
          totalHoldAmount: {
            ...(balance.totalHoldAmount as HoldAmount),
            [hold.cryptocurrency]: Math.max(0, currentHold - hold.amount),
          },
        },
      });

      // Delete hold
      await prisma.balanceHold.delete({
        where: { id: holdId },
      });

      // Emit Kafka event
      await this.kafkaProducer.sendMessage('balance', {
        type: 'HOLD_RELEASED',
        data: {
          userId: hold.userId,
          amount: hold.amount,
          currency: hold.cryptocurrency,
          holdId: hold.id
        },
        timestamp: new Date().toISOString()
      });
    });
  }

  async transfer(
    fromUserId: string,
    toUserId: string,
    cryptocurrency: string,
    amount: number,
    transactionId: string
  ) {
    return this.prisma.$transaction(async (prisma) => {
      const [fromBalance, toBalance] = await Promise.all([
        this.getBalance(fromUserId),
        this.getBalance(toUserId),
      ]);

      if (!fromBalance || !toBalance) {
        throw new Error('Balance not found');
      }

      const fromAmount = (fromBalance.cryptoBalance as CryptoBalance)[cryptocurrency] || 0;
      const fromHold = (fromBalance.totalHoldAmount as HoldAmount)[cryptocurrency] || 0;
      const toAmount = (toBalance.cryptoBalance as CryptoBalance)[cryptocurrency] || 0;

      if (fromAmount - fromHold < amount) {
        throw new Error('Insufficient balance');
      }

      // Update balances
      await Promise.all([
        prisma.userBalance.update({
          where: { userId: fromUserId },
          data: {
            cryptoBalance: {
              ...(fromBalance.cryptoBalance as CryptoBalance),
              [cryptocurrency]: fromAmount - amount,
            },
          },
        }),
        prisma.userBalance.update({
          where: { userId: toUserId },
          data: {
            cryptoBalance: {
              ...(toBalance.cryptoBalance as CryptoBalance),
              [cryptocurrency]: toAmount + amount,
            },
          },
        }),
      ]);

      // Emit Kafka event
      await this.kafkaProducer.sendMessage('balance', {
        type: 'TRANSFER_COMPLETED',
        data: {
          fromUserId,
          toUserId,
          amount,
          currency: cryptocurrency,
        },
        timestamp: new Date().toISOString()
      });
    });
  }

  async deposit(userId: string, cryptocurrency: string, amount: number) {
    const balance = await this.getBalance(userId);
    if (!balance) throw new Error('Balance not found');

    const currentAmount = (balance.cryptoBalance as CryptoBalance)[cryptocurrency] || 0;

    const updatedBalance = await this.prisma.userBalance.update({
      where: { userId },
      data: {
        cryptoBalance: {
          ...(balance.cryptoBalance as CryptoBalance),
          [cryptocurrency]: currentAmount + amount,
        },
      },
    });

    await this.kafkaProducer.sendMessage('balance', {
      type: 'UPDATED',
      data: {
        userId,
        cryptocurrency,
        newBalance: (updatedBalance.cryptoBalance as CryptoBalance)[cryptocurrency],
        change: amount,
      },
      timestamp: new Date().toISOString()
    });

    return updatedBalance;
  }

  async withdraw(userId: string, cryptocurrency: string, amount: number) {
    return this.prisma.$transaction(async (prisma) => {
      const balance = await this.getBalance(userId);
      if (!balance) throw new Error('Balance not found');

      const currentAmount = (balance.cryptoBalance as CryptoBalance)[cryptocurrency] || 0;
      const currentHold = (balance.totalHoldAmount as HoldAmount)[cryptocurrency] || 0;

      if (currentAmount - currentHold < amount) {
        throw new Error('Insufficient balance');
      }

      const updatedBalance = await prisma.userBalance.update({
        where: { userId },
        data: {
          cryptoBalance: {
            ...(balance.cryptoBalance as CryptoBalance),
            [cryptocurrency]: currentAmount - amount,
          },
        },
      });

      await this.kafkaProducer.sendMessage('balance', {
        type: 'UPDATED',
        data: {
          userId,
          cryptocurrency,
          newBalance: (updatedBalance.cryptoBalance as CryptoBalance)[cryptocurrency],
          change: amount,
        },
        timestamp: new Date().toISOString()
      });

      return updatedBalance;
    });
  }

  async transferBalance(fromUserId: string, toUserId: string, amount: number, cryptocurrency: string) {
    // Update balances directly since we don't have a balanceTransfer model
    await this.prisma.userBalance.update({
      where: { userId: fromUserId },
      data: {
        cryptoBalance: {
          update: {
            [cryptocurrency]: {
              decrement: amount
            }
          }
        }
      }
    });

    await this.prisma.userBalance.update({
      where: { userId: toUserId },
      data: {
        cryptoBalance: {
          update: {
            [cryptocurrency]: {
              increment: amount
            }
          }
        }
      }
    });

    await this.kafkaProducer.sendMessage('balance', {
      type: 'TRANSFER',
      data: { fromUserId, toUserId, amount, cryptocurrency },
      timestamp: new Date().toISOString()
    });

    return { fromUserId, toUserId, amount, cryptocurrency };
  }

  async createUserBalance(userId: string) {
    return this.prisma.userBalance.create({
      data: {
        userId,
        cryptoBalance: {},
        fiatBalance: {},
        totalHoldAmount: {},
      },
    });
  }
}
