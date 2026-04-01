export interface WorkflowSeo {
  id: number;
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  og_image?: string;
  og_type?: string;
  twitter_card?: string;
  robots?: string;
  structured_data?: any;
  meta_tags?: any[];
}

export interface SingleWorkflowResponse {
  success: boolean;
  data: Workflow;
  seo?: WorkflowSeo;
  relatedWorkflows?: Workflow[];
  suggestedBlogs?: any[];
}

export interface Workflow {
  id: number;
  title: string;
  description: string;
  content?: string;
  slug: string;
  status: 'draft' | 'published';
  price?: number;
  discount_price?: number;
  og_image?: string;
  preview_url?: string;
  video_url?: string;
  complexity?: string;
  setup_time?: string;
  json_data?: any;
  workflow_features?: any;
  rating?: number;
  reviews_count?: number;
  user_count?: number;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  canonical_url?: string;
  category_id: number;
  created_at: string;
  updated_at: string;
  category?: {
    id: number;
    title: string;
    slug: string;
    image_url?: string;
  };
  integrations?: any[];
  faqs?: any[];
  reviews?: any[];
}

import axiosInstance from "../axiosConfig";

export const workflowService = {
  getTemplates: async (params?: any) => {
    const response = await axiosInstance.get('/public/workflows', { params });
    return response.data;
  },
  getTemplate: async (slug: string): Promise<SingleWorkflowResponse> => {
    const response = await axiosInstance.get(`/public/workflows/${slug}`);
    return response.data;
  }
};