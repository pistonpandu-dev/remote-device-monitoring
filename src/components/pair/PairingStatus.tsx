'use client';

import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Clock, Loader2 } from 'lucide-react';

interface PairingStatusProps {
  status: 'waiting' | 'connected' | 'expired';
  deviceId?: string;
}

export function PairingStatus({ status, deviceId }: PairingStatusProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'connected':
        return {
          icon: CheckCircle,
          label: 'Connected',
          variant: 'success' as const,
          color: 'text-green-500',
        };
      case 'expired':
        return {
          icon: XCircle,
          label: 'Expired',
          variant: 'destructive' as const,
          color: 'text-red-500',
        };
      default:
        return {
          icon: Clock,
          label: 'Waiting for Connection',
          variant: 'warning' as const,
          color: 'text-yellow-500',
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="flex items-center gap-3">
        {status === 'waiting' && (
          <Loader2 className="h-8 w-8 animate-spin text-yellow-500" />
        )}
        <Icon className={`h-8 w-8 ${config.color}`} />
        <div>
          <p className="font-medium">{config.label}</p>
          <Badge variant={config.variant}>{status.toUpperCase()}</Badge>
        </div>
      </div>
      {status === 'connected' && deviceId && (
        <div className="text-sm text-muted-foreground">
          Device ID: <span className="font-mono">{deviceId}</span>
        </div>
      )}
    </div>
  );
}
