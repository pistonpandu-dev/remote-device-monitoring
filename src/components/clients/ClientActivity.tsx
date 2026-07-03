'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatDate } from '@/lib/utils/helpers';
import { Activity, User, Smartphone, Settings, Mail } from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'user' | 'device' | 'settings' | 'invite';
  description: string;
  timestamp: string;
  user?: string;
}

interface ClientActivityProps {
  activities: ActivityItem[];
  isLoading?: boolean;
}

export function ClientActivity({ activities, isLoading }: ClientActivityProps) {
  const getIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'user':
        return <User className="h-4 w-4 text-blue-500" />;
      case 'device':
        return <Smartphone className="h-4 w-4 text-green-500" />;
      case 'settings':
        return <Settings className="h-4 w-4 text-purple-500" />;
      case 'invite':
        return <Mail className="h-4 w-4 text-yellow-500" />;
      default:
        return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        {activities.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Activity className="h-12 w-12 text-muted-foreground/50" />
            <p className="mt-2 text-sm text-muted-foreground">No activity yet</p>
          </div>
        ) : (
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="mt-1">{getIcon(activity.type)}</div>
                  <div className="flex-1">
                    <p className="text-sm">{activity.description}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{formatDate(activity.timestamp)}</span>
                      {activity.user && (
                        <>
                          <span>•</span>
                          <span>by {activity.user}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
