import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { b as PublicNavbarLayout, d as Badge, I as Input, C as Card, B as Button, F as FAQSection } from "../ssr.js";
import { c as courseService } from "./courseService-UHMy8Xl5.js";
import { BookOpen, Search, Loader2, PlayCircle, Star, ArrowRight } from "lucide-react";
import { useState, useRef, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "react-dom/server";
import "react-router-dom/server.mjs";
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
function CoursesListPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCourses, setTotalCourses] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const observerTarget = useRef(null);
  const gradientPool = [
    "from-purple-500 to-indigo-600",
    "from-cyan-400 to-blue-600",
    "from-fuchsia-500 to-pink-600",
    "from-emerald-400 to-teal-600",
    "from-orange-400 to-red-600",
    "from-blue-400 to-indigo-600"
  ];
  const getCourseVisuals = (id) => {
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
        const isPaginatedObj = res.data && !Array.isArray(res.data) && "data" in res.data;
        const courseItems = isPaginatedObj ? res.data.data : Array.isArray(res.data) ? res.data : [res.data];
        setCourses((prev) => append ? [...prev, ...courseItems] : courseItems);
        setTotalPages(isPaginatedObj ? res.data.meta?.last_page || 1 : 1);
        setTotalCourses(isPaginatedObj ? res.data.meta?.total || courseItems.length : courseItems.length);
      } else if (!append) {
        setCourses([]);
        setTotalCourses(0);
      }
    } catch (e) {
      console.error("Failed to load courses", e);
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
      { threshold: 0.1, rootMargin: "400px" }
    );
    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }
    return () => observer.disconnect();
  }, [handleLoadMore, page, totalPages, isLoadingMore, loading]);
  return /* @__PURE__ */ jsxs(PublicNavbarLayout, { children: [
    /* @__PURE__ */ jsxs("section", { className: "relative pt-32 pb-20 px-4 overflow-hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 overflow-hidden pointer-events-none", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-[-10%] left-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]" }),
        /* @__PURE__ */ jsx("div", { className: "absolute bottom-[-10%] right-1/4 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px]" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto text-center relative z-10", children: [
        /* @__PURE__ */ jsxs(Badge, { className: "mb-6 bg-white/5 text-blue-400 border-blue-500/30 hover:bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full", children: [
          /* @__PURE__ */ jsx(BookOpen, { className: "w-4 h-4 mr-2" }),
          "Edgelancer Academy"
        ] }),
        /* @__PURE__ */ jsxs("h1", { className: "text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight", children: [
          /* @__PURE__ */ jsx("span", { className: "text-white", children: "Master New Skills" }),
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400", children: "Automation Mastery" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-xl text-gray-400 max-w-2xl mx-auto mb-12", children: "Level up your automation and development skills with expert-led courses." }),
        /* @__PURE__ */ jsxs("div", { className: "max-w-2xl mx-auto relative group", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-500" }),
          /* @__PURE__ */ jsxs("div", { className: "relative flex items-center", children: [
            /* @__PURE__ */ jsx(Search, { className: "absolute left-5 w-6 h-6 text-gray-500" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                type: "text",
                placeholder: "Search for courses, skills, or topics...",
                value: searchQuery,
                onChange: (e) => setSearchQuery(e.target.value),
                className: "pl-14 pr-6 h-16 bg-[#12121a] border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-blue-500 text-lg rounded-2xl shadow-2xl transition-all"
              }
            )
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "pb-24 px-4 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-end justify-between mb-10 border-b border-white/5 pb-6", children: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-white tracking-tight", children: "All Courses" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 mt-1", children: loading && !isLoadingMore ? "Loading catalog..." : `Showing ${totalCourses} available courses` })
      ] }) }),
      loading && !isLoadingMore ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-32", children: [
        /* @__PURE__ */ jsx(Loader2, { className: "w-10 h-10 text-blue-500 animate-spin mb-6" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-lg", children: "Curating your courses..." })
      ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8", children: courses.map((course) => {
          const { gradient } = getCourseVisuals(course.id);
          const totalLessons = course.modules?.reduce((acc, mod) => acc + (mod.lessons?.length || 0), 0) || 0;
          return /* @__PURE__ */ jsxs(
            Card,
            {
              onClick: () => navigate(`/courses/${course.slug}`),
              className: "bg-[#12121a] border-white/5 hover:border-blue-500/30 hover:-translate-y-1.5 transition-all duration-300 flex flex-col group h-full overflow-hidden cursor-pointer rounded-2xl",
              children: [
                /* @__PURE__ */ jsxs("div", { className: `h-48 w-full relative bg-gradient-to-br ${gradient} p-6 flex flex-col justify-between overflow-hidden`, children: [
                  /* @__PURE__ */ jsx("div", { className: "relative z-10 flex justify-end w-full", children: /* @__PURE__ */ jsx(Badge, { className: "bg-black/30 text-white border-white/10 backdrop-blur-md capitalize px-3 py-1", children: course.level }) }),
                  /* @__PURE__ */ jsx(BookOpen, { className: "w-16 h-16 text-white/20 absolute -bottom-4 -right-4 transform -rotate-12 group-hover:scale-110 transition-transform duration-500" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "p-6 flex flex-col flex-grow", children: [
                  /* @__PURE__ */ jsxs("div", { className: "mb-4 flex-grow", children: [
                    /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug", children: course.title }),
                    /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400 line-clamp-3 leading-relaxed", children: course.description })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-6 pt-2", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center text-sm text-gray-400", children: [
                      /* @__PURE__ */ jsx(PlayCircle, { className: "w-4 h-4 mr-1.5 text-blue-400" }),
                      /* @__PURE__ */ jsxs("span", { children: [
                        totalLessons,
                        " Lessons"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center text-sm text-gray-400", children: [
                      /* @__PURE__ */ jsx(Star, { className: "w-4 h-4 mr-1.5 text-amber-500 fill-amber-500" }),
                      /* @__PURE__ */ jsx("span", { children: course.average_rating || "New" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "pt-5 border-t border-white/5 mt-auto", children: /* @__PURE__ */ jsxs(
                    Button,
                    {
                      onClick: (e) => {
                        e.stopPropagation();
                        navigate(`/courses/${course.slug}`);
                      },
                      className: "w-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all group/btn",
                      children: [
                        "View Course",
                        /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-all" })
                      ]
                    }
                  ) })
                ] })
              ]
            },
            course.id
          );
        }) }),
        courses.length === 0 && /* @__PURE__ */ jsxs("div", { className: "text-center py-24 bg-[#12121a] border border-white/5 border-dashed rounded-3xl", children: [
          /* @__PURE__ */ jsx(BookOpen, { className: "w-10 h-10 text-gray-600 mx-auto mb-6" }),
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-white mb-3", children: "No courses found" }),
          /* @__PURE__ */ jsx(Button, { onClick: () => setSearchQuery(""), className: "bg-blue-600 hover:bg-blue-700 text-white px-8", children: "Clear Search" })
        ] }),
        /* @__PURE__ */ jsx("div", { ref: observerTarget, className: "h-4 w-full" }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center justify-center mt-12 mb-8", children: isLoadingMore && /* @__PURE__ */ jsx(Loader2, { className: "w-6 h-6 text-blue-500 animate-spin" }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(FAQSection, { type: "page", slug: "courses" })
  ] });
}
export {
  CoursesListPage as default
};
