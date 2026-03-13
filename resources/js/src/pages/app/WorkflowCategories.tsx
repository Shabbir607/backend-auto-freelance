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
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/contexts/ToastContext';
import { cn } from '@/lib/utils';
import { workflowService } from '@/services/workflowService';
import {
  ArrowLeft,
  CheckCircle,
  Edit,
  FolderOpen,
  Loader2,
  MoreVertical,
  Plus,
  Search,
  Trash2
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// --- Interfaces ---

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

interface CategoryFormState {
  title: string;
  icon: string;
  badge_text: string;
  sort_order: string;
  is_active: boolean;
}

const initialFormState: CategoryFormState = {
  title: '',
  icon: 'lucide-share-2',
  badge_text: '',
  sort_order: '',
  is_active: true,
};

const lucideIcons = [
  'lucide-share-2',
  'lucide-bot',
  'lucide-mail',
  'lucide-calendar',
  'lucide-heart',
  'lucide-star',
  'lucide-zap',
  'lucide-filter',
  'lucide-send',
  'lucide-clock',
  'lucide-code',
  'lucide-activity',
];

export default function WorkflowCategories() {
  const { showToast } = useToast();
  const { confirm } = useConfirmation();
  const navigate = useNavigate();

  // UI State
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState<number | null>(null);

  // Data State
  const [categories, setCategories] = useState<WorkflowCategory[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newCategory, setNewCategory] = useState<CategoryFormState>(initialFormState);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setIsLoading(true);
    try {
      const response = await workflowService.listCategories();
      if (response.success && response.data.data) {
        const sorted = response.data.data.sort((a, b) => a.sort_order - b.sort_order);
        setCategories(sorted);
      }
    } catch (error) {
      console.error('Failed to load categories:', error);
      showToast('Failed to load categories', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredCategories = categories.filter((category) => {
    const matchesSearch = category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.badge_text.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const openCreateDialog = () => {
    setEditingId(null);
    setNewCategory(initialFormState);
    setIsCreateDialogOpen(true);
  };

  const openEditDialog = (category: WorkflowCategory) => {
    setEditingId(category.id);
    setNewCategory({
      title: category.title,
      icon: category.icon,
      badge_text: category.badge_text,
      sort_order: String(category.sort_order),
      is_active: category.is_active,
    });
    setIsCreateDialogOpen(true);
  };

  const handleSaveCategory = async () => {
    if (!newCategory.title) {
      showToast('Please enter a title', 'error');
      return;
    }

    setIsSaving(editingId || 0);
    try {
      const payload = {
        title: newCategory.title,
        icon: newCategory.icon,
        badge_text: newCategory.badge_text,
        sort_order: Number(newCategory.sort_order || 0),
        is_active: newCategory.is_active,
      };

      if (editingId) {
        await workflowService.updateCategory(editingId, payload);
        showToast('Category updated successfully', 'success');
      } else {
        await workflowService.createCategory(payload);
        showToast('Category created successfully', 'success');
      }

      await loadCategories();
      setIsCreateDialogOpen(false);
      setNewCategory(initialFormState);
      setEditingId(null);
    } catch (error) {
      console.error('Error saving category:', error);
      showToast(editingId ? 'Failed to update category' : 'Failed to create category', 'error');
    } finally {
      setIsSaving(null);
    }
  };

  const toggleCategoryStatus = async (categoryId: number) => {
    const category = categories.find(c => c.id === categoryId);
    if (!category) return;

    setIsSaving(categoryId);
    try {
      await workflowService.updateCategory(categoryId, { is_active: !category.is_active });
      setCategories(prev =>
        prev.map(c =>
          c.id === categoryId ? { ...c, is_active: !c.is_active } : c
        )
      );
      showToast(`Category ${!category.is_active ? 'activated' : 'deactivated'}`, 'success');
    } catch (error) {
      console.error('Error toggling category status:', error);
      showToast('Failed to update status', 'error');
    } finally {
      setIsSaving(null);
    }
  };

  const deleteCategory = async (category: WorkflowCategory) => {
    const confirmed = await confirm({
      title: 'Delete Category',
      description: `Are you sure you want to delete "${category.title}"? This action cannot be undone.`,
      confirmText: 'Delete',
      cancelText: 'Cancel',
      isDangerous: true,
    });

    if (!confirmed) return;

    setIsSaving(category.id);
    try {
      await workflowService.deleteCategory(category.id);
      setCategories(prev => prev.filter(c => c.id !== category.id));
      showToast('Category deleted successfully', 'success');
    } catch (error) {
      console.error('Error deleting category:', error);
      showToast('Failed to delete category', 'error');
    } finally {
      setIsSaving(null);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/app/workflows')}
            className="hover:bg-muted"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <FolderOpen className="w-6 h-6 text-primary" />
              </div>
              Workflow Categories
            </h1>
            <p className="text-muted-foreground mt-1 ml-1">Manage workflow categories and their settings.</p>
          </div>
        </div>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button
              size="lg"
              className="shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"
              onClick={openCreateDialog}
            >
              <Plus className="w-5 h-5 mr-2" />
              New Category
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Category' : 'Create New Category'}</DialogTitle>
              <DialogDescription>
                {editingId ? 'Update the category details below.' : 'Enter the details for your new workflow category.'}
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-4 py-4">
              {/* Title */}
              <div className="col-span-2 space-y-2">
                <Label>Category Title</Label>
                <Input
                  value={newCategory.title}
                  onChange={e => setNewCategory({ ...newCategory, title: e.target.value })}
                  placeholder="e.g. Social Media Automation"
                />
              </div>

              {/* Icon Selection */}
              <div className="col-span-2 space-y-2">
                <Label>Icon</Label>
                <div className="grid grid-cols-6 gap-2">
                  {lucideIcons.map(icon => (
                    <button
                      key={icon}
                      onClick={() => setNewCategory({ ...newCategory, icon })}
                      className={cn(
                        'p-3 rounded-lg border-2 transition-all hover:border-primary',
                        newCategory.icon === icon
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:bg-muted'
                      )}
                    >
                      <div className="text-sm">{icon.replace('lucide-', '')}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Badge Text */}
              <div className="space-y-2">
                <Label>Badge Text</Label>
                <Input
                  value={newCategory.badge_text}
                  onChange={e => setNewCategory({ ...newCategory, badge_text: e.target.value })}
                  placeholder="e.g. Popular"
                />
              </div>

              {/* Sort Order */}
              <div className="space-y-2">
                <Label>Sort Order</Label>
                <Input
                  type="number"
                  value={newCategory.sort_order}
                  onChange={e => setNewCategory({ ...newCategory, sort_order: e.target.value })}
                  placeholder="1"
                />
              </div>

              {/* Status */}
              <div className="col-span-2 space-y-2">
                <Label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={newCategory.is_active}
                    onChange={e => setNewCategory({ ...newCategory, is_active: e.target.checked })}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  Active
                </Label>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveCategory} disabled={isSaving !== null}>
                {isSaving !== null && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {editingId ? 'Update Category' : 'Create Category'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 border-none shadow-sm bg-card hover:bg-accent/50 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-blue-500/10">
              <FolderOpen className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Categories</p>
              <p className="text-2xl font-bold">{categories.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 border-none shadow-sm bg-card hover:bg-accent/50 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-emerald-500/10">
              <CheckCircle className="w-6 h-6 text-emerald-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active</p>
              <p className="text-2xl font-bold">{categories.filter(c => c.is_active).length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 border-none shadow-sm bg-card hover:bg-accent/50 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-slate-500/10">
              <Edit className="w-6 h-6 text-slate-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Inactive</p>
              <p className="text-2xl font-bold">{categories.filter(c => !c.is_active).length}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Search */}
      <Card className="p-4 bg-card border-border shadow-sm">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          <Input
            placeholder="Search categories by name or badge..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-muted/50 border-transparent focus:bg-background focus:border-primary transition-all"
          />
        </div>
      </Card>

      {/* Categories List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
            <p className="text-muted-foreground">Loading categories...</p>
          </div>
        ) : filteredCategories.map((category) => (
          <Card
            key={category.id}
            className="group bg-card border-border hover:border-primary/50 hover:shadow-md transition-all duration-300 ease-out p-6"
          >
            <div className="flex items-start justify-between gap-6">
              {/* Left Column */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                    {category.title}
                  </h3>

                  {category.badge_text && (
                    <Badge variant="secondary" className="text-xs bg-muted text-muted-foreground border-transparent">
                      {category.badge_text}
                    </Badge>
                  )}

                  <Badge
                    variant="outline"
                    className={cn(
                      'px-2.5 py-0.5 text-xs font-semibold',
                      category.is_active
                        ? 'bg-emerald-100 border-emerald-200 text-emerald-600'
                        : 'bg-slate-100 border-slate-200 text-slate-600'
                    )}
                  >
                    {category.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                </div>

                <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                  <p>Icon: <span className="font-mono text-foreground">{category.icon}</span></p>
                  <p>Sort Order: <span className="font-mono text-foreground">{category.sort_order}</span></p>
                  <p>Created: {new Date(category.created_at).toLocaleDateString()}</p>
                </div>
              </div>

              {/* Right Column: Actions */}
              <div className="flex items-center gap-2">
                <Button
                  variant={category.is_active ? 'secondary' : 'default'}
                  size="sm"
                  onClick={() => toggleCategoryStatus(category.id)}
                  disabled={isSaving === category.id}
                  className="w-28 shadow-sm"
                >
                  {isSaving === category.id ? (
                    <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" />
                  ) : (
                    <CheckCircle className="w-3.5 h-3.5 mr-2" />
                  )}
                  {category.is_active ? 'Active' : 'Inactive'}
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
                      onClick={() => openEditDialog(category)}
                    >
                      <Edit className="w-4 h-4 mr-2" /> Edit
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-red-600 cursor-pointer focus:text-red-600 focus:bg-red-50"
                      onClick={() => deleteCategory(category)}
                      disabled={isSaving === category.id}
                    >
                      <Trash2 className="w-4 h-4 mr-2" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </Card>
        ))}

        {!isLoading && filteredCategories.length === 0 && (
          <div className="text-center py-16 bg-muted/20 border-2 border-dashed border-muted rounded-xl">
            <FolderOpen className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-foreground">No categories found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your search terms or create a new category.</p>
            <Button variant="outline" onClick={() => setSearchQuery('')}>
              Clear Search
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
