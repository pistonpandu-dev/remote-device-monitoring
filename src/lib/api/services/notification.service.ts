import { apiClient } from '@/lib/api/client';
import { Notification } from '@/types';

export const notificationService = {
  async getAll(params?: { read?: boolean; type?: string; limit?: number }) {
    const response = await apiClient.get('/notifications', { params });
    return response.data as Notification[];
  },

  async markAsRead(id: string) {
    const response = await apiClient.post(`/notifications/${id}/read`);
    return response.data;
  },

  async markAllAsRead() {
    const response = await apiClient.post('/notifications/read-all');
    return response.data;
  },

  async delete(id: string) {
    const response = await apiClient.delete(`/notifications/${id}`);
    return response.data;
  },

  async deleteAll() {
    const response = await apiClient.delete('/notifications');
    return response.data;
  },

  async registerToken(token: string) {
    const response = await apiClient.post('/notifications/register', { token });
    return response.data;
  },

  async unregisterToken(token: string) {
    const response = await apiClient.post('/notifications/unregister', { token });
    return response.data;
  },
};
