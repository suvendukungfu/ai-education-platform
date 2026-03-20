import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash("password123", 12)

  const student = await prisma.user.upsert({
    where: { email: "student@example.com" },
    update: {},
    create: {
      email: "student@example.com",
      name: "Student User",
      password: hashedPassword,
      role: "STUDENT",
    },
  })

  const faculty = await prisma.user.upsert({
    where: { email: "faculty@example.com" },
    update: {},
    create: {
      email: "faculty@example.com",
      name: "Prof. AI expert",
      password: hashedPassword,
      role: "FACULTY",
    },
  })

  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      name: "Platform Admin",
      password: hashedPassword,
      role: "ADMIN",
    },
  })

  const course1 = await prisma.course.create({
    data: {
      title: "Generative AI Masterclass",
      description: "From transformers to diffusion models, master the whole GenAI stack.",
      instructor: "Prof. AI Expert",
      published: true,
      modules: {
        create: [
          {
            title: "Introduction to NLP",
            order: 1,
            lessons: {
              create: [
                { title: "Tokens and Embeddings", order: 1, content: "Lesson content on tokens..." },
                { title: "The Transformer Architecture", order: 2, content: "Deep dive into transformers..." }
              ]
            }
          }
        ]
      }
    }
  })

  console.log("Seed data created successfully!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
