import { Injectable, Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { BaseGrpcClient } from '../base/base.grpc.client';
import { REVIEWS_SERVICE } from '../constants';
import { CreateReviewDto } from '../interfaces/client.swagger';

@Injectable()
export class ReviewsGrpcClient extends BaseGrpcClient {
  constructor(
    @Inject(REVIEWS_SERVICE) client: ClientGrpc,
  ) {
    super(client, 'ReviewsService');
  }

  /**
   * Создает новый отзыв
   * @param dto - Данные для создания отзыва
   * @returns {Promise<Review>} Созданный отзыв
   */
  async createReview(dto: CreateReviewDto) {
    const service = this.getService<any>('ReviewsService');
    return this.callGrpcMethod(service.createReview, dto);
  }

  /**
   * Получает отзывы пользователя
   * @param userId - ID пользователя
   * @returns {Promise<Review[]>} Список отзывов
   */
  async getUserReviews(userId: string) {
    const service = this.getService<any>('ReviewsService');
    return this.callGrpcMethod(service.getUserReviews, { userId });
  }

  /**
   * Получает статистику отзывов пользователя
   * @param userId - ID пользователя
   * @returns {Promise<ReviewStats>} Статистика отзывов
   */
  async getUserReviewStats(userId: string) {
    const service = this.getService<any>('ReviewsService');
    return this.callGrpcMethod(service.getUserReviewStats, { userId });
  }

  /**
   * Получает отзыв по ID
   * @param reviewId - ID отзыва
   * @returns {Promise<Review>} Отзыв
   */
  async getReview(reviewId: string) {
    const service = this.getService<any>('ReviewsService');
    return this.callGrpcMethod(service.getReview, { reviewId });
  }

  /**
   * Удаляет отзыв
   * @param reviewId - ID отзыва
   * @param userId - ID пользователя
   * @returns {Promise<void>}
   */
  async deleteReview(reviewId: string, userId: string) {
    const service = this.getService<any>('ReviewsService');
    return this.callGrpcMethod(service.deleteReview, { reviewId, userId });
  }
} 