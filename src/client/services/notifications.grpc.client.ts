import { Injectable, Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { BaseGrpcClient } from '../base/base.grpc.client';
import { NOTIFICATIONS_SERVICE } from '../constants';
import { Observable } from 'rxjs';
import { NotificationsService, NotificationData, Notification } from '../interfaces/grpc.interfaces';

@Injectable()
export class NotificationsGrpcClient extends BaseGrpcClient {
  constructor(
    @Inject(NOTIFICATIONS_SERVICE) client: ClientGrpc,
  ) {
    super(client, 'NotificationsService');
  }

  /**
   * Отправляет уведомление пользователю
   * @param userId - ID пользователя
   * @param type - Тип уведомления
   * @param data - Данные уведомления
   * @returns {Promise<void>}
   */
  async sendNotification(userId: string, type: string, data: NotificationData): Promise<void> {
    const service = this.getService<NotificationsService>('NotificationsService');
    return this.callGrpcMethod(service.sendNotification, {
      userId,
      type,
      data,
    });
  }

  /**
   * Получает уведомления пользователя
   * @param userId - ID пользователя
   * @returns {Promise<Notification[]>} Список уведомлений
   */
  async getUserNotifications(userId: string): Promise<Notification[]> {
    const service = this.getService<NotificationsService>('NotificationsService');
    return this.callGrpcMethod(service.getUserNotifications, { userId });
  }

  /**
   * Отмечает уведомление как прочитанное
   * @param notificationId - ID уведомления
   * @param userId - ID пользователя
   * @returns {Promise<void>}
   */
  async markAsRead(notificationId: string, userId: string): Promise<void> {
    const service = this.getService<NotificationsService>('NotificationsService');
    return this.callGrpcMethod(service.markAsRead, { notificationId, userId });
  }

  /**
   * Отмечает все уведомления как прочитанные
   * @param userId - ID пользователя
   * @returns {Promise<void>}
   */
  async markAllAsRead(userId: string): Promise<void> {
    const service = this.getService<NotificationsService>('NotificationsService');
    return this.callGrpcMethod(service.markAllAsRead, { userId });
  }

  /**
   * Удаляет уведомление
   * @param notificationId - ID уведомления
   * @param userId - ID пользователя
   * @returns {Promise<void>}
   */
  async deleteNotification(notificationId: string, userId: string): Promise<void> {
    const service = this.getService<NotificationsService>('NotificationsService');
    return this.callGrpcMethod(service.deleteNotification, { notificationId, userId });
  }
} 