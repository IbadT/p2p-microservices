import { Injectable, Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { BaseGrpcClient } from '../base/base.grpc.client';
import { AUTH_SERVICE } from '../constants';
import { LoginDto, RegisterDto, RefreshTokenDto } from '../interfaces/client.swagger';

@Injectable()
export class AuthGrpcClient extends BaseGrpcClient {
  constructor(
    @Inject(AUTH_SERVICE) client: ClientGrpc,
  ) {
    super(client, 'AuthService');
  }

  /**
   * Регистрация нового пользователя
   * @param dto - Данные для регистрации
   * @returns {Promise<{ accessToken: string; refreshToken: string }>} Токены доступа
   */
  async register(dto: RegisterDto) {
    const service = this.getService<any>('AuthService');
    return this.callGrpcMethod(service.register, dto);
  }

  /**
   * Вход пользователя
   * @param dto - Данные для входа
   * @returns {Promise<{ accessToken: string; refreshToken: string }>} Токены доступа
   */
  async login(dto: LoginDto) {
    const service = this.getService<any>('AuthService');
    return this.callGrpcMethod(service.login, dto);
  }

  /**
   * Обновление токена доступа
   * @param dto - Данные для обновления токена
   * @returns {Promise<{ accessToken: string; refreshToken: string }>} Новые токены доступа
   */
  async refreshToken(dto: RefreshTokenDto) {
    const service = this.getService<any>('AuthService');
    return this.callGrpcMethod(service.refreshToken, dto);
  }

  /**
   * Выход пользователя
   * @param userId - ID пользователя
   * @returns {Promise<void>}
   */
  async logout(userId: string) {
    const service = this.getService<any>('AuthService');
    return this.callGrpcMethod(service.logout, { userId });
  }

  /**
   * Проверка токена доступа
   * @param token - Токен доступа
   * @returns {Promise<{ userId: string; role: string }>} Данные пользователя
   */
  async validateToken(token: string) {
    const service = this.getService<any>('AuthService');
    return this.callGrpcMethod(service.validateToken, { token });
  }
} 