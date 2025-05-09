import { Injectable } from '@nestjs/common';
import { GrpcClientFactory } from './grpc-client.factory';
import { firstValueFrom } from 'rxjs';
import { NotificationType } from '../interfaces/enums';

@Injectable()
export class DisputesGrpcClient {
  private client;

  constructor(private readonly grpcClientFactory: GrpcClientFactory) {
    this.client = this.grpcClientFactory.createClient('disputes');
  }

  async resolveDispute(
    disputeId: string,
    resolution: string,
    moderatorId: string,
    winnerId: string
  ) {
    return firstValueFrom(
      this.client.resolveDispute({
        disputeId,
        resolution,
        moderatorId,
        winnerId
      })
    );
  }

  async getDisputeBalance(disputeId: string) {
    return firstValueFrom(
      this.client.getDisputeBalance({ disputeId })
    );
  }

  async addModeratorComment(
    disputeId: string,
    moderatorId: string,
    text: string
  ) {
    return firstValueFrom(
      this.client.addModeratorComment({
        disputeId,
        moderatorId,
        text
      })
    );
  }

  async getDisputeComments(
    disputeId: string,
    userId: string,
    page: number = 1,
    limit: number = 20
  ) {
    return firstValueFrom(
      this.client.getDisputeComments({
        disputeId,
        userId,
        page,
        limit
      })
    );
  }
} 