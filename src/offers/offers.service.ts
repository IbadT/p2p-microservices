import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
// import { KafkaService } from '../shared/kafka.service';
import { KafkaService } from 'src/kafka/kafka.service';
import { Prisma, TransactionStatus, ExchangeType } from '@prisma/client';
import { Cron, CronExpression } from '@nestjs/schedule';
import { NotificationsGateway } from '../notifications/notifications.gateway';
import { AuditService } from '../audit/audit.service';
import { NotificationType } from 'src/client/interfaces/enums';
import { BalanceService } from '../balance/balance.service';
// import { NotificationType } from '../notifications/notification-type.enum';

@Injectable()
export class OffersService {
  constructor(
    private prisma: PrismaService,
    private kafka: KafkaService,
    private notificationsGateway: NotificationsGateway,
    private auditService: AuditService,
    private balanceService: BalanceService,
  ) {}

  async createOffer(userId: string, data: {
    listingId: string;
    amount: number;
  }) {
    const listing = await this.prisma.exchangeListing.findUnique({
      where: { id: data.listingId },
    });

    if (!listing || !listing.isActive) {
      throw new Error('Listing not found or inactive');
    }

    // Start transaction
    return this.prisma.$transaction(async (prisma) => {
      // For Crypto2Fiat transactions, create hold on customer's crypto balance
      if (listing.type === ExchangeType.CRYPTO_TO_FIAT) {
        // Create actual hold on customer's balance
        await this.balanceService.createHold(
          userId, // customer's ID
          listing.cryptocurrency,
          data.amount,
          'EXCHANGE_OFFER',
          undefined // transaction ID will be set later
        );

        // Emit Kafka event for notification
        await this.kafka.sendEvent({
          type: NotificationType.BALANCE_HOLD_CREATED,
          payload: {
            userId,
            amount: data.amount,
            cryptocurrency: listing.cryptocurrency,
            type: 'EXCHANGE_OFFER'
          }
        });
      }

      // Create offer
      const offer = await prisma.exchangeOffer.create({
        data: {
          userId,
          listingId: data.listingId,
          amount: data.amount,
        },
      });

      // Emit Kafka event
      await this.kafka.sendEvent({
        type: NotificationType.OFFER_CREATED,
        payload: {
          offerId: offer.id,
          userId,
          listingId: data.listingId,
          amount: data.amount,
        }
      });

      // Emit WebSocket notification
      this.notificationsGateway.notifyUser(userId, NotificationType.OFFER_CREATED, {
        offerId: offer.id,
        listingId: data.listingId,
        amount: data.amount,
      });

      // Create transaction
      const transaction = await prisma.exchangeTransaction.create({
        data: {
          type: listing.type,
          status: TransactionStatus.PENDING,
          cryptocurrency: listing.cryptocurrency,
          fiatCurrency: listing.fiatCurrency,
          cryptoAmount: data.amount,
          fiatAmount: data.amount * listing.rate,
          customerId: userId,
          exchangerId: listing.userId,
          listingId: listing.id,
          offerId: offer.id,
          confirmationDeadline: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes
        },
      });

      // Emit Kafka event
      await this.kafka.sendEvent({
        type: NotificationType.TRANSACTION_CREATED,
        payload: {
          transactionId: transaction.id,
          offerId: offer.id
        }
      });

      // Audit log
      await this.auditService.createAuditLog({
        userId,
        action: 'CREATE_OFFER',
        entityType: 'ExchangeOffer',
        entityId: offer.id,
        metadata: {
          details: JSON.stringify({ listingId: data.listingId, amount: data.amount }),
          ipAddress: '', // Можно получить из запроса, если нужно
        }
      });

      return offer;
    });
  }

  async getOfferTimeLeft(offerId: string) {
    const offer = await this.prisma.exchangeOffer.findUnique({
      where: { id: offerId },
      include: {
        transaction: true,
      },
    });

    if (!offer || !offer.transaction) {
      throw new Error('Offer not found');
    }

    const timeLeft = offer.transaction.confirmationDeadline.getTime() - Date.now();
    return {
      timeLeft: Math.max(0, timeLeft),
      isExpired: timeLeft <= 0,
    };
  }

  @Cron(CronExpression.EVERY_HOUR)
  async hideOldOffers() {
    const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000);
    await this.prisma.exchangeOffer.updateMany({
      where: {
        status: { in: [TransactionStatus.DECLINED, TransactionStatus.CANCELLED] },
        updatedAt: { lt: cutoff },
      },
      data: { updatedAt: new Date() },
    });
  }

  async listOffers() {
    return this.prisma.exchangeOffer.findMany({
      include: {
        transaction: true,
        listing: true,
      },
    });
  }

  async rejectOffer(id: string) {
    return this.prisma.exchangeOffer.update({
      where: { id },
      data: { status: TransactionStatus.DECLINED },
      include: {
        transaction: true,
        listing: true,
      },
    });
  }

  async acceptOffer(id: string) {
    const offer = await this.prisma.exchangeOffer.findUnique({
      where: { id },
      include: {
        transaction: true,
        listing: true,
      },
    });

    if (!offer || !offer.transaction) {
      throw new Error('Offer or transaction not found');
    }

    // Store transaction ID to avoid repeated null checks
    const transactionId = offer.transaction.id;

    // Start transaction to ensure atomicity
    return this.prisma.$transaction(async (prisma) => {
      // Update offer status
      const updatedOffer = await prisma.exchangeOffer.update({
        where: { id },
        data: { status: TransactionStatus.ACCEPTED },
        include: {
          transaction: true,
          listing: true,
        },
      });

      // Update transaction status
      await prisma.exchangeTransaction.update({
        where: { id: transactionId },
        data: { status: TransactionStatus.ACCEPTED }
      });

      // Emit Kafka event
      await this.kafka.sendEvent({
        type: NotificationType.OFFER_CREATED,
        payload: {
          offerId: id,
          transactionId,
          listingId: offer.listing.id,
          amount: offer.amount,
          type: offer.listing.type
        }
      });

      // Notify both participants
      this.notificationsGateway.notifyUser(offer.userId, NotificationType.OFFER_CREATED, {
        offerId: id,
        transactionId,
        listingId: offer.listing.id,
        amount: offer.amount
      });

      this.notificationsGateway.notifyUser(offer.listing.userId, NotificationType.OFFER_CREATED, {
        offerId: id,
        transactionId,
        listingId: offer.listing.id,
        amount: offer.amount
      });

      // Create audit log
      await this.auditService.createAuditLog({
        userId: offer.listing.userId,
        action: 'ACCEPT_OFFER',
        entityType: 'ExchangeOffer',
        entityId: id,
        metadata: {
          transactionId,
          listingId: offer.listing.id,
          amount: offer.amount,
          type: offer.listing.type,
          cryptoHoldCreated: false // No hold created for Fiat2Crypto
        }
      });

      return updatedOffer;
    });
  }

  async findOne(id: string) {
    return this.prisma.exchangeOffer.findUnique({
      where: { id },
      include: {
        transaction: true,
        listing: true,
      },
    });
  }

  async updateTransaction(transactionId: string, status: TransactionStatus) {
    return this.prisma.exchangeTransaction.update({
      where: { id: transactionId },
      data: { status },
      include: {
        offer: true,
        listing: true,
      },
    });
  }
}
