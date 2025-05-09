import { Controller, Get, Post, Body, Param, UseGuards, BadRequestException, Query, NotFoundException } from '@nestjs/common';
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
  ApiGetOpenDisputes,
  ApiGetDisputeBalance
} from '../client/swagger/client.swagger';
import { DisputesService } from './disputes.service';
import { CreateDisputeRequest, ResolveDisputeRequest, GetDisputesByUserRequest, GetOpenDisputesRequest, GetDisputesByUserResponse, GetOpenDisputesResponse, Dispute } from '../proto/generated/disputes.pb';
import { Roles } from '../shared/decorators/roles.decorator';
import { RolesGuard } from '../shared/guards/roles.guard';
import { UserRole } from '../shared/decorators/roles.decorator';
import { User as PrismaUser } from '@prisma/client';
import { Chat, Comment } from '../proto/generated/chat.pb';
import { Comment as PrismaComment } from '@prisma/client';
import { GetChatHistoryResponse } from '../proto/generated/chat.pb';
import { CurrentUser } from '../shared/decorators/current-user.decorator';
import { User } from '../shared/decorators/user.decorator';
import { PrismaService } from 'src/prisma.service';


@ApiTags('Disputes')
@Controller('disputes')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiSecurity('JWT-auth')
export class DisputesController {
  constructor(
    private readonly disputesService: DisputesService,
    private readonly prisma: PrismaService
  ) {}

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

  @Post(':disputeId/resolve')
  @GrpcMethod('DisputeService', 'ResolveDispute')
  @Roles(UserRole.MODERATOR)
  @ApiResolveDispute()
  async resolveDispute(
    @Param('disputeId') disputeId: string,
    @Body() resolveDisputeDto: ResolveDisputeDto,
    @CurrentUser() moderator: PrismaUser,
  ) {
    const dispute = await this.disputesService.resolveDispute(
      disputeId,
      resolveDisputeDto.resolution,
      moderator.id,
      resolveDisputeDto.winnerUserId
    );

    // Get updated transaction details
    const transaction = await this.prisma.exchangeTransaction.findUnique({
      where: { id: dispute.transactionId },
      include: {
        customer: true,
        exchanger: true
      }
    });

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    const isCustomerWinner = resolveDisputeDto.winnerUserId === transaction.customerId;

    return {
      id: dispute.id,
      transactionId: dispute.transactionId,
      initiatorId: dispute.initiatorId,
      reason: dispute.reason,
      status: dispute.status,
      moderatorId: dispute.moderatorId || '',
      resolution: dispute.resolution || '',
      winnerUserId: dispute.winnerId || '',
      createdAt: dispute.createdAt.toISOString(),
      updatedAt: dispute.updatedAt.toISOString(),
      transaction: {
        id: transaction.id,
        status: transaction.status,
        finishedAt: transaction.finishedAt,
        customer: {
          id: transaction.customer.id,
          email: transaction.customer.email
        },
        exchanger: {
          id: transaction.exchanger.id,
          email: transaction.exchanger.email
        }
      },
      finalStatus: isCustomerWinner ? 'CANCELLED' : 'FINISHED'
    };
  }

  @Post(':id/comments')
  @ApiAddComment()
  async addComment(@Param('id') id: string, @Body() dto: AddCommentDto): Promise<void> {
    await this.disputesService.addModeratorComment(id, dto.userId, dto.text);
  }

  @Get(':disputeId/balance')
  @Roles(UserRole.MODERATOR)
  @ApiGetDisputeBalance()
  async getDisputeBalance(
    @Param('disputeId') disputeId: string,
  ) {
    const dispute = await this.disputesService.getDisputeById(disputeId);
    if (!dispute) {
      throw new NotFoundException('Dispute not found');
    }

    const transaction = await this.prisma.exchangeTransaction.findUnique({
      where: { id: dispute.transactionId },
      include: {
        customer: {
          include: { balance: true }
        },
        exchanger: {
          include: { balance: true }
        }
      }
    });

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    return {
      cryptoAmount: transaction.cryptoAmount,
      cryptocurrency: transaction.cryptocurrency,
      fiatAmount: transaction.fiatAmount,
      fiatCurrency: transaction.fiatCurrency,
      customerBalance: {
        crypto: transaction.customer.balance?.cryptoBalance || {},
        fiat: transaction.customer.balance?.fiatBalance || {}
      },
      exchangerBalance: {
        crypto: transaction.exchanger.balance?.cryptoBalance || {},
        fiat: transaction.exchanger.balance?.fiatBalance || {}
      }
    };
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