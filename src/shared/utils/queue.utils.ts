import { Logger } from '@nestjs/common';
import { MetricsCollector } from './metrics.utils';

interface QueueItem<T> {
  task: () => Promise<T>;
  resolve: (value: T) => void;
  reject: (error: Error) => void;
}

export class QueueManager {
  private static readonly logger = new Logger(QueueManager.name);
  private static readonly metrics = new MetricsCollector('queue');
  private static readonly queues = new Map<string, QueueItem<any>[]>();
  private static readonly processing = new Map<string, boolean>();
  private static readonly MAX_RETRIES = 3;
  private static readonly RETRY_DELAY = 1000;

  static async addToQueue<T>(
    queueName: string,
    task: () => Promise<T>
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      const queue = this.queues.get(queueName) || [];
      queue.push({ task, resolve, reject });
      this.queues.set(queueName, queue);
      this.processQueue(queueName);
    });
  }

  private static async processQueue<T>(queueName: string): Promise<void> {
    if (this.processing.get(queueName)) return;

    this.processing.set(queueName, true);
    const queue = this.queues.get(queueName) || [];

    while (queue.length > 0) {
      const item = queue.shift()!;
      let retries = 0;

      while (retries < this.MAX_RETRIES) {
        try {
          const startTime = Date.now();
          const result = await item.task();
          this.metrics.recordProcessingTime(Date.now() - startTime);
          item.resolve(result);
          break;
        } catch (error) {
          retries++;
          if (retries === this.MAX_RETRIES) {
            this.metrics.increment('failed_tasks');
            this.logger.error(`Task failed after ${retries} retries: ${error.message}`, error.stack);
            item.reject(error as Error);
          } else {
            await new Promise(resolve => 
              setTimeout(resolve, this.RETRY_DELAY * Math.pow(2, retries - 1))
            );
          }
        }
      }
    }

    this.processing.set(queueName, false);
  }

  static getQueueMetrics(queueName: string): {
    queueLength: number;
    processing: boolean;
  } {
    return {
      queueLength: (this.queues.get(queueName) || []).length,
      processing: this.processing.get(queueName) || false
    };
  }
} 