'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSocket } from '@/lib/hooks/useSocket';
import { Device } from '@/types';
import { Monitor, Maximize2, RotateCw, Camera, Activity, Signal } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function LiveScreenPage() {
  const [selectedDevice, setSelectedDevice] = useState<string>('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamData, setStreamData] = useState<any>(null);
  const { socket } = useSocket();

  const { data: devices = [] } = useQuery({
    queryKey: ['devices'],
    queryFn: async () => {
      const response = await apiClient.get('/devices');
      return response.data as Device[];
    },
  });

  const onlineDevices = devices.filter((d: Device) => d.isOnline);

  useEffect(() => {
    if (!socket) return;

    socket.on('stream:data', (data) => {
      setStreamData(data);
    });

    socket.on('stream:status', (data) => {
      setIsStreaming(data.isStreaming);
      if (data.isStreaming) {
        toast.success('Stream started');
      } else {
        toast.info('Stream stopped');
      }
    });

    return () => {
      socket.off('stream:data');
      socket.off('stream:status');
    };
  }, [socket]);

  const startStream = async () => {
    if (!selectedDevice) {
      toast.error('Please select a device first');
      return;
    }

    try {
      await apiClient.post(`/devices/${selectedDevice}/stream/start`);
      setIsStreaming(true);
      toast.success('Stream started');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to start stream');
    }
  };

  const stopStream = async () => {
    try {
      await apiClient.post(`/devices/${selectedDevice}/stream/stop`);
      setIsStreaming(false);
      toast.success('Stream stopped');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to stop stream');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">Live Screen</h1>
        <div className="flex gap-2">
          <Button
            variant={isStreaming ? 'destructive' : 'default'}
            onClick={isStreaming ? stopStream : startStream}
            disabled={!selectedDevice}
          >
            <Monitor className="mr-2 h-4 w-4" />
            {isStreaming ? 'Stop Stream' : 'Start Stream'}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Device Selection</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedDevice} onValueChange={setSelectedDevice}>
              <SelectTrigger>
                <SelectValue placeholder="Select a device" />
              </SelectTrigger>
              <SelectContent>
                {onlineDevices.map((device: Device) => (
                  <SelectItem key={device.id} value={device.id}>
                    <div className="flex items-center gap-2">
                      <Signal className="h-3 w-3 text-green-500" />
                      {device.deviceName}
                    </div>
                  </SelectItem>
                ))}
                {onlineDevices.length === 0 && (
                  <SelectItem value="none" disabled>
                    No online devices available
                  </SelectItem>
                )}
              </SelectContent>
            </Select>

            {selectedDevice && (
              <div className="mt-4 space-y-2 rounded-lg bg-muted p-3">
                <p className="text-sm font-medium">Device Info</p>
                {devices
                  .filter((d: Device) => d.id === selectedDevice)
                  .map((device: Device) => (
                    <div key={device.id} className="space-y-1 text-sm">
                      <p className="text-muted-foreground">
                        Model: {device.model || 'Unknown'}
                      </p>
                      <p className="text-muted-foreground">
                        OS: {device.androidVersion || 'Unknown'}
                      </p>
                      <p className="text-muted-foreground">
                        Battery: {device.battery}%
                      </p>
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Stream View</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative aspect-video overflow-hidden rounded-lg bg-black">
              {isStreaming ? (
                <div className="flex h-full items-center justify-center">
                  <div className="text-center text-white">
                    <Monitor className="mx-auto h-16 w-16 text-blue-400" />
                    <p className="mt-4">Stream is active</p>
                    <p className="text-sm text-gray-400">Frame data: {streamData?.frame || 'N/A'}</p>
                  </div>
                </div>
              ) : (
                <div className="flex h-full items-center justify-center">
                  <div className="text-center text-gray-500">
                    <Monitor className="mx-auto h-16 w-16" />
                    <p className="mt-4">No active stream</p>
                    <p className="text-sm">
                      {selectedDevice ? 'Click "Start Stream" to begin' : 'Select a device to start'}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {isStreaming && streamData && (
              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="rounded-lg bg-muted p-3 text-center">
                  <Activity className="mx-auto h-4 w-4 text-blue-500" />
                  <p className="mt-1 text-xs text-muted-foreground">FPS</p>
                  <p className="font-mono text-sm">{streamData.fps || 0}</p>
                </div>
                <div className="rounded-lg bg-muted p-3 text-center">
                  <Signal className="mx-auto h-4 w-4 text-green-500" />
                  <p className="mt-1 text-xs text-muted-foreground">Bitrate</p>
                  <p className="font-mono text-sm">{streamData.bitrate || '0 Kbps'}</p>
                </div>
                <div className="rounded-lg bg-muted p-3 text-center">
                  <Camera className="mx-auto h-4 w-4 text-purple-500" />
                  <p className="mt-1 text-xs text-muted-foreground">Resolution</p>
                  <p className="font-mono text-sm">{streamData.resolution || 'N/A'}</p>
                </div>
                <div className="rounded-lg bg-muted p-3 text-center">
                  <Monitor className="mx-auto h-4 w-4 text-orange-500" />
                  <p className="mt-1 text-xs text-muted-foreground">Latency</p>
                  <p className="font-mono text-sm">{streamData.latency || '0ms'}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
