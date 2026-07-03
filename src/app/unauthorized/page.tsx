'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Shield, ArrowLeft, Home } from 'lucide-react';

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <div className="space-y-4">
        <Shield className="mx-auto h-16 w-16 text-red-500" />
        <h1 className="text-2xl font-bold">Unauthorized Access</h1>
        <p className="max-w-md text-muted-foreground">
          You don't have permission to access this page. Please contact your administrator
          if you believe this is an error.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/dashboard">
            <Button className="gap-2">
              <Home className="h-4 w-4" />
              Go Home
            </Button>
          </Link>
          <Button
            variant="outline"
            onClick={() => window.history.back()}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
        </div>
        <div className="mt-4 rounded-lg bg-muted p-4 text-sm">
          <p className="text-muted-foreground">
            If you need access, please contact support at{' '}
            <a href="mailto:support@example.com" className="text-primary hover:underline">
              support@example.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
