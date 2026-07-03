import { apiClient } from '@/lib/api/client';
import { ChatContact, ChatMessage } from '@/types';

export const whatsappService = {
  async getContacts() {
    const response = await apiClient.get('/whatsapp/contacts');
    return response.data as ChatContact[];
  },

  async getMessages(contactId: string, params?: { page?: number; limit?: number }) {
    const response = await apiClient.get(`/whatsapp/messages/${contactId}`, { params });
    return response.data as ChatMessage[];
  },

  async sendMessage(data: { contactId: string; message: string; media?: any }) {
    const response = await apiClient.post('/whatsapp/messages', data);
    return response.data;
  },

  async markAsRead(contactId: string) {
    const response = await apiClient.post(`/whatsapp/${contactId}/read`);
    return response.data;
  },

  async getUnreadCount() {
    const response = await apiClient.get('/whatsapp/unread');
    return response.data;
  },
};
