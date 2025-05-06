import { IsString, IsNumber, IsOptional, IsEnum, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { HoldType } from '@prisma/client';

export class GetBalanceDto {
  @ApiProperty({ description: 'User ID' })
  @IsString()
  userId: string;
}

export class CreateHoldDto {
  @ApiProperty({ description: 'User ID' })
  @IsString()
  userId: string;

  @ApiProperty({ description: 'Cryptocurrency' })
  @IsString()
  cryptocurrency: string;

  @ApiProperty({ description: 'Amount' })
  @IsNumber()
  @Min(0)
  amount: number;

  @ApiProperty({ description: 'Hold type', enum: HoldType })
  @IsEnum(HoldType)
  type: HoldType;

  @ApiProperty({ description: 'Related transaction ID', required: false })
  @IsString()
  @IsOptional()
  relatedTransactionId?: string;
}

export class ReleaseHoldDto {
  @ApiProperty({ description: 'Hold ID' })
  @IsString()
  holdId: string;
}

export class TransferDto {
  @ApiProperty({ description: 'Sender user ID' })
  @IsString()
  fromUserId: string;

  @ApiProperty({ description: 'Recipient user ID' })
  @IsString()
  toUserId: string;

  @ApiProperty({ description: 'Cryptocurrency' })
  @IsString()
  cryptocurrency: string;

  @ApiProperty({ description: 'Amount' })
  @IsNumber()
  @Min(0)
  amount: number;

  @ApiProperty({ description: 'Transaction ID' })
  @IsString()
  transactionId: string;
}

export class DepositDto {
  @ApiProperty({ description: 'User ID' })
  @IsString()
  userId: string;

  @ApiProperty({ description: 'Cryptocurrency' })
  @IsString()
  cryptocurrency: string;

  @ApiProperty({ description: 'Amount' })
  @IsNumber()
  @Min(0)
  amount: number;
}

export class WithdrawDto {
  @ApiProperty({ description: 'User ID' })
  @IsString()
  userId: string;

  @ApiProperty({ description: 'Cryptocurrency' })
  @IsString()
  cryptocurrency: string;

  @ApiProperty({ description: 'Amount' })
  @IsNumber()
  @Min(0)
  amount: number;
}

export class GetTransactionHistoryDto {
  @ApiProperty({ description: 'User ID' })
  @IsString()
  userId: string;

  @ApiProperty({ description: 'Cryptocurrency', required: false })
  @IsString()
  @IsOptional()
  cryptocurrency?: string;

  @ApiProperty({ description: 'Start date', required: false })
  @IsString()
  @IsOptional()
  startDate?: string;

  @ApiProperty({ description: 'End date', required: false })
  @IsString()
  @IsOptional()
  endDate?: string;

  @ApiProperty({ description: 'Page number', required: false })
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiProperty({ description: 'Items per page', required: false })
  @IsNumber()
  @IsOptional()
  limit?: number;
} 