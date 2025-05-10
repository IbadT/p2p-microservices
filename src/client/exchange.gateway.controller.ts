import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ExchangeService } from '../exchange-service/src/services/exchange.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { UserRole } from 'src/exchange-service/src/decorators/roles.decorator';
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
  FreezeExchangerResponse
} from '../proto/generated/exchange.pb';
import {
  ExchangeListingDto,
  GetListingsResponseDto,
  ExchangeOfferDto,
  RespondOfferResponseDto,
  ExchangeTransactionDto,
  GetActiveExchangesResponseDto,
  ConfirmPaymentResponseDto,
  ConfirmReceiptResponseDto,
  CancelTransactionResponseDto,
  SetExchangerStatusResponseDto,
  FreezeExchangerResponseDto
} from './dto/exchange.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
  ApiBody
} from '@nestjs/swagger';

@ApiTags('Exchange')
@Controller('exchange')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class ExchangeGatewayController {
  constructor(private readonly exchangeService: ExchangeService) {}

  @Post('listings')
  @Roles(UserRole.EXCHANGER)
  @ApiOperation({ summary: 'Create a new exchange listing' })
  @ApiBody({ type: ExchangeListingDto })
  @ApiResponse({ status: 201, description: 'Listing created successfully', type: ExchangeListingDto })
  async createListing(@Body() request: CreateListingRequest): Promise<ExchangeListing> {
    return this.exchangeService.createListing(request);
  }

  @Get('listings')
  @ApiOperation({ summary: 'Get all exchange listings' })
  @ApiQuery({ name: 'cryptocurrency', required: false })
  @ApiQuery({ name: 'minAmount', required: false, type: Number })
  @ApiQuery({ name: 'maxAmount', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Listings retrieved successfully', type: GetListingsResponseDto })
  async getListings(@Query() request: GetListingsRequest): Promise<GetListingsResponse> {
    return this.exchangeService.getListings(request);
  }

  @Post('offers')
  @Roles(UserRole.CUSTOMER)
  @ApiOperation({ summary: 'Create a new exchange offer' })
  @ApiBody({ type: ExchangeOfferDto })
  @ApiResponse({ status: 201, description: 'Offer created successfully', type: ExchangeOfferDto })
  async createOffer(@Body() request: CreateOfferRequest): Promise<ExchangeOffer> {
    return this.exchangeService.createOffer(request);
  }

  @Post('offers/:id/respond')
  @Roles(UserRole.EXCHANGER)
  @ApiOperation({ summary: 'Respond to an exchange offer' })
  @ApiParam({ name: 'id', description: 'Offer ID' })
  @ApiBody({ type: RespondOfferResponseDto })
  @ApiResponse({ status: 200, description: 'Offer response processed successfully', type: RespondOfferResponseDto })
  async respondOffer(
    @Param('id') id: string,
    @Body() request: RespondOfferRequest
  ): Promise<RespondOfferResponse> {
    return this.exchangeService.respondOffer({ ...request, offerId: id });
  }

  @Post('transactions/:id/status')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Update transaction status' })
  @ApiParam({ name: 'id', description: 'Transaction ID' })
  @ApiBody({ type: ExchangeTransactionDto })
  @ApiResponse({ status: 200, description: 'Transaction status updated successfully', type: ExchangeTransactionDto })
  async updateTransactionStatus(
    @Param('id') id: string,
    @Body() request: UpdateTransactionStatusRequest
  ): Promise<ExchangeTransaction> {
    return this.exchangeService.updateTransactionStatus({ ...request, transactionId: id });
  }

  @Get('exchanges/active')
  @ApiOperation({ summary: 'Get active exchanges' })
  @ApiQuery({ name: 'userId', required: false })
  @ApiResponse({ status: 200, description: 'Active exchanges retrieved successfully', type: GetActiveExchangesResponseDto })
  async getActiveExchanges(@Query() request: GetActiveExchangesRequest): Promise<GetActiveExchangesResponse> {
    return this.exchangeService.getActiveExchanges(request.userId);
  }

  @Post('transactions/:id/confirm-payment')
  @Roles(UserRole.CUSTOMER)
  @ApiOperation({ summary: 'Confirm payment for a transaction' })
  @ApiParam({ name: 'id', description: 'Transaction ID' })
  @ApiBody({ type: ConfirmPaymentResponseDto })
  @ApiResponse({ status: 200, description: 'Payment confirmed successfully', type: ConfirmPaymentResponseDto })
  async confirmPayment(
    @Param('id') id: string,
    @Body() request: ConfirmPaymentRequest
  ): Promise<ConfirmPaymentResponse> {
    return this.exchangeService.confirmPayment({ ...request, transactionId: id });
  }

  @Post('transactions/:id/confirm-receipt')
  @Roles(UserRole.EXCHANGER)
  @ApiOperation({ summary: 'Confirm receipt of payment' })
  @ApiParam({ name: 'id', description: 'Transaction ID' })
  @ApiBody({ type: ConfirmReceiptResponseDto })
  @ApiResponse({ status: 200, description: 'Receipt confirmed successfully', type: ConfirmReceiptResponseDto })
  async confirmReceipt(
    @Param('id') id: string,
    @Body() request: ConfirmReceiptRequest
  ): Promise<ConfirmReceiptResponse> {
    return this.exchangeService.confirmReceipt({ ...request, transactionId: id });
  }

  @Post('transactions/:id/cancel')
  @ApiOperation({ summary: 'Cancel a transaction' })
  @ApiParam({ name: 'id', description: 'Transaction ID' })
  @ApiBody({ type: CancelTransactionResponseDto })
  @ApiResponse({ status: 200, description: 'Transaction cancelled successfully', type: CancelTransactionResponseDto })
  async cancelTransaction(
    @Param('id') id: string,
    @Body() request: CancelTransactionRequest
  ): Promise<CancelTransactionResponse> {
    return this.exchangeService.cancelTransaction({ ...request, transactionId: id });
  }

  @Post('exchangers/:id/status')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Set exchanger status' })
  @ApiParam({ name: 'id', description: 'Exchanger ID' })
  @ApiBody({ type: SetExchangerStatusResponseDto })
  @ApiResponse({ status: 200, description: 'Exchanger status updated successfully', type: SetExchangerStatusResponseDto })
  async setExchangerStatus(
    @Param('id') id: string,
    @Body() request: SetExchangerStatusRequest
  ): Promise<SetExchangerStatusResponse> {
    return this.exchangeService.setExchangerStatus({ ...request, exchangerId: id });
  }

  @Post('exchangers/:id/freeze')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Freeze an exchanger' })
  @ApiParam({ name: 'id', description: 'Exchanger ID' })
  @ApiBody({ type: FreezeExchangerResponseDto })
  @ApiResponse({ status: 200, description: 'Exchanger frozen successfully', type: FreezeExchangerResponseDto })
  async freezeExchanger(
    @Param('id') id: string,
    @Body() request: FreezeExchangerRequest
  ): Promise<FreezeExchangerResponse> {
    return this.exchangeService.freezeExchanger({ ...request, exchangerId: id });
  }

  @Get('exchangers/:id/status')
  @ApiOperation({ summary: 'Get exchanger status' })
  @ApiParam({ name: 'id', description: 'Exchanger ID' })
  @ApiResponse({ status: 200, description: 'Exchanger status retrieved successfully' })
  async getExchangerStatus(@Param('id') id: string) {
    return this.exchangeService.getExchangerStatus(id);
  }

  @Post('exchangers/:id/unfreeze')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Unfreeze an exchanger' })
  @ApiParam({ name: 'id', description: 'Exchanger ID' })
  @ApiResponse({ status: 200, description: 'Exchanger unfrozen successfully' })
  async unfreezeExchanger(@Param('id') id: string) {
    return this.exchangeService.unfreezeExchanger(id);
  }

  @Post('exchangers/:id/missed-offers')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Update missed offers count' })
  @ApiParam({ name: 'id', description: 'Exchanger ID' })
  @ApiBody({ type: Object })
  @ApiResponse({ status: 200, description: 'Missed offers count updated successfully' })
  async updateMissedOffers(
    @Param('id') id: string,
    @Body() data: { increment: boolean }
  ) {
    return this.exchangeService.updateMissedOffers(id, data.increment);
  }

  @Post('transactions/:id/disputes')
  @ApiOperation({ summary: 'Create a dispute' })
  @ApiParam({ name: 'id', description: 'Transaction ID' })
  @ApiBody({ type: Object })
  @ApiResponse({ status: 201, description: 'Dispute created successfully' })
  async createDispute(
    @Param('id') id: string,
    @Body() data: { 
      initiatorId: string; 
      reason: string;
      initiatorRole: 'CUSTOMER' | 'EXCHANGER';
    }
  ) {
    return this.exchangeService.createDispute({
      transactionId: id,
      ...data
    });
  }

  @Post('transactions/:id/reviews')
  @ApiOperation({ summary: 'Create a review' })
  @ApiParam({ name: 'id', description: 'Transaction ID' })
  @ApiBody({ type: Object })
  @ApiResponse({ status: 201, description: 'Review created successfully' })
  async createReview(
    @Param('id') id: string,
    @Body() data: {
      authorId: string;
      rating: number;
      comment?: string;
    }
  ) {
    return this.exchangeService.createReview({
      transactionId: id,
      ...data
    });
  }
} 