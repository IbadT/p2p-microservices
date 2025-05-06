import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ExchangeService } from '../services/exchange.service';
import { Logger } from '@nestjs/common';
import { GrpcError } from '../../../client/interfaces/grpc.interfaces';
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
  FreezeExchangerRequest
} from '../../../proto/generated/exchange.pb';
import { Listing, Offer, Transaction } from '../interfaces/exchange.interface';
import { ExchangeType, PaymentMethod, TransactionStatus, OfferStatus } from '@prisma/client';

@Controller()
export class ExchangeGrpcController {
  private readonly logger = new Logger(ExchangeGrpcController.name);

  constructor(private readonly exchangeService: ExchangeService) {}

  @GrpcMethod('ExchangeService', 'CreateListing')
  async createListing(data: CreateListingRequest): Promise<Listing> {
    try {
      const listing = await this.exchangeService.createListing(data.userId, {
        type: data.type as ExchangeType,
        cryptocurrency: data.cryptocurrency,
        fiatCurrency: data.fiatCurrency,
        rate: data.rate,
        minAmount: data.minAmount,
        maxAmount: data.maxAmount,
        availableAmount: data.availableAmount,
        paymentMethods: data.paymentMethods as PaymentMethod[],
        terms: data.terms,
      });
      return listing as unknown as Listing;
    } catch (error) {
      this.logger.error(`Failed to create listing: ${error.message}`, error.stack);
      throw new GrpcError(error.message, 'INTERNAL');
    }
  }

  @GrpcMethod('ExchangeService', 'GetListings')
  async getListings(data: GetListingsRequest): Promise<{ listings: Listing[] }> {
    try {
      const listings = await this.exchangeService.filterListings({
        type: data.type as ExchangeType,
        cryptocurrency: data.cryptocurrency,
        fiatCurrency: data.fiatCurrency,
        minRate: data.minRate,
        maxRate: data.maxRate,
        paymentMethods: data.paymentMethods as PaymentMethod[],
        isActive: data.isActive,
      });
      return { listings: listings as unknown as Listing[] };
    } catch (error) {
      this.logger.error(`Failed to get listings: ${error.message}`, error.stack);
      throw new GrpcError(error.message, 'INTERNAL');
    }
  }

  @GrpcMethod('ExchangeService', 'CreateOffer')
  async createOffer(data: CreateOfferRequest): Promise<Offer> {
    try {
      const offer = await this.exchangeService.createOffer(data.userId, {
        listingId: data.listingId,
        amount: data.amount,
      });
      return offer as unknown as Offer;
    } catch (error) {
      this.logger.error(`Failed to create offer: ${error.message}`, error.stack);
      throw new GrpcError(error.message, 'INTERNAL');
    }
  }

  @GrpcMethod('ExchangeService', 'RespondOffer')
  async respondOffer(data: RespondOfferRequest) {
    try {
      return await this.exchangeService.respondOffer(data);
    } catch (error) {
      this.logger.error(`Error in respondOffer: ${error.message}`, error.stack);
      throw new GrpcError(error.message, 'INTERNAL');
    }
  }

  @GrpcMethod('ExchangeService', 'UpdateTransactionStatus')
  async updateTransactionStatus(data: UpdateTransactionStatusRequest): Promise<Transaction> {
    try {
      const transaction = await this.exchangeService.updateTransactionStatus(
        data.transactionId,
        data.userId,
        {
          status: data.status as TransactionStatus,
          paymentProof: data.paymentProof,
        },
      );
      return transaction as unknown as Transaction;
    } catch (error) {
      this.logger.error(`Failed to update transaction status: ${error.message}`, error.stack);
      throw new GrpcError(error.message, 'INTERNAL');
    }
  }

  @GrpcMethod('ExchangeService', 'GetActiveExchanges')
  async getActiveExchanges(data: GetActiveExchangesRequest): Promise<{ transactions: Transaction[] }> {
    try {
      const transactions = await this.exchangeService.getActiveExchanges(data.userId);
      return { transactions: transactions as unknown as Transaction[] };
    } catch (error) {
      this.logger.error(`Failed to get active exchanges: ${error.message}`, error.stack);
      throw new GrpcError(error.message, 'INTERNAL');
    }
  }

  @GrpcMethod('ExchangeService', 'ConfirmPayment')
  async confirmPayment(data: ConfirmPaymentRequest) {
    try {
      return await this.exchangeService.confirmPayment(data);
    } catch (error) {
      this.logger.error(`Error in confirmPayment: ${error.message}`, error.stack);
      throw new GrpcError(error.message, 'INTERNAL');
    }
  }

  @GrpcMethod('ExchangeService', 'ConfirmReceipt')
  async confirmReceipt(data: ConfirmReceiptRequest) {
    try {
      return await this.exchangeService.confirmReceipt(data);
    } catch (error) {
      this.logger.error(`Error in confirmReceipt: ${error.message}`, error.stack);
      throw new GrpcError(error.message, 'INTERNAL');
    }
  }

  @GrpcMethod('ExchangeService', 'CancelTransaction')
  async cancelTransaction(data: CancelTransactionRequest) {
    try {
      return await this.exchangeService.cancelTransaction(data);
    } catch (error) {
      this.logger.error(`Error in cancelTransaction: ${error.message}`, error.stack);
      throw new GrpcError(error.message, 'INTERNAL');
    }
  }

  @GrpcMethod('ExchangeService', 'SetExchangerStatus')
  async setExchangerStatus(data: SetExchangerStatusRequest) {
    try {
      return await this.exchangeService.setExchangerStatus(data);
    } catch (error) {
      this.logger.error(`Error in setExchangerStatus: ${error.message}`, error.stack);
      throw new GrpcError(error.message, 'INTERNAL');
    }
  }

  @GrpcMethod('ExchangeService', 'FreezeExchanger')
  async freezeExchanger(data: FreezeExchangerRequest) {
    try {
      return await this.exchangeService.freezeExchanger(data);
    } catch (error) {
      this.logger.error(`Error in freezeExchanger: ${error.message}`, error.stack);
      throw new GrpcError(error.message, 'INTERNAL');
    }
  }
} 