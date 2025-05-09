import { User, Balance, Hold, Dispute, Review, AuditLog, ScheduledTask, Notification, Transaction, Listing, Offer, Filter, ExchangeRates, ExchangeLimits, ExchangeFees, P2PSettings, P2PStats } from './types';
import { UserRole, TransactionStatus, TransactionType, NotificationType, AuditAction, EntityType, HoldType, ListingType, OfferStatus, FilterType } from './enums';

// User DTOs
export interface CreateUserDto {
  email: string;
  password: string;
  role: UserRole;
}

export interface UpdateUserDto {
  email?: string;
  password?: string;
  role?: UserRole;
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
  type: HoldType;
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
  moderatorId: string;
  resolution: string;
  winnerUserId: string;
  finalStatus?: 'FINISHED' | 'CANCELLED';
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
  action: AuditAction;
  entityType: EntityType;
  entityId: string;
  details: Record<string, unknown>;
}

// Scheduler DTOs
export interface CreateScheduledTaskDto {
  type: string;
  data: Record<string, unknown>;
  schedule: string;
  enabled: boolean;
}

export interface UpdateScheduledTaskDto {
  data?: Record<string, unknown>;
  schedule?: string;
  enabled?: boolean;
}

// Notification DTOs
export interface CreateNotificationDto {
  userId: string;
  type: NotificationType;
  data: Record<string, unknown>;
}

// Transaction DTOs
export interface CreateTransactionDto {
  type: TransactionType;
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
  status?: TransactionStatus;
  paymentProof?: string;
  isActive?: boolean;
}

// Listing DTOs
export interface CreateListingDto {
  type: ListingType;
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
  status?: OfferStatus;
  amount?: number;
}

// Filter DTOs
export interface CreateFilterDto {
  userId: string;
  type: FilterType;
  cryptocurrency?: string;
  fiatCurrency?: string;
  minAmount?: number;
  maxAmount?: number;
  paymentMethods?: string[];
}

// User Status DTOs
export interface SetOnlineDto {
  isOnline: boolean;
}

export interface UnfreezeDto {
  reason: string;
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