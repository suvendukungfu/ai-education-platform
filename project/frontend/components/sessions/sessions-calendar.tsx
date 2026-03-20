"use client"

import { useEffect, useMemo, useState } from "react"
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
} from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import { getSessionsForMonth } from "@/lib/db/sessions"

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

type SessionsCalendarProps = {
  refreshKey?: number
}

type CalendarSession = {
  id: string
  scheduled_at: string
}

export function SessionsCalendar({ refreshKey = 0 }: SessionsCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(() => startOfMonth(new Date()))
  const [sessions, setSessions] = useState<CalendarSession[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadSessions() {
      try {
        setLoading(true)
        setError(null)
        const data = await getSessionsForMonth(currentMonth.getFullYear(), currentMonth.getMonth())
        setSessions(
          (data || []).map((session) => ({
            id: session.id,
            scheduled_at: session.scheduled_at,
          }))
        )
      } catch (err) {
        console.error("Error loading sessions calendar", err)
        setError("Unable to load sessions for this month.")
      } finally {
        setLoading(false)
      }
    }

    loadSessions()
  }, [currentMonth, refreshKey])

  const sessionDays = useMemo(() => {
    const counts = new Map<string, number>()
    sessions.forEach((session) => {
      const key = format(new Date(session.scheduled_at), "yyyy-MM-dd")
      counts.set(key, (counts.get(key) ?? 0) + 1)
    })
    return counts
  }, [sessions])

  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentMonth)
    const monthEnd = endOfMonth(currentMonth)
    const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 })
    const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 })
    return eachDayOfInterval({ start: calendarStart, end: calendarEnd })
  }, [currentMonth])

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => startOfMonth(addMonths(prev, -1)))
  }

  const handleNextMonth = () => {
    setCurrentMonth((prev) => startOfMonth(addMonths(prev, 1)))
  }

  return (
    <Card className="bg-card border border-border/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{format(currentMonth, "MMMM yyyy")}</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={handlePrevMonth} aria-label="Previous Month">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleNextMonth} aria-label="Next Month">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2">
          {DAYS.map((day) => (
            <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2 uppercase tracking-wide">
              {day}
            </div>
          ))}

          {loading && (
            <div className="col-span-7 flex flex-col items-center justify-center py-10 text-muted-foreground">
              <Loader2 className="w-5 h-5 animate-spin mb-2" />
              <p className="text-sm">Loading sessions…</p>
            </div>
          )}

          {!loading && error && (
            <div className="col-span-7 text-center text-sm text-destructive py-6">{error}</div>
          )}

          {!loading && !error &&
            calendarDays.map((day) => {
              const key = format(day, "yyyy-MM-dd")
              const count = sessionDays.get(key) ?? 0
              const isCurrentMonth = isSameMonth(day, currentMonth)
              const today = isToday(day)

              return (
                <div
                  key={key}
                  className={`aspect-square flex flex-col items-center justify-center rounded-lg text-sm relative border transition ${
                    today
                      ? "bg-foreground text-background border-foreground"
                      : isCurrentMonth
                        ? "bg-background/70 border-border/40 hover:border-border/60"
                        : "bg-transparent border-transparent text-muted-foreground/70"
                  }`}
                >
                  {format(day, "d")}
                  {count > 0 && (
                    <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-accent" aria-label={`${count} sessions`} />
                  )}
                </div>
              )
            })}
        </div>
      </CardContent>
    </Card>
  )
}
