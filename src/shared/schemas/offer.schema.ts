import { z } from 'zod';

export const offerSchema = z.object({
  fromUserId: z.string().uuid(),
  toUserId: z.string().uuid(),
  amount: z.number().positive(),
  currency: z.string().length(3),
  description: z.string().max(500).optional(),
});

export const responseSchema = z.object({
  offerId: z.string().uuid(),
  status: z.enum(['ACCEPTED', 'REJECTED', 'CANCELLED']),
  message: z.string().max(500).optional(),
}); 