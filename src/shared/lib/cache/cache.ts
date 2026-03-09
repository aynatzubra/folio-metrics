type CacheEntry<T> = {
  value: T
  expiresAt: number
}

const globalCache = new Map<string, CacheEntry<unknown>>()

export async function withCache<T>(
  key: string,
  ttl: number,
  loader: () => Promise<T>,
): Promise<T> {
  const now = Date.now()
  const entry = globalCache.get(key)

  if (entry && entry.expiresAt > now) {
    return entry.value as T
  }

  const value = await loader()
  globalCache.set(key, { value, expiresAt: now + ttl })
  return value
}

export function invalidateCache(prefix: string): void {
  for (const key of globalCache.keys()) {
    if (key.startsWith(prefix)) {
      globalCache.delete(key)
    }
  }
}