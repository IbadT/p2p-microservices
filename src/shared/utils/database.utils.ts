import { Pool, PoolConfig } from 'pg';
import { Logger } from '@nestjs/common';
import { MetricsCollector } from './metrics.utils';

export class DatabaseUtils {
  private static readonly pools: Map<string, Pool> = new Map();
  private static readonly logger = new Logger(DatabaseUtils.name);
  private static readonly metrics = new MetricsCollector('database');

  private static async getPool(poolName: string, config: PoolConfig): Promise<Pool> {
    if (!this.pools.has(poolName)) {
      const pool = new Pool(config);
      this.pools.set(poolName, pool);
    }
    return this.pools.get(poolName)!;
  }

  static async query<T extends Record<string, unknown>>(
    poolName: string,
    query: string,
    params?: unknown[],
  ): Promise<T[]> {
    const pool = await this.getPool(poolName, {});
    const startTime = Date.now();
    try {
      const result = await pool.query(query, params);
      this.metrics.recordQueryTime(Date.now() - startTime);
      this.metrics.increment('successful_queries');
      return result.rows as T[];
    } catch (error) {
      this.metrics.increment('failed_queries');
      this.logger.error(`Query failed: ${error instanceof Error ? error.message : 'Unknown error'}`, error instanceof Error ? error.stack : undefined);
      throw error;
    }
  }

  static async closeAll(): Promise<void> {
    await Promise.all(
      Array.from(this.pools.values()).map(pool => pool.end())
    );
    this.pools.clear();
  }
} 