import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.chatHistory.deleteMany({})
  await prisma.progress.deleteMany({})
  await prisma.enrollment.deleteMany({})
  await prisma.lesson.deleteMany({})
  await prisma.module.deleteMany({})
  await prisma.course.deleteMany({})
  await prisma.userBadge.deleteMany({})
  await prisma.user.deleteMany({})

  const hashedPassword = await bcrypt.hash("password123", 12)

  // ---------------------------------------------------------------------------
  // USERS
  // ---------------------------------------------------------------------------
  const student = await prisma.user.create({
    data: {
      email: "student@example.com",
      name: "Alex Learner",
      password: hashedPassword,
      role: "STUDENT",
      xp: 450,
      level: 3,
      streak: 5,
      badges: {
        create: [
          { type: 'STREAK_5', name: 'High Frequency', icon: 'flame' },
          { type: 'AI_FIRST', name: 'Neural Pioneer', icon: 'zap' }
        ]
      }
    },
  })

  await prisma.user.create({
    data: {
      email: "faculty@example.com",
      name: "Dr. Neural",
      password: hashedPassword,
      role: "FACULTY",
    },
  })

  const admin = await prisma.user.create({
    data: {
      email: "admin@example.com",
      name: "Platform Overlord",
      password: hashedPassword,
      role: "ADMIN",
    },
  })

  // ---------------------------------------------------------------------------
  // COURSE 1: LLM ENGINEERING
  // ---------------------------------------------------------------------------
  const course1 = await prisma.course.create({
    data: {
      title: "LLM Engineering & RAG Architectures",
      description: "Master the art of building production-grade LLM applications with LangChain, Pinecone, and advanced RAG.",
      instructor: "Dr. Neural",
      published: true,
      category: "AI Engineering",
      thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop",
      modules: {
        create: [
          {
            title: "Foundations of Large Language Models",
            order: 1,
            lessons: {
              create: [
                { title: "Transformers and Self-Attention", order: 1, content: "Comprehensive deep dive into the transformer architecture." },
                { title: "Prompt Engineering Best Practices", order: 2, content: "Mastering zero-shot, few-shot, and chain-of-thought prompting." }
              ]
            }
          },
          {
            title: "Advanced RAG Implementations",
            order: 2,
            lessons: {
              create: [
                { title: "Vector Databases & Semantic Search", order: 1, content: "Implementing Pinecone and Milvus for efficient retrieval." },
                { title: "Hybrid Search & Re-ranking", order: 2, content: "Optimizing retrieval accuracy with cross-encoders." }
              ]
            }
          }
        ]
      }
    }
  })

  // ---------------------------------------------------------------------------
  // COURSE 2: RUST FOR SYSTEMS PROGRAMMING
  // ---------------------------------------------------------------------------
  const course2 = await prisma.course.create({
    data: {
      title: "Advanced Systems Programming with Rust",
      description: "Learn memory safety without a garbage collector. Build high-performance, concurrent systems.",
      instructor: "Ferris McRust",
      published: true,
      category: "Systems Engineering",
      thumbnail: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=800&auto=format&fit=crop",
      modules: {
        create: [
          {
            title: "Ownership & Borrowing",
            order: 1,
            lessons: {
              create: [
                { title: "The Borrow Checker", order: 1, content: "Understanding how Rust ensures memory safety at compile time." },
                { title: "Smart Pointers (Box, Rc, Arc)", order: 2, content: "Managing memory explicitly with Rust smart pointers." }
              ]
            }
          }
        ]
      }
    }
  })

  // ---------------------------------------------------------------------------
  // ENROLLMENTS & INITIAL PROGRESS
  // ---------------------------------------------------------------------------
  const enrollment = await prisma.enrollment.create({
    data: {
      userId: student.id,
      courseId: course1.id,
    }
  })

  console.log("🚀 Senior Level Seed Data Injected Successfully!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
