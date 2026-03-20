import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, Circle } from "lucide-react"

const MOCK_GOALS = [
  { id: "1", title: "Master React Hooks", completed: true, progress: 100 },
  { id: "2", title: "Complete 50 Algorithm Problems", completed: false, progress: 72 },
  { id: "3", title: "Build Full-Stack App", completed: false, progress: 45 },
  { id: "4", title: "Learn TypeScript", completed: false, progress: 30 },
  { id: "5", title: "Contribute to Open Source", completed: false, progress: 0 },
]

export function LearningRoadmap() {
  const overallProgress = Math.round(MOCK_GOALS.reduce((sum, goal) => sum + goal.progress, 0) / MOCK_GOALS.length)

  return (
    <Card className="bg-surface border-border">
      <CardHeader>
        <CardTitle>Learning Roadmap</CardTitle>
        <div className="space-y-2 mt-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Overall Progress</span>
            <span className="font-semibold">{overallProgress}%</span>
          </div>
          <Progress value={overallProgress} className="h-2" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {MOCK_GOALS.map((goal) => (
          <div key={goal.id} className="space-y-2">
            <div className="flex items-start gap-3">
              {goal.completed ? (
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              ) : (
                <Circle className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${goal.completed ? "line-through text-muted-foreground" : ""}`}>
                  {goal.title}
                </p>
                {!goal.completed && goal.progress > 0 && (
                  <div className="mt-2 space-y-1">
                    <Progress value={goal.progress} className="h-1.5" />
                    <p className="text-xs text-muted-foreground">{goal.progress}% complete</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
