import { IsEnum, IsString, IsNumber, IsArray, IsOptional, Min } from 'class-validator';
import { ExchangeType, PaymentMethod } from '@prisma/client';

export class CreateExchangeListingDto {
  @IsEnum(ExchangeType)
  type: ExchangeType;

  @IsString()
  cryptocurrency: string;

  @IsString()
  fiatCurrency: string;

  @IsNumber()
  @Min(0)
  rate: number;

  @IsNumber()
  @Min(0)
  minAmount: number;

  @IsNumber()
  @Min(0)
  maxAmount: number;

  @IsNumber()
  @Min(0)
  availableAmount: number;

  @IsArray()
  @IsEnum(PaymentMethod, { each: true })
  paymentMethods: PaymentMethod[];

  @IsOptional()
  @IsString()
  terms?: string;
}

export class CreateExchangeOfferDto {
  @IsString()
  listingId: string;

  @IsNumber()
  @Min(0.0001)
  amount: number;
}

export class UpdateTransactionStatusDto {
  @IsString()
  status: string;

  @IsOptional()
  @IsString()
  paymentProof?: string;
}

export class ExchangeListingFilterDto {
  @IsOptional()
  @IsEnum(ExchangeType)
  type?: ExchangeType;

  @IsOptional()
  @IsString()
  cryptocurrency?: string;

  @IsOptional()
  @IsString()
  fiatCurrency?: string;

  @IsOptional()
  @IsNumber()
  minRate?: number;

  @IsOptional()
  @IsNumber()
  maxRate?: number;

  @IsOptional()
  @IsArray()
  @IsEnum(PaymentMethod, { each: true })
  paymentMethods?: PaymentMethod[];

  @IsOptional()
  isActive?: boolean;
} 