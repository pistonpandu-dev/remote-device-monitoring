import { apiClient } from '@/lib/api/client';
import { LocationHistory } from '@/types';

export const locationService = {
  async getCurrent(deviceId: string) {
    const response = await apiClient.get(`/locations/${deviceId}/current`);
    return response.data as LocationHistory;
  },

  async getHistory(deviceId: string, params?: { from?: string; to?: string; limit?: number }) {
    const response = await apiClient.get(`/locations/${deviceId}/history`, { params });
    return response.data as LocationHistory[];
  },

  async getRoute(deviceId: string, from: string, to: string) {
    const response = await apiClient.get(`/locations/${deviceId}/route`, { params: { from, to } });
    return response.data as LocationHistory[];
  },

  async updateLocation(deviceId: string, data: Partial<LocationHistory>) {
    const response = await apiClient.put(`/locations/${deviceId}`, data);
    return response.data;
  },
};
