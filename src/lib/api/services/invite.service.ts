import { apiClient } from '@/lib/api/client';
import { Invite } from '@/types';

export const inviteService = {
  async getAll(params?: { status?: string; page?: number; limit?: number }) {
    const response = await apiClient.get('/invites', { params });
    return response.data;
  },

  async create(email: string) {
    const response = await apiClient.post('/invites', { email });
    return response.data;
  },

  async resend(id: string) {
    const response = await apiClient.post(`/invites/${id}/resend`);
    return response.data;
  },

  async cancel(id: string) {
    const response = await apiClient.delete(`/invites/${id}`);
    return response.data;
  },

  async verify(token: string) {
    const response = await apiClient.get(`/invites/verify/${token}`);
    return response.data;
  },

  async accept(token: string) {
    const response = await apiClient.post(`/invites/accept/${token}`);
    return response.data;
  },
};
