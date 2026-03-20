import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Clock, Video, MessageSquare } from "lucide-react"

const MOCK_APPOINTMENTS = [
  {
    id: "1",
    student: {
      name: "John Doe",
      course: "CS 101",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    time: "Today, 2:00 PM",
    duration: "30 min",
    type: "virtual",
    topic: "Help with React Hooks",
  },
  {
    id: "2",
    student: {
      name: "Jane Smith",
      course: "CS 301",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    time: "Today, 3:30 PM",
    duration: "30 min",
    type: "virtual",
    topic: "Algorithm complexity questions",
  },
  {
    id: "3",
    student: {
      name: "Alex Kumar",
      course: "CS 201",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    time: "Tomorrow, 10:00 AM",
    duration: "45 min",
    type: "in-person",
    topic: "Project proposal review",
  },
]

export function UpcomingAppointments() {
  return (
    <Card className="bg-card border border-border/50">
      <CardHeader>
        <CardTitle className="text-lg">Upcoming Appointments</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {MOCK_APPOINTMENTS.map((appointment) => (
          <div key={appointment.id} className="p-4 rounded-lg bg-background/60 border border-border/50 space-y-3">
            <div className="flex items-start gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={appointment.student.avatar || "/placeholder.svg"} />
                <AvatarFallback className="bg-foreground text-background">
                  {appointment.student.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm">{appointment.student.name}</h4>
                <p className="text-xs text-muted-foreground">{appointment.student.course}</p>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5" />
                <span>
                  {appointment.time} • {appointment.duration}
                </span>
              </div>
              <p className="text-foreground text-sm">{appointment.topic}</p>
            </div>

            <div className="flex items-center gap-2">
              <Button size="sm" className="flex-1">
                <Video className="w-3 h-3 mr-1" />
                Join
              </Button>
              <Button size="sm" variant="outline">
                <MessageSquare className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
