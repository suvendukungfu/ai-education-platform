import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';

const authController = new AuthController();
const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh', authController.refreshToken);

export default router;
