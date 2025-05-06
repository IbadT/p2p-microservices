import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { CacheUtils } from '../utils/cache.utils';
import { Observable } from 'rxjs';
import { CircuitBreaker } from '../utils/circuit-breaker.utils';
import { ShutdownManager } from '../utils/shutdown.utils';
import { User } from '../../client/interfaces/types';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private static readonly logger = new Logger(JwtAuthGuard.name);
  private static readonly circuitBreaker = new CircuitBreaker();
  private static readonly TOKEN_CACHE_TTL = 3600; // 1 hour
  private static readonly CLEANUP_INTERVAL = 60000; // 1 minute
  private static cleanupInterval: NodeJS.Timeout | undefined;

  constructor(
    private readonly jwtService: JwtService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {
    super();
    this.startCleanupJob();
    ShutdownManager.registerCleanupTask(async () => {
      await this.stopCleanupJob();
    });
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  handleRequest<TUser = User>(
    err: Error | null,
    user: TUser | null,
    info: Record<string, unknown>,
    context: ExecutionContext,
    status?: number,
  ): TUser {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }

  private async startCleanupJob(): Promise<void> {
    if (JwtAuthGuard.cleanupInterval) {
      clearInterval(JwtAuthGuard.cleanupInterval);
    }

    JwtAuthGuard.cleanupInterval = setInterval(async () => {
      try {
        await JwtAuthGuard.circuitBreaker.execute(async () => {
          const keys = await this.cacheManager.get('jwt:*');
          if (keys) {
            await this.cacheManager.del('jwt:*');
          }
        });
      } catch (error) {
        JwtAuthGuard.logger.error(`Token cleanup failed: ${error.message}`, error.stack);
      }
    }, JwtAuthGuard.CLEANUP_INTERVAL);
  }

  private async stopCleanupJob(): Promise<void> {
    if (JwtAuthGuard.cleanupInterval) {
      clearInterval(JwtAuthGuard.cleanupInterval);
      JwtAuthGuard.cleanupInterval = undefined;
    }
  }

  async validateToken(token: string): Promise<boolean> {
    try {
      const cacheKey = `jwt:${token}`;
      const cached = await JwtAuthGuard.circuitBreaker.execute(() => 
        this.cacheManager.get<boolean>(cacheKey)
      );

      if (cached !== undefined && cached !== null) {
        return cached;
      }

      const isValid = await JwtAuthGuard.circuitBreaker.execute(async () => {
        try {
          await this.jwtService.verify(token);
          return true;
        } catch {
          return false;
        }
      });

      await JwtAuthGuard.circuitBreaker.execute(() => 
        this.cacheManager.set(cacheKey, isValid, JwtAuthGuard.TOKEN_CACHE_TTL)
      );

      return isValid;
    } catch (error) {
      JwtAuthGuard.logger.error(`Token validation failed: ${error.message}`, error.stack);
      return false;
    }
  }
} 