import { ICourseRepository } from '../repositories/CourseRepository';

export class CourseService {
  constructor(private courseRepo: ICourseRepository) {}

  async listAllCourses() {
    return await this.courseRepo.findAll();
  }

  async getCourseDetails(id: string) {
    const course = await this.courseRepo.findById(id);
    if (!course) {
      throw new Error('Course not found');
    }
    return course;
  }

  async createForgedCourse(structure: any, userId: string) {
    // Business logic logic for creation and auto-enrollment
    // (This would normally call the EnrollmentRepository too)
    return await this.courseRepo.create({
      title: structure.title,
      description: structure.description,
      published: true,
      category: structure.topic || 'General AI',
      instructor: 'Axion AI',
      modules: {
        create: structure.modules.map((m: any, i: number) => ({
          title: m.title,
          order: i + 1,
          lessons: {
            create: m.lessons.map((l: any, j: number) => ({
              title: l.title,
              order: j + 1,
              content: l.content
            }))
          }
        }))
      }
    });
  }
}
