import { z } from 'zod';

export const userSchema = {
  isOnline: z.boolean(),
  id: z.string().uuid(),
};

export const updateUserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email().optional(),
  name: z.string().min(2).max(50).optional(),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/).optional(),
}); 