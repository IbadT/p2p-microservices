import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { PrismaService } from '../prisma.service';
import { KafkaService } from '../shared/kafka.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'EXCHANGE_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'exchange',
          protoPath: 'proto/exchange.proto',
        },
      },
    ]),
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService, PrismaService, KafkaService],
  exports: [TransactionsService],
})
export class TransactionsModule {}
