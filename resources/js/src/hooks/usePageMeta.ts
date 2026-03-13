import { PageBody, PageSEO, pageService } from '@/services/pageService';
import { useEffect, useState } from 'react';

interface PageMetaConfig {
  slug?: string;
  defaultTitle?: string;
  defaultDescription?: string;
}

interface UsePageMetaReturn {
  page: PageBody | null;
  seo: PageSEO | null;
  loading: boolean;
  error: string | null;
  /** Fetch page data again */
  updateMeta: () => void;
  /** Convenience resolved values ready to spread into <SEOHelmet> */
  resolved: {
    title: string;
    description: string;
    keywords: string;
    ogImage: string;
    canonical: string | undefined;
    metaTags: Record<string, any>;
    structuredData: Record<string, any> | undefined;
  };
}

/**
 * Data-only hook: fetches page body + SEO from /pagebody API.
 * Does NOT mutate the DOM — pass returned `resolved` data to <SEOHelmet>.
 */
export function usePageMeta(config: PageMetaConfig): UsePageMetaReturn {
  const [page, setPage] = useState<PageBody | null>(null);
  const [seo, setSeo] = useState<PageSEO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPage = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!config.slug) {
        setPage(null);
        setSeo(null);
        setLoading(false);
        return;
      }

      // Guard: only query /pagebody for known CMS pages
      const validSlugs = await pageService.getValidSlugs();
      if (validSlugs && validSlugs.length > 0 && !validSlugs.includes(config.slug)) {
        setPage(null);
        setSeo(null);
        setLoading(false);
        return;
      }

      const response = await pageService.getPageBody(config.slug);

      if (response.success && response.data && response.data.is_active) {
        setPage(response.data);
        setSeo(response.seo || null);
      } else {
        setPage(null);
        setSeo(null);
      }
    } catch (err) {
      console.error('Error fetching page metadata:', err);
      setPage(null);
      setSeo(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPage();
  }, [config.slug]);

  // ── Resolve final values: SEO fields > page fields > defaults ───────────────
  const title = seo?.title || page?.meta_title || page?.title || config.defaultTitle || 'EdgeLancer';
  const description = seo?.description || page?.meta_description || config.defaultDescription || '';
  const keywords = seo?.keywords || page?.meta_keywords || '';
  const ogImage = seo?.og_image || page?.og_image || '';
  const canonical = seo?.canonical || undefined;
  const metaTags = { ...(page?.meta_tags || {}), ...(seo?.meta_tags || {}) };
  const structuredData =
    seo?.structured_data ||
    (page?.meta_tags?.['@context'] ? page?.meta_tags : undefined);

  return {
    page,
    seo,
    loading,
    error,
    updateMeta: fetchPage,
    resolved: { title, description, keywords, ogImage, canonical, metaTags, structuredData },
  };
}

/**
 * Utility: get all CMS pages list
 */
export async function getAllPages() {
  try {
    const response = await pageService.getUserPages();
    return response.success && response.data ? response.data : [];
  } catch (error) {
    console.error('Failed to fetch pages:', error);
    return [];
  }
}
