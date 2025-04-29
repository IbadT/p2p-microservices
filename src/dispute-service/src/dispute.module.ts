import { Module } from '@nestjs/common';
import { DisputeController } from './controllers/dispute.controller';
import { DisputeService } from './services/dispute.service';
import { PrismaService } from '../../shared/prisma.service';
import { KafkaService } from '../../shared/kafka.service';

@Module({
  controllers: [DisputeController],
  providers: [DisputeService, PrismaService, KafkaService],
})
export class DisputeModule {} 