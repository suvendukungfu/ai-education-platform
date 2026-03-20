import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users } from "lucide-react"

const TRENDING_TAGS = [
  { tag: "React", posts: 124 },
  { tag: "Algorithms", posts: 98 },
  { tag: "Python", posts: 87 },
  { tag: "Study Group", posts: 76 },
  { tag: "Help Needed", posts: 65 },
]

const ACTIVE_USERS = [
  { name: "Sarah Chen", skillPoints: 2450, avatar: "/placeholder.svg?height=32&width=32" },
  { name: "Marcus Johnson", skillPoints: 2180, avatar: "/placeholder.svg?height=32&width=32" },
  { name: "Emily Rodriguez", skillPoints: 1950, avatar: "/placeholder.svg?height=32&width=32" },
  { name: "Alex Kumar", skillPoints: 1820, avatar: "/placeholder.svg?height=32&width=32" },
]

export function FeedSidebar() {
  return (
    <div className="space-y-6 sticky top-24">
      {/* Trending Topics */}
      <Card className="bg-card border border-border/50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-foreground" />
            Trending Topics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {TRENDING_TAGS.map((item, index) => (
            <div
              key={item.tag}
              className="flex items-center justify-between p-2 rounded hover:bg-background transition cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-muted-foreground w-5">#{index + 1}</span>
                <Badge variant="outline">{item.tag}</Badge>
              </div>
              <span className="text-xs text-muted-foreground">{item.posts} posts</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Top Contributors */}
      <Card className="bg-card border border-border/50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="w-5 h-5 text-foreground" />
            Top Contributors
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {ACTIVE_USERS.map((user, index) => (
            <div
              key={user.name}
              className="flex items-center gap-3 p-2 rounded hover:bg-background/70 transition cursor-pointer"
            >
              <span className="text-xs font-semibold text-muted-foreground w-5">{index + 1}</span>
              <div className="w-8 h-8 rounded-full bg-foreground/10 flex items-center justify-center">
                <span className="text-xs font-semibold text-foreground">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.skillPoints} SP</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
