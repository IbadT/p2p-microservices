import { Injectable, Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { BaseGrpcClient } from '../base/base.grpc.client';
import { BALANCE_SERVICE } from '../constants';
import { GetBalanceDto, CreateHoldDto } from '../interfaces/client.swagger';

@Injectable()
export class BalanceGrpcClient extends BaseGrpcClient {
  constructor(
    @Inject(BALANCE_SERVICE) client: ClientGrpc,
  ) {
    super(client, 'BalanceService');
  }

  /**
   * Получает баланс пользователя
   * @param dto - Данные для получения баланса
   * @returns {Promise<UserBalance>} Баланс пользователя
   */
  async getBalance(dto: GetBalanceDto) {
    const service = this.getService<any>('BalanceService');
    return this.callGrpcMethod(service.getBalance, dto);
  }

  /**
   * Создает холд на балансе
   * @param dto - Данные для создания холда
   * @returns {Promise<BalanceHold>} Созданный холд
   */
  async createHold(dto: CreateHoldDto) {
    const service = this.getService<any>('BalanceService');
    return this.callGrpcMethod(service.createHold, dto);
  }

  /**
   * Освобождает холд
   * @param holdId - ID холда
   * @returns {Promise<void>}
   */
  async releaseHold(holdId: string) {
    const service = this.getService<any>('BalanceService');
    return this.callGrpcMethod(service.releaseHold, { holdId });
  }

  /**
   * Переводит средства между пользователями
   * @param fromUserId - ID отправителя
   * @param toUserId - ID получателя
   * @param amount - Сумма
   * @param cryptocurrency - Криптовалюта
   * @returns {Promise<void>}
   */
  async transfer(fromUserId: string, toUserId: string, amount: number, cryptocurrency: string) {
    const service = this.getService<any>('BalanceService');
    return this.callGrpcMethod(service.transfer, {
      fromUserId,
      toUserId,
      amount,
      cryptocurrency,
    });
  }
} 