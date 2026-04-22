import bcrypt from 'bcryptjs';
import { IUserRepository } from '../repositories/UserRepository';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt';

/**
 * IAuthService Interface (Interface Segregation Principle)
 * Defines the contract for authentication operations.
 */
export interface IAuthService {
  login(email: string, password: string): Promise<AuthResult>;
  register(email: string, password: string, name: string): Promise<AuthResult>;
  hashPassword(password: string): Promise<string>;
  comparePassword(password: string, hash: string): Promise<boolean>;
}

export interface AuthResult {
  accessToken: string;
  refreshToken: string;
  user: { id: string; email: string; name?: string; role?: string };
}

/**
 * AuthService (Single Responsibility + Dependency Injection)
 * Encapsulates all authentication business logic.
 * Depends on IUserRepository abstraction, not concrete implementation.
 */
export class AuthService implements IAuthService {
  private readonly SALT_ROUNDS = 12;

  constructor(private userRepo: IUserRepository) {}

  async login(email: string, password: string): Promise<AuthResult> {
    const user = await this.userRepo.findByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isValid = await this.comparePassword(password, user.password);
    if (!isValid) {
      throw new Error('Invalid credentials');
    }

    const accessToken = generateAccessToken(user.id, user.role || 'student');
    const refreshToken = generateRefreshToken(user.id);

    return {
      accessToken,
      refreshToken,
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
    };
  }

  async register(email: string, password: string, name: string): Promise<AuthResult> {
    const existing = await this.userRepo.findByEmail(email);
    if (existing) {
      throw new Error('Email already registered');
    }

    const hashedPassword = await this.hashPassword(password);
    const user = await this.userRepo.create({
      email,
      password: hashedPassword,
      name,
      role: 'student',
    });

    const accessToken = generateAccessToken(user.id, user.role || 'student');
    const refreshToken = generateRefreshToken(user.id);

    return {
      accessToken,
      refreshToken,
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
    };
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.SALT_ROUNDS);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
