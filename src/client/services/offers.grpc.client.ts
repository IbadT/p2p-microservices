import { Injectable, Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { BaseGrpcClient } from '../base/base.grpc.client';
import { OFFERS_SERVICE } from '../constants';
import { CreateOfferDto, UpdateOfferDto } from '../interfaces/client.swagger';

@Injectable()
export class OffersGrpcClient extends BaseGrpcClient {
  constructor(
    @Inject(OFFERS_SERVICE) client: ClientGrpc,
  ) {
    super(client, 'OffersService');
  }

  /**
   * Создает новое предложение
   * @param dto - Данные для создания предложения
   * @returns {Promise<Offer>} Созданное предложение
   */
  async createOffer(dto: CreateOfferDto) {
    const service = this.getService<any>('OffersService');
    return this.callGrpcMethod(service.createOffer, dto);
  }

  /**
   * Обновляет предложение
   * @param dto - Данные для обновления
   * @returns {Promise<Offer>} Обновленное предложение
   */
  async updateOffer(dto: UpdateOfferDto) {
    const service = this.getService<any>('OffersService');
    return this.callGrpcMethod(service.updateOffer, dto);
  }

  /**
   * Получает предложение по ID
   * @param offerId - ID предложения
   * @returns {Promise<Offer>} Предложение
   */
  async getOffer(offerId: string) {
    const service = this.getService<any>('OffersService');
    return this.callGrpcMethod(service.getOffer, { offerId });
  }

  /**
   * Получает список предложений пользователя
   * @param userId - ID пользователя
   * @param query - Параметры фильтрации
   * @returns {Promise<Offer[]>} Список предложений
   */
  async getUserOffers(userId: string, query: { status?: string }) {
    const service = this.getService<any>('OffersService');
    return this.callGrpcMethod(service.getUserOffers, { userId, ...query });
  }

  /**
   * Получает список предложений для списка
   * @param listingId - ID списка
   * @param query - Параметры фильтрации
   * @returns {Promise<Offer[]>} Список предложений
   */
  async getListingOffers(listingId: string, query: { status?: string }) {
    const service = this.getService<any>('OffersService');
    return this.callGrpcMethod(service.getListingOffers, { listingId, ...query });
  }

  /**
   * Принимает предложение
   * @param offerId - ID предложения
   * @param userId - ID пользователя
   * @returns {Promise<Offer>} Обновленное предложение
   */
  async acceptOffer(offerId: string, userId: string) {
    const service = this.getService<any>('OffersService');
    return this.callGrpcMethod(service.acceptOffer, { offerId, userId });
  }

  /**
   * Отклоняет предложение
   * @param offerId - ID предложения
   * @param userId - ID пользователя
   * @returns {Promise<Offer>} Обновленное предложение
   */
  async declineOffer(offerId: string, userId: string) {
    const service = this.getService<any>('OffersService');
    return this.callGrpcMethod(service.declineOffer, { offerId, userId });
  }

  /**
   * Отменяет предложение
   * @param offerId - ID предложения
   * @param userId - ID пользователя
   * @returns {Promise<Offer>} Обновленное предложение
   */
  async cancelOffer(offerId: string, userId: string) {
    const service = this.getService<any>('OffersService');
    return this.callGrpcMethod(service.cancelOffer, { offerId, userId });
  }
} 