// User Service Interfaces
import {
  CreateUserRequest,
  UpdateUserRequest,
  GetUserRequest,
  User
} from '../../proto/generated/user.pb';

// Balance Service Interfaces
import {
  GetBalanceRequest,
  Balance,
  CreateHoldRequest,
  BalanceHold,
  ReleaseHoldRequest,
  TransferRequest,
  DepositRequest,
  WithdrawRequest
} from '../../proto/generated/balance.pb';

// Dispute Service Interfaces
import {
  CreateDisputeRequest,
  ResolveDisputeRequest as DisputeResolveDisputeRequest,
  GetDisputesByUserRequest,
  Dispute,
  GetDisputesResponse
} from '../../proto/generated/dispute.pb';

// Reviews Service Interfaces
import {
  CreateReviewRequest,
  UpdateReviewRequest,
  GetReviewRequest,
  GetUserReviewsRequest,
  ReviewsResponse,
  Review
} from '../../proto/generated/reviews.pb';

// Audit Service Interfaces
import {
  CreateAuditLogRequest,
  GetAuditLogsRequest,
  AuditLogsResponse,
  AuditLog
} from '../../proto/generated/audit.pb';

// Scheduler Service Interfaces
import {
  CreateScheduledTaskRequest,
  UpdateScheduledTaskRequest,
  GetScheduledTaskRequest,
  ListScheduledTasksRequest,
  ScheduledTasksResponse,
  ScheduledTask
} from '../../proto/generated/scheduler.pb';

// Exchange Service Interfaces
import {
  CreateListingRequest,
  ExchangeListing,
  GetListingsRequest,
  GetListingsResponse,
  CreateOfferRequest,
  ExchangeOffer,
  UpdateTransactionStatusRequest,
  ExchangeTransaction,
  GetActiveExchangesRequest,
  GetActiveExchangesResponse
} from '../../proto/generated/exchange.pb';

// P2P Service Interfaces
import {
  CreateExchangeOfferRequest,
  CreateExchangeOfferResponse,
  RespondExchangeOfferRequest,
  RespondExchangeOfferResponse,
  ConfirmPaymentRequest,
  ConfirmPaymentResponse,
  ConfirmReceiptRequest,
  ConfirmReceiptResponse,
  OpenDisputeRequest,
  OpenDisputeResponse,
  TransactionStatusRequest,
  TransactionStatusResponse,
  SetExchangerStatusRequest,
  SetExchangerStatusResponse,
  CancelTransactionRequest,
  CancelTransactionResponse,
  ResolveDisputeRequest,
  ResolveDisputeResponse,
  ExchangeType,
  TransactionStatus,
  RespondAction,
  ResolutionOutcome,
  Role
} from '../../proto/generated/p2p.pb';

// User Service Client
export interface IUserClient {
  createUser(request: CreateUserRequest): Promise<User>;
  updateUser(request: UpdateUserRequest): Promise<User>;
  getUser(request: GetUserRequest): Promise<User>;
}

// Balance Service Client
export interface IBalanceClient {
  getBalance(request: GetBalanceRequest): Promise<Balance>;
  createHold(request: CreateHoldRequest): Promise<BalanceHold>;
  releaseHold(request: ReleaseHoldRequest): Promise<void>;
  transfer(request: TransferRequest): Promise<void>;
  deposit(request: DepositRequest): Promise<Balance>;
  withdraw(request: WithdrawRequest): Promise<Balance>;
}

// Dispute Service Client
export interface IDisputeClient {
  createDispute(request: CreateDisputeRequest): Promise<Dispute>;
  resolveDispute(request: DisputeResolveDisputeRequest): Promise<Dispute>;
  getDisputesByUser(request: GetDisputesByUserRequest): Promise<GetDisputesResponse>;
  getOpenDisputes(): Promise<GetDisputesResponse>;
}

// Reviews Service Client
export interface IReviewsClient {
  createReview(request: CreateReviewRequest): Promise<Review>;
  updateReview(request: UpdateReviewRequest): Promise<Review>;
  getReview(request: GetReviewRequest): Promise<Review>;
  getUserReviews(request: GetUserReviewsRequest): Promise<ReviewsResponse>;
}

// Audit Service Client
export interface IAuditClient {
  createAuditLog(request: CreateAuditLogRequest): Promise<AuditLog>;
  getAuditLogs(request: GetAuditLogsRequest): Promise<AuditLogsResponse>;
}

// Scheduler Service Client
export interface ISchedulerClient {
  createScheduledTask(request: CreateScheduledTaskRequest): Promise<ScheduledTask>;
  updateScheduledTask(request: UpdateScheduledTaskRequest): Promise<ScheduledTask>;
  getScheduledTask(request: GetScheduledTaskRequest): Promise<ScheduledTask>;
  listScheduledTasks(request: ListScheduledTasksRequest): Promise<ScheduledTasksResponse>;
}

// Exchange Service Client
export interface IExchangeClient {
  // Listing Operations
  createListing(request: CreateListingRequest): Promise<ExchangeListing>;
  getListings(request: GetListingsRequest): Promise<GetListingsResponse>;
  
  // Offer Operations
  createOffer(request: CreateOfferRequest): Promise<ExchangeOffer>;
  
  // Transaction Operations
  updateTransactionStatus(request: UpdateTransactionStatusRequest): Promise<ExchangeTransaction>;
  getActiveExchanges(request: GetActiveExchangesRequest): Promise<GetActiveExchangesResponse>;
}

// P2P Exchange Client
export interface IP2PExchangeClient {
  // Exchange Offer Operations
  createExchangeOffer(request: CreateExchangeOfferRequest): Promise<CreateExchangeOfferResponse>;
  respondExchangeOffer(request: RespondExchangeOfferRequest): Promise<RespondExchangeOfferResponse>;
  
  // Transaction Operations
  confirmPayment(request: ConfirmPaymentRequest): Promise<ConfirmPaymentResponse>;
  confirmReceipt(request: ConfirmReceiptRequest): Promise<ConfirmReceiptResponse>;
  getTransactionStatus(request: TransactionStatusRequest): Promise<TransactionStatusResponse>;
  cancelTransaction(request: CancelTransactionRequest): Promise<CancelTransactionResponse>;
  
  // Dispute Operations
  openDispute(request: OpenDisputeRequest): Promise<OpenDisputeResponse>;
  resolveDispute(request: ResolveDisputeRequest): Promise<ResolveDisputeResponse>;
  
  // Exchanger Operations
  setExchangerStatus(request: SetExchangerStatusRequest): Promise<SetExchangerStatusResponse>;
}

// Controller Interfaces
export interface IUsersController {
  getProfile(): Promise<any>;
  setOnline(dto: any): Promise<any>;
  unfreeze(dto: any): Promise<any>;
}

export interface IReviewsController {
  create(dto: any): Promise<any>;
  findOne(id: string): Promise<any>;
}

export interface IDisputesController {
  getAll(): Promise<any>;
  comment(id: string, dto: any): Promise<any>;
}

export interface IExchangesController {
  getActive(query: any): Promise<any>;
  confirm(id: string, dto: any): Promise<any>;
  dispute(id: string, dto: any): Promise<any>;
}

export interface IListingsController {
  create(dto: any): Promise<any>;
  findAll(query: any): Promise<any>;
  findOne(id: string): Promise<any>;
}

export interface IOffersController {
  create(dto: any): Promise<any>;
  updateStatus(id: string, dto: any): Promise<any>;
  findOne(id: string): Promise<any>;
}
