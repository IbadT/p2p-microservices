import { Controller, Get, Post, Body, Query, UseGuards, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiProperty } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { DisputeService } from '../dispute-service/src/services/dispute.service';
// import { CreateDisputeDto } from './interfaces/dispute.dto';
import { CreateDisputeDto, ResolveDisputeDto } from './interfaces/client.swagger';
import { Dispute, ExchangeTransaction, User } from '@prisma/client';

export interface DisputeWithRelations extends Dispute {
  transaction: ExchangeTransaction & {
    customer: Pick<User, 'id' | 'email'>;
    exchanger: Pick<User, 'id' | 'email'>;
  };
}

export class DisputeCommentDto {
  @ApiProperty({ description: 'ID модератора', example: '123e4567-e89b-12d3-a456-426614174000' })
  moderatorId: string;

  @ApiProperty({ description: 'Текст комментария', example: 'Пожалуйста, предоставьте доказательства оплаты' })
  comment: string;
}

@ApiTags('disputes')
@Controller('disputes')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class DisputesGatewayController {
  constructor(private readonly disputeService: DisputeService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new dispute' })
  @ApiResponse({ status: 201, description: 'The dispute has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async create(@Body() createDisputeDto: CreateDisputeDto): Promise<Dispute> {
    return this.disputeService.createDispute(
      createDisputeDto.transactionId,
      createDisputeDto.initiatorId,
      createDisputeDto.reason
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get all disputes' })
  @ApiResponse({ status: 200, description: 'Return all disputes.' })
  async findAll(): Promise<DisputeWithRelations[]> {
    return this.disputeService.getOpenDisputes();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a dispute by id' })
  @ApiResponse({ status: 200, description: 'Return the dispute.' })
  @ApiResponse({ status: 404, description: 'Dispute not found.' })
  async findOne(@Param('id') id: string): Promise<DisputeWithRelations[]> {
    return this.disputeService.getDisputesByUser(id);
  }

  @Post(':id/resolve')
  @ApiOperation({ summary: 'Resolve a dispute' })
  @ApiResponse({ status: 200, description: 'The dispute has been successfully resolved.' })
  @ApiResponse({ status: 404, description: 'Dispute not found.' })
  async resolve(@Param('id') id: string, @Body() resolveDisputeDto: ResolveDisputeDto): Promise<void> {
    return this.disputeService.resolveDispute(
      id,
      resolveDisputeDto.moderatorId,
      resolveDisputeDto.resolution,
      resolveDisputeDto.winnerUserId
    );
  }

  @Post(':id/comment')
  @ApiOperation({ summary: 'Add a comment to a dispute' })
  @ApiResponse({ status: 200, description: 'The comment has been successfully added.' })
  @ApiResponse({ status: 404, description: 'Dispute not found.' })
  async addComment(@Param('id') id: string, @Body() commentDto: DisputeCommentDto): Promise<void> {
    return this.disputeService.addDisputeComment(
      id,
      commentDto.moderatorId,
      commentDto.comment
    );
  }
} 