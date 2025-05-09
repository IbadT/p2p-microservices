import { Controller, Get, Post, Body, Param, UseGuards, BadRequestException, Query } from '@nestjs/common';
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
import { Chat, Comment } from '../proto/generated/chat.pb';
import { Comment as PrismaComment } from '@prisma/client';
import { GetChatHistoryResponse } from '../proto/generated/chat.pb';

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

  @GrpcMethod('DisputeService', 'GetDisputeChat')
  @Roles(UserRole.MODERATOR, UserRole.ADMIN)
  async getDisputeChat(data: { 
    disputeId: string; 
    userId: string;
    page?: number;
    limit?: number;
  }): Promise<GetChatHistoryResponse> {
    const page = data.page || 1;
    const limit = data.limit || 20;
    
    return this.disputesService.getDisputeChat(data.disputeId, data.userId, page, limit);
  }

  @GrpcMethod('DisputeService', 'AddDisputeComment')
  @Roles(UserRole.MODERATOR, UserRole.ADMIN)
  async addDisputeComment(data: { 
    disputeId: string; 
    userId: string; 
    text: string;
    isModeratorComment: boolean;
  }): Promise<Comment> {
    const comment = await this.disputesService.addDisputeComment(
      data.disputeId, 
      data.userId, 
      data.text,
      true // Always true for moderator comments
    );

    // Notify dispute participants about the new moderator comment
    await this.disputesService.notifyAboutModeratorComment(data.disputeId, comment);
    
    return comment;
  }

  @GrpcMethod('DisputeService', 'GetDisputeComments')
  @Roles(UserRole.MODERATOR, UserRole.ADMIN, UserRole.CUSTOMER, UserRole.EXCHANGER)
  async getDisputeComments(data: { 
    disputeId: string; 
    userId: string;
    page?: number;
    limit?: number;
  }) {
    const page = data.page || 1;
    const limit = data.limit || 20;
    
    const comments = await this.disputesService.getDisputeComments(
      data.disputeId, 
      data.userId,
      page,
      limit
    );
    
    return {
      comments: comments.map(comment => ({
        ...comment,
        is_moderator: comment.isModeratorComment
      }))
    };
  }
}