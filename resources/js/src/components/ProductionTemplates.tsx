"use client";

import { workflowService } from '@/services/workflowService';
import {
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
  Loader,
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
import { useNavigate } from 'react-router-dom';

const SpotlightCard = ({ children, className = "", onClick }: { children: React.ReactNode, className?: string, onClick: () => void }) => (
  <div
    onClick={onClick}
    className={`relative rounded-2xl border border-white/10 bg-[#12121a] backdrop-blur-xl hover:border-white/20 transition-all duration-300 cursor-pointer flex flex-col group overflow-hidden ${className}`}
  >
    {children}
  </div>
);

// Icon Library for variety
const iconPool = [
  Zap, Bot, GitBranch, Layers, LayoutGrid, Workflow,
  Mail, MessageSquare, Globe, Database, FileText,
  Share2, Smartphone, Cpu, BarChart, Settings, Bell, Cloud, Code
];

// Gradient Pool for visual variety
const gradientPool = [
  'from-purple-500 to-indigo-500',
  'from-cyan-500 to-blue-500',
  'from-fuchsia-500 to-pink-500',
  'from-emerald-500 to-teal-500',
  'from-orange-500 to-red-500',
  'from-blue-400 to-indigo-600',
];

const getWorkflowVisuals = (id: string | number, index: number = 0) => {
  const safeId = id || index;
  const Icon = iconPool[safeId % iconPool.length];
  const gradient = gradientPool[safeId % gradientPool.length];
  return { Icon, gradient };
};

export const ProductionTemplates = ({
  initialWorkflows = [],
  initialCategories = []
}: {
  initialWorkflows?: any[],
  initialCategories?: any[]
}) => {
  const navigate = useNavigate();
  const [workflows, setWorkflows] = useState(initialWorkflows);
  const [categories, setCategories] = useState(initialCategories);
  const [activeCategory, setActiveCategory] = useState<string | number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(initialWorkflows.length === 0);
  const [hasLoadedInitial, setHasLoadedInitial] = useState(initialWorkflows.length > 0);
  const [showAllCategories, setShowAllCategories] = useState(false);

  useEffect(() => {
    if (initialCategories.length > 0) return;
    // Initial fetch for categories
    workflowService.getWorkflowLibraryCategories()
      .then(res => {
        if (res?.data) {
          setCategories(res.data);
        }
      })
      .catch(error => console.error('Error loading workflow categories:', error));
  }, [initialCategories.length]);

  // Fetch workflows whenever search or category changes, with debounce
  useEffect(() => {
    if (hasLoadedInitial) {
      setHasLoadedInitial(false);
      return;
    }
    const fetchWorkflows = async () => {
      try {
        setLoading(true);
        // Pass the page, perPage, searchQuery, and activeCategory to the API
        const templatesRes = await workflowService.getWorkflowLibrary(1, 12, searchQuery, activeCategory);

        if (templatesRes?.data) {
          setWorkflows(templatesRes.data);
        } else {
          setWorkflows([]);
        }
      } catch (error) {
        console.error('Error loading workflow templates:', error);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchWorkflows();
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, activeCategory]);

  const handleViewDetails = (slug: string) => {
    navigate(`/workflow/${slug}`);
  };

  const filteredWorkflows = workflows.filter(wf => {
    const matchesCategory = activeCategory === null || Number(wf.category_id) === Number(activeCategory);
    const query = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery ||
      (wf.title && wf.title.toLowerCase().includes(query)) ||
      (wf.description && wf.description.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  const collapsedCategoryCount = 5;
  const visibleCategories = showAllCategories ? categories : categories.slice(0, collapsedCategoryCount);
  const hasMoreCategories = categories.length > collapsedCategoryCount;

  if (loading) {
    return (
      <section className="relative py-24 px-6 bg-[#050505] min-h-screen font-sans text-slate-300 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none z-0 mix-blend-screen" />
        <div className="max-w-7xl mx-auto flex items-center justify-center h-screen relative z-10">
          <div className="flex flex-col items-center gap-4">
            <Loader className="w-8 h-8 animate-spin text-purple-500" />
            <p className="text-slate-400">Loading templates...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-24 px-6 bg-[#050505] min-h-screen font-sans text-slate-300 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none z-0 mix-blend-screen" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8 border-b border-white/5 pb-8">
          <div>
            <div className="text-purple-400 font-mono text-xs font-semibold uppercase tracking-wider mb-2">
              Marketplace
            </div>
            <h2 className="text-4xl font-bold text-white tracking-tight mb-4">
              Production <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400">Templates</span>
            </h2>
            <p className="text-slate-400 max-w-xl text-lg leading-relaxed">
              Deploy battle-tested automation architectures. Clone, configure, and run in seconds.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80 group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-800 bg-[#0a0a0a] text-white placeholder-slate-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all shadow-xl"
              />
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Categories
            </h3>
          </div>

          {/* Categories Container */}
          <div className={`flex gap-2 transition-all duration-300 ${showAllCategories ? 'flex-wrap overflow-visible pb-0' : 'flex-nowrap overflow-x-auto pb-1'}`}>
            <button
              onClick={() => { setActiveCategory(null); setSearchQuery(''); }}
              className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${activeCategory === null
                ? 'bg-purple-500/10 border-purple-500/50 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.2)]'
                : 'bg-transparent border-slate-800 text-slate-400 hover:text-slate-300 hover:border-slate-700'
                }`}
            >
              All Templates
            </button>
            {visibleCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setActiveCategory(cat.id); setSearchQuery(''); }}
                className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${activeCategory === cat.id
                  ? 'bg-purple-500/10 border-purple-500/50 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.2)]'
                  : 'bg-transparent border-slate-800 text-slate-400 hover:text-slate-300 hover:border-slate-700'
                  }`}
              >
                {cat.title}
              </button>
            ))}
            
            {hasMoreCategories && (
              <button
                onClick={() => setShowAllCategories(!showAllCategories)}
                className="flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border bg-transparent border-slate-700 text-slate-400 hover:text-slate-300 hover:border-slate-600 hover:bg-slate-800/20"
              >
                {showAllCategories ? 'Show Less' : `Show All (${categories.length})`}
              </button>
            )}
          </div>
        </div>

        {/* Workflow Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkflows.map((workflow, index) => {
            const { Icon, gradient } = getWorkflowVisuals(workflow.id, index);

            return (
              <SpotlightCard
                key={workflow.id}
                className="h-full"
                onClick={() => handleViewDetails(workflow.slug)}
              >
                <div className="p-6 flex flex-col h-full">
                  {/* Card Header (Icon + Badges) */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg shadow-black/20 flex-shrink-0`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    <div className="flex items-center gap-2 flex-wrap justify-end">
                      {Number(workflow.price) === 0 ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors">
                          Free
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border border-white/10 text-gray-300">
                          ${workflow.price}
                        </span>
                      )}

                      {workflow.rating && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-500 border border-amber-500/20">
                          <Star className="w-3 h-3 fill-current" />
                          {workflow.rating}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body: Title + Desc */}
                  <div className="mb-4 flex-grow">
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors line-clamp-1">
                      {workflow.title}
                    </h3>
                    <p className="text-sm text-gray-400 line-clamp-2">
                      {workflow.description}
                    </p>
                  </div>

                  {/* Meta Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {workflow.category && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full border border-white/10 text-gray-400 text-xs font-normal">
                        {workflow.category.title}
                      </span>
                    )}

                    {workflow.nodes_count > 0 && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-white/10 text-gray-400 text-xs font-normal">
                        <LayoutGrid className="w-3 h-3" />
                        {workflow.nodes_count} Nodes
                      </span>
                    )}

                    {workflow.difficulty && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full border border-white/10 text-gray-400 text-xs font-normal capitalize">
                        {workflow.difficulty}
                      </span>
                    )}

                    {workflow.time_saved_value && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-cyan-500/20 text-cyan-400 text-xs font-normal">
                        <Clock className="w-3 h-3" />
                        {workflow.time_saved_value} {workflow.time_saved_unit}
                      </span>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <Eye className="w-4 h-4" />
                      <span>{workflow.views?.toLocaleString() || workflow.user_count?.toLocaleString() || 0} views</span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevents double firing the navigate
                        handleViewDetails(workflow.slug);
                      }}
                      className="px-4 py-1.5 text-sm rounded-md bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white font-medium hover:opacity-90 transition-opacity border-0 shadow-lg"
                    >
                      Download
                    </button>
                  </div>
                </div>
              </SpotlightCard>
            );
          })}
        </div>

        {filteredWorkflows.length === 0 && (
          <div className="text-center py-12 border border-white/5 rounded-2xl bg-[#12121a] mt-8">
            <p className="text-slate-400 text-lg">No templates found matching your criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductionTemplates;