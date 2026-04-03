"use client";

import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { workflowService } from '@/services/workflowService';

const Counter = ({ end, duration = 2000, decimals = 0 }: any) => {
    // SSR: Render the actual end value for SEO and to match initial client state
    const [count, setCount] = useState(end);

    useEffect(() => {
        // Client-side: Reset to 0 and start animation
        setCount(0);

        let startTime: number | null = null;
        let animationFrameId: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;

            const percentage = Math.min(progress / duration, 1);
            const ease = 1 - Math.pow(1 - percentage, 4);

            const currentVal = ease * end;
            setCount(currentVal);

            if (progress < duration) {
                animationFrameId = requestAnimationFrame(animate);
            }
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrameId);
    }, [end, duration]);

    return <>{Number(count).toFixed(decimals)}</>;
};

export const Hero = ({ initialStats = [] }: { initialStats?: any[] }) => {
    const [stats, setStats] = useState(initialStats.length > 0 ? initialStats : [
        { label: "Workflow Views", value: 10, suffix: "M+", decimals: 0 },
        { label: "Active Users", value: 50, suffix: "K+", decimals: 0 },
        { label: "Total Workflows", value: 500, suffix: "+", decimals: 0 },
    ]);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [searchLoading, setSearchLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const navigate = useNavigate();
    // Debounced search for workflows
    useEffect(() => {
        if (!searchQuery) {
            setSearchResults([]);
            setShowResults(false);
            return;
        }
        setSearchLoading(true);
        const handler = setTimeout(async () => {
            try {
                const res = await workflowService.getWorkflowLibrary(1, 8, searchQuery);
                if (res?.data) {
                    setSearchResults(res.data);
                    setShowResults(true);
                } else {
                    setSearchResults([]);
                    setShowResults(false);
                }
            } catch (e) {
                setSearchResults([]);
                setShowResults(false);
            } finally {
                setSearchLoading(false);
            }
        }, 400);
        return () => clearTimeout(handler);
    }, [searchQuery]);

    useEffect(() => {
        if (initialStats.length > 0) return;
        const fetchStats = async () => {
            try {
                const response = await workflowService.getWorkflowStats();
                if (response.success && response.data) {
                    const { total_workflows, total_visits, active_users_today } = response.data;
                    setStats([
                        { label: "Workflow Views", value: total_visits, suffix: "", decimals: 0 },
                        { label: "Active Users", value: active_users_today, suffix: "", decimals: 0 },
                        { label: "Total Workflows", value: total_workflows, suffix: "+", decimals: 0 },
                    ]);
                }
            } catch (error) {
                console.error("Failed to fetch stats:", error);
            }
        };
        fetchStats();
    }, [initialStats.length]);

    return (
        // UPDATED: Reduced padding-top from 'pt-24 md:pt-24' to 'pt-12 md:pt-16'
        <section className="relative w-full min-h-[90vh] md:h-screen flex flex-col justify-center pt-12 md:pt-16 bg-[#050505] overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none z-0 mix-blend-screen" />

            <div className="max-w-7xl mx-auto relative z-10 w-full px-4 md:px-6">
                <div className="text-center max-w-4xl mx-auto">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white leading-[1.1] mb-5">
                        Ready-to-Use <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400">
                            Workflow Templates
                        </span>
                    </h1>

                    <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8 px-4">
                        Start automating in seconds with our library of proven workflow templates.
                        Customize them to fit your exact needs.
                    </p>
                    <div className="max-w-xl mx-auto relative mb-8 group px-2">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative flex items-center">
                            <Search className="absolute left-4 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search workflows..."
                                className="w-full h-12 md:h-14 pl-12 pr-4 rounded-xl bg-[#0a0a0a] border border-slate-800 text-slate-200 placeholder:text-slate-400 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all shadow-2xl text-base"
                                aria-label="Search workflows"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                onFocus={() => { if (searchResults.length > 0) setShowResults(true); }}
                                onBlur={() => setTimeout(() => setShowResults(false), 200)}
                                autoComplete="off"
                            />
                            {/* Search Results Dropdown */}
                            {showResults && (
                                <div className="absolute left-0 right-0 top-14 z-20 bg-[#0a0a0a] border border-slate-800 rounded-xl shadow-2xl mt-2 max-h-80 overflow-y-auto animate-in fade-in slide-in-from-top-2">
                                    {searchLoading ? (
                                        <div className="p-4 text-slate-400 text-center text-sm">Searching...</div>
                                    ) : searchResults.length === 0 ? (
                                        <div className="p-4 text-slate-400 text-center text-sm">No workflows found</div>
                                    ) : (
                                        searchResults.map((wf: any) => (
                                            <button
                                                key={wf.id}
                                                className="w-full text-left px-4 py-3 hover:bg-purple-900/10 transition-colors flex flex-col border-b border-slate-800 last:border-b-0"
                                                title={`View details for ${wf.title}`}
                                                onClick={() => navigate(`/workflow/${wf.slug}`)}
                                            >
                                                <span className="font-semibold text-slate-200 text-base">{wf.title}</span>
                                                <span className="text-xs text-slate-400 line-clamp-1">{wf.description}</span>
                                            </button>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    <p className="text-slate-400 text-xs md:text-sm mb-10 font-medium px-4">
                        Connect your favorite apps, build powerful workflows, and let AI handle repetitive tasks.
                    </p>

                    <div className="flex flex-wrap justify-center gap-8 md:gap-20 border-t border-white/5 pt-8">
                        {stats.map((stat, i) => (
                            <div key={i} className="flex flex-col items-center p-2 min-w-[120px]">
                                <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1 tabular-nums">
                                    <Counter end={stat.value} decimals={stat.decimals} />
                                    {stat.suffix}
                                </span>
                                <span className="text-[10px] md:text-sm text-slate-400 font-medium uppercase tracking-wider text-center">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
