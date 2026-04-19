/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

async function main() {
  // Find a course and module to attach the quiz to
  const course = await prisma.course.findFirst({
    include: { modules: true }
  })

  if (!course || course.modules.length === 0) {
    console.log("No courses found. Seed courses first.")
    return
  }

  const moduleId = course.modules[0].id

  const quiz = await prisma.quiz.create({
    data: {
      title: "Neural Architecture Assessment",
      description: "Test your understanding of complex AI systems and RAG pipelines.",
      moduleId: moduleId,
      questions: {
        create: [
          {
            text: "What is the primary function of a Vector Database in a RAG pipeline?",
            options: JSON.stringify([
              "To store structured relational data",
              "To enable semantic similarity search",
              "To act as a primary cache for user sessions",
              "To manage GPU memory allocation"
            ]),
            correctAnswer: "To enable semantic similarity search",
            explanation: "Vector databases store embeddings and allow for high-speed similarity searches, which are critical for retrieving relevant context in RAG.",
            topic: "RAG & Vector DB"
          },
          {
            text: "Which metric is commonly used to measure the similarity between two vector embeddings?",
            options: JSON.stringify([
              "Euclidean Distance",
              "Cosine Similarity",
              "Hamming Distance",
              "All of the above"
            ]),
            correctAnswer: "All of the above",
            explanation: "While Cosine Similarity is most common in NLP, Euclidean and Manhattan distances are also used depending on the model.",
            topic: "Embeddings"
          }
        ]
      }
    }
  })

  console.log(`Quiz seeded: ${quiz.title}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
