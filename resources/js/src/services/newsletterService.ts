import { apiRequest, ApiResponse, PaginatedResponse } from '@/lib/apiConfig';

export interface NewsletterSubscriber {
  id: number;
  email: string;
  name?: string | null;
  status?: string | null;
  created_at?: string;
  updated_at?: string;
}

export const newsletterService = {
  getAllSubscribers: async (page: number = 1): Promise<ApiResponse<PaginatedResponse<NewsletterSubscriber> | NewsletterSubscriber[]>> => {
    const response = await apiRequest<any>(`/admin/newsletter-subscribers?page=${page}`, 'GET');

    const payload = response.data;
    const data = payload?.data ?? payload;

    return {
      success: response.success,
      message: response.message,
      data,
    };
  },

  deleteSubscriber: async (id: number): Promise<ApiResponse<{ success?: boolean; message?: string }>> => {
    const response = await apiRequest<any>(`/admin/newsletter-subscribers/${id}`, 'DELETE');

    return {
      success: response.success,
      message: response.message,
      data: response.data,
    };
  },
};
