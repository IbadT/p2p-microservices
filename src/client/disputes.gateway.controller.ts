import { Controller, Get, Post, Body, Param, UseGuards, BadRequestException, Logger, NotFoundException } from '@nestjs/common';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiSecurity } from '@nestjs/swagger';
import { CreateDisputeDto, ResolveDisputeDto, AddCommentDto } from './interfaces/client.swagger';
import { DisputeWithRelations } from './interfaces/grpc.interfaces';
import {
  ApiCreateDispute,
  ApiGetAllDisputes,
  ApiGetDisputeById,
  ApiResolveDispute,
  ApiAddComment,
  ApiGetMyDisputes,
  ApiGetOpenDisputes,
  ApiGetDisputeChat,
  ApiGetDisputeComments,
  ApiAddDisputeComment
} from './swagger/client.swagger';
import { Roles } from '../shared/decorators/roles.decorator';
import { RolesGuard } from '../shared/guards/roles.guard';
import { UserRole } from '../shared/decorators/roles.decorator';
import { User } from '../shared/decorators/user.decorator';
import { firstValueFrom, Observable } from 'rxjs';
import { Chat, Comment, GetDisputeCommentsResponse, Dispute, GetDisputesByUserResponse, GetOpenDisputesResponse, GetDisputeChatRequest, GetDisputeCommentsRequest, AddDisputeCommentRequest, GetOpenDisputesRequest, GetDisputesByUserRequest } from '../proto/generated/disputes.pb';
import { ExchangeType, TransactionStatus, DisputeStatus, User as PrismaUser } from '@prisma/client';
import { DisputeGrpcClient } from './services/dispute.grpc.client';
import { CurrentUser } from '../shared/decorators/current-user.decorator';
import { PrismaService } from 'src/prisma.service';


@ApiTags('Disputes')
@Controller('disputes')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiSecurity('JWT-auth')
export class DisputesGatewayController {
  private readonly logger = new Logger(DisputesGatewayController.name);

  constructor(
    private readonly disputeClient: DisputeGrpcClient,
    private readonly prisma: PrismaService
  ) {}

  private mapDisputeToDisputeWithRelations(dispute: any): DisputeWithRelations {
    return {
      id: dispute.id,
      transactionId: dispute.transactionId,
      initiatorId: dispute.initiatorId,
      reason: dispute.reason,
      status: dispute.status as DisputeStatus,
      moderatorId: dispute.moderatorId || null,
      resolution: dispute.resolution || null,
      winnerId: dispute.winnerUserId || null,
      resolvedAt: dispute.resolvedAt ? new Date(dispute.resolvedAt) : null,
      createdAt: new Date(dispute.createdAt),
      updatedAt: new Date(dispute.updatedAt),
      transaction: {
        id: dispute.transactionId,
        type: ExchangeType.CRYPTO_TO_FIAT,
        status: TransactionStatus.DISPUTE_OPEN,
        cryptocurrency: '',
        fiatCurrency: '',
        cryptoAmount: 0,
        fiatAmount: 0,
        paymentProof: null,
        disputeId: dispute.id,
        confirmationDeadline: new Date(),
        canCustomerDispute: true,
        canExchangerDispute: true,
        isActive: true,
        customerId: dispute.initiatorId,
        exchangerId: '',
        listingId: '',
        offerId: null,
        createdAt: new Date(dispute.createdAt),
        updatedAt: new Date(dispute.updatedAt),
        finishedAt: null,
        customer: {
          id: dispute.initiatorId,
          email: ''
        },
        exchanger: {
          id: '',
          email: ''
        }
      }
    };
  }

  @Post()
  @Roles(UserRole.CUSTOMER, UserRole.EXCHANGER)
  @ApiCreateDispute()
  async create(@Body() dto: CreateDisputeDto): Promise<DisputeWithRelations> {
    try {
      const dispute = await this.disputeClient.createDispute(dto);
      if (!dispute) {
        throw new BadRequestException('Failed to create dispute');
      }
      return this.mapDisputeToDisputeWithRelations(dispute);
    } catch (error) {
      this.logger.error(`Failed to create dispute: ${error.message}`);
      throw new BadRequestException(error.message || 'Failed to create dispute');
    }
  }

