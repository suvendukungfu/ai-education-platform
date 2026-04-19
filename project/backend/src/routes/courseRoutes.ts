import { Router } from 'express';
import { CourseController } from '../controllers/CourseController';
import { CourseService } from '../services/CourseService';
import { CourseRepository } from '../repositories/CourseRepository';
import { EnrollmentRepository } from '../repositories/EnrollmentRepository';
import { authenticate } from '../middleware/auth';

// Dependency Injection Composition Root
const courseRepo = new CourseRepository();
const enrollmentRepo = new EnrollmentRepository();
const courseService = new CourseService(courseRepo);
const courseController = new CourseController(courseService, enrollmentRepo);

const router = Router();

router.get('/', courseController.getCourses);
router.get('/enrolled', authenticate, courseController.getEnrolledCourses);
router.get('/:id', courseController.getCourseById);
router.post('/enroll', authenticate, courseController.enrollInCourse);
router.post('/progress', authenticate, courseController.updateProgress);

export default router;
