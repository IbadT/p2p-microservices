import { Injectable, Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { BaseGrpcClient } from '../base/base.grpc.client';
import { P2P_SERVICE } from '../constants';
import { CreateExchangeOfferDto, RespondExchangeOfferDto } from '../interfaces/client.swagger';
import { 
  ExchangeOffer,
  P2PService as IP2PService,
  ConfirmPaymentRequest,
  ConfirmPaymentResponse,
  ConfirmReceiptRequest,
  ConfirmReceiptResponse,
  OpenDisputeRequest,
  OpenDisputeResponse,
  TransactionStatusRequest,
  TransactionStatusResponse,
  SetExchangerStatusRequest,
  SetExchangerStatusResponse,
  CancelTransactionRequest,
  CancelTransactionResponse,
  ResolveDisputeRequest,
  ResolveDisputeResponse,
  FreezeExchangerRequest,
  FreezeExchangerResponse
} from '../interfaces/grpc.interfaces';

@Injectable()
export class P2PGrpcClient extends BaseGrpcClient {
  constructor(
    @Inject(P2P_SERVICE) client: ClientGrpc,
  ) {
    super(client, 'P2PExchangeService');
  }

  /**
   * Создает новое предложение обмена
   * @param dto - Данные для создания предложения
   * @returns {Promise<ExchangeOffer>} Созданное предложение
   */
  async createExchangeOffer(dto: CreateExchangeOfferDto): Promise<ExchangeOffer> {
    const service = this.getService<IP2PService>('P2PExchangeService');
    return this.callGrpcMethod(service.createExchangeOffer, dto);
  }

  /**
   * Отвечает на предложение обмена
   * @param dto - Данные для ответа на предложение
   * @returns {Promise<ExchangeOffer>} Обновленное предложение
   */
  async respondExchangeOffer(dto: RespondExchangeOfferDto): Promise<ExchangeOffer> {
    const service = this.getService<IP2PService>('P2PExchangeService');
    return this.callGrpcMethod(service.respondExchangeOffer, dto);
  }

  /**
   * Подтверждает платеж
   * @param request - Данные для подтверждения платежа
   * @returns {Promise<ConfirmPaymentResponse>} Результат подтверждения
   */
  async confirmPayment(request: ConfirmPaymentRequest): Promise<ConfirmPaymentResponse> {
    const service = this.getService<IP2PService>('P2PExchangeService');
    return this.callGrpcMethod(service.confirmPayment, request);
  }

  /**
   * Подтверждает получение
   * @param request - Данные для подтверждения получения
   * @returns {Promise<ConfirmReceiptResponse>} Результат подтверждения
   */
  async confirmReceipt(request: ConfirmReceiptRequest): Promise<ConfirmReceiptResponse> {
    const service = this.getService<IP2PService>('P2PExchangeService');
    return this.callGrpcMethod(service.confirmReceipt, request);
  }

  /**
   * Открывает спор
   * @param request - Данные для открытия спора
   * @returns {Promise<OpenDisputeResponse>} Результат открытия спора
   */
  async openDispute(request: OpenDisputeRequest): Promise<OpenDisputeResponse> {
    const service = this.getService<IP2PService>('P2PExchangeService');
    return this.callGrpcMethod(service.openDispute, request);
  }

  /**
   * Получает статус транзакции
   * @param request - Данные для получения статуса
   * @returns {Promise<TransactionStatusResponse>} Статус транзакции
   */
  async getTransactionStatus(request: TransactionStatusRequest): Promise<TransactionStatusResponse> {
    const service = this.getService<IP2PService>('P2PExchangeService');
    return this.callGrpcMethod(service.getTransactionStatus, request);
  }

  /**
   * Устанавливает статус обменника
   * @param request - Данные для установки статуса
   * @returns {Promise<SetExchangerStatusResponse>} Результат установки статуса
   */
  async setExchangerStatus(request: SetExchangerStatusRequest): Promise<SetExchangerStatusResponse> {
    const service = this.getService<IP2PService>('P2PExchangeService');
    return this.callGrpcMethod(service.setExchangerStatus, request);
  }

  /**
   * Отменяет транзакцию
   * @param request - Данные для отмены транзакции
   * @returns {Promise<CancelTransactionResponse>} Результат отмены
   */
  async cancelTransaction(request: CancelTransactionRequest): Promise<CancelTransactionResponse> {
    const service = this.getService<IP2PService>('P2PExchangeService');
    return this.callGrpcMethod(service.cancelTransaction, request);
  }

  /**
   * Разрешает спор
   * @param request - Данные для разрешения спора
   * @returns {Promise<ResolveDisputeResponse>} Результат разрешения
   */
  async resolveDispute(request: ResolveDisputeRequest): Promise<ResolveDisputeResponse> {
    const service = this.getService<IP2PService>('P2PExchangeService');
    return this.callGrpcMethod(service.resolveDispute, request);
  }

  /**
   * Замораживает обменника
   * @param request - Данные для заморозки
   * @returns {Promise<FreezeExchangerResponse>} Результат заморозки
   */
  async freezeExchanger(request: FreezeExchangerRequest): Promise<FreezeExchangerResponse> {
    const service = this.getService<IP2PService>('P2PExchangeService');
    return this.callGrpcMethod(service.freezeExchanger, request);
  }

  /**
   * Получает предложение по ID
   * @param id - ID предложения
   * @returns {Promise<ExchangeOffer>} Предложение
   */
  async getOffer(id: string): Promise<ExchangeOffer> {
    const service = this.getService<IP2PService>('P2PExchangeService');
    const status = await this.callGrpcMethod(service.getTransactionStatus, { offerId: id });
    return {
      id: status.offerId,
      customerId: '',
      listingId: '',
      amount: 0,
      exchangeType: '',
      conditions: '',
      status: status.status
    };
  }
} 