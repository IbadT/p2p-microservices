import { Controller, Post, Body, UseGuards, Get, Param, OnModuleInit, Inject } from '@nestjs/common';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { RateLimitGuard } from '../shared/guards/rate-limit.guard';
import { ReviewsService } from '../reviews/reviews.service';
import { CreateReviewDto } from '../reviews/dto/create-review.dto';
import { ApiTags, ApiBearerAuth, ApiSecurity } from '@nestjs/swagger';
import {
  ApiCreateReview,
  ApiGetAllReviews,
  ApiGetReviewsByUser,
  ApiGetReviewById
} from './swagger/client.swagger';
import { BaseGrpcClient } from './base/base.grpc.client';
import { ClientGrpc } from '@nestjs/microservices';

@ApiTags('Reviews')
@Controller('reviews')
@UseGuards(JwtAuthGuard, RateLimitGuard)
@ApiSecurity('JWT-auth')
export class ReviewsGatewayController extends BaseGrpcClient implements OnModuleInit {
  constructor(
    @Inject('REVIEWS_PACKAGE') protected readonly client: ClientGrpc,
    private readonly reviewsService: ReviewsService
  ) {
    super(client, 'ReviewsService');
  }

  @Post()
  @ApiCreateReview()
  async create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.createReview(createReviewDto);
  }

  @Get()
  @ApiGetAllReviews()
  async findAll() {
    return this.reviewsService.findAll();
  }

  @Get(':id')
  @ApiGetReviewById()
  async findOne(@Param('id') id: string) {
    return this.reviewsService.getReview(id);
  }

  @Get('user/:userId')
  @ApiGetReviewsByUser()
  async findByUser(@Param('userId') userId: string) {
    return this.reviewsService.getReviewsByUserId(userId);
  }
} 