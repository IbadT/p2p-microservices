import { CreateUserDto, UpdateUserDto } from './client.swagger';
import { CreateExchangeOfferDto, RespondExchangeOfferDto } from './client.swagger';
import { CreateListingDto, OpenDisputeDto } from './client.swagger';
import { CreateDisputeDto, ResolveDisputeDto, AddCommentDto } from './client.swagger';
import { CreateReviewDto } from './client.swagger';
import { GetBalanceDto, CreateHoldDto } from './client.swagger';
import { CreateOfferDto, RespondToOfferDto } from './offer.dto';
import { Observable } from 'rxjs';
import { ExchangeType, PaymentMethod } from '@prisma/client';

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  isOnline: boolean;
  isFrozen: boolean;
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
  paymentMethods: PaymentMethod[];
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

export interface UserService {
  createUser(dto: CreateUserDto): Promise<User>;
  updateUser(dto: UpdateUserDto): Promise<User>;
  getUser(id: string): Promise<User>;
  getProfile(userId: string): Promise<User>;
  setOnline(userId: string, isOnline: boolean): Promise<void>;
  unfreeze(userId: string): Promise<void>;
}

export interface P2PService {
  createExchangeOffer(dto: CreateExchangeOfferDto): Promise<ExchangeOffer>;
  respondExchangeOffer(dto: RespondExchangeOfferDto): Promise<ExchangeOffer>;
  getOffer(id: string): Promise<ExchangeOffer>;
  createOffer(dto: CreateOfferDto): Promise<Offer>;
  respondToOffer(dto: RespondToOfferDto): Promise<Offer>;
  getStats(): Promise<P2PStats>;
  getExchangeRates(): Promise<ExchangeRates>;
  getExchangeLimits(): Promise<ExchangeLimits>;
  getExchangeFees(): Promise<ExchangeFees>;
  getSettings(): Promise<P2PSettings>;
  updateSettings(settings: Partial<P2PSettings>): Promise<P2PSettings>;
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

export interface ExchangeService {
  ListActiveExchanges(filters: {
    userId?: string;
    status?: string;
    type?: ExchangeType;
  }): Observable<Exchange[]>;
  
  ConfirmStep(data: {
    id: string;
    step: 'PAYMENT' | 'RECEIPT';
    evidence?: string;
  }): Observable<Exchange>;
  
  OpenDispute(data: {
    exchangeId: string;
    reason: string;
    evidence?: string[];
  }): Observable<Dispute>;
  
  CreateListing(data: CreateListingDto): Observable<Listing>;
  
