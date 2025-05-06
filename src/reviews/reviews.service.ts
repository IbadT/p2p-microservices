import { Injectable, Logger, NotFoundException, ForbiddenException, ConflictException } from '@nestjs/common';
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
  ) {
    this.logger = new Logger(ReviewsService.name);
  }

  private readonly logger = new Logger(ReviewsService.name);

  async findAll() {
    const reviews = await this.prisma.review.findMany({
      include: {
        transaction: true,
        author: true,
        target: true
      }
    });
    return reviews.map(review => ({
      id: review.id,
      rating: review.rating,
      comment: review.comment,
      transactionId: review.transactionId,
      authorId: review.authorId,
      targetId: review.targetId,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
    }));
  }

  async createReview(data: CreateReviewDto) {
    // Проверка: только Customer может оставить отзыв
    const transaction = await this.prisma.exchangeTransaction.findUnique({
      where: { id: data.transactionId },
    });
    if (!transaction) {
      throw new Error('Transaction not found');
    }
    if (!['COMPLETED', 'FINISHED', 'DISPUTED'].includes(transaction.status)) {
      throw new Error('Review can only be left after COMPLETED, FINISHED or DISPUTED');
    }
    if (transaction.customerId !== data.authorId) {
      throw new Error('Only Customer can leave a review');
    }
    // Exchanger не может оставить отзыв
    // (логика выше уже это ограничивает)
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
      type: "review.updated",
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

  async leaveReview(userId: string, transactionId: string, review: string, rating: number) {
    this.logger.log(`User ${userId} is leaving a review for transaction ${transactionId}`);
    const transaction = await this.prisma.exchangeTransaction.findUnique({ where: { id: transactionId } });
    if (!transaction) {
      this.logger.warn(`Transaction ${transactionId} not found`);
      throw new NotFoundException('Transaction not found');
    }
    if (transaction.customerId !== userId) {
      this.logger.warn(`User ${userId} is not the customer for transaction ${transactionId}`);
      throw new ForbiddenException('Only Customer can leave a review');
    }
    if (!['COMPLETED', 'FINISHED', 'DISPUTED'].includes(transaction.status)) {
      this.logger.warn(`Review can only be left after COMPLETED, FINISHED or DISPUTED. Current status: ${transaction.status}`);
      throw new ConflictException('Review can only be left after COMPLETED, FINISHED or DISPUTED');
    }
  
    // Создание отзыва
    const createdReview = await this.prisma.review.create({
      data: {
        rating,
        comment: review,
        transactionId,
        authorId: userId,
        targetId: transaction.exchangerId,
      },
    });
  
    // Можно отправить событие в Kafka, если требуется
    await this.kafka.sendEvent({
      type: "review.created",
      payload: {
        reviewId: createdReview.id,
        authorId: createdReview.authorId,
        targetId: createdReview.targetId,
        transactionId: createdReview.transactionId,
        rating: createdReview.rating,
      },
    });
  
    return createdReview;
  }
}
