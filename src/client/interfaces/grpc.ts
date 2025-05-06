import { Observable } from 'rxjs';

export interface ExchangeService {
  createListing(data: any): Observable<any>;
  getListings(data: any): Observable<any>;
  createOffer(data: any): Observable<any>;
  respondOffer(data: any): Observable<any>;
  updateTransactionStatus(data: any): Observable<any>;
  getActiveExchanges(data: any): Observable<any>;
  confirmPayment(data: any): Observable<any>;
  confirmReceipt(data: any): Observable<any>;
  cancelTransaction(data: any): Observable<any>;
  setExchangerStatus(data: any): Observable<any>;
  freezeExchanger(data: any): Observable<any>;
}

export interface BalanceService {
  getBalance(data: any): Observable<any>;
  createHold(data: any): Observable<any>;
  releaseHold(data: any): Observable<any>;
  transfer(data: any): Observable<any>;
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

export interface P2PService {
  getStats(data: any): Observable<any>;
  getExchangeRates(data: any): Observable<any>;
  getExchangeLimits(data: any): Observable<any>;
  getExchangeFees(data: any): Observable<any>;
  getSettings(data: any): Observable<any>;
  updateSettings(data: any): Observable<any>;
} 