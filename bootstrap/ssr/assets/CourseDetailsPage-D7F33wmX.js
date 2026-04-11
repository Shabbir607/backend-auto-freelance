import { d as distExports, r as reactExports, j as jsxRuntimeExports, L as LoaderCircle, D as Star, bc as CirclePlay, a8 as BookOpen, bd as ChevronUp, k as ChevronDown, be as AnimatePresence, bf as motion, au as Send, aa as User, bg as Video } from "./vendor-oSjIcCqY.js";
import { a as useToast, u as useAuth, b as PublicNavbarLayout, d as Badge, B as Button, C as Card, e as CardContent } from "../ssr.js";
import { T as Textarea } from "./textarea-yWepkaAh.js";
import { c as courseService } from "./courseService-UHMy8Xl5.js";
import "stream";
import "util";
function CourseDetailsPage() {
  const { slug } = distExports.useParams();
  const navigate = distExports.useNavigate();
  const { showToast } = useToast();
  const { isAuthenticated } = useAuth();
  const [course, setCourse] = reactExports.useState(null);
  const [reviews, setReviews] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [expandedModules, setExpandedModules] = reactExports.useState([]);
  const [isBookmarked, setIsBookmarked] = reactExports.useState(false);
  const [rating, setRating] = reactExports.useState(5);
  const [reviewTitle, setReviewTitle] = reactExports.useState("");
  const [reviewComment, setReviewComment] = reactExports.useState("");
  const [isSubmittingReview, setIsSubmittingReview] = reactExports.useState(false);
  const curriculumRef = reactExports.useRef(null);
  const reviewsRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!course) return;
    const seo = course.seo;
    const metaTitle = seo?.title || course.title || "Course - EdgeLancer";
    const metaDesc = seo?.description || course.description || "Learn this course on EdgeLancer.";
    const metaKeywords = seo?.keywords || "";
    const ogImage = seo?.og_image || "";
    const metaTags = seo?.meta_tags || "";
    document.title = metaTitle;
    const updateMeta = (name, content, attr = "name") => {
      if (!content) return;
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    updateMeta("description", metaDesc);
    updateMeta("keywords", metaKeywords);
    updateMeta("og:title", metaTitle, "property");
    updateMeta("og:description", metaDesc, "property");
    updateMeta("og:image", ogImage, "property");
    updateMeta("twitter:title", metaTitle);
    updateMeta("twitter:description", metaDesc);
    updateMeta("twitter:image", ogImage);
    if (metaTags) {
      try {
        const tags = JSON.parse(metaTags);
        if (typeof tags === "object") {
          Object.entries(tags).forEach(([key, val]) => {
            if (typeof val === "string") updateMeta(key, val);
          });
        }
      } catch (e) {
      }
    }
  }, [course]);
  const loadData = reactExports.useCallback(async () => {
    setLoading(true);
    try {
      const res = await courseService.getPublicCourse(slug);
      if (res.success && res.data) {
        const data = res.data.data || res.data;
        setCourse(data);
        if (data.modules?.length > 0) setExpandedModules([data.modules[0].id]);
        const revRes = await courseService.getPublicCourseReviews(data.id);
        if (revRes.success) setReviews(revRes.data.data);
      }
    } catch (e) {
      showToast("Error loading course", "error");
      navigate("/courses");
    } finally {
      setLoading(false);
    }
  }, [slug, showToast, navigate]);
  reactExports.useEffect(() => {
    loadData();
  }, [loadData]);
  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!course) return;
    if (!reviewTitle.trim() || !reviewComment.trim()) {
      showToast("Please provide a title and comment", "error");
      return;
    }
    setIsSubmittingReview(true);
    try {
      const res = await courseService.submitCourseReview(course.id, { rating, title: reviewTitle, comment: reviewComment });
      if (!res.success) {
        showToast(res.message || "Failed to submit review", "error");
        return;
      }
      showToast("Review submitted successfully!", "success");
      setRating(5);
      setReviewTitle("");
      setReviewComment("");
      const revRes = await courseService.getPublicCourseReviews(course.id);
      if (revRes.success) setReviews(revRes.data.data);
    } catch (error) {
      showToast("Failed to submit review", "error");
    } finally {
      setIsSubmittingReview(false);
    }
  };
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center bg-[#0a0a0a]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-10 h-10 animate-spin text-blue-500" }) });
  if (!course) return null;
  const totalLessons = course.modules?.reduce((acc, mod) => acc + (mod.lessons?.length || 0), 0) || 0;
  const sortedModules = [...course.modules || []].sort((a, b) => a.order - b.order);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PublicNavbarLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-[#0a0a0a] text-neutral-200 font-sans selection:bg-blue-500/30", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative pt-32 pb-24 px-6 border-b border-white/10 bg-[#0a0a0a]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "border-blue-500/30 text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full uppercase tracking-widest text-[10px] font-bold", children: [
            course.level,
            " Level"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-amber-500 text-sm font-semibold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4 fill-amber-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: course.average_rating || "5.0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-neutral-500 font-normal", children: [
              "(",
              course.reviews_count,
              " reviews)"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6 tracking-tight", children: course.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg md:text-xl text-neutral-400 mb-10 leading-relaxed max-w-2xl", children: course.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "lg",
              onClick: () => navigate(`/${course.slug}/${sortedModules[0]?.lessons[0]?.slug}`),
              className: "bg-blue-600 hover:bg-blue-700 text-white h-14 px-8 rounded-xl font-semibold text-base transition-all",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { className: "w-5 h-5 mr-2" }),
                "Start Learning Now"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "lg",
              variant: "outline",
              onClick: () => scrollToSection(curriculumRef),
              className: "h-14 px-8 rounded-xl border-white/10 hover:bg-white/5 text-white font-semibold transition-all",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-5 h-5 mr-2" }),
                "View Syllabus"
              ]
            }
          )
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 px-6 relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-8 space-y-20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: curriculumRef, className: "scroll-mt-32", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold text-white tracking-tight", children: "Course Syllabus" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-neutral-500 font-medium", children: [
              sortedModules.length,
              " Modules • ",
              totalLessons,
              " Lessons"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", children: sortedModules.map((module, idx) => {
            const isExpanded = expandedModules.includes(module.id);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-white/10 rounded-2xl bg-[#111111] overflow-hidden transition-colors hover:border-white/20", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  onClick: () => setExpandedModules((prev) => isExpanded ? prev.filter((id) => id !== module.id) : [...prev, module.id]),
                  className: "w-full flex items-center justify-between p-6 text-left",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-sm font-bold text-neutral-400", children: idx + 1 }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-white", children: module.title }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-neutral-500 mt-1", children: [
                          module.lessons?.length,
                          " Lessons"
                        ] })
                      ] })
                    ] }),
                    isExpanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-5 h-5 text-neutral-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-5 h-5 text-neutral-500" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isExpanded && /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  initial: { height: 0 },
                  animate: { height: "auto" },
                  exit: { height: 0 },
                  className: "overflow-hidden bg-[#0a0a0a] border-t border-white/5",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 space-y-1", children: module.lessons?.sort((a, b) => a.order - b.order).map((lesson, lIdx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      onClick: () => navigate(`/${course.slug}/${lesson.slug}`),
                      className: "w-full flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-colors group text-left",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-neutral-600 font-mono w-4", children: [
                            lIdx + 1,
                            "."
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { className: "w-4 h-4 text-blue-400 shrink-0" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-sm font-medium text-neutral-300 group-hover:text-white transition-colors`, children: lesson.title })
                        ] }),
                        lesson.is_free_preview && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "border-blue-500/20 text-blue-400 bg-blue-500/10 text-[10px] uppercase tracking-wider", children: "Preview" })
                      ]
                    },
                    lesson.id
                  )) })
                }
              ) })
            ] }, module.id);
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: reviewsRef, className: "scroll-mt-32 pt-10 border-t border-white/10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold text-white tracking-tight mb-8", children: "Student Reviews" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-[#111111] border-white/10 mb-10 rounded-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6 md:p-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-xl font-semibold text-white mb-6 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-5 h-5 text-blue-400" }),
              " Rate this course"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleReviewSubmit, className: "space-y-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 mb-2", children: [1, 2, 3, 4, 5].map((star) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setRating(star),
                  className: "focus:outline-none transition-transform hover:scale-110",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: `w-8 h-8 ${star <= rating ? "fill-amber-500 text-amber-500" : "text-neutral-700"}` })
                },
                star
              )) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    disabled: isSubmittingReview,
                    type: "text",
                    value: reviewTitle,
                    onChange: (e) => setReviewTitle(e.target.value),
                    className: "w-full h-12 rounded-xl border border-white/10 bg-black/50 px-4 text-white placeholder:text-neutral-600 focus:outline-none focus:border-blue-500/50 transition-colors",
                    placeholder: "Review Title (e.g., Amazing Course!)",
                    required: true
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Textarea,
                  {
                    disabled: isSubmittingReview,
                    value: reviewComment,
                    onChange: (e) => setReviewComment(e.target.value),
                    className: "w-full min-h-[120px] rounded-xl border border-white/10 bg-black/50 p-4 text-white placeholder:text-neutral-600 focus:outline-none focus:border-blue-500/50 transition-colors resize-y",
                    placeholder: "What did you think of the content?",
                    required: true
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "submit",
                  disabled: isSubmittingReview,
                  className: "bg-white hover:bg-neutral-200 text-black font-semibold px-8 h-12 rounded-xl w-full sm:w-auto",
                  children: [
                    isSubmittingReview ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin mr-2" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-4 h-4 mr-2" }),
                    isSubmittingReview ? "Submitting..." : "Post Review"
                  ]
                }
              )
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6", children: reviews.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-12 border border-white/5 border-dashed rounded-2xl bg-white/[0.02]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-neutral-500", children: "No reviews yet. Be the first to share your thoughts!" }) }) : reviews.map((review) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 rounded-2xl bg-white/[0.03] border border-white/5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-5 h-5" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-medium text-white", children: review.user?.name || "Student" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex", children: [1, 2, 3, 4, 5].map((star) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: `w-3.5 h-3.5 ${star <= review.rating ? "fill-amber-500 text-amber-500" : "text-neutral-700"}` }, star)) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-neutral-600", children: [
                    "• ",
                    new Date(review.created_at).toLocaleDateString()
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { className: "font-semibold text-neutral-200 mb-2", children: review.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-neutral-400 text-sm leading-relaxed", children: review.comment })
          ] }, review.id)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-4 relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky top-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-[#111111] border-white/10 overflow-hidden shadow-2xl rounded-3xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-24 bg-gradient-to-br from-blue-900/40 to-black relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-8 -mt-8 relative z-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 shadow-xl mb-8 flex flex-col items-center justify-center text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "w-10 h-10 text-blue-400 mb-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-white font-bold text-lg mb-1", children: "Interactive Course" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-neutral-500", children: [
              totalLessons,
              " High-Quality Lessons"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "lg",
              onClick: () => navigate(`/lessons/${sortedModules[0]?.lessons[0]?.slug}`),
              className: "w-full bg-blue-600 hover:bg-blue-700 text-white h-14 rounded-xl font-bold text-base mb-6",
              children: "Enroll Now"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-neutral-600 uppercase tracking-widest", children: "Course Description" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-neutral-400 leading-relaxed", children: course.description || "No description provided for this course." })
          ] })
        ] })
      ] }) }) })
    ] }) })
  ] }) });
}
export {
  CourseDetailsPage as default
};
