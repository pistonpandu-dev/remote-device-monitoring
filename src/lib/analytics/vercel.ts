'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { inject } from '@vercel/analytics';

export function useVercelAnalytics() {
  const router = useRouter();

  useEffect(() => {
    // Inject Vercel Analytics
    inject();
  }, []);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      // Track page view
      if (typeof window !== 'undefined' && (window as any).va) {
        (window as any).va('event', {
          name: 'pageview',
          url,
        });
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);
}
