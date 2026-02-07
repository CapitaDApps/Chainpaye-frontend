// Caching utilities for payment data and API responses

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

class PaymentCache {
  private cache = new Map<string, CacheEntry<any>>();
  private readonly DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes

  set<T>(key: string, data: T, ttl: number = this.DEFAULT_TTL): void {
    const now = Date.now();
    this.cache.set(key, {
      data,
      timestamp: now,
      expiresAt: now + ttl
    });
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    const now = Date.now();
    if (now > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  has(key: string): boolean {
    const entry = this.cache.get(key);
    if (!entry) return false;

    const now = Date.now();
    if (now > entry.expiresAt) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  // Clean up expired entries
  cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expiresAt) {
        this.cache.delete(key);
      }
    }
  }

  // Get cache statistics
  getStats(): { size: number; entries: Array<{ key: string; age: number; ttl: number }> } {
    const now = Date.now();
    const entries = Array.from(this.cache.entries()).map(([key, entry]) => ({
      key,
      age: now - entry.timestamp,
      ttl: entry.expiresAt - now
    }));

    return {
      size: this.cache.size,
      entries
    };
  }
}

// Singleton instance
export const paymentCache = new PaymentCache();

// Cached fetch wrapper
export const cachedFetch = async <T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl?: number
): Promise<T> => {
  // Check cache first
  const cached = paymentCache.get<T>(key);
  if (cached) {
    return cached;
  }

  // Fetch and cache
  const data = await fetcher();
  paymentCache.set(key, data, ttl);
  return data;
};

// Specific cache keys for payment system
export const CACHE_KEYS = {
  PAYMENT_DATA: (id: string) => `payment_data_${id}`,
  VERIFICATION_STATUS: (txid: string) => `verification_${txid}`,
  EXCHANGE_RATES: 'exchange_rates',
  BANK_DETAILS: (currency: string) => `bank_details_${currency}`,
} as const;

// Auto cleanup every 10 minutes
setInterval(() => {
  paymentCache.cleanup();
}, 10 * 60 * 1000);