import { PrismaClient } from "@prisma/client";
import prisma from "../config/db";

/**
 * BaseRepository (Abstraction/Inheritance Pattern)
 * Provides common database operations and encapsulates implementation details.
 */
export abstract class BaseRepository<T> {
  protected db: PrismaClient;

  constructor() {
    this.db = prisma;
  }

  // Common Abstractions
  abstract findById(id: string): Promise<T | null>;
  abstract findAll(): Promise<T[]>;
  abstract delete(id: string): Promise<void>;
}