  GetExchange(data: { id: string }): Observable<Exchange>;
}

export interface DisputeService {
  createDispute(data: any): Observable<any>;
  resolveDispute(data: any): Observable<any>;
  getDispute(data: any): Observable<any>;
  getUserDisputes(data: any): Observable<any>;
  addComment(data: any): Observable<any>;
}

export interface ReviewsService {
  createReview(data: any): Observable<any>;
  getUserReviews(data: any): Observable<any>;
  getUserReviewStats(data: any): Observable<any>;
  getReview(data: any): Observable<any>;
  deleteReview(data: any): Observable<any>;
}

export interface BalanceService {
  getBalance(data: any): Observable<any>;
  createHold(data: any): Observable<any>;
  releaseHold(data: any): Observable<any>;
  transfer(data: any): Observable<any>;
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

export interface AuditService {
  createAuditLog(data: any): Observable<any>;
  getUserAuditLogs(data: any): Observable<any>;
  getEntityAuditLogs(data: any): Observable<any>;
  getActionAuditLogs(data: any): Observable<any>;
}

export interface SchedulerService {
  createTask(data: any): Observable<any>;
  getTask(data: any): Observable<any>;
  getTasks(data: any): Observable<any>;
  updateTask(data: any): Observable<any>;
  deleteTask(data: any): Observable<any>;
  toggleTask(data: any): Observable<any>;
}

export interface NotificationsService {
  sendNotification(data: any): Observable<any>;
  getUserNotifications(data: any): Observable<any>;
  markAsRead(data: any): Observable<any>;
  markAllAsRead(data: any): Observable<any>;
  deleteNotification(data: any): Observable<any>;
}

export interface UserService {
  createUser(data: any): Observable<any>;
  updateUser(data: any): Observable<any>;
  getUser(data: any): Observable<any>;
  getUserByEmail(data: any): Observable<any>;
  getUsers(data: any): Observable<any>;
  activateExchanger(data: any): Observable<any>;
  deactivateExchanger(data: any): Observable<any>;
  freezeUser(data: any): Observable<any>;
  unfreezeUser(data: any): Observable<any>;
}

export interface TransactionsService {
  createTransaction(data: any): Observable<any>;
  updateTransaction(data: any): Observable<any>;
  getTransaction(data: any): Observable<any>;
  getUserTransactions(data: any): Observable<any>;
  getUserTransactionStats(data: any): Observable<any>;
  confirmPayment(data: any): Observable<any>;
  confirmReceipt(data: any): Observable<any>;
  cancelTransaction(data: any): Observable<any>;
}

export interface ListingsService {
  createListing(data: any): Observable<any>;
  updateListing(data: any): Observable<any>;
  getListing(data: any): Observable<any>;
  getUserListings(data: any): Observable<any>;
  getActiveListings(data: any): Observable<any>;
  activateListing(data: any): Observable<any>;
  deactivateListing(data: any): Observable<any>;
  deleteListing(data: any): Observable<any>;
}

export interface OffersService {
  createOffer(data: any): Observable<any>;
  updateOffer(data: any): Observable<any>;
  getOffer(data: any): Observable<any>;
  getUserOffers(data: any): Observable<any>;
  getListingOffers(data: any): Observable<any>;
  acceptOffer(data: any): Observable<any>;
  declineOffer(data: any): Observable<any>;
  cancelOffer(data: any): Observable<any>;
}

export interface FiltersService {
  createFilter(data: any): Observable<any>;
  updateFilter(data: any): Observable<any>;
  getFilter(data: any): Observable<any>;
  getUserFilters(data: any): Observable<any>;
  deleteFilter(data: any): Observable<any>;
}

export interface TypesService {
  getCryptocurrencies(data: any): Observable<any>;
  getFiatCurrencies(data: any): Observable<any>;
  getPaymentMethods(data: any): Observable<any>;
  getTransactionStatuses(data: any): Observable<any>;
  getUserRoles(data: any): Observable<any>;
}

export interface KafkaService {
  publishEvent(data: any): Observable<any>;
  getTopics(data: any): Observable<any>;
  createTopic(data: any): Observable<any>;
  deleteTopic(data: any): Observable<any>;
}

export interface AuthService {
  register(data: any): Observable<any>;
  login(data: any): Observable<any>;
  refreshToken(data: any): Observable<any>;
  logout(data: any): Observable<any>;
  validateToken(data: any): Observable<any>;
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

export interface OfferService {
  CreateOffer(data: CreateOfferRequest): Observable<Offer>;
  UpdateOfferStatus(data: UpdateOfferStatusRequest): Observable<Offer>;
  GetOffer(data: { id: string }): Observable<Offer>;
  ListOffers(data: { userId?: string }): Observable<Offer[]>;
  AcceptOffer(data: { id: string }): Observable<Offer>;
  RejectOffer(data: { id: string }): Observable<Offer>;
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

export interface ListingService {
  CreateListing(data: CreateListingDto): Observable<Listing>;
  ListListings(filters: {
    type?: ExchangeType;
    cryptocurrency?: string;
    fiatCurrency?: string;
    minRate?: number;
    maxRate?: number;
    paymentMethods?: PaymentMethod[];
    isActive?: boolean;
  }): Observable<Listing[]>;
  GetListing(data: { id: string }): Observable<Listing>;
  UpdateListing(data: { id: string; isActive: boolean }): Observable<Listing>;
  DeleteListing(data: { id: string }): Observable<void>;
}

export interface GrpcMethod<TRequest = unknown, TResponse = unknown> {
  (request: TRequest): Observable<TResponse>;
}

export interface GrpcService {
  [key: string]: GrpcMethod;
} 