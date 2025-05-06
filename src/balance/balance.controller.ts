import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { BalanceService } from './balance.service';
import { 
  GetBalanceRequest,
  CreateHoldRequest,
  ReleaseHoldRequest,
  TransferRequest,
  DepositRequest,
  WithdrawRequest
} from '../proto/generated/balance.pb';

type HoldType = 'EXCHANGE_OFFER' | 'DISPUTE' | 'SYSTEM';

@Controller()
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @GrpcMethod('BalanceService', 'GetBalance')
  async getBalance(data: GetBalanceRequest) {
    return this.balanceService.getBalance(data.userId);
  }

  @GrpcMethod('BalanceService', 'CreateHold')
  async createHold(data: CreateHoldRequest) {
    return this.balanceService.createHold(
      data.userId,
      data.cryptocurrency,
      data.amount,
      data.type as HoldType,
      data.relatedTransactionId
    );
  }

  @GrpcMethod('BalanceService', 'ReleaseHold')
  async releaseHold(data: ReleaseHoldRequest) {
    return this.balanceService.releaseHold(data.holdId);
  }

  @GrpcMethod('BalanceService', 'Transfer')
  async transfer(data: TransferRequest) {
    return this.balanceService.transfer(
      data.fromUserId,
      data.toUserId,
      data.cryptocurrency,
      data.amount,
      data.transactionId
    );
  }

  @GrpcMethod('BalanceService', 'Deposit')
  async deposit(data: DepositRequest) {
    return this.balanceService.deposit(
      data.userId,
      data.cryptocurrency,
      data.amount
    );
  }

  @GrpcMethod('BalanceService', 'Withdraw')
  async withdraw(data: WithdrawRequest) {
    return this.balanceService.withdraw(
      data.userId,
      data.cryptocurrency,
      data.amount
    );
  }
}