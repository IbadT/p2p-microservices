import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DisputesController } from './disputes.controller';
import { DisputesService } from './disputes.service';
import { PrismaService } from '../prisma.service';
import { KafkaService } from '../shared/kafka.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'DISPUTE_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'dispute',
          protoPath: 'proto/dispute.proto',
        },
      },
    ]),
  ],
  controllers: [DisputesController],
  providers: [DisputesService, PrismaService, KafkaService],
  exports: [DisputesService],
})
export class DisputesModule {}
