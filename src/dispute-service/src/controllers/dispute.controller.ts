import { Controller, Get, Post, Put, Body, Param, UseGuards } from '@nestjs/common';
import { DisputeService } from '../services/dispute.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { User } from '../decorators/user.decorator';

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

  @Post()
  async createDispute(
    @User('id') userId: string,
    @Body() dto: CreateDisputeDto
  ) {
    return this.disputeService.createDispute(dto.transactionId, userId, dto.reason);
  }

  @Put(':id/resolve')
  @UseGuards(RolesGuard)
  @Roles('MODERATOR', 'ADMIN')
  async resolveDispute(
    @User('id') moderatorId: string,
    @Param('id') disputeId: string,
    @Body() dto: ResolveDisputeDto
  ) {
    return this.disputeService.resolveDispute(
      disputeId,
      moderatorId,
      dto.resolution,
      dto.winnerUserId
    );
  }

  @Get('my')
  async getMyDisputes(@User('id') userId: string) {
    return this.disputeService.getDisputesByUser(userId);
  }

  @Get('open')
  @UseGuards(RolesGuard)
  @Roles('MODERATOR', 'ADMIN')
  async getOpenDisputes() {
    return this.disputeService.getOpenDisputes();
  }
} 