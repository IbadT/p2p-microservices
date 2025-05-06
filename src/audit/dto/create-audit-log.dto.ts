import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { AuditAction } from '../enums/audit-action.enum';

export class CreateAuditLogDto {
  @ApiProperty({ description: 'ID of the user performing the action' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ description: 'Type of action performed', enum: AuditAction })
  @IsEnum(AuditAction)
  action: AuditAction;

  @ApiProperty({ description: 'Entity type affected by the action' })
  @IsString()
  @IsNotEmpty()
  entityType: string;

  @ApiProperty({ description: 'ID of the entity affected by the action' })
  @IsString()
  @IsNotEmpty()
  entityId: string;

  @ApiProperty({ description: 'Additional details about the action' })
  @IsString()
  @IsNotEmpty()
  details: string;

  @ApiProperty({ description: 'IP address of the user' })
  @IsString()
  @IsNotEmpty()
  ipAddress: string;
} 