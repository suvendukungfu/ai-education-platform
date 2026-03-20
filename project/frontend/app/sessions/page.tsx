"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { SessionsCalendar } from "@/components/sessions/sessions-calendar"
import { SessionsList } from "@/components/sessions/sessions-list"
import { BookingModal } from "@/components/sessions/booking-modal"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function SessionsPage() {
  const [bookingOpen, setBookingOpen] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  const handleSessionCreated = () => {
    setRefreshKey((prev) => prev + 1)
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Sessions</h1>
            <p className="text-muted-foreground">Manage your learning sessions and schedule new ones</p>
          </div>
          <Button onClick={() => setBookingOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Book New Session
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <SessionsCalendar refreshKey={refreshKey} />
          </div>
          <div>
            <SessionsList refreshKey={refreshKey} />
          </div>
        </div>
      </main>

      <BookingModal
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        onSessionCreated={handleSessionCreated}
      />
    </div>
  )
}
