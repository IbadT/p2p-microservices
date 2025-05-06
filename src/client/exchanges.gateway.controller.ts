import { Controller, Get, Post, Patch, Param, Body, Query, Inject, OnModuleInit, UseGuards, SetMetadata, Req, BadRequestException } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { RolesGuard } from '../shared/guards/roles.guard';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ExchangeGrpcClient } from './services/exchange.grpc.client';
import { CreateListingDto, OpenDisputeDto } from './interfaces/client.swagger';
import { ApiCreateListing, ApiOpenDispute } from './swagger/client.swagger';
import { SecurityManager } from '../shared/utils/security.utils';
import { QueueManager } from '../shared/utils/queue.utils';
import { AuthenticatedRequest } from '../shared/interfaces/request.interface';
import { disputeSchema } from '../shared/schemas/dispute.schema';
import { Dispute, Exchange, ExchangeService, Listing } from './interfaces/grpc.interfaces';
import { BaseGrpcClient } from './base/base.grpc.client';
import { ExchangeType } from '@prisma/client';

interface ExchangeFilters {
  userId?: string;
  status?: string;
  type?: ExchangeType;
}

@ApiTags('Exchanges')
@Controller('exchanges')
@UseGuards(JwtAuthGuard)
export class ExchangesGatewayController extends BaseGrpcClient implements OnModuleInit {
  private exchangeService: ExchangeService;

  constructor(
    @Inject('EXCHANGE_PACKAGE') protected readonly client: ClientGrpc,
    private readonly exchangeClient: ExchangeGrpcClient
  ) {
    super(client, 'ExchangeService');
  }

  onModuleInit() {
    this.exchangeService = this.getService<ExchangeService>('ExchangeService');
  }

  @Get('active')
  @ApiOperation({ summary: 'Get active exchanges' })
  @ApiResponse({ status: 200, description: 'Return active exchanges' })
  async getActive(@Query() query: ExchangeFilters): Promise<Exchange[]> {
    return this.callGrpcMethod<Exchange[]>(this.exchangeService.ListActiveExchanges, query);
  }

  @Post(':id/confirm')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles', ['Customer', 'Exchanger'])
  @ApiOperation({ summary: 'Confirm exchange step' })
  @ApiResponse({ status: 200, description: 'Step confirmed successfully' })
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
  @ApiOperation({ summary: 'Open a dispute' })
  @ApiResponse({ status: 201, description: 'Dispute opened successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 429, description: 'Too many requests' })
  async openDispute(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: string,
    @Body() dto: OpenDisputeDto
  ): Promise<Dispute> {
    const ip = req.ip || req.connection.remoteAddress;
    if (!ip) {
      throw new BadRequestException('IP address is required');
    }

    if (!SecurityManager.validateInput(dto, disputeSchema)) {
      throw new BadRequestException('Invalid input');
    }

    await SecurityManager.checkRateLimit(ip, 'openDispute');
    const result = await QueueManager.addToQueue('exchange', async () => {
      return this.callGrpcMethod<Dispute>(this.exchangeService.OpenDispute, { ...dto, exchangeId: id });
    });
    return result;
  }

  @Post('listings')
  @ApiCreateListing()
  @ApiOperation({ summary: 'Create a listing' })
  @ApiResponse({ status: 201, description: 'Listing created successfully' })
  async createListing(@Body() dto: CreateListingDto): Promise<Listing> {
    return this.callGrpcMethod<Listing>(this.exchangeService.CreateListing, dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get exchange by ID' })
  @ApiResponse({ status: 200, description: 'Exchange retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Exchange not found' })
  @ApiResponse({ status: 429, description: 'Too many requests' })
  async getExchange(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: string
  ): Promise<Exchange> {
    const ip = req.ip || req.connection.remoteAddress;
    if (!ip) {
      throw new BadRequestException('IP address is required');
    }

    await SecurityManager.checkRateLimit(ip, 'getExchange');
    const result = await QueueManager.addToQueue('exchange', async () => {
      return this.callGrpcMethod<Exchange>(this.exchangeService.GetExchange, { id });
    });
    return result;
  }
} 