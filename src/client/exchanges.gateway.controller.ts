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
import { Dispute } from './interfaces/grpc.interfaces';

@ApiTags('Exchanges')
@Controller('exchanges')
@UseGuards(JwtAuthGuard)
export class ExchangesGatewayController implements OnModuleInit {
  private exchangeService;
  constructor(
    @Inject('EXCHANGE_PACKAGE') private client: ClientGrpc,
    private readonly exchangeClient: ExchangeGrpcClient
  ) {}
  onModuleInit() {
    this.exchangeService = this.client.getService('ExchangeService');
  }
  @Get('active')
  getActive(@Query() query: any) {
    return this.exchangeService.ListActiveExchanges(query).toPromise();
  }
  @Post(':id/confirm')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles', ['Customer', 'Exchanger'])
  confirm(@Param('id') id: string, @Body() dto: any) {
    return this.exchangeService.ConfirmStep({ id, ...dto }).toPromise();
  }
  @Post(':id/disputes')
  @ApiOpenDispute()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles', ['Customer', 'Exchanger'])
  @ApiOperation({ summary: 'Open a dispute' })
  @ApiResponse({ status: 201, description: 'Dispute opened successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 429, description: 'Too many requests' })
  async openDispute(@Req() req: AuthenticatedRequest, @Param('id') id: string, @Body() dto: OpenDisputeDto): Promise<Dispute> {
    const ip = req.ip || req.connection.remoteAddress;
    if (!ip) {
      throw new BadRequestException('IP address is required');
    }

    if (!SecurityManager.validateInput(dto, disputeSchema)) {
      throw new BadRequestException('Invalid input');
    }

    await SecurityManager.checkRateLimit(ip, 'openDispute');
    const result = await QueueManager.addToQueue('exchange', async () => {
      return this.exchangeClient.openDispute({ ...dto, exchangeId: id });
    });
    return result as Dispute;
  }
  @Post('listings')
  @ApiCreateListing()
  @ApiOperation({ summary: 'Create a listing' })
  @ApiResponse({ status: 201, description: 'Listing created successfully' })
  async createListing(@Body() dto: CreateListingDto) {
    return this.exchangeClient.createListing(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get exchange by ID' })
  @ApiResponse({ status: 200, description: 'Exchange retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Exchange not found' })
  @ApiResponse({ status: 429, description: 'Too many requests' })
  async getExchange(@Req() req: AuthenticatedRequest, @Param('id') id: string): Promise<any> {
    const ip = req.ip || req.connection.remoteAddress;
    if (!ip) {
      throw new BadRequestException('IP address is required');
    }

    await SecurityManager.checkRateLimit(ip, 'getExchange');
    const result = await QueueManager.addToQueue('exchange', async () => {
      return this.exchangeClient.getExchange(id);
    });
    return result;
  }
} 