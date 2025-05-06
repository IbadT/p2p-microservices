import { Observable } from 'rxjs';
import {
  CreateListingRequest,
  GetListingsRequest,
  CreateOfferRequest,
  RespondOfferRequest,
  UpdateTransactionStatusRequest,
  GetActiveExchangesRequest,
  ConfirmPaymentRequest,
  ConfirmReceiptRequest,
  CancelTransactionRequest,
  SetExchangerStatusRequest,
  FreezeExchangerRequest,
  ExchangeListing,
  GetListingsResponse,
  ExchangeOffer,
  RespondOfferResponse,
  ExchangeTransaction,
  GetActiveExchangesResponse,
  ConfirmPaymentResponse,
  ConfirmReceiptResponse,
  CancelTransactionResponse,
  SetExchangerStatusResponse,
  FreezeExchangerResponse
} from '../../proto/generated/exchange.pb';

import {
  CreateDisputeRequest,
  ResolveDisputeRequest,
  GetDisputesByUserRequest,
  Empty as DisputeEmpty,
  Dispute,
  GetDisputesResponse
} from '../../proto/generated/dispute.pb';

import {
  CreateReviewRequest,
  UpdateReviewRequest,
  GetUserReviewsRequest,
  GetReviewRequest,
  Review,
  ReviewsResponse
} from '../../proto/generated/reviews.pb';

import {
  CreateAuditLogRequest,
  GetAuditLogsRequest,
  AuditLog,
  AuditLogsResponse
} from '../../proto/generated/audit.pb';

import {
  CreateUserRequest,
  UpdateUserRequest,
  GetUserRequest,
  User
} from '../../proto/generated/user.pb';

export interface ExchangeService {
  // Listing Operations
  createListing(data: CreateListingRequest): Observable<ExchangeListing>;
  getListings(data: GetListingsRequest): Observable<GetListingsResponse>;
  
  // Offer Operations
  createOffer(data: CreateOfferRequest): Observable<ExchangeOffer>;
  respondOffer(data: RespondOfferRequest): Observable<RespondOfferResponse>;
  
  // Transaction Operations
  updateTransactionStatus(data: UpdateTransactionStatusRequest): Observable<ExchangeTransaction>;
  getActiveExchanges(data: GetActiveExchangesRequest): Observable<GetActiveExchangesResponse>;
  confirmPayment(data: ConfirmPaymentRequest): Observable<ConfirmPaymentResponse>;
  confirmReceipt(data: ConfirmReceiptRequest): Observable<ConfirmReceiptResponse>;
  cancelTransaction(data: CancelTransactionRequest): Observable<CancelTransactionResponse>;
  
  // Exchanger Management
  setExchangerStatus(data: SetExchangerStatusRequest): Observable<SetExchangerStatusResponse>;
  freezeExchanger(data: FreezeExchangerRequest): Observable<FreezeExchangerResponse>;
}

export interface DisputeService {
  createDispute(data: CreateDisputeRequest): Observable<Dispute>;
  resolveDispute(data: ResolveDisputeRequest): Observable<Dispute>;
  getDisputesByUser(data: GetDisputesByUserRequest): Observable<GetDisputesResponse>;
  getOpenDisputes(data: DisputeEmpty): Observable<GetDisputesResponse>;
}

export interface ReviewsService {
  createReview(data: CreateReviewRequest): Observable<Review>;
  updateReview(data: UpdateReviewRequest): Observable<Review>;
  getReview(data: GetReviewRequest): Observable<Review>;
  getUserReviews(data: GetUserReviewsRequest): Observable<ReviewsResponse>;
}

export interface AuditService {
  createAuditLog(data: CreateAuditLogRequest): Observable<AuditLog>;
  getAuditLogs(data: GetAuditLogsRequest): Observable<AuditLogsResponse>;
}

export interface UserService {
  createUser(data: CreateUserRequest): Observable<User>;
  updateUser(data: UpdateUserRequest): Observable<User>;
  getUser(data: GetUserRequest): Observable<User>;
} 