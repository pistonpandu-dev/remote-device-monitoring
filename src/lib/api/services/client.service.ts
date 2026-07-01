import { apiClient } from '@/lib/api/client';
import { Client } from '@/types';

export const clientService = {
  async getAll(params?: { search?: string; status?: string; page?: number; limit?: number }) {
    const response = await apiClient.get('/clients', { params });
    return response.data;
  },

  async getById(id: string) {
    const response = await apiClient.get(`/clients/${id}`);
    return response.data;
  },

  async create(data: Partial<Client>) {
    const response = await apiClient.post('/clients', data);
    return response.data;
  },

  async update(id: string, data: Partial<Client>) {
    const response = await apiClient.put(`/clients/${id}`, data);
    return response.data;
  },

  async delete(id: string) {
    const response = await apiClient.delete(`/clients/${id}`);
    return response.data;
  },

  async getStats() {
    const response = await apiClient.get('/clients/stats');
    return response.data;
  },
};
