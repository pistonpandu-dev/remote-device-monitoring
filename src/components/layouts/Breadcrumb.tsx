'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils/helpers';

export function Breadcrumb() {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);

  if (pathSegments.length === 0) return null;

  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground">
      <Link
        href="/dashboard"
        className="flex items-center hover:text-foreground"
      >
        <Home className="h-4 w-4" />
      </Link>
      {pathSegments.map((segment, index) => {
        const isLast = index === pathSegments.length - 1;
        const href = '/' + pathSegments.slice(0, index + 1).join('/');

        return (
          <div key={segment} className="flex items-center">
            <ChevronRight className="h-4 w-4" />
            <Link
              href={href}
              className={cn(
                'ml-1 capitalize hover:text-foreground',
                isLast && 'pointer-events-none font-medium text-foreground'
              )}
            >
              {segment.replace(/-/g, ' ')}
            </Link>
          </div>
        );
      })}
    </nav>
  );
}
