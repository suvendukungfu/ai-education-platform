"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { isAdminEmail } from "@/lib/auth/admin-helpers"

export function AdminLink() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function checkAdmin() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user?.email) {
        setIsAdmin(isAdminEmail(user.email))
      }
      setLoading(false)
    }
    
    checkAdmin()
  }, [])

  if (loading || !isAdmin) {
    return null
  }

  return (
    <Link href="/admin" className="text-sm text-muted-foreground hover:text-foreground transition">
      Admin
    </Link>
  )
}

