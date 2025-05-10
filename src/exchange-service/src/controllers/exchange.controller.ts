import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ExchangeService } from '../services/exchange.service';
import {
  CreateListingRequest,
  GetListingsRequest,
  CreateOfferRequest,
  RespondOfferRequest,
  UpdateTransactionStatusRequest,
  GetActiveExchangesRequest,
  ConfirmPaymentRequest,
  ConfirmReceiptRequest,
  CancelTransactionRequest,
  SetExchangerStatusRequest,
  FreezeExchangerRequest,
  ExchangeListing,
  GetListingsResponse,
  ExchangeOffer,
  RespondOfferResponse,
  ExchangeTransaction,
  GetActiveExchangesResponse,
  ConfirmPaymentResponse,
  ConfirmReceiptResponse,
  CancelTransactionResponse,
  SetExchangerStatusResponse,
  FreezeExchangerResponse
} from '../../../proto/generated/exchange.pb';

@Controller()
export class ExchangeController {
  constructor(private readonly exchangeService: ExchangeService) {}

  @GrpcMethod('ExchangeService', 'CreateListing')
  async createListing(data: CreateListingRequest): Promise<ExchangeListing> {
    return this.exchangeService.createListing(data);
  }

  @GrpcMethod('ExchangeService', 'GetListings')
  async getListings(data: GetListingsRequest): Promise<GetListingsResponse> {
    return this.exchangeService.getListings(data);
  }

  @GrpcMethod('ExchangeService', 'CreateOffer')
  async createOffer(data: CreateOfferRequest): Promise<ExchangeOffer> {
    return this.exchangeService.createOffer(data);
  }

  @GrpcMethod('ExchangeService', 'RespondOffer')
  async respondOffer(data: RespondOfferRequest): Promise<RespondOfferResponse> {
    return this.exchangeService.respondOffer(data);
  }

  @GrpcMethod('ExchangeService', 'UpdateTransactionStatus')
  async updateTransactionStatus(data: UpdateTransactionStatusRequest): Promise<ExchangeTransaction> {
    return this.exchangeService.updateTransactionStatus(data);
  }

  @GrpcMethod('ExchangeService', 'GetActiveExchanges')
  async getActiveExchanges(data: GetActiveExchangesRequest): Promise<GetActiveExchangesResponse> {
    return this.exchangeService.getActiveExchanges(data.userId);
  }

  @GrpcMethod('ExchangeService', 'ConfirmPayment')
  async confirmPayment(data: ConfirmPaymentRequest): Promise<ConfirmPaymentResponse> {
    return this.exchangeService.confirmPayment(data);
  }

  @GrpcMethod('ExchangeService', 'ConfirmReceipt')
  async confirmReceipt(data: ConfirmReceiptRequest): Promise<ConfirmReceiptResponse> {
    return this.exchangeService.confirmReceipt(data);
  }

  @GrpcMethod('ExchangeService', 'CancelTransaction')
  async cancelTransaction(data: CancelTransactionRequest): Promise<CancelTransactionResponse> {
    return this.exchangeService.cancelTransaction(data);
  }

  @GrpcMethod('ExchangeService', 'SetExchangerStatus')
  async setExchangerStatus(data: SetExchangerStatusRequest): Promise<SetExchangerStatusResponse> {
    return this.exchangeService.setExchangerStatus(data);
  }

  @GrpcMethod('ExchangeService', 'FreezeExchanger')
  async freezeExchanger(data: FreezeExchangerRequest): Promise<FreezeExchangerResponse> {
    return this.exchangeService.freezeExchanger(data);
  }

  @GrpcMethod('ExchangeService', 'GetExchangerStatus')
  async getExchangerStatus(data: { exchangerId: string }) {
    return this.exchangeService.getExchangerStatus(data.exchangerId);
  }

  @GrpcMethod('ExchangeService', 'UnfreezeExchanger')
  async unfreezeExchanger(data: { exchangerId: string }) {
    return this.exchangeService.unfreezeExchanger(data.exchangerId);
  }

  @GrpcMethod('ExchangeService', 'UpdateMissedOffers')
  async updateMissedOffers(data: { exchangerId: string; increment: boolean }) {
    return this.exchangeService.updateMissedOffers(data.exchangerId, data.increment);
  }

  @GrpcMethod('ExchangeService', 'CreateDispute')
  async createDispute(data: { 
    transactionId: string; 
    initiatorId: string; 
    reason: string;
    initiatorRole: 'CUSTOMER' | 'EXCHANGER';
  }) {
    return this.exchangeService.createDispute(data);
  }

  @GrpcMethod('ExchangeService', 'CreateReview')
  async createReview(data: {
    transactionId: string;
    authorId: string;
    rating: number;
    comment?: string;
  }) {
    return this.exchangeService.createReview(data);
  }
} 