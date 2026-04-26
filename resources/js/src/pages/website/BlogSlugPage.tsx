import { FAQSection } from "@/components/FAQSection";
import { cn } from "@/lib/utils";
import { PublicNavbarLayout } from "@/components/layout/PublicNavbarLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Blog, BlogSeo, blogService } from "@/services/blogService";
import { format } from "date-fns";
import {
  ArrowLeft,
  Bot,
  Calendar,
  Check,
  Clock,
  Eye,
  FileText,
  Newspaper,
  Share2,
  Sparkles,
  Star,
  Tag,
  User,
  Users,
  Wand2,
  Workflow,
  Download,
  LayoutGrid,
  Box,
  MessageSquare,
  FileJson,
  ChevronRight,
  ExternalLink
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSSRContext } from "@/contexts/SSRContext";

export function BlogSlugPage() {
  const { slug } = useParams<{ slug: string }>();

  const ssrData = useSSRContext();
  const [blog, setBlog] = useState<Blog | null>(ssrData.blog || null);
  const [seo, setSeo] = useState<BlogSeo | undefined>(ssrData.seo);
  const [loading, setLoading] = useState(!ssrData.blog);
  const [error, setError] = useState<string>("");
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>(ssrData.relatedBlogs || []);
  const [relatedWorkflows, setRelatedWorkflows] = useState<any[]>(ssrData.relatedWorkflows || []);
  const [failedRelatedBlogImages, setFailedRelatedBlogImages] = useState<Record<string, boolean>>({});

  // State for Share Feedback
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!slug) return;
      setLoading(true);
      const result = await blogService.getBySlugWithSeo(slug);
      if (result.success && result.data) {
        setBlog(result.data.blog);
        setSeo(result.data.seo);
        if (result.data.relatedBlogs) setRelatedBlogs(result.data.relatedBlogs);
        if (result.data.relatedWorkflows) setRelatedWorkflows(result.data.relatedWorkflows);
        setError("");
      } else {
        setError(result.message || "Article not found");
        setBlog(null);
      }
      setLoading(false);
    };

    const loadRelated = async () => {
      if (!slug) return;
      try {
        const result = await blogService.getRelatedBlogs(slug);
        if (result.success && result.data) {
          setRelatedBlogs(result.data);
        }
      } catch (err) {
        console.error("Error loading related blogs:", err);
      }
    };

    const loadRelatedWorkflows = async () => {
      if (!slug) return;
      try {
        const result = await blogService.getRelatedWorkflows(slug);
        if (result.success && result.data) {
          setRelatedWorkflows(result.data);
        }
      } catch (err) {
        console.error("Error loading related workflows:", err);
      }
    };

    load();
    loadRelated();
    loadRelatedWorkflows();
  }, [slug]);

  // SEO Effect: Apply blog-specific metadata to the head and inject structured data
  useEffect(() => {
    if (!blog) return;

    const metaTitle = seo?.title || blog.meta_title || blog.title || "Blog Post - EdgeLancer";
    const metaDesc = seo?.description || blog.meta_description || blog.description || "Read this article on EdgeLancer blog.";

    const generateKeywords = (t: string, d: string) => {
      const text = `${t} ${d}`.toLowerCase().replace(/[^a-z0-9 ]/g, '');
      return [...new Set(text.split(/\s+/).filter(w => w.length > 3))].slice(0, 10).join(', ');
    };

    const metaKeywords = seo?.keywords || blog.meta_keywords || generateKeywords(metaTitle, metaDesc);
    const ogImage = seo?.og_image || blog.image_url || "";

    document.title = metaTitle;

    const updateMeta = (name: string, content: string, attr: 'name' | 'property' = 'name') => {
      if (!content) return;
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    updateMeta('description', metaDesc);
    updateMeta('keywords', metaKeywords);
    updateMeta('og:title', metaTitle, 'property');
    updateMeta('og:description', metaDesc, 'property');
    updateMeta('og:image', ogImage, 'property');
    updateMeta('twitter:title', metaTitle);
    updateMeta('twitter:description', metaDesc);
    updateMeta('twitter:image', ogImage);

    const existingScript = document.getElementById('blog-json-ld');
    if (existingScript) existingScript.remove();

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'blog-json-ld';

    if (seo?.structured_data) {
      script.text = JSON.stringify(seo.structured_data);
    } else {
      const fallbackData = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": blog.title,
        "description": metaDesc,
        "image": ogImage ? [ogImage] : [],
        "datePublished": blog.published_at || blog.created_at || new Date().toISOString(),
        "dateModified": blog.updated_at || blog.published_at || blog.created_at || new Date().toISOString(),
        "author": {
          "@type": "Person",
          "name": blog.author?.name || "EdgeLancer Team"
        },
        "publisher": {
          "@type": "Organization",
          "name": "EdgeLancer",
          "logo": {
            "@type": "ImageObject",
            "url": "https://edgelancer.com/logo.png"
          }
        }
      };
      script.text = JSON.stringify(fallbackData);
    }
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById('blog-json-ld');
      if (existingScript) existingScript.remove();
    };
  }, [blog, seo]);

  const handleShare = async () => {
    if (!blog) return;

    const shareData = {
      title: blog.title,
      text: blog.description || "Check out this amazing article!",
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.debug("Share cancelled");
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareData.url);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy link", err);
      }
    }
  };

  const publishedDate = blog?.published_at || blog?.created_at;

  const getRelatedBlogKey = (rBlog: Blog) => String(rBlog?.id ?? rBlog?.slug ?? rBlog?.title ?? 'related-blog');

  const getRelatedBlogFallbackIcon = (rBlog: Blog) => {
    const fallbackIcons = [Newspaper, Sparkles, FileText, Bot, Wand2];
    const key = getRelatedBlogKey(rBlog);
    const hash = key.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return fallbackIcons[hash % fallbackIcons.length];
  };

  const readingTime = blog?.content
    ? Math.ceil(blog.content.replace(/<[^>]+>/g, '').split(' ').length / 200)
    : 1;

  return (
    <PublicNavbarLayout className="bg-[#030303] selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Premium Ambient Background Glow */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-15%] left-[-10%] w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[120px] opacity-70" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-[100px] opacity-60" />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24 animate-in fade-in duration-700">

        {/* --- Loading State --- */}
        {loading && (
          <div className="space-y-8 animate-pulse max-w-3xl mx-auto mt-10">
            <div className="space-y-4">
              <Skeleton className="h-6 w-24 bg-white/5 rounded-full" />
              <Skeleton className="h-14 w-full bg-white/5 rounded-xl" />
              <Skeleton className="h-14 w-3/4 bg-white/5 rounded-xl" />
              <Skeleton className="h-6 w-1/2 bg-white/5 rounded-lg mt-4" />
            </div>
            <Skeleton className="aspect-video w-full rounded-3xl bg-white/5" />
            <div className="space-y-4 pt-8">
              <Skeleton className="h-4 w-full bg-white/5" />
              <Skeleton className="h-4 w-full bg-white/5" />
              <Skeleton className="h-4 w-5/6 bg-white/5" />
              <Skeleton className="h-4 w-4/6 bg-white/5" />
            </div>
          </div>
        )}

        {/* --- Error State --- */}
        {!loading && error && (
          <div className="flex flex-col items-center justify-center py-32 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-2">
              <FileText className="w-8 h-8 text-red-400" />
            </div>
            <h2 className="text-3xl font-bold text-white">Article Not Found</h2>
            <p className="text-slate-400 max-w-md">{error}</p>
            <Button asChild className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-full px-8 mt-4">
              <Link to="/blogs">Explore Other Articles</Link>
            </Button>
          </div>
        )}

        {/* --- Blog Content --- */}
        {!loading && blog && (
          <article className="flex flex-col">

            <div className="max-w-3xl mx-auto w-full">
              {/* Header */}
              <header className="space-y-8 mb-12">
                <Link
                  to="/blogs"
                  className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors group mb-6"
                >
                  <div className="p-1.5 rounded-full bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors">
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                  </div>
                  Back to Articles
                </Link>

                <div className="space-y-6">
                  {blog.category && (
                    <Badge className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 py-1 uppercase tracking-widest text-[10px] font-bold rounded-full">
                      {blog.category.title}
                    </Badge>
                  )}
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
                    {blog.title}
                  </h1>
                  {blog.description && (
                    <p className="text-lg md:text-xl text-slate-400 leading-relaxed font-light">
                      {blog.description}
                    </p>
                  )}
                </div>

                {/* Meta Data Pill */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 pt-6">
                  <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-full py-1.5 pl-1.5 pr-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-inner">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium text-slate-200">{blog.author?.name || 'EdgeLancer Team'}</span>
                  </div>

                  {publishedDate && (
                    <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full py-2 px-4">
                      <Calendar className="w-4 h-4 text-slate-500" />
                      <time dateTime={publishedDate} className="font-medium">
                        {format(new Date(publishedDate), "MMM d, yyyy")}
                      </time>
                    </div>
                  )}

                  <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full py-2 px-4">
                    <Clock className="w-4 h-4 text-slate-500" />
                    <span className="font-medium">{readingTime} min read</span>
                  </div>

                  <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full py-2 px-4 ml-auto">
                    <Eye className="w-4 h-4 text-slate-500" />
                    <span className="font-medium">{blog.views?.toLocaleString() ?? 0} views</span>
                  </div>
                </div>
              </header>
            </div>

            {/* Featured Image */}
            {blog.image_url && (
              <div className="max-w-5xl mx-auto w-full mb-16">
                <div className="relative aspect-video md:aspect-[21/9] overflow-hidden rounded-3xl border border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] bg-[#0a0a0f] group">
                  <img
                    src={blog.image_url}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent opacity-80" />
                </div>
              </div>
            )}

            <div className="max-w-3xl mx-auto w-full">
              {/* CSS overrides strictly for dark mode formatting */}
              <style>{`
                .blog-content {
                  font-size: 1.125rem;
                  line-height: 1.8;
                }

                /* --- FIX FOR DULL TEXT INJECTED FROM CMS --- */
                /* Force standard text elements to be readable light grey, overriding inline styles */
                .blog-content p,
                .blog-content li,
                .blog-content div:not(.table-container) {
                  color: #cbd5e1 !important; /* slate-300 */
                }

                /* Force inline spans to inherit the corrected light grey color */
                .blog-content span:not([class]) {
                  color: inherit !important;
                }

                /* Ensure Headings are bright white */
                .blog-content h1, .blog-content h2, .blog-content h3,
                .blog-content h4, .blog-content h5, .blog-content h6 {
                  color: #ffffff !important;
                  font-weight: 700;
                  letter-spacing: -0.025em;
                }

                /* Specific Heading spacing */
                .blog-content h2 {
                  font-size: 2rem;
                  margin-top: 3.5rem;
                  margin-bottom: 1.5rem;
                  padding-bottom: 0.75rem;
                  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                }
                .blog-content h3 {
                  font-size: 1.5rem;
                  margin-top: 2.5rem;
                  margin-bottom: 1rem;
                }

                .blog-content p, .blog-content ul, .blog-content ol {
                  margin-bottom: 1.5rem;
                }

                /* Ensure Bold text pops */
                .blog-content strong,
                .blog-content b {
                  color: #ffffff !important;
                  font-weight: 600;
                }

                /* Lists */
                .blog-content ul, .blog-content ol {
                  padding-left: 1.5rem;
                }
                .blog-content li {
                  margin-bottom: 0.75rem;
                }
                .blog-content li::marker {
                  color: #6366f1;
                }

                /* Tables */
                .blog-content .table-container,
                .blog-content table {
                  width: 100%;
                  border-collapse: separate;
                  border-spacing: 0;
                  margin: 2.5rem 0;
                  border-radius: 1rem;
                  overflow: hidden;
                  border: 1px solid rgba(255, 255, 255, 0.1);
                  background: rgba(255, 255, 255, 0.02);
                }
                .blog-content th {
                  background-color: rgba(0, 0, 0, 0.4);
                  color: #e2e8f0;
                  font-weight: 600;
                  text-align: left;
                  padding: 1rem 1.25rem;
                  font-size: 0.875rem;
                  text-transform: uppercase;
                  letter-spacing: 0.05em;
                  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                }
                .blog-content td {
                  padding: 1rem 1.25rem;
                  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                  font-size: 0.95rem;
                  color: #cbd5e1; /* slate-300 */
                }
                .blog-content tr:last-child td {
                  border-bottom: none;
                }
                .blog-content tbody tr:hover td {
                  background-color: rgba(255, 255, 255, 0.03);
                }

                /* Code Blocks & Inline Code */
                .blog-content pre {
                  background: #0d1117; /* deep dark slate */
                  border: 1px solid rgba(255, 255, 255, 0.1);
                  border-radius: 0.75rem;
                  padding: 1.25rem;
                  overflow-x: auto;
                  margin: 2rem 0;
                  color: #e2e8f0;
                  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
                  font-size: 0.875rem;
                  line-height: 1.6;
                  box-shadow: inset 0 2px 4px rgba(0,0,0,0.5);
                }

                /* Protect syntax highlighting colors inside code blocks */
                .blog-content pre *, .blog-content code * {
                  color: inherit !important;
                }

                .blog-content :not(pre) > code {
                  background-color: rgba(99, 102, 241, 0.15);
                  color: #a5b4fc !important;
                  padding: 0.2rem 0.4rem;
                  border-radius: 0.375rem;
                  font-family: inherit;
                  font-size: 0.875em;
                  border: 1px solid rgba(99, 102, 241, 0.2);
                }

                /* Links */
                .blog-content a:not(.download-workflow-btn) {
                  color: #818cf8 !important; /* indigo-400 */
                  text-decoration: none;
                  border-bottom: 1px dashed rgba(129, 140, 248, 0.4);
                  transition: all 0.2s ease;
                }
                .blog-content a:not(.download-workflow-btn):hover {
                  color: #a5b4fc !important;
                  border-bottom-color: #a5b4fc;
                }

                /* Injected Download Button */
                .blog-content .download-workflow-btn {
                  display: inline-flex;
                  align-items: center;
                  gap: 0.6rem;
                  background: linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%);
                  color: #ffffff !important;
                  font-size: 0.95rem;
                  font-weight: 600;
                  padding: 0.875rem 1.5rem;
                  border-radius: 0.75rem;
                  text-decoration: none !important;
                  margin: 2rem 0;
                  box-shadow: 0 4px 20px -2px rgba(79, 70, 229, 0.4);
                  transition: transform 0.2s ease, box-shadow 0.2s ease;
                  border: 1px solid rgba(255, 255, 255, 0.1);
                }
                .blog-content .download-workflow-btn:hover {
                  transform: translateY(-2px);
                  box-shadow: 0 8px 25px -2px rgba(79, 70, 229, 0.5);
                }
                .blog-content .download-workflow-btn svg {
                  stroke: #ffffff;
                }

                /* Blockquotes */
                .blog-content blockquote {
                  border-left: 4px solid #6366f1;
                  background: linear-gradient(to right, rgba(99, 102, 241, 0.1), transparent);
                  padding: 1rem 1.5rem;
                  margin: 2rem 0;
                  border-radius: 0 0.75rem 0.75rem 0;
                  font-style: italic;
                  color: #cbd5e1;
                }

                /* Override light backgrounds */
                .blog-content [style*="background-color: white"],
                .blog-content [style*="background-color: #fff"],
                .blog-content [style*="background: white"],
                .blog-content .bg-white {
                  background-color: transparent !important;
                  background: transparent !important;
                }
              `}</style>

              <div
                className="blog-content w-full"
                dangerouslySetInnerHTML={{
                  __html: (blog.content || "")
                    .replace(/http:\/\/localhost:3000\/templates\//g, 'https://edgelancer.com/workflow/')
                    .replace(/http:\/\/localhost:3000\/workflow\//g, 'https://edgelancer.com/workflow/')
                    .replace(/http:\/\/localhost:3000\//g, 'https://edgelancer.com/workflow/')
                    .replace(/http:\/\/localhost:3000/g, 'https://edgelancer.com/workflow')
                    .replace(
                      /<a([^>]*?)href="([^"]*)"([^>]*?)>(.*?)<\/a>/gi,
                      (match, p1, p2, p3, p4) => {
                        if (p4.includes('http') || p2.includes('/webhook/')) {
                          return `<a${p1}href="${p2}"${p3} class="download-workflow-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                            <span>Download Workflow</span>
                          </a>`;
                        }
                        return match;
                      }
                    )
                }}
              />

              {/* FAQ Section */}
              {blog.faqs && blog.faqs.length > 0 && (
                <div className="mt-16 pt-16 border-t border-white/10">
                  <FAQSection data={blog.faqs} title="Frequently Asked Questions" className="py-0" />
                </div>
              )}
            </div>

            {/* --- Related Content Section (Breaks out to full width again) --- */}
            {(relatedWorkflows.length > 0 || relatedBlogs.length > 0) && (
              <div className="mt-24 pt-16 border-t border-white/5 space-y-20">

                {/* Related Workflows */}
                {relatedWorkflows.length > 0 && (
                  <section className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-12">
                      <div className="space-y-3">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                          <Workflow className="w-3.5 h-3.5 text-cyan-400" />
                          <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Automation</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                          Automate this with Workflows
                        </h2>
                        <p className="text-slate-400 text-lg font-light max-w-2xl">
                          Ready-to-use n8n templates designed to implement the strategies discussed in this article instantly.
                        </p>
                      </div>
                      <Link
                        to="/workflow-library"
                        className="group flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 px-6 py-3 rounded-2xl text-white font-semibold transition-all"
                      >
                        Explore Library
                        <ArrowLeft className="w-4 h-4 rotate-180 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {relatedWorkflows.slice(0, 4).map((workflow) => {
                        const price = parseFloat(workflow.price || "0");

                        return (
                          <div
                            key={workflow.id}
                            id={`related-workflow-card-${workflow.id}`}
                            className="group flex flex-col bg-[#0a0a0e] border border-white/5 rounded-[2rem] overflow-hidden hover:border-cyan-500/30 transition-all duration-500 shadow-2xl hover:shadow-cyan-500/10 relative"
                          >
                            {/* Card Content Top */}
                            <div className="relative overflow-hidden bg-slate-900 flex shrink-0 aspect-[16/10] w-full">
                              {workflow.og_image ? (
                                <img
                                  src={workflow.og_image}
                                  alt={workflow.title}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-950 p-12">
                                  <Workflow className="w-16 h-16 text-slate-700/50 group-hover:scale-110 group-hover:text-cyan-500/30 transition-all duration-700" />
                                </div>
                              )}

                              {/* Price/Rating Overlays */}
                              <div className="absolute top-4 left-4 flex flex-col gap-2">
                                {price === 0 ? (
                                  <Badge className="bg-emerald-500 text-white border-0 shadow-lg px-3 py-1 font-bold text-[10px] uppercase">Free</Badge>
                                ) : (
                                  <Badge className="bg-white text-black border-0 shadow-lg px-3 py-1 font-bold text-[10px]">${workflow.price}</Badge>
                                )}
                              </div>

                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>

                            {/* Card Details */}
                            <div className="p-8 flex flex-col flex-1 justify-between gap-6 relative">
                              <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-500/80">
                                    {workflow.category?.title || "Workflow Template"}
                                  </span>
                                  <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                                    <Star className="w-3 h-3 fill-current" />
                                    {workflow.rating || "5.0"}
                                  </div>
                                </div>

                                <h3 className="font-bold text-white group-hover:text-cyan-400 transition-colors leading-[1.25] text-xl md:text-2xl line-clamp-2">
                                  {workflow.title}
                                </h3>

                                <p className="text-slate-400 font-light leading-relaxed text-sm md:text-base line-clamp-2">
                                  {workflow.description}
                                </p>
                              </div>

                              <div className="space-y-6">
                                {/* Metadata Grid */}
                                <div className="grid grid-cols-2 gap-4 py-6 border-y border-white/5">
                                  <div className="space-y-1">
                                    <span className="text-[9px] uppercase tracking-widest text-slate-500 font-bold">Complexity</span>
                                    <div className="flex items-center gap-1.5 text-slate-300 font-medium text-xs capitalize">
                                      <Bot className="w-3.5 h-3.5 text-cyan-500/50" />
                                      {workflow.difficulty || "Beginner"}
                                    </div>
                                  </div>
                                  <div className="space-y-1">
                                    <span className="text-[9px] uppercase tracking-widest text-slate-500 font-bold">Automation Nodes</span>
                                    <div className="flex items-center gap-1.5 text-slate-300 font-medium text-xs">
                                      <LayoutGrid className="w-3.5 h-3.5 text-cyan-500/50" />
                                      {workflow.nodes_count || 12} Nodes
                                    </div>
                                  </div>
                                </div>

                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2 text-slate-500 text-xs">
                                    <div className="flex -space-x-2">
                                      {[1, 2, 3].map(i => (
                                        <div key={i} className="w-6 h-6 rounded-full border-2 border-[#0a0a0e] bg-slate-800" />
                                      ))}
                                    </div>
                                    <span className="ml-1">{(workflow.views || workflow.total_views || 100).toLocaleString()}+ active users</span>
                                  </div>

                                  <Link
                                    to={`/workflow/${workflow.slug}`}
                                    className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-cyan-500 group-hover:border-cyan-400 group-hover:text-black flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]"
                                  >
                                    <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                )}

                {/* Related Articles */}
                {relatedBlogs.length > 0 && (
                  <section>
                    <div className="flex flex-col md:flex-row items-baseline justify-between gap-4 mb-10">
                      <div>
                        <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                          <Newspaper className="w-8 h-8 text-indigo-400" />
                          Continue Reading
                        </h2>
                        <p className="text-slate-400">Deepen your knowledge with related articles</p>
                      </div>
                      <Link
                        to="/blogs"
                        className="group flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-sm font-semibold transition-colors"
                      >
                        All Articles <ArrowLeft className="w-4 h-4 rotate-180 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {relatedBlogs.slice(0, 4).map((rBlog) => (
                        <Link
                          key={rBlog.id}
                          to={`/blogs/${rBlog.slug}`}
                          className="group flex flex-col sm:flex-row gap-5 p-4 bg-white/[0.02] border border-white/5 rounded-3xl hover:bg-white/[0.04] hover:border-indigo-500/30 transition-all duration-300"
                        >
                          <div className="relative w-full sm:w-40 aspect-video sm:aspect-square overflow-hidden rounded-2xl shrink-0 border border-white/10 bg-[#050507]">
                            {(() => {
                              const imageSrc = rBlog.image_url || rBlog.image;
                              const imageKey = getRelatedBlogKey(rBlog);
                              const showImage = Boolean(imageSrc) && !failedRelatedBlogImages[imageKey];
                              const FallbackIcon = getRelatedBlogFallbackIcon(rBlog);

                              if (!showImage) {
                                return (
                                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
                                    <FallbackIcon className="w-8 h-8 text-indigo-500/50" />
                                  </div>
                                );
                              }

                              return (
                                <img
                                  src={imageSrc as string}
                                  alt={rBlog.title}
                                  onError={() => setFailedRelatedBlogImages((prev) => ({ ...prev, [imageKey]: true }))}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                              );
                            })()}
                          </div>

                          <div className="flex flex-col justify-center flex-1 min-w-0 py-2 pr-2">
                            <div className="text-[10px] uppercase tracking-widest text-indigo-400 font-bold mb-2">
                              {rBlog.category?.title || "Article"}
                            </div>
                            <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors leading-tight mb-2 line-clamp-2">
                              {rBlog.title}
                            </h3>
                            <p className="text-slate-400 text-sm line-clamp-2 leading-relaxed">
                              {rBlog.description}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            )}

            {/* Tag Guidelines & Share Box */}
            <div className="max-w-3xl mx-auto w-full mt-24">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 bg-white/[0.02] border border-white/5 p-8 rounded-3xl">
                <div className="space-y-4 flex-1">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Tag className="w-5 h-5 text-indigo-400" />
                    Topics & Guidelines
                  </h3>
                  {blog.meta_keywords ? (
                    <div className="flex flex-wrap gap-2">
                      {blog.meta_keywords.split(',').map((tag, idx) => (
                        <Link
                          key={idx}
                          to={`/blogs?tag=${tag.trim()}`}
                          className="text-xs font-medium px-4 py-2 rounded-full bg-[#111] text-slate-300 hover:bg-indigo-500/20 hover:text-indigo-300 transition-all border border-white/5 hover:border-indigo-500/30 shadow-sm"
                        >
                          {tag.trim()}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-slate-500">No specific tags for this article.</p>
                  )}
                </div>

                <div className="flex flex-col md:items-end gap-3 w-full md:w-auto border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-8">
                  <p className="text-sm text-slate-400 font-medium">Found this helpful?</p>
                  <Button
                    onClick={handleShare}
                    className="w-full md:w-auto bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white gap-2 h-12 px-6 rounded-xl transition-all shadow-lg"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-4 h-4 text-green-400" /> <span className="text-green-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-4 h-4 text-slate-300" /> Share Article
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Mobile Return Link */}
            <div className="md:hidden flex justify-center pt-16 pb-8">
              <Link to="/blogs" className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white">
                <ArrowLeft className="w-4 h-4" /> Back to all articles
              </Link>
            </div>
          </article>
        )}
      </main>
    </PublicNavbarLayout>
  );
}

export default BlogSlugPage;
