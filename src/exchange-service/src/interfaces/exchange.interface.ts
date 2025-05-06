import { ExchangeType, PaymentMethod, TransactionStatus, OfferStatus } from '@prisma/client';

export interface Listing {
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
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface Offer {
  id: string;
  listingId: string;
  userId: string;
  amount: number;
  status: OfferStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Transaction {
  id: string;
  listingId: string;
  offerId: string;
  customerId: string;
  exchangerId: string;
  status: TransactionStatus;
  paymentProof?: string;
  createdAt: Date;
  updatedAt: Date;
  listing: Listing;
  offer: Offer;
  customer: {
    id: string;
    email: string;
    name: string;
  };
  exchanger: {
    id: string;
    email: string;
    name: string;
  };
}

export interface ListingCreate {
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

export interface OfferCreate {
  listingId: string;
  amount: number;
}

export interface TransactionUpdate {
  status: TransactionStatus;
  paymentProof?: string;
}

export enum RespondAction {
  ACCEPT = 'ACCEPT',
  DECLINE = 'DECLINE',
}

export enum Role {
  CUSTOMER = 'CUSTOMER',
  EXCHANGER = 'EXCHANGER',
  MODERATOR = 'MODERATOR',
}

export interface ExchangeListing {
  id: string;
  type: ExchangeType;
  cryptocurrency: string;
  fiatCurrency: string;
  rate: number;
  minAmount: number;
  maxAmount: number;
  availableAmount: number;
  paymentMethods: string[];
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
  offerId?: string;
  createdAt: string;
  updatedAt: string;
  finishedAt?: string;
}

export interface ExchangerStatus {
  exchangerId: string;
  online: boolean;
  isFrozen: boolean;
  frozenReason?: string;
  lastActivity: string;
} 