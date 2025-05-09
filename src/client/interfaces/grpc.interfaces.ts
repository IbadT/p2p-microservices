import { CreateUserDto, UpdateUserDto } from './client.swagger';
import { CreateExchangeOfferDto, RespondExchangeOfferDto } from './client.swagger';
import { CreateListingDto, OpenDisputeDto } from './client.swagger';
import { CreateDisputeDto, ResolveDisputeDto, AddCommentDto } from './client.swagger';
import { CreateReviewDto } from './client.swagger';
import { GetBalanceDto, CreateHoldDto } from './client.swagger';
import { CreateOfferDto, RespondToOfferDto } from './offer.dto';
import { Observable } from 'rxjs';
import type { ExchangeType, PaymentMethod, UserRole, Dispute as PrismaDispute, ExchangeTransaction, User as PrismaUser } from '@prisma/client';

export interface User {
  id: string;
  email: string;
  password: string;
  role: UserRole;
  isExchangerActive: boolean;
  isFrozen: boolean;
  frozenUntil: Date | null;
  missedOffersCount: number;
  createdAt: Date;
  updatedAt: Date;
  name?: string;
  isOnline?: boolean;
}

export interface Offer {
  id: string;
  fromUserId: string;
  toUserId: string;
  amount: number;
  currency: string;
  description?: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELLED';
  createdAt: string;
  updatedAt: string;
}

export interface Dispute {
  id: string;
  exchangeId: string;
  reason: string;
  evidence?: string[];
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  resolution?: string;
  moderatorId?: string;
  resolvedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ExchangeOffer {
  id: string;
  customerId: string;
  listingId: string;
  amount: number;
  exchangeType: string;
  conditions: string;
  status: string;
}

export interface Listing {
  id: string;
  userId: string;
  type: ExchangeType;
  cryptocurrency: string;
  fiatCurrency: string;
  rate: number;
  minAmount: number;
  maxAmount: number;
  availableAmount: number;
  paymentMethods: string[];
  terms?: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  id: string;
  userId: string;
  text: string;
  createdAt: Date;
}

export interface Review {
  id: string;
  reviewerId: string;
  reviewedId: string;
  rating: number;
  comment: string;
  exchangeId: string;
}

export interface Balance {
  userId: string;
  cryptocurrency: string;
  amount: number;
  holds: Hold[];
}

export interface Hold {
  id: string;
  userId: string;
  cryptocurrency: string;
  amount: number;
  type: string;
  relatedTransactionId?: string;
}

export interface UserService extends GrpcService {
  createUser: GrpcMethod<CreateUserDto, User>;
  updateUser: GrpcMethod<UpdateUserDto, User>;
  getUser: GrpcMethod<{ id: string }, User>;
  getUserByEmail: GrpcMethod<{ email: string }, User>;
  getUsers: GrpcMethod<{ role?: string; isExchangerActive?: boolean }, User[]>;
  activateExchanger: GrpcMethod<{ id: string }, User>;
  deactivateExchanger: GrpcMethod<{ id: string }, User>;
  freezeUser: GrpcMethod<{ id: string; reason: string }, User>;
  unfreezeUser: GrpcMethod<{ id: string }, User>;
  setOnline: GrpcMethod<{ id: string; isOnline: boolean }, void>;
  unfreeze: GrpcMethod<{ id: string }, void>;
}

export interface ConfirmPaymentRequest {
  offerId: string;
  exchangerId: string;
  paymentReference: string;
}

export interface ConfirmPaymentResponse {
  offerId: string;
  status: string;
  message: string;
}

export interface ConfirmReceiptRequest {
  offerId: string;
  customerId: string;
}

export interface ConfirmReceiptResponse {
  offerId: string;
  status: string;
  message: string;
}

export interface OpenDisputeRequest {
  offerId: string;
  openedBy: string;
  reason: string;
}

export interface OpenDisputeResponse {
  disputeId: string;
  status: string;
  message: string;
}

export interface TransactionStatusRequest {
  offerId: string;
}

export interface TransactionStatusResponse {
  offerId: string;
  status: string;
  details: string;
}

export interface SetExchangerStatusRequest {
  exchangerId: string;
  online: boolean;
}

export interface SetExchangerStatusResponse {
  exchangerId: string;
  online: boolean;
  message: string;
}

export interface CancelTransactionRequest {
  offerId: string;
  cancelledBy: string;
  reason: string;
}

export interface CancelTransactionResponse {
  offerId: string;
  status: string;
  message: string;
}

export interface ResolveDisputeRequest {
  disputeId: string;
  moderatorId: string;
  resolution: string;
  winnerUserId: string;
}

export interface ResolveDisputeResponse {
  disputeId: string;
  status: string;
  message: string;
}

export interface FreezeExchangerRequest {
  exchangerId: string;
  reason: string;
}

export interface FreezeExchangerResponse {
  exchangerId: string;
  isFrozen: boolean;
  message: string;
}

export interface P2PService extends GrpcService {
  createExchangeOffer: GrpcMethod<CreateExchangeOfferDto, ExchangeOffer>;
  respondExchangeOffer: GrpcMethod<RespondExchangeOfferDto, ExchangeOffer>;
  confirmPayment: GrpcMethod<ConfirmPaymentRequest, ConfirmPaymentResponse>;
  confirmReceipt: GrpcMethod<ConfirmReceiptRequest, ConfirmReceiptResponse>;
  openDispute: GrpcMethod<OpenDisputeRequest, OpenDisputeResponse>;
  getTransactionStatus: GrpcMethod<TransactionStatusRequest, TransactionStatusResponse>;
  setExchangerStatus: GrpcMethod<SetExchangerStatusRequest, SetExchangerStatusResponse>;
  cancelTransaction: GrpcMethod<CancelTransactionRequest, CancelTransactionResponse>;
  resolveDispute: GrpcMethod<ResolveDisputeRequest, ResolveDisputeResponse>;
  freezeExchanger: GrpcMethod<FreezeExchangerRequest, FreezeExchangerResponse>;
  [key: string]: GrpcMethod<any, any>;
}

export interface Exchange {
  id: string;
  listingId: string;
  customerId: string;
  exchangerId: string;
  amount: number;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'DISPUTED';
  createdAt: Date;
  updatedAt: Date;
}

export interface ExchangeService extends GrpcService {
  ListActiveExchanges: GrpcMethod<{
    userId?: string;
    status?: string;
    type?: ExchangeType;
  }, Exchange[]>;
  
