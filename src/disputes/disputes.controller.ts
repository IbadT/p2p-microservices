import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { DisputesService } from './disputes.service';
import { CreateDisputeRequest, ResolveDisputeRequest, GetDisputesByUserRequest } from '../proto/generated/disputes.pb';

@Controller()
export class DisputesController {
  constructor(private readonly disputesService: DisputesService) {}

  @GrpcMethod('DisputeService', 'CreateDispute')
  async createDispute(data: CreateDisputeRequest) {
    return this.disputesService.createDispute(
      data.transactionId,
      data.initiatorId,
      data.reason,
    );
  }

  @GrpcMethod('DisputeService', 'ResolveDispute')
  async resolveDispute(data: ResolveDisputeRequest) {
    return this.disputesService.resolveDispute(
      data.disputeId,
      data.moderatorId,
      data.resolution,
      data.winnerUserId,
    );
  }

  @GrpcMethod('DisputeService', 'GetDisputesByUser')
  async getDisputesByUser(data: GetDisputesByUserRequest) {
    const disputes = await this.disputesService.getDisputesByUser(data.userId);
    return { disputes };
  }

  @GrpcMethod('DisputeService', 'GetOpenDisputes')
  async getOpenDisputes() {
    const disputes = await this.disputesService.getOpenDisputes();
    return { disputes };
  }
}