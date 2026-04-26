// Workflow API Service
import { apiRequest, buildQueryString } from '@/lib/apiConfig';

// No longer need local API_BASE_URL constant if using apiRequest

export interface WorkflowNode {
  id: number;
  type: 'trigger' | 'action' | 'filter' | 'ai' | 'delay';
}

export interface WorkflowFeature {
  id?: number;
  name: string;
}

export interface WorkflowCategory {
  id: number;
  title: string;
  slug: string;
  icon: string;
  badge_text: string;
  sort_order: number;
  is_active: boolean;
  image_url?: string | null;
  created_at: string;
  updated_at: string;
}

// Updated interface to include optional fields used in FormData
export interface CreateWorkflowPayload {
  title: string;
  category_id: number;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  price: number;
  time_saved_value: number;
  time_saved_unit: string;
  roi_percentage: number;
  nodes_count: number;
  user_count: number;
  rating: number;
  json_data: Record<string, any>;
  json_file?: File; // Added for type safety
  workflow_features: string[];
  workflow_nodes: WorkflowNode[];
  status: 'draft' | 'published';
  // Allow for other fields when mapped from FormData
  [key: string]: any;
}

export interface WorkflowResponse {
  id: number;
  external_id?: string | null;
  category_id: number;
  title: string;
  description: string;
  slug: string;
  difficulty: string;
  price: string;
  time_saved_value: number;
  time_saved_unit: string;
  roi_percentage: number;
  nodes_count: number;
  user_count: number;
  views: number;
  recent_views: number;
  total_views: number;
  rating: string;
  json_data: Record<string, any>;
  json_file_name?: string | null;
  json_file_path?: string | null;
  workflow_features: string[];
  workflow_nodes: WorkflowNode[];
  status: string;
  reviews_count?: number;
  meta_title?: string | null;
  meta_description?: string | null;
  meta_keywords?: string | null;
  canonical_url?: string | null;
  og_image?: string | null;
  created_at: string;
  updated_at: string;
  category: WorkflowCategory;
  categories: any[];
  integrations: any[];
  reviews?: Array<{
    id: number;
    user_id?: number | null;
    name: string;
    rating: number;
    comment: string;
    created_at: string;
    is_verified: boolean;
  }>;
  faqs?: Array<{
    id: number;
    question: string;
    answer: string;
  }>;
}

export interface WorkflowsListResponse {
  success: boolean;
  data: {
    current_page: number;
    data: WorkflowResponse[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Array<{
      url: string | null;
      label: string;
      active: boolean;
    }>;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  };
}

export interface SingleWorkflowResponse {
  success: boolean;
  data: WorkflowResponse;
}

class WorkflowService {
  // Headers are now handled centrally in apiRequest

  /**
   * GET /admin/workflows - List all workflows with pagination
   */
  async listWorkflows(page: number = 1, perPage: number = 20): Promise<WorkflowsListResponse> {
    const response = await apiRequest<any>(`/admin/workflows?page=${page}&per_page=${perPage}`);
    if (!response.success) throw new Error(response.message);
    return { success: true, data: response.data };
  }

  /**
   * POST /admin/workflows - Create a new workflow
   * Accepts JSON object OR FormData
   */
  async createWorkflow(payload: CreateWorkflowPayload | FormData): Promise<SingleWorkflowResponse> {
    const response = await apiRequest<WorkflowResponse>('/admin/workflows', 'POST', payload);
    if (!response.success) throw new Error(response.message);
    const dataPayload = (response.data as any).data || response.data;
    return { success: true, data: dataPayload };
  }

  /**
   * GET /admin/workflows/:id - Get a specific workflow by ID
   */
  async getWorkflow(id: number): Promise<SingleWorkflowResponse> {
    const response = await apiRequest<WorkflowResponse>(`/admin/workflows/${id}`);
    if (!response.success) throw new Error(response.message);
    const dataPayload = (response.data as any).data || response.data;
    return { success: true, data: dataPayload };
  }

