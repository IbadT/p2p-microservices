import { Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { MetricsCollector } from './metrics.utils';

export class SecurityManager {
  private static readonly logger = new Logger(SecurityManager.name);
  private static readonly metrics = new MetricsCollector('security');
  private static readonly suspiciousIps = new Map<string, {
    count: number;
    lastAttempt: number;
  }>();
  private static readonly BLOCK_THRESHOLD = 10;
  private static readonly BLOCK_DURATION = 3600000; // 1 hour

  constructor(private readonly cacheManager: Cache) {}

  static async validateInput(data: any, schema: any): Promise<boolean> {
    try {
      // Здесь можно использовать любую библиотеку валидации, например, Joi или class-validator
      // Для примера используем простую проверку
      if (!data || typeof data !== 'object') {
        return false;
      }
      return true;
    } catch (error) {
      this.metrics.increment('validation_errors');
      this.logger.error(`Validation error: ${error.message}`, error.stack);
      return false;
    }
  }

  static async checkRateLimit(ip: string, endpoint: string): Promise<boolean> {
    const key = `rate_limit:${ip}:${endpoint}`;
    const current = this.suspiciousIps.get(ip) || { count: 0, lastAttempt: 0 };
    const now = Date.now();

    if (now - current.lastAttempt < 1000) { // 1 second
      current.count++;
      if (current.count >= this.BLOCK_THRESHOLD) {
        this.metrics.increment('blocked_ips');
        this.logger.warn(`IP ${ip} blocked due to suspicious activity`);
        return false;
      }
    } else {
      current.count = 1;
    }

    current.lastAttempt = now;
    this.suspiciousIps.set(ip, current);
    return true;
  }

  static async isIpBlocked(ip: string): Promise<boolean> {
    const record = this.suspiciousIps.get(ip);
    if (!record) return false;

    const now = Date.now();
    if (now - record.lastAttempt > this.BLOCK_DURATION) {
      this.suspiciousIps.delete(ip);
      return false;
    }

    return record.count >= this.BLOCK_THRESHOLD;
  }

  static async monitorActivity(ip: string, endpoint: string): Promise<void> {
    const key = `activity:${ip}:${endpoint}`;
    const now = Date.now();
    const activity = {
      timestamp: now,
      endpoint,
      ip
    };

    this.metrics.increment('monitored_activity');
    // Здесь можно добавить логику для анализа подозрительной активности
    // Например, проверка на DDoS атаки или необычные паттерны запросов
  }
} 