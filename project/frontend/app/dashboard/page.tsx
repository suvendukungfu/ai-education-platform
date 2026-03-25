import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { TutorInsights } from "@/components/dashboard/tutor-insights"
import { NeuralRoadmap } from "@/components/dashboard/neural-roadmap"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Sparkles, ArrowRight, BookOpen, Clock, Target, Share2, Copy, Brain, AlertTriangle, Zap } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DailyNeuralSpike } from "@/components/dashboard/daily-neural-spike"
import { OnboardingModal } from "@/components/dashboard/onboarding-modal"
import { MetaverseNavigator } from "@/components/dashboard/metaverse-navigator"
import { NeuralAssistant } from "@/components/dashboard/neural-assistant"
import { NeuralHUD } from "@/components/dashboard/neural-hud"
import { getNeuralRecommendations } from "@/lib/actions/neural-recommender"
import { ScrollReveal, HoverGlow } from "@/components/motion-wrapper"
import { ReferralHub } from "@/components/dashboard/referral-hub"
import { PresenceHub } from "@/components/dashboard/presence-hub"
import { toast } from "sonner"
import { Hammer } from "lucide-react"

import { EvaluatorHints } from "@/components/dashboard/evaluator-hints"

export default async function DashboardPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('accessToken')?.value

  if (!token) {
    redirect("/login")
  }

  // Fetch data from backend
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'
  
  const [coursesRes, enrolledRes, userRes] = await Promise.all([
    fetch(`${baseUrl}/courses`, { headers: { Authorization: `Bearer ${token}` } }),
    fetch(`${baseUrl}/courses/enrolled`, { headers: { Authorization: `Bearer ${token}` } }),
    fetch(`${baseUrl}/users/me`, { headers: { Authorization: `Bearer ${token}` } })
  ])

  const courses = await coursesRes.json()
  const enrollments = await enrolledRes.json()
  const user = await userRes.json()

  const weakTopics = user?.weakTopics ? JSON.parse(user.weakTopics) as string[] : []
  const referralCount = user?._count?.referrals || 0
  interface Recommendation {
    id: string;
    title: string;
    type: string;
    confidence: number;
  }
  const neuralRecs: Recommendation[] = [] // We can fetch these from backend AI endpoint later

  return (
    <div className="min-h-screen bg-background text-foreground transition-all duration-500 selection:bg-electric-blue/20 relative">
      <NeuralHUD />
      <EvaluatorHints />
      <OnboardingModal />
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-8 space-y-12 pb-24">
        {/* Metaverse Navigator & AI Assistant */}
        <ScrollReveal>
          <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3">
              <MetaverseNavigator />
            </div>
            <div className="lg:col-span-2 space-y-4">
               <div className="p-8 rounded-[40px] bg-card/40 border border-border/50 backdrop-blur-3xl h-full flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-[10px] font-black text-electric-blue uppercase tracking-widest mb-4">
                    <Sparkles className="w-4 h-4" /> Neural Pulse
                  </div>
                  <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-4">Recommended Syncs</h3>
                  <div className="space-y-3">
                    {neuralRecs.map((rec: any) => (
                      <div key={rec.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between group hover:border-electric-blue/50 transition-all cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${rec.type === 'PEAK' ? 'bg-amber-500/20 text-amber-500' : 'bg-electric-blue/20 text-electric-blue'}`}>
                             <Zap className="w-4 h-4" />
                          </div>
                          <span className="text-sm font-bold">{rec.title}</span>
                        </div>
                        <div className="text-[10px] font-black text-white/40">{(rec.confidence * 100).toFixed(0)}% MATCH</div>
                      </div>
                    ))}
                    {neuralRecs.length === 0 && (
                      <p className="text-xs text-muted-foreground opacity-50 italic">Neural engines are analyzing your journey...</p>
                    )}
                  </div>
               </div>
            </div>
          </div>
        </ScrollReveal>

        <NeuralAssistant user={{ name: user?.name, xp: user?.xp, level: user?.level }} />

        {/* Welcome Section */}
        <ScrollReveal>
          <section className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative p-8 md:p-12 rounded-[48px] bg-card/40 backdrop-blur-3xl border border-border/50 shadow-2xl overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-electric-blue/10 via-background to-background pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-violet-glow/10 rounded-full blur-[100px] group-hover:bg-violet-glow/20 transition-colors duration-700" />
            
            <div className="space-y-4 relative z-10">
              <div className="flex items-center gap-2">
                 <div className="text-electric-blue font-black uppercase tracking-[0.2em] text-[10px] bg-electric-blue/10 w-fit px-4 py-1.5 rounded-full border border-electric-blue/20 shadow-lg shadow-electric-blue/5">
                    <Sparkles className="w-3 h-3" /> Neural Sync Authorized
                 </div>
                 {user?.subscriptionTier === 'PRO' && (
                    <div className="text-amber-500 font-black uppercase tracking-[0.2em] text-[10px] bg-amber-500/10 w-fit px-4 py-1.5 rounded-full border border-amber-500/20 shadow-lg shadow-amber-500/5">
                       PRO MEMBER
                    </div>
                 )}
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-balance leading-none">Welcome Back,<br/>{user?.name?.split(' ')[0] || "Learner"}.</h1>
              <p className="text-muted-foreground font-medium text-lg md:text-xl">Your cognitive growth is currently trending <span className="text-electric-blue font-black">+24%</span> this week.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10 order-first md:order-0 mb-6 md:mb-0">
               <Link href="/course-forge">
                  <HoverGlow>
                    <div className="flex flex-col items-center sm:items-end gap-1 bg-electric-blue/10 backdrop-blur-xl px-8 py-5 rounded-[32px] border border-electric-blue/30 shadow-inner group/forge hover:bg-electric-blue hover:text-black transition-all cursor-pointer">
                      <div className="text-[10px] font-black uppercase tracking-[0.2em] mb-1 opacity-60">Neural Workspace</div>
                      <div className="flex items-center gap-2 font-bold text-base">
                        <Hammer className="w-4 h-4" /> Start Neural Forge
                      </div>
                      <div className="text-[10px] font-black mt-2 bg-black/20 px-2 py-0.5 rounded-md border border-white/10 uppercase tracking-widest">Generate Any Course</div>
                    </div>
                  </HoverGlow>
               </Link>
               
               <HoverGlow>
                <div className="flex flex-col items-center sm:items-end gap-1 bg-black/40 backdrop-blur-xl px-8 py-5 rounded-[32px] border border-white/10 shadow-inner group/quest hover:border-electric-blue/30 transition-colors cursor-pointer">
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 mb-1">Active Neural Quest</div>
                  <div className="flex items-center gap-2 font-bold text-base text-electric-blue">
                    <Target className="w-4 h-4" /> Expand Context Window
                  </div>
                  <div className="text-[10px] font-black text-amber-500 mt-2 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">REWARD: +250 XP</div>
                </div>
              </HoverGlow>
            </div>
          </section>
        </ScrollReveal>

        {/* Neural Referral Hub (NEW: Startup Feature) */}
        <ScrollReveal direction="up">
           <ReferralHub referralCode={user?.referralCode || ""} referralCount={referralCount} />
        </ScrollReveal>

        {/* Daily Spike (Retention Loop) */}
        <ScrollReveal direction="up" delay={0.1}>
           <DailyNeuralSpike />
        </ScrollReveal>

        {/* Adaptive Revision Hub Hub */}
        {weakTopics.length > 0 && (
          <ScrollReveal direction="down">
             <section className="p-8 rounded-[40px] bg-orange-500/5 border border-orange-500/20 shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
                   <Brain className="w-32 h-32 text-orange-500" />
                </div>
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                   <div className="space-y-4 text-center md:text-left">
                      <div className="flex items-center justify-center md:justify-start gap-2 text-orange-500 font-black uppercase tracking-widest text-xs">
                         <AlertTriangle className="w-4 h-4" /> Neural Link Divergence Detected
                      </div>
                      <h2 className="text-3xl font-black tracking-tighter">Your Cognitive Path Needs Calibration</h2>
                      <p className="text-muted-foreground font-medium max-w-xl">
                         The AI Engine has identified friction in your understanding of: <span className="text-orange-500 font-bold">{weakTopics.join(', ')}</span>.
                         Complete a focused revision cycle to stabilize your neural link.
                      </p>
                   </div>
                   <Button size="lg" className="rounded-full px-10 h-16 bg-orange-500 text-white font-black hover:bg-orange-600 shadow-xl shadow-orange-500/20">
                      START ADAPTIVE REVISION <ArrowRight className="ml-2 w-6 h-6" />
                   </Button>
                </div>
             </section>
          </ScrollReveal>
        )}

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-16">
            {/* My Courses */}
            <section className="space-y-8">
               <ScrollReveal className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-black tracking-tighter">Active Learning Paths</h2>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest leading-none">Your cognitive inventory</p>
                  </div>
                  <Link href="/courses" className="text-[10px] font-black uppercase tracking-[0.2em] text-electric-blue hover:text-white transition-colors flex items-center gap-2 group">
                     Explore More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
               </ScrollReveal>
               
               <div className="grid sm:grid-cols-2 gap-6">
                  {enrollments.map((enr: any, index: number) => {
                     const totalLessons = 5 
                     const completedPct = Math.min(100, (enr.progress.length / (totalLessons || 1)) * 100)
                     const currentQuiz = enr.course.modules[0]?.quizzes[0]
                     
                     return (
                      <ScrollReveal key={enr.id} delay={index * 0.1}>
                        <HoverGlow>
                          <Card className="group overflow-hidden bg-card/40 backdrop-blur-xl border-border/50 hover:border-electric-blue/50 transition-all hover:shadow-2xl hover:shadow-electric-blue/5 shadow-none rounded-[32px] h-full flex flex-col">
                             <div className="aspect-video bg-muted relative border-b border-border/20 overflow-hidden shrink-0">
                                <img 
                                   src={enr.course.thumbnail || "/placeholder-logo.png"} 
                                   alt={enr.course.title}
                                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-60 mix-blend-luminosity group-hover:mix-blend-normal"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-card/90 via-card/20 to-transparent flex items-end p-6">
                                   <div className="flex w-full justify-between items-end">
                                      <Badge variant="outline" className="text-[10px] font-black px-3 py-1 bg-electric-blue/10 text-electric-blue border-electric-blue/20 backdrop-blur-md uppercase tracking-widest">Active Path</Badge>
                                      <span className="text-xs font-black italic text-electric-blue drop-shadow-lg">{Math.round(completedPct)}% SYNCED</span>
                                   </div>
                                </div>
                             </div>
                             <CardHeader className="pb-4 space-y-1">
                                <CardTitle className="text-xl font-black tracking-tight group-hover:text-electric-blue transition-colors line-clamp-1">{enr.course.title}</CardTitle>
                                <CardDescription className="line-clamp-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">By {enr.course.instructor || "Platform Intelligence"}</CardDescription>
                             </CardHeader>
                             <CardContent className="pb-6 grow">
                                <div className="h-2 w-full bg-muted/30 rounded-full overflow-hidden shadow-inner mb-6 border border-white/5">
                                   <div className="h-full bg-linear-to-r from-electric-blue via-violet-glow to-electric-blue bg-size-[200%_100%] animate-shimmer transition-all duration-1000" style={{ width: `${completedPct}%` }} />
                                </div>
                                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.15em] text-muted-foreground">
                                   <div className="flex items-center gap-2"><BookOpen className="w-3.5 h-3.5" /> {enr.course._count.modules} Modules</div>
                                   {currentQuiz && (
                                      <Link href={`/courses/${enr.courseId}/quiz/${currentQuiz.id}`} className="flex items-center gap-2 text-violet-glow hover:text-white transition-colors cursor-pointer">
                                        <Zap className="w-3.5 h-3.5" /> Start Level Quiz
                                      </Link>
                                   )}
                                </div>
                             </CardContent>
                             <Link href={`/tutor/${enr.courseId}`} className="flex items-center justify-center p-4 bg-white/5 hover:bg-electric-blue text-white hover:text-black transition-all font-black text-xs uppercase tracking-[0.2em] gap-2 border-t border-white/5">
                                Resume Intelligence <ArrowRight className="w-4 h-4" />
                             </Link>
                          </Card>
                        </HoverGlow>
                      </ScrollReveal>
                     )
                  })}
               </div>
            </section>

            {/* Visual Roadmap Section */}
            <ScrollReveal delay={0.2} className="space-y-8 pt-8">
               <div className="space-y-1">
                  <h2 className="text-2xl font-black tracking-tighter">Your Neural Evolution</h2>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest leading-none">Visual mastery tracker</p>
               </div>
               <NeuralRoadmap />
            </ScrollReveal>
          </div>

          <aside className="space-y-8 lg:sticky lg:top-24 pb-12">
            <ScrollReveal direction="left">
              <TutorInsights 
                xp={user?.xp || 0} 
                level={user?.level || 1} 
                streak={user?.streak || 0} 
                badges={user?.badges || []}
              />
            </ScrollReveal>

            <ScrollReveal direction="left" delay={0.1}>
               <PresenceHub />
            </ScrollReveal>

            {/* Pro Upgrade Nudge */}
            {user?.subscriptionTier !== 'PRO' && (
               <ScrollReveal direction="left" delay={0.2}>
                  <Card className="border-amber-500/30 bg-amber-500/5 backdrop-blur-3xl rounded-[32px] overflow-hidden shadow-xl border-t-2 relative">
                     <div className="absolute top-0 right-0 p-4">
                        <Zap className="w-6 h-6 text-amber-500 animate-pulse" />
                     </div>
                     <CardHeader className="pb-4">
                        <CardTitle className="text-lg font-black text-amber-500">Upgrade to Neural Pro</CardTitle>
                        <CardDescription className="text-[10px] font-bold uppercase tracking-widest">Unlimited AI Tutoring + Elite Paths</CardDescription>
                     </CardHeader>
                     <CardContent>
                        <Button className="w-full rounded-2xl h-10 bg-amber-500 text-black font-black hover:bg-amber-600 shadow-lg shadow-amber-500/20" asChild>
                           <Link href="/pricing">TRY PRO FREE</Link>
                        </Button>
                     </CardContent>
                  </Card>
               </ScrollReveal>
            )}
          </aside>
        </div>
      </main>
    </div>
  )
}
