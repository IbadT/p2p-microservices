
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model ExchangeListing
 * 
 */
export type ExchangeListing = $Result.DefaultSelection<Prisma.$ExchangeListingPayload>
/**
 * Model ExchangeOffer
 * 
 */
export type ExchangeOffer = $Result.DefaultSelection<Prisma.$ExchangeOfferPayload>
/**
 * Model ExchangeTransaction
 * 
 */
export type ExchangeTransaction = $Result.DefaultSelection<Prisma.$ExchangeTransactionPayload>
/**
 * Model Dispute
 * 
 */
export type Dispute = $Result.DefaultSelection<Prisma.$DisputePayload>
/**
 * Model Review
 * 
 */
export type Review = $Result.DefaultSelection<Prisma.$ReviewPayload>
/**
 * Model UserBalance
 * 
 */
export type UserBalance = $Result.DefaultSelection<Prisma.$UserBalancePayload>
/**
 * Model BalanceHold
 * 
 */
export type BalanceHold = $Result.DefaultSelection<Prisma.$BalanceHoldPayload>
/**
 * Model ExchangerSettings
 * 
 */
export type ExchangerSettings = $Result.DefaultSelection<Prisma.$ExchangerSettingsPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserRole: {
  CUSTOMER: 'CUSTOMER',
  EXCHANGER: 'EXCHANGER',
  ADMIN: 'ADMIN',
  MODERATOR: 'MODERATOR'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]


export const ExchangeType: {
  CRYPTO_TO_FIAT: 'CRYPTO_TO_FIAT',
  FIAT_TO_CRYPTO: 'FIAT_TO_CRYPTO'
};

export type ExchangeType = (typeof ExchangeType)[keyof typeof ExchangeType]


export const PaymentMethod: {
  BANK_TRANSFER: 'BANK_TRANSFER',
  PAYPAL: 'PAYPAL',
  WISE: 'WISE',
  CASH: 'CASH'
};

export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod]


export const OfferStatus: {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
  DECLINED: 'DECLINED',
  EXPIRED: 'EXPIRED'
};

export type OfferStatus = (typeof OfferStatus)[keyof typeof OfferStatus]


export const TransactionStatus: {
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

export type TransactionStatus = (typeof TransactionStatus)[keyof typeof TransactionStatus]


export const DisputeStatus: {
  OPEN: 'OPEN',
  IN_PROGRESS: 'IN_PROGRESS',
  RESOLVED: 'RESOLVED'
};

export type DisputeStatus = (typeof DisputeStatus)[keyof typeof DisputeStatus]


export const HoldType: {
  EXCHANGE_OFFER: 'EXCHANGE_OFFER',
  DISPUTE: 'DISPUTE',
  SYSTEM: 'SYSTEM'
};

export type HoldType = (typeof HoldType)[keyof typeof HoldType]

}

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

export type ExchangeType = $Enums.ExchangeType

export const ExchangeType: typeof $Enums.ExchangeType

export type PaymentMethod = $Enums.PaymentMethod

export const PaymentMethod: typeof $Enums.PaymentMethod

export type OfferStatus = $Enums.OfferStatus

export const OfferStatus: typeof $Enums.OfferStatus

export type TransactionStatus = $Enums.TransactionStatus

export const TransactionStatus: typeof $Enums.TransactionStatus

export type DisputeStatus = $Enums.DisputeStatus

export const DisputeStatus: typeof $Enums.DisputeStatus

export type HoldType = $Enums.HoldType

export const HoldType: typeof $Enums.HoldType

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.exchangeListing`: Exposes CRUD operations for the **ExchangeListing** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ExchangeListings
    * const exchangeListings = await prisma.exchangeListing.findMany()
    * ```
    */
  get exchangeListing(): Prisma.ExchangeListingDelegate<ExtArgs>;

  /**
   * `prisma.exchangeOffer`: Exposes CRUD operations for the **ExchangeOffer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ExchangeOffers
    * const exchangeOffers = await prisma.exchangeOffer.findMany()
    * ```
    */
  get exchangeOffer(): Prisma.ExchangeOfferDelegate<ExtArgs>;

  /**
   * `prisma.exchangeTransaction`: Exposes CRUD operations for the **ExchangeTransaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ExchangeTransactions
    * const exchangeTransactions = await prisma.exchangeTransaction.findMany()
    * ```
    */
  get exchangeTransaction(): Prisma.ExchangeTransactionDelegate<ExtArgs>;

  /**
   * `prisma.dispute`: Exposes CRUD operations for the **Dispute** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Disputes
    * const disputes = await prisma.dispute.findMany()
    * ```
    */
  get dispute(): Prisma.DisputeDelegate<ExtArgs>;

  /**
   * `prisma.review`: Exposes CRUD operations for the **Review** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Reviews
    * const reviews = await prisma.review.findMany()
    * ```
    */
  get review(): Prisma.ReviewDelegate<ExtArgs>;

  /**
   * `prisma.userBalance`: Exposes CRUD operations for the **UserBalance** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserBalances
    * const userBalances = await prisma.userBalance.findMany()
    * ```
    */
  get userBalance(): Prisma.UserBalanceDelegate<ExtArgs>;

  /**
   * `prisma.balanceHold`: Exposes CRUD operations for the **BalanceHold** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BalanceHolds
    * const balanceHolds = await prisma.balanceHold.findMany()
    * ```
    */
  get balanceHold(): Prisma.BalanceHoldDelegate<ExtArgs>;

  /**
   * `prisma.exchangerSettings`: Exposes CRUD operations for the **ExchangerSettings** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ExchangerSettings
    * const exchangerSettings = await prisma.exchangerSettings.findMany()
    * ```
    */
  get exchangerSettings(): Prisma.ExchangerSettingsDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
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

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "exchangeListing" | "exchangeOffer" | "exchangeTransaction" | "dispute" | "review" | "userBalance" | "balanceHold" | "exchangerSettings"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      ExchangeListing: {
        payload: Prisma.$ExchangeListingPayload<ExtArgs>
        fields: Prisma.ExchangeListingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExchangeListingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangeListingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExchangeListingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangeListingPayload>
          }
          findFirst: {
            args: Prisma.ExchangeListingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangeListingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExchangeListingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangeListingPayload>
          }
          findMany: {
            args: Prisma.ExchangeListingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangeListingPayload>[]
          }
          create: {
            args: Prisma.ExchangeListingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangeListingPayload>
          }
          createMany: {
            args: Prisma.ExchangeListingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ExchangeListingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangeListingPayload>[]
          }
          delete: {
            args: Prisma.ExchangeListingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangeListingPayload>
          }
          update: {
            args: Prisma.ExchangeListingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangeListingPayload>
          }
          deleteMany: {
            args: Prisma.ExchangeListingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ExchangeListingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ExchangeListingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangeListingPayload>
          }
          aggregate: {
            args: Prisma.ExchangeListingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExchangeListing>
          }
          groupBy: {
            args: Prisma.ExchangeListingGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExchangeListingGroupByOutputType>[]
          }
          count: {
            args: Prisma.ExchangeListingCountArgs<ExtArgs>
            result: $Utils.Optional<ExchangeListingCountAggregateOutputType> | number
          }
        }
      }
      ExchangeOffer: {
        payload: Prisma.$ExchangeOfferPayload<ExtArgs>
        fields: Prisma.ExchangeOfferFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExchangeOfferFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangeOfferPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExchangeOfferFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangeOfferPayload>
          }
          findFirst: {
            args: Prisma.ExchangeOfferFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangeOfferPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExchangeOfferFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangeOfferPayload>
          }
          findMany: {
            args: Prisma.ExchangeOfferFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangeOfferPayload>[]
          }
          create: {
            args: Prisma.ExchangeOfferCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangeOfferPayload>
          }
          createMany: {
            args: Prisma.ExchangeOfferCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ExchangeOfferCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangeOfferPayload>[]
          }
          delete: {
            args: Prisma.ExchangeOfferDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangeOfferPayload>
          }
          update: {
            args: Prisma.ExchangeOfferUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangeOfferPayload>
          }
          deleteMany: {
            args: Prisma.ExchangeOfferDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ExchangeOfferUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ExchangeOfferUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangeOfferPayload>
          }
          aggregate: {
            args: Prisma.ExchangeOfferAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExchangeOffer>
          }
          groupBy: {
            args: Prisma.ExchangeOfferGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExchangeOfferGroupByOutputType>[]
          }
          count: {
            args: Prisma.ExchangeOfferCountArgs<ExtArgs>
            result: $Utils.Optional<ExchangeOfferCountAggregateOutputType> | number
          }
        }
      }
      ExchangeTransaction: {
        payload: Prisma.$ExchangeTransactionPayload<ExtArgs>
        fields: Prisma.ExchangeTransactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExchangeTransactionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangeTransactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExchangeTransactionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangeTransactionPayload>
          }
          findFirst: {
            args: Prisma.ExchangeTransactionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangeTransactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExchangeTransactionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangeTransactionPayload>
          }
          findMany: {
            args: Prisma.ExchangeTransactionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangeTransactionPayload>[]
          }
          create: {
            args: Prisma.ExchangeTransactionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangeTransactionPayload>
          }
          createMany: {
            args: Prisma.ExchangeTransactionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ExchangeTransactionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangeTransactionPayload>[]
          }
          delete: {
            args: Prisma.ExchangeTransactionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangeTransactionPayload>
          }
          update: {
            args: Prisma.ExchangeTransactionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangeTransactionPayload>
          }
          deleteMany: {
            args: Prisma.ExchangeTransactionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ExchangeTransactionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ExchangeTransactionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangeTransactionPayload>
          }
          aggregate: {
            args: Prisma.ExchangeTransactionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExchangeTransaction>
          }
          groupBy: {
            args: Prisma.ExchangeTransactionGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExchangeTransactionGroupByOutputType>[]
          }
          count: {
            args: Prisma.ExchangeTransactionCountArgs<ExtArgs>
            result: $Utils.Optional<ExchangeTransactionCountAggregateOutputType> | number
          }
        }
      }
      Dispute: {
        payload: Prisma.$DisputePayload<ExtArgs>
        fields: Prisma.DisputeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DisputeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisputePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DisputeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisputePayload>
          }
          findFirst: {
            args: Prisma.DisputeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisputePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DisputeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisputePayload>
          }
          findMany: {
            args: Prisma.DisputeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisputePayload>[]
          }
          create: {
            args: Prisma.DisputeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisputePayload>
          }
          createMany: {
            args: Prisma.DisputeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DisputeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisputePayload>[]
          }
          delete: {
            args: Prisma.DisputeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisputePayload>
          }
          update: {
            args: Prisma.DisputeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisputePayload>
          }
          deleteMany: {
            args: Prisma.DisputeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DisputeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.DisputeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisputePayload>
          }
          aggregate: {
            args: Prisma.DisputeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDispute>
          }
          groupBy: {
            args: Prisma.DisputeGroupByArgs<ExtArgs>
            result: $Utils.Optional<DisputeGroupByOutputType>[]
          }
          count: {
            args: Prisma.DisputeCountArgs<ExtArgs>
            result: $Utils.Optional<DisputeCountAggregateOutputType> | number
          }
        }
      }
      Review: {
        payload: Prisma.$ReviewPayload<ExtArgs>
        fields: Prisma.ReviewFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReviewFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReviewFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          findFirst: {
            args: Prisma.ReviewFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReviewFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          findMany: {
            args: Prisma.ReviewFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>[]
          }
          create: {
            args: Prisma.ReviewCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          createMany: {
            args: Prisma.ReviewCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReviewCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>[]
          }
          delete: {
            args: Prisma.ReviewDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          update: {
            args: Prisma.ReviewUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          deleteMany: {
            args: Prisma.ReviewDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReviewUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ReviewUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          aggregate: {
            args: Prisma.ReviewAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReview>
          }
          groupBy: {
            args: Prisma.ReviewGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReviewGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReviewCountArgs<ExtArgs>
            result: $Utils.Optional<ReviewCountAggregateOutputType> | number
          }
        }
      }
      UserBalance: {
        payload: Prisma.$UserBalancePayload<ExtArgs>
        fields: Prisma.UserBalanceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserBalanceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserBalancePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserBalanceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserBalancePayload>
          }
          findFirst: {
            args: Prisma.UserBalanceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserBalancePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserBalanceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserBalancePayload>
          }
          findMany: {
            args: Prisma.UserBalanceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserBalancePayload>[]
          }
          create: {
            args: Prisma.UserBalanceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserBalancePayload>
          }
          createMany: {
            args: Prisma.UserBalanceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserBalanceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserBalancePayload>[]
          }
          delete: {
            args: Prisma.UserBalanceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserBalancePayload>
          }
          update: {
            args: Prisma.UserBalanceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserBalancePayload>
          }
          deleteMany: {
            args: Prisma.UserBalanceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserBalanceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserBalanceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserBalancePayload>
          }
          aggregate: {
            args: Prisma.UserBalanceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserBalance>
          }
          groupBy: {
            args: Prisma.UserBalanceGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserBalanceGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserBalanceCountArgs<ExtArgs>
            result: $Utils.Optional<UserBalanceCountAggregateOutputType> | number
          }
        }
      }
      BalanceHold: {
        payload: Prisma.$BalanceHoldPayload<ExtArgs>
        fields: Prisma.BalanceHoldFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BalanceHoldFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BalanceHoldPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BalanceHoldFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BalanceHoldPayload>
          }
          findFirst: {
            args: Prisma.BalanceHoldFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BalanceHoldPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BalanceHoldFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BalanceHoldPayload>
          }
          findMany: {
            args: Prisma.BalanceHoldFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BalanceHoldPayload>[]
          }
          create: {
            args: Prisma.BalanceHoldCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BalanceHoldPayload>
          }
          createMany: {
            args: Prisma.BalanceHoldCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BalanceHoldCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BalanceHoldPayload>[]
          }
          delete: {
            args: Prisma.BalanceHoldDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BalanceHoldPayload>
          }
          update: {
            args: Prisma.BalanceHoldUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BalanceHoldPayload>
          }
          deleteMany: {
            args: Prisma.BalanceHoldDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BalanceHoldUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BalanceHoldUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BalanceHoldPayload>
          }
          aggregate: {
            args: Prisma.BalanceHoldAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBalanceHold>
          }
          groupBy: {
            args: Prisma.BalanceHoldGroupByArgs<ExtArgs>
            result: $Utils.Optional<BalanceHoldGroupByOutputType>[]
          }
          count: {
            args: Prisma.BalanceHoldCountArgs<ExtArgs>
            result: $Utils.Optional<BalanceHoldCountAggregateOutputType> | number
          }
        }
      }
      ExchangerSettings: {
        payload: Prisma.$ExchangerSettingsPayload<ExtArgs>
        fields: Prisma.ExchangerSettingsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExchangerSettingsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangerSettingsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExchangerSettingsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangerSettingsPayload>
          }
          findFirst: {
            args: Prisma.ExchangerSettingsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangerSettingsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExchangerSettingsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangerSettingsPayload>
          }
          findMany: {
            args: Prisma.ExchangerSettingsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangerSettingsPayload>[]
          }
          create: {
            args: Prisma.ExchangerSettingsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangerSettingsPayload>
          }
          createMany: {
            args: Prisma.ExchangerSettingsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ExchangerSettingsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangerSettingsPayload>[]
          }
          delete: {
            args: Prisma.ExchangerSettingsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangerSettingsPayload>
          }
          update: {
            args: Prisma.ExchangerSettingsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangerSettingsPayload>
          }
          deleteMany: {
            args: Prisma.ExchangerSettingsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ExchangerSettingsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ExchangerSettingsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangerSettingsPayload>
          }
          aggregate: {
            args: Prisma.ExchangerSettingsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExchangerSettings>
          }
          groupBy: {
            args: Prisma.ExchangerSettingsGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExchangerSettingsGroupByOutputType>[]
          }
          count: {
            args: Prisma.ExchangerSettingsCountArgs<ExtArgs>
            result: $Utils.Optional<ExchangerSettingsCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    listings: number
    offers: number
    exchangerTransactions: number
    customerTransactions: number
    disputesInitiated: number
    disputesModerated: number
    reviewsWritten: number
    reviewsReceived: number
    holds: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    listings?: boolean | UserCountOutputTypeCountListingsArgs
    offers?: boolean | UserCountOutputTypeCountOffersArgs
    exchangerTransactions?: boolean | UserCountOutputTypeCountExchangerTransactionsArgs
    customerTransactions?: boolean | UserCountOutputTypeCountCustomerTransactionsArgs
    disputesInitiated?: boolean | UserCountOutputTypeCountDisputesInitiatedArgs
    disputesModerated?: boolean | UserCountOutputTypeCountDisputesModeratedArgs
    reviewsWritten?: boolean | UserCountOutputTypeCountReviewsWrittenArgs
    reviewsReceived?: boolean | UserCountOutputTypeCountReviewsReceivedArgs
    holds?: boolean | UserCountOutputTypeCountHoldsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountListingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExchangeListingWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountOffersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExchangeOfferWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountExchangerTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExchangeTransactionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCustomerTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExchangeTransactionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountDisputesInitiatedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DisputeWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountDisputesModeratedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DisputeWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReviewsWrittenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReviewsReceivedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountHoldsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BalanceHoldWhereInput
  }


  /**
   * Count Type ExchangeListingCountOutputType
   */

  export type ExchangeListingCountOutputType = {
    offers: number
    transactions: number
  }

  export type ExchangeListingCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    offers?: boolean | ExchangeListingCountOutputTypeCountOffersArgs
    transactions?: boolean | ExchangeListingCountOutputTypeCountTransactionsArgs
  }

  // Custom InputTypes
  /**
   * ExchangeListingCountOutputType without action
   */
  export type ExchangeListingCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeListingCountOutputType
     */
    select?: ExchangeListingCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ExchangeListingCountOutputType without action
   */
  export type ExchangeListingCountOutputTypeCountOffersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExchangeOfferWhereInput
  }

  /**
   * ExchangeListingCountOutputType without action
   */
  export type ExchangeListingCountOutputTypeCountTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExchangeTransactionWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    missedOffersCount: number | null
  }

  export type UserSumAggregateOutputType = {
    missedOffersCount: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    role: $Enums.UserRole | null
    isExchangerActive: boolean | null
    isFrozen: boolean | null
    frozenUntil: Date | null
    missedOffersCount: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    role: $Enums.UserRole | null
    isExchangerActive: boolean | null
    isFrozen: boolean | null
    frozenUntil: Date | null
    missedOffersCount: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    role: number
    isExchangerActive: number
    isFrozen: number
    frozenUntil: number
    missedOffersCount: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    missedOffersCount?: true
  }

  export type UserSumAggregateInputType = {
    missedOffersCount?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    role?: true
    isExchangerActive?: true
    isFrozen?: true
    frozenUntil?: true
    missedOffersCount?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    role?: true
    isExchangerActive?: true
    isFrozen?: true
    frozenUntil?: true
    missedOffersCount?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    role?: true
    isExchangerActive?: true
    isFrozen?: true
    frozenUntil?: true
    missedOffersCount?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    password: string
    role: $Enums.UserRole
    isExchangerActive: boolean
    isFrozen: boolean
    frozenUntil: Date | null
    missedOffersCount: number
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    isExchangerActive?: boolean
    isFrozen?: boolean
    frozenUntil?: boolean
    missedOffersCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    listings?: boolean | User$listingsArgs<ExtArgs>
    offers?: boolean | User$offersArgs<ExtArgs>
    exchangerTransactions?: boolean | User$exchangerTransactionsArgs<ExtArgs>
    customerTransactions?: boolean | User$customerTransactionsArgs<ExtArgs>
    disputesInitiated?: boolean | User$disputesInitiatedArgs<ExtArgs>
    disputesModerated?: boolean | User$disputesModeratedArgs<ExtArgs>
    reviewsWritten?: boolean | User$reviewsWrittenArgs<ExtArgs>
    reviewsReceived?: boolean | User$reviewsReceivedArgs<ExtArgs>
    balance?: boolean | User$balanceArgs<ExtArgs>
    exchangerSettings?: boolean | User$exchangerSettingsArgs<ExtArgs>
    holds?: boolean | User$holdsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    isExchangerActive?: boolean
    isFrozen?: boolean
    frozenUntil?: boolean
    missedOffersCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    isExchangerActive?: boolean
    isFrozen?: boolean
    frozenUntil?: boolean
    missedOffersCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    listings?: boolean | User$listingsArgs<ExtArgs>
    offers?: boolean | User$offersArgs<ExtArgs>
    exchangerTransactions?: boolean | User$exchangerTransactionsArgs<ExtArgs>
    customerTransactions?: boolean | User$customerTransactionsArgs<ExtArgs>
    disputesInitiated?: boolean | User$disputesInitiatedArgs<ExtArgs>
    disputesModerated?: boolean | User$disputesModeratedArgs<ExtArgs>
    reviewsWritten?: boolean | User$reviewsWrittenArgs<ExtArgs>
    reviewsReceived?: boolean | User$reviewsReceivedArgs<ExtArgs>
    balance?: boolean | User$balanceArgs<ExtArgs>
    exchangerSettings?: boolean | User$exchangerSettingsArgs<ExtArgs>
    holds?: boolean | User$holdsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      listings: Prisma.$ExchangeListingPayload<ExtArgs>[]
      offers: Prisma.$ExchangeOfferPayload<ExtArgs>[]
      exchangerTransactions: Prisma.$ExchangeTransactionPayload<ExtArgs>[]
      customerTransactions: Prisma.$ExchangeTransactionPayload<ExtArgs>[]
      disputesInitiated: Prisma.$DisputePayload<ExtArgs>[]
      disputesModerated: Prisma.$DisputePayload<ExtArgs>[]
      reviewsWritten: Prisma.$ReviewPayload<ExtArgs>[]
      reviewsReceived: Prisma.$ReviewPayload<ExtArgs>[]
      balance: Prisma.$UserBalancePayload<ExtArgs> | null
      exchangerSettings: Prisma.$ExchangerSettingsPayload<ExtArgs> | null
      holds: Prisma.$BalanceHoldPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string
      role: $Enums.UserRole
      isExchangerActive: boolean
      isFrozen: boolean
      frozenUntil: Date | null
      missedOffersCount: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    listings<T extends User$listingsArgs<ExtArgs> = {}>(args?: Subset<T, User$listingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExchangeListingPayload<ExtArgs>, T, "findMany"> | Null>
    offers<T extends User$offersArgs<ExtArgs> = {}>(args?: Subset<T, User$offersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExchangeOfferPayload<ExtArgs>, T, "findMany"> | Null>
    exchangerTransactions<T extends User$exchangerTransactionsArgs<ExtArgs> = {}>(args?: Subset<T, User$exchangerTransactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExchangeTransactionPayload<ExtArgs>, T, "findMany"> | Null>
    customerTransactions<T extends User$customerTransactionsArgs<ExtArgs> = {}>(args?: Subset<T, User$customerTransactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExchangeTransactionPayload<ExtArgs>, T, "findMany"> | Null>
    disputesInitiated<T extends User$disputesInitiatedArgs<ExtArgs> = {}>(args?: Subset<T, User$disputesInitiatedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DisputePayload<ExtArgs>, T, "findMany"> | Null>
    disputesModerated<T extends User$disputesModeratedArgs<ExtArgs> = {}>(args?: Subset<T, User$disputesModeratedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DisputePayload<ExtArgs>, T, "findMany"> | Null>
    reviewsWritten<T extends User$reviewsWrittenArgs<ExtArgs> = {}>(args?: Subset<T, User$reviewsWrittenArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany"> | Null>
    reviewsReceived<T extends User$reviewsReceivedArgs<ExtArgs> = {}>(args?: Subset<T, User$reviewsReceivedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany"> | Null>
    balance<T extends User$balanceArgs<ExtArgs> = {}>(args?: Subset<T, User$balanceArgs<ExtArgs>>): Prisma__UserBalanceClient<$Result.GetResult<Prisma.$UserBalancePayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    exchangerSettings<T extends User$exchangerSettingsArgs<ExtArgs> = {}>(args?: Subset<T, User$exchangerSettingsArgs<ExtArgs>>): Prisma__ExchangerSettingsClient<$Result.GetResult<Prisma.$ExchangerSettingsPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    holds<T extends User$holdsArgs<ExtArgs> = {}>(args?: Subset<T, User$holdsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BalanceHoldPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'UserRole'>
    readonly isExchangerActive: FieldRef<"User", 'Boolean'>
    readonly isFrozen: FieldRef<"User", 'Boolean'>
    readonly frozenUntil: FieldRef<"User", 'DateTime'>
    readonly missedOffersCount: FieldRef<"User", 'Int'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.listings
   */
  export type User$listingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeListing
     */
    select?: ExchangeListingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeListingInclude<ExtArgs> | null
    where?: ExchangeListingWhereInput
    orderBy?: ExchangeListingOrderByWithRelationInput | ExchangeListingOrderByWithRelationInput[]
    cursor?: ExchangeListingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExchangeListingScalarFieldEnum | ExchangeListingScalarFieldEnum[]
  }

  /**
   * User.offers
   */
  export type User$offersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeOffer
     */
    select?: ExchangeOfferSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeOfferInclude<ExtArgs> | null
    where?: ExchangeOfferWhereInput
    orderBy?: ExchangeOfferOrderByWithRelationInput | ExchangeOfferOrderByWithRelationInput[]
    cursor?: ExchangeOfferWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExchangeOfferScalarFieldEnum | ExchangeOfferScalarFieldEnum[]
  }

  /**
   * User.exchangerTransactions
   */
  export type User$exchangerTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeTransaction
     */
    select?: ExchangeTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeTransactionInclude<ExtArgs> | null
    where?: ExchangeTransactionWhereInput
    orderBy?: ExchangeTransactionOrderByWithRelationInput | ExchangeTransactionOrderByWithRelationInput[]
    cursor?: ExchangeTransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExchangeTransactionScalarFieldEnum | ExchangeTransactionScalarFieldEnum[]
  }

  /**
   * User.customerTransactions
   */
  export type User$customerTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeTransaction
     */
    select?: ExchangeTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeTransactionInclude<ExtArgs> | null
    where?: ExchangeTransactionWhereInput
    orderBy?: ExchangeTransactionOrderByWithRelationInput | ExchangeTransactionOrderByWithRelationInput[]
    cursor?: ExchangeTransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExchangeTransactionScalarFieldEnum | ExchangeTransactionScalarFieldEnum[]
  }

  /**
   * User.disputesInitiated
   */
  export type User$disputesInitiatedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dispute
     */
    select?: DisputeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisputeInclude<ExtArgs> | null
    where?: DisputeWhereInput
    orderBy?: DisputeOrderByWithRelationInput | DisputeOrderByWithRelationInput[]
    cursor?: DisputeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DisputeScalarFieldEnum | DisputeScalarFieldEnum[]
  }

  /**
   * User.disputesModerated
   */
  export type User$disputesModeratedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dispute
     */
    select?: DisputeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisputeInclude<ExtArgs> | null
    where?: DisputeWhereInput
    orderBy?: DisputeOrderByWithRelationInput | DisputeOrderByWithRelationInput[]
    cursor?: DisputeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DisputeScalarFieldEnum | DisputeScalarFieldEnum[]
  }

  /**
   * User.reviewsWritten
   */
  export type User$reviewsWrittenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    where?: ReviewWhereInput
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    cursor?: ReviewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * User.reviewsReceived
   */
  export type User$reviewsReceivedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    where?: ReviewWhereInput
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    cursor?: ReviewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * User.balance
   */
  export type User$balanceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBalance
     */
    select?: UserBalanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBalanceInclude<ExtArgs> | null
    where?: UserBalanceWhereInput
  }

  /**
   * User.exchangerSettings
   */
  export type User$exchangerSettingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangerSettings
     */
    select?: ExchangerSettingsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangerSettingsInclude<ExtArgs> | null
    where?: ExchangerSettingsWhereInput
  }

  /**
   * User.holds
   */
  export type User$holdsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BalanceHold
     */
    select?: BalanceHoldSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BalanceHoldInclude<ExtArgs> | null
    where?: BalanceHoldWhereInput
    orderBy?: BalanceHoldOrderByWithRelationInput | BalanceHoldOrderByWithRelationInput[]
    cursor?: BalanceHoldWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BalanceHoldScalarFieldEnum | BalanceHoldScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model ExchangeListing
   */

  export type AggregateExchangeListing = {
    _count: ExchangeListingCountAggregateOutputType | null
    _avg: ExchangeListingAvgAggregateOutputType | null
    _sum: ExchangeListingSumAggregateOutputType | null
    _min: ExchangeListingMinAggregateOutputType | null
    _max: ExchangeListingMaxAggregateOutputType | null
  }

  export type ExchangeListingAvgAggregateOutputType = {
    rate: number | null
    minAmount: number | null
    maxAmount: number | null
    availableAmount: number | null
  }

  export type ExchangeListingSumAggregateOutputType = {
    rate: number | null
    minAmount: number | null
    maxAmount: number | null
    availableAmount: number | null
  }

  export type ExchangeListingMinAggregateOutputType = {
    id: string | null
    type: $Enums.ExchangeType | null
    cryptocurrency: string | null
    fiatCurrency: string | null
    rate: number | null
    minAmount: number | null
    maxAmount: number | null
    availableAmount: number | null
    terms: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
  }

  export type ExchangeListingMaxAggregateOutputType = {
    id: string | null
    type: $Enums.ExchangeType | null
    cryptocurrency: string | null
    fiatCurrency: string | null
    rate: number | null
    minAmount: number | null
    maxAmount: number | null
    availableAmount: number | null
    terms: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
  }

  export type ExchangeListingCountAggregateOutputType = {
    id: number
    type: number
    cryptocurrency: number
    fiatCurrency: number
    rate: number
    minAmount: number
    maxAmount: number
    availableAmount: number
    paymentMethods: number
    terms: number
    isActive: number
    createdAt: number
    updatedAt: number
    userId: number
    _all: number
  }


  export type ExchangeListingAvgAggregateInputType = {
    rate?: true
    minAmount?: true
    maxAmount?: true
    availableAmount?: true
  }

  export type ExchangeListingSumAggregateInputType = {
    rate?: true
    minAmount?: true
    maxAmount?: true
    availableAmount?: true
  }

  export type ExchangeListingMinAggregateInputType = {
    id?: true
    type?: true
    cryptocurrency?: true
    fiatCurrency?: true
    rate?: true
    minAmount?: true
    maxAmount?: true
    availableAmount?: true
    terms?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type ExchangeListingMaxAggregateInputType = {
    id?: true
    type?: true
    cryptocurrency?: true
    fiatCurrency?: true
    rate?: true
    minAmount?: true
    maxAmount?: true
    availableAmount?: true
    terms?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type ExchangeListingCountAggregateInputType = {
    id?: true
    type?: true
    cryptocurrency?: true
    fiatCurrency?: true
    rate?: true
    minAmount?: true
    maxAmount?: true
    availableAmount?: true
    paymentMethods?: true
    terms?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    _all?: true
  }

  export type ExchangeListingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExchangeListing to aggregate.
     */
    where?: ExchangeListingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExchangeListings to fetch.
     */
    orderBy?: ExchangeListingOrderByWithRelationInput | ExchangeListingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExchangeListingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExchangeListings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExchangeListings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ExchangeListings
    **/
    _count?: true | ExchangeListingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ExchangeListingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ExchangeListingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExchangeListingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExchangeListingMaxAggregateInputType
  }

  export type GetExchangeListingAggregateType<T extends ExchangeListingAggregateArgs> = {
        [P in keyof T & keyof AggregateExchangeListing]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExchangeListing[P]>
      : GetScalarType<T[P], AggregateExchangeListing[P]>
  }




  export type ExchangeListingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExchangeListingWhereInput
    orderBy?: ExchangeListingOrderByWithAggregationInput | ExchangeListingOrderByWithAggregationInput[]
    by: ExchangeListingScalarFieldEnum[] | ExchangeListingScalarFieldEnum
    having?: ExchangeListingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExchangeListingCountAggregateInputType | true
    _avg?: ExchangeListingAvgAggregateInputType
    _sum?: ExchangeListingSumAggregateInputType
    _min?: ExchangeListingMinAggregateInputType
    _max?: ExchangeListingMaxAggregateInputType
  }

  export type ExchangeListingGroupByOutputType = {
    id: string
    type: $Enums.ExchangeType
    cryptocurrency: string
    fiatCurrency: string
    rate: number
    minAmount: number
    maxAmount: number
    availableAmount: number
    paymentMethods: $Enums.PaymentMethod[]
    terms: string | null
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    userId: string
    _count: ExchangeListingCountAggregateOutputType | null
    _avg: ExchangeListingAvgAggregateOutputType | null
    _sum: ExchangeListingSumAggregateOutputType | null
    _min: ExchangeListingMinAggregateOutputType | null
    _max: ExchangeListingMaxAggregateOutputType | null
  }

  type GetExchangeListingGroupByPayload<T extends ExchangeListingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExchangeListingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExchangeListingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExchangeListingGroupByOutputType[P]>
            : GetScalarType<T[P], ExchangeListingGroupByOutputType[P]>
        }
      >
    >


  export type ExchangeListingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    cryptocurrency?: boolean
    fiatCurrency?: boolean
    rate?: boolean
    minAmount?: boolean
    maxAmount?: boolean
    availableAmount?: boolean
    paymentMethods?: boolean
    terms?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    offers?: boolean | ExchangeListing$offersArgs<ExtArgs>
    transactions?: boolean | ExchangeListing$transactionsArgs<ExtArgs>
    _count?: boolean | ExchangeListingCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["exchangeListing"]>

  export type ExchangeListingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    cryptocurrency?: boolean
    fiatCurrency?: boolean
    rate?: boolean
    minAmount?: boolean
    maxAmount?: boolean
    availableAmount?: boolean
    paymentMethods?: boolean
    terms?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["exchangeListing"]>

  export type ExchangeListingSelectScalar = {
    id?: boolean
    type?: boolean
    cryptocurrency?: boolean
    fiatCurrency?: boolean
    rate?: boolean
    minAmount?: boolean
    maxAmount?: boolean
    availableAmount?: boolean
    paymentMethods?: boolean
    terms?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
  }

  export type ExchangeListingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    offers?: boolean | ExchangeListing$offersArgs<ExtArgs>
    transactions?: boolean | ExchangeListing$transactionsArgs<ExtArgs>
    _count?: boolean | ExchangeListingCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ExchangeListingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ExchangeListingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ExchangeListing"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      offers: Prisma.$ExchangeOfferPayload<ExtArgs>[]
      transactions: Prisma.$ExchangeTransactionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      type: $Enums.ExchangeType
      cryptocurrency: string
      fiatCurrency: string
      rate: number
      minAmount: number
      maxAmount: number
      availableAmount: number
      paymentMethods: $Enums.PaymentMethod[]
      terms: string | null
      isActive: boolean
      createdAt: Date
      updatedAt: Date
      userId: string
    }, ExtArgs["result"]["exchangeListing"]>
    composites: {}
  }

  type ExchangeListingGetPayload<S extends boolean | null | undefined | ExchangeListingDefaultArgs> = $Result.GetResult<Prisma.$ExchangeListingPayload, S>

  type ExchangeListingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ExchangeListingFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ExchangeListingCountAggregateInputType | true
    }

  export interface ExchangeListingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ExchangeListing'], meta: { name: 'ExchangeListing' } }
    /**
     * Find zero or one ExchangeListing that matches the filter.
     * @param {ExchangeListingFindUniqueArgs} args - Arguments to find a ExchangeListing
     * @example
     * // Get one ExchangeListing
     * const exchangeListing = await prisma.exchangeListing.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExchangeListingFindUniqueArgs>(args: SelectSubset<T, ExchangeListingFindUniqueArgs<ExtArgs>>): Prisma__ExchangeListingClient<$Result.GetResult<Prisma.$ExchangeListingPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ExchangeListing that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ExchangeListingFindUniqueOrThrowArgs} args - Arguments to find a ExchangeListing
     * @example
     * // Get one ExchangeListing
     * const exchangeListing = await prisma.exchangeListing.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExchangeListingFindUniqueOrThrowArgs>(args: SelectSubset<T, ExchangeListingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ExchangeListingClient<$Result.GetResult<Prisma.$ExchangeListingPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ExchangeListing that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExchangeListingFindFirstArgs} args - Arguments to find a ExchangeListing
     * @example
     * // Get one ExchangeListing
     * const exchangeListing = await prisma.exchangeListing.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExchangeListingFindFirstArgs>(args?: SelectSubset<T, ExchangeListingFindFirstArgs<ExtArgs>>): Prisma__ExchangeListingClient<$Result.GetResult<Prisma.$ExchangeListingPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ExchangeListing that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExchangeListingFindFirstOrThrowArgs} args - Arguments to find a ExchangeListing
     * @example
     * // Get one ExchangeListing
     * const exchangeListing = await prisma.exchangeListing.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExchangeListingFindFirstOrThrowArgs>(args?: SelectSubset<T, ExchangeListingFindFirstOrThrowArgs<ExtArgs>>): Prisma__ExchangeListingClient<$Result.GetResult<Prisma.$ExchangeListingPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ExchangeListings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExchangeListingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ExchangeListings
     * const exchangeListings = await prisma.exchangeListing.findMany()
     * 
     * // Get first 10 ExchangeListings
     * const exchangeListings = await prisma.exchangeListing.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const exchangeListingWithIdOnly = await prisma.exchangeListing.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ExchangeListingFindManyArgs>(args?: SelectSubset<T, ExchangeListingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExchangeListingPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ExchangeListing.
     * @param {ExchangeListingCreateArgs} args - Arguments to create a ExchangeListing.
     * @example
     * // Create one ExchangeListing
     * const ExchangeListing = await prisma.exchangeListing.create({
     *   data: {
     *     // ... data to create a ExchangeListing
     *   }
     * })
     * 
     */
    create<T extends ExchangeListingCreateArgs>(args: SelectSubset<T, ExchangeListingCreateArgs<ExtArgs>>): Prisma__ExchangeListingClient<$Result.GetResult<Prisma.$ExchangeListingPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ExchangeListings.
     * @param {ExchangeListingCreateManyArgs} args - Arguments to create many ExchangeListings.
     * @example
     * // Create many ExchangeListings
     * const exchangeListing = await prisma.exchangeListing.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ExchangeListingCreateManyArgs>(args?: SelectSubset<T, ExchangeListingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ExchangeListings and returns the data saved in the database.
     * @param {ExchangeListingCreateManyAndReturnArgs} args - Arguments to create many ExchangeListings.
     * @example
     * // Create many ExchangeListings
     * const exchangeListing = await prisma.exchangeListing.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ExchangeListings and only return the `id`
     * const exchangeListingWithIdOnly = await prisma.exchangeListing.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ExchangeListingCreateManyAndReturnArgs>(args?: SelectSubset<T, ExchangeListingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExchangeListingPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ExchangeListing.
     * @param {ExchangeListingDeleteArgs} args - Arguments to delete one ExchangeListing.
     * @example
     * // Delete one ExchangeListing
     * const ExchangeListing = await prisma.exchangeListing.delete({
     *   where: {
     *     // ... filter to delete one ExchangeListing
     *   }
     * })
     * 
     */
    delete<T extends ExchangeListingDeleteArgs>(args: SelectSubset<T, ExchangeListingDeleteArgs<ExtArgs>>): Prisma__ExchangeListingClient<$Result.GetResult<Prisma.$ExchangeListingPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ExchangeListing.
     * @param {ExchangeListingUpdateArgs} args - Arguments to update one ExchangeListing.
     * @example
     * // Update one ExchangeListing
     * const exchangeListing = await prisma.exchangeListing.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ExchangeListingUpdateArgs>(args: SelectSubset<T, ExchangeListingUpdateArgs<ExtArgs>>): Prisma__ExchangeListingClient<$Result.GetResult<Prisma.$ExchangeListingPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ExchangeListings.
     * @param {ExchangeListingDeleteManyArgs} args - Arguments to filter ExchangeListings to delete.
     * @example
     * // Delete a few ExchangeListings
     * const { count } = await prisma.exchangeListing.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ExchangeListingDeleteManyArgs>(args?: SelectSubset<T, ExchangeListingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ExchangeListings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExchangeListingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ExchangeListings
     * const exchangeListing = await prisma.exchangeListing.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ExchangeListingUpdateManyArgs>(args: SelectSubset<T, ExchangeListingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ExchangeListing.
     * @param {ExchangeListingUpsertArgs} args - Arguments to update or create a ExchangeListing.
     * @example
     * // Update or create a ExchangeListing
     * const exchangeListing = await prisma.exchangeListing.upsert({
     *   create: {
     *     // ... data to create a ExchangeListing
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ExchangeListing we want to update
     *   }
     * })
     */
    upsert<T extends ExchangeListingUpsertArgs>(args: SelectSubset<T, ExchangeListingUpsertArgs<ExtArgs>>): Prisma__ExchangeListingClient<$Result.GetResult<Prisma.$ExchangeListingPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ExchangeListings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExchangeListingCountArgs} args - Arguments to filter ExchangeListings to count.
     * @example
     * // Count the number of ExchangeListings
     * const count = await prisma.exchangeListing.count({
     *   where: {
     *     // ... the filter for the ExchangeListings we want to count
     *   }
     * })
    **/
    count<T extends ExchangeListingCountArgs>(
      args?: Subset<T, ExchangeListingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExchangeListingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ExchangeListing.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExchangeListingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ExchangeListingAggregateArgs>(args: Subset<T, ExchangeListingAggregateArgs>): Prisma.PrismaPromise<GetExchangeListingAggregateType<T>>

    /**
     * Group by ExchangeListing.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExchangeListingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ExchangeListingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExchangeListingGroupByArgs['orderBy'] }
        : { orderBy?: ExchangeListingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ExchangeListingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExchangeListingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ExchangeListing model
   */
  readonly fields: ExchangeListingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ExchangeListing.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExchangeListingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    offers<T extends ExchangeListing$offersArgs<ExtArgs> = {}>(args?: Subset<T, ExchangeListing$offersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExchangeOfferPayload<ExtArgs>, T, "findMany"> | Null>
    transactions<T extends ExchangeListing$transactionsArgs<ExtArgs> = {}>(args?: Subset<T, ExchangeListing$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExchangeTransactionPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ExchangeListing model
   */ 
  interface ExchangeListingFieldRefs {
    readonly id: FieldRef<"ExchangeListing", 'String'>
    readonly type: FieldRef<"ExchangeListing", 'ExchangeType'>
    readonly cryptocurrency: FieldRef<"ExchangeListing", 'String'>
    readonly fiatCurrency: FieldRef<"ExchangeListing", 'String'>
    readonly rate: FieldRef<"ExchangeListing", 'Float'>
    readonly minAmount: FieldRef<"ExchangeListing", 'Float'>
    readonly maxAmount: FieldRef<"ExchangeListing", 'Float'>
    readonly availableAmount: FieldRef<"ExchangeListing", 'Float'>
    readonly paymentMethods: FieldRef<"ExchangeListing", 'PaymentMethod[]'>
    readonly terms: FieldRef<"ExchangeListing", 'String'>
    readonly isActive: FieldRef<"ExchangeListing", 'Boolean'>
    readonly createdAt: FieldRef<"ExchangeListing", 'DateTime'>
    readonly updatedAt: FieldRef<"ExchangeListing", 'DateTime'>
    readonly userId: FieldRef<"ExchangeListing", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ExchangeListing findUnique
   */
  export type ExchangeListingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeListing
     */
    select?: ExchangeListingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeListingInclude<ExtArgs> | null
    /**
     * Filter, which ExchangeListing to fetch.
     */
    where: ExchangeListingWhereUniqueInput
  }

  /**
   * ExchangeListing findUniqueOrThrow
   */
  export type ExchangeListingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeListing
     */
    select?: ExchangeListingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeListingInclude<ExtArgs> | null
    /**
     * Filter, which ExchangeListing to fetch.
     */
    where: ExchangeListingWhereUniqueInput
  }

  /**
   * ExchangeListing findFirst
   */
  export type ExchangeListingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeListing
     */
    select?: ExchangeListingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeListingInclude<ExtArgs> | null
    /**
     * Filter, which ExchangeListing to fetch.
     */
    where?: ExchangeListingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExchangeListings to fetch.
     */
    orderBy?: ExchangeListingOrderByWithRelationInput | ExchangeListingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExchangeListings.
     */
    cursor?: ExchangeListingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExchangeListings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExchangeListings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExchangeListings.
     */
    distinct?: ExchangeListingScalarFieldEnum | ExchangeListingScalarFieldEnum[]
  }

  /**
   * ExchangeListing findFirstOrThrow
   */
  export type ExchangeListingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeListing
     */
    select?: ExchangeListingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeListingInclude<ExtArgs> | null
    /**
     * Filter, which ExchangeListing to fetch.
     */
    where?: ExchangeListingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExchangeListings to fetch.
     */
    orderBy?: ExchangeListingOrderByWithRelationInput | ExchangeListingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExchangeListings.
     */
    cursor?: ExchangeListingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExchangeListings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExchangeListings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExchangeListings.
     */
    distinct?: ExchangeListingScalarFieldEnum | ExchangeListingScalarFieldEnum[]
  }

  /**
   * ExchangeListing findMany
   */
  export type ExchangeListingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeListing
     */
    select?: ExchangeListingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeListingInclude<ExtArgs> | null
    /**
     * Filter, which ExchangeListings to fetch.
     */
    where?: ExchangeListingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExchangeListings to fetch.
     */
    orderBy?: ExchangeListingOrderByWithRelationInput | ExchangeListingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ExchangeListings.
     */
    cursor?: ExchangeListingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExchangeListings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExchangeListings.
     */
    skip?: number
    distinct?: ExchangeListingScalarFieldEnum | ExchangeListingScalarFieldEnum[]
  }

  /**
   * ExchangeListing create
   */
  export type ExchangeListingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeListing
     */
    select?: ExchangeListingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeListingInclude<ExtArgs> | null
    /**
     * The data needed to create a ExchangeListing.
     */
    data: XOR<ExchangeListingCreateInput, ExchangeListingUncheckedCreateInput>
  }

  /**
   * ExchangeListing createMany
   */
  export type ExchangeListingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ExchangeListings.
     */
    data: ExchangeListingCreateManyInput | ExchangeListingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ExchangeListing createManyAndReturn
   */
  export type ExchangeListingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeListing
     */
    select?: ExchangeListingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ExchangeListings.
     */
    data: ExchangeListingCreateManyInput | ExchangeListingCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeListingIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ExchangeListing update
   */
  export type ExchangeListingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeListing
     */
    select?: ExchangeListingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeListingInclude<ExtArgs> | null
    /**
     * The data needed to update a ExchangeListing.
     */
    data: XOR<ExchangeListingUpdateInput, ExchangeListingUncheckedUpdateInput>
    /**
     * Choose, which ExchangeListing to update.
     */
    where: ExchangeListingWhereUniqueInput
  }

  /**
   * ExchangeListing updateMany
   */
  export type ExchangeListingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ExchangeListings.
     */
    data: XOR<ExchangeListingUpdateManyMutationInput, ExchangeListingUncheckedUpdateManyInput>
    /**
     * Filter which ExchangeListings to update
     */
    where?: ExchangeListingWhereInput
  }

  /**
   * ExchangeListing upsert
   */
  export type ExchangeListingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeListing
     */
    select?: ExchangeListingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeListingInclude<ExtArgs> | null
    /**
     * The filter to search for the ExchangeListing to update in case it exists.
     */
    where: ExchangeListingWhereUniqueInput
    /**
     * In case the ExchangeListing found by the `where` argument doesn't exist, create a new ExchangeListing with this data.
     */
    create: XOR<ExchangeListingCreateInput, ExchangeListingUncheckedCreateInput>
    /**
     * In case the ExchangeListing was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExchangeListingUpdateInput, ExchangeListingUncheckedUpdateInput>
  }

  /**
   * ExchangeListing delete
   */
  export type ExchangeListingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeListing
     */
    select?: ExchangeListingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeListingInclude<ExtArgs> | null
    /**
     * Filter which ExchangeListing to delete.
     */
    where: ExchangeListingWhereUniqueInput
  }

  /**
   * ExchangeListing deleteMany
   */
  export type ExchangeListingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExchangeListings to delete
     */
    where?: ExchangeListingWhereInput
  }

  /**
   * ExchangeListing.offers
   */
  export type ExchangeListing$offersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeOffer
     */
    select?: ExchangeOfferSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeOfferInclude<ExtArgs> | null
    where?: ExchangeOfferWhereInput
    orderBy?: ExchangeOfferOrderByWithRelationInput | ExchangeOfferOrderByWithRelationInput[]
    cursor?: ExchangeOfferWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExchangeOfferScalarFieldEnum | ExchangeOfferScalarFieldEnum[]
  }

  /**
   * ExchangeListing.transactions
   */
  export type ExchangeListing$transactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeTransaction
     */
    select?: ExchangeTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeTransactionInclude<ExtArgs> | null
    where?: ExchangeTransactionWhereInput
    orderBy?: ExchangeTransactionOrderByWithRelationInput | ExchangeTransactionOrderByWithRelationInput[]
    cursor?: ExchangeTransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExchangeTransactionScalarFieldEnum | ExchangeTransactionScalarFieldEnum[]
  }

  /**
   * ExchangeListing without action
   */
  export type ExchangeListingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeListing
     */
    select?: ExchangeListingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeListingInclude<ExtArgs> | null
  }


  /**
   * Model ExchangeOffer
   */

  export type AggregateExchangeOffer = {
    _count: ExchangeOfferCountAggregateOutputType | null
    _avg: ExchangeOfferAvgAggregateOutputType | null
    _sum: ExchangeOfferSumAggregateOutputType | null
    _min: ExchangeOfferMinAggregateOutputType | null
    _max: ExchangeOfferMaxAggregateOutputType | null
  }

  export type ExchangeOfferAvgAggregateOutputType = {
    amount: number | null
  }

  export type ExchangeOfferSumAggregateOutputType = {
    amount: number | null
  }

  export type ExchangeOfferMinAggregateOutputType = {
    id: string | null
    amount: number | null
    status: $Enums.OfferStatus | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
    listingId: string | null
  }

  export type ExchangeOfferMaxAggregateOutputType = {
    id: string | null
    amount: number | null
    status: $Enums.OfferStatus | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
    listingId: string | null
  }

  export type ExchangeOfferCountAggregateOutputType = {
    id: number
    amount: number
    status: number
    createdAt: number
    updatedAt: number
    userId: number
    listingId: number
    _all: number
  }


  export type ExchangeOfferAvgAggregateInputType = {
    amount?: true
  }

  export type ExchangeOfferSumAggregateInputType = {
    amount?: true
  }

  export type ExchangeOfferMinAggregateInputType = {
    id?: true
    amount?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    listingId?: true
  }

  export type ExchangeOfferMaxAggregateInputType = {
    id?: true
    amount?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    listingId?: true
  }

  export type ExchangeOfferCountAggregateInputType = {
    id?: true
    amount?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    listingId?: true
    _all?: true
  }

  export type ExchangeOfferAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExchangeOffer to aggregate.
     */
    where?: ExchangeOfferWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExchangeOffers to fetch.
     */
    orderBy?: ExchangeOfferOrderByWithRelationInput | ExchangeOfferOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExchangeOfferWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExchangeOffers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExchangeOffers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ExchangeOffers
    **/
    _count?: true | ExchangeOfferCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ExchangeOfferAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ExchangeOfferSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExchangeOfferMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExchangeOfferMaxAggregateInputType
  }

  export type GetExchangeOfferAggregateType<T extends ExchangeOfferAggregateArgs> = {
        [P in keyof T & keyof AggregateExchangeOffer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExchangeOffer[P]>
      : GetScalarType<T[P], AggregateExchangeOffer[P]>
  }




  export type ExchangeOfferGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExchangeOfferWhereInput
    orderBy?: ExchangeOfferOrderByWithAggregationInput | ExchangeOfferOrderByWithAggregationInput[]
    by: ExchangeOfferScalarFieldEnum[] | ExchangeOfferScalarFieldEnum
    having?: ExchangeOfferScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExchangeOfferCountAggregateInputType | true
    _avg?: ExchangeOfferAvgAggregateInputType
    _sum?: ExchangeOfferSumAggregateInputType
    _min?: ExchangeOfferMinAggregateInputType
    _max?: ExchangeOfferMaxAggregateInputType
  }

  export type ExchangeOfferGroupByOutputType = {
    id: string
    amount: number
    status: $Enums.OfferStatus
    createdAt: Date
    updatedAt: Date
    userId: string
    listingId: string
    _count: ExchangeOfferCountAggregateOutputType | null
    _avg: ExchangeOfferAvgAggregateOutputType | null
    _sum: ExchangeOfferSumAggregateOutputType | null
    _min: ExchangeOfferMinAggregateOutputType | null
    _max: ExchangeOfferMaxAggregateOutputType | null
  }

  type GetExchangeOfferGroupByPayload<T extends ExchangeOfferGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExchangeOfferGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExchangeOfferGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExchangeOfferGroupByOutputType[P]>
            : GetScalarType<T[P], ExchangeOfferGroupByOutputType[P]>
        }
      >
    >


  export type ExchangeOfferSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    amount?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    listingId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    listing?: boolean | ExchangeListingDefaultArgs<ExtArgs>
    transaction?: boolean | ExchangeOffer$transactionArgs<ExtArgs>
  }, ExtArgs["result"]["exchangeOffer"]>

  export type ExchangeOfferSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    amount?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    listingId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    listing?: boolean | ExchangeListingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["exchangeOffer"]>

  export type ExchangeOfferSelectScalar = {
    id?: boolean
    amount?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    listingId?: boolean
  }

  export type ExchangeOfferInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    listing?: boolean | ExchangeListingDefaultArgs<ExtArgs>
    transaction?: boolean | ExchangeOffer$transactionArgs<ExtArgs>
  }
  export type ExchangeOfferIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    listing?: boolean | ExchangeListingDefaultArgs<ExtArgs>
  }

  export type $ExchangeOfferPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ExchangeOffer"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      listing: Prisma.$ExchangeListingPayload<ExtArgs>
      transaction: Prisma.$ExchangeTransactionPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      amount: number
      status: $Enums.OfferStatus
      createdAt: Date
      updatedAt: Date
      userId: string
      listingId: string
    }, ExtArgs["result"]["exchangeOffer"]>
    composites: {}
  }

  type ExchangeOfferGetPayload<S extends boolean | null | undefined | ExchangeOfferDefaultArgs> = $Result.GetResult<Prisma.$ExchangeOfferPayload, S>

  type ExchangeOfferCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ExchangeOfferFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ExchangeOfferCountAggregateInputType | true
    }

  export interface ExchangeOfferDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ExchangeOffer'], meta: { name: 'ExchangeOffer' } }
    /**
     * Find zero or one ExchangeOffer that matches the filter.
     * @param {ExchangeOfferFindUniqueArgs} args - Arguments to find a ExchangeOffer
     * @example
     * // Get one ExchangeOffer
     * const exchangeOffer = await prisma.exchangeOffer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExchangeOfferFindUniqueArgs>(args: SelectSubset<T, ExchangeOfferFindUniqueArgs<ExtArgs>>): Prisma__ExchangeOfferClient<$Result.GetResult<Prisma.$ExchangeOfferPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ExchangeOffer that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ExchangeOfferFindUniqueOrThrowArgs} args - Arguments to find a ExchangeOffer
     * @example
     * // Get one ExchangeOffer
     * const exchangeOffer = await prisma.exchangeOffer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExchangeOfferFindUniqueOrThrowArgs>(args: SelectSubset<T, ExchangeOfferFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ExchangeOfferClient<$Result.GetResult<Prisma.$ExchangeOfferPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ExchangeOffer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExchangeOfferFindFirstArgs} args - Arguments to find a ExchangeOffer
     * @example
     * // Get one ExchangeOffer
     * const exchangeOffer = await prisma.exchangeOffer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExchangeOfferFindFirstArgs>(args?: SelectSubset<T, ExchangeOfferFindFirstArgs<ExtArgs>>): Prisma__ExchangeOfferClient<$Result.GetResult<Prisma.$ExchangeOfferPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ExchangeOffer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExchangeOfferFindFirstOrThrowArgs} args - Arguments to find a ExchangeOffer
     * @example
     * // Get one ExchangeOffer
     * const exchangeOffer = await prisma.exchangeOffer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExchangeOfferFindFirstOrThrowArgs>(args?: SelectSubset<T, ExchangeOfferFindFirstOrThrowArgs<ExtArgs>>): Prisma__ExchangeOfferClient<$Result.GetResult<Prisma.$ExchangeOfferPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ExchangeOffers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExchangeOfferFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ExchangeOffers
     * const exchangeOffers = await prisma.exchangeOffer.findMany()
     * 
     * // Get first 10 ExchangeOffers
     * const exchangeOffers = await prisma.exchangeOffer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const exchangeOfferWithIdOnly = await prisma.exchangeOffer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ExchangeOfferFindManyArgs>(args?: SelectSubset<T, ExchangeOfferFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExchangeOfferPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ExchangeOffer.
     * @param {ExchangeOfferCreateArgs} args - Arguments to create a ExchangeOffer.
     * @example
     * // Create one ExchangeOffer
     * const ExchangeOffer = await prisma.exchangeOffer.create({
     *   data: {
     *     // ... data to create a ExchangeOffer
     *   }
     * })
     * 
     */
    create<T extends ExchangeOfferCreateArgs>(args: SelectSubset<T, ExchangeOfferCreateArgs<ExtArgs>>): Prisma__ExchangeOfferClient<$Result.GetResult<Prisma.$ExchangeOfferPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ExchangeOffers.
     * @param {ExchangeOfferCreateManyArgs} args - Arguments to create many ExchangeOffers.
     * @example
     * // Create many ExchangeOffers
     * const exchangeOffer = await prisma.exchangeOffer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ExchangeOfferCreateManyArgs>(args?: SelectSubset<T, ExchangeOfferCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ExchangeOffers and returns the data saved in the database.
     * @param {ExchangeOfferCreateManyAndReturnArgs} args - Arguments to create many ExchangeOffers.
     * @example
     * // Create many ExchangeOffers
     * const exchangeOffer = await prisma.exchangeOffer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ExchangeOffers and only return the `id`
     * const exchangeOfferWithIdOnly = await prisma.exchangeOffer.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ExchangeOfferCreateManyAndReturnArgs>(args?: SelectSubset<T, ExchangeOfferCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExchangeOfferPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ExchangeOffer.
     * @param {ExchangeOfferDeleteArgs} args - Arguments to delete one ExchangeOffer.
     * @example
     * // Delete one ExchangeOffer
     * const ExchangeOffer = await prisma.exchangeOffer.delete({
     *   where: {
     *     // ... filter to delete one ExchangeOffer
     *   }
     * })
     * 
     */
    delete<T extends ExchangeOfferDeleteArgs>(args: SelectSubset<T, ExchangeOfferDeleteArgs<ExtArgs>>): Prisma__ExchangeOfferClient<$Result.GetResult<Prisma.$ExchangeOfferPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ExchangeOffer.
     * @param {ExchangeOfferUpdateArgs} args - Arguments to update one ExchangeOffer.
     * @example
     * // Update one ExchangeOffer
     * const exchangeOffer = await prisma.exchangeOffer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ExchangeOfferUpdateArgs>(args: SelectSubset<T, ExchangeOfferUpdateArgs<ExtArgs>>): Prisma__ExchangeOfferClient<$Result.GetResult<Prisma.$ExchangeOfferPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ExchangeOffers.
     * @param {ExchangeOfferDeleteManyArgs} args - Arguments to filter ExchangeOffers to delete.
     * @example
     * // Delete a few ExchangeOffers
     * const { count } = await prisma.exchangeOffer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ExchangeOfferDeleteManyArgs>(args?: SelectSubset<T, ExchangeOfferDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ExchangeOffers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExchangeOfferUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ExchangeOffers
     * const exchangeOffer = await prisma.exchangeOffer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ExchangeOfferUpdateManyArgs>(args: SelectSubset<T, ExchangeOfferUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ExchangeOffer.
     * @param {ExchangeOfferUpsertArgs} args - Arguments to update or create a ExchangeOffer.
     * @example
     * // Update or create a ExchangeOffer
     * const exchangeOffer = await prisma.exchangeOffer.upsert({
     *   create: {
     *     // ... data to create a ExchangeOffer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ExchangeOffer we want to update
     *   }
     * })
     */
    upsert<T extends ExchangeOfferUpsertArgs>(args: SelectSubset<T, ExchangeOfferUpsertArgs<ExtArgs>>): Prisma__ExchangeOfferClient<$Result.GetResult<Prisma.$ExchangeOfferPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ExchangeOffers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExchangeOfferCountArgs} args - Arguments to filter ExchangeOffers to count.
     * @example
     * // Count the number of ExchangeOffers
     * const count = await prisma.exchangeOffer.count({
     *   where: {
     *     // ... the filter for the ExchangeOffers we want to count
     *   }
     * })
    **/
    count<T extends ExchangeOfferCountArgs>(
      args?: Subset<T, ExchangeOfferCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExchangeOfferCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ExchangeOffer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExchangeOfferAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ExchangeOfferAggregateArgs>(args: Subset<T, ExchangeOfferAggregateArgs>): Prisma.PrismaPromise<GetExchangeOfferAggregateType<T>>

    /**
     * Group by ExchangeOffer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExchangeOfferGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ExchangeOfferGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExchangeOfferGroupByArgs['orderBy'] }
        : { orderBy?: ExchangeOfferGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ExchangeOfferGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExchangeOfferGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ExchangeOffer model
   */
  readonly fields: ExchangeOfferFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ExchangeOffer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExchangeOfferClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    listing<T extends ExchangeListingDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ExchangeListingDefaultArgs<ExtArgs>>): Prisma__ExchangeListingClient<$Result.GetResult<Prisma.$ExchangeListingPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    transaction<T extends ExchangeOffer$transactionArgs<ExtArgs> = {}>(args?: Subset<T, ExchangeOffer$transactionArgs<ExtArgs>>): Prisma__ExchangeTransactionClient<$Result.GetResult<Prisma.$ExchangeTransactionPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ExchangeOffer model
   */ 
  interface ExchangeOfferFieldRefs {
    readonly id: FieldRef<"ExchangeOffer", 'String'>
    readonly amount: FieldRef<"ExchangeOffer", 'Float'>
    readonly status: FieldRef<"ExchangeOffer", 'OfferStatus'>
    readonly createdAt: FieldRef<"ExchangeOffer", 'DateTime'>
    readonly updatedAt: FieldRef<"ExchangeOffer", 'DateTime'>
    readonly userId: FieldRef<"ExchangeOffer", 'String'>
    readonly listingId: FieldRef<"ExchangeOffer", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ExchangeOffer findUnique
   */
  export type ExchangeOfferFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeOffer
     */
    select?: ExchangeOfferSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeOfferInclude<ExtArgs> | null
    /**
     * Filter, which ExchangeOffer to fetch.
     */
    where: ExchangeOfferWhereUniqueInput
  }

  /**
   * ExchangeOffer findUniqueOrThrow
   */
  export type ExchangeOfferFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeOffer
     */
    select?: ExchangeOfferSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeOfferInclude<ExtArgs> | null
    /**
     * Filter, which ExchangeOffer to fetch.
     */
    where: ExchangeOfferWhereUniqueInput
  }

  /**
   * ExchangeOffer findFirst
   */
  export type ExchangeOfferFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeOffer
     */
    select?: ExchangeOfferSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeOfferInclude<ExtArgs> | null
    /**
     * Filter, which ExchangeOffer to fetch.
     */
    where?: ExchangeOfferWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExchangeOffers to fetch.
     */
    orderBy?: ExchangeOfferOrderByWithRelationInput | ExchangeOfferOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExchangeOffers.
     */
    cursor?: ExchangeOfferWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExchangeOffers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExchangeOffers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExchangeOffers.
     */
    distinct?: ExchangeOfferScalarFieldEnum | ExchangeOfferScalarFieldEnum[]
  }

  /**
   * ExchangeOffer findFirstOrThrow
   */
  export type ExchangeOfferFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeOffer
     */
    select?: ExchangeOfferSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeOfferInclude<ExtArgs> | null
    /**
     * Filter, which ExchangeOffer to fetch.
     */
    where?: ExchangeOfferWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExchangeOffers to fetch.
     */
    orderBy?: ExchangeOfferOrderByWithRelationInput | ExchangeOfferOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExchangeOffers.
     */
    cursor?: ExchangeOfferWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExchangeOffers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExchangeOffers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExchangeOffers.
     */
    distinct?: ExchangeOfferScalarFieldEnum | ExchangeOfferScalarFieldEnum[]
  }

  /**
   * ExchangeOffer findMany
   */
  export type ExchangeOfferFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeOffer
     */
    select?: ExchangeOfferSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeOfferInclude<ExtArgs> | null
    /**
     * Filter, which ExchangeOffers to fetch.
     */
    where?: ExchangeOfferWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExchangeOffers to fetch.
     */
    orderBy?: ExchangeOfferOrderByWithRelationInput | ExchangeOfferOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ExchangeOffers.
     */
    cursor?: ExchangeOfferWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExchangeOffers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExchangeOffers.
     */
    skip?: number
    distinct?: ExchangeOfferScalarFieldEnum | ExchangeOfferScalarFieldEnum[]
  }

  /**
   * ExchangeOffer create
   */
  export type ExchangeOfferCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeOffer
     */
    select?: ExchangeOfferSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeOfferInclude<ExtArgs> | null
    /**
     * The data needed to create a ExchangeOffer.
     */
    data: XOR<ExchangeOfferCreateInput, ExchangeOfferUncheckedCreateInput>
  }

  /**
   * ExchangeOffer createMany
   */
  export type ExchangeOfferCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ExchangeOffers.
     */
    data: ExchangeOfferCreateManyInput | ExchangeOfferCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ExchangeOffer createManyAndReturn
   */
  export type ExchangeOfferCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeOffer
     */
    select?: ExchangeOfferSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ExchangeOffers.
     */
    data: ExchangeOfferCreateManyInput | ExchangeOfferCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeOfferIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ExchangeOffer update
   */
  export type ExchangeOfferUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeOffer
     */
    select?: ExchangeOfferSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeOfferInclude<ExtArgs> | null
    /**
     * The data needed to update a ExchangeOffer.
     */
    data: XOR<ExchangeOfferUpdateInput, ExchangeOfferUncheckedUpdateInput>
    /**
     * Choose, which ExchangeOffer to update.
     */
    where: ExchangeOfferWhereUniqueInput
  }

  /**
   * ExchangeOffer updateMany
   */
  export type ExchangeOfferUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ExchangeOffers.
     */
    data: XOR<ExchangeOfferUpdateManyMutationInput, ExchangeOfferUncheckedUpdateManyInput>
    /**
     * Filter which ExchangeOffers to update
     */
    where?: ExchangeOfferWhereInput
  }

  /**
   * ExchangeOffer upsert
   */
  export type ExchangeOfferUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeOffer
     */
    select?: ExchangeOfferSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeOfferInclude<ExtArgs> | null
    /**
     * The filter to search for the ExchangeOffer to update in case it exists.
     */
    where: ExchangeOfferWhereUniqueInput
    /**
     * In case the ExchangeOffer found by the `where` argument doesn't exist, create a new ExchangeOffer with this data.
     */
    create: XOR<ExchangeOfferCreateInput, ExchangeOfferUncheckedCreateInput>
    /**
     * In case the ExchangeOffer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExchangeOfferUpdateInput, ExchangeOfferUncheckedUpdateInput>
  }

  /**
   * ExchangeOffer delete
   */
  export type ExchangeOfferDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeOffer
     */
    select?: ExchangeOfferSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeOfferInclude<ExtArgs> | null
    /**
     * Filter which ExchangeOffer to delete.
     */
    where: ExchangeOfferWhereUniqueInput
  }

  /**
   * ExchangeOffer deleteMany
   */
  export type ExchangeOfferDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExchangeOffers to delete
     */
    where?: ExchangeOfferWhereInput
  }

  /**
   * ExchangeOffer.transaction
   */
  export type ExchangeOffer$transactionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeTransaction
     */
    select?: ExchangeTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeTransactionInclude<ExtArgs> | null
    where?: ExchangeTransactionWhereInput
  }

  /**
   * ExchangeOffer without action
   */
  export type ExchangeOfferDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeOffer
     */
    select?: ExchangeOfferSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeOfferInclude<ExtArgs> | null
  }


  /**
   * Model ExchangeTransaction
   */

  export type AggregateExchangeTransaction = {
    _count: ExchangeTransactionCountAggregateOutputType | null
    _avg: ExchangeTransactionAvgAggregateOutputType | null
    _sum: ExchangeTransactionSumAggregateOutputType | null
    _min: ExchangeTransactionMinAggregateOutputType | null
    _max: ExchangeTransactionMaxAggregateOutputType | null
  }

  export type ExchangeTransactionAvgAggregateOutputType = {
    cryptoAmount: number | null
    fiatAmount: number | null
  }

  export type ExchangeTransactionSumAggregateOutputType = {
    cryptoAmount: number | null
    fiatAmount: number | null
  }

  export type ExchangeTransactionMinAggregateOutputType = {
    id: string | null
    type: $Enums.ExchangeType | null
    status: $Enums.TransactionStatus | null
    cryptocurrency: string | null
    fiatCurrency: string | null
    cryptoAmount: number | null
    fiatAmount: number | null
    paymentProof: string | null
    disputeId: string | null
    confirmationDeadline: Date | null
    canCustomerDispute: boolean | null
    canExchangerDispute: boolean | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    finishedAt: Date | null
    offerId: string | null
    customerId: string | null
    exchangerId: string | null
    listingId: string | null
  }

  export type ExchangeTransactionMaxAggregateOutputType = {
    id: string | null
    type: $Enums.ExchangeType | null
    status: $Enums.TransactionStatus | null
    cryptocurrency: string | null
    fiatCurrency: string | null
    cryptoAmount: number | null
    fiatAmount: number | null
    paymentProof: string | null
    disputeId: string | null
    confirmationDeadline: Date | null
    canCustomerDispute: boolean | null
    canExchangerDispute: boolean | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    finishedAt: Date | null
    offerId: string | null
    customerId: string | null
    exchangerId: string | null
    listingId: string | null
  }

  export type ExchangeTransactionCountAggregateOutputType = {
    id: number
    type: number
    status: number
    cryptocurrency: number
    fiatCurrency: number
    cryptoAmount: number
    fiatAmount: number
    paymentProof: number
    disputeId: number
    confirmationDeadline: number
    canCustomerDispute: number
    canExchangerDispute: number
    isActive: number
    createdAt: number
    updatedAt: number
    finishedAt: number
    offerId: number
    customerId: number
    exchangerId: number
    listingId: number
    _all: number
  }


  export type ExchangeTransactionAvgAggregateInputType = {
    cryptoAmount?: true
    fiatAmount?: true
  }

  export type ExchangeTransactionSumAggregateInputType = {
    cryptoAmount?: true
    fiatAmount?: true
  }

  export type ExchangeTransactionMinAggregateInputType = {
    id?: true
    type?: true
    status?: true
    cryptocurrency?: true
    fiatCurrency?: true
    cryptoAmount?: true
    fiatAmount?: true
    paymentProof?: true
    disputeId?: true
    confirmationDeadline?: true
    canCustomerDispute?: true
    canExchangerDispute?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    finishedAt?: true
    offerId?: true
    customerId?: true
    exchangerId?: true
    listingId?: true
  }

  export type ExchangeTransactionMaxAggregateInputType = {
    id?: true
    type?: true
    status?: true
    cryptocurrency?: true
    fiatCurrency?: true
    cryptoAmount?: true
    fiatAmount?: true
    paymentProof?: true
    disputeId?: true
    confirmationDeadline?: true
    canCustomerDispute?: true
    canExchangerDispute?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    finishedAt?: true
    offerId?: true
    customerId?: true
    exchangerId?: true
    listingId?: true
  }

  export type ExchangeTransactionCountAggregateInputType = {
    id?: true
    type?: true
    status?: true
    cryptocurrency?: true
    fiatCurrency?: true
    cryptoAmount?: true
    fiatAmount?: true
    paymentProof?: true
    disputeId?: true
    confirmationDeadline?: true
    canCustomerDispute?: true
    canExchangerDispute?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    finishedAt?: true
    offerId?: true
    customerId?: true
    exchangerId?: true
    listingId?: true
    _all?: true
  }

  export type ExchangeTransactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExchangeTransaction to aggregate.
     */
    where?: ExchangeTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExchangeTransactions to fetch.
     */
    orderBy?: ExchangeTransactionOrderByWithRelationInput | ExchangeTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExchangeTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExchangeTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExchangeTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ExchangeTransactions
    **/
    _count?: true | ExchangeTransactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ExchangeTransactionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ExchangeTransactionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExchangeTransactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExchangeTransactionMaxAggregateInputType
  }

  export type GetExchangeTransactionAggregateType<T extends ExchangeTransactionAggregateArgs> = {
        [P in keyof T & keyof AggregateExchangeTransaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExchangeTransaction[P]>
      : GetScalarType<T[P], AggregateExchangeTransaction[P]>
  }




  export type ExchangeTransactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExchangeTransactionWhereInput
    orderBy?: ExchangeTransactionOrderByWithAggregationInput | ExchangeTransactionOrderByWithAggregationInput[]
    by: ExchangeTransactionScalarFieldEnum[] | ExchangeTransactionScalarFieldEnum
    having?: ExchangeTransactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExchangeTransactionCountAggregateInputType | true
    _avg?: ExchangeTransactionAvgAggregateInputType
    _sum?: ExchangeTransactionSumAggregateInputType
    _min?: ExchangeTransactionMinAggregateInputType
    _max?: ExchangeTransactionMaxAggregateInputType
  }

  export type ExchangeTransactionGroupByOutputType = {
    id: string
    type: $Enums.ExchangeType
    status: $Enums.TransactionStatus
    cryptocurrency: string
    fiatCurrency: string
    cryptoAmount: number
    fiatAmount: number
    paymentProof: string | null
    disputeId: string | null
    confirmationDeadline: Date
    canCustomerDispute: boolean
    canExchangerDispute: boolean
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    finishedAt: Date | null
    offerId: string | null
    customerId: string
    exchangerId: string
    listingId: string
    _count: ExchangeTransactionCountAggregateOutputType | null
    _avg: ExchangeTransactionAvgAggregateOutputType | null
    _sum: ExchangeTransactionSumAggregateOutputType | null
    _min: ExchangeTransactionMinAggregateOutputType | null
    _max: ExchangeTransactionMaxAggregateOutputType | null
  }

  type GetExchangeTransactionGroupByPayload<T extends ExchangeTransactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExchangeTransactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExchangeTransactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExchangeTransactionGroupByOutputType[P]>
            : GetScalarType<T[P], ExchangeTransactionGroupByOutputType[P]>
        }
      >
    >


  export type ExchangeTransactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    status?: boolean
    cryptocurrency?: boolean
    fiatCurrency?: boolean
    cryptoAmount?: boolean
    fiatAmount?: boolean
    paymentProof?: boolean
    disputeId?: boolean
    confirmationDeadline?: boolean
    canCustomerDispute?: boolean
    canExchangerDispute?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    finishedAt?: boolean
    offerId?: boolean
    customerId?: boolean
    exchangerId?: boolean
    listingId?: boolean
    offer?: boolean | ExchangeTransaction$offerArgs<ExtArgs>
    customer?: boolean | UserDefaultArgs<ExtArgs>
    exchanger?: boolean | UserDefaultArgs<ExtArgs>
    listing?: boolean | ExchangeListingDefaultArgs<ExtArgs>
    dispute?: boolean | ExchangeTransaction$disputeArgs<ExtArgs>
    review?: boolean | ExchangeTransaction$reviewArgs<ExtArgs>
  }, ExtArgs["result"]["exchangeTransaction"]>

  export type ExchangeTransactionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    status?: boolean
    cryptocurrency?: boolean
    fiatCurrency?: boolean
    cryptoAmount?: boolean
    fiatAmount?: boolean
    paymentProof?: boolean
    disputeId?: boolean
    confirmationDeadline?: boolean
    canCustomerDispute?: boolean
    canExchangerDispute?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    finishedAt?: boolean
    offerId?: boolean
    customerId?: boolean
    exchangerId?: boolean
    listingId?: boolean
    offer?: boolean | ExchangeTransaction$offerArgs<ExtArgs>
    customer?: boolean | UserDefaultArgs<ExtArgs>
    exchanger?: boolean | UserDefaultArgs<ExtArgs>
    listing?: boolean | ExchangeListingDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["exchangeTransaction"]>

  export type ExchangeTransactionSelectScalar = {
    id?: boolean
    type?: boolean
    status?: boolean
    cryptocurrency?: boolean
    fiatCurrency?: boolean
    cryptoAmount?: boolean
    fiatAmount?: boolean
    paymentProof?: boolean
    disputeId?: boolean
    confirmationDeadline?: boolean
    canCustomerDispute?: boolean
    canExchangerDispute?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    finishedAt?: boolean
    offerId?: boolean
    customerId?: boolean
    exchangerId?: boolean
    listingId?: boolean
  }

  export type ExchangeTransactionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    offer?: boolean | ExchangeTransaction$offerArgs<ExtArgs>
    customer?: boolean | UserDefaultArgs<ExtArgs>
    exchanger?: boolean | UserDefaultArgs<ExtArgs>
    listing?: boolean | ExchangeListingDefaultArgs<ExtArgs>
    dispute?: boolean | ExchangeTransaction$disputeArgs<ExtArgs>
    review?: boolean | ExchangeTransaction$reviewArgs<ExtArgs>
  }
  export type ExchangeTransactionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    offer?: boolean | ExchangeTransaction$offerArgs<ExtArgs>
    customer?: boolean | UserDefaultArgs<ExtArgs>
    exchanger?: boolean | UserDefaultArgs<ExtArgs>
    listing?: boolean | ExchangeListingDefaultArgs<ExtArgs>
  }

  export type $ExchangeTransactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ExchangeTransaction"
    objects: {
      offer: Prisma.$ExchangeOfferPayload<ExtArgs> | null
      customer: Prisma.$UserPayload<ExtArgs>
      exchanger: Prisma.$UserPayload<ExtArgs>
      listing: Prisma.$ExchangeListingPayload<ExtArgs>
      dispute: Prisma.$DisputePayload<ExtArgs> | null
      review: Prisma.$ReviewPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      type: $Enums.ExchangeType
      status: $Enums.TransactionStatus
      cryptocurrency: string
      fiatCurrency: string
      cryptoAmount: number
      fiatAmount: number
      paymentProof: string | null
      disputeId: string | null
      confirmationDeadline: Date
      canCustomerDispute: boolean
      canExchangerDispute: boolean
      isActive: boolean
      createdAt: Date
      updatedAt: Date
      finishedAt: Date | null
      offerId: string | null
      customerId: string
      exchangerId: string
      listingId: string
    }, ExtArgs["result"]["exchangeTransaction"]>
    composites: {}
  }

  type ExchangeTransactionGetPayload<S extends boolean | null | undefined | ExchangeTransactionDefaultArgs> = $Result.GetResult<Prisma.$ExchangeTransactionPayload, S>

  type ExchangeTransactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ExchangeTransactionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ExchangeTransactionCountAggregateInputType | true
    }

  export interface ExchangeTransactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ExchangeTransaction'], meta: { name: 'ExchangeTransaction' } }
    /**
     * Find zero or one ExchangeTransaction that matches the filter.
     * @param {ExchangeTransactionFindUniqueArgs} args - Arguments to find a ExchangeTransaction
     * @example
     * // Get one ExchangeTransaction
     * const exchangeTransaction = await prisma.exchangeTransaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExchangeTransactionFindUniqueArgs>(args: SelectSubset<T, ExchangeTransactionFindUniqueArgs<ExtArgs>>): Prisma__ExchangeTransactionClient<$Result.GetResult<Prisma.$ExchangeTransactionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ExchangeTransaction that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ExchangeTransactionFindUniqueOrThrowArgs} args - Arguments to find a ExchangeTransaction
     * @example
     * // Get one ExchangeTransaction
     * const exchangeTransaction = await prisma.exchangeTransaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExchangeTransactionFindUniqueOrThrowArgs>(args: SelectSubset<T, ExchangeTransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ExchangeTransactionClient<$Result.GetResult<Prisma.$ExchangeTransactionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ExchangeTransaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExchangeTransactionFindFirstArgs} args - Arguments to find a ExchangeTransaction
     * @example
     * // Get one ExchangeTransaction
     * const exchangeTransaction = await prisma.exchangeTransaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExchangeTransactionFindFirstArgs>(args?: SelectSubset<T, ExchangeTransactionFindFirstArgs<ExtArgs>>): Prisma__ExchangeTransactionClient<$Result.GetResult<Prisma.$ExchangeTransactionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ExchangeTransaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExchangeTransactionFindFirstOrThrowArgs} args - Arguments to find a ExchangeTransaction
     * @example
     * // Get one ExchangeTransaction
     * const exchangeTransaction = await prisma.exchangeTransaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExchangeTransactionFindFirstOrThrowArgs>(args?: SelectSubset<T, ExchangeTransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma__ExchangeTransactionClient<$Result.GetResult<Prisma.$ExchangeTransactionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ExchangeTransactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExchangeTransactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ExchangeTransactions
     * const exchangeTransactions = await prisma.exchangeTransaction.findMany()
     * 
     * // Get first 10 ExchangeTransactions
     * const exchangeTransactions = await prisma.exchangeTransaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const exchangeTransactionWithIdOnly = await prisma.exchangeTransaction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ExchangeTransactionFindManyArgs>(args?: SelectSubset<T, ExchangeTransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExchangeTransactionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ExchangeTransaction.
     * @param {ExchangeTransactionCreateArgs} args - Arguments to create a ExchangeTransaction.
     * @example
     * // Create one ExchangeTransaction
     * const ExchangeTransaction = await prisma.exchangeTransaction.create({
     *   data: {
     *     // ... data to create a ExchangeTransaction
     *   }
     * })
     * 
     */
    create<T extends ExchangeTransactionCreateArgs>(args: SelectSubset<T, ExchangeTransactionCreateArgs<ExtArgs>>): Prisma__ExchangeTransactionClient<$Result.GetResult<Prisma.$ExchangeTransactionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ExchangeTransactions.
     * @param {ExchangeTransactionCreateManyArgs} args - Arguments to create many ExchangeTransactions.
     * @example
     * // Create many ExchangeTransactions
     * const exchangeTransaction = await prisma.exchangeTransaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ExchangeTransactionCreateManyArgs>(args?: SelectSubset<T, ExchangeTransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ExchangeTransactions and returns the data saved in the database.
     * @param {ExchangeTransactionCreateManyAndReturnArgs} args - Arguments to create many ExchangeTransactions.
     * @example
     * // Create many ExchangeTransactions
     * const exchangeTransaction = await prisma.exchangeTransaction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ExchangeTransactions and only return the `id`
     * const exchangeTransactionWithIdOnly = await prisma.exchangeTransaction.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ExchangeTransactionCreateManyAndReturnArgs>(args?: SelectSubset<T, ExchangeTransactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExchangeTransactionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ExchangeTransaction.
     * @param {ExchangeTransactionDeleteArgs} args - Arguments to delete one ExchangeTransaction.
     * @example
     * // Delete one ExchangeTransaction
     * const ExchangeTransaction = await prisma.exchangeTransaction.delete({
     *   where: {
     *     // ... filter to delete one ExchangeTransaction
     *   }
     * })
     * 
     */
    delete<T extends ExchangeTransactionDeleteArgs>(args: SelectSubset<T, ExchangeTransactionDeleteArgs<ExtArgs>>): Prisma__ExchangeTransactionClient<$Result.GetResult<Prisma.$ExchangeTransactionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ExchangeTransaction.
     * @param {ExchangeTransactionUpdateArgs} args - Arguments to update one ExchangeTransaction.
     * @example
     * // Update one ExchangeTransaction
     * const exchangeTransaction = await prisma.exchangeTransaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ExchangeTransactionUpdateArgs>(args: SelectSubset<T, ExchangeTransactionUpdateArgs<ExtArgs>>): Prisma__ExchangeTransactionClient<$Result.GetResult<Prisma.$ExchangeTransactionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ExchangeTransactions.
     * @param {ExchangeTransactionDeleteManyArgs} args - Arguments to filter ExchangeTransactions to delete.
     * @example
     * // Delete a few ExchangeTransactions
     * const { count } = await prisma.exchangeTransaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ExchangeTransactionDeleteManyArgs>(args?: SelectSubset<T, ExchangeTransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ExchangeTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExchangeTransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ExchangeTransactions
     * const exchangeTransaction = await prisma.exchangeTransaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ExchangeTransactionUpdateManyArgs>(args: SelectSubset<T, ExchangeTransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ExchangeTransaction.
     * @param {ExchangeTransactionUpsertArgs} args - Arguments to update or create a ExchangeTransaction.
     * @example
     * // Update or create a ExchangeTransaction
     * const exchangeTransaction = await prisma.exchangeTransaction.upsert({
     *   create: {
     *     // ... data to create a ExchangeTransaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ExchangeTransaction we want to update
     *   }
     * })
     */
    upsert<T extends ExchangeTransactionUpsertArgs>(args: SelectSubset<T, ExchangeTransactionUpsertArgs<ExtArgs>>): Prisma__ExchangeTransactionClient<$Result.GetResult<Prisma.$ExchangeTransactionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ExchangeTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExchangeTransactionCountArgs} args - Arguments to filter ExchangeTransactions to count.
     * @example
     * // Count the number of ExchangeTransactions
     * const count = await prisma.exchangeTransaction.count({
     *   where: {
     *     // ... the filter for the ExchangeTransactions we want to count
     *   }
     * })
    **/
    count<T extends ExchangeTransactionCountArgs>(
      args?: Subset<T, ExchangeTransactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExchangeTransactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ExchangeTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExchangeTransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ExchangeTransactionAggregateArgs>(args: Subset<T, ExchangeTransactionAggregateArgs>): Prisma.PrismaPromise<GetExchangeTransactionAggregateType<T>>

    /**
     * Group by ExchangeTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExchangeTransactionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ExchangeTransactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExchangeTransactionGroupByArgs['orderBy'] }
        : { orderBy?: ExchangeTransactionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ExchangeTransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExchangeTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ExchangeTransaction model
   */
  readonly fields: ExchangeTransactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ExchangeTransaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExchangeTransactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    offer<T extends ExchangeTransaction$offerArgs<ExtArgs> = {}>(args?: Subset<T, ExchangeTransaction$offerArgs<ExtArgs>>): Prisma__ExchangeOfferClient<$Result.GetResult<Prisma.$ExchangeOfferPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    customer<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    exchanger<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    listing<T extends ExchangeListingDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ExchangeListingDefaultArgs<ExtArgs>>): Prisma__ExchangeListingClient<$Result.GetResult<Prisma.$ExchangeListingPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    dispute<T extends ExchangeTransaction$disputeArgs<ExtArgs> = {}>(args?: Subset<T, ExchangeTransaction$disputeArgs<ExtArgs>>): Prisma__DisputeClient<$Result.GetResult<Prisma.$DisputePayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    review<T extends ExchangeTransaction$reviewArgs<ExtArgs> = {}>(args?: Subset<T, ExchangeTransaction$reviewArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ExchangeTransaction model
   */ 
  interface ExchangeTransactionFieldRefs {
    readonly id: FieldRef<"ExchangeTransaction", 'String'>
    readonly type: FieldRef<"ExchangeTransaction", 'ExchangeType'>
    readonly status: FieldRef<"ExchangeTransaction", 'TransactionStatus'>
    readonly cryptocurrency: FieldRef<"ExchangeTransaction", 'String'>
    readonly fiatCurrency: FieldRef<"ExchangeTransaction", 'String'>
    readonly cryptoAmount: FieldRef<"ExchangeTransaction", 'Float'>
    readonly fiatAmount: FieldRef<"ExchangeTransaction", 'Float'>
    readonly paymentProof: FieldRef<"ExchangeTransaction", 'String'>
    readonly disputeId: FieldRef<"ExchangeTransaction", 'String'>
    readonly confirmationDeadline: FieldRef<"ExchangeTransaction", 'DateTime'>
    readonly canCustomerDispute: FieldRef<"ExchangeTransaction", 'Boolean'>
    readonly canExchangerDispute: FieldRef<"ExchangeTransaction", 'Boolean'>
    readonly isActive: FieldRef<"ExchangeTransaction", 'Boolean'>
    readonly createdAt: FieldRef<"ExchangeTransaction", 'DateTime'>
    readonly updatedAt: FieldRef<"ExchangeTransaction", 'DateTime'>
    readonly finishedAt: FieldRef<"ExchangeTransaction", 'DateTime'>
    readonly offerId: FieldRef<"ExchangeTransaction", 'String'>
    readonly customerId: FieldRef<"ExchangeTransaction", 'String'>
    readonly exchangerId: FieldRef<"ExchangeTransaction", 'String'>
    readonly listingId: FieldRef<"ExchangeTransaction", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ExchangeTransaction findUnique
   */
  export type ExchangeTransactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeTransaction
     */
    select?: ExchangeTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeTransactionInclude<ExtArgs> | null
    /**
     * Filter, which ExchangeTransaction to fetch.
     */
    where: ExchangeTransactionWhereUniqueInput
  }

  /**
   * ExchangeTransaction findUniqueOrThrow
   */
  export type ExchangeTransactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeTransaction
     */
    select?: ExchangeTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeTransactionInclude<ExtArgs> | null
    /**
     * Filter, which ExchangeTransaction to fetch.
     */
    where: ExchangeTransactionWhereUniqueInput
  }

  /**
   * ExchangeTransaction findFirst
   */
  export type ExchangeTransactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeTransaction
     */
    select?: ExchangeTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeTransactionInclude<ExtArgs> | null
    /**
     * Filter, which ExchangeTransaction to fetch.
     */
    where?: ExchangeTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExchangeTransactions to fetch.
     */
    orderBy?: ExchangeTransactionOrderByWithRelationInput | ExchangeTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExchangeTransactions.
     */
    cursor?: ExchangeTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExchangeTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExchangeTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExchangeTransactions.
     */
    distinct?: ExchangeTransactionScalarFieldEnum | ExchangeTransactionScalarFieldEnum[]
  }

  /**
   * ExchangeTransaction findFirstOrThrow
   */
  export type ExchangeTransactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeTransaction
     */
    select?: ExchangeTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeTransactionInclude<ExtArgs> | null
    /**
     * Filter, which ExchangeTransaction to fetch.
     */
    where?: ExchangeTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExchangeTransactions to fetch.
     */
    orderBy?: ExchangeTransactionOrderByWithRelationInput | ExchangeTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExchangeTransactions.
     */
    cursor?: ExchangeTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExchangeTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExchangeTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExchangeTransactions.
     */
    distinct?: ExchangeTransactionScalarFieldEnum | ExchangeTransactionScalarFieldEnum[]
  }

  /**
   * ExchangeTransaction findMany
   */
  export type ExchangeTransactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeTransaction
     */
    select?: ExchangeTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeTransactionInclude<ExtArgs> | null
    /**
     * Filter, which ExchangeTransactions to fetch.
     */
    where?: ExchangeTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExchangeTransactions to fetch.
     */
    orderBy?: ExchangeTransactionOrderByWithRelationInput | ExchangeTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ExchangeTransactions.
     */
    cursor?: ExchangeTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExchangeTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExchangeTransactions.
     */
    skip?: number
    distinct?: ExchangeTransactionScalarFieldEnum | ExchangeTransactionScalarFieldEnum[]
  }

  /**
   * ExchangeTransaction create
   */
  export type ExchangeTransactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeTransaction
     */
    select?: ExchangeTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeTransactionInclude<ExtArgs> | null
    /**
     * The data needed to create a ExchangeTransaction.
     */
    data: XOR<ExchangeTransactionCreateInput, ExchangeTransactionUncheckedCreateInput>
  }

  /**
   * ExchangeTransaction createMany
   */
  export type ExchangeTransactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ExchangeTransactions.
     */
    data: ExchangeTransactionCreateManyInput | ExchangeTransactionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ExchangeTransaction createManyAndReturn
   */
  export type ExchangeTransactionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeTransaction
     */
    select?: ExchangeTransactionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ExchangeTransactions.
     */
    data: ExchangeTransactionCreateManyInput | ExchangeTransactionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeTransactionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ExchangeTransaction update
   */
  export type ExchangeTransactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeTransaction
     */
    select?: ExchangeTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeTransactionInclude<ExtArgs> | null
    /**
     * The data needed to update a ExchangeTransaction.
     */
    data: XOR<ExchangeTransactionUpdateInput, ExchangeTransactionUncheckedUpdateInput>
    /**
     * Choose, which ExchangeTransaction to update.
     */
    where: ExchangeTransactionWhereUniqueInput
  }

  /**
   * ExchangeTransaction updateMany
   */
  export type ExchangeTransactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ExchangeTransactions.
     */
    data: XOR<ExchangeTransactionUpdateManyMutationInput, ExchangeTransactionUncheckedUpdateManyInput>
    /**
     * Filter which ExchangeTransactions to update
     */
    where?: ExchangeTransactionWhereInput
  }

  /**
   * ExchangeTransaction upsert
   */
  export type ExchangeTransactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeTransaction
     */
    select?: ExchangeTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeTransactionInclude<ExtArgs> | null
    /**
     * The filter to search for the ExchangeTransaction to update in case it exists.
     */
    where: ExchangeTransactionWhereUniqueInput
    /**
     * In case the ExchangeTransaction found by the `where` argument doesn't exist, create a new ExchangeTransaction with this data.
     */
    create: XOR<ExchangeTransactionCreateInput, ExchangeTransactionUncheckedCreateInput>
    /**
     * In case the ExchangeTransaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExchangeTransactionUpdateInput, ExchangeTransactionUncheckedUpdateInput>
  }

  /**
   * ExchangeTransaction delete
   */
  export type ExchangeTransactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeTransaction
     */
    select?: ExchangeTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeTransactionInclude<ExtArgs> | null
    /**
     * Filter which ExchangeTransaction to delete.
     */
    where: ExchangeTransactionWhereUniqueInput
  }

  /**
   * ExchangeTransaction deleteMany
   */
  export type ExchangeTransactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExchangeTransactions to delete
     */
    where?: ExchangeTransactionWhereInput
  }

  /**
   * ExchangeTransaction.offer
   */
  export type ExchangeTransaction$offerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeOffer
     */
    select?: ExchangeOfferSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeOfferInclude<ExtArgs> | null
    where?: ExchangeOfferWhereInput
  }

  /**
   * ExchangeTransaction.dispute
   */
  export type ExchangeTransaction$disputeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dispute
     */
    select?: DisputeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisputeInclude<ExtArgs> | null
    where?: DisputeWhereInput
  }

  /**
   * ExchangeTransaction.review
   */
  export type ExchangeTransaction$reviewArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    where?: ReviewWhereInput
  }

  /**
   * ExchangeTransaction without action
   */
  export type ExchangeTransactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeTransaction
     */
    select?: ExchangeTransactionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangeTransactionInclude<ExtArgs> | null
  }


  /**
   * Model Dispute
   */

  export type AggregateDispute = {
    _count: DisputeCountAggregateOutputType | null
    _min: DisputeMinAggregateOutputType | null
    _max: DisputeMaxAggregateOutputType | null
  }

  export type DisputeMinAggregateOutputType = {
    id: string | null
    reason: string | null
    status: $Enums.DisputeStatus | null
    resolution: string | null
    resolvedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    transactionId: string | null
    initiatorId: string | null
    moderatorId: string | null
  }

  export type DisputeMaxAggregateOutputType = {
    id: string | null
    reason: string | null
    status: $Enums.DisputeStatus | null
    resolution: string | null
    resolvedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    transactionId: string | null
    initiatorId: string | null
    moderatorId: string | null
  }

  export type DisputeCountAggregateOutputType = {
    id: number
    reason: number
    status: number
    resolution: number
    resolvedAt: number
    createdAt: number
    updatedAt: number
    transactionId: number
    initiatorId: number
    moderatorId: number
    _all: number
  }


  export type DisputeMinAggregateInputType = {
    id?: true
    reason?: true
    status?: true
    resolution?: true
    resolvedAt?: true
    createdAt?: true
    updatedAt?: true
    transactionId?: true
    initiatorId?: true
    moderatorId?: true
  }

  export type DisputeMaxAggregateInputType = {
    id?: true
    reason?: true
    status?: true
    resolution?: true
    resolvedAt?: true
    createdAt?: true
    updatedAt?: true
    transactionId?: true
    initiatorId?: true
    moderatorId?: true
  }

  export type DisputeCountAggregateInputType = {
    id?: true
    reason?: true
    status?: true
    resolution?: true
    resolvedAt?: true
    createdAt?: true
    updatedAt?: true
    transactionId?: true
    initiatorId?: true
    moderatorId?: true
    _all?: true
  }

  export type DisputeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Dispute to aggregate.
     */
    where?: DisputeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Disputes to fetch.
     */
    orderBy?: DisputeOrderByWithRelationInput | DisputeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DisputeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Disputes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Disputes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Disputes
    **/
    _count?: true | DisputeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DisputeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DisputeMaxAggregateInputType
  }

  export type GetDisputeAggregateType<T extends DisputeAggregateArgs> = {
        [P in keyof T & keyof AggregateDispute]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDispute[P]>
      : GetScalarType<T[P], AggregateDispute[P]>
  }




  export type DisputeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DisputeWhereInput
    orderBy?: DisputeOrderByWithAggregationInput | DisputeOrderByWithAggregationInput[]
    by: DisputeScalarFieldEnum[] | DisputeScalarFieldEnum
    having?: DisputeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DisputeCountAggregateInputType | true
    _min?: DisputeMinAggregateInputType
    _max?: DisputeMaxAggregateInputType
  }

  export type DisputeGroupByOutputType = {
    id: string
    reason: string
    status: $Enums.DisputeStatus
    resolution: string | null
    resolvedAt: Date | null
    createdAt: Date
    updatedAt: Date
    transactionId: string
    initiatorId: string
    moderatorId: string | null
    _count: DisputeCountAggregateOutputType | null
    _min: DisputeMinAggregateOutputType | null
    _max: DisputeMaxAggregateOutputType | null
  }

  type GetDisputeGroupByPayload<T extends DisputeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DisputeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DisputeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DisputeGroupByOutputType[P]>
            : GetScalarType<T[P], DisputeGroupByOutputType[P]>
        }
      >
    >


  export type DisputeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    reason?: boolean
    status?: boolean
    resolution?: boolean
    resolvedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    transactionId?: boolean
    initiatorId?: boolean
    moderatorId?: boolean
    transaction?: boolean | ExchangeTransactionDefaultArgs<ExtArgs>
    initiator?: boolean | UserDefaultArgs<ExtArgs>
    moderator?: boolean | Dispute$moderatorArgs<ExtArgs>
  }, ExtArgs["result"]["dispute"]>

  export type DisputeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    reason?: boolean
    status?: boolean
    resolution?: boolean
    resolvedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    transactionId?: boolean
    initiatorId?: boolean
    moderatorId?: boolean
    transaction?: boolean | ExchangeTransactionDefaultArgs<ExtArgs>
    initiator?: boolean | UserDefaultArgs<ExtArgs>
    moderator?: boolean | Dispute$moderatorArgs<ExtArgs>
  }, ExtArgs["result"]["dispute"]>

  export type DisputeSelectScalar = {
    id?: boolean
    reason?: boolean
    status?: boolean
    resolution?: boolean
    resolvedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    transactionId?: boolean
    initiatorId?: boolean
    moderatorId?: boolean
  }

  export type DisputeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transaction?: boolean | ExchangeTransactionDefaultArgs<ExtArgs>
    initiator?: boolean | UserDefaultArgs<ExtArgs>
    moderator?: boolean | Dispute$moderatorArgs<ExtArgs>
  }
  export type DisputeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transaction?: boolean | ExchangeTransactionDefaultArgs<ExtArgs>
    initiator?: boolean | UserDefaultArgs<ExtArgs>
    moderator?: boolean | Dispute$moderatorArgs<ExtArgs>
  }

  export type $DisputePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Dispute"
    objects: {
      transaction: Prisma.$ExchangeTransactionPayload<ExtArgs>
      initiator: Prisma.$UserPayload<ExtArgs>
      moderator: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      reason: string
      status: $Enums.DisputeStatus
      resolution: string | null
      resolvedAt: Date | null
      createdAt: Date
      updatedAt: Date
      transactionId: string
      initiatorId: string
      moderatorId: string | null
    }, ExtArgs["result"]["dispute"]>
    composites: {}
  }

  type DisputeGetPayload<S extends boolean | null | undefined | DisputeDefaultArgs> = $Result.GetResult<Prisma.$DisputePayload, S>

  type DisputeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<DisputeFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: DisputeCountAggregateInputType | true
    }

  export interface DisputeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Dispute'], meta: { name: 'Dispute' } }
    /**
     * Find zero or one Dispute that matches the filter.
     * @param {DisputeFindUniqueArgs} args - Arguments to find a Dispute
     * @example
     * // Get one Dispute
     * const dispute = await prisma.dispute.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DisputeFindUniqueArgs>(args: SelectSubset<T, DisputeFindUniqueArgs<ExtArgs>>): Prisma__DisputeClient<$Result.GetResult<Prisma.$DisputePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Dispute that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {DisputeFindUniqueOrThrowArgs} args - Arguments to find a Dispute
     * @example
     * // Get one Dispute
     * const dispute = await prisma.dispute.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DisputeFindUniqueOrThrowArgs>(args: SelectSubset<T, DisputeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DisputeClient<$Result.GetResult<Prisma.$DisputePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Dispute that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisputeFindFirstArgs} args - Arguments to find a Dispute
     * @example
     * // Get one Dispute
     * const dispute = await prisma.dispute.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DisputeFindFirstArgs>(args?: SelectSubset<T, DisputeFindFirstArgs<ExtArgs>>): Prisma__DisputeClient<$Result.GetResult<Prisma.$DisputePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Dispute that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisputeFindFirstOrThrowArgs} args - Arguments to find a Dispute
     * @example
     * // Get one Dispute
     * const dispute = await prisma.dispute.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DisputeFindFirstOrThrowArgs>(args?: SelectSubset<T, DisputeFindFirstOrThrowArgs<ExtArgs>>): Prisma__DisputeClient<$Result.GetResult<Prisma.$DisputePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Disputes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisputeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Disputes
     * const disputes = await prisma.dispute.findMany()
     * 
     * // Get first 10 Disputes
     * const disputes = await prisma.dispute.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const disputeWithIdOnly = await prisma.dispute.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DisputeFindManyArgs>(args?: SelectSubset<T, DisputeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DisputePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Dispute.
     * @param {DisputeCreateArgs} args - Arguments to create a Dispute.
     * @example
     * // Create one Dispute
     * const Dispute = await prisma.dispute.create({
     *   data: {
     *     // ... data to create a Dispute
     *   }
     * })
     * 
     */
    create<T extends DisputeCreateArgs>(args: SelectSubset<T, DisputeCreateArgs<ExtArgs>>): Prisma__DisputeClient<$Result.GetResult<Prisma.$DisputePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Disputes.
     * @param {DisputeCreateManyArgs} args - Arguments to create many Disputes.
     * @example
     * // Create many Disputes
     * const dispute = await prisma.dispute.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DisputeCreateManyArgs>(args?: SelectSubset<T, DisputeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Disputes and returns the data saved in the database.
     * @param {DisputeCreateManyAndReturnArgs} args - Arguments to create many Disputes.
     * @example
     * // Create many Disputes
     * const dispute = await prisma.dispute.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Disputes and only return the `id`
     * const disputeWithIdOnly = await prisma.dispute.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DisputeCreateManyAndReturnArgs>(args?: SelectSubset<T, DisputeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DisputePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Dispute.
     * @param {DisputeDeleteArgs} args - Arguments to delete one Dispute.
     * @example
     * // Delete one Dispute
     * const Dispute = await prisma.dispute.delete({
     *   where: {
     *     // ... filter to delete one Dispute
     *   }
     * })
     * 
     */
    delete<T extends DisputeDeleteArgs>(args: SelectSubset<T, DisputeDeleteArgs<ExtArgs>>): Prisma__DisputeClient<$Result.GetResult<Prisma.$DisputePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Dispute.
     * @param {DisputeUpdateArgs} args - Arguments to update one Dispute.
     * @example
     * // Update one Dispute
     * const dispute = await prisma.dispute.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DisputeUpdateArgs>(args: SelectSubset<T, DisputeUpdateArgs<ExtArgs>>): Prisma__DisputeClient<$Result.GetResult<Prisma.$DisputePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Disputes.
     * @param {DisputeDeleteManyArgs} args - Arguments to filter Disputes to delete.
     * @example
     * // Delete a few Disputes
     * const { count } = await prisma.dispute.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DisputeDeleteManyArgs>(args?: SelectSubset<T, DisputeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Disputes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisputeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Disputes
     * const dispute = await prisma.dispute.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DisputeUpdateManyArgs>(args: SelectSubset<T, DisputeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Dispute.
     * @param {DisputeUpsertArgs} args - Arguments to update or create a Dispute.
     * @example
     * // Update or create a Dispute
     * const dispute = await prisma.dispute.upsert({
     *   create: {
     *     // ... data to create a Dispute
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Dispute we want to update
     *   }
     * })
     */
    upsert<T extends DisputeUpsertArgs>(args: SelectSubset<T, DisputeUpsertArgs<ExtArgs>>): Prisma__DisputeClient<$Result.GetResult<Prisma.$DisputePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Disputes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisputeCountArgs} args - Arguments to filter Disputes to count.
     * @example
     * // Count the number of Disputes
     * const count = await prisma.dispute.count({
     *   where: {
     *     // ... the filter for the Disputes we want to count
     *   }
     * })
    **/
    count<T extends DisputeCountArgs>(
      args?: Subset<T, DisputeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DisputeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Dispute.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisputeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DisputeAggregateArgs>(args: Subset<T, DisputeAggregateArgs>): Prisma.PrismaPromise<GetDisputeAggregateType<T>>

    /**
     * Group by Dispute.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisputeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DisputeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DisputeGroupByArgs['orderBy'] }
        : { orderBy?: DisputeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DisputeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDisputeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Dispute model
   */
  readonly fields: DisputeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Dispute.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DisputeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    transaction<T extends ExchangeTransactionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ExchangeTransactionDefaultArgs<ExtArgs>>): Prisma__ExchangeTransactionClient<$Result.GetResult<Prisma.$ExchangeTransactionPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    initiator<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    moderator<T extends Dispute$moderatorArgs<ExtArgs> = {}>(args?: Subset<T, Dispute$moderatorArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Dispute model
   */ 
  interface DisputeFieldRefs {
    readonly id: FieldRef<"Dispute", 'String'>
    readonly reason: FieldRef<"Dispute", 'String'>
    readonly status: FieldRef<"Dispute", 'DisputeStatus'>
    readonly resolution: FieldRef<"Dispute", 'String'>
    readonly resolvedAt: FieldRef<"Dispute", 'DateTime'>
    readonly createdAt: FieldRef<"Dispute", 'DateTime'>
    readonly updatedAt: FieldRef<"Dispute", 'DateTime'>
    readonly transactionId: FieldRef<"Dispute", 'String'>
    readonly initiatorId: FieldRef<"Dispute", 'String'>
    readonly moderatorId: FieldRef<"Dispute", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Dispute findUnique
   */
  export type DisputeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dispute
     */
    select?: DisputeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisputeInclude<ExtArgs> | null
    /**
     * Filter, which Dispute to fetch.
     */
    where: DisputeWhereUniqueInput
  }

  /**
   * Dispute findUniqueOrThrow
   */
  export type DisputeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dispute
     */
    select?: DisputeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisputeInclude<ExtArgs> | null
    /**
     * Filter, which Dispute to fetch.
     */
    where: DisputeWhereUniqueInput
  }

  /**
   * Dispute findFirst
   */
  export type DisputeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dispute
     */
    select?: DisputeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisputeInclude<ExtArgs> | null
    /**
     * Filter, which Dispute to fetch.
     */
    where?: DisputeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Disputes to fetch.
     */
    orderBy?: DisputeOrderByWithRelationInput | DisputeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Disputes.
     */
    cursor?: DisputeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Disputes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Disputes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Disputes.
     */
    distinct?: DisputeScalarFieldEnum | DisputeScalarFieldEnum[]
  }

  /**
   * Dispute findFirstOrThrow
   */
  export type DisputeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dispute
     */
    select?: DisputeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisputeInclude<ExtArgs> | null
    /**
     * Filter, which Dispute to fetch.
     */
    where?: DisputeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Disputes to fetch.
     */
    orderBy?: DisputeOrderByWithRelationInput | DisputeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Disputes.
     */
    cursor?: DisputeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Disputes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Disputes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Disputes.
     */
    distinct?: DisputeScalarFieldEnum | DisputeScalarFieldEnum[]
  }

  /**
   * Dispute findMany
   */
  export type DisputeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dispute
     */
    select?: DisputeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisputeInclude<ExtArgs> | null
    /**
     * Filter, which Disputes to fetch.
     */
    where?: DisputeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Disputes to fetch.
     */
    orderBy?: DisputeOrderByWithRelationInput | DisputeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Disputes.
     */
    cursor?: DisputeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Disputes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Disputes.
     */
    skip?: number
    distinct?: DisputeScalarFieldEnum | DisputeScalarFieldEnum[]
  }

  /**
   * Dispute create
   */
  export type DisputeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dispute
     */
    select?: DisputeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisputeInclude<ExtArgs> | null
    /**
     * The data needed to create a Dispute.
     */
    data: XOR<DisputeCreateInput, DisputeUncheckedCreateInput>
  }

  /**
   * Dispute createMany
   */
  export type DisputeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Disputes.
     */
    data: DisputeCreateManyInput | DisputeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Dispute createManyAndReturn
   */
  export type DisputeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dispute
     */
    select?: DisputeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Disputes.
     */
    data: DisputeCreateManyInput | DisputeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisputeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Dispute update
   */
  export type DisputeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dispute
     */
    select?: DisputeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisputeInclude<ExtArgs> | null
    /**
     * The data needed to update a Dispute.
     */
    data: XOR<DisputeUpdateInput, DisputeUncheckedUpdateInput>
    /**
     * Choose, which Dispute to update.
     */
    where: DisputeWhereUniqueInput
  }

  /**
   * Dispute updateMany
   */
  export type DisputeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Disputes.
     */
    data: XOR<DisputeUpdateManyMutationInput, DisputeUncheckedUpdateManyInput>
    /**
     * Filter which Disputes to update
     */
    where?: DisputeWhereInput
  }

  /**
   * Dispute upsert
   */
  export type DisputeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dispute
     */
    select?: DisputeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisputeInclude<ExtArgs> | null
    /**
     * The filter to search for the Dispute to update in case it exists.
     */
    where: DisputeWhereUniqueInput
    /**
     * In case the Dispute found by the `where` argument doesn't exist, create a new Dispute with this data.
     */
    create: XOR<DisputeCreateInput, DisputeUncheckedCreateInput>
    /**
     * In case the Dispute was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DisputeUpdateInput, DisputeUncheckedUpdateInput>
  }

  /**
   * Dispute delete
   */
  export type DisputeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dispute
     */
    select?: DisputeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisputeInclude<ExtArgs> | null
    /**
     * Filter which Dispute to delete.
     */
    where: DisputeWhereUniqueInput
  }

  /**
   * Dispute deleteMany
   */
  export type DisputeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Disputes to delete
     */
    where?: DisputeWhereInput
  }

  /**
   * Dispute.moderator
   */
  export type Dispute$moderatorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Dispute without action
   */
  export type DisputeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dispute
     */
    select?: DisputeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisputeInclude<ExtArgs> | null
  }


  /**
   * Model Review
   */

  export type AggregateReview = {
    _count: ReviewCountAggregateOutputType | null
    _avg: ReviewAvgAggregateOutputType | null
    _sum: ReviewSumAggregateOutputType | null
    _min: ReviewMinAggregateOutputType | null
    _max: ReviewMaxAggregateOutputType | null
  }

  export type ReviewAvgAggregateOutputType = {
    rating: number | null
  }

  export type ReviewSumAggregateOutputType = {
    rating: number | null
  }

  export type ReviewMinAggregateOutputType = {
    id: string | null
    rating: number | null
    comment: string | null
    createdAt: Date | null
    updatedAt: Date | null
    transactionId: string | null
    authorId: string | null
    targetId: string | null
  }

  export type ReviewMaxAggregateOutputType = {
    id: string | null
    rating: number | null
    comment: string | null
    createdAt: Date | null
    updatedAt: Date | null
    transactionId: string | null
    authorId: string | null
    targetId: string | null
  }

  export type ReviewCountAggregateOutputType = {
    id: number
    rating: number
    comment: number
    createdAt: number
    updatedAt: number
    transactionId: number
    authorId: number
    targetId: number
    _all: number
  }


  export type ReviewAvgAggregateInputType = {
    rating?: true
  }

  export type ReviewSumAggregateInputType = {
    rating?: true
  }

  export type ReviewMinAggregateInputType = {
    id?: true
    rating?: true
    comment?: true
    createdAt?: true
    updatedAt?: true
    transactionId?: true
    authorId?: true
    targetId?: true
  }

  export type ReviewMaxAggregateInputType = {
    id?: true
    rating?: true
    comment?: true
    createdAt?: true
    updatedAt?: true
    transactionId?: true
    authorId?: true
    targetId?: true
  }

  export type ReviewCountAggregateInputType = {
    id?: true
    rating?: true
    comment?: true
    createdAt?: true
    updatedAt?: true
    transactionId?: true
    authorId?: true
    targetId?: true
    _all?: true
  }

  export type ReviewAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Review to aggregate.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Reviews
    **/
    _count?: true | ReviewCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReviewAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReviewSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReviewMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReviewMaxAggregateInputType
  }

  export type GetReviewAggregateType<T extends ReviewAggregateArgs> = {
        [P in keyof T & keyof AggregateReview]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReview[P]>
      : GetScalarType<T[P], AggregateReview[P]>
  }




  export type ReviewGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewWhereInput
    orderBy?: ReviewOrderByWithAggregationInput | ReviewOrderByWithAggregationInput[]
    by: ReviewScalarFieldEnum[] | ReviewScalarFieldEnum
    having?: ReviewScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReviewCountAggregateInputType | true
    _avg?: ReviewAvgAggregateInputType
    _sum?: ReviewSumAggregateInputType
    _min?: ReviewMinAggregateInputType
    _max?: ReviewMaxAggregateInputType
  }

  export type ReviewGroupByOutputType = {
    id: string
    rating: number
    comment: string | null
    createdAt: Date
    updatedAt: Date
    transactionId: string
    authorId: string
    targetId: string
    _count: ReviewCountAggregateOutputType | null
    _avg: ReviewAvgAggregateOutputType | null
    _sum: ReviewSumAggregateOutputType | null
    _min: ReviewMinAggregateOutputType | null
    _max: ReviewMaxAggregateOutputType | null
  }

  type GetReviewGroupByPayload<T extends ReviewGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReviewGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReviewGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReviewGroupByOutputType[P]>
            : GetScalarType<T[P], ReviewGroupByOutputType[P]>
        }
      >
    >


  export type ReviewSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    rating?: boolean
    comment?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    transactionId?: boolean
    authorId?: boolean
    targetId?: boolean
    transaction?: boolean | ExchangeTransactionDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
    target?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["review"]>

  export type ReviewSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    rating?: boolean
    comment?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    transactionId?: boolean
    authorId?: boolean
    targetId?: boolean
    transaction?: boolean | ExchangeTransactionDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
    target?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["review"]>

  export type ReviewSelectScalar = {
    id?: boolean
    rating?: boolean
    comment?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    transactionId?: boolean
    authorId?: boolean
    targetId?: boolean
  }

  export type ReviewInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transaction?: boolean | ExchangeTransactionDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
    target?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ReviewIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transaction?: boolean | ExchangeTransactionDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
    target?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ReviewPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Review"
    objects: {
      transaction: Prisma.$ExchangeTransactionPayload<ExtArgs>
      author: Prisma.$UserPayload<ExtArgs>
      target: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      rating: number
      comment: string | null
      createdAt: Date
      updatedAt: Date
      transactionId: string
      authorId: string
      targetId: string
    }, ExtArgs["result"]["review"]>
    composites: {}
  }

  type ReviewGetPayload<S extends boolean | null | undefined | ReviewDefaultArgs> = $Result.GetResult<Prisma.$ReviewPayload, S>

  type ReviewCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ReviewFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ReviewCountAggregateInputType | true
    }

  export interface ReviewDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Review'], meta: { name: 'Review' } }
    /**
     * Find zero or one Review that matches the filter.
     * @param {ReviewFindUniqueArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReviewFindUniqueArgs>(args: SelectSubset<T, ReviewFindUniqueArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Review that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ReviewFindUniqueOrThrowArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReviewFindUniqueOrThrowArgs>(args: SelectSubset<T, ReviewFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Review that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindFirstArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReviewFindFirstArgs>(args?: SelectSubset<T, ReviewFindFirstArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Review that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindFirstOrThrowArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReviewFindFirstOrThrowArgs>(args?: SelectSubset<T, ReviewFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Reviews that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Reviews
     * const reviews = await prisma.review.findMany()
     * 
     * // Get first 10 Reviews
     * const reviews = await prisma.review.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reviewWithIdOnly = await prisma.review.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReviewFindManyArgs>(args?: SelectSubset<T, ReviewFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Review.
     * @param {ReviewCreateArgs} args - Arguments to create a Review.
     * @example
     * // Create one Review
     * const Review = await prisma.review.create({
     *   data: {
     *     // ... data to create a Review
     *   }
     * })
     * 
     */
    create<T extends ReviewCreateArgs>(args: SelectSubset<T, ReviewCreateArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Reviews.
     * @param {ReviewCreateManyArgs} args - Arguments to create many Reviews.
     * @example
     * // Create many Reviews
     * const review = await prisma.review.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReviewCreateManyArgs>(args?: SelectSubset<T, ReviewCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Reviews and returns the data saved in the database.
     * @param {ReviewCreateManyAndReturnArgs} args - Arguments to create many Reviews.
     * @example
     * // Create many Reviews
     * const review = await prisma.review.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Reviews and only return the `id`
     * const reviewWithIdOnly = await prisma.review.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReviewCreateManyAndReturnArgs>(args?: SelectSubset<T, ReviewCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Review.
     * @param {ReviewDeleteArgs} args - Arguments to delete one Review.
     * @example
     * // Delete one Review
     * const Review = await prisma.review.delete({
     *   where: {
     *     // ... filter to delete one Review
     *   }
     * })
     * 
     */
    delete<T extends ReviewDeleteArgs>(args: SelectSubset<T, ReviewDeleteArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Review.
     * @param {ReviewUpdateArgs} args - Arguments to update one Review.
     * @example
     * // Update one Review
     * const review = await prisma.review.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReviewUpdateArgs>(args: SelectSubset<T, ReviewUpdateArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Reviews.
     * @param {ReviewDeleteManyArgs} args - Arguments to filter Reviews to delete.
     * @example
     * // Delete a few Reviews
     * const { count } = await prisma.review.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReviewDeleteManyArgs>(args?: SelectSubset<T, ReviewDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Reviews
     * const review = await prisma.review.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReviewUpdateManyArgs>(args: SelectSubset<T, ReviewUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Review.
     * @param {ReviewUpsertArgs} args - Arguments to update or create a Review.
     * @example
     * // Update or create a Review
     * const review = await prisma.review.upsert({
     *   create: {
     *     // ... data to create a Review
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Review we want to update
     *   }
     * })
     */
    upsert<T extends ReviewUpsertArgs>(args: SelectSubset<T, ReviewUpsertArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewCountArgs} args - Arguments to filter Reviews to count.
     * @example
     * // Count the number of Reviews
     * const count = await prisma.review.count({
     *   where: {
     *     // ... the filter for the Reviews we want to count
     *   }
     * })
    **/
    count<T extends ReviewCountArgs>(
      args?: Subset<T, ReviewCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReviewCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Review.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReviewAggregateArgs>(args: Subset<T, ReviewAggregateArgs>): Prisma.PrismaPromise<GetReviewAggregateType<T>>

    /**
     * Group by Review.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReviewGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReviewGroupByArgs['orderBy'] }
        : { orderBy?: ReviewGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReviewGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReviewGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Review model
   */
  readonly fields: ReviewFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Review.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReviewClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    transaction<T extends ExchangeTransactionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ExchangeTransactionDefaultArgs<ExtArgs>>): Prisma__ExchangeTransactionClient<$Result.GetResult<Prisma.$ExchangeTransactionPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    author<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    target<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Review model
   */ 
  interface ReviewFieldRefs {
    readonly id: FieldRef<"Review", 'String'>
    readonly rating: FieldRef<"Review", 'Int'>
    readonly comment: FieldRef<"Review", 'String'>
    readonly createdAt: FieldRef<"Review", 'DateTime'>
    readonly updatedAt: FieldRef<"Review", 'DateTime'>
    readonly transactionId: FieldRef<"Review", 'String'>
    readonly authorId: FieldRef<"Review", 'String'>
    readonly targetId: FieldRef<"Review", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Review findUnique
   */
  export type ReviewFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review findUniqueOrThrow
   */
  export type ReviewFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review findFirst
   */
  export type ReviewFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reviews.
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reviews.
     */
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Review findFirstOrThrow
   */
  export type ReviewFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reviews.
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reviews.
     */
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Review findMany
   */
  export type ReviewFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Reviews to fetch.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Reviews.
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Review create
   */
  export type ReviewCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * The data needed to create a Review.
     */
    data: XOR<ReviewCreateInput, ReviewUncheckedCreateInput>
  }

  /**
   * Review createMany
   */
  export type ReviewCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Reviews.
     */
    data: ReviewCreateManyInput | ReviewCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Review createManyAndReturn
   */
  export type ReviewCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Reviews.
     */
    data: ReviewCreateManyInput | ReviewCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Review update
   */
  export type ReviewUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * The data needed to update a Review.
     */
    data: XOR<ReviewUpdateInput, ReviewUncheckedUpdateInput>
    /**
     * Choose, which Review to update.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review updateMany
   */
  export type ReviewUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Reviews.
     */
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyInput>
    /**
     * Filter which Reviews to update
     */
    where?: ReviewWhereInput
  }

  /**
   * Review upsert
   */
  export type ReviewUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * The filter to search for the Review to update in case it exists.
     */
    where: ReviewWhereUniqueInput
    /**
     * In case the Review found by the `where` argument doesn't exist, create a new Review with this data.
     */
    create: XOR<ReviewCreateInput, ReviewUncheckedCreateInput>
    /**
     * In case the Review was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReviewUpdateInput, ReviewUncheckedUpdateInput>
  }

  /**
   * Review delete
   */
  export type ReviewDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter which Review to delete.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review deleteMany
   */
  export type ReviewDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reviews to delete
     */
    where?: ReviewWhereInput
  }

  /**
   * Review without action
   */
  export type ReviewDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
  }


  /**
   * Model UserBalance
   */

  export type AggregateUserBalance = {
    _count: UserBalanceCountAggregateOutputType | null
    _min: UserBalanceMinAggregateOutputType | null
    _max: UserBalanceMaxAggregateOutputType | null
  }

  export type UserBalanceMinAggregateOutputType = {
    id: string | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserBalanceMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserBalanceCountAggregateOutputType = {
    id: number
    userId: number
    cryptoBalance: number
    totalHoldAmount: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserBalanceMinAggregateInputType = {
    id?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserBalanceMaxAggregateInputType = {
    id?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserBalanceCountAggregateInputType = {
    id?: true
    userId?: true
    cryptoBalance?: true
    totalHoldAmount?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserBalanceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserBalance to aggregate.
     */
    where?: UserBalanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserBalances to fetch.
     */
    orderBy?: UserBalanceOrderByWithRelationInput | UserBalanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserBalanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserBalances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserBalances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserBalances
    **/
    _count?: true | UserBalanceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserBalanceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserBalanceMaxAggregateInputType
  }

  export type GetUserBalanceAggregateType<T extends UserBalanceAggregateArgs> = {
        [P in keyof T & keyof AggregateUserBalance]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserBalance[P]>
      : GetScalarType<T[P], AggregateUserBalance[P]>
  }




  export type UserBalanceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserBalanceWhereInput
    orderBy?: UserBalanceOrderByWithAggregationInput | UserBalanceOrderByWithAggregationInput[]
    by: UserBalanceScalarFieldEnum[] | UserBalanceScalarFieldEnum
    having?: UserBalanceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserBalanceCountAggregateInputType | true
    _min?: UserBalanceMinAggregateInputType
    _max?: UserBalanceMaxAggregateInputType
  }

  export type UserBalanceGroupByOutputType = {
    id: string
    userId: string
    cryptoBalance: JsonValue
    totalHoldAmount: JsonValue
    createdAt: Date
    updatedAt: Date
    _count: UserBalanceCountAggregateOutputType | null
    _min: UserBalanceMinAggregateOutputType | null
    _max: UserBalanceMaxAggregateOutputType | null
  }

  type GetUserBalanceGroupByPayload<T extends UserBalanceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserBalanceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserBalanceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserBalanceGroupByOutputType[P]>
            : GetScalarType<T[P], UserBalanceGroupByOutputType[P]>
        }
      >
    >


  export type UserBalanceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    cryptoBalance?: boolean
    totalHoldAmount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userBalance"]>

  export type UserBalanceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    cryptoBalance?: boolean
    totalHoldAmount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userBalance"]>

  export type UserBalanceSelectScalar = {
    id?: boolean
    userId?: boolean
    cryptoBalance?: boolean
    totalHoldAmount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserBalanceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserBalanceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UserBalancePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserBalance"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      cryptoBalance: Prisma.JsonValue
      totalHoldAmount: Prisma.JsonValue
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["userBalance"]>
    composites: {}
  }

  type UserBalanceGetPayload<S extends boolean | null | undefined | UserBalanceDefaultArgs> = $Result.GetResult<Prisma.$UserBalancePayload, S>

  type UserBalanceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserBalanceFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserBalanceCountAggregateInputType | true
    }

  export interface UserBalanceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserBalance'], meta: { name: 'UserBalance' } }
    /**
     * Find zero or one UserBalance that matches the filter.
     * @param {UserBalanceFindUniqueArgs} args - Arguments to find a UserBalance
     * @example
     * // Get one UserBalance
     * const userBalance = await prisma.userBalance.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserBalanceFindUniqueArgs>(args: SelectSubset<T, UserBalanceFindUniqueArgs<ExtArgs>>): Prisma__UserBalanceClient<$Result.GetResult<Prisma.$UserBalancePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one UserBalance that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserBalanceFindUniqueOrThrowArgs} args - Arguments to find a UserBalance
     * @example
     * // Get one UserBalance
     * const userBalance = await prisma.userBalance.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserBalanceFindUniqueOrThrowArgs>(args: SelectSubset<T, UserBalanceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserBalanceClient<$Result.GetResult<Prisma.$UserBalancePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first UserBalance that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserBalanceFindFirstArgs} args - Arguments to find a UserBalance
     * @example
     * // Get one UserBalance
     * const userBalance = await prisma.userBalance.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserBalanceFindFirstArgs>(args?: SelectSubset<T, UserBalanceFindFirstArgs<ExtArgs>>): Prisma__UserBalanceClient<$Result.GetResult<Prisma.$UserBalancePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first UserBalance that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserBalanceFindFirstOrThrowArgs} args - Arguments to find a UserBalance
     * @example
     * // Get one UserBalance
     * const userBalance = await prisma.userBalance.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserBalanceFindFirstOrThrowArgs>(args?: SelectSubset<T, UserBalanceFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserBalanceClient<$Result.GetResult<Prisma.$UserBalancePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more UserBalances that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserBalanceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserBalances
     * const userBalances = await prisma.userBalance.findMany()
     * 
     * // Get first 10 UserBalances
     * const userBalances = await prisma.userBalance.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userBalanceWithIdOnly = await prisma.userBalance.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserBalanceFindManyArgs>(args?: SelectSubset<T, UserBalanceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserBalancePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a UserBalance.
     * @param {UserBalanceCreateArgs} args - Arguments to create a UserBalance.
     * @example
     * // Create one UserBalance
     * const UserBalance = await prisma.userBalance.create({
     *   data: {
     *     // ... data to create a UserBalance
     *   }
     * })
     * 
     */
    create<T extends UserBalanceCreateArgs>(args: SelectSubset<T, UserBalanceCreateArgs<ExtArgs>>): Prisma__UserBalanceClient<$Result.GetResult<Prisma.$UserBalancePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many UserBalances.
     * @param {UserBalanceCreateManyArgs} args - Arguments to create many UserBalances.
     * @example
     * // Create many UserBalances
     * const userBalance = await prisma.userBalance.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserBalanceCreateManyArgs>(args?: SelectSubset<T, UserBalanceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserBalances and returns the data saved in the database.
     * @param {UserBalanceCreateManyAndReturnArgs} args - Arguments to create many UserBalances.
     * @example
     * // Create many UserBalances
     * const userBalance = await prisma.userBalance.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserBalances and only return the `id`
     * const userBalanceWithIdOnly = await prisma.userBalance.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserBalanceCreateManyAndReturnArgs>(args?: SelectSubset<T, UserBalanceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserBalancePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a UserBalance.
     * @param {UserBalanceDeleteArgs} args - Arguments to delete one UserBalance.
     * @example
     * // Delete one UserBalance
     * const UserBalance = await prisma.userBalance.delete({
     *   where: {
     *     // ... filter to delete one UserBalance
     *   }
     * })
     * 
     */
    delete<T extends UserBalanceDeleteArgs>(args: SelectSubset<T, UserBalanceDeleteArgs<ExtArgs>>): Prisma__UserBalanceClient<$Result.GetResult<Prisma.$UserBalancePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one UserBalance.
     * @param {UserBalanceUpdateArgs} args - Arguments to update one UserBalance.
     * @example
     * // Update one UserBalance
     * const userBalance = await prisma.userBalance.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserBalanceUpdateArgs>(args: SelectSubset<T, UserBalanceUpdateArgs<ExtArgs>>): Prisma__UserBalanceClient<$Result.GetResult<Prisma.$UserBalancePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more UserBalances.
     * @param {UserBalanceDeleteManyArgs} args - Arguments to filter UserBalances to delete.
     * @example
     * // Delete a few UserBalances
     * const { count } = await prisma.userBalance.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserBalanceDeleteManyArgs>(args?: SelectSubset<T, UserBalanceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserBalances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserBalanceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserBalances
     * const userBalance = await prisma.userBalance.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserBalanceUpdateManyArgs>(args: SelectSubset<T, UserBalanceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one UserBalance.
     * @param {UserBalanceUpsertArgs} args - Arguments to update or create a UserBalance.
     * @example
     * // Update or create a UserBalance
     * const userBalance = await prisma.userBalance.upsert({
     *   create: {
     *     // ... data to create a UserBalance
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserBalance we want to update
     *   }
     * })
     */
    upsert<T extends UserBalanceUpsertArgs>(args: SelectSubset<T, UserBalanceUpsertArgs<ExtArgs>>): Prisma__UserBalanceClient<$Result.GetResult<Prisma.$UserBalancePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of UserBalances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserBalanceCountArgs} args - Arguments to filter UserBalances to count.
     * @example
     * // Count the number of UserBalances
     * const count = await prisma.userBalance.count({
     *   where: {
     *     // ... the filter for the UserBalances we want to count
     *   }
     * })
    **/
    count<T extends UserBalanceCountArgs>(
      args?: Subset<T, UserBalanceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserBalanceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserBalance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserBalanceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserBalanceAggregateArgs>(args: Subset<T, UserBalanceAggregateArgs>): Prisma.PrismaPromise<GetUserBalanceAggregateType<T>>

    /**
     * Group by UserBalance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserBalanceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserBalanceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserBalanceGroupByArgs['orderBy'] }
        : { orderBy?: UserBalanceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserBalanceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserBalanceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserBalance model
   */
  readonly fields: UserBalanceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserBalance.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserBalanceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserBalance model
   */ 
  interface UserBalanceFieldRefs {
    readonly id: FieldRef<"UserBalance", 'String'>
    readonly userId: FieldRef<"UserBalance", 'String'>
    readonly cryptoBalance: FieldRef<"UserBalance", 'Json'>
    readonly totalHoldAmount: FieldRef<"UserBalance", 'Json'>
    readonly createdAt: FieldRef<"UserBalance", 'DateTime'>
    readonly updatedAt: FieldRef<"UserBalance", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserBalance findUnique
   */
  export type UserBalanceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBalance
     */
    select?: UserBalanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBalanceInclude<ExtArgs> | null
    /**
     * Filter, which UserBalance to fetch.
     */
    where: UserBalanceWhereUniqueInput
  }

  /**
   * UserBalance findUniqueOrThrow
   */
  export type UserBalanceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBalance
     */
    select?: UserBalanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBalanceInclude<ExtArgs> | null
    /**
     * Filter, which UserBalance to fetch.
     */
    where: UserBalanceWhereUniqueInput
  }

  /**
   * UserBalance findFirst
   */
  export type UserBalanceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBalance
     */
    select?: UserBalanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBalanceInclude<ExtArgs> | null
    /**
     * Filter, which UserBalance to fetch.
     */
    where?: UserBalanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserBalances to fetch.
     */
    orderBy?: UserBalanceOrderByWithRelationInput | UserBalanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserBalances.
     */
    cursor?: UserBalanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserBalances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserBalances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserBalances.
     */
    distinct?: UserBalanceScalarFieldEnum | UserBalanceScalarFieldEnum[]
  }

  /**
   * UserBalance findFirstOrThrow
   */
  export type UserBalanceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBalance
     */
    select?: UserBalanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBalanceInclude<ExtArgs> | null
    /**
     * Filter, which UserBalance to fetch.
     */
    where?: UserBalanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserBalances to fetch.
     */
    orderBy?: UserBalanceOrderByWithRelationInput | UserBalanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserBalances.
     */
    cursor?: UserBalanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserBalances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserBalances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserBalances.
     */
    distinct?: UserBalanceScalarFieldEnum | UserBalanceScalarFieldEnum[]
  }

  /**
   * UserBalance findMany
   */
  export type UserBalanceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBalance
     */
    select?: UserBalanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBalanceInclude<ExtArgs> | null
    /**
     * Filter, which UserBalances to fetch.
     */
    where?: UserBalanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserBalances to fetch.
     */
    orderBy?: UserBalanceOrderByWithRelationInput | UserBalanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserBalances.
     */
    cursor?: UserBalanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserBalances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserBalances.
     */
    skip?: number
    distinct?: UserBalanceScalarFieldEnum | UserBalanceScalarFieldEnum[]
  }

  /**
   * UserBalance create
   */
  export type UserBalanceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBalance
     */
    select?: UserBalanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBalanceInclude<ExtArgs> | null
    /**
     * The data needed to create a UserBalance.
     */
    data: XOR<UserBalanceCreateInput, UserBalanceUncheckedCreateInput>
  }

  /**
   * UserBalance createMany
   */
  export type UserBalanceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserBalances.
     */
    data: UserBalanceCreateManyInput | UserBalanceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserBalance createManyAndReturn
   */
  export type UserBalanceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBalance
     */
    select?: UserBalanceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many UserBalances.
     */
    data: UserBalanceCreateManyInput | UserBalanceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBalanceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserBalance update
   */
  export type UserBalanceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBalance
     */
    select?: UserBalanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBalanceInclude<ExtArgs> | null
    /**
     * The data needed to update a UserBalance.
     */
    data: XOR<UserBalanceUpdateInput, UserBalanceUncheckedUpdateInput>
    /**
     * Choose, which UserBalance to update.
     */
    where: UserBalanceWhereUniqueInput
  }

  /**
   * UserBalance updateMany
   */
  export type UserBalanceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserBalances.
     */
    data: XOR<UserBalanceUpdateManyMutationInput, UserBalanceUncheckedUpdateManyInput>
    /**
     * Filter which UserBalances to update
     */
    where?: UserBalanceWhereInput
  }

  /**
   * UserBalance upsert
   */
  export type UserBalanceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBalance
     */
    select?: UserBalanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBalanceInclude<ExtArgs> | null
    /**
     * The filter to search for the UserBalance to update in case it exists.
     */
    where: UserBalanceWhereUniqueInput
    /**
     * In case the UserBalance found by the `where` argument doesn't exist, create a new UserBalance with this data.
     */
    create: XOR<UserBalanceCreateInput, UserBalanceUncheckedCreateInput>
    /**
     * In case the UserBalance was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserBalanceUpdateInput, UserBalanceUncheckedUpdateInput>
  }

  /**
   * UserBalance delete
   */
  export type UserBalanceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBalance
     */
    select?: UserBalanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBalanceInclude<ExtArgs> | null
    /**
     * Filter which UserBalance to delete.
     */
    where: UserBalanceWhereUniqueInput
  }

  /**
   * UserBalance deleteMany
   */
  export type UserBalanceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserBalances to delete
     */
    where?: UserBalanceWhereInput
  }

  /**
   * UserBalance without action
   */
  export type UserBalanceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserBalance
     */
    select?: UserBalanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserBalanceInclude<ExtArgs> | null
  }


  /**
   * Model BalanceHold
   */

  export type AggregateBalanceHold = {
    _count: BalanceHoldCountAggregateOutputType | null
    _avg: BalanceHoldAvgAggregateOutputType | null
    _sum: BalanceHoldSumAggregateOutputType | null
    _min: BalanceHoldMinAggregateOutputType | null
    _max: BalanceHoldMaxAggregateOutputType | null
  }

  export type BalanceHoldAvgAggregateOutputType = {
    amount: number | null
  }

  export type BalanceHoldSumAggregateOutputType = {
    amount: number | null
  }

  export type BalanceHoldMinAggregateOutputType = {
    id: string | null
    userId: string | null
    cryptocurrency: string | null
    amount: number | null
    type: $Enums.HoldType | null
    relatedTransactionId: string | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BalanceHoldMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    cryptocurrency: string | null
    amount: number | null
    type: $Enums.HoldType | null
    relatedTransactionId: string | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BalanceHoldCountAggregateOutputType = {
    id: number
    userId: number
    cryptocurrency: number
    amount: number
    type: number
    relatedTransactionId: number
    expiresAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BalanceHoldAvgAggregateInputType = {
    amount?: true
  }

  export type BalanceHoldSumAggregateInputType = {
    amount?: true
  }

  export type BalanceHoldMinAggregateInputType = {
    id?: true
    userId?: true
    cryptocurrency?: true
    amount?: true
    type?: true
    relatedTransactionId?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BalanceHoldMaxAggregateInputType = {
    id?: true
    userId?: true
    cryptocurrency?: true
    amount?: true
    type?: true
    relatedTransactionId?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BalanceHoldCountAggregateInputType = {
    id?: true
    userId?: true
    cryptocurrency?: true
    amount?: true
    type?: true
    relatedTransactionId?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BalanceHoldAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BalanceHold to aggregate.
     */
    where?: BalanceHoldWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BalanceHolds to fetch.
     */
    orderBy?: BalanceHoldOrderByWithRelationInput | BalanceHoldOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BalanceHoldWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BalanceHolds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BalanceHolds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BalanceHolds
    **/
    _count?: true | BalanceHoldCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BalanceHoldAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BalanceHoldSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BalanceHoldMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BalanceHoldMaxAggregateInputType
  }

  export type GetBalanceHoldAggregateType<T extends BalanceHoldAggregateArgs> = {
        [P in keyof T & keyof AggregateBalanceHold]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBalanceHold[P]>
      : GetScalarType<T[P], AggregateBalanceHold[P]>
  }




  export type BalanceHoldGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BalanceHoldWhereInput
    orderBy?: BalanceHoldOrderByWithAggregationInput | BalanceHoldOrderByWithAggregationInput[]
    by: BalanceHoldScalarFieldEnum[] | BalanceHoldScalarFieldEnum
    having?: BalanceHoldScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BalanceHoldCountAggregateInputType | true
    _avg?: BalanceHoldAvgAggregateInputType
    _sum?: BalanceHoldSumAggregateInputType
    _min?: BalanceHoldMinAggregateInputType
    _max?: BalanceHoldMaxAggregateInputType
  }

  export type BalanceHoldGroupByOutputType = {
    id: string
    userId: string
    cryptocurrency: string
    amount: number
    type: $Enums.HoldType
    relatedTransactionId: string | null
    expiresAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: BalanceHoldCountAggregateOutputType | null
    _avg: BalanceHoldAvgAggregateOutputType | null
    _sum: BalanceHoldSumAggregateOutputType | null
    _min: BalanceHoldMinAggregateOutputType | null
    _max: BalanceHoldMaxAggregateOutputType | null
  }

  type GetBalanceHoldGroupByPayload<T extends BalanceHoldGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BalanceHoldGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BalanceHoldGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BalanceHoldGroupByOutputType[P]>
            : GetScalarType<T[P], BalanceHoldGroupByOutputType[P]>
        }
      >
    >


  export type BalanceHoldSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    cryptocurrency?: boolean
    amount?: boolean
    type?: boolean
    relatedTransactionId?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["balanceHold"]>

  export type BalanceHoldSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    cryptocurrency?: boolean
    amount?: boolean
    type?: boolean
    relatedTransactionId?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["balanceHold"]>

  export type BalanceHoldSelectScalar = {
    id?: boolean
    userId?: boolean
    cryptocurrency?: boolean
    amount?: boolean
    type?: boolean
    relatedTransactionId?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BalanceHoldInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type BalanceHoldIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $BalanceHoldPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BalanceHold"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      cryptocurrency: string
      amount: number
      type: $Enums.HoldType
      relatedTransactionId: string | null
      expiresAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["balanceHold"]>
    composites: {}
  }

  type BalanceHoldGetPayload<S extends boolean | null | undefined | BalanceHoldDefaultArgs> = $Result.GetResult<Prisma.$BalanceHoldPayload, S>

  type BalanceHoldCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<BalanceHoldFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: BalanceHoldCountAggregateInputType | true
    }

  export interface BalanceHoldDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BalanceHold'], meta: { name: 'BalanceHold' } }
    /**
     * Find zero or one BalanceHold that matches the filter.
     * @param {BalanceHoldFindUniqueArgs} args - Arguments to find a BalanceHold
     * @example
     * // Get one BalanceHold
     * const balanceHold = await prisma.balanceHold.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BalanceHoldFindUniqueArgs>(args: SelectSubset<T, BalanceHoldFindUniqueArgs<ExtArgs>>): Prisma__BalanceHoldClient<$Result.GetResult<Prisma.$BalanceHoldPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one BalanceHold that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {BalanceHoldFindUniqueOrThrowArgs} args - Arguments to find a BalanceHold
     * @example
     * // Get one BalanceHold
     * const balanceHold = await prisma.balanceHold.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BalanceHoldFindUniqueOrThrowArgs>(args: SelectSubset<T, BalanceHoldFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BalanceHoldClient<$Result.GetResult<Prisma.$BalanceHoldPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first BalanceHold that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BalanceHoldFindFirstArgs} args - Arguments to find a BalanceHold
     * @example
     * // Get one BalanceHold
     * const balanceHold = await prisma.balanceHold.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BalanceHoldFindFirstArgs>(args?: SelectSubset<T, BalanceHoldFindFirstArgs<ExtArgs>>): Prisma__BalanceHoldClient<$Result.GetResult<Prisma.$BalanceHoldPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first BalanceHold that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BalanceHoldFindFirstOrThrowArgs} args - Arguments to find a BalanceHold
     * @example
     * // Get one BalanceHold
     * const balanceHold = await prisma.balanceHold.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BalanceHoldFindFirstOrThrowArgs>(args?: SelectSubset<T, BalanceHoldFindFirstOrThrowArgs<ExtArgs>>): Prisma__BalanceHoldClient<$Result.GetResult<Prisma.$BalanceHoldPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more BalanceHolds that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BalanceHoldFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BalanceHolds
     * const balanceHolds = await prisma.balanceHold.findMany()
     * 
     * // Get first 10 BalanceHolds
     * const balanceHolds = await prisma.balanceHold.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const balanceHoldWithIdOnly = await prisma.balanceHold.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BalanceHoldFindManyArgs>(args?: SelectSubset<T, BalanceHoldFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BalanceHoldPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a BalanceHold.
     * @param {BalanceHoldCreateArgs} args - Arguments to create a BalanceHold.
     * @example
     * // Create one BalanceHold
     * const BalanceHold = await prisma.balanceHold.create({
     *   data: {
     *     // ... data to create a BalanceHold
     *   }
     * })
     * 
     */
    create<T extends BalanceHoldCreateArgs>(args: SelectSubset<T, BalanceHoldCreateArgs<ExtArgs>>): Prisma__BalanceHoldClient<$Result.GetResult<Prisma.$BalanceHoldPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many BalanceHolds.
     * @param {BalanceHoldCreateManyArgs} args - Arguments to create many BalanceHolds.
     * @example
     * // Create many BalanceHolds
     * const balanceHold = await prisma.balanceHold.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BalanceHoldCreateManyArgs>(args?: SelectSubset<T, BalanceHoldCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BalanceHolds and returns the data saved in the database.
     * @param {BalanceHoldCreateManyAndReturnArgs} args - Arguments to create many BalanceHolds.
     * @example
     * // Create many BalanceHolds
     * const balanceHold = await prisma.balanceHold.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BalanceHolds and only return the `id`
     * const balanceHoldWithIdOnly = await prisma.balanceHold.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BalanceHoldCreateManyAndReturnArgs>(args?: SelectSubset<T, BalanceHoldCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BalanceHoldPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a BalanceHold.
     * @param {BalanceHoldDeleteArgs} args - Arguments to delete one BalanceHold.
     * @example
     * // Delete one BalanceHold
     * const BalanceHold = await prisma.balanceHold.delete({
     *   where: {
     *     // ... filter to delete one BalanceHold
     *   }
     * })
     * 
     */
    delete<T extends BalanceHoldDeleteArgs>(args: SelectSubset<T, BalanceHoldDeleteArgs<ExtArgs>>): Prisma__BalanceHoldClient<$Result.GetResult<Prisma.$BalanceHoldPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one BalanceHold.
     * @param {BalanceHoldUpdateArgs} args - Arguments to update one BalanceHold.
     * @example
     * // Update one BalanceHold
     * const balanceHold = await prisma.balanceHold.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BalanceHoldUpdateArgs>(args: SelectSubset<T, BalanceHoldUpdateArgs<ExtArgs>>): Prisma__BalanceHoldClient<$Result.GetResult<Prisma.$BalanceHoldPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more BalanceHolds.
     * @param {BalanceHoldDeleteManyArgs} args - Arguments to filter BalanceHolds to delete.
     * @example
     * // Delete a few BalanceHolds
     * const { count } = await prisma.balanceHold.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BalanceHoldDeleteManyArgs>(args?: SelectSubset<T, BalanceHoldDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BalanceHolds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BalanceHoldUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BalanceHolds
     * const balanceHold = await prisma.balanceHold.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BalanceHoldUpdateManyArgs>(args: SelectSubset<T, BalanceHoldUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one BalanceHold.
     * @param {BalanceHoldUpsertArgs} args - Arguments to update or create a BalanceHold.
     * @example
     * // Update or create a BalanceHold
     * const balanceHold = await prisma.balanceHold.upsert({
     *   create: {
     *     // ... data to create a BalanceHold
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BalanceHold we want to update
     *   }
     * })
     */
    upsert<T extends BalanceHoldUpsertArgs>(args: SelectSubset<T, BalanceHoldUpsertArgs<ExtArgs>>): Prisma__BalanceHoldClient<$Result.GetResult<Prisma.$BalanceHoldPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of BalanceHolds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BalanceHoldCountArgs} args - Arguments to filter BalanceHolds to count.
     * @example
     * // Count the number of BalanceHolds
     * const count = await prisma.balanceHold.count({
     *   where: {
     *     // ... the filter for the BalanceHolds we want to count
     *   }
     * })
    **/
    count<T extends BalanceHoldCountArgs>(
      args?: Subset<T, BalanceHoldCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BalanceHoldCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BalanceHold.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BalanceHoldAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BalanceHoldAggregateArgs>(args: Subset<T, BalanceHoldAggregateArgs>): Prisma.PrismaPromise<GetBalanceHoldAggregateType<T>>

    /**
     * Group by BalanceHold.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BalanceHoldGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BalanceHoldGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BalanceHoldGroupByArgs['orderBy'] }
        : { orderBy?: BalanceHoldGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BalanceHoldGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBalanceHoldGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BalanceHold model
   */
  readonly fields: BalanceHoldFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BalanceHold.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BalanceHoldClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BalanceHold model
   */ 
  interface BalanceHoldFieldRefs {
    readonly id: FieldRef<"BalanceHold", 'String'>
    readonly userId: FieldRef<"BalanceHold", 'String'>
    readonly cryptocurrency: FieldRef<"BalanceHold", 'String'>
    readonly amount: FieldRef<"BalanceHold", 'Float'>
    readonly type: FieldRef<"BalanceHold", 'HoldType'>
    readonly relatedTransactionId: FieldRef<"BalanceHold", 'String'>
    readonly expiresAt: FieldRef<"BalanceHold", 'DateTime'>
    readonly createdAt: FieldRef<"BalanceHold", 'DateTime'>
    readonly updatedAt: FieldRef<"BalanceHold", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BalanceHold findUnique
   */
  export type BalanceHoldFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BalanceHold
     */
    select?: BalanceHoldSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BalanceHoldInclude<ExtArgs> | null
    /**
     * Filter, which BalanceHold to fetch.
     */
    where: BalanceHoldWhereUniqueInput
  }

  /**
   * BalanceHold findUniqueOrThrow
   */
  export type BalanceHoldFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BalanceHold
     */
    select?: BalanceHoldSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BalanceHoldInclude<ExtArgs> | null
    /**
     * Filter, which BalanceHold to fetch.
     */
    where: BalanceHoldWhereUniqueInput
  }

  /**
   * BalanceHold findFirst
   */
  export type BalanceHoldFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BalanceHold
     */
    select?: BalanceHoldSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BalanceHoldInclude<ExtArgs> | null
    /**
     * Filter, which BalanceHold to fetch.
     */
    where?: BalanceHoldWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BalanceHolds to fetch.
     */
    orderBy?: BalanceHoldOrderByWithRelationInput | BalanceHoldOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BalanceHolds.
     */
    cursor?: BalanceHoldWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BalanceHolds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BalanceHolds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BalanceHolds.
     */
    distinct?: BalanceHoldScalarFieldEnum | BalanceHoldScalarFieldEnum[]
  }

  /**
   * BalanceHold findFirstOrThrow
   */
  export type BalanceHoldFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BalanceHold
     */
    select?: BalanceHoldSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BalanceHoldInclude<ExtArgs> | null
    /**
     * Filter, which BalanceHold to fetch.
     */
    where?: BalanceHoldWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BalanceHolds to fetch.
     */
    orderBy?: BalanceHoldOrderByWithRelationInput | BalanceHoldOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BalanceHolds.
     */
    cursor?: BalanceHoldWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BalanceHolds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BalanceHolds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BalanceHolds.
     */
    distinct?: BalanceHoldScalarFieldEnum | BalanceHoldScalarFieldEnum[]
  }

  /**
   * BalanceHold findMany
   */
  export type BalanceHoldFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BalanceHold
     */
    select?: BalanceHoldSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BalanceHoldInclude<ExtArgs> | null
    /**
     * Filter, which BalanceHolds to fetch.
     */
    where?: BalanceHoldWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BalanceHolds to fetch.
     */
    orderBy?: BalanceHoldOrderByWithRelationInput | BalanceHoldOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BalanceHolds.
     */
    cursor?: BalanceHoldWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BalanceHolds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BalanceHolds.
     */
    skip?: number
    distinct?: BalanceHoldScalarFieldEnum | BalanceHoldScalarFieldEnum[]
  }

  /**
   * BalanceHold create
   */
  export type BalanceHoldCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BalanceHold
     */
    select?: BalanceHoldSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BalanceHoldInclude<ExtArgs> | null
    /**
     * The data needed to create a BalanceHold.
     */
    data: XOR<BalanceHoldCreateInput, BalanceHoldUncheckedCreateInput>
  }

  /**
   * BalanceHold createMany
   */
  export type BalanceHoldCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BalanceHolds.
     */
    data: BalanceHoldCreateManyInput | BalanceHoldCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BalanceHold createManyAndReturn
   */
  export type BalanceHoldCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BalanceHold
     */
    select?: BalanceHoldSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many BalanceHolds.
     */
    data: BalanceHoldCreateManyInput | BalanceHoldCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BalanceHoldIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * BalanceHold update
   */
  export type BalanceHoldUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BalanceHold
     */
    select?: BalanceHoldSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BalanceHoldInclude<ExtArgs> | null
    /**
     * The data needed to update a BalanceHold.
     */
    data: XOR<BalanceHoldUpdateInput, BalanceHoldUncheckedUpdateInput>
    /**
     * Choose, which BalanceHold to update.
     */
    where: BalanceHoldWhereUniqueInput
  }

  /**
   * BalanceHold updateMany
   */
  export type BalanceHoldUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BalanceHolds.
     */
    data: XOR<BalanceHoldUpdateManyMutationInput, BalanceHoldUncheckedUpdateManyInput>
    /**
     * Filter which BalanceHolds to update
     */
    where?: BalanceHoldWhereInput
  }

  /**
   * BalanceHold upsert
   */
  export type BalanceHoldUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BalanceHold
     */
    select?: BalanceHoldSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BalanceHoldInclude<ExtArgs> | null
    /**
     * The filter to search for the BalanceHold to update in case it exists.
     */
    where: BalanceHoldWhereUniqueInput
    /**
     * In case the BalanceHold found by the `where` argument doesn't exist, create a new BalanceHold with this data.
     */
    create: XOR<BalanceHoldCreateInput, BalanceHoldUncheckedCreateInput>
    /**
     * In case the BalanceHold was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BalanceHoldUpdateInput, BalanceHoldUncheckedUpdateInput>
  }

  /**
   * BalanceHold delete
   */
  export type BalanceHoldDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BalanceHold
     */
    select?: BalanceHoldSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BalanceHoldInclude<ExtArgs> | null
    /**
     * Filter which BalanceHold to delete.
     */
    where: BalanceHoldWhereUniqueInput
  }

  /**
   * BalanceHold deleteMany
   */
  export type BalanceHoldDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BalanceHolds to delete
     */
    where?: BalanceHoldWhereInput
  }

  /**
   * BalanceHold without action
   */
  export type BalanceHoldDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BalanceHold
     */
    select?: BalanceHoldSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BalanceHoldInclude<ExtArgs> | null
  }


  /**
   * Model ExchangerSettings
   */

  export type AggregateExchangerSettings = {
    _count: ExchangerSettingsCountAggregateOutputType | null
    _avg: ExchangerSettingsAvgAggregateOutputType | null
    _sum: ExchangerSettingsSumAggregateOutputType | null
    _min: ExchangerSettingsMinAggregateOutputType | null
    _max: ExchangerSettingsMaxAggregateOutputType | null
  }

  export type ExchangerSettingsAvgAggregateOutputType = {
    minimumRating: number | null
  }

  export type ExchangerSettingsSumAggregateOutputType = {
    minimumRating: number | null
  }

  export type ExchangerSettingsMinAggregateOutputType = {
    id: string | null
    userId: string | null
    autoAcceptOffers: boolean | null
    minimumRating: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ExchangerSettingsMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    autoAcceptOffers: boolean | null
    minimumRating: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ExchangerSettingsCountAggregateOutputType = {
    id: number
    userId: number
    autoAcceptOffers: number
    preferredPaymentMethods: number
    workingHours: number
    minimumRating: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ExchangerSettingsAvgAggregateInputType = {
    minimumRating?: true
  }

  export type ExchangerSettingsSumAggregateInputType = {
    minimumRating?: true
  }

  export type ExchangerSettingsMinAggregateInputType = {
    id?: true
    userId?: true
    autoAcceptOffers?: true
    minimumRating?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ExchangerSettingsMaxAggregateInputType = {
    id?: true
    userId?: true
    autoAcceptOffers?: true
    minimumRating?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ExchangerSettingsCountAggregateInputType = {
    id?: true
    userId?: true
    autoAcceptOffers?: true
    preferredPaymentMethods?: true
    workingHours?: true
    minimumRating?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ExchangerSettingsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExchangerSettings to aggregate.
     */
    where?: ExchangerSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExchangerSettings to fetch.
     */
    orderBy?: ExchangerSettingsOrderByWithRelationInput | ExchangerSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExchangerSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExchangerSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExchangerSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ExchangerSettings
    **/
    _count?: true | ExchangerSettingsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ExchangerSettingsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ExchangerSettingsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExchangerSettingsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExchangerSettingsMaxAggregateInputType
  }

  export type GetExchangerSettingsAggregateType<T extends ExchangerSettingsAggregateArgs> = {
        [P in keyof T & keyof AggregateExchangerSettings]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExchangerSettings[P]>
      : GetScalarType<T[P], AggregateExchangerSettings[P]>
  }




  export type ExchangerSettingsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExchangerSettingsWhereInput
    orderBy?: ExchangerSettingsOrderByWithAggregationInput | ExchangerSettingsOrderByWithAggregationInput[]
    by: ExchangerSettingsScalarFieldEnum[] | ExchangerSettingsScalarFieldEnum
    having?: ExchangerSettingsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExchangerSettingsCountAggregateInputType | true
    _avg?: ExchangerSettingsAvgAggregateInputType
    _sum?: ExchangerSettingsSumAggregateInputType
    _min?: ExchangerSettingsMinAggregateInputType
    _max?: ExchangerSettingsMaxAggregateInputType
  }

  export type ExchangerSettingsGroupByOutputType = {
    id: string
    userId: string
    autoAcceptOffers: boolean
    preferredPaymentMethods: $Enums.PaymentMethod[]
    workingHours: JsonValue | null
    minimumRating: number | null
    createdAt: Date
    updatedAt: Date
    _count: ExchangerSettingsCountAggregateOutputType | null
    _avg: ExchangerSettingsAvgAggregateOutputType | null
    _sum: ExchangerSettingsSumAggregateOutputType | null
    _min: ExchangerSettingsMinAggregateOutputType | null
    _max: ExchangerSettingsMaxAggregateOutputType | null
  }

  type GetExchangerSettingsGroupByPayload<T extends ExchangerSettingsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExchangerSettingsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExchangerSettingsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExchangerSettingsGroupByOutputType[P]>
            : GetScalarType<T[P], ExchangerSettingsGroupByOutputType[P]>
        }
      >
    >


  export type ExchangerSettingsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    autoAcceptOffers?: boolean
    preferredPaymentMethods?: boolean
    workingHours?: boolean
    minimumRating?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["exchangerSettings"]>

  export type ExchangerSettingsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    autoAcceptOffers?: boolean
    preferredPaymentMethods?: boolean
    workingHours?: boolean
    minimumRating?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["exchangerSettings"]>

  export type ExchangerSettingsSelectScalar = {
    id?: boolean
    userId?: boolean
    autoAcceptOffers?: boolean
    preferredPaymentMethods?: boolean
    workingHours?: boolean
    minimumRating?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ExchangerSettingsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ExchangerSettingsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ExchangerSettingsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ExchangerSettings"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      autoAcceptOffers: boolean
      preferredPaymentMethods: $Enums.PaymentMethod[]
      workingHours: Prisma.JsonValue | null
      minimumRating: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["exchangerSettings"]>
    composites: {}
  }

  type ExchangerSettingsGetPayload<S extends boolean | null | undefined | ExchangerSettingsDefaultArgs> = $Result.GetResult<Prisma.$ExchangerSettingsPayload, S>

  type ExchangerSettingsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ExchangerSettingsFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ExchangerSettingsCountAggregateInputType | true
    }

  export interface ExchangerSettingsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ExchangerSettings'], meta: { name: 'ExchangerSettings' } }
    /**
     * Find zero or one ExchangerSettings that matches the filter.
     * @param {ExchangerSettingsFindUniqueArgs} args - Arguments to find a ExchangerSettings
     * @example
     * // Get one ExchangerSettings
     * const exchangerSettings = await prisma.exchangerSettings.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExchangerSettingsFindUniqueArgs>(args: SelectSubset<T, ExchangerSettingsFindUniqueArgs<ExtArgs>>): Prisma__ExchangerSettingsClient<$Result.GetResult<Prisma.$ExchangerSettingsPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ExchangerSettings that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ExchangerSettingsFindUniqueOrThrowArgs} args - Arguments to find a ExchangerSettings
     * @example
     * // Get one ExchangerSettings
     * const exchangerSettings = await prisma.exchangerSettings.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExchangerSettingsFindUniqueOrThrowArgs>(args: SelectSubset<T, ExchangerSettingsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ExchangerSettingsClient<$Result.GetResult<Prisma.$ExchangerSettingsPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ExchangerSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExchangerSettingsFindFirstArgs} args - Arguments to find a ExchangerSettings
     * @example
     * // Get one ExchangerSettings
     * const exchangerSettings = await prisma.exchangerSettings.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExchangerSettingsFindFirstArgs>(args?: SelectSubset<T, ExchangerSettingsFindFirstArgs<ExtArgs>>): Prisma__ExchangerSettingsClient<$Result.GetResult<Prisma.$ExchangerSettingsPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ExchangerSettings that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExchangerSettingsFindFirstOrThrowArgs} args - Arguments to find a ExchangerSettings
     * @example
     * // Get one ExchangerSettings
     * const exchangerSettings = await prisma.exchangerSettings.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExchangerSettingsFindFirstOrThrowArgs>(args?: SelectSubset<T, ExchangerSettingsFindFirstOrThrowArgs<ExtArgs>>): Prisma__ExchangerSettingsClient<$Result.GetResult<Prisma.$ExchangerSettingsPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ExchangerSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExchangerSettingsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ExchangerSettings
     * const exchangerSettings = await prisma.exchangerSettings.findMany()
     * 
     * // Get first 10 ExchangerSettings
     * const exchangerSettings = await prisma.exchangerSettings.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const exchangerSettingsWithIdOnly = await prisma.exchangerSettings.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ExchangerSettingsFindManyArgs>(args?: SelectSubset<T, ExchangerSettingsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExchangerSettingsPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ExchangerSettings.
     * @param {ExchangerSettingsCreateArgs} args - Arguments to create a ExchangerSettings.
     * @example
     * // Create one ExchangerSettings
     * const ExchangerSettings = await prisma.exchangerSettings.create({
     *   data: {
     *     // ... data to create a ExchangerSettings
     *   }
     * })
     * 
     */
    create<T extends ExchangerSettingsCreateArgs>(args: SelectSubset<T, ExchangerSettingsCreateArgs<ExtArgs>>): Prisma__ExchangerSettingsClient<$Result.GetResult<Prisma.$ExchangerSettingsPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ExchangerSettings.
     * @param {ExchangerSettingsCreateManyArgs} args - Arguments to create many ExchangerSettings.
     * @example
     * // Create many ExchangerSettings
     * const exchangerSettings = await prisma.exchangerSettings.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ExchangerSettingsCreateManyArgs>(args?: SelectSubset<T, ExchangerSettingsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ExchangerSettings and returns the data saved in the database.
     * @param {ExchangerSettingsCreateManyAndReturnArgs} args - Arguments to create many ExchangerSettings.
     * @example
     * // Create many ExchangerSettings
     * const exchangerSettings = await prisma.exchangerSettings.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ExchangerSettings and only return the `id`
     * const exchangerSettingsWithIdOnly = await prisma.exchangerSettings.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ExchangerSettingsCreateManyAndReturnArgs>(args?: SelectSubset<T, ExchangerSettingsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExchangerSettingsPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ExchangerSettings.
     * @param {ExchangerSettingsDeleteArgs} args - Arguments to delete one ExchangerSettings.
     * @example
     * // Delete one ExchangerSettings
     * const ExchangerSettings = await prisma.exchangerSettings.delete({
     *   where: {
     *     // ... filter to delete one ExchangerSettings
     *   }
     * })
     * 
     */
    delete<T extends ExchangerSettingsDeleteArgs>(args: SelectSubset<T, ExchangerSettingsDeleteArgs<ExtArgs>>): Prisma__ExchangerSettingsClient<$Result.GetResult<Prisma.$ExchangerSettingsPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ExchangerSettings.
     * @param {ExchangerSettingsUpdateArgs} args - Arguments to update one ExchangerSettings.
     * @example
     * // Update one ExchangerSettings
     * const exchangerSettings = await prisma.exchangerSettings.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ExchangerSettingsUpdateArgs>(args: SelectSubset<T, ExchangerSettingsUpdateArgs<ExtArgs>>): Prisma__ExchangerSettingsClient<$Result.GetResult<Prisma.$ExchangerSettingsPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ExchangerSettings.
     * @param {ExchangerSettingsDeleteManyArgs} args - Arguments to filter ExchangerSettings to delete.
     * @example
     * // Delete a few ExchangerSettings
     * const { count } = await prisma.exchangerSettings.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ExchangerSettingsDeleteManyArgs>(args?: SelectSubset<T, ExchangerSettingsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ExchangerSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExchangerSettingsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ExchangerSettings
     * const exchangerSettings = await prisma.exchangerSettings.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ExchangerSettingsUpdateManyArgs>(args: SelectSubset<T, ExchangerSettingsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ExchangerSettings.
     * @param {ExchangerSettingsUpsertArgs} args - Arguments to update or create a ExchangerSettings.
     * @example
     * // Update or create a ExchangerSettings
     * const exchangerSettings = await prisma.exchangerSettings.upsert({
     *   create: {
     *     // ... data to create a ExchangerSettings
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ExchangerSettings we want to update
     *   }
     * })
     */
    upsert<T extends ExchangerSettingsUpsertArgs>(args: SelectSubset<T, ExchangerSettingsUpsertArgs<ExtArgs>>): Prisma__ExchangerSettingsClient<$Result.GetResult<Prisma.$ExchangerSettingsPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ExchangerSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExchangerSettingsCountArgs} args - Arguments to filter ExchangerSettings to count.
     * @example
     * // Count the number of ExchangerSettings
     * const count = await prisma.exchangerSettings.count({
     *   where: {
     *     // ... the filter for the ExchangerSettings we want to count
     *   }
     * })
    **/
    count<T extends ExchangerSettingsCountArgs>(
      args?: Subset<T, ExchangerSettingsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExchangerSettingsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ExchangerSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExchangerSettingsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ExchangerSettingsAggregateArgs>(args: Subset<T, ExchangerSettingsAggregateArgs>): Prisma.PrismaPromise<GetExchangerSettingsAggregateType<T>>

    /**
     * Group by ExchangerSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExchangerSettingsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ExchangerSettingsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExchangerSettingsGroupByArgs['orderBy'] }
        : { orderBy?: ExchangerSettingsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ExchangerSettingsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExchangerSettingsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ExchangerSettings model
   */
  readonly fields: ExchangerSettingsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ExchangerSettings.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExchangerSettingsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ExchangerSettings model
   */ 
  interface ExchangerSettingsFieldRefs {
    readonly id: FieldRef<"ExchangerSettings", 'String'>
    readonly userId: FieldRef<"ExchangerSettings", 'String'>
    readonly autoAcceptOffers: FieldRef<"ExchangerSettings", 'Boolean'>
    readonly preferredPaymentMethods: FieldRef<"ExchangerSettings", 'PaymentMethod[]'>
    readonly workingHours: FieldRef<"ExchangerSettings", 'Json'>
    readonly minimumRating: FieldRef<"ExchangerSettings", 'Float'>
    readonly createdAt: FieldRef<"ExchangerSettings", 'DateTime'>
    readonly updatedAt: FieldRef<"ExchangerSettings", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ExchangerSettings findUnique
   */
  export type ExchangerSettingsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangerSettings
     */
    select?: ExchangerSettingsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangerSettingsInclude<ExtArgs> | null
    /**
     * Filter, which ExchangerSettings to fetch.
     */
    where: ExchangerSettingsWhereUniqueInput
  }

  /**
   * ExchangerSettings findUniqueOrThrow
   */
  export type ExchangerSettingsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangerSettings
     */
    select?: ExchangerSettingsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangerSettingsInclude<ExtArgs> | null
    /**
     * Filter, which ExchangerSettings to fetch.
     */
    where: ExchangerSettingsWhereUniqueInput
  }

  /**
   * ExchangerSettings findFirst
   */
  export type ExchangerSettingsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangerSettings
     */
    select?: ExchangerSettingsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangerSettingsInclude<ExtArgs> | null
    /**
     * Filter, which ExchangerSettings to fetch.
     */
    where?: ExchangerSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExchangerSettings to fetch.
     */
    orderBy?: ExchangerSettingsOrderByWithRelationInput | ExchangerSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExchangerSettings.
     */
    cursor?: ExchangerSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExchangerSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExchangerSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExchangerSettings.
     */
    distinct?: ExchangerSettingsScalarFieldEnum | ExchangerSettingsScalarFieldEnum[]
  }

  /**
   * ExchangerSettings findFirstOrThrow
   */
  export type ExchangerSettingsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangerSettings
     */
    select?: ExchangerSettingsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangerSettingsInclude<ExtArgs> | null
    /**
     * Filter, which ExchangerSettings to fetch.
     */
    where?: ExchangerSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExchangerSettings to fetch.
     */
    orderBy?: ExchangerSettingsOrderByWithRelationInput | ExchangerSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExchangerSettings.
     */
    cursor?: ExchangerSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExchangerSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExchangerSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExchangerSettings.
     */
    distinct?: ExchangerSettingsScalarFieldEnum | ExchangerSettingsScalarFieldEnum[]
  }

  /**
   * ExchangerSettings findMany
   */
  export type ExchangerSettingsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangerSettings
     */
    select?: ExchangerSettingsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangerSettingsInclude<ExtArgs> | null
    /**
     * Filter, which ExchangerSettings to fetch.
     */
    where?: ExchangerSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExchangerSettings to fetch.
     */
    orderBy?: ExchangerSettingsOrderByWithRelationInput | ExchangerSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ExchangerSettings.
     */
    cursor?: ExchangerSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExchangerSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExchangerSettings.
     */
    skip?: number
    distinct?: ExchangerSettingsScalarFieldEnum | ExchangerSettingsScalarFieldEnum[]
  }

  /**
   * ExchangerSettings create
   */
  export type ExchangerSettingsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangerSettings
     */
    select?: ExchangerSettingsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangerSettingsInclude<ExtArgs> | null
    /**
     * The data needed to create a ExchangerSettings.
     */
    data: XOR<ExchangerSettingsCreateInput, ExchangerSettingsUncheckedCreateInput>
  }

  /**
   * ExchangerSettings createMany
   */
  export type ExchangerSettingsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ExchangerSettings.
     */
    data: ExchangerSettingsCreateManyInput | ExchangerSettingsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ExchangerSettings createManyAndReturn
   */
  export type ExchangerSettingsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangerSettings
     */
    select?: ExchangerSettingsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ExchangerSettings.
     */
    data: ExchangerSettingsCreateManyInput | ExchangerSettingsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangerSettingsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ExchangerSettings update
   */
  export type ExchangerSettingsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangerSettings
     */
    select?: ExchangerSettingsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangerSettingsInclude<ExtArgs> | null
    /**
     * The data needed to update a ExchangerSettings.
     */
    data: XOR<ExchangerSettingsUpdateInput, ExchangerSettingsUncheckedUpdateInput>
    /**
     * Choose, which ExchangerSettings to update.
     */
    where: ExchangerSettingsWhereUniqueInput
  }

  /**
   * ExchangerSettings updateMany
   */
  export type ExchangerSettingsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ExchangerSettings.
     */
    data: XOR<ExchangerSettingsUpdateManyMutationInput, ExchangerSettingsUncheckedUpdateManyInput>
    /**
     * Filter which ExchangerSettings to update
     */
    where?: ExchangerSettingsWhereInput
  }

  /**
   * ExchangerSettings upsert
   */
  export type ExchangerSettingsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangerSettings
     */
    select?: ExchangerSettingsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangerSettingsInclude<ExtArgs> | null
    /**
     * The filter to search for the ExchangerSettings to update in case it exists.
     */
    where: ExchangerSettingsWhereUniqueInput
    /**
     * In case the ExchangerSettings found by the `where` argument doesn't exist, create a new ExchangerSettings with this data.
     */
    create: XOR<ExchangerSettingsCreateInput, ExchangerSettingsUncheckedCreateInput>
    /**
     * In case the ExchangerSettings was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExchangerSettingsUpdateInput, ExchangerSettingsUncheckedUpdateInput>
  }

  /**
   * ExchangerSettings delete
   */
  export type ExchangerSettingsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangerSettings
     */
    select?: ExchangerSettingsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangerSettingsInclude<ExtArgs> | null
    /**
     * Filter which ExchangerSettings to delete.
     */
    where: ExchangerSettingsWhereUniqueInput
  }

  /**
   * ExchangerSettings deleteMany
   */
  export type ExchangerSettingsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExchangerSettings to delete
     */
    where?: ExchangerSettingsWhereInput
  }

  /**
   * ExchangerSettings without action
   */
  export type ExchangerSettingsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangerSettings
     */
    select?: ExchangerSettingsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExchangerSettingsInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
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

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ExchangeListingScalarFieldEnum: {
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

  export type ExchangeListingScalarFieldEnum = (typeof ExchangeListingScalarFieldEnum)[keyof typeof ExchangeListingScalarFieldEnum]


  export const ExchangeOfferScalarFieldEnum: {
    id: 'id',
    amount: 'amount',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId',
    listingId: 'listingId'
  };

  export type ExchangeOfferScalarFieldEnum = (typeof ExchangeOfferScalarFieldEnum)[keyof typeof ExchangeOfferScalarFieldEnum]


  export const ExchangeTransactionScalarFieldEnum: {
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

  export type ExchangeTransactionScalarFieldEnum = (typeof ExchangeTransactionScalarFieldEnum)[keyof typeof ExchangeTransactionScalarFieldEnum]


  export const DisputeScalarFieldEnum: {
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

  export type DisputeScalarFieldEnum = (typeof DisputeScalarFieldEnum)[keyof typeof DisputeScalarFieldEnum]


  export const ReviewScalarFieldEnum: {
    id: 'id',
    rating: 'rating',
    comment: 'comment',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    transactionId: 'transactionId',
    authorId: 'authorId',
    targetId: 'targetId'
  };

  export type ReviewScalarFieldEnum = (typeof ReviewScalarFieldEnum)[keyof typeof ReviewScalarFieldEnum]


  export const UserBalanceScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    cryptoBalance: 'cryptoBalance',
    totalHoldAmount: 'totalHoldAmount',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserBalanceScalarFieldEnum = (typeof UserBalanceScalarFieldEnum)[keyof typeof UserBalanceScalarFieldEnum]


  export const BalanceHoldScalarFieldEnum: {
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

  export type BalanceHoldScalarFieldEnum = (typeof BalanceHoldScalarFieldEnum)[keyof typeof BalanceHoldScalarFieldEnum]


  export const ExchangerSettingsScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    autoAcceptOffers: 'autoAcceptOffers',
    preferredPaymentMethods: 'preferredPaymentMethods',
    workingHours: 'workingHours',
    minimumRating: 'minimumRating',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ExchangerSettingsScalarFieldEnum = (typeof ExchangerSettingsScalarFieldEnum)[keyof typeof ExchangerSettingsScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'ExchangeType'
   */
  export type EnumExchangeTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ExchangeType'>
    


  /**
   * Reference to a field of type 'ExchangeType[]'
   */
  export type ListEnumExchangeTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ExchangeType[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'PaymentMethod[]'
   */
  export type ListEnumPaymentMethodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentMethod[]'>
    


  /**
   * Reference to a field of type 'PaymentMethod'
   */
  export type EnumPaymentMethodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentMethod'>
    


  /**
   * Reference to a field of type 'OfferStatus'
   */
  export type EnumOfferStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OfferStatus'>
    


  /**
   * Reference to a field of type 'OfferStatus[]'
   */
  export type ListEnumOfferStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OfferStatus[]'>
    


  /**
   * Reference to a field of type 'TransactionStatus'
   */
  export type EnumTransactionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TransactionStatus'>
    


  /**
   * Reference to a field of type 'TransactionStatus[]'
   */
  export type ListEnumTransactionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TransactionStatus[]'>
    


  /**
   * Reference to a field of type 'DisputeStatus'
   */
  export type EnumDisputeStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DisputeStatus'>
    


  /**
   * Reference to a field of type 'DisputeStatus[]'
   */
  export type ListEnumDisputeStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DisputeStatus[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'HoldType'
   */
  export type EnumHoldTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'HoldType'>
    


  /**
   * Reference to a field of type 'HoldType[]'
   */
  export type ListEnumHoldTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'HoldType[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    isExchangerActive?: BoolFilter<"User"> | boolean
    isFrozen?: BoolFilter<"User"> | boolean
    frozenUntil?: DateTimeNullableFilter<"User"> | Date | string | null
    missedOffersCount?: IntFilter<"User"> | number
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    listings?: ExchangeListingListRelationFilter
    offers?: ExchangeOfferListRelationFilter
    exchangerTransactions?: ExchangeTransactionListRelationFilter
    customerTransactions?: ExchangeTransactionListRelationFilter
    disputesInitiated?: DisputeListRelationFilter
    disputesModerated?: DisputeListRelationFilter
    reviewsWritten?: ReviewListRelationFilter
    reviewsReceived?: ReviewListRelationFilter
    balance?: XOR<UserBalanceNullableRelationFilter, UserBalanceWhereInput> | null
    exchangerSettings?: XOR<ExchangerSettingsNullableRelationFilter, ExchangerSettingsWhereInput> | null
    holds?: BalanceHoldListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    isExchangerActive?: SortOrder
    isFrozen?: SortOrder
    frozenUntil?: SortOrderInput | SortOrder
    missedOffersCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    listings?: ExchangeListingOrderByRelationAggregateInput
    offers?: ExchangeOfferOrderByRelationAggregateInput
    exchangerTransactions?: ExchangeTransactionOrderByRelationAggregateInput
    customerTransactions?: ExchangeTransactionOrderByRelationAggregateInput
    disputesInitiated?: DisputeOrderByRelationAggregateInput
    disputesModerated?: DisputeOrderByRelationAggregateInput
    reviewsWritten?: ReviewOrderByRelationAggregateInput
    reviewsReceived?: ReviewOrderByRelationAggregateInput
    balance?: UserBalanceOrderByWithRelationInput
    exchangerSettings?: ExchangerSettingsOrderByWithRelationInput
    holds?: BalanceHoldOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    isExchangerActive?: BoolFilter<"User"> | boolean
    isFrozen?: BoolFilter<"User"> | boolean
    frozenUntil?: DateTimeNullableFilter<"User"> | Date | string | null
    missedOffersCount?: IntFilter<"User"> | number
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    listings?: ExchangeListingListRelationFilter
    offers?: ExchangeOfferListRelationFilter
    exchangerTransactions?: ExchangeTransactionListRelationFilter
    customerTransactions?: ExchangeTransactionListRelationFilter
    disputesInitiated?: DisputeListRelationFilter
    disputesModerated?: DisputeListRelationFilter
    reviewsWritten?: ReviewListRelationFilter
    reviewsReceived?: ReviewListRelationFilter
    balance?: XOR<UserBalanceNullableRelationFilter, UserBalanceWhereInput> | null
    exchangerSettings?: XOR<ExchangerSettingsNullableRelationFilter, ExchangerSettingsWhereInput> | null
    holds?: BalanceHoldListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    isExchangerActive?: SortOrder
    isFrozen?: SortOrder
    frozenUntil?: SortOrderInput | SortOrder
    missedOffersCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    role?: EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole
    isExchangerActive?: BoolWithAggregatesFilter<"User"> | boolean
    isFrozen?: BoolWithAggregatesFilter<"User"> | boolean
    frozenUntil?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    missedOffersCount?: IntWithAggregatesFilter<"User"> | number
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type ExchangeListingWhereInput = {
    AND?: ExchangeListingWhereInput | ExchangeListingWhereInput[]
    OR?: ExchangeListingWhereInput[]
    NOT?: ExchangeListingWhereInput | ExchangeListingWhereInput[]
    id?: StringFilter<"ExchangeListing"> | string
    type?: EnumExchangeTypeFilter<"ExchangeListing"> | $Enums.ExchangeType
    cryptocurrency?: StringFilter<"ExchangeListing"> | string
    fiatCurrency?: StringFilter<"ExchangeListing"> | string
    rate?: FloatFilter<"ExchangeListing"> | number
    minAmount?: FloatFilter<"ExchangeListing"> | number
    maxAmount?: FloatFilter<"ExchangeListing"> | number
    availableAmount?: FloatFilter<"ExchangeListing"> | number
    paymentMethods?: EnumPaymentMethodNullableListFilter<"ExchangeListing">
    terms?: StringNullableFilter<"ExchangeListing"> | string | null
    isActive?: BoolFilter<"ExchangeListing"> | boolean
    createdAt?: DateTimeFilter<"ExchangeListing"> | Date | string
    updatedAt?: DateTimeFilter<"ExchangeListing"> | Date | string
    userId?: StringFilter<"ExchangeListing"> | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    offers?: ExchangeOfferListRelationFilter
    transactions?: ExchangeTransactionListRelationFilter
  }

  export type ExchangeListingOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    cryptocurrency?: SortOrder
    fiatCurrency?: SortOrder
    rate?: SortOrder
    minAmount?: SortOrder
    maxAmount?: SortOrder
    availableAmount?: SortOrder
    paymentMethods?: SortOrder
    terms?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
    offers?: ExchangeOfferOrderByRelationAggregateInput
    transactions?: ExchangeTransactionOrderByRelationAggregateInput
  }

  export type ExchangeListingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ExchangeListingWhereInput | ExchangeListingWhereInput[]
    OR?: ExchangeListingWhereInput[]
    NOT?: ExchangeListingWhereInput | ExchangeListingWhereInput[]
    type?: EnumExchangeTypeFilter<"ExchangeListing"> | $Enums.ExchangeType
    cryptocurrency?: StringFilter<"ExchangeListing"> | string
    fiatCurrency?: StringFilter<"ExchangeListing"> | string
    rate?: FloatFilter<"ExchangeListing"> | number
    minAmount?: FloatFilter<"ExchangeListing"> | number
    maxAmount?: FloatFilter<"ExchangeListing"> | number
    availableAmount?: FloatFilter<"ExchangeListing"> | number
    paymentMethods?: EnumPaymentMethodNullableListFilter<"ExchangeListing">
    terms?: StringNullableFilter<"ExchangeListing"> | string | null
    isActive?: BoolFilter<"ExchangeListing"> | boolean
    createdAt?: DateTimeFilter<"ExchangeListing"> | Date | string
    updatedAt?: DateTimeFilter<"ExchangeListing"> | Date | string
    userId?: StringFilter<"ExchangeListing"> | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    offers?: ExchangeOfferListRelationFilter
    transactions?: ExchangeTransactionListRelationFilter
  }, "id">

  export type ExchangeListingOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    cryptocurrency?: SortOrder
    fiatCurrency?: SortOrder
    rate?: SortOrder
    minAmount?: SortOrder
    maxAmount?: SortOrder
    availableAmount?: SortOrder
    paymentMethods?: SortOrder
    terms?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    _count?: ExchangeListingCountOrderByAggregateInput
    _avg?: ExchangeListingAvgOrderByAggregateInput
    _max?: ExchangeListingMaxOrderByAggregateInput
    _min?: ExchangeListingMinOrderByAggregateInput
    _sum?: ExchangeListingSumOrderByAggregateInput
  }

  export type ExchangeListingScalarWhereWithAggregatesInput = {
    AND?: ExchangeListingScalarWhereWithAggregatesInput | ExchangeListingScalarWhereWithAggregatesInput[]
    OR?: ExchangeListingScalarWhereWithAggregatesInput[]
    NOT?: ExchangeListingScalarWhereWithAggregatesInput | ExchangeListingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ExchangeListing"> | string
    type?: EnumExchangeTypeWithAggregatesFilter<"ExchangeListing"> | $Enums.ExchangeType
    cryptocurrency?: StringWithAggregatesFilter<"ExchangeListing"> | string
    fiatCurrency?: StringWithAggregatesFilter<"ExchangeListing"> | string
    rate?: FloatWithAggregatesFilter<"ExchangeListing"> | number
    minAmount?: FloatWithAggregatesFilter<"ExchangeListing"> | number
    maxAmount?: FloatWithAggregatesFilter<"ExchangeListing"> | number
    availableAmount?: FloatWithAggregatesFilter<"ExchangeListing"> | number
    paymentMethods?: EnumPaymentMethodNullableListFilter<"ExchangeListing">
    terms?: StringNullableWithAggregatesFilter<"ExchangeListing"> | string | null
    isActive?: BoolWithAggregatesFilter<"ExchangeListing"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"ExchangeListing"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ExchangeListing"> | Date | string
    userId?: StringWithAggregatesFilter<"ExchangeListing"> | string
  }

  export type ExchangeOfferWhereInput = {
    AND?: ExchangeOfferWhereInput | ExchangeOfferWhereInput[]
    OR?: ExchangeOfferWhereInput[]
    NOT?: ExchangeOfferWhereInput | ExchangeOfferWhereInput[]
    id?: StringFilter<"ExchangeOffer"> | string
    amount?: FloatFilter<"ExchangeOffer"> | number
    status?: EnumOfferStatusFilter<"ExchangeOffer"> | $Enums.OfferStatus
    createdAt?: DateTimeFilter<"ExchangeOffer"> | Date | string
    updatedAt?: DateTimeFilter<"ExchangeOffer"> | Date | string
    userId?: StringFilter<"ExchangeOffer"> | string
    listingId?: StringFilter<"ExchangeOffer"> | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    listing?: XOR<ExchangeListingRelationFilter, ExchangeListingWhereInput>
    transaction?: XOR<ExchangeTransactionNullableRelationFilter, ExchangeTransactionWhereInput> | null
  }

  export type ExchangeOfferOrderByWithRelationInput = {
    id?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    listingId?: SortOrder
    user?: UserOrderByWithRelationInput
    listing?: ExchangeListingOrderByWithRelationInput
    transaction?: ExchangeTransactionOrderByWithRelationInput
  }

  export type ExchangeOfferWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ExchangeOfferWhereInput | ExchangeOfferWhereInput[]
    OR?: ExchangeOfferWhereInput[]
    NOT?: ExchangeOfferWhereInput | ExchangeOfferWhereInput[]
    amount?: FloatFilter<"ExchangeOffer"> | number
    status?: EnumOfferStatusFilter<"ExchangeOffer"> | $Enums.OfferStatus
    createdAt?: DateTimeFilter<"ExchangeOffer"> | Date | string
    updatedAt?: DateTimeFilter<"ExchangeOffer"> | Date | string
    userId?: StringFilter<"ExchangeOffer"> | string
    listingId?: StringFilter<"ExchangeOffer"> | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    listing?: XOR<ExchangeListingRelationFilter, ExchangeListingWhereInput>
    transaction?: XOR<ExchangeTransactionNullableRelationFilter, ExchangeTransactionWhereInput> | null
  }, "id">

  export type ExchangeOfferOrderByWithAggregationInput = {
    id?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    listingId?: SortOrder
    _count?: ExchangeOfferCountOrderByAggregateInput
    _avg?: ExchangeOfferAvgOrderByAggregateInput
    _max?: ExchangeOfferMaxOrderByAggregateInput
    _min?: ExchangeOfferMinOrderByAggregateInput
    _sum?: ExchangeOfferSumOrderByAggregateInput
  }

  export type ExchangeOfferScalarWhereWithAggregatesInput = {
    AND?: ExchangeOfferScalarWhereWithAggregatesInput | ExchangeOfferScalarWhereWithAggregatesInput[]
    OR?: ExchangeOfferScalarWhereWithAggregatesInput[]
    NOT?: ExchangeOfferScalarWhereWithAggregatesInput | ExchangeOfferScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ExchangeOffer"> | string
    amount?: FloatWithAggregatesFilter<"ExchangeOffer"> | number
    status?: EnumOfferStatusWithAggregatesFilter<"ExchangeOffer"> | $Enums.OfferStatus
    createdAt?: DateTimeWithAggregatesFilter<"ExchangeOffer"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ExchangeOffer"> | Date | string
    userId?: StringWithAggregatesFilter<"ExchangeOffer"> | string
    listingId?: StringWithAggregatesFilter<"ExchangeOffer"> | string
  }

  export type ExchangeTransactionWhereInput = {
    AND?: ExchangeTransactionWhereInput | ExchangeTransactionWhereInput[]
    OR?: ExchangeTransactionWhereInput[]
    NOT?: ExchangeTransactionWhereInput | ExchangeTransactionWhereInput[]
    id?: StringFilter<"ExchangeTransaction"> | string
    type?: EnumExchangeTypeFilter<"ExchangeTransaction"> | $Enums.ExchangeType
    status?: EnumTransactionStatusFilter<"ExchangeTransaction"> | $Enums.TransactionStatus
    cryptocurrency?: StringFilter<"ExchangeTransaction"> | string
    fiatCurrency?: StringFilter<"ExchangeTransaction"> | string
    cryptoAmount?: FloatFilter<"ExchangeTransaction"> | number
    fiatAmount?: FloatFilter<"ExchangeTransaction"> | number
    paymentProof?: StringNullableFilter<"ExchangeTransaction"> | string | null
    disputeId?: StringNullableFilter<"ExchangeTransaction"> | string | null
    confirmationDeadline?: DateTimeFilter<"ExchangeTransaction"> | Date | string
    canCustomerDispute?: BoolFilter<"ExchangeTransaction"> | boolean
    canExchangerDispute?: BoolFilter<"ExchangeTransaction"> | boolean
    isActive?: BoolFilter<"ExchangeTransaction"> | boolean
    createdAt?: DateTimeFilter<"ExchangeTransaction"> | Date | string
    updatedAt?: DateTimeFilter<"ExchangeTransaction"> | Date | string
    finishedAt?: DateTimeNullableFilter<"ExchangeTransaction"> | Date | string | null
    offerId?: StringNullableFilter<"ExchangeTransaction"> | string | null
    customerId?: StringFilter<"ExchangeTransaction"> | string
    exchangerId?: StringFilter<"ExchangeTransaction"> | string
    listingId?: StringFilter<"ExchangeTransaction"> | string
    offer?: XOR<ExchangeOfferNullableRelationFilter, ExchangeOfferWhereInput> | null
    customer?: XOR<UserRelationFilter, UserWhereInput>
    exchanger?: XOR<UserRelationFilter, UserWhereInput>
    listing?: XOR<ExchangeListingRelationFilter, ExchangeListingWhereInput>
    dispute?: XOR<DisputeNullableRelationFilter, DisputeWhereInput> | null
    review?: XOR<ReviewNullableRelationFilter, ReviewWhereInput> | null
  }

  export type ExchangeTransactionOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    status?: SortOrder
    cryptocurrency?: SortOrder
    fiatCurrency?: SortOrder
    cryptoAmount?: SortOrder
    fiatAmount?: SortOrder
    paymentProof?: SortOrderInput | SortOrder
    disputeId?: SortOrderInput | SortOrder
    confirmationDeadline?: SortOrder
    canCustomerDispute?: SortOrder
    canExchangerDispute?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    finishedAt?: SortOrderInput | SortOrder
    offerId?: SortOrderInput | SortOrder
    customerId?: SortOrder
    exchangerId?: SortOrder
    listingId?: SortOrder
    offer?: ExchangeOfferOrderByWithRelationInput
    customer?: UserOrderByWithRelationInput
    exchanger?: UserOrderByWithRelationInput
    listing?: ExchangeListingOrderByWithRelationInput
    dispute?: DisputeOrderByWithRelationInput
    review?: ReviewOrderByWithRelationInput
  }

  export type ExchangeTransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    offerId?: string
    AND?: ExchangeTransactionWhereInput | ExchangeTransactionWhereInput[]
    OR?: ExchangeTransactionWhereInput[]
    NOT?: ExchangeTransactionWhereInput | ExchangeTransactionWhereInput[]
    type?: EnumExchangeTypeFilter<"ExchangeTransaction"> | $Enums.ExchangeType
    status?: EnumTransactionStatusFilter<"ExchangeTransaction"> | $Enums.TransactionStatus
    cryptocurrency?: StringFilter<"ExchangeTransaction"> | string
    fiatCurrency?: StringFilter<"ExchangeTransaction"> | string
    cryptoAmount?: FloatFilter<"ExchangeTransaction"> | number
    fiatAmount?: FloatFilter<"ExchangeTransaction"> | number
    paymentProof?: StringNullableFilter<"ExchangeTransaction"> | string | null
    disputeId?: StringNullableFilter<"ExchangeTransaction"> | string | null
    confirmationDeadline?: DateTimeFilter<"ExchangeTransaction"> | Date | string
    canCustomerDispute?: BoolFilter<"ExchangeTransaction"> | boolean
    canExchangerDispute?: BoolFilter<"ExchangeTransaction"> | boolean
    isActive?: BoolFilter<"ExchangeTransaction"> | boolean
    createdAt?: DateTimeFilter<"ExchangeTransaction"> | Date | string
    updatedAt?: DateTimeFilter<"ExchangeTransaction"> | Date | string
    finishedAt?: DateTimeNullableFilter<"ExchangeTransaction"> | Date | string | null
    customerId?: StringFilter<"ExchangeTransaction"> | string
    exchangerId?: StringFilter<"ExchangeTransaction"> | string
    listingId?: StringFilter<"ExchangeTransaction"> | string
    offer?: XOR<ExchangeOfferNullableRelationFilter, ExchangeOfferWhereInput> | null
    customer?: XOR<UserRelationFilter, UserWhereInput>
    exchanger?: XOR<UserRelationFilter, UserWhereInput>
    listing?: XOR<ExchangeListingRelationFilter, ExchangeListingWhereInput>
    dispute?: XOR<DisputeNullableRelationFilter, DisputeWhereInput> | null
    review?: XOR<ReviewNullableRelationFilter, ReviewWhereInput> | null
  }, "id" | "offerId">

  export type ExchangeTransactionOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    status?: SortOrder
    cryptocurrency?: SortOrder
    fiatCurrency?: SortOrder
    cryptoAmount?: SortOrder
    fiatAmount?: SortOrder
    paymentProof?: SortOrderInput | SortOrder
    disputeId?: SortOrderInput | SortOrder
    confirmationDeadline?: SortOrder
    canCustomerDispute?: SortOrder
    canExchangerDispute?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    finishedAt?: SortOrderInput | SortOrder
    offerId?: SortOrderInput | SortOrder
    customerId?: SortOrder
    exchangerId?: SortOrder
    listingId?: SortOrder
    _count?: ExchangeTransactionCountOrderByAggregateInput
    _avg?: ExchangeTransactionAvgOrderByAggregateInput
    _max?: ExchangeTransactionMaxOrderByAggregateInput
    _min?: ExchangeTransactionMinOrderByAggregateInput
    _sum?: ExchangeTransactionSumOrderByAggregateInput
  }

  export type ExchangeTransactionScalarWhereWithAggregatesInput = {
    AND?: ExchangeTransactionScalarWhereWithAggregatesInput | ExchangeTransactionScalarWhereWithAggregatesInput[]
    OR?: ExchangeTransactionScalarWhereWithAggregatesInput[]
    NOT?: ExchangeTransactionScalarWhereWithAggregatesInput | ExchangeTransactionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ExchangeTransaction"> | string
    type?: EnumExchangeTypeWithAggregatesFilter<"ExchangeTransaction"> | $Enums.ExchangeType
    status?: EnumTransactionStatusWithAggregatesFilter<"ExchangeTransaction"> | $Enums.TransactionStatus
    cryptocurrency?: StringWithAggregatesFilter<"ExchangeTransaction"> | string
    fiatCurrency?: StringWithAggregatesFilter<"ExchangeTransaction"> | string
    cryptoAmount?: FloatWithAggregatesFilter<"ExchangeTransaction"> | number
    fiatAmount?: FloatWithAggregatesFilter<"ExchangeTransaction"> | number
    paymentProof?: StringNullableWithAggregatesFilter<"ExchangeTransaction"> | string | null
    disputeId?: StringNullableWithAggregatesFilter<"ExchangeTransaction"> | string | null
    confirmationDeadline?: DateTimeWithAggregatesFilter<"ExchangeTransaction"> | Date | string
    canCustomerDispute?: BoolWithAggregatesFilter<"ExchangeTransaction"> | boolean
    canExchangerDispute?: BoolWithAggregatesFilter<"ExchangeTransaction"> | boolean
    isActive?: BoolWithAggregatesFilter<"ExchangeTransaction"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"ExchangeTransaction"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ExchangeTransaction"> | Date | string
    finishedAt?: DateTimeNullableWithAggregatesFilter<"ExchangeTransaction"> | Date | string | null
    offerId?: StringNullableWithAggregatesFilter<"ExchangeTransaction"> | string | null
    customerId?: StringWithAggregatesFilter<"ExchangeTransaction"> | string
    exchangerId?: StringWithAggregatesFilter<"ExchangeTransaction"> | string
    listingId?: StringWithAggregatesFilter<"ExchangeTransaction"> | string
  }

  export type DisputeWhereInput = {
    AND?: DisputeWhereInput | DisputeWhereInput[]
    OR?: DisputeWhereInput[]
    NOT?: DisputeWhereInput | DisputeWhereInput[]
    id?: StringFilter<"Dispute"> | string
    reason?: StringFilter<"Dispute"> | string
    status?: EnumDisputeStatusFilter<"Dispute"> | $Enums.DisputeStatus
    resolution?: StringNullableFilter<"Dispute"> | string | null
    resolvedAt?: DateTimeNullableFilter<"Dispute"> | Date | string | null
    createdAt?: DateTimeFilter<"Dispute"> | Date | string
    updatedAt?: DateTimeFilter<"Dispute"> | Date | string
    transactionId?: StringFilter<"Dispute"> | string
    initiatorId?: StringFilter<"Dispute"> | string
    moderatorId?: StringNullableFilter<"Dispute"> | string | null
    transaction?: XOR<ExchangeTransactionRelationFilter, ExchangeTransactionWhereInput>
    initiator?: XOR<UserRelationFilter, UserWhereInput>
    moderator?: XOR<UserNullableRelationFilter, UserWhereInput> | null
  }

  export type DisputeOrderByWithRelationInput = {
    id?: SortOrder
    reason?: SortOrder
    status?: SortOrder
    resolution?: SortOrderInput | SortOrder
    resolvedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    transactionId?: SortOrder
    initiatorId?: SortOrder
    moderatorId?: SortOrderInput | SortOrder
    transaction?: ExchangeTransactionOrderByWithRelationInput
    initiator?: UserOrderByWithRelationInput
    moderator?: UserOrderByWithRelationInput
  }

  export type DisputeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    transactionId?: string
    AND?: DisputeWhereInput | DisputeWhereInput[]
    OR?: DisputeWhereInput[]
    NOT?: DisputeWhereInput | DisputeWhereInput[]
    reason?: StringFilter<"Dispute"> | string
    status?: EnumDisputeStatusFilter<"Dispute"> | $Enums.DisputeStatus
    resolution?: StringNullableFilter<"Dispute"> | string | null
    resolvedAt?: DateTimeNullableFilter<"Dispute"> | Date | string | null
    createdAt?: DateTimeFilter<"Dispute"> | Date | string
    updatedAt?: DateTimeFilter<"Dispute"> | Date | string
    initiatorId?: StringFilter<"Dispute"> | string
    moderatorId?: StringNullableFilter<"Dispute"> | string | null
    transaction?: XOR<ExchangeTransactionRelationFilter, ExchangeTransactionWhereInput>
    initiator?: XOR<UserRelationFilter, UserWhereInput>
    moderator?: XOR<UserNullableRelationFilter, UserWhereInput> | null
  }, "id" | "transactionId">

  export type DisputeOrderByWithAggregationInput = {
    id?: SortOrder
    reason?: SortOrder
    status?: SortOrder
    resolution?: SortOrderInput | SortOrder
    resolvedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    transactionId?: SortOrder
    initiatorId?: SortOrder
    moderatorId?: SortOrderInput | SortOrder
    _count?: DisputeCountOrderByAggregateInput
    _max?: DisputeMaxOrderByAggregateInput
    _min?: DisputeMinOrderByAggregateInput
  }

  export type DisputeScalarWhereWithAggregatesInput = {
    AND?: DisputeScalarWhereWithAggregatesInput | DisputeScalarWhereWithAggregatesInput[]
    OR?: DisputeScalarWhereWithAggregatesInput[]
    NOT?: DisputeScalarWhereWithAggregatesInput | DisputeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Dispute"> | string
    reason?: StringWithAggregatesFilter<"Dispute"> | string
    status?: EnumDisputeStatusWithAggregatesFilter<"Dispute"> | $Enums.DisputeStatus
    resolution?: StringNullableWithAggregatesFilter<"Dispute"> | string | null
    resolvedAt?: DateTimeNullableWithAggregatesFilter<"Dispute"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Dispute"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Dispute"> | Date | string
    transactionId?: StringWithAggregatesFilter<"Dispute"> | string
    initiatorId?: StringWithAggregatesFilter<"Dispute"> | string
    moderatorId?: StringNullableWithAggregatesFilter<"Dispute"> | string | null
  }

  export type ReviewWhereInput = {
    AND?: ReviewWhereInput | ReviewWhereInput[]
    OR?: ReviewWhereInput[]
    NOT?: ReviewWhereInput | ReviewWhereInput[]
    id?: StringFilter<"Review"> | string
    rating?: IntFilter<"Review"> | number
    comment?: StringNullableFilter<"Review"> | string | null
    createdAt?: DateTimeFilter<"Review"> | Date | string
    updatedAt?: DateTimeFilter<"Review"> | Date | string
    transactionId?: StringFilter<"Review"> | string
    authorId?: StringFilter<"Review"> | string
    targetId?: StringFilter<"Review"> | string
    transaction?: XOR<ExchangeTransactionRelationFilter, ExchangeTransactionWhereInput>
    author?: XOR<UserRelationFilter, UserWhereInput>
    target?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type ReviewOrderByWithRelationInput = {
    id?: SortOrder
    rating?: SortOrder
    comment?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    transactionId?: SortOrder
    authorId?: SortOrder
    targetId?: SortOrder
    transaction?: ExchangeTransactionOrderByWithRelationInput
    author?: UserOrderByWithRelationInput
    target?: UserOrderByWithRelationInput
  }

  export type ReviewWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    transactionId?: string
    AND?: ReviewWhereInput | ReviewWhereInput[]
    OR?: ReviewWhereInput[]
    NOT?: ReviewWhereInput | ReviewWhereInput[]
    rating?: IntFilter<"Review"> | number
    comment?: StringNullableFilter<"Review"> | string | null
    createdAt?: DateTimeFilter<"Review"> | Date | string
    updatedAt?: DateTimeFilter<"Review"> | Date | string
    authorId?: StringFilter<"Review"> | string
    targetId?: StringFilter<"Review"> | string
    transaction?: XOR<ExchangeTransactionRelationFilter, ExchangeTransactionWhereInput>
    author?: XOR<UserRelationFilter, UserWhereInput>
    target?: XOR<UserRelationFilter, UserWhereInput>
  }, "id" | "transactionId">

  export type ReviewOrderByWithAggregationInput = {
    id?: SortOrder
    rating?: SortOrder
    comment?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    transactionId?: SortOrder
    authorId?: SortOrder
    targetId?: SortOrder
    _count?: ReviewCountOrderByAggregateInput
    _avg?: ReviewAvgOrderByAggregateInput
    _max?: ReviewMaxOrderByAggregateInput
    _min?: ReviewMinOrderByAggregateInput
    _sum?: ReviewSumOrderByAggregateInput
  }

  export type ReviewScalarWhereWithAggregatesInput = {
    AND?: ReviewScalarWhereWithAggregatesInput | ReviewScalarWhereWithAggregatesInput[]
    OR?: ReviewScalarWhereWithAggregatesInput[]
    NOT?: ReviewScalarWhereWithAggregatesInput | ReviewScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Review"> | string
    rating?: IntWithAggregatesFilter<"Review"> | number
    comment?: StringNullableWithAggregatesFilter<"Review"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Review"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Review"> | Date | string
    transactionId?: StringWithAggregatesFilter<"Review"> | string
    authorId?: StringWithAggregatesFilter<"Review"> | string
    targetId?: StringWithAggregatesFilter<"Review"> | string
  }

  export type UserBalanceWhereInput = {
    AND?: UserBalanceWhereInput | UserBalanceWhereInput[]
    OR?: UserBalanceWhereInput[]
    NOT?: UserBalanceWhereInput | UserBalanceWhereInput[]
    id?: StringFilter<"UserBalance"> | string
    userId?: StringFilter<"UserBalance"> | string
    cryptoBalance?: JsonFilter<"UserBalance">
    totalHoldAmount?: JsonFilter<"UserBalance">
    createdAt?: DateTimeFilter<"UserBalance"> | Date | string
    updatedAt?: DateTimeFilter<"UserBalance"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type UserBalanceOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    cryptoBalance?: SortOrder
    totalHoldAmount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type UserBalanceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: UserBalanceWhereInput | UserBalanceWhereInput[]
    OR?: UserBalanceWhereInput[]
    NOT?: UserBalanceWhereInput | UserBalanceWhereInput[]
    cryptoBalance?: JsonFilter<"UserBalance">
    totalHoldAmount?: JsonFilter<"UserBalance">
    createdAt?: DateTimeFilter<"UserBalance"> | Date | string
    updatedAt?: DateTimeFilter<"UserBalance"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id" | "userId">

  export type UserBalanceOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    cryptoBalance?: SortOrder
    totalHoldAmount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserBalanceCountOrderByAggregateInput
    _max?: UserBalanceMaxOrderByAggregateInput
    _min?: UserBalanceMinOrderByAggregateInput
  }

  export type UserBalanceScalarWhereWithAggregatesInput = {
    AND?: UserBalanceScalarWhereWithAggregatesInput | UserBalanceScalarWhereWithAggregatesInput[]
    OR?: UserBalanceScalarWhereWithAggregatesInput[]
    NOT?: UserBalanceScalarWhereWithAggregatesInput | UserBalanceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserBalance"> | string
    userId?: StringWithAggregatesFilter<"UserBalance"> | string
    cryptoBalance?: JsonWithAggregatesFilter<"UserBalance">
    totalHoldAmount?: JsonWithAggregatesFilter<"UserBalance">
    createdAt?: DateTimeWithAggregatesFilter<"UserBalance"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"UserBalance"> | Date | string
  }

  export type BalanceHoldWhereInput = {
    AND?: BalanceHoldWhereInput | BalanceHoldWhereInput[]
    OR?: BalanceHoldWhereInput[]
    NOT?: BalanceHoldWhereInput | BalanceHoldWhereInput[]
    id?: StringFilter<"BalanceHold"> | string
    userId?: StringFilter<"BalanceHold"> | string
    cryptocurrency?: StringFilter<"BalanceHold"> | string
    amount?: FloatFilter<"BalanceHold"> | number
    type?: EnumHoldTypeFilter<"BalanceHold"> | $Enums.HoldType
    relatedTransactionId?: StringNullableFilter<"BalanceHold"> | string | null
    expiresAt?: DateTimeNullableFilter<"BalanceHold"> | Date | string | null
    createdAt?: DateTimeFilter<"BalanceHold"> | Date | string
    updatedAt?: DateTimeFilter<"BalanceHold"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type BalanceHoldOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    cryptocurrency?: SortOrder
    amount?: SortOrder
    type?: SortOrder
    relatedTransactionId?: SortOrderInput | SortOrder
    expiresAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type BalanceHoldWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BalanceHoldWhereInput | BalanceHoldWhereInput[]
    OR?: BalanceHoldWhereInput[]
    NOT?: BalanceHoldWhereInput | BalanceHoldWhereInput[]
    userId?: StringFilter<"BalanceHold"> | string
    cryptocurrency?: StringFilter<"BalanceHold"> | string
    amount?: FloatFilter<"BalanceHold"> | number
    type?: EnumHoldTypeFilter<"BalanceHold"> | $Enums.HoldType
    relatedTransactionId?: StringNullableFilter<"BalanceHold"> | string | null
    expiresAt?: DateTimeNullableFilter<"BalanceHold"> | Date | string | null
    createdAt?: DateTimeFilter<"BalanceHold"> | Date | string
    updatedAt?: DateTimeFilter<"BalanceHold"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type BalanceHoldOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    cryptocurrency?: SortOrder
    amount?: SortOrder
    type?: SortOrder
    relatedTransactionId?: SortOrderInput | SortOrder
    expiresAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BalanceHoldCountOrderByAggregateInput
    _avg?: BalanceHoldAvgOrderByAggregateInput
    _max?: BalanceHoldMaxOrderByAggregateInput
    _min?: BalanceHoldMinOrderByAggregateInput
    _sum?: BalanceHoldSumOrderByAggregateInput
  }

  export type BalanceHoldScalarWhereWithAggregatesInput = {
    AND?: BalanceHoldScalarWhereWithAggregatesInput | BalanceHoldScalarWhereWithAggregatesInput[]
    OR?: BalanceHoldScalarWhereWithAggregatesInput[]
    NOT?: BalanceHoldScalarWhereWithAggregatesInput | BalanceHoldScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BalanceHold"> | string
    userId?: StringWithAggregatesFilter<"BalanceHold"> | string
    cryptocurrency?: StringWithAggregatesFilter<"BalanceHold"> | string
    amount?: FloatWithAggregatesFilter<"BalanceHold"> | number
    type?: EnumHoldTypeWithAggregatesFilter<"BalanceHold"> | $Enums.HoldType
    relatedTransactionId?: StringNullableWithAggregatesFilter<"BalanceHold"> | string | null
    expiresAt?: DateTimeNullableWithAggregatesFilter<"BalanceHold"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"BalanceHold"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"BalanceHold"> | Date | string
  }

  export type ExchangerSettingsWhereInput = {
    AND?: ExchangerSettingsWhereInput | ExchangerSettingsWhereInput[]
    OR?: ExchangerSettingsWhereInput[]
    NOT?: ExchangerSettingsWhereInput | ExchangerSettingsWhereInput[]
    id?: StringFilter<"ExchangerSettings"> | string
    userId?: StringFilter<"ExchangerSettings"> | string
    autoAcceptOffers?: BoolFilter<"ExchangerSettings"> | boolean
    preferredPaymentMethods?: EnumPaymentMethodNullableListFilter<"ExchangerSettings">
    workingHours?: JsonNullableFilter<"ExchangerSettings">
    minimumRating?: FloatNullableFilter<"ExchangerSettings"> | number | null
    createdAt?: DateTimeFilter<"ExchangerSettings"> | Date | string
    updatedAt?: DateTimeFilter<"ExchangerSettings"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type ExchangerSettingsOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    autoAcceptOffers?: SortOrder
    preferredPaymentMethods?: SortOrder
    workingHours?: SortOrderInput | SortOrder
    minimumRating?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type ExchangerSettingsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: ExchangerSettingsWhereInput | ExchangerSettingsWhereInput[]
    OR?: ExchangerSettingsWhereInput[]
    NOT?: ExchangerSettingsWhereInput | ExchangerSettingsWhereInput[]
    autoAcceptOffers?: BoolFilter<"ExchangerSettings"> | boolean
    preferredPaymentMethods?: EnumPaymentMethodNullableListFilter<"ExchangerSettings">
    workingHours?: JsonNullableFilter<"ExchangerSettings">
    minimumRating?: FloatNullableFilter<"ExchangerSettings"> | number | null
    createdAt?: DateTimeFilter<"ExchangerSettings"> | Date | string
    updatedAt?: DateTimeFilter<"ExchangerSettings"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id" | "userId">

  export type ExchangerSettingsOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    autoAcceptOffers?: SortOrder
    preferredPaymentMethods?: SortOrder
    workingHours?: SortOrderInput | SortOrder
    minimumRating?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ExchangerSettingsCountOrderByAggregateInput
    _avg?: ExchangerSettingsAvgOrderByAggregateInput
    _max?: ExchangerSettingsMaxOrderByAggregateInput
    _min?: ExchangerSettingsMinOrderByAggregateInput
    _sum?: ExchangerSettingsSumOrderByAggregateInput
  }

  export type ExchangerSettingsScalarWhereWithAggregatesInput = {
    AND?: ExchangerSettingsScalarWhereWithAggregatesInput | ExchangerSettingsScalarWhereWithAggregatesInput[]
    OR?: ExchangerSettingsScalarWhereWithAggregatesInput[]
    NOT?: ExchangerSettingsScalarWhereWithAggregatesInput | ExchangerSettingsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ExchangerSettings"> | string
    userId?: StringWithAggregatesFilter<"ExchangerSettings"> | string
    autoAcceptOffers?: BoolWithAggregatesFilter<"ExchangerSettings"> | boolean
    preferredPaymentMethods?: EnumPaymentMethodNullableListFilter<"ExchangerSettings">
    workingHours?: JsonNullableWithAggregatesFilter<"ExchangerSettings">
    minimumRating?: FloatNullableWithAggregatesFilter<"ExchangerSettings"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"ExchangerSettings"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ExchangerSettings"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    password: string
    role?: $Enums.UserRole
    isExchangerActive?: boolean
    isFrozen?: boolean
    frozenUntil?: Date | string | null
    missedOffersCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    listings?: ExchangeListingCreateNestedManyWithoutUserInput
    offers?: ExchangeOfferCreateNestedManyWithoutUserInput
    exchangerTransactions?: ExchangeTransactionCreateNestedManyWithoutExchangerInput
    customerTransactions?: ExchangeTransactionCreateNestedManyWithoutCustomerInput
    disputesInitiated?: DisputeCreateNestedManyWithoutInitiatorInput
    disputesModerated?: DisputeCreateNestedManyWithoutModeratorInput
    reviewsWritten?: ReviewCreateNestedManyWithoutAuthorInput
    reviewsReceived?: ReviewCreateNestedManyWithoutTargetInput
    balance?: UserBalanceCreateNestedOneWithoutUserInput
    exchangerSettings?: ExchangerSettingsCreateNestedOneWithoutUserInput
    holds?: BalanceHoldCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    password: string
    role?: $Enums.UserRole
    isExchangerActive?: boolean
    isFrozen?: boolean
    frozenUntil?: Date | string | null
    missedOffersCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    listings?: ExchangeListingUncheckedCreateNestedManyWithoutUserInput
    offers?: ExchangeOfferUncheckedCreateNestedManyWithoutUserInput
    exchangerTransactions?: ExchangeTransactionUncheckedCreateNestedManyWithoutExchangerInput
    customerTransactions?: ExchangeTransactionUncheckedCreateNestedManyWithoutCustomerInput
    disputesInitiated?: DisputeUncheckedCreateNestedManyWithoutInitiatorInput
    disputesModerated?: DisputeUncheckedCreateNestedManyWithoutModeratorInput
    reviewsWritten?: ReviewUncheckedCreateNestedManyWithoutAuthorInput
    reviewsReceived?: ReviewUncheckedCreateNestedManyWithoutTargetInput
    balance?: UserBalanceUncheckedCreateNestedOneWithoutUserInput
    exchangerSettings?: ExchangerSettingsUncheckedCreateNestedOneWithoutUserInput
    holds?: BalanceHoldUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isExchangerActive?: BoolFieldUpdateOperationsInput | boolean
    isFrozen?: BoolFieldUpdateOperationsInput | boolean
    frozenUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    missedOffersCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listings?: ExchangeListingUpdateManyWithoutUserNestedInput
    offers?: ExchangeOfferUpdateManyWithoutUserNestedInput
    exchangerTransactions?: ExchangeTransactionUpdateManyWithoutExchangerNestedInput
    customerTransactions?: ExchangeTransactionUpdateManyWithoutCustomerNestedInput
    disputesInitiated?: DisputeUpdateManyWithoutInitiatorNestedInput
    disputesModerated?: DisputeUpdateManyWithoutModeratorNestedInput
    reviewsWritten?: ReviewUpdateManyWithoutAuthorNestedInput
    reviewsReceived?: ReviewUpdateManyWithoutTargetNestedInput
    balance?: UserBalanceUpdateOneWithoutUserNestedInput
    exchangerSettings?: ExchangerSettingsUpdateOneWithoutUserNestedInput
    holds?: BalanceHoldUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isExchangerActive?: BoolFieldUpdateOperationsInput | boolean
    isFrozen?: BoolFieldUpdateOperationsInput | boolean
    frozenUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    missedOffersCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listings?: ExchangeListingUncheckedUpdateManyWithoutUserNestedInput
    offers?: ExchangeOfferUncheckedUpdateManyWithoutUserNestedInput
    exchangerTransactions?: ExchangeTransactionUncheckedUpdateManyWithoutExchangerNestedInput
    customerTransactions?: ExchangeTransactionUncheckedUpdateManyWithoutCustomerNestedInput
    disputesInitiated?: DisputeUncheckedUpdateManyWithoutInitiatorNestedInput
    disputesModerated?: DisputeUncheckedUpdateManyWithoutModeratorNestedInput
    reviewsWritten?: ReviewUncheckedUpdateManyWithoutAuthorNestedInput
    reviewsReceived?: ReviewUncheckedUpdateManyWithoutTargetNestedInput
    balance?: UserBalanceUncheckedUpdateOneWithoutUserNestedInput
    exchangerSettings?: ExchangerSettingsUncheckedUpdateOneWithoutUserNestedInput
    holds?: BalanceHoldUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    password: string
    role?: $Enums.UserRole
    isExchangerActive?: boolean
    isFrozen?: boolean
    frozenUntil?: Date | string | null
    missedOffersCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isExchangerActive?: BoolFieldUpdateOperationsInput | boolean
    isFrozen?: BoolFieldUpdateOperationsInput | boolean
    frozenUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    missedOffersCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isExchangerActive?: BoolFieldUpdateOperationsInput | boolean
    isFrozen?: BoolFieldUpdateOperationsInput | boolean
    frozenUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    missedOffersCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExchangeListingCreateInput = {
    id?: string
    type: $Enums.ExchangeType
    cryptocurrency: string
    fiatCurrency: string
    rate: number
    minAmount: number
    maxAmount: number
    availableAmount: number
    paymentMethods?: ExchangeListingCreatepaymentMethodsInput | $Enums.PaymentMethod[]
    terms?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutListingsInput
    offers?: ExchangeOfferCreateNestedManyWithoutListingInput
    transactions?: ExchangeTransactionCreateNestedManyWithoutListingInput
  }

  export type ExchangeListingUncheckedCreateInput = {
    id?: string
    type: $Enums.ExchangeType
    cryptocurrency: string
    fiatCurrency: string
    rate: number
    minAmount: number
    maxAmount: number
    availableAmount: number
    paymentMethods?: ExchangeListingCreatepaymentMethodsInput | $Enums.PaymentMethod[]
    terms?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    offers?: ExchangeOfferUncheckedCreateNestedManyWithoutListingInput
    transactions?: ExchangeTransactionUncheckedCreateNestedManyWithoutListingInput
  }

  export type ExchangeListingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumExchangeTypeFieldUpdateOperationsInput | $Enums.ExchangeType
    cryptocurrency?: StringFieldUpdateOperationsInput | string
    fiatCurrency?: StringFieldUpdateOperationsInput | string
    rate?: FloatFieldUpdateOperationsInput | number
    minAmount?: FloatFieldUpdateOperationsInput | number
    maxAmount?: FloatFieldUpdateOperationsInput | number
    availableAmount?: FloatFieldUpdateOperationsInput | number
    paymentMethods?: ExchangeListingUpdatepaymentMethodsInput | $Enums.PaymentMethod[]
    terms?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutListingsNestedInput
    offers?: ExchangeOfferUpdateManyWithoutListingNestedInput
    transactions?: ExchangeTransactionUpdateManyWithoutListingNestedInput
  }

  export type ExchangeListingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumExchangeTypeFieldUpdateOperationsInput | $Enums.ExchangeType
    cryptocurrency?: StringFieldUpdateOperationsInput | string
    fiatCurrency?: StringFieldUpdateOperationsInput | string
    rate?: FloatFieldUpdateOperationsInput | number
    minAmount?: FloatFieldUpdateOperationsInput | number
    maxAmount?: FloatFieldUpdateOperationsInput | number
    availableAmount?: FloatFieldUpdateOperationsInput | number
    paymentMethods?: ExchangeListingUpdatepaymentMethodsInput | $Enums.PaymentMethod[]
    terms?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    offers?: ExchangeOfferUncheckedUpdateManyWithoutListingNestedInput
    transactions?: ExchangeTransactionUncheckedUpdateManyWithoutListingNestedInput
  }

  export type ExchangeListingCreateManyInput = {
    id?: string
    type: $Enums.ExchangeType
    cryptocurrency: string
    fiatCurrency: string
    rate: number
    minAmount: number
    maxAmount: number
    availableAmount: number
    paymentMethods?: ExchangeListingCreatepaymentMethodsInput | $Enums.PaymentMethod[]
    terms?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type ExchangeListingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumExchangeTypeFieldUpdateOperationsInput | $Enums.ExchangeType
    cryptocurrency?: StringFieldUpdateOperationsInput | string
    fiatCurrency?: StringFieldUpdateOperationsInput | string
    rate?: FloatFieldUpdateOperationsInput | number
    minAmount?: FloatFieldUpdateOperationsInput | number
    maxAmount?: FloatFieldUpdateOperationsInput | number
    availableAmount?: FloatFieldUpdateOperationsInput | number
    paymentMethods?: ExchangeListingUpdatepaymentMethodsInput | $Enums.PaymentMethod[]
    terms?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExchangeListingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumExchangeTypeFieldUpdateOperationsInput | $Enums.ExchangeType
    cryptocurrency?: StringFieldUpdateOperationsInput | string
    fiatCurrency?: StringFieldUpdateOperationsInput | string
    rate?: FloatFieldUpdateOperationsInput | number
    minAmount?: FloatFieldUpdateOperationsInput | number
    maxAmount?: FloatFieldUpdateOperationsInput | number
    availableAmount?: FloatFieldUpdateOperationsInput | number
    paymentMethods?: ExchangeListingUpdatepaymentMethodsInput | $Enums.PaymentMethod[]
    terms?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type ExchangeOfferCreateInput = {
    id?: string
    amount: number
    status?: $Enums.OfferStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutOffersInput
    listing: ExchangeListingCreateNestedOneWithoutOffersInput
    transaction?: ExchangeTransactionCreateNestedOneWithoutOfferInput
  }

  export type ExchangeOfferUncheckedCreateInput = {
    id?: string
    amount: number
    status?: $Enums.OfferStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    listingId: string
    transaction?: ExchangeTransactionUncheckedCreateNestedOneWithoutOfferInput
  }

  export type ExchangeOfferUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    status?: EnumOfferStatusFieldUpdateOperationsInput | $Enums.OfferStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutOffersNestedInput
    listing?: ExchangeListingUpdateOneRequiredWithoutOffersNestedInput
    transaction?: ExchangeTransactionUpdateOneWithoutOfferNestedInput
  }

  export type ExchangeOfferUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    status?: EnumOfferStatusFieldUpdateOperationsInput | $Enums.OfferStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    listingId?: StringFieldUpdateOperationsInput | string
    transaction?: ExchangeTransactionUncheckedUpdateOneWithoutOfferNestedInput
  }

  export type ExchangeOfferCreateManyInput = {
    id?: string
    amount: number
    status?: $Enums.OfferStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    listingId: string
  }

  export type ExchangeOfferUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    status?: EnumOfferStatusFieldUpdateOperationsInput | $Enums.OfferStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExchangeOfferUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    status?: EnumOfferStatusFieldUpdateOperationsInput | $Enums.OfferStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    listingId?: StringFieldUpdateOperationsInput | string
  }

  export type ExchangeTransactionCreateInput = {
    id?: string
    type: $Enums.ExchangeType
    status?: $Enums.TransactionStatus
    cryptocurrency: string
    fiatCurrency: string
    cryptoAmount: number
    fiatAmount: number
    paymentProof?: string | null
    disputeId?: string | null
    confirmationDeadline: Date | string
    canCustomerDispute?: boolean
    canExchangerDispute?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    finishedAt?: Date | string | null
    offer?: ExchangeOfferCreateNestedOneWithoutTransactionInput
    customer: UserCreateNestedOneWithoutCustomerTransactionsInput
    exchanger: UserCreateNestedOneWithoutExchangerTransactionsInput
    listing: ExchangeListingCreateNestedOneWithoutTransactionsInput
    dispute?: DisputeCreateNestedOneWithoutTransactionInput
    review?: ReviewCreateNestedOneWithoutTransactionInput
  }

  export type ExchangeTransactionUncheckedCreateInput = {
    id?: string
    type: $Enums.ExchangeType
    status?: $Enums.TransactionStatus
    cryptocurrency: string
    fiatCurrency: string
    cryptoAmount: number
    fiatAmount: number
    paymentProof?: string | null
    disputeId?: string | null
    confirmationDeadline: Date | string
    canCustomerDispute?: boolean
    canExchangerDispute?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    finishedAt?: Date | string | null
    offerId?: string | null
    customerId: string
    exchangerId: string
    listingId: string
    dispute?: DisputeUncheckedCreateNestedOneWithoutTransactionInput
    review?: ReviewUncheckedCreateNestedOneWithoutTransactionInput
  }

  export type ExchangeTransactionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumExchangeTypeFieldUpdateOperationsInput | $Enums.ExchangeType
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    cryptocurrency?: StringFieldUpdateOperationsInput | string
    fiatCurrency?: StringFieldUpdateOperationsInput | string
    cryptoAmount?: FloatFieldUpdateOperationsInput | number
    fiatAmount?: FloatFieldUpdateOperationsInput | number
    paymentProof?: NullableStringFieldUpdateOperationsInput | string | null
    disputeId?: NullableStringFieldUpdateOperationsInput | string | null
    confirmationDeadline?: DateTimeFieldUpdateOperationsInput | Date | string
    canCustomerDispute?: BoolFieldUpdateOperationsInput | boolean
    canExchangerDispute?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    offer?: ExchangeOfferUpdateOneWithoutTransactionNestedInput
    customer?: UserUpdateOneRequiredWithoutCustomerTransactionsNestedInput
    exchanger?: UserUpdateOneRequiredWithoutExchangerTransactionsNestedInput
    listing?: ExchangeListingUpdateOneRequiredWithoutTransactionsNestedInput
    dispute?: DisputeUpdateOneWithoutTransactionNestedInput
    review?: ReviewUpdateOneWithoutTransactionNestedInput
  }

  export type ExchangeTransactionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumExchangeTypeFieldUpdateOperationsInput | $Enums.ExchangeType
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    cryptocurrency?: StringFieldUpdateOperationsInput | string
    fiatCurrency?: StringFieldUpdateOperationsInput | string
    cryptoAmount?: FloatFieldUpdateOperationsInput | number
    fiatAmount?: FloatFieldUpdateOperationsInput | number
    paymentProof?: NullableStringFieldUpdateOperationsInput | string | null
    disputeId?: NullableStringFieldUpdateOperationsInput | string | null
    confirmationDeadline?: DateTimeFieldUpdateOperationsInput | Date | string
    canCustomerDispute?: BoolFieldUpdateOperationsInput | boolean
    canExchangerDispute?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    offerId?: NullableStringFieldUpdateOperationsInput | string | null
    customerId?: StringFieldUpdateOperationsInput | string
    exchangerId?: StringFieldUpdateOperationsInput | string
    listingId?: StringFieldUpdateOperationsInput | string
    dispute?: DisputeUncheckedUpdateOneWithoutTransactionNestedInput
    review?: ReviewUncheckedUpdateOneWithoutTransactionNestedInput
  }

  export type ExchangeTransactionCreateManyInput = {
    id?: string
    type: $Enums.ExchangeType
    status?: $Enums.TransactionStatus
    cryptocurrency: string
    fiatCurrency: string
    cryptoAmount: number
    fiatAmount: number
    paymentProof?: string | null
    disputeId?: string | null
    confirmationDeadline: Date | string
    canCustomerDispute?: boolean
    canExchangerDispute?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    finishedAt?: Date | string | null
    offerId?: string | null
    customerId: string
    exchangerId: string
    listingId: string
  }

  export type ExchangeTransactionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumExchangeTypeFieldUpdateOperationsInput | $Enums.ExchangeType
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    cryptocurrency?: StringFieldUpdateOperationsInput | string
    fiatCurrency?: StringFieldUpdateOperationsInput | string
    cryptoAmount?: FloatFieldUpdateOperationsInput | number
    fiatAmount?: FloatFieldUpdateOperationsInput | number
    paymentProof?: NullableStringFieldUpdateOperationsInput | string | null
    disputeId?: NullableStringFieldUpdateOperationsInput | string | null
    confirmationDeadline?: DateTimeFieldUpdateOperationsInput | Date | string
    canCustomerDispute?: BoolFieldUpdateOperationsInput | boolean
    canExchangerDispute?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ExchangeTransactionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumExchangeTypeFieldUpdateOperationsInput | $Enums.ExchangeType
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    cryptocurrency?: StringFieldUpdateOperationsInput | string
    fiatCurrency?: StringFieldUpdateOperationsInput | string
    cryptoAmount?: FloatFieldUpdateOperationsInput | number
    fiatAmount?: FloatFieldUpdateOperationsInput | number
    paymentProof?: NullableStringFieldUpdateOperationsInput | string | null
    disputeId?: NullableStringFieldUpdateOperationsInput | string | null
    confirmationDeadline?: DateTimeFieldUpdateOperationsInput | Date | string
    canCustomerDispute?: BoolFieldUpdateOperationsInput | boolean
    canExchangerDispute?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    offerId?: NullableStringFieldUpdateOperationsInput | string | null
    customerId?: StringFieldUpdateOperationsInput | string
    exchangerId?: StringFieldUpdateOperationsInput | string
    listingId?: StringFieldUpdateOperationsInput | string
  }

  export type DisputeCreateInput = {
    id?: string
    reason: string
    status?: $Enums.DisputeStatus
    resolution?: string | null
    resolvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    transaction: ExchangeTransactionCreateNestedOneWithoutDisputeInput
    initiator: UserCreateNestedOneWithoutDisputesInitiatedInput
    moderator?: UserCreateNestedOneWithoutDisputesModeratedInput
  }

  export type DisputeUncheckedCreateInput = {
    id?: string
    reason: string
    status?: $Enums.DisputeStatus
    resolution?: string | null
    resolvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    transactionId: string
    initiatorId: string
    moderatorId?: string | null
  }

  export type DisputeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    status?: EnumDisputeStatusFieldUpdateOperationsInput | $Enums.DisputeStatus
    resolution?: NullableStringFieldUpdateOperationsInput | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transaction?: ExchangeTransactionUpdateOneRequiredWithoutDisputeNestedInput
    initiator?: UserUpdateOneRequiredWithoutDisputesInitiatedNestedInput
    moderator?: UserUpdateOneWithoutDisputesModeratedNestedInput
  }

  export type DisputeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    status?: EnumDisputeStatusFieldUpdateOperationsInput | $Enums.DisputeStatus
    resolution?: NullableStringFieldUpdateOperationsInput | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactionId?: StringFieldUpdateOperationsInput | string
    initiatorId?: StringFieldUpdateOperationsInput | string
    moderatorId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DisputeCreateManyInput = {
    id?: string
    reason: string
    status?: $Enums.DisputeStatus
    resolution?: string | null
    resolvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    transactionId: string
    initiatorId: string
    moderatorId?: string | null
  }

  export type DisputeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    status?: EnumDisputeStatusFieldUpdateOperationsInput | $Enums.DisputeStatus
    resolution?: NullableStringFieldUpdateOperationsInput | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DisputeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    status?: EnumDisputeStatusFieldUpdateOperationsInput | $Enums.DisputeStatus
    resolution?: NullableStringFieldUpdateOperationsInput | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactionId?: StringFieldUpdateOperationsInput | string
    initiatorId?: StringFieldUpdateOperationsInput | string
    moderatorId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ReviewCreateInput = {
    id?: string
    rating: number
    comment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    transaction: ExchangeTransactionCreateNestedOneWithoutReviewInput
    author: UserCreateNestedOneWithoutReviewsWrittenInput
    target: UserCreateNestedOneWithoutReviewsReceivedInput
  }

  export type ReviewUncheckedCreateInput = {
    id?: string
    rating: number
    comment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    transactionId: string
    authorId: string
    targetId: string
  }

  export type ReviewUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transaction?: ExchangeTransactionUpdateOneRequiredWithoutReviewNestedInput
    author?: UserUpdateOneRequiredWithoutReviewsWrittenNestedInput
    target?: UserUpdateOneRequiredWithoutReviewsReceivedNestedInput
  }

  export type ReviewUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactionId?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    targetId?: StringFieldUpdateOperationsInput | string
  }

  export type ReviewCreateManyInput = {
    id?: string
    rating: number
    comment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    transactionId: string
    authorId: string
    targetId: string
  }

  export type ReviewUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactionId?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    targetId?: StringFieldUpdateOperationsInput | string
  }

  export type UserBalanceCreateInput = {
    id?: string
    cryptoBalance: JsonNullValueInput | InputJsonValue
    totalHoldAmount: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutBalanceInput
  }

  export type UserBalanceUncheckedCreateInput = {
    id?: string
    userId: string
    cryptoBalance: JsonNullValueInput | InputJsonValue
    totalHoldAmount: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserBalanceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    cryptoBalance?: JsonNullValueInput | InputJsonValue
    totalHoldAmount?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutBalanceNestedInput
  }

  export type UserBalanceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    cryptoBalance?: JsonNullValueInput | InputJsonValue
    totalHoldAmount?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserBalanceCreateManyInput = {
    id?: string
    userId: string
    cryptoBalance: JsonNullValueInput | InputJsonValue
    totalHoldAmount: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserBalanceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    cryptoBalance?: JsonNullValueInput | InputJsonValue
    totalHoldAmount?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserBalanceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    cryptoBalance?: JsonNullValueInput | InputJsonValue
    totalHoldAmount?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BalanceHoldCreateInput = {
    id?: string
    cryptocurrency: string
    amount: number
    type: $Enums.HoldType
    relatedTransactionId?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutHoldsInput
  }

  export type BalanceHoldUncheckedCreateInput = {
    id?: string
    userId: string
    cryptocurrency: string
    amount: number
    type: $Enums.HoldType
    relatedTransactionId?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BalanceHoldUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    cryptocurrency?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    type?: EnumHoldTypeFieldUpdateOperationsInput | $Enums.HoldType
    relatedTransactionId?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutHoldsNestedInput
  }

  export type BalanceHoldUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    cryptocurrency?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    type?: EnumHoldTypeFieldUpdateOperationsInput | $Enums.HoldType
    relatedTransactionId?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BalanceHoldCreateManyInput = {
    id?: string
    userId: string
    cryptocurrency: string
    amount: number
    type: $Enums.HoldType
    relatedTransactionId?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BalanceHoldUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    cryptocurrency?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    type?: EnumHoldTypeFieldUpdateOperationsInput | $Enums.HoldType
    relatedTransactionId?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BalanceHoldUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    cryptocurrency?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    type?: EnumHoldTypeFieldUpdateOperationsInput | $Enums.HoldType
    relatedTransactionId?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExchangerSettingsCreateInput = {
    id?: string
    autoAcceptOffers?: boolean
    preferredPaymentMethods?: ExchangerSettingsCreatepreferredPaymentMethodsInput | $Enums.PaymentMethod[]
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    minimumRating?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutExchangerSettingsInput
  }

  export type ExchangerSettingsUncheckedCreateInput = {
    id?: string
    userId: string
    autoAcceptOffers?: boolean
    preferredPaymentMethods?: ExchangerSettingsCreatepreferredPaymentMethodsInput | $Enums.PaymentMethod[]
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    minimumRating?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExchangerSettingsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    autoAcceptOffers?: BoolFieldUpdateOperationsInput | boolean
    preferredPaymentMethods?: ExchangerSettingsUpdatepreferredPaymentMethodsInput | $Enums.PaymentMethod[]
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    minimumRating?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutExchangerSettingsNestedInput
  }

  export type ExchangerSettingsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    autoAcceptOffers?: BoolFieldUpdateOperationsInput | boolean
    preferredPaymentMethods?: ExchangerSettingsUpdatepreferredPaymentMethodsInput | $Enums.PaymentMethod[]
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    minimumRating?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExchangerSettingsCreateManyInput = {
    id?: string
    userId: string
    autoAcceptOffers?: boolean
    preferredPaymentMethods?: ExchangerSettingsCreatepreferredPaymentMethodsInput | $Enums.PaymentMethod[]
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    minimumRating?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExchangerSettingsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    autoAcceptOffers?: BoolFieldUpdateOperationsInput | boolean
    preferredPaymentMethods?: ExchangerSettingsUpdatepreferredPaymentMethodsInput | $Enums.PaymentMethod[]
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    minimumRating?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExchangerSettingsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    autoAcceptOffers?: BoolFieldUpdateOperationsInput | boolean
    preferredPaymentMethods?: ExchangerSettingsUpdatepreferredPaymentMethodsInput | $Enums.PaymentMethod[]
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    minimumRating?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ExchangeListingListRelationFilter = {
    every?: ExchangeListingWhereInput
    some?: ExchangeListingWhereInput
    none?: ExchangeListingWhereInput
  }

  export type ExchangeOfferListRelationFilter = {
    every?: ExchangeOfferWhereInput
    some?: ExchangeOfferWhereInput
    none?: ExchangeOfferWhereInput
  }

  export type ExchangeTransactionListRelationFilter = {
    every?: ExchangeTransactionWhereInput
    some?: ExchangeTransactionWhereInput
    none?: ExchangeTransactionWhereInput
  }

  export type DisputeListRelationFilter = {
    every?: DisputeWhereInput
    some?: DisputeWhereInput
    none?: DisputeWhereInput
  }

  export type ReviewListRelationFilter = {
    every?: ReviewWhereInput
    some?: ReviewWhereInput
    none?: ReviewWhereInput
  }

  export type UserBalanceNullableRelationFilter = {
    is?: UserBalanceWhereInput | null
    isNot?: UserBalanceWhereInput | null
  }

  export type ExchangerSettingsNullableRelationFilter = {
    is?: ExchangerSettingsWhereInput | null
    isNot?: ExchangerSettingsWhereInput | null
  }

  export type BalanceHoldListRelationFilter = {
    every?: BalanceHoldWhereInput
    some?: BalanceHoldWhereInput
    none?: BalanceHoldWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ExchangeListingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ExchangeOfferOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ExchangeTransactionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DisputeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ReviewOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BalanceHoldOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    isExchangerActive?: SortOrder
    isFrozen?: SortOrder
    frozenUntil?: SortOrder
    missedOffersCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    missedOffersCount?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    isExchangerActive?: SortOrder
    isFrozen?: SortOrder
    frozenUntil?: SortOrder
    missedOffersCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    isExchangerActive?: SortOrder
    isFrozen?: SortOrder
    frozenUntil?: SortOrder
    missedOffersCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    missedOffersCount?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumExchangeTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ExchangeType | EnumExchangeTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ExchangeType[] | ListEnumExchangeTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExchangeType[] | ListEnumExchangeTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumExchangeTypeFilter<$PrismaModel> | $Enums.ExchangeType
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type EnumPaymentMethodNullableListFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel> | null
    has?: $Enums.PaymentMethod | EnumPaymentMethodFieldRefInput<$PrismaModel> | null
    hasEvery?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    hasSome?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ExchangeListingCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    cryptocurrency?: SortOrder
    fiatCurrency?: SortOrder
    rate?: SortOrder
    minAmount?: SortOrder
    maxAmount?: SortOrder
    availableAmount?: SortOrder
    paymentMethods?: SortOrder
    terms?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type ExchangeListingAvgOrderByAggregateInput = {
    rate?: SortOrder
    minAmount?: SortOrder
    maxAmount?: SortOrder
    availableAmount?: SortOrder
  }

  export type ExchangeListingMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    cryptocurrency?: SortOrder
    fiatCurrency?: SortOrder
    rate?: SortOrder
    minAmount?: SortOrder
    maxAmount?: SortOrder
    availableAmount?: SortOrder
    terms?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type ExchangeListingMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    cryptocurrency?: SortOrder
    fiatCurrency?: SortOrder
    rate?: SortOrder
    minAmount?: SortOrder
    maxAmount?: SortOrder
    availableAmount?: SortOrder
    terms?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type ExchangeListingSumOrderByAggregateInput = {
    rate?: SortOrder
    minAmount?: SortOrder
    maxAmount?: SortOrder
    availableAmount?: SortOrder
  }

  export type EnumExchangeTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ExchangeType | EnumExchangeTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ExchangeType[] | ListEnumExchangeTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExchangeType[] | ListEnumExchangeTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumExchangeTypeWithAggregatesFilter<$PrismaModel> | $Enums.ExchangeType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumExchangeTypeFilter<$PrismaModel>
    _max?: NestedEnumExchangeTypeFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumOfferStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OfferStatus | EnumOfferStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OfferStatus[] | ListEnumOfferStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OfferStatus[] | ListEnumOfferStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOfferStatusFilter<$PrismaModel> | $Enums.OfferStatus
  }

  export type ExchangeListingRelationFilter = {
    is?: ExchangeListingWhereInput
    isNot?: ExchangeListingWhereInput
  }

  export type ExchangeTransactionNullableRelationFilter = {
    is?: ExchangeTransactionWhereInput | null
    isNot?: ExchangeTransactionWhereInput | null
  }

  export type ExchangeOfferCountOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    listingId?: SortOrder
  }

  export type ExchangeOfferAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type ExchangeOfferMaxOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    listingId?: SortOrder
  }

  export type ExchangeOfferMinOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    listingId?: SortOrder
  }

  export type ExchangeOfferSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type EnumOfferStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OfferStatus | EnumOfferStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OfferStatus[] | ListEnumOfferStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OfferStatus[] | ListEnumOfferStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOfferStatusWithAggregatesFilter<$PrismaModel> | $Enums.OfferStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOfferStatusFilter<$PrismaModel>
    _max?: NestedEnumOfferStatusFilter<$PrismaModel>
  }

  export type EnumTransactionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionStatus | EnumTransactionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionStatus[] | ListEnumTransactionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionStatus[] | ListEnumTransactionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionStatusFilter<$PrismaModel> | $Enums.TransactionStatus
  }

  export type ExchangeOfferNullableRelationFilter = {
    is?: ExchangeOfferWhereInput | null
    isNot?: ExchangeOfferWhereInput | null
  }

  export type DisputeNullableRelationFilter = {
    is?: DisputeWhereInput | null
    isNot?: DisputeWhereInput | null
  }

  export type ReviewNullableRelationFilter = {
    is?: ReviewWhereInput | null
    isNot?: ReviewWhereInput | null
  }

  export type ExchangeTransactionCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    status?: SortOrder
    cryptocurrency?: SortOrder
    fiatCurrency?: SortOrder
    cryptoAmount?: SortOrder
    fiatAmount?: SortOrder
    paymentProof?: SortOrder
    disputeId?: SortOrder
    confirmationDeadline?: SortOrder
    canCustomerDispute?: SortOrder
    canExchangerDispute?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    finishedAt?: SortOrder
    offerId?: SortOrder
    customerId?: SortOrder
    exchangerId?: SortOrder
    listingId?: SortOrder
  }

  export type ExchangeTransactionAvgOrderByAggregateInput = {
    cryptoAmount?: SortOrder
    fiatAmount?: SortOrder
  }

  export type ExchangeTransactionMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    status?: SortOrder
    cryptocurrency?: SortOrder
    fiatCurrency?: SortOrder
    cryptoAmount?: SortOrder
    fiatAmount?: SortOrder
    paymentProof?: SortOrder
    disputeId?: SortOrder
    confirmationDeadline?: SortOrder
    canCustomerDispute?: SortOrder
    canExchangerDispute?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    finishedAt?: SortOrder
    offerId?: SortOrder
    customerId?: SortOrder
    exchangerId?: SortOrder
    listingId?: SortOrder
  }

  export type ExchangeTransactionMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    status?: SortOrder
    cryptocurrency?: SortOrder
    fiatCurrency?: SortOrder
    cryptoAmount?: SortOrder
    fiatAmount?: SortOrder
    paymentProof?: SortOrder
    disputeId?: SortOrder
    confirmationDeadline?: SortOrder
    canCustomerDispute?: SortOrder
    canExchangerDispute?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    finishedAt?: SortOrder
    offerId?: SortOrder
    customerId?: SortOrder
    exchangerId?: SortOrder
    listingId?: SortOrder
  }

  export type ExchangeTransactionSumOrderByAggregateInput = {
    cryptoAmount?: SortOrder
    fiatAmount?: SortOrder
  }

  export type EnumTransactionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionStatus | EnumTransactionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionStatus[] | ListEnumTransactionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionStatus[] | ListEnumTransactionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionStatusWithAggregatesFilter<$PrismaModel> | $Enums.TransactionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTransactionStatusFilter<$PrismaModel>
    _max?: NestedEnumTransactionStatusFilter<$PrismaModel>
  }

  export type EnumDisputeStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.DisputeStatus | EnumDisputeStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DisputeStatus[] | ListEnumDisputeStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DisputeStatus[] | ListEnumDisputeStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDisputeStatusFilter<$PrismaModel> | $Enums.DisputeStatus
  }

  export type ExchangeTransactionRelationFilter = {
    is?: ExchangeTransactionWhereInput
    isNot?: ExchangeTransactionWhereInput
  }

  export type UserNullableRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type DisputeCountOrderByAggregateInput = {
    id?: SortOrder
    reason?: SortOrder
    status?: SortOrder
    resolution?: SortOrder
    resolvedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    transactionId?: SortOrder
    initiatorId?: SortOrder
    moderatorId?: SortOrder
  }

  export type DisputeMaxOrderByAggregateInput = {
    id?: SortOrder
    reason?: SortOrder
    status?: SortOrder
    resolution?: SortOrder
    resolvedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    transactionId?: SortOrder
    initiatorId?: SortOrder
    moderatorId?: SortOrder
  }

  export type DisputeMinOrderByAggregateInput = {
    id?: SortOrder
    reason?: SortOrder
    status?: SortOrder
    resolution?: SortOrder
    resolvedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    transactionId?: SortOrder
    initiatorId?: SortOrder
    moderatorId?: SortOrder
  }

  export type EnumDisputeStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DisputeStatus | EnumDisputeStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DisputeStatus[] | ListEnumDisputeStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DisputeStatus[] | ListEnumDisputeStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDisputeStatusWithAggregatesFilter<$PrismaModel> | $Enums.DisputeStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDisputeStatusFilter<$PrismaModel>
    _max?: NestedEnumDisputeStatusFilter<$PrismaModel>
  }

  export type ReviewCountOrderByAggregateInput = {
    id?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    transactionId?: SortOrder
    authorId?: SortOrder
    targetId?: SortOrder
  }

  export type ReviewAvgOrderByAggregateInput = {
    rating?: SortOrder
  }

  export type ReviewMaxOrderByAggregateInput = {
    id?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    transactionId?: SortOrder
    authorId?: SortOrder
    targetId?: SortOrder
  }

  export type ReviewMinOrderByAggregateInput = {
    id?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    transactionId?: SortOrder
    authorId?: SortOrder
    targetId?: SortOrder
  }

  export type ReviewSumOrderByAggregateInput = {
    rating?: SortOrder
  }
  export type JsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type UserBalanceCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    cryptoBalance?: SortOrder
    totalHoldAmount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserBalanceMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserBalanceMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type EnumHoldTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.HoldType | EnumHoldTypeFieldRefInput<$PrismaModel>
    in?: $Enums.HoldType[] | ListEnumHoldTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.HoldType[] | ListEnumHoldTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumHoldTypeFilter<$PrismaModel> | $Enums.HoldType
  }

  export type BalanceHoldCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    cryptocurrency?: SortOrder
    amount?: SortOrder
    type?: SortOrder
    relatedTransactionId?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BalanceHoldAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type BalanceHoldMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    cryptocurrency?: SortOrder
    amount?: SortOrder
    type?: SortOrder
    relatedTransactionId?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BalanceHoldMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    cryptocurrency?: SortOrder
    amount?: SortOrder
    type?: SortOrder
    relatedTransactionId?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BalanceHoldSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type EnumHoldTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.HoldType | EnumHoldTypeFieldRefInput<$PrismaModel>
    in?: $Enums.HoldType[] | ListEnumHoldTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.HoldType[] | ListEnumHoldTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumHoldTypeWithAggregatesFilter<$PrismaModel> | $Enums.HoldType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumHoldTypeFilter<$PrismaModel>
    _max?: NestedEnumHoldTypeFilter<$PrismaModel>
  }
  export type JsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type ExchangerSettingsCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    autoAcceptOffers?: SortOrder
    preferredPaymentMethods?: SortOrder
    workingHours?: SortOrder
    minimumRating?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ExchangerSettingsAvgOrderByAggregateInput = {
    minimumRating?: SortOrder
  }

  export type ExchangerSettingsMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    autoAcceptOffers?: SortOrder
    minimumRating?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ExchangerSettingsMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    autoAcceptOffers?: SortOrder
    minimumRating?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ExchangerSettingsSumOrderByAggregateInput = {
    minimumRating?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type ExchangeListingCreateNestedManyWithoutUserInput = {
    create?: XOR<ExchangeListingCreateWithoutUserInput, ExchangeListingUncheckedCreateWithoutUserInput> | ExchangeListingCreateWithoutUserInput[] | ExchangeListingUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ExchangeListingCreateOrConnectWithoutUserInput | ExchangeListingCreateOrConnectWithoutUserInput[]
    createMany?: ExchangeListingCreateManyUserInputEnvelope
    connect?: ExchangeListingWhereUniqueInput | ExchangeListingWhereUniqueInput[]
  }

  export type ExchangeOfferCreateNestedManyWithoutUserInput = {
    create?: XOR<ExchangeOfferCreateWithoutUserInput, ExchangeOfferUncheckedCreateWithoutUserInput> | ExchangeOfferCreateWithoutUserInput[] | ExchangeOfferUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ExchangeOfferCreateOrConnectWithoutUserInput | ExchangeOfferCreateOrConnectWithoutUserInput[]
    createMany?: ExchangeOfferCreateManyUserInputEnvelope
    connect?: ExchangeOfferWhereUniqueInput | ExchangeOfferWhereUniqueInput[]
  }

  export type ExchangeTransactionCreateNestedManyWithoutExchangerInput = {
    create?: XOR<ExchangeTransactionCreateWithoutExchangerInput, ExchangeTransactionUncheckedCreateWithoutExchangerInput> | ExchangeTransactionCreateWithoutExchangerInput[] | ExchangeTransactionUncheckedCreateWithoutExchangerInput[]
    connectOrCreate?: ExchangeTransactionCreateOrConnectWithoutExchangerInput | ExchangeTransactionCreateOrConnectWithoutExchangerInput[]
    createMany?: ExchangeTransactionCreateManyExchangerInputEnvelope
    connect?: ExchangeTransactionWhereUniqueInput | ExchangeTransactionWhereUniqueInput[]
  }

  export type ExchangeTransactionCreateNestedManyWithoutCustomerInput = {
    create?: XOR<ExchangeTransactionCreateWithoutCustomerInput, ExchangeTransactionUncheckedCreateWithoutCustomerInput> | ExchangeTransactionCreateWithoutCustomerInput[] | ExchangeTransactionUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: ExchangeTransactionCreateOrConnectWithoutCustomerInput | ExchangeTransactionCreateOrConnectWithoutCustomerInput[]
    createMany?: ExchangeTransactionCreateManyCustomerInputEnvelope
    connect?: ExchangeTransactionWhereUniqueInput | ExchangeTransactionWhereUniqueInput[]
  }

  export type DisputeCreateNestedManyWithoutInitiatorInput = {
    create?: XOR<DisputeCreateWithoutInitiatorInput, DisputeUncheckedCreateWithoutInitiatorInput> | DisputeCreateWithoutInitiatorInput[] | DisputeUncheckedCreateWithoutInitiatorInput[]
    connectOrCreate?: DisputeCreateOrConnectWithoutInitiatorInput | DisputeCreateOrConnectWithoutInitiatorInput[]
    createMany?: DisputeCreateManyInitiatorInputEnvelope
    connect?: DisputeWhereUniqueInput | DisputeWhereUniqueInput[]
  }

  export type DisputeCreateNestedManyWithoutModeratorInput = {
    create?: XOR<DisputeCreateWithoutModeratorInput, DisputeUncheckedCreateWithoutModeratorInput> | DisputeCreateWithoutModeratorInput[] | DisputeUncheckedCreateWithoutModeratorInput[]
    connectOrCreate?: DisputeCreateOrConnectWithoutModeratorInput | DisputeCreateOrConnectWithoutModeratorInput[]
    createMany?: DisputeCreateManyModeratorInputEnvelope
    connect?: DisputeWhereUniqueInput | DisputeWhereUniqueInput[]
  }

  export type ReviewCreateNestedManyWithoutAuthorInput = {
    create?: XOR<ReviewCreateWithoutAuthorInput, ReviewUncheckedCreateWithoutAuthorInput> | ReviewCreateWithoutAuthorInput[] | ReviewUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutAuthorInput | ReviewCreateOrConnectWithoutAuthorInput[]
    createMany?: ReviewCreateManyAuthorInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type ReviewCreateNestedManyWithoutTargetInput = {
    create?: XOR<ReviewCreateWithoutTargetInput, ReviewUncheckedCreateWithoutTargetInput> | ReviewCreateWithoutTargetInput[] | ReviewUncheckedCreateWithoutTargetInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutTargetInput | ReviewCreateOrConnectWithoutTargetInput[]
    createMany?: ReviewCreateManyTargetInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type UserBalanceCreateNestedOneWithoutUserInput = {
    create?: XOR<UserBalanceCreateWithoutUserInput, UserBalanceUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserBalanceCreateOrConnectWithoutUserInput
    connect?: UserBalanceWhereUniqueInput
  }

  export type ExchangerSettingsCreateNestedOneWithoutUserInput = {
    create?: XOR<ExchangerSettingsCreateWithoutUserInput, ExchangerSettingsUncheckedCreateWithoutUserInput>
    connectOrCreate?: ExchangerSettingsCreateOrConnectWithoutUserInput
    connect?: ExchangerSettingsWhereUniqueInput
  }

  export type BalanceHoldCreateNestedManyWithoutUserInput = {
    create?: XOR<BalanceHoldCreateWithoutUserInput, BalanceHoldUncheckedCreateWithoutUserInput> | BalanceHoldCreateWithoutUserInput[] | BalanceHoldUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BalanceHoldCreateOrConnectWithoutUserInput | BalanceHoldCreateOrConnectWithoutUserInput[]
    createMany?: BalanceHoldCreateManyUserInputEnvelope
    connect?: BalanceHoldWhereUniqueInput | BalanceHoldWhereUniqueInput[]
  }

  export type ExchangeListingUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ExchangeListingCreateWithoutUserInput, ExchangeListingUncheckedCreateWithoutUserInput> | ExchangeListingCreateWithoutUserInput[] | ExchangeListingUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ExchangeListingCreateOrConnectWithoutUserInput | ExchangeListingCreateOrConnectWithoutUserInput[]
    createMany?: ExchangeListingCreateManyUserInputEnvelope
    connect?: ExchangeListingWhereUniqueInput | ExchangeListingWhereUniqueInput[]
  }

  export type ExchangeOfferUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ExchangeOfferCreateWithoutUserInput, ExchangeOfferUncheckedCreateWithoutUserInput> | ExchangeOfferCreateWithoutUserInput[] | ExchangeOfferUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ExchangeOfferCreateOrConnectWithoutUserInput | ExchangeOfferCreateOrConnectWithoutUserInput[]
    createMany?: ExchangeOfferCreateManyUserInputEnvelope
    connect?: ExchangeOfferWhereUniqueInput | ExchangeOfferWhereUniqueInput[]
  }

  export type ExchangeTransactionUncheckedCreateNestedManyWithoutExchangerInput = {
    create?: XOR<ExchangeTransactionCreateWithoutExchangerInput, ExchangeTransactionUncheckedCreateWithoutExchangerInput> | ExchangeTransactionCreateWithoutExchangerInput[] | ExchangeTransactionUncheckedCreateWithoutExchangerInput[]
    connectOrCreate?: ExchangeTransactionCreateOrConnectWithoutExchangerInput | ExchangeTransactionCreateOrConnectWithoutExchangerInput[]
    createMany?: ExchangeTransactionCreateManyExchangerInputEnvelope
    connect?: ExchangeTransactionWhereUniqueInput | ExchangeTransactionWhereUniqueInput[]
  }

  export type ExchangeTransactionUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: XOR<ExchangeTransactionCreateWithoutCustomerInput, ExchangeTransactionUncheckedCreateWithoutCustomerInput> | ExchangeTransactionCreateWithoutCustomerInput[] | ExchangeTransactionUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: ExchangeTransactionCreateOrConnectWithoutCustomerInput | ExchangeTransactionCreateOrConnectWithoutCustomerInput[]
    createMany?: ExchangeTransactionCreateManyCustomerInputEnvelope
    connect?: ExchangeTransactionWhereUniqueInput | ExchangeTransactionWhereUniqueInput[]
  }

  export type DisputeUncheckedCreateNestedManyWithoutInitiatorInput = {
    create?: XOR<DisputeCreateWithoutInitiatorInput, DisputeUncheckedCreateWithoutInitiatorInput> | DisputeCreateWithoutInitiatorInput[] | DisputeUncheckedCreateWithoutInitiatorInput[]
    connectOrCreate?: DisputeCreateOrConnectWithoutInitiatorInput | DisputeCreateOrConnectWithoutInitiatorInput[]
    createMany?: DisputeCreateManyInitiatorInputEnvelope
    connect?: DisputeWhereUniqueInput | DisputeWhereUniqueInput[]
  }

  export type DisputeUncheckedCreateNestedManyWithoutModeratorInput = {
    create?: XOR<DisputeCreateWithoutModeratorInput, DisputeUncheckedCreateWithoutModeratorInput> | DisputeCreateWithoutModeratorInput[] | DisputeUncheckedCreateWithoutModeratorInput[]
    connectOrCreate?: DisputeCreateOrConnectWithoutModeratorInput | DisputeCreateOrConnectWithoutModeratorInput[]
    createMany?: DisputeCreateManyModeratorInputEnvelope
    connect?: DisputeWhereUniqueInput | DisputeWhereUniqueInput[]
  }

  export type ReviewUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: XOR<ReviewCreateWithoutAuthorInput, ReviewUncheckedCreateWithoutAuthorInput> | ReviewCreateWithoutAuthorInput[] | ReviewUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutAuthorInput | ReviewCreateOrConnectWithoutAuthorInput[]
    createMany?: ReviewCreateManyAuthorInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type ReviewUncheckedCreateNestedManyWithoutTargetInput = {
    create?: XOR<ReviewCreateWithoutTargetInput, ReviewUncheckedCreateWithoutTargetInput> | ReviewCreateWithoutTargetInput[] | ReviewUncheckedCreateWithoutTargetInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutTargetInput | ReviewCreateOrConnectWithoutTargetInput[]
    createMany?: ReviewCreateManyTargetInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type UserBalanceUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<UserBalanceCreateWithoutUserInput, UserBalanceUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserBalanceCreateOrConnectWithoutUserInput
    connect?: UserBalanceWhereUniqueInput
  }

  export type ExchangerSettingsUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<ExchangerSettingsCreateWithoutUserInput, ExchangerSettingsUncheckedCreateWithoutUserInput>
    connectOrCreate?: ExchangerSettingsCreateOrConnectWithoutUserInput
    connect?: ExchangerSettingsWhereUniqueInput
  }

  export type BalanceHoldUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<BalanceHoldCreateWithoutUserInput, BalanceHoldUncheckedCreateWithoutUserInput> | BalanceHoldCreateWithoutUserInput[] | BalanceHoldUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BalanceHoldCreateOrConnectWithoutUserInput | BalanceHoldCreateOrConnectWithoutUserInput[]
    createMany?: BalanceHoldCreateManyUserInputEnvelope
    connect?: BalanceHoldWhereUniqueInput | BalanceHoldWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ExchangeListingUpdateManyWithoutUserNestedInput = {
    create?: XOR<ExchangeListingCreateWithoutUserInput, ExchangeListingUncheckedCreateWithoutUserInput> | ExchangeListingCreateWithoutUserInput[] | ExchangeListingUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ExchangeListingCreateOrConnectWithoutUserInput | ExchangeListingCreateOrConnectWithoutUserInput[]
    upsert?: ExchangeListingUpsertWithWhereUniqueWithoutUserInput | ExchangeListingUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ExchangeListingCreateManyUserInputEnvelope
    set?: ExchangeListingWhereUniqueInput | ExchangeListingWhereUniqueInput[]
    disconnect?: ExchangeListingWhereUniqueInput | ExchangeListingWhereUniqueInput[]
    delete?: ExchangeListingWhereUniqueInput | ExchangeListingWhereUniqueInput[]
    connect?: ExchangeListingWhereUniqueInput | ExchangeListingWhereUniqueInput[]
    update?: ExchangeListingUpdateWithWhereUniqueWithoutUserInput | ExchangeListingUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ExchangeListingUpdateManyWithWhereWithoutUserInput | ExchangeListingUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ExchangeListingScalarWhereInput | ExchangeListingScalarWhereInput[]
  }

  export type ExchangeOfferUpdateManyWithoutUserNestedInput = {
    create?: XOR<ExchangeOfferCreateWithoutUserInput, ExchangeOfferUncheckedCreateWithoutUserInput> | ExchangeOfferCreateWithoutUserInput[] | ExchangeOfferUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ExchangeOfferCreateOrConnectWithoutUserInput | ExchangeOfferCreateOrConnectWithoutUserInput[]
    upsert?: ExchangeOfferUpsertWithWhereUniqueWithoutUserInput | ExchangeOfferUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ExchangeOfferCreateManyUserInputEnvelope
    set?: ExchangeOfferWhereUniqueInput | ExchangeOfferWhereUniqueInput[]
    disconnect?: ExchangeOfferWhereUniqueInput | ExchangeOfferWhereUniqueInput[]
    delete?: ExchangeOfferWhereUniqueInput | ExchangeOfferWhereUniqueInput[]
    connect?: ExchangeOfferWhereUniqueInput | ExchangeOfferWhereUniqueInput[]
    update?: ExchangeOfferUpdateWithWhereUniqueWithoutUserInput | ExchangeOfferUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ExchangeOfferUpdateManyWithWhereWithoutUserInput | ExchangeOfferUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ExchangeOfferScalarWhereInput | ExchangeOfferScalarWhereInput[]
  }

  export type ExchangeTransactionUpdateManyWithoutExchangerNestedInput = {
    create?: XOR<ExchangeTransactionCreateWithoutExchangerInput, ExchangeTransactionUncheckedCreateWithoutExchangerInput> | ExchangeTransactionCreateWithoutExchangerInput[] | ExchangeTransactionUncheckedCreateWithoutExchangerInput[]
    connectOrCreate?: ExchangeTransactionCreateOrConnectWithoutExchangerInput | ExchangeTransactionCreateOrConnectWithoutExchangerInput[]
    upsert?: ExchangeTransactionUpsertWithWhereUniqueWithoutExchangerInput | ExchangeTransactionUpsertWithWhereUniqueWithoutExchangerInput[]
    createMany?: ExchangeTransactionCreateManyExchangerInputEnvelope
    set?: ExchangeTransactionWhereUniqueInput | ExchangeTransactionWhereUniqueInput[]
    disconnect?: ExchangeTransactionWhereUniqueInput | ExchangeTransactionWhereUniqueInput[]
    delete?: ExchangeTransactionWhereUniqueInput | ExchangeTransactionWhereUniqueInput[]
    connect?: ExchangeTransactionWhereUniqueInput | ExchangeTransactionWhereUniqueInput[]
    update?: ExchangeTransactionUpdateWithWhereUniqueWithoutExchangerInput | ExchangeTransactionUpdateWithWhereUniqueWithoutExchangerInput[]
    updateMany?: ExchangeTransactionUpdateManyWithWhereWithoutExchangerInput | ExchangeTransactionUpdateManyWithWhereWithoutExchangerInput[]
    deleteMany?: ExchangeTransactionScalarWhereInput | ExchangeTransactionScalarWhereInput[]
  }

  export type ExchangeTransactionUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<ExchangeTransactionCreateWithoutCustomerInput, ExchangeTransactionUncheckedCreateWithoutCustomerInput> | ExchangeTransactionCreateWithoutCustomerInput[] | ExchangeTransactionUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: ExchangeTransactionCreateOrConnectWithoutCustomerInput | ExchangeTransactionCreateOrConnectWithoutCustomerInput[]
    upsert?: ExchangeTransactionUpsertWithWhereUniqueWithoutCustomerInput | ExchangeTransactionUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: ExchangeTransactionCreateManyCustomerInputEnvelope
    set?: ExchangeTransactionWhereUniqueInput | ExchangeTransactionWhereUniqueInput[]
    disconnect?: ExchangeTransactionWhereUniqueInput | ExchangeTransactionWhereUniqueInput[]
    delete?: ExchangeTransactionWhereUniqueInput | ExchangeTransactionWhereUniqueInput[]
    connect?: ExchangeTransactionWhereUniqueInput | ExchangeTransactionWhereUniqueInput[]
    update?: ExchangeTransactionUpdateWithWhereUniqueWithoutCustomerInput | ExchangeTransactionUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: ExchangeTransactionUpdateManyWithWhereWithoutCustomerInput | ExchangeTransactionUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: ExchangeTransactionScalarWhereInput | ExchangeTransactionScalarWhereInput[]
  }

  export type DisputeUpdateManyWithoutInitiatorNestedInput = {
    create?: XOR<DisputeCreateWithoutInitiatorInput, DisputeUncheckedCreateWithoutInitiatorInput> | DisputeCreateWithoutInitiatorInput[] | DisputeUncheckedCreateWithoutInitiatorInput[]
    connectOrCreate?: DisputeCreateOrConnectWithoutInitiatorInput | DisputeCreateOrConnectWithoutInitiatorInput[]
    upsert?: DisputeUpsertWithWhereUniqueWithoutInitiatorInput | DisputeUpsertWithWhereUniqueWithoutInitiatorInput[]
    createMany?: DisputeCreateManyInitiatorInputEnvelope
    set?: DisputeWhereUniqueInput | DisputeWhereUniqueInput[]
    disconnect?: DisputeWhereUniqueInput | DisputeWhereUniqueInput[]
    delete?: DisputeWhereUniqueInput | DisputeWhereUniqueInput[]
    connect?: DisputeWhereUniqueInput | DisputeWhereUniqueInput[]
    update?: DisputeUpdateWithWhereUniqueWithoutInitiatorInput | DisputeUpdateWithWhereUniqueWithoutInitiatorInput[]
    updateMany?: DisputeUpdateManyWithWhereWithoutInitiatorInput | DisputeUpdateManyWithWhereWithoutInitiatorInput[]
    deleteMany?: DisputeScalarWhereInput | DisputeScalarWhereInput[]
  }

  export type DisputeUpdateManyWithoutModeratorNestedInput = {
    create?: XOR<DisputeCreateWithoutModeratorInput, DisputeUncheckedCreateWithoutModeratorInput> | DisputeCreateWithoutModeratorInput[] | DisputeUncheckedCreateWithoutModeratorInput[]
    connectOrCreate?: DisputeCreateOrConnectWithoutModeratorInput | DisputeCreateOrConnectWithoutModeratorInput[]
    upsert?: DisputeUpsertWithWhereUniqueWithoutModeratorInput | DisputeUpsertWithWhereUniqueWithoutModeratorInput[]
    createMany?: DisputeCreateManyModeratorInputEnvelope
    set?: DisputeWhereUniqueInput | DisputeWhereUniqueInput[]
    disconnect?: DisputeWhereUniqueInput | DisputeWhereUniqueInput[]
    delete?: DisputeWhereUniqueInput | DisputeWhereUniqueInput[]
    connect?: DisputeWhereUniqueInput | DisputeWhereUniqueInput[]
    update?: DisputeUpdateWithWhereUniqueWithoutModeratorInput | DisputeUpdateWithWhereUniqueWithoutModeratorInput[]
    updateMany?: DisputeUpdateManyWithWhereWithoutModeratorInput | DisputeUpdateManyWithWhereWithoutModeratorInput[]
    deleteMany?: DisputeScalarWhereInput | DisputeScalarWhereInput[]
  }

  export type ReviewUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<ReviewCreateWithoutAuthorInput, ReviewUncheckedCreateWithoutAuthorInput> | ReviewCreateWithoutAuthorInput[] | ReviewUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutAuthorInput | ReviewCreateOrConnectWithoutAuthorInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutAuthorInput | ReviewUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: ReviewCreateManyAuthorInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutAuthorInput | ReviewUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutAuthorInput | ReviewUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type ReviewUpdateManyWithoutTargetNestedInput = {
    create?: XOR<ReviewCreateWithoutTargetInput, ReviewUncheckedCreateWithoutTargetInput> | ReviewCreateWithoutTargetInput[] | ReviewUncheckedCreateWithoutTargetInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutTargetInput | ReviewCreateOrConnectWithoutTargetInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutTargetInput | ReviewUpsertWithWhereUniqueWithoutTargetInput[]
    createMany?: ReviewCreateManyTargetInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutTargetInput | ReviewUpdateWithWhereUniqueWithoutTargetInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutTargetInput | ReviewUpdateManyWithWhereWithoutTargetInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type UserBalanceUpdateOneWithoutUserNestedInput = {
    create?: XOR<UserBalanceCreateWithoutUserInput, UserBalanceUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserBalanceCreateOrConnectWithoutUserInput
    upsert?: UserBalanceUpsertWithoutUserInput
    disconnect?: UserBalanceWhereInput | boolean
    delete?: UserBalanceWhereInput | boolean
    connect?: UserBalanceWhereUniqueInput
    update?: XOR<XOR<UserBalanceUpdateToOneWithWhereWithoutUserInput, UserBalanceUpdateWithoutUserInput>, UserBalanceUncheckedUpdateWithoutUserInput>
  }

  export type ExchangerSettingsUpdateOneWithoutUserNestedInput = {
    create?: XOR<ExchangerSettingsCreateWithoutUserInput, ExchangerSettingsUncheckedCreateWithoutUserInput>
    connectOrCreate?: ExchangerSettingsCreateOrConnectWithoutUserInput
    upsert?: ExchangerSettingsUpsertWithoutUserInput
    disconnect?: ExchangerSettingsWhereInput | boolean
    delete?: ExchangerSettingsWhereInput | boolean
    connect?: ExchangerSettingsWhereUniqueInput
    update?: XOR<XOR<ExchangerSettingsUpdateToOneWithWhereWithoutUserInput, ExchangerSettingsUpdateWithoutUserInput>, ExchangerSettingsUncheckedUpdateWithoutUserInput>
  }

  export type BalanceHoldUpdateManyWithoutUserNestedInput = {
    create?: XOR<BalanceHoldCreateWithoutUserInput, BalanceHoldUncheckedCreateWithoutUserInput> | BalanceHoldCreateWithoutUserInput[] | BalanceHoldUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BalanceHoldCreateOrConnectWithoutUserInput | BalanceHoldCreateOrConnectWithoutUserInput[]
    upsert?: BalanceHoldUpsertWithWhereUniqueWithoutUserInput | BalanceHoldUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: BalanceHoldCreateManyUserInputEnvelope
    set?: BalanceHoldWhereUniqueInput | BalanceHoldWhereUniqueInput[]
    disconnect?: BalanceHoldWhereUniqueInput | BalanceHoldWhereUniqueInput[]
    delete?: BalanceHoldWhereUniqueInput | BalanceHoldWhereUniqueInput[]
    connect?: BalanceHoldWhereUniqueInput | BalanceHoldWhereUniqueInput[]
    update?: BalanceHoldUpdateWithWhereUniqueWithoutUserInput | BalanceHoldUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: BalanceHoldUpdateManyWithWhereWithoutUserInput | BalanceHoldUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: BalanceHoldScalarWhereInput | BalanceHoldScalarWhereInput[]
  }

  export type ExchangeListingUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ExchangeListingCreateWithoutUserInput, ExchangeListingUncheckedCreateWithoutUserInput> | ExchangeListingCreateWithoutUserInput[] | ExchangeListingUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ExchangeListingCreateOrConnectWithoutUserInput | ExchangeListingCreateOrConnectWithoutUserInput[]
    upsert?: ExchangeListingUpsertWithWhereUniqueWithoutUserInput | ExchangeListingUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ExchangeListingCreateManyUserInputEnvelope
    set?: ExchangeListingWhereUniqueInput | ExchangeListingWhereUniqueInput[]
    disconnect?: ExchangeListingWhereUniqueInput | ExchangeListingWhereUniqueInput[]
    delete?: ExchangeListingWhereUniqueInput | ExchangeListingWhereUniqueInput[]
    connect?: ExchangeListingWhereUniqueInput | ExchangeListingWhereUniqueInput[]
    update?: ExchangeListingUpdateWithWhereUniqueWithoutUserInput | ExchangeListingUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ExchangeListingUpdateManyWithWhereWithoutUserInput | ExchangeListingUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ExchangeListingScalarWhereInput | ExchangeListingScalarWhereInput[]
  }

  export type ExchangeOfferUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ExchangeOfferCreateWithoutUserInput, ExchangeOfferUncheckedCreateWithoutUserInput> | ExchangeOfferCreateWithoutUserInput[] | ExchangeOfferUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ExchangeOfferCreateOrConnectWithoutUserInput | ExchangeOfferCreateOrConnectWithoutUserInput[]
    upsert?: ExchangeOfferUpsertWithWhereUniqueWithoutUserInput | ExchangeOfferUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ExchangeOfferCreateManyUserInputEnvelope
    set?: ExchangeOfferWhereUniqueInput | ExchangeOfferWhereUniqueInput[]
    disconnect?: ExchangeOfferWhereUniqueInput | ExchangeOfferWhereUniqueInput[]
    delete?: ExchangeOfferWhereUniqueInput | ExchangeOfferWhereUniqueInput[]
    connect?: ExchangeOfferWhereUniqueInput | ExchangeOfferWhereUniqueInput[]
    update?: ExchangeOfferUpdateWithWhereUniqueWithoutUserInput | ExchangeOfferUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ExchangeOfferUpdateManyWithWhereWithoutUserInput | ExchangeOfferUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ExchangeOfferScalarWhereInput | ExchangeOfferScalarWhereInput[]
  }

  export type ExchangeTransactionUncheckedUpdateManyWithoutExchangerNestedInput = {
    create?: XOR<ExchangeTransactionCreateWithoutExchangerInput, ExchangeTransactionUncheckedCreateWithoutExchangerInput> | ExchangeTransactionCreateWithoutExchangerInput[] | ExchangeTransactionUncheckedCreateWithoutExchangerInput[]
    connectOrCreate?: ExchangeTransactionCreateOrConnectWithoutExchangerInput | ExchangeTransactionCreateOrConnectWithoutExchangerInput[]
    upsert?: ExchangeTransactionUpsertWithWhereUniqueWithoutExchangerInput | ExchangeTransactionUpsertWithWhereUniqueWithoutExchangerInput[]
    createMany?: ExchangeTransactionCreateManyExchangerInputEnvelope
    set?: ExchangeTransactionWhereUniqueInput | ExchangeTransactionWhereUniqueInput[]
    disconnect?: ExchangeTransactionWhereUniqueInput | ExchangeTransactionWhereUniqueInput[]
    delete?: ExchangeTransactionWhereUniqueInput | ExchangeTransactionWhereUniqueInput[]
    connect?: ExchangeTransactionWhereUniqueInput | ExchangeTransactionWhereUniqueInput[]
    update?: ExchangeTransactionUpdateWithWhereUniqueWithoutExchangerInput | ExchangeTransactionUpdateWithWhereUniqueWithoutExchangerInput[]
    updateMany?: ExchangeTransactionUpdateManyWithWhereWithoutExchangerInput | ExchangeTransactionUpdateManyWithWhereWithoutExchangerInput[]
    deleteMany?: ExchangeTransactionScalarWhereInput | ExchangeTransactionScalarWhereInput[]
  }

  export type ExchangeTransactionUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<ExchangeTransactionCreateWithoutCustomerInput, ExchangeTransactionUncheckedCreateWithoutCustomerInput> | ExchangeTransactionCreateWithoutCustomerInput[] | ExchangeTransactionUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: ExchangeTransactionCreateOrConnectWithoutCustomerInput | ExchangeTransactionCreateOrConnectWithoutCustomerInput[]
    upsert?: ExchangeTransactionUpsertWithWhereUniqueWithoutCustomerInput | ExchangeTransactionUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: ExchangeTransactionCreateManyCustomerInputEnvelope
    set?: ExchangeTransactionWhereUniqueInput | ExchangeTransactionWhereUniqueInput[]
    disconnect?: ExchangeTransactionWhereUniqueInput | ExchangeTransactionWhereUniqueInput[]
    delete?: ExchangeTransactionWhereUniqueInput | ExchangeTransactionWhereUniqueInput[]
    connect?: ExchangeTransactionWhereUniqueInput | ExchangeTransactionWhereUniqueInput[]
    update?: ExchangeTransactionUpdateWithWhereUniqueWithoutCustomerInput | ExchangeTransactionUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: ExchangeTransactionUpdateManyWithWhereWithoutCustomerInput | ExchangeTransactionUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: ExchangeTransactionScalarWhereInput | ExchangeTransactionScalarWhereInput[]
  }

  export type DisputeUncheckedUpdateManyWithoutInitiatorNestedInput = {
    create?: XOR<DisputeCreateWithoutInitiatorInput, DisputeUncheckedCreateWithoutInitiatorInput> | DisputeCreateWithoutInitiatorInput[] | DisputeUncheckedCreateWithoutInitiatorInput[]
    connectOrCreate?: DisputeCreateOrConnectWithoutInitiatorInput | DisputeCreateOrConnectWithoutInitiatorInput[]
    upsert?: DisputeUpsertWithWhereUniqueWithoutInitiatorInput | DisputeUpsertWithWhereUniqueWithoutInitiatorInput[]
    createMany?: DisputeCreateManyInitiatorInputEnvelope
    set?: DisputeWhereUniqueInput | DisputeWhereUniqueInput[]
    disconnect?: DisputeWhereUniqueInput | DisputeWhereUniqueInput[]
    delete?: DisputeWhereUniqueInput | DisputeWhereUniqueInput[]
    connect?: DisputeWhereUniqueInput | DisputeWhereUniqueInput[]
    update?: DisputeUpdateWithWhereUniqueWithoutInitiatorInput | DisputeUpdateWithWhereUniqueWithoutInitiatorInput[]
    updateMany?: DisputeUpdateManyWithWhereWithoutInitiatorInput | DisputeUpdateManyWithWhereWithoutInitiatorInput[]
    deleteMany?: DisputeScalarWhereInput | DisputeScalarWhereInput[]
  }

  export type DisputeUncheckedUpdateManyWithoutModeratorNestedInput = {
    create?: XOR<DisputeCreateWithoutModeratorInput, DisputeUncheckedCreateWithoutModeratorInput> | DisputeCreateWithoutModeratorInput[] | DisputeUncheckedCreateWithoutModeratorInput[]
    connectOrCreate?: DisputeCreateOrConnectWithoutModeratorInput | DisputeCreateOrConnectWithoutModeratorInput[]
    upsert?: DisputeUpsertWithWhereUniqueWithoutModeratorInput | DisputeUpsertWithWhereUniqueWithoutModeratorInput[]
    createMany?: DisputeCreateManyModeratorInputEnvelope
    set?: DisputeWhereUniqueInput | DisputeWhereUniqueInput[]
    disconnect?: DisputeWhereUniqueInput | DisputeWhereUniqueInput[]
    delete?: DisputeWhereUniqueInput | DisputeWhereUniqueInput[]
    connect?: DisputeWhereUniqueInput | DisputeWhereUniqueInput[]
    update?: DisputeUpdateWithWhereUniqueWithoutModeratorInput | DisputeUpdateWithWhereUniqueWithoutModeratorInput[]
    updateMany?: DisputeUpdateManyWithWhereWithoutModeratorInput | DisputeUpdateManyWithWhereWithoutModeratorInput[]
    deleteMany?: DisputeScalarWhereInput | DisputeScalarWhereInput[]
  }

  export type ReviewUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<ReviewCreateWithoutAuthorInput, ReviewUncheckedCreateWithoutAuthorInput> | ReviewCreateWithoutAuthorInput[] | ReviewUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutAuthorInput | ReviewCreateOrConnectWithoutAuthorInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutAuthorInput | ReviewUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: ReviewCreateManyAuthorInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutAuthorInput | ReviewUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutAuthorInput | ReviewUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type ReviewUncheckedUpdateManyWithoutTargetNestedInput = {
    create?: XOR<ReviewCreateWithoutTargetInput, ReviewUncheckedCreateWithoutTargetInput> | ReviewCreateWithoutTargetInput[] | ReviewUncheckedCreateWithoutTargetInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutTargetInput | ReviewCreateOrConnectWithoutTargetInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutTargetInput | ReviewUpsertWithWhereUniqueWithoutTargetInput[]
    createMany?: ReviewCreateManyTargetInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutTargetInput | ReviewUpdateWithWhereUniqueWithoutTargetInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutTargetInput | ReviewUpdateManyWithWhereWithoutTargetInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type UserBalanceUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<UserBalanceCreateWithoutUserInput, UserBalanceUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserBalanceCreateOrConnectWithoutUserInput
    upsert?: UserBalanceUpsertWithoutUserInput
    disconnect?: UserBalanceWhereInput | boolean
    delete?: UserBalanceWhereInput | boolean
    connect?: UserBalanceWhereUniqueInput
    update?: XOR<XOR<UserBalanceUpdateToOneWithWhereWithoutUserInput, UserBalanceUpdateWithoutUserInput>, UserBalanceUncheckedUpdateWithoutUserInput>
  }

  export type ExchangerSettingsUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<ExchangerSettingsCreateWithoutUserInput, ExchangerSettingsUncheckedCreateWithoutUserInput>
    connectOrCreate?: ExchangerSettingsCreateOrConnectWithoutUserInput
    upsert?: ExchangerSettingsUpsertWithoutUserInput
    disconnect?: ExchangerSettingsWhereInput | boolean
    delete?: ExchangerSettingsWhereInput | boolean
    connect?: ExchangerSettingsWhereUniqueInput
    update?: XOR<XOR<ExchangerSettingsUpdateToOneWithWhereWithoutUserInput, ExchangerSettingsUpdateWithoutUserInput>, ExchangerSettingsUncheckedUpdateWithoutUserInput>
  }

  export type BalanceHoldUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<BalanceHoldCreateWithoutUserInput, BalanceHoldUncheckedCreateWithoutUserInput> | BalanceHoldCreateWithoutUserInput[] | BalanceHoldUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BalanceHoldCreateOrConnectWithoutUserInput | BalanceHoldCreateOrConnectWithoutUserInput[]
    upsert?: BalanceHoldUpsertWithWhereUniqueWithoutUserInput | BalanceHoldUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: BalanceHoldCreateManyUserInputEnvelope
    set?: BalanceHoldWhereUniqueInput | BalanceHoldWhereUniqueInput[]
    disconnect?: BalanceHoldWhereUniqueInput | BalanceHoldWhereUniqueInput[]
    delete?: BalanceHoldWhereUniqueInput | BalanceHoldWhereUniqueInput[]
    connect?: BalanceHoldWhereUniqueInput | BalanceHoldWhereUniqueInput[]
    update?: BalanceHoldUpdateWithWhereUniqueWithoutUserInput | BalanceHoldUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: BalanceHoldUpdateManyWithWhereWithoutUserInput | BalanceHoldUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: BalanceHoldScalarWhereInput | BalanceHoldScalarWhereInput[]
  }

  export type ExchangeListingCreatepaymentMethodsInput = {
    set: $Enums.PaymentMethod[]
  }

  export type UserCreateNestedOneWithoutListingsInput = {
    create?: XOR<UserCreateWithoutListingsInput, UserUncheckedCreateWithoutListingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutListingsInput
    connect?: UserWhereUniqueInput
  }

  export type ExchangeOfferCreateNestedManyWithoutListingInput = {
    create?: XOR<ExchangeOfferCreateWithoutListingInput, ExchangeOfferUncheckedCreateWithoutListingInput> | ExchangeOfferCreateWithoutListingInput[] | ExchangeOfferUncheckedCreateWithoutListingInput[]
    connectOrCreate?: ExchangeOfferCreateOrConnectWithoutListingInput | ExchangeOfferCreateOrConnectWithoutListingInput[]
    createMany?: ExchangeOfferCreateManyListingInputEnvelope
    connect?: ExchangeOfferWhereUniqueInput | ExchangeOfferWhereUniqueInput[]
  }

  export type ExchangeTransactionCreateNestedManyWithoutListingInput = {
    create?: XOR<ExchangeTransactionCreateWithoutListingInput, ExchangeTransactionUncheckedCreateWithoutListingInput> | ExchangeTransactionCreateWithoutListingInput[] | ExchangeTransactionUncheckedCreateWithoutListingInput[]
    connectOrCreate?: ExchangeTransactionCreateOrConnectWithoutListingInput | ExchangeTransactionCreateOrConnectWithoutListingInput[]
    createMany?: ExchangeTransactionCreateManyListingInputEnvelope
    connect?: ExchangeTransactionWhereUniqueInput | ExchangeTransactionWhereUniqueInput[]
  }

  export type ExchangeOfferUncheckedCreateNestedManyWithoutListingInput = {
    create?: XOR<ExchangeOfferCreateWithoutListingInput, ExchangeOfferUncheckedCreateWithoutListingInput> | ExchangeOfferCreateWithoutListingInput[] | ExchangeOfferUncheckedCreateWithoutListingInput[]
    connectOrCreate?: ExchangeOfferCreateOrConnectWithoutListingInput | ExchangeOfferCreateOrConnectWithoutListingInput[]
    createMany?: ExchangeOfferCreateManyListingInputEnvelope
    connect?: ExchangeOfferWhereUniqueInput | ExchangeOfferWhereUniqueInput[]
  }

  export type ExchangeTransactionUncheckedCreateNestedManyWithoutListingInput = {
    create?: XOR<ExchangeTransactionCreateWithoutListingInput, ExchangeTransactionUncheckedCreateWithoutListingInput> | ExchangeTransactionCreateWithoutListingInput[] | ExchangeTransactionUncheckedCreateWithoutListingInput[]
    connectOrCreate?: ExchangeTransactionCreateOrConnectWithoutListingInput | ExchangeTransactionCreateOrConnectWithoutListingInput[]
    createMany?: ExchangeTransactionCreateManyListingInputEnvelope
    connect?: ExchangeTransactionWhereUniqueInput | ExchangeTransactionWhereUniqueInput[]
  }

  export type EnumExchangeTypeFieldUpdateOperationsInput = {
    set?: $Enums.ExchangeType
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ExchangeListingUpdatepaymentMethodsInput = {
    set?: $Enums.PaymentMethod[]
    push?: $Enums.PaymentMethod | $Enums.PaymentMethod[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type UserUpdateOneRequiredWithoutListingsNestedInput = {
    create?: XOR<UserCreateWithoutListingsInput, UserUncheckedCreateWithoutListingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutListingsInput
    upsert?: UserUpsertWithoutListingsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutListingsInput, UserUpdateWithoutListingsInput>, UserUncheckedUpdateWithoutListingsInput>
  }

  export type ExchangeOfferUpdateManyWithoutListingNestedInput = {
    create?: XOR<ExchangeOfferCreateWithoutListingInput, ExchangeOfferUncheckedCreateWithoutListingInput> | ExchangeOfferCreateWithoutListingInput[] | ExchangeOfferUncheckedCreateWithoutListingInput[]
    connectOrCreate?: ExchangeOfferCreateOrConnectWithoutListingInput | ExchangeOfferCreateOrConnectWithoutListingInput[]
    upsert?: ExchangeOfferUpsertWithWhereUniqueWithoutListingInput | ExchangeOfferUpsertWithWhereUniqueWithoutListingInput[]
    createMany?: ExchangeOfferCreateManyListingInputEnvelope
    set?: ExchangeOfferWhereUniqueInput | ExchangeOfferWhereUniqueInput[]
    disconnect?: ExchangeOfferWhereUniqueInput | ExchangeOfferWhereUniqueInput[]
    delete?: ExchangeOfferWhereUniqueInput | ExchangeOfferWhereUniqueInput[]
    connect?: ExchangeOfferWhereUniqueInput | ExchangeOfferWhereUniqueInput[]
    update?: ExchangeOfferUpdateWithWhereUniqueWithoutListingInput | ExchangeOfferUpdateWithWhereUniqueWithoutListingInput[]
    updateMany?: ExchangeOfferUpdateManyWithWhereWithoutListingInput | ExchangeOfferUpdateManyWithWhereWithoutListingInput[]
    deleteMany?: ExchangeOfferScalarWhereInput | ExchangeOfferScalarWhereInput[]
  }

  export type ExchangeTransactionUpdateManyWithoutListingNestedInput = {
    create?: XOR<ExchangeTransactionCreateWithoutListingInput, ExchangeTransactionUncheckedCreateWithoutListingInput> | ExchangeTransactionCreateWithoutListingInput[] | ExchangeTransactionUncheckedCreateWithoutListingInput[]
    connectOrCreate?: ExchangeTransactionCreateOrConnectWithoutListingInput | ExchangeTransactionCreateOrConnectWithoutListingInput[]
    upsert?: ExchangeTransactionUpsertWithWhereUniqueWithoutListingInput | ExchangeTransactionUpsertWithWhereUniqueWithoutListingInput[]
    createMany?: ExchangeTransactionCreateManyListingInputEnvelope
    set?: ExchangeTransactionWhereUniqueInput | ExchangeTransactionWhereUniqueInput[]
    disconnect?: ExchangeTransactionWhereUniqueInput | ExchangeTransactionWhereUniqueInput[]
    delete?: ExchangeTransactionWhereUniqueInput | ExchangeTransactionWhereUniqueInput[]
    connect?: ExchangeTransactionWhereUniqueInput | ExchangeTransactionWhereUniqueInput[]
    update?: ExchangeTransactionUpdateWithWhereUniqueWithoutListingInput | ExchangeTransactionUpdateWithWhereUniqueWithoutListingInput[]
    updateMany?: ExchangeTransactionUpdateManyWithWhereWithoutListingInput | ExchangeTransactionUpdateManyWithWhereWithoutListingInput[]
    deleteMany?: ExchangeTransactionScalarWhereInput | ExchangeTransactionScalarWhereInput[]
  }

  export type ExchangeOfferUncheckedUpdateManyWithoutListingNestedInput = {
    create?: XOR<ExchangeOfferCreateWithoutListingInput, ExchangeOfferUncheckedCreateWithoutListingInput> | ExchangeOfferCreateWithoutListingInput[] | ExchangeOfferUncheckedCreateWithoutListingInput[]
    connectOrCreate?: ExchangeOfferCreateOrConnectWithoutListingInput | ExchangeOfferCreateOrConnectWithoutListingInput[]
    upsert?: ExchangeOfferUpsertWithWhereUniqueWithoutListingInput | ExchangeOfferUpsertWithWhereUniqueWithoutListingInput[]
    createMany?: ExchangeOfferCreateManyListingInputEnvelope
    set?: ExchangeOfferWhereUniqueInput | ExchangeOfferWhereUniqueInput[]
    disconnect?: ExchangeOfferWhereUniqueInput | ExchangeOfferWhereUniqueInput[]
    delete?: ExchangeOfferWhereUniqueInput | ExchangeOfferWhereUniqueInput[]
    connect?: ExchangeOfferWhereUniqueInput | ExchangeOfferWhereUniqueInput[]
    update?: ExchangeOfferUpdateWithWhereUniqueWithoutListingInput | ExchangeOfferUpdateWithWhereUniqueWithoutListingInput[]
    updateMany?: ExchangeOfferUpdateManyWithWhereWithoutListingInput | ExchangeOfferUpdateManyWithWhereWithoutListingInput[]
    deleteMany?: ExchangeOfferScalarWhereInput | ExchangeOfferScalarWhereInput[]
  }

  export type ExchangeTransactionUncheckedUpdateManyWithoutListingNestedInput = {
    create?: XOR<ExchangeTransactionCreateWithoutListingInput, ExchangeTransactionUncheckedCreateWithoutListingInput> | ExchangeTransactionCreateWithoutListingInput[] | ExchangeTransactionUncheckedCreateWithoutListingInput[]
    connectOrCreate?: ExchangeTransactionCreateOrConnectWithoutListingInput | ExchangeTransactionCreateOrConnectWithoutListingInput[]
    upsert?: ExchangeTransactionUpsertWithWhereUniqueWithoutListingInput | ExchangeTransactionUpsertWithWhereUniqueWithoutListingInput[]
    createMany?: ExchangeTransactionCreateManyListingInputEnvelope
    set?: ExchangeTransactionWhereUniqueInput | ExchangeTransactionWhereUniqueInput[]
    disconnect?: ExchangeTransactionWhereUniqueInput | ExchangeTransactionWhereUniqueInput[]
    delete?: ExchangeTransactionWhereUniqueInput | ExchangeTransactionWhereUniqueInput[]
    connect?: ExchangeTransactionWhereUniqueInput | ExchangeTransactionWhereUniqueInput[]
    update?: ExchangeTransactionUpdateWithWhereUniqueWithoutListingInput | ExchangeTransactionUpdateWithWhereUniqueWithoutListingInput[]
    updateMany?: ExchangeTransactionUpdateManyWithWhereWithoutListingInput | ExchangeTransactionUpdateManyWithWhereWithoutListingInput[]
    deleteMany?: ExchangeTransactionScalarWhereInput | ExchangeTransactionScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutOffersInput = {
    create?: XOR<UserCreateWithoutOffersInput, UserUncheckedCreateWithoutOffersInput>
    connectOrCreate?: UserCreateOrConnectWithoutOffersInput
    connect?: UserWhereUniqueInput
  }

  export type ExchangeListingCreateNestedOneWithoutOffersInput = {
    create?: XOR<ExchangeListingCreateWithoutOffersInput, ExchangeListingUncheckedCreateWithoutOffersInput>
    connectOrCreate?: ExchangeListingCreateOrConnectWithoutOffersInput
    connect?: ExchangeListingWhereUniqueInput
  }

  export type ExchangeTransactionCreateNestedOneWithoutOfferInput = {
    create?: XOR<ExchangeTransactionCreateWithoutOfferInput, ExchangeTransactionUncheckedCreateWithoutOfferInput>
    connectOrCreate?: ExchangeTransactionCreateOrConnectWithoutOfferInput
    connect?: ExchangeTransactionWhereUniqueInput
  }

  export type ExchangeTransactionUncheckedCreateNestedOneWithoutOfferInput = {
    create?: XOR<ExchangeTransactionCreateWithoutOfferInput, ExchangeTransactionUncheckedCreateWithoutOfferInput>
    connectOrCreate?: ExchangeTransactionCreateOrConnectWithoutOfferInput
    connect?: ExchangeTransactionWhereUniqueInput
  }

  export type EnumOfferStatusFieldUpdateOperationsInput = {
    set?: $Enums.OfferStatus
  }

  export type UserUpdateOneRequiredWithoutOffersNestedInput = {
    create?: XOR<UserCreateWithoutOffersInput, UserUncheckedCreateWithoutOffersInput>
    connectOrCreate?: UserCreateOrConnectWithoutOffersInput
    upsert?: UserUpsertWithoutOffersInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutOffersInput, UserUpdateWithoutOffersInput>, UserUncheckedUpdateWithoutOffersInput>
  }

  export type ExchangeListingUpdateOneRequiredWithoutOffersNestedInput = {
    create?: XOR<ExchangeListingCreateWithoutOffersInput, ExchangeListingUncheckedCreateWithoutOffersInput>
    connectOrCreate?: ExchangeListingCreateOrConnectWithoutOffersInput
    upsert?: ExchangeListingUpsertWithoutOffersInput
    connect?: ExchangeListingWhereUniqueInput
    update?: XOR<XOR<ExchangeListingUpdateToOneWithWhereWithoutOffersInput, ExchangeListingUpdateWithoutOffersInput>, ExchangeListingUncheckedUpdateWithoutOffersInput>
  }

  export type ExchangeTransactionUpdateOneWithoutOfferNestedInput = {
    create?: XOR<ExchangeTransactionCreateWithoutOfferInput, ExchangeTransactionUncheckedCreateWithoutOfferInput>
    connectOrCreate?: ExchangeTransactionCreateOrConnectWithoutOfferInput
    upsert?: ExchangeTransactionUpsertWithoutOfferInput
    disconnect?: ExchangeTransactionWhereInput | boolean
    delete?: ExchangeTransactionWhereInput | boolean
    connect?: ExchangeTransactionWhereUniqueInput
    update?: XOR<XOR<ExchangeTransactionUpdateToOneWithWhereWithoutOfferInput, ExchangeTransactionUpdateWithoutOfferInput>, ExchangeTransactionUncheckedUpdateWithoutOfferInput>
  }

  export type ExchangeTransactionUncheckedUpdateOneWithoutOfferNestedInput = {
    create?: XOR<ExchangeTransactionCreateWithoutOfferInput, ExchangeTransactionUncheckedCreateWithoutOfferInput>
    connectOrCreate?: ExchangeTransactionCreateOrConnectWithoutOfferInput
    upsert?: ExchangeTransactionUpsertWithoutOfferInput
    disconnect?: ExchangeTransactionWhereInput | boolean
    delete?: ExchangeTransactionWhereInput | boolean
    connect?: ExchangeTransactionWhereUniqueInput
    update?: XOR<XOR<ExchangeTransactionUpdateToOneWithWhereWithoutOfferInput, ExchangeTransactionUpdateWithoutOfferInput>, ExchangeTransactionUncheckedUpdateWithoutOfferInput>
  }

  export type ExchangeOfferCreateNestedOneWithoutTransactionInput = {
    create?: XOR<ExchangeOfferCreateWithoutTransactionInput, ExchangeOfferUncheckedCreateWithoutTransactionInput>
    connectOrCreate?: ExchangeOfferCreateOrConnectWithoutTransactionInput
    connect?: ExchangeOfferWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutCustomerTransactionsInput = {
    create?: XOR<UserCreateWithoutCustomerTransactionsInput, UserUncheckedCreateWithoutCustomerTransactionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCustomerTransactionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutExchangerTransactionsInput = {
    create?: XOR<UserCreateWithoutExchangerTransactionsInput, UserUncheckedCreateWithoutExchangerTransactionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutExchangerTransactionsInput
    connect?: UserWhereUniqueInput
  }

  export type ExchangeListingCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<ExchangeListingCreateWithoutTransactionsInput, ExchangeListingUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: ExchangeListingCreateOrConnectWithoutTransactionsInput
    connect?: ExchangeListingWhereUniqueInput
  }

  export type DisputeCreateNestedOneWithoutTransactionInput = {
    create?: XOR<DisputeCreateWithoutTransactionInput, DisputeUncheckedCreateWithoutTransactionInput>
    connectOrCreate?: DisputeCreateOrConnectWithoutTransactionInput
    connect?: DisputeWhereUniqueInput
  }

  export type ReviewCreateNestedOneWithoutTransactionInput = {
    create?: XOR<ReviewCreateWithoutTransactionInput, ReviewUncheckedCreateWithoutTransactionInput>
    connectOrCreate?: ReviewCreateOrConnectWithoutTransactionInput
    connect?: ReviewWhereUniqueInput
  }

  export type DisputeUncheckedCreateNestedOneWithoutTransactionInput = {
    create?: XOR<DisputeCreateWithoutTransactionInput, DisputeUncheckedCreateWithoutTransactionInput>
    connectOrCreate?: DisputeCreateOrConnectWithoutTransactionInput
    connect?: DisputeWhereUniqueInput
  }

  export type ReviewUncheckedCreateNestedOneWithoutTransactionInput = {
    create?: XOR<ReviewCreateWithoutTransactionInput, ReviewUncheckedCreateWithoutTransactionInput>
    connectOrCreate?: ReviewCreateOrConnectWithoutTransactionInput
    connect?: ReviewWhereUniqueInput
  }

  export type EnumTransactionStatusFieldUpdateOperationsInput = {
    set?: $Enums.TransactionStatus
  }

  export type ExchangeOfferUpdateOneWithoutTransactionNestedInput = {
    create?: XOR<ExchangeOfferCreateWithoutTransactionInput, ExchangeOfferUncheckedCreateWithoutTransactionInput>
    connectOrCreate?: ExchangeOfferCreateOrConnectWithoutTransactionInput
    upsert?: ExchangeOfferUpsertWithoutTransactionInput
    disconnect?: ExchangeOfferWhereInput | boolean
    delete?: ExchangeOfferWhereInput | boolean
    connect?: ExchangeOfferWhereUniqueInput
    update?: XOR<XOR<ExchangeOfferUpdateToOneWithWhereWithoutTransactionInput, ExchangeOfferUpdateWithoutTransactionInput>, ExchangeOfferUncheckedUpdateWithoutTransactionInput>
  }

  export type UserUpdateOneRequiredWithoutCustomerTransactionsNestedInput = {
    create?: XOR<UserCreateWithoutCustomerTransactionsInput, UserUncheckedCreateWithoutCustomerTransactionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCustomerTransactionsInput
    upsert?: UserUpsertWithoutCustomerTransactionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCustomerTransactionsInput, UserUpdateWithoutCustomerTransactionsInput>, UserUncheckedUpdateWithoutCustomerTransactionsInput>
  }

  export type UserUpdateOneRequiredWithoutExchangerTransactionsNestedInput = {
    create?: XOR<UserCreateWithoutExchangerTransactionsInput, UserUncheckedCreateWithoutExchangerTransactionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutExchangerTransactionsInput
    upsert?: UserUpsertWithoutExchangerTransactionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutExchangerTransactionsInput, UserUpdateWithoutExchangerTransactionsInput>, UserUncheckedUpdateWithoutExchangerTransactionsInput>
  }

  export type ExchangeListingUpdateOneRequiredWithoutTransactionsNestedInput = {
    create?: XOR<ExchangeListingCreateWithoutTransactionsInput, ExchangeListingUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: ExchangeListingCreateOrConnectWithoutTransactionsInput
    upsert?: ExchangeListingUpsertWithoutTransactionsInput
    connect?: ExchangeListingWhereUniqueInput
    update?: XOR<XOR<ExchangeListingUpdateToOneWithWhereWithoutTransactionsInput, ExchangeListingUpdateWithoutTransactionsInput>, ExchangeListingUncheckedUpdateWithoutTransactionsInput>
  }

  export type DisputeUpdateOneWithoutTransactionNestedInput = {
    create?: XOR<DisputeCreateWithoutTransactionInput, DisputeUncheckedCreateWithoutTransactionInput>
    connectOrCreate?: DisputeCreateOrConnectWithoutTransactionInput
    upsert?: DisputeUpsertWithoutTransactionInput
    disconnect?: DisputeWhereInput | boolean
    delete?: DisputeWhereInput | boolean
    connect?: DisputeWhereUniqueInput
    update?: XOR<XOR<DisputeUpdateToOneWithWhereWithoutTransactionInput, DisputeUpdateWithoutTransactionInput>, DisputeUncheckedUpdateWithoutTransactionInput>
  }

  export type ReviewUpdateOneWithoutTransactionNestedInput = {
    create?: XOR<ReviewCreateWithoutTransactionInput, ReviewUncheckedCreateWithoutTransactionInput>
    connectOrCreate?: ReviewCreateOrConnectWithoutTransactionInput
    upsert?: ReviewUpsertWithoutTransactionInput
    disconnect?: ReviewWhereInput | boolean
    delete?: ReviewWhereInput | boolean
    connect?: ReviewWhereUniqueInput
    update?: XOR<XOR<ReviewUpdateToOneWithWhereWithoutTransactionInput, ReviewUpdateWithoutTransactionInput>, ReviewUncheckedUpdateWithoutTransactionInput>
  }

  export type DisputeUncheckedUpdateOneWithoutTransactionNestedInput = {
    create?: XOR<DisputeCreateWithoutTransactionInput, DisputeUncheckedCreateWithoutTransactionInput>
    connectOrCreate?: DisputeCreateOrConnectWithoutTransactionInput
    upsert?: DisputeUpsertWithoutTransactionInput
    disconnect?: DisputeWhereInput | boolean
    delete?: DisputeWhereInput | boolean
    connect?: DisputeWhereUniqueInput
    update?: XOR<XOR<DisputeUpdateToOneWithWhereWithoutTransactionInput, DisputeUpdateWithoutTransactionInput>, DisputeUncheckedUpdateWithoutTransactionInput>
  }

  export type ReviewUncheckedUpdateOneWithoutTransactionNestedInput = {
    create?: XOR<ReviewCreateWithoutTransactionInput, ReviewUncheckedCreateWithoutTransactionInput>
    connectOrCreate?: ReviewCreateOrConnectWithoutTransactionInput
    upsert?: ReviewUpsertWithoutTransactionInput
    disconnect?: ReviewWhereInput | boolean
    delete?: ReviewWhereInput | boolean
    connect?: ReviewWhereUniqueInput
    update?: XOR<XOR<ReviewUpdateToOneWithWhereWithoutTransactionInput, ReviewUpdateWithoutTransactionInput>, ReviewUncheckedUpdateWithoutTransactionInput>
  }

  export type ExchangeTransactionCreateNestedOneWithoutDisputeInput = {
    create?: XOR<ExchangeTransactionCreateWithoutDisputeInput, ExchangeTransactionUncheckedCreateWithoutDisputeInput>
    connectOrCreate?: ExchangeTransactionCreateOrConnectWithoutDisputeInput
    connect?: ExchangeTransactionWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutDisputesInitiatedInput = {
    create?: XOR<UserCreateWithoutDisputesInitiatedInput, UserUncheckedCreateWithoutDisputesInitiatedInput>
    connectOrCreate?: UserCreateOrConnectWithoutDisputesInitiatedInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutDisputesModeratedInput = {
    create?: XOR<UserCreateWithoutDisputesModeratedInput, UserUncheckedCreateWithoutDisputesModeratedInput>
    connectOrCreate?: UserCreateOrConnectWithoutDisputesModeratedInput
    connect?: UserWhereUniqueInput
  }

  export type EnumDisputeStatusFieldUpdateOperationsInput = {
    set?: $Enums.DisputeStatus
  }

  export type ExchangeTransactionUpdateOneRequiredWithoutDisputeNestedInput = {
    create?: XOR<ExchangeTransactionCreateWithoutDisputeInput, ExchangeTransactionUncheckedCreateWithoutDisputeInput>
    connectOrCreate?: ExchangeTransactionCreateOrConnectWithoutDisputeInput
    upsert?: ExchangeTransactionUpsertWithoutDisputeInput
    connect?: ExchangeTransactionWhereUniqueInput
    update?: XOR<XOR<ExchangeTransactionUpdateToOneWithWhereWithoutDisputeInput, ExchangeTransactionUpdateWithoutDisputeInput>, ExchangeTransactionUncheckedUpdateWithoutDisputeInput>
  }

  export type UserUpdateOneRequiredWithoutDisputesInitiatedNestedInput = {
    create?: XOR<UserCreateWithoutDisputesInitiatedInput, UserUncheckedCreateWithoutDisputesInitiatedInput>
    connectOrCreate?: UserCreateOrConnectWithoutDisputesInitiatedInput
    upsert?: UserUpsertWithoutDisputesInitiatedInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDisputesInitiatedInput, UserUpdateWithoutDisputesInitiatedInput>, UserUncheckedUpdateWithoutDisputesInitiatedInput>
  }

  export type UserUpdateOneWithoutDisputesModeratedNestedInput = {
    create?: XOR<UserCreateWithoutDisputesModeratedInput, UserUncheckedCreateWithoutDisputesModeratedInput>
    connectOrCreate?: UserCreateOrConnectWithoutDisputesModeratedInput
    upsert?: UserUpsertWithoutDisputesModeratedInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDisputesModeratedInput, UserUpdateWithoutDisputesModeratedInput>, UserUncheckedUpdateWithoutDisputesModeratedInput>
  }

  export type ExchangeTransactionCreateNestedOneWithoutReviewInput = {
    create?: XOR<ExchangeTransactionCreateWithoutReviewInput, ExchangeTransactionUncheckedCreateWithoutReviewInput>
    connectOrCreate?: ExchangeTransactionCreateOrConnectWithoutReviewInput
    connect?: ExchangeTransactionWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutReviewsWrittenInput = {
    create?: XOR<UserCreateWithoutReviewsWrittenInput, UserUncheckedCreateWithoutReviewsWrittenInput>
    connectOrCreate?: UserCreateOrConnectWithoutReviewsWrittenInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutReviewsReceivedInput = {
    create?: XOR<UserCreateWithoutReviewsReceivedInput, UserUncheckedCreateWithoutReviewsReceivedInput>
    connectOrCreate?: UserCreateOrConnectWithoutReviewsReceivedInput
    connect?: UserWhereUniqueInput
  }

  export type ExchangeTransactionUpdateOneRequiredWithoutReviewNestedInput = {
    create?: XOR<ExchangeTransactionCreateWithoutReviewInput, ExchangeTransactionUncheckedCreateWithoutReviewInput>
    connectOrCreate?: ExchangeTransactionCreateOrConnectWithoutReviewInput
    upsert?: ExchangeTransactionUpsertWithoutReviewInput
    connect?: ExchangeTransactionWhereUniqueInput
    update?: XOR<XOR<ExchangeTransactionUpdateToOneWithWhereWithoutReviewInput, ExchangeTransactionUpdateWithoutReviewInput>, ExchangeTransactionUncheckedUpdateWithoutReviewInput>
  }

  export type UserUpdateOneRequiredWithoutReviewsWrittenNestedInput = {
    create?: XOR<UserCreateWithoutReviewsWrittenInput, UserUncheckedCreateWithoutReviewsWrittenInput>
    connectOrCreate?: UserCreateOrConnectWithoutReviewsWrittenInput
    upsert?: UserUpsertWithoutReviewsWrittenInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReviewsWrittenInput, UserUpdateWithoutReviewsWrittenInput>, UserUncheckedUpdateWithoutReviewsWrittenInput>
  }

  export type UserUpdateOneRequiredWithoutReviewsReceivedNestedInput = {
    create?: XOR<UserCreateWithoutReviewsReceivedInput, UserUncheckedCreateWithoutReviewsReceivedInput>
    connectOrCreate?: UserCreateOrConnectWithoutReviewsReceivedInput
    upsert?: UserUpsertWithoutReviewsReceivedInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReviewsReceivedInput, UserUpdateWithoutReviewsReceivedInput>, UserUncheckedUpdateWithoutReviewsReceivedInput>
  }

  export type UserCreateNestedOneWithoutBalanceInput = {
    create?: XOR<UserCreateWithoutBalanceInput, UserUncheckedCreateWithoutBalanceInput>
    connectOrCreate?: UserCreateOrConnectWithoutBalanceInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutBalanceNestedInput = {
    create?: XOR<UserCreateWithoutBalanceInput, UserUncheckedCreateWithoutBalanceInput>
    connectOrCreate?: UserCreateOrConnectWithoutBalanceInput
    upsert?: UserUpsertWithoutBalanceInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutBalanceInput, UserUpdateWithoutBalanceInput>, UserUncheckedUpdateWithoutBalanceInput>
  }

  export type UserCreateNestedOneWithoutHoldsInput = {
    create?: XOR<UserCreateWithoutHoldsInput, UserUncheckedCreateWithoutHoldsInput>
    connectOrCreate?: UserCreateOrConnectWithoutHoldsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumHoldTypeFieldUpdateOperationsInput = {
    set?: $Enums.HoldType
  }

  export type UserUpdateOneRequiredWithoutHoldsNestedInput = {
    create?: XOR<UserCreateWithoutHoldsInput, UserUncheckedCreateWithoutHoldsInput>
    connectOrCreate?: UserCreateOrConnectWithoutHoldsInput
    upsert?: UserUpsertWithoutHoldsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutHoldsInput, UserUpdateWithoutHoldsInput>, UserUncheckedUpdateWithoutHoldsInput>
  }

  export type ExchangerSettingsCreatepreferredPaymentMethodsInput = {
    set: $Enums.PaymentMethod[]
  }

  export type UserCreateNestedOneWithoutExchangerSettingsInput = {
    create?: XOR<UserCreateWithoutExchangerSettingsInput, UserUncheckedCreateWithoutExchangerSettingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutExchangerSettingsInput
    connect?: UserWhereUniqueInput
  }

  export type ExchangerSettingsUpdatepreferredPaymentMethodsInput = {
    set?: $Enums.PaymentMethod[]
    push?: $Enums.PaymentMethod | $Enums.PaymentMethod[]
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutExchangerSettingsNestedInput = {
    create?: XOR<UserCreateWithoutExchangerSettingsInput, UserUncheckedCreateWithoutExchangerSettingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutExchangerSettingsInput
    upsert?: UserUpsertWithoutExchangerSettingsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutExchangerSettingsInput, UserUpdateWithoutExchangerSettingsInput>, UserUncheckedUpdateWithoutExchangerSettingsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumExchangeTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ExchangeType | EnumExchangeTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ExchangeType[] | ListEnumExchangeTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExchangeType[] | ListEnumExchangeTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumExchangeTypeFilter<$PrismaModel> | $Enums.ExchangeType
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumExchangeTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ExchangeType | EnumExchangeTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ExchangeType[] | ListEnumExchangeTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExchangeType[] | ListEnumExchangeTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumExchangeTypeWithAggregatesFilter<$PrismaModel> | $Enums.ExchangeType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumExchangeTypeFilter<$PrismaModel>
    _max?: NestedEnumExchangeTypeFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedEnumOfferStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OfferStatus | EnumOfferStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OfferStatus[] | ListEnumOfferStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OfferStatus[] | ListEnumOfferStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOfferStatusFilter<$PrismaModel> | $Enums.OfferStatus
  }

  export type NestedEnumOfferStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OfferStatus | EnumOfferStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OfferStatus[] | ListEnumOfferStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OfferStatus[] | ListEnumOfferStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOfferStatusWithAggregatesFilter<$PrismaModel> | $Enums.OfferStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOfferStatusFilter<$PrismaModel>
    _max?: NestedEnumOfferStatusFilter<$PrismaModel>
  }

  export type NestedEnumTransactionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionStatus | EnumTransactionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionStatus[] | ListEnumTransactionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionStatus[] | ListEnumTransactionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionStatusFilter<$PrismaModel> | $Enums.TransactionStatus
  }

  export type NestedEnumTransactionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionStatus | EnumTransactionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionStatus[] | ListEnumTransactionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionStatus[] | ListEnumTransactionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionStatusWithAggregatesFilter<$PrismaModel> | $Enums.TransactionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTransactionStatusFilter<$PrismaModel>
    _max?: NestedEnumTransactionStatusFilter<$PrismaModel>
  }

  export type NestedEnumDisputeStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.DisputeStatus | EnumDisputeStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DisputeStatus[] | ListEnumDisputeStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DisputeStatus[] | ListEnumDisputeStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDisputeStatusFilter<$PrismaModel> | $Enums.DisputeStatus
  }

  export type NestedEnumDisputeStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DisputeStatus | EnumDisputeStatusFieldRefInput<$PrismaModel>
    in?: $Enums.DisputeStatus[] | ListEnumDisputeStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.DisputeStatus[] | ListEnumDisputeStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumDisputeStatusWithAggregatesFilter<$PrismaModel> | $Enums.DisputeStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDisputeStatusFilter<$PrismaModel>
    _max?: NestedEnumDisputeStatusFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumHoldTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.HoldType | EnumHoldTypeFieldRefInput<$PrismaModel>
    in?: $Enums.HoldType[] | ListEnumHoldTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.HoldType[] | ListEnumHoldTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumHoldTypeFilter<$PrismaModel> | $Enums.HoldType
  }

  export type NestedEnumHoldTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.HoldType | EnumHoldTypeFieldRefInput<$PrismaModel>
    in?: $Enums.HoldType[] | ListEnumHoldTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.HoldType[] | ListEnumHoldTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumHoldTypeWithAggregatesFilter<$PrismaModel> | $Enums.HoldType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumHoldTypeFilter<$PrismaModel>
    _max?: NestedEnumHoldTypeFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type ExchangeListingCreateWithoutUserInput = {
    id?: string
    type: $Enums.ExchangeType
    cryptocurrency: string
    fiatCurrency: string
    rate: number
    minAmount: number
    maxAmount: number
    availableAmount: number
    paymentMethods?: ExchangeListingCreatepaymentMethodsInput | $Enums.PaymentMethod[]
    terms?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    offers?: ExchangeOfferCreateNestedManyWithoutListingInput
    transactions?: ExchangeTransactionCreateNestedManyWithoutListingInput
  }

  export type ExchangeListingUncheckedCreateWithoutUserInput = {
    id?: string
    type: $Enums.ExchangeType
    cryptocurrency: string
    fiatCurrency: string
    rate: number
    minAmount: number
    maxAmount: number
    availableAmount: number
    paymentMethods?: ExchangeListingCreatepaymentMethodsInput | $Enums.PaymentMethod[]
    terms?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    offers?: ExchangeOfferUncheckedCreateNestedManyWithoutListingInput
    transactions?: ExchangeTransactionUncheckedCreateNestedManyWithoutListingInput
  }

  export type ExchangeListingCreateOrConnectWithoutUserInput = {
    where: ExchangeListingWhereUniqueInput
    create: XOR<ExchangeListingCreateWithoutUserInput, ExchangeListingUncheckedCreateWithoutUserInput>
  }

  export type ExchangeListingCreateManyUserInputEnvelope = {
    data: ExchangeListingCreateManyUserInput | ExchangeListingCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ExchangeOfferCreateWithoutUserInput = {
    id?: string
    amount: number
    status?: $Enums.OfferStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    listing: ExchangeListingCreateNestedOneWithoutOffersInput
    transaction?: ExchangeTransactionCreateNestedOneWithoutOfferInput
  }

  export type ExchangeOfferUncheckedCreateWithoutUserInput = {
    id?: string
    amount: number
    status?: $Enums.OfferStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    listingId: string
    transaction?: ExchangeTransactionUncheckedCreateNestedOneWithoutOfferInput
  }

  export type ExchangeOfferCreateOrConnectWithoutUserInput = {
    where: ExchangeOfferWhereUniqueInput
    create: XOR<ExchangeOfferCreateWithoutUserInput, ExchangeOfferUncheckedCreateWithoutUserInput>
  }

  export type ExchangeOfferCreateManyUserInputEnvelope = {
    data: ExchangeOfferCreateManyUserInput | ExchangeOfferCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ExchangeTransactionCreateWithoutExchangerInput = {
    id?: string
    type: $Enums.ExchangeType
    status?: $Enums.TransactionStatus
    cryptocurrency: string
    fiatCurrency: string
    cryptoAmount: number
    fiatAmount: number
    paymentProof?: string | null
    disputeId?: string | null
    confirmationDeadline: Date | string
    canCustomerDispute?: boolean
    canExchangerDispute?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    finishedAt?: Date | string | null
    offer?: ExchangeOfferCreateNestedOneWithoutTransactionInput
    customer: UserCreateNestedOneWithoutCustomerTransactionsInput
    listing: ExchangeListingCreateNestedOneWithoutTransactionsInput
    dispute?: DisputeCreateNestedOneWithoutTransactionInput
    review?: ReviewCreateNestedOneWithoutTransactionInput
  }

  export type ExchangeTransactionUncheckedCreateWithoutExchangerInput = {
    id?: string
    type: $Enums.ExchangeType
    status?: $Enums.TransactionStatus
    cryptocurrency: string
    fiatCurrency: string
    cryptoAmount: number
    fiatAmount: number
    paymentProof?: string | null
    disputeId?: string | null
    confirmationDeadline: Date | string
    canCustomerDispute?: boolean
    canExchangerDispute?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    finishedAt?: Date | string | null
    offerId?: string | null
    customerId: string
    listingId: string
    dispute?: DisputeUncheckedCreateNestedOneWithoutTransactionInput
    review?: ReviewUncheckedCreateNestedOneWithoutTransactionInput
  }

  export type ExchangeTransactionCreateOrConnectWithoutExchangerInput = {
    where: ExchangeTransactionWhereUniqueInput
    create: XOR<ExchangeTransactionCreateWithoutExchangerInput, ExchangeTransactionUncheckedCreateWithoutExchangerInput>
  }

  export type ExchangeTransactionCreateManyExchangerInputEnvelope = {
    data: ExchangeTransactionCreateManyExchangerInput | ExchangeTransactionCreateManyExchangerInput[]
    skipDuplicates?: boolean
  }

  export type ExchangeTransactionCreateWithoutCustomerInput = {
    id?: string
    type: $Enums.ExchangeType
    status?: $Enums.TransactionStatus
    cryptocurrency: string
    fiatCurrency: string
    cryptoAmount: number
    fiatAmount: number
    paymentProof?: string | null
    disputeId?: string | null
    confirmationDeadline: Date | string
    canCustomerDispute?: boolean
    canExchangerDispute?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    finishedAt?: Date | string | null
    offer?: ExchangeOfferCreateNestedOneWithoutTransactionInput
    exchanger: UserCreateNestedOneWithoutExchangerTransactionsInput
    listing: ExchangeListingCreateNestedOneWithoutTransactionsInput
    dispute?: DisputeCreateNestedOneWithoutTransactionInput
    review?: ReviewCreateNestedOneWithoutTransactionInput
  }

  export type ExchangeTransactionUncheckedCreateWithoutCustomerInput = {
    id?: string
    type: $Enums.ExchangeType
    status?: $Enums.TransactionStatus
    cryptocurrency: string
    fiatCurrency: string
    cryptoAmount: number
    fiatAmount: number
    paymentProof?: string | null
    disputeId?: string | null
    confirmationDeadline: Date | string
    canCustomerDispute?: boolean
    canExchangerDispute?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    finishedAt?: Date | string | null
    offerId?: string | null
    exchangerId: string
    listingId: string
    dispute?: DisputeUncheckedCreateNestedOneWithoutTransactionInput
    review?: ReviewUncheckedCreateNestedOneWithoutTransactionInput
  }

  export type ExchangeTransactionCreateOrConnectWithoutCustomerInput = {
    where: ExchangeTransactionWhereUniqueInput
    create: XOR<ExchangeTransactionCreateWithoutCustomerInput, ExchangeTransactionUncheckedCreateWithoutCustomerInput>
  }

  export type ExchangeTransactionCreateManyCustomerInputEnvelope = {
    data: ExchangeTransactionCreateManyCustomerInput | ExchangeTransactionCreateManyCustomerInput[]
    skipDuplicates?: boolean
  }

  export type DisputeCreateWithoutInitiatorInput = {
    id?: string
    reason: string
    status?: $Enums.DisputeStatus
    resolution?: string | null
    resolvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    transaction: ExchangeTransactionCreateNestedOneWithoutDisputeInput
    moderator?: UserCreateNestedOneWithoutDisputesModeratedInput
  }

  export type DisputeUncheckedCreateWithoutInitiatorInput = {
    id?: string
    reason: string
    status?: $Enums.DisputeStatus
    resolution?: string | null
    resolvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    transactionId: string
    moderatorId?: string | null
  }

  export type DisputeCreateOrConnectWithoutInitiatorInput = {
    where: DisputeWhereUniqueInput
    create: XOR<DisputeCreateWithoutInitiatorInput, DisputeUncheckedCreateWithoutInitiatorInput>
  }

  export type DisputeCreateManyInitiatorInputEnvelope = {
    data: DisputeCreateManyInitiatorInput | DisputeCreateManyInitiatorInput[]
    skipDuplicates?: boolean
  }

  export type DisputeCreateWithoutModeratorInput = {
    id?: string
    reason: string
    status?: $Enums.DisputeStatus
    resolution?: string | null
    resolvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    transaction: ExchangeTransactionCreateNestedOneWithoutDisputeInput
    initiator: UserCreateNestedOneWithoutDisputesInitiatedInput
  }

  export type DisputeUncheckedCreateWithoutModeratorInput = {
    id?: string
    reason: string
    status?: $Enums.DisputeStatus
    resolution?: string | null
    resolvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    transactionId: string
    initiatorId: string
  }

  export type DisputeCreateOrConnectWithoutModeratorInput = {
    where: DisputeWhereUniqueInput
    create: XOR<DisputeCreateWithoutModeratorInput, DisputeUncheckedCreateWithoutModeratorInput>
  }

  export type DisputeCreateManyModeratorInputEnvelope = {
    data: DisputeCreateManyModeratorInput | DisputeCreateManyModeratorInput[]
    skipDuplicates?: boolean
  }

  export type ReviewCreateWithoutAuthorInput = {
    id?: string
    rating: number
    comment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    transaction: ExchangeTransactionCreateNestedOneWithoutReviewInput
    target: UserCreateNestedOneWithoutReviewsReceivedInput
  }

  export type ReviewUncheckedCreateWithoutAuthorInput = {
    id?: string
    rating: number
    comment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    transactionId: string
    targetId: string
  }

  export type ReviewCreateOrConnectWithoutAuthorInput = {
    where: ReviewWhereUniqueInput
    create: XOR<ReviewCreateWithoutAuthorInput, ReviewUncheckedCreateWithoutAuthorInput>
  }

  export type ReviewCreateManyAuthorInputEnvelope = {
    data: ReviewCreateManyAuthorInput | ReviewCreateManyAuthorInput[]
    skipDuplicates?: boolean
  }

  export type ReviewCreateWithoutTargetInput = {
    id?: string
    rating: number
    comment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    transaction: ExchangeTransactionCreateNestedOneWithoutReviewInput
    author: UserCreateNestedOneWithoutReviewsWrittenInput
  }

  export type ReviewUncheckedCreateWithoutTargetInput = {
    id?: string
    rating: number
    comment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    transactionId: string
    authorId: string
  }

  export type ReviewCreateOrConnectWithoutTargetInput = {
    where: ReviewWhereUniqueInput
    create: XOR<ReviewCreateWithoutTargetInput, ReviewUncheckedCreateWithoutTargetInput>
  }

  export type ReviewCreateManyTargetInputEnvelope = {
    data: ReviewCreateManyTargetInput | ReviewCreateManyTargetInput[]
    skipDuplicates?: boolean
  }

  export type UserBalanceCreateWithoutUserInput = {
    id?: string
    cryptoBalance: JsonNullValueInput | InputJsonValue
    totalHoldAmount: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserBalanceUncheckedCreateWithoutUserInput = {
    id?: string
    cryptoBalance: JsonNullValueInput | InputJsonValue
    totalHoldAmount: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserBalanceCreateOrConnectWithoutUserInput = {
    where: UserBalanceWhereUniqueInput
    create: XOR<UserBalanceCreateWithoutUserInput, UserBalanceUncheckedCreateWithoutUserInput>
  }

  export type ExchangerSettingsCreateWithoutUserInput = {
    id?: string
    autoAcceptOffers?: boolean
    preferredPaymentMethods?: ExchangerSettingsCreatepreferredPaymentMethodsInput | $Enums.PaymentMethod[]
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    minimumRating?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExchangerSettingsUncheckedCreateWithoutUserInput = {
    id?: string
    autoAcceptOffers?: boolean
    preferredPaymentMethods?: ExchangerSettingsCreatepreferredPaymentMethodsInput | $Enums.PaymentMethod[]
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    minimumRating?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExchangerSettingsCreateOrConnectWithoutUserInput = {
    where: ExchangerSettingsWhereUniqueInput
    create: XOR<ExchangerSettingsCreateWithoutUserInput, ExchangerSettingsUncheckedCreateWithoutUserInput>
  }

  export type BalanceHoldCreateWithoutUserInput = {
    id?: string
    cryptocurrency: string
    amount: number
    type: $Enums.HoldType
    relatedTransactionId?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BalanceHoldUncheckedCreateWithoutUserInput = {
    id?: string
    cryptocurrency: string
    amount: number
    type: $Enums.HoldType
    relatedTransactionId?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BalanceHoldCreateOrConnectWithoutUserInput = {
    where: BalanceHoldWhereUniqueInput
    create: XOR<BalanceHoldCreateWithoutUserInput, BalanceHoldUncheckedCreateWithoutUserInput>
  }

  export type BalanceHoldCreateManyUserInputEnvelope = {
    data: BalanceHoldCreateManyUserInput | BalanceHoldCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ExchangeListingUpsertWithWhereUniqueWithoutUserInput = {
    where: ExchangeListingWhereUniqueInput
    update: XOR<ExchangeListingUpdateWithoutUserInput, ExchangeListingUncheckedUpdateWithoutUserInput>
    create: XOR<ExchangeListingCreateWithoutUserInput, ExchangeListingUncheckedCreateWithoutUserInput>
  }

  export type ExchangeListingUpdateWithWhereUniqueWithoutUserInput = {
    where: ExchangeListingWhereUniqueInput
    data: XOR<ExchangeListingUpdateWithoutUserInput, ExchangeListingUncheckedUpdateWithoutUserInput>
  }

  export type ExchangeListingUpdateManyWithWhereWithoutUserInput = {
    where: ExchangeListingScalarWhereInput
    data: XOR<ExchangeListingUpdateManyMutationInput, ExchangeListingUncheckedUpdateManyWithoutUserInput>
  }

  export type ExchangeListingScalarWhereInput = {
    AND?: ExchangeListingScalarWhereInput | ExchangeListingScalarWhereInput[]
    OR?: ExchangeListingScalarWhereInput[]
    NOT?: ExchangeListingScalarWhereInput | ExchangeListingScalarWhereInput[]
    id?: StringFilter<"ExchangeListing"> | string
    type?: EnumExchangeTypeFilter<"ExchangeListing"> | $Enums.ExchangeType
    cryptocurrency?: StringFilter<"ExchangeListing"> | string
    fiatCurrency?: StringFilter<"ExchangeListing"> | string
    rate?: FloatFilter<"ExchangeListing"> | number
    minAmount?: FloatFilter<"ExchangeListing"> | number
    maxAmount?: FloatFilter<"ExchangeListing"> | number
    availableAmount?: FloatFilter<"ExchangeListing"> | number
    paymentMethods?: EnumPaymentMethodNullableListFilter<"ExchangeListing">
    terms?: StringNullableFilter<"ExchangeListing"> | string | null
    isActive?: BoolFilter<"ExchangeListing"> | boolean
    createdAt?: DateTimeFilter<"ExchangeListing"> | Date | string
    updatedAt?: DateTimeFilter<"ExchangeListing"> | Date | string
    userId?: StringFilter<"ExchangeListing"> | string
  }

  export type ExchangeOfferUpsertWithWhereUniqueWithoutUserInput = {
    where: ExchangeOfferWhereUniqueInput
    update: XOR<ExchangeOfferUpdateWithoutUserInput, ExchangeOfferUncheckedUpdateWithoutUserInput>
    create: XOR<ExchangeOfferCreateWithoutUserInput, ExchangeOfferUncheckedCreateWithoutUserInput>
  }

  export type ExchangeOfferUpdateWithWhereUniqueWithoutUserInput = {
    where: ExchangeOfferWhereUniqueInput
    data: XOR<ExchangeOfferUpdateWithoutUserInput, ExchangeOfferUncheckedUpdateWithoutUserInput>
  }

  export type ExchangeOfferUpdateManyWithWhereWithoutUserInput = {
    where: ExchangeOfferScalarWhereInput
    data: XOR<ExchangeOfferUpdateManyMutationInput, ExchangeOfferUncheckedUpdateManyWithoutUserInput>
  }

  export type ExchangeOfferScalarWhereInput = {
    AND?: ExchangeOfferScalarWhereInput | ExchangeOfferScalarWhereInput[]
    OR?: ExchangeOfferScalarWhereInput[]
    NOT?: ExchangeOfferScalarWhereInput | ExchangeOfferScalarWhereInput[]
    id?: StringFilter<"ExchangeOffer"> | string
    amount?: FloatFilter<"ExchangeOffer"> | number
    status?: EnumOfferStatusFilter<"ExchangeOffer"> | $Enums.OfferStatus
    createdAt?: DateTimeFilter<"ExchangeOffer"> | Date | string
    updatedAt?: DateTimeFilter<"ExchangeOffer"> | Date | string
    userId?: StringFilter<"ExchangeOffer"> | string
    listingId?: StringFilter<"ExchangeOffer"> | string
  }

  export type ExchangeTransactionUpsertWithWhereUniqueWithoutExchangerInput = {
    where: ExchangeTransactionWhereUniqueInput
    update: XOR<ExchangeTransactionUpdateWithoutExchangerInput, ExchangeTransactionUncheckedUpdateWithoutExchangerInput>
    create: XOR<ExchangeTransactionCreateWithoutExchangerInput, ExchangeTransactionUncheckedCreateWithoutExchangerInput>
  }

  export type ExchangeTransactionUpdateWithWhereUniqueWithoutExchangerInput = {
    where: ExchangeTransactionWhereUniqueInput
    data: XOR<ExchangeTransactionUpdateWithoutExchangerInput, ExchangeTransactionUncheckedUpdateWithoutExchangerInput>
  }

  export type ExchangeTransactionUpdateManyWithWhereWithoutExchangerInput = {
    where: ExchangeTransactionScalarWhereInput
    data: XOR<ExchangeTransactionUpdateManyMutationInput, ExchangeTransactionUncheckedUpdateManyWithoutExchangerInput>
  }

  export type ExchangeTransactionScalarWhereInput = {
    AND?: ExchangeTransactionScalarWhereInput | ExchangeTransactionScalarWhereInput[]
    OR?: ExchangeTransactionScalarWhereInput[]
    NOT?: ExchangeTransactionScalarWhereInput | ExchangeTransactionScalarWhereInput[]
    id?: StringFilter<"ExchangeTransaction"> | string
    type?: EnumExchangeTypeFilter<"ExchangeTransaction"> | $Enums.ExchangeType
    status?: EnumTransactionStatusFilter<"ExchangeTransaction"> | $Enums.TransactionStatus
    cryptocurrency?: StringFilter<"ExchangeTransaction"> | string
    fiatCurrency?: StringFilter<"ExchangeTransaction"> | string
    cryptoAmount?: FloatFilter<"ExchangeTransaction"> | number
    fiatAmount?: FloatFilter<"ExchangeTransaction"> | number
    paymentProof?: StringNullableFilter<"ExchangeTransaction"> | string | null
    disputeId?: StringNullableFilter<"ExchangeTransaction"> | string | null
    confirmationDeadline?: DateTimeFilter<"ExchangeTransaction"> | Date | string
    canCustomerDispute?: BoolFilter<"ExchangeTransaction"> | boolean
    canExchangerDispute?: BoolFilter<"ExchangeTransaction"> | boolean
    isActive?: BoolFilter<"ExchangeTransaction"> | boolean
    createdAt?: DateTimeFilter<"ExchangeTransaction"> | Date | string
    updatedAt?: DateTimeFilter<"ExchangeTransaction"> | Date | string
    finishedAt?: DateTimeNullableFilter<"ExchangeTransaction"> | Date | string | null
    offerId?: StringNullableFilter<"ExchangeTransaction"> | string | null
    customerId?: StringFilter<"ExchangeTransaction"> | string
    exchangerId?: StringFilter<"ExchangeTransaction"> | string
    listingId?: StringFilter<"ExchangeTransaction"> | string
  }

  export type ExchangeTransactionUpsertWithWhereUniqueWithoutCustomerInput = {
    where: ExchangeTransactionWhereUniqueInput
    update: XOR<ExchangeTransactionUpdateWithoutCustomerInput, ExchangeTransactionUncheckedUpdateWithoutCustomerInput>
    create: XOR<ExchangeTransactionCreateWithoutCustomerInput, ExchangeTransactionUncheckedCreateWithoutCustomerInput>
  }

  export type ExchangeTransactionUpdateWithWhereUniqueWithoutCustomerInput = {
    where: ExchangeTransactionWhereUniqueInput
    data: XOR<ExchangeTransactionUpdateWithoutCustomerInput, ExchangeTransactionUncheckedUpdateWithoutCustomerInput>
  }

  export type ExchangeTransactionUpdateManyWithWhereWithoutCustomerInput = {
    where: ExchangeTransactionScalarWhereInput
    data: XOR<ExchangeTransactionUpdateManyMutationInput, ExchangeTransactionUncheckedUpdateManyWithoutCustomerInput>
  }

  export type DisputeUpsertWithWhereUniqueWithoutInitiatorInput = {
    where: DisputeWhereUniqueInput
    update: XOR<DisputeUpdateWithoutInitiatorInput, DisputeUncheckedUpdateWithoutInitiatorInput>
    create: XOR<DisputeCreateWithoutInitiatorInput, DisputeUncheckedCreateWithoutInitiatorInput>
  }

  export type DisputeUpdateWithWhereUniqueWithoutInitiatorInput = {
    where: DisputeWhereUniqueInput
    data: XOR<DisputeUpdateWithoutInitiatorInput, DisputeUncheckedUpdateWithoutInitiatorInput>
  }

  export type DisputeUpdateManyWithWhereWithoutInitiatorInput = {
    where: DisputeScalarWhereInput
    data: XOR<DisputeUpdateManyMutationInput, DisputeUncheckedUpdateManyWithoutInitiatorInput>
  }

  export type DisputeScalarWhereInput = {
    AND?: DisputeScalarWhereInput | DisputeScalarWhereInput[]
    OR?: DisputeScalarWhereInput[]
    NOT?: DisputeScalarWhereInput | DisputeScalarWhereInput[]
    id?: StringFilter<"Dispute"> | string
    reason?: StringFilter<"Dispute"> | string
    status?: EnumDisputeStatusFilter<"Dispute"> | $Enums.DisputeStatus
    resolution?: StringNullableFilter<"Dispute"> | string | null
    resolvedAt?: DateTimeNullableFilter<"Dispute"> | Date | string | null
    createdAt?: DateTimeFilter<"Dispute"> | Date | string
    updatedAt?: DateTimeFilter<"Dispute"> | Date | string
    transactionId?: StringFilter<"Dispute"> | string
    initiatorId?: StringFilter<"Dispute"> | string
    moderatorId?: StringNullableFilter<"Dispute"> | string | null
  }

  export type DisputeUpsertWithWhereUniqueWithoutModeratorInput = {
    where: DisputeWhereUniqueInput
    update: XOR<DisputeUpdateWithoutModeratorInput, DisputeUncheckedUpdateWithoutModeratorInput>
    create: XOR<DisputeCreateWithoutModeratorInput, DisputeUncheckedCreateWithoutModeratorInput>
  }

  export type DisputeUpdateWithWhereUniqueWithoutModeratorInput = {
    where: DisputeWhereUniqueInput
    data: XOR<DisputeUpdateWithoutModeratorInput, DisputeUncheckedUpdateWithoutModeratorInput>
  }

  export type DisputeUpdateManyWithWhereWithoutModeratorInput = {
    where: DisputeScalarWhereInput
    data: XOR<DisputeUpdateManyMutationInput, DisputeUncheckedUpdateManyWithoutModeratorInput>
  }

  export type ReviewUpsertWithWhereUniqueWithoutAuthorInput = {
    where: ReviewWhereUniqueInput
    update: XOR<ReviewUpdateWithoutAuthorInput, ReviewUncheckedUpdateWithoutAuthorInput>
    create: XOR<ReviewCreateWithoutAuthorInput, ReviewUncheckedCreateWithoutAuthorInput>
  }

  export type ReviewUpdateWithWhereUniqueWithoutAuthorInput = {
    where: ReviewWhereUniqueInput
    data: XOR<ReviewUpdateWithoutAuthorInput, ReviewUncheckedUpdateWithoutAuthorInput>
  }

  export type ReviewUpdateManyWithWhereWithoutAuthorInput = {
    where: ReviewScalarWhereInput
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyWithoutAuthorInput>
  }

  export type ReviewScalarWhereInput = {
    AND?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
    OR?: ReviewScalarWhereInput[]
    NOT?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
    id?: StringFilter<"Review"> | string
    rating?: IntFilter<"Review"> | number
    comment?: StringNullableFilter<"Review"> | string | null
    createdAt?: DateTimeFilter<"Review"> | Date | string
    updatedAt?: DateTimeFilter<"Review"> | Date | string
    transactionId?: StringFilter<"Review"> | string
    authorId?: StringFilter<"Review"> | string
    targetId?: StringFilter<"Review"> | string
  }

  export type ReviewUpsertWithWhereUniqueWithoutTargetInput = {
    where: ReviewWhereUniqueInput
    update: XOR<ReviewUpdateWithoutTargetInput, ReviewUncheckedUpdateWithoutTargetInput>
    create: XOR<ReviewCreateWithoutTargetInput, ReviewUncheckedCreateWithoutTargetInput>
  }

  export type ReviewUpdateWithWhereUniqueWithoutTargetInput = {
    where: ReviewWhereUniqueInput
    data: XOR<ReviewUpdateWithoutTargetInput, ReviewUncheckedUpdateWithoutTargetInput>
  }

  export type ReviewUpdateManyWithWhereWithoutTargetInput = {
    where: ReviewScalarWhereInput
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyWithoutTargetInput>
  }

  export type UserBalanceUpsertWithoutUserInput = {
    update: XOR<UserBalanceUpdateWithoutUserInput, UserBalanceUncheckedUpdateWithoutUserInput>
    create: XOR<UserBalanceCreateWithoutUserInput, UserBalanceUncheckedCreateWithoutUserInput>
    where?: UserBalanceWhereInput
  }

  export type UserBalanceUpdateToOneWithWhereWithoutUserInput = {
    where?: UserBalanceWhereInput
    data: XOR<UserBalanceUpdateWithoutUserInput, UserBalanceUncheckedUpdateWithoutUserInput>
  }

  export type UserBalanceUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    cryptoBalance?: JsonNullValueInput | InputJsonValue
    totalHoldAmount?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserBalanceUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    cryptoBalance?: JsonNullValueInput | InputJsonValue
    totalHoldAmount?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExchangerSettingsUpsertWithoutUserInput = {
    update: XOR<ExchangerSettingsUpdateWithoutUserInput, ExchangerSettingsUncheckedUpdateWithoutUserInput>
    create: XOR<ExchangerSettingsCreateWithoutUserInput, ExchangerSettingsUncheckedCreateWithoutUserInput>
    where?: ExchangerSettingsWhereInput
  }

  export type ExchangerSettingsUpdateToOneWithWhereWithoutUserInput = {
    where?: ExchangerSettingsWhereInput
    data: XOR<ExchangerSettingsUpdateWithoutUserInput, ExchangerSettingsUncheckedUpdateWithoutUserInput>
  }

  export type ExchangerSettingsUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    autoAcceptOffers?: BoolFieldUpdateOperationsInput | boolean
    preferredPaymentMethods?: ExchangerSettingsUpdatepreferredPaymentMethodsInput | $Enums.PaymentMethod[]
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    minimumRating?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExchangerSettingsUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    autoAcceptOffers?: BoolFieldUpdateOperationsInput | boolean
    preferredPaymentMethods?: ExchangerSettingsUpdatepreferredPaymentMethodsInput | $Enums.PaymentMethod[]
    workingHours?: NullableJsonNullValueInput | InputJsonValue
    minimumRating?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BalanceHoldUpsertWithWhereUniqueWithoutUserInput = {
    where: BalanceHoldWhereUniqueInput
    update: XOR<BalanceHoldUpdateWithoutUserInput, BalanceHoldUncheckedUpdateWithoutUserInput>
    create: XOR<BalanceHoldCreateWithoutUserInput, BalanceHoldUncheckedCreateWithoutUserInput>
  }

  export type BalanceHoldUpdateWithWhereUniqueWithoutUserInput = {
    where: BalanceHoldWhereUniqueInput
    data: XOR<BalanceHoldUpdateWithoutUserInput, BalanceHoldUncheckedUpdateWithoutUserInput>
  }

  export type BalanceHoldUpdateManyWithWhereWithoutUserInput = {
    where: BalanceHoldScalarWhereInput
    data: XOR<BalanceHoldUpdateManyMutationInput, BalanceHoldUncheckedUpdateManyWithoutUserInput>
  }

  export type BalanceHoldScalarWhereInput = {
    AND?: BalanceHoldScalarWhereInput | BalanceHoldScalarWhereInput[]
    OR?: BalanceHoldScalarWhereInput[]
    NOT?: BalanceHoldScalarWhereInput | BalanceHoldScalarWhereInput[]
    id?: StringFilter<"BalanceHold"> | string
    userId?: StringFilter<"BalanceHold"> | string
    cryptocurrency?: StringFilter<"BalanceHold"> | string
    amount?: FloatFilter<"BalanceHold"> | number
    type?: EnumHoldTypeFilter<"BalanceHold"> | $Enums.HoldType
    relatedTransactionId?: StringNullableFilter<"BalanceHold"> | string | null
    expiresAt?: DateTimeNullableFilter<"BalanceHold"> | Date | string | null
    createdAt?: DateTimeFilter<"BalanceHold"> | Date | string
    updatedAt?: DateTimeFilter<"BalanceHold"> | Date | string
  }

  export type UserCreateWithoutListingsInput = {
    id?: string
    email: string
    password: string
    role?: $Enums.UserRole
    isExchangerActive?: boolean
    isFrozen?: boolean
    frozenUntil?: Date | string | null
    missedOffersCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    offers?: ExchangeOfferCreateNestedManyWithoutUserInput
    exchangerTransactions?: ExchangeTransactionCreateNestedManyWithoutExchangerInput
    customerTransactions?: ExchangeTransactionCreateNestedManyWithoutCustomerInput
    disputesInitiated?: DisputeCreateNestedManyWithoutInitiatorInput
    disputesModerated?: DisputeCreateNestedManyWithoutModeratorInput
    reviewsWritten?: ReviewCreateNestedManyWithoutAuthorInput
    reviewsReceived?: ReviewCreateNestedManyWithoutTargetInput
    balance?: UserBalanceCreateNestedOneWithoutUserInput
    exchangerSettings?: ExchangerSettingsCreateNestedOneWithoutUserInput
    holds?: BalanceHoldCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutListingsInput = {
    id?: string
    email: string
    password: string
    role?: $Enums.UserRole
    isExchangerActive?: boolean
    isFrozen?: boolean
    frozenUntil?: Date | string | null
    missedOffersCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    offers?: ExchangeOfferUncheckedCreateNestedManyWithoutUserInput
    exchangerTransactions?: ExchangeTransactionUncheckedCreateNestedManyWithoutExchangerInput
    customerTransactions?: ExchangeTransactionUncheckedCreateNestedManyWithoutCustomerInput
    disputesInitiated?: DisputeUncheckedCreateNestedManyWithoutInitiatorInput
    disputesModerated?: DisputeUncheckedCreateNestedManyWithoutModeratorInput
    reviewsWritten?: ReviewUncheckedCreateNestedManyWithoutAuthorInput
    reviewsReceived?: ReviewUncheckedCreateNestedManyWithoutTargetInput
    balance?: UserBalanceUncheckedCreateNestedOneWithoutUserInput
    exchangerSettings?: ExchangerSettingsUncheckedCreateNestedOneWithoutUserInput
    holds?: BalanceHoldUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutListingsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutListingsInput, UserUncheckedCreateWithoutListingsInput>
  }

  export type ExchangeOfferCreateWithoutListingInput = {
    id?: string
    amount: number
    status?: $Enums.OfferStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutOffersInput
    transaction?: ExchangeTransactionCreateNestedOneWithoutOfferInput
  }

  export type ExchangeOfferUncheckedCreateWithoutListingInput = {
    id?: string
    amount: number
    status?: $Enums.OfferStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    transaction?: ExchangeTransactionUncheckedCreateNestedOneWithoutOfferInput
  }

  export type ExchangeOfferCreateOrConnectWithoutListingInput = {
    where: ExchangeOfferWhereUniqueInput
    create: XOR<ExchangeOfferCreateWithoutListingInput, ExchangeOfferUncheckedCreateWithoutListingInput>
  }

  export type ExchangeOfferCreateManyListingInputEnvelope = {
    data: ExchangeOfferCreateManyListingInput | ExchangeOfferCreateManyListingInput[]
    skipDuplicates?: boolean
  }

  export type ExchangeTransactionCreateWithoutListingInput = {
    id?: string
    type: $Enums.ExchangeType
    status?: $Enums.TransactionStatus
    cryptocurrency: string
    fiatCurrency: string
    cryptoAmount: number
    fiatAmount: number
    paymentProof?: string | null
    disputeId?: string | null
    confirmationDeadline: Date | string
    canCustomerDispute?: boolean
    canExchangerDispute?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    finishedAt?: Date | string | null
    offer?: ExchangeOfferCreateNestedOneWithoutTransactionInput
    customer: UserCreateNestedOneWithoutCustomerTransactionsInput
    exchanger: UserCreateNestedOneWithoutExchangerTransactionsInput
    dispute?: DisputeCreateNestedOneWithoutTransactionInput
    review?: ReviewCreateNestedOneWithoutTransactionInput
  }

  export type ExchangeTransactionUncheckedCreateWithoutListingInput = {
    id?: string
    type: $Enums.ExchangeType
    status?: $Enums.TransactionStatus
    cryptocurrency: string
    fiatCurrency: string
    cryptoAmount: number
    fiatAmount: number
    paymentProof?: string | null
    disputeId?: string | null
    confirmationDeadline: Date | string
    canCustomerDispute?: boolean
    canExchangerDispute?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    finishedAt?: Date | string | null
    offerId?: string | null
    customerId: string
    exchangerId: string
    dispute?: DisputeUncheckedCreateNestedOneWithoutTransactionInput
    review?: ReviewUncheckedCreateNestedOneWithoutTransactionInput
  }

  export type ExchangeTransactionCreateOrConnectWithoutListingInput = {
    where: ExchangeTransactionWhereUniqueInput
    create: XOR<ExchangeTransactionCreateWithoutListingInput, ExchangeTransactionUncheckedCreateWithoutListingInput>
  }

  export type ExchangeTransactionCreateManyListingInputEnvelope = {
    data: ExchangeTransactionCreateManyListingInput | ExchangeTransactionCreateManyListingInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutListingsInput = {
    update: XOR<UserUpdateWithoutListingsInput, UserUncheckedUpdateWithoutListingsInput>
    create: XOR<UserCreateWithoutListingsInput, UserUncheckedCreateWithoutListingsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutListingsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutListingsInput, UserUncheckedUpdateWithoutListingsInput>
  }

  export type UserUpdateWithoutListingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isExchangerActive?: BoolFieldUpdateOperationsInput | boolean
    isFrozen?: BoolFieldUpdateOperationsInput | boolean
    frozenUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    missedOffersCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    offers?: ExchangeOfferUpdateManyWithoutUserNestedInput
    exchangerTransactions?: ExchangeTransactionUpdateManyWithoutExchangerNestedInput
    customerTransactions?: ExchangeTransactionUpdateManyWithoutCustomerNestedInput
    disputesInitiated?: DisputeUpdateManyWithoutInitiatorNestedInput
    disputesModerated?: DisputeUpdateManyWithoutModeratorNestedInput
    reviewsWritten?: ReviewUpdateManyWithoutAuthorNestedInput
    reviewsReceived?: ReviewUpdateManyWithoutTargetNestedInput
    balance?: UserBalanceUpdateOneWithoutUserNestedInput
    exchangerSettings?: ExchangerSettingsUpdateOneWithoutUserNestedInput
    holds?: BalanceHoldUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutListingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isExchangerActive?: BoolFieldUpdateOperationsInput | boolean
    isFrozen?: BoolFieldUpdateOperationsInput | boolean
    frozenUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    missedOffersCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    offers?: ExchangeOfferUncheckedUpdateManyWithoutUserNestedInput
    exchangerTransactions?: ExchangeTransactionUncheckedUpdateManyWithoutExchangerNestedInput
    customerTransactions?: ExchangeTransactionUncheckedUpdateManyWithoutCustomerNestedInput
    disputesInitiated?: DisputeUncheckedUpdateManyWithoutInitiatorNestedInput
    disputesModerated?: DisputeUncheckedUpdateManyWithoutModeratorNestedInput
    reviewsWritten?: ReviewUncheckedUpdateManyWithoutAuthorNestedInput
    reviewsReceived?: ReviewUncheckedUpdateManyWithoutTargetNestedInput
    balance?: UserBalanceUncheckedUpdateOneWithoutUserNestedInput
    exchangerSettings?: ExchangerSettingsUncheckedUpdateOneWithoutUserNestedInput
    holds?: BalanceHoldUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ExchangeOfferUpsertWithWhereUniqueWithoutListingInput = {
    where: ExchangeOfferWhereUniqueInput
    update: XOR<ExchangeOfferUpdateWithoutListingInput, ExchangeOfferUncheckedUpdateWithoutListingInput>
    create: XOR<ExchangeOfferCreateWithoutListingInput, ExchangeOfferUncheckedCreateWithoutListingInput>
  }

  export type ExchangeOfferUpdateWithWhereUniqueWithoutListingInput = {
    where: ExchangeOfferWhereUniqueInput
    data: XOR<ExchangeOfferUpdateWithoutListingInput, ExchangeOfferUncheckedUpdateWithoutListingInput>
  }

  export type ExchangeOfferUpdateManyWithWhereWithoutListingInput = {
    where: ExchangeOfferScalarWhereInput
    data: XOR<ExchangeOfferUpdateManyMutationInput, ExchangeOfferUncheckedUpdateManyWithoutListingInput>
  }

  export type ExchangeTransactionUpsertWithWhereUniqueWithoutListingInput = {
    where: ExchangeTransactionWhereUniqueInput
    update: XOR<ExchangeTransactionUpdateWithoutListingInput, ExchangeTransactionUncheckedUpdateWithoutListingInput>
    create: XOR<ExchangeTransactionCreateWithoutListingInput, ExchangeTransactionUncheckedCreateWithoutListingInput>
  }

  export type ExchangeTransactionUpdateWithWhereUniqueWithoutListingInput = {
    where: ExchangeTransactionWhereUniqueInput
    data: XOR<ExchangeTransactionUpdateWithoutListingInput, ExchangeTransactionUncheckedUpdateWithoutListingInput>
  }

  export type ExchangeTransactionUpdateManyWithWhereWithoutListingInput = {
    where: ExchangeTransactionScalarWhereInput
    data: XOR<ExchangeTransactionUpdateManyMutationInput, ExchangeTransactionUncheckedUpdateManyWithoutListingInput>
  }

  export type UserCreateWithoutOffersInput = {
    id?: string
    email: string
    password: string
    role?: $Enums.UserRole
    isExchangerActive?: boolean
    isFrozen?: boolean
    frozenUntil?: Date | string | null
    missedOffersCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    listings?: ExchangeListingCreateNestedManyWithoutUserInput
    exchangerTransactions?: ExchangeTransactionCreateNestedManyWithoutExchangerInput
    customerTransactions?: ExchangeTransactionCreateNestedManyWithoutCustomerInput
    disputesInitiated?: DisputeCreateNestedManyWithoutInitiatorInput
    disputesModerated?: DisputeCreateNestedManyWithoutModeratorInput
    reviewsWritten?: ReviewCreateNestedManyWithoutAuthorInput
    reviewsReceived?: ReviewCreateNestedManyWithoutTargetInput
    balance?: UserBalanceCreateNestedOneWithoutUserInput
    exchangerSettings?: ExchangerSettingsCreateNestedOneWithoutUserInput
    holds?: BalanceHoldCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutOffersInput = {
    id?: string
    email: string
    password: string
    role?: $Enums.UserRole
    isExchangerActive?: boolean
    isFrozen?: boolean
    frozenUntil?: Date | string | null
    missedOffersCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    listings?: ExchangeListingUncheckedCreateNestedManyWithoutUserInput
    exchangerTransactions?: ExchangeTransactionUncheckedCreateNestedManyWithoutExchangerInput
    customerTransactions?: ExchangeTransactionUncheckedCreateNestedManyWithoutCustomerInput
    disputesInitiated?: DisputeUncheckedCreateNestedManyWithoutInitiatorInput
    disputesModerated?: DisputeUncheckedCreateNestedManyWithoutModeratorInput
    reviewsWritten?: ReviewUncheckedCreateNestedManyWithoutAuthorInput
    reviewsReceived?: ReviewUncheckedCreateNestedManyWithoutTargetInput
    balance?: UserBalanceUncheckedCreateNestedOneWithoutUserInput
    exchangerSettings?: ExchangerSettingsUncheckedCreateNestedOneWithoutUserInput
    holds?: BalanceHoldUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutOffersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOffersInput, UserUncheckedCreateWithoutOffersInput>
  }

  export type ExchangeListingCreateWithoutOffersInput = {
    id?: string
    type: $Enums.ExchangeType
    cryptocurrency: string
    fiatCurrency: string
    rate: number
    minAmount: number
    maxAmount: number
    availableAmount: number
    paymentMethods?: ExchangeListingCreatepaymentMethodsInput | $Enums.PaymentMethod[]
    terms?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutListingsInput
    transactions?: ExchangeTransactionCreateNestedManyWithoutListingInput
  }

  export type ExchangeListingUncheckedCreateWithoutOffersInput = {
    id?: string
    type: $Enums.ExchangeType
    cryptocurrency: string
    fiatCurrency: string
    rate: number
    minAmount: number
    maxAmount: number
    availableAmount: number
    paymentMethods?: ExchangeListingCreatepaymentMethodsInput | $Enums.PaymentMethod[]
    terms?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    transactions?: ExchangeTransactionUncheckedCreateNestedManyWithoutListingInput
  }

  export type ExchangeListingCreateOrConnectWithoutOffersInput = {
    where: ExchangeListingWhereUniqueInput
    create: XOR<ExchangeListingCreateWithoutOffersInput, ExchangeListingUncheckedCreateWithoutOffersInput>
  }

  export type ExchangeTransactionCreateWithoutOfferInput = {
    id?: string
    type: $Enums.ExchangeType
    status?: $Enums.TransactionStatus
    cryptocurrency: string
    fiatCurrency: string
    cryptoAmount: number
    fiatAmount: number
    paymentProof?: string | null
    disputeId?: string | null
    confirmationDeadline: Date | string
    canCustomerDispute?: boolean
    canExchangerDispute?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    finishedAt?: Date | string | null
    customer: UserCreateNestedOneWithoutCustomerTransactionsInput
    exchanger: UserCreateNestedOneWithoutExchangerTransactionsInput
    listing: ExchangeListingCreateNestedOneWithoutTransactionsInput
    dispute?: DisputeCreateNestedOneWithoutTransactionInput
    review?: ReviewCreateNestedOneWithoutTransactionInput
  }

  export type ExchangeTransactionUncheckedCreateWithoutOfferInput = {
    id?: string
    type: $Enums.ExchangeType
    status?: $Enums.TransactionStatus
    cryptocurrency: string
    fiatCurrency: string
    cryptoAmount: number
    fiatAmount: number
    paymentProof?: string | null
    disputeId?: string | null
    confirmationDeadline: Date | string
    canCustomerDispute?: boolean
    canExchangerDispute?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    finishedAt?: Date | string | null
    customerId: string
    exchangerId: string
    listingId: string
    dispute?: DisputeUncheckedCreateNestedOneWithoutTransactionInput
    review?: ReviewUncheckedCreateNestedOneWithoutTransactionInput
  }

  export type ExchangeTransactionCreateOrConnectWithoutOfferInput = {
    where: ExchangeTransactionWhereUniqueInput
    create: XOR<ExchangeTransactionCreateWithoutOfferInput, ExchangeTransactionUncheckedCreateWithoutOfferInput>
  }

  export type UserUpsertWithoutOffersInput = {
    update: XOR<UserUpdateWithoutOffersInput, UserUncheckedUpdateWithoutOffersInput>
    create: XOR<UserCreateWithoutOffersInput, UserUncheckedCreateWithoutOffersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutOffersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutOffersInput, UserUncheckedUpdateWithoutOffersInput>
  }

  export type UserUpdateWithoutOffersInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isExchangerActive?: BoolFieldUpdateOperationsInput | boolean
    isFrozen?: BoolFieldUpdateOperationsInput | boolean
    frozenUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    missedOffersCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listings?: ExchangeListingUpdateManyWithoutUserNestedInput
    exchangerTransactions?: ExchangeTransactionUpdateManyWithoutExchangerNestedInput
    customerTransactions?: ExchangeTransactionUpdateManyWithoutCustomerNestedInput
    disputesInitiated?: DisputeUpdateManyWithoutInitiatorNestedInput
    disputesModerated?: DisputeUpdateManyWithoutModeratorNestedInput
    reviewsWritten?: ReviewUpdateManyWithoutAuthorNestedInput
    reviewsReceived?: ReviewUpdateManyWithoutTargetNestedInput
    balance?: UserBalanceUpdateOneWithoutUserNestedInput
    exchangerSettings?: ExchangerSettingsUpdateOneWithoutUserNestedInput
    holds?: BalanceHoldUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutOffersInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isExchangerActive?: BoolFieldUpdateOperationsInput | boolean
    isFrozen?: BoolFieldUpdateOperationsInput | boolean
    frozenUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    missedOffersCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listings?: ExchangeListingUncheckedUpdateManyWithoutUserNestedInput
    exchangerTransactions?: ExchangeTransactionUncheckedUpdateManyWithoutExchangerNestedInput
    customerTransactions?: ExchangeTransactionUncheckedUpdateManyWithoutCustomerNestedInput
    disputesInitiated?: DisputeUncheckedUpdateManyWithoutInitiatorNestedInput
    disputesModerated?: DisputeUncheckedUpdateManyWithoutModeratorNestedInput
    reviewsWritten?: ReviewUncheckedUpdateManyWithoutAuthorNestedInput
    reviewsReceived?: ReviewUncheckedUpdateManyWithoutTargetNestedInput
    balance?: UserBalanceUncheckedUpdateOneWithoutUserNestedInput
    exchangerSettings?: ExchangerSettingsUncheckedUpdateOneWithoutUserNestedInput
    holds?: BalanceHoldUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ExchangeListingUpsertWithoutOffersInput = {
    update: XOR<ExchangeListingUpdateWithoutOffersInput, ExchangeListingUncheckedUpdateWithoutOffersInput>
    create: XOR<ExchangeListingCreateWithoutOffersInput, ExchangeListingUncheckedCreateWithoutOffersInput>
    where?: ExchangeListingWhereInput
  }

  export type ExchangeListingUpdateToOneWithWhereWithoutOffersInput = {
    where?: ExchangeListingWhereInput
    data: XOR<ExchangeListingUpdateWithoutOffersInput, ExchangeListingUncheckedUpdateWithoutOffersInput>
  }

  export type ExchangeListingUpdateWithoutOffersInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumExchangeTypeFieldUpdateOperationsInput | $Enums.ExchangeType
    cryptocurrency?: StringFieldUpdateOperationsInput | string
    fiatCurrency?: StringFieldUpdateOperationsInput | string
    rate?: FloatFieldUpdateOperationsInput | number
    minAmount?: FloatFieldUpdateOperationsInput | number
    maxAmount?: FloatFieldUpdateOperationsInput | number
    availableAmount?: FloatFieldUpdateOperationsInput | number
    paymentMethods?: ExchangeListingUpdatepaymentMethodsInput | $Enums.PaymentMethod[]
    terms?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutListingsNestedInput
    transactions?: ExchangeTransactionUpdateManyWithoutListingNestedInput
  }

  export type ExchangeListingUncheckedUpdateWithoutOffersInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumExchangeTypeFieldUpdateOperationsInput | $Enums.ExchangeType
    cryptocurrency?: StringFieldUpdateOperationsInput | string
    fiatCurrency?: StringFieldUpdateOperationsInput | string
    rate?: FloatFieldUpdateOperationsInput | number
    minAmount?: FloatFieldUpdateOperationsInput | number
    maxAmount?: FloatFieldUpdateOperationsInput | number
    availableAmount?: FloatFieldUpdateOperationsInput | number
    paymentMethods?: ExchangeListingUpdatepaymentMethodsInput | $Enums.PaymentMethod[]
    terms?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    transactions?: ExchangeTransactionUncheckedUpdateManyWithoutListingNestedInput
  }

  export type ExchangeTransactionUpsertWithoutOfferInput = {
    update: XOR<ExchangeTransactionUpdateWithoutOfferInput, ExchangeTransactionUncheckedUpdateWithoutOfferInput>
    create: XOR<ExchangeTransactionCreateWithoutOfferInput, ExchangeTransactionUncheckedCreateWithoutOfferInput>
    where?: ExchangeTransactionWhereInput
  }

  export type ExchangeTransactionUpdateToOneWithWhereWithoutOfferInput = {
    where?: ExchangeTransactionWhereInput
    data: XOR<ExchangeTransactionUpdateWithoutOfferInput, ExchangeTransactionUncheckedUpdateWithoutOfferInput>
  }

  export type ExchangeTransactionUpdateWithoutOfferInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumExchangeTypeFieldUpdateOperationsInput | $Enums.ExchangeType
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    cryptocurrency?: StringFieldUpdateOperationsInput | string
    fiatCurrency?: StringFieldUpdateOperationsInput | string
    cryptoAmount?: FloatFieldUpdateOperationsInput | number
    fiatAmount?: FloatFieldUpdateOperationsInput | number
    paymentProof?: NullableStringFieldUpdateOperationsInput | string | null
    disputeId?: NullableStringFieldUpdateOperationsInput | string | null
    confirmationDeadline?: DateTimeFieldUpdateOperationsInput | Date | string
    canCustomerDispute?: BoolFieldUpdateOperationsInput | boolean
    canExchangerDispute?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    customer?: UserUpdateOneRequiredWithoutCustomerTransactionsNestedInput
    exchanger?: UserUpdateOneRequiredWithoutExchangerTransactionsNestedInput
    listing?: ExchangeListingUpdateOneRequiredWithoutTransactionsNestedInput
    dispute?: DisputeUpdateOneWithoutTransactionNestedInput
    review?: ReviewUpdateOneWithoutTransactionNestedInput
  }

  export type ExchangeTransactionUncheckedUpdateWithoutOfferInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumExchangeTypeFieldUpdateOperationsInput | $Enums.ExchangeType
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    cryptocurrency?: StringFieldUpdateOperationsInput | string
    fiatCurrency?: StringFieldUpdateOperationsInput | string
    cryptoAmount?: FloatFieldUpdateOperationsInput | number
    fiatAmount?: FloatFieldUpdateOperationsInput | number
    paymentProof?: NullableStringFieldUpdateOperationsInput | string | null
    disputeId?: NullableStringFieldUpdateOperationsInput | string | null
    confirmationDeadline?: DateTimeFieldUpdateOperationsInput | Date | string
    canCustomerDispute?: BoolFieldUpdateOperationsInput | boolean
    canExchangerDispute?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    customerId?: StringFieldUpdateOperationsInput | string
    exchangerId?: StringFieldUpdateOperationsInput | string
    listingId?: StringFieldUpdateOperationsInput | string
    dispute?: DisputeUncheckedUpdateOneWithoutTransactionNestedInput
    review?: ReviewUncheckedUpdateOneWithoutTransactionNestedInput
  }

  export type ExchangeOfferCreateWithoutTransactionInput = {
    id?: string
    amount: number
    status?: $Enums.OfferStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutOffersInput
    listing: ExchangeListingCreateNestedOneWithoutOffersInput
  }

  export type ExchangeOfferUncheckedCreateWithoutTransactionInput = {
    id?: string
    amount: number
    status?: $Enums.OfferStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    listingId: string
  }

  export type ExchangeOfferCreateOrConnectWithoutTransactionInput = {
    where: ExchangeOfferWhereUniqueInput
    create: XOR<ExchangeOfferCreateWithoutTransactionInput, ExchangeOfferUncheckedCreateWithoutTransactionInput>
  }

  export type UserCreateWithoutCustomerTransactionsInput = {
    id?: string
    email: string
    password: string
    role?: $Enums.UserRole
    isExchangerActive?: boolean
    isFrozen?: boolean
    frozenUntil?: Date | string | null
    missedOffersCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    listings?: ExchangeListingCreateNestedManyWithoutUserInput
    offers?: ExchangeOfferCreateNestedManyWithoutUserInput
    exchangerTransactions?: ExchangeTransactionCreateNestedManyWithoutExchangerInput
    disputesInitiated?: DisputeCreateNestedManyWithoutInitiatorInput
    disputesModerated?: DisputeCreateNestedManyWithoutModeratorInput
    reviewsWritten?: ReviewCreateNestedManyWithoutAuthorInput
    reviewsReceived?: ReviewCreateNestedManyWithoutTargetInput
    balance?: UserBalanceCreateNestedOneWithoutUserInput
    exchangerSettings?: ExchangerSettingsCreateNestedOneWithoutUserInput
    holds?: BalanceHoldCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCustomerTransactionsInput = {
    id?: string
    email: string
    password: string
    role?: $Enums.UserRole
    isExchangerActive?: boolean
    isFrozen?: boolean
    frozenUntil?: Date | string | null
    missedOffersCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    listings?: ExchangeListingUncheckedCreateNestedManyWithoutUserInput
    offers?: ExchangeOfferUncheckedCreateNestedManyWithoutUserInput
    exchangerTransactions?: ExchangeTransactionUncheckedCreateNestedManyWithoutExchangerInput
    disputesInitiated?: DisputeUncheckedCreateNestedManyWithoutInitiatorInput
    disputesModerated?: DisputeUncheckedCreateNestedManyWithoutModeratorInput
    reviewsWritten?: ReviewUncheckedCreateNestedManyWithoutAuthorInput
    reviewsReceived?: ReviewUncheckedCreateNestedManyWithoutTargetInput
    balance?: UserBalanceUncheckedCreateNestedOneWithoutUserInput
    exchangerSettings?: ExchangerSettingsUncheckedCreateNestedOneWithoutUserInput
    holds?: BalanceHoldUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCustomerTransactionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCustomerTransactionsInput, UserUncheckedCreateWithoutCustomerTransactionsInput>
  }

  export type UserCreateWithoutExchangerTransactionsInput = {
    id?: string
    email: string
    password: string
    role?: $Enums.UserRole
    isExchangerActive?: boolean
    isFrozen?: boolean
    frozenUntil?: Date | string | null
    missedOffersCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    listings?: ExchangeListingCreateNestedManyWithoutUserInput
    offers?: ExchangeOfferCreateNestedManyWithoutUserInput
    customerTransactions?: ExchangeTransactionCreateNestedManyWithoutCustomerInput
    disputesInitiated?: DisputeCreateNestedManyWithoutInitiatorInput
    disputesModerated?: DisputeCreateNestedManyWithoutModeratorInput
    reviewsWritten?: ReviewCreateNestedManyWithoutAuthorInput
    reviewsReceived?: ReviewCreateNestedManyWithoutTargetInput
    balance?: UserBalanceCreateNestedOneWithoutUserInput
    exchangerSettings?: ExchangerSettingsCreateNestedOneWithoutUserInput
    holds?: BalanceHoldCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutExchangerTransactionsInput = {
    id?: string
    email: string
    password: string
    role?: $Enums.UserRole
    isExchangerActive?: boolean
    isFrozen?: boolean
    frozenUntil?: Date | string | null
    missedOffersCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    listings?: ExchangeListingUncheckedCreateNestedManyWithoutUserInput
    offers?: ExchangeOfferUncheckedCreateNestedManyWithoutUserInput
    customerTransactions?: ExchangeTransactionUncheckedCreateNestedManyWithoutCustomerInput
    disputesInitiated?: DisputeUncheckedCreateNestedManyWithoutInitiatorInput
    disputesModerated?: DisputeUncheckedCreateNestedManyWithoutModeratorInput
    reviewsWritten?: ReviewUncheckedCreateNestedManyWithoutAuthorInput
    reviewsReceived?: ReviewUncheckedCreateNestedManyWithoutTargetInput
    balance?: UserBalanceUncheckedCreateNestedOneWithoutUserInput
    exchangerSettings?: ExchangerSettingsUncheckedCreateNestedOneWithoutUserInput
    holds?: BalanceHoldUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutExchangerTransactionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutExchangerTransactionsInput, UserUncheckedCreateWithoutExchangerTransactionsInput>
  }

  export type ExchangeListingCreateWithoutTransactionsInput = {
    id?: string
    type: $Enums.ExchangeType
    cryptocurrency: string
    fiatCurrency: string
    rate: number
    minAmount: number
    maxAmount: number
    availableAmount: number
    paymentMethods?: ExchangeListingCreatepaymentMethodsInput | $Enums.PaymentMethod[]
    terms?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutListingsInput
    offers?: ExchangeOfferCreateNestedManyWithoutListingInput
  }

  export type ExchangeListingUncheckedCreateWithoutTransactionsInput = {
    id?: string
    type: $Enums.ExchangeType
    cryptocurrency: string
    fiatCurrency: string
    rate: number
    minAmount: number
    maxAmount: number
    availableAmount: number
    paymentMethods?: ExchangeListingCreatepaymentMethodsInput | $Enums.PaymentMethod[]
    terms?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    offers?: ExchangeOfferUncheckedCreateNestedManyWithoutListingInput
  }

  export type ExchangeListingCreateOrConnectWithoutTransactionsInput = {
    where: ExchangeListingWhereUniqueInput
    create: XOR<ExchangeListingCreateWithoutTransactionsInput, ExchangeListingUncheckedCreateWithoutTransactionsInput>
  }

  export type DisputeCreateWithoutTransactionInput = {
    id?: string
    reason: string
    status?: $Enums.DisputeStatus
    resolution?: string | null
    resolvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    initiator: UserCreateNestedOneWithoutDisputesInitiatedInput
    moderator?: UserCreateNestedOneWithoutDisputesModeratedInput
  }

  export type DisputeUncheckedCreateWithoutTransactionInput = {
    id?: string
    reason: string
    status?: $Enums.DisputeStatus
    resolution?: string | null
    resolvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    initiatorId: string
    moderatorId?: string | null
  }

  export type DisputeCreateOrConnectWithoutTransactionInput = {
    where: DisputeWhereUniqueInput
    create: XOR<DisputeCreateWithoutTransactionInput, DisputeUncheckedCreateWithoutTransactionInput>
  }

  export type ReviewCreateWithoutTransactionInput = {
    id?: string
    rating: number
    comment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    author: UserCreateNestedOneWithoutReviewsWrittenInput
    target: UserCreateNestedOneWithoutReviewsReceivedInput
  }

  export type ReviewUncheckedCreateWithoutTransactionInput = {
    id?: string
    rating: number
    comment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    authorId: string
    targetId: string
  }

  export type ReviewCreateOrConnectWithoutTransactionInput = {
    where: ReviewWhereUniqueInput
    create: XOR<ReviewCreateWithoutTransactionInput, ReviewUncheckedCreateWithoutTransactionInput>
  }

  export type ExchangeOfferUpsertWithoutTransactionInput = {
    update: XOR<ExchangeOfferUpdateWithoutTransactionInput, ExchangeOfferUncheckedUpdateWithoutTransactionInput>
    create: XOR<ExchangeOfferCreateWithoutTransactionInput, ExchangeOfferUncheckedCreateWithoutTransactionInput>
    where?: ExchangeOfferWhereInput
  }

  export type ExchangeOfferUpdateToOneWithWhereWithoutTransactionInput = {
    where?: ExchangeOfferWhereInput
    data: XOR<ExchangeOfferUpdateWithoutTransactionInput, ExchangeOfferUncheckedUpdateWithoutTransactionInput>
  }

  export type ExchangeOfferUpdateWithoutTransactionInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    status?: EnumOfferStatusFieldUpdateOperationsInput | $Enums.OfferStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutOffersNestedInput
    listing?: ExchangeListingUpdateOneRequiredWithoutOffersNestedInput
  }

  export type ExchangeOfferUncheckedUpdateWithoutTransactionInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    status?: EnumOfferStatusFieldUpdateOperationsInput | $Enums.OfferStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    listingId?: StringFieldUpdateOperationsInput | string
  }

  export type UserUpsertWithoutCustomerTransactionsInput = {
    update: XOR<UserUpdateWithoutCustomerTransactionsInput, UserUncheckedUpdateWithoutCustomerTransactionsInput>
    create: XOR<UserCreateWithoutCustomerTransactionsInput, UserUncheckedCreateWithoutCustomerTransactionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCustomerTransactionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCustomerTransactionsInput, UserUncheckedUpdateWithoutCustomerTransactionsInput>
  }

  export type UserUpdateWithoutCustomerTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isExchangerActive?: BoolFieldUpdateOperationsInput | boolean
    isFrozen?: BoolFieldUpdateOperationsInput | boolean
    frozenUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    missedOffersCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listings?: ExchangeListingUpdateManyWithoutUserNestedInput
    offers?: ExchangeOfferUpdateManyWithoutUserNestedInput
    exchangerTransactions?: ExchangeTransactionUpdateManyWithoutExchangerNestedInput
    disputesInitiated?: DisputeUpdateManyWithoutInitiatorNestedInput
    disputesModerated?: DisputeUpdateManyWithoutModeratorNestedInput
    reviewsWritten?: ReviewUpdateManyWithoutAuthorNestedInput
    reviewsReceived?: ReviewUpdateManyWithoutTargetNestedInput
    balance?: UserBalanceUpdateOneWithoutUserNestedInput
    exchangerSettings?: ExchangerSettingsUpdateOneWithoutUserNestedInput
    holds?: BalanceHoldUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCustomerTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isExchangerActive?: BoolFieldUpdateOperationsInput | boolean
    isFrozen?: BoolFieldUpdateOperationsInput | boolean
    frozenUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    missedOffersCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listings?: ExchangeListingUncheckedUpdateManyWithoutUserNestedInput
    offers?: ExchangeOfferUncheckedUpdateManyWithoutUserNestedInput
    exchangerTransactions?: ExchangeTransactionUncheckedUpdateManyWithoutExchangerNestedInput
    disputesInitiated?: DisputeUncheckedUpdateManyWithoutInitiatorNestedInput
    disputesModerated?: DisputeUncheckedUpdateManyWithoutModeratorNestedInput
    reviewsWritten?: ReviewUncheckedUpdateManyWithoutAuthorNestedInput
    reviewsReceived?: ReviewUncheckedUpdateManyWithoutTargetNestedInput
    balance?: UserBalanceUncheckedUpdateOneWithoutUserNestedInput
    exchangerSettings?: ExchangerSettingsUncheckedUpdateOneWithoutUserNestedInput
    holds?: BalanceHoldUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUpsertWithoutExchangerTransactionsInput = {
    update: XOR<UserUpdateWithoutExchangerTransactionsInput, UserUncheckedUpdateWithoutExchangerTransactionsInput>
    create: XOR<UserCreateWithoutExchangerTransactionsInput, UserUncheckedCreateWithoutExchangerTransactionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutExchangerTransactionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutExchangerTransactionsInput, UserUncheckedUpdateWithoutExchangerTransactionsInput>
  }

  export type UserUpdateWithoutExchangerTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isExchangerActive?: BoolFieldUpdateOperationsInput | boolean
    isFrozen?: BoolFieldUpdateOperationsInput | boolean
    frozenUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    missedOffersCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listings?: ExchangeListingUpdateManyWithoutUserNestedInput
    offers?: ExchangeOfferUpdateManyWithoutUserNestedInput
    customerTransactions?: ExchangeTransactionUpdateManyWithoutCustomerNestedInput
    disputesInitiated?: DisputeUpdateManyWithoutInitiatorNestedInput
    disputesModerated?: DisputeUpdateManyWithoutModeratorNestedInput
    reviewsWritten?: ReviewUpdateManyWithoutAuthorNestedInput
    reviewsReceived?: ReviewUpdateManyWithoutTargetNestedInput
    balance?: UserBalanceUpdateOneWithoutUserNestedInput
    exchangerSettings?: ExchangerSettingsUpdateOneWithoutUserNestedInput
    holds?: BalanceHoldUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutExchangerTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isExchangerActive?: BoolFieldUpdateOperationsInput | boolean
    isFrozen?: BoolFieldUpdateOperationsInput | boolean
    frozenUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    missedOffersCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listings?: ExchangeListingUncheckedUpdateManyWithoutUserNestedInput
    offers?: ExchangeOfferUncheckedUpdateManyWithoutUserNestedInput
    customerTransactions?: ExchangeTransactionUncheckedUpdateManyWithoutCustomerNestedInput
    disputesInitiated?: DisputeUncheckedUpdateManyWithoutInitiatorNestedInput
    disputesModerated?: DisputeUncheckedUpdateManyWithoutModeratorNestedInput
    reviewsWritten?: ReviewUncheckedUpdateManyWithoutAuthorNestedInput
    reviewsReceived?: ReviewUncheckedUpdateManyWithoutTargetNestedInput
    balance?: UserBalanceUncheckedUpdateOneWithoutUserNestedInput
    exchangerSettings?: ExchangerSettingsUncheckedUpdateOneWithoutUserNestedInput
    holds?: BalanceHoldUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ExchangeListingUpsertWithoutTransactionsInput = {
    update: XOR<ExchangeListingUpdateWithoutTransactionsInput, ExchangeListingUncheckedUpdateWithoutTransactionsInput>
    create: XOR<ExchangeListingCreateWithoutTransactionsInput, ExchangeListingUncheckedCreateWithoutTransactionsInput>
    where?: ExchangeListingWhereInput
  }

  export type ExchangeListingUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: ExchangeListingWhereInput
    data: XOR<ExchangeListingUpdateWithoutTransactionsInput, ExchangeListingUncheckedUpdateWithoutTransactionsInput>
  }

  export type ExchangeListingUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumExchangeTypeFieldUpdateOperationsInput | $Enums.ExchangeType
    cryptocurrency?: StringFieldUpdateOperationsInput | string
    fiatCurrency?: StringFieldUpdateOperationsInput | string
    rate?: FloatFieldUpdateOperationsInput | number
    minAmount?: FloatFieldUpdateOperationsInput | number
    maxAmount?: FloatFieldUpdateOperationsInput | number
    availableAmount?: FloatFieldUpdateOperationsInput | number
    paymentMethods?: ExchangeListingUpdatepaymentMethodsInput | $Enums.PaymentMethod[]
    terms?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutListingsNestedInput
    offers?: ExchangeOfferUpdateManyWithoutListingNestedInput
  }

  export type ExchangeListingUncheckedUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumExchangeTypeFieldUpdateOperationsInput | $Enums.ExchangeType
    cryptocurrency?: StringFieldUpdateOperationsInput | string
    fiatCurrency?: StringFieldUpdateOperationsInput | string
    rate?: FloatFieldUpdateOperationsInput | number
    minAmount?: FloatFieldUpdateOperationsInput | number
    maxAmount?: FloatFieldUpdateOperationsInput | number
    availableAmount?: FloatFieldUpdateOperationsInput | number
    paymentMethods?: ExchangeListingUpdatepaymentMethodsInput | $Enums.PaymentMethod[]
    terms?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    offers?: ExchangeOfferUncheckedUpdateManyWithoutListingNestedInput
  }

  export type DisputeUpsertWithoutTransactionInput = {
    update: XOR<DisputeUpdateWithoutTransactionInput, DisputeUncheckedUpdateWithoutTransactionInput>
    create: XOR<DisputeCreateWithoutTransactionInput, DisputeUncheckedCreateWithoutTransactionInput>
    where?: DisputeWhereInput
  }

  export type DisputeUpdateToOneWithWhereWithoutTransactionInput = {
    where?: DisputeWhereInput
    data: XOR<DisputeUpdateWithoutTransactionInput, DisputeUncheckedUpdateWithoutTransactionInput>
  }

  export type DisputeUpdateWithoutTransactionInput = {
    id?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    status?: EnumDisputeStatusFieldUpdateOperationsInput | $Enums.DisputeStatus
    resolution?: NullableStringFieldUpdateOperationsInput | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    initiator?: UserUpdateOneRequiredWithoutDisputesInitiatedNestedInput
    moderator?: UserUpdateOneWithoutDisputesModeratedNestedInput
  }

  export type DisputeUncheckedUpdateWithoutTransactionInput = {
    id?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    status?: EnumDisputeStatusFieldUpdateOperationsInput | $Enums.DisputeStatus
    resolution?: NullableStringFieldUpdateOperationsInput | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    initiatorId?: StringFieldUpdateOperationsInput | string
    moderatorId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ReviewUpsertWithoutTransactionInput = {
    update: XOR<ReviewUpdateWithoutTransactionInput, ReviewUncheckedUpdateWithoutTransactionInput>
    create: XOR<ReviewCreateWithoutTransactionInput, ReviewUncheckedCreateWithoutTransactionInput>
    where?: ReviewWhereInput
  }

  export type ReviewUpdateToOneWithWhereWithoutTransactionInput = {
    where?: ReviewWhereInput
    data: XOR<ReviewUpdateWithoutTransactionInput, ReviewUncheckedUpdateWithoutTransactionInput>
  }

  export type ReviewUpdateWithoutTransactionInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: UserUpdateOneRequiredWithoutReviewsWrittenNestedInput
    target?: UserUpdateOneRequiredWithoutReviewsReceivedNestedInput
  }

  export type ReviewUncheckedUpdateWithoutTransactionInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authorId?: StringFieldUpdateOperationsInput | string
    targetId?: StringFieldUpdateOperationsInput | string
  }

  export type ExchangeTransactionCreateWithoutDisputeInput = {
    id?: string
    type: $Enums.ExchangeType
    status?: $Enums.TransactionStatus
    cryptocurrency: string
    fiatCurrency: string
    cryptoAmount: number
    fiatAmount: number
    paymentProof?: string | null
    disputeId?: string | null
    confirmationDeadline: Date | string
    canCustomerDispute?: boolean
    canExchangerDispute?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    finishedAt?: Date | string | null
    offer?: ExchangeOfferCreateNestedOneWithoutTransactionInput
    customer: UserCreateNestedOneWithoutCustomerTransactionsInput
    exchanger: UserCreateNestedOneWithoutExchangerTransactionsInput
    listing: ExchangeListingCreateNestedOneWithoutTransactionsInput
    review?: ReviewCreateNestedOneWithoutTransactionInput
  }

  export type ExchangeTransactionUncheckedCreateWithoutDisputeInput = {
    id?: string
    type: $Enums.ExchangeType
    status?: $Enums.TransactionStatus
    cryptocurrency: string
    fiatCurrency: string
    cryptoAmount: number
    fiatAmount: number
    paymentProof?: string | null
    disputeId?: string | null
    confirmationDeadline: Date | string
    canCustomerDispute?: boolean
    canExchangerDispute?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    finishedAt?: Date | string | null
    offerId?: string | null
    customerId: string
    exchangerId: string
    listingId: string
    review?: ReviewUncheckedCreateNestedOneWithoutTransactionInput
  }

  export type ExchangeTransactionCreateOrConnectWithoutDisputeInput = {
    where: ExchangeTransactionWhereUniqueInput
    create: XOR<ExchangeTransactionCreateWithoutDisputeInput, ExchangeTransactionUncheckedCreateWithoutDisputeInput>
  }

  export type UserCreateWithoutDisputesInitiatedInput = {
    id?: string
    email: string
    password: string
    role?: $Enums.UserRole
    isExchangerActive?: boolean
    isFrozen?: boolean
    frozenUntil?: Date | string | null
    missedOffersCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    listings?: ExchangeListingCreateNestedManyWithoutUserInput
    offers?: ExchangeOfferCreateNestedManyWithoutUserInput
    exchangerTransactions?: ExchangeTransactionCreateNestedManyWithoutExchangerInput
    customerTransactions?: ExchangeTransactionCreateNestedManyWithoutCustomerInput
    disputesModerated?: DisputeCreateNestedManyWithoutModeratorInput
    reviewsWritten?: ReviewCreateNestedManyWithoutAuthorInput
    reviewsReceived?: ReviewCreateNestedManyWithoutTargetInput
    balance?: UserBalanceCreateNestedOneWithoutUserInput
    exchangerSettings?: ExchangerSettingsCreateNestedOneWithoutUserInput
    holds?: BalanceHoldCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutDisputesInitiatedInput = {
    id?: string
    email: string
    password: string
    role?: $Enums.UserRole
    isExchangerActive?: boolean
    isFrozen?: boolean
    frozenUntil?: Date | string | null
    missedOffersCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    listings?: ExchangeListingUncheckedCreateNestedManyWithoutUserInput
    offers?: ExchangeOfferUncheckedCreateNestedManyWithoutUserInput
    exchangerTransactions?: ExchangeTransactionUncheckedCreateNestedManyWithoutExchangerInput
    customerTransactions?: ExchangeTransactionUncheckedCreateNestedManyWithoutCustomerInput
    disputesModerated?: DisputeUncheckedCreateNestedManyWithoutModeratorInput
    reviewsWritten?: ReviewUncheckedCreateNestedManyWithoutAuthorInput
    reviewsReceived?: ReviewUncheckedCreateNestedManyWithoutTargetInput
    balance?: UserBalanceUncheckedCreateNestedOneWithoutUserInput
    exchangerSettings?: ExchangerSettingsUncheckedCreateNestedOneWithoutUserInput
    holds?: BalanceHoldUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutDisputesInitiatedInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDisputesInitiatedInput, UserUncheckedCreateWithoutDisputesInitiatedInput>
  }

  export type UserCreateWithoutDisputesModeratedInput = {
    id?: string
    email: string
    password: string
    role?: $Enums.UserRole
    isExchangerActive?: boolean
    isFrozen?: boolean
    frozenUntil?: Date | string | null
    missedOffersCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    listings?: ExchangeListingCreateNestedManyWithoutUserInput
    offers?: ExchangeOfferCreateNestedManyWithoutUserInput
    exchangerTransactions?: ExchangeTransactionCreateNestedManyWithoutExchangerInput
    customerTransactions?: ExchangeTransactionCreateNestedManyWithoutCustomerInput
    disputesInitiated?: DisputeCreateNestedManyWithoutInitiatorInput
    reviewsWritten?: ReviewCreateNestedManyWithoutAuthorInput
    reviewsReceived?: ReviewCreateNestedManyWithoutTargetInput
    balance?: UserBalanceCreateNestedOneWithoutUserInput
    exchangerSettings?: ExchangerSettingsCreateNestedOneWithoutUserInput
    holds?: BalanceHoldCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutDisputesModeratedInput = {
    id?: string
    email: string
    password: string
    role?: $Enums.UserRole
    isExchangerActive?: boolean
    isFrozen?: boolean
    frozenUntil?: Date | string | null
    missedOffersCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    listings?: ExchangeListingUncheckedCreateNestedManyWithoutUserInput
    offers?: ExchangeOfferUncheckedCreateNestedManyWithoutUserInput
    exchangerTransactions?: ExchangeTransactionUncheckedCreateNestedManyWithoutExchangerInput
    customerTransactions?: ExchangeTransactionUncheckedCreateNestedManyWithoutCustomerInput
    disputesInitiated?: DisputeUncheckedCreateNestedManyWithoutInitiatorInput
    reviewsWritten?: ReviewUncheckedCreateNestedManyWithoutAuthorInput
    reviewsReceived?: ReviewUncheckedCreateNestedManyWithoutTargetInput
    balance?: UserBalanceUncheckedCreateNestedOneWithoutUserInput
    exchangerSettings?: ExchangerSettingsUncheckedCreateNestedOneWithoutUserInput
    holds?: BalanceHoldUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutDisputesModeratedInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDisputesModeratedInput, UserUncheckedCreateWithoutDisputesModeratedInput>
  }

  export type ExchangeTransactionUpsertWithoutDisputeInput = {
    update: XOR<ExchangeTransactionUpdateWithoutDisputeInput, ExchangeTransactionUncheckedUpdateWithoutDisputeInput>
    create: XOR<ExchangeTransactionCreateWithoutDisputeInput, ExchangeTransactionUncheckedCreateWithoutDisputeInput>
    where?: ExchangeTransactionWhereInput
  }

  export type ExchangeTransactionUpdateToOneWithWhereWithoutDisputeInput = {
    where?: ExchangeTransactionWhereInput
    data: XOR<ExchangeTransactionUpdateWithoutDisputeInput, ExchangeTransactionUncheckedUpdateWithoutDisputeInput>
  }

  export type ExchangeTransactionUpdateWithoutDisputeInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumExchangeTypeFieldUpdateOperationsInput | $Enums.ExchangeType
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    cryptocurrency?: StringFieldUpdateOperationsInput | string
    fiatCurrency?: StringFieldUpdateOperationsInput | string
    cryptoAmount?: FloatFieldUpdateOperationsInput | number
    fiatAmount?: FloatFieldUpdateOperationsInput | number
    paymentProof?: NullableStringFieldUpdateOperationsInput | string | null
    disputeId?: NullableStringFieldUpdateOperationsInput | string | null
    confirmationDeadline?: DateTimeFieldUpdateOperationsInput | Date | string
    canCustomerDispute?: BoolFieldUpdateOperationsInput | boolean
    canExchangerDispute?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    offer?: ExchangeOfferUpdateOneWithoutTransactionNestedInput
    customer?: UserUpdateOneRequiredWithoutCustomerTransactionsNestedInput
    exchanger?: UserUpdateOneRequiredWithoutExchangerTransactionsNestedInput
    listing?: ExchangeListingUpdateOneRequiredWithoutTransactionsNestedInput
    review?: ReviewUpdateOneWithoutTransactionNestedInput
  }

  export type ExchangeTransactionUncheckedUpdateWithoutDisputeInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumExchangeTypeFieldUpdateOperationsInput | $Enums.ExchangeType
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    cryptocurrency?: StringFieldUpdateOperationsInput | string
    fiatCurrency?: StringFieldUpdateOperationsInput | string
    cryptoAmount?: FloatFieldUpdateOperationsInput | number
    fiatAmount?: FloatFieldUpdateOperationsInput | number
    paymentProof?: NullableStringFieldUpdateOperationsInput | string | null
    disputeId?: NullableStringFieldUpdateOperationsInput | string | null
    confirmationDeadline?: DateTimeFieldUpdateOperationsInput | Date | string
    canCustomerDispute?: BoolFieldUpdateOperationsInput | boolean
    canExchangerDispute?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    offerId?: NullableStringFieldUpdateOperationsInput | string | null
    customerId?: StringFieldUpdateOperationsInput | string
    exchangerId?: StringFieldUpdateOperationsInput | string
    listingId?: StringFieldUpdateOperationsInput | string
    review?: ReviewUncheckedUpdateOneWithoutTransactionNestedInput
  }

  export type UserUpsertWithoutDisputesInitiatedInput = {
    update: XOR<UserUpdateWithoutDisputesInitiatedInput, UserUncheckedUpdateWithoutDisputesInitiatedInput>
    create: XOR<UserCreateWithoutDisputesInitiatedInput, UserUncheckedCreateWithoutDisputesInitiatedInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutDisputesInitiatedInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDisputesInitiatedInput, UserUncheckedUpdateWithoutDisputesInitiatedInput>
  }

  export type UserUpdateWithoutDisputesInitiatedInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isExchangerActive?: BoolFieldUpdateOperationsInput | boolean
    isFrozen?: BoolFieldUpdateOperationsInput | boolean
    frozenUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    missedOffersCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listings?: ExchangeListingUpdateManyWithoutUserNestedInput
    offers?: ExchangeOfferUpdateManyWithoutUserNestedInput
    exchangerTransactions?: ExchangeTransactionUpdateManyWithoutExchangerNestedInput
    customerTransactions?: ExchangeTransactionUpdateManyWithoutCustomerNestedInput
    disputesModerated?: DisputeUpdateManyWithoutModeratorNestedInput
    reviewsWritten?: ReviewUpdateManyWithoutAuthorNestedInput
    reviewsReceived?: ReviewUpdateManyWithoutTargetNestedInput
    balance?: UserBalanceUpdateOneWithoutUserNestedInput
    exchangerSettings?: ExchangerSettingsUpdateOneWithoutUserNestedInput
    holds?: BalanceHoldUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutDisputesInitiatedInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isExchangerActive?: BoolFieldUpdateOperationsInput | boolean
    isFrozen?: BoolFieldUpdateOperationsInput | boolean
    frozenUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    missedOffersCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listings?: ExchangeListingUncheckedUpdateManyWithoutUserNestedInput
    offers?: ExchangeOfferUncheckedUpdateManyWithoutUserNestedInput
    exchangerTransactions?: ExchangeTransactionUncheckedUpdateManyWithoutExchangerNestedInput
    customerTransactions?: ExchangeTransactionUncheckedUpdateManyWithoutCustomerNestedInput
    disputesModerated?: DisputeUncheckedUpdateManyWithoutModeratorNestedInput
    reviewsWritten?: ReviewUncheckedUpdateManyWithoutAuthorNestedInput
    reviewsReceived?: ReviewUncheckedUpdateManyWithoutTargetNestedInput
    balance?: UserBalanceUncheckedUpdateOneWithoutUserNestedInput
    exchangerSettings?: ExchangerSettingsUncheckedUpdateOneWithoutUserNestedInput
    holds?: BalanceHoldUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUpsertWithoutDisputesModeratedInput = {
    update: XOR<UserUpdateWithoutDisputesModeratedInput, UserUncheckedUpdateWithoutDisputesModeratedInput>
    create: XOR<UserCreateWithoutDisputesModeratedInput, UserUncheckedCreateWithoutDisputesModeratedInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutDisputesModeratedInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDisputesModeratedInput, UserUncheckedUpdateWithoutDisputesModeratedInput>
  }

  export type UserUpdateWithoutDisputesModeratedInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isExchangerActive?: BoolFieldUpdateOperationsInput | boolean
    isFrozen?: BoolFieldUpdateOperationsInput | boolean
    frozenUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    missedOffersCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listings?: ExchangeListingUpdateManyWithoutUserNestedInput
    offers?: ExchangeOfferUpdateManyWithoutUserNestedInput
    exchangerTransactions?: ExchangeTransactionUpdateManyWithoutExchangerNestedInput
    customerTransactions?: ExchangeTransactionUpdateManyWithoutCustomerNestedInput
    disputesInitiated?: DisputeUpdateManyWithoutInitiatorNestedInput
    reviewsWritten?: ReviewUpdateManyWithoutAuthorNestedInput
    reviewsReceived?: ReviewUpdateManyWithoutTargetNestedInput
    balance?: UserBalanceUpdateOneWithoutUserNestedInput
    exchangerSettings?: ExchangerSettingsUpdateOneWithoutUserNestedInput
    holds?: BalanceHoldUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutDisputesModeratedInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isExchangerActive?: BoolFieldUpdateOperationsInput | boolean
    isFrozen?: BoolFieldUpdateOperationsInput | boolean
    frozenUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    missedOffersCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listings?: ExchangeListingUncheckedUpdateManyWithoutUserNestedInput
    offers?: ExchangeOfferUncheckedUpdateManyWithoutUserNestedInput
    exchangerTransactions?: ExchangeTransactionUncheckedUpdateManyWithoutExchangerNestedInput
    customerTransactions?: ExchangeTransactionUncheckedUpdateManyWithoutCustomerNestedInput
    disputesInitiated?: DisputeUncheckedUpdateManyWithoutInitiatorNestedInput
    reviewsWritten?: ReviewUncheckedUpdateManyWithoutAuthorNestedInput
    reviewsReceived?: ReviewUncheckedUpdateManyWithoutTargetNestedInput
    balance?: UserBalanceUncheckedUpdateOneWithoutUserNestedInput
    exchangerSettings?: ExchangerSettingsUncheckedUpdateOneWithoutUserNestedInput
    holds?: BalanceHoldUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ExchangeTransactionCreateWithoutReviewInput = {
    id?: string
    type: $Enums.ExchangeType
    status?: $Enums.TransactionStatus
    cryptocurrency: string
    fiatCurrency: string
    cryptoAmount: number
    fiatAmount: number
    paymentProof?: string | null
    disputeId?: string | null
    confirmationDeadline: Date | string
    canCustomerDispute?: boolean
    canExchangerDispute?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    finishedAt?: Date | string | null
    offer?: ExchangeOfferCreateNestedOneWithoutTransactionInput
    customer: UserCreateNestedOneWithoutCustomerTransactionsInput
    exchanger: UserCreateNestedOneWithoutExchangerTransactionsInput
    listing: ExchangeListingCreateNestedOneWithoutTransactionsInput
    dispute?: DisputeCreateNestedOneWithoutTransactionInput
  }

  export type ExchangeTransactionUncheckedCreateWithoutReviewInput = {
    id?: string
    type: $Enums.ExchangeType
    status?: $Enums.TransactionStatus
    cryptocurrency: string
    fiatCurrency: string
    cryptoAmount: number
    fiatAmount: number
    paymentProof?: string | null
    disputeId?: string | null
    confirmationDeadline: Date | string
    canCustomerDispute?: boolean
    canExchangerDispute?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    finishedAt?: Date | string | null
    offerId?: string | null
    customerId: string
    exchangerId: string
    listingId: string
    dispute?: DisputeUncheckedCreateNestedOneWithoutTransactionInput
  }

  export type ExchangeTransactionCreateOrConnectWithoutReviewInput = {
    where: ExchangeTransactionWhereUniqueInput
    create: XOR<ExchangeTransactionCreateWithoutReviewInput, ExchangeTransactionUncheckedCreateWithoutReviewInput>
  }

  export type UserCreateWithoutReviewsWrittenInput = {
    id?: string
    email: string
    password: string
    role?: $Enums.UserRole
    isExchangerActive?: boolean
    isFrozen?: boolean
    frozenUntil?: Date | string | null
    missedOffersCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    listings?: ExchangeListingCreateNestedManyWithoutUserInput
    offers?: ExchangeOfferCreateNestedManyWithoutUserInput
    exchangerTransactions?: ExchangeTransactionCreateNestedManyWithoutExchangerInput
    customerTransactions?: ExchangeTransactionCreateNestedManyWithoutCustomerInput
    disputesInitiated?: DisputeCreateNestedManyWithoutInitiatorInput
    disputesModerated?: DisputeCreateNestedManyWithoutModeratorInput
    reviewsReceived?: ReviewCreateNestedManyWithoutTargetInput
    balance?: UserBalanceCreateNestedOneWithoutUserInput
    exchangerSettings?: ExchangerSettingsCreateNestedOneWithoutUserInput
    holds?: BalanceHoldCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutReviewsWrittenInput = {
    id?: string
    email: string
    password: string
    role?: $Enums.UserRole
    isExchangerActive?: boolean
    isFrozen?: boolean
    frozenUntil?: Date | string | null
    missedOffersCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    listings?: ExchangeListingUncheckedCreateNestedManyWithoutUserInput
    offers?: ExchangeOfferUncheckedCreateNestedManyWithoutUserInput
    exchangerTransactions?: ExchangeTransactionUncheckedCreateNestedManyWithoutExchangerInput
    customerTransactions?: ExchangeTransactionUncheckedCreateNestedManyWithoutCustomerInput
    disputesInitiated?: DisputeUncheckedCreateNestedManyWithoutInitiatorInput
    disputesModerated?: DisputeUncheckedCreateNestedManyWithoutModeratorInput
    reviewsReceived?: ReviewUncheckedCreateNestedManyWithoutTargetInput
    balance?: UserBalanceUncheckedCreateNestedOneWithoutUserInput
    exchangerSettings?: ExchangerSettingsUncheckedCreateNestedOneWithoutUserInput
    holds?: BalanceHoldUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutReviewsWrittenInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReviewsWrittenInput, UserUncheckedCreateWithoutReviewsWrittenInput>
  }

  export type UserCreateWithoutReviewsReceivedInput = {
    id?: string
    email: string
    password: string
    role?: $Enums.UserRole
    isExchangerActive?: boolean
    isFrozen?: boolean
    frozenUntil?: Date | string | null
    missedOffersCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    listings?: ExchangeListingCreateNestedManyWithoutUserInput
    offers?: ExchangeOfferCreateNestedManyWithoutUserInput
    exchangerTransactions?: ExchangeTransactionCreateNestedManyWithoutExchangerInput
    customerTransactions?: ExchangeTransactionCreateNestedManyWithoutCustomerInput
    disputesInitiated?: DisputeCreateNestedManyWithoutInitiatorInput
    disputesModerated?: DisputeCreateNestedManyWithoutModeratorInput
    reviewsWritten?: ReviewCreateNestedManyWithoutAuthorInput
    balance?: UserBalanceCreateNestedOneWithoutUserInput
    exchangerSettings?: ExchangerSettingsCreateNestedOneWithoutUserInput
    holds?: BalanceHoldCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutReviewsReceivedInput = {
    id?: string
    email: string
    password: string
    role?: $Enums.UserRole
    isExchangerActive?: boolean
    isFrozen?: boolean
    frozenUntil?: Date | string | null
    missedOffersCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    listings?: ExchangeListingUncheckedCreateNestedManyWithoutUserInput
    offers?: ExchangeOfferUncheckedCreateNestedManyWithoutUserInput
    exchangerTransactions?: ExchangeTransactionUncheckedCreateNestedManyWithoutExchangerInput
    customerTransactions?: ExchangeTransactionUncheckedCreateNestedManyWithoutCustomerInput
    disputesInitiated?: DisputeUncheckedCreateNestedManyWithoutInitiatorInput
    disputesModerated?: DisputeUncheckedCreateNestedManyWithoutModeratorInput
    reviewsWritten?: ReviewUncheckedCreateNestedManyWithoutAuthorInput
    balance?: UserBalanceUncheckedCreateNestedOneWithoutUserInput
    exchangerSettings?: ExchangerSettingsUncheckedCreateNestedOneWithoutUserInput
    holds?: BalanceHoldUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutReviewsReceivedInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReviewsReceivedInput, UserUncheckedCreateWithoutReviewsReceivedInput>
  }

  export type ExchangeTransactionUpsertWithoutReviewInput = {
    update: XOR<ExchangeTransactionUpdateWithoutReviewInput, ExchangeTransactionUncheckedUpdateWithoutReviewInput>
    create: XOR<ExchangeTransactionCreateWithoutReviewInput, ExchangeTransactionUncheckedCreateWithoutReviewInput>
    where?: ExchangeTransactionWhereInput
  }

  export type ExchangeTransactionUpdateToOneWithWhereWithoutReviewInput = {
    where?: ExchangeTransactionWhereInput
    data: XOR<ExchangeTransactionUpdateWithoutReviewInput, ExchangeTransactionUncheckedUpdateWithoutReviewInput>
  }

  export type ExchangeTransactionUpdateWithoutReviewInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumExchangeTypeFieldUpdateOperationsInput | $Enums.ExchangeType
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    cryptocurrency?: StringFieldUpdateOperationsInput | string
    fiatCurrency?: StringFieldUpdateOperationsInput | string
    cryptoAmount?: FloatFieldUpdateOperationsInput | number
    fiatAmount?: FloatFieldUpdateOperationsInput | number
    paymentProof?: NullableStringFieldUpdateOperationsInput | string | null
    disputeId?: NullableStringFieldUpdateOperationsInput | string | null
    confirmationDeadline?: DateTimeFieldUpdateOperationsInput | Date | string
    canCustomerDispute?: BoolFieldUpdateOperationsInput | boolean
    canExchangerDispute?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    offer?: ExchangeOfferUpdateOneWithoutTransactionNestedInput
    customer?: UserUpdateOneRequiredWithoutCustomerTransactionsNestedInput
    exchanger?: UserUpdateOneRequiredWithoutExchangerTransactionsNestedInput
    listing?: ExchangeListingUpdateOneRequiredWithoutTransactionsNestedInput
    dispute?: DisputeUpdateOneWithoutTransactionNestedInput
  }

  export type ExchangeTransactionUncheckedUpdateWithoutReviewInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumExchangeTypeFieldUpdateOperationsInput | $Enums.ExchangeType
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    cryptocurrency?: StringFieldUpdateOperationsInput | string
    fiatCurrency?: StringFieldUpdateOperationsInput | string
    cryptoAmount?: FloatFieldUpdateOperationsInput | number
    fiatAmount?: FloatFieldUpdateOperationsInput | number
    paymentProof?: NullableStringFieldUpdateOperationsInput | string | null
    disputeId?: NullableStringFieldUpdateOperationsInput | string | null
    confirmationDeadline?: DateTimeFieldUpdateOperationsInput | Date | string
    canCustomerDispute?: BoolFieldUpdateOperationsInput | boolean
    canExchangerDispute?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    offerId?: NullableStringFieldUpdateOperationsInput | string | null
    customerId?: StringFieldUpdateOperationsInput | string
    exchangerId?: StringFieldUpdateOperationsInput | string
    listingId?: StringFieldUpdateOperationsInput | string
    dispute?: DisputeUncheckedUpdateOneWithoutTransactionNestedInput
  }

  export type UserUpsertWithoutReviewsWrittenInput = {
    update: XOR<UserUpdateWithoutReviewsWrittenInput, UserUncheckedUpdateWithoutReviewsWrittenInput>
    create: XOR<UserCreateWithoutReviewsWrittenInput, UserUncheckedCreateWithoutReviewsWrittenInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReviewsWrittenInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReviewsWrittenInput, UserUncheckedUpdateWithoutReviewsWrittenInput>
  }

  export type UserUpdateWithoutReviewsWrittenInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isExchangerActive?: BoolFieldUpdateOperationsInput | boolean
    isFrozen?: BoolFieldUpdateOperationsInput | boolean
    frozenUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    missedOffersCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listings?: ExchangeListingUpdateManyWithoutUserNestedInput
    offers?: ExchangeOfferUpdateManyWithoutUserNestedInput
    exchangerTransactions?: ExchangeTransactionUpdateManyWithoutExchangerNestedInput
    customerTransactions?: ExchangeTransactionUpdateManyWithoutCustomerNestedInput
    disputesInitiated?: DisputeUpdateManyWithoutInitiatorNestedInput
    disputesModerated?: DisputeUpdateManyWithoutModeratorNestedInput
    reviewsReceived?: ReviewUpdateManyWithoutTargetNestedInput
    balance?: UserBalanceUpdateOneWithoutUserNestedInput
    exchangerSettings?: ExchangerSettingsUpdateOneWithoutUserNestedInput
    holds?: BalanceHoldUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutReviewsWrittenInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isExchangerActive?: BoolFieldUpdateOperationsInput | boolean
    isFrozen?: BoolFieldUpdateOperationsInput | boolean
    frozenUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    missedOffersCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listings?: ExchangeListingUncheckedUpdateManyWithoutUserNestedInput
    offers?: ExchangeOfferUncheckedUpdateManyWithoutUserNestedInput
    exchangerTransactions?: ExchangeTransactionUncheckedUpdateManyWithoutExchangerNestedInput
    customerTransactions?: ExchangeTransactionUncheckedUpdateManyWithoutCustomerNestedInput
    disputesInitiated?: DisputeUncheckedUpdateManyWithoutInitiatorNestedInput
    disputesModerated?: DisputeUncheckedUpdateManyWithoutModeratorNestedInput
    reviewsReceived?: ReviewUncheckedUpdateManyWithoutTargetNestedInput
    balance?: UserBalanceUncheckedUpdateOneWithoutUserNestedInput
    exchangerSettings?: ExchangerSettingsUncheckedUpdateOneWithoutUserNestedInput
    holds?: BalanceHoldUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUpsertWithoutReviewsReceivedInput = {
    update: XOR<UserUpdateWithoutReviewsReceivedInput, UserUncheckedUpdateWithoutReviewsReceivedInput>
    create: XOR<UserCreateWithoutReviewsReceivedInput, UserUncheckedCreateWithoutReviewsReceivedInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReviewsReceivedInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReviewsReceivedInput, UserUncheckedUpdateWithoutReviewsReceivedInput>
  }

  export type UserUpdateWithoutReviewsReceivedInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isExchangerActive?: BoolFieldUpdateOperationsInput | boolean
    isFrozen?: BoolFieldUpdateOperationsInput | boolean
    frozenUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    missedOffersCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listings?: ExchangeListingUpdateManyWithoutUserNestedInput
    offers?: ExchangeOfferUpdateManyWithoutUserNestedInput
    exchangerTransactions?: ExchangeTransactionUpdateManyWithoutExchangerNestedInput
    customerTransactions?: ExchangeTransactionUpdateManyWithoutCustomerNestedInput
    disputesInitiated?: DisputeUpdateManyWithoutInitiatorNestedInput
    disputesModerated?: DisputeUpdateManyWithoutModeratorNestedInput
    reviewsWritten?: ReviewUpdateManyWithoutAuthorNestedInput
    balance?: UserBalanceUpdateOneWithoutUserNestedInput
    exchangerSettings?: ExchangerSettingsUpdateOneWithoutUserNestedInput
    holds?: BalanceHoldUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutReviewsReceivedInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isExchangerActive?: BoolFieldUpdateOperationsInput | boolean
    isFrozen?: BoolFieldUpdateOperationsInput | boolean
    frozenUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    missedOffersCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listings?: ExchangeListingUncheckedUpdateManyWithoutUserNestedInput
    offers?: ExchangeOfferUncheckedUpdateManyWithoutUserNestedInput
    exchangerTransactions?: ExchangeTransactionUncheckedUpdateManyWithoutExchangerNestedInput
    customerTransactions?: ExchangeTransactionUncheckedUpdateManyWithoutCustomerNestedInput
    disputesInitiated?: DisputeUncheckedUpdateManyWithoutInitiatorNestedInput
    disputesModerated?: DisputeUncheckedUpdateManyWithoutModeratorNestedInput
    reviewsWritten?: ReviewUncheckedUpdateManyWithoutAuthorNestedInput
    balance?: UserBalanceUncheckedUpdateOneWithoutUserNestedInput
    exchangerSettings?: ExchangerSettingsUncheckedUpdateOneWithoutUserNestedInput
    holds?: BalanceHoldUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutBalanceInput = {
    id?: string
    email: string
    password: string
    role?: $Enums.UserRole
    isExchangerActive?: boolean
    isFrozen?: boolean
    frozenUntil?: Date | string | null
    missedOffersCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    listings?: ExchangeListingCreateNestedManyWithoutUserInput
    offers?: ExchangeOfferCreateNestedManyWithoutUserInput
    exchangerTransactions?: ExchangeTransactionCreateNestedManyWithoutExchangerInput
    customerTransactions?: ExchangeTransactionCreateNestedManyWithoutCustomerInput
    disputesInitiated?: DisputeCreateNestedManyWithoutInitiatorInput
    disputesModerated?: DisputeCreateNestedManyWithoutModeratorInput
    reviewsWritten?: ReviewCreateNestedManyWithoutAuthorInput
    reviewsReceived?: ReviewCreateNestedManyWithoutTargetInput
    exchangerSettings?: ExchangerSettingsCreateNestedOneWithoutUserInput
    holds?: BalanceHoldCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutBalanceInput = {
    id?: string
    email: string
    password: string
    role?: $Enums.UserRole
    isExchangerActive?: boolean
    isFrozen?: boolean
    frozenUntil?: Date | string | null
    missedOffersCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    listings?: ExchangeListingUncheckedCreateNestedManyWithoutUserInput
    offers?: ExchangeOfferUncheckedCreateNestedManyWithoutUserInput
    exchangerTransactions?: ExchangeTransactionUncheckedCreateNestedManyWithoutExchangerInput
    customerTransactions?: ExchangeTransactionUncheckedCreateNestedManyWithoutCustomerInput
    disputesInitiated?: DisputeUncheckedCreateNestedManyWithoutInitiatorInput
    disputesModerated?: DisputeUncheckedCreateNestedManyWithoutModeratorInput
    reviewsWritten?: ReviewUncheckedCreateNestedManyWithoutAuthorInput
    reviewsReceived?: ReviewUncheckedCreateNestedManyWithoutTargetInput
    exchangerSettings?: ExchangerSettingsUncheckedCreateNestedOneWithoutUserInput
    holds?: BalanceHoldUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutBalanceInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBalanceInput, UserUncheckedCreateWithoutBalanceInput>
  }

  export type UserUpsertWithoutBalanceInput = {
    update: XOR<UserUpdateWithoutBalanceInput, UserUncheckedUpdateWithoutBalanceInput>
    create: XOR<UserCreateWithoutBalanceInput, UserUncheckedCreateWithoutBalanceInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutBalanceInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutBalanceInput, UserUncheckedUpdateWithoutBalanceInput>
  }

  export type UserUpdateWithoutBalanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isExchangerActive?: BoolFieldUpdateOperationsInput | boolean
    isFrozen?: BoolFieldUpdateOperationsInput | boolean
    frozenUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    missedOffersCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listings?: ExchangeListingUpdateManyWithoutUserNestedInput
    offers?: ExchangeOfferUpdateManyWithoutUserNestedInput
    exchangerTransactions?: ExchangeTransactionUpdateManyWithoutExchangerNestedInput
    customerTransactions?: ExchangeTransactionUpdateManyWithoutCustomerNestedInput
    disputesInitiated?: DisputeUpdateManyWithoutInitiatorNestedInput
    disputesModerated?: DisputeUpdateManyWithoutModeratorNestedInput
    reviewsWritten?: ReviewUpdateManyWithoutAuthorNestedInput
    reviewsReceived?: ReviewUpdateManyWithoutTargetNestedInput
    exchangerSettings?: ExchangerSettingsUpdateOneWithoutUserNestedInput
    holds?: BalanceHoldUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutBalanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isExchangerActive?: BoolFieldUpdateOperationsInput | boolean
    isFrozen?: BoolFieldUpdateOperationsInput | boolean
    frozenUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    missedOffersCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listings?: ExchangeListingUncheckedUpdateManyWithoutUserNestedInput
    offers?: ExchangeOfferUncheckedUpdateManyWithoutUserNestedInput
    exchangerTransactions?: ExchangeTransactionUncheckedUpdateManyWithoutExchangerNestedInput
    customerTransactions?: ExchangeTransactionUncheckedUpdateManyWithoutCustomerNestedInput
    disputesInitiated?: DisputeUncheckedUpdateManyWithoutInitiatorNestedInput
    disputesModerated?: DisputeUncheckedUpdateManyWithoutModeratorNestedInput
    reviewsWritten?: ReviewUncheckedUpdateManyWithoutAuthorNestedInput
    reviewsReceived?: ReviewUncheckedUpdateManyWithoutTargetNestedInput
    exchangerSettings?: ExchangerSettingsUncheckedUpdateOneWithoutUserNestedInput
    holds?: BalanceHoldUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutHoldsInput = {
    id?: string
    email: string
    password: string
    role?: $Enums.UserRole
    isExchangerActive?: boolean
    isFrozen?: boolean
    frozenUntil?: Date | string | null
    missedOffersCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    listings?: ExchangeListingCreateNestedManyWithoutUserInput
    offers?: ExchangeOfferCreateNestedManyWithoutUserInput
    exchangerTransactions?: ExchangeTransactionCreateNestedManyWithoutExchangerInput
    customerTransactions?: ExchangeTransactionCreateNestedManyWithoutCustomerInput
    disputesInitiated?: DisputeCreateNestedManyWithoutInitiatorInput
    disputesModerated?: DisputeCreateNestedManyWithoutModeratorInput
    reviewsWritten?: ReviewCreateNestedManyWithoutAuthorInput
    reviewsReceived?: ReviewCreateNestedManyWithoutTargetInput
    balance?: UserBalanceCreateNestedOneWithoutUserInput
    exchangerSettings?: ExchangerSettingsCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutHoldsInput = {
    id?: string
    email: string
    password: string
    role?: $Enums.UserRole
    isExchangerActive?: boolean
    isFrozen?: boolean
    frozenUntil?: Date | string | null
    missedOffersCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    listings?: ExchangeListingUncheckedCreateNestedManyWithoutUserInput
    offers?: ExchangeOfferUncheckedCreateNestedManyWithoutUserInput
    exchangerTransactions?: ExchangeTransactionUncheckedCreateNestedManyWithoutExchangerInput
    customerTransactions?: ExchangeTransactionUncheckedCreateNestedManyWithoutCustomerInput
    disputesInitiated?: DisputeUncheckedCreateNestedManyWithoutInitiatorInput
    disputesModerated?: DisputeUncheckedCreateNestedManyWithoutModeratorInput
    reviewsWritten?: ReviewUncheckedCreateNestedManyWithoutAuthorInput
    reviewsReceived?: ReviewUncheckedCreateNestedManyWithoutTargetInput
    balance?: UserBalanceUncheckedCreateNestedOneWithoutUserInput
    exchangerSettings?: ExchangerSettingsUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutHoldsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutHoldsInput, UserUncheckedCreateWithoutHoldsInput>
  }

  export type UserUpsertWithoutHoldsInput = {
    update: XOR<UserUpdateWithoutHoldsInput, UserUncheckedUpdateWithoutHoldsInput>
    create: XOR<UserCreateWithoutHoldsInput, UserUncheckedCreateWithoutHoldsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutHoldsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutHoldsInput, UserUncheckedUpdateWithoutHoldsInput>
  }

  export type UserUpdateWithoutHoldsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isExchangerActive?: BoolFieldUpdateOperationsInput | boolean
    isFrozen?: BoolFieldUpdateOperationsInput | boolean
    frozenUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    missedOffersCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listings?: ExchangeListingUpdateManyWithoutUserNestedInput
    offers?: ExchangeOfferUpdateManyWithoutUserNestedInput
    exchangerTransactions?: ExchangeTransactionUpdateManyWithoutExchangerNestedInput
    customerTransactions?: ExchangeTransactionUpdateManyWithoutCustomerNestedInput
    disputesInitiated?: DisputeUpdateManyWithoutInitiatorNestedInput
    disputesModerated?: DisputeUpdateManyWithoutModeratorNestedInput
    reviewsWritten?: ReviewUpdateManyWithoutAuthorNestedInput
    reviewsReceived?: ReviewUpdateManyWithoutTargetNestedInput
    balance?: UserBalanceUpdateOneWithoutUserNestedInput
    exchangerSettings?: ExchangerSettingsUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutHoldsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isExchangerActive?: BoolFieldUpdateOperationsInput | boolean
    isFrozen?: BoolFieldUpdateOperationsInput | boolean
    frozenUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    missedOffersCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listings?: ExchangeListingUncheckedUpdateManyWithoutUserNestedInput
    offers?: ExchangeOfferUncheckedUpdateManyWithoutUserNestedInput
    exchangerTransactions?: ExchangeTransactionUncheckedUpdateManyWithoutExchangerNestedInput
    customerTransactions?: ExchangeTransactionUncheckedUpdateManyWithoutCustomerNestedInput
    disputesInitiated?: DisputeUncheckedUpdateManyWithoutInitiatorNestedInput
    disputesModerated?: DisputeUncheckedUpdateManyWithoutModeratorNestedInput
    reviewsWritten?: ReviewUncheckedUpdateManyWithoutAuthorNestedInput
    reviewsReceived?: ReviewUncheckedUpdateManyWithoutTargetNestedInput
    balance?: UserBalanceUncheckedUpdateOneWithoutUserNestedInput
    exchangerSettings?: ExchangerSettingsUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateWithoutExchangerSettingsInput = {
    id?: string
    email: string
    password: string
    role?: $Enums.UserRole
    isExchangerActive?: boolean
    isFrozen?: boolean
    frozenUntil?: Date | string | null
    missedOffersCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    listings?: ExchangeListingCreateNestedManyWithoutUserInput
    offers?: ExchangeOfferCreateNestedManyWithoutUserInput
    exchangerTransactions?: ExchangeTransactionCreateNestedManyWithoutExchangerInput
    customerTransactions?: ExchangeTransactionCreateNestedManyWithoutCustomerInput
    disputesInitiated?: DisputeCreateNestedManyWithoutInitiatorInput
    disputesModerated?: DisputeCreateNestedManyWithoutModeratorInput
    reviewsWritten?: ReviewCreateNestedManyWithoutAuthorInput
    reviewsReceived?: ReviewCreateNestedManyWithoutTargetInput
    balance?: UserBalanceCreateNestedOneWithoutUserInput
    holds?: BalanceHoldCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutExchangerSettingsInput = {
    id?: string
    email: string
    password: string
    role?: $Enums.UserRole
    isExchangerActive?: boolean
    isFrozen?: boolean
    frozenUntil?: Date | string | null
    missedOffersCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    listings?: ExchangeListingUncheckedCreateNestedManyWithoutUserInput
    offers?: ExchangeOfferUncheckedCreateNestedManyWithoutUserInput
    exchangerTransactions?: ExchangeTransactionUncheckedCreateNestedManyWithoutExchangerInput
    customerTransactions?: ExchangeTransactionUncheckedCreateNestedManyWithoutCustomerInput
    disputesInitiated?: DisputeUncheckedCreateNestedManyWithoutInitiatorInput
    disputesModerated?: DisputeUncheckedCreateNestedManyWithoutModeratorInput
    reviewsWritten?: ReviewUncheckedCreateNestedManyWithoutAuthorInput
    reviewsReceived?: ReviewUncheckedCreateNestedManyWithoutTargetInput
    balance?: UserBalanceUncheckedCreateNestedOneWithoutUserInput
    holds?: BalanceHoldUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutExchangerSettingsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutExchangerSettingsInput, UserUncheckedCreateWithoutExchangerSettingsInput>
  }

  export type UserUpsertWithoutExchangerSettingsInput = {
    update: XOR<UserUpdateWithoutExchangerSettingsInput, UserUncheckedUpdateWithoutExchangerSettingsInput>
    create: XOR<UserCreateWithoutExchangerSettingsInput, UserUncheckedCreateWithoutExchangerSettingsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutExchangerSettingsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutExchangerSettingsInput, UserUncheckedUpdateWithoutExchangerSettingsInput>
  }

  export type UserUpdateWithoutExchangerSettingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isExchangerActive?: BoolFieldUpdateOperationsInput | boolean
    isFrozen?: BoolFieldUpdateOperationsInput | boolean
    frozenUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    missedOffersCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listings?: ExchangeListingUpdateManyWithoutUserNestedInput
    offers?: ExchangeOfferUpdateManyWithoutUserNestedInput
    exchangerTransactions?: ExchangeTransactionUpdateManyWithoutExchangerNestedInput
    customerTransactions?: ExchangeTransactionUpdateManyWithoutCustomerNestedInput
    disputesInitiated?: DisputeUpdateManyWithoutInitiatorNestedInput
    disputesModerated?: DisputeUpdateManyWithoutModeratorNestedInput
    reviewsWritten?: ReviewUpdateManyWithoutAuthorNestedInput
    reviewsReceived?: ReviewUpdateManyWithoutTargetNestedInput
    balance?: UserBalanceUpdateOneWithoutUserNestedInput
    holds?: BalanceHoldUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutExchangerSettingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    isExchangerActive?: BoolFieldUpdateOperationsInput | boolean
    isFrozen?: BoolFieldUpdateOperationsInput | boolean
    frozenUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    missedOffersCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listings?: ExchangeListingUncheckedUpdateManyWithoutUserNestedInput
    offers?: ExchangeOfferUncheckedUpdateManyWithoutUserNestedInput
    exchangerTransactions?: ExchangeTransactionUncheckedUpdateManyWithoutExchangerNestedInput
    customerTransactions?: ExchangeTransactionUncheckedUpdateManyWithoutCustomerNestedInput
    disputesInitiated?: DisputeUncheckedUpdateManyWithoutInitiatorNestedInput
    disputesModerated?: DisputeUncheckedUpdateManyWithoutModeratorNestedInput
    reviewsWritten?: ReviewUncheckedUpdateManyWithoutAuthorNestedInput
    reviewsReceived?: ReviewUncheckedUpdateManyWithoutTargetNestedInput
    balance?: UserBalanceUncheckedUpdateOneWithoutUserNestedInput
    holds?: BalanceHoldUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ExchangeListingCreateManyUserInput = {
    id?: string
    type: $Enums.ExchangeType
    cryptocurrency: string
    fiatCurrency: string
    rate: number
    minAmount: number
    maxAmount: number
    availableAmount: number
    paymentMethods?: ExchangeListingCreatepaymentMethodsInput | $Enums.PaymentMethod[]
    terms?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExchangeOfferCreateManyUserInput = {
    id?: string
    amount: number
    status?: $Enums.OfferStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    listingId: string
  }

  export type ExchangeTransactionCreateManyExchangerInput = {
    id?: string
    type: $Enums.ExchangeType
    status?: $Enums.TransactionStatus
    cryptocurrency: string
    fiatCurrency: string
    cryptoAmount: number
    fiatAmount: number
    paymentProof?: string | null
    disputeId?: string | null
    confirmationDeadline: Date | string
    canCustomerDispute?: boolean
    canExchangerDispute?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    finishedAt?: Date | string | null
    offerId?: string | null
    customerId: string
    listingId: string
  }

  export type ExchangeTransactionCreateManyCustomerInput = {
    id?: string
    type: $Enums.ExchangeType
    status?: $Enums.TransactionStatus
    cryptocurrency: string
    fiatCurrency: string
    cryptoAmount: number
    fiatAmount: number
    paymentProof?: string | null
    disputeId?: string | null
    confirmationDeadline: Date | string
    canCustomerDispute?: boolean
    canExchangerDispute?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    finishedAt?: Date | string | null
    offerId?: string | null
    exchangerId: string
    listingId: string
  }

  export type DisputeCreateManyInitiatorInput = {
    id?: string
    reason: string
    status?: $Enums.DisputeStatus
    resolution?: string | null
    resolvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    transactionId: string
    moderatorId?: string | null
  }

  export type DisputeCreateManyModeratorInput = {
    id?: string
    reason: string
    status?: $Enums.DisputeStatus
    resolution?: string | null
    resolvedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    transactionId: string
    initiatorId: string
  }

  export type ReviewCreateManyAuthorInput = {
    id?: string
    rating: number
    comment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    transactionId: string
    targetId: string
  }

  export type ReviewCreateManyTargetInput = {
    id?: string
    rating: number
    comment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    transactionId: string
    authorId: string
  }

  export type BalanceHoldCreateManyUserInput = {
    id?: string
    cryptocurrency: string
    amount: number
    type: $Enums.HoldType
    relatedTransactionId?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ExchangeListingUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumExchangeTypeFieldUpdateOperationsInput | $Enums.ExchangeType
    cryptocurrency?: StringFieldUpdateOperationsInput | string
    fiatCurrency?: StringFieldUpdateOperationsInput | string
    rate?: FloatFieldUpdateOperationsInput | number
    minAmount?: FloatFieldUpdateOperationsInput | number
    maxAmount?: FloatFieldUpdateOperationsInput | number
    availableAmount?: FloatFieldUpdateOperationsInput | number
    paymentMethods?: ExchangeListingUpdatepaymentMethodsInput | $Enums.PaymentMethod[]
    terms?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    offers?: ExchangeOfferUpdateManyWithoutListingNestedInput
    transactions?: ExchangeTransactionUpdateManyWithoutListingNestedInput
  }

  export type ExchangeListingUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumExchangeTypeFieldUpdateOperationsInput | $Enums.ExchangeType
    cryptocurrency?: StringFieldUpdateOperationsInput | string
    fiatCurrency?: StringFieldUpdateOperationsInput | string
    rate?: FloatFieldUpdateOperationsInput | number
    minAmount?: FloatFieldUpdateOperationsInput | number
    maxAmount?: FloatFieldUpdateOperationsInput | number
    availableAmount?: FloatFieldUpdateOperationsInput | number
    paymentMethods?: ExchangeListingUpdatepaymentMethodsInput | $Enums.PaymentMethod[]
    terms?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    offers?: ExchangeOfferUncheckedUpdateManyWithoutListingNestedInput
    transactions?: ExchangeTransactionUncheckedUpdateManyWithoutListingNestedInput
  }

  export type ExchangeListingUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumExchangeTypeFieldUpdateOperationsInput | $Enums.ExchangeType
    cryptocurrency?: StringFieldUpdateOperationsInput | string
    fiatCurrency?: StringFieldUpdateOperationsInput | string
    rate?: FloatFieldUpdateOperationsInput | number
    minAmount?: FloatFieldUpdateOperationsInput | number
    maxAmount?: FloatFieldUpdateOperationsInput | number
    availableAmount?: FloatFieldUpdateOperationsInput | number
    paymentMethods?: ExchangeListingUpdatepaymentMethodsInput | $Enums.PaymentMethod[]
    terms?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExchangeOfferUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    status?: EnumOfferStatusFieldUpdateOperationsInput | $Enums.OfferStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listing?: ExchangeListingUpdateOneRequiredWithoutOffersNestedInput
    transaction?: ExchangeTransactionUpdateOneWithoutOfferNestedInput
  }

  export type ExchangeOfferUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    status?: EnumOfferStatusFieldUpdateOperationsInput | $Enums.OfferStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listingId?: StringFieldUpdateOperationsInput | string
    transaction?: ExchangeTransactionUncheckedUpdateOneWithoutOfferNestedInput
  }

  export type ExchangeOfferUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    status?: EnumOfferStatusFieldUpdateOperationsInput | $Enums.OfferStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    listingId?: StringFieldUpdateOperationsInput | string
  }

  export type ExchangeTransactionUpdateWithoutExchangerInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumExchangeTypeFieldUpdateOperationsInput | $Enums.ExchangeType
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    cryptocurrency?: StringFieldUpdateOperationsInput | string
    fiatCurrency?: StringFieldUpdateOperationsInput | string
    cryptoAmount?: FloatFieldUpdateOperationsInput | number
    fiatAmount?: FloatFieldUpdateOperationsInput | number
    paymentProof?: NullableStringFieldUpdateOperationsInput | string | null
    disputeId?: NullableStringFieldUpdateOperationsInput | string | null
    confirmationDeadline?: DateTimeFieldUpdateOperationsInput | Date | string
    canCustomerDispute?: BoolFieldUpdateOperationsInput | boolean
    canExchangerDispute?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    offer?: ExchangeOfferUpdateOneWithoutTransactionNestedInput
    customer?: UserUpdateOneRequiredWithoutCustomerTransactionsNestedInput
    listing?: ExchangeListingUpdateOneRequiredWithoutTransactionsNestedInput
    dispute?: DisputeUpdateOneWithoutTransactionNestedInput
    review?: ReviewUpdateOneWithoutTransactionNestedInput
  }

  export type ExchangeTransactionUncheckedUpdateWithoutExchangerInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumExchangeTypeFieldUpdateOperationsInput | $Enums.ExchangeType
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    cryptocurrency?: StringFieldUpdateOperationsInput | string
    fiatCurrency?: StringFieldUpdateOperationsInput | string
    cryptoAmount?: FloatFieldUpdateOperationsInput | number
    fiatAmount?: FloatFieldUpdateOperationsInput | number
    paymentProof?: NullableStringFieldUpdateOperationsInput | string | null
    disputeId?: NullableStringFieldUpdateOperationsInput | string | null
    confirmationDeadline?: DateTimeFieldUpdateOperationsInput | Date | string
    canCustomerDispute?: BoolFieldUpdateOperationsInput | boolean
    canExchangerDispute?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    offerId?: NullableStringFieldUpdateOperationsInput | string | null
    customerId?: StringFieldUpdateOperationsInput | string
    listingId?: StringFieldUpdateOperationsInput | string
    dispute?: DisputeUncheckedUpdateOneWithoutTransactionNestedInput
    review?: ReviewUncheckedUpdateOneWithoutTransactionNestedInput
  }

  export type ExchangeTransactionUncheckedUpdateManyWithoutExchangerInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumExchangeTypeFieldUpdateOperationsInput | $Enums.ExchangeType
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    cryptocurrency?: StringFieldUpdateOperationsInput | string
    fiatCurrency?: StringFieldUpdateOperationsInput | string
    cryptoAmount?: FloatFieldUpdateOperationsInput | number
    fiatAmount?: FloatFieldUpdateOperationsInput | number
    paymentProof?: NullableStringFieldUpdateOperationsInput | string | null
    disputeId?: NullableStringFieldUpdateOperationsInput | string | null
    confirmationDeadline?: DateTimeFieldUpdateOperationsInput | Date | string
    canCustomerDispute?: BoolFieldUpdateOperationsInput | boolean
    canExchangerDispute?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    offerId?: NullableStringFieldUpdateOperationsInput | string | null
    customerId?: StringFieldUpdateOperationsInput | string
    listingId?: StringFieldUpdateOperationsInput | string
  }

  export type ExchangeTransactionUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumExchangeTypeFieldUpdateOperationsInput | $Enums.ExchangeType
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    cryptocurrency?: StringFieldUpdateOperationsInput | string
    fiatCurrency?: StringFieldUpdateOperationsInput | string
    cryptoAmount?: FloatFieldUpdateOperationsInput | number
    fiatAmount?: FloatFieldUpdateOperationsInput | number
    paymentProof?: NullableStringFieldUpdateOperationsInput | string | null
    disputeId?: NullableStringFieldUpdateOperationsInput | string | null
    confirmationDeadline?: DateTimeFieldUpdateOperationsInput | Date | string
    canCustomerDispute?: BoolFieldUpdateOperationsInput | boolean
    canExchangerDispute?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    offer?: ExchangeOfferUpdateOneWithoutTransactionNestedInput
    exchanger?: UserUpdateOneRequiredWithoutExchangerTransactionsNestedInput
    listing?: ExchangeListingUpdateOneRequiredWithoutTransactionsNestedInput
    dispute?: DisputeUpdateOneWithoutTransactionNestedInput
    review?: ReviewUpdateOneWithoutTransactionNestedInput
  }

  export type ExchangeTransactionUncheckedUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumExchangeTypeFieldUpdateOperationsInput | $Enums.ExchangeType
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    cryptocurrency?: StringFieldUpdateOperationsInput | string
    fiatCurrency?: StringFieldUpdateOperationsInput | string
    cryptoAmount?: FloatFieldUpdateOperationsInput | number
    fiatAmount?: FloatFieldUpdateOperationsInput | number
    paymentProof?: NullableStringFieldUpdateOperationsInput | string | null
    disputeId?: NullableStringFieldUpdateOperationsInput | string | null
    confirmationDeadline?: DateTimeFieldUpdateOperationsInput | Date | string
    canCustomerDispute?: BoolFieldUpdateOperationsInput | boolean
    canExchangerDispute?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    offerId?: NullableStringFieldUpdateOperationsInput | string | null
    exchangerId?: StringFieldUpdateOperationsInput | string
    listingId?: StringFieldUpdateOperationsInput | string
    dispute?: DisputeUncheckedUpdateOneWithoutTransactionNestedInput
    review?: ReviewUncheckedUpdateOneWithoutTransactionNestedInput
  }

  export type ExchangeTransactionUncheckedUpdateManyWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumExchangeTypeFieldUpdateOperationsInput | $Enums.ExchangeType
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    cryptocurrency?: StringFieldUpdateOperationsInput | string
    fiatCurrency?: StringFieldUpdateOperationsInput | string
    cryptoAmount?: FloatFieldUpdateOperationsInput | number
    fiatAmount?: FloatFieldUpdateOperationsInput | number
    paymentProof?: NullableStringFieldUpdateOperationsInput | string | null
    disputeId?: NullableStringFieldUpdateOperationsInput | string | null
    confirmationDeadline?: DateTimeFieldUpdateOperationsInput | Date | string
    canCustomerDispute?: BoolFieldUpdateOperationsInput | boolean
    canExchangerDispute?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    offerId?: NullableStringFieldUpdateOperationsInput | string | null
    exchangerId?: StringFieldUpdateOperationsInput | string
    listingId?: StringFieldUpdateOperationsInput | string
  }

  export type DisputeUpdateWithoutInitiatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    status?: EnumDisputeStatusFieldUpdateOperationsInput | $Enums.DisputeStatus
    resolution?: NullableStringFieldUpdateOperationsInput | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transaction?: ExchangeTransactionUpdateOneRequiredWithoutDisputeNestedInput
    moderator?: UserUpdateOneWithoutDisputesModeratedNestedInput
  }

  export type DisputeUncheckedUpdateWithoutInitiatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    status?: EnumDisputeStatusFieldUpdateOperationsInput | $Enums.DisputeStatus
    resolution?: NullableStringFieldUpdateOperationsInput | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactionId?: StringFieldUpdateOperationsInput | string
    moderatorId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DisputeUncheckedUpdateManyWithoutInitiatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    status?: EnumDisputeStatusFieldUpdateOperationsInput | $Enums.DisputeStatus
    resolution?: NullableStringFieldUpdateOperationsInput | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactionId?: StringFieldUpdateOperationsInput | string
    moderatorId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DisputeUpdateWithoutModeratorInput = {
    id?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    status?: EnumDisputeStatusFieldUpdateOperationsInput | $Enums.DisputeStatus
    resolution?: NullableStringFieldUpdateOperationsInput | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transaction?: ExchangeTransactionUpdateOneRequiredWithoutDisputeNestedInput
    initiator?: UserUpdateOneRequiredWithoutDisputesInitiatedNestedInput
  }

  export type DisputeUncheckedUpdateWithoutModeratorInput = {
    id?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    status?: EnumDisputeStatusFieldUpdateOperationsInput | $Enums.DisputeStatus
    resolution?: NullableStringFieldUpdateOperationsInput | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactionId?: StringFieldUpdateOperationsInput | string
    initiatorId?: StringFieldUpdateOperationsInput | string
  }

  export type DisputeUncheckedUpdateManyWithoutModeratorInput = {
    id?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    status?: EnumDisputeStatusFieldUpdateOperationsInput | $Enums.DisputeStatus
    resolution?: NullableStringFieldUpdateOperationsInput | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactionId?: StringFieldUpdateOperationsInput | string
    initiatorId?: StringFieldUpdateOperationsInput | string
  }

  export type ReviewUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transaction?: ExchangeTransactionUpdateOneRequiredWithoutReviewNestedInput
    target?: UserUpdateOneRequiredWithoutReviewsReceivedNestedInput
  }

  export type ReviewUncheckedUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactionId?: StringFieldUpdateOperationsInput | string
    targetId?: StringFieldUpdateOperationsInput | string
  }

  export type ReviewUncheckedUpdateManyWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactionId?: StringFieldUpdateOperationsInput | string
    targetId?: StringFieldUpdateOperationsInput | string
  }

  export type ReviewUpdateWithoutTargetInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transaction?: ExchangeTransactionUpdateOneRequiredWithoutReviewNestedInput
    author?: UserUpdateOneRequiredWithoutReviewsWrittenNestedInput
  }

  export type ReviewUncheckedUpdateWithoutTargetInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactionId?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
  }

  export type ReviewUncheckedUpdateManyWithoutTargetInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactionId?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
  }

  export type BalanceHoldUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    cryptocurrency?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    type?: EnumHoldTypeFieldUpdateOperationsInput | $Enums.HoldType
    relatedTransactionId?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BalanceHoldUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    cryptocurrency?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    type?: EnumHoldTypeFieldUpdateOperationsInput | $Enums.HoldType
    relatedTransactionId?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BalanceHoldUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    cryptocurrency?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    type?: EnumHoldTypeFieldUpdateOperationsInput | $Enums.HoldType
    relatedTransactionId?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExchangeOfferCreateManyListingInput = {
    id?: string
    amount: number
    status?: $Enums.OfferStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type ExchangeTransactionCreateManyListingInput = {
    id?: string
    type: $Enums.ExchangeType
    status?: $Enums.TransactionStatus
    cryptocurrency: string
    fiatCurrency: string
    cryptoAmount: number
    fiatAmount: number
    paymentProof?: string | null
    disputeId?: string | null
    confirmationDeadline: Date | string
    canCustomerDispute?: boolean
    canExchangerDispute?: boolean
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    finishedAt?: Date | string | null
    offerId?: string | null
    customerId: string
    exchangerId: string
  }

  export type ExchangeOfferUpdateWithoutListingInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    status?: EnumOfferStatusFieldUpdateOperationsInput | $Enums.OfferStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutOffersNestedInput
    transaction?: ExchangeTransactionUpdateOneWithoutOfferNestedInput
  }

  export type ExchangeOfferUncheckedUpdateWithoutListingInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    status?: EnumOfferStatusFieldUpdateOperationsInput | $Enums.OfferStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    transaction?: ExchangeTransactionUncheckedUpdateOneWithoutOfferNestedInput
  }

  export type ExchangeOfferUncheckedUpdateManyWithoutListingInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    status?: EnumOfferStatusFieldUpdateOperationsInput | $Enums.OfferStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type ExchangeTransactionUpdateWithoutListingInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumExchangeTypeFieldUpdateOperationsInput | $Enums.ExchangeType
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    cryptocurrency?: StringFieldUpdateOperationsInput | string
    fiatCurrency?: StringFieldUpdateOperationsInput | string
    cryptoAmount?: FloatFieldUpdateOperationsInput | number
    fiatAmount?: FloatFieldUpdateOperationsInput | number
    paymentProof?: NullableStringFieldUpdateOperationsInput | string | null
    disputeId?: NullableStringFieldUpdateOperationsInput | string | null
    confirmationDeadline?: DateTimeFieldUpdateOperationsInput | Date | string
    canCustomerDispute?: BoolFieldUpdateOperationsInput | boolean
    canExchangerDispute?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    offer?: ExchangeOfferUpdateOneWithoutTransactionNestedInput
    customer?: UserUpdateOneRequiredWithoutCustomerTransactionsNestedInput
    exchanger?: UserUpdateOneRequiredWithoutExchangerTransactionsNestedInput
    dispute?: DisputeUpdateOneWithoutTransactionNestedInput
    review?: ReviewUpdateOneWithoutTransactionNestedInput
  }

  export type ExchangeTransactionUncheckedUpdateWithoutListingInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumExchangeTypeFieldUpdateOperationsInput | $Enums.ExchangeType
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    cryptocurrency?: StringFieldUpdateOperationsInput | string
    fiatCurrency?: StringFieldUpdateOperationsInput | string
    cryptoAmount?: FloatFieldUpdateOperationsInput | number
    fiatAmount?: FloatFieldUpdateOperationsInput | number
    paymentProof?: NullableStringFieldUpdateOperationsInput | string | null
    disputeId?: NullableStringFieldUpdateOperationsInput | string | null
    confirmationDeadline?: DateTimeFieldUpdateOperationsInput | Date | string
    canCustomerDispute?: BoolFieldUpdateOperationsInput | boolean
    canExchangerDispute?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    offerId?: NullableStringFieldUpdateOperationsInput | string | null
    customerId?: StringFieldUpdateOperationsInput | string
    exchangerId?: StringFieldUpdateOperationsInput | string
    dispute?: DisputeUncheckedUpdateOneWithoutTransactionNestedInput
    review?: ReviewUncheckedUpdateOneWithoutTransactionNestedInput
  }

  export type ExchangeTransactionUncheckedUpdateManyWithoutListingInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumExchangeTypeFieldUpdateOperationsInput | $Enums.ExchangeType
    status?: EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus
    cryptocurrency?: StringFieldUpdateOperationsInput | string
    fiatCurrency?: StringFieldUpdateOperationsInput | string
    cryptoAmount?: FloatFieldUpdateOperationsInput | number
    fiatAmount?: FloatFieldUpdateOperationsInput | number
    paymentProof?: NullableStringFieldUpdateOperationsInput | string | null
    disputeId?: NullableStringFieldUpdateOperationsInput | string | null
    confirmationDeadline?: DateTimeFieldUpdateOperationsInput | Date | string
    canCustomerDispute?: BoolFieldUpdateOperationsInput | boolean
    canExchangerDispute?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    finishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    offerId?: NullableStringFieldUpdateOperationsInput | string | null
    customerId?: StringFieldUpdateOperationsInput | string
    exchangerId?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ExchangeListingCountOutputTypeDefaultArgs instead
     */
    export type ExchangeListingCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ExchangeListingCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ExchangeListingDefaultArgs instead
     */
    export type ExchangeListingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ExchangeListingDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ExchangeOfferDefaultArgs instead
     */
    export type ExchangeOfferArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ExchangeOfferDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ExchangeTransactionDefaultArgs instead
     */
    export type ExchangeTransactionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ExchangeTransactionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DisputeDefaultArgs instead
     */
    export type DisputeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DisputeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ReviewDefaultArgs instead
     */
    export type ReviewArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ReviewDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserBalanceDefaultArgs instead
     */
    export type UserBalanceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserBalanceDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BalanceHoldDefaultArgs instead
     */
    export type BalanceHoldArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BalanceHoldDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ExchangerSettingsDefaultArgs instead
     */
    export type ExchangerSettingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ExchangerSettingsDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}