"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react"

const FLAGGED_CONTENT = [
  {
    id: "1",
    type: "post",
    content: "Looking for someone to complete my assignment for money...",
    author: {
      name: "Anonymous User",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    reason: "Academic dishonesty",
    reportedBy: 3,
    timestamp: "1 hour ago",
    status: "pending",
  },
  {
    id: "2",
    type: "message",
    content: "Inappropriate language detected in chat conversation",
    author: {
      name: "John Doe",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    reason: "Inappropriate content",
    reportedBy: 1,
    timestamp: "3 hours ago",
    status: "pending",
  },
  {
    id: "3",
    type: "post",
    content: "Spam content promoting external services",
    author: {
      name: "Spam Account",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    reason: "Spam",
    reportedBy: 5,
    timestamp: "5 hours ago",
    status: "pending",
  },
]

export function ContentModeration() {
  return (
    <Card className="bg-card border-border/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Content Moderation</CardTitle>
          <Badge className="bg-accent-secondary/10 text-accent-secondary border-0">
            {FLAGGED_CONTENT.length} pending
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {FLAGGED_CONTENT.map((item) => (
          <div key={item.id} className="p-4 rounded-lg bg-background border border-border/50 space-y-3">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-accent-secondary flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <Badge variant="outline" className="mb-2">
                      {item.type}
                    </Badge>
                    <p className="text-sm mb-2">{item.content}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={item.author.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-foreground text-background text-xs">
                      {item.author.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground">{item.author.name}</span>
                  <span className="text-xs text-subtle">•</span>
                  <span className="text-xs text-muted-foreground">{item.timestamp}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">
                      Reason: <span className="text-foreground">{item.reason}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Reported by {item.reportedBy} user{item.reportedBy > 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-border/50">
              <Button size="sm" variant="outline" className="flex-1 text-accent bg-transparent">
                <CheckCircle className="w-3 h-3 mr-1" />
                Approve
              </Button>
              <Button size="sm" variant="outline" className="flex-1 text-error bg-transparent">
                <XCircle className="w-3 h-3 mr-1" />
                Remove
              </Button>
              <Button size="sm" variant="outline">
                Review
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
