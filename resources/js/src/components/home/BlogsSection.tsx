"use client";

import { ArrowRight, Calendar, Clock, Eye, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { SpotlightCard } from './SpotlightCard';

interface BlogItem {
    id: number;
    title: string;
    slug: string;
    description: string;
    image_url?: string | null;
    published_at?: string;
    created_at?: string;
    content?: string;
    category?: { title: string };
    author?: { name: string };
}

const getImageUrl = (url?: string | null) => {
    if (!url) return null;
    if (url.includes('localhost')) return null;
    return url;
};

const calculateReadTime = (content?: string) => {
    if (!content) return '5 min read';
    const words = content.split(/\s+/).length;
    return `${Math.ceil(words / 200)} min read`;
};

export const BlogsSection = ({ initialBlogs = [] }: { initialBlogs?: BlogItem[] }) => {
    // Pick 6 random blogs deterministically per render cycle
    const blogs = useMemo(() => {
        if (initialBlogs.length <= 6) return initialBlogs;
        const shuffled = [...initialBlogs].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, 6);
    }, [initialBlogs]);

    if (blogs.length === 0) return null;

    return (
        <section className="py-16 md:py-24 px-4 md:px-6 border-t border-white/5 bg-[#020204]">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-4">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Latest from the Blog</h2>
                        <p className="text-slate-400 text-sm md:text-base">Tips, tutorials, and insights on workflow automation.</p>
                    </div>
                    <Link
                        to="/blogs"
                        title="View all blog posts"
                        className="text-indigo-400 hover:text-indigo-300 h-auto text-sm md:text-base group flex items-center"
                    >
                        View all posts <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {blogs.map((blog) => (
                        <Link key={blog.id} to={`/blogs/${blog.slug}`} aria-label={`Read: ${blog.title}`}>
                            <SpotlightCard className="group cursor-pointer h-full flex flex-col">
                                <div className="relative aspect-[16/9] overflow-hidden rounded-t-xl bg-slate-900">
                                    {getImageUrl(blog.image_url) ? (
                                        <img
                                            src={getImageUrl(blog.image_url)!}
                                            alt={blog.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
                                            <Eye className="w-8 h-8 text-slate-600" />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e0f14] via-transparent to-transparent" />
                                    {blog.category?.title && (
                                        <span className="absolute top-3 left-3 px-2 py-1 text-xs font-medium rounded-md bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center gap-1">
                                            <Zap className="w-3 h-3" />
                                            {blog.category.title}
                                        </span>
                                    )}
                                </div>
                                <div className="p-5 flex flex-col flex-1">
                                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors line-clamp-2">
                                        {blog.title}
                                    </h3>
                                    <p className="text-sm text-slate-400 leading-relaxed line-clamp-2 mb-4">
                                        {blog.description}
                                    </p>
                                    <div className="mt-auto flex items-center gap-4 text-xs text-slate-500">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {formatDistanceToNow(new Date(blog.published_at || blog.created_at || Date.now()), { addSuffix: true })}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {calculateReadTime(blog.content)}
                                        </span>
                                    </div>
                                </div>
                            </SpotlightCard>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};
