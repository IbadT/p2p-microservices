import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, Min } from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty({ description: 'ID of the offer to create a transaction for' })
  @IsString()
  offerId: string;

  @ApiProperty({ description: 'Amount to exchange' })
  @IsNumber()
  @Min(0)
  amount: number;
}
