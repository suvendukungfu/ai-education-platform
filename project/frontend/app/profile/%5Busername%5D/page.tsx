import db from "@/lib/db"
import { notFound } from "next/navigation"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Star, Trophy, Zap, Share2, Flame, Globe } from "lucide-react"
import { ScrollReveal, HoverGlow } from "@/components/motion-wrapper"
import { Button } from "@/components/ui/button"
import { AchievementCard } from "@/components/profile/achievement-card"
import { toast } from "sonner"

export default async function PublicProfilePage({
  params
}: {
  params: { username: string }
}) {
  const user = await db.user.findFirst({
    where: { 
       OR: [
          { name: { contains: params.username } },
          { referralCode: params.username }
       ]
    },
    include: {
      badges: true,
      enrollments: {
        include: { course: true }
      }
    }
  })

  if (!user) notFound()

  return (
    <div className="min-h-screen bg-background text-foreground py-16 px-4">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Profile Header */}
        <ScrollReveal>
           <div className="grid lg:grid-cols-5 gap-8">
              <div className="lg:col-span-3 p-12 rounded-[56px] bg-card/40 backdrop-blur-3xl border border-border/50 text-center lg:text-left space-y-8 overflow-hidden shadow-2xl relative">
                 <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-electric-blue via-violet-glow to-electric-blue" />
                 
                 <div className="flex flex-col lg:flex-row items-center gap-8">
                    <div className="relative inline-block">
                       <div className="w-40 h-40 rounded-[48px] bg-linear-to-br from-electric-blue to-violet-glow mx-auto flex items-center justify-center shadow-xl border-4 border-background p-1 animate-pulse-slow">
                          <img src={user.image || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${user.id}`} alt={user.name!} className="w-full h-full rounded-[44px] object-cover" />
                       </div>
                    </div>

                    <div className="space-y-4">
                       <h1 className="text-5xl md:text-6xl font-black tracking-tighter">{user.name}</h1>
                       <div className="flex items-center justify-center lg:justify-start gap-3">
                          <Badge variant="outline" className="text-[10px] font-black tracking-widest px-4 py-1.5 border-electric-blue/30 text-electric-blue bg-electric-blue/10">NEURAL RANK {user.level > 10 ? 'S' : 'A'}</Badge>
                          <div className="text-muted-foreground font-black uppercase tracking-[0.3em] text-[10px]">{"Level "}{user.level}{" // node-01"}</div>
                       </div>
                    </div>
                 </div>

                 <div className="grid grid-cols-3 gap-8 pt-4">
                    <div className="space-y-1">
                       <div className="text-3xl font-black text-electric-blue italic">{user.xp.toLocaleString()}</div>
                       <div className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Neural XP</div>
                    </div>
                    <div className="space-y-1">
                       <div className="text-3xl font-black text-orange-500 italic">{user.streak}🔥</div>
                       <div className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Streak</div>
                    </div>
                    <div className="space-y-1">
                       <div className="text-3xl font-black text-violet-glow italic">{user.badges.length}</div>
                       <div className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Honors</div>
                    </div>
                 </div>

                 <div className="pt-8">
                    <Button 
                      onClick={() => {
                        const profileUrl = typeof window !== 'undefined' ? window.location.href : ""
                        if (navigator.share) {
                          navigator.share({
                            title: `Axion Neural ID: ${user.name}`,
                            text: `Check out my cognitive profile on Axion Intelligence! 🚀`,
                            url: profileUrl
                          })
                        } else {
                          navigator.clipboard.writeText(profileUrl)
                          toast.success("Profile link copied!")
                        }
                      }}
                      className="rounded-full px-10 h-14 bg-white text-black font-black hover:bg-white/90 shadow-2xl shadow-white/10 group"
                    >
                       <Share2 className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform" /> SHARE NEURAL ID
                    </Button>
                 </div>
              </div>

              <div className="lg:col-span-2 flex items-center justify-center">
                 <ScrollReveal direction="right" delay={0.2}>
                    <div className="scale-90 hover:scale-100 rotate-2 hover:rotate-0 transition-all duration-700 hover:shadow-[0_0_80px_rgba(0,186,255,0.1)]">
                       <AchievementCard user={{
                          name: user.name || "Learner",
                          level: user.level,
                          xp: user.xp,
                          streak: user.streak,
                          referralCode: user.referralCode || "AXION-USER"
                       }} />
                    </div>
                 </ScrollReveal>
              </div>
           </div>
        </ScrollReveal>

        {/* Badges & Mastery */}
        <div className="grid md:grid-cols-2 gap-8">
           <ScrollReveal direction="left" className="space-y-6">
              <h2 className="text-2xl font-black tracking-tighter flex items-center gap-2">
                 <Trophy className="w-6 h-6 text-amber-500" /> Neural Honors
              </h2>
              <div className="grid grid-cols-2 gap-4">
                 {user.badges.map((badge) => (
                    <HoverGlow key={badge.id}>
                       <Card className="bg-card/40 backdrop-blur-xl border-border/50 text-center p-6 rounded-[32px] hover:border-violet-glow/50 transition-all h-full flex flex-col items-center justify-center gap-4">
                          <div className="w-14 h-14 rounded-2xl bg-violet-glow/10 flex items-center justify-center text-violet-glow shadow-inner">
                             <Star className="w-7 h-7" />
                          </div>
                          <div className="space-y-1">
                             <div className="text-xs font-black tracking-tight">{badge.name}</div>
                             <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Mastery Earned</div>
                          </div>
                       </Card>
                    </HoverGlow>
                 ))}
                 {user.badges.length === 0 && <div className="col-span-2 py-10 text-center opacity-40 text-xs font-bold uppercase tracking-widest">No badges earned yet...</div>}
              </div>
           </ScrollReveal>

           <ScrollReveal direction="right" className="space-y-6">
              <h2 className="text-2xl font-black tracking-tighter flex items-center gap-2">
                 <Zap className="w-6 h-6 text-electric-blue" /> Active Syncs
              </h2>
              <div className="space-y-4">
                 {user.enrollments.map((enr) => (
                    <HoverGlow key={enr.id}>
                       <Card className="bg-card/40 backdrop-blur-xl border-border/50 p-6 rounded-[32px] hover:border-electric-blue/50 transition-all flex items-center justify-between">
                          <div className="flex items-center gap-4">
                             <div className="w-12 h-12 rounded-xl bg-electric-blue/10 flex items-center justify-center text-electric-blue">
                                <Brain className="w-6 h-6" />
                             </div>
                             <div className="space-y-1">
                                <div className="font-black text-sm">{enr.course.title}</div>
                                <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Active Path</div>
                             </div>
                          </div>
                          <Globe className="w-4 h-4 text-muted-foreground opacity-20" />
                       </Card>
                    </HoverGlow>
                 ))}
                 {user.enrollments.length === 0 && <div className="py-10 text-center opacity-40 text-xs font-bold uppercase tracking-widest">No active sessions...</div>}
              </div>
           </ScrollReveal>
        </div>
      </div>
    </div>
  )
}
