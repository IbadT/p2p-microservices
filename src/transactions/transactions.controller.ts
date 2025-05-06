import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { GrpcMethod } from '@nestjs/microservices';
import { UpdateTransactionStatusRequest, GetActiveExchangesRequest, TransactionStatus as ProtoTransactionStatus } from '../proto/generated/exchange.pb';
import { TransactionStatus } from '@prisma/client';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  private convertProtoStatusToPrisma(status: ProtoTransactionStatus): TransactionStatus {
    return TransactionStatus[ProtoTransactionStatus[status]];
  }

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
    return this.transactionsService.updateTransactionStatus({
      transactionId: data.transactionId,
      status: this.convertProtoStatusToPrisma(data.status),
      paymentProof: data.paymentProof,
    });
  }

  @GrpcMethod('ExchangeService', 'GetActiveExchanges')
  async getActiveExchanges(data: GetActiveExchangesRequest) {
    const transactions = await this.transactionsService.getActiveExchanges(data.userId);
    return { transactions };
  }
}