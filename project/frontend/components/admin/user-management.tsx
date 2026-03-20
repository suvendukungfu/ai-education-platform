"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, MoreVertical } from "lucide-react"

const RECENT_USERS = [
  {
    id: "1",
    name: "John Doe",
    email: "john@university.edu",
    role: "student",
    status: "active",
    joinedAt: "2 days ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@university.edu",
    role: "student",
    status: "active",
    joinedAt: "5 days ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "3",
    name: "Dr. Michael Chen",
    email: "mchen@university.edu",
    role: "faculty",
    status: "active",
    joinedAt: "1 week ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "4",
    name: "Sarah Williams",
    email: "sarah@university.edu",
    role: "student",
    status: "suspended",
    joinedAt: "2 weeks ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

export function UserManagement() {
  return (
    <Card className="bg-card border-border/50">
      <CardHeader>
        <CardTitle className="text-lg">Recent Users</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input type="search" placeholder="Search users..." className="pl-9 bg-background" />
        </div>

        <div className="space-y-3">
          {RECENT_USERS.map((user) => (
            <div key={user.id} className="p-3 rounded-lg bg-background border border-border/50">
              <div className="flex items-start gap-3 mb-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-foreground text-background text-xs">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-sm truncate">{user.name}</h4>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <MoreVertical className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={`text-xs ${user.role === "faculty" ? "bg-muted text-foreground border-border/50" : ""}`}
                  >
                    {user.role}
                  </Badge>
                  <Badge
                    variant={user.status === "active" ? "default" : "secondary"}
                    className={`text-xs ${
                      user.status === "active" ? "bg-accent/10 text-accent border-0" : "bg-error/10 text-error border-0"
                    }`}
                  >
                    {user.status}
                  </Badge>
                </div>
                <span className="text-xs text-muted-foreground">{user.joinedAt}</span>
              </div>
            </div>
          ))}
        </div>

        <Button variant="outline" className="w-full bg-transparent">
          View All Users
        </Button>
      </CardContent>
    </Card>
  )
}
