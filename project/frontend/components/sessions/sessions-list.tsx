"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { format } from "date-fns"
import { Calendar, Clock, MapPin, Video } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getUpcomingSessions } from "@/lib/db/sessions"

type SessionWithRelations = {
  id: string
  skill: string | null
  subject?: string | null
  scheduled_at: string | null
  duration: number | null
  mode: string | null
  status: string | null
  meeting_link?: string | null
  location?: string | null
  mentor?: { id: string; name: string | null } | null
  learner?: { id: string; name: string | null } | null
}

const STATUS_STYLES: Record<string, string> = {
  confirmed: "bg-accent/10 text-accent",
  pending: "bg-amber-400/15 text-amber-300",
  cancelled: "bg-destructive/10 text-destructive",
  default: "bg-muted text-foreground",
}

type SessionsListProps = {
  refreshKey?: number
}

export function SessionsList({ refreshKey = 0 }: SessionsListProps) {
  const [sessions, setSessions] = useState<SessionWithRelations[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadSessions() {
      try {
        setLoading(true)
        setError(null)
        const data = await getUpcomingSessions()
        setSessions((data ?? []) as SessionWithRelations[])
      } catch (err) {
        console.error("Error loading sessions", err)
        setError("We couldn't load your sessions. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    loadSessions()
  }, [refreshKey])

  const content = () => {
    if (loading) {
      return (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <SessionsSkeleton key={index} />
          ))}
        </div>
      )
    }

    if (error) {
      return <p className="text-sm text-destructive text-center py-6">{error}</p>
    }

    if (!sessions.length) {
      return (
        <p className="text-sm text-muted-foreground text-center py-6">
          No sessions scheduled yet. Book a session to see it appear here.
        </p>
      )
    }

    return (
      <div className="space-y-4">
        {sessions.map((session) => {
          const scheduledAt = session.scheduled_at ? new Date(session.scheduled_at) : null
          const dateLabel = scheduledAt ? format(scheduledAt, "MMM d, yyyy") : "Date TBA"
          const timeLabel = scheduledAt ? format(scheduledAt, "h:mm a") : "Time TBA"
          const isVirtual = (session.mode ?? "").toLowerCase().includes("online") || (session.mode ?? "") === "virtual"
          const status = session.status?.toLowerCase() ?? "default"
          const badgeStyle = STATUS_STYLES[status] ?? STATUS_STYLES.default
          const topic = session.skill || session.subject || "Learning Session"
          const participants = `${session.mentor?.name ?? "Mentor TBD"} ↔ ${session.learner?.name ?? "Learner TBD"}`

          return (
            <div key={session.id} className="p-4 rounded-lg bg-background/70 border border-border/40 space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="font-semibold mb-1 text-base">{topic}</h4>
                  <p className="text-sm text-muted-foreground">{participants}</p>
                </div>
                <Badge variant="secondary" className={`border-0 text-xs capitalize ${badgeStyle}`}>
                  {status}
                </Badge>
              </div>

              <div className="space-y-1.5 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{dateLabel}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{timeLabel}</span>
                </div>
                <div className="flex items-center gap-2">
                  {isVirtual ? (
                    <>
                      <Video className="w-3.5 h-3.5" />
                      <span>Online session</span>
                    </>
                  ) : (
                    <>
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{session.location || "On campus"}</span>
                    </>
                  )}
                </div>
              </div>

              {status === "confirmed" && (
                <Button size="sm" className="w-full" variant={isVirtual ? "default" : "secondary"} asChild={Boolean(isVirtual && session.meeting_link)}>
                  {isVirtual && session.meeting_link ? (
                    <Link href={session.meeting_link} target="_blank" rel="noreferrer">
                      Join Session
                    </Link>
                  ) : (
                    <span>{isVirtual ? "Join Session" : "View Details"}</span>
                  )}
                </Button>
              )}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <Card className="bg-card border border-border/50">
      <CardHeader>
        <CardTitle className="text-lg">Upcoming Sessions</CardTitle>
      </CardHeader>
      <CardContent>{content()}</CardContent>
    </Card>
  )
}

function SessionsSkeleton() {
  return (
    <div className="space-y-3 p-4 rounded-lg bg-background/60 border border-border/40">
      <div className="h-4 w-1/2 rounded bg-muted/50 animate-pulse" />
      <div className="h-3.5 w-1/3 rounded bg-muted/40 animate-pulse" />
      <div className="h-8 w-full rounded bg-muted/30 animate-pulse" />
    </div>
  )
}
