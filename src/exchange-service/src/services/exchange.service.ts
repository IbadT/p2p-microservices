import { Injectable, Logger, NotFoundException, ForbiddenException, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ExchangeListingFilterDto } from '../dto/exchange.dto';
import { Cron, CronExpression } from '@nestjs/schedule';
import { KafkaService } from 'src/kafka/kafka.service';
import { NotificationsGateway } from 'src/notifications/notifications.gateway';
import { AuditService } from 'src/audit/audit.service';
import { 
  ExchangeListing, 
  ExchangeOffer, 
  ExchangeTransaction, 
  ExchangerStatus,
  RespondAction,
} from '../interfaces/exchange.interface';
import { TransactionStatus, OfferStatus } from '@prisma/client';

@Injectable()
export class ExchangeService {
  private readonly logger = new Logger(ExchangeService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly kafka: KafkaService,
    private readonly notificationsGateway: NotificationsGateway,
    private readonly auditService: AuditService,
  ) {}

  // async getActiveExchanges() {
  //   return this.prisma.$queryRaw`SELECT * FROM exchange WHERE status NOT IN ('CANCELLED', 'DECLINED', 'FINISHED') AND updatedAt > NOW() - INTERVAL 24 HOUR`;
  // }

  //   // async getActiveExchanges(userId: string): Promise<ExchangeTransaction[]> {
  async getActiveExchanges(userId: string) {
    this.logger.log(`Fetching active exchanges for user ${userId}`);
    return this.prisma.exchangeTransaction.findMany({
      where: {
        OR: [
          { customerId: userId },
          { exchangerId: userId },
        ],
        isActive: true,
        status: { notIn: ['CANCELLED', 'DECLINED', 'FINISHED'] },
      },
      include: {
        listing: true,
        offer: true,
        customer: {
          select: {
            id: true,
            email: true,
          },
        },
        exchanger: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });
  }

  // async openDispute(exchangeId: number) {
  //   const exchange: any = await this.prisma.$queryRaw`SELECT * FROM exchange WHERE id = ${exchangeId}`;
  //   if (exchange.customer.isVulnerable || exchange.exchanger.isVulnerable) {
  //     // Открыть спор
  //   }
  // }

  async leaveReview(exchangeId: string, review: string, rating: number, authorId: string) {
    this.logger.log(`User ${authorId} is leaving a review for transaction ${exchangeId}`);
    // Получаем сделку
    const exchange = await this.prisma.exchangeTransaction.findUnique({
      where: { id: exchangeId },
    });
    if (!exchange) {
      this.logger.warn(`Transaction ${exchangeId} not found`);
      throw new NotFoundException('Transaction not found');
    }

    // Проверяем, может ли оставить отзыв
    if (exchange.customerId !== authorId) {
      this.logger.warn(`User ${authorId} is not the customer for transaction ${exchangeId}`);
      throw new ForbiddenException('Only Customer can leave a review');
    }
    if (!['COMPLETED', 'FINISHED', 'DISPUTED'].includes(exchange.status)) {
      this.logger.warn(`Review can only be left after COMPLETED, FINISHED or DISPUTED. Current status: ${exchange.status}`);
      throw new ConflictException('Review can only be left after COMPLETED, FINISHED or DISPUTED');
    }

    // Создаем отзыв
    await this.prisma.review.create({
      data: {
        transactionId: exchangeId,
        authorId,
        targetId: exchange.exchangerId,
        rating,
        comment: review,
      },
    });

    // Инкрементируем счетчик пропущенных офферов
    const exchanger = await this.prisma.user.update({
      where: { id: exchange.exchangerId },
      data: { missedOffersCount: { increment: 1 } },
    });

    // Если пропущено 5 офферов подряд — замораживаем Exchanger
    if (exchanger.missedOffersCount >= 5) {
      await this.prisma.user.update({
        where: { id: exchange.exchangerId },
        data: { isExchangerActive: false, isFrozen: true },
      });
      await this.kafka.sendEvent({
        type: 'exchanger.frozen',
        payload: { exchangerId: exchange.exchangerId },
      });
      this.notificationsGateway.notifyUser(exchange.exchangerId, 'exchanger.frozen', {});
      await this.auditService.createAuditLog({
        userId: exchange.exchangerId,
        action: 'FREEZE_EXCHANGER',
        entityType: 'User',
        entityId: exchange.exchangerId,
        details: JSON.stringify({ reason: 'missed offers' }),
        ipAddress: '',
      });
    }
  }

  private convertToExchangeListing(listing: any): ExchangeListing {
    return {
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      updatedAt: listing.updatedAt.toISOString(),
    };
  }

  private convertToExchangeOffer(offer: any): ExchangeOffer {
    return {
      ...offer,
      createdAt: offer.createdAt.toISOString(),
      updatedAt: offer.updatedAt.toISOString(),
    };
  }

  private convertToExchangeTransaction(transaction: any): ExchangeTransaction {
    return {
      ...transaction,
      confirmationDeadline: transaction.confirmationDeadline.toISOString(),
      createdAt: transaction.createdAt.toISOString(),
      updatedAt: transaction.updatedAt.toISOString(),
      finishedAt: transaction.finishedAt?.toISOString(),
    };
  }

  private convertToExchangerStatus(status: any): ExchangerStatus {
    return {
      exchangerId: status.userId,
      online: status.autoAcceptOffers,
      isFrozen: !status.autoAcceptOffers,
      lastActivity: status.updatedAt.toISOString(),
    };
  }

  async createListing(data: any): Promise<ExchangeListing> {
    try {
      const listing = await this.prisma.exchangeListing.create({
        data: {
          ...data,
          isActive: true,
        },
      });
      return this.convertToExchangeListing(listing);
    } catch (error) {
      this.logger.error(`Error creating listing: ${error.message}`, error.stack);
      throw error;
    }
  }

  async getListings(query: any): Promise<ExchangeListing[]> {
    try {
      const listings = await this.prisma.exchangeListing.findMany({
        where: {
          ...query,
          isActive: true,
        },
      });
      return listings.map(this.convertToExchangeListing);
    } catch (error) {
      this.logger.error(`Error getting listings: ${error.message}`, error.stack);
      throw error;
    }
  }

  async createOffer(data: any): Promise<ExchangeOffer> {
    try {
      const offer = await this.prisma.exchangeOffer.create({
        data: {
          ...data,
          status: TransactionStatus.PENDING_OFFER,
        },
      });
      return this.convertToExchangeOffer(offer);
    } catch (error) {
      this.logger.error(`Error creating offer: ${error.message}`, error.stack);
      throw error;
    }
  }

  async respondOffer(data: any): Promise<ExchangeOffer> {
    try {
      const { offerId, exchangerId, action } = data;
      const offer = await this.prisma.exchangeOffer.update({
        where: { id: offerId },
        data: {
          status: action === RespondAction.ACCEPT ? OfferStatus.ACCEPTED : OfferStatus.DECLINED,
        },
      });
      return this.convertToExchangeOffer(offer);
    } catch (error) {
      this.logger.error(`Error responding to offer: ${error.message}`, error.stack);
      throw error;
    }
  }

  async updateTransactionStatus(data: any): Promise<ExchangeTransaction> {
    try {
      const { transactionId, userId, status, paymentProof } = data;
      const transaction = await this.prisma.exchangeTransaction.update({
        where: { id: transactionId },
        data: {
          status,
          paymentProof,
          updatedAt: new Date(),
        },
      });
      return this.convertToExchangeTransaction(transaction);
    } catch (error) {
      this.logger.error(`Error updating transaction status: ${error.message}`, error.stack);
      throw error;
    }
  }

  @Cron(CronExpression.EVERY_HOUR)
  async archiveOldExchanges() {
    const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const exchanges = await this.prisma.exchangeTransaction.findMany({
      where: {
        isActive: true,
        status: { in: ['COMPLETED', 'CANCELLED', 'DECLINED', 'FINISHED'] },
        updatedAt: { lt: cutoff },
      },
    });
    for (const ex of exchanges) {
      await this.prisma.exchangeTransaction.update({
        where: { id: ex.id },
        data: { isActive: false },
      });
      await this.kafka.sendEvent({
        type: 'exchange.archived',
        payload: { exchangeId: ex.id },
      });
      this.notificationsGateway.notifyUser(ex.customerId, 'exchange.archived', { exchangeId: ex.id });
      this.notificationsGateway.notifyUser(ex.exchangerId, 'exchange.archived', { exchangeId: ex.id });
      await this.auditService.createAuditLog({
        userId: ex.customerId,
        action: 'ARCHIVE_EXCHANGE',
        entityType: 'ExchangeTransaction',
        entityId: ex.id,
        details: JSON.stringify({ reason: 'TTL' }),
        ipAddress: '',
      });
    }
  }

  async confirmPayment(data: any): Promise<ExchangeTransaction> {
    try {
      const { transactionId, exchangerId, paymentReference } = data;
      const transaction = await this.prisma.exchangeTransaction.update({
        where: { id: transactionId },
        data: {
          status: TransactionStatus.PAYMENT_CONFIRMED,
          paymentProof: paymentReference,
          updatedAt: new Date(),
        },
      });
      return this.convertToExchangeTransaction(transaction);
    } catch (error) {
      this.logger.error(`Error confirming payment: ${error.message}`, error.stack);
      throw error;
    }
  }

  async confirmReceipt(data: any): Promise<ExchangeTransaction> {
    try {
      const { transactionId, customerId } = data;
      const transaction = await this.prisma.exchangeTransaction.update({
        where: { id: transactionId },
        data: {
          status: TransactionStatus.COMPLETED,
          updatedAt: new Date(),
        },
      });
      return this.convertToExchangeTransaction(transaction);
    } catch (error) {
      this.logger.error(`Error confirming receipt: ${error.message}`, error.stack);
      throw error;
    }
  }

  async cancelTransaction(data: any): Promise<ExchangeTransaction> {
    try {
      const { transactionId, cancelledBy, reason } = data;
      const transaction = await this.prisma.exchangeTransaction.update({
        where: { id: transactionId },
        data: {
          status: TransactionStatus.CANCELLED,
          isActive: false,
          updatedAt: new Date(),
        },
      });
      return this.convertToExchangeTransaction(transaction);
    } catch (error) {
      this.logger.error(`Error cancelling transaction: ${error.message}`, error.stack);
      throw error;
    }
  }

  async setExchangerStatus(data: any): Promise<ExchangerStatus> {
    try {
      const { exchangerId, online } = data;
      const status = await this.prisma.exchangerSettings.upsert({
        where: { userId: exchangerId },
        update: { updatedAt: new Date() },
        create: {
          userId: exchangerId,
          autoAcceptOffers: false,
          updatedAt: new Date(),
        },
      });
      return this.convertToExchangerStatus(status);
    } catch (error) {
      this.logger.error(`Error setting exchanger status: ${error.message}`, error.stack);
      throw error;
    }
  }

  async freezeExchanger(data: any): Promise<ExchangerStatus> {
    try {
      const { exchangerId, reason } = data;
      const status = await this.prisma.exchangerSettings.update({
        where: { userId: exchangerId },
        data: {
          autoAcceptOffers: false,
          updatedAt: new Date(),
        },
      });
      return this.convertToExchangerStatus(status);
    } catch (error) {
      this.logger.error(`Error freezing exchanger: ${error.message}`, error.stack);
      throw error;
    }
  }

  async filterListings(filter: ExchangeListingFilterDto) {
    const where: any = {
      isActive: filter.isActive ?? true,
      ...(filter.type && { type: filter.type }),
      ...(filter.cryptocurrency && { cryptocurrency: filter.cryptocurrency }),
      ...(filter.fiatCurrency && { fiatCurrency: filter.fiatCurrency }),
      ...(filter.minRate && { rate: { gte: filter.minRate } }),
      ...(filter.maxRate && { rate: { lte: filter.maxRate } }),
      ...(filter.paymentMethods?.length && {
        paymentMethods: { hasEvery: filter.paymentMethods }
      }),
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
}








// import { Injectable } from '@nestjs/common';
// // import { Prisma, ExchangeTransaction, ExchangeListing, ExchangeOffer, TransactionStatus } from '@prisma/client';
// import { CreateExchangeListingDto, CreateExchangeOfferDto, UpdateTransactionStatusDto, ExchangeListingFilterDto } from '../dto/exchange.dto';
// // import { PrismaService } from '../../../shared/prisma.service';
// // import { KafkaService } from '../../../shared/kafka.service';
// import { KafkaService } from 'src/kafka/kafka.service';
// import { PrismaService } from 'src/prisma.service';



// @Injectable()
// export class ExchangeService {
//   constructor(
//     private prisma: PrismaService,
//     private kafka: KafkaService
//   ) {}

//   // async createListing(userId: string, dto: CreateExchangeListingDto): Promise<ExchangeListing> {
//   async createListing(userId: string, dto: CreateExchangeListingDto) {
//     // const listing = await this.prisma.exchangeListing.create({
//     //   data: {
//     //     ...dto,
//     //     userId,
//     //   },
//     // });

//     // // await this.kafka.emit('exchange.listing.created', { listing });
//     // await this.kafka.sendEvent({
//     //   type: "",
//     //   payload: {
//     //     listing
//     //   }
//     // });
//     // return listing;
//   }

//   // async createOffer(userId: string, dto: CreateExchangeOfferDto): Promise<ExchangeOffer> {
//   async createOffer(userId: string, dto: CreateExchangeOfferDto) {
//     // const listing = await this.prisma.exchangeListing.findUnique({
//     //   where: { id: dto.listingId },
//     // });

//     // if (!listing || !listing.isActive) {
//     //   throw new Error('Listing not found or inactive');
//     // }

//     // // Start transaction
//     // return this.prisma.$transaction(async (prisma) => {
//     //   // Create hold on user's balance
//     //   // await this.kafka.emit('balance.hold.create', {
//     //   //   userId,
//     //   //   amount: dto.amount,
//     //   //   type: 'EXCHANGE_OFFER',
//     //   // });
//     //   await this.kafka.sendEvent({
//     //   type: "",
//     //   payload: {
//     //     userId,
//     //     amount: dto.amount,
//     //     type: 'EXCHANGE_OFFER',
//     //   }
//     // });

//     //   // Create offer
//     //   const offer = await prisma.exchangeOffer.create({
//     //     data: {
//     //       userId,
//     //       listingId: dto.listingId,
//     //       amount: dto.amount,
//     //     },
//     //   });

//     //   // await this.kafka.emit('exchange.offer.created', { offer });
//     //   await this.kafka.sendEvent({
//     //   type: "",
//     //   payload: {
//     //     offer
//     //   }
//     // });

//     //   // Create transaction
//     //   const transaction = await prisma.exchangeTransaction.create({
//     //     data: {
//     //       type: listing.type,
//     //       status: 'PENDING_OFFER',
//     //       cryptocurrency: listing.cryptocurrency,
//     //       fiatCurrency: listing.fiatCurrency,
//     //       cryptoAmount: dto.amount,
//     //       fiatAmount: dto.amount * listing.rate,
//     //       customerId: userId,
//     //       exchangerId: listing.userId,
//     //       listingId: listing.id,
//     //       offerId: offer.id,
//     //       confirmationDeadline: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes
//     //     },
//     //   });

//     //   // await this.kafka.emit('exchange.transaction.created', { transaction });
//     //   await this.kafka.sendEvent({
//     //   type: "",
//     //   payload: {
//     //     transaction
//     //   }
//     // });

//     //   return offer;
//     // });
//   }

//   async updateTransactionStatus(
//     transactionId: string,
//     userId: string,
//     dto: UpdateTransactionStatusDto
//   // ): Promise<ExchangeTransaction> {
//   ) {
//     // const transaction = await this.prisma.exchangeTransaction.findUnique({
//     //   where: { id: transactionId },
//     //   include: { listing: true },
//     // });

//     // if (!transaction) {
//     //   throw new Error('Transaction not found');
//     // }

//     // // Validate status transition
//     // this.validateStatusTransition(transaction.status, dto.status as TransactionStatus);

//     // // Update transaction status
//     // const updatedTransaction = await this.prisma.exchangeTransaction.update({
//     //   where: { id: transactionId },
//     //   data: {
//     //     status: dto.status,
//     //     paymentProof: dto.paymentProof,
//     //     canCustomerDispute: this.calculateCustomerDisputeAbility(dto.status as TransactionStatus),
//     //     canExchangerDispute: this.calculateExchangerDisputeAbility(dto.status as TransactionStatus),
//     //   },
//     // });

//     // // await this.kafka.emit('exchange.transaction.statusChanged', {
//     // //   transaction: updatedTransaction,
//     // //   previousStatus: transaction.status,
//     // //   newStatus: dto.status,
//     // //   updatedBy: userId,
//     // // });
//     // await this.kafka.sendEvent({
//     //   type: "",
//     //   payload: {
//     //     transaction: updatedTransaction,
//     //     previousStatus: transaction.status,
//     //     newStatus: dto.status,
//     //     updatedBy: userId,
//     //   }
//     // });

//     // // Handle status-specific actions
//     // await this.handleStatusChange(updatedTransaction);

//     // return updatedTransaction;
//   }

//   // private validateStatusTransition(currentStatus: string, newStatus: TransactionStatus): void {
//   private validateStatusTransition(currentStatus: string, newStatus: any): void {
//     // const validTransitions = {
//     //   PENDING_OFFER: ['PENDING_PAYMENT', 'CANCELLED', 'DECLINED'],
//     //   PENDING_PAYMENT: ['PAYMENT_SENT', 'CANCELLED'],
//     //   PAYMENT_SENT: ['PAYMENT_CONFIRMED', 'DISPUTED'],
//     //   PAYMENT_CONFIRMED: ['COMPLETED', 'DISPUTED'],
//     //   COMPLETED: ['FINISHED'],
//     //   DISPUTED: ['COMPLETED', 'CANCELLED'],
//     // };

//     // if (!validTransitions[currentStatus]?.includes(newStatus)) {
//     //   throw new Error(`Invalid status transition from ${currentStatus} to ${newStatus}`);
//     // }
//   }

//   // private calculateCustomerDisputeAbility(status: TransactionStatus): boolean {
//   private calculateCustomerDisputeAbility(status: any) {
//     // return ['PAYMENT_SENT', 'PAYMENT_CONFIRMED'].includes(status);
//   }

//   // private calculateExchangerDisputeAbility(status: TransactionStatus): boolean {
//   private calculateExchangerDisputeAbility(status: any) {
//     // return ['PAYMENT_SENT', 'PAYMENT_CONFIRMED'].includes(status);
//   }

//   // private async handleStatusChange(transaction: ExchangeTransaction): Promise<void> {
//   private async handleStatusChange(transaction: any): Promise<void> {
//     // switch (transaction.status) {
//     //   case 'COMPLETED':
//     //     // Release crypto to buyer
//     //     // await this.kafka.emit('balance.transfer', {
//     //     //   fromUserId: transaction.exchangerId,
//     //     //   toUserId: transaction.customerId,
//     //     //   amount: transaction.cryptoAmount,
//     //     //   cryptocurrency: transaction.cryptocurrency,
//     //     // });
//     //     await this.kafka.sendEvent({
//     //       type: "",
//     //       payload: {
//     //         fromUserId: transaction.exchangerId,
//     //         toUserId: transaction.customerId,
//     //         amount: transaction.cryptoAmount,
//     //         cryptocurrency: transaction.cryptocurrency,
//     //       }
//     //     });
//     //     break;

//     //   case 'CANCELLED':
//     //   case 'DECLINED':
//     //     // Return held funds
//     //     // await this.kafka.emit('balance.hold.release', {
//     //     //   transactionId: transaction.id,
//     //     // });
//     //     await this.kafka.sendEvent({
//     //       type: "",
//     //       payload: {
//     //         transactionId: transaction.id,
//     //       }
//     //     });
//     //     break;

//     //   case 'FINISHED':
//     //     // Mark transaction as finished after 24 hours
//     //     await this.prisma.exchangeTransaction.update({
//     //       where: { id: transaction.id },
//     //       data: {
//     //         finishedAt: new Date(),
//     //         isActive: false,
//     //       },
//     //     });
//     //     // await this.kafka.emit('exchange.transaction.finished', { transaction });
//     //     await this.kafka.sendEvent({
//     //       type: "",
//     //       payload: {
//     //         transaction
//     //       }
//     //     });
//     //     break;
//     // }
//   }

//   // async getActiveExchanges(userId: string): Promise<ExchangeTransaction[]> {
//   async getActiveExchanges(userId: string) {
//     // return this.prisma.exchangeTransaction.findMany({
//     //   where: {
//     //     OR: [
//     //       { customerId: userId },
//     //       { exchangerId: userId },
//     //     ],
//     //     AND: {
//     //       isActive: true,
//     //       finishedAt: null,
//     //     },
//     //   },
//     //   include: {
//     //     listing: true,
//     //     offer: true,
//     //     customer: {
//     //       select: {
//     //         id: true,
//     //         email: true,
//     //       },
//     //     },
//     //     exchanger: {
//     //       select: {
//     //         id: true,
//     //         email: true,
//     //       },
//     //     },
//     //   },
//     // });
//   }

//   async filterListings(filter: ExchangeListingFilterDto) {
//     // // const where: Prisma.ExchangeListingWhereInput = {
//     // const where = {
//     //   isActive: true,
//     //   ...filter,
//     //   ...(filter.minRate && { rate: { gte: filter.minRate } }),
//     //   ...(filter.maxRate && { rate: { lte: filter.maxRate } }),
//     // };

//     // return this.prisma.exchangeListing.findMany({
//     //   where,
//     //   include: {
//     //     user: {
//     //       select: {
//     //         id: true,
//     //         email: true,
//     //         isExchangerActive: true,
//     //       },
//     //     },
//     //   },
//     // });
//   }
// } 