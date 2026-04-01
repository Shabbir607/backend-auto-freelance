export interface BlogSeo {
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
  reading_time?: string;
}

export interface Blog {
  id: number;
  title: string;
  description: string;
  content: string;
  image_url: string;
  slug: string;
  status: 'draft' | 'published';
  is_featured: boolean;
  author_id: number;
  category_id: number;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  published_at?: string;
  created_at: string;
  updated_at: string;
  author?: {
    name: string;
    avatar_url?: string;
  };
  category?: {
    title: string;
    slug: string;
  };
  faqs?: any[];
}

import axiosInstance from "../axiosConfig";

export const blogService = {
  getPosts: async (params?: any) => {
    const response = await axiosInstance.get('/public/blogs', { params });
    return response.data;
  },
  getPost: async (slug: string) => {
    const response = await axiosInstance.get(`/public/blogs/${slug}`);
    return response.data;
  },
  getFeatured: async () => {
    const response = await axiosInstance.get('/public/blogs/featured');
    return response.data;
  },
  getCategories: async () => {
    const response = await axiosInstance.get('/public/blogs/categories');
    return response.data;
  }
};
