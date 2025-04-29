import { Module } from '@nestjs/common';
import { ExchangeController } from './controllers/exchange.controller';
import { ExchangeService } from './services/exchange.service';
import { PrismaService } from './prisma.service';
import { KafkaService } from '../../shared/kafka.service';

@Module({
  controllers: [ExchangeController],
  providers: [ExchangeService, PrismaService, KafkaService],
})
export class ExchangeModule {} 