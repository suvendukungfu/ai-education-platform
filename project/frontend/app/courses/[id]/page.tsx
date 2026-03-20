import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ArrowLeft, BookOpen, Clock, Users,
  PlayCircle, Sparkles,
  ChevronRight, ArrowRight
} from "lucide-react"
import Link from "next/link"
import db from "@/lib/db"
import { auth } from "@/auth"
import { notFound } from "next/navigation"

export default async function CourseDetailPage({ params }: { params: { id: string } }) {
  const session = await auth()
  const { id: courseId } = params

  // Real DB fetch with curriculum hierarchy
  const course = await db.course.findUnique({
    where: { id: courseId },
    include: {
      modules: {
        orderBy: { order: "asc" },
        include: {
          lessons: {
            orderBy: { order: "asc" }
          }
        }
      },
      _count: {
        select: { enrollments: true }
      }
    }
  })

  if (!course) notFound()

  // Check enrollment
  const enrollment = session?.user?.id 
    ? await db.enrollment.findUnique({
        where: { userId_courseId: { userId: session.user.id, courseId } }
      })
    : null

  const isEnrolled = !!enrollment

  return (
    <div className="min-h-screen bg-background text-foreground">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <Link href="/courses" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Catalog
        </Link>
        
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <header className="space-y-4">
               {isEnrolled && (
                  <Badge variant="outline" className="mb-2 uppercase tracking-widest text-[10px] py-1 px-3 border-primary/20 bg-primary/10 text-primary">Active Enrollment</Badge>
               )}
               <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{course.title}</h1>
               <p className="text-xl text-muted-foreground leading-relaxed">{course.description}</p>
               
               <div className="flex flex-wrap items-center gap-6 pt-2">
                  <div className="flex items-center gap-2 text-sm">
                     <Users className="w-4 h-4 text-primary" />
                     <span className="font-semibold">{course._count.enrollments}</span>
                     <span className="text-muted-foreground">Enrolled</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                     <BookOpen className="w-4 h-4 text-primary" />
                     <span className="font-semibold">{course.modules.length}</span>
                     <span className="text-muted-foreground">Modules</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                     By Prof. {course.instructor || "Platform Intelligence"}
                  </div>
               </div>
            </header>

            <Tabs defaultValue="curriculum" className="w-full">
              <TabsList className="bg-card w-full justify-start p-1 h-12 border-border/50">
                <TabsTrigger value="curriculum" className="h-10 px-6 data-[state=active]:bg-background">Curriculum</TabsTrigger>
                <TabsTrigger value="overview" className="h-10 px-6 data-[state=active]:bg-background">Overview</TabsTrigger>
                <TabsTrigger value="reviews" className="h-10 px-6 data-[state=active]:bg-background">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="curriculum" className="mt-8 space-y-6">
                {course.modules.map((module, idx) => (
                  <Card key={module.id} className="border-border/30 bg-card/30 overflow-hidden">
                    <CardHeader className="bg-muted/30 py-4 flex flex-row items-center justify-between border-b border-border/20">
                      <div className="space-y-1">
                         <span className="text-[10px] font-black uppercase text-primary/70 tracking-tighter opacity-70">Module {idx + 1}</span>
                         <CardTitle className="text-lg">{module.title}</CardTitle>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground opacity-30" />
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="divide-y divide-border/20">
                        {module.lessons.map((lesson) => (
                          <div key={lesson.id} className="p-4 flex items-center justify-between hover:bg-muted/50 transition-all group">
                             <div className="flex items-center gap-3">
                                <PlayCircle className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                                <span className="text-sm font-medium">{lesson.title}</span>
                             </div>
                             <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium">
                                <Clock className="w-3 h-3" />
                                15m
                             </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>

          <aside className="space-y-6">
            <Card className="sticky top-24 border-primary/20 bg-card/10 backdrop-blur-md shadow-2xl overflow-hidden group">
               <div className="aspect-video bg-muted relative border-b border-border/50">
                  <img 
                    src={course.thumbnail || "/placeholder-logo.png"} 
                    alt={course.title}
                    className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-background/90 via-transparent to-transparent flex items-center justify-center">
                     <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center border border-primary/40 backdrop-blur-sm shadow-xl animate-pulse">
                        <PlayCircle className="w-6 h-6 text-primary" />
                     </div>
                  </div>
               </div>
               <CardContent className="p-6 space-y-6">
                  <div className="space-y-2">
                     <div className="flex items-center justify-between font-bold text-2xl">
                        Free Access
                        <span className="text-sm text-primary uppercase font-black tracking-widest bg-primary/10 px-2 py-0.5 rounded italic">Edu Plan</span>
                     </div>
                     <p className="text-xs text-muted-foreground">Full lifetime access to course materials and AI Tutor insights.</p>
                  </div>
                  
                  <Separator className="bg-border/50" />
                  
                  <div className="space-y-4">
                     {isEnrolled ? (
                        <div className="space-y-3">
                           <Button asChild className="w-full h-12 font-black text-base shadow-xl shadow-primary/20 bg-primary hover:bg-primary/90 text-primary-foreground">
                              <Link href={`/tutor/${courseId}`}>
                                 RESUME PLATFORM <ArrowRight className="w-4 h-4 ml-2" />
                              </Link>
                           </Button>
                           <p className="text-center text-[10px] text-muted-foreground font-black uppercase tracking-tighter opacity-50">You were enrolled on {new Date(enrollment.createdAt).toLocaleDateString()}</p>
                        </div>
                     ) : (
                        <div className="space-y-3">
                           <Button asChild className="w-full h-12 font-black text-base bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 text-primary-foreground">
                              <Link href={`/enroll/${courseId}`}>
                                 ENROLL NOW <Sparkles className="w-4 h-4 ml-2" />
                              </Link>
                           </Button>
                           <p className="text-center text-[10px] text-muted-foreground font-black uppercase tracking-tighter">Instant access granted upon verification</p>
                        </div>
                     )}
                     
                     <div className="grid grid-cols-2 gap-2 text-[10px] text-center font-bold tracking-tight opacity-70">
                        <div className="p-2 border border-border/30 rounded flex items-center justify-center gap-1 group-hover:border-primary/20 transition-all">
                           <Clock className="w-3 h-3 text-primary" /> Lifetime Access
                        </div>
                        <div className="p-2 border border-border/30 rounded flex items-center justify-center gap-1 group-hover:border-primary/20 transition-all">
                           <Users className="w-3 h-3 text-primary" /> AI Tutor Pro
                        </div>
                     </div>
                  </div>
               </CardContent>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  )
}
