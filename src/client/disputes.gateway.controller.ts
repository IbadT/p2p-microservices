import { Controller, Get, Post, Body, Query, UseGuards, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { DisputeService } from '../dispute-service/src/services/dispute.service';
// import { CreateDisputeDto } from './interfaces/dispute.dto';
import { CreateDisputeDto, ResolveDisputeDto } from './interfaces/client.swagger';

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
  async create(@Body() createDisputeDto: CreateDisputeDto) {
    return this.disputeService.createDispute(
      createDisputeDto.transactionId,
      createDisputeDto.initiatorId,
      createDisputeDto.reason
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get all disputes' })
  @ApiResponse({ status: 200, description: 'Return all disputes.' })
  async findAll() {
    return this.disputeService.getOpenDisputes();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a dispute by id' })
  @ApiResponse({ status: 200, description: 'Return the dispute.' })
  @ApiResponse({ status: 404, description: 'Dispute not found.' })
  async findOne(@Param('id') id: string) {
    return this.disputeService.getDisputesByUser(id);
  }

  @Post(':id/resolve')
  @ApiOperation({ summary: 'Resolve a dispute' })
  @ApiResponse({ status: 200, description: 'The dispute has been successfully resolved.' })
  @ApiResponse({ status: 404, description: 'Dispute not found.' })
  async resolve(@Param('id') id: string, @Body() resolveDisputeDto: ResolveDisputeDto) {
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
  async addComment(@Param('id') id: string, @Body() commentDto: any) {
    return this.disputeService.addDisputeComment(
      id,
      commentDto.moderatorId,
      commentDto.comment
    );
  }
} 