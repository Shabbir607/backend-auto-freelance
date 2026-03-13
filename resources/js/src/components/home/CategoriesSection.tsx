"use client";

import {
    ArrowRight,
    BarChart3,
    Bot,
    FileCode,
    FileJson,
    GitBranch,
    Globe,
    Mail,
    MessageSquare,
    Share2,
    ShieldCheck,
    Terminal,
    Users,
    Workflow,
    Zap
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { workflowService } from '@/services/workflowService';

import { SpotlightCard } from './SpotlightCard';

export const CategoriesSection = ({ initialCategories = [] }: { initialCategories?: any[] }) => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState<any[]>(initialCategories);
    const [loading, setLoading] = useState(initialCategories.length === 0);

    const categoryIcons = [
        BarChart3,
        Bot,
        FileCode,
        FileJson,
        GitBranch,
        Globe,
        Mail,
        MessageSquare,
        Share2,
        ShieldCheck,
        Terminal,
        Users,
        Workflow,
        Zap,
    ];

    const getIconForCategory = (cat: any, index: number) => {
        if (!cat.title) return categoryIcons[index % categoryIcons.length];
        const hash = cat.title.split('').reduce((acc: number, ch: string) => acc + ch.charCodeAt(0), 0);
        return categoryIcons[hash % categoryIcons.length];
    };

    useEffect(() => {
        if (initialCategories.length > 0) {
            const withIcons = initialCategories.slice(0, 9).map((cat: any, index: number) => ({
                ...cat,
                icon: getIconForCategory(cat, index),
            }));
            setCategories(withIcons);
            setLoading(false);
            return;
        }
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const response = await workflowService.getWorkflowLibraryCategories();
                if (response.success && response.data) {
                    // Sort by workflows_count (descending) and take top 10
                    const sortedCategories = [...response.data].sort((a: any, b: any) => {
                        const countA = typeof a.workflows_count === 'number' ? a.workflows_count : 0;
                        const countB = typeof b.workflows_count === 'number' ? b.workflows_count : 0;
                        return countB - countA;
                    });
                    const categoriesWithIcons = sortedCategories.slice(0, 9).map((cat: any, index: number) => ({
                        ...cat,
                        icon: getIconForCategory(cat, index),
                    }));
                    setCategories(categoriesWithIcons);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, [initialCategories.length]);

    const handleCategoryClick = (slug: string) => {
        navigate(`/workflows?category=${slug}`);
    };

    if (loading) {
        return (
            <section className="py-16 md:py-24 px-4 md:px-6 border-t border-white/5 bg-[#020204]">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-4">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Browse by Category</h2>
                            <p className="text-slate-400 text-sm md:text-base">Find a starting point for your next automation.</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                            <div key={i} className="p-5 md:p-6 bg-[#0e0f14] rounded-xl border border-slate-800 animate-pulse">
                                <div className="w-10 h-10 bg-slate-800 rounded-lg mb-4" />
                                <div className="h-6 bg-slate-800 rounded mb-2 w-3/4" />
                                <div className="h-4 bg-slate-800 rounded w-full" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-16 md:py-24 px-4 md:px-6 border-t border-white/5 bg-[#020204]">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-4">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Browse by Category</h2>
                        <p className="text-slate-400 text-sm md:text-base">Find a starting point for your next automation.</p>
                    </div>
                    <Link
                        to="/workflows"
                        title="View all workflow categories and templates"
                        className="text-indigo-400 hover:text-indigo-300 p-0 hover:bg-transparent md:hover:bg-accent md:p-4 h-auto text-sm md:text-base group flex items-center"
                    >
                        View all categories <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {categories.map((cat) => {
                        const Icon = cat.icon || Workflow;
                        return (
                            <SpotlightCard
                                key={cat.id}
                                className="group p-5 md:p-6 cursor-pointer"
                                onClick={() => handleCategoryClick(cat.slug)}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:bg-indigo-500/10 group-hover:border-indigo-500/50 transition-colors">
                                        <Icon className="w-5 h-5 text-slate-400 group-hover:text-indigo-400 transition-colors" />
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-slate-600 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">{cat.title}</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    {cat.badge_text || `Discover ${cat.title.toLowerCase()} automation workflows`}
                                </p>
                            </SpotlightCard>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
