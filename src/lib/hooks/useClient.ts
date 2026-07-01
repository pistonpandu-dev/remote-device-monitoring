import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';
import { Client } from '@/types';
import { toast } from 'react-hot-toast';

export function useClient() {
  const queryClient = useQueryClient();

  const getClients = useQuery({
    queryKey: ['clients'],
    queryFn: async () => {
      const response = await apiClient.get('/clients');
      return response.data as Client[];
    },
  });

  const getClient = (id: string) => {
    return useQuery({
      queryKey: ['client', id],
      queryFn: async () => {
        const response = await apiClient.get(`/clients/${id}`);
        return response.data as Client;
      },
      enabled: !!id,
    });
  };

  const createClient = useMutation({
    mutationFn: async (data: Partial<Client>) => {
      const response = await apiClient.post('/clients', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      toast.success('Client created successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create client');
    },
  });

  const updateClient = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Client> }) => {
      const response = await apiClient.put(`/clients/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      toast.success('Client updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update client');
    },
  });

  const deleteClient = useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/clients/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      toast.success('Client deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete client');
    },
  });

  return {
    clients: getClients.data || [],
    isLoading: getClients.isLoading,
    error: getClients.error,
    getClient,
    createClient,
    updateClient,
    deleteClient,
    refetchClients: getClients.refetch,
  };
}
