import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CourseService } from '../../services/CourseService';
import { ICourseRepository } from '../../repositories/CourseRepository';

describe('CourseService Unit Tests', () => {
  let courseService: CourseService;
  let mockCourseRepo: ICourseRepository;

  beforeEach(() => {
    mockCourseRepo = {
      findAll: vi.fn(),
      findById: vi.fn(),
      create: vi.fn(),
      addModule: vi.fn(),
      addLesson: vi.fn(),
      addQuiz: vi.fn()
    } as any;

    courseService = new CourseService(mockCourseRepo);
  });

  describe('listAllCourses', () => {
    it('should return all courses from repo', async () => {
      const mockCourses = [{ id: '1', title: 'AI 101' }];
      vi.mocked(mockCourseRepo.findAll).mockResolvedValue(mockCourses as any);

      const result = await courseService.listAllCourses();
      
      expect(result).toEqual(mockCourses);
      expect(mockCourseRepo.findAll).toHaveBeenCalled();
    });
  });

  describe('getCourseDetails', () => {
    it('should throw error if course not found', async () => {
      vi.mocked(mockCourseRepo.findById).mockResolvedValue(null);
      
      await expect(courseService.getCourseDetails('999'))
        .rejects.toThrow('Course not found');
    });

    it('should return course if found', async () => {
      const mockCourse = { id: '1', title: 'AI 101' };
      vi.mocked(mockCourseRepo.findById).mockResolvedValue(mockCourse as any);

      const result = await courseService.getCourseDetails('1');
      
      expect(result).toEqual(mockCourse);
    });
  });
});
