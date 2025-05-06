import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
// import { KafkaService } from '../shared/kafka.service';
import { KafkaService } from 'src/kafka/kafka.service';
import { Prisma } from '@prisma/client';
import { Cron, CronExpression } from '@nestjs/schedule';
import { NotificationsGateway } from '../notifications/notifications.gateway';
import { AuditService } from '../audit/audit.service';
import { NotificationType } from 'src/client/interfaces/enums';
import { TransactionStatus } from '@prisma/client';
// import { NotificationType } from '../notifications/notification-type.enum';

@Injectable()
export class OffersService {
  constructor(
    private prisma: PrismaService,
    private kafka: KafkaService,
    private notificationsGateway: NotificationsGateway,
    private auditService: AuditService,
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
      // Create hold on user's balance
      await this.kafka.sendEvent({
        type: NotificationType.BALANCE_HOLD_CREATED,
        payload: {
          userId,
          amount: data.amount,
          type: 'EXCHANGE_OFFER',
        }
      });

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
    return this.prisma.exchangeOffer.update({
      where: { id },
      data: { status: TransactionStatus.APPROVED },
      include: {
        transaction: true,
        listing: true,
      },
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
}
