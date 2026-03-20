/**
 * Admin whitelist - only these emails can access admin features
 */
export const ADMIN_EMAILS = [
  'anuj.jain@adypu.edu.in',
  'suvendu.sahoo@adypu.edu.in',
  'Bharat.Singh@adypu.edu.in',
] as const

/**
 * Check if a user email is an admin
 */
export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false
  return ADMIN_EMAILS.includes(email.toLowerCase() as any)
}

/**
 * Get admin access error message
 */
export function getAdminAccessError(): string {
  return 'Admin access restricted — invalid admin account.'
}

/**
 * Server-side admin check (for API routes)
 */
export async function requireAdmin(userEmail: string | null | undefined) {
  if (!userEmail) {
    throw new Error('Not authenticated')
  }
  
  if (!isAdminEmail(userEmail)) {
    throw new Error(getAdminAccessError())
  }
  
  return true
}

