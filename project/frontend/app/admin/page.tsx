import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { 
  ShieldCheck, Activity, Users, BookOpen, 
  Plus, Settings, Database, Server,
  BrainCircuit, LayoutGrid, CheckCircle2, AlertTriangle, ArrowRight
} from "lucide-react"
import db from "@/lib/db"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import Link from "next/link"

export default async function AdminDashboardPage() {
  const session = await auth()

  // Strict Admin Check
  if (!session?.user?.id || (session.user as any).role !== "ADMIN") {
      redirect("/dashboard")
  }

  // System Stats
  const usersCount = await db.user.count()
  const coursesCount = await db.course.count()
  const enrollmentsCount = await db.enrollment.count()
  
  // Recent Content
  const courses = await db.course.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      include: {
          _count: { select: { enrollments: true, modules: true } }
      }
  })

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
             <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px]">
                <ShieldCheck className="w-3 h-3" /> Root Access Granted
             </div>
             <h1 className="text-4xl font-black tracking-tighter">System Administration</h1>
             <p className="text-muted-foreground font-medium">Global platform orchestration and curriculum management.</p>
          </div>
          
          <div className="flex items-center gap-3">
             <Button variant="outline" className="gap-2 border-border/50 text-xs font-bold h-10 px-4">
                <Settings className="w-4 h-4" /> Config
             </Button>
             <Button className="gap-2 shadow-xl shadow-primary/20 text-xs font-bold h-10 px-4 bg-primary hover:bg-primary/90" asChild>
                <Link href="/faculty/courses/new">
                   <Plus className="w-4 h-4" /> New Course
                </Link>
             </Button>
          </div>
        </header>

        {/* Global Key Stats */}
        <div className="grid md:grid-cols-4 gap-4">
           {[
              { label: "Total Users", value: usersCount, icon: Users, color: "text-blue-500" },
              { label: "AI Courses", value: coursesCount, icon: BrainCircuit, color: "text-purple-500" },
              { label: "Learner Enrollments", value: enrollmentsCount, icon: BookOpen, color: "text-green-500" },
              { label: "API Uptime", value: "99.9%", icon: Activity, color: "text-orange-500" }
           ].map((stat, i) => (
              <Card key={i} className="border-border/30 bg-card/10 backdrop-blur-sm group hover:border-primary/20 transition-all">
                 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-4">
                    <CardTitle className="text-[10px] font-black uppercase tracking-widest opacity-50">{stat.label}</CardTitle>
                    <stat.icon className={`h-4 w-4 ${stat.color} opacity-70 group-hover:scale-110 transition-transform`} />
                 </CardHeader>
                 <CardContent className="pb-4">
                    <div className="text-2xl font-black tabular-nums">{stat.value}</div>
                    <p className="text-[10px] text-muted-foreground mt-1">+12% from last cycle</p>
                 </CardContent>
              </Card>
           ))}
        </div>

        <Tabs defaultValue="overview" className="w-full">
           <TabsList className="bg-card w-full justify-start border-border/50 h-11 p-1 rounded-xl">
              <TabsTrigger value="overview" className="px-6 h-9 data-[state=active]:bg-background rounded-lg text-xs font-bold">Fleet Overview</TabsTrigger>
              <TabsTrigger value="courses" className="px-6 h-9 data-[state=active]:bg-background rounded-lg text-xs font-bold">Course Infrastructure</TabsTrigger>
              <TabsTrigger value="users" className="px-6 h-9 data-[state=active]:bg-background rounded-lg text-xs font-bold">Node Management</TabsTrigger>
           </TabsList>
           
            <TabsContent value="overview" className="mt-6">
              <div className="grid lg:grid-cols-3 gap-8">
                 <div className="lg:col-span-2 space-y-8">
                    {/* Neural Connectivity Chart (NEW) */}
                    <Card className="border-border/50 bg-card/20 shadow-none overflow-hidden rounded-2xl p-8 relative group">
                       <div className="flex items-center justify-between mb-8">
                          <div>
                             <CardTitle className="text-xl font-bold flex items-center gap-2">
                                <Activity className="w-5 h-5 text-primary" /> Neural Connectivity
                             </CardTitle>
                             <CardDescription className="text-xs">Real-time edge node synchronization frequency.</CardDescription>
                          </div>
                          <Badge variant="outline" className="animate-pulse bg-primary/5 border-primary/20 text-primary">LIVE SYNC</Badge>
                       </div>
                       
                       <div className="h-32 flex items-end gap-1 px-2">
                          {[40, 70, 45, 90, 65, 80, 50, 85, 40, 75, 45, 95, 60, 80, 55, 90, 45, 70].map((h, i) => (
                             <div 
                                key={i} 
                                className="flex-1 bg-primary/20 rounded-t-sm hover:bg-primary transition-all duration-500 cursor-crosshair group/bar relative"
                                style={{ height: `${h}%` }}
                             >
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-opacity bg-black text-[8px] px-1 rounded border border-white/10">{h}ms</div>
                             </div>
                          ))}
                       </div>
                       <div className="flex justify-between mt-4 text-[8px] font-black uppercase tracking-widest opacity-30">
                          <span>00:00 UTC</span>
                          <span>SYNCHRONIZED NODES (128/128)</span>
                          <span>04:46 UTC</span>
                       </div>
                    </Card>

                    <Card className="border-border/50 bg-card/20 shadow-none overflow-hidden rounded-2xl">
                       <CardHeader className="pb-2">
                          <CardTitle className="text-lg font-bold">Recent Course Uploads</CardTitle>
                          <CardDescription className="text-xs">Live curriculum node synchronization status.</CardDescription>
                       </CardHeader>
                       <CardContent className="p-0">
                          <div className="divide-y divide-border/20">
                             {courses.map(course => (
                                <div key={course.id} className="p-4 flex items-center justify-between hover:bg-muted/30 transition-all px-6">
                                   <div className="flex items-center gap-4">
                                      <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center border border-border/30 overflow-hidden">
                                         <img 
                                            src={course.thumbnail || "/placeholder-logo.png"} 
                                            alt={course.title}
                                            className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 transition-all duration-700"
                                          />
                                      </div>
                                      <div className="space-y-0.5">
                                         <span className="text-sm font-black tracking-tight">{course.title}</span>
                                         <div className="flex items-center gap-2 text-[10px] opacity-50 uppercase font-black tracking-tighter">
                                            <span>{course._count.modules} Modules</span>
                                            <span className="w-1 h-1 bg-border rounded-full" />
                                            <span>{course._count.enrollments} Students</span>
                                         </div>
                                      </div>
                                   </div>
                                   <Badge variant={course.published ? "outline" : "secondary"} className="text-[9px] font-black uppercase rounded-lg border-primary/20 bg-primary/10 text-primary">
                                      {course.published ? "Active" : "Draft"}
                                   </Badge>
                                </div>
                             ))}
                          </div>
                       </CardContent>
                       <div className="p-3 bg-muted/20 border-t border-border/10 text-center">
                          <Button variant="ghost" size="sm" className="w-full text-[10px] font-black uppercase tracking-widest opacity-50 hover:opacity-100 hover:bg-transparent">
                             Manage Entire Fleet <ArrowRight className="w-3 h-3 ml-2" />
                          </Button>
                       </div>
                    </Card>

                    {/* System Audit Log (NEW) */}
                    <Card className="border-border/50 bg-card/20 shadow-none rounded-2xl">
                       <CardHeader className="pb-4">
                          <CardTitle className="text-sm font-black uppercase tracking-[0.2em]">System Audit Log</CardTitle>
                       </CardHeader>
                       <CardContent className="p-0">
                          <div className="divide-y divide-border/10 pb-4">
                             {[
                                { msg: "Course 'GenAI Masterclass' node state changed to PUBLISHED", time: "2m ago", type: "UPDATE" },
                                { msg: "New Administrative authentication from 192.168.1.1", time: "15m ago", type: "SECURITY" },
                                { msg: "Automated database optimization cycle completed", time: "1h ago", type: "SYSTEM" }
                             ].map((log, i) => (
                                <div key={i} className="px-6 py-4 flex items-center justify-between group">
                                   <div className="flex items-center gap-4">
                                      <div className={`w-1.5 h-1.5 rounded-full ${log.type === 'SECURITY' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'bg-primary'}`} />
                                      <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">{log.msg}</span>
                                   </div>
                                   <span className="text-[10px] font-black tabular-nums opacity-30 group-hover:opacity-100">{log.time}</span>
                                </div>
                             ))}
                          </div>
                       </CardContent>
                    </Card>
                 </div>
                 
                 <aside className="space-y-6">
                    <Card className="border-border/50 bg-card/10 shadow-none rounded-2xl">
                       <CardHeader>
                          <CardTitle className="text-lg font-bold flex items-center gap-2">
                             <Server className="w-4 h-4 text-primary" /> Core Systems
                          </CardTitle>
                       </CardHeader>
                       <CardContent className="space-y-4">
                          {[
                             { name: "Prisma Engine", status: "ONLINE", icon: Database, color: "text-green-500" },
                             { name: "FastAPI AI Engine", status: "STANDBY", icon: BrainCircuit, color: "text-orange-500" },
                             { name: "Edge Middleware", status: "ONLINE", icon: Activity, color: "text-green-500" }
                          ].map((sys, i) => (
                             <div key={i} className="flex items-center justify-between p-3.5 rounded-xl bg-background border border-border/10">
                                <div className="flex items-center gap-3">
                                   <sys.icon className={`w-4 h-4 ${sys.color}`} />
                                   <span className="text-xs font-bold tracking-tight">{sys.name}</span>
                                </div>
                                <span className={`text-[10px] font-black tracking-tighter ${sys.color}`}>{sys.status}</span>
                             </div>
                          ))}
                       </CardContent>
                    </Card>
                    
                    <div className="p-6 rounded-2xl bg-primary/10 border border-primary/20 space-y-2">
                       <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary">
                          <AlertTriangle className="w-4 h-4 italic" /> System Advisory
                       </div>
                       <p className="text-xs font-medium leading-relaxed italic opacity-80">System load is optimal. Node replication successful. Next intelligence rebuild cycle scheduled for 04:00 AM UTC.</p>
                    </div>
                 </aside>
              </div>
           </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
