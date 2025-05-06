import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, Min, Max, IsNotEmpty } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({ description: 'ID of the transaction being reviewed' })
  @IsString()
  @IsNotEmpty()
  transactionId: string;

  @ApiProperty({ description: 'ID of the user being reviewed' })
  @IsString()
  @IsNotEmpty()
  authorId: string;

  @ApiProperty({ description: 'ID of the user being reviewed' })
  @IsString()
  @IsNotEmpty()
  targetId: string;

  @ApiProperty({ description: 'Rating from 1 to 5' })
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({ description: 'Review comment', required: false })
  @IsString()
  @IsNotEmpty()
  comment: string;
}
