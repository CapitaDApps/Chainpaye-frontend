// Cache utilities for storing and retrieving data

interface CacheItem<T> {
  data: T;
  expiresAt: number;
}

class Cache {
  private cache: Map<string, CacheItem<any>> = new Map();

  set<T>(key: string, data: T, ttl: number = 5 * 60 * 1000): void {
    this.cache.set(key, {
      data,
      expiresAt: Date.now() + ttl,
    });
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    
    if (!item) return null;
    
    if (Date.now() > item.expiresAt) {
      this.cache.delete(key);
      return null;
    }
    
    return item.data as T;
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  // Clean up expired items
  cleanup(): void {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now > item.expiresAt) {
        this.cache.delete(key);
      }
    }
  }
}

export const paymentCache = new Cache();

// Run cleanup every 5 minutes
if (typeof window !== 'undefined') {
  setInterval(() => paymentCache.cleanup(), 5 * 60 * 1000);
}

export const CACHE_KEYS = {
  PAYMENT_DATA: (id: string) => `payment_data_${id}`,
  VERIFICATION: (txid: string) => `verification_${txid}`,
};

export async function cachedFetch<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl?: number
): Promise<T> {
  const cached = paymentCache.get<T>(key);
  if (cached) return cached;

  const data = await fetcher();
  paymentCache.set(key, data, ttl);
  return data;
}
