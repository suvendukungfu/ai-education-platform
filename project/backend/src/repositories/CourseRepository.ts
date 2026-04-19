import { Course } from "@prisma/client";
import { BaseRepository } from "./BaseRepository";

export interface ICourseRepository {
  findAll(): Promise<Course[]>;
  findById(id: string): Promise<Course | null>;
  create(data: any): Promise<Course>;
  addModule(courseId: string, data: any): Promise<any>;
  addLesson(moduleId: string, data: any): Promise<any>;
  addQuiz(moduleId: string, data: any): Promise<any>;
}

export class CourseRepository extends BaseRepository<Course> implements ICourseRepository {
  constructor() {
    super();
  }

  async findAll(): Promise<Course[]> {
    return this.db.course.findMany({
      include: {
        _count: { select: { enrollments: true, modules: true } }
      }
    });
  }

  async findById(id: string): Promise<Course | null> {
    return this.db.course.findUnique({
      where: { id },
      include: {
        modules: {
          orderBy: { order: 'asc' },
          include: {
            lessons: { orderBy: { order: 'asc' } },
            quizzes: true
          }
        }
      }
    });
  }

  async create(data: any): Promise<Course> {
    return this.db.course.create({ data });
  }

  async delete(id: string): Promise<void> {
    await this.db.course.delete({ where: { id } });
  }

  async addModule(courseId: string, data: any): Promise<any> {
    return this.db.module.create({
      data: { ...data, courseId }
    });
  }

  async addLesson(moduleId: string, data: any): Promise<any> {
    return this.db.lesson.create({
      data: { ...data, moduleId }
    });
  }

  async addQuiz(moduleId: string, data: any): Promise<any> {
    return this.db.quiz.create({
      data: { ...data, moduleId }
    });
  }
}
