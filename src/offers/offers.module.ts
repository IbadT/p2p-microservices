import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OffersController } from './offers.controller';
import { OffersService } from './offers.service';
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
  controllers: [OffersController],
  providers: [OffersService, PrismaService, KafkaService],
  exports: [OffersService],
})
export class OffersModule {}
