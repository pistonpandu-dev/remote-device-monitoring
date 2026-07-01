import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';
import { LocationHistory } from '@/types';

export function useLocation(deviceId: string) {
  const getLocations = useQuery({
    queryKey: ['locations', deviceId],
    queryFn: async () => {
      const response = await apiClient.get(`/locations/${deviceId}`);
      return response.data as LocationHistory[];
    },
    enabled: !!deviceId,
    refetchInterval: 5000, // Refresh every 5 seconds
  });

  const getCurrentLocation = useQuery({
    queryKey: ['current-location', deviceId],
    queryFn: async () => {
      const response = await apiClient.get(`/locations/${deviceId}/current`);
      return response.data as LocationHistory;
    },
    enabled: !!deviceId,
    refetchInterval: 3000, // Refresh every 3 seconds
  });

  return {
    locations: getLocations.data || [],
    currentLocation: getCurrentLocation.data || null,
    isLoading: getLocations.isLoading || getCurrentLocation.isLoading,
    error: getLocations.error || getCurrentLocation.error,
    refetchLocations: getLocations.refetch,
    refetchCurrentLocation: getCurrentLocation.refetch,
  };
}
