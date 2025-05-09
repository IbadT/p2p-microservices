import { UserRole } from '@prisma/client';

export interface Comment {
  id: string;
  disputeId: string;
  userId: string;
  text: string;
  isModerator: boolean;
  createdAt: string;
  user: {
    id: string;
    name: string;
    role: UserRole;
  };
} 