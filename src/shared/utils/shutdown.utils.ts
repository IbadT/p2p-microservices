import { Logger } from '@nestjs/common';
import { Subject } from 'rxjs';

export class ShutdownManager {
  private static readonly logger = new Logger(ShutdownManager.name);
  private static readonly shutdownSignal$ = new Subject<void>();
  private static cleanupTasks: Array<() => Promise<void>> = [];

  static async registerCleanupTask(task: () => Promise<void>): Promise<void> {
    this.cleanupTasks.push(task);
  }

  static async shutdown(): Promise<void> {
    this.logger.log('Starting graceful shutdown...');
    this.shutdownSignal$.next();

    try {
      await Promise.all(this.cleanupTasks.map(task => task()));
      this.logger.log('Cleanup completed successfully');
    } catch (error) {
      this.logger.error('Error during shutdown:', error);
    } finally {
      process.exit(0);
    }
  }

  static getShutdownSignal$() {
    return this.shutdownSignal$.asObservable();
  }
} 