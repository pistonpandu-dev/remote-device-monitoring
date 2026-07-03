'use client';

import { LocationHistory } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Navigation, Compass, Gauge, Clock } from 'lucide-react';

interface LocationInfoProps {
  location: LocationHistory | null;
}

export function LocationInfo({ location }: LocationInfoProps) {
  if (!location) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <MapPin className="h-12 w-12 text-muted-foreground/50" />
        <p className="mt-2 text-sm text-muted-foreground">No location data available</p>
      </div>
    );
  }

  const items = [
    { icon: MapPin, label: 'Address', value: location.address || 'Unknown address' },
    { icon: Navigation, label: 'Speed', value: location.speed ? `${location.speed} km/h` : '0 km/h' },
    { icon: Compass, label: 'Heading', value: location.heading ? `${location.heading}°` : 'N/A' },
    { icon: Gauge, label: 'Accuracy', value: location.accuracy ? `${location.accuracy}m` : 'N/A' },
    { icon: Clock, label: 'Updated', value: new Date(location.timestamp).toLocaleTimeString() },
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="flex items-start gap-3">
              <Icon className="mt-0.5 h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-950/20">
        <p className="text-sm">
          <span className="font-medium">Coordinates:</span>{' '}
          <span className="font-mono">
            {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
          </span>
        </p>
      </div>
    </div>
  );
}
