import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { CircuitBreaker } from '../utils/circuit-breaker.utils';
import { GrpcError } from '../interfaces/grpc.interfaces';

@Injectable()
export abstract class BaseGrpcClient implements OnModuleDestroy {
  protected readonly logger = new Logger(this.constructor.name);
  protected readonly circuitBreaker = new CircuitBreaker({
    failureThreshold: 5,
    resetTimeout: 60000,
    timeout: 10000,
  });

  constructor(
    protected readonly client: ClientGrpc,
    protected readonly serviceName: string,
  ) {}

  onModuleDestroy() {
    this.logger.log(`Closing gRPC connection for ${this.serviceName}`);
    if (this.client['channel']) {
      this.client['channel'].close();
    }
  }

  protected getService<T extends object>(serviceName: string): T {
    return this.client.getService<T>(serviceName);
  }

  protected async callGrpcMethod<T>(
    method: (...args: any[]) => Promise<T>,
    params: any,
    retries = 3,
  ): Promise<T> {
    return this.circuitBreaker.execute(async () => {
      let lastError: GrpcError | undefined;
      
      for (let i = 0; i < retries; i++) {
        try {
          const result = await method(params);
          return result;
        } catch (error) {
          lastError = this.normalizeGrpcError(error);
          this.logger.warn(
            `gRPC call attempt ${i + 1} failed for ${this.serviceName}: ${lastError.message}`,
            lastError.stack,
          );
          
          if (this.shouldRetry(lastError) && i < retries - 1) {
            await this.delay(Math.pow(2, i) * 1000);
            continue;
          }
          break;
        }
      }
      
      throw lastError || new GrpcError('gRPC call failed with no error details', 'UNKNOWN');
    });
  }

  private normalizeGrpcError(error: any): GrpcError {
    if (error instanceof GrpcError) {
      return error;
    }
    
    return new GrpcError(
      error.details || error.message || 'Unknown gRPC error',
      error.code || 'UNKNOWN',
      error.metadata,
    );
  }

  private shouldRetry(error: GrpcError): boolean {
    const retryableCodes = ['UNAVAILABLE', 'DEADLINE_EXCEEDED', 'RESOURCE_EXHAUSTED'];
    return retryableCodes.includes(error.code);
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
} 