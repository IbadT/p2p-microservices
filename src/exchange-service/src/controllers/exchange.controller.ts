// import { Controller, Get, Post, Put, Body, Param, Query } from '@nestjs/common';
// import { ExchangeService } from '../services/exchange.service';

// @Controller('exchange')
// export class ExchangeController {
//   constructor(private readonly exchangeService: ExchangeService) {}

//   @Get('active')
//   async getActiveExchanges(@Param("user_id") user_id: string) {
//     return this.exchangeService.getActiveExchanges(user_id);
//   }

//   @Post('dispute')
//   async openDispute(@Body() exchangeId: number) {
//     return this.exchangeService.openDispute(exchangeId);
//   }

//   @Post('review')
//   async leaveReview(@Body() exchangeId: number, @Body() review: string) {
//     return this.exchangeService.leaveReview(exchangeId, review);
//   }

//   @Put('exchanger/:id/active')
//   async toggleExchangerActiveStatus(@Param('id') exchangerId: number) {
//     return this.exchangeService.toggleExchangerActiveStatus(exchangerId);
//   }

//   @Put('exchanger/:id/missed-offers')
//   async incrementMissedOffersCount(@Param('id') exchangerId: number) {
//     return this.exchangeService.incrementMissedOffersCount(exchangerId);
//   }
// }





// // import { Controller, Get, Post, Put, Body, Param, Query, UseGuards } from '@nestjs/common';
// // import { ExchangeService } from '../services/exchange.service';
// // import { CreateExchangeListingDto, CreateExchangeOfferDto, UpdateTransactionStatusDto, ExchangeListingFilterDto } from '../dto/exchange.dto';
// // // import { JwtAuthGuard } from '../guards/jwt-auth.guard';
// // import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
// // // import { User } from '../decorators/user.decorator';
// // import { User } from 'src/shared/decorators/user.decorator';

// // @Controller('exchange')
// // @UseGuards(JwtAuthGuard)
// // export class ExchangeController {
// //   constructor(private readonly exchangeService: ExchangeService) {}

// //   @Post('listings')
// //   async createListing(
// //     @User('id') userId: string,
// //     @Body() dto: CreateExchangeListingDto
// //   ) {
// //     return this.exchangeService.createListing(userId, dto);
// //   }

// //   @Get('listings')
// //   async getListings(@Query() filter: ExchangeListingFilterDto) {
// //     return this.exchangeService.filterListings(filter);
// //   }

// //   @Post('offers')
// //   async createOffer(
// //     @User('id') userId: string,
// //     @Body() dto: CreateExchangeOfferDto
// //   ) {
// //     return this.exchangeService.createOffer(userId, dto);
// //   }

// //   @Put('transactions/:id/status')
// //   async updateTransactionStatus(
// //     @User('id') userId: string,
// //     @Param('id') transactionId: string,
// //     @Body() dto: UpdateTransactionStatusDto
// //   ) {
// //     return this.exchangeService.updateTransactionStatus(transactionId, userId, dto);
// //   }

// //   @Get('active')
// //   async getActiveExchanges(@User('id') userId: string) {
// //     return this.exchangeService.getActiveExchanges(userId);
// //   }
// // } 