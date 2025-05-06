import { Injectable, Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { BaseGrpcClient } from '../base/base.grpc.client';
import { TYPES_SERVICE } from '../constants';

@Injectable()
export class TypesGrpcClient extends BaseGrpcClient {
  constructor(
    @Inject(TYPES_SERVICE) client: ClientGrpc,
  ) {
    super(client, 'TypesService');
  }

  /**
   * Получает список криптовалют
   * @returns {Promise<string[]>} Список криптовалют
   */
  async getCryptocurrencies() {
    const service = this.getService<any>('TypesService');
    return this.callGrpcMethod(service.getCryptocurrencies);
  }

  /**
   * Получает список фиатных валют
   * @returns {Promise<string[]>} Список фиатных валют
   */
  async getFiatCurrencies() {
    const service = this.getService<any>('TypesService');
    return this.callGrpcMethod(service.getFiatCurrencies);
  }

  /**
   * Получает список способов оплаты
   * @returns {Promise<string[]>} Список способов оплаты
   */
  async getPaymentMethods() {
    const service = this.getService<any>('TypesService');
    return this.callGrpcMethod(service.getPaymentMethods);
  }

  /**
   * Получает список статусов транзакций
   * @returns {Promise<string[]>} Список статусов транзакций
   */
  async getTransactionStatuses() {
    const service = this.getService<any>('TypesService');
    return this.callGrpcMethod(service.getTransactionStatuses);
  }

  /**
   * Получает список ролей пользователей
   * @returns {Promise<string[]>} Список ролей пользователей
   */
  async getUserRoles() {
    const service = this.getService<any>('TypesService');
    return this.callGrpcMethod(service.getUserRoles);
  }
} 