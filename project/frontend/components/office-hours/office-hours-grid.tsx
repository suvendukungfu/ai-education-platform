"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Video, Users, AlertCircle } from "lucide-react"
import { getOfficeHoursSlots, bookFacultySlot } from "@/lib/db/office-hours"
import { format } from "date-fns"
import { toast } from "sonner"
import type { Batch } from "@/lib/types"

export function OfficeHoursGrid({ batch }: { batch: Batch | null }) {
  const [slots, setSlots] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [booking, setBooking] = useState<string | null>(null)

  useEffect(() => {
    if (!batch) {
      setLoading(false)
      return
    }

    const selectedBatch = batch

    async function loadSlots() {
      try {
        const data = await getOfficeHoursSlots(selectedBatch)
        setSlots(data)
      } catch (error) {
        console.error('Error loading office hours:', error)
        toast.error('Failed to load office hours')
      } finally {
        setLoading(false)
      }
    }
    loadSlots()
  }, [batch])

  const handleBook = async (slotId: string) => {
    if (!batch) {
      toast.error('Please select your batch first')
      return
    }

    const selectedBatch = batch

    setBooking(slotId)
    try {
      await bookFacultySlot(slotId)
      toast.success('Slot booked successfully!')
      // Reload slots
      const data = await getOfficeHoursSlots(selectedBatch)
      setSlots(data)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to book slot')
    } finally {
      setBooking(null)
    }
  }

  if (!batch) {
    return (
      <div className="text-center py-12 space-y-2">
        <AlertCircle className="w-12 h-12 mx-auto text-muted-foreground opacity-50" />
        <p className="text-muted-foreground">Please select your batch to view office hours</p>
      </div>
    )
  }

  if (loading) {
    return <div className="text-center py-8 text-muted-foreground">Loading office hours...</div>
  }

  if (slots.length === 0) {
    return (
      <div className="text-center py-12 space-y-2">
        <Calendar className="w-12 h-12 mx-auto text-muted-foreground opacity-50" />
        <p className="text-muted-foreground">No office hours available for batch {batch}</p>
      </div>
    )
  }

  // Group slots by faculty
  const groupedSlots = slots.reduce((acc: any, slot: any) => {
    const facultyId = slot.faculty_id
    if (!acc[facultyId]) {
      acc[facultyId] = {
        faculty: slot.faculty,
        slots: []
      }
    }
    acc[facultyId].slots.push(slot)
    return acc
  }, {})

  return (
    <div className="space-y-4">
      {Object.values(groupedSlots).map((group: any, idx: number) => (
        <Card key={idx} className="bg-card border-border/50">
          <CardContent className="p-6">
            <div className="flex items-start gap-4 mb-6">
              <Avatar className="w-16 h-16">
                <AvatarImage src={group.faculty?.avatar || "/placeholder.svg"} />
                <AvatarFallback className="bg-foreground text-background">
                  {group.faculty?.name?.split(" ").map((n: string) => n[0]).join("") || "F"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">{group.faculty?.name || 'Unknown Faculty'}</h3>
                <p className="text-sm text-muted-foreground mb-3">{group.faculty?.bio || ''}</p>
                <Badge variant="outline" className="text-xs">
                  Batch {batch}
                </Badge>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-muted-foreground">Available Time Slots</h4>
              <div className="grid md:grid-cols-2 gap-3">
                {group.slots.map((slot: any) => {
                  const slotDate = new Date(slot.scheduled_at)
                  const isToday = slotDate.toDateString() === new Date().toDateString()
                  const isFull = slot.booked_count >= slot.capacity
                  
                  return (
                    <div key={slot.id} className="p-4 rounded-lg bg-background border border-border/50 space-y-3">
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>{isToday ? 'Today' : format(slotDate, 'MMM d')}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>{format(slotDate, 'h:mm a')} ({slot.duration} min)</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          {slot.mode === "online" ? (
                            <>
                              <Video className="w-4 h-4" />
                              <span>Virtual Meeting</span>
                            </>
                          ) : (
                            <>
                              <MapPin className="w-4 h-4" />
                              <span>{slot.location || 'Location TBD'}</span>
                            </>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {slot.booked_count}/{slot.capacity} spots filled
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Topic: {slot.topic || slot.subject}
                        </div>
                      </div>

                      <Button 
                        className="w-full" 
                        disabled={isFull || booking === slot.id}
                        onClick={() => handleBook(slot.id)}
                      >
                        {booking === slot.id ? 'Booking...' : isFull ? "Fully Booked" : "Book This Slot"}
                      </Button>
                    </div>
                  )
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
