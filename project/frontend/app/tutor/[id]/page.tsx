"use client"

import { use, useEffect, useState } from "react"
import api from "@/lib/axios"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { TutorChat } from "@/components/tutor/tutor-chat"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, BookOpen, GraduationCap, ArrowLeft, MoreVertical, Search, FileText } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function TutorPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { id } = use(params)
  const [course, setCourse] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await api.get(`/courses/${id}`)
        setCourse(data)
      } catch (error) {
        toast.error("Failed to sync neural path.")
      } finally {
        setLoading(false)
      }
    }
    fetchCourse()
  }, [id])

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-12 h-12 animate-spin text-electric-blue" /></div>
  if (!course) return <div className="min-h-screen flex items-center justify-center text-xl font-bold">Neural Path Not Found</div>

  const progress = 0 // Calculate based on lessons completed

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardHeader />
      
      <main className="flex-1 container mx-auto px-4 py-8 overflow-hidden">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="space-y-1">
              <h1 className="text-2xl font-bold tracking-tight">{course.title}</h1>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-[10px] py-0 px-2">Level: Core</Badge>
                <span>Instructor: {course.instructor || "AI Tutor"}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <FileText className="w-4 h-4 mr-2" />
              Course PDF
            </Button>
            <Button size="sm">
              <GraduationCap className="w-4 h-4 mr-2" />
              Take Assessment
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Sidebar: Modules & Progress */}
          <Card className="lg:col-span-1 bg-card border-border/50 hidden lg:flex flex-col">
            <CardHeader className="p-4 border-b border-border/40">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-primary" />
                Course Contents
              </CardTitle>
              <div className="mt-2 h-1.5 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: `${progress}%` }} />
              </div>
              <p className="text-[10px] text-muted-foreground mt-1 font-medium">{progress}% Syllabus Mastered</p>
            </CardHeader>
            <CardContent className="p-2 overflow-y-auto">
              {course.modules?.map((m: any, idx: number) => (
                <div 
                  key={m.id} 
                  className={`flex items-center gap-3 p-3 rounded-lg text-xs transition cursor-pointer hover:bg-muted/50 ${
                    idx === 0 ? "bg-primary/5 text-primary border-r-2 border-primary" : "text-muted-foreground"
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full ${
                    idx === 0 ? "bg-primary" : "bg-muted"
                  }`} />
                  <span className={idx === 0 ? "font-semibold" : ""}>{m.title}</span>
                </div>
              ))}
              
              <div className="mt-4 p-4 rounded-lg bg-accent/5 border border-accent/10 space-y-2">
                <p className="text-[10px] font-bold text-accent uppercase tracking-wider">AI Insight</p>
                <p className="text-xs text-muted-foreground leading-relaxed italic">
                  "Neural path is stabilized. Continue your current session to maintain cognitive resonance."
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Main Content: AI Tutor Chat */}
          <div className="lg:col-span-3">
            <TutorChat courseId={id} />
          </div>
        </div>
      </main>
    </div>
  )
}
