import { User } from "@prisma/client";
import { BaseRepository } from "./BaseRepository";

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  create(data: any): Promise<User>;
  findById(id: string): Promise<User | null>;
  findRecommendations(weakTopics: string[]): Promise<any[]>;
}

export class UserRepository extends BaseRepository<User> implements IUserRepository {
  constructor() {
    super();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.db.user.findUnique({ where: { email } });
  }

  async create(data: any): Promise<User> {
    return this.db.user.create({ data });
  }

  async findById(id: string): Promise<User | null> {
    return this.db.user.findUnique({ where: { id } });
  }

  async findAll(): Promise<User[]> {
    return this.db.user.findMany();
  }

  async delete(id: string): Promise<void> {
    await this.db.user.delete({ where: { id } });
  }

  async findRecommendations(weakTopics: string[]): Promise<any[]> {
    // Basic recommendation logic (Polymorphic extension)
    return this.db.course.findMany({
      where: {
        OR: weakTopics.map(topic => ({
          description: { contains: topic }
        }))
      },
      take: 3
    });
  }
}
