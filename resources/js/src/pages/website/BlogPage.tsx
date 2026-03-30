import { FAQSection } from '@/components/FAQSection';
import { PublicNavbarLayout } from '@/components/layout/PublicNavbarLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Blog, blogService } from '@/services/blogService';
import { formatDistanceToNow } from 'date-fns';
import {
    BookOpen,
    Calendar,
    Clock,
    Eye,
    Loader2,
    Search,
    Star,
    Zap
} from 'lucide-react';
import { memo, useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { SEOHelmet } from '@/components/SEO/SEOHelmet';
import { useSSRContext } from '@/contexts/SSRContext';

// Optimization: Memoize Blog Card to prevent unnecessary re-renders
const BlogCard = memo(({ blog }: { blog: Blog }) => {
    const getImageUrl = (url?: string | null) => {
        if (!url) return null;
        if (url.includes('localhost')) return null;
        return url;
    };

    const getAuthorInitial = (name?: string) => (name || 'N').charAt(0).toUpperCase();

    const calculateReadTime = (content?: string) => {
        if (!content) return '5 min read';
        const words = content.split(/\s+/).length;
        return `${Math.ceil(words / 200)} min read`;
    };

    return (
        <Link to={`/blogs/${blog.slug}`} aria-label={`Read article: ${blog.title}`}>
            <Card className="bg-[#12121a] border-white/5 overflow-hidden hover:border-white/20 transition-all group h-full">
                <div className="relative aspect-[16/9] overflow-hidden bg-slate-900">
                    {getImageUrl(blog.image_url) ? (
                        <img
                            src={getImageUrl(blog.image_url)!}
                            alt={blog.title}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 will-change-transform"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
                            <Eye className="w-8 h-8 text-slate-600" />
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#12121a] via-transparent to-transparent" />
                    <Badge className="absolute top-4 left-4 bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
                        <Zap className="w-3 h-3 mr-1" />
                        {blog.category?.title || 'General'}
                    </Badge>
                </div>
                <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                        {blog.title}
                    </h3>
                    <p className="text-slate-300 mb-4 line-clamp-2">{blog.description}</p>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-fuchsia-500 flex items-center justify-center text-white text-sm font-bold">
                                {getAuthorInitial(blog.author?.name)}
                            </div>
                            <span className="text-sm text-slate-400">{blog.author?.name || 'Admin'}</span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-slate-400">
                            <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {formatDistanceToNow(new Date(blog.published_at || blog.created_at), { addSuffix: true })}
                            </span>
                            <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {calculateReadTime(blog.content)}
                            </span>
                        </div>
                    </div>
                </div>
            </Card>
        </Link>
    );
});

interface BlogCategory {
    id: number;
    title: string;
    slug: string;
    description?: string;
    is_active: boolean;
}

interface BlogPageProps {
    categorySlug?: string;
}

export default function BlogPage({ categorySlug }: BlogPageProps) {
    const { search } = useLocation();
    const searchParams = useMemo(() => new URLSearchParams(search), [search]);
    const ssrData = useSSRContext();
    const [blogs, setBlogs] = useState<Blog[]>(ssrData.blogs?.data || ssrData.blogs || []);
    const [categories, setCategories] = useState<BlogCategory[]>(ssrData.categories || []);
    const [loading, setLoading] = useState(!ssrData.blogs);
    const [categoriesLoading, setCategoriesLoading] = useState(!ssrData.categories);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState<string>(categorySlug || searchParams.get('category') || 'all');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(ssrData.blogs?.last_page || 1);
    const [totalBlogs, setTotalBlogs] = useState(ssrData.blogs?.total || 0);
    const [globalTotal, setGlobalTotal] = useState(ssrData.blogs?.total || 0);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(ssrData.blogs ? (ssrData.blogs.current_page < ssrData.blogs.last_page) : true);

    const observerTarget = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setActiveCategory(categorySlug || searchParams.get('category') || 'all');
    }, [searchParams, categorySlug]);

    useEffect(() => {
        const loadCategories = async () => {
            setCategoriesLoading(true);
            try {
                const result = await blogService.getCategories();
                if (result.success && result.data) setCategories(result.data);
            } catch (e) { console.error(e); }
            finally { setCategoriesLoading(false); }
        };
        loadCategories();
    }, []);

    const loadBlogs = useCallback(async (currentPage = 1, append = false) => {
        if (append) {
            setIsLoadingMore(true);
        } else {
            setLoading(true);
        }
        try {
            const cSlug = activeCategory === 'all' ? undefined : activeCategory;
            const result = await blogService.getAll(currentPage, 12, searchQuery, cSlug);

            if (result.success && result.data) {
                const data = result.data;
                setBlogs(prev => append ? [...prev, ...(data.data || [])] : (data.data || []));
                setTotalPages(data.last_page || 1);
                setTotalBlogs(data.total || 0);
                setHasMore((data.current_page || currentPage) < (data.last_page || 1));

                if (!cSlug && !searchQuery) {
                    setGlobalTotal(result.data.total || 0);
                }
            } else {
                if (!append) setBlogs([]);
                setHasMore(false);
            }
        } catch (e) {
            console.error(e);
            if (!append) setBlogs([]);
            setHasMore(false);
        } finally {
            setLoading(false);
            setIsLoadingMore(false);
        }
    }, [activeCategory, searchQuery]);

    useEffect(() => {
        setPage(1);
        const timer = setTimeout(() => {
            loadBlogs(1, false);
        }, 400);
        return () => clearTimeout(timer);
    }, [activeCategory, searchQuery, loadBlogs]);

    const fetchMoreBlogs = useCallback(() => {
        if (isLoadingMore || !hasMore || loading) return;
        const nextPage = page + 1;
        setPage(nextPage);
        loadBlogs(nextPage, true);
    }, [page, hasMore, isLoadingMore, loading, loadBlogs]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !loading && !isLoadingMore) {
                    fetchMoreBlogs();
                }
            },
            { threshold: 0.1, rootMargin: '400px' }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => observer.disconnect();
    }, [fetchMoreBlogs, hasMore, loading, isLoadingMore]);

    const featuredBlogs = blogs.filter(blog => blog.is_featured);

    return (
        <PublicNavbarLayout>
            <SEOHelmet
                title={ssrData.seo?.title || "Automation & AI Blog - EdgeLancer"}
                description={ssrData.seo?.description || "Latest insights on automation, n8n, and AI workflows."}
                keywords={ssrData.seo?.keywords}
                ogImage={ssrData.seo?.og_image}
                metaTags={ssrData.seo?.meta_tags}
                structuredData={ssrData.seo?.structured_data}
            />

            {/* Hero Section */}
            <section className="relative pt-32 pb-16 px-4 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none transform-gpu">
                    <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] will-change-transform" />
                    <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-fuchsia-500/10 rounded-full blur-[100px] will-change-transform" />
                </div>

                <div className="max-w-5xl mx-auto text-center relative">
                    <Badge className="mb-6 bg-white/5 text-cyan-400 border-cyan-500/30 font-medium px-4 py-1.5 rounded-full backdrop-blur-sm">
                        <BookOpen className="w-3 h-3 mr-2" />
                        Blog & Resources
                    </Badge>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white tracking-tight">
                        Insights & Updates
                    </h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10">
                        Tips, strategies, and news to help you grow your freelance business with AI automation.
                    </p>
                    <div className="max-w-xl mx-auto">
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-cyan-400 transition-colors" />
                            <Input
                                type="text"
                                aria-label="Search articles"
                                placeholder="Search articles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-12 h-14 bg-white/5 border-white/10 text-white placeholder:text-slate-400 focus:border-cyan-500/50 rounded-xl transition-all"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Posts */}
            {(loading || featuredBlogs.length > 0) && (
                <section className="py-12 px-4 min-h-[400px]">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center gap-3 mb-8">
                            <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
                            <h2 className="text-2xl font-bold text-white">Featured Articles</h2>
                        </div>
                        {loading ? (
                            <div className="grid md:grid-cols-2 gap-8">
                                <Skeleton className="w-full aspect-[16/9] rounded-xl bg-white/5" />
                                <Skeleton className="w-full aspect-[16/9] rounded-xl bg-white/5" />
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 gap-8">
                                {featuredBlogs.slice(0, 2).map((blog) => (
                                    <BlogCard key={blog.id} blog={blog} />
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* Main Content */}
            <section className="py-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-4 gap-12">
                        {/* Sidebar Categories */}
                        <aside className="lg:col-span-1">
                            <div className="sticky top-24">
                                <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                                    <Zap className="w-5 h-5 text-cyan-400" />
                                    Categories
                                </h3>
                                <div className="space-y-2" role="group" aria-label="Blog categories">
                                    {categoriesLoading ? (
                                        Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="w-full h-12 bg-white/5 rounded-lg" />)
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => { setActiveCategory('all'); setPage(1); }}
                                                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all ${activeCategory === 'all'
                                                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                                                    : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-transparent'}`}
                                            >
                                                <span className="text-sm font-medium">All Posts</span>
                                                <span className="text-xs px-2 py-0.5 rounded-full bg-white/10">{globalTotal || totalBlogs}</span>
                                            </button>
                                            {categories.map((cat) => (
                                                <button
                                                    key={cat.id}
                                                    onClick={() => { setActiveCategory(cat.slug); setPage(1); }}
                                                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all ${activeCategory === cat.slug
                                                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                                                        : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-transparent'}`}
                                                >
                                                    <span className="text-sm font-medium">{cat.title}</span>
                                                </button>
                                            ))}
                                        </>
                                    )}
                                </div>
                            </div>
                        </aside>

                        {/* Blogs Grid */}
                        <div className="lg:col-span-3">
                            <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                                <h2 className="text-2xl font-bold text-white">All Articles</h2>
                                <div className="text-sm text-slate-400 font-medium">Page {page} of {totalPages}</div>
                            </div>

                            {loading && blogs.length === 0 ? (
                                <div className="grid sm:grid-cols-2 gap-6">
                                    {Array.from({ length: 4 }).map((_, idx) => (
                                        <Card key={idx} className="bg-[#12121a] border-white/5 overflow-hidden">
                                            <Skeleton className="w-full aspect-[16/10] bg-white/5" />
                                            <div className="p-5 space-y-3">
                                                <Skeleton className="w-3/4 h-5 bg-white/5" />
                                                <Skeleton className="w-full h-4 bg-white/5" />
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            ) : blogs.length === 0 ? (
                                <div className="text-center text-slate-400 py-16 border border-dashed border-white/10 rounded-xl bg-[#12121a]/50">
                                    <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-20" />
                                    <p className="text-lg">No articles found matching your criteria.</p>
                                </div>
                            ) : (
                                <>
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        {blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)}
                                    </div>

                                    {/* Infinite Scroll Sentinel */}
                                    <div ref={observerTarget} className="py-20 flex flex-col items-center justify-center gap-6">
                                        {isLoadingMore ? (
                                            <div className="flex flex-col items-center gap-6">
                                                <div className="relative">
                                                    <div className="w-16 h-16 border-4 border-white/5 border-t-cyan-500 rounded-full animate-spin" />
                                                    <Loader2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-white animate-pulse" />
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-cyan-400 text-xs font-bold uppercase tracking-[0.3em] animate-pulse">Scanning Decades of Data</p>
                                                    <p className="text-gray-600 text-[10px] mt-2">Connecting to verified oracle nodes...</p>
                                                </div>
                                            </div>
                                        ) : !hasMore && blogs.length > 0 ? (
                                            <div className="relative p-12 rounded-[2rem] bg-white/[0.02] border border-white/5 text-center backdrop-blur-md max-w-sm w-full mx-auto overflow-hidden group">
                                                <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent rounded-[2rem] opacity-50 transition-opacity group-hover:opacity-80" />
                                                <Star className="w-10 h-10 text-amber-500 fill-amber-500 mx-auto mb-6 drop-shadow-lg animate-bounce" />
                                                <h3 className="text-xl font-bold text-white mb-2">Deep Index Reached</h3>
                                                <p className="text-gray-400 text-sm leading-relaxed">
                                                    You have retrieved all {blogs.length} articles currently available.
                                                </p>
                                            </div>
                                        ) : null}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-20 px-4 bg-gradient-to-b from-transparent to-white/[0.02] border-t border-white/5">
                <div className="max-w-4xl mx-auto text-center relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Subscribe to Newsletter</h2>
                    <p className="text-slate-400 mb-8">Get the latest articles and insights delivered to your inbox.</p>
                    <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto relative z-10">
                        <Input
                            type="email"
                            aria-label="Email address"
                            placeholder="your@email.com"
                            className="h-14 bg-white/5 border-white/10 text-white placeholder:text-slate-500 flex-1 rounded-xl focus:border-cyan-500/50 transition-all border-2"
                        />
                        <Button className="h-14 bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white border-0 hover:opacity-90 px-8 rounded-xl font-bold text-lg shadow-lg shadow-cyan-500/20 transition-all hover:scale-105 active:scale-95">
                            Subscribe
                        </Button>
                    </div>
                    <p className="mt-6 text-slate-500 text-xs font-medium">No spam, ever. Unsubscribe with one click.</p>
                </div>
            </section>

            <FAQSection type="page" slug="blogs" />
        </PublicNavbarLayout>
    );
}
