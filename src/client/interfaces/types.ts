export interface User {
  id: string;
  email: string;
  role: string;
  isExchangerActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Balance {
  id: string;
  userId: string;
  cryptocurrency: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Hold {
  id: string;
  userId: string;
  cryptocurrency: string;
  amount: number;
  reason: string;
  createdAt: string;
  updatedAt: string;
}

export interface Dispute {
  id: string;
  transactionId: string;
  customerId: string;
  exchangerId: string;
  status: string;
  reason: string;
  resolution?: string;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
}

export interface Review {
  id: string;
  userId: string;
  targetUserId: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  entityType: string;
  entityId: string;
  details: any;
  createdAt: string;
}

export interface ScheduledTask {
  id: string;
  type: string;
  data: any;
  schedule: string;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
  lastRunAt?: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: string;
  data: any;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  id: string;
  type: string;
  status: string;
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

export interface Listing {
  id: string;
  type: string;
  cryptocurrency: string;
  fiatCurrency: string;
  rate: number;
  minAmount: number;
  maxAmount: number;
  availableAmount: number;
  paymentMethods: string[];
  terms: string;
  userId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Offer {
  id: string;
  amount: number;
  status: string;
  userId: string;
  listingId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Filter {
  id: string;
  userId: string;
  type: string;
  cryptocurrency?: string;
  fiatCurrency?: string;
  minAmount?: number;
  maxAmount?: number;
  paymentMethods?: string[];
}

export interface ExchangeRates {
  cryptocurrency: string;
  fiatCurrency: string;
  rate: number;
  updatedAt: string;
}

export interface ExchangeLimits {
  cryptocurrency: string;
  minAmount: number;
  maxAmount: number;
}

export interface ExchangeFees {
  cryptocurrency: string;
  fiatCurrency: string;
  fee: number;
}

export interface P2PSettings {
  disputeTimeout: number;
  confirmationTimeout: number;
  minRating: number;
  maxActiveListings: number;
  maxActiveTransactions: number;
}

export interface P2PStats {
  totalUsers: number;
  totalExchangers: number;
  totalTransactions: number;
  totalVolume: number;
  activeListings: number;
  activeTransactions: number;
} 