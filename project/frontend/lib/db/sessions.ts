import { createClient } from '@/lib/supabase/client'

/**
 * Get upcoming sessions for current user
 */
type SessionWithProfiles = {
  id: string
  mentor_id: string
  learner_id: string
  skill: string
  scheduled_at: string
  duration: number
  mode: 'online' | 'offline'
  status: 'scheduled' | 'completed' | 'cancelled'
  meeting_link?: string | null
  location?: string | null
  mentor?: { id: string; name: string | null; avatar?: string | null } | null
  learner?: { id: string; name: string | null; avatar?: string | null } | null
}

export async function getUpcomingSessions() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return []
  }

  const { data, error } = await supabase
    .from('sessions')
    .select(`
      *,
      mentor:users!sessions_mentor_id_fkey(id, name, avatar),
      learner:users!sessions_learner_id_fkey(id, name, avatar)
    `)
    .or(`mentor_id.eq.${user.id},learner_id.eq.${user.id}`)
    .eq('status', 'scheduled')
    .gte('scheduled_at', new Date().toISOString())
    .order('scheduled_at', { ascending: true })
    .limit(10)

  if (error) {
    console.error('Error fetching sessions:', error)
    return []
  }

  return (data || []) as SessionWithProfiles[]
}

export async function getSessionsForMonth(year: number, month: number) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return []
  }

  const monthStart = new Date(Date.UTC(year, month, 1))
  const monthEnd = new Date(Date.UTC(year, month + 1, 0, 23, 59, 59, 999))

  const { data, error } = await supabase
    .from('sessions')
    .select(`
      *,
      mentor:users!sessions_mentor_id_fkey(id, name, avatar),
      learner:users!sessions_learner_id_fkey(id, name, avatar)
    `)
    .or(`mentor_id.eq.${user.id},learner_id.eq.${user.id}`)
    .gte('scheduled_at', monthStart.toISOString())
    .lte('scheduled_at', monthEnd.toISOString())
    .order('scheduled_at', { ascending: true })

  if (error) {
    console.error('Error fetching monthly sessions:', error)
    return []
  }

  return (data || []) as SessionWithProfiles[]
}

export type CreateSessionInput = {
  partnerId: string
  role: 'mentor' | 'learner'
  skill: string
  scheduledAt: string
  duration: number
  mode: 'online' | 'offline'
  meetingLink?: string | null
  location?: string | null
}

export async function createSession(payload: CreateSessionInput) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('You must be logged in to book a session.')
  }

  const mentorId = payload.role === 'mentor' ? user.id : payload.partnerId
  const learnerId = payload.role === 'mentor' ? payload.partnerId : user.id

  const insertPayload = {
    mentor_id: mentorId,
    learner_id: learnerId,
    skill: payload.skill,
    scheduled_at: payload.scheduledAt,
    duration: payload.duration,
    mode: payload.mode,
    status: 'scheduled' as const,
    meeting_link: payload.mode === 'online' ? payload.meetingLink : null,
    location: payload.mode === 'offline' ? payload.location : null,
  }

  const { data, error } = await supabase
    .from('sessions')
    .insert(insertPayload)
    .select(`
      *,
      mentor:users!sessions_mentor_id_fkey(id, name, avatar),
      learner:users!sessions_learner_id_fkey(id, name, avatar)
    `)
    .single()

  if (error) {
    console.error('Error creating session:', error)
    throw new Error(error.message || 'Unable to create session right now.')
  }

  return data as SessionWithProfiles
}
