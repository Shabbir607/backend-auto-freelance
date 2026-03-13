import { PublicNavbarLayout } from '@/components/layout/PublicNavbarLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { Course, CourseReview, courseService } from '@/services/courseService';
import {
    BookOpen,
    ChevronDown,
    ChevronUp,
    Loader2,
    PlayCircle,
    Send,
    Star,
    User,
    Video,
    ArrowLeft
} from 'lucide-react';
import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SEOHelmet } from '@/components/SEO/SEOHelmet';

export default function CourseDetailsPage() {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const { showToast } = useToast();
    const { isAuthenticated } = useAuth();

    const [course, setCourse] = useState<Course | null>(null);
    const [reviews, setReviews] = useState<CourseReview[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedModules, setExpandedModules] = useState<number[]>([]);
    const [rating, setRating] = useState(5);
    const [reviewTitle, setReviewTitle] = useState('');
    const [reviewComment, setReviewComment] = useState('');
    const [isSubmittingReview, setIsSubmittingReview] = useState(false);

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

    useEffect(() => {
        loadData();
    }, [loadData]);

    const handleReviewSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!course) return;
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
            <SEOHelmet title={course.title} description={course.description} />
            <div className="min-h-screen bg-[#0a0a0a] text-neutral-200">
                <section className="relative pt-32 pb-24 px-6 border-b border-white/10">
                    <div className="max-w-7xl mx-auto relative z-10">
                        <button onClick={() => navigate('/courses')} className="flex items-center gap-2 text-sm text-neutral-500 hover:text-white mb-8">
                            <ArrowLeft className="w-4 h-4" /> Back to Courses
                        </button>
                        <div className="max-w-3xl">
                            <div className="flex items-center gap-4 mb-6">
                                <Badge variant="outline" className="border-blue-500/30 text-blue-400 bg-blue-500/10 uppercase font-bold px-3 py-1">
                                    {course.level} Level
                                </Badge>
                                <div className="flex items-center gap-1.5 text-amber-500 text-sm font-semibold">
                                    <Star className="w-4 h-4 fill-amber-500" />
                                    <span>{course.average_rating || '5.0'}</span>
                                    <span className="text-neutral-500 font-normal">({course.reviews_count} reviews)</span>
                                </div>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">{course.title}</h1>
                            <p className="text-lg text-neutral-400 mb-10 leading-relaxed max-w-2xl">{course.description}</p>
                            <Button
                                size="lg"
                                onClick={() => navigate(`/${course.slug}/${sortedModules[0]?.lessons[0]?.slug}`)}
                                className="bg-blue-600 hover:bg-blue-700 text-white h-14 px-8 rounded-xl font-semibold"
                            >
                                <PlayCircle className="w-5 h-5 mr-2" /> Start Learning Now
                            </Button>
                        </div>
                    </div>
                </section>

                <section className="py-16 px-6 relative z-10">
                    <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12">
                        <div className="lg:col-span-8 space-y-20">
                            <div>
                                <h2 className="text-3xl font-bold text-white mb-8">Course Syllabus</h2>
                                <div className="flex flex-col gap-3">
                                    {sortedModules.map((module, idx) => {
                                        const isExpanded = expandedModules.includes(module.id);
                                        return (
                                            <div key={module.id} className="border border-white/10 rounded-2xl bg-[#111111] overflow-hidden">
                                                <button
                                                    onClick={() => setExpandedModules(prev => isExpanded ? prev.filter(id => id !== module.id) : [...prev, module.id])}
                                                    className="w-full flex items-center justify-between p-6 text-left"
                                                >
                                                    <div className="flex items-center gap-5">
                                                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-sm font-bold">{idx + 1}</div>
                                                        <div><h3 className="text-lg font-semibold text-white">{module.title}</h3></div>
                                                    </div>
                                                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                                                </button>
                                                <AnimatePresence>
                                                    {isExpanded && (
                                                        <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden bg-[#0a0a0a] border-t border-white/5">
                                                            <div className="p-3">
                                                                {module.lessons?.sort((a, b) => a.order - b.order).map((lesson, lIdx) => (
                                                                    <button key={lesson.id} onClick={() => navigate(`/${course.slug}/${lesson.slug}`)} className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-white/5 text-left">
                                                                        <div className="flex items-center gap-4">
                                                                            <span className="text-xs text-neutral-600">{lIdx + 1}.</span>
                                                                            <PlayCircle className="w-4 h-4 text-blue-400" />
                                                                            <span className="text-sm font-medium">{lesson.title}</span>
                                                                        </div>
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

                            <div className="pt-10 border-t border-white/10">
                                <h2 className="text-3xl font-bold text-white mb-8">Student Reviews</h2>
                                <Card className="bg-[#111111] border-white/10 mb-10 rounded-2xl p-6">
                                    <h3 className="text-xl font-semibold text-white mb-6">Rate this course</h3>
                                    <form onSubmit={handleReviewSubmit} className="space-y-6">
                                        <div className="flex gap-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button key={star} type="button" onClick={() => setRating(star)}>
                                                    <Star className={`w-8 h-8 ${star <= rating ? 'fill-amber-500 text-amber-500' : 'text-neutral-700'}`} />
                                                </button>
                                            ))}
                                        </div>
                                        <input type="text" value={reviewTitle} onChange={(e) => setReviewTitle(e.target.value)} className="w-full h-12 rounded-xl border border-white/10 bg-black/50 px-4 text-white" placeholder="Review Title" required />
                                        <Textarea value={reviewComment} onChange={(e) => setReviewComment(e.target.value)} className="w-full min-h-[120px] rounded-xl border border-white/10 bg-black/50 p-4 text-white" placeholder="Your review" required />
                                        <Button type="submit" disabled={isSubmittingReview} className="bg-white text-black font-semibold px-8 h-12 rounded-xl">Post Review</Button>
                                    </form>
                                </Card>

                                <div className="space-y-6">
                                    {reviews.map((review) => (
                                        <div key={review.id} className="p-6 rounded-2xl bg-white/[0.03] border border-white/5">
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center"><User className="w-5 h-5" /></div>
                                                <div>
                                                    <h4 className="font-medium text-white">{review.user?.name || 'Student'}</h4>
                                                    <div className="flex">
                                                        {[1, 2, 3, 4, 5].map((star) => <Star key={star} className={`w-3.5 h-3.5 ${star <= review.rating ? 'fill-amber-500 text-amber-500' : 'text-neutral-700'}`} />)}
                                                    </div>
                                                </div>
                                            </div>
                                            <h5 className="font-semibold text-neutral-200 mb-2">{review.title}</h5>
                                            <p className="text-neutral-400 text-sm">{review.comment}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-4 relative">
                            <div className="sticky top-28">
                                <Card className="bg-[#111111] border-white/10 rounded-3xl p-8">
                                    <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center mb-8">
                                        <Video className="w-10 h-10 text-blue-400 mb-3" />
                                        <h3 className="text-white font-bold text-lg mb-1">Interactive Course</h3>
                                        <p className="text-sm text-neutral-500">{totalLessons} Lessons</p>
                                    </div>
                                    <Button size="lg" onClick={() => navigate(`/${course.slug}/${sortedModules[0]?.lessons[0]?.slug}`)} className="w-full bg-blue-600 hover:bg-blue-700 text-white h-14 rounded-xl font-bold text-base">Enroll Now</Button>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </PublicNavbarLayout>
    );
}
