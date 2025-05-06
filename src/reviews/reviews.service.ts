import { Injectable, Logger, NotFoundException, ForbiddenException, ConflictException } from '@nestjs/common';
// import { PrismaService } from '../shared/prisma.service';
// import { KafkaService } from '../shared/kafka.service';
import { KafkaService } from 'src/kafka/kafka.service';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateReviewDto } from './dto/create-review.dto';
import { NotificationsGateway } from '../notifications/notifications.gateway';
import { NotificationType } from '../client/interfaces/enums';

@Injectable()
export class ReviewsService {
  constructor(
    private prisma: PrismaService,
    private kafka: KafkaService,
    private notificationsGateway: NotificationsGateway,
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

  async createReview(data: {
    transactionId: string;
    authorId: string;
    rating: number;
    comment?: string;
  }) {
    const transaction = await this.prisma.exchangeTransaction.findUnique({
      where: { id: data.transactionId }
    });

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    if (!['COMPLETED', 'FINISHED', 'DISPUTED'].includes(transaction.status)) {
      this.logger.warn(`Review can only be left after COMPLETED, FINISHED or DISPUTED. Current status: ${transaction.status}`);
      throw new ForbiddenException('Can only review completed, finished or disputed transactions');
    }

    const review = await this.prisma.review.create({
      data: {
        transactionId: data.transactionId,
        authorId: data.authorId,
        targetId: transaction.exchangerId,
        rating: data.rating,
        comment: data.comment,
      },
    });

    await this.kafka.sendEvent({
      type: NotificationType.REVIEW_CREATED,
      payload: {
        reviewId: review.id,
        authorId: review.authorId,
        targetId: review.targetId,
        transactionId: review.transactionId,
        rating: review.rating,
      },
    });

    this.notificationsGateway.notifyUser(transaction.exchangerId, NotificationType.REVIEW_CREATED, {
      reviewId: review.id,
      rating: review.rating,
      comment: review.comment
    });

    return review;
  }

  async updateReview(data: {
    reviewId: string;
    authorId: string;
    rating?: number;
    comment?: string;
  }) {
    const review = await this.prisma.review.findUnique({
      where: { id: data.reviewId },
      include: { transaction: true }
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    if (review.authorId !== data.authorId) {
      throw new ForbiddenException('Only review author can update the review');
    }

    const updatedReview = await this.prisma.review.update({
      where: { id: data.reviewId },
      data: {
        rating: data.rating,
        comment: data.comment,
      },
    });

    await this.kafka.sendEvent({
      type: NotificationType.REVIEW_UPDATED,
      payload: { reviewId: review.id }
    });

    this.notificationsGateway.notifyUser(review.targetId, NotificationType.REVIEW_UPDATED, {
      reviewId: review.id,
      rating: updatedReview.rating,
      comment: updatedReview.comment
    });

    return updatedReview;
  }

  async getReview(reviewId: string) {
    const review = await this.prisma.review.findUnique({
      where: { id: reviewId },
      include: {
        author: {
          select: {
            id: true,
            email: true,
          },
        },
        transaction: true,
      },
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    return review;
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
      type: NotificationType.REVIEW_CREATED,
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
