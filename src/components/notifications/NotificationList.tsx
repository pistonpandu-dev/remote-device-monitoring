'use client';

import { useState } from 'react';
import { useNotificationStore } from '@/lib/store/useNotificationStore';
import { NotificationItem } from './NotificationItem';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bell, CheckCheck } from 'lucide-react';

interface NotificationListProps {
  maxHeight?: string;
  showActions?: boolean;
}

export function NotificationList({ maxHeight = '400px', showActions = true }: NotificationListProps) {
  const { notifications, unreadCount, markAllAsRead, clearAll } = useNotificationStore();
  const [isOpen, setIsOpen] = useState(false);

  const unreadNotifications = notifications.filter(n => !n.read);
  const hasUnread = unreadNotifications.length > 0;

  if (notifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <Bell className="h-12 w-12 text-muted-foreground/50" />
        <p className="mt-4 text-sm text-muted-foreground">No notifications</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {showActions && hasUnread && (
        <div className="flex items-center justify-between px-1">
          <span className="text-sm text-muted-foreground">
            {unreadCount} unread
          </span>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="h-8 text-xs"
            >
              <CheckCheck className="mr-1 h-3 w-3" />
              Mark all read
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAll}
              className="h-8 text-xs text-red-500 hover:text-red-700"
            >
              Clear all
            </Button>
          </div>
        </div>
      )}

      <ScrollArea className={`h-[${maxHeight}] pr-4`}>
        <div className="space-y-2">
          {notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
