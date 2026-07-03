'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Activity, Signal, Camera, Monitor } from 'lucide-react';

interface StreamInfoProps {
  fps?: number;
  bitrate?: string;
  resolution?: string;
  latency?: string;
}

export function StreamInfo({ fps, bitrate, resolution, latency }: StreamInfoProps) {
  const items = [
    { icon: Activity, label: 'FPS', value: fps || 0, color: 'text-blue-500' },
    { icon: Signal, label: 'Bitrate', value: bitrate || '0 Kbps', color: 'text-green-500' },
    { icon: Camera, label: 'Resolution', value: resolution || 'N/A', color: 'text-purple-500' },
    { icon: Monitor, label: 'Latency', value: latency || '0ms', color: 'text-orange-500' },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-4">
      {items.map((item, index) => {
        const Icon = item.icon;
        return (
          <Card key={index}>
            <CardContent className="pt-4">
              <div className="flex items-center gap-2">
                <Icon className={`h-4 w-4 ${item.color}`} />
                <div>
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-lg font-bold">{item.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
