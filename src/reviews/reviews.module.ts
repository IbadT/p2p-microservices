import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { PrismaService } from '../shared/prisma.service';
import { KafkaService } from '../shared/kafka.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'REVIEWS_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'reviews',
          protoPath: 'proto/reviews.proto',
        },
      },
    ]),
  ],
  controllers: [ReviewsController],
  providers: [ReviewsService, PrismaService, KafkaService],
  exports: [ReviewsService],
})
export class ReviewsModule {}
