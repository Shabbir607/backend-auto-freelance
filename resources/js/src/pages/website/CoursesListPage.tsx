import { FAQSection } from '@/components/FAQSection';
import { PublicNavbarLayout } from '@/components/layout/PublicNavbarLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Course, courseService } from '@/services/courseService';
import { ArrowRight, BookOpen, Clock, Loader2, PlayCircle, Search, Star, Users } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CoursesListPage() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCourses, setTotalCourses] = useState(0);

    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const observerTarget = useRef<HTMLDivElement>(null);

    const gradientPool = [
        'from-purple-500 to-indigo-600',
        'from-cyan-400 to-blue-600',
        'from-fuchsia-500 to-pink-600',
        'from-emerald-400 to-teal-600',
        'from-orange-400 to-red-600',
        'from-blue-400 to-indigo-600',
    ];

    const getCourseVisuals = (id: number) => {
        const hash = id || 0;
        const gradient = gradientPool[hash % gradientPool.length];
        return { gradient };
    };

    const loadCourses = useCallback(async (currentPage = 1, append = false) => {
        if (append) {
            setIsLoadingMore(true);
        } else {
            setLoading(true);
        }

        try {
            const res = await courseService.getPublicCourses({ page: currentPage, per_page: 12, search: searchQuery });
            if (res.success && res.data) {
                const isPaginatedObj = res.data && !Array.isArray(res.data) && 'data' in res.data;
                const courseItems = isPaginatedObj ? (res.data as any).data : (Array.isArray(res.data) ? res.data : [res.data]);

                setCourses(prev => append ? [...prev, ...courseItems] : courseItems);
                setTotalPages(isPaginatedObj ? (res.data as any).meta?.last_page || 1 : 1);
                setTotalCourses(isPaginatedObj ? (res.data as any).meta?.total || courseItems.length : courseItems.length);
            } else if (!append) {
                setCourses([]);
                setTotalCourses(0);
            }
        } catch (e) {
            console.error('Failed to load courses', e);
        } finally {
            setLoading(false);
            setIsLoadingMore(false);
        }
    }, [searchQuery]);

    useEffect(() => {
        setPage(1);
        const timer = setTimeout(() => {
            loadCourses(1, false);
        }, 400);
        return () => clearTimeout(timer);
    }, [searchQuery, loadCourses]);

    const handleLoadMore = useCallback(() => {
        if (page < totalPages && !isLoadingMore && !loading) {
            const nextPage = page + 1;
            setPage(nextPage);
            loadCourses(nextPage, true);
        }
    }, [page, totalPages, isLoadingMore, loading, loadCourses]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && page < totalPages && !isLoadingMore && !loading) {
                    handleLoadMore();
                }
            },
            { threshold: 0.1, rootMargin: '400px' }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => observer.disconnect();
    }, [handleLoadMore, page, totalPages, isLoadingMore, loading]);

    return (
        <PublicNavbarLayout>
            <section className="relative pt-32 pb-20 px-4 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] left-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-10%] right-1/4 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px]" />
                </div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <Badge className="mb-6 bg-white/5 text-blue-400 border-blue-500/30 hover:bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Edgelancer Academy
                    </Badge>

                    <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
                        <span className="text-white">Master New Skills</span>
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                            Automation Mastery
                        </span>
                    </h1>

                    <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
                        Level up your automation and development skills with expert-led courses.
                    </p>

                    <div className="max-w-2xl mx-auto relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
                        <div className="relative flex items-center">
                            <Search className="absolute left-5 w-6 h-6 text-gray-500" />
                            <Input
                                type="text"
                                placeholder="Search for courses, skills, or topics..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-14 pr-6 h-16 bg-[#12121a] border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-blue-500 text-lg rounded-2xl shadow-2xl transition-all"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="pb-24 px-4 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-end justify-between mb-10 border-b border-white/5 pb-6">
                        <div>
                            <h2 className="text-3xl font-bold text-white tracking-tight">All Courses</h2>
                            <p className="text-gray-400 mt-1">
                                {loading && !isLoadingMore ? 'Loading catalog...' : `Showing ${totalCourses} available courses`}
                            </p>
                        </div>
                    </div>

                    {loading && !isLoadingMore ? (
                        <div className="flex flex-col items-center justify-center py-32">
                            <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-6" />
                            <p className="text-gray-400 text-lg">Curating your courses...</p>
                        </div>
                    ) : (
                        <>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {courses.map((course) => {
                                    const { gradient } = getCourseVisuals(course.id);
                                    const totalLessons = course.modules?.reduce((acc, mod) => acc + (mod.lessons?.length || 0), 0) || 0;

                                    return (
                                        <Card
                                            key={course.id}
                                            onClick={() => navigate(`/courses/${course.slug}`)}
                                            className="bg-[#12121a] border-white/5 hover:border-blue-500/30 hover:-translate-y-1.5 transition-all duration-300 flex flex-col group h-full overflow-hidden cursor-pointer rounded-2xl"
                                        >
                                            <div className={`h-48 w-full relative bg-gradient-to-br ${gradient} p-6 flex flex-col justify-between overflow-hidden`}>
                                                <div className="relative z-10 flex justify-end w-full">
                                                    <Badge className="bg-black/30 text-white border-white/10 backdrop-blur-md capitalize px-3 py-1">
                                                        {course.level}
                                                    </Badge>
                                                </div>
                                                <BookOpen className="w-16 h-16 text-white/20 absolute -bottom-4 -right-4 transform -rotate-12 group-hover:scale-110 transition-transform duration-500" />
                                            </div>

                                            <div className="p-6 flex flex-col flex-grow">
                                                <div className="mb-4 flex-grow">
                                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
                                                        {course.title}
                                                    </h3>
                                                    <p className="text-sm text-gray-400 line-clamp-3 leading-relaxed">
                                                        {course.description}
                                                    </p>
                                                </div>

                                                <div className="flex items-center gap-4 mb-6 pt-2">
                                                    <div className="flex items-center text-sm text-gray-400">
                                                        <PlayCircle className="w-4 h-4 mr-1.5 text-blue-400" />
                                                        <span>{totalLessons} Lessons</span>
                                                    </div>
                                                    <div className="flex items-center text-sm text-gray-400">
                                                        <Star className="w-4 h-4 mr-1.5 text-amber-500 fill-amber-500" />
                                                        <span>{course.average_rating || 'New'}</span>
                                                    </div>
                                                </div>

                                                <div className="pt-5 border-t border-white/5 mt-auto">
                                                    <Button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            navigate(`/courses/${course.slug}`);
                                                        }}
                                                        className="w-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all group/btn"
                                                    >
                                                        View Course
                                                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-all" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </Card>
                                    );
                                })}
                            </div>

                            {courses.length === 0 && (
                                <div className="text-center py-24 bg-[#12121a] border border-white/5 border-dashed rounded-3xl">
                                    <BookOpen className="w-10 h-10 text-gray-600 mx-auto mb-6" />
                                    <h3 className="text-2xl font-bold text-white mb-3">No courses found</h3>
                                    <Button onClick={() => setSearchQuery('')} className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                                        Clear Search
                                    </Button>
                                </div>
                            )}

                            <div ref={observerTarget} className="h-4 w-full" />

                            <div className="flex flex-col items-center justify-center mt-12 mb-8">
                                {isLoadingMore && <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />}
                            </div>
                        </>
                    )}
                </div>
            </section>

            <FAQSection type="page" slug="courses" />
        </PublicNavbarLayout>
    );
}
