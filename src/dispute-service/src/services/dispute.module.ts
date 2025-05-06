import { Module } from '@nestjs/common';
import { DisputeController } from './dispute.controller';
import { DisputeService } from './dispute.service';
import { PrismaService } from 'src/prisma.service';
import { KafkaService } from 'src/kafka/kafka.service';

@Module({
  controllers: [DisputeController],
  providers: [DisputeService, PrismaService, KafkaService],
  exports: [DisputeService],
})
export class DisputeModule {} 