import { PublicNavbarLayout } from '@/components/layout/PublicNavbarLayout';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { cn } from '@/lib/utils';
import { Course, Lesson, courseService } from '@/services/courseService';
import {
    ArrowLeft,
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    Clock,
    Layers,
    LayoutGrid,
    Loader2,
    Lock,
    Maximize2,
    Minimize2,
    Pause,
    Play,
    PlayCircle,
    RotateCcw,
    RotateCw,
    Volume1,
    Volume2,
    VolumeX,
    X,
    Download,
    ExternalLink,
    Star,
    FileText,
    Globe
} from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SEOHelmet } from '@/components/SEO/SEOHelmet';

// ─────────────────────────────────────────────────────────────────────────────
// Utility
// ─────────────────────────────────────────────────────────────────────────────
const fmt = (s: number) => {
    if (isNaN(s) || s < 0) return '0:00';
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = Math.floor(s % 60);
    if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
    return `${m}:${String(sec).padStart(2, '0')}`;
};

// ─────────────────────────────────────────────────────────────────────────────
// Skip Ripple Indicator
// ─────────────────────────────────────────────────────────────────────────────
function SkipIndicator({ side, show, seconds }: { side: 'left' | 'right'; show: boolean; seconds: number }) {
    return (
        <div className={cn(
            "absolute top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-2 transition-all duration-300 pointer-events-none",
            side === 'left' ? 'left-6 sm:left-10' : 'right-6 sm:right-10',
            show ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
        )}>
            <div className="relative w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl">
                {side === 'left'
                    ? <RotateCcw className="w-7 h-7 text-white" />
                    : <RotateCw className="w-7 h-7 text-white" />
                }
                {show && (
                    <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping" />
                )}
            </div>
            <span className="text-white text-xs font-bold bg-black/50 rounded-full px-3 py-1 backdrop-blur-sm border border-white/10">
                {side === 'left' ? '−' : '+'}{seconds}s
            </span>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Volume Control
// ─────────────────────────────────────────────────────────────────────────────
function VolumeControl({ volume, muted, onVolumeChange, onToggleMute }: {
    volume: number; muted: boolean;
    onVolumeChange: (v: number) => void;
    onToggleMute: () => void;
}) {
    const [hovering, setHovering] = useState(false);
    const VIcon = muted || volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;

    return (
        <div
            className="flex items-center gap-1.5"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
        >
            <button
                onClick={onToggleMute}
                className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-white transition-colors rounded-lg hover:bg-white/10"
                title={muted ? 'Unmute (M)' : 'Mute (M)'}
            >
                <VIcon className="w-4 h-4" />
            </button>
            <div className={cn(
                "overflow-hidden transition-all duration-200 flex items-center",
                hovering ? "w-20 opacity-100" : "w-0 opacity-0"
            )}>
                <input
                    type="range" min={0} max={1} step={0.02}
                    value={muted ? 0 : volume}
                    onChange={e => onVolumeChange(parseFloat(e.target.value))}
                    className="w-full cursor-pointer"
                    style={{
                        height: '3px',
                        appearance: 'none',
                        background: `linear-gradient(to right, #3b82f6 ${(muted ? 0 : volume) * 100}%, rgba(255,255,255,0.15) ${(muted ? 0 : volume) * 100}%)`,
                        borderRadius: '99px',
                        accentColor: '#3b82f6'
                    }}
                />
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Speed Menu
// ─────────────────────────────────────────────────────────────────────────────
const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

function SpeedMenu({ speed, onChange }: { speed: number; onChange: (s: number) => void }) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setOpen(o => !o)}
                className="h-7 px-2.5 rounded-lg text-[11px] font-black text-white/50 hover:text-white hover:bg-white/10 transition-all border border-transparent hover:border-white/10 tabular-nums tracking-tight"
                title="Playback speed"
            >
                {speed === 1 ? '1×' : `${speed}×`}
            </button>
            {open && (
                <div className="absolute bottom-full mb-2 right-0 w-[100px] bg-[#0d1117]/98 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-50">
                    <div className="px-3 py-2 border-b border-white/[0.06]">
                        <p className="text-[9px] uppercase tracking-[0.2em] text-white/25 font-bold">Speed</p>
                    </div>
                    {SPEEDS.map(s => (
                        <button
                            key={s}
                            onClick={() => { onChange(s); setOpen(false); }}
                            className={cn(
                                "w-full px-3 py-2 text-xs font-semibold text-left transition-all flex items-center justify-between",
                                speed === s
                                    ? "bg-blue-500/15 text-blue-300"
                                    : "text-white/40 hover:bg-white/[0.04] hover:text-white"
                            )}
                        >
                            <span>{s === 1 ? 'Normal' : `${s}×`}</span>
                            {speed === s && <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Custom Video Player
// ─────────────────────────────────────────────────────────────────────────────
function VideoPlayer({ src, thumbnail, title, onEnded }: {
    src: string; thumbnail?: string; title: string; onEnded?: () => void;
}) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const hideTimer = useRef<ReturnType<typeof setTimeout>>();
    const skipBTimer = useRef<ReturnType<typeof setTimeout>>();
    const skipFTimer = useRef<ReturnType<typeof setTimeout>>();

    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(false);
    const [volume, setVolume] = useState(1);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [buffered, setBuffered] = useState(0);
    const [showControls, setShowControls] = useState(true);
    const [started, setStarted] = useState(false);
    const [speed, setSpeed] = useState(1);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [hoverTime, setHoverTime] = useState<number | null>(null);
    const [hoverPct, setHoverPct] = useState(0);
    const [showSkipBack, setShowSkipBack] = useState(false);
    const [showSkipFwd, setShowSkipFwd] = useState(false);

    const isValidSource = (() => {
        try {
            new URL(src);
            return true;
        } catch {
            return src.startsWith('/') || src.startsWith('http');
        }
    })();

    const isEmbed = !!(
        src.includes('youtube') ||
        src.includes('vimeo') ||
        src.includes('loom') ||
        (!src.match(/\.(mp4|webm|ogg|mov)(\?|$)/i))
    );

    const resetHideTimer = useCallback(() => {
        clearTimeout(hideTimer.current);
        setShowControls(true);
        if (playing) {
            hideTimer.current = setTimeout(() => setShowControls(false), 3200);
        }
    }, [playing]);

    useEffect(() => { resetHideTimer(); }, [playing, resetHideTimer]);

    useEffect(() => {
        const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
        document.addEventListener('fullscreenchange', onFsChange);
        return () => document.removeEventListener('fullscreenchange', onFsChange);
    }, []);

    const togglePlay = () => {
        if (!videoRef.current) return;
        if (!started) setStarted(true);
        if (playing) { videoRef.current.pause(); }
        else { videoRef.current.play(); }
        resetHideTimer();
    };

    const seek = (delta: number) => {
        if (!videoRef.current) return;
        videoRef.current.currentTime = Math.max(0, Math.min(duration, videoRef.current.currentTime + delta));
        resetHideTimer();
    };

    const skipBack = () => {
        seek(-10);
        setShowSkipBack(true);
        clearTimeout(skipBTimer.current);
        skipBTimer.current = setTimeout(() => setShowSkipBack(false), 900);
    };

    const skipFwd = () => {
        seek(10);
        setShowSkipFwd(true);
        clearTimeout(skipFTimer.current);
        skipFTimer.current = setTimeout(() => setShowSkipFwd(false), 900);
    };

    const handleTimeUpdate = () => {
        if (!videoRef.current) return;
        setCurrentTime(videoRef.current.currentTime);
        if (videoRef.current.buffered.length > 0) {
            const end = videoRef.current.buffered.end(videoRef.current.buffered.length - 1);
            setBuffered((end / videoRef.current.duration) * 100);
        }
    };

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!progressRef.current || !videoRef.current) return;
        const rect = progressRef.current.getBoundingClientRect();
        const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        videoRef.current.currentTime = pct * duration;
        resetHideTimer();
    };

    const handleProgressHover = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!progressRef.current) return;
        const rect = progressRef.current.getBoundingClientRect();
        const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        setHoverTime(pct * duration);
        setHoverPct(pct * 100);
    };

    const handleVolumeChange = (v: number) => {
        if (!videoRef.current) return;
        videoRef.current.volume = v;
        setVolume(v);
        if (v > 0) { videoRef.current.muted = false; setMuted(false); }
    };

    const toggleMute = () => {
        if (!videoRef.current) return;
        const next = !muted;
        videoRef.current.muted = next;
        setMuted(next);
    };

    const changeSpeed = (s: number) => {
        if (!videoRef.current) return;
        videoRef.current.playbackRate = s;
        setSpeed(s);
    };

    const toggleFullscreen = () => {
        if (!containerRef.current) return;
        if (document.fullscreenElement) document.exitFullscreen();
        else containerRef.current.requestFullscreen();
    };

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            const tag = (e.target as HTMLElement).tagName;
            if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
            if (e.key === ' ' || e.key === 'k') { e.preventDefault(); togglePlay(); }
            if (e.key === 'ArrowLeft') { e.preventDefault(); skipBack(); }
            if (e.key === 'ArrowRight') { e.preventDefault(); skipFwd(); }
            if (e.key === 'f') { e.preventDefault(); toggleFullscreen(); }
            if (e.key === 'm') { e.preventDefault(); toggleMute(); }
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [playing, muted, duration]);

    const progress = duration ? (currentTime / duration) * 100 : 0;
    const remaining = duration - currentTime;

    if (!isValidSource) return null;

    if (isEmbed) {
        return (
            <div className="relative w-full aspect-[16/9] max-h-[85vh] bg-black overflow-hidden shadow-2xl">
                <iframe
                    src={src}
                    title={title}
                    className="absolute inset-0 w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            onMouseMove={resetHideTimer}
            onMouseLeave={() => playing && setShowControls(false)}
            className="relative w-full aspect-[16/9] max-h-[85vh] bg-black overflow-hidden shadow-2xl"
            style={{ cursor: showControls ? 'default' : 'none' }}
        >
            {!started && thumbnail && (
                <div className="absolute inset-0 z-10">
                    <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/30" />
                    <div className="absolute bottom-20 left-6 right-6">
                        <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-bold mb-2">Now Playing</p>
                        <h3 className="text-white text-xl font-bold leading-snug line-clamp-2 drop-shadow-lg max-w-2xl">{title}</h3>
                    </div>
                </div>
            )}

            <video
                ref={videoRef}
                src={src}
                className="absolute inset-0 w-full h-full object-contain"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={() => {
                    setDuration(videoRef.current?.duration || 0);
                    if (videoRef.current) videoRef.current.volume = volume;
                }}
                onEnded={() => onEnded?.()}
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                playsInline
            />

            <div className="absolute inset-0 z-20 flex" onClick={e => e.stopPropagation()}>
                <div className="w-1/4 h-full" onDoubleClick={skipBack} onClick={togglePlay} />
                <div className="flex-1 h-full" onClick={togglePlay} />
                <div className="w-1/4 h-full" onDoubleClick={skipFwd} onClick={togglePlay} />
            </div>

            <SkipIndicator side="left" show={showSkipBack} seconds={10} />
            <SkipIndicator side="right" show={showSkipFwd} seconds={10} />

            {(!started || !playing) && (
                <div className={cn("absolute inset-0 z-25 flex items-center justify-center pointer-events-none transition-all duration-300", started && !playing ? "opacity-80" : "opacity-100")}>
                    <div className="relative">
                        <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-2xl">
                            <Play className="w-9 h-9 text-white fill-white ml-1" />
                        </div>
                    </div>
                </div>
            )}

            <div className={cn("absolute inset-0 z-30 flex flex-col justify-end transition-all duration-300 pointer-events-none", showControls ? "opacity-100" : "opacity-0")}>
                <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black/95 via-black/60 to-transparent" />
                <div className="relative px-4 sm:px-5 pb-4 pt-12 pointer-events-auto">
                    <div className="mb-3 relative group/prog" onMouseLeave={() => setHoverTime(null)}>
                        {hoverTime !== null && (
                            <div className="absolute -top-9 px-2.5 py-1.5 bg-[#0d1117]/95 border border-white/10 rounded-xl text-[11px] text-white shadow-xl pointer-events-none transform -translate-x-1/2 whitespace-nowrap z-10 backdrop-blur-xl" style={{ left: `${hoverPct}%` }}>
                                {fmt(hoverTime)}
                            </div>
                        )}
                        <div ref={progressRef} onClick={handleProgressClick} onMouseMove={handleProgressHover} className="w-full h-1 group-hover/prog:h-3 bg-white/10 rounded-full cursor-pointer transition-all duration-150 relative">
                            <div className="absolute inset-y-0 left-0 bg-white/15 rounded-full" style={{ width: `${buffered}%` }} />
                            <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #3b82f6 0%, #818cf8 100%)' }} />
                            <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow-lg shadow-blue-500/50 -ml-2 opacity-0 group-hover/prog:opacity-100 transition-all duration-150 scale-75 group-hover/prog:scale-100" style={{ left: `${progress}%` }} />
                        </div>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-0.5 sm:gap-1">
                            <button onClick={togglePlay} className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-white/10 text-white transition-all active:scale-90">
                                {playing ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
                            </button>
                            <button onClick={skipBack} className="relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-white/10 text-white/60 hover:text-white transition-all active:scale-90"><RotateCcw className="w-[18px] h-[18px]" /><span className="absolute text-[6.5px] font-black" style={{ top: '54%', left: '51%', transform: 'translate(-47%, -30%)' }}>10</span></button>
                            <button onClick={skipFwd} className="relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-white/10 text-white/60 hover:text-white transition-all active:scale-90"><RotateCw className="w-[18px] h-[18px]" /><span className="absolute text-[6.5px] font-black" style={{ top: '54%', left: '51%', transform: 'translate(-47%, -30%)' }}>10</span></button>
                            <VolumeControl volume={volume} muted={muted} onVolumeChange={handleVolumeChange} onToggleMute={toggleMute} />
                            <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-white/40 ml-1 select-none">
                                <span className="text-white/80">{fmt(currentTime)}</span>
                                <span className="text-white/20">/</span>
                                <span>{fmt(duration)}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <SpeedMenu speed={speed} onChange={changeSpeed} />
                            <button onClick={toggleFullscreen} className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-white/10 text-white/50 hover:text-white transition-all">
                                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Stat Card
// ─────────────────────────────────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, sub, accent = false }: {
    icon: any; label: string; value: string; sub?: string; accent?: boolean;
}) {
    return (
        <div className={cn("flex items-center gap-3 px-4 py-3.5 rounded-2xl border transition-all", accent ? "bg-blue-500/[0.08] border-blue-500/[0.15] text-blue-300" : "bg-white/[0.02] border-white/[0.05] text-white/50")}>
            <div className={cn("w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0", accent ? "bg-blue-500/15" : "bg-white/[0.04]")}>
                <Icon className={cn("w-4 h-4", accent ? "text-blue-400" : "text-white/25")} />
            </div>
            <div className="min-w-0">
                <p className="text-[9px] uppercase tracking-[0.18em] font-bold opacity-50 leading-none mb-1.5">{label}</p>
                <p className={cn("text-sm font-bold leading-none truncate", accent ? "text-blue-200" : "text-white/75")}>{value}</p>
                {sub && <p className="text-[10px] mt-1 opacity-40 leading-none truncate">{sub}</p>}
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────────────────────────────────────

export default function LessonViewerPage() {
    const { courseSlug, lessonSlug } = useParams<{ courseSlug: string, lessonSlug: string }>();
    const navigate = useNavigate();
    const { showToast } = useToast();

    const [lesson, setLesson] = useState<Lesson | null>(null);
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);
    const [progressUpdating, setProgressUpdating] = useState(false);
    const [allLessonsSorted, setAllLessonsSorted] = useState<Lesson[]>([]);
    const [currentLessonIndex, setCurrentLessonIndex] = useState(-1);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'content' | 'overview' | 'resources'>('content');

    const setupLessonList = (fullCourse: Course, currentLesson: Lesson) => {
        const flat: Lesson[] = [];
        const sortedModules = [...(fullCourse.modules || [])].sort((a, b) => a.order - b.order);
        for (const mod of sortedModules) {
            flat.push(...[...(mod.lessons || [])].sort((a, b) => a.order - b.order));
        }
        setAllLessonsSorted(flat);
        setCurrentLessonIndex(flat.findIndex(l => l.id === currentLesson.id));
    };

    const loadLessonData = useCallback(async () => {
        setLoading(true);
        try {
            const res = await courseService.getPublicLesson(lessonSlug as string);
            if (res.success && res.data) {
                const fetchedLesson = (res.data as any).data || res.data;
                setLesson(fetchedLesson);

                const nestedCourse = fetchedLesson.module?.course;
                const cSlug = nestedCourse?.slug || (fetchedLesson as any).course?.slug || courseSlug;

                if (cSlug) {
                    const courseRes = await courseService.getPublicCourse(cSlug);
                    if (courseRes.success && courseRes.data) {
                        const fullCourse = (courseRes.data as any).data || courseRes.data;
                        setCourse(fullCourse);
                        setupLessonList(fullCourse, fetchedLesson);
                    }
                }
            } else {
                navigate('/');
                showToast('Lesson not found', 'error');
            }
        } catch (error) {
            console.error('Failed to load lesson:', error);
            navigate('/');
            showToast('Failed to load lesson', 'error');
        } finally {
            setLoading(false);
        }
    }, [lessonSlug, courseSlug, navigate, showToast]);

    useEffect(() => {
        if (lessonSlug) {
            loadLessonData();
        }
    }, [lessonSlug, loadLessonData]);

    const handleMarkComplete = async () => {
        if (!lesson) return;
        setProgressUpdating(true);
        try {
            const res = await courseService.updateLessonProgress(lesson.id, { watched_percentage: 100 });
            if (res.success && res.data?.progress) {
                setLesson(prev => prev ? {
                    ...prev,
                    user_progress: {
                        ...(prev.user_progress || {}),
                        ...res.data.progress,
                        is_completed: true,
                        watched_percentage: 100
                    } as any
                } : null);

                showToast('Lesson marked as completed!', 'success');

                if (currentLessonIndex !== -1 && currentLessonIndex < allLessonsSorted.length - 1) {
                    navigate(`/${courseSlug}/${allLessonsSorted[currentLessonIndex + 1].slug}`, { replace: true });
                }
            } else {
                showToast(res.message || 'Failed to update progress', 'error');
            }
        } catch (error) {
            console.error('Progress update error:', error);
            showToast('Failed to update progress', 'error');
        } finally {
            setProgressUpdating(false);
        }
    };

    const hasPrevious = currentLessonIndex > 0;
    const hasNext = currentLessonIndex !== -1 && currentLessonIndex < allLessonsSorted.length - 1;
    const isCurrentLessonCompleted = lesson?.user_progress?.watched_percentage && lesson.user_progress.watched_percentage >= 90 || lesson?.user_progress?.is_completed;
    const completedCount = (currentLessonIndex !== -1 ? currentLessonIndex : 0) + (isCurrentLessonCompleted ? 1 : 0);
    const progressPct = allLessonsSorted.length > 0 ? Math.round((completedCount / allLessonsSorted.length) * 100) : 0;
    const currentModule = course?.modules?.find(m => (m.lessons || []).some((l: Lesson) => l.id === lesson?.id));

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-[#06080f]">
                <div className="flex flex-col items-center gap-5">
                    <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
                    <p className="text-white/30 text-sm">Loading lesson…</p>
                </div>
            </div>
        );
    }

    if (!lesson) return null;

    return (
        <PublicNavbarLayout>
            <SEOHelmet title={lesson.title} description={lesson.seo?.description || lesson.title} />
            <div className="min-h-screen bg-[#06080f] text-white flex flex-col font-sans">
                <header className="sticky top-[64px] z-40 w-full backdrop-blur-3xl bg-[#06080f]/90 border-b border-white/[0.05]">
                    <div className="max-w-7xl mx-auto h-[58px] flex items-center justify-between px-4 lg:px-6">
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                            <button onClick={() => navigate(course?.slug ? `/courses/${course.slug}` : '/')} className="w-8 h-8 rounded-xl border border-white/[0.07] flex items-center justify-center text-white/35 hover:text-white transition-all"><ArrowLeft className="w-3.5 h-3.5" /></button>
                            <div className="hidden sm:flex flex-col min-w-0">
                                <p className="text-[9px] text-white/20 uppercase tracking-widest font-bold leading-none truncate">{(course as any)?.title || 'Course'}</p>
                                <h1 className="text-[13px] font-semibold text-white/75 truncate leading-none mt-1">{lesson.title}</h1>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            {allLessonsSorted.length > 0 && (
                                <div className="hidden md:flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-white/[0.06] bg-white/[0.02]">
                                    <div className="w-16 h-1 bg-white/[0.08] rounded-full overflow-hidden">
                                        <div className="h-full rounded-full bg-blue-500" style={{ width: `${progressPct}%` }} />
                                    </div>
                                    <span className="text-[10px] text-white/25 font-bold">{progressPct}%</span>
                                </div>
                            )}
                            {course && <button onClick={() => setSidebarOpen(o => !o)} className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/[0.07] text-white/35 hover:text-white transition-all text-xs font-semibold"><Layers className="w-3.5 h-3.5" /><span>Contents</span></button>}
                            <button onClick={handleMarkComplete} disabled={progressUpdating} className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[12px] font-bold transition-all bg-emerald-500/[0.08] border border-emerald-500/[0.18] text-emerald-400 hover:bg-emerald-500/[0.13]">{progressUpdating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />}<span className="hidden sm:inline">Mark Complete</span></button>
                        </div>
                    </div>
                </header>

                <div className="flex-1 flex flex-col lg:flex-row max-w-7xl mx-auto w-full py-8 px-4 lg:px-6 gap-8">
                    {sidebarOpen && <div className="lg:hidden fixed inset-0 z-40 bg-black/75 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />}
                    <main className="flex-1 min-w-0">
                        <div className="bg-[#02030a]">
                            {lesson.video_url && <VideoPlayer src={lesson.video_url} thumbnail={(lesson as any).thumbnail} title={lesson.title} onEnded={() => hasNext && showToast('Up next…', 'info')} />}
                        </div>
                        <div className="px-4 py-5 border-b border-white/[0.04] bg-[#070910]">
                            <div className="max-w-4xl mx-auto">
                                <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-5">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-2">
                                            {lesson.is_free_preview && <Badge variant="outline" className="text-[9px] border-emerald-500/25 text-emerald-400 font-black px-2">Free Preview</Badge>}
                                            {currentModule && <span className="text-[10px] text-white/20 uppercase tracking-widest font-bold">{currentModule.title}</span>}
                                        </div>
                                        <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight leading-snug">{lesson.title}</h2>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {hasPrevious && <button onClick={() => navigate(`/${courseSlug}/${allLessonsSorted[currentLessonIndex - 1].slug}`, { replace: true })} className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-white/[0.07] text-white/35 hover:text-white transition-all text-xs font-semibold"><ChevronLeft className="w-3.5 h-3.5" />Prev</button>}
                                        {hasNext && <button onClick={() => navigate(`/${courseSlug}/${allLessonsSorted[currentLessonIndex + 1].slug}`, { replace: true })} className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-[#06080f] hover:bg-white/90 transition-all text-xs font-bold active:scale-95">Next<ChevronRight className="w-3.5 h-3.5" /></button>}
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                                    <StatCard icon={LayoutGrid} label="Lesson" value={currentLessonIndex >= 0 ? `${currentLessonIndex + 1} / ${allLessonsSorted.length}` : '—'} sub="in this course" accent />
                                    <StatCard icon={Layers} label="Module" value={currentModule?.title || '—'} sub={`Part ${(course?.modules || []).findIndex(m => m.id === currentModule?.id) + 1} of ${(course?.modules || []).length}`} />
                                    <StatCard icon={CheckCircle2} label="Completed" value={`${completedCount} lesson${completedCount !== 1 ? 's' : ''}`} sub="before this one" />
                                    <StatCard icon={Clock} label="Progress" value={`${progressPct}%`} sub={`${allLessonsSorted.length - completedCount} lessons left`} />
                                </div>
                            </div>
                        </div>
                        <div className="max-w-4xl mx-auto px-4 py-7">
                            <div className="flex items-center border-b border-white/[0.05] mb-8 overflow-x-auto">
                                {(['content', 'overview', 'resources'] as const).map(tab => {
                                    if (tab === 'resources' && (!lesson.resources || lesson.resources.length === 0)) return null;
                                    return (
                                        <button key={tab} onClick={() => setActiveTab(tab)} className={cn("px-4 py-2.5 text-[12px] font-bold capitalize transition-all border-b-2 -mb-px tracking-wide whitespace-nowrap", activeTab === tab ? "border-blue-400 text-blue-300" : "border-transparent text-white/25 hover:text-white")}>
                                            {tab === 'content' ? 'Lesson Content' : tab === 'resources' ? `Resources (${lesson.resources?.length})` : 'Overview'}
                                        </button>
                                    );
                                })}
                            </div>
                            {activeTab === 'content' && lesson.text_content && (
                                <div className="prose prose-invert prose-blue max-w-none text-white/50 leading-[1.95] text-[15px]" dangerouslySetInnerHTML={{ __html: lesson.text_content }} />
                            )}
                            {activeTab === 'overview' && (
                                <div className="space-y-8">
                                    <div className="space-y-3">
                                        <h4 className="text-[10px] uppercase tracking-widest font-black text-white/20">Description</h4>
                                        <p className="text-white/60 leading-relaxed text-[15px]">{lesson.seo?.description || "No specific overview provided."}</p>
                                    </div>
                                    {course && (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <Globe className="w-5 h-5 text-blue-400" />
                                                    <h4 className="text-[13px] font-bold text-white/80">Course Details</h4>
                                                </div>
                                                <div className="space-y-2 text-xs">
                                                    <div className="flex justify-between"><span className="text-white/30">Rating</span><span className="text-amber-400 font-bold">{course.average_rating || 0}</span></div>
                                                    <div className="flex justify-between"><span className="text-white/30">Level</span><span className="text-white/60 uppercase">{course.level}</span></div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                            {activeTab === 'resources' && (
                                <div className="space-y-4">
                                    <div className="flex flex-col gap-3">
                                        {lesson.resources?.map((resource) => (
                                            <div key={resource.id} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.03] transition-all group">
                                                <div className="flex items-center gap-4">
                                                    <FileText className="w-6 h-6 text-blue-400/70" />
                                                    <div className="min-w-0">
                                                        <h4 className="text-sm font-bold text-white group-hover:text-blue-200 truncate">{resource.title}</h4>
                                                        <span className="text-[10px] text-white/20 uppercase font-black">{resource.file_type || 'File'}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <a href={resource.file_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-white/30 hover:text-white"><ExternalLink className="w-4 h-4" /></a>
                                                    <a href={resource.file_url} download className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-900/40"><Download className="w-3.5 h-3.5" />Download</a>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </main>

                    {course && (
                        <aside className={cn("w-full lg:w-[320px] shrink-0 bg-[#070910] border border-white/[0.05] rounded-3xl overflow-hidden flex flex-col shadow-2xl lg:sticky lg:top-[138px] lg:h-[calc(100vh-160px)]", !sidebarOpen && "hidden lg:flex")}>
                            <div className="px-4 py-4 border-b border-white/[0.05] space-y-3">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-[13px] font-bold text-white">Course Contents</h3>
                                    <button className="lg:hidden" onClick={() => setSidebarOpen(false)}><X className="w-4 h-4" /></button>
                                </div>
                                <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl px-3.5 py-3">
                                    <div className="flex justify-between mb-2.5"><span className="text-[9px] text-white/25 uppercase font-black">Progress</span><span className="text-[11px] text-white/40">{completedCount}/{allLessonsSorted.length}</span></div>
                                    <div className="w-full h-1.5 bg-white/[0.05] rounded-full overflow-hidden"><div className="h-full bg-blue-500 transition-all duration-700" style={{ width: `${progressPct}%` }} /></div>
                                </div>
                            </div>
                            <div className="flex-1 overflow-y-auto py-3 px-2">
                                {(course.modules || []).sort((a, b) => a.order - b.order).map((module, mIndex) => (
                                    <div key={module.id} className="mb-4">
                                        <div className="flex items-center gap-2 px-3 mb-1"><span className="text-[9px] font-black text-white/15">{mIndex + 1}</span><div className="flex-1 h-px bg-white/[0.04]" /><span className="text-[10px] font-bold text-white/22 truncate">{module.title}</span></div>
                                        <div className="space-y-0.5">
                                            {(module.lessons || []).sort((a, b) => a.order - b.order).map((l) => {
                                                const isActive = l.id === lesson?.id;
                                                const canAccess = l.is_free_preview;
                                                const globalIdx = allLessonsSorted.findIndex(al => al.id === l.id);
                                                const isDone = globalIdx !== -1 && currentLessonIndex > globalIdx;
                                                return (
                                                    <div key={l.id} onClick={() => canAccess && !isActive && navigate(`/${courseSlug}/${l.slug}`, { replace: true })} className={cn("group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all cursor-pointer", isActive ? "bg-blue-500/[0.07] border border-blue-500/[0.12]" : canAccess ? "hover:bg-white/[0.025]" : "opacity-30 cursor-not-allowed")}>
                                                        {isActive && <div className="absolute left-0 top-2.5 bottom-2.5 w-[2px] bg-blue-500" />}
                                                        <div className={cn("w-6 h-6 rounded-lg flex items-center justify-center", isActive ? "bg-blue-500/20" : isDone ? "bg-emerald-500/10" : "bg-white/[0.03]")}>
                                                            {isActive ? <PlayCircle className="w-3.5 h-3.5 text-blue-400" /> : isDone ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : !canAccess ? <Lock className="w-3 h-3 text-white/15" /> : <div className="w-1.5 h-1.5 rounded-full bg-white/15" />}
                                                        </div>
                                                        <p className={cn("text-[12px] font-medium truncate", isActive ? "text-blue-300" : isDone ? "text-white/30" : "text-white/50")}>{l.title}</p>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </aside>
                    )}
                </div>
            </div>
        </PublicNavbarLayout>
    );
}
