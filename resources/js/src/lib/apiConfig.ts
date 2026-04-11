
// Universal API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || (typeof window !== 'undefined' ? `${window.location.origin}/api` : 'https://api.edgelancer.com/api'),
  SESSION_KEY: 'nexus_session',
  DEFAULT_PER_PAGE: 15,
  MAX_PER_PAGE: 100,
  TIMEOUT: 30000, // 30 seconds
};

// Pagination configuration
export const PAGINATION_CONFIG = {
  defaultPage: 1,
  defaultPerPage: API_CONFIG.DEFAULT_PER_PAGE,
  pageSizeOptions: [10, 15, 25, 50, 100],
};

// Generic pagination response interface
export interface PaginatedResponse<T> {
  current_page: number;
  data: T[];
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

// Generic API response interface
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Record<string, string[]>;
}

// Helper function to get auth token from nexus_session
export const getAuthToken = (): string | null => {
  try {
    if (typeof window === 'undefined') return null;
    const session = localStorage.getItem(API_CONFIG.SESSION_KEY);
    if (session) {
      const parsed = JSON.parse(session);
      return parsed.token || null;
    }
  } catch (e) {
    console.error('Error getting auth token:', e);
  }
  return null;
};

// Helper function to get auth headers
export const getAuthHeaders = (includeContentType: boolean = true): Record<string, string> => {
  const token = getAuthToken();
  const headers: Record<string, string> = {};

  if (includeContentType) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Inject App Key for public API verification
  const appKey = import.meta.env.VITE_FRONTEND_SECRET;
  if (appKey) {
    headers['X-App-Key'] = appKey;
  }

  return headers;
};

// Helper function for API requests with proper error handling
export async function apiRequest<T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' = 'GET',
  body?: any,
  customHeaders?: Record<string, string>
): Promise<ApiResponse<T>> {
  // Determine if we should include default Content-Type
  const isFormData = body instanceof FormData;
  const isGetRequest = method === 'GET';
  const includeDefaultContentType = !isFormData && !isGetRequest;

  const headers: Record<string, string> = {
    ...getAuthHeaders(includeDefaultContentType),
    ...customHeaders,
  };

  const options: RequestInit = {
    method,
    headers,
  };

  if (body) {
    if (isFormData) {
      options.body = body;
      // Note: Browser will automatically set Content-Type with boundary
    } else {
      options.body = typeof body === 'string' ? body : JSON.stringify(body);
    }
  }


  try {
    const fullUrl = endpoint.startsWith('http') ? endpoint : `${API_CONFIG.BASE_URL}${endpoint}`;
    const response = await fetch(fullUrl, options);

    // Attempt to parse JSON, handle empty responses or non-JSON errors
    let data: any = {};
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      // Sanitization: If we get any HTML back, don't dump it into the message
      const isHtml = /<[a-z][\s\S]*>/i.test(text);
      data = { message: isHtml ? `Request failed (${response.status})` : (text || `Error ${response.status}`) };
    }

    if (!response.ok) {
      const firstValidationError = (() => {
        if (!data?.errors || typeof data.errors !== 'object') return undefined;

        const entries = Object.entries(data.errors) as Array<[string, unknown]>;
        for (const [, value] of entries) {
          if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'string') {
            return value[0] as string;
          }
          if (typeof value === 'string' && value.trim()) {
            return value;
          }
        }
        return undefined;
      })();

      return {
        success: false,
        message: data.message || firstValidationError || `Request failed with status ${response.status}`,
        errors: data.errors,
      };
    }

    // Standardize response format (Stop aggressive unwrapping)
    // If the backend already returns the standard {success, data} format, use it directly
    if (data && typeof data === 'object' && 'success' in data && 'data' in data) {
      return data as ApiResponse<T>;
    }

    return {
      success: true,
      data: data as T,
      message: data.message,
    };
  } catch (error) {
    console.error('API Request Error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Network error occurred',
    };
  } finally {
    // No-op
  }
}

// Helper function to build query string
export const buildQueryString = (params: Record<string, any>): string => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      searchParams.append(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
};

// Base service class that other services can extend
export class BaseService {
  protected baseUrl: string;

  constructor(baseUrl: string = API_CONFIG.BASE_URL) {
    this.baseUrl = baseUrl;
  }

  protected getAuthHeaders(includeContentType: boolean = true): Record<string, string> {
    return getAuthHeaders(includeContentType);
  }

  protected async request<T>(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' = 'GET',
    body?: any,
    customHeaders?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    return apiRequest<T>(endpoint, method, body, customHeaders);
  }

  protected buildUrl(endpoint: string, params?: Record<string, any>): string {
    const queryString = params ? buildQueryString(params) : '';
    return `${endpoint}${queryString}`;
  }
}