  ConfirmStep: GrpcMethod<{
    id: string;
    step: 'PAYMENT' | 'RECEIPT';
    evidence?: string;
  }, Exchange>;
  
  OpenDispute: GrpcMethod<{
    exchangeId: string;
    reason: string;
    evidence?: string[];
  }, Dispute>;
  
  CreateListing: GrpcMethod<CreateListingDto, Listing>;
  
  GetExchange: GrpcMethod<{ id: string }, Exchange>;

  // New methods for exchanger status management
  UpdateMissedOffers: GrpcMethod<{ exchangerId: string; increment: boolean }, ExchangerStatus>;
  GetExchangerStatus: GrpcMethod<{ exchangerId: string }, ExchangerStatus>;
  UnfreezeExchanger: GrpcMethod<{ exchangerId: string }, ExchangerStatus>;

  [key: string]: GrpcMethod<any, any>;
}

export interface DisputeService extends GrpcService {
  createDispute: GrpcMethod<any, any>;
  resolveDispute: GrpcMethod<any, any>;
  getDispute: GrpcMethod<any, any>;
  getUserDisputes: GrpcMethod<any, any>;
  addComment: GrpcMethod<any, any>;
  [key: string]: GrpcMethod<any, any>;
}

export interface ReviewsService extends GrpcService {
  createReview: GrpcMethod<any, any>;
  getUserReviews: GrpcMethod<any, any>;
  getUserReviewStats: GrpcMethod<any, any>;
  getReview: GrpcMethod<any, any>;
  deleteReview: GrpcMethod<any, any>;
  [key: string]: GrpcMethod<any, any>;
}

export interface BalanceService extends GrpcService {
  getBalance: GrpcMethod<any, any>;
  createHold: GrpcMethod<any, any>;
  releaseHold: GrpcMethod<any, any>;
  transfer: GrpcMethod<any, any>;
  [key: string]: GrpcMethod<any, any>;
}

export class GrpcError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly metadata?: any,
  ) {
    super(message);
    this.name = 'GrpcError';
  }
}

