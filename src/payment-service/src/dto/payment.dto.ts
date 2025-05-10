import { IsString, IsEnum } from 'class-validator';

export enum PaymentProvider {
  BANK_TRANSFER = 'BANK_TRANSFER',
  PAYPAL = 'PAYPAL',
  WISE = 'WISE',
  STRIPE = 'STRIPE',
  CASH = 'CASH'
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED'
}

export class PaymentWebhookDto {
  @IsString()
  transactionId: string;

  @IsEnum(PaymentStatus)
  status: PaymentStatus;

  @IsEnum(PaymentProvider)
  provider: PaymentProvider;

  amount: number;

  currency: string;

  reference?: string;

  metadata?: Record<string, any>;
} 