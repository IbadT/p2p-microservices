import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { KafkaProducerService } from './kafka.producer';
import { KafkaEventsService } from './kafka.events.service';

@Module({
  imports: [
    ConfigModule,
    EventEmitterModule.forRoot()
  ],
  providers: [KafkaProducerService, KafkaEventsService],
  exports: [KafkaProducerService],
})
export class KafkaModule {} 