import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateListingDto {
  @ApiProperty({ description: 'Listing active status', required: false })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
