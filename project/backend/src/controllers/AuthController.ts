import { Request, Response, NextFunction } from 'express';
import prisma from '../config/db';
import bcrypt from 'bcryptjs';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt';

export class AuthController {
  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password, name } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const user = await prisma.user.create({
        data: { email, password: hashedPassword, name, role: 'student' }
      });

      res.status(201).json({ id: user.id, email: user.email });
    } catch (error) {
      if ((error as any).code === 'P2002') {
        return res.status(400).json({ message: 'Email already exists' });
      }
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user || !user.password) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // FIX: Added 'role' argument to generateAccessToken
      const accessToken = generateAccessToken(user.id, user.role || 'student');
      const refreshToken = generateRefreshToken(user.id);

      res.json({ accessToken, refreshToken, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
    } catch (error) {
      next(error);
    }
  };

  refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    res.status(501).json({ message: 'Not implemented' });
  };
}
