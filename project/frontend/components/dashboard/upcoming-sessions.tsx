"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Clock, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"

export function TutorInsights() {
  const router = useRouter()
  const [insights, setInsights] = useState<any[]>([
    {
      id: "1",
      topic: "Neural Networks: Backpropagation",
      type: "Summary",
      content: "Explained the chain rule application in weight updates.",
      timestamp: "10 mins ago",
      tags: ["Deep Learning", "Calculus"]
    },
    {
      id: "2",
      topic: "Big O Notation",
      type: "Quiz Result",
      content: "Score: 9/10. Mastered O(log n) concepts.",
      timestamp: "4 hours ago",
      tags: ["Algorithms", "Complexity"]
    }
  ])
  const [loading, setLoading] = useState(false)

  return (
    <Card className="bg-card border-border/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              AI Insights
            </CardTitle>
            <CardDescription>Recent summaries and tutoring highlights</CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/history">View History</Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? (
          <div className="text-center py-4 text-muted-foreground">Loading...</div>
        ) : insights.length === 0 ? (
          <div className="text-center py-8 space-y-2">
            <Sparkles className="w-12 h-12 mx-auto text-muted-foreground opacity-50" />
            <p className="text-muted-foreground">No insights yet</p>
            <Button size="sm" variant="outline" asChild>
              <Link href="/tutor">Start learning</Link>
            </Button>
          </div>
        ) : (
          insights.map((insight) => (
            <div key={insight.id} className="flex items-start gap-4 p-4 rounded-lg bg-background border border-border/50">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold mb-1">{insight.topic}</h3>
                    <p className="text-sm text-muted-foreground">{insight.content}</p>
                  </div>
                  <Badge className="bg-muted text-primary border-0">{insight.type}</Badge>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {insight.timestamp}
                  </div>
                  {insight.tags.map((tag: string) => (
                    <Badge key={tag} variant="outline" className="text-[10px] py-0">{tag}</Badge>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="secondary" onClick={() => router.push(`/history/${insight.id}`)}>
                    View Full Insight
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
