"use client"

import { FormEvent, useEffect, useMemo, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Video, MapPin } from "lucide-react"
import { toast } from "sonner"

import { getMatches } from "@/lib/db/matches"
import { createSession } from "@/lib/db/sessions"

interface BookingModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSessionCreated?: () => void
}

type MatchOption = {
  id: string
  name: string
  avatar?: string | null
  matchScore?: number
}

type SessionType = "virtual" | "in-person"
type SessionRole = "mentor" | "learner"

const DEFAULT_FORM = {
  matchId: "",
  skill: "",
  notes: "",
  date: "",
  time: "",
  duration: "60",
  sessionType: "virtual" as SessionType,
  meetingLink: "",
  location: "",
  role: "mentor" as SessionRole,
}

export function BookingModal({ open, onOpenChange, onSessionCreated }: BookingModalProps) {
  const [form, setForm] = useState(DEFAULT_FORM)
  const [matches, setMatches] = useState<MatchOption[]>([])
  const [loadingMatches, setLoadingMatches] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!open) {
      return
    }

    async function loadMatches() {
      try {
        setLoadingMatches(true)
        const data = await getMatches(25)
        setMatches(data as MatchOption[])
      } catch (err) {
        console.error("Error loading matches", err)
        toast.error("Unable to load your matches right now.")
      } finally {
        setLoadingMatches(false)
      }
    }

    loadMatches()
  }, [open])

  const selectedPartner = useMemo(() => matches.find((match) => match.id === form.matchId), [matches, form.matchId])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!form.matchId) {
      toast.error("Select a learning partner")
      return
    }

    if (!form.skill.trim()) {
      toast.error("Add the skill or topic you want to cover")
      return
    }

    if (!form.date || !form.time) {
      toast.error("Choose a date and time for the session")
      return
    }

    if (!form.duration) {
      toast.error("Select a duration")
      return
    }

    if (form.sessionType === "virtual" && !form.meetingLink.trim()) {
      toast.error("Add a meeting link for virtual sessions")
      return
    }

    if (form.sessionType === "in-person" && !form.location.trim()) {
      toast.error("Add a location for in-person sessions")
      return
    }

    const scheduledAt = new Date(`${form.date}T${form.time}`)

    if (Number.isNaN(scheduledAt.getTime())) {
      toast.error("Invalid date or time")
      return
    }

    try {
      setSubmitting(true)
      await createSession({
        partnerId: form.matchId,
        role: form.role,
        skill: form.skill.trim(),
        scheduledAt: scheduledAt.toISOString(),
        duration: Number(form.duration),
        mode: form.sessionType === "virtual" ? "online" : "offline",
        meetingLink: form.sessionType === "virtual" ? form.meetingLink.trim() : null,
        location: form.sessionType === "in-person" ? form.location.trim() : null,
      })

      toast.success("Session booked successfully!")
      setForm(DEFAULT_FORM)
      onSessionCreated?.()
      onOpenChange(false)
    } catch (error: any) {
      toast.error(error?.message || "Unable to book the session. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border border-border/50 max-w-xl">
        <DialogHeader>
          <DialogTitle>Book a Learning Session</DialogTitle>
          <DialogDescription>Schedule time with a match to collaborate and stay accountable.</DialogDescription>
        </DialogHeader>

        {selectedPartner && (
          <div className="flex items-center gap-3 p-3 rounded-lg bg-background/80 border border-border/40">
            <Avatar className="w-10 h-10">
              <AvatarImage src={selectedPartner.avatar || "/placeholder.svg"} />
              <AvatarFallback className="bg-foreground text-background">
                {selectedPartner.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-sm">{selectedPartner.name}</p>
              <p className="text-xs text-muted-foreground">Confirmed learning partner</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="partner">Select partner</Label>
            <Select
              value={form.matchId}
              onValueChange={(value) => setForm((prev) => ({ ...prev, matchId: value }))}
              disabled={loadingMatches || matches.length === 0}
            >
              <SelectTrigger id="partner" className="bg-background/80">
                <SelectValue placeholder={loadingMatches ? "Loading matches..." : "Choose a match"} />
              </SelectTrigger>
              <SelectContent>
                {matches.map((match) => (
                  <SelectItem key={match.id} value={match.id}>
                    <div className="flex items-center gap-2">
                      <span>{match.name}</span>
                      {typeof match.matchScore === "number" && (
                        <span className="text-xs text-muted-foreground">{match.matchScore}% match</span>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {!loadingMatches && !matches.length && (
              <p className="text-xs text-muted-foreground">You have no matches yet.</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="role">Your role</Label>
              <Select
                value={form.role}
                onValueChange={(value: SessionRole) => setForm((prev) => ({ ...prev, role: value }))}
              >
                <SelectTrigger id="role" className="bg-background/80">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mentor">Mentor</SelectItem>
                  <SelectItem value="learner">Learner</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Select
                value={form.duration}
                onValueChange={(value) => setForm((prev) => ({ ...prev, duration: value }))}
              >
                <SelectTrigger id="duration" className="bg-background/80">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="90">1.5 hours</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="skill">Skill / topic</Label>
            <Input
              id="skill"
              placeholder="e.g., React Hooks Deep Dive"
              className="bg-background/80"
              value={form.skill}
              onChange={(event) => setForm((prev) => ({ ...prev, skill: event.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea
              id="notes"
              placeholder="What do you want to cover in this session?"
              className="bg-background/80"
              value={form.notes}
              onChange={(event) => setForm((prev) => ({ ...prev, notes: event.target.value }))}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                className="bg-background/80"
                value={form.date}
                onChange={(event) => setForm((prev) => ({ ...prev, date: event.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                className="bg-background/80"
                value={form.time}
                onChange={(event) => setForm((prev) => ({ ...prev, time: event.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label>Session type</Label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, sessionType: "virtual" }))}
                className={`p-4 rounded-lg border-2 transition flex flex-col items-center gap-2 ${
                  form.sessionType === "virtual"
                    ? "border-foreground bg-foreground/10 text-foreground"
                    : "border-border/50 hover:border-border"
                }`}
              >
                <Video className="w-5 h-5" />
                <span className="font-medium text-sm">Virtual</span>
              </button>
              <button
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, sessionType: "in-person" }))}
                className={`p-4 rounded-lg border-2 transition flex flex-col items-center gap-2 ${
                  form.sessionType === "in-person"
                    ? "border-foreground bg-foreground/10 text-foreground"
                    : "border-border/50 hover:border-border"
                }`}
              >
                <MapPin className="w-5 h-5" />
                <span className="font-medium text-sm">In person</span>
              </button>
            </div>
          </div>

          {form.sessionType === "virtual" && (
            <div className="space-y-2">
              <Label htmlFor="meetingLink">Meeting link</Label>
              <Input
                id="meetingLink"
                placeholder="https://..."
                className="bg-background/80"
                value={form.meetingLink}
                onChange={(event) => setForm((prev) => ({ ...prev, meetingLink: event.target.value }))}
              />
            </div>
          )}

          {form.sessionType === "in-person" && (
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="e.g., Library Room 301"
                className="bg-background/80"
                value={form.location}
                onChange={(event) => setForm((prev) => ({ ...prev, location: event.target.value }))}
              />
            </div>
          )}

          <div className="flex items-center gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => {
                setForm(DEFAULT_FORM)
                onOpenChange(false)
              }}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={submitting}>
              {submitting ? "Booking..." : "Send Booking Request"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
