import { Controller, Get, Post, Body, Query, Param, Inject, OnModuleInit, UseGuards, SetMetadata, BadRequestException, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
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
import {
  ApiCreateListing,
  ApiGetAllListings,
  ApiGetListingById,
  ApiUpdateListing,
  ApiDeleteListing
} from './swagger/client.swagger';

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
    super(client, 'ListingsService');
  }

  onModuleInit() {
    this.listingService = this.getService<ListingService>('ListingsService');
  }

  @Post()
  @ApiCreateListing()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles', ['Exchanger'])
  async createListing(@Body() dto: CreateListingDto): Promise<Listing> {
    return this.callGrpcMethod<Listing>(this.listingService.CreateListing, dto);
  }

  @Get()
  @ApiGetAllListings()
  async findAll(@Query() query: ListingFilters): Promise<Listing[]> {
    return this.callGrpcMethod<Listing[]>(this.listingService.ListListings, query);
  }

  @Get(':id')
  @ApiGetListingById()
  async findOne(@Param('id') id: string): Promise<Listing> {
    const result = await this.callGrpcMethod<Listing>(this.listingService.GetListing, { id });
    if (!result) {
      throw new BadRequestException('Listing not found');
    }
    return result;
  }

  @Put(':id')
  @ApiUpdateListing()
  async update(@Param('id') id: string, @Body('isActive') isActive: boolean): Promise<Listing> {
    const result = await this.listingsService.updateListingStatus(id, isActive);
    if (!result) {
      throw new BadRequestException('Failed to update listing');
    }
    return result;
  }

  @Delete(':id')
  @ApiDeleteListing()
  async remove(@Param('id') id: string): Promise<void> {
    return this.callGrpcMethod<void>(this.listingService.DeleteListing, { id });
  }
} 