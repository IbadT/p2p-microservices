import { Injectable, Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { BaseGrpcClient } from '../base/base.grpc.client';
import { BALANCE_SERVICE } from '../constants';
import { 
  GetBalanceRequest, 
  CreateHoldRequest, 
  ReleaseHoldRequest, 
  TransferRequest, 
  DepositRequest, 
  WithdrawRequest,
  GetTransactionHistoryRequest,
  Balance,
  BalanceHold,
  GetTransactionHistoryResponse
} from '../../proto/generated/balance.pb';

@Injectable()
export class BalanceGrpcClient extends BaseGrpcClient {
  constructor(
    @Inject(BALANCE_SERVICE) client: ClientGrpc,
  ) {
    super(client, 'BalanceService');
  }

  /**
   * Получает баланс пользователя
   * @param request - Данные для получения баланса
   * @returns {Promise<Balance>} Баланс пользователя
   */
  async getBalance(request: GetBalanceRequest): Promise<Balance> {
    const service = this.getService<any>('BalanceService');
    return this.callGrpcMethod(service.getBalance, request);
  }

  /**
   * Создает холд на балансе
   * @param request - Данные для создания холда
   * @returns {Promise<BalanceHold>} Созданный холд
   */
  async createHold(request: CreateHoldRequest): Promise<BalanceHold> {
    const service = this.getService<any>('BalanceService');
    return this.callGrpcMethod(service.createHold, request);
  }

  /**
   * Освобождает холд
   * @param request - Данные для освобождения холда
   * @returns {Promise<void>}
   */
  async releaseHold(request: ReleaseHoldRequest): Promise<void> {
    const service = this.getService<any>('BalanceService');
    return this.callGrpcMethod(service.releaseHold, request);
  }

  /**
   * Переводит средства между пользователями
   * @param request - Данные для перевода
   * @returns {Promise<void>}
   */
  async transfer(request: TransferRequest): Promise<void> {
    const service = this.getService<any>('BalanceService');
    return this.callGrpcMethod(service.transfer, request);
  }

  /**
   * Пополняет баланс пользователя
   * @param request - Данные для пополнения
   * @returns {Promise<Balance>} Обновленный баланс
   */
  async deposit(request: DepositRequest): Promise<Balance> {
    const service = this.getService<any>('BalanceService');
    return this.callGrpcMethod(service.deposit, request);
  }

  /**
   * Снимает средства с баланса пользователя
   * @param request - Данные для снятия
   * @returns {Promise<Balance>} Обновленный баланс
   */
  async withdraw(request: WithdrawRequest): Promise<Balance> {
    const service = this.getService<any>('BalanceService');
    return this.callGrpcMethod(service.withdraw, request);
  }

  /**
   * Получает историю транзакций пользователя
   * @param request - Данные для получения истории
   * @returns {Promise<GetTransactionHistoryResponse>} История транзакций
   */
  async getTransactionHistory(request: GetTransactionHistoryRequest): Promise<GetTransactionHistoryResponse> {
    const service = this.getService<any>('BalanceService');
    return this.callGrpcMethod(service.getTransactionHistory, request);
  }
} 