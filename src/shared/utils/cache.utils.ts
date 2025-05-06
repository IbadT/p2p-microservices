import { Cache } from 'cache-manager';
import { Logger } from '@nestjs/common';
import { CircuitBreaker } from './circuit-breaker.utils';

export class CacheUtils {
  private static readonly logger = new Logger(CacheUtils.name);
  private static readonly circuitBreaker = new CircuitBreaker();
  private static readonly locks = new Map<string, Promise<any>>();

  static async getWithFallback<T>(
    cache: Cache,
    key: string,
    fallback: () => Promise<T>,
    ttl: number,
  ): Promise<T> {
    try {
      // Check cache first
      const cached = await this.circuitBreaker.execute(() => cache.get<T>(key));
      if (cached) return cached;

      // Handle race condition
      if (!this.locks.has(key)) {
        this.locks.set(key, this.circuitBreaker.execute(async () => {
          try {
            const result = await fallback();
            await cache.set(key, result, ttl);
            return result;
          } finally {
            this.locks.delete(key);
          }
        }));
      }

      return this.locks.get(key);
    } catch (error) {
      this.logger.error(`Cache operation failed for key ${key}: ${error.message}`, error.stack);
      return fallback();
    }
  }

  static async cleanupExpiredKeys(cache: Cache, pattern: string): Promise<void> {
    try {
      const keys = await this.circuitBreaker.execute(() => cache.store.keys?.(pattern));
      if (keys?.length) {
        await Promise.all(keys.map(key => this.circuitBreaker.execute(() => cache.del(key))));
      }
    } catch (error) {
      this.logger.error(`Cache cleanup failed: ${error.message}`, error.stack);
    }
  }

  static async invalidatePattern(cache: Cache, pattern: string): Promise<void> {
    try {
      const keys = await this.circuitBreaker.execute(() => cache.store.keys?.(pattern));
      if (keys?.length) {
        await Promise.all(keys.map(key => this.circuitBreaker.execute(() => cache.del(key))));
      }
    } catch (error) {
      this.logger.error(`Cache invalidation failed: ${error.message}`, error.stack);
    }
  }
} 