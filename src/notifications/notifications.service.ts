import { Injectable, Logger } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { KafkaProducerService } from '../kafka/kafka.producer';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(private readonly kafkaProducer: KafkaProducerService) {}

  async create(createNotificationDto: CreateNotificationDto) {
    try {
      await this.kafkaProducer.sendMessage('notifications', {
        type: 'CREATE',
        data: createNotificationDto,
        timestamp: new Date().toISOString()
      });
      return 'Notification created and sent to Kafka';
    } catch (error) {
      this.logger.error(`Failed to send notification to Kafka: ${error.message}`);
      throw error;
    }
  }

  async findAll() {
    try {
      await this.kafkaProducer.sendMessage('notifications', {
        type: 'LIST',
        timestamp: new Date().toISOString()
      });
      return 'Notification list request sent to Kafka';
    } catch (error) {
      this.logger.error(`Failed to send notification list request to Kafka: ${error.message}`);
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      await this.kafkaProducer.sendMessage('notifications', {
        type: 'GET',
        id,
        timestamp: new Date().toISOString()
      });
      return `Notification #${id} request sent to Kafka`;
    } catch (error) {
      this.logger.error(`Failed to send notification request to Kafka: ${error.message}`);
      throw error;
    }
  }

  async update(id: number, updateNotificationDto: UpdateNotificationDto) {
    try {
      await this.kafkaProducer.sendMessage('notifications', {
        type: 'UPDATE',
        id,
        data: updateNotificationDto,
        timestamp: new Date().toISOString()
      });
      return `Notification #${id} update sent to Kafka`;
    } catch (error) {
      this.logger.error(`Failed to send notification update to Kafka: ${error.message}`);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      await this.kafkaProducer.sendMessage('notifications', {
        type: 'DELETE',
        id,
        timestamp: new Date().toISOString()
      });
      return `Notification #${id} deletion sent to Kafka`;
    } catch (error) {
      this.logger.error(`Failed to send notification deletion to Kafka: ${error.message}`);
      throw error;
    }
  }
}
