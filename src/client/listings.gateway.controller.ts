import { Controller, Get, Post, Body, Query, Param, Inject, OnModuleInit, UseGuards, SetMetadata, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ClientGrpc } from '@nestjs/microservices';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { RolesGuard } from '../shared/guards/roles.guard';
import { ExchangeGrpcClient } from './services/exchange.grpc.client';
import { ListingsService } from '../listings/listings.service';
import { UpdateListingDto } from '../listings/dto/update-listing.dto';
import { BaseGrpcClient } from './base/base.grpc.client';
import { Listing, ListingService } from './interfaces/grpc.interfaces';
import { CreateListingDto } from './interfaces/client.swagger';
import { ExchangeType, PaymentMethod } from '@prisma/client';

interface ListingFilters {
  type?: ExchangeType;
  cryptocurrency?: string;
  fiatCurrency?: string;
  minRate?: number;
  maxRate?: number;
  paymentMethods?: PaymentMethod[];
  isActive?: boolean;
}

@ApiTags('Listings')
@Controller('api/listings')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ListingsGatewayController extends BaseGrpcClient implements OnModuleInit {
  private listingService: ListingService;

  constructor(
    @Inject('LISTING_PACKAGE') protected readonly client: ClientGrpc,
    private readonly exchangeClient: ExchangeGrpcClient,
    private readonly listingsService: ListingsService
  ) {
    super(client, 'ListingService');
  }

  onModuleInit() {
    this.listingService = this.getService<ListingService>('ListingService');
  }

  @Post()
  @ApiOperation({ summary: 'Создать объявление' })
  @ApiResponse({ status: 201, description: 'Объявление успешно создано' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles', ['Exchanger'])
  async create(@Body() dto: CreateListingDto): Promise<Listing> {
    return this.callGrpcMethod<Listing>(this.listingService.CreateListing, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all listings' })
  @ApiResponse({ status: 200, description: 'Return all listings.' })
  async findAll(@Query() query: ListingFilters): Promise<Listing[]> {
    return this.callGrpcMethod<Listing[]>(this.listingService.ListListings, query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a listing by id' })
  @ApiResponse({ status: 200, description: 'Return the listing.' })
  @ApiResponse({ status: 404, description: 'Listing not found.' })
  async findOne(@Param('id') id: string): Promise<Listing> {
    const result = await this.callGrpcMethod<Listing>(this.listingService.GetListing, { id });
    if (!result) {
      throw new BadRequestException('Listing not found');
    }
    return result;
  }

  @Post(':id/update')
  @ApiOperation({ summary: 'Update a listing' })
  @ApiResponse({ status: 200, description: 'The listing has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Listing not found.' })
  async update(@Param('id') id: string, @Body() updateListingDto: UpdateListingDto): Promise<Listing> {
    const result = await this.listingsService.updateListingStatus(id, updateListingDto.isActive ?? false);
    if (!result) {
      throw new BadRequestException('Failed to update listing');
    }
    return result;
  }

  @Post(':id/activate')
  @ApiOperation({ summary: 'Activate a listing' })
  @ApiResponse({ status: 200, description: 'The listing has been successfully activated.' })
  @ApiResponse({ status: 404, description: 'Listing not found.' })
  async activate(@Param('id') id: string): Promise<Listing> {
    const result = await this.listingsService.updateListingStatus(id, true);
    if (!result) {
      throw new BadRequestException('Failed to activate listing');
    }
    return result;
  }

  @Post(':id/deactivate')
  @ApiOperation({ summary: 'Deactivate a listing' })
  @ApiResponse({ status: 200, description: 'The listing has been successfully deactivated.' })
  @ApiResponse({ status: 404, description: 'Listing not found.' })
  async deactivate(@Param('id') id: string): Promise<Listing> {
    const result = await this.listingsService.updateListingStatus(id, false);
    if (!result) {
      throw new BadRequestException('Failed to deactivate listing');
    }
    return result;
  }
} 