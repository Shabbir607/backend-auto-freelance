import { useConfirmation } from '@/components/ConfirmationDialog';
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
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from '@/contexts/ToastContext';
import { cn } from '@/lib/utils';
import { workflowService } from '@/services/workflowService';
import {
  Activity,
  Bot,
  CheckCircle,
  ChevronRight,
  Clock,
  Code,
  Edit,
  FileJson,
  Filter,
  FolderOpen,
  Gauge,
  Loader2,
  MoreVertical,
  Pause,
  Play,
  Plus,
  Search,
  Send,
  Sparkles,
  Star,
  Timer,
  Trash2,
  Workflow,
  X,
  Zap
} from 'lucide-react';
import { useEffect, useState } from 'react';

// --- Interfaces ---

interface WorkflowNode {
  id: string | number;
  type: 'trigger' | 'filter' | 'action' | 'ai' | 'delay';
  name: string;
}

interface WorkflowCategory {
  id: number;
  title: string;
  slug: string;
  icon: string;
  badge_text: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface WorkflowItem {
  id: string | number;
  apiId: number;
  slug: string;
  name: string;
  description: string;
  categoryId: number;
  categoryIds: number[];
  status: 'published' | 'draft' | 'archived';
  nodes: WorkflowNode[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  price: string | number;
  timeSavedValue: number;
  timeSavedUnit: string;
  roiPercentage: number;
  rating: string;
  userCount: number;
  nodesCount: number;
  jsonData: any;
  workflowFeatures: string[];
}

interface WorkflowFormState {
  title: string;
  slug: string;
  category_id: number;
  category_ids: number[];
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  price: string;
  time_saved_value: string;
  time_saved_unit: string;
  roi_percentage: string;
  nodes_count: string;
  user_count: string;
  rating: string;
  status: 'published' | 'draft' | 'archived';
  workflow_features: string[];
  json_data_str: string;
  json_file: File | null;
  featureInput: string;
  // Advanced SEO fields
  seo_title: string;
  seo_description: string;
  seo_keywords: string;
  seo_canonical: string;
  seo_og_image: string;
  seo_twitter_card: string;
  seo_twitter_site: string;
}

// --- Configuration ---

const statusConfig: Record<WorkflowItem['status'], { label: string; color: string; bg: string; icon: any }> = {
  published: { label: 'Active', color: 'text-emerald-600', bg: 'bg-emerald-100 border-emerald-200', icon: CheckCircle },
  draft: { label: 'Draft', color: 'text-slate-600', bg: 'bg-slate-100 border-slate-200', icon: Edit },
  archived: { label: 'Archived', color: 'text-rose-600', bg: 'bg-rose-100 border-rose-200', icon: Trash2 },
};

const nodeTypeConfig: Record<string, { icon: any; color: string }> = {
  trigger: { icon: Zap, color: 'text-amber-500' },
  filter: { icon: Filter, color: 'text-orange-500' },
  action: { icon: Send, color: 'text-blue-500' },
  ai: { icon: Bot, color: 'text-purple-500' },
  delay: { icon: Clock, color: 'text-gray-500' },
};

const inferNodeType = (rawValue: unknown): WorkflowNode['type'] => {
  const value = String(rawValue || '').toLowerCase();

  if (
    value.includes('trigger') ||
    value.includes('webhook') ||
    value.includes('schedule') ||
    value.includes('manual') ||
    value.includes('form')
  ) {
    return 'trigger';
  }

  if (
    value.includes('if') ||
    value.includes('switch') ||
    value.includes('filter') ||
    value.includes('condition') ||
    value.includes('router') ||
    value.includes('split')
  ) {
    return 'filter';
  }

  if (
    value.includes('openai') ||
    value.includes('gemini') ||
    value.includes('langchain') ||
    value.includes('agent') ||
    value.includes('llm') ||
    value.includes('gpt') ||
    value.includes('ai') ||
    value.includes('perplexity')
  ) {
    return 'ai';
  }

  if (
    value.includes('delay') ||
    value.includes('wait') ||
    value.includes('sleep') ||
    value.includes('timer')
  ) {
    return 'delay';
  }

  return 'action';
};

const humanizeNodeLabel = (rawValue: unknown): string => {
  const raw = String(rawValue || '').trim();
  if (!raw) return 'Action';

  const withoutNamespace = raw.includes('.') ? raw.split('.').pop() || raw : raw;
  const withSpaces = withoutNamespace
    .replace(/[_-]+/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\s+/g, ' ')
    .trim();

  return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
};

const initialFormState: WorkflowFormState = {
  title: '',
  slug: '',
  category_id: 1,
  category_ids: [],
  description: '',
  difficulty: 'intermediate',
  price: '',
  time_saved_value: '',
  time_saved_unit: 'hours',
  roi_percentage: '',
  nodes_count: '',
  user_count: '',
  rating: '',
  status: 'published',
  workflow_features: [],
  json_data_str: '{\n  "trigger": "new_post",\n  "steps": []\n}',
  json_file: null,
  featureInput: '',
  seo_title: '',
  seo_description: '',
  seo_keywords: '',
  seo_canonical: '',
  seo_og_image: '',
  seo_twitter_card: '',
  seo_twitter_site: '',
};

export default function WorkflowBuilder() {
  const { showToast } = useToast();
  const { confirm } = useConfirmation();

  // UI State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isCategoriesDialogOpen, setIsCategoriesDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingDetails, setIsFetchingDetails] = useState(false);
  const [isSaving, setIsSaving] = useState<string | number | null>(null);

  // Category State
  const [categorySearchQuery, setCategorySearchQuery] = useState('');
  const [isEditingCategory, setIsEditingCategory] = useState<number | null>(null);
  const [newCategory, setNewCategory] = useState({ title: '', icon: 'lucide-share-2', badge_text: '', sort_order: '', is_active: true });

  // Data State
  const [workflows, setWorkflows] = useState<WorkflowItem[]>([]);
  const [categories, setCategories] = useState<WorkflowCategory[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newWorkflow, setNewWorkflow] = useState<WorkflowFormState>(initialFormState);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [totalWorkflows, setTotalWorkflows] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    loadCategories();
    loadWorkflows(1, false);
  }, []);

