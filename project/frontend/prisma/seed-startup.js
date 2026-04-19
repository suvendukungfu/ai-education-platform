/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require("@prisma/client")
const bcrypt = require("bcryptjs")
const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash("password123", 12)

  // Clear existing to avoid conflicts during testing
  await prisma.quizAttempt.deleteMany({})
  await prisma.quiz.deleteMany({})
  await prisma.enrollment.deleteMany({})
  await prisma.course.deleteMany({})

  console.log("Cleared old data for startup sync...")

  const student = await prisma.user.upsert({
    where: { email: "student@example.com" },
    update: { 
      referralCode: "STUDENT1000",
      subscriptionTier: "FREE"
    },
    create: {
      email: "student@example.com",
      name: "Alex Neural",
      password: hashedPassword,
      role: "STUDENT",
      referralCode: "STUDENT1000",
    },
  })

  const course = await prisma.course.create({
    data: {
      title: "Generative AI Masterclass",
      description: "Master LLMs, Diffusion, and RAG architectures from the ground up.",
      instructor: "Dr. Axion",
      published: true,
      category: "AI & Engineering",
      thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
      modules: {
        create: [
          {
            title: "Neural Architectures",
            order: 1,
            lessons: {
              create: [
                { title: "Attention is All You Need", order: 1, content: "The paper that started it all..." },
                { title: "Vector Embeddings & RAG", order: 2, content: "How to give AI long-term memory..." }
              ]
            },
            quizzes: {
              create: [
                {
                  title: "Neural Architecture Assessment",
                  description: "Test your understanding of transformers and vector space.",
                  questions: {
                    create: [
                      {
                        text: "Which component is responsible for the 'attention' mechanism?",
                        options: JSON.stringify(["Softmax Layer", "Multi-Head Attention", "Positional Encoding", "Query-Key Mapping"]),
                        correctAnswer: "Multi-Head Attention",
                        explanation: "Multi-head attention allows the model to jointly attend to information from different representation subspaces.",
                        topic: "Transformers"
                      },
                      {
                        text: "What does 'RAG' stand for in AI engineering?",
                        options: JSON.stringify(["Rapid AI Generation", "Retrieval-Augmented Generation", "Random Access Graphics", "Recursive Analog Grid"]),
                        correctAnswer: "Retrieval-Augmented Generation",
                        explanation: "RAG combines retrieval from an external knowledge base with generative modeling.",
                        topic: "RAG"
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  })

  // Auto-enroll the student for testing
  await prisma.enrollment.create({
    data: {
      userId: student.id,
      courseId: course.id
    }
  })

  console.log("Startup seed successful: alex_neural@example.com ready.")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
