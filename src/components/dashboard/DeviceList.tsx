'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Device } from '@/types';
import { formatDate } from '@/lib/utils/helpers';
import { Smartphone, Battery, Wifi, WifiOff, MapPin } from 'lucide-react';

interface DeviceListProps {
  devices: Device[];
  title?: string;
  maxItems?: number;
}

export function DeviceList({ devices, title = 'Recent Devices', maxItems = 5 }: DeviceListProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const displayDevices = devices.slice(0, maxItems);

  if (displayDevices.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No devices found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">
            {displayDevices.map((device) => (
              <div
                key={device.id}
                className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50"
                onMouseEnter={() => setHoveredId(device.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <Smartphone className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{device.deviceName}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{device.manufacturer}</span>
                      <span>•</span>
                      <span>{device.model}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Battery className={cn(
                      'h-3 w-3',
                      device.battery > 50 ? 'text-green-500' : 
                      device.battery > 20 ? 'text-yellow-500' : 
                      'text-red-500'
                    )} />
                    <span className="text-xs">{device.battery}%</span>
                  </div>

                  <Badge variant={device.isOnline ? 'success' : 'secondary'}>
                    {device.isOnline ? (
                      <Wifi className="mr-1 h-3 w-3" />
                    ) : (
                      <WifiOff className="mr-1 h-3 w-3" />
                    )}
                    {device.isOnline ? 'Online' : 'Offline'}
                  </Badge>

                  {device.lastLocation && (
                    <Badge variant="outline">
                      <MapPin className="mr-1 h-3 w-3" />
                      {formatDate(device.lastLocation.timestamp)}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
