import { Injectable, Logger, NotFoundException, ForbiddenException, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateReviewDto } from './dto/create-review.dto';
import { NotificationsGateway } from '../notifications/notifications.gateway';
import { NotificationType } from '../client/interfaces/enums';
import { KafkaProducerService } from '../kafka/kafka.producer';

@Injectable()
export class ReviewsService {
  private readonly logger = new Logger(ReviewsService.name);

  constructor(
    private prisma: PrismaService,
    private notificationsGateway: NotificationsGateway,
    private readonly kafkaProducer: KafkaProducerService,
  ) {}

  async findAll() {
    try {
      const reviews = await this.prisma.review.findMany({
        include: {
          transaction: true,
          author: true,
          target: true
        }
      });

      await this.kafkaProducer.sendMessage('reviews', {
        type: 'LIST',
        data: { count: reviews.length },
        timestamp: new Date().toISOString()
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
    } catch (error) {
      this.logger.error(`Failed to fetch reviews: ${error.message}`);
      throw error;
    }
  }

  async createReview(data: {
    transactionId: string;
    authorId: string;
    rating: number;
    comment?: string;
  }) {
    try {
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

      await this.kafkaProducer.sendMessage('reviews', {
        type: 'CREATE',
        data: review,
        timestamp: new Date().toISOString()
      });

      this.notificationsGateway.notifyUser(transaction.exchangerId, NotificationType.REVIEW_CREATED, {
        reviewId: review.id,
        rating: review.rating,
        comment: review.comment
      });

      return review;
    } catch (error) {
      this.logger.error(`Failed to create review: ${error.message}`);
      throw error;
    }
  }

  async updateReview(data: {
    reviewId: string;
    authorId: string;
    rating?: number;
    comment?: string;
  }) {
    try {
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

      await this.kafkaProducer.sendMessage('reviews', {
        type: 'UPDATE',
        data: updatedReview,
        timestamp: new Date().toISOString()
      });

      this.notificationsGateway.notifyUser(review.targetId, NotificationType.REVIEW_UPDATED, {
        reviewId: review.id,
        rating: updatedReview.rating,
        comment: updatedReview.comment
      });

      return updatedReview;
    } catch (error) {
      this.logger.error(`Failed to update review ${data.reviewId}: ${error.message}`);
      throw error;
    }
  }

  async getReview(reviewId: string) {
    try {
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

      await this.kafkaProducer.sendMessage('reviews', {
        type: 'GET',
        data: { id: review.id },
        timestamp: new Date().toISOString()
      });

      return review;
    } catch (error) {
      this.logger.error(`Failed to get review ${reviewId}: ${error.message}`);
      throw error;
    }
  }

  async getUserReviews(filters: {
    userId: string;
    asReviewer: boolean;
    page?: number;
    limit?: number;
  }) {
    try {
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

      await this.kafkaProducer.sendMessage('reviews', {
        type: 'LIST',
        data: { userId, count: reviews.length },
        timestamp: new Date().toISOString()
      });

      return {
        reviews,
        total,
        page,
        limit,
      };
    } catch (error) {
      this.logger.error(`Failed to get user reviews for ${filters.userId}: ${error.message}`);
      throw error;
    }
  }

  async getReviewsByUserId(userId: string) {
    try {
      const reviews = await this.prisma.review.findMany({
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

      await this.kafkaProducer.sendMessage('reviews', {
        type: 'LIST',
        data: { userId, count: reviews.length },
        timestamp: new Date().toISOString()
      });

      return reviews;
    } catch (error) {
      this.logger.error(`Failed to get reviews by user ${userId}: ${error.message}`);
      throw error;
    }
  }

  async leaveReview(userId: string, transactionId: string, review: string, rating: number) {
    try {
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
    
      const createdReview = await this.prisma.review.create({
        data: {
          rating,
          comment: review,
          transactionId,
          authorId: userId,
          targetId: transaction.exchangerId,
        },
      });
    
      await this.kafkaProducer.sendMessage('reviews', {
        type: 'CREATE',
        data: createdReview,
        timestamp: new Date().toISOString()
      });

      await this.notificationsGateway.notifyUser(transaction.exchangerId, NotificationType.REVIEW_CREATED, {
        reviewId: createdReview.id,
        rating: createdReview.rating,
        comment: createdReview.comment
      });

      return createdReview;
    } catch (error) {
      this.logger.error(`Failed to leave review for transaction ${transactionId}: ${error.message}`);
      throw error;
    }
  }
}
