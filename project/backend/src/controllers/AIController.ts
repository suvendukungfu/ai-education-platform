import { Request, Response, NextFunction } from 'express';
import { IAIService } from '../services/AIService';
import { CourseService } from '../services/CourseService';
import prisma from '../config/db';

export class AIController {
  constructor(
    private aiService: IAIService,
    private courseService: CourseService
  ) {}

  chatWithTutor = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId, question, conversationId } = req.body;
      const userId = (req as any).user.id;

      const result = await this.aiService.queryTutor(courseId, question, conversationId);

      await prisma.chatHistory.createMany({
        data: [
          { userId, content: question, role: 'user', courseId },
          { userId, content: result.answer, role: 'assistant', courseId }
        ]
      });

      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  startForge = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { topic, level } = req.body;
      const userId = (req as any).user.id;

      const structure = await this.aiService.forgeCourse(topic, level);
      const course = await this.courseService.createForgedCourse({ ...structure, topic }, userId);

      await prisma.enrollment.create({
        data: { userId, courseId: course.id }
      });

      res.status(201).json(course);
    } catch (error) {
      next(error);
    }
  };

  ingestMaterials = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId } = req.body;
      const file = req.file;

      if (!file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      const result = await this.aiService.ingestMaterials(courseId, file.path);
      res.json(result);
    } catch (error) {
      next(error);
    }
  };
}
