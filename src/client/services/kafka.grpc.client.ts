import { Injectable, Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { BaseGrpcClient } from '../base/base.grpc.client';
import { KAFKA_SERVICE } from '../constants';
import { PublishEventDto } from '../interfaces/client.swagger';

@Injectable()
export class KafkaGrpcClient extends BaseGrpcClient {
  constructor(
    @Inject(KAFKA_SERVICE) client: ClientGrpc,
  ) {
    super(client, 'KafkaService');
  }

  /**
   * Публикует событие в Kafka
   * @param dto - Данные события
   * @returns {Promise<void>}
   */
  async publishEvent(dto: PublishEventDto) {
    const service = this.getService<any>('KafkaService');
    return this.callGrpcMethod(service.publishEvent, dto);
  }

  /**
   * Получает список топиков
   * @returns {Promise<string[]>} Список топиков
   */
  async getTopics() {
    const service = this.getService<any>('KafkaService');
    return this.callGrpcMethod(service.getTopics);
  }

  /**
   * Создает топик
   * @param topic - Название топика
   * @returns {Promise<void>}
   */
  async createTopic(topic: string) {
    const service = this.getService<any>('KafkaService');
    return this.callGrpcMethod(service.createTopic, { topic });
  }

  /**
   * Удаляет топик
   * @param topic - Название топика
   * @returns {Promise<void>}
   */
  async deleteTopic(topic: string) {
    const service = this.getService<any>('KafkaService');
    return this.callGrpcMethod(service.deleteTopic, { topic });
  }
} 