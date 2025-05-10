import { Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc, Client } from '@nestjs/microservices';
import { join } from 'path';
import { Observable } from 'rxjs';
import {
  ExchangeListing,
  ExchangeOffer,
  ExchangeTransaction,
  CreateListingRequest,
  GetListingsRequest,
  CreateOfferRequest,
  RespondOfferRequest,
  UpdateTransactionStatusRequest,
  CreateDisputeRequest,
  CreateReviewRequest,
  SetExchangerStatusRequest,
  ExchangerStatus
} from '../interfaces/exchange.interface';
import { Transport } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

interface ExchangeService {
  createListing(request: CreateListingRequest): Observable<ExchangeListing>;
  getListings(request: GetListingsRequest): Observable<{ listings: ExchangeListing[] }>;
  createOffer(request: CreateOfferRequest): Observable<ExchangeOffer>;
  respondOffer(request: RespondOfferRequest): Observable<{ offerId: string; status: string; message: string }>;
  updateTransactionStatus(request: UpdateTransactionStatusRequest): Observable<ExchangeTransaction>;
  getActiveExchanges(userId: string): Observable<{ transactions: ExchangeTransaction[] }>;
  createDispute(request: CreateDisputeRequest): Observable<any>;
  createReview(request: CreateReviewRequest): Observable<any>;
  setExchangerStatus(request: SetExchangerStatusRequest): Observable<{ exchangerId: string; online: boolean; message: string }>;
  GetExchangerStatus(request: { exchangerId: string }): Observable<ExchangerStatus>;
  UpdateMissedOffers(request: { exchangerId: string; increment: boolean }): Observable<ExchangerStatus>;
  UnfreezeExchanger(request: { exchangerId: string }): Observable<ExchangerStatus>;
  FreezeExchanger(request: { exchangerId: string; reason: string }): Observable<ExchangerStatus>;
}

@Injectable()
export class ExchangeClientService implements OnModuleInit {
  private exchangeService: ExchangeService;

  @Client({
    transport: Transport.GRPC,
    options: {
      package: 'exchange',
      protoPath: join(__dirname, '../../../proto/exchange.proto'),
      url: process.env.EXCHANGE_SERVICE_URL || 'localhost:5000',
    },
  })
  private client: ClientGrpc;

  onModuleInit() {
    this.exchangeService = this.client.getService<ExchangeService>('ExchangeService');
  }

  createListing(data: CreateListingRequest): Observable<ExchangeListing> {
    return this.exchangeService.createListing(data);
  }

  getListings(data: GetListingsRequest): Observable<{ listings: ExchangeListing[] }> {
    return this.exchangeService.getListings(data);
  }

  createOffer(data: CreateOfferRequest): Observable<ExchangeOffer> {
    return this.exchangeService.createOffer(data);
  }

  respondOffer(data: RespondOfferRequest): Observable<{ offerId: string; status: string; message: string }> {
    return this.exchangeService.respondOffer(data);
  }

  updateTransactionStatus(data: UpdateTransactionStatusRequest): Observable<ExchangeTransaction> {
    return this.exchangeService.updateTransactionStatus(data);
  }

  getActiveExchanges(userId: string): Observable<{ transactions: ExchangeTransaction[] }> {
    return this.exchangeService.getActiveExchanges(userId);
  }

  createDispute(data: CreateDisputeRequest): Observable<any> {
    return this.exchangeService.createDispute(data);
  }

  createReview(data: CreateReviewRequest): Observable<any> {
    return this.exchangeService.createReview(data);
  }

  setExchangerStatus(data: SetExchangerStatusRequest): Observable<{ exchangerId: string; online: boolean; message: string }> {
    return this.exchangeService.setExchangerStatus(data);
  }

  async getExchangerStatus(exchangerId: string): Promise<ExchangerStatus> {
    return firstValueFrom(this.exchangeService.GetExchangerStatus({ exchangerId }));
  }

  async updateMissedOffers(exchangerId: string, increment: boolean): Promise<ExchangerStatus> {
    return firstValueFrom(this.exchangeService.UpdateMissedOffers({ exchangerId, increment }));
  }

  async unfreezeExchanger(exchangerId: string): Promise<ExchangerStatus> {
    return firstValueFrom(this.exchangeService.UnfreezeExchanger({ exchangerId }));
  }

  async freezeExchanger(data: { exchangerId: string; reason: string }): Promise<ExchangerStatus> {
    return firstValueFrom(this.exchangeService.FreezeExchanger(data));
  }
} 