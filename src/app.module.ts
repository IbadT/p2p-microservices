import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SentryGlobalFilter, SentryModule } from '@sentry/nestjs/setup';
import { APP_FILTER } from '@nestjs/core';
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
import { ExchangeModule } from './exchange-service/src/exchange.module';
import { DisputeModule } from './dispute-service/src/dispute.module';
import { PrismaClient } from '@prisma/client';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
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
    ExchangeModule,
    DisputeModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: SentryGlobalFilter,
    },
    PrismaService,
  ],
})
export class AppModule {}
