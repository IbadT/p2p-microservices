import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsNumber, IsOptional, IsObject, IsNotEmpty } from 'class-validator';

export enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED'
}

export enum PaymentProvider {
  BANK_TRANSFER = 'BANK_TRANSFER',
  CREDIT_CARD = 'CREDIT_CARD',
  PAYPAL = 'PAYPAL',
  CRYPTO = 'CRYPTO'
}

export class PaymentWebhookDto {
  @ApiProperty({
    description: 'Статус платежа',
    enum: PaymentStatus,
    example: PaymentStatus.COMPLETED
  })
  @IsEnum(PaymentStatus)
  status: PaymentStatus;

  @ApiProperty({
    description: 'Платежный провайдер',
    enum: PaymentProvider,
    example: PaymentProvider.BANK_TRANSFER
  })
  @IsEnum(PaymentProvider)
  provider: PaymentProvider;

  @ApiProperty({
    description: 'Сумма платежа',
    example: 1000.50
  })
  @IsNumber()
  amount: number;

  @ApiProperty({
    description: 'Валюта платежа',
    example: 'USD'
  })
  @IsString()
  currency: string;

  @ApiProperty({
    description: 'Референс платежа',
    example: 'PAY-123456',
    required: false
  })
  @IsString()
  @IsOptional()
  reference?: string;

  @ApiProperty({
    description: 'Дополнительные метаданные',
    example: {
      bankName: 'Example Bank',
      accountNumber: '****1234'
    },
    required: false
  })
  @IsObject()
  @IsOptional()
  metadata?: Record<string, any>;
}

export class VerifyPaymentDto {
  @ApiProperty({
    description: 'ID пользователя, который верифицирует платеж',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsString()
  @IsNotEmpty()
  verifiedBy: string;
}

export class RejectPaymentDto {
  @ApiProperty({
    description: 'ID пользователя, который отклоняет платеж',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsString()
  @IsNotEmpty()
  rejectedBy: string;

  @ApiProperty({
    description: 'Причина отклонения платежа',
    example: 'Несоответствие суммы платежа'
  })
  @IsString()
  @IsNotEmpty()
  reason: string;
}

export class PaymentResponseDto {
  @ApiProperty({
    description: 'Статус операции',
    example: true
  })
  success: boolean;

  @ApiProperty({
    description: 'Сообщение о результате операции',
    example: 'Платеж успешно верифицирован'
  })
  message: string;
} 