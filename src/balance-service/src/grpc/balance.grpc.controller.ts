import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { BalanceService } from '../services/balance.service';
import { Logger } from '@nestjs/common';
import { GrpcError } from '../../../client/interfaces/grpc.interfaces';
import { 
  GetBalanceRequest, 
  CreateHoldRequest, 
  ReleaseHoldRequest, 
  TransferRequest, 
  DepositRequest, 
  WithdrawRequest 
} from '../../../proto/generated/balance.pb';
import { HoldType, Balance, Hold } from '../interfaces/balance.interface';

@Controller()
export class BalanceGrpcController {
  private readonly logger = new Logger(BalanceGrpcController.name);

  constructor(private readonly balanceService: BalanceService) {}

  @GrpcMethod('BalanceService', 'GetBalance')
  async getBalance(data: GetBalanceRequest): Promise<Balance> {
    try {
      const balance = await this.balanceService.getBalance(data.userId);
      return balance as unknown as Balance;
    } catch (error) {
      this.logger.error(`Failed to get balance: ${error.message}`, error.stack);
      throw new GrpcError(error.message, 'INTERNAL');
    }
  }

  @GrpcMethod('BalanceService', 'CreateHold')
  async createHold(data: CreateHoldRequest): Promise<Hold> {
    try {
      const hold = await this.balanceService.createHold(
        data.userId,
        data.cryptocurrency,
        data.amount,
        data.type as HoldType,
        data.relatedTransactionId,
      );
      return hold as unknown as Hold;
    } catch (error) {
      this.logger.error(`Failed to create hold: ${error.message}`, error.stack);
      throw new GrpcError(error.message, 'INTERNAL');
    }
  }

  @GrpcMethod('BalanceService', 'ReleaseHold')
  async releaseHold(data: ReleaseHoldRequest): Promise<{ success: boolean }> {
    try {
      await this.balanceService.releaseHold(data.holdId);
      return { success: true };
    } catch (error) {
      this.logger.error(`Failed to release hold: ${error.message}`, error.stack);
      throw new GrpcError(error.message, 'INTERNAL');
    }
  }

  @GrpcMethod('BalanceService', 'Transfer')
  async transfer(data: TransferRequest): Promise<{ success: boolean }> {
    try {
      await this.balanceService.transfer(
        data.fromUserId,
        data.toUserId,
        data.cryptocurrency,
        data.amount,
      );
      return { success: true };
    } catch (error) {
      this.logger.error(`Failed to transfer: ${error.message}`, error.stack);
      throw new GrpcError(error.message, 'INTERNAL');
    }
  }

  @GrpcMethod('BalanceService', 'Deposit')
  async deposit(data: DepositRequest): Promise<Balance> {
    try {
      const balance = await this.balanceService.deposit(
        data.userId,
        data.cryptocurrency,
        data.amount,
      );
      return balance as unknown as Balance;
    } catch (error) {
      this.logger.error(`Failed to deposit: ${error.message}`, error.stack);
      throw new GrpcError(error.message, 'INTERNAL');
    }
  }

  @GrpcMethod('BalanceService', 'Withdraw')
  async withdraw(data: WithdrawRequest): Promise<Balance> {
    try {
      const balance = await this.balanceService.withdraw(
        data.userId,
        data.cryptocurrency,
        data.amount,
      );
      return balance as unknown as Balance;
    } catch (error) {
      this.logger.error(`Failed to withdraw: ${error.message}`, error.stack);
      throw new GrpcError(error.message, 'INTERNAL');
    }
  }
} 