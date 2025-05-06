import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, Min } from 'class-validator';

export class CreateDepositDto {
  @ApiProperty({ description: 'ID of the user making the deposit' })
  @IsString()
  userId: string;

  @ApiProperty({ description: 'Amount to deposit' })
  @IsNumber()
  @Min(0)
  amount: number;

  @ApiProperty({ description: 'Currency of the deposit' })
  @IsString()
  currency: string;
} 