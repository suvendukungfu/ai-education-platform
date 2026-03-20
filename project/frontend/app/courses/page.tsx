import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, Filter, BookOpen, Clock, Users, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import db from "@/lib/db"
import Link from "next/link"
import { auth } from "@/auth"

export default async function CourseCatalogPage() {
  const session = await auth()
  
  // Real DB fetch
  const courses = await db.course.findMany({
    where: { published: true },
    include: {
      _count: {
        select: { modules: true, enrollments: true }
      }
    }
  })

  // Check user enrollments
  const userEnrollments = session?.user?.id 
    ? await db.enrollment.findMany({
        where: { userId: session.user.id },
        select: { courseId: true }
      })
    : []
  
  const enrolledCourseIds = new Set(userEnrollments.map(e => e.courseId))

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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.length === 0 ? (
             <div className="col-span-full py-20 text-center space-y-4 opacity-70">
                <BookOpen className="w-16 h-16 mx-auto text-muted-foreground" />
                <p className="text-xl font-medium">No courses available in the catalog yet.</p>
                <p className="text-sm">Course creators are currently finalizing the intelligent curriculum.</p>
             </div>
          ) : (
            courses.map((course) => (
              <Card key={course.id} className="group overflow-hidden bg-card/50 border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5">
                <div className="aspect-video w-full bg-muted relative overflow-hidden">
                   <img 
                    src={course.thumbnail || "/placeholder-logo.png"} 
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60"
                   />
                   <div className="absolute inset-0 bg-linear-to-t from-background/90 to-transparent" />
                   <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                      <div className="flex items-center gap-1">
                         <Clock className="w-3 h-3" />
                         {course._count.modules} Modules
                      </div>
                      <div className="flex items-center gap-1">
                         <Users className="w-3 h-3" />
                         {course._count.enrollments} Learners
                      </div>
                   </div>
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-1 group-hover:text-primary transition-colors">{course.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                </CardHeader>
                <CardFooter className="pt-0 flex items-center justify-between">
                  <div className="text-xs italic text-muted-foreground">
                    By {course.instructor || "Platform Creator"}
                  </div>
                  {enrolledCourseIds.has(course.id) ? (
                    <Button size="sm" variant="secondary" asChild className="font-bold">
                       <Link href={`/courses/${course.id}`}>
                         Resume <ArrowRight className="w-3 h-3 ml-1" />
                       </Link>
                    </Button>
                  ) : (
                    <Button size="sm" asChild className="font-bold">
                       <Link href={`/courses/${course.id}`}>
                         Details <ArrowRight className="w-3 h-3 ml-1" />
                       </Link>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  )
}
