import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { GrpcMethod } from '@nestjs/microservices';
import { UpdateTransactionStatusRequest, GetActiveExchangesRequest } from '../proto/generated/exchange.pb';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  // @Post(':id/confirm')
  // confirmTransaction(
  //   @Param('id') id: string,
  //   @Body() dto: { proof?: string }
  // ) { ... }

  // @Post(':id/dispute')
  // openDispute(@Param('id') id: string) { ... }

  // @Post(':id/cancel')
  // cancelTransaction(@Param('id') id: string) { ... }

  // @Get('active')
  // getActiveTransactions(@Query() filters: TransactionFiltersDto) { ... }

  @GrpcMethod('ExchangeService', 'UpdateTransactionStatus')
  async updateTransactionStatus(data: UpdateTransactionStatusRequest) {
    return this.transactionsService.updateTransactionStatus(
      data.transactionId,
      data.userId,
      {
        status: data.status,
        paymentProof: data.paymentProof,
      },
    );
  }

  @GrpcMethod('ExchangeService', 'GetActiveExchanges')
  async getActiveExchanges(data: GetActiveExchangesRequest) {
    const transactions = await this.transactionsService.getActiveExchanges(data.userId);
    return { transactions };
  }
}