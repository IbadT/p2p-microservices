export interface Dispute {
  id: string;
  transactionId: string;
  initiatorId: string;
  reason: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  resolution?: string;
  winnerUserId?: string;
  moderatorId?: string;
  createdAt: Date;
  updatedAt: Date;
} 