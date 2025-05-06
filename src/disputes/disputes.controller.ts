import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { DisputesService } from './disputes.service';
import { CreateDisputeRequest, ResolveDisputeRequest, GetDisputesByUserRequest, GetOpenDisputesRequest, GetDisputesByUserResponse, GetOpenDisputesResponse, Dispute } from '../proto/generated/disputes.pb';
import { Roles, UserRole } from '../shared/decorators/roles.decorator';

@Controller()
export class DisputesController {
  constructor(private readonly disputesService: DisputesService) {}

  @GrpcMethod('DisputeService', 'CreateDispute')
  @Roles(UserRole.CUSTOMER, UserRole.EXCHANGER)
  async createDispute(data: CreateDisputeRequest): Promise<Dispute> {
    const dispute = await this.disputesService.createDispute(
      data.transactionId,
      data.initiatorId,
      data.reason
    );
    return {
      id: dispute.id,
      transactionId: dispute.transactionId,
      initiatorId: dispute.initiatorId,
      reason: dispute.reason,
      status: dispute.status,
      moderatorId: dispute.moderatorId || '',
      resolution: dispute.resolution || '',
      winnerUserId: '', // No winner yet for new disputes
      createdAt: dispute.createdAt.toISOString(),
      updatedAt: dispute.updatedAt.toISOString(),
    };
  }

  @GrpcMethod('DisputeService', 'ResolveDispute')
  @Roles(UserRole.MODERATOR, UserRole.ADMIN)
  async resolveDispute(data: ResolveDisputeRequest): Promise<Dispute> {
    const dispute = await this.disputesService.resolveDispute(
      data.disputeId,
      data.moderatorId,
      data.resolution,
      data.winnerUserId,
    );
    return {
      id: dispute.id,
      transactionId: dispute.transactionId,
      initiatorId: dispute.initiatorId,
      reason: dispute.reason,
      status: dispute.status,
      moderatorId: dispute.moderatorId || '',
      resolution: dispute.resolution || '',
      winnerUserId: data.winnerUserId,
      createdAt: dispute.createdAt.toISOString(),
      updatedAt: dispute.updatedAt.toISOString(),
    };
  }

  @GrpcMethod('DisputeService', 'GetDisputesByUser')
  @Roles(UserRole.CUSTOMER, UserRole.EXCHANGER, UserRole.MODERATOR, UserRole.ADMIN)
  async getDisputesByUser(data: GetDisputesByUserRequest): Promise<GetDisputesByUserResponse> {
    const disputes = await this.disputesService.getDisputesByUser(data.userId);
    return {
      disputes: disputes.map(dispute => ({
        id: dispute.id,
        transactionId: dispute.transactionId,
        initiatorId: dispute.initiatorId,
        reason: dispute.reason,
        status: dispute.status,
        moderatorId: dispute.moderatorId || '',
        resolution: dispute.resolution || '',
        winnerUserId: dispute.transaction.customerId, // Default to customer if not specified
        createdAt: dispute.createdAt.toISOString(),
        updatedAt: dispute.updatedAt.toISOString(),
      }))
    };
  }

  @GrpcMethod('DisputeService', 'GetOpenDisputes')
  @Roles(UserRole.MODERATOR, UserRole.ADMIN)
  async getOpenDisputes(data: GetOpenDisputesRequest): Promise<GetOpenDisputesResponse> {
    const disputes = await this.disputesService.getOpenDisputes();
    return {
      disputes: disputes.map(dispute => ({
        id: dispute.id,
        transactionId: dispute.transactionId,
        initiatorId: dispute.initiatorId,
        reason: dispute.reason,
        status: dispute.status,
        moderatorId: dispute.moderatorId || '',
        resolution: dispute.resolution || '',
        winnerUserId: dispute.transaction.customerId, // Default to customer if not specified
        createdAt: dispute.createdAt.toISOString(),
        updatedAt: dispute.updatedAt.toISOString(),
      }))
    };
  }
}