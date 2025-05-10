import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ExchangeController } from './controllers/exchange.controller';
import { ExchangeGrpcController } from './grpc/exchange.grpc.controller';
import { PaymentVerificationController } from './controllers/payment-verification.controller';
import { ExchangeService } from './services/exchange.service';
import { PaymentVerificationService } from './services/payment-verification.service';
import { PrismaService } from 'src/prisma.service';
import { KafkaService } from 'src/kafka/kafka.service';
import { ReserveService } from './services/reserve.service';
import { NotificationsGateway } from 'src/notifications/notifications.gateway';
import { AuditService } from 'src/audit/audit.service';
import { BalanceService } from 'src/balance/balance.service';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [
    ExchangeController,
    ExchangeGrpcController,
    PaymentVerificationController
  ],
  providers: [
    ExchangeService,
    PaymentVerificationService,
    PrismaService,
    KafkaService,
    ReserveService,
    NotificationsGateway,
    AuditService,
    BalanceService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [ExchangeService, PaymentVerificationService],
})
export class ExchangeModule {} 