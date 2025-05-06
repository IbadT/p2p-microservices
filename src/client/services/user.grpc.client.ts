import { Injectable, Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { BaseGrpcClient } from '../base/base.grpc.client';
import { USER_SERVICE } from '../constants';
import { CreateUserDto, UpdateUserDto } from '../interfaces/client.swagger';
import { Observable, from } from 'rxjs';
import { UserService, User } from '../interfaces/grpc.interfaces';

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
  createUser(dto: CreateUserDto): Observable<User> {
    const service = this.getService<UserService>('UserService');
    return from(this.callGrpcMethod(service.createUser, dto));
  }

  /**
   * Обновляет пользователя
   * @param dto - Данные для обновления
   * @returns {Promise<User>} Обновленный пользователь
   */
  updateUser(data: UpdateUserDto): Observable<User> {
    const service = this.getService<UserService>('UserService');
    return from(this.callGrpcMethod(service.updateUser, data));
  }

  /**
   * Получает пользователя по ID
   * @param id - ID пользователя
   * @returns {Promise<User>} Пользователь
   */
  getUser(id: string): Observable<User> {
    const service = this.getService<UserService>('UserService');
    return from(this.callGrpcMethod(service.getUser, { id }));
  }

  /**
   * Получает пользователя по email
   * @param email - Email пользователя
   * @returns {Promise<User>} Пользователь
   */
  getUserByEmail(email: string): Observable<User> {
    const service = this.getService<UserService>('UserService');
    return from(this.callGrpcMethod(service.getUserByEmail, { email }));
  }

  /**
   * Получает список пользователей
   * @param query - Параметры фильтрации
   * @returns {Promise<User[]>} Список пользователей
   */
  getUsers(query: { role?: string; isExchangerActive?: boolean }): Observable<User[]> {
    const service = this.getService<UserService>('UserService');
    return from(this.callGrpcMethod(service.getUsers, query));
  }

  /**
   * Активирует обменника
   * @param id - ID пользователя
   * @returns {Promise<User>} Обновленный пользователь
   */
  activateExchanger(id: string): Observable<User> {
    const service = this.getService<UserService>('UserService');
    return from(this.callGrpcMethod(service.activateExchanger, { id }));
  }

  /**
   * Деактивирует обменника
   * @param id - ID пользователя
   * @returns {Promise<User>} Обновленный пользователь
   */
  deactivateExchanger(id: string): Observable<User> {
    const service = this.getService<UserService>('UserService');
    return from(this.callGrpcMethod(service.deactivateExchanger, { id }));
  }

  /**
   * Замораживает пользователя
   * @param id - ID пользователя
   * @param reason - Причина заморозки
   * @returns {Promise<User>} Обновленный пользователь
   */
  freezeUser(id: string, reason: string): Observable<User> {
    const service = this.getService<UserService>('UserService');
    return from(this.callGrpcMethod(service.freezeUser, { id, reason }));
  }

  /**
   * Размораживает пользователя
   * @param data - ID пользователя
   * @returns {Promise<void>}
   */
  unfreeze(data: { id: string }): Observable<void> {
    const service = this.getService<UserService>('UserService');
    return from(this.callGrpcMethod(service.unfreeze, data));
  }

  setOnline(data: { id: string; isOnline: boolean }): Observable<void> {
    const service = this.getService<UserService>('UserService');
    return from(this.callGrpcMethod(service.setOnline, data));
  }
} 