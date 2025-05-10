import { Module } from '@nestjs/common';
import { ExchangeService } from './services/exchange.service';
import { ExchangeController } from './controllers/exchange.controller';
import { PrismaService } from 'src/prisma.service';
import { KafkaModule } from 'src/kafka/kafka.module';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { PaymentModule } from './payment.module';
import { ReserveService } from './services/reserve.service';
import { KafkaService } from 'src/kafka/kafka.service';
import { AuditModule } from 'src/audit/audit.module';
import { BalanceModule } from 'src/balance/balance.module';
import { ConfigModule } from '@nestjs/config';
import { KafkaProducerService } from 'src/kafka/kafka.producer';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    ConfigModule,
    KafkaModule,
    NotificationsModule,
    PaymentModule,
    AuditModule,
    BalanceModule,
    CacheModule.register()
  ],
  controllers: [ExchangeController],
  providers: [
    ExchangeService,
    PrismaService,
    ReserveService,
    KafkaService,
    KafkaProducerService
  ],
  exports: [ExchangeService]
})
export class ExchangeModule {} 