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
import { Course, courseService } from '@/services/courseService';
import { BookOpen, Edit, Loader2, Plus, Search, Trash2, Settings } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const initialFormData = {
    title: '',
    slug: '',
    description: '',
    level: 'beginner',
    is_published: false,
    seo_title: '',
    seo_description: '',
    seo_keywords: '',
    seo_meta_tags: '',
    seo_canonical_url: '',
};

export default function AdminCoursesPage() {
    const { showToast } = useToast();
    const { confirm } = useConfirmation();
    const navigate = useNavigate();

    const [courses, setCourses] = useState<Course[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [formData, setFormData] = useState(initialFormData);

    // File and preview states
    const [ogImageFile, setOgImageFile] = useState<File | null>(null);
    const [ogImagePreviewUrl, setOgImagePreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        loadCourses();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Cleanup object URLs to prevent memory leaks
    useEffect(() => {
        return () => {
            if (ogImagePreviewUrl) URL.revokeObjectURL(ogImagePreviewUrl);
        };
    }, [ogImagePreviewUrl]);

    const loadCourses = async () => {
        setIsLoading(true);
        try {
            const response = await courseService.getAdminCourses();
            if (response.success && response.data) {
                setCourses(response.data.data);
            }
        } catch (error) {
            console.error('Failed to load courses:', error);
            showToast('Failed to load courses', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenDialog = (course?: Course) => {
        // Reset previews and files
        setOgImageFile(null);
        setOgImagePreviewUrl(null);

        if (course) {
            setEditingId(course.id);
            setFormData({
                title: course.title || '',
                slug: course.slug || '',
                description: course.description || '',
                level: course.level || 'beginner',
                is_published: course.is_published || false,
                seo_title: course.seo?.title || course.seo_title || '',
                seo_description: course.seo?.description || course.seo_description || '',
                seo_keywords: course.seo?.keywords || course.seo_keywords || '',
                seo_meta_tags: course.seo?.meta_tags || course.seo_meta_tags || '',
                seo_canonical_url: course.seo?.canonical_url || course.seo_canonical_url || '',
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
        setOgImageFile(null);
        setOgImagePreviewUrl(null);
    };

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    };

    const handleTitleChange = (title: string) => {
        setFormData({ ...formData, title });
        if (!editingId) {
            setFormData((prev) => ({ ...prev, title, slug: generateSlug(title) }));
        } else {
            setFormData((prev) => ({ ...prev, title }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title?.trim() || !formData.slug?.trim()) {
            showToast('Title and slug are required', 'error');
            return;
        }

        setIsSaving(true);
        try {
            const submitData = new FormData();



            // Append all fields unconditionally
            Object.entries(formData).forEach(([key, value]) => {
                if (typeof value === 'boolean') {
                    submitData.append(key, value ? '1' : '0');
                } else {
                    submitData.append(key, value !== null && value !== undefined ? String(value) : '');
                }
            });

            if (ogImageFile) {
                submitData.append('og_image', ogImageFile);
            }

            // IMPORTANT: If you are using axios/fetch in courseService, ensure that for BOTH 
            // createCourse and updateCourse, you send a POST request when using FormData.
            if (editingId) {
                await courseService.updateCourse(editingId, submitData);
                showToast('Course updated successfully', 'success');
            } else {
                await courseService.createCourse(submitData);
                showToast('Course created successfully', 'success');
            }
            await loadCourses();
            handleCloseDialog();
        } catch (error) {
            console.error('Failed to save course:', error);
            showToast(editingId ? 'Failed to update course' : 'Failed to create course', 'error');
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: number) => {
        const confirmed = await confirm({
            title: 'Delete Course',
            description: 'Are you sure you want to delete this course? This action cannot be undone and will delete all modules and lessons.',
            confirmText: 'Delete',
            cancelText: 'Cancel',
        });

        if (!confirmed) return;

        try {
            await courseService.deleteCourse(id);
            showToast('Course deleted successfully', 'success');
            await loadCourses();
        } catch (error) {
            console.error('Failed to delete course:', error);
            showToast('Failed to delete course', 'error');
        }
    };

    const handleTogglePublish = async (id: number) => {
        try {
            await courseService.togglePublishCourse(id);
            showToast('Course publish status updated', 'success');
            await loadCourses();
        } catch (error) {
            console.error('Failed to toggle publish status:', error);
            showToast('Failed to update status', 'error');
        }
    };

    const filteredCourses = courses.filter((course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.slug.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold gradient-text">Course Management</h1>
                    <p className="text-nexus-muted mt-1">
                        Manage your academy courses, modules, and lessons.
                    </p>
                </div>
                <Button onClick={() => handleOpenDialog()} className="gradient-primary">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Course
                </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-nexus-card border-nexus-border">
                    <CardHeader className="pb-3">
                        <CardDescription>Total Courses</CardDescription>
                        <CardTitle className="text-3xl">{courses.length}</CardTitle>
                    </CardHeader>
                </Card>
                <Card className="bg-nexus-card border-nexus-border">
                    <CardHeader className="pb-3">
                        <CardDescription>Published Courses</CardDescription>
                        <CardTitle className="text-3xl">
                            {courses.filter((c) => c.is_published).length}
                        </CardTitle>
                    </CardHeader>
                </Card>
                <Card className="bg-nexus-card border-nexus-border">
                    <CardHeader className="pb-3">
                        <CardDescription>Draft Courses</CardDescription>
                        <CardTitle className="text-3xl">
                            {courses.filter((c) => !c.is_published).length}
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
                            placeholder="Search courses..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Courses Table */}
            <Card className="bg-nexus-card border-nexus-border">
                <CardContent className="pt-6">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-12">
                            <Loader2 className="w-8 h-8 animate-spin text-nexus-blue" />
                        </div>
                    ) : filteredCourses.length === 0 ? (
                        <div className="text-center py-12">
                            <BookOpen className="w-12 h-12 mx-auto text-nexus-muted mb-4" />
                            <h3 className="text-lg font-medium mb-2">No courses found</h3>
                            <p className="text-nexus-muted mb-4">
                                {searchQuery
                                    ? 'Try adjusting your search query'
                                    : 'Get started by creating your first course'}
                            </p>
                            {!searchQuery && (
                                <Button onClick={() => handleOpenDialog()} variant="outline">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Course
                                </Button>
                            )}
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Slug</TableHead>
                                    <TableHead>Level</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Reviews</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredCourses.map((course) => (
                                    <TableRow key={course.id}>
                                        <TableCell className="font-medium cursor-pointer hover:text-nexus-blue" onClick={() => navigate(`/app/courses/${course.id}`)}>{course.title}</TableCell>
                                        <TableCell>
                                            <code className="text-xs bg-nexus-border px-2 py-1 rounded">
                                                {course.slug}
                                            </code>
                                        </TableCell>
                                        <TableCell className="capitalize">
                                            {course.level}
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={course.is_published ? 'default' : 'secondary'}
                                                className={
                                                    course.is_published
                                                        ? 'bg-emerald-500/20 text-emerald-500 border-emerald-500/30 cursor-pointer'
                                                        : 'bg-slate-500/20 text-slate-500 border-slate-500/30 cursor-pointer'
                                                }
                                                onClick={() => handleTogglePublish(course.id)}
                                                title="Click to toggle status"
                                            >
                                                {course.is_published ? 'Published' : 'Draft'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{course.reviews_count || 0}</Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    title="Manage Syllabus"
                                                    onClick={() => navigate(`/app/courses/${course.id}`)}
                                                >
                                                    <Settings className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleOpenDialog(course)}
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleDelete(course.id)}
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
                        <DialogTitle>{editingId ? 'Edit Course' : 'Create Course'}</DialogTitle>
                        <DialogDescription>
                            {editingId
                                ? 'Update the course details below'
                                : 'Add a new course to your academy'}
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
                                    placeholder="Enter course title"
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
                                    placeholder="course-slug"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="level">Level</Label>
                                <select
                                    id="level"
                                    value={formData.level}
                                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                                    className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <option value="beginner">Beginner</option>
                                    <option value="intermediate">Intermediate</option>
                                    <option value="advanced">Advanced</option>
                                </select>
                            </div>

                            <div className="space-y-2 pt-8">
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="is_published"
                                        checked={formData.is_published}
                                        onCheckedChange={(checked) =>
                                            setFormData({ ...formData, is_published: checked })
                                        }
                                    />
                                    <Label htmlFor="is_published" className="!mt-0 cursor-pointer">
                                        {formData.is_published ? 'Published' : 'Draft'}
                                    </Label>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) =>
                                    setFormData({ ...formData, description: e.target.value })
                                }
                                placeholder="Enter course description"
                                rows={4}
                            />
                        </div>

                        <div className="space-y-4 pt-4 border-t border-white/10">
                            <h3 className="text-lg font-semibold border-b border-white/10 pb-2">SEO Variables</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="seo_title">SEO Title</Label>
                                    <Input
                                        id="seo_title"
                                        value={formData.seo_title}
                                        onChange={(e) => setFormData({ ...formData, seo_title: e.target.value })}
                                        placeholder="Enter SEO title"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="seo_keywords">SEO Keywords</Label>
                                    <Input
                                        id="seo_keywords"
                                        value={formData.seo_keywords}
                                        onChange={(e) => setFormData({ ...formData, seo_keywords: e.target.value })}
                                        placeholder="keyword1, keyword2"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="seo_description">SEO Description</Label>
                                <Textarea
                                    id="seo_description"
                                    value={formData.seo_description}
                                    onChange={(e) => setFormData({ ...formData, seo_description: e.target.value })}
                                    placeholder="Brief SEO description"
                                    rows={2}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="seo_canonical_url">Canonical URL</Label>
                                    <Input
                                        id="seo_canonical_url"
                                        value={formData.seo_canonical_url}
                                        onChange={(e) => setFormData({ ...formData, seo_canonical_url: e.target.value })}
                                        placeholder="https://test.com/..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="og_image" className="cursor-pointer">OG Image Upload</Label>
                                    <Input
                                        id="og_image"
                                        type="file"
                                        accept="image/png, image/jpeg, image/webp"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0] || null;
                                            setOgImageFile(file);
                                            if (file) {
                                                setOgImagePreviewUrl(URL.createObjectURL(file));
                                            } else {
                                                setOgImagePreviewUrl(null);
                                            }
                                        }}
                                        className="cursor-pointer border-nexus-border file:text-white file:bg-transparent file:border-0"
                                    />
                                    {ogImagePreviewUrl && (
                                        <div className="mt-2 rounded-lg overflow-hidden border border-white/10 bg-black flex flex-col justify-center">
                                            <img src={ogImagePreviewUrl} alt="OG Image preview" className="w-full max-h-[160px] object-contain bg-black/50" />
                                            <p className="text-[10px] text-nexus-muted p-2 bg-white/5 truncate">
                                                Ready: {ogImageFile?.name} ({ogImageFile && (ogImageFile.size / 1024).toFixed(2)} KB)
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="seo_meta_tags">Custom Meta Tags</Label>
                                <Textarea
                                    id="seo_meta_tags"
                                    value={formData.seo_meta_tags}
                                    onChange={(e) => setFormData({ ...formData, seo_meta_tags: e.target.value })}
                                    placeholder="<meta property='...' content='...'>"
                                    className="font-mono text-sm"
                                    rows={2}
                                />
                            </div>
                        </div>

                        <DialogFooter className="pt-4 border-t border-white/10">
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
                                    <>{editingId ? 'Update Course' : 'Create Course'}</>
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}