import { Controller, Get, Post, Put, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ExchangeService } from '../services/exchange.service';
import { CreateExchangeListingDto, CreateExchangeOfferDto, UpdateTransactionStatusDto, ExchangeListingFilterDto } from '../dto/exchange.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { User } from '../decorators/user.decorator';

@Controller('exchange')
@UseGuards(JwtAuthGuard)
export class ExchangeController {
  constructor(private readonly exchangeService: ExchangeService) {}

  @Post('listings')
  async createListing(
    @User('id') userId: string,
    @Body() dto: CreateExchangeListingDto
  ) {
    return this.exchangeService.createListing(userId, dto);
  }

  @Get('listings')
  async getListings(@Query() filter: ExchangeListingFilterDto) {
    return this.exchangeService.filterListings(filter);
  }

  @Post('offers')
  async createOffer(
    @User('id') userId: string,
    @Body() dto: CreateExchangeOfferDto
  ) {
    return this.exchangeService.createOffer(userId, dto);
  }

  @Put('transactions/:id/status')
  async updateTransactionStatus(
    @User('id') userId: string,
    @Param('id') transactionId: string,
    @Body() dto: UpdateTransactionStatusDto
  ) {
    return this.exchangeService.updateTransactionStatus(transactionId, userId, dto);
  }

  @Get('active')
  async getActiveExchanges(@User('id') userId: string) {
    return this.exchangeService.getActiveExchanges(userId);
  }
} 