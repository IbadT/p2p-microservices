import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';
import type { RedisClientOptions } from 'redis';
import { PaymentController } from './controllers/payment.controller';
import { PaymentGrpcController } from './grpc/payment.grpc.controller';
import { PaymentService } from './services/payment.service';
import { PrismaService } from 'src/prisma.service';
import { KafkaService } from 'src/kafka/kafka.service';
// import { PaymentVerificationService } from './services/payment-verification.service';
import { PaymentWebhookService } from './services/payment-webhook.service';
import paymentConfig from './config/payment.config';
import { PaymentVerificationService } from 'src/exchange-service/src/services/payment-verification.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [paymentConfig],
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
  ],
  controllers: [PaymentController, PaymentGrpcController],
  providers: [
    PaymentService,
    PrismaService,
    KafkaService,
    PaymentVerificationService,
    PaymentWebhookService
  ],
  exports: [PaymentService, PaymentVerificationService, PaymentWebhookService],
})
export class PaymentModule {} 