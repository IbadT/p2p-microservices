import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateDisputeDto {
  @ApiProperty({ description: 'ID of the transaction to create a dispute for' })
  @IsString()
  @IsNotEmpty()
  transactionId: string;

  @ApiProperty({ description: 'Reason for the dispute' })
  @IsString()
  @IsNotEmpty()
  reason: string;
} 