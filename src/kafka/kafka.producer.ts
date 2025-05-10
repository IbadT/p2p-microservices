import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Kafka, Producer, ProducerRecord } from 'kafkajs';
import { RetryOptions } from './interfaces/kafka.interface';

@Injectable()
export class KafkaProducerService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(KafkaProducerService.name);
  private producer: Producer;
  private isConnected = false;
  private reconnectAttempts = 0;
  private readonly maxReconnectAttempts = 5;
  private readonly reconnectInterval = 5000; // 5 seconds
  private reconnectTimeout: NodeJS.Timeout;

  constructor(private readonly configService: ConfigService) {
    const kafka = new Kafka({
      clientId: 'p2p-exchange-producer',
      brokers: [this.configService.get<string>('KAFKA_BROKER') ?? 'localhost:9092'],
      retry: {
        initialRetryTime: 100,
        retries: 8
      }
    });

    this.producer = kafka.producer({
      allowAutoTopicCreation: true,
      transactionTimeout: 30000
    });
  }

  async onModuleInit() {
    await this.connect();
  }

  async onModuleDestroy() {
    await this.disconnect();
  }

  private async connect() {
    try {
      await this.producer.connect();
      this.isConnected = true;
      this.reconnectAttempts = 0;
      this.logger.log('Successfully connected to Kafka broker');
    } catch (error) {
      this.logger.error(`Failed to connect to Kafka broker: ${error.message}`);
      this.handleConnectionError();
    }
  }

  private async disconnect() {
    try {
      await this.producer.disconnect();
      this.isConnected = false;
      this.logger.log('Successfully disconnected from Kafka broker');
    } catch (error) {
      this.logger.error(`Error disconnecting from Kafka broker: ${error.message}`);
    }
  }

  private handleConnectionError() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      this.logger.warn(`Attempting to reconnect to Kafka broker (attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
      
      this.reconnectTimeout = setTimeout(async () => {
        await this.connect();
      }, this.reconnectInterval);
    } else {
      this.logger.error('Max reconnection attempts reached. Please check Kafka broker status.');
      // Здесь можно добавить отправку уведомления в систему мониторинга
    }
  }

  private async ensureConnection() {
    if (!this.isConnected) {
      await this.connect();
    }
  }

  async sendMessage(topic: string, message: any, retryOptions?: RetryOptions) {
    const retryConfig = {
      maxRetries: retryOptions?.maxRetries ?? 3,
      retryDelay: retryOptions?.retryDelay ?? 1000,
      currentRetry: 0
    };

    const sendWithRetry = async (): Promise<void> => {
      try {
        await this.ensureConnection();

        const record: ProducerRecord = {
          topic,
          messages: [
            {
              value: JSON.stringify(message),
              timestamp: Date.now().toString()
            }
          ]
        };

        await this.producer.send(record);
        this.logger.debug(`Message sent successfully to topic: ${topic}`);
      } catch (error) {
        this.logger.error(`Error sending message to topic ${topic}: ${error.message}`);
        
        if (retryConfig.currentRetry < retryConfig.maxRetries) {
          retryConfig.currentRetry++;
          this.logger.warn(`Retrying message send (attempt ${retryConfig.currentRetry}/${retryConfig.maxRetries})`);
          
          await new Promise(resolve => setTimeout(resolve, retryConfig.retryDelay));
          return sendWithRetry();
        } else {
          // Здесь можно добавить логику сохранения неудачных сообщений для последующей обработки
          this.logger.error(`Failed to send message after ${retryConfig.maxRetries} attempts`);
          throw new Error(`Failed to send message to topic ${topic} after ${retryConfig.maxRetries} attempts`);
        }
      }
    };

    return sendWithRetry();
  }

  async sendBatch(topic: string, messages: any[], retryOptions?: RetryOptions) {
    const retryConfig = {
      maxRetries: retryOptions?.maxRetries ?? 3,
      retryDelay: retryOptions?.retryDelay ?? 1000,
      currentRetry: 0
    };

    const sendBatchWithRetry = async (): Promise<void> => {
      try {
        await this.ensureConnection();

        const record: ProducerRecord = {
          topic,
          messages: messages.map(message => ({
            value: JSON.stringify(message),
            timestamp: Date.now().toString()
          }))
        };

        await this.producer.send(record);
        this.logger.debug(`Batch of ${messages.length} messages sent successfully to topic: ${topic}`);
      } catch (error) {
        this.logger.error(`Error sending batch to topic ${topic}: ${error.message}`);
        
        if (retryConfig.currentRetry < retryConfig.maxRetries) {
          retryConfig.currentRetry++;
          this.logger.warn(`Retrying batch send (attempt ${retryConfig.currentRetry}/${retryConfig.maxRetries})`);
          
          await new Promise(resolve => setTimeout(resolve, retryConfig.retryDelay));
          return sendBatchWithRetry();
        } else {
          this.logger.error(`Failed to send batch after ${retryConfig.maxRetries} attempts`);
          throw new Error(`Failed to send batch to topic ${topic} after ${retryConfig.maxRetries} attempts`);
        }
      }
    };

    return sendBatchWithRetry();
  }
} 