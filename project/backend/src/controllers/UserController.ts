import { Request, Response, NextFunction } from 'express';
import { IUserRepository } from '../repositories/UserRepository';

export class UserService {
  constructor(private userRepo: IUserRepository) {}

  async getUserProfile(id: string) {
    const user = await this.userRepo.findById(id);
    if (!user) throw new Error('User not found');
    return user;
  }

  async getAiRecommendations(id: string) {
    const user = await this.userRepo.findById(id);
    const weakTopicsList = user?.weakTopics ? user.weakTopics.split(',') : [];
    return await this.userRepo.findRecommendations(weakTopicsList);
  }
}

export class UserController {
  constructor(private userService: UserService) {}

  getMe = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user.id;
      const user = await this.userService.getUserProfile(userId);
      res.json(user);
    } catch (error) {
      next(error);
    }
  };

  getRecommendations = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user.id;
      const recommendations = await this.userService.getAiRecommendations(userId);
      res.json(recommendations);
    } catch (error) {
      next(error);
    }
  };
}
