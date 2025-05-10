import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class KafkaEventsService implements OnModuleInit {
  private readonly logger = new Logger(KafkaEventsService.name);

  onModuleInit() {
    this.logger.log('KafkaEventsService initialized');
  }

  @OnEvent('kafka.critical')
  handleKafkaCritical(payload: any) {
    this.logger.error('Kafka critical event:', payload);
    // Здесь можно добавить отправку уведомлений в систему мониторинга
    // Например, через Slack, Email или другие каналы
  }

  @OnEvent('kafka.warning')
  handleKafkaWarning(payload: any) {
    this.logger.warn('Kafka warning event:', payload);
    // Здесь можно добавить отправку уведомлений в систему мониторинга
  }

  @OnEvent('kafka.message.queued')
  handleMessageQueued(payload: any) {
    this.logger.warn('Message queued due to Kafka unavailability:', payload);
    // Здесь можно добавить логику для мониторинга очереди сообщений
  }

  @OnEvent('kafka.message.failed')
  handleMessageFailed(payload: any) {
    this.logger.error('Message failed permanently:', payload);
    // Здесь можно добавить логику для обработки окончательно неудачных сообщений
    // Например, сохранение в базу данных для последующего анализа
  }
} 