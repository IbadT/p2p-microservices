import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, IsNumber, IsArray, IsOptional, Min, MaxLength } from 'class-validator';
import { ExchangeType, PaymentMethod } from '@prisma/client';

export class CreateListingDto {
  @ApiProperty({ enum: ExchangeType, description: 'Type of exchange (Crypto2Fiat or Fiat2Crypto)' })
  @IsEnum(ExchangeType)
  type: ExchangeType;

  @ApiProperty({ description: 'Cryptocurrency symbol' })
  @IsString()
  cryptocurrency: string;

  @ApiProperty({ description: 'Fiat currency symbol' })
  @IsString()
  fiatCurrency: string;

  @ApiProperty({ description: 'Exchange rate' })
  @IsNumber()
  @Min(0)
  rate: number;

  @ApiProperty({ description: 'Minimum amount for exchange' })
  @IsNumber()
  @Min(0)
  minAmount: number;

  @ApiProperty({ description: 'Maximum amount for exchange' })
  @IsNumber()
  @Min(0)
  maxAmount: number;

  @ApiProperty({ description: 'Available amount for exchange' })
  @IsNumber()
  @Min(0)
  availableAmount: number;

  @ApiProperty({ enum: PaymentMethod, isArray: true, description: 'Accepted payment methods' })
  @IsArray()
  @IsEnum(PaymentMethod, { each: true })
  paymentMethods: PaymentMethod[];

  @ApiProperty({ description: 'Additional terms and conditions', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  terms?: string;
}
