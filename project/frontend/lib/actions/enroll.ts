"use server"

import { auth } from "@/auth"
import db from "@/lib/db"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export async function enrollInCourse(courseId: string) {
  const session = await auth()

  if (!session?.user?.id) {
    redirect("/login")
  }

  try {
    const userId = session.user.id

    // Check if progress already exists
    const existing = await db.enrollment.findUnique({
      where: {
        userId_courseId: { userId, courseId }
      }
    })

    if (existing) {
      redirect(`/courses/${courseId}`)
    }

    // Create enrollment
    await db.enrollment.create({
      data: {
        userId,
        courseId,
      }
    })

    revalidatePath(`/courses/${courseId}`)
    revalidatePath("/dashboard")
    
    return { success: true }
  } catch (error) {
    console.error("ENROLLMENT_ERROR", error)
    return { error: "Failed to enroll. Please try again." }
  }
}
