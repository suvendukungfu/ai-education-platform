import app from './config/express';
import logger from './utils/logger';
import dotenv from 'dotenv';
import prisma from './config/db';
import { connectRedis } from './config/redis';

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await prisma.$connect();
    logger.info('Connected to Database successfully');

    await connectRedis();
    logger.info('Connected to Redis successfully');
    
    app.listen(PORT, () => {
      logger.info(`Backend Server running on port ${PORT}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
