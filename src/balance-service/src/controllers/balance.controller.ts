import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { BalanceService } from '../services/balance.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { User } from '../decorators/user.decorator';

class DepositDto {
  cryptocurrency: string;
  amount: number;
}

class WithdrawDto {
  cryptocurrency: string;
  amount: number;
}

@Controller('balance')
@UseGuards(JwtAuthGuard)
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @Get()
  async getBalance(@User('id') userId: string) {
    return this.balanceService.getBalance(userId);
  }

  @Post('deposit')
  async deposit(
    @User('id') userId: string,
    @Body() dto: DepositDto
  ) {
    return this.balanceService.deposit(userId, dto.cryptocurrency, dto.amount);
  }

  @Post('withdraw')
  async withdraw(
    @User('id') userId: string,
    @Body() dto: WithdrawDto
  ) {
    return this.balanceService.withdraw(userId, dto.cryptocurrency, dto.amount);
  }
} 