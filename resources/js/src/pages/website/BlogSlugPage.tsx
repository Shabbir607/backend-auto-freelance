import { FAQSection } from "@/components/FAQSection";
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
    Workflow,
    LayoutGrid,
    ChevronRight,
} from "lucide-react";
import { LucideIconMap } from '@/components/workflow/N8nNode';
import { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import { SEOHelmet } from "@/components/SEO/SEOHelmet";
import { useSSRContext } from "@/contexts/SSRContext";

export default function BlogSlugPage() {
    const { slug } = useParams<{ slug: string }>();
    const ssrData = useSSRContext();

    const [blog, setBlog] = useState<Blog | null>(ssrData.blog || null);
    const [seo, setSeo] = useState<BlogSeo | undefined>(ssrData.seo);
    const [loading, setLoading] = useState(!ssrData.blog);
    const [error, setError] = useState<string>("");
    const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>(ssrData.relatedBlogs || []);
    const [relatedWorkflows, setRelatedWorkflows] = useState<any[]>(ssrData.relatedWorkflows || []);
    const [failedRelatedBlogImages, setFailedRelatedBlogImages] = useState<Record<string, boolean>>({});

    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        const load = async () => {
            if (!slug) return;
            setLoading(true);
            try {
                const result = await blogService.getBySlugWithSeo(slug);
                if (result.success && result.data) {
                    setBlog(result.data.blog);
                    setSeo(result.data.seo);
                    setError("");
                } else {
                    setError(result.message || "Article not found");
                    setBlog(null);
                }
            } catch (err) {
                setError("Failed to load article");
                console.error(err);
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

    const currentYear = new Date().getFullYear();
    const metaTitleText = seo?.title || blog?.meta_title || blog?.title || "Blog Post - EdgeLancer";
    const metaTitle = metaTitleText.toLowerCase().includes('n8n')
        ? metaTitleText
        : `${metaTitleText} - n8n Automation Guide (${currentYear})`;

    const metaDesc = seo?.description || blog?.meta_description || blog?.description || "Read this article on EdgeLancer blog.";

    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://edge.srv1381478.hstgr.cloud';

    // Generate BlogPosting Schema
    const schemaData = blog ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `${origin}/blogs/${blog.slug}`
        },
        "headline": metaTitle,
        "description": metaDesc,
        "image": seo?.og_image || blog.image_url || `${origin}/og-image.png`,
        "author": {
            "@type": "Person",
            "name": blog.author?.name || "EdgeLancer Team",
            "url": `${origin}/about` 
        },
        "publisher": {
            "@type": "Organization",
            "name": "EdgeLancer",
            "logo": {
                "@type": "ImageObject",
                "url": `${origin}/logo.png`
            }
        },
        "datePublished": blog.published_at || blog.created_at,
        "dateModified": blog.updated_at || blog.published_at || blog.created_at
    } : undefined;

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
        const fallbackIcons = [Newspaper, Sparkles, FileText, Bot, Workflow];
        const key = getRelatedBlogKey(rBlog);
        const hash = key.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return fallbackIcons[hash % fallbackIcons.length];
    };

    const readingTime = blog?.content
        ? Math.ceil(blog.content.replace(/<[^>]+>/g, '').split(' ').length / 200)
        : 1;

    return (
        <PublicNavbarLayout className="bg-[#030303] selection:bg-indigo-500/30 selection:text-indigo-200">
            <SEOHelmet
                title={metaTitle}
                description={metaDesc}
                keywords={seo?.keywords || blog?.meta_keywords}
                ogImage={seo?.og_image || blog?.image_url || undefined}
                ogType="article"
                publishedTime={blog?.published_at || blog?.created_at}
                modifiedTime={blog?.updated_at}
                structuredData={schemaData || seo?.structured_data}
            />
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
                                            <Calendar className="w-4 h-4 text-slate-400" />
                                            <time dateTime={publishedDate} className="font-medium">
                                                {publishedDate ? format(new Date(publishedDate), "MMM d, yyyy") : 'Recently'}
                                            </time>
                                        </div>
                                    )}

                                    <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full py-2 px-4">
                                        <Clock className="w-4 h-4 text-slate-400" />
                                        <span className="font-medium">{readingTime} min read</span>
                                    </div>

                                    <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full py-2 px-4 ml-auto">
                                        <Eye className="w-4 h-4 text-slate-400" />
                                        <span className="font-medium">{blog.views?.toLocaleString() ?? 0} views</span>
                                    </div>

                                    <Button variant="ghost" size="icon" onClick={handleShare} className="rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white">
                                        {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                                    </Button>
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
                                    line-height: 1.85;
                                    word-break: break-word;
                                }
                                
                                .blog-content p,
                                .blog-content li,
                                .blog-content div:not(.table-container) {
                                    color: #d1d5db !important;
                                }

                                .blog-content h1, .blog-content h2, .blog-content h3, 
                                .blog-content h4, .blog-content h5, .blog-content h6 {
                                    color: #ffffff !important;
                                    font-weight: 700;
                                    letter-spacing: -0.025em;
                                    scroll-margin-top: 5rem;
                                }

                                .blog-content h2 {
                                    font-size: 1.75rem;
                                    margin-top: 3.5rem;
                                    margin-bottom: 1.25rem;
                                    padding-bottom: 0.875rem;
                                    border-bottom: 1px solid rgba(99, 102, 241, 0.15);
                                    position: relative;
                                }
                                .blog-content h2::before {
                                    content: '';
                                    position: absolute;
                                    bottom: -1px;
                                    left: 0;
                                    width: 3rem;
                                    height: 2px;
                                    background: linear-gradient(to right, #6366f1, transparent);
                                    border-radius: 2px;
                                }
                                .blog-content h3 {
                                    font-size: 1.375rem;
                                    margin-top: 2.5rem;
                                    margin-bottom: 1rem;
                                    color: #e0e7ff !important;
                                }

                                .blog-content strong, 
                                .blog-content b {
                                    color: #ffffff !important;
                                    font-weight: 600;
                                }
                                
                                .blog-content ul {
                                    padding-left: 0;
                                    list-style: none;
                                }
                                .blog-content ul > li {
                                    position: relative;
                                    padding-left: 1.75rem;
                                    margin-bottom: 0.875rem;
                                }
                                .blog-content ul > li::before {
                                    content: '';
                                    position: absolute;
                                    left: 0;
                                    top: 0.65em;
                                    width: 6px;
                                    height: 6px;
                                    border-radius: 50%;
                                    background: #6366f1;
                                    box-shadow: 0 0 8px rgba(99, 102, 241, 0.4);
                                }

                                .blog-content ol {
                                    padding-left: 0;
                                    list-style: none;
                                    counter-reset: step-counter;
                                }
                                .blog-content ol > li {
                                    position: relative;
                                    padding-left: 3rem;
                                    margin-bottom: 1.25rem;
                                    counter-increment: step-counter;
                                }
                                .blog-content ol > li::before {
                                    content: counter(step-counter);
                                    position: absolute;
                                    left: 0;
                                    top: 0.1em;
                                    width: 2rem;
                                    height: 2rem;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    border-radius: 0.5rem;
                                    background: rgba(99, 102, 241, 0.12);
                                    border: 1px solid rgba(99, 102, 241, 0.25);
                                    color: #818cf8;
                                    font-size: 0.85rem;
                                    font-weight: 700;
                                }

                                .blog-content a:not(.download-workflow-btn) {
                                    color: #818cf8 !important;
                                    text-decoration: none;
                                    border-bottom: 1px solid rgba(129, 140, 248, 0.3);
                                    transition: all 0.2s ease;
                                }
                                .blog-content a:not(.download-workflow-btn):hover {
                                    color: #a5b4fc !important;
                                    border-bottom-color: #a5b4fc;
                                }

                                .blog-content .download-workflow-btn {
                                    display: inline-flex;
                                    align-items: center;
                                    justify-content: center;
                                    gap: 0.65rem;
                                    background: linear-gradient(135deg, #4f46e5 0%, #6366f1 50%, #3b82f6 100%);
                                    color: #ffffff !important;
                                    font-size: 1rem;
                                    font-weight: 600;
                                    padding: 1rem 2rem;
                                    border-radius: 0.875rem;
                                    text-decoration: none !important;
                                    margin: 2rem 0;
                                    box-shadow: 0 4px 24px -4px rgba(79, 70, 229, 0.45);
                                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                                }
                                .blog-content .download-workflow-btn:hover {
                                    transform: translateY(-2px);
                                    box-shadow: 0 8px 30px -4px rgba(79, 70, 229, 0.55);
                                }

                                .blog-content blockquote {
                                    border-left: 3px solid #6366f1;
                                    background: linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(99, 102, 241, 0.02));
                                    padding: 1.25rem 1.75rem;
                                    margin: 2rem 0;
                                    border-radius: 0 0.875rem 0.875rem 0;
                                    font-style: italic;
                                    color: #cbd5e1;
                                }

                                .blog-content img {
                                    border-radius: 1rem;
                                    border: 1px solid rgba(255, 255, 255, 0.06);
                                    margin: 2rem auto;
                                    display: block;
                                }
                            `}</style>
                            <div
                                className="blog-content w-full"
                                dangerouslySetInnerHTML={{
                                    __html: (blog.content || "")
                                        .replace(/http:\/\/localhost:3000\/templates\//g, `${origin}/workflow/`)
                                        .replace(/http:\/\/localhost:3000\/workflow\//g, `${origin}/workflow/`)
                                        .replace(/http:\/\/localhost:3000\//g, `${origin}/workflow/`)
                                        .replace(/http:\/\/localhost:3000/g, `${origin}/workflow`)
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

                            {/* Author Byline (E-E-A-T Signals) */}
                            {blog.author && (
                                <div className="mt-16 pt-10 border-t border-white/10 flex flex-col sm:flex-row gap-6 items-start sm:items-center bg-white/[0.02] p-8 rounded-3xl">
                                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/20">
                                        <User className="w-10 h-10 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-white mb-2">{blog.author.name}</h3>
                                        <p className="text-indigo-400 text-sm font-semibold mb-3 uppercase tracking-wider">Automation Expert & Content Creator</p>
                                        <p className="text-slate-400 leading-relaxed font-light">
                                            {blog.author.name} specializes in building complex n8n workflows and AI agents.
                                            With extensive hands-on experience in workflow automation, they write practical guides to help businesses scale operations efficiently without code.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Plain text Q&A for AI crawlers (Perplexity / GPTBot) */}
                            {blog.faqs && blog.faqs.length > 0 && (
                                <div className="mt-16 pt-12 border-t border-white/10">
                                    <div className="prose prose-invert max-w-none">
                                        <h2 className="text-2xl font-bold text-white mb-8 border-b border-indigo-500/15 pb-4 inline-block">Key Questions Answered</h2>
                                        <div className="space-y-8 pl-4 border-l-[3px] border-indigo-500/30">
                                            {blog.faqs.map((faq: any, idx: number) => (
                                                <div key={`faq-prose-${idx}`} className="space-y-2">
                                                    <h3 className="text-lg font-semibold text-indigo-300 m-0 p-0">Q: {faq.question}</h3>
                                                    <p className="text-slate-300 leading-relaxed m-0 p-0">A: {faq.answer}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mt-12">
                                        <FAQSection data={blog.faqs} title="Frequently Asked Questions (Accordion)" className="py-0" />
                                    </div>
                                </div>
                            )}

                            {!blog.faqs?.length && (
                                <div className="mt-16 pt-12 border-t border-white/10 prose prose-invert max-w-none">
                                    <h2 className="text-2xl font-bold text-white mb-6 border-b border-indigo-500/15 pb-4 inline-block">Quick AI Summary Overview</h2>
                                    <p className="text-slate-300 leading-relaxed pl-4 border-l-[3px] border-indigo-500/30">
                                        <strong>Q: How does this workflow automation help?</strong><br />
                                        A: This `{blog.title}` guide provides step-by-step instructions for automating tasks via n8n. It reduces manual data entry and improves operational efficiency.<br /><br />
                                        <strong>Q: Which tools are integrated?</strong><br />
                                        A: By leveraging n8n, this strategy connects multiple external apps through standardized API nodes, making it a robust alternative to Zapier or Make.<br /><br />
                                        <strong>Q: Do I need coding experience?</strong><br />
                                        A: While n8n supports custom JavaScript nodes, the core concepts detailed here rely on visual workflow mapping suitable for non-developers and automation experts alike.
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* --- Related Content Section --- */}
                        {(relatedWorkflows.length > 0 || relatedBlogs.length > 0) && (
                            <div className="mt-24 pt-16 border-t border-white/5 space-y-20">

                                {/* Related Workflows */}
                                {relatedWorkflows.length > 0 && (
                                    <section>
                                        <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-12">
                                            <div className="space-y-3">
                                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                                                    <Workflow className="w-3.5 h-3.5 text-cyan-400" />
                                                    <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Automation</span>
                                                </div>
                                                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Automate this with n8n Workflows</h2>
                                                <p className="text-slate-400 text-lg font-light max-w-2xl">Ready-to-use templates designed to implement these strategies instantly. Connect apps like Typeform, Google Sheets, and Slack without code.</p>
                                            </div>
                                            <div className="flex flex-col gap-3 sm:flex-row items-center">
                                                <Button asChild className="bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-400 hover:to-cyan-400 border-0 rounded-2xl px-6 py-6 h-auto font-bold text-white shadow-lg shadow-indigo-500/20">
                                                    <Link to="/workflows">Browse Core Templates</Link>
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {relatedWorkflows.slice(0, 6).map((workflow) => {
                                                const price = parseFloat(workflow.price || "0");
                                                const CardCategoryIcon = LucideIconMap[workflow.category?.icon as any] || Users;
                                                return (
                                                    <div
                                                        key={workflow.id}
                                                        className="group flex flex-col bg-[#0a0a0f] border border-white/5 rounded-[1.5rem] p-6 hover:border-cyan-500/30 transition-all duration-500 shadow-2xl hover:shadow-cyan-500/10 relative"
                                                    >
                                                        <div className="flex items-start justify-between mb-5">
                                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/5 flex items-center justify-center text-indigo-400 shadow-inner">
                                                                <CardCategoryIcon className="w-6 h-6" />
                                                            </div>
                                                            {price === 0 ? (
                                                                <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] uppercase font-bold px-2.5 py-1">Free</Badge>
                                                            ) : (
                                                                <Badge className="bg-white/10 text-white border border-white/20 text-[10px] font-bold px-2.5 py-1">${workflow.price}</Badge>
                                                            )}
                                                        </div>

                                                        <div className="space-y-2 mb-6">
                                                            <h3 className="font-bold text-white group-hover:text-cyan-400 transition-colors leading-tight text-lg line-clamp-2">
                                                                {workflow.title}
                                                            </h3>
                                                            <p className="text-slate-400 font-light leading-relaxed text-sm line-clamp-2">
                                                                {workflow.description}
                                                            </p>
                                                        </div>

                                                        <div className="flex flex-wrap items-center gap-2 mb-8">
                                                            <Badge variant="secondary" className="bg-white/5 text-slate-400 border-0 text-[10px] py-1 px-3 rounded-lg capitalize">
                                                                {workflow.category?.title || "Workflow"}
                                                            </Badge>
                                                            <Badge variant="secondary" className="bg-white/5 text-slate-400 border-0 text-[10px] py-1 px-3 rounded-lg">
                                                                {workflow.nodes_count || 12} Nodes
                                                            </Badge>
                                                            <Badge variant="secondary" className="bg-white/5 text-slate-400 border-0 text-[10px] py-1 px-3 rounded-lg capitalize">
                                                                {workflow.difficulty || "Beginner"}
                                                            </Badge>
                                                        </div>

                                                        <div className="flex items-center justify-between mt-auto pt-5 border-t border-white/5">
                                                            <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium">
                                                                <Eye className="w-4 h-4 text-slate-600" />
                                                                <span>{(workflow.views || workflow.total_views || 100).toLocaleString()} views</span>
                                                            </div>

                                                            <Link to={`/workflow/${workflow.slug}`}>
                                                                <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-90 text-white border-0 rounded-xl px-6 h-10 font-bold text-xs shadow-lg shadow-cyan-500/10">
                                                                    Download
                                                                </Button>
                                                            </Link>
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
                                                    Build Your Automation Stack
                                                </h2>
                                                <p className="text-slate-400">Deepen your knowledge with related guides and tutorials in this cluster.</p>
                                            </div>
                                            <Link to="/blogs" className="text-indigo-400 hover:text-indigo-300 text-sm font-semibold transition-colors flex items-center gap-1 group">
                                                View Complete Knowledge Base
                                                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
                                                        {rBlog.image_url ? (
                                                            <img src={rBlog.image_url} alt={rBlog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
                                                                <Newspaper className="w-8 h-8 text-indigo-500/50" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex flex-col justify-center flex-1 min-w-0">
                                                        <div className="text-[10px] uppercase tracking-widest text-indigo-400 font-bold mb-2">{rBlog.category?.title || "Article"}</div>
                                                        <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-2 leading-tight">{rBlog.title}</h3>
                                                        <p className="text-slate-400 text-sm line-clamp-2 mt-2">{rBlog.description}</p>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </section>
                                )}
                            </div>
                        )}
                    </article>
                )}
            </main>
            <FAQSection type="page" slug="blogs" />
        </PublicNavbarLayout>
    );
}
