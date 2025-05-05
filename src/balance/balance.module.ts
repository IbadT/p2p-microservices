import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { BalanceController } from './balance.controller';
import { BalanceService } from './balance.service';
import { PrismaService } from '../prisma.service';
// import { KafkaService } from '../shared/kafka.service';
import { KafkaService } from 'src/kafka/kafka.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'BALANCE_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'balance',
          protoPath: 'src/proto/balance.proto',
        },
      },
    ]),
  ],
  controllers: [BalanceController],
  providers: [BalanceService, PrismaService, KafkaService],
  exports: [BalanceService],
})
export class BalanceModule {}
