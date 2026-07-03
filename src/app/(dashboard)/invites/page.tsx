'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { inviteService } from '@/lib/api/services/invite.service';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SearchBar } from '@/components/common/SearchBar';
import { formatDate } from '@/lib/utils/helpers';
import { Send, RefreshCw, X, Mail } from 'lucide-react';
import { toast } from 'react-hot-toast';

const inviteSchema = z.object({
  email: z.string().email('Invalid email address'),
});

type InviteFormData = z.infer<typeof inviteSchema>;

export default function InvitesPage() {
  const [search, setSearch] = useState('');
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InviteFormData>({
    resolver: zodResolver(inviteSchema),
  });

  const { data: invites = [], isLoading } = useQuery({
    queryKey: ['invites'],
    queryFn: () => inviteService.getAll(),
  });

  const createInvite = useMutation({
    mutationFn: (email: string) => inviteService.create(email),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invites'] });
      reset();
      toast.success('Invite sent successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to send invite');
    },
  });

  const resendInvite = useMutation({
    mutationFn: (id: string) => inviteService.resend(id),
    onSuccess: () => {
      toast.success('Invite resent successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to resend invite');
    },
  });

  const cancelInvite = useMutation({
    mutationFn: (id: string) => inviteService.cancel(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invites'] });
      toast.success('Invite cancelled successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to cancel invite');
    },
  });

  const onSubmit = async (data: InviteFormData) => {
    await createInvite.mutateAsync(data.email);
  };

  const filteredInvites = invites.filter((invite: any) =>
    invite.email.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="warning">Pending</Badge>;
      case 'accepted':
        return <Badge variant="success">Accepted</Badge>;
      case 'expired':
        return <Badge variant="destructive">Expired</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">Invites</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Send Invitation</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4">
            <div className="flex-1">
              <Input
                type="email"
                placeholder="Enter email address"
                {...register('email')}
                className="w-full"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <Button type="submit" disabled={createInvite.isLoading}>
              <Send className="mr-2 h-4 w-4" />
              {createInvite.isLoading ? 'Sending...' : 'Send Invite'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div>
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search invites..."
          className="mb-4 w-full sm:w-80"
        />

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Expires</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : filteredInvites.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    No invites found
                  </TableCell>
                </TableRow>
              ) : (
                filteredInvites.map((invite: any) => (
                  <TableRow key={invite.id}>
                    <TableCell>{invite.email}</TableCell>
                    <TableCell>{getStatusBadge(invite.status)}</TableCell>
                    <TableCell>{formatDate(invite.createdAt)}</TableCell>
                    <TableCell>{formatDate(invite.expiresAt)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        {invite.status === 'pending' && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => resendInvite.mutate(invite.id)}
                              disabled={resendInvite.isLoading}
                            >
                              <RefreshCw className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => cancelInvite.mutate(invite.id)}
                              disabled={cancelInvite.isLoading}
                              className="text-red-500 hover:text-red-700"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
