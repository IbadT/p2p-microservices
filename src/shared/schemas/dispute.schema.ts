import { z } from 'zod';

export const disputeSchema = z.object({
  exchangeId: z.string().uuid(),
  reason: z.string().min(10).max(1000),
  evidence: z.array(z.string().url()).optional(),
}); 