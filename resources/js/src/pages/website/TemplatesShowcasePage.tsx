import { DynamicIcon } from '@/components/DynamicIcon';
import { FAQSection } from '@/components/FAQSection';
import { PublicNavbarLayout } from '@/components/layout/PublicNavbarLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { workflowService } from '@/services/workflowService';
import {
  ArrowRight,
  Bot,
  CheckCircle,
  Eye,
  GitBranch,
  Layers,
  Loader2,
  MessageSquare,
  Plus,
  Search,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Zap
} from 'lucide-react';
import { useEffect, useState, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Difficulty colors
const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'beginner': return 'bg-green-500/20 text-green-400 border-green-500/30';
    case 'intermediate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    case 'advanced': return 'bg-red-500/20 text-red-400 border-red-500/30';
    default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  }
};

export default function TemplatesShowcasePage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<number | 'all'>('all');
  const [expandCategories, setExpandCategories] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const [categories, setCategories] = useState<any[]>([]);
  const [templates, setTemplates] = useState<any[]>([]);
  const [stats, setStats] = useState({ total_workflows: 0, active_users: 0 });
  const [loading, setLoading] = useState(true);

  // Pagination states
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalWorkflows, setTotalWorkflows] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Ref for intersection observer
  const observerTarget = useRef<HTMLDivElement>(null);

  // Initial load for categories and stats
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [catsRes, statsRes] = await Promise.all([
          workflowService.getWorkflowLibraryCategories(),
          workflowService.getWorkflowStats()
        ]);
        if (catsRes.success) setCategories(catsRes.data);
        if (statsRes.success) {
          setStats({
            total_workflows: statsRes.data.total_workflows,
            active_users: statsRes.data.active_users_today
          });
        }
      } catch (error) {
        console.error("Failed to fetch initial library data:", error);
      }
    };
    fetchInitialData();
  }, []);

  const loadTemplates = useCallback(async (currentPage = 1, append = false) => {
    if (append) {
      setIsLoadingMore(true);
    } else {
      setLoading(true);
    }

    try {
      const categoryId = activeCategory === 'all' ? null : activeCategory;
      const res = await workflowService.getWorkflowLibrary(currentPage, 12, searchQuery, categoryId as number, 'newest');

      if (res.data) {
        setTemplates(prev => append ? [...prev, ...res.data] : res.data);
        setTotalPages(res.last_page || 1);
        setTotalWorkflows(res.total || 0);
        setHasMore((res.current_page || currentPage) < (res.last_page || 1));
      } else if (!append) {
        setTemplates([]);
        setTotalWorkflows(0);
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to fetch templates", error);
    } finally {
      setLoading(false);
      setIsLoadingMore(false);
    }
  }, [activeCategory, searchQuery]);

  // Fetch templates when category or search changes
  useEffect(() => {
    setPage(1);
    const timer = setTimeout(() => {
      loadTemplates(1, false);
    }, 400);
    return () => clearTimeout(timer);
  }, [activeCategory, searchQuery, loadTemplates]);

  const handleLoadMore = useCallback(() => {
    if (isLoadingMore || !hasMore || page >= totalPages) return;
    const nextPage = page + 1;
    setPage(nextPage);
    loadTemplates(nextPage, true);
  }, [page, totalPages, isLoadingMore, hasMore, loadTemplates]);

  // IntersectionObserver for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading && !isLoadingMore && page < totalPages) {
          handleLoadMore();
        }
      },
      { threshold: 0.1, rootMargin: '400px' }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [handleLoadMore, hasMore, loading, isLoadingMore, page, totalPages]);

  // Derived lists for specific sections
  const featuredTemplates = templates.filter(t => t.rating && parseFloat(t.rating) >= 4.8).slice(0, 3);
  const popularTemplates = [...templates].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 4);

  return (
    <PublicNavbarLayout className="text-white">

      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-16 px-4 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-10 md:mb-12">
            <Badge className="mb-4 md:mb-6 bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 text-white border-white/10 px-4 py-1.5 text-xs md:text-sm">
              <Layers className="w-3 h-3 md:w-4 md:h-4 mr-2" />
              {stats.total_workflows}+ Ready-to-Downloads
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-fuchsia-500">
                Automation Templates
              </span>
              <br />
              <span className="text-white">for Every Workflow</span>
            </h1>
            <p className="text-gray-400 text-base md:text-lg lg:text-xl max-w-3xl mx-auto mb-6 md:mb-8 px-2">
              Explore ready-to-use n8n automation templates built for digital marketing,
              social media automation, and lead generation. Automate your workflows instantly
              with simple one-click setup.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative px-2 sm:px-0">
              <Search className="absolute left-6 sm:left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 md:h-14 pl-12 pr-4 bg-white/5 border-white/10 rounded-xl text-white placeholder:text-gray-400 focus:border-cyan-500/50 focus:ring-cyan-500/20 text-sm md:text-base"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 max-w-4xl mx-auto px-2 sm:px-0">
            <Card className="p-4 md:p-6 bg-white/5 border-white/10 text-center">
              <p className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">{stats.total_workflows}+</p>
              <p className="text-xs md:text-sm text-gray-400 mt-1">Templates</p>
            </Card>
            <Card className="p-4 md:p-6 bg-white/5 border-white/10 text-center">
              <p className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">{stats.active_users}+</p>
              <p className="text-xs md:text-sm text-gray-400 mt-1">Active Users</p>
            </Card>
            <Card className="p-4 md:p-6 bg-white/5 border-white/10 text-center">
              <p className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500">4.8</p>
              <p className="text-xs md:text-sm text-gray-400 mt-1">Average Rating</p>
            </Card>
            <Card className="p-4 md:p-6 bg-white/5 border-white/10 text-center">
              <p className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">2M+</p>
              <p className="text-xs md:text-sm text-gray-400 mt-1">Automations Run</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-6 md:py-8 px-4 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs md:text-sm font-semibold text-gray-400 uppercase tracking-wider">Categories</h3>
            {categories.length > 5 && (
              <button
                onClick={() => setExpandCategories(!expandCategories)}
                className="text-xs text-cyan-400 hover:text-cyan-300 font-medium transition-colors bg-cyan-500/10 hover:bg-cyan-500/20 px-3 py-1.5 rounded-md"
              >
                {expandCategories ? 'Show Less' : 'Show All'}
              </button>
            )}
          </div>

          <div className={`flex gap-2 md:gap-3 transition-all duration-300 ${expandCategories ? 'flex-wrap' : 'overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0'}`}>
            <Button
              variant={activeCategory === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
              className={activeCategory === 'all'
                ? 'bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white border-0 shrink-0 whitespace-nowrap'
                : 'border-white/10 text-gray-400 hover:text-white hover:border-white/20 shrink-0 whitespace-nowrap'
              }
            >
              <Layers className="w-4 h-4 mr-2" />
              All Templates
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => { setActiveCategory(category.id); setSearchQuery(''); }}
                className={activeCategory === category.id
                  ? 'bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white border-0 shrink-0 whitespace-nowrap'
                  : 'border-white/10 text-gray-400 hover:text-white hover:border-white/20 shrink-0 whitespace-nowrap'
                }
              >
                <DynamicIcon name={category.icon || category.title} className="w-4 h-4 mr-2" />
                {category.title}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Templates */}
      {activeCategory === 'all' && searchQuery === '' && featuredTemplates.length > 0 && (
        <section className="py-12 md:py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 md:gap-3 mb-6 md:mb-8">
              <Star className="w-5 h-5 md:w-6 md:h-6 text-amber-500 fill-amber-500" />
              <h2 className="text-xl md:text-2xl font-bold">Featured Templates</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {featuredTemplates.map((template) => (
                <Card
                  key={`featured-${template.id}`}
                  className="p-5 md:p-6 bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 cursor-pointer hover:border-cyan-500/50 transition-all group"
                  onClick={() => navigate(`/workflow/${template.slug}`)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center`}>
                      <Sparkles className="w-6 h-6 md:w-7 md:h-7 text-white" />
                    </div>
                    <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-[10px] md:text-xs">
                      <Star className="w-3 h-3 mr-1 fill-amber-400" />
                      Featured
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-base md:text-lg mb-2 group-hover:text-cyan-400 transition-colors">{template.title}</h3>
                  <p className="text-xs md:text-sm text-gray-400 mb-4 line-clamp-2">{template.description}</p>
                  <div className="flex items-center justify-between text-xs md:text-sm">
                    <span className="flex items-center gap-1 text-gray-400">
                      <GitBranch className="w-3 h-3 md:w-4 md:h-4" />
                      {template.nodes_count} steps
                    </span>
                    <span className="flex items-center gap-1 text-gray-400">
                      <Users className="w-3 h-3 md:w-4 md:h-4" />
                      {(template.views || template.user_count || 0).toLocaleString()} uses
                    </span>
                    <span className="flex items-center gap-1 text-amber-400">
                      <Star className="w-3 h-3 md:w-4 md:h-4 fill-amber-400" />
                      {template.rating || '4.8'}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Popular Templates */}
      {activeCategory === 'all' && searchQuery === '' && popularTemplates.length > 0 && (
        <section className="py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 md:gap-3 mb-6 md:mb-8">
              <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-emerald-400" />
              <h2 className="text-xl md:text-2xl font-bold">Most Popular</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {popularTemplates.map((template) => (
                <Card
                  key={`popular-${template.id}`}
                  className="p-4 bg-white/5 border-white/10 cursor-pointer hover:border-cyan-500/50 transition-all group"
                  onClick={() => navigate(`/workflow/${template.slug}`)}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shrink-0`}>
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm md:text-base truncate group-hover:text-cyan-400 transition-colors">{template.title}</h3>
                      <p className="text-[11px] md:text-xs text-gray-400">{(template.views || template.user_count || 0).toLocaleString()} uses</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[11px] md:text-xs">
                    <Badge variant="outline" className={getDifficultyColor(template.difficulty || 'beginner')}>
                      {template.difficulty || 'beginner'}
                    </Badge>
                    <span className="flex items-center gap-1 text-amber-400">
                      <Star className="w-3 h-3 fill-amber-400" />
                      {template.rating || '4.5'}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Templates Grid */}
      <section className="py-12 md:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 md:mb-8">
            <div className="flex items-center gap-2 md:gap-3">
              <Layers className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
              <h2 className="text-xl md:text-2xl font-bold">
                {activeCategory === 'all' ? 'All Templates' : categories.find(c => c.id === activeCategory)?.title || 'Templates'}
              </h2>
            </div>
            <span className="text-xs md:text-sm text-gray-400">
              {loading && !isLoadingMore ? '...' : totalWorkflows} templates
            </span>
          </div>

          {loading && !isLoadingMore ? (
            <div className="flex flex-col items-center justify-center py-20">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
                {templates.map((template) => (
                  <Card
                    key={`grid-${template.id}`}
                    className="p-4 bg-white/5 border-white/10 cursor-pointer hover:border-cyan-500/50 transition-all group h-full flex flex-col"
                    onClick={() => navigate(`/workflow/${template.slug}`)}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0`}>
                        <DynamicIcon name={template.category?.icon || template.category?.title || 'Layers'} className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm md:text-base truncate group-hover:text-cyan-400 transition-colors">{template.title}</h3>
                        <p className="text-[11px] md:text-xs text-gray-400">{template.nodes_count || 5} steps</p>
                      </div>
                    </div>
                    <p className="text-xs md:text-sm text-gray-400 line-clamp-2 mb-3 flex-grow">{template.description}</p>
                    <div className="flex items-center justify-between text-[11px] md:text-xs mt-auto pt-3 border-t border-white/5">
                      <Badge variant="outline" className={getDifficultyColor(template.difficulty || 'beginner')}>
                        {template.difficulty || 'beginner'}
                      </Badge>
                      <span className="flex items-center gap-1 text-amber-400">
                        <Star className="w-3 h-3 fill-amber-400" />
                        {template.rating || '4.5'}
                      </span>
                    </div>
                  </Card>
                ))}
              </div>

              {templates.length === 0 && (
                <div className="text-center py-12 md:py-16 px-4 bg-white/5 border border-white/10 rounded-2xl">
                  <Layers className="w-10 h-10 md:w-12 md:h-12 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-2">No templates found</h3>
                  <p className="text-sm md:text-base text-gray-400 mb-6">We couldn't find any templates matching your search criteria.</p>
                  <Button variant="outline" onClick={() => { setSearchQuery(''); setActiveCategory('all'); }} className="border-white/10 text-white hover:bg-white/10">
                    Clear Filters
                  </Button>
                </div>
              )}

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
                ) : !hasMore && templates.length > 0 ? (
                  <div className="relative p-12 rounded-[2rem] bg-white/[0.02] border border-white/5 text-center backdrop-blur-md max-w-sm w-full mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 to-transparent rounded-[2rem] opacity-50" />
                    <Star className="w-10 h-10 text-amber-500 fill-amber-500 mx-auto mb-6 drop-shadow-lg animate-bounce" />
                    <h3 className="text-xl font-bold text-white mb-2">Deep Index Reached</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      You have retrieved all {templates.length} templates currently available.
                    </p>
                  </div>
                ) : null}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-fuchsia-500/10" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">
            Ready to Automate Your Workflow?
          </h2>
          <p className="text-gray-400 text-base md:text-lg mb-6 md:mb-8 max-w-2xl mx-auto px-2">
            Start using any template with just one click. No coding required.
            Get started for free and scale as you grow.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 w-full px-4 sm:px-0">
            <Link to="/contact" title="Get started for free with our templates" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white border-0 hover:opacity-90 h-12 px-6 md:px-8">
                Get Started Free
                <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
              </Button>
            </Link>
            <Link to="/contact" title="Request a custom workflow from our team" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/20 text-white hover:bg-white/5 h-12 px-6 md:px-8">
                <MessageSquare className="mr-2 w-4 h-4 md:w-5 md:h-5" />
                Request Custom Workflow
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Template Detail Modal */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="w-[95vw] max-w-2xl bg-[#0a0a0f] border-white/10 text-white max-h-[90vh] overflow-y-auto p-4 md:p-6 rounded-xl">
          {selectedTemplate && (
            <>
              <DialogHeader>
                <div className="flex items-start gap-3 md:gap-4">
                  <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center shrink-0`}>
                    <Sparkles className="w-6 h-6 md:w-7 md:h-7 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <DialogTitle className="text-lg md:text-xl text-white pr-6">{selectedTemplate.title}</DialogTitle>
                    <DialogDescription className="mt-1 text-xs md:text-sm text-gray-400 line-clamp-3 md:line-clamp-none">
                      {selectedTemplate.description}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-5 md:space-y-6 py-2 md:py-4">
                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
                  <div className="text-center p-2 md:p-3 rounded-lg bg-white/5">
                    <p className="text-xl md:text-2xl font-bold">{selectedTemplate.nodes_count || 0}</p>
                    <p className="text-[10px] md:text-xs text-gray-400">Steps</p>
                  </div>
                  <div className="text-center p-2 md:p-3 rounded-lg bg-white/5">
                    <p className="text-xl md:text-2xl font-bold">{(selectedTemplate.views || 0).toLocaleString()}</p>
                    <p className="text-[10px] md:text-xs text-gray-400">Uses</p>
                  </div>
                  <div className="text-center p-2 md:p-3 rounded-lg bg-white/5">
                    <p className="text-xl md:text-2xl font-bold text-amber-400">{selectedTemplate.rating || 'N/A'}</p>
                    <p className="text-[10px] md:text-xs text-gray-400">Rating</p>
                  </div>
                  <div className="text-center p-2 md:p-3 rounded-lg bg-white/5 flex flex-col items-center justify-center">
                    <Badge variant="outline" className={`text-[10px] md:text-xs px-2 py-0 ${getDifficultyColor(selectedTemplate.difficulty || 'beginner')}`}>
                      {selectedTemplate.difficulty || 'beginner'}
                    </Badge>
                    <p className="text-[10px] md:text-xs text-gray-400 mt-1">Difficulty</p>
                  </div>
                </div>

                {/* Triggers */}
                <div>
                  <h4 className="font-medium text-sm md:text-base mb-2 md:mb-3 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-cyan-400" />
                    Triggers
                  </h4>
                  <div className="space-y-2">
                    {Array.isArray(selectedTemplate.workflow_features) && selectedTemplate.workflow_features.length > 0 ? (
                      selectedTemplate.workflow_features.map((feature: any, index: any) => (
                        <div key={index} className="flex items-start md:items-center gap-2 p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                          <CheckCircle className="w-4 h-4 text-cyan-400 mt-0.5 md:mt-0 shrink-0" />
                          <span className="text-xs md:text-sm">{typeof feature === 'string' ? feature : 'Feature'}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-400 text-xs md:text-sm">No specific triggers listed.</p>
                    )}
                  </div>
                </div>
              </div>

              <DialogFooter className="flex-col sm:flex-row gap-2 md:gap-3 mt-4">
                <Button variant="outline" onClick={() => setIsDetailOpen(false)} className="w-full sm:w-auto border-white/10 text-white hover:bg-white/5 order-3 sm:order-1">
                  Cancel
                </Button>
                <Button variant="outline" className="w-full sm:w-auto border-white/10 text-white hover:bg-white/5 order-2 sm:order-2">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
                <Link to="/signup" title="Sign up and start using this template" className="w-full sm:w-auto order-1 sm:order-3">
                  <Button className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white border-0">
                    <Plus className="w-4 h-4 mr-2" />
                    Use This Template
                  </Button>
                </Link>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      <FAQSection type="page" slug="templates" />

    </PublicNavbarLayout>
  );
}
