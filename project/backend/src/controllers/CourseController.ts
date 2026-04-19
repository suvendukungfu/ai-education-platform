import { Request, Response, NextFunction } from 'express';
import { CourseService } from '../services/CourseService';
import { IEnrollmentRepository } from '../repositories/EnrollmentRepository';

export class CourseController {
  constructor(
    private courseService: CourseService,
    private enrollmentRepo: IEnrollmentRepository
  ) {}

  getCourses = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courses = await this.courseService.listAllCourses();
      res.json(courses);
    } catch (error) {
      next(error);
    }
  };

  getCourseById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const course = await this.courseService.getCourseDetails(id);
      res.json(course);
    } catch (error) {
      next(error);
    }
  };

  enrollInCourse = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId } = req.body;
      const userId = (req as any).user.id;
      const enrollment = await this.enrollmentRepo.create(userId, courseId);
      res.status(201).json(enrollment);
    } catch (error) {
      if ((error as any).code === 'P2002') {
        return res.status(400).json({ message: 'Already enrolled' });
      }
      next(error);
    }
  };

  getEnrolledCourses = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user.id;
      const enrollments = await this.enrollmentRepo.findByUser(userId);
      res.json(enrollments);
    } catch (error) {
      next(error);
    }
  };

  updateProgress = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { enrollmentId, lessonId, completed } = req.body;
      const progress = await this.enrollmentRepo.upsertProgress(enrollmentId, lessonId, completed);
      res.json(progress);
    } catch (error) {
      next(error);
    }
  };
}
