"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Sparkles, BrainCircuit, Zap, Flame, Trophy, Crown, Medal, Target, GraduationCap } from "lucide-react"

interface BadgeData {
  type: string
  name: string
  icon?: string | null
}

export function TutorInsights({ 
  xp = 0, 
  level = 1, 
  streak = 0,
  badges = []
}: { 
  xp?: number, 
  level?: number, 
  streak?: number,
  badges?: BadgeData[]
}) {
  // Simple formula for next level XP requirement
  const nextLevelXP = Math.pow((level) / 0.1, 2)
  const currentLevelMinXP = Math.pow((level - 1) / 0.1, 2)
  const diff = nextLevelXP - currentLevelMinXP
  const currentDiff = xp - currentLevelMinXP
  const progressPercent = diff > 0 ? Math.min(100, Math.max(5, (currentDiff / diff) * 100)) : 5

  const iconMap: Record<string, any> = {
    zap: Zap,
    flame: Flame,
    trophy: Trophy,
    medal: Medal,
    star: Sparkles,
    crown: Crown,
    target: Target,
    cap: GraduationCap
  }

  return (
    <div className="space-y-6">
      <Card className="border-border/50 bg-card/60 backdrop-blur-xl overflow-hidden relative group shadow-2xl shadow-black/5 rounded-3xl">
        <div className="absolute inset-0 bg-linear-to-br from-electric-blue/10 via-transparent to-violet-glow/10 opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
        
        <CardHeader className="pb-4 relative z-10">
           <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-electric-blue text-[10px] font-black uppercase tracking-[0.2em]">
                 <Crown className="w-3 h-3 text-amber-500" /> Platinum League
              </div>
              <div className={`flex items-center gap-1.5 ${streak > 0 ? "bg-orange-500/10 text-orange-500 border-orange-500/20" : "bg-muted text-muted-foreground border-border/50"} px-2 py-1 rounded-md text-[10px] font-black tracking-widest uppercase border`}>
                 <Flame className={`w-3 h-3 ${streak > 0 ? "animate-pulse" : "opacity-40"}`} /> {streak} Day Streak
              </div>
           </div>
           
           <div className="flex items-end justify-between mt-4">
              <div>
                 <CardTitle className="text-3xl font-black tracking-tighter">Level {level}</CardTitle>
                 <CardDescription className="text-xs font-bold text-muted-foreground mt-1">Neural Pathfinder</CardDescription>
              </div>
              <div className="text-right">
                 <span className="text-xl font-black text-electric-blue">{xp}</span>
                 <span className="text-xs text-muted-foreground font-bold"> / {Math.round(nextLevelXP)} XP</span>
              </div>
           </div>
        </CardHeader>

        <CardContent className="space-y-6 pt-0 relative z-10">
           {/* XP Bar */}
           <div className="h-3 w-full bg-muted/50 rounded-full overflow-hidden shadow-inner border border-border/50 p-0.5">
              <div 
                 className="h-full bg-linear-to-r from-electric-blue via-violet-glow to-electric-blue transition-all duration-1000 relative rounded-full" 
                 style={{ width: `${progressPercent}%` }}
              >
                 <div className="absolute top-0 right-0 bottom-0 w-8 bg-linear-to-r from-transparent to-white/30 animate-pulse" />
              </div>
           </div>

           {/* Dynamic Badges Earned */}
           <div className="pt-4 border-t border-border/40">
              <h5 className="text-[10px] uppercase font-black tracking-widest text-muted-foreground mb-3">Syllabus Milestones</h5>
              <div className="flex items-center gap-3">
                 {badges.length > 0 ? (
                    badges.map((badge, idx) => {
                      const Icon = iconMap[badge.icon || 'zap'] || Zap
                      return (
                        <div key={idx} className="w-12 h-12 rounded-xl bg-electric-blue/10 border border-electric-blue/30 flex items-center justify-center cursor-help hover:scale-110 transition-transform shadow-[0_0_15px_rgba(0,212,255,0.2)]" title={badge.name}>
                          <Icon className="w-6 h-6 text-electric-blue" />
                        </div>
                      )
                    })
                 ) : (
                    <div className="w-12 h-12 rounded-xl bg-muted border border-border/50 flex items-center justify-center opacity-30 border-dashed">
                      <span className="text-xs font-black">?</span>
                    </div>
                 )}
                 {badges.length < 4 && (
                    <div className="w-12 h-12 rounded-xl bg-muted border border-border/50 flex items-center justify-center opacity-10 border-dashed">
                      <span className="text-xs font-black">?</span>
                    </div>
                 )}
              </div>
           </div>
        </CardContent>
      </Card>
      
      {/* Daily Quests */}
      <div className="p-6 border border-border/40 rounded-[32px] bg-card/40 backdrop-blur-sm shadow-xl space-y-4">
         <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-electric-blue mb-4">
            <Target className="w-3.5 h-3.5" /> Daily Neural Quests
         </div>
         
         <div className="space-y-3">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-background/50 border border-border/50 group hover:border-electric-blue/30 transition-colors shadow-sm">
               <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border-2 border-muted-foreground flex items-center justify-center group-hover:border-electric-blue transition-colors" />
                  <span className="text-xs font-bold">Ask AI Tutor a question</span>
               </div>
               <span className="text-xs font-black text-amber-500">+15 XP</span>
            </div>
            <div className="flex items-center justify-between p-4 rounded-2xl bg-electric-blue/10 border border-electric-blue/20 shadow-sm">
               <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border-2 border-electric-blue bg-electric-blue flex items-center justify-center text-white">
                     <Sparkles className="w-3 h-3" />
                  </div>
                  <span className="text-xs font-bold text-electric-blue">Complete first lesson</span>
               </div>
               <span className="text-xs font-black text-muted-foreground opacity-40 line-through">+100 XP</span>
            </div>
         </div>
      </div>
    </div>
  )
}
