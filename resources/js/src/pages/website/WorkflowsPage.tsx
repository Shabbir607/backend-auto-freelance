import { FAQSection } from '@/components/FAQSection';
import { PublicNavbarLayout } from '@/components/layout/PublicNavbarLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { WorkflowCategory, workflowService } from '@/services/workflowService';
import {
    ArrowRight,
    BarChart,
    Bell,
    Bot,
    Clock,
    Cloud,
    Code,
    Cpu,
    Database,
    Eye,
    FileText,
    Filter,
    GitBranch,
    Globe,
    Layers,
    LayoutGrid,
    Loader2,
    Mail,
    MessageSquare,
    Search,
    Settings,
    Share2,
    Shield,
    Smartphone,
    Star,
    Workflow,
    Zap,
    ChevronRight,
} from 'lucide-react';
import { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useMemo } from 'react';
import { SEOHelmet } from '@/components/SEO/SEOHelmet';
import { useSSRContext } from '@/contexts/SSRContext';

export default function WorkflowsPage({ categorySlug }: { categorySlug?: string }) {
    const navigate = useNavigate();
    const { search } = useLocation();
    const searchParams = useMemo(() => new URLSearchParams(search), [search]);
    const [searchQuery, setSearchQuery] = useState('');

    const ssrData = useSSRContext();
    const [categories, setCategories] = useState<WorkflowCategory[]>(ssrData.categories || []);
    const [workflows, setWorkflows] = useState<any[]>(ssrData.workflows?.data || ssrData.workflows || []);
    const [loading, setLoading] = useState(!ssrData.workflows);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(ssrData.workflows?.last_page || 1);
    const [showAllCategories, setShowAllCategories] = useState(false);
    const [activeCategory, setActiveCategory] = useState<number | 'all'>('all');

    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(ssrData.workflows ? (ssrData.workflows.current_page < ssrData.workflows.last_page) : true);
    const [totalWorkflows, setTotalWorkflows] = useState(ssrData.workflows?.total || 0);
    const observerTarget = useRef<HTMLDivElement>(null);

    const iconPool = [
        Zap, Bot, GitBranch, Layers, LayoutGrid, Workflow,
        Mail, MessageSquare, Globe, Database, FileText,
        Share2, Smartphone, Cpu, BarChart, Settings, Bell, Cloud, Code
    ];

    const gradientPool = [
        'from-purple-500 to-indigo-500',
        'from-cyan-500 to-blue-500',
        'from-fuchsia-500 to-pink-500',
        'from-emerald-500 to-teal-500',
        'from-orange-500 to-red-500',
        'from-blue-400 to-indigo-600',
    ];

    const getWorkflowVisuals = (id: number) => {
        const hash = id || 0;
        const Icon = iconPool[hash % iconPool.length];
        const gradient = gradientPool[hash % gradientPool.length];
        return { Icon, gradient };
    };

    useEffect(() => {
        const fetchCats = async () => {
            try {
                const res = await workflowService.getWorkflowLibraryCategories();
                if (res.success && res.data) {
                    setCategories(res.data);
                    const slug = categorySlug || searchParams.get('category');
                    if (slug) {
                        const found = res.data.find(c => c.slug === slug);
                        if (found) setActiveCategory(found.id);
                    }
                }
            } catch (e) {
                console.error(e);
            }
        };
        fetchCats();
    }, [searchParams, categorySlug]);

    const loadWorkflows = useCallback(async (currentPage = 1, append = false) => {
        if (append) {
            setIsLoadingMore(true);
        } else {
            setLoading(true);
        }
        try {
            const categoryId = activeCategory === 'all' ? null : activeCategory;
            const res = await workflowService.getWorkflowLibrary(currentPage, 12, searchQuery, categoryId);

            if (res.data) {
                setWorkflows(prev => append ? [...prev, ...res.data] : res.data);
                setTotalPages(res.last_page || 1);
                setTotalWorkflows(res.total || 0);
                setHasMore((res.current_page || currentPage) < (res.last_page || 1));
            } else {
                if (!append) {
                    setWorkflows([]);
                    setTotalPages(1);
                    setTotalWorkflows(0);
                }
                setHasMore(false);
            }
        } catch (e) {
            console.error(e);
            setHasMore(false);
        } finally {
            setLoading(false);
            setIsLoadingMore(false);
        }
    }, [activeCategory, searchQuery]);

    useEffect(() => {
        setPage(1);
        setHasMore(true);
        const timer = setTimeout(() => {
            loadWorkflows(1);
        }, 400);
        return () => clearTimeout(timer);
    }, [searchQuery, activeCategory, loadWorkflows]);

    const handlePageChange = useCallback(() => {
        if (isLoadingMore || !hasMore || loading) return;
        const nextPage = page + 1;
        setPage(nextPage);
        loadWorkflows(nextPage, true);
    }, [page, hasMore, isLoadingMore, loading, loadWorkflows]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !loading && !isLoadingMore) {
                    handlePageChange();
                }
            },
            { threshold: 0.1, rootMargin: '400px' }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => observer.disconnect();
    }, [handlePageChange, hasMore, loading, isLoadingMore]);

    const featuredWorkflows = workflows.slice(0, 4);

    return (
        <PublicNavbarLayout>
            <SEOHelmet
                title={ssrData.seo?.title || `${activeCategory === 'all' ? 'All n8n Workflow Templates' : categories.find(c => c.id === activeCategory)?.title + ' Templates'} - EdgeLancer`}
                description={ssrData.seo?.description || "Browse and download ready-to-use n8n workflow templates for marketing, sales, web scrapers and more."}
                keywords={ssrData.seo?.keywords}
                ogImage={ssrData.seo?.og_image}
                metaTags={ssrData.seo?.meta_tags}
                structuredData={ssrData.seo?.structured_data}
            />
            <section className="relative pt-24 md:pt-32 pb-12 md:pb-16 px-4 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 left-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-purple-500/10 rounded-full blur-[80px] md:blur-[120px]" />
                    <div className="absolute bottom-0 right-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-fuchsia-500/10 rounded-full blur-[80px] md:blur-[120px]" />
                </div>

                <div className="max-w-4xl mx-auto text-center relative">
                    <Badge className="mb-4 md:mb-6 bg-white/5 text-purple-400 border-purple-500/30 hover:bg-white/10 backdrop-blur-sm text-xs md:text-sm">
                        <Layers className="w-3 h-3 mr-1" />
                        {totalWorkflows > 0 ? `${totalWorkflows}+ Templates` : 'Loading Templates...'}
                    </Badge>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 md:mb-6 leading-tight">
                        <span className="text-white">Ready-to-Use</span>
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400">
                            Workflow Templates
                        </span>
                    </h1>

                    <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-8 md:mb-10 px-2">
                        Start automating in seconds with our library of proven workflow templates.
                    </p>

                    <div className="max-w-xl mx-auto px-2 sm:px-0">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                                type="text"
                                placeholder="Search workflows..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-12 h-12 md:h-14 bg-[#12121a] border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-purple-500/50 text-base md:text-lg rounded-xl shadow-xl"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {featuredWorkflows.length > 0 && !searchQuery && activeCategory === 'all' && (
                <section className="py-8 md:py-12 px-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center gap-2 mb-4 md:mb-6">
                            <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                            <h2 className="text-base md:text-lg font-semibold text-white">Featured Workflows</h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                            {featuredWorkflows.map((workflow) => {
                                const { Icon, gradient } = getWorkflowVisuals(workflow.id);
                                return (
                                    <Card
                                        key={`featured-${workflow.id}`}
                                        onClick={() => navigate(`/workflow/${workflow.slug}`)}
                                        className="bg-[#12121a] border-white/5 p-4 hover:border-white/20 transition-all cursor-pointer group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0`}>
                                                <Icon className="w-5 h-5 text-white" />
                                            </div>
                                            <div className="min-w-0">
                                                <h3 className="font-medium text-white truncate group-hover:text-purple-400 transition-colors text-sm md:text-base">{workflow.title}</h3>
                                                <p className="text-xs text-gray-400">{workflow.views ? workflow.views.toLocaleString() : workflow.user_count?.toLocaleString() || 0} uses</p>
                                            </div>
                                        </div>
                                    </Card>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            <section className="py-6 md:py-8 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
                        <div className="lg:w-64 flex-shrink-0">
                            <div className="static lg:sticky lg:top-24 bg-[#12121a] border border-white/5 rounded-xl p-4">
                                <h3 className="font-semibold text-white mb-3 md:mb-4 flex items-center gap-2 text-sm md:text-base">
                                    <Filter className="w-4 h-4" />
                                    Categories
                                </h3>
                                <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-hide -mx-4 px-4 lg:mx-0 lg:px-0">
                                    <button
                                        onClick={() => setActiveCategory('all')}
                                        className={cn(
                                            "whitespace-nowrap lg:w-full flex items-center justify-center lg:justify-between px-4 lg:px-3 py-2 rounded-lg text-sm transition-all shrink-0",
                                            activeCategory === 'all'
                                                ? "bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                                                : "text-gray-400 hover:text-white hover:bg-white/5 bg-white/5 lg:bg-transparent"
                                        )}
                                    >
                                        <span>All Templates</span>
                                    </button>
                                    {(showAllCategories ? categories : categories.slice(0, 8)).map((category) => (
                                        <button
                                            key={category.id}
                                            onClick={() => setActiveCategory(category.id)}
                                            className={cn(
                                                "whitespace-nowrap lg:w-full flex items-center justify-center lg:justify-between px-4 lg:px-3 py-2 rounded-lg text-sm transition-all shrink-0",
                                                activeCategory === category.id
                                                    ? "bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                                                    : "text-gray-400 hover:text-white hover:bg-white/5 bg-white/5 lg:bg-transparent"
                                            )}
                                        >
                                            <span>{category.title}</span>
                                        </button>
                                    ))}
                                    {categories.length > 8 && (
                                        <button
                                            onClick={() => setShowAllCategories(!showAllCategories)}
                                            className="whitespace-nowrap lg:w-full flex items-center justify-center px-4 lg:px-3 py-2 lg:mt-2 rounded-lg text-sm text-indigo-400 hover:text-indigo-300 hover:bg-white/5 transition-all outline-none border border-white/5 lg:bg-[#12121a] shrink-0"
                                        >
                                            {showAllCategories ? 'Show Less' : 'Show All'}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex-1" style={{ scrollMarginTop: '100px' }}>
                            <div className="flex items-center justify-between mb-4 md:mb-6">
                                <h2 className="text-lg md:text-xl font-semibold text-white">
                                    {activeCategory === 'all' ? 'All Templates' : categories.find(c => c.id === activeCategory)?.title}
                                    <span className="ml-2 text-xs md:text-sm text-gray-400">
                                        ({loading ? '...' : totalWorkflows})
                                    </span>
                                </h2>
                            </div>

                            {loading ? (
                                <div className="flex flex-col items-center justify-center py-20 min-h-[400px] md:min-h-[600px]">
                                    <div className="relative">
                                        <div className="w-16 h-16 border-4 border-white/5 border-t-cyan-500 rounded-full animate-spin" />
                                        <Loader2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-white animate-pulse" />
                                    </div>
                                    <div className="text-center mt-6">
                                        <p className="text-cyan-400 text-xs font-bold uppercase tracking-[0.3em] animate-pulse">Scanning Decades of Data</p>
                                        <p className="text-gray-600 text-[10px] mt-2">Connecting to verified oracle nodes...</p>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                                        {workflows.map((workflow) => {
                                            const { Icon, gradient } = getWorkflowVisuals(workflow.id);
                                            return (
                                                <Card
                                                    key={workflow.id}
                                                    onClick={() => navigate(`/workflow/${workflow.slug}`)}
                                                    className="bg-[#12121a] border-white/5 hover:border-white/20 transition-all duration-300 flex flex-col group h-full overflow-hidden cursor-pointer"
                                                >
                                                    <div className="p-4 md:p-6 flex flex-col h-full">
                                                        <div className="flex items-start justify-between mb-4">
                                                            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg shadow-black/20 shrink-0`}>
                                                                <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                                                            </div>

                                                            <div className="flex items-center gap-1 md:gap-2 flex-wrap justify-end pl-2">
                                                                {Number(workflow.price) === 0 ? (
                                                                    <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[10px] md:text-xs">
                                                                        Free
                                                                    </Badge>
                                                                ) : (
                                                                    <Badge variant="outline" className="border-white/10 text-gray-300 text-[10px] md:text-xs">
                                                                        ${workflow.price}
                                                                    </Badge>
                                                                )}

                                                                {workflow.rating && (
                                                                    <Badge variant="secondary" className="bg-amber-500/10 text-amber-500 border-amber-500/20 gap-1 text-[10px] md:text-xs">
                                                                        <Star className="w-2.5 h-2.5 md:w-3 md:h-3 fill-current" />
                                                                        {workflow.rating}
                                                                    </Badge>
                                                                )}
                                                            </div>
                                                        </div>

                                                        <div className="mb-4 flex-grow">
                                                            <h3 className="text-base md:text-lg font-semibold text-white mb-1.5 md:mb-2 group-hover:text-cyan-400 transition-colors">
                                                                {workflow.title}
                                                            </h3>
                                                            <p className="text-xs md:text-sm text-gray-400 line-clamp-2">
                                                                {workflow.description}
                                                            </p>
                                                        </div>

                                                        <div className="flex flex-wrap gap-1.5 md:gap-2 mb-4 md:mb-6">
                                                            {workflow.category && (
                                                                <Badge variant="outline" className="border-white/10 text-gray-400 text-[10px] md:text-xs font-normal">
                                                                    {workflow.category.title}
                                                                </Badge>
                                                            )}

                                                            {workflow.nodes_count > 0 && (
                                                                <Badge variant="outline" className="border-white/10 text-gray-400 text-[10px] md:text-xs font-normal gap-1">
                                                                    <LayoutGrid className="w-3 h-3" />
                                                                    {workflow.nodes_count} Nodes
                                                                </Badge>
                                                            )}

                                                            {workflow.difficulty && (
                                                                <Badge variant="outline" className="border-white/10 text-gray-400 text-[10px] md:text-xs font-normal capitalize">
                                                                    {workflow.difficulty}
                                                                </Badge>
                                                            )}

                                                            {workflow.time_saved_value && (
                                                                <Badge variant="outline" className="border-cyan-500/20 text-cyan-400 text-[10px] md:text-xs font-normal gap-1">
                                                                    <Clock className="w-3 h-3" />
                                                                    {workflow.time_saved_value} {workflow.time_saved_unit}
                                                                </Badge>
                                                            )}
                                                        </div>

                                                        <div className="flex items-center justify-between pt-3 md:pt-4 border-t border-white/5 mt-auto">
                                                            <div className="flex items-center gap-1.5 md:gap-2 text-[11px] md:text-xs text-gray-400">
                                                                <Eye className="w-3 h-3 md:w-4 md:h-4" />
                                                                <span>{workflow.views?.toLocaleString() || 0} views</span>
                                                            </div>
                                                            <Button
                                                                size="sm"
                                                                className="bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white border-0 text-xs md:text-sm h-8 md:h-9"
                                                            >
                                                                View
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </Card>
                                            );
                                        })}
                                    </div>

                                    {/* Sentinel & Dynamic Loader */}
                                    <div
                                        ref={observerTarget}
                                        className="py-20 flex flex-col items-center justify-center gap-6"
                                    >
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
                                        ) : !hasMore && workflows.length > 0 ? (
                                            <div className="relative p-12 rounded-[2rem] bg-white/[0.02] border border-white/5 text-center backdrop-blur-md max-w-sm w-full mx-auto">
                                                <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 to-transparent rounded-[2rem] opacity-50" />
                                                <Star className="w-10 h-10 text-amber-500 fill-amber-500 mx-auto mb-6 drop-shadow-lg animate-bounce" />
                                                <h3 className="text-xl font-bold text-white mb-2">Deep Index Reached</h3>
                                                <p className="text-gray-400 text-sm leading-relaxed">
                                                    You have retrieved all {workflows.length} workflows currently available.
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

            <FAQSection type="page" slug="workflows" />
        </PublicNavbarLayout>
    );
}
