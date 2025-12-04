import { apiClient, ApiResponse } from './client';
import { ContactMessage } from '@/types/models';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export const contactApi = {
  async submitMessage(data: ContactFormData): Promise<ApiResponse<ContactMessage>> {
    return apiClient.post<ContactMessage>('/api/contact', data);
  },
};
