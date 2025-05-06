import { Logger } from '@nestjs/common';
import { Pool, PoolConfig } from 'pg';
import { MetricsCollector } from './metrics.utils';

export class DatabaseManager {
  private static readonly logger = new Logger(DatabaseManager.name);
  private static readonly pools = new Map<string, Pool>();
  private static readonly metrics = new MetricsCollector('database');

  static async getPool(name: string, config: PoolConfig): Promise<Pool> {
    if (!this.pools.has(name)) {
      const pool = new Pool(config);
      pool.on('error', (err) => {
        this.logger.error(`Unexpected error on idle client in pool ${name}: ${err.message}`, err.stack);
        this.metrics.increment('pool_errors');
      });
      this.pools.set(name, pool);
    }
    return this.pools.get(name)!;
  }

  static async query<T = any>(poolName: string, query: string, params?: any[]): Promise<T[]> {
    const pool = await this.getPool(poolName, {});
    const startTime = Date.now();
    try {
      const result = await pool.query(query, params);
      this.metrics.recordQueryTime(Date.now() - startTime);
      this.metrics.increment('successful_queries');
      return result.rows;
    } catch (error) {
      this.metrics.increment('failed_queries');
      this.logger.error(`Query failed: ${error.message}`, error.stack);
      throw error;
    }
  }

  static async closeAll(): Promise<void> {
    for (const [name, pool] of this.pools.entries()) {
      try {
        await pool.end();
        this.logger.log(`Pool ${name} closed successfully`);
      } catch (error) {
        this.logger.error(`Failed to close pool ${name}: ${error.message}`, error.stack);
      }
    }
    this.pools.clear();
  }
} 