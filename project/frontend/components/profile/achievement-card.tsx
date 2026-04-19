"use client"

import { motion } from "framer-motion"
import { Brain, Trophy, Zap, Star, Shield, Sparkles, Globe } from "lucide-react"

interface AchievementCardProps {
  user: {
    name: string
    level: number
    xp: number
    streak: number
    referralCode: string
  }
}

export function AchievementCard({ user }: AchievementCardProps) {
  return (
    <div className="relative w-full max-w-sm aspect-3/4 rounded-[48px] overflow-hidden bg-black border border-white/10 shadow-2xl group selection:bg-electric-blue/20">
      {/* Neural Background Gradients */}
      <div className="absolute inset-0 bg-linear-to-br from-electric-blue/20 via-black to-violet-glow/20" />
      <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-electric-blue via-violet-glow to-electric-blue" />
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-electric-blue/10 rounded-full blur-[100px] animate-pulse" />
      
      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,186,255,0.05),transparent)]" />

      <div className="relative h-full flex flex-col p-10 justify-between z-10">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="space-y-1">
             <div className="flex items-center gap-2 text-electric-blue">
                <Brain className="w-6 h-6" />
                <span className="text-xl font-black tracking-tighter">AXION<span className="text-white">.AI</span></span>
             </div>
             <div className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/60">Neural Identity Card</div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md">
             <Shield className="w-6 h-6 text-electric-blue" />
          </div>
        </div>

        {/* Level Stats */}
        <div className="text-center space-y-4">
           <div className="relative inline-block">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-32 h-32 rounded-full bg-linear-to-br from-electric-blue to-violet-glow p-1 flex items-center justify-center shadow-2xl shadow-electric-blue/20"
              >
                 <div className="w-full h-full rounded-full bg-black flex flex-col items-center justify-center">
                    <div className="text-4xl font-black italic text-white leading-none">{user.level}</div>
                    <div className="text-[8px] font-black uppercase text-electric-blue tracking-widest mt-1">LVL</div>
                 </div>
              </motion.div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl bg-black border border-white/20 flex items-center justify-center shadow-lg">
                 <Trophy className="w-5 h-5 text-amber-500" />
              </div>
           </div>
           
           <div className="space-y-1">
              <h2 className="text-3xl font-black tracking-tighter uppercase">{user.name}</h2>
              <div className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                 <Globe className="w-3 h-3" /> Node: Central-01
              </div>
           </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
           <div className="p-4 rounded-3xl bg-white/5 border border-white/10 text-center space-y-1">
              <div className="text-xs font-black text-white italic">{user.xp.toLocaleString()}</div>
              <div className="text-[8px] font-black uppercase tracking-widest text-muted-foreground/60">Synced XP</div>
           </div>
           <div className="p-4 rounded-3xl bg-white/5 border border-white/10 text-center space-y-1">
              <div className="text-xs font-black text-orange-500 italic">{user.streak} DAYS</div>
              <div className="text-[8px] font-black uppercase tracking-widest text-muted-foreground/60">Persistence</div>
           </div>
        </div>

        {/* Footer / QR / Referral */}
        <div className="flex items-end justify-between border-t border-white/10 pt-6">
           <div className="space-y-2">
              <div className="text-[8px] font-black uppercase tracking-widest text-muted-foreground/60">Invite Code</div>
              <div className="text-sm font-black text-electric-blue tracking-[0.2em]">{user.referralCode}</div>
           </div>
           <div className="text-[10px] font-black uppercase tracking-widest text-white/20">
              Verified // {new Date().getFullYear()}
           </div>
        </div>
      </div>
    </div>
  )
}
