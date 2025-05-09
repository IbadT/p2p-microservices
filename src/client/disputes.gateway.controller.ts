import { Controller, Get, Post, Body, Param, UseGuards, BadRequestException, Inject } from '@nestjs/common';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiSecurity } from '@nestjs/swagger';
import { CreateDisputeDto, ResolveDisputeDto, AddCommentDto } from './interfaces/client.swagger';
import { DisputeWithRelations } from './interfaces/grpc.interfaces';
import {
  ApiCreateDispute,
  ApiGetAllDisputes,
  ApiGetDisputeById,
  ApiResolveDispute,
  ApiAddComment
} from './swagger/client.swagger';
import { ClientGrpc } from '@nestjs/microservices';
import { DISPUTE_SERVICE } from './constants';

@ApiTags('Disputes')
@Controller('disputes')
@UseGuards(JwtAuthGuard)
@ApiSecurity('JWT-auth')
export class DisputesGatewayController {
  private disputeService: any;

  constructor(
    @Inject(DISPUTE_SERVICE) private readonly client: ClientGrpc
  ) {
    this.disputeService = this.client.getService('DisputeService');
  }

  @Post()
  @ApiCreateDispute()
  async create(@Body() dto: CreateDisputeDto): Promise<DisputeWithRelations> {
    const dispute = await this.disputeService.createDispute({
      transactionId: dto.transactionId,
      initiatorId: dto.initiatorId,
      reason: dto.reason
    }).toPromise();
    return dispute;
  }

  @Get()
  @ApiGetAllDisputes()
  async findAll(): Promise<DisputeWithRelations[]> {
    const response = await this.disputeService.getOpenDisputes({}).toPromise();
    return response.disputes;
  }

  @Get(':id')
  @ApiGetDisputeById()
  async findOne(@Param('id') id: string): Promise<DisputeWithRelations> {
    const response = await this.disputeService.getDisputesByUser({ userId: id }).toPromise();
    const dispute = response.disputes.find(d => d.id === id);
    if (!dispute) {
      throw new BadRequestException('Dispute not found');
    }
    return dispute;
  }

  @Post(':id/resolve')
  @ApiResolveDispute()
  async resolve(@Param('id') id: string, @Body() dto: ResolveDisputeDto): Promise<void> {
    await this.disputeService.resolveDispute({
      disputeId: id,
      moderatorId: dto.moderatorId,
      resolution: dto.resolution,
      winnerUserId: dto.winnerUserId
    }).toPromise();
  }

  @Post(':id/comments')
  @ApiAddComment()
  async addComment(@Param('id') id: string, @Body() dto: AddCommentDto): Promise<void> {
    await this.disputeService.addDisputeComment({
      disputeId: id,
      userId: dto.userId,
      text: dto.text
    }).toPromise();
  }
} 