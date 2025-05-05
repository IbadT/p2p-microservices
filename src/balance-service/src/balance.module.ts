import { Module } from '@nestjs/common';
import { BalanceController } from './controllers/balance.controller';
import { BalanceService } from './services/balance.service';
// import { PrismaService } from '../../shared/prisma.service';
// import { KafkaService } from '../../shared/kafka.service';
import { KafkaService } from 'src/kafka/kafka.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [BalanceController],
  providers: [BalanceService, PrismaService, KafkaService],
})
export class BalanceModule {} 