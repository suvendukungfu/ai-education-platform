import { createClient } from '@/lib/supabase/client'
import type { User, Batch, UserRole } from '@/lib/types'

/**
 * Sign up a new user
 */
export async function signUp(
  email: string,
  password: string,
  name: string,
  role: UserRole,
  batch?: Batch
) {
  const supabase = createClient()

  // Sign up with Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        role,
        batch: batch || null,
      },
    },
  })

  if (authError) {
    throw new Error(authError.message)
  }

  if (!authData.user) {
    throw new Error('Failed to create user')
  }

  // Create user profile in users table
  const { error: profileError } = await supabase.from('users').insert({
    id: authData.user.id,
    email,
    name,
    role,
    batch: role === 'student' ? batch : null,
    skills_known: [],
    skills_learning: [],
    skill_points: 0,
    streak: 0,
    verified: false,
  })

  if (profileError) {
    // If profile creation fails, try to clean up auth user
    console.error('Failed to create user profile:', profileError)
    throw new Error('Failed to create user profile')
  }

  return { user: authData.user, session: authData.session }
}

/**
 * Sign in a user
 */
export async function signIn(email: string, password: string) {
  const supabase = createClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    throw new Error(error.message)
  }

  return { user: data.user, session: data.session }
}

/**
 * Sign out the current user
 */
export async function signOut() {
  const supabase = createClient()
  const { error } = await supabase.auth.signOut()
  
  if (error) {
    throw new Error(error.message)
  }
}

/**
 * Get the current user
 */
export async function getCurrentUser() {
  const supabase = createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error) {
    throw new Error(error.message)
  }
  
  return user
}

/**
 * Get user profile from users table
 */
export async function getUserProfile(userId: string): Promise<User | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) {
    console.error('Error fetching user profile:', error)
    return null
  }

  return data as User
}

/**
 * Update user profile
 */
export async function updateUserProfile(
  userId: string,
  updates: Partial<User>
) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

/**
 * Complete onboarding - save skills and goals
 */
export async function completeOnboarding(
  userId: string,
  skillsKnown: string[],
  skillsLearning: string[],
  goals: string
) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('users')
    .update({
      skills_known: skillsKnown,
      skills_learning: skillsLearning,
      goals,
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId)
    .select()
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

