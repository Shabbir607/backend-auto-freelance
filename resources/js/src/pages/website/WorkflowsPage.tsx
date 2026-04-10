import { FAQSection } from '@/components/FAQSection';
import { PublicNavbarLayout } from '@/components/layout/PublicNavbarLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { usePageMeta } from '@/hooks/usePageMeta';
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
    GitBranch,
    Globe,
    Layers,
    LayoutGrid,
    Mail,
    MessageSquare,
    Search,
    Settings,
    Share2,
    Smartphone,
    Star,
    Workflow,
    Zap
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

export function WorkflowsPage() {
    usePageMeta({
        slug: 'workflows',
        defaultTitle: 'Workflow Templates - EdgeLancer',
        defaultDescription: 'Browse and download ready-to-use workflow templates for automation, AI, marketing, and more.'
    });

    const [searchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState<number | 'all'>('all');

    const [categories, setCategories] = useState<WorkflowCategory[]>([]);
    const [workflows, setWorkflows] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showAllCategories, setShowAllCategories] = useState(false);
    const [totalWorkflows, setTotalWorkflows] = useState(0);

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
        const safeId = id || Math.floor(Math.random() * 100);
        const Icon = iconPool[safeId % iconPool.length];
        const gradient = gradientPool[safeId % gradientPool.length];
        return { Icon, gradient };
    };

    useEffect(() => {
        const fetchCats = async () => {
            try {
                const res = await workflowService.getWorkflowLibraryCategories();
                if (res.success && res.data) {
                    setCategories(res.data);
                    const slug = searchParams.get('category');
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
    }, [searchParams]);

    useEffect(() => {
        const loadWorkflows = async () => {
            setLoading(true);
            try {
                const categoryId = activeCategory === 'all' ? null : activeCategory;
                const res = await workflowService.getWorkflowLibrary(page, 12, searchQuery, categoryId);

                if (res.data) {
                    setWorkflows(res.data.data || res.data || []);
                    setTotalPages(res.data.last_page || 1);
                    setTotalWorkflows(res.data.total || 0);
                } else {
                    setWorkflows([]);
                    setTotalPages(1);
                    setTotalWorkflows(0);
                }
            } catch (e) {
                console.error(e);
                setWorkflows([]);
            } finally {
                setLoading(false);
            }
        };

        const timer = setTimeout(loadWorkflows, 350);
        return () => clearTimeout(timer);
    }, [page, activeCategory, searchQuery]);

    useEffect(() => {
        setPage(1);
    }, [searchQuery, activeCategory]);

    const featuredWorkflows = workflows.slice(0, 4);
    const visibleCategories = showAllCategories ? categories : categories.slice(0, 8);

    return (
        <PublicNavbarLayout>
            <section className="relative pt-32 pb-16 px-4 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none transform-gpu">
                    <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] will-change-transform" />
                    <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-fuchsia-500/10 rounded-full blur-[100px] will-change-transform" />
                </div>

                <div className="max-w-5xl mx-auto text-center relative">
                    <Badge className="mb-6 bg-white/5 text-cyan-400 border-cyan-500/30">
                        <Layers className="w-3 h-3 mr-1" />
                        {totalWorkflows > 0 ? `${totalWorkflows}+ Templates` : 'Loading Templates...'}
                    </Badge>

                    <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white tracking-tight">
                        Ready-to-Use
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-pink-400">
                            Workflow Templates
                        </span>
                    </h1>

                    <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10">
                        Start automating in seconds with our library of proven workflow templates.
                    </p>

                    <div className="max-w-xl mx-auto">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <Input
                                type="text"
                                aria-label="Search workflows"
                                placeholder="Search workflows..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-12 h-14 bg-white/5 border-white/10 text-white placeholder:text-slate-400 focus:border-cyan-500/50 rounded-xl"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {(loading || featuredWorkflows.length > 0) && !searchQuery && activeCategory === 'all' && (
                <section className="py-12 px-4 min-h-[400px]">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-2xl font-bold text-white mb-8">Featured Workflows</h2>
                        {loading ? (
                            <div className="grid md:grid-cols-2 gap-8">
                                <Skeleton className="w-full aspect-[16/9] rounded-xl bg-white/5" />
                                <Skeleton className="w-full aspect-[16/9] rounded-xl bg-white/5" />
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 gap-8">
                                {featuredWorkflows.slice(0, 2).map((workflow, idx) => {
                                    const { Icon, gradient } = getWorkflowVisuals(workflow.id);
                                    return (
                                        <Link key={`featured-${workflow.id}`} to={`/workflow/${workflow.slug}`} aria-label={`Open workflow: ${workflow.title}`}>
                                            <Card className="bg-[#12121a] border-white/5 overflow-hidden hover:border-white/20 transition-all group h-full">
                                                <div className="relative aspect-[16/9] overflow-hidden bg-slate-900 p-6 flex items-end">
                                                    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-25`} />
                                                    <div className="relative flex items-center gap-4 z-10">
                                                        <div className={`w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center`}>
                                                            <Icon className="w-6 h-6 text-white" />
                                                        </div>
                                                        <div>
                                                            <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">{workflow.title}</h3>
                                                            <p className="text-sm text-slate-300">{workflow.category?.title || 'Workflow Template'}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="p-6">
                                                    <p className="text-slate-300 mb-4 line-clamp-2">{workflow.description}</p>
                                                    <div className="flex items-center justify-between text-xs text-slate-400">
                                                        <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {workflow.views?.toLocaleString() || workflow.user_count?.toLocaleString() || 0} uses</span>
                                                        <span className="flex items-center gap-1"><Star className="w-3 h-3 text-amber-500 fill-current" /> {workflow.rating || '5.0'}</span>
                                                    </div>
                                                </div>
                                            </Card>
                                        </Link>
                                    );
                                })}
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
                                <div className="space-y-2" role="group" aria-label="Workflow categories">
                                    <button
                                        onClick={() => setActiveCategory('all')}
                                        className={cn(
                                            'w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all',
                                            activeCategory === 'all'
                                                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                                                : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-transparent'
                                        )}
                                    >
                                        <span className="text-sm">All Templates</span>
                                        <span className="text-xs px-2 py-0.5 rounded-full bg-white/10">{totalWorkflows}</span>
                                    </button>

                                    {visibleCategories.map((cat) => (
                                        <button
                                            key={cat.id}
                                            onClick={() => setActiveCategory(cat.id)}
                                            className={cn(
                                                'w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all',
                                                activeCategory === cat.id
                                                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                                                    : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-transparent'
                                            )}
                                        >
                                            <span className="text-sm">{cat.title}</span>
                                        </button>
                                    ))}

                                    {categories.length > 8 && (
                                        <button
                                            onClick={() => setShowAllCategories(!showAllCategories)}
                                            className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all text-cyan-400 hover:text-cyan-300 bg-white/5 border border-white/5"
                                        >
                                            <span className="text-sm">{showAllCategories ? 'Show Less' : 'Show All'}</span>
                                            <span className="text-xs">{showAllCategories ? '▲' : '▼'}</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </aside>

                        <div className="lg:col-span-3">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-bold text-white">All Workflows</h2>
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
                            ) : workflows.length === 0 ? (
                                <div className="text-center text-slate-400 py-12 border border-dashed border-white/10 rounded-xl bg-[#12121a]/50">
                                    No templates found. Try another category or search term.
                                </div>
                            ) : (
                                <div className="grid sm:grid-cols-2 gap-6">
                                    {workflows.map((workflow) => {
                                        const { Icon, gradient } = getWorkflowVisuals(workflow.id);
                                        return (
                                            <Link key={workflow.id} to={`/workflow/${workflow.slug}`} aria-label={`Open workflow: ${workflow.title}`}>
                                                <Card className="bg-[#12121a] border-white/5 overflow-hidden hover:border-white/20 transition-all group h-full">
                                                    <div className="p-6 flex flex-col h-full">
                                                        <div className="flex items-start justify-between mb-4">
                                                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg shadow-black/20 shrink-0`}>
                                                                <Icon className="w-6 h-6 text-white" />
                                                            </div>

                                                            <div className="flex items-center gap-2 flex-wrap justify-end pl-2">
                                                                {Number(workflow.price) === 0 ? (
                                                                    <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-xs">Free</Badge>
                                                                ) : (
                                                                    <Badge variant="outline" className="border-white/10 text-gray-300 text-xs">${workflow.price}</Badge>
                                                                )}
                                                                {workflow.rating && (
                                                                    <Badge variant="secondary" className="bg-amber-500/10 text-amber-500 border-amber-500/20 gap-1 text-xs">
                                                                        <Star className="w-3 h-3 fill-current" />
                                                                        {workflow.rating}
                                                                    </Badge>
                                                                )}
                                                            </div>
                                                        </div>

                                                        <div className="mb-4 flex-grow">
                                                            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">{workflow.title}</h3>
                                                            <p className="text-sm text-gray-400 line-clamp-2">{workflow.description}</p>
                                                        </div>

                                                        <div className="flex flex-wrap gap-2 mb-6">
                                                            {workflow.category && (
                                                                <Badge variant="outline" className="border-white/10 text-gray-400 text-xs font-normal">{workflow.category.title}</Badge>
                                                            )}
                                                            {workflow.nodes_count > 0 && (
                                                                <Badge variant="outline" className="border-white/10 text-gray-400 text-xs font-normal gap-1">
                                                                    <LayoutGrid className="w-3 h-3" />
                                                                    {workflow.nodes_count} Nodes
                                                                </Badge>
                                                            )}
                                                            {workflow.difficulty && (
                                                                <Badge variant="outline" className="border-white/10 text-gray-400 text-xs font-normal capitalize">{workflow.difficulty}</Badge>
                                                            )}
                                                            {workflow.time_saved_value && (
                                                                <Badge variant="outline" className="border-cyan-500/20 text-cyan-400 text-xs font-normal gap-1">
                                                                    <Clock className="w-3 h-3" />
                                                                    {workflow.time_saved_value} {workflow.time_saved_unit}
                                                                </Badge>
                                                            )}
                                                        </div>

                                                        <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                                <Eye className="w-4 h-4" />
                                                                <span>{workflow.views?.toLocaleString() || workflow.user_count?.toLocaleString() || 0} views</span>
                                                            </div>
                                                            <span className="text-xs text-cyan-400 font-medium flex items-center gap-1">
                                                                Download <ArrowRight className="w-3 h-3" />
                                                            </span>
                                                        </div>
                                                    </div>
                                                </Card>
                                            </Link>
                                        );
                                    })}
                                </div>
                            )}

                            {!loading && totalPages > 1 && (
                                <div className="flex items-center justify-center gap-3 mt-12">
                                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/5" disabled={page === 1} onClick={() => setPage(p => Math.max(1, p - 1))}>
                                        Previous
                                    </Button>
                                    <span className="text-sm text-slate-400">Page {page} of {totalPages}</span>
                                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/5" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>
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
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Setup Guide</h2>
                    <p className="text-slate-400 mb-8">Open a workflow, inspect the JSON config, and follow the setup steps to import it into n8n.</p>
                    <div className="grid sm:grid-cols-3 gap-3 text-left">
                        <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                            <div className="text-xs uppercase tracking-widest text-cyan-400 mb-2">1. Download</div>
                            <div className="text-sm text-slate-300">Use the workflow page to download the JSON package.</div>
                        </div>
                        <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                            <div className="text-xs uppercase tracking-widest text-cyan-400 mb-2">2. Import</div>
                            <div className="text-sm text-slate-300">Import into n8n from file and map your credentials.</div>
                        </div>
                        <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                            <div className="text-xs uppercase tracking-widest text-cyan-400 mb-2">3. Run</div>
                            <div className="text-sm text-slate-300">Test the workflow once, then enable it for production use.</div>
                        </div>
                    </div>
                </div>
            </section>

            <FAQSection type="page" slug="workflows" />
        </PublicNavbarLayout>
    );
}

export default WorkflowsPage;
