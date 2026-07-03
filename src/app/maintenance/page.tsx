'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Construction, Clock, RefreshCw } from 'lucide-react';

export default function MaintenancePage() {
  const [estimatedTime, setEstimatedTime] = useState<string>('');

  useEffect(() => {
    // Fetch estimated maintenance time from API
    const fetchEstimatedTime = async () => {
      try {
        const response = await fetch('/api/maintenance/status');
        const data = await response.json();
        setEstimatedTime(data.estimatedTime || '30 minutes');
      } catch {
        setEstimatedTime('30 minutes');
      }
    };

    fetchEstimatedTime();
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <div className="space-y-4">
        <Construction className="mx-auto h-16 w-16 text-yellow-500" />
        <h1 className="text-2xl font-bold">Under Maintenance</h1>
        <p className="max-w-md text-muted-foreground">
          We're currently performing scheduled maintenance to improve your experience.
          We'll be back shortly.
        </p>
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>Estimated time: {estimatedTime}</span>
        </div>
        <Button
          onClick={() => window.location.reload()}
          variant="outline"
          className="gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Check Status
        </Button>
        <div className="mt-4 rounded-lg bg-muted p-4 text-sm">
          <p className="text-muted-foreground">
            For updates, follow us on{' '}
            <a href="#" className="text-primary hover:underline">
              Twitter
            </a>{' '}
            or check our{' '}
            <a href="#" className="text-primary hover:underline">
              status page
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
