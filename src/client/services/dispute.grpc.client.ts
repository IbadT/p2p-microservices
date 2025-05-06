import { Injectable, Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { BaseGrpcClient } from '../base/base.grpc.client';
import { DISPUTE_SERVICE } from '../constants';
import { CreateDisputeDto, ResolveDisputeDto } from '../interfaces/client.swagger';

@Injectable()
export class DisputeGrpcClient extends BaseGrpcClient {
  constructor(
    @Inject(DISPUTE_SERVICE) client: ClientGrpc,
  ) {
    super(client, 'DisputeService');
  }

  /**
   * Создает новый спор
   * @param dto - Данные для создания спора
   * @returns {Promise<Dispute>} Созданный спор
   */
  async createDispute(dto: CreateDisputeDto) {
    const service = this.getService<any>('DisputeService');
    return this.callGrpcMethod(service.createDispute, dto);
  }

  /**
   * Разрешает спор
   * @param dto - Данные для разрешения спора
   * @returns {Promise<Dispute>} Разрешенный спор
   */
  async resolveDispute(dto: ResolveDisputeDto) {
    const service = this.getService<any>('DisputeService');
    return this.callGrpcMethod(service.resolveDispute, dto);
  }

  /**
   * Получает спор по ID
   * @param disputeId - ID спора
   * @returns {Promise<Dispute>} Спор
   */
  async getDispute(disputeId: string) {
    const service = this.getService<any>('DisputeService');
    return this.callGrpcMethod(service.getDispute, { disputeId });
  }

  /**
   * Получает список споров пользователя
   * @param userId - ID пользователя
   * @returns {Promise<Dispute[]>} Список споров
   */
  async getUserDisputes(userId: string) {
    const service = this.getService<any>('DisputeService');
    return this.callGrpcMethod(service.getUserDisputes, { userId });
  }

  /**
   * Добавляет комментарий к спору
   * @param disputeId - ID спора
   * @param userId - ID пользователя
   * @param text - Текст комментария
   * @returns {Promise<DisputeComment>} Созданный комментарий
   */
  async addComment(disputeId: string, userId: string, text: string) {
    const service = this.getService<any>('DisputeService');
    return this.callGrpcMethod(service.addComment, {
      disputeId,
      userId,
      text,
    });
  }
} 