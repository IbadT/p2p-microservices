// import { Controller } from '@nestjs/common';
// import { GrpcMethod } from '@nestjs/microservices';
// import { ExchangeService } from '../services/exchange.service';
// import { Logger } from '@nestjs/common';
// import { GrpcError } from '../../../client/interfaces/grpc.interfaces';
// import {
//   CreateListingRequest,
//   GetListingsRequest,
//   CreateOfferRequest,
//   RespondOfferRequest,
//   UpdateTransactionStatusRequest,
//   GetActiveExchangesRequest,
//   ConfirmPaymentRequest,
//   ConfirmReceiptRequest,
//   CancelTransactionRequest,
//   SetExchangerStatusRequest,
//   FreezeExchangerRequest,
//   ExchangeListing,
//   GetListingsResponse,
//   ExchangeOffer,
//   RespondOfferResponse,
//   ExchangeTransaction,
//   GetActiveExchangesResponse,
//   ConfirmPaymentResponse,
//   ConfirmReceiptResponse,
//   CancelTransactionResponse,
//   SetExchangerStatusResponse,
//   FreezeExchangerResponse,
//   TransactionStatus,
//   ExchangeType,
//   RespondAction
// } from '../../../proto/generated/exchange.pb';
// import { Roles, UserRole } from '../decorators/roles.decorator';

// @Controller()
// export class ExchangeGrpcController {
//   private readonly logger = new Logger(ExchangeGrpcController.name);

//   constructor(private readonly exchangeService: ExchangeService) {}

//   @GrpcMethod('ExchangeService', 'CreateListing')
//   @Roles(UserRole.EXCHANGER)
//   async createListing(data: CreateListingRequest): Promise<ExchangeListing> {
//     try {
//       const user = await this.exchangeService.getUser(data.userId);
//       if (user.isFrozen) {
//         throw new GrpcError('Exchanger is frozen', 'PERMISSION_DENIED');
//       }
//       return await this.exchangeService.createListing(data);
//     } catch (error) {
//       this.logger.error(`Failed to create listing: ${error.message}`, error.stack);
//       throw new GrpcError(error.message, 'INTERNAL');
//     }
//   }

//   @GrpcMethod('ExchangeService', 'GetListings')
//   async getListings(data: GetListingsRequest): Promise<GetListingsResponse> {
//     try {
//       return await this.exchangeService.getListings(data);
//     } catch (error) {
//       this.logger.error(`Failed to get listings: ${error.message}`, error.stack);
//       throw new GrpcError(error.message, 'INTERNAL');
//     }
//   }

//   @GrpcMethod('ExchangeService', 'CreateOffer')
//   @Roles(UserRole.CUSTOMER)
//   async createOffer(data: CreateOfferRequest): Promise<ExchangeOffer> {
//     try {
//       const listing = await this.exchangeService.getListing(data.listingId);
//       if (listing.type === ExchangeType.CRYPTO_TO_FIAT) {
//         await this.exchangeService.freezeCustomerCrypto(data.userId, data.amount);
//       }
//       return await this.exchangeService.createOffer(data);
//     } catch (error) {
//       this.logger.error(`Failed to create offer: ${error.message}`, error.stack);
//       throw new GrpcError(error.message, 'INTERNAL');
//     }
//   }

//   @GrpcMethod('ExchangeService', 'RespondOffer')
//   async respondOffer(data: RespondOfferRequest): Promise<RespondOfferResponse> {
//     try {
//       const offer = await this.exchangeService.getOffer(data.offerId);
//       const listing = await this.exchangeService.getListing(offer.listingId);
      
//       if (data.action === RespondAction.DECLINE) {
//         if (listing.type === ExchangeType.CRYPTO_TO_FIAT) {
//           await this.exchangeService.unfreezeCustomerCrypto(data.exchangerId, offer.amount);
//         }
//         await this.exchangeService.incrementMissedOffers(data.exchangerId);
//       } else {
//         await this.exchangeService.resetMissedOffers(data.exchangerId);
//       }
      
//       return await this.exchangeService.respondOffer(data);
//     } catch (error) {
//       this.logger.error(`Failed to respond to offer: ${error.message}`, error.stack);
//       throw new GrpcError(error.message, 'INTERNAL');
//     }
//   }

//   @GrpcMethod('ExchangeService', 'UpdateTransactionStatus')
//   @Roles(UserRole.CUSTOMER, UserRole.EXCHANGER)
//   async updateTransactionStatus(data: UpdateTransactionStatusRequest): Promise<ExchangeTransaction> {
//     try {
//       const transaction = await this.exchangeService.updateTransactionStatus(data);
      
//       if ([TransactionStatus.FINISHED, TransactionStatus.CANCELLED, TransactionStatus.DECLINED].includes(transaction.status)) {
//         const cutoffDate = new Date();
//         cutoffDate.setHours(cutoffDate.getHours() - 24);
//         if (new Date(transaction.updatedAt) < cutoffDate) {
//           await this.exchangeService.archiveTransaction(transaction.id);
//         }
//       }