export interface GrpcResponse<T> {
  data: T;
  error?: GrpcError;
}

export interface GrpcRequest<T> {
  data: T;
  metadata?: Record<string, string>;
}

export interface GrpcServiceOptions {
  timeout?: number;
  retries?: number;
  circuitBreaker?: {
    failureThreshold: number;
    resetTimeout: number;
    timeout: number;
  };
}

export interface AuditService extends GrpcService {
  createAuditLog: GrpcMethod<any, any>;
  getUserAuditLogs: GrpcMethod<any, any>;
  getEntityAuditLogs: GrpcMethod<any, any>;
  getActionAuditLogs: GrpcMethod<any, any>;
  [key: string]: GrpcMethod<any, any>;
}

export interface SchedulerService extends GrpcService {
  createTask: GrpcMethod<any, any>;
  getTask: GrpcMethod<any, any>;
  getTasks: GrpcMethod<any, any>;
  updateTask: GrpcMethod<any, any>;
  deleteTask: GrpcMethod<any, any>;
  toggleTask: GrpcMethod<any, any>;
  [key: string]: GrpcMethod<any, any>;
}

export interface NotificationsService extends GrpcService {
  sendNotification: GrpcMethod<{ userId: string; type: string; data: NotificationData }, void>;
  getUserNotifications: GrpcMethod<{ userId: string }, Notification[]>;
  markAsRead: GrpcMethod<{ notificationId: string; userId: string }, void>;
  markAllAsRead: GrpcMethod<{ userId: string }, void>;
  deleteNotification: GrpcMethod<{ notificationId: string; userId: string }, void>;
  [key: string]: GrpcMethod<any, any>;
}

export interface NotificationData {
  title?: string;
  message: string;
  priority?: 'low' | 'medium' | 'high';
  metadata?: Record<string, unknown>;
}

