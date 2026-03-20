export const ADMIN_WHITELIST = [
  "anuj.jain@adypu.edu.in",
  "suvendu.sahoo@adypu.edu.in",
  "Bharat.Singh@adypu.edu.in",
].map((email) => email.toLowerCase())

export function isWhitelisted(email?: string | null) {
  if (!email) return false
  return ADMIN_WHITELIST.includes(email.toLowerCase())
}