//       return transaction;
//     } catch (error) {
//       this.logger.error(`Failed to update transaction status: ${error.message}`, error.stack);
//       throw new GrpcError(error.message, 'INTERNAL');
//     }
//   }

//   @GrpcMethod('ExchangeService', 'GetActiveExchanges')
//   @Roles(UserRole.CUSTOMER, UserRole.EXCHANGER)
//   async getActiveExchanges(data: GetActiveExchangesRequest): Promise<GetActiveExchangesResponse> {
//     try {
//       return await this.exchangeService.getActiveExchanges(data.userId);
//     } catch (error) {
//       this.logger.error(`Failed to get active exchanges: ${error.message}`, error.stack);
//       throw new GrpcError(error.message, 'INTERNAL');
//     }
//   }

//   @GrpcMethod('ExchangeService', 'ConfirmPayment')
//   @Roles(UserRole.EXCHANGER)
//   async confirmPayment(data: ConfirmPaymentRequest): Promise<ConfirmPaymentResponse> {
//     try {
//       const transaction = await this.exchangeService.getTransaction(data.transactionId);
//       if (transaction.type === ExchangeType.FIAT_TO_CRYPTO) {
//         await this.exchangeService.freezeExchangerCrypto(data.exchangerId, transaction.cryptoAmount);
//       }
//       return await this.exchangeService.confirmPayment(data);
//     } catch (error) {
//       this.logger.error(`Failed to confirm payment: ${error.message}`, error.stack);
//       throw new GrpcError(error.message, 'INTERNAL');
//     }
//   }

//   @GrpcMethod('ExchangeService', 'ConfirmReceipt')
//   @Roles(UserRole.CUSTOMER)
//   async confirmReceipt(data: ConfirmReceiptRequest): Promise<ConfirmReceiptResponse> {
//     try {
//       const transaction = await this.exchangeService.getTransaction(data.transactionId);
//       if (transaction.type === ExchangeType.CRYPTO_TO_FIAT) {
//         await this.exchangeService.unfreezeCustomerCrypto(data.customerId, transaction.cryptoAmount);
//       } else {
//         await this.exchangeService.unfreezeExchangerCrypto(transaction.exchangerId, transaction.cryptoAmount);
//       }
//       return await this.exchangeService.confirmReceipt(data);
//     } catch (error) {
//       this.logger.error(`Failed to confirm receipt: ${error.message}`, error.stack);
//       throw new GrpcError(error.message, 'INTERNAL');
//     }
//   }

//   @GrpcMethod('ExchangeService', 'CancelTransaction')
//   @Roles(UserRole.CUSTOMER, UserRole.EXCHANGER)
//   async cancelTransaction(data: CancelTransactionRequest): Promise<CancelTransactionResponse> {
//     try {
//       const transaction = await this.exchangeService.getTransaction(data.transactionId);
//       if (transaction.status === TransactionStatus.PENDING) {
//         if (transaction.type === ExchangeType.CRYPTO_TO_FIAT) {
//           await this.exchangeService.unfreezeCustomerCrypto(transaction.customerId, transaction.cryptoAmount);
//         }
//       }
//       return await this.exchangeService.cancelTransaction(data);
//     } catch (error) {
//       this.logger.error(`Failed to cancel transaction: ${error.message}`, error.stack);
//       throw new GrpcError(error.message, 'INTERNAL');
//     }
//   }

//   @GrpcMethod('ExchangeService', 'SetExchangerStatus')
//   @Roles(UserRole.EXCHANGER)
//   async setExchangerStatus(data: SetExchangerStatusRequest): Promise<SetExchangerStatusResponse> {
//     try {
//       const missedOffers = await this.exchangeService.getMissedOffers(data.exchangerId);
//       if (missedOffers >= 5) {
//         await this.exchangeService.freezeExchanger({
//           exchangerId: data.exchangerId,
//           reason: 'Too many missed offers'
//         });
//         throw new GrpcError('Exchanger has been frozen due to too many missed offers', 'PERMISSION_DENIED');
//       }

//       return await this.exchangeService.setExchangerStatus(data);
//     } catch (error) {
//       this.logger.error(`Error in setExchangerStatus: ${error.message}`, error.stack);
//       throw new GrpcError(error.message, 'INTERNAL');
//     }
//   }

//   @GrpcMethod('ExchangeService', 'FreezeExchanger')
//   @Roles(UserRole.MODERATOR, UserRole.ADMIN)
//   async freezeExchanger(data: FreezeExchangerRequest): Promise<FreezeExchangerResponse> {
//     try {
//       const response = await this.exchangeService.freezeExchanger(data);
      
//       await this.exchangeService.notifyModerators({
//         type: 'EXCHANGER_FROZEN',
//         exchangerId: data.exchangerId,
//         reason: data.reason
//       });

//       return response;
//     } catch (error) {
//       this.logger.error(`Error in freezeExchanger: ${error.message}`, error.stack);
//       throw new GrpcError(error.message, 'INTERNAL');
//     }
//   }
// } 