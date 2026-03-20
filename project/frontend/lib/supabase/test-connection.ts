// Test file to verify Supabase connection
// This can be removed after verification

import { createClient } from './client'

export async function testSupabaseConnection() {
  try {
    const supabase = createClient()
    
    // Test connection by checking if we can access the database
    const { data, error } = await supabase.from('users').select('count').limit(1)
    
    if (error) {
      console.error('Supabase connection error:', error.message)
      return { success: false, error: error.message }
    }
    
    console.log('✅ Supabase connection successful!')
    return { success: true, data }
  } catch (error) {
    console.error('Failed to connect to Supabase:', error)
    return { success: false, error: String(error) }
  }
}

