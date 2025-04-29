import { ExchangeType, PaymentMethod } from '@prisma/client';

export class CreateExchangeListingDto {
  type: ExchangeType;
  cryptocurrency: string;
  fiatCurrency: string;
  rate: number;
  minAmount: number;
  maxAmount: number;
  availableAmount: number;
  paymentMethods: PaymentMethod[];
  terms?: string;
}

export class CreateExchangeOfferDto {
  listingId: string;
  amount: number;
}

export class UpdateTransactionStatusDto {
  status: string;
  paymentProof?: string;
}

export class ExchangeListingFilterDto {
  type?: ExchangeType;
  cryptocurrency?: string;
  fiatCurrency?: string;
  minRate?: number;
  maxRate?: number;
  paymentMethods?: PaymentMethod[];
  isActive?: boolean;
} 