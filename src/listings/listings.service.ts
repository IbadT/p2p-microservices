import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
// import { KafkaService } from '../shared/kafka.service';
import { KafkaService } from 'src/kafka/kafka.service';
// import { ExchangeType, PaymentMethod, Prisma } from '../../generated/prisma';
import { ExchangeType, PaymentMethod, Prisma } from '@prisma/client';
import { Cron, CronExpression } from '@nestjs/schedule';
import { NotificationsGateway } from '../notifications/notifications.gateway';
import { AuditService } from '../audit/audit.service';

@Injectable()
export class ListingsService {
  constructor(
    private prisma: PrismaService,
    private kafka: KafkaService,
    private notificationsGateway: NotificationsGateway,
    private auditService: AuditService,
  ) {}

  async createListing(userId: string, data: {
    type: ExchangeType;
    cryptocurrency: string;
    fiatCurrency: string;
    rate: number;
    minAmount: number;
    maxAmount: number;
    availableAmount: number;
    paymentMethods: PaymentMethod[];
    terms?: string;
  }) {
    const listing = await this.prisma.exchangeListing.create({
      data: {
        ...data,
        userId,
        isActive: true,
      },
    });

    // Emit Kafka event
    // await this.kafka.emit('exchange.listing.created', {
    //   listing,
    //   userId,
    // });
    await this.kafka.sendEvent({
      type: "exchange.listing.statusChanged",
      payload: {
        listing,
        userId,
      }
    });

    return listing;
  }

  async filterListings(filters: {
    type?: ExchangeType;
    cryptocurrency?: string;
    fiatCurrency?: string;
    minRate?: number;
    maxRate?: number;
    paymentMethods?: PaymentMethod[];
    isActive?: boolean;
  }) {
    const where: Prisma.ExchangeListingWhereInput = {
      isActive: true,
      type: filters.type,
      cryptocurrency: filters.cryptocurrency,
      fiatCurrency: filters.fiatCurrency,
      ...(filters.minRate && { rate: { gte: filters.minRate } }),
      ...(filters.maxRate && { rate: { lte: filters.maxRate } }),
      ...(filters.paymentMethods?.length && {
        paymentMethods: {
          hasEvery: filters.paymentMethods
        }
      })
    };

    return this.prisma.exchangeListing.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            isExchangerActive: true,
          },
        },
      },
    });
  }

  async updateListingStatus(listingId: string, isActive: boolean) {
    const listing = await this.prisma.exchangeListing.update({
      where: { id: listingId },
      data: { isActive },
    });

    // Emit Kafka event
    // await this.kafka.emit('exchange.listing.statusChanged', {
    //   listingId,
    //   isActive,
    // });
    await this.kafka.sendEvent({
      type: "exchange.listing.statusChanged",
      payload: {
        listingId,
        isActive,
      }
    });

    return listing;
  }

  async deleteListing(listingId: string) {
    const listing = await this.prisma.exchangeListing.delete({
      where: { id: listingId },
    });

    // Emit Kafka event
    // await this.kafka.emit('exchange.listing.deleted', {
    //   listingId,
    // });
    await this.kafka.sendEvent({
      type: "exchange.listing.deleted",
      payload: {
        listingId
      }
    });

    return listing;
  }

  @Cron(CronExpression.EVERY_HOUR)
  async deactivateOldListings() {
    const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const listings = await this.prisma.exchangeListing.findMany({
      where: {
        isActive: true,
        updatedAt: { lt: cutoff },
      },
    });
    for (const listing of listings) {
      await this.prisma.exchangeListing.update({
        where: { id: listing.id },
        data: { isActive: false },
      });
      await this.kafka.sendEvent({
        type: 'exchange.listing.deactivated',
        payload: { listingId: listing.id },
      });
      this.notificationsGateway.notifyUser(listing.userId, 'listing.deactivated', { listingId: listing.id });
      await this.auditService.createAuditLog({
        userId: listing.userId,
        action: 'DEACTIVATE_LISTING',
        entityType: 'ExchangeListing',
        entityId: listing.id,
        details: JSON.stringify({ reason: 'TTL' }),
        ipAddress: '',
      });
    }
  }
}
