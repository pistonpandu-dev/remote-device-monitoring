import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};
const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 100;

export function rateLimitMiddleware(request: NextRequest) {
  const ip = request.ip || 'anonymous';
  const now = Date.now();

  // Clean up expired entries
  for (const key in store) {
    if (store[key].resetTime < now) {
      delete store[key];
    }
  }

  // Check rate limit
  if (!store[ip]) {
    store[ip] = {
      count: 1,
      resetTime: now + WINDOW_MS,
    };
    return null;
  }

  const entry = store[ip];
  if (now > entry.resetTime) {
    entry.count = 1;
    entry.resetTime = now + WINDOW_MS;
    return null;
  }

  entry.count++;
  if (entry.count > MAX_REQUESTS) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { 
        status: 429,
        headers: {
          'Retry-After': Math.ceil((entry.resetTime - now) / 1000).toString(),
        },
      }
    );
  }

  return null;
}
