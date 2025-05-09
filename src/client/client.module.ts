import { Module, forwardRef } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';
import type { RedisClientOptions } from 'redis';
import { UsersGatewayController } from './users.gateway.controller';
import { ReviewsGatewayController } from './reviews.gateway.controller';
import { DisputesGatewayController } from './disputes.gateway.controller';
import { ExchangesGatewayController } from './exchanges.gateway.controller';
import { ListingsGatewayController } from './listings.gateway.controller';
import { OffersGatewayController } from './offers.gateway.controller';
import { BalanceGatewayController } from './balance.gateway.controller';
import { AuditGatewayController } from './audit.gateway.controller';
import { ChatsGatewayController } from './chats.gateway.controller';
import { UserGrpcClient } from './services/user.grpc.client';
import { BalanceGrpcClient } from './services/balance.grpc.client';
import { DisputeGrpcClient } from './services/dispute.grpc.client';
import { ReviewsGrpcClient } from './services/reviews.grpc.client';
import { ExchangeClientService } from './services/exchange.client';
import { P2PGrpcClient } from './services/p2p.grpc.client';
import { AuditGrpcClient } from './services/audit.grpc.client';
import { SchedulerGrpcClient } from './services/scheduler.grpc.client';
import { ChatGrpcClient } from './services/chat.grpc.client';
import {
  USER_SERVICE,
  BALANCE_SERVICE,
  DISPUTE_SERVICE,
  REVIEWS_SERVICE,
  EXCHANGE_SERVICE,
  P2P_SERVICE,
  AUDIT_SERVICE,
  SCHEDULER_SERVICE,
  NOTIFICATIONS_SERVICE,
  TRANSACTIONS_SERVICE,
  LISTINGS_SERVICE,
  OFFERS_SERVICE,
  AUTH_SERVICE,
} from './constants';
import { NotificationsGrpcClient } from './services/notifications.grpc.client';
import { TransactionsGrpcClient } from './services/transactions.grpc.client';
import { ListingsGrpcClient } from './services/listings.grpc.client';
import { OffersGrpcClient } from './services/offers.grpc.client';
import { AuthGrpcClient } from './services/auth.grpc.client';
import { RateLimitGuard } from '../shared/guards/rate-limit.guard';
import { UsersModule } from '../users/users.module';
import { ReviewsModule } from '../reviews/reviews.module';
import { DisputesModule } from '../disputes/disputes.module';
import { ListingsModule } from '../listings/listings.module';
import { OffersModule } from '../offers/offers.module';
import { AuditModule } from '../audit/audit.module';
import { SchedulerModule } from '../scheduler/scheduler.module';
import { BalanceModule } from '../balance/balance.module';
import { join } from 'path';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.registerAsync<RedisClientOptions>({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        store: redisStore as any,
        socket: {
          host: configService.get('REDIS_HOST', 'localhost'),
          port: configService.get('REDIS_PORT', 6379),
        },
        ttl: 3600,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    ReviewsModule,
    forwardRef(() => DisputesModule),
    ListingsModule,
    OffersModule,
    AuditModule,
    SchedulerModule,
    BalanceModule,
    ClientsModule.registerAsync([
      {
        name: DISPUTE_SERVICE,
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: 'user',
            protoPath: 'src/proto/user.proto',
            url: configService.get('DISPUTE_SERVICE_URL', 'localhost:5000'),
          },
        }),
        inject: [ConfigService],
      },
      {
        name: REVIEWS_SERVICE,
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: 'user',
            protoPath: 'src/proto/user.proto',
            url: configService.get('REVIEWS_SERVICE_URL', 'localhost:5000'),
          },
        }),
        inject: [ConfigService],
      },
      {
        name: LISTINGS_SERVICE,
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: 'listings',
            protoPath: 'src/proto/listings.proto',
            url: configService.get('LISTINGS_SERVICE_URL', 'localhost:5000'),
          },
        }),
        inject: [ConfigService],
      },
      {
        name: 'LISTING_PACKAGE',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: 'listings',
            protoPath: 'src/proto/listings.proto',
            url: configService.get('LISTINGS_SERVICE_URL', 'localhost:5000'),
          },
        }),
        inject: [ConfigService],
      },
      {
        name: OFFERS_SERVICE,
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: 'offers',
            protoPath: 'src/proto/offers.proto',
            url: configService.get('OFFERS_SERVICE_URL', 'localhost:5000'),
          },
        }),
        inject: [ConfigService],
      },
      {
        name: 'OFFER_PACKAGE',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: 'offers',
            protoPath: 'src/proto/offers.proto',
            url: configService.get('OFFERS_SERVICE_URL', 'localhost:5000'),
          },
        }),
        inject: [ConfigService],
      },
      {
        name: AUTH_SERVICE,
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: 'auth',
            protoPath: 'src/proto/auth.proto',
            url: configService.get('AUTH_SERVICE_URL', 'localhost:5000'),
          },
        }),
        inject: [ConfigService],
      },
      {
        name: 'AUTH_PACKAGE',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: 'auth',
            protoPath: 'src/proto/auth.proto',
            url: configService.get('AUTH_SERVICE_URL', 'localhost:5000'),
          },
        }),
        inject: [ConfigService],
      },
      {
        name: USER_SERVICE,
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: 'user',
            protoPath: 'src/proto/user.proto',
            url: configService.get('USER_SERVICE_URL', 'localhost:5001'),
          },
        }),
        inject: [ConfigService],
      },
      {
        name: 'USER_PACKAGE',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: 'user',
            protoPath: 'src/proto/user.proto',
            url: configService.get('USER_SERVICE_URL', 'localhost:5001'),
          },
        }),
        inject: [ConfigService],
      },
      {
        name: BALANCE_SERVICE,
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: 'balance',
            protoPath: 'src/proto/balance.proto',
            url: configService.get('BALANCE_SERVICE_URL', 'localhost:5000'),
          },
        }),
        inject: [ConfigService],
      },
      {
        name: 'BALANCE_PACKAGE',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: 'balance',
            protoPath: 'src/proto/balance.proto',
            url: configService.get('BALANCE_SERVICE_URL', 'localhost:5000'),
          },
        }),
        inject: [ConfigService],
      },
      {
        name: EXCHANGE_SERVICE,
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: 'exchange',
            protoPath: 'src/proto/exchange.proto',
            url: configService.get('EXCHANGE_SERVICE_URL', 'localhost:5000'),
          },
        }),
        inject: [ConfigService],
      },
      {
        name: 'EXCHANGE_PACKAGE',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: 'exchange',
            protoPath: join(__dirname, '../../proto/exchange.proto'),
            url: configService.get('EXCHANGE_SERVICE_URL', 'localhost:5000'),
          },
        }),
        inject: [ConfigService],
      },
      {
        name: P2P_SERVICE,
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: 'p2p',
            protoPath: 'src/proto/p2p.proto',
            url: configService.get('P2P_SERVICE_URL', 'localhost:5000'),
          },
        }),
        inject: [ConfigService],
      },
      {
        name: 'P2P_PACKAGE',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: 'p2p',
            protoPath: join(process.cwd(), 'dist/proto/p2p.proto'),
            url: configService.get('GRPC_URL'),
          },
        }),
        inject: [ConfigService],
      },
      {
        name: AUDIT_SERVICE,
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: 'audit',
            protoPath: 'src/proto/audit.proto',
            url: configService.get('AUDIT_SERVICE_URL', 'localhost:5000'),
          },
        }),
        inject: [ConfigService],
      },
      {
        name: 'AUDIT_PACKAGE',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: 'audit',
            protoPath: 'src/proto/audit.proto',
            url: configService.get('AUDIT_SERVICE_URL', 'localhost:5000'),
          },
        }),
        inject: [ConfigService],
      },
      {
        name: SCHEDULER_SERVICE,
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: 'scheduler',
            protoPath: 'src/proto/scheduler.proto',
            url: configService.get('SCHEDULER_SERVICE_URL', 'localhost:5000'),
          },
        }),
        inject: [ConfigService],
      },
      {
        name: 'SCHEDULER_PACKAGE',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: 'scheduler',
            protoPath: 'src/proto/scheduler.proto',
            url: configService.get('SCHEDULER_SERVICE_URL', 'localhost:5000'),
          },
        }),
        inject: [ConfigService],
      },
      {
        name: NOTIFICATIONS_SERVICE,
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: 'notifications',
            protoPath: 'src/proto/notifications.proto',
            url: configService.get('NOTIFICATIONS_SERVICE_URL', 'localhost:5000'),
          },
        }),
        inject: [ConfigService],
      },
      {
        name: 'NOTIFICATIONS_PACKAGE',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: 'notifications',
            protoPath: 'src/proto/notifications.proto',
            url: configService.get('NOTIFICATIONS_SERVICE_URL', 'localhost:5000'),
          },
        }),
        inject: [ConfigService],
      },
      {
        name: TRANSACTIONS_SERVICE,
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: 'transactions',
            protoPath: 'src/proto/transactions.proto',
            url: configService.get('TRANSACTIONS_SERVICE_URL', 'localhost:5000'),
          },
        }),
        inject: [ConfigService],
      },
      {
        name: 'TRANSACTIONS_PACKAGE',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: 'transactions',
            protoPath: 'src/proto/transactions.proto',
            url: configService.get('TRANSACTIONS_SERVICE_URL', 'localhost:5000'),
          },
        }),
        inject: [ConfigService],
      },
      {
        name: REVIEWS_SERVICE,
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: 'reviews',
            protoPath: 'src/proto/reviews.proto',
            url: configService.get('REVIEWS_SERVICE_URL', 'localhost:5000'),
          },
        }),
        inject: [ConfigService],
      },
      {
        name: 'REVIEWS_PACKAGE',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: 'reviews',
            protoPath: 'src/proto/reviews.proto',
            url: configService.get('REVIEWS_SERVICE_URL', 'localhost:5000'),
          },
        }),
        inject: [ConfigService],
      },
      {
        name: DISPUTE_SERVICE,
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: 'disputes',
            protoPath: 'src/proto/disputes.proto',
            url: configService.get('DISPUTE_SERVICE_URL', 'localhost:5000'),
          },
        }),
        inject: [ConfigService],
      },
      {
        name: 'DISPUTE_PACKAGE',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: 'disputes',
            protoPath: 'src/proto/disputes.proto',
            url: configService.get('DISPUTE_SERVICE_URL', 'localhost:5000'),
          },
        }),
        inject: [ConfigService],
      },
      {
        name: 'CHAT_PACKAGE',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: 'chat',
            protoPath: join(process.cwd(), 'dist/proto/chat.proto'),
            url: configService.get('CHAT_GRPC_URL'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [
    UsersGatewayController,
    ReviewsGatewayController,
    DisputesGatewayController,
    ExchangesGatewayController,
    ListingsGatewayController,
    OffersGatewayController,
    BalanceGatewayController,
    AuditGatewayController,
    ChatsGatewayController,
  ],
  providers: [
    RateLimitGuard,
    UserGrpcClient,
    BalanceGrpcClient,
    DisputeGrpcClient,
    ReviewsGrpcClient,
    ExchangeClientService,
    P2PGrpcClient,
    AuditGrpcClient,
    SchedulerGrpcClient,
    NotificationsGrpcClient,
    TransactionsGrpcClient,
    ListingsGrpcClient,
    OffersGrpcClient,
    AuthGrpcClient,
    ChatGrpcClient,
    JwtStrategy,
  ],
  exports: [
    UserGrpcClient,
    BalanceGrpcClient,
    DisputeGrpcClient,
    ReviewsGrpcClient,
    ExchangeClientService,
    P2PGrpcClient,
    AuditGrpcClient,
    SchedulerGrpcClient,
    NotificationsGrpcClient,
    TransactionsGrpcClient,
    ListingsGrpcClient,
    OffersGrpcClient,
    AuthGrpcClient,
    ChatGrpcClient,
  ],
})
export class ClientModule {} 