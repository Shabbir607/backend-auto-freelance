import { FAQSection } from '@/components/FAQSection';
import { PublicNavbarLayout } from '@/components/layout/PublicNavbarLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { workflowService, WorkflowCategory, WorkflowResponse } from '@/services/workflowService';
import {
    ArrowRight, Globe, Layers, Star,
    BookOpen, HelpCircle,
    Loader2, Zap, Layout
} from 'lucide-react';
import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { SEOHelmet } from '@/components/SEO/SEOHelmet';

const CORE_PAGES = [
    { title: 'Home', path: '/', icon: Globe, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
    { title: 'Contact Support', path: '/contact', icon: HelpCircle, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
];

const PRODUCT_LINKS = [
    { title: 'Workflows Library', path: '/workflows' },
    { title: 'Template Library', path: '/templates' },
    { title: 'Automation Hub', path: '/automation' }
];

const RESOURCE_LINKS = [
    { title: 'Tech Blog', path: '/blogs' },
    { title: 'Academy Index', path: '/courses' },
];

export default function SitemapPage() {
    const [categories, setCategories] = useState<WorkflowCategory[]>([]);
    const [workflows, setWorkflows] = useState<WorkflowResponse[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const observerTarget = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const [catRes, wfRes] = await Promise.all([
                    workflowService.getWorkflowLibraryCategories(),
                    workflowService.getWorkflowLibrary(1, 40)
                ]);

                if (catRes.success) setCategories(catRes.data.slice(0, 12));
                if (wfRes.data) {
                    setWorkflows(wfRes.data);
                    setHasMore(wfRes.current_page < wfRes.last_page);
                }
            } catch (error) {
                console.error('Failed to fetch initial sitemap data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchInitialData();
    }, []);

    const fetchMoreWorkflows = useCallback(async () => {
        if (isLoadingMore || !hasMore) return;

        setIsLoadingMore(true);
        try {
            const nextPage = page + 1;
            const wfRes = await workflowService.getWorkflowLibrary(nextPage, 40);

            if (wfRes.data && wfRes.data.length > 0) {
                setWorkflows(prev => [...prev, ...wfRes.data]);
                setPage(nextPage);
                setHasMore(wfRes.current_page < wfRes.last_page);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Failed to fetch more workflows:', error);
            setHasMore(false);
        } finally {
            setIsLoadingMore(false);
        }
    }, [page, hasMore, isLoadingMore]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !isLoading && !isLoadingMore) {
                    fetchMoreWorkflows();
                }
            },
            { threshold: 0.1, rootMargin: '400px' }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => observer.disconnect();
    }, [fetchMoreWorkflows, hasMore, isLoading, isLoadingMore]);

    return (
        <PublicNavbarLayout>
            <SEOHelmet title="Sitemap - EdgeLancer" description="Discover the architectural blueprint of our autonomous ecosystem." />
            <div className="relative pt-32 pb-20 px-4 bg-[#050508] overflow-hidden min-h-screen">
                <div className="absolute top-0 left-0 w-full h-full -z-0">
                    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" />
                    <div className="absolute bottom-[20%] right-[-5%] w-[40%] h-[40%] bg-purple-500/5 rounded-full blur-[100px]" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-28">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-ping" />
                            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-cyan-400">System Map</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter">
                            The <span className="bg-gradient-to-r from-cyan-400 via-white to-purple-400 bg-clip-text text-transparent italic">Edge</span>Lancer Index
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-light">
                            Discover the architectural blueprint of our autonomous ecosystem. Navigate through 2.4 million+ possibilities.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-40">
                        <div className="group relative">
                            <div className="relative p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-md h-full hover:border-cyan-500/30 transition-all duration-300">
                                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-8">
                                    <Globe className="w-6 h-6 text-cyan-400" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-6 tracking-tight">Core Engine</h2>
                                <ul className="space-y-4">
                                    {CORE_PAGES.map(page => (
                                        <li key={page.path}>
                                            <Link to={page.path} className="flex items-center justify-between text-gray-400 hover:text-white group/item transition-all text-sm">
                                                <span className="flex items-center gap-3">
                                                    <div className={`w-1 h-1 rounded-full ${page.color} group-hover/item:scale-150 transition-all`} />
                                                    {page.title}
                                                </span>
                                                <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all text-cyan-500" />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="group relative">
                            <div className="relative p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-md h-full hover:border-orange-500/30 transition-all duration-300">
                                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-8">
                                    <Zap className="w-6 h-6 text-orange-400" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-6 tracking-tight">Solutions</h2>
                                <ul className="space-y-4">
                                    {PRODUCT_LINKS.map(link => (
                                        <li key={link.path}>
                                            <Link to={link.path} className="flex items-center justify-between text-gray-400 hover:text-white group/item transition-all text-sm">
                                                <span>{link.title}</span>
                                                <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all text-orange-500" />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="group relative">
                            <div className="relative p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-md h-full hover:border-purple-500/30 transition-all duration-300">
                                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-8">
                                    <BookOpen className="w-6 h-6 text-purple-400" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-6 tracking-tight">Intelligence</h2>
                                <ul className="space-y-4">
                                    {RESOURCE_LINKS.map(link => (
                                        <li key={link.path}>
                                            <Link to={link.path} className="flex items-center justify-between text-gray-400 hover:text-white group/item transition-all text-sm">
                                                <span>{link.title}</span>
                                                <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all text-purple-500" />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="relative mb-20 overflow-hidden rounded-[2.5rem] bg-white/[0.02] border border-white/5 p-12 backdrop-blur-xl">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12">
                            <div className="max-w-2xl">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-[10px] uppercase tracking-widest font-bold border border-orange-500/20 mb-6">
                                    <Layers className="w-3 h-3" />
                                    Autonomous Repository
                                </div>
                                <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">Workflow Directory</h2>
                                <p className="text-lg text-gray-400 font-light leading-relaxed">
                                    The world's largest library of pre-architected automation logic. Every node is verified for production scale.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row items-center gap-6">
                                <div className="bg-white/5 border border-white/10 px-8 py-4 rounded-2xl text-center backdrop-blur-md min-w-[180px]">
                                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1 font-bold">Total Nodes</p>
                                    <p className="text-3xl font-black text-white tabular-nums">2.49M+</p>
                                </div>
                                <Link to="/workflows">
                                    <Button className="h-16 px-10 bg-white text-black hover:bg-white/90 rounded-2xl font-bold flex items-center gap-3 transition-transform hover:scale-105">
                                        Launch Explorer
                                        <Zap className="w-5 h-5 fill-black" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-24">
                        {isLoading ? Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="h-14 bg-white/5 rounded-2xl animate-pulse" />
                        )) : categories.map((cat) => (
                            <Link
                                key={cat.id}
                                to={`/workflows?category=${cat.slug}`}
                                className="px-6 py-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 hover:bg-white/[0.04] transition-all group flex items-center justify-center gap-3 text-center backdrop-blur-sm"
                            >
                                <span className="text-xs text-gray-400 group-hover:text-white transition-colors uppercase font-bold tracking-widest truncate">{cat.title}</span>
                            </Link>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {isLoading ? (
                            Array.from({ length: 24 }).map((_, i) => (
                                <div key={i} className="h-16 bg-white/[0.03] border border-white/5 rounded-2xl animate-pulse" />
                            ))
                        ) : (
                            workflows.map((wf) => (
                                <Link
                                    key={wf.id}
                                    to={`/workflow/${wf.slug}`}
                                    className="group relative overflow-hidden p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all duration-300 backdrop-blur-sm flex items-center gap-4"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-cyan-500/10 transition-colors">
                                        <Layout className="w-4 h-4 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors truncate">
                                            {wf.title}
                                        </p>
                                        <p className="text-[10px] text-gray-600 group-hover:text-gray-400 uppercase tracking-widest mt-0.5">
                                            Blueprint v1.2
                                        </p>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>

                    <div
                        ref={observerTarget}
                        className="py-32 flex flex-col items-center justify-center gap-6"
                    >
                        {isLoadingMore ? (
                            <div className="flex flex-col items-center gap-6">
                                <div className="relative">
                                    <div className="w-16 h-16 border-4 border-white/5 border-t-cyan-500 rounded-full animate-spin" />
                                    <Loader2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-white animate-pulse" />
                                </div>
                            </div>
                        ) : !hasMore && workflows.length > 0 ? (
                            <div className="relative p-12 rounded-[2rem] bg-white/[0.02] border border-white/5 text-center backdrop-blur-md max-w-sm w-full mx-auto">
                                <Star className="w-10 h-10 text-amber-500 fill-amber-500 mx-auto mb-6 animate-bounce" />
                                <h3 className="text-xl font-bold text-white mb-2">Deep Index Reached</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    You have retrieved all {workflows.length} production nodes.
                                </p>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
            <FAQSection type="page" slug="sitemap" />
        </PublicNavbarLayout>
    );
}
