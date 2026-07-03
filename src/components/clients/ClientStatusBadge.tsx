'use client';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils/helpers';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface ClientStatusBadgeProps {
  status: 'active' | 'inactive' | 'pending';
  className?: string;
}

export function ClientStatusBadge({ status, className }: ClientStatusBadgeProps) {
  const config = {
    active: {
      icon: CheckCircle,
      label: 'Active',
      variant: 'success' as const,
    },
    inactive: {
      icon: XCircle,
      label: 'Inactive',
      variant: 'secondary' as const,
    },
    pending: {
      icon: AlertCircle,
      label: 'Pending',
      variant: 'warning' as const,
    },
  };

  const { icon: Icon, label, variant } = config[status];

  return (
    <Badge variant={variant} className={cn('gap-1', className)}>
      <Icon className="h-3 w-3" />
      {label}
    </Badge>
  );
}
