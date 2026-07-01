import { apiClient } from '@/lib/api/client';

export const authService = {
  async getCurrentUser() {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },

  async updateProfile(data: { name?: string; photoURL?: string }) {
    const response = await apiClient.put('/auth/profile', data);
    return response.data;
  },

  async changePassword(data: { currentPassword: string; newPassword: string }) {
    const response = await apiClient.post('/auth/change-password', data);
    return response.data;
  },

  async deleteAccount() {
    const response = await apiClient.delete('/auth/account');
    return response.data;
  },

  async refreshToken() {
    const response = await apiClient.post('/auth/refresh-token');
    return response.data;
  },
};
