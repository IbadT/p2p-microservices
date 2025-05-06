import { Injectable, Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { BaseGrpcClient } from '../base/base.grpc.client';
import { P2P_SERVICE } from '../constants';
import { CreateExchangeOfferDto, RespondExchangeOfferDto } from '../interfaces/client.swagger';
import { CreateOfferDto, RespondToOfferDto } from '../interfaces/offer.dto';
import { Offer } from '../interfaces/grpc.interfaces';

@Injectable()
export class P2PGrpcClient extends BaseGrpcClient {
  constructor(
    @Inject(P2P_SERVICE) client: ClientGrpc,
  ) {
    super(client, 'P2PService');
  }

  /**
   * Создает новое предложение обмена
   * @param dto - Данные для создания предложения
   * @returns {Promise<ExchangeOffer>} Созданное предложение
   */
  async createExchangeOffer(dto: CreateExchangeOfferDto) {
    const service = this.getService<any>('P2PService');
    return this.callGrpcMethod(service.createExchangeOffer, dto);
  }

  /**
   * Отвечает на предложение обмена
   * @param dto - Данные для ответа на предложение
   * @returns {Promise<ExchangeOffer>} Обновленное предложение
   */
  async respondExchangeOffer(dto: RespondExchangeOfferDto) {
    const service = this.getService<any>('P2PService');
    return this.callGrpcMethod(service.respondExchangeOffer, dto);
  }

  /**
   * Получает предложение по ID
   * @param id - ID предложения
   * @returns {Promise<ExchangeOffer>} Предложение
   */
  async getOffer(id: string) {
    const service = this.getService<any>('P2PService');
    return this.callGrpcMethod(service.getOffer, { id });
  }

  async createOffer(dto: CreateOfferDto): Promise<Offer> {
    const service = this.getService<any>('P2PService');
    return this.callGrpcMethod(service.createOffer, dto);
  }

  async respondToOffer(dto: RespondToOfferDto): Promise<Offer> {
    const service = this.getService<any>('P2PService');
    return this.callGrpcMethod(service.respondToOffer, dto);
  }

  /**
   * Получает статистику P2P
   * @returns {Promise<P2PStats>} Статистика P2P
   */
  async getStats() {
    const service = this.getService<any>('P2PService');
    return this.callGrpcMethod(service.getStats);
  }

  /**
   * Получает курсы валют
   * @returns {Promise<ExchangeRates>} Курсы валют
   */
  async getExchangeRates() {
    const service = this.getService<any>('P2PService');
    return this.callGrpcMethod(service.getExchangeRates);
  }

  /**
   * Получает лимиты для обмена
   * @returns {Promise<ExchangeLimits>} Лимиты для обмена
   */
  async getExchangeLimits() {
    const service = this.getService<any>('P2PService');
    return this.callGrpcMethod(service.getExchangeLimits);
  }

  /**
   * Получает комиссии для обмена
   * @returns {Promise<ExchangeFees>} Комиссии для обмена
   */
  async getExchangeFees() {
    const service = this.getService<any>('P2PService');
    return this.callGrpcMethod(service.getExchangeFees);
  }

  /**
   * Получает настройки P2P
   * @returns {Promise<P2PSettings>} Настройки P2P
   */
  async getSettings() {
    const service = this.getService<any>('P2PService');
    return this.callGrpcMethod(service.getSettings);
  }

  /**
   * Обновляет настройки P2P
   * @param settings - Новые настройки
   * @returns {Promise<P2PSettings>} Обновленные настройки
   */
  async updateSettings(settings: any) {
    const service = this.getService<any>('P2PService');
    return this.callGrpcMethod(service.updateSettings, settings);
  }
} 