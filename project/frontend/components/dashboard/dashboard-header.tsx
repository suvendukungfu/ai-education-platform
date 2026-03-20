"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/theme-toggle"
import { AdminLink } from "@/components/auth/admin-link"
import { BookOpen, Bell, Search, Menu } from "lucide-react"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabase/client"
import { signOut } from "@/lib/auth/auth-helpers"
import { isAdminEmail } from "@/lib/auth/admin-helpers"
import type { UserRole } from "@/lib/types"

type MenuItem = { label: string; href?: string; action?: () => Promise<void> | void }
type MenuSection = { items: MenuItem[] }

export function DashboardHeader() {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const [userName, setUserName] = useState("Learner")
  const [userEmail, setUserEmail] = useState("user@aieducation.com")
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [role, setRole] = useState<UserRole>("student")
  const [adminOverride, setAdminOverride] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function loadUser() {
      try {
        const supabase = createClient()
        const {
          data: { user },
        } = await supabase.auth.getUser()
        if (!user) {
          return
        }

        const metadataRole = (user.user_metadata?.role as UserRole) || "student"
        const displayName = user.user_metadata?.name || user.email?.split("@")[0] || "AI Learner"
        setUserName(displayName)
        setUserEmail(user.email || "user@aieducation.com")
        setAvatarUrl(user.user_metadata?.avatar_url ?? null)
        setRole(metadataRole)
        setAdminOverride(user.email ? isAdminEmail(user.email) : false)
      } catch (error) {
        console.error("Failed to fetch user", error)
      }
    }

    loadUser()
  }, [])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }

    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [menuOpen])

  const handleNavigate = async (item: MenuItem) => {
    if (item.action) {
      await item.action()
    }
    if (item.href) {
      router.push(item.href)
      router.refresh()
    }
    setMenuOpen(false)
  }

  const handleLogout = async () => {
    await signOut()
    router.push("/login")
    router.refresh()
  }

  const studentSections: MenuSection[] = [
    {
      items: [
        { label: "My Profile", href: "/profile" },
        { label: "Settings", href: "/settings" },
        { label: "Learning History", href: "/dashboard" },
        { label: "AI Tutors", href: "/tutors" },
        { label: "Assessments", href: "/assessments" },
      ],
    },
    {
      items: [
        { label: "Help & Support", href: "/support" },
        { label: "Logout", action: handleLogout },
      ],
    },
  ]

  const facultySections: MenuSection[] = [
    {
      items: [
        { label: "My Profile", href: "/profile" },
        { label: "Instructor Dashboard", href: "/faculty/dashboard" },
        { label: "Content Producer", href: "/faculty/content" },
        { label: "Analytics", href: "/faculty/analytics" },
      ],
    },
    {
      items: [
        { label: "Settings", href: "/settings" },
        { label: "Help & Support", href: "/support" },
        { label: "Logout", action: handleLogout },
      ],
    },
  ]

  const adminSections: MenuSection[] = [
    {
      items: [
        { label: "Admin Dashboard", href: "/admin" },
        { label: "User Management", href: "/admin/users" },
        { label: "Reports & Analytics", href: "/admin/reports" },
        { label: "System Health", href: "/admin/health" },
      ],
    },
    {
      items: [
        { label: "Settings", href: "/admin/settings" },
        { label: "Logout", action: handleLogout },
      ],
    },
  ]

  const menuSections = useMemo(() => {
    if (adminOverride) {
      return adminSections
    }
    if (role === "faculty") {
      return facultySections
    }
    return studentSections
  }, [adminOverride, role])

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold">AI Education</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/dashboard" className="text-sm font-medium hover:text-foreground transition">
                Dashboard
              </Link>
              <Link href="/tutors" className="text-sm text-muted-foreground hover:text-foreground transition">
                AI Tutors
              </Link>
              <Link href="/courses" className="text-sm text-muted-foreground hover:text-foreground transition">
                Courses
              </Link>
              <Link href="/assessments" className="text-sm text-muted-foreground hover:text-foreground transition">
                Assessments
              </Link>
              <AdminLink />
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center relative">
              <Search className="absolute left-3 w-4 h-4 text-muted-foreground" />
              <Input type="search" placeholder="Search lessons..." className="w-64 pl-9 bg-card" />
            </div>
            <ThemeToggle />
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
            </Button>
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                className="rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                onClick={() => setMenuOpen((prev) => !prev)}
              >
                <Avatar className="cursor-pointer">
                  <AvatarImage src={avatarUrl || "/placeholder.svg?height=40&width=40"} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {userName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase() || "AI"}
                  </AvatarFallback>
                </Avatar>
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-lg border border-border/50 bg-card shadow-xl overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-border/40">
                    <p className="text-sm font-medium text-foreground">{userName}</p>
                    <p className="text-xs text-muted-foreground truncate">{userEmail}</p>
                  </div>
                  {menuSections.map((section, index) => (
                    <div key={index} className={index === 0 ? "py-2" : "py-2 border-t border-border/30"}>
                      {section.items.map((item) => (
                        <button
                          key={item.label}
                          type="button"
                          className="w-full text-left px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-background/80 transition"
                          onClick={() => handleNavigate(item)}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
