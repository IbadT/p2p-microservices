import { Controller, Get, Post, Body, UseGuards, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuditService } from '../audit/audit.service';
import { CreateAuditLogDto } from '../audit/dto/create-audit-log.dto';

@ApiTags('audit')
@Controller('audit')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AuditGatewayController {
  constructor(private readonly auditService: AuditService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new audit log' })
  @ApiResponse({ status: 201, description: 'The audit log has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async create(@Body() createAuditLogDto: CreateAuditLogDto) {
    return this.auditService.createAuditLog(createAuditLogDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all audit logs' })
  @ApiResponse({ status: 200, description: 'Return all audit logs.' })
  async findAll() {
    return this.auditService.getAuditLogs({ page: 1, limit: 10 });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an audit log by id' })
  @ApiResponse({ status: 200, description: 'Return the audit log.' })
  @ApiResponse({ status: 404, description: 'Audit log not found.' })
  async findOne(@Param('id') id: string) {
    const result = await this.auditService.getAuditLogs({ entityId: id, page: 1, limit: 1 });
    return result.logs[0];
  }
} 