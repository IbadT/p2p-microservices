import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { BalanceService } from '../services/balance.service';

@Controller()
export class BalanceGrpcController {
  constructor(private readonly balanceService: BalanceService) {}

  @GrpcMethod('BalanceService', 'GetBalance')
  async getBalance(data: any) {
    return this.balanceService.getBalance(data.userId);
  }

  @GrpcMethod('BalanceService', 'CreateHold')
  async createHold(data: any) {
    return this.balanceService.createHold(
      data.userId,
      data.cryptocurrency,
      data.amount,
      data.type,
      data.relatedTransactionId,
    );
  }

  @GrpcMethod('BalanceService', 'ReleaseHold')
  async releaseHold(data: any) {
    await this.balanceService.releaseHold(data.holdId);
    return {};
  }

  @GrpcMethod('BalanceService', 'Transfer')
  async transfer(data: any) {
    await this.balanceService.transfer(
      data.fromUserId,
      data.toUserId,
      data.cryptocurrency,
      data.amount,
    );
    return {};
  }

  @GrpcMethod('BalanceService', 'Deposit')
  async deposit(data: any) {
    return this.balanceService.deposit(
      data.userId,
      data.cryptocurrency,
      data.amount,
    );
  }

  @GrpcMethod('BalanceService', 'Withdraw')
  async withdraw(data: any) {
    return this.balanceService.withdraw(
      data.userId,
      data.cryptocurrency,
      data.amount,
    );
  }
} 