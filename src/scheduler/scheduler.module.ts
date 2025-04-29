import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulerController } from './scheduler.controller';
import { SchedulerService } from './scheduler.service';
import { PrismaService } from '../shared/prisma.service';
import { KafkaService } from '../shared/kafka.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ClientsModule.register([
      {
        name: 'SCHEDULER_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'scheduler',
          protoPath: 'proto/scheduler.proto',
        },
      },
    ]),
  ],
  controllers: [SchedulerController],
  providers: [SchedulerService, PrismaService, KafkaService],
  exports: [SchedulerService],
})
export class SchedulerModule {}
