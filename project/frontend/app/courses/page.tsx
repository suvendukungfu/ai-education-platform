import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, Filter, BookOpen, Clock, Users, ArrowRight, Zap, Sparkles } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cookies } from "next/headers"
import Link from "next/link"
import { ScrollReveal, StaggerContainer, HoverGlow } from "@/components/motion-wrapper"
import { Badge } from "@/components/ui/badge"

export default async function CourseCatalogPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('accessToken')?.value
  
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'
  
  // Real DB fetch via API
  const res = await fetch(`${baseUrl}/courses`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  })
  const courses = await res.json()

  // Check user enrollments
  let enrolledCourseIds = new Set()
  if (token) {
    const enrolledRes = await fetch(`${baseUrl}/courses/enrolled`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    const enrollments = await enrolledRes.json()
    enrolledCourseIds = new Set(enrollments.map((e: any) => e.id))
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-8">
        <header className="mb-12 text-center md:text-left">
          <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-primary to-accent">Explore AI Courses</h1>
          <p className="text-muted-foreground mt-2 text-lg">Acquire future-ready skills with our industry-leading AI curriculum.</p>
        </header>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input className="pl-10 h-12 bg-card border-border/50" placeholder="Search for courses, skills, or instructors..." />
          </div>
          <Button variant="outline" className="h-12 border-border/50 gap-2">
            <Filter className="w-4 h-4" />
            Category
          </Button>
        </div>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.length === 0 ? (
             <ScrollReveal className="col-span-full py-20 text-center space-y-4 opacity-70">
                <BookOpen className="w-16 h-16 mx-auto text-muted-foreground" />
                <p className="text-xl font-medium">No courses available in the catalog yet.</p>
                <p className="text-sm">Course creators are currently finalizing the intelligent curriculum.</p>
             </ScrollReveal>
          ) : (
            courses.map((course: any, idx: number) => {
              // Simulated AI match score
              const matchScore = 85 + (idx % 15)
              
              return (
                <ScrollReveal key={course.id}>
                  <HoverGlow className="h-full">
                    <Card className="group h-full overflow-hidden bg-white/3 backdrop-blur-3xl border-white/5 hover:border-electric-blue/30 transition-all duration-500 relative flex flex-col shadow-2xl shadow-black/40">
                      <div className="absolute inset-0 bg-linear-to-br from-electric-blue/5 to-transparent pointer-events-none" />
                      
                      <div className="aspect-video w-full bg-black relative overflow-hidden">
                         <img 
                          src={course.thumbnail || "/placeholder-logo.png"} 
                          alt={course.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-40 group-hover:opacity-60"
                         />
                         <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
                         
                         {/* Neural Match Badge */}
                         <div className="absolute top-4 right-4 z-20">
                            <Badge className="bg-electric-blue text-black font-black text-[10px] tracking-widest px-3 py-1 shadow-lg shadow-electric-blue/20 animate-pulse">
                               <Sparkles className="w-3 h-3 mr-1" /> {matchScore}% NEURAL MATCH
                            </Badge>
                         </div>

                         <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-[10px] text-muted-foreground uppercase tracking-widest font-black">
                            <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2 py-1 rounded-md border border-white/5">
                               <Clock className="w-3 h-3 text-electric-blue" />
                               {course._count.modules} Modules
                            </div>
                            <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2 py-1 rounded-md border border-white/5">
                               <Users className="w-3 h-3 text-electric-blue" />
                               {course._count.enrollments} Learners
                            </div>
                         </div>
                      </div>

                      <CardHeader className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                           <Zap className="w-3 h-3 text-amber-500" />
                           <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Advanced AI Synthesis</span>
                        </div>
                        <CardTitle className="text-2xl font-black tracking-tight group-hover:text-electric-blue transition-colors leading-tight line-clamp-2">{course.title}</CardTitle>
                        <CardDescription className="line-clamp-2 font-medium text-sm leading-relaxed mt-2">{course.description}</CardDescription>
                      </CardHeader>

                      <CardFooter className="pt-0 flex items-center justify-between border-t border-white/5 mt-4 py-4 bg-white/2">
                        <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 italic">
                          By <span className="text-foreground/60">{course.instructor || "Platform Creator"}</span>
                        </div>
                        {enrolledCourseIds.has(course.id) ? (
                          <Button size="sm" variant="outline" asChild className="font-black text-[10px] uppercase tracking-widest h-9 px-6 rounded-full border-electric-blue/30 text-electric-blue hover:bg-electric-blue hover:text-black transition-all">
                             <Link href={`/courses/${course.id}`}>
                               RESUME LINK <ArrowRight className="w-3 h-3 ml-2" />
                             </Link>
                          </Button>
                        ) : (
                          <Button size="sm" asChild className="font-black text-[10px] uppercase tracking-widest h-9 px-6 rounded-full bg-electric-blue text-black hover:bg-white transition-all shadow-lg shadow-electric-blue/20">
                             <Link href={`/courses/${course.id}`}>
                               ACCESS NEURAL PATH <ArrowRight className="w-3 h-3 ml-2" />
                             </Link>
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  </HoverGlow>
                </ScrollReveal>
              )
            })
          )}
        </StaggerContainer>
      </main>
    </div>
  )
}
