import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
// import { PrismaService } from '../shared/prisma.service';
// import { KafkaService } from '../shared/kafka.service';
import { KafkaService } from 'src/kafka/kafka.service';
import { PrismaService } from 'src/prisma.service';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'REVIEWS_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'reviews',
          protoPath: 'src/proto/reviews.proto',
        },
      },
    ]),
    NotificationsModule,
  ],
  controllers: [ReviewsController],
  providers: [ReviewsService, PrismaService, KafkaService],
  exports: [ReviewsService],
})
export class ReviewsModule {}
