"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { auth } from "@/auth"

export async function chatWithNeuralTutor(messages: any[], mode: 'GENERAL' | 'CODING' | 'MATH' = 'GENERAL') {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const systemPrompts = {
    GENERAL: "You are the Axion Core AI. You are futuristic, intelligent, and motivating. Use technical but accessible language. Keep responses concise.",
    CODING: "You are the Axion Syntax Architect. You are an expert engineer. Provide clean code snippets, explain complexity, and focus on best practices.",
    MATH: "You are the Axion Scalar Intelligence. You explain mathematical concepts with visual logic and step-by-step proofs. Focus on intuition first."
  }

  const { text } = await generateText({
    model: openai("gpt-4o"),
    system: systemPrompts[mode],
    messages: messages,
  })

  return text
}
