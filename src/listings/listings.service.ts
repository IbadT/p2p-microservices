import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
// import { KafkaService } from '../shared/kafka.service';
import { KafkaService } from '../kafka/kafka.service';
// import { ExchangeType, PaymentMethod, Prisma } from '../../generated/prisma';
import { ExchangeType, PaymentMethod, Prisma } from '@prisma/client';
import { Cron, CronExpression } from '@nestjs/schedule';
import { NotificationsGateway } from '../notifications/notifications.gateway';
import { AuditService } from '../audit/audit.service';
import { NotificationType } from '../client/interfaces/enums';

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
      type: NotificationType.LISTING_STATUS_CHANGED,
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
      data: { isActive }
    });

    await this.kafka.sendEvent({
      type: NotificationType.LISTING_STATUS_CHANGED,
      payload: {
        listing,
        userId: listing.userId,
      }
    });

    this.notificationsGateway.notifyUser(listing.userId, NotificationType.LISTING_STATUS_CHANGED, { 
      listingId: listing.id 
    });

    return listing;
  }

  async deleteListing(listingId: string) {
    const listing = await this.prisma.exchangeListing.delete({
      where: { id: listingId }
    });

    await this.kafka.sendEvent({
      type: NotificationType.LISTING_DELETED,
      payload: { listingId: listing.id }
    });

    this.notificationsGateway.notifyUser(listing.userId, NotificationType.LISTING_DELETED, { 
      listingId: listing.id 
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
        type: NotificationType.LISTING_DEACTIVATED,
        payload: { listingId: listing.id }
      });
      this.notificationsGateway.notifyUser(listing.userId, NotificationType.LISTING_DEACTIVATED, { 
        listingId: listing.id 
      });
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

  async deactivateListing(listingId: string) {
    const listing = await this.prisma.exchangeListing.update({
      where: { id: listingId },
      data: { isActive: false }
    });

    await this.kafka.sendEvent({
      type: NotificationType.LISTING_DEACTIVATED,
      payload: { listingId: listing.id }
    });

    this.notificationsGateway.notifyUser(listing.userId, NotificationType.LISTING_DEACTIVATED, { 
      listingId: listing.id 
    });

    return listing;
  }
}
