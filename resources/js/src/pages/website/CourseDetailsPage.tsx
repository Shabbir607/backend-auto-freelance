import { PublicNavbarLayout } from '@/components/layout/PublicNavbarLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { Course, CourseReview, courseService } from '@/services/courseService';
import { AnimatePresence, motion } from 'framer-motion';
import {
    BookOpen,
    ChevronDown,
    ChevronUp,
    Loader2,
    PlayCircle,
    Send,
    Star,
    User,
    Video
} from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function CourseDetailsPage() {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const { showToast } = useToast();
    const { isAuthenticated } = useAuth();

    // Data State
    const [course, setCourse] = useState<Course | null>(null);
    const [reviews, setReviews] = useState<CourseReview[]>([]);
    const [loading, setLoading] = useState(true);

    // UI State
    const [expandedModules, setExpandedModules] = useState<number[]>([]);
    const [isBookmarked, setIsBookmarked] = useState(false);

    // Review Form State
    const [rating, setRating] = useState(5);
    const [reviewTitle, setReviewTitle] = useState('');
    const [reviewComment, setReviewComment] = useState('');
    const [isSubmittingReview, setIsSubmittingReview] = useState(false);

    // Refs for smooth scrolling
    const curriculumRef = useRef<HTMLDivElement>(null);
    const reviewsRef = useRef<HTMLDivElement>(null);

    // SEO Effect: Apply course-specific metadata to the head
    useEffect(() => {
        if (!course) return;

        const seo = course.seo;
        const metaTitle = seo?.title || course.title || "Course - EdgeLancer";
        const metaDesc = seo?.description || course.description || "Learn this course on EdgeLancer.";
        const metaKeywords = seo?.keywords || "";
        const ogImage = seo?.og_image || "";
        const metaTags = seo?.meta_tags || "";

        document.title = metaTitle;

        const updateMeta = (name: string, content: string, attr: 'name' | 'property' = 'name') => {
            if (!content) return;
            let el = document.querySelector(`meta[${attr}="${name}"]`);
            if (!el) {
                el = document.createElement('meta');
                el.setAttribute(attr, name);
                document.head.appendChild(el);
            }
            el.setAttribute('content', content);
        };

        updateMeta('description', metaDesc);
        updateMeta('keywords', metaKeywords);
        updateMeta('og:title', metaTitle, 'property');
        updateMeta('og:description', metaDesc, 'property');
        updateMeta('og:image', ogImage, 'property');
        updateMeta('twitter:title', metaTitle);
        updateMeta('twitter:description', metaDesc);
        updateMeta('twitter:image', ogImage);

        // Handle JSON meta_tags string if present
        if (metaTags) {
            try {
                const tags = JSON.parse(metaTags);
                if (typeof tags === 'object') {
                    Object.entries(tags).forEach(([key, val]) => {
                        if (typeof val === 'string') updateMeta(key, val);
                    });
                }
            } catch (e) {
                // Not JSON, skip
            }
        }
    }, [course]);

    const loadData = useCallback(async () => {
        setLoading(true);
        try {
            const res = await courseService.getPublicCourse(slug as string);
            if (res.success && res.data) {
                const data = (res.data as any).data || res.data;
                setCourse(data);
                if (data.modules?.length > 0) setExpandedModules([data.modules[0].id]);

                const revRes = await courseService.getPublicCourseReviews(data.id);
                if (revRes.success) setReviews(revRes.data.data);
            }
        } catch (e) {
            showToast('Error loading course', 'error');
            navigate('/courses');
        } finally {
            setLoading(false);
        }
    }, [slug, showToast, navigate]);

    useEffect(() => { loadData(); }, [loadData]);

    // Button Handlers
    const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
        ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const handleToggleBookmark = () => {
        setIsBookmarked(!isBookmarked);
        showToast(isBookmarked ? 'Removed from your bookmarks' : 'Course bookmarked successfully!', 'success');
    };

    const handleReviewSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!course) return;
        // Public reviews supported by guest_name/guest_email logic in service
        // but for now we'll just allow the submission. 
        // If your service requires auth, you'd need to mock or provide guest fields.
        // Assuming the backend handles it by IP or session as specified.
        if (!reviewTitle.trim() || !reviewComment.trim()) {
            showToast('Please provide a title and comment', 'error');
            return;
        }

        setIsSubmittingReview(true);
        try {
            const res = await courseService.submitCourseReview(course.id, { rating, title: reviewTitle, comment: reviewComment });

            if (!res.success) {
                showToast(res.message || 'Failed to submit review', 'error');
                return;
            }

            showToast('Review submitted successfully!', 'success');
            setRating(5); setReviewTitle(''); setReviewComment('');
            // Reload reviews silently
            const revRes = await courseService.getPublicCourseReviews(course.id);
            if (revRes.success) setReviews(revRes.data.data);
        } catch (error) {
            showToast('Failed to submit review', 'error');
        } finally {
            setIsSubmittingReview(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
            <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
        </div>
    );

    if (!course) return null;

    const totalLessons = course.modules?.reduce((acc, mod) => acc + (mod.lessons?.length || 0), 0) || 0;
    const sortedModules = [...(course.modules || [])].sort((a, b) => a.order - b.order);

    return (
        <PublicNavbarLayout>
            <div className="min-h-screen bg-[#0a0a0a] text-neutral-200 font-sans selection:bg-blue-500/30">

                {/* --- HERO SECTION --- */}
                <section className="relative pt-32 pb-24 px-6 border-b border-white/10 bg-[#0a0a0a]">
                    {/* Subtle Top Glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="max-w-3xl">
                            <div className="flex items-center gap-4 mb-6">
                                <Badge variant="outline" className="border-blue-500/30 text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full uppercase tracking-widest text-[10px] font-bold">
                                    {course.level} Level
                                </Badge>
                                <div className="flex items-center gap-1.5 text-amber-500 text-sm font-semibold">
                                    <Star className="w-4 h-4 fill-amber-500" />
                                    <span>{course.average_rating || '5.0'}</span>
                                    <span className="text-neutral-500 font-normal">({course.reviews_count} reviews)</span>
                                </div>
                            </div>

                            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6 tracking-tight">
                                {course.title}
                            </h1>

                            <p className="text-lg md:text-xl text-neutral-400 mb-10 leading-relaxed max-w-2xl">
                                {course.description}
                            </p>

                            <div className="flex flex-wrap items-center gap-4">
                                <Button
                                    size="lg"
                                    onClick={() => navigate(`/${course.slug}/${sortedModules[0]?.lessons[0]?.slug}`)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white h-14 px-8 rounded-xl font-semibold text-base transition-all"
                                >
                                    <PlayCircle className="w-5 h-5 mr-2" />
                                    Start Learning Now
                                </Button>

                                <Button
                                    size="lg"
                                    variant="outline"
                                    onClick={() => scrollToSection(curriculumRef)}
                                    className="h-14 px-8 rounded-xl border-white/10 hover:bg-white/5 text-white font-semibold transition-all"
                                >
                                    <BookOpen className="w-5 h-5 mr-2" />
                                    View Syllabus
                                </Button>

                            </div>
                        </div>
                    </div>
                </section>

                {/* --- MAIN CONTENT & SIDEBAR --- */}
                <section className="py-16 px-6 relative z-10">
                    <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-start">

                        {/* LEFT COLUMN: Course Content */}
                        <div className="lg:col-span-8 space-y-20">

                            {/* Syllabus Section */}
                            <div ref={curriculumRef} className="scroll-mt-32">
                                <div className="flex items-baseline justify-between mb-8">
                                    <h2 className="text-3xl font-bold text-white tracking-tight">Course Syllabus</h2>
                                    <span className="text-sm text-neutral-500 font-medium">{sortedModules.length} Modules • {totalLessons} Lessons</span>
                                </div>

                                <div className="flex flex-col gap-3">
                                    {sortedModules.map((module, idx) => {
                                        const isExpanded = expandedModules.includes(module.id);
                                        return (
                                            <div key={module.id} className="border border-white/10 rounded-2xl bg-[#111111] overflow-hidden transition-colors hover:border-white/20">
                                                <button
                                                    onClick={() => setExpandedModules(prev => isExpanded ? prev.filter(id => id !== module.id) : [...prev, module.id])}
                                                    className="w-full flex items-center justify-between p-6 text-left"
                                                >
                                                    <div className="flex items-center gap-5">
                                                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-sm font-bold text-neutral-400">
                                                            {idx + 1}
                                                        </div>
                                                        <div>
                                                            <h3 className="text-lg font-semibold text-white">{module.title}</h3>
                                                            <p className="text-sm text-neutral-500 mt-1">{module.lessons?.length} Lessons</p>
                                                        </div>
                                                    </div>
                                                    {isExpanded ? <ChevronUp className="w-5 h-5 text-neutral-500" /> : <ChevronDown className="w-5 h-5 text-neutral-500" />}
                                                </button>

                                                <AnimatePresence>
                                                    {isExpanded && (
                                                        <motion.div
                                                            initial={{ height: 0 }}
                                                            animate={{ height: 'auto' }}
                                                            exit={{ height: 0 }}
                                                            className="overflow-hidden bg-[#0a0a0a] border-t border-white/5"
                                                        >
                                                            <div className="p-3 space-y-1">
                                                                {module.lessons?.sort((a, b) => a.order - b.order).map((lesson, lIdx) => (
                                                                    <button
                                                                        key={lesson.id}
                                                                        onClick={() => navigate(`/${course.slug}/${lesson.slug}`)}
                                                                        className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-colors group text-left"
                                                                    >
                                                                        <div className="flex items-center gap-4">
                                                                            <span className="text-xs text-neutral-600 font-mono w-4">{lIdx + 1}.</span>
                                                                            <PlayCircle className="w-4 h-4 text-blue-400 shrink-0" />
                                                                            <span className={`text-sm font-medium text-neutral-300 group-hover:text-white transition-colors`}>
                                                                                {lesson.title}
                                                                            </span>
                                                                        </div>
                                                                        {lesson.is_free_preview && (
                                                                            <Badge variant="outline" className="border-blue-500/20 text-blue-400 bg-blue-500/10 text-[10px] uppercase tracking-wider">Preview</Badge>
                                                                        )}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Reviews Section */}
                            <div ref={reviewsRef} className="scroll-mt-32 pt-10 border-t border-white/10">
                                <h2 className="text-3xl font-bold text-white tracking-tight mb-8">Student Reviews</h2>

                                {/* Write Review Form */}
                                <Card className="bg-[#111111] border-white/10 mb-10 rounded-2xl">
                                    <CardContent className="p-6 md:p-8">
                                        <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                                            <Star className="w-5 h-5 text-blue-400" /> Rate this course
                                        </h3>
                                        <form onSubmit={handleReviewSubmit} className="space-y-6">
                                            <div>
                                                <div className="flex gap-2 mb-2">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <button
                                                            key={star} type="button" onClick={() => setRating(star)}
                                                            className="focus:outline-none transition-transform hover:scale-110"
                                                        >
                                                            <Star className={`w-8 h-8 ${star <= rating ? 'fill-amber-500 text-amber-500' : 'text-neutral-700'}`} />
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="grid gap-4">
                                                <input
                                                    disabled={isSubmittingReview}
                                                    type="text"
                                                    value={reviewTitle}
                                                    onChange={(e) => setReviewTitle(e.target.value)}
                                                    className="w-full h-12 rounded-xl border border-white/10 bg-black/50 px-4 text-white placeholder:text-neutral-600 focus:outline-none focus:border-blue-500/50 transition-colors"
                                                    placeholder="Review Title (e.g., Amazing Course!)"
                                                    required
                                                />
                                                <Textarea
                                                    disabled={isSubmittingReview}
                                                    value={reviewComment}
                                                    onChange={(e) => setReviewComment(e.target.value)}
                                                    className="w-full min-h-[120px] rounded-xl border border-white/10 bg-black/50 p-4 text-white placeholder:text-neutral-600 focus:outline-none focus:border-blue-500/50 transition-colors resize-y"
                                                    placeholder="What did you think of the content?"
                                                    required
                                                />
                                            </div>

                                            <Button
                                                type="submit"
                                                disabled={isSubmittingReview}
                                                className="bg-white hover:bg-neutral-200 text-black font-semibold px-8 h-12 rounded-xl w-full sm:w-auto"
                                            >
                                                {isSubmittingReview ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Send className="w-4 h-4 mr-2" />}
                                                {isSubmittingReview ? 'Submitting...' : 'Post Review'}
                                            </Button>
                                        </form>
                                    </CardContent>
                                </Card>

                                {/* Reviews List */}
                                <div className="grid gap-6">
                                    {reviews.length === 0 ? (
                                        <div className="text-center py-12 border border-white/5 border-dashed rounded-2xl bg-white/[0.02]">
                                            <p className="text-neutral-500">No reviews yet. Be the first to share your thoughts!</p>
                                        </div>
                                    ) : (
                                        reviews.map((review) => (
                                            <div key={review.id} className="p-6 rounded-2xl bg-white/[0.03] border border-white/5">
                                                <div className="flex items-center gap-4 mb-4">
                                                    <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center">
                                                        <User className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-medium text-white">{review.user?.name || 'Student'}</h4>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <div className="flex">
                                                                {[1, 2, 3, 4, 5].map((star) => (
                                                                    <Star key={star} className={`w-3.5 h-3.5 ${star <= review.rating ? 'fill-amber-500 text-amber-500' : 'text-neutral-700'}`} />
                                                                ))}
                                                            </div>
                                                            <span className="text-xs text-neutral-600">• {new Date(review.created_at).toLocaleDateString()}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <h5 className="font-semibold text-neutral-200 mb-2">{review.title}</h5>
                                                <p className="text-neutral-400 text-sm leading-relaxed">{review.comment}</p>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Sticky Info Card */}
                        <div className="lg:col-span-4 relative">
                            <div className="sticky top-28">
                                <Card className="bg-[#111111] border-white/10 overflow-hidden shadow-2xl rounded-3xl">
                                    {/* Abstract header for the card */}
                                    <div className="h-24 bg-gradient-to-br from-blue-900/40 to-black relative">
                                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20" />
                                    </div>

                                    <CardContent className="p-8 -mt-8 relative z-10">
                                        <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 shadow-xl mb-8 flex flex-col items-center justify-center text-center">
                                            <Video className="w-10 h-10 text-blue-400 mb-3" />
                                            <h3 className="text-white font-bold text-lg mb-1">Interactive Course</h3>
                                            <p className="text-sm text-neutral-500">{totalLessons} High-Quality Lessons</p>
                                        </div>

                                        <Button
                                            size="lg"
                                            onClick={() => navigate(`/lessons/${sortedModules[0]?.lessons[0]?.slug}`)}
                                            className="w-full bg-blue-600 hover:bg-blue-700 text-white h-14 rounded-xl font-bold text-base mb-6"
                                        >
                                            Enroll Now
                                        </Button>

                                        <div className="space-y-5">
                                            <p className="text-xs font-bold text-neutral-600 uppercase tracking-widest">Course Description</p>
                                            <div className="text-sm text-neutral-400 leading-relaxed">
                                                {course.description || "No description provided for this course."}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                    </div>
                </section>
            </div>
        </PublicNavbarLayout>
    );
}
