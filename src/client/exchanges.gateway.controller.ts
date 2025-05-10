import { Controller, Get, Post, Patch, Param, Body, Query, Inject, OnModuleInit, UseGuards, SetMetadata, Req, BadRequestException, Logger } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { RolesGuard } from '../shared/guards/roles.guard';
import { ApiTags, ApiBearerAuth, ApiSecurity, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ExchangeClientService } from './services/exchange.client';
// import { ExchangeGrpcClient } from './services/exchange.client';
import { CreateListingDto, OpenDisputeDto } from './interfaces/client.swagger';
import { 
  ApiCreateListing, 
  ApiOpenDispute, 
  ApiGetActiveExchanges,
  ApiConfirmExchangeStep,
  ApiGetExchangeById,
  ApiGetExchangerStatus,
  ApiUnfreezeExchanger,
  ApiUpdateMissedOffers,
  ApiVerifyPayment,
  ApiRejectPayment,
  ApiUpdatePaymentStatus
} from './swagger/client.swagger';
import { SecurityManager } from '../shared/utils/security.utils';
import { QueueManager } from '../shared/utils/queue.utils';
import { AuthenticatedRequest } from '../shared/interfaces/request.interface';
import { disputeSchema } from '../shared/schemas/dispute.schema';
import { Dispute, Exchange, ExchangeService, Listing } from './interfaces/grpc.interfaces';
import { BaseGrpcClient } from './base/base.grpc.client';
import { ExchangeType, TransactionStatus, PaymentMethod } from '@prisma/client';
import { RateLimitGuard } from '../shared/guards/rate-limit.guard';
import { firstValueFrom } from 'rxjs';
import { ExchangerStatus, SetExchangerStatusRequest, SetExchangerStatusResponse } from './interfaces/exchange.interface';
import { ErrorMessages } from '../shared/constants/error-messages';
import { UserRole } from './interfaces/enums';
import { VerifyPaymentDto, RejectPaymentDto, PaymentResponseDto, PaymentWebhookDto } from './interfaces/payment.dto';
// import { UserRole } from '../interfaces/enums';

interface ExchangeFilters {
  userId?: string;
  status?: string;
  type?: ExchangeType;
}

@ApiTags('Exchanges')
@Controller('exchanges')
@UseGuards(JwtAuthGuard, RateLimitGuard)
@ApiSecurity('JWT-auth')
export class ExchangesGatewayController extends BaseGrpcClient implements OnModuleInit {
  private exchangeService: ExchangeService;
  private paymentVerificationService: any; // TODO: Add proper type
  protected readonly logger = new Logger(ExchangesGatewayController.name);

  constructor(
    @Inject('EXCHANGE_PACKAGE') protected readonly client: ClientGrpc,
    @Inject('PAYMENT_VERIFICATION_PACKAGE') private readonly paymentVerificationClient: ClientGrpc,
    private readonly exchangeClientService: ExchangeClientService
  ) {
    super(client, 'ExchangeService');
  }

  async onModuleInit() {
    this.exchangeService = this.client.getService<ExchangeService>('ExchangeService');
    this.paymentVerificationService = this.paymentVerificationClient.getService('PaymentVerificationService');
  }

  @Get('active')
  @ApiGetActiveExchanges()
  async getActive(@Query() query: ExchangeFilters): Promise<Exchange[]> {
    return this.callGrpcMethod<Exchange[]>(this.exchangeService.ListActiveExchanges, query);
  }

  @Get(':id')
  @ApiGetExchangeById()
  async getExchange(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: string
  ): Promise<Exchange> {
    const ip = req.ip || req.connection.remoteAddress;
    if (!ip) {
      throw new BadRequestException(ErrorMessages.IP_REQUIRED);
    }

    await SecurityManager.checkRateLimit(ip, 'getExchange');
    const result = await QueueManager.addToQueue('exchange', async () => {
      return this.callGrpcMethod<Exchange>(this.exchangeService.GetExchange, { id });
    });
    return result;
  }

  @Post(':id/confirm')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles', ['Customer', 'Exchanger'])
  @ApiConfirmExchangeStep()
  async confirm(
    @Param('id') id: string,
    @Body() dto: { step: 'PAYMENT' | 'RECEIPT'; evidence?: string }
  ): Promise<Exchange> {
    return this.callGrpcMethod<Exchange>(this.exchangeService.ConfirmStep, { id, ...dto });
  }

  @Post(':id/disputes')
  @ApiOpenDispute()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles', ['Customer', 'Exchanger'])
  async openDispute(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: string,
    @Body() dto: OpenDisputeDto
  ): Promise<Dispute> {
    const ip = req.ip || req.connection.remoteAddress;
    if (!ip) {
      throw new BadRequestException(ErrorMessages.IP_REQUIRED);
    }

    if (!SecurityManager.validateInput(dto, disputeSchema)) {
      throw new BadRequestException(ErrorMessages.INVALID_INPUT);
    }

    await SecurityManager.checkRateLimit(ip, 'openDispute');
    const result = await QueueManager.addToQueue('exchange', async () => {
      return this.callGrpcMethod<Dispute>(this.exchangeService.OpenDispute, { ...dto, exchangeId: id });
    });
    return result;
  }

  @Post('listings')
  @ApiCreateListing()
  async createListing(@Body() dto: CreateListingDto): Promise<Listing> {
    return this.callGrpcMethod<Listing>(this.exchangeService.CreateListing, dto);
  }

