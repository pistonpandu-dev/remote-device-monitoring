'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';
import { useNotificationStore } from '@/lib/store/useNotificationStore';
import { NotificationList } from '@/components/notifications/NotificationList';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, BellOff, Settings } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function NotificationsPage() {
  const { notifications, unreadCount, markAllAsRead, clearAll } = useNotificationStore();
  const [isLoading, setIsLoading] = useState(false);

  const { data: notificationsData, refetch } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const response = await apiClient.get('/notifications');
      return response.data;
    },
  });

  useEffect(() => {
    if (notificationsData) {
      // Update store with notifications from API
    }
  }, [notificationsData]);

  const handleMarkAllRead = async () => {
    try {
      setIsLoading(true);
      await apiClient.post('/notifications/read-all');
      markAllAsRead();
      toast.success('All notifications marked as read');
    } catch (error) {
      toast.error('Failed to mark notifications as read');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearAll = async () => {
    try {
      setIsLoading(true);
      await apiClient.delete('/notifications');
      clearAll();
      toast.success('All notifications cleared');
    } catch (error) {
      toast.error('Failed to clear notifications');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Notifications</h1>
          <p className="text-sm text-muted-foreground">
            {unreadCount} unread notifications
          </p>
        </div>
        <div className="flex gap-2">
          {unreadCount > 0 && (
            <Button
              variant="outline"
              onClick={handleMarkAllRead}
              disabled={isLoading}
            >
              <Bell className="mr-2 h-4 w-4" />
              Mark all read
            </Button>
          )}
          {notifications.length > 0 && (
            <Button
              variant="destructive"
              onClick={handleClearAll}
              disabled={isLoading}
            >
              <BellOff className="mr-2 h-4 w-4" />
              Clear all
            </Button>
          )}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">
                Unread ({unreadCount})
              </TabsTrigger>
              <TabsTrigger value="info">Info</TabsTrigger>
              <TabsTrigger value="success">Success</TabsTrigger>
              <TabsTrigger value="warning">Warning</TabsTrigger>
              <TabsTrigger value="error">Error</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <NotificationList maxHeight="500px" showActions={false} />
            </TabsContent>

            <TabsContent value="unread">
              <NotificationList maxHeight="500px" showActions={false} />
            </TabsContent>

            <TabsContent value="info">
              <NotificationList maxHeight="500px" showActions={false} />
            </TabsContent>

            <TabsContent value="success">
              <NotificationList maxHeight="500px" showActions={false} />
            </TabsContent>

            <TabsContent value="warning">
              <NotificationList maxHeight="500px" showActions={false} />
            </TabsContent>

            <TabsContent value="error">
              <NotificationList maxHeight="500px" showActions={false} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-muted-foreground">
                  Receive notifications via email
                </p>
              </div>
              <Button variant="outline" size="sm">
                <Settings className="mr-2 h-4 w-4" />
                Configure
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Push Notifications</p>
                <p className="text-sm text-muted-foreground">
                  Receive push notifications on your device
                </p>
              </div>
              <Button variant="outline" size="sm">
                <Settings className="mr-2 h-4 w-4" />
                Configure
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
