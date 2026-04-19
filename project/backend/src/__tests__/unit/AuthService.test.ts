import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthService } from '../../services/AuthService';
import { IUserRepository } from '../../repositories/UserRepository';
import bcrypt from 'bcryptjs';
import * as jwtUtils from '../../utils/jwt';

describe('AuthService Unit Tests', () => {
  let authService: AuthService;
  let mockUserRepo: IUserRepository;

  beforeEach(() => {
    mockUserRepo = {
      findByEmail: vi.fn(),
      create: vi.fn(),
      findById: vi.fn(),
      findRecommendations: vi.fn()
    } as any;

    authService = new AuthService(mockUserRepo);
  });

  describe('login', () => {
    it('should return tokens for valid credentials', async () => {
      const mockUser = {
        id: 'user-1',
        email: 'test@example.com',
        password: await bcrypt.hash('password123', 10),
        role: 'STUDENT'
      };

      vi.mocked(mockUserRepo.findByEmail).mockResolvedValue(mockUser as any);
      
      const result = await authService.login('test@example.com', 'password123');
      
      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('refreshToken');
      expect(result.user.email).toBe('test@example.com');
    });

    it('should throw error for non-existent user', async () => {
      vi.mocked(mockUserRepo.findByEmail).mockResolvedValue(null);
      
      await expect(authService.login('unknown@test.com', 'pass'))
        .rejects.toThrow('Invalid credentials');
    });

    it('should throw error for invalid password', async () => {
      const mockUser = {
        id: 'user-1',
        password: await bcrypt.hash('correct', 10)
      };
      
      vi.mocked(mockUserRepo.findByEmail).mockResolvedValue(mockUser as any);
      
      await expect(authService.login('test@test.com', 'wrong'))
        .rejects.toThrow('Invalid credentials');
    });
  });

  describe('register', () => {
    it('should hash password and create user', async () => {
      vi.mocked(mockUserRepo.findByEmail).mockResolvedValue(null);
      vi.mocked(mockUserRepo.create).mockResolvedValue({ id: 'new-id', email: 'new@test.com' } as any);

      const result = await authService.register('new@test.com', 'pass123', 'New User');
      
      expect(mockUserRepo.create).toHaveBeenCalled();
      expect(result.user.email).toBe('new@test.com');
    });
  });
});
