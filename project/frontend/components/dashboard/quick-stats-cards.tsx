import { Card, CardContent } from "@/components/ui/card"
import { MessageSquare, BookOpen, Award, TrendingUp } from "lucide-react"

export function QuickStatsCards() {
  const stats = [
    {
      label: "AI Interactions",
      value: "452",
      change: "+24 today",
      icon: MessageSquare,
      color: "text-primary",
    },
    {
      label: "Content Ingested",
      value: "18 docs",
      change: "2,450 pages total",
      icon: BookOpen,
      color: "text-primary",
    },
    {
      label: "Mastery Level",
      value: "84%",
      change: "+2% this week",
      icon: Award,
      color: "text-primary",
    },
    {
      label: "Learning Streak",
      value: "14 days",
      change: "On fire! 🔥",
      icon: TrendingUp,
      color: "text-primary",
    },
  ]

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="bg-card border-border/50">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </div>
              <div
                className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center ${stat.color}`}
              >
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