  /**
   * PUT /admin/workflows/:id - Update a specific workflow
   * Accepts JSON object OR FormData
   */
  async updateWorkflow(id: number, payload: Partial<CreateWorkflowPayload> | FormData): Promise<SingleWorkflowResponse> {
    const response = await apiRequest<WorkflowResponse>(`/admin/workflows/${id}`, 'PUT', payload);
    if (!response.success) throw new Error(response.message);
    const dataPayload = (response.data as any).data || response.data;
    return { success: true, data: dataPayload };
  }

  /**
   * DELETE /admin/workflows/:id - Delete a specific workflow
   */
  async deleteWorkflow(id: number): Promise<{ success: boolean; message: string }> {
    const response = await apiRequest<{ success: boolean; message: string }>(`/admin/workflows/${id}`, 'DELETE');
    if (!response.success) throw new Error(response.message);
    return (response.data as any).data || response.data!;
  }

  /**
   * GET /admin/workflow-categories - List all workflow categories
   */
  async listCategories(): Promise<{ success: boolean; data: { data: WorkflowCategory[] } }> {
    const response = await apiRequest<any>('/admin/workflow-categories');
    if (!response.success) throw new Error(response.message);
    return { success: true, data: response.data?.data };
  }

  /**
   * GET /admin/workflow-categories/:id - Get a specific category by ID
   */
  async getCategory(id: number): Promise<{ success: boolean; data: WorkflowCategory }> {
    const response = await apiRequest<any>(`/admin/workflow-categories/${id}`);
    if (!response.success) throw new Error(response.message);
    return { success: true, data: response.data?.data };
  }

  /**
   * POST /admin/workflow-categories - Create a new category
   */
  async createCategory(payload: Partial<WorkflowCategory>): Promise<{ success: boolean; data: WorkflowCategory }> {
    const response = await apiRequest<any>('/admin/workflow-categories', 'POST', payload);
    if (!response.success) throw new Error(response.message);
    return { success: true, data: response.data?.data };
  }

  /**
   * PUT /admin/workflow-categories/:id - Update a specific category
   */
  async updateCategory(id: number, payload: Partial<WorkflowCategory>): Promise<{ success: boolean; data: WorkflowCategory }> {
    const response = await apiRequest<any>(`/admin/workflow-categories/${id}`, 'PUT', payload);
    if (!response.success) throw new Error(response.message);
    return { success: true, data: response.data?.data };
  }

  /**
   * DELETE /admin/workflow-categories/:id - Delete a specific category
   */
  async deleteCategory(id: number): Promise<{ success: boolean; message: string }> {
    const response = await apiRequest<{ success: boolean; message: string }>(`/admin/workflow-categories/${id}`, 'DELETE');
    if (!response.success) throw new Error(response.message);
    return response.data!;
  }

  /**
   * GET /workflow-library - Get public workflow library with pagination
   */
  async getWorkflowLibrary(
    page: number = 1,
    perPage: number = 12,
    search: string = '',
    categoryId: number | null = null,
    sort: string = 'newest'
  ): Promise<{ current_page: number; data: WorkflowResponse[]; last_page: number; total: number; per_page: number }> {
    const params: any = { page, per_page: perPage, sort };
    if (search) params.search = search;
    if (categoryId) params.category_id = categoryId;

    const response = await apiRequest<any>(`/workflows${buildQueryString(params)}`);
    if (!response.success) throw new Error(response.message);
    return response.data;
  }

  /**
   * GET /workflows/stats - Get workflow statistics
   */
  async getWorkflowStats(): Promise<{ success: boolean; data: { total_workflows: number; total_visits: number; active_users_today: number } }> {
    const response = await apiRequest<any>('/workflows/stats');
    if (!response.success) throw new Error(response.message);
    return { success: true, data: response.data?.data || response.data };
  }

  /**
   * GET /workflow-library/categories - Get public workflow categories
   */
  async getWorkflowLibraryCategories(): Promise<{ success: boolean; data: WorkflowCategory[] }> {
    const response = await apiRequest<any>('/workflow-library/categories');
    if (!response.success) throw new Error(response.message);
    const result = response.data;
    const arrayData = (result as any).data || result;
    return { success: true, data: (Array.isArray(arrayData) ? arrayData : []) as WorkflowCategory[] };
  }

