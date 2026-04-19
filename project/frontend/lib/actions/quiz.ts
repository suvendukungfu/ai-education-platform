"use server"

import { auth } from "@/auth"
import db from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function submitQuizAttempt({
  quizId,
  answers
}: {
  quizId: string
  answers: { questionId: string, answer: string }[]
}) {
  const session = await auth()
  if (!session?.user?.id) return { error: "Unauthorized" }

  try {
    const userId = session.user.id
    
    // Fetch quiz questions
    const quiz = await db.quiz.findUnique({
      where: { id: quizId },
      include: { questions: true }
    })

    if (!quiz) return { error: "Quiz not found" }

    let correctCount = 0
    const failedTopics: string[] = []

    quiz.questions.forEach((q) => {
      const userAnswer = answers.find((a) => a.questionId === q.id)?.answer
      if (userAnswer === q.correctAnswer) {
        correctCount++
      } else if (q.topic) {
        failedTopics.push(q.topic)
      }
    })

    const score = Math.round((correctCount / quiz.questions.length) * 100)
    const passed = score >= 70

    // Save Attempt
    const attempt = await db.quizAttempt.create({
      data: {
        userId,
        quizId,
        score,
        passed,
        feedback: passed ? "Target mastery reached. Moving to next module." : "System suggests specific review of identified cognitive gaps."
      }
    })

    // Update Weak Topics (Adaptive Logic)
    if (failedTopics.length > 0) {
      const user = await db.user.findUnique({ where: { id: userId }, select: { weakTopics: true } })
      let currentWeakTopics: string[] = []
      try {
        currentWeakTopics = user?.weakTopics ? JSON.parse(user.weakTopics) : []
      } catch (e) {
        currentWeakTopics = []
      }

      // Merge and unique
      const updatedTopics = Array.from(new Set([...currentWeakTopics, ...failedTopics]))
      
      await db.user.update({
        where: { id: userId },
        data: { weakTopics: JSON.stringify(updatedTopics) }
      })
    }

    // Award XP
    let xpAmount = 50
    if (passed) xpAmount += 100
    
    // Reusing the awardXP logic indirectly (or calling it)
    await db.user.update({
      where: { id: userId },
      data: {
        xp: { increment: xpAmount },
      }
    })

    revalidatePath("/dashboard")
    revalidatePath(`/courses/${quiz.moduleId}`)

    return { success: true, score, passed, attemptId: attempt.id }
  } catch (error) {
    console.error("SUBMIT_QUIZ_ERROR", error)
    return { error: "Failed to submit quiz" }
  }
}
