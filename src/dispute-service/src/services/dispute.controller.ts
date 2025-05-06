import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { DisputeService } from './dispute.service';
import { CreateDisputeRequest, ResolveDisputeRequest, GetDisputesByUserRequest } from '../../../proto/generated/dispute.pb';

@Controller()
export class DisputeController {
  constructor(private readonly disputeService: DisputeService) {}

  @GrpcMethod('DisputeService', 'CreateDispute')
  async createDispute(data: CreateDisputeRequest) {
    return this.disputeService.createDispute(
      data.transactionId,
      data.initiatorId,
      data.reason
    );
  }

  @GrpcMethod('DisputeService', 'ResolveDispute')
  async resolveDispute(data: ResolveDisputeRequest) {
    return this.disputeService.resolveDispute(
      data.disputeId,
      data.moderatorId,
      data.resolution,
      data.winnerUserId
    );
  }

  @GrpcMethod('DisputeService', 'GetDisputesByUser')
  async getDispute(data: GetDisputesByUserRequest) {
    return this.disputeService.getDisputesByUser(data.userId);
  }
} 