import { Controller, Get, Post, Put, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ExchangeService } from '../services/exchange.service';
import { CreateDisputeDto, CreateReviewDto } from '../dto/exchange.dto';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { ExchangerStatus } from '../../../client/interfaces/exchange.interface';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { UserRole } from 'src/shared/decorators/roles.decorator';

@Controller('exchange')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ExchangeController {
  constructor(private readonly exchangeService: ExchangeService) {}

  @Get('active')
  async getActiveExchanges(@Param('user_id') userId: string) {
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
  ): Promise<ExchangerStatus> {
    return this.exchangeService.getExchangerStatus(exchangerId);
  }

  @Post('exchanger/freeze')
  @Roles(UserRole.MODERATOR, UserRole.ADMIN)
  async freezeExchanger(
    @Body() data: { exchangerId: string; reason: string }
  ): Promise<ExchangerStatus> {
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
  ): Promise<ExchangerStatus> {
    return this.exchangeService.unfreezeExchanger(exchangerId);
  }

  @Post('exchanger/missed-offers')
  @Roles(UserRole.EXCHANGER)
  async updateMissedOffers(
    @Body() data: { exchangerId: string; increment: boolean }
  ): Promise<ExchangerStatus> {
    return this.exchangeService.updateMissedOffers(data.exchangerId, data.increment);
  }
}





// import { Controller, Get, Post, Put, Body, Param, Query, UseGuards } from '@nestjs/common';
// import { ExchangeService } from '../services/exchange.service';
// import { CreateExchangeListingDto, CreateExchangeOfferDto, UpdateTransactionStatusDto, ExchangeListingFilterDto } from '../dto/exchange.dto';
// // import { JwtAuthGuard } from '../guards/jwt-auth.guard';
// import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
// // import { User } from '../decorators/user.decorator';
// import { User } from 'src/shared/decorators/user.decorator';

// @Controller('exchange')
// @UseGuards(JwtAuthGuard)
// export class ExchangeController {
//   constructor(private readonly exchangeService: ExchangeService) {}

//   @Post('listings')
//   async createListing(
//     @User('id') userId: string,
//     @Body() dto: CreateExchangeListingDto
//   ) {
//     return this.exchangeService.createListing(userId, dto);
//   }

//   @Get('listings')
//   async getListings(@Query() filter: ExchangeListingFilterDto) {
//     return this.exchangeService.filterListings(filter);
//   }

//   @Post('offers')
//   async createOffer(
//     @User('id') userId: string,
//     @Body() dto: CreateExchangeOfferDto
//   ) {
//     return this.exchangeService.createOffer(userId, dto);
//   }

//   @Put('transactions/:id/status')
//   async updateTransactionStatus(
//     @User('id') userId: string,
//     @Param('id') transactionId: string,
//     @Body() dto: UpdateTransactionStatusDto
//   ) {
//     return this.exchangeService.updateTransactionStatus(transactionId, userId, dto);
//   }

//   @Get('active')
//   async getActiveExchanges(@User('id') userId: string) {
//     return this.exchangeService.getActiveExchanges(userId);
//   }
// } 