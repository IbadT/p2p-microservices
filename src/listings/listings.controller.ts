import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ListingsService } from './listings.service';
import { CreateListingRequest, GetListingsRequest } from '../proto/generated/exchange.pb';

@Controller()
export class ListingsController {
  constructor(private readonly listingsService: ListingsService) {}

  @GrpcMethod('ExchangeService', 'CreateListing')
  async createListing(data: CreateListingRequest) {
    return this.listingsService.createListing(data.userId, {
      // type: data.type, // !!!!!
      type: data.type as any,
      cryptocurrency: data.cryptocurrency,
      fiatCurrency: data.fiatCurrency,
      rate: data.rate,
      minAmount: data.minAmount,
      maxAmount: data.maxAmount,
      availableAmount: data.availableAmount,
      // paymentMethods: data.paymentMethods, // !!!!!
      paymentMethods: data.paymentMethods as any,
      terms: data.terms,
    });
  }

  @GrpcMethod('ExchangeService', 'GetListings')
  async getListings(data: GetListingsRequest) {
    const listings = await this.listingsService.filterListings({
      // type: data.type, // !!!!!
      type: data.type as any,
      cryptocurrency: data.cryptocurrency,
      fiatCurrency: data.fiatCurrency,
      minRate: data.minRate,
      maxRate: data.maxRate,
      // paymentMethods: data.paymentMethods, // !!!!!
      paymentMethods: data.paymentMethods as any,
      isActive: data.isActive,
    });
    return { listings };
  }
}