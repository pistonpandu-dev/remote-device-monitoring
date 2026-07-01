import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';
import { Device } from '@/types';
import { toast } from 'react-hot-toast';

export function useDevice() {
  const queryClient = useQueryClient();

  const getDevices = useQuery({
    queryKey: ['devices'],
    queryFn: async () => {
      const response = await apiClient.get('/devices');
      return response.data as Device[];
    },
  });

  const getDevice = (id: string) => {
    return useQuery({
      queryKey: ['device', id],
      queryFn: async () => {
        const response = await apiClient.get(`/devices/${id}`);
        return response.data as Device;
      },
      enabled: !!id,
    });
  };

  const createDevice = useMutation({
    mutationFn: async (data: Partial<Device>) => {
      const response = await apiClient.post('/devices', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['devices'] });
      toast.success('Device created successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create device');
    },
  });

  const updateDevice = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Device> }) => {
      const response = await apiClient.put(`/devices/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['devices'] });
      toast.success('Device updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update device');
    },
  });

  const deleteDevice = useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/devices/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['devices'] });
      toast.success('Device deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete device');
    },
  });

  return {
    devices: getDevices.data || [],
    isLoading: getDevices.isLoading,
    error: getDevices.error,
    getDevice,
    createDevice,
    updateDevice,
    deleteDevice,
    refetchDevices: getDevices.refetch,
  };
}
