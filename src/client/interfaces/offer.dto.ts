export class CreateOfferDto {
  fromUserId: string;
  toUserId: string;
  amount: number;
  currency: string;
  description?: string;
}

export class RespondToOfferDto {
  offerId: string;
  status: 'ACCEPTED' | 'REJECTED' | 'CANCELLED';
  message?: string;
} 