"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAdmin } from "@/hooks/useAdmin"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { loading, isAdmin } = useAdmin()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !isAdmin) {
      router.replace("/dashboard")
    }
  }, [loading, isAdmin, router])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading admin access...</div>
  }

  if (!isAdmin) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Redirecting...</div>
  }

  return <>{children}</>
}
