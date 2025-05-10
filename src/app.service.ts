import { Injectable, Logger } from '@nestjs/common';
import { KafkaProducerService } from './kafka/kafka.producer';
import { NotificationType } from './client/interfaces/enums';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(private readonly kafkaProducer: KafkaProducerService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async checkHealth() {
    try {
      // Try to send a test message to Kafka
      await this.kafkaProducer.sendMessage('health', {
        type: NotificationType.HEALTH_CHECK,
        data: {
          timestamp: new Date().toISOString(),
          service: 'p2p-service'
        }
      });

      return {
        status: 'ok',
        kafka: {
          connected: true,
          message: 'Kafka is healthy'
        }
      };
    } catch (error) {
      this.logger.error(`Health check failed: ${error.message}`);
      throw {
        status: 'error',
        kafka: {
          connected: false,
          message: error.message
        }
      };
    }
  }
}
