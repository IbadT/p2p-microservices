import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ListingsController } from './listings.controller';
import { ListingsService } from './listings.service';
import { PrismaService } from '../prisma.service';
// import { KafkaService } from '../shared/kafka.service';
import { KafkaService } from 'src/kafka/kafka.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'EXCHANGE_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'exchange',
          protoPath: 'src/proto/exchange.proto',
        },
      },
    ]),
  ],
  controllers: [ListingsController],
  providers: [ListingsService, PrismaService, KafkaService],
  exports: [ListingsService],
})
export class ListingsModule {}
