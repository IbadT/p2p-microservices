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
import { Offer } from './interfaces/grpc.interfaces';
import { OffersService } from '../offers/offers.service';

@ApiTags('Offers')
@Controller('offers')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class OffersGatewayController implements OnModuleInit {
  private offerService;
  constructor(
    @Inject('OFFER_PACKAGE') private client: ClientGrpc,
    private readonly p2pClient: P2PGrpcClient,
    private readonly offersService: OffersService
  ) {}
  onModuleInit() {
    this.offerService = this.client.getService('OfferService');
  }
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles', ['Customer'])
  create(@Body() dto: any) {
    return this.offerService.CreateOffer(dto).toPromise();
  }
  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() dto: any) {
    return this.offerService.UpdateOfferStatus({ id, ...dto }).toPromise();
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
    return result as Offer;
  }

  @Post()
  @ApiOperation({ summary: 'Создать предложение обмена' })
  @ApiResponse({ status: 201, description: 'Предложение успешно создано' })
  async createExchangeOffer(@Body() dto: CreateExchangeOfferDto) {
    return this.p2pClient.createExchangeOffer(dto);
  }

  @Post(':id/respond')
  @ApiOperation({ summary: 'Ответить на предложение обмена' })
  @ApiResponse({ status: 200, description: 'Ответ успешно отправлен' })
  async respondExchangeOffer(@Body() dto: RespondExchangeOfferDto) {
    return this.p2pClient.respondExchangeOffer(dto);
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
    return result as Offer;
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
    return result as Offer;
  }

  @Post()
  @ApiOperation({ summary: 'Create a new offer' })
  @ApiResponse({ status: 201, description: 'The offer has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async createOfferDto(@Req() req: AuthenticatedRequest, @Body() createOfferDto: CreateOfferDto) {
    return this.offersService.createOffer(req.user.id, {
      listingId: createOfferDto.toUserId,
      amount: createOfferDto.amount
    });
  }

  @Get()
  @ApiOperation({ summary: 'Get all offers' })
  @ApiResponse({ status: 200, description: 'Return all offers.' })
  async findAll() {
    return this.offersService.listOffers();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an offer by id' })
  @ApiResponse({ status: 200, description: 'Return the offer.' })
  @ApiResponse({ status: 404, description: 'Offer not found.' })
  async findOne(@Param('id') id: string) {
    return this.offersService.findOne(id);
  }

  @Post(':id/accept')
  @ApiOperation({ summary: 'Accept an offer' })
  @ApiResponse({ status: 200, description: 'The offer has been successfully accepted.' })
  @ApiResponse({ status: 404, description: 'Offer not found.' })
  async accept(@Param('id') id: string) {
    return this.offersService.acceptOffer(id);
  }

  @Post(':id/reject')
  @ApiOperation({ summary: 'Reject an offer' })
  @ApiResponse({ status: 200, description: 'The offer has been successfully rejected.' })
  @ApiResponse({ status: 404, description: 'Offer not found.' })
  async reject(@Param('id') id: string) {
    return this.offersService.rejectOffer(id);
  }
} 