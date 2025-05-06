import { RateLimitConfig } from '../shared/guards/rate-limit.guard';

export const rateLimitConfig: Record<string, RateLimitConfig> = {
  default: {
    window: 60000, // 1 minute
    limit: 100,
  },
  auth: {
    window: 300000, // 5 minutes
    limit: 5,
  },
  api: {
    window: 60000, // 1 minute
    limit: 1000,
  },
}; 