import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DisputesController } from './disputes.controller';
import { DisputesService } from './disputes.service';
import { PrismaService } from '../prisma.service';
// import { KafkaService } from '../shared/kafka.service';
import { KafkaService } from 'src/kafka/kafka.service';
import { NotificationsModule } from '../notifications/notifications.module';
import { AuditModule } from '../audit/audit.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
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
  ],
  controllers: [DisputesController],
  providers: [DisputesService, PrismaService, KafkaService],
  exports: [DisputesService],
})
export class DisputesModule {}