  @Get('listings')
  async getListings(@Query() query: {
    type?: ExchangeType;
    cryptocurrency?: string;
    fiatCurrency?: string;
    minRate?: number;
    maxRate?: number;
    paymentMethods?: PaymentMethod[];
    isActive?: boolean;
  }): Promise<{ listings: Listing[] }> {
    return this.callGrpcMethod<{ listings: Listing[] }>(this.exchangeService.GetListings, query);
  }

  @Post('offers')
  async createOffer(@Body() data: {
    userId: string;
    listingId: string;
    amount: number;
  }): Promise<Exchange> {
    return this.callGrpcMethod<Exchange>(this.exchangeService.CreateOffer, data);
  }

  @Post('offers/:offerId/respond')
  async respondOffer(
    @Param('offerId') offerId: string,
    @Body() data: {
      exchangerId: string;
      action: 'ACCEPT' | 'DECLINE';
    }
  ): Promise<{ offerId: string; status: string; message: string }> {
    return this.callGrpcMethod<{ offerId: string; status: string; message: string }>(
      this.exchangeService.RespondOffer,
      { offerId, ...data }
    );
  }

  @Post('transactions/:transactionId/status')
  @ApiUpdatePaymentStatus()
  async updateTransactionStatus(
    @Param('transactionId') transactionId: string,
    @Body() data: PaymentWebhookDto
  ): Promise<Exchange> {
    const payload = {
      ...data,
      transactionId
    };
    return this.callGrpcMethod<Exchange>(this.exchangeService.UpdateTransactionStatus, payload);
  }

  @Post('transactions/:transactionId/verify')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles', [UserRole.MODERATOR, UserRole.ADMIN])
  @ApiVerifyPayment()
  async verifyPayment(
    @Param('transactionId') transactionId: string,
    @Body() dto: VerifyPaymentDto
  ): Promise<PaymentResponseDto> {
    return this.callGrpcMethod(this.paymentVerificationService.VerifyPayment, {
      transactionId,
      verifiedBy: dto.verifiedBy
    });
  }

  @Post('transactions/:transactionId/reject')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles', [UserRole.MODERATOR, UserRole.ADMIN])
  @ApiRejectPayment()
  async rejectPayment(
    @Param('transactionId') transactionId: string,
    @Body() dto: RejectPaymentDto
  ): Promise<PaymentResponseDto> {
    return this.callGrpcMethod(this.paymentVerificationService.RejectPayment, {
      transactionId,
      rejectedBy: dto.rejectedBy,
      reason: dto.reason
    });
  }

  @Post('reviews')
  async createReview(@Body() data: {
    transactionId: string;
    authorId: string;
    rating: number;
    comment?: string;
  }): Promise<Exchange> {
    return this.callGrpcMethod<Exchange>(this.exchangeService.CreateReview, data);
  }

  @Post('exchanger/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles', ['Exchanger'])
  async setExchangerStatus(
    @Body() data: SetExchangerStatusRequest
  ): Promise<SetExchangerStatusResponse> {
    return this.callGrpcMethod<SetExchangerStatusResponse>(
      this.exchangeService.SetExchangerStatus,
      data
    );
  }

  @Get('exchanger/status')
  @ApiGetExchangerStatus()
  async getExchangerStatus(@Req() req: AuthenticatedRequest): Promise<ExchangerStatus> {
    const ip = req.ip || req.connection.remoteAddress;
    if (!ip) {
      throw new BadRequestException(ErrorMessages.IP_REQUIRED);
    }

    await SecurityManager.checkRateLimit(ip, 'getExchangerStatus');
    return await QueueManager.addToQueue('exchange', async () => {
      return this.exchangeClientService.getExchangerStatus(req.user.id);
    });
  }

  @Post('exchanger/missed-offers')
  @ApiUpdateMissedOffers()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles', [UserRole.EXCHANGER])
  async updateMissedOffers(
    @Req() req: AuthenticatedRequest,
    @Body('increment') increment: boolean
  ): Promise<ExchangerStatus> {
    const ip = req.ip || req.connection.remoteAddress;
    if (!ip) {
      throw new BadRequestException(ErrorMessages.IP_REQUIRED);
    }

    await SecurityManager.checkRateLimit(ip, 'updateMissedOffers');
    return await QueueManager.addToQueue('exchange', async () => {
      return this.exchangeClientService.updateMissedOffers(req.user.id, increment);
    });
  }

  @Post('exchanger/freeze')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles', [UserRole.MODERATOR, UserRole.ADMIN])
  async freezeExchanger(
    @Req() req: AuthenticatedRequest,
    @Body() data: { exchangerId: string; reason: string }
  ): Promise<ExchangerStatus> {
    const ip = req.ip || req.connection.remoteAddress;
    if (!ip) {
      throw new BadRequestException(ErrorMessages.IP_REQUIRED);
    }

    await SecurityManager.checkRateLimit(ip, 'freezeExchanger');
    return await QueueManager.addToQueue('exchange', async () => {
      return this.exchangeClientService.freezeExchanger(data);
    });
  }

  @Post('exchanger/unfreeze')
  @ApiUnfreezeExchanger()
  async unfreezeExchanger(@Req() req: AuthenticatedRequest): Promise<ExchangerStatus> {
    const ip = req.ip || req.connection.remoteAddress;
    if (!ip) {
      throw new BadRequestException(ErrorMessages.IP_REQUIRED);
    }

    await SecurityManager.checkRateLimit(ip, 'unfreezeExchanger');
    return await QueueManager.addToQueue('exchange', async () => {
      return this.exchangeClientService.unfreezeExchanger(req.user.id);
    });
  }
} 