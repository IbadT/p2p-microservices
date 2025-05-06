import { Module } from '@nestjs/common';
import { DisputeController } from './controllers/dispute.controller';
import { DisputeService } from './services/dispute.service';
import { KafkaService } from 'src/kafka/kafka.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [DisputeController],
  providers: [DisputeService, PrismaService, KafkaService],
})
export class DisputeModule {} 