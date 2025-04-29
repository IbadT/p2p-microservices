import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { DisputeService } from '../services/dispute.service';

@Controller()
export class DisputeGrpcController {
  constructor(private readonly disputeService: DisputeService) {}

  @GrpcMethod('DisputeService', 'CreateDispute')
  async createDispute(data: any) {
    return this.disputeService.createDispute(
      data.transactionId,
      data.initiatorId,
      data.reason,
    );
  }

  @GrpcMethod('DisputeService', 'ResolveDispute')
  async resolveDispute(data: any) {
    return this.disputeService.resolveDispute(
      data.disputeId,
      data.moderatorId,
      data.resolution,
      data.winnerUserId,
    );
  }

  @GrpcMethod('DisputeService', 'GetDisputesByUser')
  async getDisputesByUser(data: any) {
    const disputes = await this.disputeService.getDisputesByUser(data.userId);
    return { disputes };
  }

  @GrpcMethod('DisputeService', 'GetOpenDisputes')
  async getOpenDisputes() {
    const disputes = await this.disputeService.getOpenDisputes();
    return { disputes };
  }
} 