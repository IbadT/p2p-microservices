import { Controller, Get, Post, Body, Query, Param, Inject, OnModuleInit, UseGuards, SetMetadata } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ClientGrpc } from '@nestjs/microservices';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { RolesGuard } from '../shared/guards/roles.guard';
import { ExchangeGrpcClient } from './services/exchange.grpc.client';
import { ListingsService } from '../listings/listings.service';
import { UpdateListingDto } from '../listings/dto/update-listing.dto';

@ApiTags('Listings')
@Controller('api/listings')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ListingsGatewayController implements OnModuleInit {
  private listingService;
  constructor(
    @Inject('LISTING_PACKAGE') private client: ClientGrpc,
    private readonly exchangeClient: ExchangeGrpcClient,
    private readonly listingsService: ListingsService
  ) {}
  onModuleInit() {
    this.listingService = this.client.getService('ListingService');
  }
  @Post()
  @ApiOperation({ summary: 'Создать объявление' })
  @ApiResponse({ status: 201, description: 'Объявление успешно создано' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles', ['Exchanger'])
  create(@Body() dto: any) {
    return this.listingService.CreateListing(dto).toPromise();
  }
  @Get()
  @ApiOperation({ summary: 'Get all listings' })
  @ApiResponse({ status: 200, description: 'Return all listings.' })
  findAll(@Query() query: any) {
    return this.listingService.ListListings(query).toPromise();
  }
  @Get(':id')
  @ApiOperation({ summary: 'Get a listing by id' })
  @ApiResponse({ status: 200, description: 'Return the listing.' })
  @ApiResponse({ status: 404, description: 'Listing not found.' })
  findOne(@Param('id') id: string) {
    return this.listingService.GetListing({ id }).toPromise();
  }
  @Post(':id/update')
  @ApiOperation({ summary: 'Update a listing' })
  @ApiResponse({ status: 200, description: 'The listing has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Listing not found.' })
  async update(@Param('id') id: string, @Body() updateListingDto: UpdateListingDto) {
    return this.listingsService.updateListingStatus(id, updateListingDto.isActive ?? false);
  }
  @Post(':id/activate')
  @ApiOperation({ summary: 'Activate a listing' })
  @ApiResponse({ status: 200, description: 'The listing has been successfully activated.' })
  @ApiResponse({ status: 404, description: 'Listing not found.' })
  async activate(@Param('id') id: string) {
    return this.listingsService.updateListingStatus(id, true);
  }
  @Post(':id/deactivate')
  @ApiOperation({ summary: 'Deactivate a listing' })
  @ApiResponse({ status: 200, description: 'The listing has been successfully deactivated.' })
  @ApiResponse({ status: 404, description: 'Listing not found.' })
  async deactivate(@Param('id') id: string) {
    return this.listingsService.updateListingStatus(id, false);
  }
} 