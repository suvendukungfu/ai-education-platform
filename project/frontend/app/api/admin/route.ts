import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { requireAdmin } from '@/lib/auth/admin-helpers'

/**
 * Admin API route - protected by admin whitelist
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    // Check admin access
    await requireAdmin(user.email || null)

    // Admin access granted
    return NextResponse.json({ 
      message: 'Admin access granted',
      user: {
        email: user.email,
        id: user.id
      }
    })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Admin access restricted — invalid admin account.' },
      { status: 403 }
    )
  }
}

