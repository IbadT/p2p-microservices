import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Kafka, Producer, ProducerRecord } from 'kafkajs';
import { RetryOptions } from './interfaces/kafka.interface';
import { EventEmitter2 } from '@nestjs/event-emitter';

interface FailedMessage {
  topic: string;
  message: any;
  timestamp: number;
  attempts: number;
}

@Injectable()
export class KafkaProducerService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(KafkaProducerService.name);
  private producer: Producer;
  private isConnected = false;
  private reconnectAttempts = 0;
  private readonly maxReconnectAttempts = 5;
  private readonly reconnectInterval = 5000; // 5 seconds
  private reconnectTimeout: NodeJS.Timeout;
  private failedMessages: FailedMessage[] = [];
  private readonly maxFailedMessages = 1000;
  private readonly failedMessagesCheckInterval = 60000; // 1 minute
  private failedMessagesCheckTimeout: NodeJS.Timeout;
  private readonly healthCheckInterval = 30000; // 30 seconds
  private healthCheckTimeout: NodeJS.Timeout;
  private lastSuccessfulMessage: number = Date.now();

  constructor(
    private readonly configService: ConfigService,
    private readonly eventEmitter: EventEmitter2
  ) {
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
    this.startHealthCheck();
    this.startFailedMessagesCheck();
  }

  async onModuleDestroy() {
    await this.disconnect();
    this.stopHealthCheck();
    this.stopFailedMessagesCheck();
  }

  private async connect() {
    try {
      await this.producer.connect();
      this.isConnected = true;
      this.reconnectAttempts = 0;
      this.lastSuccessfulMessage = Date.now();
      this.logger.log('Successfully connected to Kafka broker');
      
      // Try to resend failed messages after reconnection
      await this.resendFailedMessages();
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
      this.eventEmitter.emit('kafka.critical', {
        message: 'Kafka is unavailable for a long time',
        lastSuccessfulMessage: this.lastSuccessfulMessage,
        failedMessagesCount: this.failedMessages.length
      });
    }
  }

  private async ensureConnection() {
    if (!this.isConnected) {
      await this.connect();
    }
  }

  private startHealthCheck() {
    this.healthCheckTimeout = setInterval(async () => {
      try {
        await this.producer.send({
          topic: 'health-check',
          messages: [{ value: JSON.stringify({ timestamp: Date.now() }) }]
        });
        this.lastSuccessfulMessage = Date.now();
      } catch (error) {
        this.logger.error(`Health check failed: ${error.message}`);
        if (Date.now() - this.lastSuccessfulMessage > 300000) { // 5 minutes
          this.eventEmitter.emit('kafka.warning', {
            message: 'No successful messages for more than 5 minutes',
            lastSuccessfulMessage: this.lastSuccessfulMessage
          });
        }
      }
    }, this.healthCheckInterval);
  }

  private stopHealthCheck() {
    if (this.healthCheckTimeout) {
      clearInterval(this.healthCheckTimeout);
    }
  }

  private startFailedMessagesCheck() {
    this.failedMessagesCheckTimeout = setInterval(() => {
      if (this.failedMessages.length > 0) {
        this.logger.warn(`There are ${this.failedMessages.length} failed messages waiting to be sent`);
        this.resendFailedMessages();
      }
    }, this.failedMessagesCheckInterval);
  }

  private stopFailedMessagesCheck() {
    if (this.failedMessagesCheckTimeout) {
      clearInterval(this.failedMessagesCheckTimeout);
    }
  }

  private async resendFailedMessages() {
    if (!this.isConnected || this.failedMessages.length === 0) return;

    const messagesToResend = [...this.failedMessages];
    this.failedMessages = [];

    for (const failedMessage of messagesToResend) {
      try {
        await this.sendMessage(failedMessage.topic, failedMessage.message, {
          maxRetries: 3,
          retryDelay: 1000
        });
      } catch (error) {
        failedMessage.attempts++;
        if (failedMessage.attempts < 5) {
          this.failedMessages.push(failedMessage);
        } else {
          this.logger.error(`Message failed permanently after 5 attempts: ${JSON.stringify(failedMessage)}`);
          this.eventEmitter.emit('kafka.message.failed', failedMessage);
        }
      }
    }
  }

  private addFailedMessage(topic: string, message: any) {
    if (this.failedMessages.length >= this.maxFailedMessages) {
      const oldestMessage = this.failedMessages.shift();
      this.logger.warn(`Removing oldest failed message due to queue limit: ${JSON.stringify(oldestMessage)}`);
    }

    this.failedMessages.push({
      topic,
      message,
      timestamp: Date.now(),
      attempts: 0
    });

    this.eventEmitter.emit('kafka.message.queued', {
      topic,
      message,
      queueLength: this.failedMessages.length
    });
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
        this.lastSuccessfulMessage = Date.now();
        this.logger.debug(`Message sent successfully to topic: ${topic}`);
      } catch (error) {
        this.logger.error(`Error sending message to topic ${topic}: ${error.message}`);
        
        if (retryConfig.currentRetry < retryConfig.maxRetries) {
          retryConfig.currentRetry++;
          this.logger.warn(`Retrying message send (attempt ${retryConfig.currentRetry}/${retryConfig.maxRetries})`);
          
          await new Promise(resolve => setTimeout(resolve, retryConfig.retryDelay));
          return sendWithRetry();
        } else {
          this.addFailedMessage(topic, message);
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
        this.lastSuccessfulMessage = Date.now();
        this.logger.debug(`Batch of ${messages.length} messages sent successfully to topic: ${topic}`);
      } catch (error) {
        this.logger.error(`Error sending batch to topic ${topic}: ${error.message}`);
        
        if (retryConfig.currentRetry < retryConfig.maxRetries) {
          retryConfig.currentRetry++;
          this.logger.warn(`Retrying batch send (attempt ${retryConfig.currentRetry}/${retryConfig.maxRetries})`);
          
          await new Promise(resolve => setTimeout(resolve, retryConfig.retryDelay));
          return sendBatchWithRetry();
        } else {
          messages.forEach(message => this.addFailedMessage(topic, message));
          throw new Error(`Failed to send batch to topic ${topic} after ${retryConfig.maxRetries} attempts`);
        }
      }
    };

    return sendBatchWithRetry();
  }

  getFailedMessagesCount(): number {
    return this.failedMessages.length;
  }

  getLastSuccessfulMessageTime(): number {
    return this.lastSuccessfulMessage;
  }
} 