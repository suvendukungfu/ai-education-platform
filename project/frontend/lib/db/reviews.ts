import { createClient } from '@/lib/supabase/client'

/**
 * Check if user can review a session (must be completed)
 */
export async function canReviewSession(sessionId: string, userId: string): Promise<boolean> {
  const supabase = createClient()
  
  const { data: session } = await supabase
    .from('sessions')
    .select('*')
    .eq('id', sessionId)
    .single()

  if (!session) {
    return false
  }

  // Check if session is completed
  if (session.status !== 'completed') {
    return false
  }

  // Check if user is part of the session
  if (session.mentor_id !== userId && session.learner_id !== userId) {
    return false
  }

  // Check if review already exists
  const { data: existingReview } = await supabase
    .from('sessions')
    .select('rating, review')
    .eq('id', sessionId)
    .single()

  // Allow review if rating/review is null
  return !existingReview?.rating
}

/**
 * Submit a review for a completed session
 */
export async function submitReview(
  sessionId: string,
  rating: number,
  review: string
) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('Not authenticated')
  }

  // Verify session is completed and user can review
  const canReview = await canReviewSession(sessionId, user.id)
  if (!canReview) {
    throw new Error('You can only review completed sessions that you participated in')
  }

  const { error } = await supabase
    .from('sessions')
    .update({
      rating,
      review,
    })
    .eq('id', sessionId)

  if (error) {
    throw new Error(error.message)
  }

  return true
}

