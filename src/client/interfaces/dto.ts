import { User, Balance, Hold, Dispute, Review, AuditLog, ScheduledTask, Notification, Transaction, Listing, Offer, Filter, ExchangeRates, ExchangeLimits, ExchangeFees, P2PSettings, P2PStats } from './types';

// User DTOs
export interface CreateUserDto {
  email: string;
  password: string;
  role: string;
}

export interface UpdateUserDto {
  email?: string;
  password?: string;
  role?: string;
  isExchangerActive?: boolean;
}

// Balance DTOs
export interface CreateBalanceDto {
  userId: string;
  cryptocurrency: string;
  amount: number;
}

export interface UpdateBalanceDto {
  amount: number;
}

export interface CreateHoldDto {
  userId: string;
  cryptocurrency: string;
  amount: number;
  reason: string;
}

// Dispute DTOs
export interface CreateDisputeDto {
  transactionId: string;
  customerId: string;
  exchangerId: string;
  reason: string;
}

export interface ResolveDisputeDto {
  disputeId: string;
  resolution: string;
  status: string;
}

// Review DTOs
export interface CreateReviewDto {
  userId: string;
  targetUserId: string;
  rating: number;
  comment: string;
}

export interface UpdateReviewDto {
  rating?: number;
  comment?: string;
}

// Audit DTOs
export interface CreateAuditLogDto {
  userId: string;
  action: string;
  entityType: string;
  entityId: string;
  details: any;
}

// Scheduler DTOs
export interface CreateScheduledTaskDto {
  type: string;
  data: any;
  schedule: string;
  enabled: boolean;
}

export interface UpdateScheduledTaskDto {
  data?: any;
  schedule?: string;
  enabled?: boolean;
}

// Notification DTOs
export interface CreateNotificationDto {
  userId: string;
  type: string;
  data: any;
}

// Transaction DTOs
export interface CreateTransactionDto {
  type: string;
  cryptocurrency: string;
  fiatCurrency: string;
  cryptoAmount: number;
  fiatAmount: number;
  customerId: string;
  exchangerId: string;
  listingId: string;
  offerId: string;
}

export interface UpdateTransactionDto {
  status?: string;
  paymentProof?: string;
  isActive?: boolean;
}

// Listing DTOs
export interface CreateListingDto {
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
}

export interface UpdateListingDto {
  rate?: number;
  minAmount?: number;
  maxAmount?: number;
  availableAmount?: number;
  paymentMethods?: string[];
  terms?: string;
  isActive?: boolean;
}

// Offer DTOs
export interface CreateOfferDto {
  amount: number;
  userId: string;
  listingId: string;
}

export interface UpdateOfferDto {
  status?: string;
  amount?: number;
}

// Filter DTOs
export interface CreateFilterDto {
  userId: string;
  type: string;
  cryptocurrency?: string;
  fiatCurrency?: string;
  minAmount?: number;
  maxAmount?: number;
  paymentMethods?: string[];
}

// Response DTOs
export interface UserResponse {
  user: User;
}

export interface UsersResponse {
  users: User[];
}

export interface BalanceResponse {
  balance: Balance;
}

export interface BalancesResponse {
  balances: Balance[];
}

export interface HoldResponse {
  hold: Hold;
}

export interface HoldsResponse {
  holds: Hold[];
}

export interface DisputeResponse {
  dispute: Dispute;
}

export interface DisputesResponse {
  disputes: Dispute[];
}

export interface ReviewResponse {
  review: Review;
}

export interface ReviewsResponse {
  reviews: Review[];
}

export interface AuditLogResponse {
  auditLog: AuditLog;
}

export interface AuditLogsResponse {
  auditLogs: AuditLog[];
}

export interface ScheduledTaskResponse {
  scheduledTask: ScheduledTask;
}

export interface ScheduledTasksResponse {
  scheduledTasks: ScheduledTask[];
}

export interface NotificationResponse {
  notification: Notification;
}

export interface NotificationsResponse {
  notifications: Notification[];
}

export interface TransactionResponse {
  transaction: Transaction;
}

export interface TransactionsResponse {
  transactions: Transaction[];
}

export interface ListingResponse {
  listing: Listing;
}

export interface ListingsResponse {
  listings: Listing[];
}

export interface OfferResponse {
  offer: Offer;
}

export interface OffersResponse {
  offers: Offer[];
}

export interface FilterResponse {
  filter: Filter;
}

export interface FiltersResponse {
  filters: Filter[];
}

export interface ExchangeRatesResponse {
  rates: ExchangeRates[];
}

export interface ExchangeLimitsResponse {
  limits: ExchangeLimits[];
}

export interface ExchangeFeesResponse {
  fees: ExchangeFees[];
}

export interface P2PSettingsResponse {
  settings: P2PSettings;
}

export interface P2PStatsResponse {
  stats: P2PStats;
} 