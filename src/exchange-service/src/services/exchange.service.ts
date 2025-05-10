import { Injectable, Logger, NotFoundException, ForbiddenException, ConflictException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ExchangeListingFilterDto } from '../dto/exchange.dto';
import { Cron, CronExpression } from '@nestjs/schedule';
import { KafkaService } from 'src/kafka/kafka.service';
import { NotificationsGateway } from 'src/notifications/notifications.gateway';
import { AuditService } from 'src/audit/audit.service';
import { BalanceService } from 'src/balance/balance.service';
import { ExchangerStatus } from '../../../client/interfaces/exchange.interface';
import {
  CreateListingRequest,
  GetListingsRequest,
  CreateOfferRequest,
  RespondOfferRequest,
  UpdateTransactionStatusRequest,
  GetActiveExchangesRequest,
  ConfirmPaymentRequest,
  ConfirmReceiptRequest,
  CancelTransactionRequest,
  SetExchangerStatusRequest,
  FreezeExchangerRequest,
  ExchangeListing,
  GetListingsResponse,
  ExchangeOffer,
  RespondOfferResponse,
  ExchangeTransaction,
  GetActiveExchangesResponse,
  ConfirmPaymentResponse,
  ConfirmReceiptResponse,
  CancelTransactionResponse,
  SetExchangerStatusResponse,
  FreezeExchangerResponse,
  ExchangeType as ProtoExchangeType,
  TransactionStatus as ProtoTransactionStatus,
  RespondAction,
  Role,
} from '../../../proto/generated/exchange.pb';
import { ExchangeType, TransactionStatus, PaymentMethod, DisputeStatus, UserRole } from '@prisma/client';
import { NotificationType, OfferStatus } from 'src/client/interfaces/enums';
import { ReserveService } from './reserve.service';
import { KafkaProducerService } from '../../../kafka/kafka.producer';

@Injectable()
export class ExchangeService {
  private readonly logger = new Logger(ExchangeService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly kafka: KafkaService,
    private readonly notificationsGateway: NotificationsGateway,
    private readonly auditService: AuditService,
    private readonly balanceService: BalanceService,
    private readonly reserveService: ReserveService,
    private readonly kafkaProducer: KafkaProducerService
  ) {}

