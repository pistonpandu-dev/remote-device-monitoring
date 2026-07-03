'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ClientForm } from '@/components/clients/ClientForm';
import { Client, Device } from '@/types';
import { formatDate } from '@/lib/utils/helpers';
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  Smartphone, 
  Mail, 
  Phone, 
  Calendar,
  Activity,
  Wifi,
  WifiOff,
  Battery,
  Cpu,
  HardDrive,
  Network,
  MapPin
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function ClientDetailPage() {
  const params = useParams();
  const router = useRouter();
  const clientId = params.id as string;
  const [showEditForm, setShowEditForm] = useState(false);
  const [client, setClient] = useState<Client | null>(null);
  const [devices, setDevices] = useState<Device[]>([]);

  const { data: clientData, isLoading: clientLoading } = useQuery({
    queryKey: ['client', clientId],
    queryFn: async () => {
      const response = await apiClient.get(`/clients/${clientId}`);
      return response.data as Client;
    },
  });

  const { data: devicesData, isLoading: devicesLoading } = useQuery({
    queryKey: ['client-devices', clientId],
    queryFn: async () => {
      const response = await apiClient.get(`/clients/${clientId}/devices`);
      return response.data as Device[];
    },
  });

  useEffect(() => {
    if (clientData) {
      setClient(clientData);
    }
  }, [clientData]);

  useEffect(() => {
    if (devicesData) {
      setDevices(devicesData);
    }
  }, [devicesData]);

  const handleDeleteClient = async () => {
    if (!confirm('Are you sure you want to delete this client?')) return;
    
    try {
      await apiClient.delete(`/clients/${clientId}`);
      toast.success('Client deleted successfully');
      router.push('/clients');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete client');
    }
  };

  const handleUpdateClient = async (data: any) => {
    try {
      await apiClient.put(`/clients/${clientId}`, data);
      toast.success('Client updated successfully');
      setShowEditForm(false);
      // Refetch client data
      const response = await apiClient.get(`/clients/${clientId}`);
      setClient(response.data);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update client');
    }
  };

  if (clientLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!client) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center">
        <p className="text-lg font-medium">Client not found</p>
        <Button onClick={() => router.push('/clients')} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Clients
        </Button>
      </div>
    );
  }

  const onlineDevices = devices.filter(d => d.isOnline);
  const offlineDevices = devices.filter(d => !d.isOnline);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.push('/clients')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{client.name}</h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span>{client.email}</span>
              {client.phone && (
                <>
                  <span>•</span>
                  <Phone className="h-4 w-4" />
                  <span>{client.phone}</span>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Badge variant={client.status === 'active' ? 'success' : 'secondary'}>
            {client.status}
          </Badge>
          <Button variant="outline" onClick={() => setShowEditForm(true)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button variant="destructive" onClick={handleDeleteClient}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Devices</p>
                <p className="text-2xl font-bold">{devices.length}</p>
              </div>
              <Smartphone className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Online Devices</p>
                <p className="text-2xl font-bold text-green-500">{onlineDevices.length}</p>
              </div>
              <Wifi className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Offline Devices</p>
                <p className="text-2xl font-bold text-red-500">{offlineDevices.length}</p>
              </div>
              <WifiOff className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Created</p>
                <p className="text-sm font-medium">{formatDate(client.createdAt)}</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="devices" className="space-y-4">
        <TabsList>
          <TabsTrigger value="devices">Devices</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="devices">
          {devicesLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
          ) : devices.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <Smartphone className="h-12 w-12 text-muted-foreground/50" />
                <p className="mt-4 text-lg font-medium">No Devices</p>
                <p className="text-sm text-muted-foreground">
                  This client doesn't have any devices yet
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {devices.map((device) => (
                <Card key={device.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium">{device.deviceName}</h3>
                        <p className="text-sm text-muted-foreground">
                          {device.manufacturer} {device.model}
                        </p>
                      </div>
                      <Badge variant={device.isOnline ? 'success' : 'secondary'}>
                        {device.isOnline ? 'Online' : 'Offline'}
                      </Badge>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Battery className="h-4 w-4 text-yellow-500" />
                        <span>{device.battery}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Network className="h-4 w-4 text-blue-500" />
                        <span>{device.networkType || 'Unknown'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Cpu className="h-4 w-4 text-purple-500" />
                        <span>{device.cpu || 'Unknown'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <HardDrive className="h-4 w-4 text-green-500" />
                        <span>{device.storage || 'Unknown'}</span>
                      </div>
                    </div>

                    {device.lastLocation && (
                      <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>
                          {device.lastLocation.latitude.toFixed(6)}, {device.lastLocation.longitude.toFixed(6)}
                        </span>
                        <span>•</span>
                        <span>{formatDate(device.lastLocation.timestamp)}</span>
                      </div>
                    )}

                    <div className="mt-4 flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => router.push(`/live-screen/${device.id}`)}
                      >
                        View Screen
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => router.push(`/location?device=${device.id}`)}
                      >
                        Track Location
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardContent className="py-8">
              <div className="flex flex-col items-center justify-center text-center">
                <Activity className="h-12 w-12 text-muted-foreground/50" />
                <p className="mt-4 text-lg font-medium">Activity Log</p>
                <p className="text-sm text-muted-foreground">
                  Activity history will be displayed here
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Client Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4">
                <h4 className="font-medium">Status</h4>
                <p className="text-sm text-muted-foreground">
                  Current status: <Badge variant={client.status === 'active' ? 'success' : 'secondary'}>
                    {client.status}
                  </Badge>
                </p>
              </div>
              <div className="rounded-lg border p-4">
                <h4 className="font-medium">Contact Information</h4>
                <div className="mt-2 space-y-1 text-sm">
                  <p><span className="font-medium">Email:</span> {client.email}</p>
                  {client.phone && <p><span className="font-medium">Phone:</span> {client.phone}</p>}
                </div>
              </div>
              <div className="rounded-lg border p-4">
                <h4 className="font-medium">Account Information</h4>
                <div className="mt-2 space-y-1 text-sm">
                  <p><span className="font-medium">Created:</span> {formatDate(client.createdAt)}</p>
                  <p><span className="font-medium">Last Updated:</span> {formatDate(client.updatedAt)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Form Dialog */}
      <ClientForm
        open={showEditForm}
        onClose={() => setShowEditForm(false)}
        onSubmit={handleUpdateClient}
        initialData={client}
      />
    </div>
  );
}
