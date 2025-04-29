
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  email: 'email',
  password: 'password',
  role: 'role',
  isExchangerActive: 'isExchangerActive',
  isFrozen: 'isFrozen',
  frozenUntil: 'frozenUntil',
  missedOffersCount: 'missedOffersCount',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ExchangeListingScalarFieldEnum = {
  id: 'id',
  type: 'type',
  cryptocurrency: 'cryptocurrency',
  fiatCurrency: 'fiatCurrency',
  rate: 'rate',
  minAmount: 'minAmount',
  maxAmount: 'maxAmount',
  availableAmount: 'availableAmount',
  paymentMethods: 'paymentMethods',
  terms: 'terms',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  userId: 'userId'
};

exports.Prisma.ExchangeOfferScalarFieldEnum = {
  id: 'id',
  amount: 'amount',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  userId: 'userId',
  listingId: 'listingId'
};

exports.Prisma.ExchangeTransactionScalarFieldEnum = {
  id: 'id',
  type: 'type',
  status: 'status',
  cryptocurrency: 'cryptocurrency',
  fiatCurrency: 'fiatCurrency',
  cryptoAmount: 'cryptoAmount',
  fiatAmount: 'fiatAmount',
  paymentProof: 'paymentProof',
  disputeId: 'disputeId',
  confirmationDeadline: 'confirmationDeadline',
  canCustomerDispute: 'canCustomerDispute',
  canExchangerDispute: 'canExchangerDispute',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  finishedAt: 'finishedAt',
  offerId: 'offerId',
  customerId: 'customerId',
  exchangerId: 'exchangerId',
  listingId: 'listingId'
};

exports.Prisma.DisputeScalarFieldEnum = {
  id: 'id',
  reason: 'reason',
  status: 'status',
  resolution: 'resolution',
  resolvedAt: 'resolvedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  transactionId: 'transactionId',
  initiatorId: 'initiatorId',
  moderatorId: 'moderatorId'
};

exports.Prisma.ReviewScalarFieldEnum = {
  id: 'id',
  rating: 'rating',
  comment: 'comment',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  transactionId: 'transactionId',
  authorId: 'authorId',
  targetId: 'targetId'
};

exports.Prisma.UserBalanceScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  cryptoBalance: 'cryptoBalance',
  totalHoldAmount: 'totalHoldAmount',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.BalanceHoldScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  cryptocurrency: 'cryptocurrency',
  amount: 'amount',
  type: 'type',
  relatedTransactionId: 'relatedTransactionId',
  expiresAt: 'expiresAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ExchangerSettingsScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  autoAcceptOffers: 'autoAcceptOffers',
  preferredPaymentMethods: 'preferredPaymentMethods',
  workingHours: 'workingHours',
  minimumRating: 'minimumRating',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.JsonNullValueInput = {
  JsonNull: Prisma.JsonNull
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};
exports.UserRole = exports.$Enums.UserRole = {
  CUSTOMER: 'CUSTOMER',
  EXCHANGER: 'EXCHANGER',
  ADMIN: 'ADMIN',
  MODERATOR: 'MODERATOR'
};

exports.ExchangeType = exports.$Enums.ExchangeType = {
  CRYPTO_TO_FIAT: 'CRYPTO_TO_FIAT',
  FIAT_TO_CRYPTO: 'FIAT_TO_CRYPTO'
};

exports.PaymentMethod = exports.$Enums.PaymentMethod = {
  BANK_TRANSFER: 'BANK_TRANSFER',
  PAYPAL: 'PAYPAL',
  WISE: 'WISE',
  CASH: 'CASH'
};

exports.OfferStatus = exports.$Enums.OfferStatus = {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
  DECLINED: 'DECLINED',
  EXPIRED: 'EXPIRED'
};

exports.TransactionStatus = exports.$Enums.TransactionStatus = {
  PENDING_OFFER: 'PENDING_OFFER',
  PENDING_PAYMENT: 'PENDING_PAYMENT',
  PAYMENT_SENT: 'PAYMENT_SENT',
  PAYMENT_CONFIRMED: 'PAYMENT_CONFIRMED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
  DECLINED: 'DECLINED',
  DISPUTED: 'DISPUTED',
  FINISHED: 'FINISHED'
};

exports.DisputeStatus = exports.$Enums.DisputeStatus = {
  OPEN: 'OPEN',
  IN_PROGRESS: 'IN_PROGRESS',
  RESOLVED: 'RESOLVED'
};

exports.HoldType = exports.$Enums.HoldType = {
  EXCHANGE_OFFER: 'EXCHANGE_OFFER',
  DISPUTE: 'DISPUTE',
  SYSTEM: 'SYSTEM'
};

exports.Prisma.ModelName = {
  User: 'User',
  ExchangeListing: 'ExchangeListing',
  ExchangeOffer: 'ExchangeOffer',
  ExchangeTransaction: 'ExchangeTransaction',
  Dispute: 'Dispute',
  Review: 'Review',
  UserBalance: 'UserBalance',
  BalanceHold: 'BalanceHold',
  ExchangerSettings: 'ExchangerSettings'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
