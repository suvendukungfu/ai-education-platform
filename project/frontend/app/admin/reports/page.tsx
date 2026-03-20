import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, FileText, Users, Activity, TrendingUp } from "lucide-react"

export default function ReportsPage() {
  const reports = [
    {
      title: "User Activity Report",
      description: "Detailed breakdown of user engagement and activity metrics",
      icon: Activity,
      period: "Last 30 days",
    },
    {
      title: "Matching Performance",
      description: "Algorithm effectiveness and match acceptance rates",
      icon: TrendingUp,
      period: "Last quarter",
    },
    {
      title: "User Demographics",
      description: "Student and faculty distribution across departments",
      icon: Users,
      period: "Current semester",
    },
    {
      title: "Session Analytics",
      description: "Completion rates, duration, and satisfaction scores",
      icon: FileText,
      period: "Last 60 days",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Analytics Reports</h1>
          <p className="text-muted-foreground">Generate and download comprehensive platform reports</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {reports.map((report) => (
            <Card key={report.title} className="bg-card border border-border/50">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-foreground/10 flex items-center justify-center">
                      <report.icon className="w-6 h-6 text-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-lg mb-1">{report.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{report.description}</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{report.period}</span>
                  <Button size="sm" variant="outline">
                    <Download className="w-3 h-3 mr-2" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
