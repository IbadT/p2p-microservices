import { Injectable, Inject, OnModuleInit, Logger } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable, firstValueFrom } from 'rxjs';
import { GrpcMethod, GrpcService } from '../interfaces/grpc.interfaces';

/**
 * Базовый класс для gRPC клиентов
 * Предоставляет общую функциональность для работы с gRPC сервисами
 */
@Injectable()
export abstract class BaseGrpcClient implements OnModuleInit {
  protected readonly logger = new Logger(this.constructor.name);
  protected service: GrpcService;

  constructor(
    @Inject('GRPC_CLIENT') protected readonly client: ClientGrpc,
    protected readonly serviceName: string
  ) {}

  onModuleInit() {
    this.service = this.client.getService(this.serviceName);
  }

  /**
   * Получает сервис по имени
   * @param serviceName - Имя сервиса
   * @returns {T} Сервис
   */
  protected getService<T extends GrpcService>(serviceName: string): T {
    const service = this.client.getService<T>(serviceName);
    if (!service) {
      throw new Error(`Service ${serviceName} not found`);
    }
    return service;
  }

  /**
   * Вызывает gRPC метод
   * @param method - Метод для вызова
   * @param data - Данные для передачи
   * @returns {Promise<T>} Результат вызова
   */
  protected async callGrpcMethod<TResponse, TRequest = unknown>(
    method: GrpcMethod<TRequest, TResponse>,
    data?: TRequest
  ): Promise<TResponse> {
    try {
      // Если data не передано, передаем пустой объект
      const requestData = data ?? {} as TRequest;
      const result = await firstValueFrom(method(requestData)) as TResponse;
      return result;
    } catch (error) {
      this.logger.error(
        `Error calling gRPC method in ${this.serviceName}:`,
        error instanceof Error ? error.message : 'Unknown error',
        error instanceof Error ? error.stack : undefined
      );
      
      if (error instanceof Error) {
        throw new Error(`gRPC call failed: ${error.message}`);
      }
      throw new Error('gRPC call failed with unknown error');
    }
  }
} 