// Cache configuration
export const CACHE_TIMES = {
  LESSONS: 60 * 60 * 24, // 24 hours
  CHALLENGES: 60 * 60 * 12, // 12 hours
  USER_STATS: 60 * 5, // 5 minutes
  LEADERBOARD: 60 * 1, // 1 minute
  ACHIEVEMENTS: 60 * 60, // 1 hour
  USER_PROFILE: 60 * 10, // 10 minutes
} as const

// In-memory cache (simple implementation)
const cache = new Map<string, { data: any; expiry: number }>()

export function getCached<T>(key: string): T | null {
  const cached = cache.get(key)
  
  if (!cached) return null
  
  if (Date.now() > cached.expiry) {
    cache.delete(key)
    return null
  }
  
  return cached.data as T
}

export function setCache(key: string, data: any, ttlSeconds: number): void {
  cache.set(key, {
    data,
    expiry: Date.now() + ttlSeconds * 1000,
  })
}

export function clearCache(keyPattern?: string): void {
  if (!keyPattern) {
    cache.clear()
    return
  }
  
  const keys = Array.from(cache.keys())
  keys.forEach((key) => {
    if (key.includes(keyPattern)) {
      cache.delete(key)
    }
  })
}

// Helper function to wrap fetch with cache
export async function fetchWithCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl: number
): Promise<T> {
  const cached = getCached<T>(key)
  
  if (cached !== null) {
    return cached
  }
  
  const data = await fetcher()
  setCache(key, data, ttl)
  
  return data
}
