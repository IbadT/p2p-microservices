import { Controller, Get, Post, Body, UseGuards, Param } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiSecurity } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuditService } from '../audit/audit.service';
import { CreateAuditLogDto } from '../audit/dto/create-audit-log.dto';
import { ApiCreateAuditLog, ApiGetAllAuditLogs, ApiGetAuditLogById } from './swagger/client.swagger';

@ApiTags('Audit')
@Controller('audit')
@UseGuards(JwtAuthGuard)
@ApiSecurity('JWT-auth')
export class AuditGatewayController {
  constructor(private readonly auditService: AuditService) {}

  @Post()
  @ApiCreateAuditLog()
  async create(@Body() createAuditLogDto: CreateAuditLogDto) {
    return this.auditService.createAuditLog(createAuditLogDto);
  }

  @Get()
  @ApiGetAllAuditLogs()
  async findAll() {
    return this.auditService.getAuditLogs({ page: 1, limit: 10 });
  }

  @Get(':id')
  @ApiGetAuditLogById()
  async findOne(@Param('id') id: string) {
    const result = await this.auditService.getAuditLogs({ entityId: id, page: 1, limit: 1 });
    return result.logs[0];
  }
} 