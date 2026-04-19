"use server"

import { auth } from "@/auth"
import db from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function generateReferralLink() {
  const session = await auth()
  if (!session?.user?.id) return { error: "Unauthorized" }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { referralCode: true }
  })

  if (!user?.referralCode) return { error: "Referral code not found" }

  const baseUrl = process.env.NEXTAUTH_URL || "https://axion.ai"
  const inviteLink = `${baseUrl}/signup?ref=${user.referralCode}`

  return { inviteLink }
}

export async function trackReferral(referralCode: string) {
  const session = await auth()
  if (!session?.user?.id) return

  try {
    const referrer = await db.user.findUnique({
      where: { referralCode }
    })

    if (referrer && referrer.id !== session.user.id) {
      // Connect referral
      await db.user.update({
        where: { id: session.user.id },
        data: { referredById: referrer.id }
      })

      // Award referrer
      await db.user.update({
        where: { id: referrer.id },
        data: { 
          xp: { increment: 500 } // High value reward for viral growth
        }
      })
      
      revalidatePath("/dashboard")
      return { success: true }
    }
  } catch (error) {
    console.error("TRACK_REFERRAL_ERROR", error)
  }
}
