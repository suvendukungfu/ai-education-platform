"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Users, Video, MapPin } from "lucide-react"

const MOCK_OFFICE_HOURS = [
  {
    id: "1",
    title: "CS 101 Office Hours",
    date: "Mon & Wed",
    time: "2:00 PM - 4:00 PM",
    type: "virtual",
    capacity: 8,
    totalBooked: 12,
    status: "active",
  },
  {
    id: "2",
    title: "CS 301 Drop-in Hours",
    date: "Tuesday",
    time: "10:00 AM - 12:00 PM",
    type: "in-person",
    location: "Office 304",
    capacity: 4,
    totalBooked: 8,
    status: "active",
  },
  {
    id: "3",
    title: "Research Project Consultation",
    date: "Thursday",
    time: "3:00 PM - 5:00 PM",
    type: "virtual",
    capacity: 6,
    totalBooked: 3,
    status: "active",
  },
]

export function ManageOfficeHours() {
  return (
    <Card className="bg-card border border-border/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Manage Office Hours</CardTitle>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add New
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {MOCK_OFFICE_HOURS.map((hours) => (
          <div key={hours.id} className="p-4 rounded-lg bg-background/60 border border-border/50">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold mb-1">{hours.title}</h3>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span>{hours.date}</span>
                  <span>•</span>
                  <span>{hours.time}</span>
                </div>
              </div>
              <Badge className="bg-accent/10 text-accent border-0">{hours.status}</Badge>
            </div>

            <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                {hours.type === "virtual" ? (
                  <>
                    <Video className="w-4 h-4" />
                    <span>Virtual</span>
                  </>
                ) : (
                  <>
                    <MapPin className="w-4 h-4" />
                    <span>{hours.location}</span>
                  </>
                )}
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                <span>{hours.totalBooked} total bookings</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Edit className="w-3 h-3 mr-1" />
                Edit
              </Button>
              <Button variant="outline" size="sm" className="text-error hover:text-error bg-transparent">
                <Trash2 className="w-3 h-3 mr-1" />
                Delete
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
