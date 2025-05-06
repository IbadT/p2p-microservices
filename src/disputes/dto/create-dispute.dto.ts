import { IsString } from 'class-validator';

export class CreateDisputeDto {
  @IsString()
  transactionId: string;

  @IsString()
  initiatorId: string;

  @IsString()
  reason: string;
}
