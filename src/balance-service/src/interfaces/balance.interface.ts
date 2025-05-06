export enum HoldType {
  EXCHANGE_OFFER = 'EXCHANGE_OFFER',
  DISPUTE = 'DISPUTE',
  SYSTEM = 'SYSTEM'
}

export interface Balance {
  userId: string;
  cryptocurrency: string;
  amount: number;
  holds: Hold[];
}

export interface Hold {
  id: string;
  userId: string;
  cryptocurrency: string;
  amount: number;
  type: HoldType;
  relatedTransactionId?: string;
  createdAt: Date;
  releasedAt?: Date;
}

export interface BalanceUpdate {
  userId: string;
  cryptocurrency: string;
  amount: number;
}

export interface HoldCreate {
  userId: string;
  cryptocurrency: string;
  amount: number;
  type: HoldType;
  relatedTransactionId?: string;
}

export interface HoldRelease {
  holdId: string;
}

export interface Transfer {
  fromUserId: string;
  toUserId: string;
  cryptocurrency: string;
  amount: number;
} 