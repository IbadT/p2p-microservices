import { Injectable } from '@nestjs/common';
// import { PrismaService } from '../shared/prisma.service';
// import { KafkaService } from '../shared/kafka.service';
import { KafkaService } from 'src/kafka/kafka.service';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    private prisma: PrismaService,
    private kafka: KafkaService,
  ) {}

  async createReview(data: CreateReviewDto) {
    return this.prisma.review.create({
      data: {
        rating: data.rating,
        comment: data.comment,
        transaction: {
          connect: { id: data.transactionId }
        },
        author: {
          connect: { id: data.authorId }
        },
        target: {
          connect: { id: data.targetId }
        }
      },
      include: {
        transaction: true,
        author: true,
        target: true
      }
    });
  }

  async updateReview(reviewId: string, data: {
    rating?: number;
    comment?: string;
  }) {
    const review = await this.prisma.review.update({
      where: { id: reviewId },
      data,
    });

    // await this.kafka.emit('review.updated', {
    //   reviewId: review.id,
    //   rating: review.rating,
    // });
    await this.kafka.sendEvent({
      type: "",
      payload: {
        reviewId: review.id,
        rating: review.rating,
      }
    });

    return review;
  }

  async getReview(id: string) {
    const review = await this.prisma.review.findUnique({
      where: { id },
      include: {
        transaction: true,
        author: true,
        target: true,
      },
    });

    if (!review) {
      return null;
    }

    return {
      id: review.id,
      rating: review.rating,
      comment: review.comment,
      transactionId: review.transactionId,
      authorId: review.authorId,
      targetId: review.targetId,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
    };
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

  async getReviewsByUserId(userId: string) {
    return this.prisma.review.findMany({
      where: {
        OR: [
          { authorId: userId },
          { targetId: userId }
        ]
      },
      include: {
        transaction: true,
        author: true,
        target: true
      }
    });
  }
}
