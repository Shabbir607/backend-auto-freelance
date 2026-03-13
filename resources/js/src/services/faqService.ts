import {
  BaseService,
  PaginatedResponse,
  PAGINATION_CONFIG
} from '@/lib/apiConfig';

export interface FAQ {
  id: number;
  question: string;
  answer: string;
  faqable_id: number;
  faqable_type: string;
  status: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface FAQFormData {
  question: string;
  answer: string;
  faqable_type: string;
  faqable_id: number;
  status: boolean;
  sort_order: number;
}

export interface FAQsResponse {
  success: boolean;
  data: PaginatedResponse<FAQ>;
}

export interface FAQResponse {
  success: boolean;
  data: FAQ;
}

export interface PublicFAQ {
  id: number;
  question: string;
  answer: string;
  order?: number;
  status?: boolean;
}

export interface PublicFAQsResponse {
  success: boolean;
  data: PublicFAQ[];
}

class FAQService extends BaseService {
  constructor() {
    super();
  }

  async listFAQs(
    page: number = PAGINATION_CONFIG.defaultPage,
    perPage: number = PAGINATION_CONFIG.defaultPerPage
  ): Promise<FAQsResponse> {
    const endpoint = this.buildUrl('/admin/faqs', { page, per_page: perPage });
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch FAQs: ${response.statusText}`);
    }

    return response.json();
  }

  async getFAQ(id: number): Promise<FAQResponse> {
    const response = await fetch(`${this.baseUrl}/admin/faqs/${id}`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch FAQ: ${response.statusText}`);
    }

    return response.json();
  }

  async createFAQ(data: FAQFormData): Promise<FAQResponse> {
    const response = await fetch(`${this.baseUrl}/admin/faqs`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create FAQ');
    }

    return response.json();
  }

  async updateFAQ(id: number, data: FAQFormData): Promise<FAQResponse> {
    const response = await fetch(`${this.baseUrl}/admin/faqs/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update FAQ');
    }

    return response.json();
  }

  async deleteFAQ(id: number): Promise<{ success: boolean; message: string }> {
    const response = await fetch(`${this.baseUrl}/admin/faqs/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete FAQ');
    }

    return response.json();
  }

  // Public/Web API endpoints (no authentication required)
  async getPublicFAQs(type: string, slug: string): Promise<PublicFAQsResponse> {
    const endpoint = this.buildUrl('/web/faqs', { type, slug });
    const response = await fetch(`${this.baseUrl}${endpoint}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch FAQs: ${response.statusText}`);
    }

    return response.json();
  }
}

export const faqService = new FAQService();
