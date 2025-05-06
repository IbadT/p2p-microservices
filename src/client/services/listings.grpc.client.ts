import { Injectable, Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { BaseGrpcClient } from '../base/base.grpc.client';
import { LISTINGS_SERVICE } from '../constants';
import { CreateListingDto, UpdateListingDto } from '../interfaces/client.swagger';

@Injectable()
export class ListingsGrpcClient extends BaseGrpcClient {
  constructor(
    @Inject(LISTINGS_SERVICE) client: ClientGrpc,
  ) {
    super(client, 'ListingsService');
  }

  /**
   * Создает новый список
   * @param dto - Данные для создания списка
   * @returns {Promise<Listing>} Созданный список
   */
  async createListing(dto: CreateListingDto) {
    const service = this.getService<any>('ListingsService');
    return this.callGrpcMethod(service.createListing, dto);
  }

  /**
   * Обновляет список
   * @param dto - Данные для обновления
   * @returns {Promise<Listing>} Обновленный список
   */
  async updateListing(dto: UpdateListingDto) {
    const service = this.getService<any>('ListingsService');
    return this.callGrpcMethod(service.updateListing, dto);
  }

  /**
   * Получает список по ID
   * @param listingId - ID списка
   * @returns {Promise<Listing>} Список
   */
  async getListing(listingId: string) {
    const service = this.getService<any>('ListingsService');
    return this.callGrpcMethod(service.getListing, { listingId });
  }

  /**
   * Получает список списков пользователя
   * @param userId - ID пользователя
   * @param query - Параметры фильтрации
   * @returns {Promise<Listing[]>} Список списков
   */
  async getUserListings(userId: string, query: { isActive?: boolean }) {
    const service = this.getService<any>('ListingsService');
    return this.callGrpcMethod(service.getUserListings, { userId, ...query });
  }

  /**
   * Получает список всех активных списков
   * @param query - Параметры фильтрации
   * @returns {Promise<Listing[]>} Список списков
   */
  async getActiveListings(query: { type?: string; cryptocurrency?: string; fiatCurrency?: string }) {
    const service = this.getService<any>('ListingsService');
    return this.callGrpcMethod(service.getActiveListings, query);
  }

  /**
   * Активирует список
   * @param listingId - ID списка
   * @param userId - ID пользователя
   * @returns {Promise<Listing>} Обновленный список
   */
  async activateListing(listingId: string, userId: string) {
    const service = this.getService<any>('ListingsService');
    return this.callGrpcMethod(service.activateListing, { listingId, userId });
  }

  /**
   * Деактивирует список
   * @param listingId - ID списка
   * @param userId - ID пользователя
   * @returns {Promise<Listing>} Обновленный список
   */
  async deactivateListing(listingId: string, userId: string) {
    const service = this.getService<any>('ListingsService');
    return this.callGrpcMethod(service.deactivateListing, { listingId, userId });
  }

  /**
   * Удаляет список
   * @param listingId - ID списка
   * @param userId - ID пользователя
   * @returns {Promise<void>}
   */
  async deleteListing(listingId: string, userId: string) {
    const service = this.getService<any>('ListingsService');
    return this.callGrpcMethod(service.deleteListing, { listingId, userId });
  }
} 