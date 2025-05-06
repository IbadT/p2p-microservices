import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BalanceGrpcClient } from './services/balance.grpc.client';
import { 
  GetBalanceDto,
  CreateHoldDto,
  ReleaseHoldDto,
  TransferDto,
  DepositDto,
  WithdrawDto,
  GetTransactionHistoryDto
} from './dto/balance.dto';
import {
  ApiGetBalance,
  ApiCreateHold,
  ApiReleaseHold,
  ApiTransfer,
  ApiDeposit,
  ApiWithdraw,
  ApiGetTransactionHistory
} from './swagger/client.swagger';

@ApiTags('Balance')
@Controller('balance')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class BalanceGatewayController {
  constructor(private readonly balanceClient: BalanceGrpcClient) {}

  @Get(':userId')
  @ApiGetBalance()
  async getBalance(@Param('userId') userId: string) {
    return this.balanceClient.getBalance({ userId });
  }

  @Post('holds')
  @ApiCreateHold()
  async createHold(@Body() dto: CreateHoldDto) {
    return this.balanceClient.createHold(dto);
  }

  @Post('holds/:holdId/release')
  @ApiReleaseHold()
  async releaseHold(@Param('holdId') holdId: string) {
    return this.balanceClient.releaseHold({ holdId });
  }

  @Post('transfer')
  @ApiTransfer()
  async transfer(@Body() dto: TransferDto) {
    return this.balanceClient.transfer(dto);
  }

  @Post('deposit')
  @ApiDeposit()
  async deposit(@Body() dto: DepositDto) {
    return this.balanceClient.deposit(dto);
  }

  @Post('withdraw')
  @ApiWithdraw()
  async withdraw(@Body() dto: WithdrawDto) {
    return this.balanceClient.withdraw(dto);
  }

  @Get(':userId/history')
  @ApiGetTransactionHistory()
  async getTransactionHistory(
    @Param('userId') userId: string,
    @Query('cryptocurrency') cryptocurrency?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    const dto: GetTransactionHistoryDto = {
      userId,
      cryptocurrency,
      startDate,
      endDate,
      page,
      limit,
    };
    return this.balanceClient.getTransactionHistory(dto);
  }
} 