import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { requireAdmin } from "@/lib/auth/admin-helpers"

export const dynamic = "force-dynamic"

async function countTable(table: string, supabase: Awaited<ReturnType<typeof createClient>>) {
  const { count, error } = await supabase.from(table).select("*", { count: "exact", head: true })

  if (error) {
    throw error
  }

  return count ?? 0
}

export async function GET(_request: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    await requireAdmin(user.email || null)

    const [totalUsers, activeSessions, feedPosts, officeHours, totalMatches] = await Promise.all([
      countTable("users", supabase),
      supabase
        .from("sessions")
        .select("*", { count: "exact", head: true })
        .eq("status", "scheduled")
        .then(({ count, error }) => {
          if (error) throw error
          return count ?? 0
        }),
      countTable("feed_posts", supabase),
      countTable("faculty_slots", supabase),
      countTable("matches", supabase),
    ])

    return NextResponse.json({
      totalUsers,
      activeSessions,
      feedPosts,
      officeHours,
      totalMatches,
    })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to load admin overview" },
      { status: 500 }
    )
  }
}
