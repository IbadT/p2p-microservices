import { Controller, Get, Post, Patch, Param, Body, Query, Inject, OnModuleInit, UseGuards, SetMetadata, Req, BadRequestException } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { RolesGuard } from '../shared/guards/roles.guard';
import { ApiTags, ApiBearerAuth, ApiSecurity } from '@nestjs/swagger';
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
  ApiUpdateMissedOffers,
  ApiUnfreezeExchanger
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
import { ExchangerStatus } from './interfaces/exchange.interface';
import { ErrorMessages } from '../shared/constants/error-messages';

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

  constructor(
    @Inject('EXCHANGE_PACKAGE') protected readonly client: ClientGrpc,
    private readonly exchangeClientService: ExchangeClientService
  ) {
    super(client, 'ExchangeService');
  }

  onModuleInit() {
    this.exchangeService = this.getService<ExchangeService>('ExchangeService');
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
  async updateTransactionStatus(
    @Param('transactionId') transactionId: string,
    @Body() data: {
      userId: string;
      status: TransactionStatus;
      paymentProof?: string;
    }
  ): Promise<Exchange> {
    return this.callGrpcMethod<Exchange>(this.exchangeService.UpdateTransactionStatus, { transactionId, ...data });
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

  @Post('exchangers/:exchangerId/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles', ['Exchanger'])
  async setExchangerStatus(
    @Param('exchangerId') exchangerId: string,
    @Body() data: { online: boolean }
  ): Promise<{ exchangerId: string; online: boolean; message: string }> {
    return this.callGrpcMethod<{ exchangerId: string; online: boolean; message: string }>(
      this.exchangeService.SetExchangerStatus,
      { exchangerId, ...data }
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