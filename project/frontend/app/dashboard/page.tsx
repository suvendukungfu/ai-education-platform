import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { TutorInsights } from "@/components/dashboard/tutor-insights"
import { auth } from "@/auth"
import db from "@/lib/db"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Sparkles, ArrowRight, BookOpen, Clock, Target } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default async function DashboardPage() {
  const session = await auth()

  if (!session?.user?.id) {
    redirect("/login")
  }

  // Fetch enrollments with course details
  const enrollments = await db.enrollment.findMany({
    where: { userId: session.user.id },
    include: {
      course: {
        include: {
          _count: {
            select: { modules: true, enrollments: true }
          }
        }
      },
      progress: true
    },
    orderBy: { updatedAt: "desc" }
  })

  return (
    <div className="min-h-screen bg-background text-foreground transition-all duration-500">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-8 space-y-12">
        {/* Welcome Section */}
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
             <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px]">
                <Sparkles className="w-3 h-3" /> System Initialized
             </div>
             <h1 className="text-4xl font-black tracking-tighter">Welcome Back, {session.user.name?.split(' ')[0] || "Learner"}</h1>
             <p className="text-muted-foreground font-medium">Continue your learning journey with our intelligent tutoring systems.</p>
          </div>
          
          <div className="flex items-center gap-4 text-xs font-black uppercase tracking-tighter opacity-50 bg-muted/30 px-4 py-2 rounded-full border border-border/20 backdrop-blur-sm">
             <div className="flex items-center gap-1.5"><Target className="w-3 h-3 text-primary" /> Daily Goal: 15m</div>
             <div className="w-1 h-1 bg-border rounded-full" />
             <div className="flex items-center gap-1.5"><Clock className="w-3 h-3 text-primary" /> 2h Streak</div>
          </div>
        </section>

        {/* Action Grid */}
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-12">
            {/* My Courses */}
            <section className="space-y-6">
               <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold tracking-tight">Active Learning Paths</h2>
                  <Link href="/courses" className="text-xs font-black uppercase text-primary hover:tracking-widest transition-all flex items-center gap-2">
                     Explore More <ArrowRight className="w-3 h-3" />
                  </Link>
               </div>
               
               {enrollments.length === 0 ? (
                 <Card className="border-dashed border-border/50 bg-card/20 py-12 text-center group">
                    <CardHeader>
                       <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                          <BookOpen className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                       </div>
                       <CardTitle className="text-lg">No Active Courses</CardTitle>
                       <CardDescription className="max-w-xs mx-auto">You haven't enrolled in any courses yet. Start your journey by exploring our catalog.</CardDescription>
                    </CardHeader>
                    <div className="flex justify-center">
                    <Button variant="outline" asChild className="mt-4 gap-2 border-primary/20 hover:bg-primary hover:text-white transition-all">
                       <Link href="/courses">
                          Browse Catalog <ArrowRight className="w-4 h-4" />
                       </Link>
                    </Button>
                    </div>
                 </Card>
               ) : (
                 <div className="grid sm:grid-cols-2 gap-4">
                    {enrollments.map((enr) => {
                       const totalLessons = 5 // Estimation for demo, usually we sum course.modules.lessons.length
                       const completedPct = Math.min(100, (enr.progress.length / (totalLessons || 1)) * 100)
                       
                       return (
                          <Card key={enr.id} className="group overflow-hidden bg-card/50 border-border/50 hover:border-primary/50 transition-all hover:shadow-2xl hover:shadow-primary/5 shadow-none rounded-2xl">
                             <div className="aspect-2/1 bg-muted relative border-b border-border/20">
                                <img 
                                   src={enr.course.thumbnail || "/placeholder-logo.png"} 
                                   alt={enr.course.title}
                                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-card/80 to-transparent flex items-bottom p-4">
                                   <div className="flex w-full justify-between items-end">
                                      <Badge variant="outline" className="text-[9px] uppercase font-black px-2 py-0.5 shadow-xl shadow-primary/20 bg-primary/10 text-primary border-primary/20">Learning Path</Badge>
                                      <span className="text-[10px] font-black italic text-primary">{Math.round(completedPct)}% DONE</span>
                                   </div>
                                </div>
                             </div>
                             <CardHeader className="pb-4">
                               <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors line-clamp-1">{enr.course.title}</CardTitle>
                               <CardDescription className="line-clamp-1 text-[10px] font-medium tracking-tight">By {enr.course.instructor || "Platform Intelligence"}</CardDescription>
                             </CardHeader>
                             <CardContent className="pb-6">
                                <div className="h-1 w-full bg-muted/50 rounded-full overflow-hidden shadow-inner mb-4">
                                   <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${completedPct}%` }} />
                                </div>
                                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                                   <div className="flex items-center gap-1.5"><BookOpen className="w-3 h-3" /> {enr.course._count.modules} Modules</div>
                                   <div className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> 12h Total</div>
                                </div>
                             </CardContent>
                             <Link href={`/tutor/${enr.courseId}`} className="flex items-center justify-center p-3.5 bg-muted/30 border-t border-border/30 hover:bg-primary/10 transition-colors font-black text-[10px] uppercase tracking-widest text-primary gap-2">
                                Resume Intelligence <ArrowRight className="w-3 h-3" />
                             </Link>
                          </Card>
                       )
                    })}
                 </div>
               )}
            </section>
          </div>

          <aside className="space-y-12 lg:sticky lg:top-24">
            <TutorInsights enrollmentsCount={enrollments.length} />
          </aside>
        </div>
      </main>
    </div>
  )
}
