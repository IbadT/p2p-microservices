import { Module } from '@nestjs/common';
import { ExchangeController } from './controllers/exchange.controller';
import { ExchangeService } from './services/exchange.service';
// import { PrismaService } from './prisma.service';
// import { KafkaService } from '../../shared/kafka.service';
import { KafkaService } from 'src/kafka/kafka.service';
import { PrismaService } from 'src/prisma.service';
import { ExchangeGrpcController } from './grpc/exchange.grpc.controller';
import { NotificationsGateway } from 'src/notifications/notifications.gateway';
import { AuditService } from 'src/audit/audit.service';
import { BalanceService } from 'src/balance/balance.service';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';

@Module({
  controllers: [ExchangeController, ExchangeGrpcController],
  providers: [
    ExchangeService,
    PrismaService,
    KafkaService,
    NotificationsGateway,
    AuditService,
    BalanceService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class ExchangeModule {} 