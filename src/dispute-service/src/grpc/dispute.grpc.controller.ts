import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { DisputeService } from '../services/dispute.service';
import { Logger } from '@nestjs/common';
import { GrpcError } from '../../../client/interfaces/grpc.interfaces';
import { 
  CreateDisputeRequest,
  ResolveDisputeRequest,
  GetDisputesByUserRequest,
} from '../../../proto/generated/dispute.pb';
import { Dispute } from '../interfaces/dispute.interface';

@Controller()
export class DisputeGrpcController {
  private readonly logger = new Logger(DisputeGrpcController.name);

  constructor(private readonly disputeService: DisputeService) {}

  @GrpcMethod('DisputeService', 'CreateDispute')
  async createDispute(data: CreateDisputeRequest): Promise<Dispute> {
    try {
      const dispute = await this.disputeService.createDispute(
        data.transactionId,
        data.initiatorId,
        data.reason,
      );
      return dispute as unknown as Dispute;
    } catch (error) {
      this.logger.error(`Failed to create dispute: ${error.message}`, error.stack);
      throw new GrpcError(error.message, 'INTERNAL');
    }
  }

  @GrpcMethod('DisputeService', 'ResolveDispute')
  async resolveDispute(data: ResolveDisputeRequest): Promise<Dispute> {
    try {
      const dispute = await this.disputeService.resolveDispute(
        data.disputeId,
        data.moderatorId,
        data.resolution,
        data.winnerUserId,
      );
      return dispute as unknown as Dispute;
    } catch (error) {
      this.logger.error(`Failed to resolve dispute: ${error.message}`, error.stack);
      throw new GrpcError(error.message, 'INTERNAL');
    }
  }

  @GrpcMethod('DisputeService', 'GetDisputesByUser')
  async getDisputesByUser(data: GetDisputesByUserRequest): Promise<{ disputes: Dispute[] }> {
    try {
      const disputes = await this.disputeService.getDisputesByUser(data.userId);
      return { disputes: disputes as unknown as Dispute[] };
    } catch (error) {
      this.logger.error(`Failed to get disputes by user: ${error.message}`, error.stack);
      throw new GrpcError(error.message, 'INTERNAL');
    }
  }

  @GrpcMethod('DisputeService', 'GetOpenDisputes')
  async getOpenDisputes(): Promise<{ disputes: Dispute[] }> {
    try {
      const disputes = await this.disputeService.getOpenDisputes();
      return { disputes: disputes as unknown as Dispute[] };
    } catch (error) {
      this.logger.error(`Failed to get open disputes: ${error.message}`, error.stack);
      throw new GrpcError(error.message, 'INTERNAL');
    }
  }
} 