import { Module, forwardRef } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DisputesController } from './disputes.controller';
import { DisputesService } from './disputes.service';
import { PrismaService } from '../prisma.service';
import { KafkaModule } from '../kafka/kafka.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { AuditModule } from '../audit/audit.module';
import { AuthModule } from '../auth/auth.module';
import { ClientModule } from '../client/client.module';
import { NotificationsGateway } from '../notifications/notifications.gateway';
import { AuditService } from '../audit/audit.service';
import { CacheModule } from '@nestjs/cache-manager';
import { BalanceModule } from '../balance/balance.module';

@Module({
  imports: [
    KafkaModule,
    CacheModule.register(),
    ClientsModule.register([
      {
        name: 'DISPUTE_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'dispute',
          protoPath: 'src/proto/dispute.proto',
        },
      },
    ]),
    NotificationsModule,
    AuditModule,
    AuthModule,
    BalanceModule,
    forwardRef(() => ClientModule),
  ],
  controllers: [DisputesController],
  providers: [
    DisputesService,
    PrismaService,
    NotificationsGateway,
    AuditService,
  ],
  // exports: [DisputesService],
  exports: [DisputesService],
})
export class DisputesModule {}
