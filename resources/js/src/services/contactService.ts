import { apiRequest, ApiResponse, PaginatedResponse } from '@/lib/apiConfig';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  message: string;
}

export interface NewsletterSubscribeData {
  email: string;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  reply_status: boolean;
  reply_message: string | null;
  replied_at: string | null;
  created_at: string;
  updated_at: string;
}

export const contactService = {
  /**
   * Submit contact form to public contact endpoint
   */
  submitContactForm: async (data: ContactFormData): Promise<ApiResponse<ContactResponse>> => {
    const response = await apiRequest<any>('/contact', 'POST', data);
    return { success: response.success, message: response.message, data: response.data?.data };
  },

  /**
   * Subscribe email to public newsletter endpoint
   */
  subscribeNewsletter: async (data: NewsletterSubscribeData): Promise<ApiResponse<ContactResponse>> => {
    const response = await apiRequest<any>('/newsletter', 'POST', data);
    return { success: response.success, message: response.message, data: response.data?.data };
  },

  /**
   * Get all contact messages (admin only)
   */
  getAllMessages: async (page: number = 1): Promise<ApiResponse<PaginatedResponse<ContactMessage>>> => {
    const response = await apiRequest<any>(`/admin/contact-messages?page=${page}`, 'GET');
    return { success: response.success, message: response.message, data: response.data?.data };
  },

  /**
   * Get single contact message by ID (admin only)
   */
  getMessageById: async (id: number): Promise<ApiResponse<ContactMessage>> => {
    const response = await apiRequest<any>(`/admin/contact-messages/${id}`, 'GET');
    return { success: response.success, message: response.message, data: response.data?.data };
  },

  /**
   * Reply to a contact message (admin only)
   */
  replyToMessage: async (id: number, replyMessage: string): Promise<ApiResponse<ContactResponse>> => {
    const response = await apiRequest<any>(`/admin/contact-messages/${id}/reply`, 'POST', { reply_message: replyMessage });
    return { success: response.success, message: response.message, data: response.data?.data };
  },
};
