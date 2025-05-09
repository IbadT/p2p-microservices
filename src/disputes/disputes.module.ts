import { Module, forwardRef } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DisputesController } from './disputes.controller';
import { DisputesService } from './disputes.service';
import { PrismaService } from '../prisma.service';
// import { KafkaService } from '../shared/kafka.service';
import { KafkaService } from 'src/kafka/kafka.service';
import { NotificationsModule } from '../notifications/notifications.module';
import { AuditModule } from '../audit/audit.module';
import { AuthModule } from '../auth/auth.module';
import { ClientModule } from '../client/client.module';
import { NotificationsGateway } from '../notifications/notifications.gateway';
import { AuditService } from '../audit/audit.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
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
    forwardRef(() => ClientModule),
  ],
  controllers: [DisputesController],
  providers: [
    DisputesService,
    PrismaService,
    KafkaService,
    NotificationsGateway,
    AuditService,
  ],
  // exports: [DisputesService],
  exports: [DisputesService],
})
export class DisputesModule {}
