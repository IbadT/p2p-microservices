import { Injectable, Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { BaseGrpcClient } from '../base/base.grpc.client';
import { TRANSACTIONS_SERVICE } from '../constants';
import { CreateTransactionDto, UpdateTransactionDto } from '../interfaces/client.swagger';

@Injectable()
export class TransactionsGrpcClient extends BaseGrpcClient {
  constructor(
    @Inject(TRANSACTIONS_SERVICE) client: ClientGrpc,
  ) {
    super(client, 'TransactionsService');
  }

  /**
   * Создает новую транзакцию
   * @param dto - Данные для создания транзакции
   * @returns {Promise<Transaction>} Созданная транзакция
   */
  async createTransaction(dto: CreateTransactionDto) {
    const service = this.getService<any>('TransactionsService');
    return this.callGrpcMethod(service.createTransaction, dto);
  }

  /**
   * Обновляет транзакцию
   * @param dto - Данные для обновления
   * @returns {Promise<Transaction>} Обновленная транзакция
   */
  async updateTransaction(dto: UpdateTransactionDto) {
    const service = this.getService<any>('TransactionsService');
    return this.callGrpcMethod(service.updateTransaction, dto);
  }

  /**
   * Получает транзакцию по ID
   * @param transactionId - ID транзакции
   * @returns {Promise<Transaction>} Транзакция
   */
  async getTransaction(transactionId: string) {
    const service = this.getService<any>('TransactionsService');
    return this.callGrpcMethod(service.getTransaction, { transactionId });
  }

  /**
   * Получает список транзакций пользователя
   * @param userId - ID пользователя
   * @param query - Параметры фильтрации
   * @returns {Promise<Transaction[]>} Список транзакций
   */
  async getUserTransactions(userId: string, query: { status?: string; type?: string }) {
    const service = this.getService<any>('TransactionsService');
    return this.callGrpcMethod(service.getUserTransactions, { userId, ...query });
  }

  /**
   * Получает статистику транзакций пользователя
   * @param userId - ID пользователя
   * @returns {Promise<TransactionStats>} Статистика транзакций
   */
  async getUserTransactionStats(userId: string) {
    const service = this.getService<any>('TransactionsService');
    return this.callGrpcMethod(service.getUserTransactionStats, { userId });
  }

  /**
   * Подтверждает платеж
   * @param transactionId - ID транзакции
   * @param userId - ID пользователя
   * @returns {Promise<Transaction>} Обновленная транзакция
   */
  async confirmPayment(transactionId: string, userId: string) {
    const service = this.getService<any>('TransactionsService');
    return this.callGrpcMethod(service.confirmPayment, { transactionId, userId });
  }

  /**
   * Подтверждает получение
   * @param transactionId - ID транзакции
   * @param userId - ID пользователя
   * @returns {Promise<Transaction>} Обновленная транзакция
   */
  async confirmReceipt(transactionId: string, userId: string) {
    const service = this.getService<any>('TransactionsService');
    return this.callGrpcMethod(service.confirmReceipt, { transactionId, userId });
  }

  /**
   * Отменяет транзакцию
   * @param transactionId - ID транзакции
   * @param userId - ID пользователя
   * @returns {Promise<Transaction>} Обновленная транзакция
   */
  async cancelTransaction(transactionId: string, userId: string) {
    const service = this.getService<any>('TransactionsService');
    return this.callGrpcMethod(service.cancelTransaction, { transactionId, userId });
  }
} 