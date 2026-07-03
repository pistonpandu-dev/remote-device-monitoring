'use client';

import { LocationHistory } from '@/types';
import { formatDate } from '@/lib/utils/helpers';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MapPin, Clock, Navigation } from 'lucide-react';

interface RouteHistoryProps {
  locations: LocationHistory[];
  maxItems?: number;
}

export function RouteHistory({ locations, maxItems = 5 }: RouteHistoryProps) {
  const displayLocations = locations.slice(-maxItems).reverse();

  if (displayLocations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <MapPin className="h-12 w-12 text-muted-foreground/50" />
        <p className="mt-2 text-sm text-muted-foreground">No route history available</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium">Route History</p>
      <ScrollArea className="h-[200px] pr-4">
        <div className="space-y-2">
          {displayLocations.map((location, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg border p-3"
            >
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">
                    {location.address || 'Unknown location'}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{formatDate(location.timestamp)}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {location.speed} km/h
                </Badge>
                <div className="text-xs text-muted-foreground">
                  {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
