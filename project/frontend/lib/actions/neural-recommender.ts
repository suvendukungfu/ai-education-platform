"use server"

import db from "@/lib/db"

interface Recommendation {
  id: string
  title: string
  type: "PEAK" | "REINFORCE" | "EXPAND"
  confidence: number
}

import { generateObject } from "ai"
import { openai } from "@ai-sdk/openai"
import { z } from "zod"

const recommendationSchema = z.object({
  recommendations: z.array(z.object({
    title: z.string(),
    type: z.enum(["PEAK", "REINFORCE", "EXPAND"]),
    confidence: z.number().min(0).max(1)
  }))
})

export async function getNeuralRecommendations(userId: string): Promise<Recommendation[]> {
  const user = await db.user.findUnique({
    where: { id: userId },
    include: {
      enrollments: {
        include: { course: true }
      }
    }
  })

  if (!user) return []

  const activeCourses = user.enrollments.map(e => e.course.title)
  
  const prompt = activeCourses.length > 0
    ? `The learner (Level ${user.level}, ${user.xp} XP) is currently studying: ${activeCourses.join(", ")}. 
       Based on these subjects, suggest exactly 3 next-step courses or concepts.`
    : `Suggest exactly 3 exciting, high-level introductory AI or tech courses for a new learner.`

  try {
    const { object } = await generateObject({
      model: openai("gpt-4o"),
      schema: recommendationSchema,
      prompt,
    })

    return object.recommendations.map((item, idx) => ({
      id: `generated-rec-${idx}`,
      ...item
    }))
  } catch (error) {
    console.error("Neural Recommender Error:", error)
    return [
      { id: "fallback-1", title: "Reinforce Foundations", type: "REINFORCE", confidence: 0.9 },
      { id: "fallback-2", title: "Expand Boundaries", type: "EXPAND", confidence: 0.8 },
      { id: "fallback-3", title: "Peak Challenge", type: "PEAK", confidence: 0.7 }
    ]
  }
}

