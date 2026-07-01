import { apiClient } from '@/lib/api/client';
import { Device } from '@/types';

export const deviceService = {
  async getAll(params?: { clientId?: string; status?: string }) {
    const response = await apiClient.get('/devices', { params });
    return response.data;
  },

  async getById(id: string) {
    const response = await apiClient.get(`/devices/${id}`);
    return response.data;
  },

  async create(data: Partial<Device>) {
    const response = await apiClient.post('/devices', data);
    return response.data;
  },

  async update(id: string, data: Partial<Device>) {
    const response = await apiClient.put(`/devices/${id}`, data);
    return response.data;
  },

  async delete(id: string) {
    const response = await apiClient.delete(`/devices/${id}`);
    return response.data;
  },

  async getStatus(id: string) {
    const response = await apiClient.get(`/devices/${id}/status`);
    return response.data;
  },

  async sendCommand(id: string, command: string, params?: any) {
    const response = await apiClient.post(`/devices/${id}/command`, { command, params });
    return response.data;
  },
};
