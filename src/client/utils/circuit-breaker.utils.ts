import { Logger } from '@nestjs/common';

export class CircuitBreaker {
  private failures = 0;
  private lastFailureTime = 0;
  private state: 'CLOSED' | 'OPEN' | 'HALF_OPEN' = 'CLOSED';

  constructor(
    private readonly options: {
      failureThreshold: number;
      resetTimeout: number;
      timeout: number;
    },
    private readonly logger = new Logger(CircuitBreaker.name),
  ) {}

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailureTime >= this.options.resetTimeout) {
        this.state = 'HALF_OPEN';
      } else {
        throw new Error('Circuit breaker is open');
      }
    }

    try {
      const result = await Promise.race([
        fn(),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Operation timed out')), this.options.timeout),
        ),
      ]);

      if (this.state === 'HALF_OPEN') {
        this.state = 'CLOSED';
        this.failures = 0;
      }

      return result as T;
    } catch (error) {
      this.failures++;
      this.lastFailureTime = Date.now();

      if (this.failures >= this.options.failureThreshold) {
        this.state = 'OPEN';
        this.logger.error(
          `Circuit breaker opened after ${this.failures} failures: ${error.message}`,
          error.stack,
        );
      }

      throw error;
    }
  }

  getState(): string {
    return this.state;
  }

  reset(): void {
    this.state = 'CLOSED';
    this.failures = 0;
    this.lastFailureTime = 0;
  }
} 