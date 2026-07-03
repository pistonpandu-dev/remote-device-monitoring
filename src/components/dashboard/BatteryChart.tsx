'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Device } from '@/types';
import { Progress } from '@/components/ui/progress';

interface BatteryChartProps {
  devices: Device[];
}

export function BatteryChart({ devices }: BatteryChartProps) {
  const sortedDevices = [...devices]
    .filter(d => d.battery !== undefined)
    .sort((a, b) => b.battery - a.battery)
    .slice(0, 10);

  const getBatteryColor = (level: number) => {
    if (level > 70) return 'bg-green-500';
    if (level > 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Battery Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedDevices.map((device) => (
            <div key={device.id}>
              <div className="flex justify-between text-sm">
                <span className="font-medium">{device.deviceName}</span>
                <span className="text-muted-foreground">{device.battery}%</span>
              </div>
              <Progress
                value={device.battery}
                className="h-2"
                indicatorClassName={getBatteryColor(device.battery)}
              />
            </div>
          ))}
          {sortedDevices.length === 0 && (
            <p className="text-sm text-muted-foreground">No battery data available</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
