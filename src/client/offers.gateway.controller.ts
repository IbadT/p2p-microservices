import { Controller, Post, Patch, Get, Param, Body, Query, Inject, OnModuleInit, UseGuards, SetMetadata, Req, BadRequestException } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { RolesGuard } from '../shared/guards/roles.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { P2PGrpcClient } from './services/p2p.grpc.client';
import { CreateExchangeOfferDto, RespondExchangeOfferDto } from './interfaces/client.swagger';
import { SecurityManager } from '../shared/utils/security.utils';
import { QueueManager } from '../shared/utils/queue.utils';
import { AuthenticatedRequest } from '../shared/interfaces/request.interface';
import { offerSchema, responseSchema } from '../shared/schemas/offer.schema';
import { CreateOfferDto, RespondToOfferDto } from './interfaces/offer.dto';
import { 
  Offer, 
  OffersService, 
  CreateOfferRequest, 
  UpdateOfferStatusRequest,
  ExchangeOffer
} from './interfaces/grpc.interfaces';
import { OffersService as LocalOffersService } from '../offers/offers.service';
import { BaseGrpcClient } from './base/base.grpc.client';
import {
  ApiCreateOffer,
  ApiGetAllOffers,
  ApiGetOfferById,
  ApiAcceptOffer,
  ApiRejectOffer,
  ApiCancelOffer,
  ApiRespondExchangeOffer
} from './swagger/client.swagger';
import { RateLimitGuard } from '../shared/guards/rate-limit.guard';

@ApiTags('Offers')
@Controller('offers')
@UseGuards(JwtAuthGuard, RateLimitGuard)
@ApiBearerAuth()
export class OffersGatewayController extends BaseGrpcClient implements OnModuleInit {
  private offerService: OffersService;
  
  constructor(
    @Inject('OFFER_PACKAGE') protected readonly client: ClientGrpc,
    private readonly p2pClient: P2PGrpcClient,
    private readonly offersService: LocalOffersService
  ) {
    super(client, 'OffersService');
  }

  onModuleInit() {
    this.offerService = this.getService<OffersService>('OffersService');
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles', ['Customer'])
  @ApiCreateOffer()
  async create(@Body() dto: CreateOfferRequest): Promise<Offer> {
    return this.callGrpcMethod<Offer>(this.offerService.CreateOffer, dto);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update offer status' })
  @ApiResponse({ status: 200, description: 'Offer status updated successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async updateStatus(@Param('id') id: string, @Body() dto: Omit<UpdateOfferStatusRequest, 'id'>): Promise<Offer> {
    return this.callGrpcMethod<Offer>(this.offerService.UpdateOfferStatus, { id, ...dto });
  }

  @Get(':id')
  @ApiGetOfferById()
  async getOffer(@Req() req: AuthenticatedRequest, @Param('id') id: string): Promise<Offer> {
    const ip = req.ip || req.connection.remoteAddress;
    if (!ip) {
      throw new BadRequestException('IP address is required');
    }

    await SecurityManager.checkRateLimit(ip, 'getOffer');
    const result = await QueueManager.addToQueue('offer', async () => {
      return this.p2pClient.getOffer(id);
    });
    if (!result) {
      throw new BadRequestException('Offer not found');
    }
    return this.convertExchangeOfferToOffer(result);
  }

  @Post('exchange')
  @ApiCreateOffer()
  async createExchangeOffer(@Body() dto: CreateExchangeOfferDto): Promise<Offer> {
    const result = await this.p2pClient.createExchangeOffer(dto);
    if (!result) {
      throw new BadRequestException('Failed to create exchange offer');
    }
    return this.convertExchangeOfferToOffer(result);
  }

  @Post(':id/respond')
  @ApiRespondExchangeOffer()
  async respondExchangeOffer(@Body() dto: RespondExchangeOfferDto): Promise<Offer> {
    const result = await this.p2pClient.respondExchangeOffer(dto);
    if (!result) {
      throw new BadRequestException('Failed to respond to exchange offer');
    }
    return this.convertExchangeOfferToOffer(result);
  }

  @Get()
  @ApiGetAllOffers()
  async findAll(): Promise<Offer[]> {
    const results = await this.offersService.listOffers();
    return results.map(result => this.convertExchangeOfferToOffer({
      id: result.id,
      customerId: result.userId,
      listingId: result.listingId,
      amount: result.amount,
      exchangeType: 'CRYPTO_TO_FIAT',
      conditions: '',
      status: result.status
    }));
  }

  @Post(':id/accept')
  @ApiAcceptOffer()
  async accept(@Param('id') id: string): Promise<Offer> {
    const result = await this.offersService.acceptOffer(id);
    if (!result) {
      throw new BadRequestException('Failed to accept offer');
    }
    return this.convertExchangeOfferToOffer({
      id: result.id,
      customerId: result.userId,
      listingId: result.listingId,
      amount: result.amount,
      exchangeType: 'CRYPTO_TO_FIAT',
      conditions: '',
      status: result.status
    });
  }

  @Post(':id/reject')
  @ApiRejectOffer()
  async reject(@Param('id') id: string, @Body('reason') reason: string): Promise<Offer> {
    const result = await this.offersService.rejectOffer(id);
    if (!result) {
      throw new BadRequestException('Failed to reject offer');
    }
    return this.convertExchangeOfferToOffer({
      id: result.id,
      customerId: result.userId,
      listingId: result.listingId,
      amount: result.amount,
      exchangeType: 'CRYPTO_TO_FIAT',
      conditions: '',
      status: result.status
    });
  }

  @Post(':id/cancel')
  @ApiCancelOffer()
  async cancel(@Param('id') id: string): Promise<Offer> {
    const result = await this.callGrpcMethod<Offer>(this.offerService.UpdateOfferStatus, { 
      id, 
      status: 'CANCELLED' 
    });
    if (!result) {
      throw new BadRequestException('Failed to cancel offer');
    }
    return result;
  }

  private convertExchangeOfferToOffer(exchangeOffer: ExchangeOffer): Offer {
    return {
      id: exchangeOffer.id,
      fromUserId: exchangeOffer.customerId,
      toUserId: exchangeOffer.listingId,
      amount: exchangeOffer.amount,
      currency: exchangeOffer.exchangeType,
      status: exchangeOffer.status as 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELLED',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }
} 