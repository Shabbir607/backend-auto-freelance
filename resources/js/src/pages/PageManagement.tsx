import { useConfirmation } from '@/components/ConfirmationDialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/contexts/ToastContext';
import { Page, PageFormData, pageService } from '@/services/pageService';
import { Edit, FileText, Loader2, Plus, Search, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

const initialFormData: PageFormData = {
  title: '',
  slug: '',
  content: '',
  meta_title: '',
  meta_description: '',
  meta_keywords: '',
  meta_tags: {},
  og_image: '',
  is_active: true,
};

export default function PageManagement() {
  const { showToast } = useToast();
  const { confirm } = useConfirmation();

  const [pages, setPages] = useState<Page[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState<PageFormData>(initialFormData);
  const [metaTagsJson, setMetaTagsJson] = useState('{}');

  useEffect(() => {
    loadPages();
  }, []);

  const loadPages = async () => {
    setIsLoading(true);
    try {
      const response = await pageService.listPages();
      if (response.success) {
        setPages(response.data);
      }
    } catch (error) {
      console.error('Failed to load pages:', error);
      showToast('Failed to load pages', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenDialog = (page?: Page) => {
    if (page) {
      setEditingId(page.id);
      setFormData({
        title: page.title,
        slug: page.slug,
        content: page.content,
        meta_title: page.meta_title,
        meta_description: page.meta_description,
        meta_keywords: page.meta_keywords,
        meta_tags: page.meta_tags,
        og_image: page.og_image,
        is_active: page.is_active,
      });
      setMetaTagsJson(JSON.stringify(page.meta_tags, null, 2));
    } else {
      setEditingId(null);
      setFormData(initialFormData);
      setMetaTagsJson('{}');
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingId(null);
    setFormData(initialFormData);
    setMetaTagsJson('{}');
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (title: string) => {
    setFormData({ ...formData, title });
    // Auto-generate slug only when creating new page
    if (!editingId) {
      setFormData(prev => ({ ...prev, title, slug: generateSlug(title) }));
    } else {
      setFormData(prev => ({ ...prev, title }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.slug.trim()) {
      showToast('Title and slug are required', 'error');
      return;
    }

    // Validate meta_tags JSON
    let metaTags = {};
    try {
      metaTags = JSON.parse(metaTagsJson);
    } catch (e) {
      showToast('Invalid JSON in meta tags', 'error');
      return;
    }

    setIsSaving(true);
    try {
      const dataToSubmit = {
        ...formData,
        meta_tags: metaTags,
      };

      if (editingId) {
        await pageService.updatePage(editingId, dataToSubmit);
        showToast('Page updated successfully', 'success');
      } else {
        await pageService.createPage(dataToSubmit);
        showToast('Page created successfully', 'success');
      }
      await loadPages();
      handleCloseDialog();
    } catch (error) {
      console.error('Failed to save page:', error);
      showToast(editingId ? 'Failed to update page' : 'Failed to create page', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmed = await confirm({
      title: 'Delete Page',
      description: 'Are you sure you want to delete this page? This action cannot be undone.',
      confirmText: 'Delete',
      cancelText: 'Cancel',
    });

    if (!confirmed) return;

    try {
      await pageService.deletePage(id);
      showToast('Page deleted successfully', 'success');
      await loadPages();
    } catch (error) {
      console.error('Failed to delete page:', error);
      showToast('Failed to delete page', 'error');
    }
  };

  const filteredPages = pages.filter((page) =>
    page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    page.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
    page.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Page Management</h1>
          <p className="text-nexus-muted mt-1">
            Manage static pages for your website
          </p>
        </div>
        <Button onClick={() => handleOpenDialog()} className="gradient-primary">
          <Plus className="w-4 h-4 mr-2" />
          Add Page
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-nexus-card border-nexus-border">
          <CardHeader className="pb-3">
            <CardDescription>Total Pages</CardDescription>
            <CardTitle className="text-3xl">{pages.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="bg-nexus-card border-nexus-border">
          <CardHeader className="pb-3">
            <CardDescription>Active Pages</CardDescription>
            <CardTitle className="text-3xl">
              {pages.filter((p) => p.is_active).length}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className="bg-nexus-card border-nexus-border">
          <CardHeader className="pb-3">
            <CardDescription>Inactive Pages</CardDescription>
            <CardTitle className="text-3xl">
              {pages.filter((p) => !p.is_active).length}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Search */}
      <Card className="bg-nexus-card border-nexus-border">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-nexus-muted w-4 h-4" />
            <Input
              placeholder="Search pages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Pages Table */}
      <Card className="bg-nexus-card border-nexus-border">
        <CardContent className="pt-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-nexus-blue" />
            </div>
          ) : filteredPages.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 mx-auto text-nexus-muted mb-4" />
              <h3 className="text-lg font-medium mb-2">No pages found</h3>
              <p className="text-nexus-muted mb-4">
                {searchQuery
                  ? 'Try adjusting your search query'
                  : 'Get started by creating your first page'}
              </p>
              {!searchQuery && (
                <Button onClick={() => handleOpenDialog()} variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Page
                </Button>
              )}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Meta Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPages.map((page) => (
                  <TableRow key={page.id}>
                    <TableCell className="font-medium">{page.title}</TableCell>
                    <TableCell>
                      <code className="text-xs bg-nexus-border px-2 py-1 rounded">
                        {page.slug}
                      </code>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">
                      {page.meta_title}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={page.is_active ? 'default' : 'secondary'}
                        className={
                          page.is_active
                            ? 'bg-emerald-500/20 text-emerald-500 border-emerald-500/30'
                            : 'bg-slate-500/20 text-slate-500 border-slate-500/30'
                        }
                      >
                        {page.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-nexus-muted text-sm">
                      {new Date(page.updated_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOpenDialog(page)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(page.id)}
                          className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-nexus-card border-nexus-border max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingId ? 'Edit Page' : 'Create Page'}</DialogTitle>
            <DialogDescription>
              {editingId
                ? 'Update the page details below'
                : 'Add a new page to your website'}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Enter page title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug *</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({ ...formData, slug: e.target.value })
                  }
                  placeholder="page-slug"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content *</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                placeholder="Enter page content (HTML supported)"
                rows={6}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="meta_title">Meta Title</Label>
              <Input
                id="meta_title"
                value={formData.meta_title}
                onChange={(e) =>
                  setFormData({ ...formData, meta_title: e.target.value })
                }
                placeholder="SEO title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="meta_description">Meta Description</Label>
              <Textarea
                id="meta_description"
                value={formData.meta_description}
                onChange={(e) =>
                  setFormData({ ...formData, meta_description: e.target.value })
                }
                placeholder="SEO description"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="meta_keywords">Meta Keywords</Label>
              <Input
                id="meta_keywords"
                value={formData.meta_keywords}
                onChange={(e) =>
                  setFormData({ ...formData, meta_keywords: e.target.value })
                }
                placeholder="keyword1, keyword2, keyword3"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="og_image">OG Image URL</Label>
              <Input
                id="og_image"
                value={formData.og_image}
                onChange={(e) =>
                  setFormData({ ...formData, og_image: e.target.value })
                }
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="meta_tags">Meta Tags (JSON)</Label>
              <Textarea
                id="meta_tags"
                value={metaTagsJson}
                onChange={(e) => setMetaTagsJson(e.target.value)}
                placeholder='{"robots": "index,follow", "author": "Company Name"}'
                rows={4}
                className="font-mono text-sm"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, is_active: checked })
                }
              />
              <Label htmlFor="is_active" className="!mt-0">
                {formData.is_active ? 'Active' : 'Inactive'}
              </Label>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={handleCloseDialog}
                disabled={isSaving}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSaving} className="gradient-primary">
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {editingId ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  <>{editingId ? 'Update Page' : 'Create Page'}</>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
