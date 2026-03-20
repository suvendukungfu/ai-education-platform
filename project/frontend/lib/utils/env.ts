/**
 * Check if we're in development mode
 */
export function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development' || process.env.NEXT_PUBLIC_ENV === 'dev'
}

/**
 * Check if we're in production mode
 */
export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production'
}

/**
 * Should show mock data (only in development)
 */
export function shouldShowMockData(): boolean {
  return isDevelopment()
}

