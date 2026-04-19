"use server"

import { auth } from "@/auth"
import db from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function awardXP(amount: number = 10) {
  const session = await auth()
  if (!session?.user?.id) return { error: "Unauthorized" }

  try {
    const userId = session.user.id
    const now = new Date()
    
    // Fetch current user stats
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { xp: true, lastActiveAt: true, streak: true, bestStreak: true }
    })

    if (!user) return { error: "User not found" }

    let newStreak = user.streak
    const lastActive = user.lastActiveAt
    
    if (!lastActive) {
      newStreak = 1
    } else {
      const lastActiveDate = new Date(lastActive).setHours(0, 0, 0, 0)
      const todayDate = new Date(now).setHours(0, 0, 0, 0)
      const diffDays = Math.floor((todayDate - lastActiveDate) / (1000 * 60 * 60 * 24))

      if (diffDays === 1) {
        newStreak += 1
      } else if (diffDays > 1) {
        newStreak = 1
      }
    }

    const updatedBestStreak = Math.max(user.bestStreak, newStreak)
    const newXP = user.xp + amount
    const newLevel = Math.floor(0.1 * Math.sqrt(newXP)) + 1

    // Update User
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: {
        xp: newXP,
        level: newLevel,
        streak: newStreak,
        bestStreak: updatedBestStreak,
        lastActiveAt: now,
      }
    })

    // Check for Badges
    const badgeAwards: string[] = []
    
    // 1. First Step Badge
    if (newXP >= 10) {
       const badge = await db.userBadge.upsert({
          where: { userId_type: { userId, type: 'FIRST_STEP' } },
          update: {},
          create: { userId, type: 'FIRST_STEP', name: 'Neural Spark', icon: 'zap' }
       })
       if (badge) badgeAwards.push('First Step')
    }

    // 2. 7-Day Streak Badge
    if (newStreak >= 7) {
       const badge = await db.userBadge.upsert({
          where: { userId_type: { userId, type: 'STREAK_7' } },
          update: {},
          create: { userId, type: 'STREAK_7', name: 'Week Warrior', icon: 'flame' }
       })
       if (badge) badgeAwards.push('7-Day Streak')
    }

    // 3. XP Pioneer (1000 XP)
    if (newXP >= 1000) {
       const badge = await db.userBadge.upsert({
          where: { userId_type: { userId, type: 'XP_1000' } },
          update: {},
          create: { userId, type: 'XP_1000', name: 'XP Pioneer', icon: 'trophy' }
       })
       if (badge) badgeAwards.push('XP Pioneer')
    }

    revalidatePath("/dashboard")
    revalidatePath("/tutor/[id]", "page")
    
    return { 
      success: true, 
      xp: newXP, 
      level: newLevel, 
      streak: newStreak,
      badges: badgeAwards
    }
  } catch (error) {
    console.error("AWARD_XP_ERROR", error)
    return { error: "Failed to award XP" }
  }
}
