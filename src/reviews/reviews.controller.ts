import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ReviewsService } from './reviews.service';
import { CreateReviewRequest, GetReviewRequest } from '../proto/generated/reviews.pb';

@Controller()
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @GrpcMethod('ReviewsService', 'CreateReview')
  async createReview(data: CreateReviewRequest) {
    return this.reviewsService.createReview({
      transactionId: data.transactionId,
      authorId: data.authorId,
      targetId: data.targetId,
      rating: data.rating,
      comment: data.comment,
    });
  }

  @GrpcMethod('ReviewsService', 'GetReview')
  async getReview(data: GetReviewRequest) {
    return this.reviewsService.getReview(data.reviewId);
  }
}
