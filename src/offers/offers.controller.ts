import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { OffersService } from './offers.service';
import { CreateOfferRequest } from '../proto/generated/exchange.pb';

@Controller()
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @GrpcMethod('ExchangeService', 'CreateOffer')
  async createOffer(data: CreateOfferRequest) {
    return this.offersService.createOffer(data.userId, {
      listingId: data.listingId,
      amount: data.amount,
    });
  }
}