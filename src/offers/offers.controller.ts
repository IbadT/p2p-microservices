import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateOfferRequest } from '../proto/generated/exchange.pb';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  async createOffer(@Body() dto: CreateOfferDto) {
    // Холд средств + создание оффера
  }

  @Post(':id/accept')
  acceptOffer(@Param('id') id: string) {
    // Запуск 30-минутного таймера
  }

  @Post(':id/decline')
  declineOffer(@Param('id') id: string) { ... }

  @Get(':id/time-left')
  getOfferTimeLeft(@Param('id') id: string) { ... }

  @GrpcMethod('ExchangeService', 'CreateOffer')
  async createOfferGrpc(data: CreateOfferRequest) {
    return this.offersService.createOffer(data.userId, {
      listingId: data.listingId,
      amount: data.amount,
    });
  }
}