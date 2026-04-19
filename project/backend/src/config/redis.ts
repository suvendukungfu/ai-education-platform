import { createClient } from 'redis';
import logger from '../utils/logger';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

const client = createClient({
  url: redisUrl
});

client.on('error', (err: any) => logger.error('Redis Client Error:', err));
client.on('connect', () => logger.info('Redis Client Connected'));

// Note: In modern redis package, we must connect explicitly.
// But we'll export the client and handle the connection in the app's startup.

export const redis = client;

export const connectRedis = async () => {
    try {
        await client.connect();
    } catch (error) {
        logger.error('Redis Connection Failed (Retrying...):', error);
    }
};
