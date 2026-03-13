import { API_CONFIG } from '@/lib/apiConfig';
import { useEffect, useState } from 'react';

export interface PageSEOData {
  id: number;
  title: string;
  slug: string;
  content?: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  meta_tags?: Record<string, any>;
  og_image?: string;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
  faqs?: any[];
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

interface PageSEOResponse {
  success?: boolean;
  data?: PageSEOData;
  seo?: PageSEO;
  message?: string;
}

interface UsePageSEOConfig {
  slug?: string;
  defaultTitle?: string;
  defaultDescription?: string;
}

/**
 * Data-only hook: fetches SEO metadata from GET /page API endpoint.
 * Does NOT mutate the DOM — pass returned data to <SEOHelmet> instead.
 */
export function usePageSEO(config: UsePageSEOConfig) {
  const [seoData, setSeoData] = useState<PageSEOData | null>(null);
  const [seoExtra, setSeoExtra] = useState<PageSEO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!config.slug) {
      setLoading(false);
      return;
    }

    const fetchPageSEO = async () => {
      try {
        setLoading(true);
        setError(null);

        const url = new URL(`${API_CONFIG.BASE_URL}/page`);
        url.searchParams.append('slug', config.slug!);

        const response = await fetch(url.toString(), {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'x-app-key': import.meta.env.VITE_FRONTEND_SECRET || '',
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch page SEO: ${response.status}`);
        }

        const fullResponse: PageSEOResponse = await response.json();
        const pageData = fullResponse.data;
        const seo = fullResponse.seo;

        if (pageData && pageData.meta_title) {
          setSeoData(pageData);
          setSeoExtra(seo || null);
        } else {
          // No valid SEO data – callers will use defaults
          setSeoData(null);
          setSeoExtra(null);
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(errorMessage);
        console.error('[usePageSEO] Error fetching page SEO:', errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchPageSEO();
  }, [config.slug]);

  // ── Resolved values (API first, then defaults) ─────────────────────────────
  const resolvedTitle =
    seoExtra?.title || seoData?.meta_title || config.defaultTitle || 'EdgeLancer';
  const resolvedDescription =
    seoExtra?.description || seoData?.meta_description || config.defaultDescription || '';
  const resolvedKeywords = seoExtra?.keywords || seoData?.meta_keywords || '';
  const resolvedOgImage = seoExtra?.og_image || seoData?.og_image || '';
  const resolvedCanonical = seoExtra?.canonical || undefined;
  const resolvedMetaTags = { ...(seoData?.meta_tags || {}), ...(seoExtra?.meta_tags || {}) };
  const resolvedStructuredData = seoExtra?.structured_data || undefined;

  return {
    seoData,
    seoExtra,
    loading,
    error,
    // Convenience resolved fields ready to pass into <SEOHelmet>
    resolved: {
      title: resolvedTitle,
      description: resolvedDescription,
      keywords: resolvedKeywords,
      ogImage: resolvedOgImage,
      canonical: resolvedCanonical,
      metaTags: resolvedMetaTags,
      structuredData: resolvedStructuredData,
    },
  };
}
