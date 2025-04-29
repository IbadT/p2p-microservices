import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ReviewsService } from './reviews.service';
import { 
  CreateReviewRequest, 
  UpdateReviewRequest, 
  GetReviewRequest, 
  GetUserReviewsRequest 
} from '../proto/generated/reviews.pb';

@Controller()
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @GrpcMethod('ReviewsService', 'CreateReview')
  async createReview(data: CreateReviewRequest) {
    return this.reviewsService.createReview({
      reviewerId: data.reviewerId,
      reviewedId: data.reviewedId,
      rating: data.rating,
      comment: data.comment,
      exchangeId: data.exchangeId,
    });
  }

  @GrpcMethod('ReviewsService', 'UpdateReview')
  async updateReview(data: UpdateReviewRequest) {
    return this.reviewsService.updateReview(data.reviewId, {
      rating: data.rating,
      comment: data.comment,
    });
  }

  @GrpcMethod('ReviewsService', 'GetReview')
  async getReview(data: GetReviewRequest) {
    return this.reviewsService.getReview(data.reviewId);
  }

  @GrpcMethod('ReviewsService', 'GetUserReviews')
  async getUserReviews(data: GetUserReviewsRequest) {
    return this.reviewsService.getUserReviews({
      userId: data.userId,
      asReviewer: data.asReviewer,
      page: data.page,
      limit: data.limit,
    });
  }
}
