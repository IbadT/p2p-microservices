import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdateTransactionStatusDto } from '../dto/exchange.dto';


@Injectable()
export class ExchangeService {
  constructor(private readonly prisma: PrismaService) {}

  // async getActiveExchanges() {
  //   return this.prisma.$queryRaw`SELECT * FROM exchange WHERE status NOT IN ('CANCELLED', 'DECLINED', 'FINISHED') AND updatedAt > NOW() - INTERVAL 24 HOUR`;
  // }

  //   // async getActiveExchanges(userId: string): Promise<ExchangeTransaction[]> {
  async getActiveExchanges(userId: string) {
    // return this.prisma.exchangeTransaction.findMany({
    //   where: {
    //     OR: [
    //       { customerId: userId },
    //       { exchangerId: userId },
    //     ],
    //     AND: {
    //       isActive: true,
    //       finishedAt: null,
    //     },
    //   },
    //   include: {
    //     listing: true,
    //     offer: true,
    //     customer: {
    //       select: {
    //         id: true,
    //         email: true,
    //       },
    //     },
    //     exchanger: {
    //       select: {
    //         id: true,
    //         email: true,
    //       },
    //     },
    //   },
    // });
  }

  async openDispute(exchangeId: number) {
    const exchange: any = await this.prisma.$queryRaw`SELECT * FROM exchange WHERE id = ${exchangeId}`;
    if (exchange.customer.isVulnerable || exchange.exchanger.isVulnerable) {
      // Открыть спор
    }
  }

  async leaveReview(exchangeId: number, review: string) {
    const exchange: any = await this.prisma.$queryRaw`SELECT * FROM exchange WHERE id = ${exchangeId}`;
    if (exchange.customer.canLeaveReview || exchange.exchanger.canLeaveReview) {
      // Сохранить отзыв
    }
    const exchanger: any = await this.prisma.$queryRaw`SELECT * FROM exchanger WHERE id = ${exchangerId}`;
    await this.prisma.$queryRaw`UPDATE exchanger SET missedOffersCount = missedOffersCount + 1 WHERE id = ${exchangerId}`;
    if (exchanger.missedOffersCount >= 5) {
      await this.toggleExchangerActiveStatus(exchangerId);
    }
  }

  async createListing(userId: number, data: any) {
    // реализация метода
  }

  async filterListings(data: any) {
    // реализация метода
  }

  async createOffer(userId: number, data: any) {
    // реализация метода
  }

  async updateTransactionStatus(
    transactionId: string,
    userId: string,
    dto: UpdateTransactionStatusDto
  // ): Promise<ExchangeTransaction> {
  ) {
    // const transaction = await this.prisma.exchangeTransaction.findUnique({
    //   where: { id: transactionId },
    //   include: { listing: true },
    // });

    // if (!transaction) {
    //   throw new Error('Transaction not found');
    // }

    // // Validate status transition
    // this.validateStatusTransition(transaction.status, dto.status as TransactionStatus);

    // // Update transaction status
    // const updatedTransaction = await this.prisma.exchangeTransaction.update({
    //   where: { id: transactionId },
    //   data: {
    //     status: dto.status,
    //     paymentProof: dto.paymentProof,
    //     canCustomerDispute: this.calculateCustomerDisputeAbility(dto.status as TransactionStatus),
    //     canExchangerDispute: this.calculateExchangerDisputeAbility(dto.status as TransactionStatus),
    //   },
    // });
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