import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import logger from '../utils/logger';
import authRoutes from '../routes/authRoutes';
import courseRoutes from '../routes/courseRoutes';
import aiRoutes from '../routes/aiRoutes';
import userRoutes from '../routes/userRoutes';
import { errorHandler } from '../middleware/errorHandler';

const app = express();

// Security
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Performance
app.use(compression());

// Logging
app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }));

// Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/users', userRoutes);

import axios from 'axios';
const AI_ENGINE_URL = process.env.AI_ENGINE_URL || 'http://localhost:8000';

// Extended Health Check
app.get('/health', async (req, res) => {
  let aiStatus = 'unreachable';
  try {
    const aiRes = await axios.get(`${AI_ENGINE_URL}/`, { timeout: 2000 });
    aiStatus = aiRes.data.status || 'online';
  } catch (err) {
    logger.warn('Health Check: AI Engine unreachable');
  }

  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    services: {
        database: 'connected',
        ai_engine: aiStatus
    }
  });
});

// Use Error Handler
app.use(errorHandler);

export default app;