export interface Notification {
  id: string;
  userId: string;
  type: string;
  data: NotificationData;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TransactionsService extends GrpcService {
  createTransaction: GrpcMethod<any, any>;
  updateTransaction: GrpcMethod<any, any>;
  getTransaction: GrpcMethod<any, any>;
  getUserTransactions: GrpcMethod<any, any>;
  getUserTransactionStats: GrpcMethod<any, any>;
  confirmPayment: GrpcMethod<any, any>;
  confirmReceipt: GrpcMethod<any, any>;
  cancelTransaction: GrpcMethod<any, any>;
  [key: string]: GrpcMethod<any, any>;
}

export interface OffersService extends GrpcService {
  CreateOffer: GrpcMethod<CreateOfferRequest, Offer>;
  UpdateOfferStatus: GrpcMethod<UpdateOfferStatusRequest, Offer>;
  GetOffer: GrpcMethod<{ id: string }, Offer>;
  ListOffers: GrpcMethod<{ userId?: string }, Offer[]>;
  AcceptOffer: GrpcMethod<{ id: string }, Offer>;
  RejectOffer: GrpcMethod<{ id: string }, Offer>;
  [key: string]: GrpcMethod<any, any>;
}

export interface ListingsService extends GrpcService {
  CreateListing: GrpcMethod<CreateListingDto, Listing>;
  ListListings: GrpcMethod<{
    type?: ExchangeType;
    cryptocurrency?: string;
    fiatCurrency?: string;
    minRate?: number;
    maxRate?: number;
    paymentMethods?: string[];
    isActive?: boolean;
  }, Listing[]>;
  GetListing: GrpcMethod<{ id: string }, Listing>;
  UpdateListing: GrpcMethod<{ id: string; isActive: boolean }, Listing>;
  DeleteListing: GrpcMethod<{ id: string }, void>;
  [key: string]: GrpcMethod<any, any>;
}

export interface FiltersService extends GrpcService {
  createFilter: GrpcMethod<any, any>;
  updateFilter: GrpcMethod<any, any>;
  getFilter: GrpcMethod<any, any>;
  getUserFilters: GrpcMethod<any, any>;
  deleteFilter: GrpcMethod<any, any>;
  [key: string]: GrpcMethod<any, any>;
}

export interface TypesService extends GrpcService {
  getCryptocurrencies: GrpcMethod<any, any>;
  getFiatCurrencies: GrpcMethod<any, any>;
  getPaymentMethods: GrpcMethod<any, any>;
  getTransactionStatuses: GrpcMethod<any, any>;
  getUserRoles: GrpcMethod<any, any>;
  [key: string]: GrpcMethod<any, any>;
}

export interface KafkaService extends GrpcService {
  publishEvent: GrpcMethod<any, any>;
  getTopics: GrpcMethod<any, any>;
  createTopic: GrpcMethod<any, any>;
  deleteTopic: GrpcMethod<any, any>;
  [key: string]: GrpcMethod<any, any>;
}

export interface AuthService extends GrpcService {
  register: GrpcMethod<any, any>;
  login: GrpcMethod<any, any>;
  refreshToken: GrpcMethod<any, any>;
  logout: GrpcMethod<any, any>;
  validateToken: GrpcMethod<any, any>;
  [key: string]: GrpcMethod<any, any>;
}

export interface P2PStats {
  totalTransactions: number;
  activeUsers: number;
  totalVolume: number;
  successRate: number;
  averageRating: number;
}

export interface ExchangeRates {
  rates: {
    [currency: string]: {
      buy: number;
      sell: number;
      lastUpdate: string;
    };
  };
}

export interface ExchangeLimits {
  minAmount: number;
  maxAmount: number;
  dailyLimit: number;
  monthlyLimit: number;
  verificationRequired: boolean;
}

export interface ExchangeFees {
  makerFee: number;
  takerFee: number;
  withdrawalFee: number;
  depositFee: number;
}

export interface P2PSettings {
  enabled: boolean;
  maintenanceMode: boolean;
  allowedCryptocurrencies: string[];
  allowedFiatCurrencies: string[];
  allowedPaymentMethods: string[];
  minRating: number;
  maxActiveListings: number;
  maxActiveOffers: number;
  disputeTimeout: number;
  paymentTimeout: number;
}

export interface OfferService extends GrpcService {
  CreateOffer: GrpcMethod<CreateOfferRequest, Offer>;
  UpdateOfferStatus: GrpcMethod<UpdateOfferStatusRequest, Offer>;
  GetOffer: GrpcMethod<{ id: string }, Offer>;
  ListOffers: GrpcMethod<{ userId?: string }, Offer[]>;
  AcceptOffer: GrpcMethod<{ id: string }, Offer>;
  RejectOffer: GrpcMethod<{ id: string }, Offer>;
  [key: string]: GrpcMethod<any, any>;
}

export interface CreateOfferRequest {
  listingId: string;
  amount: number;
  conditions?: string;
}

export interface UpdateOfferStatusRequest {
  id: string;
  status: 'ACCEPTED' | 'REJECTED' | 'CANCELLED';
  reason?: string;
}

export interface ListingService extends GrpcService {
  CreateListing: GrpcMethod<CreateListingDto, Listing>;
  ListListings: GrpcMethod<{
    type?: ExchangeType;
    cryptocurrency?: string;
    fiatCurrency?: string;
    minRate?: number;
    maxRate?: number;
    paymentMethods?: string[];
    isActive?: boolean;
  }, Listing[]>;
  GetListing: GrpcMethod<{ id: string }, Listing>;
  UpdateListing: GrpcMethod<{ id: string; isActive: boolean }, Listing>;
  DeleteListing: GrpcMethod<{ id: string }, void>;
  [key: string]: GrpcMethod<any, any>;
}

export interface GrpcMethod<TRequest = unknown, TResponse = unknown> {
  (request: TRequest): Observable<TResponse>;
}

export interface GrpcService {
  [key: string]: GrpcMethod;
}

export interface DisputeWithRelations extends PrismaDispute {
  transaction: ExchangeTransaction & {
    customer: Pick<PrismaUser, 'id' | 'email'>;
    exchanger: Pick<PrismaUser, 'id' | 'email'>;
  };
}

export interface ExchangerStatus {
  exchangerId: string;
  online: boolean;
  missedOffersCount: number;
  lastActiveAt: string;
  isFrozen: boolean;
} 