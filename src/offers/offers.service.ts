import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { KafkaService } from '../shared/kafka.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class OffersService {
  constructor(
    private prisma: PrismaService,
    private kafka: KafkaService
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
      await this.kafka.emit('balance.hold.create', {
        userId,
        amount: data.amount,
        type: 'EXCHANGE_OFFER',
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
      await this.kafka.emit('exchange.offer.created', {
        offer,
        userId,
        listingId: data.listingId,
      });

      // Create transaction
      const transaction = await prisma.exchangeTransaction.create({
        data: {
          type: listing.type,
          status: 'PENDING_OFFER',
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
      await this.kafka.emit('exchange.transaction.created', {
        transaction,
        offerId: offer.id,
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
}
