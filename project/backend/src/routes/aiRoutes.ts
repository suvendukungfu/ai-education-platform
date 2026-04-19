import { Router } from 'express';
import { AIController } from '../controllers/AIController';
import { AIService } from '../services/AIService';
import { CourseService } from '../services/CourseService';
import { CourseRepository } from '../repositories/CourseRepository';
import { authenticate } from '../middleware/auth';
import { rateLimiter } from '../middleware/rateLimiter';
import multer from 'multer';

// Dependency Injection Composition Root
const aiService = new AIService();
const courseRepo = new CourseRepository();
const courseService = new CourseService(courseRepo);
const aiController = new AIController(aiService, courseService);

const upload = multer({ dest: 'uploads/' });
const router = Router();

router.post('/chat', authenticate, rateLimiter, aiController.chatWithTutor);
router.post('/forge', authenticate, rateLimiter, aiController.startForge);
router.post('/ingest', authenticate, upload.single('file'), aiController.ingestMaterials);

export default router;
