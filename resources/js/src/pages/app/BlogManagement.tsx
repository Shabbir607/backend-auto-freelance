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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import { useToast } from '@/contexts/ToastContext';
import { cn } from '@/lib/utils';
import { adminBlogCategoryService, adminBlogService, Blog, BlogCategory } from '@/services/blogService';
import { formatDistanceToNow } from 'date-fns';
import {
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  Edit,
  Eye,
  FolderPlus,
  Loader2,
  MoreVertical,
  Plus,
  RefreshCw,
  Search,
  Tag,
  Trash2,
} from 'lucide-react';
import { useEffect, useState } from 'react';

// Extend the blog interface implicitly for the new fields if they aren't fully typed in your service
type ExtendedBlog = Blog & { slug?: string; seo?: any };

export default function BlogManagement() {
  const { showToast } = useToast();
  const [blogs, setBlogs] = useState<ExtendedBlog[]>([]);
  const [blogCategories, setBlogCategories] = useState<BlogCategory[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingDetails, setIsFetchingDetails] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalBlogs, setTotalBlogs] = useState(0);

  // Blog Form State
  const [showBlogDialog, setShowBlogDialog] = useState(false);
  const [editingBlog, setEditingBlog] = useState<ExtendedBlog | null>(null);
  const [blogForm, setBlogForm] = useState({
    category_id: 0,
    title: '',
    slug: '',
    description: '',
    content: '',
    image_url: '',
    meta_title: '',
    meta_description: '',
    meta_keywords: '',
    status: 'draft' as 'draft' | 'published' | 'scheduled',
    is_featured: false,
    published_at: '',
    // Advanced SEO fields
    seo_title: '',
    seo_description: '',
    seo_keywords: '',
    seo_canonical: '',
    seo_og_image: '',
    seo_twitter_card: '',
    seo_twitter_site: '',
  });
  const [isSavingBlog, setIsSavingBlog] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  // Category Form State
  const [showCategoryDialog, setShowCategoryDialog] = useState(false);
  const [categoryForm, setCategoryForm] = useState({
    title: '',
    description: '',
    meta_title: '',
    meta_description: '',
    meta_keywords: '',
    sort_order: 1,
    is_active: true,
  });
  const [isSavingCategory, setIsSavingCategory] = useState(false);

  // View Blog State
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [viewingBlog, setViewingBlog] = useState<ExtendedBlog | null>(null);

  // Fetch blogs from backend
  const fetchBlogs = async (page: number = 1) => {
    setIsLoading(true);
    try {
      const result = await adminBlogService.getAll(page, 20);
      if (result.success && result.data) {
        setBlogs(result.data.data);
        setCurrentPage(result.data.current_page);
        setTotalPages(result.data.last_page);
        setTotalBlogs(result.data.total);
      } else {
        showToast(result.message || 'Failed to fetch blogs', 'error');
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
      showToast('An error occurred while fetching blogs', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch blog categories
  const fetchCategories = async () => {
    try {
      const result = await adminBlogCategoryService.getAll();
      if (result.success && result.data && result.data.data) {
        setBlogCategories(result.data.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchBlogs();
    fetchCategories();
  }, []);

  // Search and filter blogs
  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const categoryId = selectedCategory !== 'All'
        ? blogCategories.find(c => c.title === selectedCategory)?.id
        : undefined;

      const result = await adminBlogService.search(searchQuery, {
        category_id: categoryId,
        status: selectedStatus,
        page: 1,
      });

      if (result.success && result.data) {
        setBlogs(result.data.data);
        setCurrentPage(result.data.current_page);
        setTotalPages(result.data.last_page);
        setTotalBlogs(result.data.total);
      } else {
        showToast(result.message || 'Search failed', 'error');
      }
    } catch (error) {
      console.error('Error searching blogs:', error);
      showToast('An error occurred while searching', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery || selectedCategory !== 'All' || selectedStatus !== 'all') {
        handleSearch();
      } else {
        fetchBlogs(1);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, selectedCategory, selectedStatus]);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;

    try {
      const result = await adminBlogService.delete(id);
      if (result.success) {
        setBlogs(blogs.filter(b => b.id !== id));
        showToast('Blog post deleted successfully', 'success');
      } else {
        showToast(result.message || 'Failed to delete blog post', 'error');
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
      showToast('An error occurred while deleting', 'error');
    }
  };

  // Open blog creation dialog
  const handleCreateBlog = () => {
    setEditingBlog(null);
    setImageFile(null);
    setImagePreview('');
    setBlogForm({
      category_id: blogCategories.length > 0 ? blogCategories[0].id : 0,
      title: '',
      slug: '',
      description: '',
      content: '',
      image_url: '',
      meta_title: '',
      meta_description: '',
      meta_keywords: '',
      status: 'draft',
      is_featured: false,
      published_at: '',
      seo_title: '',
      seo_description: '',
      seo_keywords: '',
      seo_canonical: '',
      seo_og_image: '',
      seo_twitter_card: '',
      seo_twitter_site: '',
    });
    setShowBlogDialog(true);
  };

  // Open blog edit dialog and fetch full details
  const handleEditBlog = async (blog: ExtendedBlog) => {
    setIsFetchingDetails(true);
    try {
      const baseUrl = import.meta.env.VITE_API_URL;
      const fetchUrl = baseUrl ? `${baseUrl}/blogs/${blog.slug || blog.id}` : `/api/blogs/${blog.slug || blog.id}`;

      const response = await fetch(fetchUrl, {
        headers: {
          'x-app-key': import.meta.env.VITE_FRONTEND_SECRET || '',
        },
      });
      const result = await response.json();

      const fullBlogData = result.success ? result.data : blog;
      const seoData = result.success ? result.seo : null;

      setEditingBlog(fullBlogData);
      setImageFile(null);
      setImagePreview('');

      // Populate form with all fields fetched from the API
      setBlogForm({
        category_id: fullBlogData.category_id || 0,
        title: fullBlogData.title || '',
        slug: fullBlogData.slug || '',
        description: fullBlogData.description || '',
        content: fullBlogData.content || '',
        image_url: fullBlogData.image_url || '',
        meta_title: fullBlogData.meta_title || '',
        meta_description: fullBlogData.meta_description || '',
        meta_keywords: fullBlogData.meta_keywords || '',
        status: fullBlogData.status || 'draft',
        is_featured: fullBlogData.is_featured || false,
        published_at: fullBlogData.published_at ? fullBlogData.published_at.slice(0, 16) : '',
        seo_title: seoData?.title || '',
        seo_description: seoData?.description || '',
        seo_keywords: seoData?.keywords || '',
        seo_canonical: seoData?.canonical || '',
        seo_og_image: seoData?.og_image || '',
        seo_twitter_card: seoData?.twitter_card || '',
        seo_twitter_site: seoData?.twitter_site || '',
      });
      setShowBlogDialog(true);
    } catch (error) {
      console.error('Error fetching full blog details:', error);
      showToast('Failed to fetch full blog details. Loading partial data.', 'error');

      // Fallback to the partial data from the grid
      setEditingBlog(blog);
      setImageFile(null);
      setImagePreview('');
      setBlogForm({
        category_id: blog.category_id,
        title: blog.title,
        slug: blog.slug || '',
        description: blog.description,
        content: blog.content,
        image_url: blog.image_url || '',
        meta_title: blog.meta_title,
        meta_description: blog.meta_description,
        meta_keywords: blog.meta_keywords,
        status: blog.status,
        is_featured: blog.is_featured,
        published_at: '',
        seo_title: '',
        seo_description: '',
        seo_keywords: '',
        seo_canonical: '',
        seo_og_image: '',
        seo_twitter_card: '',
        seo_twitter_site: '',
      });
      setShowBlogDialog(true);
    } finally {
      setIsFetchingDetails(false);
    }
  };

  // Save blog (create or update)
  const handleSaveBlog = async () => {
    if (!blogForm.title || !blogForm.description || !blogForm.content) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    if (!blogForm.category_id || blogForm.category_id === 0) {
      showToast('Please select a category', 'error');
      return;
    }

    setIsSavingBlog(true);
    try {
      let result;

      if (imageFile) {
        // Use FormData methods for file upload
        result = editingBlog
          ? await adminBlogService.updateWithImage(editingBlog.id, blogForm, imageFile)
          : await adminBlogService.createWithImage(blogForm, imageFile);
      } else {
        // Use regular JSON methods
        result = editingBlog
          ? await adminBlogService.update(editingBlog.id, blogForm)
          : await adminBlogService.create(blogForm);
      }

      if (result.success) {
        showToast(`Blog ${editingBlog ? 'updated' : 'created'} successfully`, 'success');
        setShowBlogDialog(false);
        setImageFile(null);
        setImagePreview('');
        fetchBlogs(currentPage);
      } else {
        showToast(result.message || 'Failed to save blog', 'error');
      }
    } catch (error) {
      console.error('Error saving blog:', error);
      showToast('An error occurred while saving', 'error');
    } finally {
      setIsSavingBlog(false);
    }
  };

  // Open category creation dialog
  const handleCreateCategory = () => {
    setCategoryForm({
      title: '',
      description: '',
      meta_title: '',
      meta_description: '',
      meta_keywords: '',
      sort_order: blogCategories.length + 1,
      is_active: true,
    });
    setShowCategoryDialog(true);
  };

  // Save category
  const handleSaveCategory = async () => {
    if (!categoryForm.title || !categoryForm.description) {
      showToast('Please fill in title and description', 'error');
      return;
    }

    setIsSavingCategory(true);
    try {
      const result = await adminBlogCategoryService.create(categoryForm);

      if (result.success) {
        showToast('Category created successfully', 'success');
        setShowCategoryDialog(false);
        fetchCategories();
      } else {
        showToast(result.message || 'Failed to create category', 'error');
      }
    } catch (error) {
      console.error('Error creating category:', error);
      showToast('An error occurred while creating category', 'error');
    } finally {
      setIsSavingCategory(false);
    }
  };

  // Open blog view dialog
  const handleViewBlog = (blog: ExtendedBlog) => {
    setViewingBlog(blog);
    setShowViewDialog(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const getStatusBadge = (status: Blog['status']) => {
    switch (status) {
      case 'published':
        return <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/30"><CheckCircle className="w-3 h-3 mr-1" />Published</Badge>;
      case 'draft':
        return <Badge className="bg-slate-500/10 text-slate-400 border-slate-500/30"><Edit className="w-3 h-3 mr-1" />Draft</Badge>;
      case 'scheduled':
        return <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/30"><Clock className="w-3 h-3 mr-1" />Scheduled</Badge>;
    }
  };

  const totalViews = blogs.reduce((sum, blog) => sum + blog.views, 0);
  const publishedCount = blogs.filter(b => b.status === 'published').length;

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto relative">
      {/* Loading overlay for fetching edit details */}
      {isFetchingDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/50 backdrop-blur-sm">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold mb-1 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary" />
            Blog Management
          </h1>
          <p className="text-muted-foreground text-sm">
            Create and manage your blog content
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleCreateCategory}>
            <FolderPlus className="w-4 h-4 mr-2" />
            New Category
          </Button>
          <Button variant="outline" onClick={() => fetchBlogs(currentPage)}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button className="bg-primary hover:bg-primary/90" onClick={handleCreateBlog}>
            <Plus className="w-4 h-4 mr-2" />
            New Article
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Posts', value: totalBlogs, icon: BookOpen, color: 'text-blue-500' },
          { label: 'Published', value: publishedCount, icon: CheckCircle, color: 'text-emerald-500' },
          { label: 'Total Views', value: totalViews.toLocaleString(), icon: Eye, color: 'text-purple-500' },
          { label: 'Categories', value: blogCategories.length, icon: Tag, color: 'text-pink-500' },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="p-4 bg-card border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className={cn("p-2.5 rounded-lg bg-muted", stat.color)}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Filters */}
      <Card className="p-4 bg-card border-border">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Categories</SelectItem>
              {blogCategories.map(cat => (
                <SelectItem key={cat.id} value={cat.title}>{cat.title}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-full md:w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Loading State */}
      {isLoading && (
        <Card className="p-12 bg-card border-border">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-primary mx-auto mb-4 animate-spin" />
            <p className="text-muted-foreground">Loading blogs...</p>
          </div>
        </Card>
      )}

      {/* Blog Posts Grid */}
      {!isLoading && blogs.length > 0 && (
        <div className="grid grid-cols-1 gap-4">
          {blogs.map((blog) => (
            <Card key={blog.id} className="bg-card border-border overflow-hidden hover:border-primary/30 transition-all duration-200">
              <div className="flex flex-col md:flex-row gap-4 p-4">
                {/* Featured Image */}
                <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                  {blog.image_url ? (
                    <img
                      src={blog.image_url}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <BookOpen className="w-12 h-12 text-muted-foreground" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold mb-1 truncate">{blog.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{blog.description}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="flex-shrink-0">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewBlog(blog)}>
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditBlog(blog)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-500" onClick={() => handleDelete(blog.id)}>
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-[10px]">
                        {(blog.author?.name || 'U').charAt(0).toUpperCase()}
                      </div>
                      <span>{blog.author?.name || 'Unknown'}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{formatDistanceToNow(new Date(blog.published_at || blog.created_at || Date.now()), { addSuffix: true })}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      <Tag className="w-3 h-3 mr-1" />
                      {blog.category?.title || 'Uncategorized'}
                    </Badge>
                    {getStatusBadge(blog.status)}
                    {blog.is_featured && (
                      <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/30 text-xs">
                        Featured
                      </Badge>
                    )}
                  </div>

                  {/* Stats */}
                  {blog.status === 'published' && (
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" />
                        <span>{blog.views.toLocaleString()} views</span>
                      </div>
                    </div>
                  )}

                  {/* Meta Keywords as Tags */}
                  {blog.meta_keywords && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {blog.meta_keywords.split(',').map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag.trim()}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {!isLoading && totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => fetchBlogs(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + 1;
              return (
                <Button
                  key={page}
                  variant={currentPage === page ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => fetchBlogs(page)}
                >
                  {page}
                </Button>
              );
            })}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => fetchBlogs(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && blogs.length === 0 && (
        <Card className="p-12 bg-card border-border">
          <div className="text-center">
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No articles found</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {searchQuery || selectedCategory !== 'All' || selectedStatus !== 'all'
                ? 'Try adjusting your filters'
                : 'Get started by creating your first article'}
            </p>
            <Button onClick={handleCreateBlog}>
              <Plus className="w-4 h-4 mr-2" />
              Create Article
            </Button>
          </div>
        </Card>
      )}

      {/* Blog Create/Edit Dialog */}
      <Dialog open={showBlogDialog} onOpenChange={setShowBlogDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingBlog ? 'Edit Article' : 'Create New Article'}</DialogTitle>
            <DialogDescription>
              {editingBlog ? 'Update the complete article details below' : 'Fill in the details to create a new blog article'}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* --- Standard Base Fields --- */}
            <div className="grid gap-2">
              <Label htmlFor="blog-category">Category *</Label>
              <Select
                value={blogForm.category_id.toString()}
                onValueChange={(value) => setBlogForm({ ...blogForm, category_id: parseInt(value) })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {blogCategories.map(cat => (
                    <SelectItem key={cat.id} value={cat.id.toString()}>{cat.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="blog-title">Title *</Label>
              <Input
                id="blog-title"
                value={blogForm.title}
                onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                placeholder="Enter article title"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="blog-description">Description *</Label>
              <Textarea
                id="blog-description"
                value={blogForm.description}
                onChange={(e) => setBlogForm({ ...blogForm, description: e.target.value })}
                placeholder="Brief description of the article"
                rows={3}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="blog-content">Content *</Label>
              <Textarea
                id="blog-content"
                value={blogForm.content}
                onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                placeholder="Full article content (HTML supported)"
                rows={8}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="blog-image">Featured Image (Upload)</Label>
              <Input
                id="blog-image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="cursor-pointer"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="blog-image-url">Or Image URL</Label>
              <Input
                id="blog-image-url"
                type="text"
                value={blogForm.image_url}
                onChange={(e) => setBlogForm({ ...blogForm, image_url: e.target.value })}
                placeholder="https://example.com/image.jpg"
              />

              {(imagePreview || blogForm.image_url) && (
                <div className="mt-2">
                  <img
                    src={imagePreview || blogForm.image_url}
                    alt="Preview"
                    className="w-full max-w-sm h-40 object-cover rounded-lg border border-border"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                    onLoad={(e) => {
                      (e.target as HTMLImageElement).style.display = 'block';
                    }}
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="blog-status">Status</Label>
                <Select
                  value={blogForm.status}
                  onValueChange={(value: 'draft' | 'published' | 'scheduled') => setBlogForm({ ...blogForm, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2 pt-8">
                <input
                  type="checkbox"
                  id="blog-featured"
                  checked={blogForm.is_featured}
                  onChange={(e) => setBlogForm({ ...blogForm, is_featured: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-300"
                />
                <Label htmlFor="blog-featured" className="cursor-pointer">Featured Article</Label>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="blog-meta-title">Meta Title (Basic SEO)</Label>
              <Input
                id="blog-meta-title"
                value={blogForm.meta_title}
                onChange={(e) => setBlogForm({ ...blogForm, meta_title: e.target.value })}
                placeholder="Basic SEO meta title"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="blog-meta-description">Meta Description (Basic SEO)</Label>
              <Textarea
                id="blog-meta-description"
                value={blogForm.meta_description}
                onChange={(e) => setBlogForm({ ...blogForm, meta_description: e.target.value })}
                placeholder="Basic SEO meta description"
                rows={2}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="blog-meta-keywords">Meta Keywords (Basic SEO)</Label>
              <Input
                id="blog-meta-keywords"
                value={blogForm.meta_keywords}
                onChange={(e) => setBlogForm({ ...blogForm, meta_keywords: e.target.value })}
                placeholder="keyword1, keyword2, keyword3"
              />
            </div>

            {/* --- Advanced Fields (Shown ONLY in Edit Mode) --- */}
            {editingBlog && (
              <div className="mt-4 pt-6 border-t border-border space-y-6">
                <div className="pb-2">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Edit className="w-5 h-5 text-primary" /> Advanced Edit Fields
                  </h3>
                  <p className="text-sm text-muted-foreground">Modify advanced URL settings and publish timings.</p>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="blog-slug">Slug (URL Route)</Label>
                  <Input
                    id="blog-slug"
                    value={blogForm.slug}
                    onChange={(e) => setBlogForm({ ...blogForm, slug: e.target.value })}
                    placeholder="e.g. your-article-slug"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="blog-published-at">Published At</Label>
                  <Input
                    id="blog-published-at"
                    type="datetime-local"
                    value={blogForm.published_at}
                    onChange={(e) => setBlogForm({ ...blogForm, published_at: e.target.value })}
                  />
                </div>

                <div className="pb-2 mt-4 border-t border-border pt-6">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Search className="w-5 h-5 text-primary" /> Advanced SEO Settings
                  </h3>
                  <p className="text-sm text-muted-foreground">Manage dedicated SEO properties for this blog.</p>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="seo-title">SEO Title</Label>
                  <Input
                    id="seo-title"
                    value={blogForm.seo_title}
                    onChange={(e) => setBlogForm({ ...blogForm, seo_title: e.target.value })}
                    placeholder="SEO specific title"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="seo-description">SEO Description</Label>
                  <Textarea
                    id="seo-description"
                    value={blogForm.seo_description}
                    onChange={(e) => setBlogForm({ ...blogForm, seo_description: e.target.value })}
                    placeholder="SEO specific description"
                    rows={2}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="seo-keywords">SEO Keywords</Label>
                    <Input
                      id="seo-keywords"
                      value={blogForm.seo_keywords}
                      onChange={(e) => setBlogForm({ ...blogForm, seo_keywords: e.target.value })}
                      placeholder="keyword1, keyword2"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="seo-canonical">Canonical URL</Label>
                    <Input
                      id="seo-canonical"
                      value={blogForm.seo_canonical}
                      onChange={(e) => setBlogForm({ ...blogForm, seo_canonical: e.target.value })}
                      placeholder="https://example.com/canonical-url"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="seo-og-image">OG Image URL</Label>
                    <Input
                      id="seo-og-image"
                      value={blogForm.seo_og_image}
                      onChange={(e) => setBlogForm({ ...blogForm, seo_og_image: e.target.value })}
                      placeholder="https://example.com/image.png"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="seo-twitter">Twitter Card Type</Label>
                    <Input
                      id="seo-twitter"
                      value={blogForm.seo_twitter_card}
                      onChange={(e) => setBlogForm({ ...blogForm, seo_twitter_card: e.target.value })}
                      placeholder="summary_large_image"
                    />
                  </div>
                  <div className="grid gap-2 md:col-span-2">
                    <Label htmlFor="seo-twitter-site">Twitter Site Username</Label>
                    <Input
                      id="seo-twitter-site"
                      value={blogForm.seo_twitter_site}
                      onChange={(e) => setBlogForm({ ...blogForm, seo_twitter_site: e.target.value })}
                      placeholder="@username"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBlogDialog(false)} disabled={isSavingBlog}>
              Cancel
            </Button>
            <Button onClick={handleSaveBlog} disabled={isSavingBlog}>
              {isSavingBlog ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                editingBlog ? 'Update Article' : 'Create Article'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Category Create Dialog */}
      <Dialog open={showCategoryDialog} onOpenChange={setShowCategoryDialog}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Create New Category</DialogTitle>
            <DialogDescription>
              Add a new blog category to organize your articles
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="cat-title">Category Title *</Label>
              <Input
                id="cat-title"
                value={categoryForm.title}
                onChange={(e) => setCategoryForm({ ...categoryForm, title: e.target.value })}
                placeholder="Enter category title"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="cat-description">Description *</Label>
              <Textarea
                id="cat-description"
                value={categoryForm.description}
                onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                placeholder="Brief description of this category"
                rows={3}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="cat-meta-title">Meta Title (SEO)</Label>
              <Input
                id="cat-meta-title"
                value={categoryForm.meta_title}
                onChange={(e) => setCategoryForm({ ...categoryForm, meta_title: e.target.value })}
                placeholder="SEO meta title"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="cat-meta-description">Meta Description (SEO)</Label>
              <Textarea
                id="cat-meta-description"
                value={categoryForm.meta_description}
                onChange={(e) => setCategoryForm({ ...categoryForm, meta_description: e.target.value })}
                placeholder="SEO meta description"
                rows={2}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="cat-meta-keywords">Meta Keywords (SEO)</Label>
              <Input
                id="cat-meta-keywords"
                value={categoryForm.meta_keywords}
                onChange={(e) => setCategoryForm({ ...categoryForm, meta_keywords: e.target.value })}
                placeholder="keyword1, keyword2, keyword3"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="cat-sort-order">Sort Order</Label>
                <Input
                  id="cat-sort-order"
                  type="number"
                  value={categoryForm.sort_order}
                  onChange={(e) => setCategoryForm({ ...categoryForm, sort_order: parseInt(e.target.value) || 1 })}
                />
              </div>

              <div className="flex items-center space-x-2 pt-8">
                <input
                  type="checkbox"
                  id="cat-active"
                  checked={categoryForm.is_active}
                  onChange={(e) => setCategoryForm({ ...categoryForm, is_active: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-300"
                />
                <Label htmlFor="cat-active" className="cursor-pointer">Active</Label>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCategoryDialog(false)} disabled={isSavingCategory}>
              Cancel
            </Button>
            <Button onClick={handleSaveCategory} disabled={isSavingCategory}>
              {isSavingCategory ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Category'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Blog Dialog */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{viewingBlog?.title}</DialogTitle>
            <DialogDescription>
              <div className="flex flex-wrap items-center gap-3 mt-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-xs">
                    {(viewingBlog?.author?.name || 'U').charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm">{viewingBlog?.author?.name || 'Unknown Author'}</span>
                </div>
                <span className="text-sm text-muted-foreground">•</span>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span className="text-sm">
                    {viewingBlog?.published_at
                      ? formatDistanceToNow(new Date(viewingBlog.published_at), { addSuffix: true })
                      : formatDistanceToNow(new Date(viewingBlog?.created_at || Date.now()), { addSuffix: true })}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">•</span>
                <Badge variant="outline" className="text-xs">
                  {viewingBlog?.category?.title || 'Uncategorized'}
                </Badge>
                {viewingBlog?.is_featured && (
                  <>
                    <span className="text-sm text-muted-foreground">•</span>
                    <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/30 text-xs">
                      Featured
                    </Badge>
                  </>
                )}
              </div>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Featured Image */}
            {viewingBlog?.image_url && (
              <div className="w-full h-64 rounded-lg overflow-hidden bg-muted">
                <img
                  src={viewingBlog.image_url}
                  alt={viewingBlog.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Description */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase">Description</h3>
              <p className="text-base">{viewingBlog?.description}</p>
            </div>

            {/* Content */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase">Content</h3>
              <div
                className="prose prose-sm dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: viewingBlog?.content || '' }}
              />
            </div>

            {/* Meta Keywords */}
            {viewingBlog?.meta_keywords && (
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {viewingBlog.meta_keywords.split(',').map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag.trim()}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Stats */}
            {viewingBlog?.status === 'published' && (
              <div className="flex items-center gap-6 pt-4 border-t">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{viewingBlog?.views?.toLocaleString() || 0} views</span>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(viewingBlog.status)}
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowViewDialog(false)}>
              Close
            </Button>
            <Button onClick={() => {
              setShowViewDialog(false);
              if (viewingBlog) handleEditBlog(viewingBlog);
            }}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Article
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}