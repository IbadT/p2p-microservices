import { Controller, Get, Post, Put, Body, Param, UseGuards } from '@nestjs/common';
import { DisputeService } from '../services/dispute.service';
// import { JwtAuthGuard } from '../guards/jwt-auth.guard';
// import { RolesGuard } from '../guards/roles.guard';
// import { Roles } from '../decorators/roles.decorator';
// import { User } from '../decorators/user.decorator';
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard';
import { RolesGuard } from '../../../shared/guards/roles.guard';
import { Roles, UserRole } from '../../../shared/decorators/roles.decorator';
import { User } from '../../../shared/decorators/user.decorator';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateDisputeRequest, ResolveDisputeRequest } from '../../../proto/generated/disputes.pb';
// import { CreateDisputeRequest, ResolveDisputeRequest } from '../../proto/generated/dispute.pb';

class CreateDisputeDto {
  transactionId: string;
  reason: string;
}

class ResolveDisputeDto {
  resolution: string;
  winnerUserId: string;
}

@Controller('disputes')
@UseGuards(JwtAuthGuard)
export class DisputeController {
  constructor(private readonly disputeService: DisputeService) {}

  @GrpcMethod('DisputeService', 'CreateDispute')
  @Roles(UserRole.CUSTOMER, UserRole.EXCHANGER)
  async createDispute(data: CreateDisputeRequest) {
    return this.disputeService.createDispute(
      data.transactionId,
      data.initiatorId,
      data.reason,
    );
  }

  @GrpcMethod('DisputeService', 'ResolveDispute')
  @Roles(UserRole.MODERATOR, UserRole.ADMIN)
  async resolveDispute(data: ResolveDisputeRequest) {
    return this.disputeService.resolveDispute(
      data.disputeId,
      data.moderatorId,
      data.resolution,
      data.winnerUserId,
    );
  }

  @Get('my')
  async getMyDisputes(@User('id') userId: string) {
    return this.disputeService.getDisputesByUser(userId);
  }

  @Get('open')
  @UseGuards(RolesGuard)
  @Roles(UserRole.MODERATOR, UserRole.ADMIN)
  async getOpenDisputes() {
    return this.disputeService.getOpenDisputes();
  }
} 