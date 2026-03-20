import { Card, CardContent } from "@/components/ui/card"
import { Users, Calendar, Clock, TrendingUp } from "lucide-react"

export function FacultyStats() {
  const stats = [
    {
      label: "Active Students",
      value: "48",
      change: "+12 this month",
      icon: Users,
      color: "text-brand",
    },
    {
      label: "Office Hours This Week",
      value: "8",
      change: "16 hours total",
      icon: Calendar,
      color: "text-accent",
    },
    {
      label: "Appointments Booked",
      value: "24",
      change: "6 this week",
      icon: Clock,
      color: "text-accent-secondary",
    },
    {
      label: "Student Satisfaction",
      value: "4.8/5",
      change: "Based on 32 reviews",
      icon: TrendingUp,
      color: "text-accent",
    },
  ]

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="bg-surface border-border">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-subtle">{stat.change}</p>
              </div>
              <div
                className={`w-10 h-10 rounded-lg bg-surface-elevated flex items-center justify-center ${stat.color}`}
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