  async getUser(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        isFrozen: true,
        isExchangerActive: true,
        updatedAt: true,
        missedOffersCount: true
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async getActiveExchanges(userId: string): Promise<GetActiveExchangesResponse> {
    try {
      const transactions = await this.prisma.exchangeTransaction.findMany({
        where: {
          OR: [
            { customerId: userId },
            { exchangerId: userId },
          ],
          isActive: true,
          AND: [
            {
              OR: [
                // Show all transactions with FINISHED, CANCELLED, and DECLINED statuses regardless of age
                {
                  status: {
                    in: [
                      TransactionStatus.FINISHED,
                      TransactionStatus.CANCELLED,
                      TransactionStatus.DECLINED
                    ]
                  }
                },
                // Show all other active statuses
                {
                  status: {
                    in: [
                      TransactionStatus.PENDING,
                      TransactionStatus.ACCEPTED,
                      TransactionStatus.CRYPTO_RESERVED,
                      TransactionStatus.PAYMENT_CONFIRMED,
                      TransactionStatus.RECEIPT_CONFIRMED,
                      TransactionStatus.DISPUTE_OPEN,
                      TransactionStatus.DISPUTE_RESOLVED
                    ]
                  }
                }
              ]
            }
          ]
        },
        include: {
          listing: true,
          offer: true,
          customer: {
            select: {
              id: true,
              email: true,
              name: true,
              role: true,
              isExchangerActive: true,
              isFrozen: true,
              isActive: true
            },
          },
          exchanger: {
            select: {
              id: true,
              email: true,
              name: true,
              role: true,
              isExchangerActive: true,
              isFrozen: true,
              isActive: true
            },
          },
        },
        orderBy: {
          updatedAt: 'desc'
        }
      });
      return { transactions: transactions.map(this.convertToExchangeTransaction) };
    } catch (error) {
      this.logger.error(`Error getting active exchanges: ${error.message}`, error.stack);
      throw error;
    }
  }

  async createListing(data: CreateListingRequest): Promise<ExchangeListing> {
    try {
      const listing = await this.prisma.exchangeListing.create({
        data: {
          userId: data.userId,
          type: this.convertToDbExchangeType(data.type),
          cryptocurrency: data.cryptocurrency,
          fiatCurrency: data.fiatCurrency,
          rate: data.rate,
          minAmount: data.minAmount,
          maxAmount: data.maxAmount,
          availableAmount: data.availableAmount,
          paymentMethods: data.paymentMethods as PaymentMethod[],
          terms: data.terms,
          isActive: true,
        },
      });
      return this.convertToExchangeListing(listing);
    } catch (error) {
      this.logger.error(`Error creating listing: ${error.message}`, error.stack);
      throw error;
    }
  }

  async getListings(data: GetListingsRequest): Promise<GetListingsResponse> {
    try {
      const cutoffDate = new Date();
      cutoffDate.setHours(cutoffDate.getHours() - 24);

      const listings = await this.prisma.exchangeListing.findMany({
        where: {
          type: data.type ? this.convertToDbExchangeType(data.type) : undefined,
          cryptocurrency: data.cryptocurrency,
          fiatCurrency: data.fiatCurrency,
          rate: {
            gte: data.minRate,
            lte: data.maxRate,
          },
          paymentMethods: {
            hasSome: data.paymentMethods as PaymentMethod[],
          },
          isActive: data.isActive ?? true,
          createdAt: {
            gte: cutoffDate
          }
        },
      });
      return { listings: listings.map(this.convertToExchangeListing) };
    } catch (error) {
      this.logger.error(`Error getting listings: ${error.message}`, error.stack);
      throw error;
    }
  }

  async createOffer(data: CreateOfferRequest): Promise<ExchangeOffer> {
    try {
      const listing = await this.getListing(data.listingId);
      
      if (data.amount < listing.minAmount || data.amount > listing.maxAmount) {
        throw new ForbiddenException('Amount is outside the allowed range');
      }

      const exchanger = await this.prisma.user.findUnique({
        where: { id: listing.userId },
        include: { exchangerSettings: true }
      });

      if (!exchanger?.exchangerSettings?.workingHours) {
        throw new ForbiddenException('Exchanger is not available at this time');
      }

      const offer = await this.prisma.exchangeOffer.create({
        data: {
          userId: data.userId,
          listingId: data.listingId,
          amount: data.amount,
          status: OfferStatus.PENDING,
        },
      });
      return this.convertToExchangeOffer(offer);
    } catch (error) {
      this.logger.error(`Error creating offer: ${error.message}`, error.stack);
      throw error;
    }
  }

  async respondOffer(data: RespondOfferRequest): Promise<RespondOfferResponse> {
    try {
      const offer = await this.prisma.exchangeOffer.findUnique({
        where: { id: data.offerId },
        include: { listing: true },
      });

      if (!offer) {
        throw new NotFoundException('Offer not found');
      }

      if (offer.listing.userId !== data.exchangerId) {
        throw new ForbiddenException('Only listing owner can respond to offer');
      }

      const status = data.action === RespondAction.ACCEPT ? TransactionStatus.ACCEPTED : TransactionStatus.CANCELLED;
      
      const updatedOffer = await this.prisma.exchangeOffer.update({
        where: { id: data.offerId },
        data: { status },
      });

      await this.prisma.exchangeTransaction.update({
        where: { offerId: data.offerId },
        data: { status },
      });

      const offerStatus = status === TransactionStatus.ACCEPTED ? OfferStatus.ACCEPTED : OfferStatus.REJECTED;
      return {
        offerId: updatedOffer.id,
        status: this.convertOfferStatusToTransactionStatus(offerStatus),
        message: status === TransactionStatus.ACCEPTED ? 'Offer accepted' : 'Offer declined',
      };
    } catch (error) {
      this.logger.error(`Error responding to offer: ${error.message}`, error.stack);
      throw error;
    }
  }

  async updateTransactionStatus(data: UpdateTransactionStatusRequest): Promise<ExchangeTransaction> {
    try {
      const transaction = await this.prisma.exchangeTransaction.update({
        where: { id: data.transactionId },
        data: {
          status: this.convertToDbTransactionStatus(data.status),
          paymentProof: data.paymentProof,
        },
      });
      return this.convertToExchangeTransaction(transaction);
    } catch (error) {
      this.logger.error(`Error updating transaction status: ${error.message}`, error.stack);
      throw error;
    }
  }

  async confirmPayment(data: ConfirmPaymentRequest): Promise<ConfirmPaymentResponse> {
    try {
      const transaction = await this.prisma.exchangeTransaction.findUnique({
        where: { id: data.transactionId },
      });

      if (!transaction) {
        throw new NotFoundException('Transaction not found');
      }

      if (transaction.exchangerId !== data.exchangerId) {
        throw new ForbiddenException('Only exchanger can confirm payment');
      }

      const updatedTransaction = await this.prisma.exchangeTransaction.update({
        where: { id: data.transactionId },
        data: {
          status: TransactionStatus.PAYMENT_CONFIRMED,
          paymentProof: data.paymentReference,
        },
      });

      return {
        transactionId: updatedTransaction.id,
        status: ProtoTransactionStatus.PAYMENT_CONFIRMED,
        message: 'Payment confirmed',
      };
    } catch (error) {
      this.logger.error(`Error confirming payment: ${error.message}`, error.stack);
      throw error;
    }
  }

  async confirmReceipt(data: ConfirmReceiptRequest): Promise<ConfirmReceiptResponse> {
    try {
      const transaction = await this.prisma.exchangeTransaction.findUnique({
        where: { id: data.transactionId },
      });

      if (!transaction) {
        throw new NotFoundException('Transaction not found');
      }

      if (transaction.customerId !== data.customerId) {
        throw new ForbiddenException('Only customer can confirm receipt');
      }

      const updatedTransaction = await this.prisma.exchangeTransaction.update({
        where: { id: data.transactionId },
        data: {
          status: TransactionStatus.FINISHED,
          finishedAt: new Date(),
        },
      });

      return {
        transactionId: updatedTransaction.id,
        status: ProtoTransactionStatus.RECEIPT_CONFIRMED,
        message: 'Receipt confirmed',
      };
    } catch (error) {
      this.logger.error(`Error confirming receipt: ${error.message}`, error.stack);
      throw error;
    }
  }

  async cancelTransaction(data: CancelTransactionRequest): Promise<CancelTransactionResponse> {
    try {
      const transaction = await this.prisma.exchangeTransaction.findUnique({
        where: { id: data.transactionId },
      });

      if (!transaction) {
        throw new NotFoundException('Transaction not found');
      }

      const updatedTransaction = await this.prisma.exchangeTransaction.update({
        where: { id: data.transactionId },
        data: {
          status: TransactionStatus.CANCELLED,
          finishedAt: new Date(),
        },
      });

      return {
        transactionId: updatedTransaction.id,
        status: ProtoTransactionStatus.CANCELLED,
        message: `Transaction cancelled by ${data.cancelledBy}: ${data.reason}`,
      };
    } catch (error) {
      this.logger.error(`Error cancelling transaction: ${error.message}`, error.stack);
      throw error;
    }
  }

  async setExchangerStatus(data: SetExchangerStatusRequest): Promise<SetExchangerStatusResponse> {
    try {
      const user = await this.prisma.user.update({
        where: { id: data.exchangerId },
        data: { isExchangerActive: data.online }
      });

      return {
        exchangerId: user.id,
        online: user.isExchangerActive,
        message: `Exchanger status updated to ${data.online ? 'online' : 'offline'}`
      };
    } catch (error) {
      this.logger.error(`Error setting exchanger status: ${error.message}`, error.stack);
      throw error;
    }
  }

  async freezeExchanger(data: FreezeExchangerRequest): Promise<FreezeExchangerResponse> {
    try {
      // Start transaction
      const result = await this.prisma.$transaction(async (prisma) => {
        // Freeze exchanger
        const user = await prisma.user.update({
          where: { id: data.exchangerId },
          data: {
            isFrozen: true,
            isExchangerActive: false,
          },
        });

        // Deactivate all listings
        await prisma.exchangeListing.updateMany({
          where: { userId: data.exchangerId },
          data: { isActive: false }
        });

        return user;
      });

      // Notify moderators
      await this.kafka.sendEvent({
        type: NotificationType.SECURITY,
        payload: { exchangerId: data.exchangerId, reason: data.reason },
      });

      this.notificationsGateway.notifyUser(data.exchangerId, NotificationType.SECURITY, {
        reason: data.reason,
      });

      await this.auditService.createAuditLog({
        userId: data.exchangerId,
        action: 'FREEZE_EXCHANGER',
        entityType: 'User',
        entityId: data.exchangerId,
        metadata: { reason: data.reason }
      });

      return {
        exchangerId: result.id,
        isFrozen: result.isFrozen,
        message: `Exchanger frozen: ${data.reason}`,
      };
    } catch (error) {
      this.logger.error(`Error freezing exchanger: ${error.message}`, error.stack);
      throw error;
    }
  }

  async freezeCustomerCrypto(userId: string, amount: number) {
    const listing = await this.prisma.exchangeListing.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });

