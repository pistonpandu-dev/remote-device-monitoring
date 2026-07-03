'use client';

import { Notification } from '@/types';
import { formatDate } from '@/lib/utils/helpers';
import { useNotificationStore } from '@/lib/store/useNotificationStore';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/helpers';
import { 
  Info, 
  CheckCircle, 
  AlertTriangle, 
  AlertCircle,
  X 
} from 'lucide-react';

interface NotificationItemProps {
  notification: Notification;
  onClose?: () => void;
}

export function NotificationItem({ notification, onClose }: NotificationItemProps) {
  const { markAsRead } = useNotificationStore();

  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getBgColor = () => {
    switch (notification.type) {
      case 'success':
        return 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800';
      case 'warning':
        return 'bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800';
      case 'error':
        return 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800';
      default:
        return 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800';
    }
  };

  const handleClick = () => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
  };

  return (
    <div
      className={cn(
        'relative rounded-lg border p-4 transition-all hover:shadow-sm',
        getBgColor(),
        !notification.read && 'border-l-4 border-l-blue-500',
        notification.read && 'opacity-70'
      )}
      onClick={handleClick}
      role="button"
      tabIndex={0}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5">{getIcon()}</div>
        <div className="flex-1 space-y-1">
          <div className="flex items-start justify-between gap-2">
            <p className="font-medium">{notification.title}</p>
            {onClose && (
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 shrink-0"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{notification.body}</p>
          <p className="text-xs text-muted-foreground">
            {formatDate(notification.createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
}
