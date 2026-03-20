import { Card, CardContent } from "@/components/ui/card"
import { Users, BookOpen, MessageSquare, TrendingUp } from "lucide-react"

export function AdminStats() {
  const stats = [
    {
      label: "Total Users",
      value: "2,456",
      change: "+12% from last month",
      trend: "up",
      icon: Users,
      color: "text-foreground",
    },
    {
      label: "Active Sessions",
      value: "1,248",
      change: "+8% from last month",
      trend: "up",
      icon: BookOpen,
      color: "text-accent",
    },
    {
      label: "Messages Sent",
      value: "45.2k",
      change: "+24% from last month",
      trend: "up",
      icon: MessageSquare,
      color: "text-accent-secondary",
    },
    {
      label: "Match Success Rate",
      value: "87%",
      change: "+3% from last month",
      trend: "up",
      icon: TrendingUp,
      color: "text-accent",
    },
  ]

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="bg-card border-border/50">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div
                className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center ${stat.color}`}
              >
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className={`text-xs ${stat.trend === "up" ? "text-accent" : "text-error"}`}>{stat.change}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
