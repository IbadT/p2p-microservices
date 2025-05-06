import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ReviewsService } from '../reviews/reviews.service';
import { CreateReviewDto } from '../reviews/dto/create-review.dto';

@ApiTags('reviews')
@Controller('reviews')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ReviewsGatewayController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new review' })
  @ApiResponse({ status: 201, description: 'The review has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.createReview(createReviewDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all reviews' })
  @ApiResponse({ status: 200, description: 'Return all reviews.' })
  async findAll() {
    return this.reviewsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a review by id' })
  @ApiResponse({ status: 200, description: 'Return the review.' })
  @ApiResponse({ status: 404, description: 'Review not found.' })
  async findOne(@Param('id') id: string) {
    return this.reviewsService.getReview(id);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get all reviews for a user' })
  @ApiResponse({ status: 200, description: 'Return all reviews for the user.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async findByUser(@Param('userId') userId: string) {
    return this.reviewsService.getReviewsByUserId(userId);
  }
} 