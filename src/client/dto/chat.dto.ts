import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, Min } from 'class-validator';

export class CreateDisputeChatDto {
  @ApiProperty({ description: 'ID of the initiator' })
  @IsString()
  @IsNotEmpty()
  initiatorId: string;
}

export class AddModeratorDto {
  @ApiProperty({ description: 'ID of the moderator' })
  @IsString()
  @IsNotEmpty()
  moderatorId: string;
}

export class SendMessageDto {
  @ApiProperty({ description: 'ID of the sender' })
  @IsString()
  @IsNotEmpty()
  senderId: string;

  @ApiProperty({ description: 'Message content' })
  @IsString()
  @IsNotEmpty()
  content: string;
}

export class GetMessagesQueryDto {
  @ApiProperty({ description: 'ID of the user' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ description: 'Page number', default: 1 })
  @IsNumber()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @ApiProperty({ description: 'Number of items per page', default: 50 })
  @IsNumber()
  @Min(1)
  @IsOptional()
  limit?: number = 50;
}

export class GetDisputeChatQueryDto {
  @ApiProperty({ description: 'ID of the user' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ description: 'Page number', default: 1 })
  @IsNumber()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @ApiProperty({ description: 'Number of items per page', default: 20 })
  @IsNumber()
  @Min(1)
  @IsOptional()
  limit?: number = 20;
} 