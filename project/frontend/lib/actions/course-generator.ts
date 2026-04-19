"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import db from "@/lib/db"
import { auth } from "@/auth"

export async function generateCourseAction(topic: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { level: true, xp: true }
  })
  
  const learnerLevel = user?.level || 1

  // 1. Generate Course Structure via AI
  const { text } = await generateText({
    model: openai("gpt-4o"),
    prompt: `Generate a structured course about "${topic}". 
    CRITICAL INSTRUCTION: The user is currently at Level ${learnerLevel} in their neural journey. Scale the complexity, depth, and quiz difficulty to perfectly match a Level ${learnerLevel} cognitive profile.
    Return a JSON object with:
    {
      "title": "Course Title",
      "description": "Short description",
      "modules": [
        {
          "title": "Module Title",
          "lessons": ["Lesson 1 Title", "Lesson 2 Title"],
          "quiz": {
             "title": "Module Quiz",
             "questions": [
               { "text": "Question?", "options": ["A", "B", "C"], "correct": "A" }
             ]
          }
        }
      ]
    }`,
  })

  const courseData = JSON.parse(text)

  // 2. Persist to DB
  const course = await db.course.create({
    data: {
      title: courseData.title,
      description: courseData.description,
      instructor: "Axion Synthesis AI",
      published: true,
      modules: {
        create: courseData.modules.map((m: any, idx: number) => ({
          title: m.title,
          order: idx,
          lessons: {
            create: m.lessons.map((l: string, lIdx: number) => ({
              title: l,
              order: lIdx,
              content: `This lesson on ${l} is dynamically generated for your path.`
            }))
          },
          quizzes: {
            create: {
              title: m.quiz.title,
              questions: {
                create: m.quiz.questions.map((q: any) => ({
                  text: q.text,
                  options: JSON.stringify(q.options),
                  correctAnswer: q.correct,
                  topic: m.title
                }))
              }
            }
          }
        }))
      }
    }
  })

  // 3. Auto-enroll the user
  await db.enrollment.create({
    data: {
      userId: session.user.id,
      courseId: course.id
    }
  })

  return course.id
}
