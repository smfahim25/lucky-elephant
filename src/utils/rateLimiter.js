import { RateLimiterMemory } from 'rate-limiter-flexible';

export const rateLimiter = new RateLimiterMemory({
  points: 10,   // 10 requests
  duration: 1,  // Per second
  blockDuration: 5,  // Block for 5 seconds if limits exceeded
});
