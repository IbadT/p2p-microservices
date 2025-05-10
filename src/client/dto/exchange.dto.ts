import { ApiProperty } from '@nestjs/swagger';

export class ExchangeListingDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  exchangerId: string;

  @ApiProperty()
  currency: string;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  rate: number;

  @ApiProperty()
  status: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class GetListingsResponseDto {
  @ApiProperty({ type: [ExchangeListingDto] })
  listings: ExchangeListingDto[];

  @ApiProperty()
  total: number;
}

export class ExchangeOfferDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  listingId: string;

  @ApiProperty()
  customerId: string;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  status: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class RespondOfferResponseDto {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  message: string;
}

export class ExchangeTransactionDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  offerId: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class GetActiveExchangesResponseDto {
  @ApiProperty({ type: [ExchangeTransactionDto] })
  transactions: ExchangeTransactionDto[];

  @ApiProperty()
  total: number;
}

export class ConfirmPaymentResponseDto {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  message: string;
}

export class ConfirmReceiptResponseDto {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  message: string;
}

export class CancelTransactionResponseDto {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  message: string;
}

export class SetExchangerStatusResponseDto {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  message: string;
}

export class FreezeExchangerResponseDto {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  message: string;
} 