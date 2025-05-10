import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { BalanceController } from './balance.controller';
import { BalanceService } from './balance.service';
import { PrismaService } from '../prisma.service';
import { KafkaModule } from '../kafka/kafka.module';

@Module({
  imports: [
    KafkaModule,
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
  providers: [BalanceService, PrismaService],
  exports: [BalanceService],
})
export class BalanceModule {}
