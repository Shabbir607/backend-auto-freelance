import { jsx, jsxs } from "react/jsx-runtime";
import { a as useToast, u as useAuth, b as PublicNavbarLayout, S as SEOHelmet, d as Badge, B as Button, C as Card } from "../ssr.js";
import { T as Textarea } from "./textarea-CMsb0E2l.js";
import { c as courseService } from "./courseService-UHMy8Xl5.js";
import { Loader2, ArrowLeft, Star, PlayCircle, ChevronUp, ChevronDown, User, Video } from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import "react-dom/server";
import "react-router";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-dialog";
import "@radix-ui/react-icons";
import "zustand";
import "@radix-ui/react-avatar";
import "@radix-ui/react-scroll-area";
import "date-fns";
import "react-helmet-async";
import "reactflow";
import "@radix-ui/react-switch";
import "react-i18next";
function CourseDetailsPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { isAuthenticated } = useAuth();
  const [course, setCourse] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedModules, setExpandedModules] = useState([]);
  const [rating, setRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const loadData = useCallback(async () => {
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
  useEffect(() => {
    loadData();
  }, [loadData]);
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
  if (loading) return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center bg-[#0a0a0a]", children: /* @__PURE__ */ jsx(Loader2, { className: "w-10 h-10 animate-spin text-blue-500" }) });
  if (!course) return null;
  const totalLessons = course.modules?.reduce((acc, mod) => acc + (mod.lessons?.length || 0), 0) || 0;
  const sortedModules = [...course.modules || []].sort((a, b) => a.order - b.order);
  return /* @__PURE__ */ jsxs(PublicNavbarLayout, { children: [
    /* @__PURE__ */ jsx(SEOHelmet, { title: course.title, description: course.description }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-[#0a0a0a] text-neutral-200", children: [
      /* @__PURE__ */ jsx("section", { className: "relative pt-32 pb-24 px-6 border-b border-white/10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
        /* @__PURE__ */ jsxs("button", { onClick: () => navigate("/courses"), className: "flex items-center gap-2 text-sm text-neutral-500 hover:text-white mb-8", children: [
          /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4" }),
          " Back to Courses"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "max-w-3xl", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-6", children: [
            /* @__PURE__ */ jsxs(Badge, { variant: "outline", className: "border-blue-500/30 text-blue-400 bg-blue-500/10 uppercase font-bold px-3 py-1", children: [
              course.level,
              " Level"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 text-amber-500 text-sm font-semibold", children: [
              /* @__PURE__ */ jsx(Star, { className: "w-4 h-4 fill-amber-500" }),
              /* @__PURE__ */ jsx("span", { children: course.average_rating || "5.0" }),
              /* @__PURE__ */ jsxs("span", { className: "text-neutral-500 font-normal", children: [
                "(",
                course.reviews_count,
                " reviews)"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6", children: course.title }),
          /* @__PURE__ */ jsx("p", { className: "text-lg text-neutral-400 mb-10 leading-relaxed max-w-2xl", children: course.description }),
          /* @__PURE__ */ jsxs(
            Button,
            {
              size: "lg",
              onClick: () => navigate(`/${course.slug}/${sortedModules[0]?.lessons[0]?.slug}`),
              className: "bg-blue-600 hover:bg-blue-700 text-white h-14 px-8 rounded-xl font-semibold",
              children: [
                /* @__PURE__ */ jsx(PlayCircle, { className: "w-5 h-5 mr-2" }),
                " Start Learning Now"
              ]
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "py-16 px-6 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto grid lg:grid-cols-12 gap-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "lg:col-span-8 space-y-20", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white mb-8", children: "Course Syllabus" }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-3", children: sortedModules.map((module, idx) => {
              const isExpanded = expandedModules.includes(module.id);
              return /* @__PURE__ */ jsxs("div", { className: "border border-white/10 rounded-2xl bg-[#111111] overflow-hidden", children: [
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: () => setExpandedModules((prev) => isExpanded ? prev.filter((id) => id !== module.id) : [...prev, module.id]),
                    className: "w-full flex items-center justify-between p-6 text-left",
                    children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-5", children: [
                        /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-sm font-bold", children: idx + 1 }),
                        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-white", children: module.title }) })
                      ] }),
                      isExpanded ? /* @__PURE__ */ jsx(ChevronUp, { className: "w-5 h-5" }) : /* @__PURE__ */ jsx(ChevronDown, { className: "w-5 h-5" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(AnimatePresence, { children: isExpanded && /* @__PURE__ */ jsx(motion.div, { initial: { height: 0 }, animate: { height: "auto" }, exit: { height: 0 }, className: "overflow-hidden bg-[#0a0a0a] border-t border-white/5", children: /* @__PURE__ */ jsx("div", { className: "p-3", children: module.lessons?.sort((a, b) => a.order - b.order).map((lesson, lIdx) => /* @__PURE__ */ jsx("button", { onClick: () => navigate(`/${course.slug}/${lesson.slug}`), className: "w-full flex items-center justify-between p-4 rounded-xl hover:bg-white/5 text-left", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                  /* @__PURE__ */ jsxs("span", { className: "text-xs text-neutral-600", children: [
                    lIdx + 1,
                    "."
                  ] }),
                  /* @__PURE__ */ jsx(PlayCircle, { className: "w-4 h-4 text-blue-400" }),
                  /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: lesson.title })
                ] }) }, lesson.id)) }) }) })
              ] }, module.id);
            }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "pt-10 border-t border-white/10", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white mb-8", children: "Student Reviews" }),
            /* @__PURE__ */ jsxs(Card, { className: "bg-[#111111] border-white/10 mb-10 rounded-2xl p-6", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-white mb-6", children: "Rate this course" }),
              /* @__PURE__ */ jsxs("form", { onSubmit: handleReviewSubmit, className: "space-y-6", children: [
                /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: [1, 2, 3, 4, 5].map((star) => /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setRating(star), children: /* @__PURE__ */ jsx(Star, { className: `w-8 h-8 ${star <= rating ? "fill-amber-500 text-amber-500" : "text-neutral-700"}` }) }, star)) }),
                /* @__PURE__ */ jsx("input", { type: "text", value: reviewTitle, onChange: (e) => setReviewTitle(e.target.value), className: "w-full h-12 rounded-xl border border-white/10 bg-black/50 px-4 text-white", placeholder: "Review Title", required: true }),
                /* @__PURE__ */ jsx(Textarea, { value: reviewComment, onChange: (e) => setReviewComment(e.target.value), className: "w-full min-h-[120px] rounded-xl border border-white/10 bg-black/50 p-4 text-white", placeholder: "Your review", required: true }),
                /* @__PURE__ */ jsx(Button, { type: "submit", disabled: isSubmittingReview, className: "bg-white text-black font-semibold px-8 h-12 rounded-xl", children: "Post Review" })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "space-y-6", children: reviews.map((review) => /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-2xl bg-white/[0.03] border border-white/5", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-4", children: [
                /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center", children: /* @__PURE__ */ jsx(User, { className: "w-5 h-5" }) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h4", { className: "font-medium text-white", children: review.user?.name || "Student" }),
                  /* @__PURE__ */ jsx("div", { className: "flex", children: [1, 2, 3, 4, 5].map((star) => /* @__PURE__ */ jsx(Star, { className: `w-3.5 h-3.5 ${star <= review.rating ? "fill-amber-500 text-amber-500" : "text-neutral-700"}` }, star)) })
                ] })
              ] }),
              /* @__PURE__ */ jsx("h5", { className: "font-semibold text-neutral-200 mb-2", children: review.title }),
              /* @__PURE__ */ jsx("p", { className: "text-neutral-400 text-sm", children: review.comment })
            ] }, review.id)) })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "lg:col-span-4 relative", children: /* @__PURE__ */ jsx("div", { className: "sticky top-28", children: /* @__PURE__ */ jsxs(Card, { className: "bg-[#111111] border-white/10 rounded-3xl p-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center mb-8", children: [
            /* @__PURE__ */ jsx(Video, { className: "w-10 h-10 text-blue-400 mb-3" }),
            /* @__PURE__ */ jsx("h3", { className: "text-white font-bold text-lg mb-1", children: "Interactive Course" }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-neutral-500", children: [
              totalLessons,
              " Lessons"
            ] })
          ] }),
          /* @__PURE__ */ jsx(Button, { size: "lg", onClick: () => navigate(`/${course.slug}/${sortedModules[0]?.lessons[0]?.slug}`), className: "w-full bg-blue-600 hover:bg-blue-700 text-white h-14 rounded-xl font-bold text-base", children: "Enroll Now" })
        ] }) }) })
      ] }) })
    ] })
  ] });
}
export {
  CourseDetailsPage as default
};
