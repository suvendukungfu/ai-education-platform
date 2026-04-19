"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { 
  LayoutDashboard, 
  BookOpen, 
  MessageSquare, 
  Zap, 
  User, 
  Settings,
  Bot,
  Brain
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/providers/auth-provider"

const navItems = [
  { name: "Neural Hub", href: "/dashboard", icon: LayoutDashboard },
  { name: "Learning Paths", href: "/courses", icon: BookOpen },
  { name: "Global Tutor", href: "/tutor", icon: MessageSquare },
  { name: "Scaling Plans", href: "/pricing", icon: Zap },
  { name: "Neural Identity", href: "/profile/me", icon: User },
]

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname()
  const { logout } = useAuth()

  return (
    <aside className={cn("w-72 bg-card/20 backdrop-blur-3xl border-r border-border/40 flex flex-col z-50", className)}>
      <div className="p-8">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-electric-blue to-violet-glow flex items-center justify-center shadow-lg shadow-electric-blue/20 group-hover:scale-110 transition-transform">
            <Brain className="w-6 h-6 text-black" />
          </div>
          <span className="text-xl font-black tracking-tighter">AXION<span className="text-electric-blue">.AI</span></span>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-8">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={cn(
                "flex items-center gap-4 px-6 py-4 rounded-[24px] text-sm font-black transition-all group relative overflow-hidden",
                isActive 
                  ? "bg-electric-blue/10 text-electric-blue border border-electric-blue/20" 
                  : "text-muted-foreground/60 hover:text-white hover:bg-white/5"
              )}
            >
              {isActive && (
                <motion.div 
                  layoutId="sidebar-active"
                  className="absolute left-0 w-1 h-6 bg-electric-blue rounded-r-full"
                />
              )}
              <item.icon className={cn("w-5 h-5", isActive ? "text-electric-blue" : "group-hover:text-white")} />
              <span className="uppercase tracking-widest text-[10px]">{item.name}</span>
            </Link>
          )
        })}
        <button 
          onClick={logout}
          className="w-full flex items-center gap-4 px-6 py-4 rounded-[24px] text-sm font-black transition-all group relative overflow-hidden text-muted-foreground/60 hover:text-red-500 hover:bg-red-500/5 mt-auto"
        >
          <User className="w-5 h-5 group-hover:text-red-500" />
          <span className="uppercase tracking-widest text-[10px]">De-Sync (Logout)</span>
        </button>
      </nav>

      <div className="p-8">
         <div className="p-6 rounded-[32px] bg-linear-to-br from-electric-blue/10 to-violet-glow/10 border border-white/5 space-y-4">
            <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">System Status</div>
            <div className="flex items-center gap-2 text-xs font-bold text-electric-blue">
               <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
               Neural Link Stable
            </div>
         </div>
      </div>
    </aside>
  )
}