    if (!listing) {
      throw new Error('No active listing found');
    }

    await this.balanceService.createHold(
      userId,
      listing.cryptocurrency,
      amount,
      'EXCHANGE_OFFER'
    );
  }

  private convertToExchangeListing(listing: any): ExchangeListing {
    return {
      id: listing.id,
      type: this.convertToProtoExchangeType(listing.type),
      cryptocurrency: listing.cryptocurrency,
      fiatCurrency: listing.fiatCurrency,
      rate: listing.rate,
      minAmount: listing.minAmount,
      maxAmount: listing.maxAmount,
      availableAmount: listing.availableAmount,
      paymentMethods: listing.paymentMethods,
      terms: listing.terms,
      userId: listing.userId,
      isActive: listing.isActive,
      createdAt: listing.createdAt.toISOString(),
      updatedAt: listing.updatedAt.toISOString(),
    };
  }

  private convertToExchangeOffer(offer: any): ExchangeOffer {
    return {
      id: offer.id,
      amount: offer.amount,
      status: this.convertOfferStatusToTransactionStatus(offer.status),
      userId: offer.userId,
      listingId: offer.listingId,
      createdAt: offer.createdAt.toISOString(),
      updatedAt: offer.updatedAt.toISOString(),
    };
  }

  private convertToExchangeTransaction(transaction: any): ExchangeTransaction {
    return {
      id: transaction.id,
      type: this.convertToProtoExchangeType(transaction.type),
      status: this.convertToProtoTransactionStatus(transaction.status),
      cryptocurrency: transaction.cryptocurrency,
      fiatCurrency: transaction.fiatCurrency,
      cryptoAmount: transaction.cryptoAmount,
      fiatAmount: transaction.fiatAmount,
      paymentProof: transaction.paymentProof,
      disputeId: transaction.disputeId,
      confirmationDeadline: transaction.confirmationDeadline?.toISOString() ?? '',
      canCustomerDispute: transaction.canCustomerDispute,
      canExchangerDispute: transaction.canExchangerDispute,
      isActive: transaction.isActive,
      customerId: transaction.customerId,
      exchangerId: transaction.exchangerId,
      listingId: transaction.listingId,
      offerId: transaction.offerId,
      createdAt: transaction.createdAt.toISOString(),
      updatedAt: transaction.updatedAt.toISOString(),
      finishedAt: transaction.finishedAt?.toISOString(),
    };
  }

  private convertToProtoExchangeType(type: ExchangeType): ProtoExchangeType {
    switch (type) {
      case ExchangeType.CRYPTO_TO_FIAT:
        return ProtoExchangeType.CRYPTO_TO_FIAT;
      case ExchangeType.FIAT_TO_CRYPTO:
        return ProtoExchangeType.FIAT_TO_CRYPTO;
      default:
        return ProtoExchangeType.UNRECOGNIZED;
    }
  }

  private convertToDbExchangeType(type: ProtoExchangeType): ExchangeType {
    switch (type) {
      case ProtoExchangeType.CRYPTO_TO_FIAT:
        return ExchangeType.CRYPTO_TO_FIAT;
      case ProtoExchangeType.FIAT_TO_CRYPTO:
        return ExchangeType.FIAT_TO_CRYPTO;
      default:
        throw new Error('Invalid exchange type');
    }
  }

  private convertToProtoTransactionStatus(status: TransactionStatus): ProtoTransactionStatus {
    switch (status) {
      case TransactionStatus.PENDING:
        return ProtoTransactionStatus.PENDING;
      case TransactionStatus.ACCEPTED:
        return ProtoTransactionStatus.ACTIVE;
      case TransactionStatus.PAYMENT_CONFIRMED:
        return ProtoTransactionStatus.PAYMENT_CONFIRMED;
      case TransactionStatus.RECEIPT_CONFIRMED:
        return ProtoTransactionStatus.RECEIPT_CONFIRMED;
      case TransactionStatus.FINISHED:
        return ProtoTransactionStatus.FINISHED;
      case TransactionStatus.CANCELLED:
        return ProtoTransactionStatus.CANCELLED;
      case TransactionStatus.DISPUTE_OPEN:
        return ProtoTransactionStatus.DISPUTE_OPEN;
      case TransactionStatus.DISPUTE_RESOLVED:
        return ProtoTransactionStatus.DISPUTE_RESOLVED;
      default:
        return ProtoTransactionStatus.UNRECOGNIZED;
    }
  }

  private convertToDbTransactionStatus(status: ProtoTransactionStatus): TransactionStatus {
    switch (status) {
      case ProtoTransactionStatus.PENDING:
        return TransactionStatus.PENDING;
      case ProtoTransactionStatus.ACTIVE:
        return TransactionStatus.ACCEPTED;
      case ProtoTransactionStatus.PAYMENT_CONFIRMED:
        return TransactionStatus.PAYMENT_CONFIRMED;
      case ProtoTransactionStatus.RECEIPT_CONFIRMED:
        return TransactionStatus.RECEIPT_CONFIRMED;
      case ProtoTransactionStatus.FINISHED:
        return TransactionStatus.FINISHED;
      case ProtoTransactionStatus.CANCELLED:
        return TransactionStatus.CANCELLED;
      case ProtoTransactionStatus.DISPUTE_OPEN:
        return TransactionStatus.DISPUTE_OPEN;
      case ProtoTransactionStatus.DISPUTE_RESOLVED:
        return TransactionStatus.DISPUTE_RESOLVED;
      default:
        throw new Error('Invalid transaction status');
    }
  }

  private convertOfferStatusToTransactionStatus(status: OfferStatus): ProtoTransactionStatus {
    switch (status) {
      case OfferStatus.PENDING:
        return ProtoTransactionStatus.PENDING;
      case OfferStatus.ACCEPTED:
        return ProtoTransactionStatus.ACTIVE;
      case OfferStatus.REJECTED:
        return ProtoTransactionStatus.DECLINED;
      case OfferStatus.EXPIRED:
        return ProtoTransactionStatus.CANCELLED;
      default:
        return ProtoTransactionStatus.UNRECOGNIZED;
    }
  }

  @Cron(CronExpression.EVERY_HOUR)
  async archiveOldExchanges() {
    const cutoffDate = new Date();
    cutoffDate.setHours(cutoffDate.getHours() - 24);

    await this.prisma.exchangeTransaction.updateMany({
      where: {
        status: {
          in: [TransactionStatus.CANCELLED, TransactionStatus.CANCELLED, TransactionStatus.FINISHED],
        },
        updatedAt: {
          lt: cutoffDate,
        },
      },
      data: {
        isActive: false,
      },
    });
  }

  async getListing(listingId: string) {
    const listing = await this.prisma.exchangeListing.findUnique({
      where: { id: listingId }
    });
    if (!listing) {
      throw new NotFoundException('Listing not found');
    }
    return this.convertToExchangeListing(listing);
  }

  async getOffer(offerId: string) {
    const offer = await this.prisma.exchangeOffer.findUnique({
      where: { id: offerId }
    });
    if (!offer) {
      throw new NotFoundException('Offer not found');
    }
    return offer;
  }

  async unfreezeCustomerCrypto(userId: string, amount: number) {
    const listing = await this.prisma.exchangeListing.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });

    if (!listing) {
      throw new Error('No active listing found');
    }

    const hold = await this.prisma.balanceHold.findFirst({
      where: {
        userId,
        cryptocurrency: listing.cryptocurrency,
        type: 'EXCHANGE_OFFER',
        amount
      }
    });

    if (hold) {
      await this.balanceService.releaseHold(hold.id);
    }
  }

  async archiveTransaction(transactionId: string) {
    await this.prisma.exchangeTransaction.update({
      where: { id: transactionId },
      data: { isActive: false }
    });
  }

  async getTransaction(transactionId: string) {
    const transaction = await this.prisma.exchangeTransaction.findUnique({
      where: { id: transactionId }
    });
    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }
    return this.convertToExchangeTransaction(transaction);
  }

  async freezeExchangerCrypto(exchangerId: string, amount: number) {
    const listing = await this.prisma.exchangeListing.findFirst({
      where: { userId: exchangerId },
      orderBy: { createdAt: 'desc' }
    });

    if (!listing) {
      throw new Error('No active listing found');
    }

    await this.balanceService.createHold(
      exchangerId,
      listing.cryptocurrency,
      amount,
      'EXCHANGE_OFFER'
    );
  }

  async unfreezeExchangerCrypto(exchangerId: string, amount: number) {
    const listing = await this.prisma.exchangeListing.findFirst({
      where: { userId: exchangerId },
      orderBy: { createdAt: 'desc' }
    });

    if (!listing) {
      throw new Error('No active listing found');
    }

    const hold = await this.prisma.balanceHold.findFirst({
      where: {
        userId: exchangerId,
        cryptocurrency: listing.cryptocurrency,
        type: 'EXCHANGE_OFFER',
        amount
      }
    });

    if (hold) {
      await this.balanceService.releaseHold(hold.id);
    }
  }

  async notifyModerators(data: { type: string; exchangerId: string; reason: string }) {
    await this.kafkaProducer.sendMessage('exchanges', {
      type: 'SECURITY',
      data,
      timestamp: new Date().toISOString()
    });
  }

  async createDispute(data: { 
    transactionId: string; 
    initiatorId: string; 
    reason: string;
    initiatorRole: 'CUSTOMER' | 'EXCHANGER';
  }) {
    const transaction = await this.getTransaction(data.transactionId);
    
    // Check if transaction is eligible for dispute
    const lastUpdate = new Date(transaction.updatedAt);
    const hoursSinceUpdate = (Date.now() - lastUpdate.getTime()) / (1000 * 60 * 60);
    
    const dbStatus = this.convertToDbTransactionStatus(transaction.status);
    if (hoursSinceUpdate < 24 && dbStatus !== TransactionStatus.DISPUTE_OPEN) {
      throw new ForbiddenException('Transaction cannot be disputed yet');
    }

    const dispute = await this.prisma.dispute.create({
      data: {
        transactionId: data.transactionId,
        initiatorId: data.initiatorId,
        reason: data.reason,
        status: DisputeStatus.OPEN,
      },
    });

    // Update transaction status
    await this.prisma.exchangeTransaction.update({
      where: { id: data.transactionId },
      data: { status: TransactionStatus.DISPUTE_OPEN }
    });

    // Notify moderators
    await this.notifyModerators({
      type: NotificationType.SECURITY,
      exchangerId: transaction.exchangerId,
      reason: data.reason
    });

    return dispute;
  }

  async createReview(data: {
    transactionId: string;
    authorId: string;
    rating: number;
    comment?: string;
  }) {
    const transaction = await this.getTransaction(data.transactionId);
    
    // Check if user is customer
    const user = await this.prisma.user.findUnique({
      where: { id: data.authorId }
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.role !== UserRole.CUSTOMER) {
      throw new ForbiddenException('Only customers can leave reviews');
    }

    // Check if transaction is finished or disputed
    const dbStatus = this.convertToDbTransactionStatus(transaction.status);
    if (dbStatus !== TransactionStatus.FINISHED && 
        dbStatus !== TransactionStatus.DISPUTE_OPEN) {
      throw new ForbiddenException('Can only review finished or disputed transactions');
    }

    const review = await this.prisma.review.create({
      data: {
        transactionId: data.transactionId,
        authorId: data.authorId,
        targetId: transaction.exchangerId,
        rating: data.rating,
        comment: data.comment,
      },
    });

    return review;
  }

  async updateMissedOffers(exchangerId: string, increment: boolean): Promise<ExchangerStatus> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: exchangerId },
        select: {
          id: true,
          isExchangerActive: true,
          updatedAt: true,
          isFrozen: true,
          missedOffersCount: true
        }
      });

      if (!user) {
        throw new NotFoundException('Exchanger not found');
      }

      // Обновляем счетчик пропущенных офферов
      const newMissedOffersCount = increment ? user.missedOffersCount + 1 : 0;
      
      // Проверяем, нужно ли заморозить exchanger'а
      const shouldFreeze = newMissedOffersCount >= 5;

      // Обновляем статус пользователя
      const updatedUser = await this.prisma.user.update({
        where: { id: exchangerId },
        data: {
          missedOffersCount: newMissedOffersCount,
          isFrozen: shouldFreeze,
          frozenUntil: shouldFreeze ? new Date(Date.now() + 24 * 60 * 60 * 1000) : null // Заморозка на 24 часа
        }
      });

      // Если exchanger заморожен, деактивируем все его активные листинги
      if (shouldFreeze) {
        await this.prisma.exchangeListing.updateMany({
          where: {
            userId: exchangerId,
            isActive: true
          },
          data: {
            isActive: false
          }
        });

        // Отправляем уведомление
        await this.notificationsGateway.notifyUser(
          exchangerId,
          NotificationType.EXCHANGER_FROZEN,
          {
            message: 'Your account has been frozen due to missing 5 offers in a row',
            duration: '24 hours'
          }
        );
      }

      return {
        exchangerId: updatedUser.id,
        online: updatedUser.isExchangerActive,
        missedOffersCount: updatedUser.missedOffersCount,
        lastActiveAt: updatedUser.updatedAt.toISOString(),
        isFrozen: updatedUser.isFrozen
      };
    } catch (error) {
      this.logger.error(`Error updating missed offers: ${error.message}`, error.stack);
      throw error;
    }
  }

  async getExchangerStatus(exchangerId: string): Promise<ExchangerStatus> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: exchangerId },
        select: {
          id: true,
          isExchangerActive: true,
          updatedAt: true,
          isFrozen: true,
          missedOffersCount: true
        }
      });

      if (!user) {
        throw new NotFoundException('Exchanger not found');
      }

      return {
        exchangerId: user.id,
        online: user.isExchangerActive,
        lastActiveAt: user.updatedAt.toISOString(),
        isFrozen: user.isFrozen,
        missedOffersCount: user.missedOffersCount
      };
    } catch (error) {
      this.logger.error(`Error getting exchanger status: ${error.message}`, error.stack);
      throw error;
    }
  }

  async unfreezeExchanger(exchangerId: string): Promise<ExchangerStatus> {
    try {
      const user = await this.prisma.user.update({
        where: { id: exchangerId },
        data: {
          isFrozen: false
        },
        select: {
          id: true,
          isExchangerActive: true,
          updatedAt: true,
          isFrozen: true,
          missedOffersCount: true
        }
      });

      // Notify moderators
      await this.kafka.sendEvent({
        type: NotificationType.SECURITY,
        payload: { exchangerId, action: 'UNFREEZE' }
      });

      await this.auditService.createAuditLog({
        userId: exchangerId,
        action: 'UNFREEZE_EXCHANGER',
        entityType: 'User',
        entityId: exchangerId
      });

      return {
        exchangerId: user.id,
        online: user.isExchangerActive,
        lastActiveAt: user.updatedAt.toISOString(),
        isFrozen: user.isFrozen,
        missedOffersCount: user.missedOffersCount
      };
    } catch (error) {
      this.logger.error(`Error unfreezing exchanger: ${error.message}`, error.stack);
      throw error;
    }
  }

  async acceptOffer(transactionId: string) {
    const transaction = await this.prisma.exchangeTransaction.findUnique({
      where: { id: transactionId },
      include: {
        listing: true
      }
    });

    if (!transaction) {
      throw new BadRequestException('Transaction not found');
    }

    if (transaction.status !== TransactionStatus.PENDING) {
      throw new BadRequestException('Transaction is not in pending state');
    }

    // Для Fiat2Crypto резервируем криптовалюту
    if (transaction.listing.type === ExchangeType.FIAT_TO_CRYPTO) {
      await this.reserveService.reserveCryptocurrency(transactionId);
    } else {
      // Для других типов просто обновляем статус
      await this.prisma.exchangeTransaction.update({
        where: { id: transactionId },
        data: {
          status: TransactionStatus.ACCEPTED,
          updatedAt: new Date()
        }
      });
    }

    return { success: true, message: 'Offer accepted successfully' };
  }

  async rejectOffer(transactionId: string) {
    const transaction = await this.prisma.exchangeTransaction.findUnique({
      where: { id: transactionId },
      include: {
        listing: true
      }
    });

    if (!transaction) {
      throw new BadRequestException('Transaction not found');
    }

    if (transaction.status !== TransactionStatus.PENDING && 
        transaction.status !== TransactionStatus.CRYPTO_RESERVED) {
      throw new BadRequestException('Transaction cannot be rejected in current state');
    }

    // Если была зарезервирована криптовалюта, освобождаем её
    if (transaction.status === TransactionStatus.CRYPTO_RESERVED) {
      await this.reserveService.releaseReservation(transactionId);
    } else {
      // Иначе просто обновляем статус
      await this.prisma.exchangeTransaction.update({
        where: { id: transactionId },
        data: {
          status: TransactionStatus.CANCELLED,
          updatedAt: new Date()
        }
      });
    }

    return { success: true, message: 'Offer rejected successfully' };
  }
} 