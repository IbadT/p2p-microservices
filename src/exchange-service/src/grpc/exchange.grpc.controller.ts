import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ExchangeService } from '../services/exchange.service';

@Controller()
export class ExchangeGrpcController {
  constructor(private readonly exchangeService: ExchangeService) {}

  @GrpcMethod('ExchangeService', 'CreateListing')
  async createListing(data: any) {
    const listing = await this.exchangeService.createListing(data.userId, {
      type: data.type,
      cryptocurrency: data.cryptocurrency,
      fiatCurrency: data.fiatCurrency,
      rate: data.rate,
      minAmount: data.minAmount,
      maxAmount: data.maxAmount,
      availableAmount: data.availableAmount,
      paymentMethods: data.paymentMethods,
      terms: data.terms,
    });
    return listing;
  }

  @GrpcMethod('ExchangeService', 'GetListings')
  async getListings(data: any) {
    const listings = await this.exchangeService.filterListings({
      type: data.type,
      cryptocurrency: data.cryptocurrency,
      fiatCurrency: data.fiatCurrency,
      minRate: data.minRate,
      maxRate: data.maxRate,
      paymentMethods: data.paymentMethods,
      isActive: data.isActive,
    });
    return { listings };
  }

  @GrpcMethod('ExchangeService', 'CreateOffer')
  async createOffer(data: any) {
    const offer = await this.exchangeService.createOffer(data.userId, {
      listingId: data.listingId,
      amount: data.amount,
    });
    return offer;
  }

  @GrpcMethod('ExchangeService', 'UpdateTransactionStatus')
  async updateTransactionStatus(data: any) {
    const transaction = await this.exchangeService.updateTransactionStatus(
      data.transactionId,
      data.userId,
      {
        status: data.status,
        paymentProof: data.paymentProof,
      },
    );
    return transaction;
  }

  @GrpcMethod('ExchangeService', 'GetActiveExchanges')
  async getActiveExchanges(data: any) {
    const transactions = await this.exchangeService.getActiveExchanges(data.userId);
    return { transactions };
  }
} 