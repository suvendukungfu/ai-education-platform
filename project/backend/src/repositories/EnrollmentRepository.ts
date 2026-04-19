import { PrismaClient } from '@prisma/client';
import prisma from '../config/db';

export interface IEnrollmentRepository {
  create(userId: string, courseId: string): Promise<any>;
  findByUser(userId: string): Promise<any[]>;
  upsertProgress(enrollmentId: string, lessonId: string, completed: boolean): Promise<any>;
}

export class EnrollmentRepository implements IEnrollmentRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  async create(userId: string, courseId: string) {
    return await this.prisma.enrollment.create({
      data: { userId, courseId }
    });
  }

  async findByUser(userId: string) {
    return await this.prisma.enrollment.findMany({
      where: { userId },
      include: {
        course: {
          include: {
            _count: { select: { modules: true } },
            modules: { include: { quizzes: true } }
          }
        },
        progress: true
      }
    });
  }

  async upsertProgress(enrollmentId: string, lessonId: string, completed: boolean) {
    return await this.prisma.progress.upsert({
      where: {
        enrollmentId_lessonId: { enrollmentId, lessonId }
      },
      update: { completed },
      create: { enrollmentId, lessonId, completed }
    });
  }
}
