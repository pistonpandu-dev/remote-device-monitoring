'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Client } from '@/types';
import { AlertTriangle } from 'lucide-react';

interface DeleteClientDialogProps {
  client: Client | null;
  open: boolean;
  onClose: () => void;
  onConfirm: (client: Client) => Promise<void>;
}

export function DeleteClientDialog({
  client,
  open,
  onClose,
  onConfirm,
}: DeleteClientDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    if (!client) return;
    setIsLoading(true);
    try {
      await onConfirm(client);
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  if (!client) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Delete Client
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete <strong>{client.name}</strong>?
            This action cannot be undone and will remove all associated devices.
          </DialogDescription>
        </DialogHeader>
        <div className="rounded-lg bg-red-50 p-4 dark:bg-red-950/20">
          <p className="text-sm text-red-600 dark:text-red-400">
            <strong>Warning:</strong> This will permanently delete:
          </p>
          <ul className="mt-2 list-disc pl-6 text-sm text-red-600 dark:text-red-400">
            <li>All client information</li>
            <li>All associated devices ({client.devices?.length || 0})</li>
            <li>All device data and history</li>
          </ul>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleConfirm} disabled={isLoading}>
            {isLoading ? 'Deleting...' : 'Delete Client'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
