import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuditController } from './audit.controller';
import { AuditService } from './audit.service';
// import { PrismaService } from '../shared/prisma.service';
// import { KafkaService } from '../shared/kafka.service';
import { KafkaService } from 'src/kafka/kafka.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUDIT_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'audit',
          protoPath: 'src/proto/audit.proto',
        },
      },
    ]),
  ],
  controllers: [AuditController],
  providers: [AuditService, PrismaService, KafkaService],
  exports: [AuditService],
})
export class AuditModule {}
