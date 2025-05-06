import { Injectable, ExecutionContext, UnauthorizedException, Inject } from '@nestjs/common';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Logger } from '@nestjs/common';
import { CircuitBreaker } from '../utils/circuit-breaker.utils';
import { ShutdownManager } from '../utils/shutdown.utils';
import { rateLimitConfig } from '../../config/rate-limit.config';

export interface RateLimitConfig {
  limit: number;
  window: number;
}

@Injectable()
export class RateLimitGuard {
  private static readonly logger = new Logger(RateLimitGuard.name);
  private static readonly circuitBreaker = new CircuitBreaker();
  private static readonly CLEANUP_INTERVAL = 60000; // 1 minute
  private static cleanupInterval: NodeJS.Timeout | undefined;

  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {
    this.startCleanupJob();
    ShutdownManager.registerCleanupTask(async () => {
      await this.stopCleanupJob();
    });
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const endpoint = request.route.path;
    const ip = request.ip;
    const user = request.user?.id || 'anonymous';

    const config = this.getConfigForEndpoint(endpoint);
    if (!config) return true;

    const key = `rate-limit:${endpoint}:${user}:${ip}`;
    const current = await this.getCurrentCount(key);

    if (current >= config.limit) {
      throw new UnauthorizedException('Rate limit exceeded');
    }

    await this.incrementCount(key, config.window);
    return true;
  }

  private getConfigForEndpoint(endpoint: string): RateLimitConfig | null {
    if (endpoint.startsWith('/auth')) {
      return rateLimitConfig.auth;
    }
    if (endpoint.startsWith('/api')) {
      return rateLimitConfig.api;
    }
    return rateLimitConfig.default;
  }

  private async getCurrentCount(key: string): Promise<number> {
    try {
      const count = await RateLimitGuard.circuitBreaker.execute(() => 
        this.cacheManager.get<number>(key)
      );
      return count ?? 0;
    } catch (error) {
      RateLimitGuard.logger.error(`Failed to get rate limit count: ${error.message}`, error.stack);
      return 0;
    }
  }

  private async incrementCount(key: string, window: number): Promise<void> {
    try {
      await RateLimitGuard.circuitBreaker.execute(async () => {
        const current = await this.getCurrentCount(key);
        await this.cacheManager.set(key, current + 1, window);
      });
    } catch (error) {
      RateLimitGuard.logger.error(`Failed to increment rate limit count: ${error.message}`, error.stack);
    }
  }

  private async startCleanupJob(): Promise<void> {
    if (RateLimitGuard.cleanupInterval) {
      clearInterval(RateLimitGuard.cleanupInterval);
    }

    RateLimitGuard.cleanupInterval = setInterval(async () => {
      try {
        await RateLimitGuard.circuitBreaker.execute(async () => {
          const value = await this.cacheManager.get('rate-limit:*');
          if (value) {
            await this.cacheManager.del('rate-limit:*');
          }
        });
      } catch (error) {
        RateLimitGuard.logger.error(`Rate limit cleanup failed: ${error.message}`, error.stack);
      }
    }, RateLimitGuard.CLEANUP_INTERVAL);
  }

  private async stopCleanupJob(): Promise<void> {
    if (RateLimitGuard.cleanupInterval) {
      clearInterval(RateLimitGuard.cleanupInterval);
      RateLimitGuard.cleanupInterval = undefined;
    }
  }
} 