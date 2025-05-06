import { Injectable, Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { BaseGrpcClient } from '../base/base.grpc.client';
import { FILTERS_SERVICE } from '../constants';
import { CreateFilterDto, UpdateFilterDto } from '../interfaces/client.swagger';

@Injectable()
export class FiltersGrpcClient extends BaseGrpcClient {
  constructor(
    @Inject(FILTERS_SERVICE) client: ClientGrpc,
  ) {
    super(client, 'FiltersService');
  }

  /**
   * Создает новый фильтр
   * @param dto - Данные для создания фильтра
   * @returns {Promise<Filter>} Созданный фильтр
   */
  async createFilter(dto: CreateFilterDto) {
    const service = this.getService<any>('FiltersService');
    return this.callGrpcMethod(service.createFilter, dto);
  }

  /**
   * Обновляет фильтр
   * @param dto - Данные для обновления
   * @returns {Promise<Filter>} Обновленный фильтр
   */
  async updateFilter(dto: UpdateFilterDto) {
    const service = this.getService<any>('FiltersService');
    return this.callGrpcMethod(service.updateFilter, dto);
  }

  /**
   * Получает фильтр по ID
   * @param filterId - ID фильтра
   * @returns {Promise<Filter>} Фильтр
   */
  async getFilter(filterId: string) {
    const service = this.getService<any>('FiltersService');
    return this.callGrpcMethod(service.getFilter, { filterId });
  }

  /**
   * Получает список фильтров пользователя
   * @param userId - ID пользователя
   * @returns {Promise<Filter[]>} Список фильтров
   */
  async getUserFilters(userId: string) {
    const service = this.getService<any>('FiltersService');
    return this.callGrpcMethod(service.getUserFilters, { userId });
  }

  /**
   * Удаляет фильтр
   * @param filterId - ID фильтра
   * @param userId - ID пользователя
   * @returns {Promise<void>}
   */
  async deleteFilter(filterId: string, userId: string) {
    const service = this.getService<any>('FiltersService');
    return this.callGrpcMethod(service.deleteFilter, { filterId, userId });
  }
} 