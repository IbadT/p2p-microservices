import { Injectable, Logger } from '@nestjs/common';
import { KafkaService } from './kafka/kafka.service';
import { NotificationType } from './client/interfaces/enums';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(private readonly kafkaService: KafkaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async checkHealth() {
    try {
      // Try to send a test message to Kafka
      await this.kafkaService.sendEvent({
        type: NotificationType.HEALTH_CHECK,
        payload: {
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
