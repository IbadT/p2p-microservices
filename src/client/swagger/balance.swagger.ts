import { ApiProperty } from '@nestjs/swagger';
import { HoldType } from '@prisma/client';

export class BalanceResponse {
  @ApiProperty({ description: 'User ID' })
  userId: string;

  @ApiProperty({ description: 'Cryptocurrency' })
  cryptocurrency: string;

  @ApiProperty({ description: 'Available balance' })
  available: number;

  @ApiProperty({ description: 'Total balance including holds' })
  total: number;
}

export class BalanceHoldResponse {
  @ApiProperty({ description: 'Hold ID' })
  id: string;

  @ApiProperty({ description: 'User ID' })
  userId: string;

  @ApiProperty({ description: 'Cryptocurrency' })
  cryptocurrency: string;

  @ApiProperty({ description: 'Amount held' })
  amount: number;

  @ApiProperty({ description: 'Hold type', enum: HoldType })
  type: HoldType;

  @ApiProperty({ description: 'Related transaction ID', required: false })
  relatedTransactionId?: string;

  @ApiProperty({ description: 'Created at timestamp' })
  createdAt: Date;
}

export class TransactionResponse {
  @ApiProperty({ description: 'Transaction ID' })
  id: string;

  @ApiProperty({ description: 'User ID' })
  userId: string;

  @ApiProperty({ description: 'Cryptocurrency' })
  cryptocurrency: string;

  @ApiProperty({ description: 'Transaction amount' })
  amount: number;

  @ApiProperty({ description: 'Transaction type' })
  type: string;

  @ApiProperty({ description: 'Transaction status' })
  status: string;

  @ApiProperty({ description: 'Created at timestamp' })
  createdAt: Date;
}

export class TransactionHistoryResponse {
  @ApiProperty({ description: 'Total number of transactions' })
  total: number;

  @ApiProperty({ description: 'Current page' })
  page: number;

  @ApiProperty({ description: 'Items per page' })
  limit: number;

  @ApiProperty({ 
    description: 'List of transactions',
    type: [TransactionResponse]
  })
  transactions: TransactionResponse[];
} 