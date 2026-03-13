import { ApiResponse, apiRequest } from '@/lib/apiConfig';

export interface CreateSupportTicketPayload {
  name: string;
  email: string;
}

export interface SendSupportMessagePayload {
  message: string;
}

export interface SupportTicketMessage {
  id?: string | number;
  message?: string;
  content?: string;
  sender?: string;
  sender_type?: string;
  created_at?: string;
  timestamp?: string;
  [key: string]: any;
}

export interface AdminSupportTicket {
  id: number;
  name?: string;
  email?: string;
  status?: string;
  subject?: string;
  created_at?: string;
  updated_at?: string;
  last_message_at?: string;
  messages_count?: number;
  [key: string]: any;
}

export interface AdminSupportStats {
  total_tickets?: number;
  open_tickets?: number;
  closed_tickets?: number;
  today_tickets?: number;
  [key: string]: any;
}

export interface AdminSupportReplyPayload {
  message: string;
}

export const supportChatService = {
  // POST /support/ticket
  createTicket: async (data: CreateSupportTicketPayload): Promise<ApiResponse<any>> => {
    const response = await apiRequest<any>('/support/ticket', 'POST', data);
    return {
      success: response.success,
      message: response.message,
      data: response.data,
      errors: response.errors,
    };
  },

  // POST /support/ticket/{token}/message
  sendMessage: async (token: string, data: SendSupportMessagePayload): Promise<ApiResponse<any>> => {
    const response = await apiRequest<any>(`/support/ticket/${token}/message`, 'POST', data);
    return {
      success: response.success,
      message: response.message,
      data: response.data,
      errors: response.errors,
    };
  },

  // GET /support/ticket/{token}/messages
  getMessages: async (token: string): Promise<ApiResponse<any>> => {
    const response = await apiRequest<any>(`/support/ticket/${token}/messages`, 'GET');
    return {
      success: response.success,
      message: response.message,
      data: response.data,
      errors: response.errors,
    };
  },
};

const ADMIN_SUPPORT_BASE = '/support';

export const adminSupportChatService = {
  // GET /admin/support/stats
  getStats: async (): Promise<ApiResponse<any>> => {
    const response = await apiRequest<any>(`${ADMIN_SUPPORT_BASE}/stats`, 'GET');
    return {
      success: response.success,
      message: response.message,
      data: response.data,
      errors: response.errors,
    };
  },

  // GET /admin/support/tickets
  getTickets: async (page: number = 1): Promise<ApiResponse<any>> => {
    const response = await apiRequest<any>(`${ADMIN_SUPPORT_BASE}/tickets?page=${page}`, 'GET');
    return {
      success: response.success,
      message: response.message,
      data: response.data,
      errors: response.errors,
    };
  },

  // GET /admin/support/tickets/{id}
  getTicketById: async (id: number): Promise<ApiResponse<any>> => {
    const response = await apiRequest<any>(`${ADMIN_SUPPORT_BASE}/tickets/${id}`, 'GET');
    return {
      success: response.success,
      message: response.message,
      data: response.data,
      errors: response.errors,
    };
  },

  // POST /admin/support/tickets/{id}/reply
  replyToTicket: async (id: number, data: AdminSupportReplyPayload): Promise<ApiResponse<any>> => {
    const response = await apiRequest<any>(`${ADMIN_SUPPORT_BASE}/tickets/${id}/reply`, 'POST', data);
    return {
      success: response.success,
      message: response.message,
      data: response.data,
      errors: response.errors,
    };
  },

  // PUT /admin/support/tickets/{id}/close
  closeTicket: async (id: number): Promise<ApiResponse<any>> => {
    const response = await apiRequest<any>(`${ADMIN_SUPPORT_BASE}/tickets/${id}/close`, 'PUT');
    return {
      success: response.success,
      message: response.message,
      data: response.data,
      errors: response.errors,
    };
  },

  // PUT /admin/support/tickets/{id}/reopen
  reopenTicket: async (id: number): Promise<ApiResponse<any>> => {
    const response = await apiRequest<any>(`${ADMIN_SUPPORT_BASE}/tickets/${id}/reopen`, 'PUT');
    return {
      success: response.success,
      message: response.message,
      data: response.data,
      errors: response.errors,
    };
  },

  // DELETE /admin/support/tickets/{id}
  deleteTicket: async (id: number): Promise<ApiResponse<any>> => {
    const response = await apiRequest<any>(`${ADMIN_SUPPORT_BASE}/tickets/${id}`, 'DELETE');
    return {
      success: response.success,
      message: response.message,
      data: response.data,
      errors: response.errors,
    };
  },
};