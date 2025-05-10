import { Module } from '@nestjs/common';
import { PaymentVerificationService } from './services/payment-verification.service';
import { PaymentNotificationService } from './services/payment-notification.service';
import { PrismaService } from 'src/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { KafkaModule } from 'src/kafka/kafka.module';
import { AuditModule } from 'src/audit/audit.module';
import { HttpModule } from '@nestjs/axios';
import { BankIntegrationService } from './services/bank-integration.service';
import { KafkaProducerService } from 'src/kafka/kafka.producer';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { NotificationsGateway } from 'src/notifications/notifications.gateway';

@Module({
  imports: [
    ConfigModule,
    KafkaModule,
    AuditModule,
    HttpModule,
    NotificationsModule
  ],
  providers: [
    PaymentVerificationService,
    PaymentNotificationService,
    PrismaService,
    BankIntegrationService,
    KafkaProducerService,
    NotificationsGateway
  ],
  exports: [
    PaymentVerificationService,
    PaymentNotificationService,
    BankIntegrationService
  ]
})
export class PaymentModule {} 