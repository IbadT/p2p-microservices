import { Controller, Get, Post, Body, Param, UseGuards, BadRequestException } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiSecurity } from '@nestjs/swagger';
import { CreateDisputeDto, ResolveDisputeDto, AddCommentDto } from '../client/interfaces/client.swagger';
import { DisputeWithRelations } from '../client/interfaces/grpc.interfaces';
import {
  ApiCreateDispute,
  ApiGetAllDisputes,
  ApiGetDisputeById,
  ApiResolveDispute,
  ApiAddComment,
  ApiGetMyDisputes,
  ApiGetOpenDisputes
} from '../client/swagger/client.swagger';
import { DisputesService } from './disputes.service';
import { CreateDisputeRequest, ResolveDisputeRequest, GetDisputesByUserRequest, GetOpenDisputesRequest, GetDisputesByUserResponse, GetOpenDisputesResponse, Dispute } from '../proto/generated/disputes.pb';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { UserRole } from 'src/shared/decorators/roles.decorator';
import { User } from 'src/shared/decorators/user.decorator';

@ApiTags('Disputes')
@Controller('disputes')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiSecurity('JWT-auth')
export class DisputesController {
  constructor(private readonly disputesService: DisputesService) {}

  // REST endpoints
  @Post()
  @Roles(UserRole.CUSTOMER, UserRole.EXCHANGER)
  @ApiCreateDispute()
  async create(@Body() dto: CreateDisputeDto): Promise<Dispute> {
    const dispute = await this.disputesService.createDispute(dto.transactionId, dto.initiatorId, dto.reason);
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

  @Get()
  @Roles(UserRole.MODERATOR, UserRole.ADMIN)
  @ApiGetAllDisputes()
  async findAll(): Promise<Dispute[]> {
    const disputes = await this.disputesService.getOpenDisputes();
    return disputes.map(dispute => ({
      id: dispute.id,
      transactionId: dispute.transactionId,
      initiatorId: dispute.initiatorId,
      reason: dispute.reason,
      status: dispute.status,
      moderatorId: dispute.moderatorId || '',
      resolution: dispute.resolution || '',
      winnerUserId: dispute.transaction.customerId,
      createdAt: dispute.createdAt.toISOString(),
      updatedAt: dispute.updatedAt.toISOString(),
    }));
  }

  @Get('my')
  @ApiGetMyDisputes()
  async getMyDisputes(@User('id') userId: string): Promise<Dispute[]> {
    const disputes = await this.disputesService.getDisputesByUser(userId);
    return disputes.map(dispute => ({
      id: dispute.id,
      transactionId: dispute.transactionId,
      initiatorId: dispute.initiatorId,
      reason: dispute.reason,
      status: dispute.status,
      moderatorId: dispute.moderatorId || '',
      resolution: dispute.resolution || '',
      winnerUserId: dispute.transaction.customerId,
      createdAt: dispute.createdAt.toISOString(),
      updatedAt: dispute.updatedAt.toISOString(),
    }));
  }

  @Get(':id')
  @ApiGetDisputeById()
  async findOne(@Param('id') id: string): Promise<Dispute> {
    const disputes = await this.disputesService.getDisputesByUser(id);
    const dispute = disputes.find(d => d.id === id);
    if (!dispute) {
      throw new BadRequestException('Dispute not found');
    }
    return {
      id: dispute.id,
      transactionId: dispute.transactionId,
      initiatorId: dispute.initiatorId,
      reason: dispute.reason,
      status: dispute.status,
      moderatorId: dispute.moderatorId || '',
      resolution: dispute.resolution || '',
      winnerUserId: dispute.transaction.customerId,
      createdAt: dispute.createdAt.toISOString(),
      updatedAt: dispute.updatedAt.toISOString(),
    };
  }

  @Post(':id/resolve')
  @Roles(UserRole.MODERATOR, UserRole.ADMIN)
  @ApiResolveDispute()
  async resolve(@Param('id') id: string, @Body() dto: ResolveDisputeDto): Promise<void> {
    await this.disputesService.resolveDispute(id, dto.moderatorId, dto.resolution, dto.winnerUserId);
  }

  @Post(':id/comments')
  @ApiAddComment()
  async addComment(@Param('id') id: string, @Body() dto: AddCommentDto): Promise<void> {
    await this.disputesService.addModeratorComment(id, dto.userId, dto.text);
  }

  // gRPC endpoints
  @GrpcMethod('DisputeService', 'CreateDispute')
  @Roles(UserRole.CUSTOMER, UserRole.EXCHANGER)
  async createDispute(data: CreateDisputeRequest): Promise<Dispute> {
    return this.create({
      transactionId: data.transactionId,
      initiatorId: data.initiatorId,
      reason: data.reason
    });
  }

  @GrpcMethod('DisputeService', 'ResolveDispute')
  @Roles(UserRole.MODERATOR, UserRole.ADMIN)
  async resolveDispute(data: ResolveDisputeRequest): Promise<Dispute> {
    await this.resolve(data.disputeId, {
      disputeId: data.disputeId,
      moderatorId: data.moderatorId,
      resolution: data.resolution,
      winnerUserId: data.winnerUserId
    });
    return this.findOne(data.disputeId);
  }

  @GrpcMethod('DisputeService', 'GetDisputesByUser')
  @Roles(UserRole.CUSTOMER, UserRole.EXCHANGER, UserRole.MODERATOR, UserRole.ADMIN)
  async getDisputesByUser(data: GetDisputesByUserRequest): Promise<GetDisputesByUserResponse> {
    const disputes = await this.getMyDisputes(data.userId);
    return { disputes };
  }

  @GrpcMethod('DisputeService', 'GetOpenDisputes')
  @Roles(UserRole.MODERATOR, UserRole.ADMIN)
  async getOpenDisputes(data: GetOpenDisputesRequest): Promise<GetOpenDisputesResponse> {
    const disputes = await this.findAll();
    return { disputes };
  }
}