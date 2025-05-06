import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { DatabaseUtils } from '../utils/database.utils';
import { MetricsCollector } from '../utils/metrics.utils';
import { QueueManager } from '../utils/queue.utils';

@Injectable()
export class ShutdownService implements OnModuleDestroy {
  private readonly logger = new Logger(ShutdownService.name);

  async onModuleDestroy() {
    this.logger.log('Starting graceful shutdown...');

    try {
      // Закрываем все пулы соединений с БД
      await DatabaseUtils.closeAll();
      this.logger.log('Database connections closed');

      // Сохраняем метрики
      await MetricsCollector.report();
      this.logger.log('Metrics reported');

      // Очищаем очереди
      // QueueManager не требует явного закрытия, так как использует только память

      this.logger.log('Graceful shutdown completed');
    } catch (error) {
      this.logger.error(`Error during shutdown: ${error.message}`, error.stack);
    }
  }
} 