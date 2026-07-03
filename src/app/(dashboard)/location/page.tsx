'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSocket } from '@/lib/hooks/useSocket';
import { Device, LocationHistory } from '@/types';
import { MapPin, Navigation, Clock, Gauge, Compass, RefreshCw } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function LocationPage() {
  const [selectedDevice, setSelectedDevice] = useState<string>('');
  const [currentLocation, setCurrentLocation] = useState<LocationHistory | null>(null);
  const [routeHistory, setRouteHistory] = useState<LocationHistory[]>([]);
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
    if (!socket || !selectedDevice) return;

    socket.on(`location:${selectedDevice}:update`, (data) => {
      setCurrentLocation(data);
      setRouteHistory(prev => [...prev, data].slice(-100)); // Keep last 100 points
    });

    return () => {
      socket.off(`location:${selectedDevice}:update`);
    };
  }, [socket, selectedDevice]);

  const refreshLocation = async () => {
    if (!selectedDevice) {
      toast.error('Please select a device first');
      return;
    }

    try {
      const response = await apiClient.get(`/locations/${selectedDevice}/current`);
      setCurrentLocation(response.data);
      toast.success('Location updated');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to get location');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">Real-time Location</h1>
        <div className="flex gap-2">
          <Select value={selectedDevice} onValueChange={setSelectedDevice}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select device" />
            </SelectTrigger>
            <SelectContent>
              {onlineDevices.map((device: Device) => (
                <SelectItem key={device.id} value={device.id}>
                  {device.deviceName}
                </SelectItem>
              ))}
              {onlineDevices.length === 0 && (
                <SelectItem value="none" disabled>
                  No online devices
                </SelectItem>
              )}
            </SelectContent>
          </Select>
          <Button onClick={refreshLocation} disabled={!selectedDevice}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Location Info Card */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Location Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentLocation ? (
              <>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-medium">Address</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {currentLocation.address || 'Unknown address'}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-muted p-3">
                    <div className="flex items-center gap-2">
                      <Navigation className="h-4 w-4 text-green-500" />
                      <span className="text-xs text-muted-foreground">Speed</span>
                    </div>
                    <p className="mt-1 font-mono text-sm">
                      {currentLocation.speed ? `${currentLocation.speed} km/h` : '0 km/h'}
                    </p>
                  </div>

                  <div className="rounded-lg bg-muted p-3">
                    <div className="flex items-center gap-2">
                      <Compass className="h-4 w-4 text-purple-500" />
                      <span className="text-xs text-muted-foreground">Heading</span>
                    </div>
                    <p className="mt-1 font-mono text-sm">
                      {currentLocation.heading ? `${currentLocation.heading}°` : 'N/A'}
                    </p>
                  </div>

                  <div className="rounded-lg bg-muted p-3">
                    <div className="flex items-center gap-2">
                      <Gauge className="h-4 w-4 text-orange-500" />
                      <span className="text-xs text-muted-foreground">Accuracy</span>
                    </div>
                    <p className="mt-1 font-mono text-sm">
                      {currentLocation.accuracy ? `${currentLocation.accuracy}m` : 'N/A'}
                    </p>
                  </div>

                  <div className="rounded-lg bg-muted p-3">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-xs text-muted-foreground">Updated</span>
                    </div>
                    <p className="mt-1 text-xs">
                      {new Date(currentLocation.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>

                <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-950/20">
                  <p className="text-sm">
                    <span className="font-medium">Coordinates:</span>{' '}
                    {currentLocation.latitude}, {currentLocation.longitude}
                  </p>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <MapPin className="h-12 w-12 text-muted-foreground/50" />
                <p className="mt-2 text-sm text-muted-foreground">
                  {selectedDevice ? 'No location data available' : 'Select a device to track'}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Map Placeholder */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Map View</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
              {currentLocation ? (
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <MapPin className="mx-auto h-16 w-16 text-blue-500" />
                    <p className="mt-2 text-sm text-muted-foreground">
                      Google Maps integration would display here
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Lat: {currentLocation.latitude}, Lng: {currentLocation.longitude}
                    </p>
                    {routeHistory.length > 0 && (
                      <Badge variant="outline" className="mt-2">
                        {routeHistory.length} route points tracked
                      </Badge>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex h-full items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <Navigation className="mx-auto h-16 w-16" />
                    <p className="mt-2">No location data available</p>
                  </div>
                </div>
              )}
            </div>

            {routeHistory.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-medium">Route History</p>
                <div className="mt-2 max-h-[100px] overflow-auto rounded-lg bg-muted p-3">
                  <div className="space-y-1">
                    {routeHistory.slice(-5).reverse().map((point, index) => (
                      <div key={index} className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">
                          {new Date(point.timestamp).toLocaleTimeString()}
                        </span>
                        <span className="font-mono">
                          {point.latitude.toFixed(6)}, {point.longitude.toFixed(6)}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {point.speed} km/h
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
