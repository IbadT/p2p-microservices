import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersGatewayController } from './users.gateway.controller';
import { ReviewsGatewayController } from './reviews.gateway.controller';
import { DisputesGatewayController } from './disputes.gateway.controller';
import { ExchangesGatewayController } from './exchanges.gateway.controller';
import { ListingsGatewayController } from './listings.gateway.controller';
import { OffersGatewayController } from './offers.gateway.controller';
import { UserGrpcClient } from './services/user.grpc.client';
import { BalanceGrpcClient } from './services/balance.grpc.client';
import { DisputeGrpcClient } from './services/dispute.grpc.client';
import { ReviewsGrpcClient } from './services/reviews.grpc.client';
import { ExchangeGrpcClient } from './services/exchange.grpc.client';
import { P2PGrpcClient } from './services/p2p.grpc.client';
import { AuditGrpcClient } from './services/audit.grpc.client';
import { SchedulerGrpcClient } from './services/scheduler.grpc.client';
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
  FILTERS_SERVICE,
  TYPES_SERVICE,
  KAFKA_SERVICE,
  AUTH_SERVICE,
} from './constants';
import { NotificationsGrpcClient } from './services/notifications.grpc.client';
import { TransactionsGrpcClient } from './services/transactions.grpc.client';
import { ListingsGrpcClient } from './services/listings.grpc.client';
import { OffersGrpcClient } from './services/offers.grpc.client';
import { FiltersGrpcClient } from './services/filters.grpc.client';
import { TypesGrpcClient } from './services/types.grpc.client';
import { KafkaGrpcClient } from './services/kafka.grpc.client';
import { AuthGrpcClient } from './services/auth.grpc.client';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.registerAsync([
      {
        name: USER_SERVICE,
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: 'user',
            protoPath: 'src/proto/user.proto',
            url: configService.get('USER_SERVICE_URL'),
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
            url: configService.get('BALANCE_SERVICE_URL'),
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
            package: 'dispute',
            protoPath: 'src/proto/dispute.proto',
            url: configService.get('DISPUTE_SERVICE_URL'),
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
            url: configService.get('REVIEWS_SERVICE_URL'),
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
            url: configService.get('EXCHANGE_SERVICE_URL'),
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
            url: configService.get('P2P_SERVICE_URL'),
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
            url: configService.get('AUDIT_SERVICE_URL'),
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
            url: configService.get('SCHEDULER_SERVICE_URL'),
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
            url: configService.get('NOTIFICATIONS_SERVICE_URL'),
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
            url: configService.get('TRANSACTIONS_SERVICE_URL'),
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
            url: configService.get('LISTINGS_SERVICE_URL'),
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
            url: configService.get('OFFERS_SERVICE_URL'),
          },
        }),
        inject: [ConfigService],
      },
      {
        name: FILTERS_SERVICE,
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: 'filters',
            protoPath: 'src/proto/filters.proto',
            url: configService.get('FILTERS_SERVICE_URL'),
          },
        }),
        inject: [ConfigService],
      },
      {
        name: TYPES_SERVICE,
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: 'types',
            protoPath: 'src/proto/types.proto',
            url: configService.get('TYPES_SERVICE_URL'),
          },
        }),
        inject: [ConfigService],
      },
      {
        name: KAFKA_SERVICE,
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: 'kafka',
            protoPath: 'src/proto/kafka.proto',
            url: configService.get('KAFKA_SERVICE_URL'),
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
            url: configService.get('AUTH_SERVICE_URL'),
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
    OffersGatewayController
  ],
  providers: [
    UserGrpcClient,
    BalanceGrpcClient,
    DisputeGrpcClient,
    ReviewsGrpcClient,
    ExchangeGrpcClient,
    P2PGrpcClient,
    AuditGrpcClient,
    SchedulerGrpcClient,
    NotificationsGrpcClient,
    TransactionsGrpcClient,
    ListingsGrpcClient,
    OffersGrpcClient,
    FiltersGrpcClient,
    TypesGrpcClient,
    KafkaGrpcClient,
    AuthGrpcClient,
  ],
  exports: [
    UserGrpcClient,
    BalanceGrpcClient,
    DisputeGrpcClient,
    ReviewsGrpcClient,
    ExchangeGrpcClient,
    P2PGrpcClient,
    AuditGrpcClient,
    SchedulerGrpcClient,
    NotificationsGrpcClient,
    TransactionsGrpcClient,
    ListingsGrpcClient,
    OffersGrpcClient,
    FiltersGrpcClient,
    TypesGrpcClient,
    KafkaGrpcClient,
    AuthGrpcClient,
  ],
})
export class ClientModule {} 