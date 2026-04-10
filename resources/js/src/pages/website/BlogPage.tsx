import { FAQSection } from '@/components/FAQSection';
import { PublicNavbarLayout } from '@/components/layout/PublicNavbarLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { usePageMeta } from '@/hooks/usePageMeta';
import { Blog, blogService } from '@/services/blogService';
import { formatDistanceToNow } from 'date-fns';
import {
    BookOpen,
    Calendar,
    Clock,
    Eye,
    Search,
    Zap
} from 'lucide-react';
import { memo, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

interface BlogCategory {
    id: number;
    title: string;
    slug: string;
    description?: string;
    is_active: boolean;
}

const BlogCard = memo(({ blog, priority = false }: { blog: Blog; priority?: boolean }) => {
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
                            width="600"
                            height="338"
                            fetchPriority={priority ? 'high' : 'low'}
                            loading={priority ? 'eager' : 'lazy'}
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
                        <div className="flex items-center gap-3 min-w-0">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-fuchsia-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
                                {getAuthorInitial(blog.author?.name)}
                            </div>
                            <span className="text-sm text-slate-400 truncate">{blog.author?.name || 'Admin'}</span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-slate-500 shrink-0">
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

export function BlogPage({ categorySlug }: { categorySlug?: string }) {
    usePageMeta({
        slug: 'blogs',
        defaultTitle: 'Blog - EdgeLancer',
        defaultDescription: 'Read the latest articles, tutorials, and insights about workflow automation and AI.'
    });

    const [searchParams] = useSearchParams();
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [categories, setCategories] = useState<BlogCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [categoriesLoading, setCategoriesLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState<string>(categorySlug || searchParams.get('category') || 'all');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalBlogs, setTotalBlogs] = useState(0);
    const [globalTotal, setGlobalTotal] = useState(0);

    useEffect(() => {
        setActiveCategory(categorySlug || searchParams.get('category') || 'all');
    }, [searchParams, categorySlug]);

    useEffect(() => {
        const loadCategories = async () => {
            setCategoriesLoading(true);
            try {
                const result = await blogService.getCategories();
                if (result.success && result.data) setCategories(result.data);
            } catch (e) {
                console.error(e);
            } finally {
                setCategoriesLoading(false);
            }
        };
        loadCategories();
    }, []);

    useEffect(() => {
        const loadBlogs = async () => {
            setLoading(true);
            try {
                const categorySlugValue = activeCategory === 'all' ? undefined : activeCategory;
                const result = await blogService.getAll(page, 12, searchQuery, categorySlugValue);

                if (result.success && result.data) {
                    setBlogs(result.data.data || []);
                    setTotalPages(result.data.last_page || 1);
                    setTotalBlogs(result.data.total || 0);

                    if (!categorySlugValue && !searchQuery) {
                        setGlobalTotal(result.data.total || 0);
                    }
                } else {
                    setBlogs([]);
                }
            } catch (e) {
                console.error(e);
                setBlogs([]);
            } finally {
                setLoading(false);
            }
        };

        const timer = setTimeout(loadBlogs, 350);
        return () => clearTimeout(timer);
    }, [page, activeCategory, searchQuery]);

    useEffect(() => {
        setPage(1);
    }, [activeCategory, searchQuery]);

    const featuredBlogs = blogs.filter(blog => blog.is_featured);

    return (
        <PublicNavbarLayout>
            <section className="relative pt-32 pb-16 px-4 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none transform-gpu">
                    <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] will-change-transform" />
                    <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-fuchsia-500/10 rounded-full blur-[100px] will-change-transform" />
                </div>

                <div className="max-w-5xl mx-auto text-center relative">
                    <Badge className="mb-6 bg-white/5 text-cyan-400 border-cyan-500/30">
                        <BookOpen className="w-3 h-3 mr-1" />
                        Blog & Resources
                    </Badge>

                    <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white tracking-tight">
                        Insights & Updates
                    </h1>

                    <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10">
                        Tips, strategies, and news to help you grow your freelance business with AI automation.
                    </p>

                    <div className="max-w-xl mx-auto">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <Input
                                type="text"
                                aria-label="Search articles"
                                placeholder="Search articles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-12 h-14 bg-white/5 border-white/10 text-white placeholder:text-slate-400 focus:border-cyan-500/50 rounded-xl"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {(loading || featuredBlogs.length > 0) && (
                <section className="py-12 px-4 min-h-[400px]">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-2xl font-bold text-white mb-8">Featured Articles</h2>

                        {loading ? (
                            <div className="grid md:grid-cols-2 gap-8">
                                <Skeleton className="w-full aspect-[16/9] rounded-xl bg-white/5" />
                                <Skeleton className="w-full aspect-[16/9] rounded-xl bg-white/5" />
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 gap-8">
                                {featuredBlogs.slice(0, 2).map((blog, idx) => (
                                    <BlogCard key={blog.id} blog={blog} priority={idx === 0} />
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            )}

            <section className="py-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-4 gap-12">
                        <aside className="lg:col-span-1">
                            <div className="sticky top-24">
                                <h3 className="text-lg font-semibold text-white mb-4">Categories</h3>
                                <div className="space-y-2" role="group" aria-label="Blog categories">
                                    {categoriesLoading ? (
                                        Array.from({ length: 5 }).map((_, i) => (
                                            <Skeleton key={i} className="w-full h-12 bg-white/5 rounded-lg" />
                                        ))
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => { setActiveCategory('all'); setPage(1); }}
                                                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all ${activeCategory === 'all'
                                                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                                                    : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-transparent'
                                                    }`}
                                            >
                                                <span className="text-sm">All Posts</span>
                                                <span className="text-xs px-2 py-0.5 rounded-full bg-white/10">
                                                    {globalTotal > 0 ? globalTotal : totalBlogs}
                                                </span>
                                            </button>
                                            {categories.map((cat) => (
                                                <button
                                                    key={cat.id}
                                                    onClick={() => { setActiveCategory(cat.slug); setPage(1); }}
                                                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all ${activeCategory === cat.slug
                                                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                                                        : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-transparent'
                                                        }`}
                                                >
                                                    <span className="text-sm">{cat.title}</span>
                                                </button>
                                            ))}
                                        </>
                                    )}
                                </div>
                            </div>
                        </aside>

                        <div className="lg:col-span-3">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-bold text-white">All Blogs</h2>
                                <div className="flex items-center gap-2 text-sm text-slate-400">
                                    <span>Page {page} of {totalPages}</span>
                                </div>
                            </div>

                            {loading ? (
                                <div className="grid sm:grid-cols-2 gap-6">
                                    {Array.from({ length: 6 }).map((_, idx) => (
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
                                <div className="text-center text-slate-400 py-12 border border-dashed border-white/10 rounded-xl bg-[#12121a]/50">
                                    No posts found. Try another category or search term.
                                </div>
                            ) : (
                                <div className="grid sm:grid-cols-2 gap-6">
                                    {blogs.map((blog) => (
                                        <BlogCard key={blog.id} blog={blog} />
                                    ))}
                                </div>
                            )}

                            {!loading && totalPages > 1 && (
                                <div className="flex items-center justify-center gap-3 mt-12">
                                    <Button
                                        variant="outline"
                                        className="border-white/20 text-white hover:bg-white/5"
                                        disabled={page === 1}
                                        onClick={() => setPage(p => Math.max(1, p - 1))}
                                    >
                                        Previous
                                    </Button>
                                    <span className="text-sm text-slate-400">
                                        Page {page} of {totalPages}
                                    </span>
                                    <Button
                                        variant="outline"
                                        className="border-white/20 text-white hover:bg-white/5"
                                        disabled={page >= totalPages}
                                        onClick={() => setPage(p => p + 1)}
                                    >
                                        Next
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 px-4 bg-gradient-to-b from-[#0a0a0f] to-[#12121a]">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Subscribe to Newsletter</h2>
                    <p className="text-slate-400 mb-8">Get the latest articles and insights delivered to your inbox.</p>
                    <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                        <Input
                            type="email"
                            aria-label="Email address"
                            placeholder="Your email address"
                            className="h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-500 flex-1"
                        />
                        <Button className="h-12 bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white border-0 hover:opacity-90 px-8">
                            Subscribe
                        </Button>
                    </div>
                </div>
            </section>

            <FAQSection type="page" slug="blogs" />
        </PublicNavbarLayout>
    );
}

export default BlogPage;
