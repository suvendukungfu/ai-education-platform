import { Request, Response, NextFunction } from 'express';
import { redis } from '../config/redis'; // Assuming redis client is in config/redis
import logger from '../utils/logger';

const WINDOW_SIZE_IN_SECONDS = 60;
const MAX_WINDOW_REQUEST_COUNT = 10; // Simple limit for AI endpoints

export const rateLimiter = async (req: Request, res: Response, next: NextFunction) => {
  if (!redis) {
    logger.warn('Redis not available, skipping rate limiting');
    return next();
  }

  try {
    const userId = (req as any).user?.id || req.ip;
    const key = `ratelimit:${req.path}:${userId}`;
    const requests = await redis.incr(key);

    if (requests === 1) {
      await redis.expire(key, WINDOW_SIZE_IN_SECONDS);
    }

    if (requests > MAX_WINDOW_REQUEST_COUNT) {
      return res.status(429).json({ 
        message: 'Too many requests. Please slow down and trust the neural process.',
        retryAfter: WINDOW_SIZE_IN_SECONDS
      });
    }

    next();
  } catch (error) {
    logger.error('Rate Limiter Error:', error);
    next(); // Fail open for reliability but log the error
  }
};
