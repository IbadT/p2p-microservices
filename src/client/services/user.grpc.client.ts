import { Injectable, Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { BaseGrpcClient } from '../base/base.grpc.client';
import { USER_SERVICE } from '../constants';
import { CreateUserDto, UpdateUserDto } from '../interfaces/client.swagger';

@Injectable()
export class UserGrpcClient extends BaseGrpcClient {
  constructor(
    @Inject(USER_SERVICE) client: ClientGrpc,
  ) {
    super(client, 'UserService');
  }

  /**
   * Создает нового пользователя
   * @param dto - Данные для создания пользователя
   * @returns {Promise<User>} Созданный пользователь
   */
  async createUser(dto: CreateUserDto) {
    const service = this.getService<any>('UserService');
    return this.callGrpcMethod(service.createUser, dto);
  }

  /**
   * Обновляет пользователя
   * @param dto - Данные для обновления
   * @returns {Promise<User>} Обновленный пользователь
   */
  async updateUser(dto: UpdateUserDto) {
    const service = this.getService<any>('UserService');
    return this.callGrpcMethod(service.updateUser, dto);
  }

  /**
   * Получает пользователя по ID
   * @param userId - ID пользователя
   * @returns {Promise<User>} Пользователь
   */
  async getUser(userId: string) {
    const service = this.getService<any>('UserService');
    return this.callGrpcMethod(service.getUser, { userId });
  }

  /**
   * Получает пользователя по email
   * @param email - Email пользователя
   * @returns {Promise<User>} Пользователь
   */
  async getUserByEmail(email: string) {
    const service = this.getService<any>('UserService');
    return this.callGrpcMethod(service.getUserByEmail, { email });
  }

  /**
   * Получает список пользователей
   * @param query - Параметры фильтрации
   * @returns {Promise<User[]>} Список пользователей
   */
  async getUsers(query: { role?: string; isExchangerActive?: boolean }) {
    const service = this.getService<any>('UserService');
    return this.callGrpcMethod(service.getUsers, query);
  }

  /**
   * Активирует обменника
   * @param userId - ID пользователя
   * @returns {Promise<User>} Обновленный пользователь
   */
  async activateExchanger(userId: string) {
    const service = this.getService<any>('UserService');
    return this.callGrpcMethod(service.activateExchanger, { userId });
  }

  /**
   * Деактивирует обменника
   * @param userId - ID пользователя
   * @returns {Promise<User>} Обновленный пользователь
   */
  async deactivateExchanger(userId: string) {
    const service = this.getService<any>('UserService');
    return this.callGrpcMethod(service.deactivateExchanger, { userId });
  }

  /**
   * Замораживает пользователя
   * @param userId - ID пользователя
   * @param reason - Причина заморозки
   * @returns {Promise<User>} Обновленный пользователь
   */
  async freezeUser(userId: string, reason: string) {
    const service = this.getService<any>('UserService');
    return this.callGrpcMethod(service.freezeUser, { userId, reason });
  }

  /**
   * Размораживает пользователя
   * @param userId - ID пользователя
   * @returns {Promise<User>} Обновленный пользователь
   */
  async unfreezeUser(userId: string) {
    const service = this.getService<any>('UserService');
    return this.callGrpcMethod(service.unfreezeUser, { userId });
  }
} 