  @Get()
  @Roles(UserRole.MODERATOR, UserRole.ADMIN)
  @ApiGetAllDisputes()
  async findAll(): Promise<DisputeWithRelations[]> {
    try {
      const response = await this.disputeClient.getOpenDisputes();
      if (!response?.disputes) {
        return [];
      }
      return response.disputes.map(dispute => this.mapDisputeToDisputeWithRelations(dispute));
    } catch (error) {
      this.logger.error(`Failed to get all disputes: ${error.message}`);
      throw new BadRequestException(error.message || 'Failed to get disputes');
    }
  }

  @Get('my')
  @ApiGetMyDisputes()
  async getMyDisputes(@User('id') userId: string): Promise<DisputeWithRelations[]> {
    try {
      const response = await this.disputeClient.getUserDisputes(userId);
      if (!response?.disputes) {
        return [];
      }
      return response.disputes.map(dispute => this.mapDisputeToDisputeWithRelations(dispute));
    } catch (error) {
      this.logger.error(`Failed to get user disputes: ${error.message}`);
      throw new BadRequestException(error.message || 'Failed to get disputes');
    }
  }

  @Get(':id')
  @ApiGetDisputeById()
  async findOne(@Param('id') id: string): Promise<DisputeWithRelations> {
    try {
      const dispute = await this.disputeClient.getDispute(id);
      if (!dispute) {
        throw new BadRequestException('Dispute not found');
      }
      return this.mapDisputeToDisputeWithRelations(dispute);
    } catch (error) {
      this.logger.error(`Failed to get dispute: ${error.message}`);
      throw new BadRequestException(error.message || 'Failed to get dispute');
    }
  }

  @Post(':disputeId/resolve')
  @Roles(UserRole.MODERATOR)
  @ApiResolveDispute()
  async resolveDispute(
    @Param('disputeId') disputeId: string,
    @Body() resolveDisputeDto: ResolveDisputeDto,
    @CurrentUser() moderator: PrismaUser,
  ): Promise<DisputeWithRelations> {
    try {
      const dispute = await this.disputeClient.resolveDispute({
        disputeId,
        resolution: resolveDisputeDto.resolution,
        moderatorId: moderator.id,
        winnerUserId: resolveDisputeDto.winnerUserId
      });

      if (!dispute) {
        throw new BadRequestException('Failed to resolve dispute');
      }

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
        ...this.mapDisputeToDisputeWithRelations(dispute),
        transaction: {
          ...this.mapDisputeToDisputeWithRelations(dispute).transaction,
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
    } catch (error) {
      this.logger.error(`Failed to resolve dispute: ${error.message}`);
      throw new BadRequestException(error.message || 'Failed to resolve dispute');
    }
  }

  @Get(':id/chat')
  @ApiGetDisputeChat()
  async getDisputeChat(@Param('id') id: string, @User('id') userId: string): Promise<Chat> {
    try {
      const request: GetDisputeChatRequest = {
        disputeId: id,
        userId
      };
      const chat = await this.disputeClient.getDisputeChat(request);
      if (!chat) {
        throw new BadRequestException('Chat not found');
      }
      return chat;
    } catch (error) {
      this.logger.error(`Failed to get dispute chat: ${error.message}`);
      throw new BadRequestException(error.message || 'Failed to get dispute chat');
    }
  }

  @Get(':id/comments')
  @ApiGetDisputeComments()
  async getDisputeComments(@Param('id') id: string, @User('id') userId: string): Promise<Comment[]> {
    try {
      const request: GetDisputeCommentsRequest = {
        disputeId: id,
        userId,
        page: 1,
        limit: 20
      };
      const response = await this.disputeClient.getDisputeComments(request);
      return response?.comments || [];
    } catch (error) {
      this.logger.error(`Failed to get dispute comments: ${error.message}`);
      throw new BadRequestException(error.message || 'Failed to get dispute comments');
    }
  }

  @Post(':id/comments')
  @ApiAddDisputeComment()
  async addDisputeComment(
    @Param('id') id: string,
    @User('id') userId: string,
    @Body() dto: AddCommentDto
  ): Promise<Comment> {
    try {
      const request: AddDisputeCommentRequest = {
        disputeId: id,
        userId,
        text: dto.text
      };
      const comment = await this.disputeClient.addComment(request);
      if (!comment) {
        throw new BadRequestException('Failed to add comment');
      }
      return comment;
    } catch (error) {
      this.logger.error(`Failed to add dispute comment: ${error.message}`);
      throw new BadRequestException(error.message || 'Failed to add dispute comment');
    }
  }
} 