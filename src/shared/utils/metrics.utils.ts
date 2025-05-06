import { Logger } from '@nestjs/common';

export class MetricsCollector {
  private static readonly logger = new Logger(MetricsCollector.name);
  private static readonly metrics = new Map<string, {
    count: number;
    totalTime: number;
    maxTime: number;
    minTime: number;
  }>();

  constructor(private readonly prefix: string) {}

  increment(metric: string): void {
    const key = `${this.prefix}.${metric}`;
    const current = MetricsCollector.metrics.get(key) || {
      count: 0,
      totalTime: 0,
      maxTime: 0,
      minTime: Infinity
    };
    current.count++;
    MetricsCollector.metrics.set(key, current);
  }

  recordTime(metric: string, time: number): void {
    const key = `${this.prefix}.${metric}`;
    const current = MetricsCollector.metrics.get(key) || {
      count: 0,
      totalTime: 0,
      maxTime: 0,
      minTime: Infinity
    };
    current.count++;
    current.totalTime += time;
    current.maxTime = Math.max(current.maxTime, time);
    current.minTime = Math.min(current.minTime, time);
    MetricsCollector.metrics.set(key, current);
  }

  recordQueryTime(time: number): void {
    this.recordTime('query_time', time);
  }

  recordProcessingTime(time: number): void {
    this.recordTime('processing_time', time);
  }

  static getMetrics(): Record<string, any> {
    const result: Record<string, any> = {};
    for (const [key, value] of this.metrics.entries()) {
      result[key] = {
        count: value.count,
        avgTime: value.count > 0 ? value.totalTime / value.count : 0,
        maxTime: value.maxTime,
        minTime: value.minTime === Infinity ? 0 : value.minTime
      };
    }
    return result;
  }

  static async report(): Promise<void> {
    const metrics = this.getMetrics();
    this.logger.log('Metrics Report:');
    for (const [key, value] of Object.entries(metrics)) {
      this.logger.log(`${key}: ${JSON.stringify(value)}`);
    }
  }
} 