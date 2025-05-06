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
  OfferService, 
  CreateOfferRequest, 
  UpdateOfferStatusRequest,
  ExchangeOffer
} from './interfaces/grpc.interfaces';
import { OffersService } from '../offers/offers.service';
import { BaseGrpcClient } from './base/base.grpc.client';

@ApiTags('Offers')
@Controller('offers')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class OffersGatewayController extends BaseGrpcClient implements OnModuleInit {
  private offerService: OfferService;
  
  constructor(
    @Inject('OFFER_PACKAGE') protected readonly client: ClientGrpc,
    private readonly p2pClient: P2PGrpcClient,
    private readonly offersService: OffersService
  ) {
    super(client, 'OfferService');
  }

  onModuleInit() {
    this.offerService = this.getService<OfferService>('OfferService');
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles', ['Customer'])
  async create(@Body() dto: CreateOfferRequest): Promise<Offer> {
    return this.callGrpcMethod<Offer>(this.offerService.CreateOffer, dto);
  }

  @Patch(':id/status')
  async updateStatus(@Param('id') id: string, @Body() dto: Omit<UpdateOfferStatusRequest, 'id'>): Promise<Offer> {
    return this.callGrpcMethod<Offer>(this.offerService.UpdateOfferStatus, { id, ...dto });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get offer by ID' })
  @ApiResponse({ status: 200, description: 'Offer retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Offer not found' })
  @ApiResponse({ status: 429, description: 'Too many requests' })
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

  @Post()
  @ApiOperation({ summary: 'Создать предложение обмена' })
  @ApiResponse({ status: 201, description: 'Предложение успешно создано' })
  async createExchangeOffer(@Body() dto: CreateExchangeOfferDto): Promise<Offer> {
    const result = await this.p2pClient.createExchangeOffer(dto);
    if (!result) {
      throw new BadRequestException('Failed to create exchange offer');
    }
    return this.convertExchangeOfferToOffer(result);
  }

  @Post(':id/respond')
  @ApiOperation({ summary: 'Ответить на предложение обмена' })
  @ApiResponse({ status: 200, description: 'Ответ успешно отправлен' })
  async respondExchangeOffer(@Body() dto: RespondExchangeOfferDto): Promise<Offer> {
    const result = await this.p2pClient.respondExchangeOffer(dto);
    if (!result) {
      throw new BadRequestException('Failed to respond to exchange offer');
    }
    return this.convertExchangeOfferToOffer(result);
  }

  @Post('create')
  @ApiOperation({ summary: 'Create a new offer' })
  @ApiResponse({ status: 201, description: 'Offer created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 429, description: 'Too many requests' })
  async createOffer(@Req() req: AuthenticatedRequest, @Body() dto: CreateOfferDto): Promise<Offer> {
    const ip = req.ip || req.connection.remoteAddress;
    if (!ip) {
      throw new BadRequestException('IP address is required');
    }

    if (!SecurityManager.validateInput(dto, offerSchema)) {
      throw new BadRequestException('Invalid input');
    }

    await SecurityManager.checkRateLimit(ip, 'createOffer');
    const result = await QueueManager.addToQueue('offer', async () => {
      return this.p2pClient.createOffer(dto);
    });
    if (!result) {
      throw new BadRequestException('Failed to create offer');
    }
    return result;
  }

  @Post('respond')
  @ApiOperation({ summary: 'Respond to an offer' })
  @ApiResponse({ status: 200, description: 'Response sent successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 429, description: 'Too many requests' })
  async respondToOffer(@Req() req: AuthenticatedRequest, @Body() dto: RespondToOfferDto): Promise<Offer> {
    const ip = req.ip || req.connection.remoteAddress;
    if (!ip) {
      throw new BadRequestException('IP address is required');
    }

    if (!SecurityManager.validateInput(dto, responseSchema)) {
      throw new BadRequestException('Invalid input');
    }

    await SecurityManager.checkRateLimit(ip, 'respondToOffer');
    const result = await QueueManager.addToQueue('offer', async () => {
      return this.p2pClient.respondToOffer(dto);
    });
    if (!result) {
      throw new BadRequestException('Failed to respond to offer');
    }
    return result;
  }

  @Post()
  @ApiOperation({ summary: 'Create a new offer' })
  @ApiResponse({ status: 201, description: 'The offer has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async createOfferDto(@Req() req: AuthenticatedRequest, @Body() createOfferDto: CreateOfferDto): Promise<Offer> {
    const result = await this.offersService.createOffer(req.user.id, {
      listingId: createOfferDto.toUserId,
      amount: createOfferDto.amount
    });
    if (!result) {
      throw new BadRequestException('Failed to create offer');
    }
    return this.convertExchangeOfferToOffer({
      id: result.id,
      customerId: req.user.id,
      listingId: result.listingId,
      amount: result.amount,
      exchangeType: 'CRYPTO_TO_FIAT',
      conditions: '',
      status: result.status
    });
  }

  @Get()
  @ApiOperation({ summary: 'Get all offers' })
  @ApiResponse({ status: 200, description: 'Return all offers.' })
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

  @Get(':id')
  @ApiOperation({ summary: 'Get an offer by id' })
  @ApiResponse({ status: 200, description: 'Return the offer.' })
  @ApiResponse({ status: 404, description: 'Offer not found.' })
  async findOne(@Param('id') id: string): Promise<Offer> {
    const result = await this.offersService.findOne(id);
    if (!result) {
      throw new BadRequestException('Offer not found');
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

  @Post(':id/accept')
  @ApiOperation({ summary: 'Accept an offer' })
  @ApiResponse({ status: 200, description: 'The offer has been successfully accepted.' })
  @ApiResponse({ status: 404, description: 'Offer not found.' })
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
  @ApiOperation({ summary: 'Reject an offer' })
  @ApiResponse({ status: 200, description: 'The offer has been successfully rejected.' })
  @ApiResponse({ status: 404, description: 'Offer not found.' })
  async reject(@Param('id') id: string): Promise<Offer> {
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