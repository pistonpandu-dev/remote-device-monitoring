'use client';

import { Loader2 } from 'lucide-react';

interface FormLoadingProps {
  text?: string;
  className?: string;
}

export function FormLoading({ text = 'Loading...', className }: FormLoadingProps) {
  return (
    <div className={`flex items-center gap-2 text-muted-foreground ${className}`}>
      <Loader2 className="h-4 w-4 animate-spin" />
      <span className="text-sm">{text}</span>
    </div>
  );
}
