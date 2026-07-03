'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Wifi, WifiOff, RefreshCw, Home } from 'lucide-react';

export default function OfflinePage() {
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    setIsOnline(navigator.onLine);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
        <div className="space-y-4">
          <Wifi className="mx-auto h-16 w-16 text-green-500" />
          <h1 className="text-2xl font-bold">You're Back Online!</h1>
          <p className="text-muted-foreground">
            Your internet connection has been restored.
          </p>
          <Link href="/dashboard">
            <Button className="gap-2">
              <Home className="h-4 w-4" />
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <div className="space-y-4">
        <WifiOff className="mx-auto h-16 w-16 text-muted-foreground" />
        <h1 className="text-2xl font-bold">You're Offline</h1>
        <p className="text-muted-foreground">
          Please check your internet connection and try again.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button onClick={() => window.location.reload()} className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <Link href="/dashboard">
            <Button variant="outline" className="gap-2">
              <Home className="h-4 w-4" />
              Go to Dashboard
            </Button>
          </Link>
        </div>
        <div className="mt-8 rounded-lg bg-muted p-4 text-sm">
          <p className="text-muted-foreground">
            Some features may be available offline. Your data will sync once you're back online.
          </p>
        </div>
      </div>
    </div>
  );
}
