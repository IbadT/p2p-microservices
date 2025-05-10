import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { OffersService } from './offers.service';
import { CreateOfferRequest, UpdateTransactionStatusRequest } from '../proto/generated/exchange.pb';
import { Offer } from '../client/interfaces/grpc.interfaces';
import { TransactionStatus } from '@prisma/client';

@Controller()
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @GrpcMethod('ExchangeService', 'CreateOffer')
  async createOffer(data: CreateOfferRequest): Promise<Offer> {
    const result = await this.offersService.createOffer(data.userId, {
      listingId: data.listingId,
      amount: data.amount,
    });
    
    const offerWithDetails = await this.offersService.findOne(result.id);
    if (!offerWithDetails || !offerWithDetails.listing || !offerWithDetails.transaction) {
      throw new Error('Offer details not found');
    }
    
    return {
      id: result.id,
      fromUserId: result.userId,
      toUserId: result.listingId,
      amount: result.amount,
      currency: offerWithDetails.listing.type,
      status: result.status as 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELLED',
      createdAt: result.createdAt.toISOString(),
      updatedAt: result.updatedAt.toISOString(),
      dealType: offerWithDetails.listing.type,
      holdCreated: offerWithDetails.listing.type === 'CRYPTO_TO_FIAT',
      cryptocurrency: offerWithDetails.listing.cryptocurrency,
      fiatCurrency: offerWithDetails.listing.fiatCurrency,
      cryptoAmount: offerWithDetails.transaction.cryptoAmount,
      fiatAmount: offerWithDetails.transaction.fiatAmount
    };
  }

  @GrpcMethod('ExchangeService', 'AcceptOffer')
  async acceptOffer(data: { id: string }): Promise<Offer> {
    const result = await this.offersService.acceptOffer(data.id);
    if (!result || !result.transaction || !result.listing) {
      throw new Error('Offer or related data not found');
    }

    return {
      id: result.id,
      fromUserId: result.userId,
      toUserId: result.listing.userId,
      amount: result.amount,
      currency: result.listing.type,
      status: result.status as 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELLED',
      createdAt: result.createdAt.toISOString(),
      updatedAt: result.updatedAt.toISOString(),
      dealType: result.listing.type,
      holdCreated: result.listing.type === 'CRYPTO_TO_FIAT',
      cryptocurrency: result.listing.cryptocurrency,
      fiatCurrency: result.listing.fiatCurrency,
      cryptoAmount: result.transaction.cryptoAmount,
      fiatAmount: result.transaction.fiatAmount
    };
  }

  @GrpcMethod('ExchangeService', 'RejectOffer')
  async rejectOffer(data: { id: string }): Promise<Offer> {
    const result = await this.offersService.rejectOffer(data.id);
    if (!result) {
      throw new Error('Offer not found');
    }

    return {
      id: result.id,
      fromUserId: result.userId,
      toUserId: result.listingId,
      amount: result.amount,
      currency: 'CRYPTO_TO_FIAT',
      status: result.status as 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELLED',
      createdAt: result.createdAt.toISOString(),
      updatedAt: result.updatedAt.toISOString()
    };
  }

  @GrpcMethod('ExchangeService', 'UpdateOfferStatus')
  async updateOfferStatus(data: UpdateTransactionStatusRequest): Promise<Offer> {
    const result = await this.offersService.updateTransaction(
      data.transactionId, 
      data.status as unknown as TransactionStatus
    );
    if (!result) {
      throw new Error('Offer not found');
    }

    return {
      id: result.offer?.id || '',
      fromUserId: result.customerId,
      toUserId: result.exchangerId,
      amount: result.cryptoAmount,
      currency: result.type === 'CRYPTO_TO_FIAT' ? 'CRYPTO_TO_FIAT' : 'FIAT_TO_CRYPTO',
      status: result.status as 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELLED',
      createdAt: result.createdAt.toISOString(),
      updatedAt: result.updatedAt.toISOString(),
      dealType: result.type === 'CRYPTO_TO_FIAT' ? 'CRYPTO_TO_FIAT' : 'FIAT_TO_CRYPTO'
    };
  }

  @GrpcMethod('ExchangeService', 'GetOffer')
  async getOffer(data: { id: string }): Promise<Offer> {
    const result = await this.offersService.findOne(data.id);
    if (!result) {
      throw new Error('Offer not found');
    }

    return {
      id: result.id,
      fromUserId: result.userId,
      toUserId: result.listingId,
      amount: result.amount,
      currency: 'CRYPTO_TO_FIAT',
      status: result.status as 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELLED',
      createdAt: result.createdAt.toISOString(),
      updatedAt: result.updatedAt.toISOString()
    };
  }

  @GrpcMethod('ExchangeService', 'ListOffers')
  async listOffers(data: { userId?: string }): Promise<Offer[]> {
    const results = await this.offersService.listOffers();
    return results.map(result => ({
      id: result.id,
      fromUserId: result.userId,
      toUserId: result.listingId,
      amount: result.amount,
      currency: 'CRYPTO_TO_FIAT',
      status: result.status as 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELLED',
      createdAt: result.createdAt.toISOString(),
      updatedAt: result.updatedAt.toISOString()
    }));
  }
}