  const loadCategories = async () => {
    try {
      const response = await workflowService.listCategories();
      if (response.success && response.data.data) {
        setCategories(response.data.data);
      }
    } catch (error) {
      console.error('Failed to load categories:', error);
      showToast('Failed to load categories', 'error');
    }
  };

  const loadWorkflows = async (page = 1, append = false) => {
    if (append) setIsLoadingMore(true);
    else setIsLoading(true);

    try {
      const response = await workflowService.listWorkflows(page, 12); // Adjust limit as needed
      if (response.success && response.data) {
        const rootPayload: any = response.data;
        const paginatedPayload: any = Array.isArray(rootPayload?.data)
          ? rootPayload
          : (rootPayload?.data && Array.isArray(rootPayload.data?.data))
            ? rootPayload.data
            : rootPayload;

        const rawData = Array.isArray(paginatedPayload?.data)
          ? paginatedPayload.data
          : Array.isArray(paginatedPayload)
            ? paginatedPayload
            : [];

        const apiWorkflows = rawData.map((wf: any) => ({
          id: `wf-${wf.id}`,
          apiId: wf.id,
          slug: wf.slug,
          name: wf.title,
          description: wf.description,
          categoryId: wf.category_id || 1,
          categoryIds: wf.category_ids || (wf.category_id ? [wf.category_id] : []),
          status: wf.status,
          difficulty: wf.difficulty,
          price: wf.price,
          timeSavedValue: wf.time_saved_value,
          timeSavedUnit: wf.time_saved_unit,
          roiPercentage: wf.roi_percentage,
          rating: wf.rating,
          userCount: wf.user_count,
          nodesCount: wf.nodes_count,
          jsonData: wf.json_data,
          workflowFeatures: Array.isArray(wf.workflow_features)
            ? wf.workflow_features
            : typeof wf.workflow_features === 'string'
              ? (() => {
                try {
                  const parsed = JSON.parse(wf.workflow_features);
                  return Array.isArray(parsed) ? parsed : [];
                } catch {
                  return [];
                }
              })()
              : [],
          nodes: Array.isArray(wf.workflow_nodes)
            ? wf.workflow_nodes.map((node: any, idx: number) => {
              const rawType = typeof node === 'string' ? node : (node?.type || node?.name || '');
              const rawName = typeof node === 'string' ? node : (node?.name || node?.type || `step-${idx + 1}`);

              return {
                id: (typeof node === 'object' && node?.id) ? node.id : idx,
                type: inferNodeType(rawType),
                name: humanizeNodeLabel(rawName),
              };
            })
            : [],
        }));

        setWorkflows(prev => append ? [...prev, ...apiWorkflows] : apiWorkflows);
        setTotalWorkflows(paginatedPayload?.total || rootPayload?.total || apiWorkflows.length);
        setLastPage(paginatedPayload?.last_page || rootPayload?.last_page || 1);
        setCurrentPage(page);
      }
    } catch (error) {
      console.error(error);
      showToast('Failed to load workflows', 'error');
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

  const handleLoadMore = () => {
    if (currentPage < lastPage) {
      loadWorkflows(currentPage + 1, true);
    }
  };

  const filteredWorkflows = workflows.filter((workflow) => {
    const matchesSearch = workflow.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || workflow.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const isFiltering = searchQuery !== '' || statusFilter !== 'all';

  const toggleWorkflowStatus = async (workflowId: string) => {
    const workflow = workflows.find(w => w.id === workflowId);
    if (!workflow) return;

    setIsSaving(workflowId);
    try {
      const newStatus: WorkflowItem['status'] = workflow.status === 'published' ? 'draft' : 'published';
      setWorkflows(prev => prev.map(wf => wf.id === workflowId ? { ...wf, status: newStatus } : wf));
      if (workflow.apiId) {
        await workflowService.updateWorkflow(workflow.apiId, { status: newStatus });
      }
      showToast(`Workflow ${newStatus === 'published' ? 'published' : 'unpublished'}`, 'success');
    } catch (error) {
      console.error(error);
      loadWorkflows(1, false); // Reload on error to sync state
      showToast('Failed to update status', 'error');
    } finally {
      setIsSaving(null);
    }
  };

  const deleteWorkflow = async (workflow: WorkflowItem) => {
    const confirmed = await confirm({
      title: 'Delete Workflow',
      description: `Are you sure you want to delete "${workflow.name}"? This action cannot be undone.`,
      confirmText: 'Delete',
      cancelText: 'Cancel',
      isDangerous: true,
    });

    if (!confirmed) return;

    setIsSaving(workflow.id);
    try {
      if (workflow.apiId) {
        await workflowService.deleteWorkflow(workflow.apiId);
      }
      setWorkflows(prev => prev.filter(wf => wf.id !== workflow.id));
      setTotalWorkflows(prev => prev - 1);
      showToast('Workflow deleted successfully', 'success');
    } catch (error) {
      console.error(error);
      showToast('Failed to delete workflow', 'error');
    } finally {
      setIsSaving(null);
    }
  };

  // --- Form Handlers ---

  const openCreateDialog = () => {
    setEditingId(null);
    setNewWorkflow(initialFormState);
    setIsCreateDialogOpen(true);
  };

  // Fetch full details before opening Edit Dialog
  const handleEditWorkflow = async (workflow: WorkflowItem) => {
    setIsFetchingDetails(true);
    try {
      const baseUrl = import.meta.env.VITE_API_URL;
      const fetchUrl = baseUrl ? `${baseUrl}/workflow-library/${workflow.slug || workflow.apiId}` : `/api/workflow-library/${workflow.slug || workflow.apiId}`;

      const response = await fetch(fetchUrl, {
        headers: {
          'x-app-key': import.meta.env.VITE_FRONTEND_SECRET || '',
        },
      });
      const result = await response.json();

      const fullData = result.success ? result.data : workflow;
      const seoData = result.success ? result.seo : null;

      // Handle JSON stringification carefully depending on if API returned string or object
      let formattedJsonData = '{\n  "trigger": "manual",\n  "steps": []\n}';
      if (fullData.json_data) {
        formattedJsonData = typeof fullData.json_data === 'string'
          ? fullData.json_data
          : JSON.stringify(fullData.json_data, null, 2);
      } else if (workflow.jsonData) {
        formattedJsonData = typeof workflow.jsonData === 'string'
          ? workflow.jsonData
          : JSON.stringify(workflow.jsonData, null, 2);
      }

      setEditingId(fullData.id || workflow.apiId);
      setNewWorkflow({
        title: fullData.title || workflow.name,
        slug: fullData.slug || workflow.slug || '',
        category_id: fullData.category_id || workflow.categoryId,
        category_ids: fullData.category_ids || (workflow.categoryIds.length > 0 ? workflow.categoryIds : [workflow.categoryId]),
        description: fullData.description || workflow.description,
        difficulty: fullData.difficulty || workflow.difficulty,
        price: String(fullData.price || workflow.price),
        time_saved_value: String(fullData.time_saved_value || workflow.timeSavedValue),
        time_saved_unit: fullData.time_saved_unit || workflow.timeSavedUnit,
        roi_percentage: String(fullData.roi_percentage || workflow.roiPercentage),
        nodes_count: String(fullData.nodes_count || workflow.nodesCount || 0),
        user_count: String(fullData.user_count || workflow.userCount || 0),
        rating: String(fullData.rating || workflow.rating || 0),
        status: fullData.status || workflow.status,
        json_data_str: formattedJsonData,
        json_file: null,
        workflow_features: fullData.workflow_features || workflow.workflowFeatures || [],
        featureInput: '',
        seo_title: seoData?.title || '',
        seo_description: seoData?.description || '',
        seo_keywords: seoData?.keywords || '',
        seo_canonical: seoData?.canonical || '',
        seo_og_image: seoData?.og_image || '',
        seo_twitter_card: seoData?.twitter_card || '',
        seo_twitter_site: seoData?.twitter_site || '',
      });
      setIsCreateDialogOpen(true);
    } catch (error) {
      console.error('Error fetching full workflow details:', error);
      showToast('Failed to fetch full workflow details. Loading partial data.', 'error');

      // Fallback to partial data
      setEditingId(workflow.apiId);
      setNewWorkflow({
        title: workflow.name,
        slug: workflow.slug || '',
        category_id: workflow.categoryId,
        category_ids: workflow.categoryIds.length > 0 ? workflow.categoryIds : [workflow.categoryId],
        description: workflow.description,
        difficulty: workflow.difficulty,
        price: String(workflow.price),
        time_saved_value: String(workflow.timeSavedValue),
        time_saved_unit: workflow.timeSavedUnit,
        roi_percentage: String(workflow.roiPercentage),
        nodes_count: String(workflow.nodesCount || 0),
        user_count: String(workflow.userCount || 0),
        rating: String(workflow.rating || 0),
        status: workflow.status,
        json_data_str: typeof workflow.jsonData === 'string' ? workflow.jsonData : JSON.stringify(workflow.jsonData || { trigger: "manual", steps: [] }, null, 2),
        json_file: null,
        workflow_features: workflow.workflowFeatures || [],
        featureInput: '',
        seo_title: '',
        seo_description: '',
        seo_keywords: '',
        seo_canonical: '',
        seo_og_image: '',
        seo_twitter_card: '',
        seo_twitter_site: '',
      });
      setIsCreateDialogOpen(true);
    } finally {
      setIsFetchingDetails(false);
    }
  };

  const handleSaveWorkflow = async () => {
    if (!newWorkflow.title || newWorkflow.title.trim() === '') {
      showToast('Please enter a title', 'error');
      return;
    }

    if (!newWorkflow.category_id && newWorkflow.category_ids.length === 0) {
      showToast('Please select at least one category', 'error');
      return;
    }

    let parsedJsonData = {};
    try {
      if (newWorkflow.json_data_str) {
        parsedJsonData = JSON.parse(newWorkflow.json_data_str);
      }
    } catch (e) {
      showToast('Invalid JSON in "JSON Configuration"', 'error');
      return;
    }

    setIsSaving('save');
    try {
      const formData = new FormData();
      const title = newWorkflow.title.trim();
      formData.append('title', title);

      if (newWorkflow.slug) formData.append('slug', newWorkflow.slug);
      formData.append('description', newWorkflow.description || '');
      formData.append('status', newWorkflow.status);
      formData.append('difficulty', newWorkflow.difficulty);
      formData.append('price', String(newWorkflow.price || '0'));
      formData.append('roi_percentage', String(newWorkflow.roi_percentage || '0'));
      formData.append('time_saved_value', String(newWorkflow.time_saved_value || '0'));
      formData.append('time_saved_unit', newWorkflow.time_saved_unit);
      formData.append('nodes_count', String(newWorkflow.nodes_count || '0'));
      formData.append('user_count', String(newWorkflow.user_count || '0'));
      formData.append('rating', String(newWorkflow.rating || '0'));

      // Append SEO parameters if in edit mode
      if (editingId) {
        if (newWorkflow.seo_title) formData.append('seo_title', newWorkflow.seo_title);
        if (newWorkflow.seo_description) formData.append('seo_description', newWorkflow.seo_description);
        if (newWorkflow.seo_keywords) formData.append('seo_keywords', newWorkflow.seo_keywords);
        if (newWorkflow.seo_canonical) formData.append('seo_canonical', newWorkflow.seo_canonical);
        if (newWorkflow.seo_og_image) formData.append('seo_og_image', newWorkflow.seo_og_image);
        if (newWorkflow.seo_twitter_card) formData.append('seo_twitter_card', newWorkflow.seo_twitter_card);
        if (newWorkflow.seo_twitter_site) formData.append('seo_twitter_site', newWorkflow.seo_twitter_site);
      }

      if (newWorkflow.json_file) {
        formData.append('json_file', newWorkflow.json_file);
      }

      // Sending raw parsed JSON back to formData
      const jsonDataArray = Array.isArray(parsedJsonData) ? parsedJsonData : [parsedJsonData];
      jsonDataArray.forEach((item, index) => {
        formData.append(`json_data[${index}]`, JSON.stringify(item));
      });

      if (newWorkflow.workflow_features.length > 0) {
        newWorkflow.workflow_features.forEach((feature, index) => {
          formData.append(`workflow_features[${index}]`, feature);
        });
      }

      if (newWorkflow.category_ids.length > 0) {
        newWorkflow.category_ids.forEach((id) => {
          formData.append('category_ids[]', String(id));
        });
        formData.append('category_id', String(newWorkflow.category_ids[0]));
      } else {
        formData.append('category_id', String(newWorkflow.category_id));
      }

      const nodesPayload = [
        { id: 1, type: "trigger" },
        { id: 2, type: "action" }
      ];
      nodesPayload.forEach((node, index) => {
        formData.append(`workflow_nodes[${index}][id]`, String(node.id));
        formData.append(`workflow_nodes[${index}][type]`, node.type);
      });

      if (editingId) {
        formData.append('_method', 'PUT');
        await workflowService.updateWorkflow(editingId, formData);
        showToast('Workflow updated successfully', 'success');
      } else {
        await workflowService.createWorkflow(formData);
        showToast('Workflow created successfully', 'success');
      }

      await loadWorkflows(1, false); // Reload from page 1 to see the new data
      setIsCreateDialogOpen(false);
      setNewWorkflow(initialFormState);
      setEditingId(null);

    } catch (error) {
      console.error(error);
      showToast(editingId ? 'Failed to update workflow' : 'Failed to create workflow', 'error');
    } finally {
      setIsSaving(null);
    }
  };

  const addFeature = () => {
    if (newWorkflow.featureInput.trim()) {
      setNewWorkflow(prev => ({
        ...prev,
        workflow_features: [...prev.workflow_features, prev.featureInput.trim()],
        featureInput: ''
      }));
    }
  };

  const toggleCategorySelection = (categoryId: number) => {
    setNewWorkflow(prev => {
      const currentIds = prev.category_ids;
      if (currentIds.includes(categoryId)) {
        return { ...prev, category_ids: currentIds.filter(id => id !== categoryId) };
      } else {
        return { ...prev, category_ids: [...currentIds, categoryId] };
      }
    });
  };

  // --- Category Management Handlers ---
  const handleSaveCategory = async () => {
    if (!newCategory.title) { showToast('Please enter a category title', 'error'); return; }
    setIsSaving('category');
    try {
      const payload = { title: newCategory.title, icon: newCategory.icon, badge_text: newCategory.badge_text, sort_order: Number(newCategory.sort_order || 0), is_active: newCategory.is_active };
      if (isEditingCategory) { await workflowService.updateCategory(isEditingCategory, payload); showToast('Category updated successfully', 'success'); }
      else { await workflowService.createCategory(payload); showToast('Category created successfully', 'success'); }
      await loadCategories();
      setNewCategory({ title: '', icon: 'lucide-share-2', badge_text: '', sort_order: '', is_active: true });
      setIsEditingCategory(null);
    } catch (error) { console.error('Error saving category:', error); showToast(isEditingCategory ? 'Failed to update category' : 'Failed to create category', 'error'); }
    finally { setIsSaving(null); }
  };

  const handleDeleteCategory = async (categoryId: number) => {
    const confirmed = await confirm({ title: 'Delete Category', description: 'Are you sure?', confirmText: 'Delete', cancelText: 'Cancel', isDangerous: true });
    if (!confirmed) return;
    setIsSaving(categoryId);
    try { await workflowService.deleteCategory(categoryId); setCategories(prev => prev.filter(c => c.id !== categoryId)); showToast('Category deleted successfully', 'success'); }
    catch (error) { console.error('Error deleting category:', error); showToast('Failed to delete category', 'error'); }
    finally { setIsSaving(null); }
  };

  const handleEditCategory = (category: WorkflowCategory) => {
    setIsEditingCategory(category.id);
    setNewCategory({ title: category.title, icon: category.icon, badge_text: category.badge_text, sort_order: String(category.sort_order), is_active: category.is_active });
  };

  const filteredCategories = categories.filter(cat => cat.title.toLowerCase().includes(categorySearchQuery.toLowerCase()));

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 relative">

      {/* Loading overlay for fetching edit details */}
      {isFetchingDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/50 backdrop-blur-sm">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Workflow className="w-6 h-6 text-primary" />
            </div>
            Workflow Manager
          </h1>
          <p className="text-muted-foreground mt-1 ml-1">
            Managing {workflows.length} of {totalWorkflows} automation products.
          </p>
        </div>

        <div className="flex gap-3">
          <Button size="lg" variant="outline" className="shadow-sm hover:shadow-md transition-all" onClick={() => setIsCategoriesDialogOpen(true)}>
            <FolderOpen className="w-5 h-5 mr-2" /> Manage Categories
          </Button>

          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all" onClick={openCreateDialog}>
                <Plus className="w-5 h-5 mr-2" /> New Workflow
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingId ? 'Edit Workflow' : 'Create New Workflow'}</DialogTitle>
                <DialogDescription>
                  {editingId ? 'Update the details below.' : 'Enter the details for your new automation product.'}
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-2 gap-4 py-4">

                {/* Basic Info */}
                <div className="col-span-2 space-y-2">
                  <Label>Title <span className="text-red-500">*</span></Label>
                  <Input
                    value={newWorkflow.title}
                    onChange={e => setNewWorkflow({ ...newWorkflow, title: e.target.value })}
                    placeholder="e.g. AI Social Media Auto Poster"
                  />
                </div>

                <div className="col-span-2 space-y-2">
                  <Label>Slug (Optional)</Label>
                  <Input
                    value={newWorkflow.slug}
                    onChange={e => setNewWorkflow({ ...newWorkflow, slug: e.target.value })}
                    placeholder="e.g. ai-social-poster"
                  />
                  <p className="text-[10px] text-muted-foreground">Leave blank to auto-generate from title.</p>
                </div>

                <div className="col-span-2 space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={newWorkflow.description}
                    onChange={e => setNewWorkflow({ ...newWorkflow, description: e.target.value })}
                    placeholder="What does this workflow do?"
                    rows={2}
                  />
                </div>

                {/* Status & Categories */}
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select
                    value={newWorkflow.status}
                    onValueChange={(val: any) => setNewWorkflow({ ...newWorkflow, status: val })}
                  >
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Categories</Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full justify-between font-normal text-left">
                        <span className="truncate">
                          {newWorkflow.category_ids.length === 0
                            ? "Select categories..."
                            : `${newWorkflow.category_ids.length} selected`}
                        </span>
                        <ChevronRight className="w-4 h-4 rotate-90 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[240px] max-h-[300px] overflow-auto">
                      <DropdownMenuLabel>Available Categories</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {categories.map((cat) => (
                        <DropdownMenuCheckboxItem
                          key={cat.id}
                          checked={newWorkflow.category_ids.includes(cat.id)}
                          onCheckedChange={() => toggleCategorySelection(cat.id)}
                        >
                          {cat.title}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-2">
                  <Label>Difficulty</Label>
                  <Select
                    value={newWorkflow.difficulty}
                    onValueChange={(val: any) => setNewWorkflow({ ...newWorkflow, difficulty: val })}
                  >
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Pricing & ROI */}
                <div className="space-y-2">
                  <Label>Price ($)</Label>
                  <Input type="number" value={newWorkflow.price} onChange={e => setNewWorkflow({ ...newWorkflow, price: e.target.value })} placeholder="0.00" />
                </div>

                <div className="space-y-2">
                  <Label>ROI Percentage (%)</Label>
                  <Input type="number" value={newWorkflow.roi_percentage} onChange={e => setNewWorkflow({ ...newWorkflow, roi_percentage: e.target.value })} placeholder="300" />
                </div>

                {/* Time Saved */}
                <div className="space-y-2">
                  <Label>Time Saved (Value)</Label>
                  <div className="flex gap-2">
                    <Input type="number" className="flex-1" value={newWorkflow.time_saved_value} onChange={e => setNewWorkflow({ ...newWorkflow, time_saved_value: e.target.value })} placeholder="10" />
                    <Select value={newWorkflow.time_saved_unit} onValueChange={(val) => setNewWorkflow({ ...newWorkflow, time_saved_unit: val })}>
                      <SelectTrigger className="w-[100px]"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hours">Hours</SelectItem>
                        <SelectItem value="days">Days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Metrics */}
                <div className="col-span-2 grid grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg border border-dashed">
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground uppercase">Nodes Count</Label>
                    <Input type="number" value={newWorkflow.nodes_count} onChange={e => setNewWorkflow({ ...newWorkflow, nodes_count: e.target.value })} placeholder="12" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground uppercase">User Count</Label>
                    <Input type="number" value={newWorkflow.user_count} onChange={e => setNewWorkflow({ ...newWorkflow, user_count: e.target.value })} placeholder="5200" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground uppercase">Rating (0-5)</Label>
                    <Input type="number" step="0.1" max="5" value={newWorkflow.rating} onChange={e => setNewWorkflow({ ...newWorkflow, rating: e.target.value })} placeholder="4.8" />
                  </div>
                </div>

                {/* Features Input */}
                <div className="col-span-2 space-y-2">
                  <Label>Features</Label>
                  <div className="flex gap-2">
                    <Input
                      value={newWorkflow.featureInput}
                      onChange={e => setNewWorkflow({ ...newWorkflow, featureInput: e.target.value })}
                      placeholder="Add a feature..."
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                    />
                    <Button type="button" variant="outline" onClick={addFeature}><Plus className="w-4 h-4" /></Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {newWorkflow.workflow_features.map((feat, idx) => (
                      <Badge key={idx} variant="secondary" className="pr-1">
                        {feat}
                        <button onClick={() => setNewWorkflow(prev => ({ ...prev, workflow_features: prev.workflow_features.filter((_, i) => i !== idx) }))} className="ml-2 hover:text-red-500">
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* JSON Configuration & File Upload */}
                <div className="col-span-2 space-y-4 border-t pt-4 mt-2">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <FileJson className="w-4 h-4" /> Upload JSON File (Optional)
                    </Label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="file"
                        accept=".json"
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          setNewWorkflow(prev => ({ ...prev, json_file: file }));
                        }}
                      />
                    </div>
                    <p className="text-[10px] text-muted-foreground">Uploading a file will override the text area below during processing.</p>
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Code className="w-4 h-4" /> JSON Data / Configuration
                    </Label>
                    <Textarea
                      className="font-mono text-xs"
                      value={newWorkflow.json_data_str}
                      onChange={e => setNewWorkflow({ ...newWorkflow, json_data_str: e.target.value })}
                      placeholder='{"trigger": "...", "steps": []}'
                      rows={10}
                    />
                  </div>
                </div>

                {/* --- Advanced SEO Fields (Shown ONLY in Edit Mode) --- */}
                {editingId && (
                  <div className="col-span-2 mt-4 pt-6 border-t border-border space-y-6">
                    <div className="pb-2">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Search className="w-5 h-5 text-primary" /> Advanced SEO Settings
                      </h3>
                      <p className="text-sm text-muted-foreground">Manage dedicated SEO properties for this workflow.</p>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="seo-title">SEO Title</Label>
                      <Input
                        id="seo-title"
                        value={newWorkflow.seo_title}
                        onChange={(e) => setNewWorkflow({ ...newWorkflow, seo_title: e.target.value })}
                        placeholder="SEO specific title"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="seo-description">SEO Description</Label>
                      <Textarea
                        id="seo-description"
                        value={newWorkflow.seo_description}
                        onChange={(e) => setNewWorkflow({ ...newWorkflow, seo_description: e.target.value })}
                        placeholder="SEO specific description"
                        rows={2}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="seo-keywords">SEO Keywords</Label>
                        <Input
                          id="seo-keywords"
                          value={newWorkflow.seo_keywords}
                          onChange={(e) => setNewWorkflow({ ...newWorkflow, seo_keywords: e.target.value })}
                          placeholder="keyword1, keyword2"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="seo-canonical">Canonical URL</Label>
                        <Input
                          id="seo-canonical"
                          value={newWorkflow.seo_canonical}
                          onChange={(e) => setNewWorkflow({ ...newWorkflow, seo_canonical: e.target.value })}
                          placeholder="https://example.com/canonical-url"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="seo-og-image">OG Image URL</Label>
                        <Input
                          id="seo-og-image"
                          value={newWorkflow.seo_og_image}
                          onChange={(e) => setNewWorkflow({ ...newWorkflow, seo_og_image: e.target.value })}
                          placeholder="https://example.com/image.png"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="seo-twitter">Twitter Card Type</Label>
                        <Input
                          id="seo-twitter"
                          value={newWorkflow.seo_twitter_card}
                          onChange={(e) => setNewWorkflow({ ...newWorkflow, seo_twitter_card: e.target.value })}
                          placeholder="summary_large_image"
                        />
                      </div>
                      <div className="grid gap-2 md:col-span-2">
                        <Label htmlFor="seo-twitter-site">Twitter Site Username</Label>
                        <Input
                          id="seo-twitter-site"
                          value={newWorkflow.seo_twitter_site}
                          onChange={(e) => setNewWorkflow({ ...newWorkflow, seo_twitter_site: e.target.value })}
                          placeholder="@username"
                        />
                      </div>
                    </div>
                  </div>
                )}

              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleSaveWorkflow} disabled={isSaving === 'save'}>
                  {isSaving === 'save' && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  {editingId ? 'Update Workflow' : 'Create Workflow'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Items', value: totalWorkflows, icon: Workflow, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Active', value: workflows.filter(w => w.status === 'published').length, icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
          { label: 'Avg Rating', value: workflows.length > 0 ? (workflows.reduce((sum, w) => sum + parseFloat(w.rating || '0'), 0) / workflows.length).toFixed(1) : '0.0', icon: Star, color: 'text-amber-500', bg: 'bg-amber-500/10' },
          { label: 'Total ROI', value: `${workflows.reduce((sum, w) => sum + (w.roiPercentage || 0), 0)}%`, icon: Activity, color: 'text-purple-500', bg: 'bg-purple-500/10' },
        ].map((stat, idx) => (
          <Card key={idx} className="p-4 border-none shadow-sm bg-card hover:bg-accent/50 transition-colors">
            <div className="flex items-center gap-4">
              <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", stat.bg)}>
                <stat.icon className={cn("w-6 h-6", stat.color)} />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="p-4 bg-card border-border shadow-sm">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
          <div className="relative flex-1 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            <Input
              placeholder="Search workflows by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-muted/50 border-transparent focus:bg-background focus:border-primary transition-all"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[200px] bg-muted/50 border-transparent focus:bg-background focus:border-primary transition-all">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <SelectValue placeholder="Filter Status" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Workflows</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Drafts</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Workflow List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
            <p className="text-muted-foreground">Loading workflows...</p>
          </div>
        ) : filteredWorkflows.map((workflow) => {
          const statusStyle = statusConfig[workflow.status] || statusConfig.draft;
          const StatusIcon = statusStyle.icon;

          return (
            <Card
              key={workflow.id}
              className="group bg-card border-border hover:border-primary/50 hover:shadow-md transition-all duration-300 ease-out overflow-hidden"
            >
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">

                  {/* Left Column: Icon & Info */}
                  <div className="flex items-start gap-5 flex-1 min-w-0">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center flex-shrink-0 shadow-inner">
                      <Workflow className="w-7 h-7 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1 space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-lg font-bold text-foreground truncate group-hover:text-primary transition-colors">
                          {workflow.name}
                        </h3>

                        <Badge variant="outline" className={cn("px-2.5 py-0.5 text-xs font-semibold capitalize border rounded-full flex items-center gap-1", statusStyle.bg, statusStyle.color)}>
                          <StatusIcon className="w-3 h-3" />
                          {statusStyle.label}
                        </Badge>

                        <Badge variant="secondary" className="text-xs bg-muted text-muted-foreground border-transparent">
                          <Gauge className="w-3 h-3 mr-1" />
                          {workflow.difficulty}
                        </Badge>
                        <Badge variant="secondary" className="text-xs bg-muted text-muted-foreground border-transparent">
                          ${workflow.price}
                        </Badge>
                        {workflow.categoryIds.length > 1 && (
                          <Badge variant="outline" className="text-xs border-dashed">
                            +{workflow.categoryIds.length - 1} more categories
                          </Badge>
                        )}
                      </div>

                      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                        {workflow.description}
                      </p>

                      {/* Node Pills */}
                      <div className="flex items-center gap-2 pt-2 flex-wrap">
                        <TooltipProvider>
                          {workflow.nodes.map((node, idx) => {
                            const config = nodeTypeConfig[node.type] || nodeTypeConfig.action;
                            const NodeIcon = config.icon;
                            return (
                              <div key={idx} className="flex items-center">
                                {idx > 0 && <ChevronRight className="w-3 h-3 text-muted-foreground/30 mx-1" />}
                                <Tooltip>
                                  <TooltipTrigger>
                                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-muted/50 hover:bg-muted rounded-md text-xs font-medium text-foreground transition-colors cursor-default border border-transparent hover:border-border">
                                      <NodeIcon className={cn("w-3.5 h-3.5", config.color)} />
                                      <span>{node.name}</span>
                                    </div>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Step {idx + 1}: {node.name}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                            );
                          })}
                        </TooltipProvider>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Metrics & Actions */}
                  <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-6 w-full lg:w-auto pt-4 lg:pt-0 border-t lg:border-t-0 border-dashed">

                    {/* Metrics */}
                    <div className="flex items-center gap-6 lg:gap-8">
                      <div className="text-left lg:text-right">
                        <div className="flex items-center lg:justify-end gap-1.5 text-sm font-medium text-purple-600 dark:text-purple-400">
                          <Sparkles className="w-4 h-4" />
                          {workflow.roiPercentage}%
                        </div>
                        <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">ROI</p>
                      </div>

                      <div className="text-left lg:text-right">
                        <div className="flex items-center lg:justify-end gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400">
                          <Timer className="w-4 h-4" />
                          {workflow.timeSavedValue} {workflow.timeSavedUnit}
                        </div>
                        <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Saved</p>
                      </div>

                      <div className="text-left lg:text-right">
                        <div className="flex items-center lg:justify-end gap-1.5 text-sm font-bold text-amber-500">
                          <Star className="w-4 h-4 fill-amber-500" />
                          {workflow.rating}
                        </div>
                        <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Rating</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      <Button
                        variant={workflow.status === 'published' ? "secondary" : "default"}
                        size="sm"
                        onClick={() => toggleWorkflowStatus(workflow.id as string)}
                        disabled={isSaving === workflow.id}
                        className={cn("w-28 shadow-sm", workflow.status !== 'published' && "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0")}
                      >
                        {isSaving === workflow.id ? (
                          <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" />
                        ) : workflow.status === 'published' ? (
                          <><Pause className="w-3.5 h-3.5 mr-2" /> Pause</>
                        ) : (
                          <><Play className="w-3.5 h-3.5 mr-2" /> Publish</>
                        )}
                      </Button>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-muted">
                            <MoreVertical className="w-4 h-4 text-muted-foreground" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() => handleEditWorkflow(workflow)}
                          >
                            <Edit className="w-4 h-4 mr-2" /> Edit
                          </DropdownMenuItem>

                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600 cursor-pointer focus:text-red-600 focus:bg-red-50"
                            onClick={() => deleteWorkflow(workflow)}
                          >
                            <Trash2 className="w-4 h-4 mr-2" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                  </div>
                </div>
              </div>
            </Card>
          );
        })}

        {!isLoading && filteredWorkflows.length === 0 && (
          <div className="text-center py-16 bg-muted/20 border-2 border-dashed border-muted rounded-xl">
            <Workflow className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-foreground">No workflows found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your filters or search terms.</p>
            <Button variant="outline" onClick={() => { setSearchQuery(''); setStatusFilter('all') }}>Clear Filters</Button>
          </div>
        )}

        {/* Load More & Pagination States */}
        {!isLoading && !isFiltering && currentPage < lastPage && (
          <div className="flex flex-col items-center justify-center pt-8 pb-12">
            <div className="text-sm text-muted-foreground mb-4">
              Showing {workflows.length} of {totalWorkflows} workflows
            </div>
            <Button
              variant="outline"
              size="lg"
              onClick={handleLoadMore}
              disabled={isLoadingMore}
              className="min-w-[200px] border-primary/20 hover:border-primary hover:bg-primary/5 transition-all shadow-sm"
            >
              {isLoadingMore ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Loading More...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Load More Workflows
                </>
              )}
            </Button>
          </div>
        )}

        {/* All Loaded State */}
        {!isLoading && !isFiltering && currentPage >= lastPage && workflows.length > 0 && (
          <div className="text-center py-10 opacity-50">
            <div className="inline-flex items-center gap-2 text-sm font-medium">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              All {totalWorkflows} workflows loaded
            </div>
          </div>
        )}

      </div>

      {/* Categories Management Modal */}
      <Dialog open={isCategoriesDialogOpen} onOpenChange={setIsCategoriesDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Manage Workflow Categories</DialogTitle>
            <DialogDescription>Create, edit, and manage workflow categories</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Category Form */}
            <Card className="p-4 bg-muted/30 border-border">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold">{isEditingCategory ? 'Edit Category' : 'New Category'}</h3>
                  {isEditingCategory && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setIsEditingCategory(null);
                        setNewCategory({ title: '', icon: 'lucide-share-2', badge_text: '', sort_order: '', is_active: true });
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Input
                    placeholder="Category Title"
                    value={newCategory.title}
                    onChange={e => setNewCategory({ ...newCategory, title: e.target.value })}
                  />
                  <Input
                    placeholder="Badge Text (e.g. Popular)"
                    value={newCategory.badge_text}
                    onChange={e => setNewCategory({ ...newCategory, badge_text: e.target.value })}
                  />
                  <Input
                    type="number"
                    placeholder="Sort Order"
                    value={newCategory.sort_order}
                    onChange={e => setNewCategory({ ...newCategory, sort_order: e.target.value })}
                  />
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={newCategory.is_active}
                      onChange={e => setNewCategory({ ...newCategory, is_active: e.target.checked })}
                      className="w-4 h-4 rounded"
                    />
                    Active
                  </label>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={handleSaveCategory}
                    disabled={isSaving === 'category'}
                  >
                    {isSaving === 'category' && <Loader2 className="w-3 h-3 mr-2 animate-spin" />}
                    {isEditingCategory ? 'Update' : 'Add'} Category
                  </Button>
                  {isEditingCategory && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setIsEditingCategory(null);
                        setNewCategory({ title: '', icon: 'lucide-share-2', badge_text: '', sort_order: '', is_active: true });
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </div>
            </Card>

            {/* Search */}
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search categories..."
                value={categorySearchQuery}
                onChange={e => setCategorySearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Categories List */}
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {filteredCategories.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <FolderOpen className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No categories found</p>
                </div>
              ) : (
                filteredCategories.map(cat => (
                  <div key={cat.id} className="flex items-center justify-between p-3 bg-card border border-border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-sm font-medium">{cat.title}</h4>
                        {cat.badge_text && <Badge variant="secondary" className="text-xs">{cat.badge_text}</Badge>}
                        <Badge variant="outline" className={cn('text-xs', cat.is_active ? 'bg-emerald-100 border-emerald-200 text-emerald-700' : 'bg-slate-100 border-slate-200 text-slate-600')}>
                          {cat.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Sort: {cat.sort_order}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEditCategory(cat)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleDeleteCategory(cat.id)}
                        disabled={isSaving === cat.id}
                      >
                        {isSaving === cat.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCategoriesDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

