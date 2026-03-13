'use client';
import { useConfirmation } from '@/components/ConfirmationDialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/contexts/ToastContext';
import { Course, Lesson, Module, courseService } from '@/services/courseService';
import {
    ArrowLeft,
    ChevronDown,
    ChevronUp,
    Edit,
    Loader2,
    PlayCircle,
    Plus,
    Trash2
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function AdminCourseDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { showToast } = useToast();
    const { confirm } = useConfirmation();

    const [course, setCourse] = useState<Course | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Module Form State
    const [isModuleDialogOpen, setIsModuleDialogOpen] = useState(false);
    const [isModuleSaving, setIsModuleSaving] = useState(false);
    const [moduleFormData, setModuleFormData] = useState({ id: 0, title: '', order: 0 });

    // Lesson Form State
    const [isLessonDialogOpen, setIsLessonDialogOpen] = useState(false);
    const [isLessonSaving, setIsLessonSaving] = useState(false);
    const [lessonFormData, setLessonFormData] = useState<any>({
        id: undefined,
        module_id: 0,
        title: '',
        slug: '',
        video_url: '',
        text_content: '',
        is_free_preview: false,
        order: 0,
        seo_title: '',
        seo_description: '',
        seo_keywords: '',
        seo_meta_tags: '',
        seo_canonical_url: '',
        og_image: '',
    });

    // File & Preview states
    const [lessonVideoFile, setLessonVideoFile] = useState<File | null>(null);
    const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);

    const [lessonThumbnailFile, setLessonThumbnailFile] = useState<File | null>(null);
    const [thumbnailPreviewUrl, setThumbnailPreviewUrl] = useState<string | null>(null);

    // Accordion State for Modules
    const [expandedModules, setExpandedModules] = useState<number[]>([]);

    useEffect(() => {
        if (id) {
            loadCourse();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    // Cleanup object URLs to prevent memory leaks when component unmounts or previews change
    useEffect(() => {
        return () => {
            if (videoPreviewUrl) URL.revokeObjectURL(videoPreviewUrl);
            if (thumbnailPreviewUrl) URL.revokeObjectURL(thumbnailPreviewUrl);
        };
    }, [videoPreviewUrl, thumbnailPreviewUrl]);

    const loadCourse = async () => {
        if (!id) return;
        setIsLoading(true);
        try {
            const response = await courseService.getAdminCourse(Number(id));
            if (response.success && response.data) {
                const courseData = (response.data as any).data || response.data;
                setCourse(courseData);
                if (courseData.modules && courseData.modules.length > 0 && expandedModules.length === 0) {
                    setExpandedModules([courseData.modules[0].id]);
                }
            }
        } catch (error) {
            console.error('Failed to load course details:', error);
            showToast('Failed to load course details', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const toggleModuleExpanded = (moduleId: number) => {
        setExpandedModules((prev) =>
            prev.includes(moduleId) ? prev.filter((id) => id !== moduleId) : [...prev, moduleId]
        );
    };

    // --- Module Operations ---

    const handleOpenModuleDialog = (module?: Module) => {
        if (module) {
            setModuleFormData({ id: module.id, title: module.title, order: module.order });
        } else {
            const nextOrder = course?.modules?.length ? course.modules.length + 1 : 1;
            setModuleFormData({ id: 0, title: '', order: nextOrder });
        }
        setIsModuleDialogOpen(true);
    };

    const handleModuleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!moduleFormData.title.trim()) {
            showToast('Module title is required', 'error');
            return;
        }

        setIsModuleSaving(true);
        try {
            if (moduleFormData.id) {
                await courseService.updateModule(moduleFormData.id, {
                    course_id: Number(id),
                    title: moduleFormData.title,
                    order: moduleFormData.order,
                });
                showToast('Module updated successfully', 'success');
            } else {
                await courseService.createModule({
                    course_id: Number(id),
                    title: moduleFormData.title,
                    order: moduleFormData.order,
                });
                showToast('Module created successfully', 'success');
            }
            await loadCourse();
            setIsModuleDialogOpen(false);
        } catch (error) {
            console.error('Failed to save module:', error);
            showToast('Failed to save module', 'error');
        } finally {
            setIsModuleSaving(false);
        }
    };

    const handleDeleteModule = async (moduleId: number, e: React.MouseEvent) => {
        e.stopPropagation();
        const confirmed = await confirm({
            title: 'Delete Module',
            description: 'Are you sure you want to delete this module and all its lessons?',
            confirmText: 'Delete',
            cancelText: 'Cancel',
        });
        if (!confirmed) return;

        try {
            await courseService.deleteModule(moduleId);
            showToast('Module deleted successfully', 'success');
            await loadCourse();
        } catch (error) {
            console.error('Failed to delete module:', error);
            showToast('Failed to delete module', 'error');
        }
    };

    // --- Lesson Operations ---

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    };

    const handleLessonTitleChange = (title: string) => {
        setLessonFormData({ ...lessonFormData, title });
        if (!lessonFormData.id) {
            setLessonFormData((prev: any) => ({ ...prev, title, slug: generateSlug(title) }));
        } else {
            setLessonFormData((prev: any) => ({ ...prev, title }));
        }
    };

    const handleOpenLessonDialog = (moduleId: number, lesson?: Lesson) => {
        // Reset previews
        setVideoPreviewUrl(null);
        setThumbnailPreviewUrl(null);
        setLessonVideoFile(null);
        setLessonThumbnailFile(null);

        if (lesson) {
            setLessonFormData({
                id: lesson.id,
                module_id: moduleId,
                title: lesson.title || '',
                slug: lesson.slug || '',
                video_url: lesson.video_url || '',
                text_content: lesson.text_content || '',
                is_free_preview: lesson.is_free_preview || false,
                order: lesson.order || 0,
                seo_title: lesson.seo?.title || lesson.seo_title || '',
                seo_description: lesson.seo?.description || lesson.seo_description || '',
                seo_keywords: lesson.seo?.keywords || lesson.seo_keywords || '',
                seo_meta_tags: lesson.seo?.meta_tags || lesson.seo_meta_tags || '',
                seo_canonical_url: lesson.seo?.canonical_url || lesson.seo_canonical_url || '',
                og_image: lesson.seo?.og_image || lesson.og_image || '',
            });
        } else {
            const module = course?.modules?.find((m) => m.id === moduleId);
            const nextOrder = module?.lessons?.length ? module.lessons.length + 1 : 1;

            setLessonFormData({
                id: undefined,
                module_id: moduleId,
                title: '',
                slug: '',
                video_url: '',
                text_content: '',
                is_free_preview: false,
                order: nextOrder,
                seo_title: '',
                seo_description: '',
                seo_keywords: '',
                seo_meta_tags: '',
                seo_canonical_url: '',
                og_image: '',
            });
        }
        setIsLessonDialogOpen(true);
    };

    const handleLessonSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!lessonFormData.title?.trim() || !lessonFormData.slug?.trim()) {
            showToast('Lesson title and slug are required', 'error');
            return;
        }

        setIsLessonSaving(true);
        try {
            const submitData = new FormData();


            Object.entries(lessonFormData).forEach(([key, value]) => {
                if (key === 'id') return;

                if (typeof value === 'boolean') {
                    submitData.append(key, value ? '1' : '0');
                } else {
                    submitData.append(key, value !== null && value !== undefined ? String(value) : '');
                }
            });

            if (lessonVideoFile) submitData.append('video', lessonVideoFile);
            if (lessonThumbnailFile) submitData.append('thumbnail', lessonThumbnailFile);

            if (lessonFormData.id) {
                await courseService.updateLesson(lessonFormData.id, submitData);
                showToast('Lesson updated successfully', 'success');
            } else {
                await courseService.createLesson(submitData);
                showToast('Lesson created successfully', 'success');
            }
            await loadCourse();
            setIsLessonDialogOpen(false);
        } catch (error) {
            console.error('Failed to save lesson:', error);
            showToast('Failed to save lesson', 'error');
        } finally {
            setIsLessonSaving(false);
        }
    };

    const handleDeleteLesson = async (lessonId: number) => {
        const confirmed = await confirm({
            title: 'Delete Lesson',
            description: 'Are you sure you want to delete this lesson?',
            confirmText: 'Delete',
            cancelText: 'Cancel',
        });
        if (!confirmed) return;

        try {
            await courseService.deleteLesson(lessonId);
            showToast('Lesson deleted successfully', 'success');
            await loadCourse();
        } catch (error) {
            console.error('Failed to delete lesson:', error);
            showToast('Failed to delete lesson', 'error');
        }
    };

    const handleSwapLessonOrder = async (moduleId: number, currentLessonIndex: number, direction: 'up' | 'down') => {
        const module = course?.modules?.find((m) => m.id === moduleId);
        if (!module || !module.lessons) return;

        const targetIndex = direction === 'up' ? currentLessonIndex - 1 : currentLessonIndex + 1;
        if (targetIndex < 0 || targetIndex >= module.lessons.length) return;

        const lessons = [...module.lessons];
        const currentOrder = lessons[currentLessonIndex].order;
        lessons[currentLessonIndex].order = lessons[targetIndex].order;
        lessons[targetIndex].order = currentOrder;

        try {
            await courseService.reorderLessons({
                lessons: [
                    { id: lessons[currentLessonIndex].id, order: lessons[currentLessonIndex].order },
                    { id: lessons[targetIndex].id, order: lessons[targetIndex].order },
                ],
            });
            await loadCourse();
        } catch (error) {
            console.error('Failed to reorder lessons:', error);
            showToast('Failed to reorder lessons', 'error');
        }
    };

    if (isLoading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-nexus-blue" />
            </div>
        );
    }

    if (!course) {
        return (
            <div className="flex h-64 flex-col items-center justify-center">
                <h2 className="text-xl font-bold">Course not found</h2>
                <Button variant="link" onClick={() => navigate('/app/courses')} className="mt-4">
                    Back to Courses
                </Button>
            </div>
        );
    }

    const sortedModules = [...(course.modules || [])].sort((a, b) => a.order - b.order);

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => navigate('/app/courses')}>
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <div>
                    <h1 className="text-3xl font-bold text-white">{course.title}</h1>
                    <div className="mt-2 flex items-center gap-2">
                        <Badge variant="outline" className="capitalize">
                            {course.level}
                        </Badge>
                        <Badge
                            variant={course.is_published ? 'default' : 'secondary'}
                            className={
                                course.is_published
                                    ? 'bg-emerald-500/20 text-emerald-500 border-emerald-500/30'
                                    : 'bg-slate-500/20 text-slate-500 border-slate-500/30'
                            }
                        >
                            {course.is_published ? 'Published' : 'Draft'}
                        </Badge>
                    </div>
                </div>
                <div className="ml-auto flex items-center gap-3">
                    <Button onClick={() => handleOpenModuleDialog()} className="gradient-primary">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Module
                    </Button>
                </div>
            </div>

            <div className="space-y-4">
                {sortedModules.length === 0 ? (
                    <Card className="bg-nexus-card border-nexus-border py-12 text-center">
                        <h3 className="text-lg font-medium text-white mb-2">No Syllabus Available</h3>
                        <p className="text-nexus-muted mb-4">Start building your course structure by adding a module.</p>
                        <Button onClick={() => handleOpenModuleDialog()} variant="outline">
                            <Plus className="mr-2 h-4 w-4" />
                            Add First Module
                        </Button>
                    </Card>
                ) : (
                    sortedModules.map((module) => {
                        const isExpanded = expandedModules.includes(module.id);
                        const sortedLessons = [...(module.lessons || [])].sort((a, b) => a.order - b.order);

                        return (
                            <Card key={module.id} className="overflow-hidden bg-[#12121a] border-white/10 transition-colors hover:border-white/20">
                                <div
                                    className="flex cursor-pointer items-center justify-between bg-white/[0.02] p-4 transition-colors hover:bg-white/[0.04]"
                                    onClick={() => toggleModuleExpanded(module.id)}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-nexus-blue/10 text-nexus-blue">
                                            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                        </div>
                                        <h3 className="font-semibold text-white">
                                            <span className="text-nexus-muted mr-2">Module {module.order}:</span>
                                            {module.title}
                                        </h3>
                                        <Badge variant="secondary" className="ml-2 bg-white/5 font-normal">
                                            {module.lessons?.length || 0} Lessons
                                        </Badge>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleOpenModuleDialog(module);
                                            }}
                                            className="h-8 shadow-none"
                                        >
                                            <Edit className="mr-2 h-3.5 w-3.5" />
                                            Edit
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={(e) => handleDeleteModule(module.id, e)}
                                            className="h-8 text-red-500 hover:text-red-400 hover:bg-red-500/10 shadow-none"
                                        >
                                            <Trash2 className="h-3.5 w-3.5" />
                                        </Button>
                                    </div>
                                </div>

                                {isExpanded && (
                                    <div className="border-t border-white/5 p-4 pl-12 bg-[#0e0f14]">
                                        <div className="space-y-2">
                                            {sortedLessons.length === 0 ? (
                                                <p className="py-4 text-center text-sm text-nexus-muted pt-2 text-left italic">
                                                    No lessons added to this module yet.
                                                </p>
                                            ) : (
                                                sortedLessons.map((lesson, lessonIndex) => (
                                                    <div
                                                        key={lesson.id}
                                                        className="flex items-center justify-between rounded-lg border border-white/5 bg-[#171821] p-3 transition-colors hover:border-white/10 group"
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex flex-col gap-0 items-center justify-center w-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                <button
                                                                    disabled={lessonIndex === 0}
                                                                    onClick={() => handleSwapLessonOrder(module.id, lessonIndex, 'up')}
                                                                    className="text-nexus-muted hover:text-white disabled:opacity-30 disabled:hover:text-nexus-muted"
                                                                >
                                                                    <ChevronUp className="h-4 w-4" />
                                                                </button>
                                                                <button
                                                                    disabled={lessonIndex === sortedLessons.length - 1}
                                                                    onClick={() => handleSwapLessonOrder(module.id, lessonIndex, 'down')}
                                                                    className="text-nexus-muted hover:text-white disabled:opacity-30 disabled:hover:text-nexus-muted"
                                                                >
                                                                    <ChevronDown className="h-4 w-4" />
                                                                </button>
                                                            </div>
                                                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
                                                                <PlayCircle className="h-4 w-4" />
                                                            </div>
                                                            <div>
                                                                <div className="flex items-center gap-2">
                                                                    <span className="text-nexus-muted text-xs font-mono">{lesson.order}.</span>
                                                                    <span className="font-medium text-sm text-white">{lesson.title}</span>
                                                                    {lesson.is_free_preview && (
                                                                        <Badge variant="outline" className="text-[10px] h-4 px-1 leading-none border-emerald-500/30 text-emerald-400 bg-emerald-500/10">Free Preview</Badge>
                                                                    )}
                                                                </div>
                                                                {lesson.video_url && (
                                                                    <p className="text-xs text-nexus-muted mt-0.5 max-w-[300px] truncate">{lesson.video_url}</p>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-1 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() => handleOpenLessonDialog(module.id, lesson)}
                                                                className="h-8 w-8 text-nexus-muted hover:text-white hover:bg-white/10"
                                                            >
                                                                <Edit className="h-3.5 w-3.5" />
                                                            </Button>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() => handleDeleteLesson(lesson.id)}
                                                                className="h-8 w-8 text-nexus-muted hover:text-red-400 hover:bg-red-500/10"
                                                            >
                                                                <Trash2 className="h-3.5 w-3.5" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                        <div className="mt-4 flex">
                                            <Button
                                                onClick={() => handleOpenLessonDialog(module.id)}
                                                variant="outline"
                                                size="sm"
                                                className="border-dashed border-white/20 text-nexus-muted hover:text-white"
                                            >
                                                <Plus className="mr-1 h-3 w-3" />
                                                Add Lesson
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </Card>
                        );
                    })
                )}
            </div>

            {/* Module Dialog */}
            <Dialog open={isModuleDialogOpen} onOpenChange={setIsModuleDialogOpen}>
                <DialogContent className="bg-nexus-card border-nexus-border sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{moduleFormData.id ? 'Edit Module' : 'Create Module'}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleModuleSubmit} className="space-y-4">
                        <div className="space-y-2 pt-2">
                            <Label htmlFor="module_title">Module Title *</Label>
                            <Input
                                id="module_title"
                                value={moduleFormData.title}
                                onChange={(e) => setModuleFormData({ ...moduleFormData, title: e.target.value })}
                                placeholder="e.g. Introduction to React"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="module_order">Display Order</Label>
                            <Input
                                id="module_order"
                                type="number"
                                value={moduleFormData.order}
                                onChange={(e) => setModuleFormData({ ...moduleFormData, order: Number(e.target.value) })}
                            />
                        </div>
                        <DialogFooter className="pt-4">
                            <Button type="button" variant="outline" onClick={() => setIsModuleDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isModuleSaving} className="gradient-primary">
                                {isModuleSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                {moduleFormData.id ? 'Save Changes' : 'Create Module'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Lesson Dialog */}
            <Dialog open={isLessonDialogOpen} onOpenChange={setIsLessonDialogOpen}>
                <DialogContent className="bg-nexus-card border-nexus-border max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{lessonFormData.id ? 'Edit Lesson' : 'Create Lesson'}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleLessonSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="lesson_title">Lesson Title *</Label>
                                <Input
                                    id="lesson_title"
                                    value={lessonFormData.title}
                                    onChange={(e) => handleLessonTitleChange(e.target.value)}
                                    placeholder="e.g. Welcome to the course"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lesson_slug">Slug *</Label>
                                <Input
                                    id="lesson_slug"
                                    value={lessonFormData.slug}
                                    onChange={(e) => setLessonFormData({ ...lessonFormData, slug: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="video_url">Video Embed URL</Label>
                                <Input
                                    id="video_url"
                                    value={lessonFormData.video_url}
                                    onChange={(e) => setLessonFormData({ ...lessonFormData, video_url: e.target.value })}
                                    placeholder="https://www.youtube.com/embed/..."
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lesson_order">Order Position index</Label>
                                <Input
                                    id="lesson_order"
                                    type="number"
                                    value={lessonFormData.order}
                                    onChange={(e) => setLessonFormData({ ...lessonFormData, order: Number(e.target.value) })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="text_content">Text Content / Description</Label>
                            <Textarea
                                id="text_content"
                                value={lessonFormData.text_content}
                                onChange={(e) => setLessonFormData({ ...lessonFormData, text_content: e.target.value })}
                                placeholder="HTML description or readable content..."
                                rows={6}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="video_file" className="cursor-pointer">Video File Upload</Label>
                                <Input
                                    id="video_file"
                                    type="file"
                                    accept="video/mp4, video/webm, video/quicktime"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0] || null;
                                        setLessonVideoFile(file);
                                        if (file) {
                                            setVideoPreviewUrl(URL.createObjectURL(file));
                                        } else {
                                            setVideoPreviewUrl(null);
                                        }
                                    }}
                                    className="cursor-pointer border-nexus-border file:text-white file:bg-transparent file:border-0"
                                />
                                {videoPreviewUrl && (
                                    <div className="mt-2 rounded-lg overflow-hidden border border-white/10 bg-black">
                                        <video src={videoPreviewUrl} controls className="w-full max-h-[160px] object-contain bg-black/50" />
                                        <p className="text-[10px] text-nexus-muted p-2 bg-white/5 truncate">
                                            Ready: {lessonVideoFile?.name} ({lessonVideoFile && (lessonVideoFile.size / (1024 * 1024)).toFixed(2)} MB)
                                        </p>
                                    </div>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="thumbnail_file" className="cursor-pointer">Thumbnail Upload</Label>
                                <Input
                                    id="thumbnail_file"
                                    type="file"
                                    accept="image/png, image/jpeg, image/webp"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0] || null;
                                        setLessonThumbnailFile(file);
                                        if (file) {
                                            setThumbnailPreviewUrl(URL.createObjectURL(file));
                                        } else {
                                            setThumbnailPreviewUrl(null);
                                        }
                                    }}
                                    className="cursor-pointer border-nexus-border file:text-white file:bg-transparent file:border-0"
                                />
                                {thumbnailPreviewUrl && (
                                    <div className="mt-2 rounded-lg overflow-hidden border border-white/10 bg-black flex flex-col justify-center">
                                        <img src={thumbnailPreviewUrl} alt="Thumbnail preview" className="w-full max-h-[160px] object-contain bg-black/50" />
                                        <p className="text-[10px] text-nexus-muted p-2 bg-white/5 truncate">
                                            Ready: {lessonThumbnailFile?.name} ({lessonThumbnailFile && (lessonThumbnailFile.size / 1024).toFixed(2)} KB)
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-white/5">
                            <h3 className="text-md font-semibold mb-2">SEO Variables</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="lesson_seo_title">SEO Title</Label>
                                    <Input
                                        id="lesson_seo_title"
                                        value={lessonFormData.seo_title}
                                        onChange={(e) => setLessonFormData({ ...lessonFormData, seo_title: e.target.value })}
                                        placeholder="Enter SEO title"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lesson_seo_keywords">SEO Keywords</Label>
                                    <Input
                                        id="lesson_seo_keywords"
                                        value={lessonFormData.seo_keywords}
                                        onChange={(e) => setLessonFormData({ ...lessonFormData, seo_keywords: e.target.value })}
                                        placeholder="keyword1, keyword2"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="lesson_seo_description">SEO Description</Label>
                                <Textarea
                                    id="lesson_seo_description"
                                    value={lessonFormData.seo_description}
                                    onChange={(e) => setLessonFormData({ ...lessonFormData, seo_description: e.target.value })}
                                    placeholder="Brief SEO description"
                                    rows={2}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="lesson_seo_canonical_url">Canonical URL</Label>
                                    <Input
                                        id="lesson_seo_canonical_url"
                                        value={lessonFormData.seo_canonical_url}
                                        onChange={(e) => setLessonFormData({ ...lessonFormData, seo_canonical_url: e.target.value })}
                                        placeholder="https://test.com/..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lesson_og_image">OG Image URL</Label>
                                    <Input
                                        id="lesson_og_image"
                                        type="text"
                                        value={lessonFormData.og_image}
                                        onChange={(e) => setLessonFormData({ ...lessonFormData, og_image: e.target.value })}
                                        placeholder="https://test.com/og-image.jpg"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="lesson_seo_meta_tags">Custom Meta Tags</Label>
                                <Textarea
                                    id="lesson_seo_meta_tags"
                                    value={lessonFormData.seo_meta_tags}
                                    onChange={(e) => setLessonFormData({ ...lessonFormData, seo_meta_tags: e.target.value })}
                                    placeholder="<meta property='...' content='...'>"
                                    className="font-mono text-sm"
                                    rows={2}
                                />
                            </div>
                        </div>

                        <div className="flex items-center space-x-2 pt-2 pb-6 border-b border-white/5">
                            <Switch
                                id="is_free_preview"
                                checked={lessonFormData.is_free_preview}
                                onCheckedChange={(checked) => setLessonFormData({ ...lessonFormData, is_free_preview: checked })}
                            />
                            <Label htmlFor="is_free_preview" className="!mt-0 cursor-pointer text-sm">
                                Make this lesson available as a free preview
                            </Label>
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsLessonDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isLessonSaving} className="gradient-primary">
                                {isLessonSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                {lessonFormData.id ? 'Save Lesson' : 'Create Lesson'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}