import { Router } from 'express';
import { UserController, UserService } from '../controllers/UserController';
import { UserRepository } from '../repositories/UserRepository';
import { authenticate } from '../middleware/auth';

// Dependency Injection
const userRepo = new UserRepository();
const userService = new UserService(userRepo);
const userController = new UserController(userService);

const router = Router();

router.get('/me', authenticate, userController.getMe);
router.get('/recommendations', authenticate, userController.getRecommendations);

export default router;
