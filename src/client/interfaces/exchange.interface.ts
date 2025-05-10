import { ExchangeType, TransactionStatus, PaymentMethod } from '@prisma/client';

export interface ExchangeListing {
  id: string;
  type: ExchangeType;
  cryptocurrency: string;
  fiatCurrency: string;
  rate: number;
  minAmount: number;
  maxAmount: number;
  availableAmount: number;
  paymentMethods: PaymentMethod[];
  terms?: string;
  userId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ExchangeOffer {
  id: string;
  amount: number;
  status: TransactionStatus;
  userId: string;
  listingId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ExchangeTransaction {
  id: string;
  type: ExchangeType;
  status: TransactionStatus;
  cryptocurrency: string;
  fiatCurrency: string;
  cryptoAmount: number;
  fiatAmount: number;
  paymentProof?: string;
  disputeId?: string;
  confirmationDeadline: string;
  canCustomerDispute: boolean;
  canExchangerDispute: boolean;
  isActive: boolean;
  customerId: string;
  exchangerId: string;
  listingId: string;
  offerId: string;
  createdAt: string;
  updatedAt: string;
  finishedAt?: string;
}

export interface CreateListingRequest {
  userId: string;
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

export interface GetListingsRequest {
  type?: ExchangeType;
  cryptocurrency?: string;
  fiatCurrency?: string;
  minRate?: number;
  maxRate?: number;
  paymentMethods?: PaymentMethod[];
  isActive?: boolean;
}

export interface CreateOfferRequest {
  userId: string;
  listingId: string;
  amount: number;
}

export interface RespondOfferRequest {
  offerId: string;
  exchangerId: string;
  action: RespondAction;
}

export interface RespondOfferResponse {
  success: boolean;
  message: string;
}

export enum RespondAction {
  ACCEPT = 'ACCEPT',
  DECLINE = 'DECLINE'
}

export interface UpdateTransactionStatusRequest {
  transactionId: string;
  userId: string;
  status: TransactionStatus;
  paymentProof?: string;
}

export interface CreateDisputeRequest {
  transactionId: string;
  initiatorId: string;
  reason: string;
  initiatorRole: 'CUSTOMER' | 'EXCHANGER';
}

export interface CreateReviewRequest {
  transactionId: string;
  authorId: string;
  rating: number;
  comment?: string;
}

export interface ExchangerStatus {
  exchangerId: string;
  online: boolean;
  missedOffersCount: number;
  lastActiveAt: string;
  isFrozen: boolean;
}

export interface SetExchangerStatusRequest {
  exchangerId: string;
  isActive: boolean;
}

export interface SetExchangerStatusResponse {
  success: boolean;
  message: string;
}

export interface UpdateMissedOffersRequest {
  exchangerId: string;
  increment: boolean;
}

// export enum TransactionStatus {
//   PENDING = 'PENDING',
//   COMPLETED = 'COMPLETED',
//   CANCELLED = 'CANCELLED',
//   DISPUTED = 'DISPUTED'
// }

// export enum ExchangeType {
//   CRYPTO_TO_FIAT = 'CRYPTO_TO_FIAT',
//   FIAT_TO_CRYPTO = 'FIAT_TO_CRYPTO'
// } 