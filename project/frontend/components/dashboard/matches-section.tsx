"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Sparkles, MessageSquare, Plus, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export function CourseSection() {
  const router = useRouter()
  const [courses, setCourses] = useState<any[]>([
    {
      id: "1",
      name: "Introduction to Machine Learning",
      description: "Foundational concepts and algorithms",
      progress: 65,
      tutorReady: true,
      lastAccessed: "2h ago"
    },
    {
      id: "2",
      name: "Advanced Calculus II",
      description: "Multivariable calculus and analysis",
      progress: 42,
      tutorReady: true,
      lastAccessed: "1d ago"
    },
    {
      id: "3",
      name: "Data Structures & Algorithms",
      description: "Essential DSA for efficient coding",
      progress: 12,
      tutorReady: false,
      lastAccessed: "3d ago"
    }
  ])
  const [loading, setLoading] = useState(false)

  const handleTutor = (courseId: string) => {
    router.push(`/tutor/${courseId}`)
  }

  const handleCourse = (courseId: string) => {
    router.push(`/courses/${courseId}`)
  }

  return (
    <Card className="bg-card border-border/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              Active AI Courses
            </CardTitle>
            <CardDescription>Courses with active AI-tutor ingestion</CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/courses">View Catalog</Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? (
          <div className="text-center py-8 text-muted-foreground">Loading courses...</div>
        ) : courses.length === 0 ? (
          <div className="text-center py-8 space-y-2">
            <BookOpen className="w-12 h-12 mx-auto text-muted-foreground opacity-50" />
            <p className="text-muted-foreground">No active courses</p>
            <p className="text-sm text-muted-foreground">Browse the catalog to get started</p>
          </div>
        ) : (
          courses.map((course) => (
            <div
              key={course.id}
              className="flex items-start gap-4 p-4 rounded-lg bg-background border border-border/50 hover:border-border transition"
            >
              <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold">{course.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">{course.description}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary" className="bg-muted text-primary border-0">
                      {course.progress}% Mastery
                    </Badge>
                    <p className="text-[10px] text-muted-foreground mt-1">Last seen {course.lastAccessed}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    size="sm" 
                    onClick={() => handleTutor(course.id)}
                    disabled={!course.tutorReady}
                  >
                    <Sparkles className="w-3 h-3 mr-1" />
                    AI Tutor
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleCourse(course.id)}
                  >
                    Course Content
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