  /**
   * GET /workflow-library/:slug - Get a specific workflow by slug
   */
  async getWorkflowBySlug(slug: string): Promise<{ success: boolean; data: any; seo: any; relatedWorkflows?: WorkflowResponse[]; suggestedBlogs?: any[] }> {
    const response = await apiRequest<any>(`/workflow-library/${slug}`);
    if (!response.success) throw new Error(response.message);

    const raw = response.data;
    const payload = raw?.data ?? raw;

    return {
      success: true,
      data: payload,
      seo: payload?.seo || raw?.seo || null,
      relatedWorkflows: raw?.relatedWorkflows || payload?.relatedWorkflows || [],
      suggestedBlogs: raw?.suggestedBlogs || payload?.suggestedBlogs || []
    };
  }

  /**
   * GET /workflows/file/:name - Get workflow JSON file by filename
   */
  async getWorkflowJsonFile(fileName: string | null, jsonFilePath?: string | null): Promise<any> {
    // Priority 1: Try json_file_path first if it contains a valid URL
    if (jsonFilePath && (jsonFilePath.startsWith('http') || jsonFilePath.startsWith('https'))) {
      try {
        console.log(`Fetching from json_file_path: ${jsonFilePath}`);
        const response = await fetch(jsonFilePath, {
          headers: {
            'x-app-key': import.meta.env.VITE_FRONTEND_SECRET || '',
          },
        });
        if (response.ok) {
          return await response.json();
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      } catch (error) {
        console.warn(`Error fetching from json_file_path (${jsonFilePath}):`, error);

        // Priority 2: Fallback to backend API using fileName if json_file_path fails
        if (fileName) {
          try {
            console.log(`Falling back to API with fileName: ${fileName}`);
            const url = (fileName.startsWith('http') || fileName.startsWith('/'))
              ? fileName
              : `/workflows/file/${fileName}`;

            const apiResponse = await apiRequest<any>(url);
            if (!apiResponse.success) {
              throw new Error(apiResponse.message);
            }
            return apiResponse.data;
          } catch (fallbackError) {
            console.error(`Fallback to API also failed for ${fileName}:`, fallbackError);
            throw fallbackError;
          }
        }
        throw error;
      }
    }

    // Priority 2: If json_file_path is not a valid URL, try backend API using fileName
    if (fileName) {
      try {
        const url = (fileName.startsWith('http') || fileName.startsWith('/'))
          ? fileName
          : `/workflows/file/${fileName}`;

        const response = await apiRequest<any>(url);
        if (!response.success) {
          throw new Error(response.message);
        }
        return response.data;
      } catch (error) {
        console.error(`Error fetching from API (${fileName}):`, error);
        throw error;
      }
    }

    throw new Error('No file name or path provided');
  }

  /**
   * GET /workflow-library/:slug/related - Get related workflows by slug
   */
  async getRelatedWorkflows(slug: string): Promise<{ success: boolean; data: WorkflowResponse[] }> {
    const response = await apiRequest<any>(`/workflow/${slug}/related`);
    if (!response.success) throw new Error(response.message);

    const raw = response.data;
    const related =
      raw?.related_workflows ||
      raw?.data?.related_workflows ||
      raw?.data ||
      [];

    return {
      success: true,
      data: Array.isArray(related) ? related : []
    };
  }

  /**
   * POST /workflow/:slug/reviews - Submit a review
   */
  async submitReview(slug: string, data: { rating: number; comment: string; name?: string; email?: string }): Promise<{ success: boolean; message: string; data?: any }> {
    const response = await apiRequest<any>(`/workflow/${slug}/reviews`, 'POST', data);
    return { success: response.success, message: response.message || '', data: response.data };
  }

  /**
   * GET /workflow/:slug/related-blogs - Get relevant blogs by workflow slug
   */
  async getRelatedBlogs(slug: string): Promise<{ success: boolean; data: any[] }> {
    const response = await apiRequest<any>(`/workflow/${slug}/related-blogs`);
    if (!response.success) throw new Error(response.message);

    const raw = response.data;
    const blogs = raw?.data || raw?.related_blogs || [];

    return {
      success: true,
      data: Array.isArray(blogs) ? blogs : []
    };
  }
}

export const workflowService = new WorkflowService();