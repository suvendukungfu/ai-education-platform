import { createClient } from '@/lib/supabase/client'

/**
 * Get faculty office hours slots for a specific batch
 */
export async function getOfficeHoursSlots(batch: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('faculty_slots')
    .select(`
      *,
      faculty:users!faculty_slots_faculty_id_fkey(id, name, avatar)
    `)
    .eq('batch', batch)
    .gte('scheduled_at', new Date().toISOString())
    .order('scheduled_at', { ascending: true })

  if (error) {
    console.error('Error fetching office hours:', error)
    return []
  }

  return data || []
}

/**
 * Book a faculty slot
 */
export async function bookFacultySlot(slotId: string) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('Not authenticated')
  }

  // Get user's batch
  const { data: userData } = await supabase
    .from('users')
    .select('batch')
    .eq('id', user.id)
    .single()

  if (!userData?.batch) {
    throw new Error('Batch is required to book office hours')
  }

  // Get slot to verify batch match
  const { data: slot } = await supabase
    .from('faculty_slots')
    .select('*')
    .eq('id', slotId)
    .single()

  if (!slot) {
    throw new Error('Slot not found')
  }

  if (slot.batch !== userData.batch) {
    throw new Error('You can only book slots for your batch')
  }

  if (slot.booked_count >= slot.capacity) {
    throw new Error('Slot is full')
  }

  // Create booking
  const { error: bookingError } = await supabase
    .from('slot_bookings')
    .insert({
      slot_id: slotId,
      student_id: user.id,
      status: 'confirmed',
    })

  if (bookingError) {
    throw new Error(bookingError.message)
  }

  // Update booked count
  await supabase
    .from('faculty_slots')
    .update({ booked_count: slot.booked_count + 1 })
    .eq('id', slotId)

  return true
}

