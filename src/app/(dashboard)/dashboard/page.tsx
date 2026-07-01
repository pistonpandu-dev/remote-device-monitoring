'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardStats } from '@/types';
import { apiClient } from '@/lib/api/client';
import { useSocket } from '@/lib/hooks/useSocket';
import { 
  Users, 
  Wifi, 
  WifiOff, 
  Smartphone,
  Battery,
  MapPin,
  Clock,
  Cpu,
  HardDrive,
  Network
} from 'lucide-react';

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const { socket } = useSocket();

  const { data: initialStats, isLoading } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: async () => {
      const response = await apiClient.get('/dashboard/stats');
      return response.data;
    },
  });

  useEffect(() => {
    if (initialStats) {
      setStats(initialStats);
    }
  }, [initialStats]);

  useEffect(() => {
    if (!socket) return;

    socket.on('device:status:update', (data) => {
      setStats((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          onlineClients: data.online,
          offlineClients: data.offline,
        };
      });
    });

    return () => {
      socket.off('device:status:update');
    };
  }, [socket]);

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  const statCards = [
    {
      title: 'Total Clients',
      value: stats?.totalClients || 0,
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Online Clients',
      value: stats?.onlineClients || 0,
      icon: Wifi,
      color: 'bg-green-500',
    },
    {
      title: 'Offline Clients',
      value: stats?.offlineClients || 0,
      icon: WifiOff,
      color: 'bg-red-500',
    },
    {
      title: 'Active Devices',
      value: stats?.activeDevices || 0,
      icon: Smartphone,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Recent Devices</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Device list will be rendered here */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Battery Status</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Battery chart will be rendered here */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Network Status</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Network status will be rendered here */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
