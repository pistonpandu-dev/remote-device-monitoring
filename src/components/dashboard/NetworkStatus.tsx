'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Device } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Wifi, WifiOff, Signal, Activity } from 'lucide-react';

interface NetworkStatusProps {
  devices: Device[];
}

export function NetworkStatus({ devices }: NetworkStatusProps) {
  const onlineDevices = devices.filter(d => d.isOnline);
  const offlineDevices = devices.filter(d => !d.isOnline);

  const networkTypes = devices.reduce((acc, device) => {
    if (device.networkType) {
      acc[device.networkType] = (acc[device.networkType] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Network Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg border p-3">
              <div className="flex items-center gap-2">
                <Wifi className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">Online</span>
              </div>
              <p className="mt-1 text-2xl font-bold">{onlineDevices.length}</p>
            </div>
            <div className="rounded-lg border p-3">
              <div className="flex items-center gap-2">
                <WifiOff className="h-4 w-4 text-red-500" />
                <span className="text-sm font-medium">Offline</span>
              </div>
              <p className="mt-1 text-2xl font-bold">{offlineDevices.length}</p>
            </div>
          </div>

          {Object.keys(networkTypes).length > 0 && (
            <div>
              <p className="mb-2 text-sm font-medium">Network Types</p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(networkTypes).map(([type, count]) => (
                  <Badge key={type} variant="outline" className="gap-1">
                    <Signal className="h-3 w-3" />
                    {type}: {count}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
