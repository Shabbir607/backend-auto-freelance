import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogService, Blog, BlogSeo } from '../../services/blogService';
import { workflowService, WorkflowResponse } from '../../services/workflowService';
import PublicNavbar from '../../components/layout/PublicNavbar';
import PublicFooter from '../../components/layout/PublicFooter';
import SEOHelmet from '../../components/SEO/SEOHelmet';
import {
    Clock,
    Calendar,
    User,
    Tag,
    ChevronRight,
    Share2,
    ArrowLeft,
    Facebook,
    Twitter,
    Linkedin,
    ExternalLink,
    Terminal,
    Cpu,
    Zap,
    Layout
} from 'lucide-react';
import { SSRContext } from '../../contexts/SSRContext';

const BlogSlugPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const ssrData = useContext(SSRContext);

    const [blog, setBlog] = useState<Blog | null>(ssrData.blog || null);
    const [seo, setSeo] = useState<BlogSeo | undefined>(ssrData.seo);
    const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>(ssrData.relatedBlogs || []);
    const [relatedWorkflows, setRelatedWorkflows] = useState<WorkflowResponse[]>(ssrData.relatedWorkflows || []);
    const [loading, setLoading] = useState(!blog);

    useEffect(() => {
        if (!slug) return;

        const load = async () => {
            try {
                const response = await blogService.getBySlugWithSeo(slug);
                if (response.success && response.data) {
                    setBlog(response.data.blog);
                    setSeo(response.data.seo);
                    setRelatedBlogs(response.data.relatedBlogs || []);
                    setRelatedWorkflows(response.data.relatedWorkflows || []);
                }
            } catch (error) {
                console.error("Error loading blog post:", error);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [slug]);

    const siteOrigin = import.meta.env.VITE_FRONTEND_URL || (typeof window !== 'undefined' ? window.location.origin : 'https://edgelancer.com');

    const handleShare = async () => {
        if (!blog) return;

        const shareData = {
            title: blog?.title || 'EdgeLancer Blog',
            text: blog?.description || "Check out this amazing article!",
            url: window.location.href
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.error('Error sharing:', err);
            }
        } else {
            const el = document.createElement('textarea');
            el.value = window.location.href;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
            alert('Link copied to clipboard!');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#020202] text-slate-300 font-sans flex flex-col">
                <PublicNavbar />
                <div className="flex-grow flex items-center justify-center">
                    <div className="relative w-16 h-16">
                        <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-500/20 rounded-full"></div>
                        <div className="absolute top-0 left-0 w-full h-full border-4 border-t-indigo-500 rounded-full animate-spin"></div>
                    </div>
                </div>
                <PublicFooter />
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="min-h-screen bg-[#020202] text-slate-300 font-sans flex flex-col">
                <PublicNavbar />
                <div className="flex-grow flex flex-col items-center justify-center text-center px-4">
                    <div className="w-20 h-20 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-6">
                        <ArrowLeft className="w-10 h-10 text-indigo-500" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-4">Article Not Found</h1>
                    <p className="text-slate-400 mb-8 max-w-md">Sorry, we couldn't find the article you're looking for. It might have been moved or deleted.</p>
                    <Link to="/blogs" className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium transition-all">
                        <ArrowLeft className="w-5 h-5" />
                        Back to Blog
                    </Link>
                </div>
                <PublicFooter />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#020202] text-slate-300 font-sans flex flex-col transition-all duration-300">
            <SEOHelmet
                title={seo?.title}
                description={seo?.description}
                keywords={seo?.keywords}
                ogImage={seo?.og_image}
                canonical={seo?.canonical}
                ogType={seo?.og_type as any}
                structuredData={seo?.structured_data}
                metaTags={seo?.meta_tags}
                robots={seo?.robots}
            />
            <PublicNavbar />

            {/* ── Progress Bar ── */}
            <div className="fixed top-0 left-0 w-full h-1 z-[100] pointer-events-none">
                <div id="scroll-progress" className="h-full bg-indigo-600 shadow-[0_0_10px_#4f46e5] w-0 transition-all duration-150"></div>
            </div>

            {/* ── Hero Section ── */}
            <header className="relative w-full pt-32 pb-20 overflow-hidden border-b border-white/5">
                {/* Background Blobs */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px] -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] translate-y-1/2"></div>

                <div className="max-w-4xl mx-auto px-6 relative z-10">
                    <div className="flex flex-wrap items-center gap-3 mb-8">
                        {blog.category && (
                            <Link
                                to={`/blogs?category=${blog.category.slug}`}
                                className="px-4 py-1.5 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 text-sm font-semibold rounded-full border border-indigo-500/20 transition-all backdrop-blur-sm"
                            >
                                {blog.category.title}
                            </Link>
                        )}
                        <div className="flex items-center gap-2 text-slate-400 text-sm bg-white/5 px-4 py-1.5 rounded-full border border-white/5 backdrop-blur-sm">
                            <Clock className="w-4 h-4" />
                            <span>{seo?.reading_time || '5 min read'}</span>
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-[1.1] tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                        {blog.title}
                    </h1>

                    <div className="flex flex-wrap items-center justify-between gap-6 py-6 border-y border-white/5">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-indigo-500/20 p-0.5 bg-gradient-to-tr from-indigo-500/20 to-blue-500/20">
                                <img
                                    src={blog.author?.avatar_url || `https://ui-avatars.com/api/?name=${blog.author?.name || 'Author'}&background=4f46e5&color=fff`}
                                    alt={blog.author?.name || 'Author'}
                                    className="w-full h-full rounded-full object-cover"
                                />
                            </div>
                            <div>
                                <div className="text-white font-semibold">{blog.author?.name || 'EdgeLancer Team'}</div>
                                <div className="text-slate-500 text-sm flex items-center gap-2">
                                    <Calendar className="w-3.5 h-3.5" />
                                    <span>{blog.published_at ? new Date(blog.published_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : 'Recently Published'}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={handleShare}
                                className="p-3 bg-white/5 hover:bg-white/10 text-slate-300 rounded-xl border border-white/5 transition-all group"
                                title="Share article"
                            >
                                <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-20 flex flex-col lg:flex-row gap-12 relative">
                {/* ── Content Area ── */}
                <article className="max-w-4xl lg:flex-grow order-2 lg:order-1">
                    {blog.image_url && (
                        <div className="mb-12 rounded-2xl md:rounded-3xl overflow-hidden border border-white/5 shadow-2xl shadow-black/50">
                            <img src={blog.image_url} alt={blog.title} className="w-full aspect-[16/9] object-cover" />
                        </div>
                    )}

                    <div className="prose prose-invert prose-indigo max-w-none prose-lg md:prose-xl prose-headings:text-white prose-headings:font-bold prose-p:text-slate-300 prose-p:leading-relaxed prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl prose-blockquote:border-l-indigo-500 prose-blockquote:bg-white/5 prose-blockquote:rounded-r-xl prose-blockquote:py-1 prose-blockquote:px-6">
                        <style dangerouslySetInnerHTML={{
                            __html: `
                            .blog-content h2 { 
                                font-size: 2.25rem; 
                                margin-top: 3.5rem; 
                                margin-bottom: 1.5rem; 
                                background: linear-gradient(to right, #fff, #94a3b8);
                                -webkit-background-clip: text;
                                -webkit-text-fill-color: transparent;
                            }
                            .blog-content h3 { font-size: 1.75rem; margin-top: 2.5rem; color: #fff; }
                            .blog-content p { margin-bottom: 1.75rem; color: #cbd5e1; }
                            .blog-content ul, .blog-content ol { margin: 1.5rem 0; padding-left: 1.5rem; }
                            .blog-content li { margin-bottom: 0.75rem; color: #cbd5e1; }
                            
                            .blog-content .download-workflow-btn {
                                display: flex;
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
                        `}}></style>
                        <div
                            className="blog-content w-full"
                            dangerouslySetInnerHTML={{
                                __html: (blog.content || "")
                                    .replace(/http:\/\/localhost:3000\/templates\//g, `${siteOrigin}/workflow/`)
                                    .replace(/http:\/\/localhost:3000\/workflow\//g, `${siteOrigin}/workflow/`)
                                    .replace(/http:\/\/localhost:3000\//g, `${siteOrigin}/workflow/`)
                                    .replace(/http:\/\/localhost:3000/g, `${siteOrigin}/workflow`)
                                    .replace(/https?:\/\/edgelancer\.com\/blog\//g, '/blogs/')
                                    .replace(/\/blog\//g, '/blogs/')
                                    .replace(/href="blog\//g, 'href="/blogs/')
                                    .replace(
                                        /<a([^>]*?)href="([^"]*)"([^>]*?)>(.*?)<\/a>/gi,
                                        (match, p1, p2, p3, p4) => {
                                            if (p4.includes('http') || p2.includes('/webhook/')) {
                                                return match;
                                            }
                                            if (p4.toLowerCase().includes('download') || p4.toLowerCase().includes('get this') || p4.toLowerCase().includes('workflow')) {
                                                return `<a${p1}href="${p2}"${p3} class="download-workflow-btn"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>${p4}</a>`;
                                            }
                                            return match;
                                        }
                                    )
                            }}
                        />
                    </div>
                </article>

                {/* ── Sidebar ── */}
                <aside className="w-full lg:w-96 order-1 lg:order-2">
                    <div className="sticky top-32 space-y-10">
                        {/* ── Related Workflows ── */}
                        {relatedWorkflows.length > 0 && (
                            <section className="p-6 bg-white/[0.03] border border-white/5 rounded-3xl backdrop-blur-md">
                                <div className="flex items-center gap-2 mb-6">
                                    <div className="p-2 bg-indigo-500/10 rounded-lg">
                                        <Zap className="w-4 h-4 text-indigo-400" />
                                    </div>
                                    <h3 className="text-lg font-bold text-white uppercase tracking-wider">Related Tools</h3>
                                </div>
                                <div className="grid grid-cols-1 gap-3">
                                    {relatedWorkflows.map(workflow => (
                                        <Link
                                            key={workflow.id}
                                            to={`/workflow/${workflow.slug}`}
                                            className="group flex items-center gap-4 p-3 hover:bg-white/5 rounded-2xl transition-all border border-transparent hover:border-white/5"
                                        >
                                            <div className="w-14 h-14 bg-gradient-to-br from-indigo-500/20 to-blue-500/20 rounded-xl flex items-center justify-center p-2 group-hover:scale-105 transition-transform">
                                                {workflow.category?.image_url ? (
                                                    <img src={workflow.category.image_url} alt={workflow.title} className="w-full h-full object-contain" />
                                                ) : (
                                                    <Layout className="w-6 h-6 text-indigo-400" />
                                                )}
                                            </div>
                                            <div className="flex-grow min-w-0">
                                                <h4 className="text-white font-medium text-sm leading-tight truncate group-hover:text-indigo-400 transition-colors">
                                                    {workflow.title}
                                                </h4>
                                                <p className="text-slate-500 text-xs mt-1 truncate">
                                                    {workflow.category?.title}
                                                </p>
                                            </div>
                                            <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* ── Related Posts ── */}
                        {relatedBlogs.length > 0 && (
                            <section className="p-6 bg-white/[0.03] border border-white/5 rounded-3xl backdrop-blur-md">
                                <div className="flex items-center gap-2 mb-6">
                                    <div className="p-2 bg-indigo-500/10 rounded-lg">
                                        <Tag className="w-4 h-4 text-indigo-400" />
                                    </div>
                                    <h3 className="text-lg font-bold text-white uppercase tracking-wider">Read More</h3>
                                </div>
                                <div className="grid grid-cols-1 gap-6">
                                    {relatedBlogs.map(post => (
                                        <Link
                                            key={post.id}
                                            to={`/blogs/${post.slug}`}
                                            className="group block space-y-3"
                                        >
                                            {post.image_url && (
                                                <div className="aspect-[16/9] rounded-xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500 border border-white/5">
                                                    <img src={post.image_url} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                                </div>
                                            )}
                                            <div>
                                                <h4 className="text-white font-semibold group-hover:text-indigo-400 transition-colors line-clamp-2">
                                                    {post.title}
                                                </h4>
                                                <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                                                    <div className="flex items-center gap-1">
                                                        <Clock className="w-3 h-3" />
                                                        <span>5 min read</span>
                                                    </div>
                                                    <div className="w-1 h-1 bg-white/10 rounded-full"></div>
                                                    <span>{post.published_at ? new Date(post.published_at).toLocaleDateString() : 'Recent'}</span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </aside>
            </main>

            {/* ── Footer ── */}
            <PublicFooter />

            <script dangerouslySetInnerHTML={{
                __html: `
                window.onscroll = function() {
                    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
                    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                    var scrolled = (winScroll / height) * 100;
                    document.getElementById("scroll-progress").style.width = scrolled + "%";
                };
            `}} />
        </div>
    );
};

export default BlogSlugPage;
