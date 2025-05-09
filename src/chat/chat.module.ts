import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { PrismaService } from '../prisma.service';
import { KafkaService } from '../kafka/kafka.service';
import { NotificationsGateway } from '../notifications/notifications.gateway';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CHAT_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'chat',
          protoPath: 'src/proto/chat.proto',
        },
      },
    ]),
  ],
  controllers: [ChatController],
  providers: [ChatService, PrismaService, KafkaService, NotificationsGateway],
  exports: [ChatService],
})
export class ChatModule {} 