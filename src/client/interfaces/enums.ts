export enum ExchangeType {
  CRYPTO_TO_FIAT = 'CRYPTO_TO_FIAT',
  FIAT_TO_CRYPTO = 'FIAT_TO_CRYPTO',
}

export enum UserRole {
  USER = 'USER',
  EXCHANGER = 'EXCHANGER',
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR'
}

export enum TransactionStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  FAILED = 'FAILED',
  DISPUTED = 'DISPUTED'
}

export enum TransactionType {
  DEPOSIT = 'DEPOSIT',
  WITHDRAWAL = 'WITHDRAWAL',
  EXCHANGE = 'EXCHANGE',
  TRANSFER = 'TRANSFER'
}

export enum NotificationType {
  // Transaction related
  TRANSACTION = 'TRANSACTION',
  TRANSACTION_STATUS_CHANGED = 'exchange.transaction.statusChanged',
  TRANSACTION_CREATED = 'exchange.transaction.created',
  TRANSACTION_FINISHED = 'exchange.transaction.finished',
  
  // Balance related
  BALANCE_UPDATED = 'balance.updated',
  BALANCE_HOLD_CREATED = 'balance.hold.created',
  BALANCE_HOLD_RELEASED = 'balance.hold.released',
  BALANCE_TRANSFER = 'balance.transfer',
  BALANCE_TRANSFER_COMPLETED = 'balance.transfer.completed',
  
  // Dispute related
  DISPUTE = 'DISPUTE',
  DISPUTE_CREATED = 'dispute.created',
  DISPUTE_RESOLVED = 'dispute.resolved',
  DISPUTE_ARCHIVED = 'dispute.archived',
  DISPUTE_COMMENT_ADDED = 'dispute.comment.added',
  DISPUTE_STATUS_CHANGED = 'dispute.status.changed',
  DISPUTE_RESOLUTION_ADDED = 'dispute.resolution.added',
  
  // Listing related
  LISTING_STATUS_CHANGED = 'exchange.listing.statusChanged',
  LISTING_DELETED = 'exchange.listing.deleted',
  LISTING_DEACTIVATED = 'exchange.listing.deactivated',
  
  // Offer related
  OFFER_CREATED = 'offer.created',
  
  // Review related
  REVIEW = 'REVIEW',
  REVIEW_CREATED = 'review.created',
  REVIEW_UPDATED = 'review.updated',
  
  // System related
  SYSTEM = 'SYSTEM',
  AUDIT_LOG_CREATED = 'audit.log.created',
  EXCHANGER_STATUS_CHECKED = 'exchanger.status.checked',
  EXCHANGER_STATUS_FROZEN = 'exchanger.status.frozen',
  SCHEDULER_TASK_FAILED = 'scheduler.task.failed',
  HEALTH_CHECK = 'system.health.check',
  
  // Security related
  SECURITY = 'SECURITY'
}

export enum AuditAction {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  EXCHANGE = 'EXCHANGE',
  DISPUTE = 'DISPUTE'
}

export enum EntityType {
  USER = 'USER',
  TRANSACTION = 'TRANSACTION',
  DISPUTE = 'DISPUTE',
  REVIEW = 'REVIEW',
  LISTING = 'LISTING',
  OFFER = 'OFFER'
}

export enum HoldType {
  EXCHANGE = 'EXCHANGE',
  WITHDRAWAL = 'WITHDRAWAL',
  DISPUTE = 'DISPUTE'
}

export enum ListingType {
  BUY = 'BUY',
  SELL = 'SELL'
}

export enum OfferStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED',
  EXPIRED = 'EXPIRED'
}

export enum FilterType {
  LISTING = 'LISTING',
  TRANSACTION = 'TRANSACTION',
  USER = 'USER'
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