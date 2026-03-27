const API_BASE_URL = import.meta.env.VITE_API_URL || (typeof window !== 'undefined' ? `${window.location.origin}/api` : 'https://edge.srv1381478.hstgr.cloud/api');


interface FetchOptions {
  revalidate?: number | false;
  tags?: string[];
}

// ─── Memory Cache for Build process ─────────────────────────
const memoryCache = new Map<string, any>();

async function serverFetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;

  // Return from memory cache if available (Deduplication)
  if (memoryCache.has(url)) return memoryCache.get(url);

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  try {
    const response = await fetch(url, { headers });
    if (!response.ok) {
      throw new Error(`API Status ${response.status}`);
    }
    const data = await response.json();
    memoryCache.set(url, data);
    return data as T;
  } catch (err) {
    console.error(`Fetch error for ${url}:`, err);
    throw err;
  }
}

// ─── Blog APIs ──────────────────────────────────────────

export async function fetchAllBlogSlugs(): Promise<string[]> {
  const slugs: string[] = [];
  let page = 1;
  let lastPage = 1;
  const MAX_PAGES = 500;

  do {
    try {
      const data: any = await serverFetch(`/blogs?page=${page}&per_page=100`, { revalidate: 3600 });
      const paginated = data?.data;
      if (paginated?.data && Array.isArray(paginated.data)) {
        for (const blog of paginated.data) {
          if (blog.slug) slugs.push(blog.slug);
        }
        lastPage = paginated.last_page || 1;
      } else {
        break;
      }
    } catch (err) {
      console.warn(`Warning: Failed to fetch blog slugs page ${page}, returning ${slugs.length} slugs collected so far`);
      break;
    }
    page++;
  } while (page <= lastPage && page <= MAX_PAGES);

  return slugs;
}

export async function fetchBlogBySlug(slug: string) {
  const data: any = await serverFetch(`/blogs/${slug}`, { revalidate: 3600, tags: [`blog-${slug}`] });
  return { blog: data?.data, seo: data?.seo };
}

export async function fetchRelatedBlogs(slug: string) {
  const data: any = await serverFetch(`/blogs/${slug}/related`, { revalidate: 3600 });
  return data?.data || [];
}

export async function fetchRelatedWorkflowsForBlog(slug: string) {
  const data: any = await serverFetch(`/blogs/${slug}/related-workflows`, { revalidate: 3600 });
  return data?.data || [];
}

export async function fetchBlogCategories() {
  const data: any = await serverFetch('/blogs/categories', { revalidate: 3600 });
  const result = data?.data;
  return Array.isArray(result) ? result : (result?.data || []);
}

export async function fetchBlogs(page = 1, perPage = 12, search?: string, categorySlug?: string) {
  const params = new URLSearchParams();
  params.append('page', page.toString());
  params.append('per_page', perPage.toString());
  if (search) params.append('search', search);
  if (categorySlug) params.append('category', categorySlug);
  const data: any = await serverFetch(`/blogs?${params.toString()}`, { revalidate: 300 });
  return data?.data;
}

// ─── Workflow APIs ──────────────────────────────────────

export async function fetchAllWorkflowSlugs(): Promise<string[]> {
  const slugs: string[] = [];
  let page = 1;
  let lastPage = 1;
  const MAX_PAGES = 1200; // Safety limit for 13k+ workflows at 12/page

  do {
    try {
      const data: any = await serverFetch(`/workflow-library?page=${page}&per_page=100`, { revalidate: 3600 });
      if (data?.data && Array.isArray(data.data)) {
        for (const wf of data.data) {
          if (wf.slug) slugs.push(wf.slug);
        }
        lastPage = data.last_page || 1;
      } else {
        break;
      }
    } catch (err) {
      console.warn(`Warning: Failed to fetch workflow slugs page ${page}, returning ${slugs.length} slugs collected so far`);
      break;
    }
    page++;
  } while (page <= lastPage && page <= MAX_PAGES);

  return slugs;
}

export async function fetchWorkflowBySlug(slug: string) {
  const data: any = await serverFetch(`/workflow-library/${slug}`, {
    revalidate: 3600,
    tags: [`workflow-${slug}`]
  });
  const raw = data?.data ?? data;
  const payload = raw?.data ?? raw;
  const workflow = payload?.current_workflow || payload?.workflow || payload;
  const seo = payload?.seo || data?.seo || null;
  const relatedWorkflows = payload?.related_workflows || [];

  return { workflow, seo, relatedWorkflows };
}

export async function fetchWorkflowCategories() {
  const data: any = await serverFetch('/workflow-library/categories', { revalidate: 3600 });
  const result = data?.data;
  return Array.isArray(result) ? result : (result?.data || []);
}

export async function fetchWorkflowLibrary(page = 1, perPage = 12, search?: string, categoryId?: number | null) {
  const params = new URLSearchParams();
  params.append('page', page.toString());
  params.append('per_page', perPage.toString());
  params.append('sort', 'newest');
  if (search) params.append('search', search);
  if (categoryId) params.append('category_id', categoryId.toString());
  const data: any = await serverFetch(`/workflow-library?${params.toString()}`, { revalidate: 300 });
  return data;
}

export async function fetchRelatedBlogsForWorkflow(slug: string) {
  const data: any = await serverFetch(`/workflow/${slug}/related-blogs`, { revalidate: 3600 });
  return data?.data || [];
}

// ─── Course APIs ────────────────────────────────────────

export async function fetchAllCourseSlugs(): Promise<string[]> {
  const data: any = await serverFetch('/courses?page=1&per_page=100', { revalidate: 3600 });
  const paginated = data?.data;
  const courses = paginated?.data || (Array.isArray(paginated) ? paginated : []);
  return courses.map((c: any) => c.slug).filter(Boolean);
}

export async function fetchCourseBySlug(slug: string) {
  const data: any = await serverFetch(`/courses/${slug}`, { revalidate: 3600, tags: [`course-${slug}`] });
  const course = data?.data?.data || data?.data || data;
  return course;
}

export async function fetchCourses(page = 1, perPage = 12, search?: string) {
  const params = new URLSearchParams();
  params.append('page', page.toString());
  params.append('per_page', perPage.toString());
  if (search) params.append('search', search);
  const data: any = await serverFetch(`/courses?${params.toString()}`, { revalidate: 300 });
  return data?.data;
}

export async function fetchLessonBySlug(slug: string) {
  const data: any = await serverFetch(`/lessons/${slug}`, { revalidate: 3600, tags: [`lesson-${slug}`] });
  return data?.data || data;
}

// ─── Workflow Stats ─────────────────────────────────────

export async function fetchWorkflowStats() {
  const data: any = await serverFetch('/workflows/stats', { revalidate: 600 });
  return data?.data || data;
}
