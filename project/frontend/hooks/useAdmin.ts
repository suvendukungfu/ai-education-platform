import { useEffect, useState } from "react"
import { ADMIN_WHITELIST } from "@/lib/adminWhitelist"
import { createClient } from "@/lib/supabase/client"

export function useAdmin() {
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    let mounted = true

    async function load() {
      try {
        const supabase = createClient()
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (!mounted) return

        if (!session) {
          setIsAdmin(false)
          setUser(null)
          setLoading(false)
          return
        }

        const email = session.user.email?.toLowerCase() || ""
        setUser(session.user)
        setIsAdmin(ADMIN_WHITELIST.includes(email))
        setLoading(false)
      } catch {
        if (!mounted) return
        setIsAdmin(false)
        setUser(null)
        setLoading(false)
      }
    }

    load()

    return () => {
      mounted = false
    }
  }, [])

  return { loading, isAdmin, user }
}
