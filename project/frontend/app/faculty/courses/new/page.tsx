"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FileUp, Loader2, Sparkles, BookOpen } from "lucide-react"
import { toast } from "sonner"

export default function NewCoursePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [courseName, setCourseName] = useState("")
  const [courseDescription, setCourseDescription] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file || !courseName) {
      toast.error("Please provide a course name and upload course materials.")
      return
    }

    setLoading(true)
    try {
      // 1. Upload metadata to Supabase (Omitted for MVP simplicity, focusing on AI ingestion)
      
      // 2. Call AI Engine for Ingestion
      const formData = new FormData()
      formData.append("file", file)
      formData.append("course_id", "course_" + Date.now()) // Temporary ID
      formData.append("course_name", courseName)

      const response = await fetch("http://localhost:8000/ingest", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("AI ingestion failed. Please try again.")
      }

      const result = await response.json()
      toast.success(`Course "${courseName}" created and materials ingested!`)
      router.push("/faculty/dashboard")
    } catch (error: any) {
      console.error("Ingestion error:", error)
      toast.error(error.message || "Something went wrong during ingestion.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Button variant="ghost" onClick={() => router.back()} className="mb-6">
            ← Back to Dashboard
          </Button>
          
          <Card className="bg-card border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Plus className="w-6 h-6 text-primary" />
                Create New AI-Powered Course
              </CardTitle>
              <CardDescription>
                Define your course and upload materials to train your AI tutor.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="courseName">Course Name</Label>
                  <Input 
                    id="courseName" 
                    placeholder="e.g. Introduction to Machine Learning" 
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Short Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="What will students learn in this course?" 
                    value={courseDescription}
                    onChange={(e) => setCourseDescription(e.target.value)}
                    rows={3} 
                  />
                </div>

                <div className="space-y-4">
                  <Label>Course Materials (PDF)</Label>
                  <div 
                    className={`border-2 border-dashed rounded-lg p-10 text-center transition ${
                      file ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                    }`}
                  >
                    <input
                      type="file"
                      id="file-upload"
                      className="hidden"
                      accept=".pdf"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                    />
                    <label htmlFor="file-upload" className="cursor-pointer space-y-4 inline-block w-full">
                      <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto">
                        <FileUp className={`w-6 h-6 ${file ? "text-primary" : "text-muted-foreground"}`} />
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium">
                          {file ? file.name : "Click to upload or drag and drop"}
                        </p>
                        <p className="text-xs text-muted-foreground">PDF (MAX. 50MB)</p>
                      </div>
                    </label>
                  </div>
                  {file && (
                    <p className="text-xs text-primary flex items-center gap-1 font-medium italic">
                      <Sparkles className="w-3 h-3" />
                      Our AI will automatically chunk and index this document for retrieval.
                    </p>
                  )}
                </div>

                <div className="pt-4">
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Ingesting Materials...
                      </>
                    ) : (
                      <>
                        <BookOpen className="w-4 h-4 mr-2" />
                        Create AI Course
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

function Plus({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}
