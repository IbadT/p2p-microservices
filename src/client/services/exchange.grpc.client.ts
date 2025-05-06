import { Injectable, Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { BaseGrpcClient } from '../base/base.grpc.client';
import { EXCHANGE_SERVICE } from '../constants';
import { 
  CreateListingDto, 
  CreateOfferDto, 
  RespondOfferDto, 
  UpdateTransactionStatusDto,
  ConfirmPaymentDto,
  ConfirmReceiptDto,
  CancelTransactionDto,
  SetExchangerStatusDto,
  FreezeExchangerDto
} from '../interfaces/client.swagger';

@Injectable()
export class ExchangeGrpcClient extends BaseGrpcClient {
  constructor(
    @Inject(EXCHANGE_SERVICE) client: ClientGrpc,
  ) {
    super(client, 'ExchangeService');
  }

  /**
   * Создает новое объявление об обмене
   * @param dto - Данные для создания объявления
   * @returns {Promise<ExchangeListing>} Созданное объявление
   */
  async createListing(dto: CreateListingDto) {
    const service = this.getService<any>('ExchangeService');
    return this.callGrpcMethod(service.createListing, dto);
  }

  /**
   * Получает список объявлений об обмене
   * @param query - Параметры фильтрации
   * @returns {Promise<ExchangeListing[]>} Список объявлений
   */
  async getListings(query: {
    type?: string;
    cryptocurrency?: string;
    fiatCurrency?: string;
    minRate?: number;
    maxRate?: number;
    paymentMethods?: string[];
    isActive?: boolean;
  }) {
    const service = this.getService<any>('ExchangeService');
    return this.callGrpcMethod(service.getListings, query);
  }

  /**
   * Создает новое предложение об обмене
   * @param dto - Данные для создания предложения
   * @returns {Promise<ExchangeOffer>} Созданное предложение
   */
  async createOffer(dto: CreateOfferDto) {
    const service = this.getService<any>('ExchangeService');
    return this.callGrpcMethod(service.createOffer, dto);
  }

  /**
   * Отвечает на предложение об обмене
   * @param dto - Данные для ответа на предложение
   * @returns {Promise<ExchangeOffer>} Обновленное предложение
   */
  async respondOffer(dto: RespondOfferDto) {
    const service = this.getService<any>('ExchangeService');
    return this.callGrpcMethod(service.respondOffer, dto);
  }

  /**
   * Обновляет статус транзакции
   * @param dto - Данные для обновления статуса
   * @returns {Promise<ExchangeTransaction>} Обновленная транзакция
   */
  async updateTransactionStatus(dto: UpdateTransactionStatusDto) {
    const service = this.getService<any>('ExchangeService');
    return this.callGrpcMethod(service.updateTransactionStatus, dto);
  }

  /**
   * Получает активные обмены пользователя
   * @param userId - ID пользователя
   * @returns {Promise<ExchangeTransaction[]>} Список активных обменов
   */
  async getActiveExchanges(userId: string) {
    const service = this.getService<any>('ExchangeService');
    return this.callGrpcMethod(service.getActiveExchanges, { userId });
  }

  /**
   * Подтверждает оплату
   * @param dto - Данные для подтверждения оплаты
   * @returns {Promise<ExchangeTransaction>} Обновленная транзакция
   */
  async confirmPayment(dto: ConfirmPaymentDto) {
    const service = this.getService<any>('ExchangeService');
    return this.callGrpcMethod(service.confirmPayment, dto);
  }

  /**
   * Подтверждает получение средств
   * @param dto - Данные для подтверждения получения
   * @returns {Promise<ExchangeTransaction>} Обновленная транзакция
   */
  async confirmReceipt(dto: ConfirmReceiptDto) {
    const service = this.getService<any>('ExchangeService');
    return this.callGrpcMethod(service.confirmReceipt, dto);
  }

  /**
   * Отменяет транзакцию
   * @param dto - Данные для отмены транзакции
   * @returns {Promise<ExchangeTransaction>} Отмененная транзакция
   */
  async cancelTransaction(dto: CancelTransactionDto) {
    const service = this.getService<any>('ExchangeService');
    return this.callGrpcMethod(service.cancelTransaction, dto);
  }

  /**
   * Устанавливает статус обменника
   * @param dto - Данные для установки статуса
   * @returns {Promise<ExchangerStatus>} Обновленный статус
   */
  async setExchangerStatus(dto: SetExchangerStatusDto) {
    const service = this.getService<any>('ExchangeService');
    return this.callGrpcMethod(service.setExchangerStatus, dto);
  }

  /**
   * Замораживает обменник
   * @param dto - Данные для заморозки
   * @returns {Promise<ExchangerStatus>} Статус заморозки
   */
  async freezeExchanger(dto: FreezeExchangerDto) {
    const service = this.getService<any>('ExchangeService');
    return this.callGrpcMethod(service.freezeExchanger, dto);
  }
} 