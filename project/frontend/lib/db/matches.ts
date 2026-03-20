import { createClient } from '@/lib/supabase/client'
import type { User } from '@/lib/types'

/**
 * Get matches for the current user
 */
export async function getMatches(limit = 10) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return []
  }

  // Get current user profile
  const { data: currentUser } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!currentUser) {
    return []
  }

  // Get all other users
  const { data: allUsers, error } = await supabase
    .from('users')
    .select('*')
    .neq('id', user.id)
    .limit(100)

  if (error || !allUsers) {
    return []
  }

  // Calculate matches (simplified - you can use the matching algorithm here)
  const matches = allUsers
    .map((matchedUser) => {
      // Calculate match score based on skills overlap
      const commonSkills = currentUser.skills_known?.filter((skill: string) =>
        matchedUser.skills_known?.includes(skill)
      ) || []
      
      const complementarySkills = matchedUser.skills_known?.filter(
        (skill: string) => !currentUser.skills_known?.includes(skill) && 
        currentUser.skills_learning?.includes(skill)
      ) || []

      const score = Math.min(100, (commonSkills.length * 20) + (complementarySkills.length * 15))

      return {
        id: matchedUser.id,
        name: matchedUser.name,
        avatar: matchedUser.avatar,
        bio: matchedUser.bio || '',
        matchScore: score,
        mutualSkills: commonSkills,
        complementarySkills: complementarySkills.slice(0, 3),
      }
    })
    .filter((match) => match.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, limit)

  return matches
}

