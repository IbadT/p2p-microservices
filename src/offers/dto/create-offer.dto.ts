import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, Min } from 'class-validator';

export class CreateOfferDto {
  @ApiProperty({ description: 'ID of the listing to create an offer for' })
  @IsString()
  listingId: string;

  @ApiProperty({ description: 'Amount to exchange' })
  @IsNumber()
  @Min(0)
  amount: number;
}
