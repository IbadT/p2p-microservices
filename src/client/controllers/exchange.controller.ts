import { Controller, Get, Post, Put, Body, Param, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { User } from 'src/shared/decorators/user.decorator';
import { UserRole } from 'src/shared/decorators/roles.decorator';
import { ExchangeService } from 'src/exchange-service/src/services/exchange.service';
import { CreateDisputeDto, CreateReviewDto } from 'src/exchange-service/src/dto/exchange.dto';

@Controller('exchange')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ExchangeController {
  constructor(private readonly exchangeService: ExchangeService) {}

  @Get('active')
  async getActiveExchanges(@User('id') userId: string) {
    return this.exchangeService.getActiveExchanges(userId);
  }

  @Post('dispute')
  async createDispute(@Body() data: CreateDisputeDto) {
    return this.exchangeService.createDispute(data);
  }

  @Post('review')
  async createReview(@Body() data: CreateReviewDto) {
    return this.exchangeService.createReview(data);
  }

  @Post('exchanger/status')
  @Roles(UserRole.EXCHANGER)
  async setExchangerStatus(
    @Body() data: { exchangerId: string; online: boolean }
  ) {
    const response = await this.exchangeService.setExchangerStatus(data);
    return {
      exchangerId: response.exchangerId,
      online: response.online,
      missedOffersCount: 0,
      lastActiveAt: new Date().toISOString(),
      isFrozen: false
    };
  }

  @Get('exchanger/status/:exchangerId')
  async getExchangerStatus(
    @Param('exchangerId') exchangerId: string
  ) {
    return this.exchangeService.getExchangerStatus(exchangerId);
  }

  @Post('exchanger/freeze')
  @Roles(UserRole.MODERATOR, UserRole.ADMIN)
  async freezeExchanger(
    @Body() data: { exchangerId: string; reason: string }
  ) {
    const response = await this.exchangeService.freezeExchanger(data);
    return {
      exchangerId: response.exchangerId,
      online: false,
      missedOffersCount: 0,
      lastActiveAt: new Date().toISOString(),
      isFrozen: true
    };
  }

  @Post('exchanger/unfreeze/:exchangerId')
  @Roles(UserRole.MODERATOR, UserRole.ADMIN)
  async unfreezeExchanger(
    @Param('exchangerId') exchangerId: string
  ) {
    return this.exchangeService.unfreezeExchanger(exchangerId);
  }

  @Post('exchanger/missed-offers')
  @Roles(UserRole.EXCHANGER)
  async updateMissedOffers(
    @Body() data: { exchangerId: string; increment: boolean }
  ) {
    return this.exchangeService.updateMissedOffers(data.exchangerId, data.increment);
  }
} 