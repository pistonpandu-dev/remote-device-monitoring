import { MemoryCache } from './memory';
import { StorageCache } from './storage';

export interface CacheItem<T = any> {
  key: string;
  value: T;
  expiresAt: number;
  createdAt: number;
}

export interface CacheOptions {
  ttl: number; // Time to live in seconds
  maxItems?: number;
  storage?: 'memory' | 'storage' | 'both';
}

export class CacheManager {
  private memoryCache: MemoryCache;
  private storageCache: StorageCache;
  private options: CacheOptions;

  constructor(options: CacheOptions = { ttl: 300, storage: 'both' }) {
    this.options = options;
    this.memoryCache = new MemoryCache(options);
    this.storageCache = new StorageCache(options);
  }

  async get<T>(key: string): Promise<T | null> {
    // Try memory cache first
    let value = this.memoryCache.get<T>(key);
    if (value !== null) {
      return value;
    }

    // Try storage cache
    if (this.options.storage === 'both' || this.options.storage === 'storage') {
      value = await this.storageCache.get<T>(key);
      if (value !== null) {
        // Store in memory for faster access
        this.memoryCache.set(key, value);
        return value;
      }
    }

    return null;
  }

  async set<T>(key: string, value: T): Promise<void> {
    // Store in memory
    this.memoryCache.set(key, value);

    // Store in storage
    if (this.options.storage === 'both' || this.options.storage === 'storage') {
      await this.storageCache.set(key, value);
    }
  }

  async delete(key: string): Promise<void> {
    this.memoryCache.delete(key);
    if (this.options.storage === 'both' || this.options.storage === 'storage') {
      await this.storageCache.delete(key);
    }
  }

  async clear(): Promise<void> {
    this.memoryCache.clear();
    if (this.options.storage === 'both' || this.options.storage === 'storage') {
      await this.storageCache.clear();
    }
  }

  async has(key: string): Promise<boolean> {
    return this.memoryCache.has(key) || await this.storageCache.has(key);
  }

  async getStats(): Promise<{
    memory: { size: number; maxItems: number };
    storage: { size: number; maxItems: number };
  }> {
    const memoryStats = this.memoryCache.getStats();
    const storageStats = await this.storageCache.getStats();

    return {
      memory: memoryStats,
      storage: storageStats,
    };
  }
}

export const cache = new CacheManager({ ttl: 300, storage: 'both' });
