import { apiRequest } from '@/lib/apiConfig';


export interface BlogCategory {
  id: number;
  title: string;
  slug: string;
  description: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface BlogAuthor {
  id: number;
  name: string;
  email: string;
  image: string;
  role: string;
}

export interface Blog {
  id: number;
  category_id: number;
  author_id: number;
  title: string;
  slug: string;
  description: string;
  content: string;
  image_url: string | null;
  image: string | null;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  views: number;
  is_featured: boolean;
  status: 'draft' | 'published' | 'scheduled';
  published_at: string;
  created_at: string;
  updated_at: string;
  category?: BlogCategory;
  author?: BlogAuthor;
  faqs?: Array<{
    id: number;
    question: string;
    answer: string;
  }>;
}

export interface BlogSeo {
  id?: number;
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  og_image?: string;
  twitter_card?: string;
  twitter_site?: string;
  meta_tags?: any[];
  structured_data?: any;
}

export interface PaginatedBlogs {
  current_page: number;
  data: Blog[];
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
}

export interface PaginatedBlogCategories {
  current_page: number;
  data: BlogCategory[];
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
}

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

// Internal API helpers removed in favor of centralized apiRequest

// Blog Category Services
// Admin Blog Category Services (with /admin prefix)
export const adminBlogCategoryService = {
  // Get all blog categories
  getAll: async (): Promise<ApiResponse<PaginatedBlogCategories>> => {
    const response = await apiRequest<any>('/admin/blog-categories', 'GET');
    return { success: response.success, message: response.message, data: response.data?.data };
  },

  // Create a new blog category
  create: async (data: {
    title: string;
    description: string;
    meta_title?: string;
    meta_description?: string;
    meta_keywords?: string;
    sort_order?: number;
    is_active?: boolean;
  }): Promise<ApiResponse<BlogCategory>> => {
    const response = await apiRequest<any>('/admin/blog-categories', 'POST', data);
    return { success: response.success, message: response.message, data: response.data?.data };
  },

  // Update a blog category
  update: async (
    id: number,
    data: Partial<{
      title: string;
      description: string;
      meta_title: string;
      meta_description: string;
      meta_keywords: string;
      sort_order: number;
      is_active: boolean;
    }>
  ): Promise<ApiResponse<BlogCategory>> => {
    const response = await apiRequest<any>(`/admin/blog-categories/${id}`, 'PUT', data);
    return { success: response.success, message: response.message, data: response.data?.data };
  },

  // Delete a blog category
  delete: async (id: number): Promise<ApiResponse<void>> => {
    const response = await apiRequest<any>(`/admin/blog-categories/${id}`, 'DELETE');
    return { success: response.success, message: response.message };
  },
};

// Public Blog Category Services (without /admin prefix)
export const blogCategoryService = {
  // Get all blog categories
  getAll: async (): Promise<ApiResponse<PaginatedBlogCategories>> => {
    const response = await apiRequest<any>('/blog-categories', 'GET');
    return { success: response.success, message: response.message, data: response.data?.data };
  },

  // Create a new blog category
  create: async (data: {
    title: string;
    description: string;
    meta_title?: string;
    meta_description?: string;
    meta_keywords?: string;
    sort_order?: number;
    is_active?: boolean;
  }): Promise<ApiResponse<BlogCategory>> => {
    const response = await apiRequest<any>('/blog-categories', 'POST', data);
    return { success: response.success, message: response.message, data: response.data?.data };
  },

  // Update a blog category
  update: async (
    id: number,
    data: Partial<{
      title: string;
      description: string;
      meta_title: string;
      meta_description: string;
      meta_keywords: string;
      sort_order: number;
      is_active: boolean;
    }>
  ): Promise<ApiResponse<BlogCategory>> => {
    const response = await apiRequest<any>(`/blog-categories/${id}`, 'PUT', data);
    return { success: response.success, message: response.message, data: response.data?.data };
  },

  delete: async (id: number): Promise<ApiResponse<void>> => {
    const response = await apiRequest<any>(`/blog-categories/${id}`, 'DELETE');
    return { success: response.success, message: response.message };
  },
};

// Admin Blog Services (with /admin prefix)
export const adminBlogService = {
  // Get all blogs with pagination
  getAll: async (page: number = 1, perPage: number = 20): Promise<ApiResponse<PaginatedBlogs>> => {
    const response = await apiRequest<any>(`/admin/blogs?page=${page}&per_page=${perPage}`, 'GET');
    return { success: response.success, message: response.message, data: response.data?.data };
  },

  // Get a single blog by ID
  getById: async (id: number): Promise<ApiResponse<Blog>> => {
    const response = await apiRequest<any>(`/admin/blogs/${id}`, 'GET');
    return { success: response.success, message: response.message, data: response.data?.data };
  },

  // Create a new blog
  create: async (data: {
    category_id: number;
    title: string;
    description: string;
    content: string;
    meta_title?: string;
    meta_description?: string;
    meta_keywords?: string;
    status: 'draft' | 'published' | 'scheduled';
    is_featured?: boolean;
    image?: string;
  }): Promise<ApiResponse<Blog>> => {
    const response = await apiRequest<any>('/admin/blogs', 'POST', data);
    return { success: response.success, message: response.message, data: response.data?.data };
  },

  // Create a new blog with image file
  createWithImage: async (data: {
    category_id: number;
    title: string;
    description: string;
    content: string;
    meta_title?: string;
    meta_description?: string;
    meta_keywords?: string;
    status: 'draft' | 'published' | 'scheduled';
    is_featured?: boolean;
  }, imageFile: File): Promise<ApiResponse<Blog>> => {
    const formData = new FormData();
    formData.append('category_id', data.category_id.toString());
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('content', data.content);
    formData.append('status', data.status);
    formData.append('is_featured', data.is_featured ? '1' : '0');
    if (data.meta_title) formData.append('meta_title', data.meta_title);
    if (data.meta_description) formData.append('meta_description', data.meta_description);
    if (data.meta_keywords) formData.append('meta_keywords', data.meta_keywords);
    formData.append('image_url', imageFile);
    const response = await apiRequest<any>('/admin/blogs', 'POST', formData);
    return { success: response.success, message: response.message, data: response.data?.data };
  },

  // Update a blog
  update: async (
    id: number,
    data: Partial<{
      category_id: number;
      title: string;
      description: string;
      content: string;
      meta_title: string;
      meta_description: string;
      meta_keywords: string;
      status: 'draft' | 'published' | 'scheduled';
      is_featured: boolean;
      image: string;
    }>
  ): Promise<ApiResponse<Blog>> => {
    const response = await apiRequest<any>(`/admin/blogs/${id}`, 'PUT', data);
    return { success: response.success, message: response.message, data: response.data?.data };
  },

  // Update a blog with image file
  updateWithImage: async (
    id: number,
    data: Partial<{
      category_id: number;
      title: string;
      description: string;
      content: string;
      meta_title: string;
      meta_description: string;
      meta_keywords: string;
      status: 'draft' | 'published' | 'scheduled';
      is_featured: boolean;
    }>,
    imageFile: File
  ): Promise<ApiResponse<Blog>> => {
    const formData = new FormData();
    if (data.category_id) formData.append('category_id', data.category_id.toString());
    if (data.title) formData.append('title', data.title);
    if (data.description) formData.append('description', data.description);
    if (data.content) formData.append('content', data.content);
    if (data.status) formData.append('status', data.status);
    if (data.is_featured !== undefined) formData.append('is_featured', data.is_featured ? '1' : '0');
    if (data.meta_title) formData.append('meta_title', data.meta_title);
    if (data.meta_description) formData.append('meta_description', data.meta_description);
    if (data.meta_keywords) formData.append('meta_keywords', data.meta_keywords);
    formData.append('image_url', imageFile);
    formData.append('_method', 'PUT');
    const response = await apiRequest<any>(`/admin/blogs/${id}`, 'POST', formData);
    return { success: response.success, message: response.message, data: response.data?.data };
  },

  // Delete a blog
  delete: async (id: number): Promise<ApiResponse<void>> => {
    const response = await apiRequest<any>(`/admin/blogs/${id}`, 'DELETE');
    return { success: response.success, message: response.message };
  },

  // Search blogs
  search: async (
    query: string,
    filters?: {
      category_id?: number;
      status?: string;
      page?: number;
    }
  ): Promise<ApiResponse<PaginatedBlogs>> => {
    const params = new URLSearchParams();
    if (query) params.append('search', query);
    if (filters?.category_id) params.append('category_id', filters.category_id.toString());
    if (filters?.status && filters.status !== 'all') params.append('status', filters.status);
    if (filters?.page) params.append('page', filters.page.toString());
    const response = await apiRequest<any>(`/admin/blogs?${params.toString()}`, 'GET');
    return { success: response.success, message: response.message, data: response.data?.data };
  },
};

// Public Blog Services (without /admin prefix)
export const blogService = {
  // Get all blogs with pagination, search, and category filter
  getAll: async (
    page: number = 1,
    perPage: number = 20,
    search?: string,
    categorySlug?: string
  ): Promise<ApiResponse<PaginatedBlogs>> => {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('per_page', perPage.toString());
    if (search) params.append('search', search);
    if (categorySlug) params.append('category', categorySlug);
    const response = await apiRequest<any>(`/blogs?${params.toString()}`, 'GET');
    return { success: response.success, message: response.message, data: response.data?.data };
  },

  // Get all blog categories
  getCategories: async (): Promise<ApiResponse<BlogCategory[]>> => {
    const response = await apiRequest<any>('/blogs/categories', 'GET');
    const result = response.data?.data;
    const arrayData = Array.isArray(result) ? result : (result?.data || []);
    return { success: response.success, message: response.message, data: arrayData };
  },

  // Get a single blog by slug
  getBySlug: async (slug: string): Promise<ApiResponse<Blog>> => {
    const response = await apiRequest<any>(`/blogs/${slug}`, 'GET');
    return { success: response.success, message: response.message, data: response.data?.data };
  },

  // Get blog by slug with SEO payload preserved
  getBySlugWithSeo: async (slug: string): Promise<ApiResponse<{ blog: Blog; seo?: BlogSeo }>> => {
    const response = await apiRequest<any>(`/blogs/${slug}`);
    return { success: response.success, message: response.message, data: response.data ? { blog: response.data.data, seo: response.data.seo } : undefined };
  },

  // Get a single blog by ID
  getById: async (id: number): Promise<ApiResponse<Blog>> => {
    const response = await apiRequest<any>(`/blogs/${id}`, 'GET');
    return { success: response.success, message: response.message, data: response.data?.data };
  },

  // Search blogs
  search: async (
    query: string,
    filters?: {
      category_id?: number;
      status?: string;
      page?: number;
    }
  ): Promise<ApiResponse<PaginatedBlogs>> => {
    const params = new URLSearchParams();
    if (query) params.append('search', query);
    if (filters?.category_id) params.append('category_id', filters.category_id.toString());
    if (filters?.status && filters.status !== 'all') params.append('status', filters.status);
    if (filters?.page) params.append('page', filters.page.toString());
    const response = await apiRequest<any>(`/blogs?${params.toString()}`, 'GET');
    return { success: response.success, message: response.message, data: response.data?.data };
  },

  // Get related blogs
  getRelatedBlogs: async (slug: string): Promise<ApiResponse<Blog[]>> => {
    const response = await apiRequest<any>(`/blogs/${slug}/related`);
    return { success: response.success, message: response.message, data: response.data?.data };
  },

  // Get related workflows for a blog
  getRelatedWorkflows: async (slug: string): Promise<ApiResponse<any[]>> => {
    const response = await apiRequest<any>(`/blogs/${slug}/related-workflows`);
    return { success: response.success, message: response.message, data: response.data?.data };
  },
};

