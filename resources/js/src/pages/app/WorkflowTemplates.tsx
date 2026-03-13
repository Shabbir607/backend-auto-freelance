import { DynamicIcon } from '@/components/DynamicIcon';
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
import { useToast } from '@/contexts/ToastContext';
import { workflowService } from '@/services/workflowService';
import {
  CheckCircle,
  Eye,
  Filter,
  GitBranch,
  Layers,
  Plus,
  Search,
  Sparkles,
  Star,
  Users,
  Zap
} from 'lucide-react';
import { useEffect, useState } from 'react';

export default function WorkflowTemplates() {
  const { showToast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | number>('all');
  const [selectedTemplate, setSelectedTemplate] = useState<any | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [templates, setTemplates] = useState<any[]>([]);
  const [allLoadedTemplates, setAllLoadedTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // New states for pagination and display
  const [totalTemplates, setTotalTemplates] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isCategoriesExpanded, setIsCategoriesExpanded] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await workflowService.getWorkflowLibraryCategories();
        if (res.success && res.data) {
          setCategories(res.data);
        }
      } catch (error) {
        console.error('Failed to load categories', error);
      }
    };
    loadCategories();
  }, []);

  const fetchTemplates = async (page = 1, isLoadMore = false) => {
    if (isLoadMore) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }
    try {
      const categoryId = activeCategory === 'all' ? null : activeCategory;
      const res = await workflowService.getWorkflowLibrary(page, 50, searchQuery, categoryId as number, 'newest');
      // API returns flat { current_page, data, last_page, total, per_page }
      const newTemplates: any[] = Array.isArray(res) ? res : (res as any).data ?? [];
      const total: number = (res as any).total ?? newTemplates.length;
      if (isLoadMore) {
        setAllLoadedTemplates(prev => [...prev, ...newTemplates]);
        setTemplates(prev => [...prev, ...newTemplates]);
      } else {
        setAllLoadedTemplates(newTemplates);
        setTemplates(newTemplates);
      }
      setTotalTemplates(total);
      setCurrentPage(page);
    } catch (error) {
      console.error('Failed to fetch templates', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      // Reset to page 1 on new search or category change
      fetchTemplates(1, false);
    }, 300);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory, searchQuery]);

  const handleLoadMore = () => {
    fetchTemplates(currentPage + 1, true);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'advanced': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  // Derived lists for specific sections
  const featuredTemplates = allLoadedTemplates.filter((t) => t.rating && parseFloat(t.rating) >= 4.8).slice(0, 3);
  const filteredTemplates = allLoadedTemplates;

  const handleUseTemplate = (template: any) => {
    showToast(`Template "${template.title}" added to your workflows`, 'success');
    setIsDetailOpen(false);
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Layers className="w-6 h-6 text-primary" />
            Workflow Templates
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Choose from {totalTemplates > 0 ? totalTemplates : templates.length} ready-to-use automation templates
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 w-64"
            />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      {/* Categories */}
      <div className="flex items-center gap-2 pb-2">
        <div className={`flex gap-2 transition-all ${isCategoriesExpanded ? 'flex-wrap' : 'overflow-x-auto whitespace-nowrap'} max-w-full`} style={{ flex: 1 }}>
          <Button
            key="all"
            variant={activeCategory === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveCategory('all')}
            className={activeCategory === 'all' ? 'bg-primary text-primary-foreground' : ''}
          >
            <Layers className="w-4 h-4 mr-2" />
            All Templates
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveCategory(category.id)}
              className={activeCategory === category.id ? 'bg-primary text-primary-foreground' : ''}
            >
              <DynamicIcon name={category.icon || category.title} className="w-4 h-4 mr-2" />
              {category.title}
            </Button>
          ))}
        </div>
        {categories.length > 5 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCategoriesExpanded(!isCategoriesExpanded)}
            className="text-primary hover:text-primary/80 flex-shrink-0"
          >
            {isCategoriesExpanded ? 'Show Less' : 'Show All Categories'}
          </Button>
        )}
      </div>

      {/* Featured Templates */}
      {activeCategory === 'all' && searchQuery === '' && featuredTemplates.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
            <h2 className="text-lg font-semibold">Featured Templates</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredTemplates.map((template) => (
              <Card
                key={template.id}
                className="p-5 bg-gradient-to-br from-card to-card/50 border-primary/20 cursor-pointer hover:border-primary/50 transition-all"
                onClick={() => {
                  setSelectedTemplate(template);
                  setIsDetailOpen(true);
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center`}>
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                    <Star className="w-3 h-3 mr-1 fill-amber-400" />
                    Featured
                  </Badge>
                </div>
                <h3 className="font-semibold text-lg mb-2">{template.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {template.description}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <GitBranch className="w-4 h-4" />
                    {template.nodes_count || 0} steps
                  </span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    {(template.views || 0).toLocaleString()} uses
                  </span>
                  <span className="flex items-center gap-1 text-amber-400">
                    <Star className="w-4 h-4 fill-amber-400" />
                    {template.rating}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* All Templates */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">
            {activeCategory === 'all' ? 'All Templates' : categories.find(c => c.id === activeCategory)?.title}
          </h2>
          <span className="text-sm text-muted-foreground">
            {totalTemplates > 0 ? `${allLoadedTemplates.length} of ${totalTemplates} templates` : `${allLoadedTemplates.length} templates`}
          </span>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredTemplates.map((template) => (
            <Card
              key={template.id}
              className="p-4 bg-card border-border cursor-pointer hover:border-primary/50 transition-all group"
              onClick={() => {
                setSelectedTemplate(template);
                setIsDetailOpen(true);
              }}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0`}>
                  <DynamicIcon name={template.category?.icon || template.category?.title || 'Layers'} className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium truncate group-hover:text-primary transition-colors">
                    {template.title}
                  </h3>
                  <p className="text-xs text-muted-foreground truncate">
                    {template.nodes_count || 5} steps
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                {template.description}
              </p>
              <div className="flex items-center justify-between text-xs">
                <Badge variant="outline" className={getDifficultyColor(template.difficulty)}>
                  {template.difficulty}
                </Badge>
                <span className="flex items-center gap-1 text-amber-400">
                  <Star className="w-3 h-3 fill-amber-400" />
                  {template.rating}
                </span>
              </div>
            </Card>
          ))}
        </div>

        {filteredTemplates.length === 0 && !loading && (
          <div className="text-center py-16">
            <Layers className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-400 mb-2">No templates found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {loading && (
          <div className="text-center py-16">
            <Layers className="w-12 h-12 text-purple-600 animate-pulse mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-400 mb-2">Loading templates...</h3>
          </div>
        )}

        {/* Load More Button */}
        {!loading && allLoadedTemplates.length < totalTemplates && (
          <div className="mt-8 flex justify-center">
            <Button
              variant="outline"
              onClick={handleLoadMore}
              disabled={loadingMore}
              className="min-w-[200px]"
            >
              {loadingMore
                ? 'Loading...'
                : `Load More (${Math.max(totalTemplates - allLoadedTemplates.length, 0)} remaining)`}
            </Button>
          </div>
        )}
      </div>

      {/* Template Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl bg-card border-border">
          {selectedTemplate && (
            <>
              <DialogHeader>
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center`}>
                    <Sparkles className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <DialogTitle className="text-xl">{selectedTemplate.title}</DialogTitle>
                    <DialogDescription className="mt-1">
                      {selectedTemplate.description}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6 py-4">
                {/* Stats */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center p-3 rounded-lg bg-muted/50">
                    <p className="text-2xl font-bold">{selectedTemplate.nodes_count || 0}</p>
                    <p className="text-xs text-muted-foreground">Steps</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-muted/50">
                    <p className="text-2xl font-bold">{(selectedTemplate.views || 0).toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Uses</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-muted/50">
                    <p className="text-2xl font-bold text-amber-400">{selectedTemplate.rating}</p>
                    <p className="text-xs text-muted-foreground">Rating</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-muted/50">
                    <Badge variant="outline" className={getDifficultyColor(selectedTemplate.difficulty)}>
                      {selectedTemplate.difficulty}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">Difficulty</p>
                  </div>
                </div>

                {/* Triggers */}
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-cyan-400" />
                    Triggers
                  </h4>
                  <div className="space-y-2">
                    {Array.isArray(selectedTemplate.workflow_features) && selectedTemplate.workflow_features.length > 0 ? (
                      selectedTemplate.workflow_features.map((feature: any, index: any) => (
                        <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                          <CheckCircle className="w-4 h-4 text-cyan-400" />
                          <span className="text-sm">{typeof feature === 'string' ? feature : 'Feature'}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm">No specific triggers listed.</p>
                    )}
                  </div>
                </div>
              </div>

              <DialogFooter className="gap-3">
                <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
                  Cancel
                </Button>
                <Button variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
                <Button
                  className="bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white border-0"
                  onClick={() => handleUseTemplate(selectedTemplate)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Use This Template
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}



