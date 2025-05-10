import { Module, OnModuleDestroy } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SentryGlobalFilter, SentryModule } from '@sentry/nestjs/setup';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { PrismaService } from './prisma.service';
import { TransactionsModule } from './transactions/transactions.module';
import { ListingsModule } from './listings/listings.module';
import { UsersModule } from './users/users.module';
import { OffersModule } from './offers/offers.module';
import { DisputesModule } from './disputes/disputes.module';
import { ReviewsModule } from './reviews/reviews.module';
import { BalanceModule } from './balance/balance.module';
import { AuditModule } from './audit/audit.module';
import { NotificationsModule } from './notifications/notifications.module';
import { SchedulerModule } from './scheduler/scheduler.module';
import { PaymentModule } from './exchange-service/src/payment.module';
import { ExchangeModule } from './exchange-service/src/exchange.module';
import { PrismaClient } from '@prisma/client';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';
import type { RedisClientOptions } from 'redis';
import { ShutdownService } from './shared/services/shutdown.service';
import { RolesGuard } from './shared/guards/roles.guard';
import { ClientModule } from './client/client.module';
import { KafkaModule } from './kafka/kafka.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
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
    SentryModule.forRoot(),
    TransactionsModule,
    ListingsModule,
    UsersModule,
    OffersModule,
    DisputesModule,
    ReviewsModule,
    BalanceModule,
    AuditModule,
    NotificationsModule,
    SchedulerModule,
    PaymentModule,
    ExchangeModule,
    ClientModule,
    KafkaModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: SentryGlobalFilter,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    PrismaService,
    ShutdownService,
  ],
})
export class AppModule implements OnModuleDestroy {
  constructor(private readonly shutdownService: ShutdownService) {}

  async onModuleDestroy() {
    await this.shutdownService.onModuleDestroy();
  }
}
