import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { Logger } from '@nestjs/common';

/**
 * Базовый класс для gRPC клиентов
 * Предоставляет общую функциональность для работы с gRPC сервисами
 */
export class BaseGrpcClient {
  private readonly logger = new Logger(BaseGrpcClient.name);
  private readonly client: ClientGrpc;
  private readonly serviceName: string;

  /**
   * Создает экземпляр BaseGrpcClient
   * @param client - gRPC клиент для взаимодействия с сервисом
   * @param serviceName - Имя сервиса для взаимодействия
   */
  constructor(client: ClientGrpc, serviceName: string) {
    this.client = client;
    this.serviceName = serviceName;
  }

  /**
   * Получает сервис по имени
   * @param serviceName - Имя сервиса
   * @returns {T} Сервис
   */
  protected getService<T extends object>(serviceName: string): T {
    return this.client.getService<T>(serviceName);
  }

  /**
   * Вызывает gRPC метод
   * @param method - Метод для вызова
   * @param data - Данные для передачи
   * @returns {Promise<T>} Результат вызова
   */
  protected async callGrpcMethod<T>(method: Function, data?: any): Promise<T> {
    try {
      const result = await firstValueFrom(method.call(this, data)) as T;
      return result;
    } catch (error) {
      this.logger.error(`Error calling gRPC method in ${this.serviceName}:`, error);
      throw error;
    }
  }
} 