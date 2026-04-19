"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, BookOpen, MessageSquare, Zap, User } from "lucide-react"

const navItems = [
  { name: "Hub", href: "/dashboard", icon: LayoutDashboard },
  { name: "Paths", href: "/courses", icon: BookOpen },
  { name: "Tutor", href: "/tutor", icon: MessageSquare },
  { name: "Scaling", href: "/pricing", icon: Zap },
  { name: "Identity", href: "/profile/me", icon: User },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <div className="md:hidden fixed bottom-6 left-4 right-4 z-100 p-4 bg-black/40 backdrop-blur-3xl border border-white/10 rounded-[32px] shadow-2xl flex items-center justify-around">
      {navItems.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link 
            key={item.name} 
            href={item.href}
            className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${
              isActive ? "text-electric-blue scale-110" : "text-muted-foreground/60 hover:text-white"
            }`}
          >
            <item.icon className={`w-6 h-6 ${isActive ? "drop-shadow-[0_0_8px_rgba(0,186,255,0.5)]" : ""}`} />
            <span className={`text-[10px] font-black uppercase tracking-widest ${isActive ? "opacity-100" : "opacity-0"}`}>
               {item.name}
            </span>
          </Link>
        )
      })}
    </div>
  )
}
