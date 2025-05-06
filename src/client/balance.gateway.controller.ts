// import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BalanceService } from '../balance/balance.service';
import { CreateDepositDto } from '../balance/dto/create-deposit.dto';
// import { TransferDto } from '../balance/dto/transfer.dto';
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
// import { ApiTags } from '@nestjs/swagger';
import { BalanceGrpcClient } from './services/balance.grpc.client';
import { GetBalanceDto, CreateHoldDto } from './interfaces/client.swagger';
import { ApiGetBalance, ApiCreateHold } from './swagger/client.swagger';

@ApiTags('Balance')
@Controller('balance')
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
} 