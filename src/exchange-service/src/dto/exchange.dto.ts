// import { ExchangeType, PaymentMethod } from '@prisma/client';

enum PaymentMethod {
  BANK_TRANSFER,
  PAYPAL,
  WISE,
  CASH,
  // Добавьте другие методы по необходимости
}

enum ExchangeType {
  CRYPTO_TO_FIAT,
  FIAT_TO_CRYPTO
}


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