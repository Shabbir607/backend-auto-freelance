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
import { PaginationControls } from '@/components/ui/pagination-controls';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
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
import { PaginatedResponse } from '@/lib/apiConfig';
import { FAQ, FAQFormData, faqService } from '@/services/faqService';
import { Edit, HelpCircle, Loader2, Plus, Search, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

const initialFormData: FAQFormData = {
  question: '',
  answer: '',
  faqable_type: 'page',
  faqable_id: 1,
  status: true,
  sort_order: 1,
};

export default function FAQManagement() {
  const { showToast } = useToast();
  const { confirm } = useConfirmation();

  const [paginatedData, setPaginatedData] = useState<PaginatedResponse<FAQ> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState<FAQFormData>(initialFormData);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(15);

  useEffect(() => {
    loadFAQs();
  }, [currentPage, perPage]);

  const loadFAQs = async () => {
    setIsLoading(true);
    try {
      const response = await faqService.listFAQs(currentPage, perPage);
      if (response.success) {
        setPaginatedData(response.data);
      }
    } catch (error) {
      console.error('Failed to load FAQs:', error);
      showToast('Failed to load FAQs', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenDialog = (faq?: FAQ) => {
    if (faq) {
      setEditingId(faq.id);
      setFormData({
        question: faq.question,
        answer: faq.answer,
        faqable_type: faq.faqable_type.replace('App\\\\Models\\\\', '').toLowerCase(),
        faqable_id: faq.faqable_id,
        status: faq.status,
        sort_order: faq.sort_order,
      });
    } else {
      setEditingId(null);
      setFormData(initialFormData);
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingId(null);
    setFormData(initialFormData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.question.trim() || !formData.answer.trim()) {
      showToast('Question and answer are required', 'error');
      return;
    }

    setIsSaving(true);
    try {
      if (editingId) {
        await faqService.updateFAQ(editingId, formData);
        showToast('FAQ updated successfully', 'success');
      } else {
        await faqService.createFAQ(formData);
        showToast('FAQ created successfully', 'success');
      }
      await loadFAQs();
      handleCloseDialog();
    } catch (error) {
      console.error('Failed to save FAQ:', error);
      showToast(editingId ? 'Failed to update FAQ' : 'Failed to create FAQ', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmed = await confirm({
      title: 'Delete FAQ',
      description: 'Are you sure you want to delete this FAQ? This action cannot be undone.',
      confirmText: 'Delete',
      cancelText: 'Cancel',
    });

    if (!confirmed) return;

    try {
      await faqService.deleteFAQ(id);
      showToast('FAQ deleted successfully', 'success');
      await loadFAQs();
    } catch (error) {
      console.error('Failed to delete FAQ:', error);
      showToast('Failed to delete FAQ', 'error');
    }
  };

  const faqs = paginatedData?.data || [];
  const totalFAQs = paginatedData?.total || 0;
  
  const filteredFAQs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getFaqableTypeLabel = (type: string) => {
    const cleanType = type.replace('App\\\\Models\\\\', '');
    return cleanType.charAt(0).toUpperCase() + cleanType.slice(1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">FAQ Management</h1>
          <p className="text-nexus-muted mt-1">
            Manage frequently asked questions for your platform
          </p>
        </div>
        <Button onClick={() => handleOpenDialog()} className="gradient-primary">
          <Plus className="w-4 h-4 mr-2" />
          Add FAQ
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-nexus-card border-nexus-border">
          <CardHeader className="pb-3">
            <CardDescription>Total FAQs</CardDescription>
            <CardTitle className="text-3xl">{totalFAQs}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="bg-nexus-card border-nexus-border">
          <CardHeader className="pb-3">
            <CardDescription>Active FAQs</CardDescription>
            <CardTitle className="text-3xl">
              {faqs.filter((f) => f.status).length}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className="bg-nexus-card border-nexus-border">
          <CardHeader className="pb-3">
            <CardDescription>Inactive FAQs</CardDescription>
            <CardTitle className="text-3xl">
              {faqs.filter((f) => !f.status).length}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Search & Filters */}
      <Card className="bg-nexus-card border-nexus-border">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-nexus-muted w-4 h-4" />
            <Input
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* FAQs Table */}
      <Card className="bg-nexus-card border-nexus-border">
        <CardContent className="pt-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-nexus-blue" />
            </div>
          ) : filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <HelpCircle className="w-12 h-12 mx-auto text-nexus-muted mb-4" />
              <h3 className="text-lg font-medium mb-2">No FAQs found</h3>
              <p className="text-nexus-muted mb-4">
                {searchQuery
                  ? 'Try adjusting your search query'
                  : 'Get started by creating your first FAQ'}
              </p>
              {!searchQuery && (
                <Button onClick={() => handleOpenDialog()} variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Add FAQ
                </Button>
              )}
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Question</TableHead>
                    <TableHead>Answer</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Sort Order</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFAQs.map((faq) => (
                    <TableRow key={faq.id}>
                      <TableCell className="font-medium max-w-xs">
                        {faq.question}
                      </TableCell>
                      <TableCell className="max-w-md">
                        <p className="line-clamp-2 text-nexus-muted">
                          {faq.answer}
                        </p>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {getFaqableTypeLabel(faq.faqable_type)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={faq.status ? 'default' : 'secondary'}
                          className={
                            faq.status
                              ? 'bg-emerald-500/20 text-emerald-500 border-emerald-500/30'
                              : 'bg-slate-500/20 text-slate-500 border-slate-500/30'
                          }
                        >
                          {faq.status ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell>{faq.sort_order}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleOpenDialog(faq)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(faq.id)}
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

              {/* Universal Pagination */}
              <PaginationControls
                data={paginatedData}
                onPageChange={setCurrentPage}
                onPerPageChange={(newPerPage) => {
                  setPerPage(newPerPage);
                  setCurrentPage(1); // Reset to first page when changing per page
                }}
                isLoading={isLoading}
                showFirstLastButtons
                showPageInfo
                showPerPageSelector
              />
            </>
          )}
        </CardContent>
      </Card>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-nexus-card border-nexus-border max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingId ? 'Edit FAQ' : 'Create FAQ'}</DialogTitle>
            <DialogDescription>
              {editingId
                ? 'Update the FAQ details below'
                : 'Add a new frequently asked question'}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="question">Question *</Label>
              <Input
                id="question"
                value={formData.question}
                onChange={(e) =>
                  setFormData({ ...formData, question: e.target.value })
                }
                placeholder="Enter the question"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="answer">Answer *</Label>
              <Textarea
                id="answer"
                value={formData.answer}
                onChange={(e) =>
                  setFormData({ ...formData, answer: e.target.value })
                }
                placeholder="Enter the answer"
                rows={5}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="faqable_type">Type</Label>
                <Select
                  value={formData.faqable_type}
                  onValueChange={(value) =>
                    setFormData({ ...formData, faqable_type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="page">Page</SelectItem>
                    <SelectItem value="blog">Blog</SelectItem>
                    <SelectItem value="workflow">Workflow</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="faqable_id">Related ID</Label>
                <Input
                  id="faqable_id"
                  type="number"
                  value={formData.faqable_id}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      faqable_id: parseInt(e.target.value) || 1,
                    })
                  }
                  placeholder="Enter related ID"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sort_order">Sort Order</Label>
                <Input
                  id="sort_order"
                  type="number"
                  value={formData.sort_order}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      sort_order: parseInt(e.target.value) || 1,
                    })
                  }
                  placeholder="Enter sort order"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <div className="flex items-center space-x-2 h-10">
                  <Switch
                    id="status"
                    checked={formData.status}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, status: checked })
                    }
                  />
                  <Label htmlFor="status" className="!mt-0">
                    {formData.status ? 'Active' : 'Inactive'}
                  </Label>
                </div>
              </div>
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
                  <>{editingId ? 'Update FAQ' : 'Create FAQ'}</>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
