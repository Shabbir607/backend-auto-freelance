import {
  BaseService
} from '@/lib/apiConfig';

export interface Page {
  id: number;
  title: string;
  slug: string;
  content: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  meta_tags: Record<string, any>;
  og_image: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

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

export interface PageSEO {
  id: number;
  title: string;
  description: string;
  keywords: string;
  canonical?: string;
  og_image?: string;
  meta_tags?: Record<string, any>;
  structured_data?: Record<string, any>;
}

export interface PageBody extends Page {
  faqs?: FAQ[];
}

export interface PageBodyResponse {
  success: boolean;
  data: PageBody;
  seo?: PageSEO;
}

export interface PageFormData {
  title: string;
  slug: string;
  content: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  meta_tags: Record<string, any>;
  og_image: string;
  is_active: boolean;
}

export interface PagesResponse {
  success: boolean;
  data: Page[];
}

export interface PageResponse {
  success: boolean;
  data: Page;
}

class PageService extends BaseService {
  constructor() {
    super();
  }

  async listPages(): Promise<PagesResponse> {
    const response = await fetch(`${this.baseUrl}/admin/pages`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch pages: ${response.statusText}`);
    }

    return response.json();
  }

  async getUserPages(): Promise<PagesResponse> {
    const response = await fetch(`${this.baseUrl}/user/pages`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch user pages: ${response.statusText}`);
    }

    return response.json();
  }

  async getPageBySlug(slug: string): Promise<PageResponse> {
    const response = await fetch(`${this.baseUrl}/pages/${slug}`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch page: ${response.statusText}`);
    }

    return response.json();
  }

  async getPageBody(slug: string): Promise<PageBodyResponse> {
    const response = await fetch(`${this.baseUrl}/pagebody/${slug}`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch page body: ${response.statusText}`);
    }

    return response.json();
  }

  async getPage(id: number): Promise<PageResponse> {
    const response = await fetch(`${this.baseUrl}/admin/pages/${id}`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch page: ${response.statusText}`);
    }

    return response.json();
  }

  async createPage(data: PageFormData): Promise<PageResponse> {
    const response = await fetch(`${this.baseUrl}/admin/pages`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create page');
    }

    return response.json();
  }

  async updatePage(id: number, data: PageFormData): Promise<PageResponse> {
    const response = await fetch(`${this.baseUrl}/admin/pages/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update page');
    }

    return response.json();
  }

  async deletePage(id: number): Promise<{ success: boolean; message: string }> {
    const response = await fetch(`${this.baseUrl}/admin/pages/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete page');
    }

    return response.json();
  }
  private validSlugs: string[] | null = null;

  async getValidSlugs(): Promise<string[]> {
    if (this.validSlugs) {
      return this.validSlugs;
    }

    try {
      const response = await fetch(`${this.baseUrl}/page-slugs`, {
        headers: {
          'Accept': 'application/json',
          // No auth headers needed for public endpoint, but consistent header helper is fine if public
        },
      });

      if (!response.ok) {
        // Silent fail or return empty, don't throw to avoid breaking the app logic
        console.warn('Failed to fetch page slugs');
        return [];
      }

      const result = await response.json();
      if (result.success && Array.isArray(result.data)) {
        this.validSlugs = result.data;
        return result.data;
      }
      return [];
    } catch (error) {
      console.warn('Error fetching page slugs', error);
      return [];
    }
  }
}

export const pageService = new PageService();
