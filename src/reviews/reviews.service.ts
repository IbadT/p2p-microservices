import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/prisma.service';
import { KafkaService } from '../shared/kafka.service';

@Injectable()
export class ReviewsService {
  constructor(
    private prisma: PrismaService,
    private kafka: KafkaService,
  ) {}

  async createReview(data: {
    reviewerId: string;
    reviewedId: string;
    rating: number;
    comment: string;
    exchangeId: string;
  }) {
    const review = await this.prisma.review.create({
      data,
    });

    await this.kafka.emit('review.created', {
      reviewId: review.id,
      reviewerId: review.reviewerId,
      reviewedId: review.reviewedId,
      rating: review.rating,
      exchangeId: review.exchangeId,
    });

    return review;
  }

  async updateReview(reviewId: string, data: {
    rating?: number;
    comment?: string;
  }) {
    const review = await this.prisma.review.update({
      where: { id: reviewId },
      data,
    });

    await this.kafka.emit('review.updated', {
      reviewId: review.id,
      rating: review.rating,
    });

    return review;
  }

  async getReview(reviewId: string) {
    return this.prisma.review.findUnique({
      where: { id: reviewId },
    });
  }

  async getUserReviews(filters: {
    userId: string;
    asReviewer: boolean;
    page?: number;
    limit?: number;
  }) {
    const { userId, asReviewer, page = 1, limit = 10 } = filters;

    const where = {
      [asReviewer ? 'reviewerId' : 'reviewedId']: userId,
    };

    const [total, reviews] = await Promise.all([
      this.prisma.review.count({ where }),
      this.prisma.review.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return {
      reviews,
      total,
      page,
      limit,
    };
  }
}
