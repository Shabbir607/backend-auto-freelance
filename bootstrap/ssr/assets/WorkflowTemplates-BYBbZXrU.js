import { a as useToast, r as reactExports, j as jsxRuntimeExports, o as Layers, q as Search, I as Input, b as Button, a_ as Filter, a$ as DynamicIcon, p as Star, h as Card, b0 as Sparkles, g as Badge, b1 as GitBranch, ac as Users, aw as Dialog, ax as DialogContent, ay as DialogHeader, az as DialogTitle, aA as DialogDescription, Z as Zap, a5 as CircleCheckBig, aB as DialogFooter, E as Eye, at as Plus, w as workflowService } from "../ssr.js";
import "stream";
import "util";
function WorkflowTemplates() {
  const { showToast } = useToast();
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [activeCategory, setActiveCategory] = reactExports.useState("all");
  const [selectedTemplate, setSelectedTemplate] = reactExports.useState(null);
  const [isDetailOpen, setIsDetailOpen] = reactExports.useState(false);
  const [categories, setCategories] = reactExports.useState([]);
  const [templates, setTemplates] = reactExports.useState([]);
  const [allLoadedTemplates, setAllLoadedTemplates] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [totalTemplates, setTotalTemplates] = reactExports.useState(0);
  const [currentPage, setCurrentPage] = reactExports.useState(1);
  const [isCategoriesExpanded, setIsCategoriesExpanded] = reactExports.useState(false);
  const [loadingMore, setLoadingMore] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await workflowService.getWorkflowLibraryCategories();
        if (res.success && res.data) {
          setCategories(res.data);
        }
      } catch (error) {
        console.error("Failed to load categories", error);
      }
    };
    loadCategories();
  }, []);
  const fetchTemplates = async (page = 1, isLoadMore = false) => {
    if (isLoadMore) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }
    try {
      const categoryId = activeCategory === "all" ? null : activeCategory;
      const res = await workflowService.getWorkflowLibrary(page, 50, searchQuery, categoryId, "newest");
      const newTemplates = Array.isArray(res) ? res : res.data ?? [];
      const total = res.total ?? newTemplates.length;
      if (isLoadMore) {
        setAllLoadedTemplates((prev) => [...prev, ...newTemplates]);
        setTemplates((prev) => [...prev, ...newTemplates]);
      } else {
        setAllLoadedTemplates(newTemplates);
        setTemplates(newTemplates);
      }
      setTotalTemplates(total);
      setCurrentPage(page);
    } catch (error) {
      console.error("Failed to fetch templates", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };
  reactExports.useEffect(() => {
    const timer = setTimeout(() => {
      fetchTemplates(1, false);
    }, 300);
    return () => clearTimeout(timer);
  }, [activeCategory, searchQuery]);
  const handleLoadMore = () => {
    fetchTemplates(currentPage + 1, true);
  };
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "intermediate":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "advanced":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };
  const featuredTemplates = allLoadedTemplates.filter((t) => t.rating && parseFloat(t.rating) >= 4.8).slice(0, 3);
  const filteredTemplates = allLoadedTemplates;
  const handleUseTemplate = (template) => {
    showToast(`Template "${template.title}" added to your workflows`, "success");
    setIsDetailOpen(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 md:p-6 space-y-6 max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-bold flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "w-6 h-6 text-primary" }),
          "Workflow Templates"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mt-1", children: [
          "Choose from ",
          totalTemplates > 0 ? totalTemplates : templates.length,
          " ready-to-use automation templates"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Search templates...",
              value: searchQuery,
              onChange: (e) => setSearchQuery(e.target.value),
              className: "pl-9 w-64"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Filter, { className: "w-4 h-4 mr-2" }),
          "Filters"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 pb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex gap-2 transition-all ${isCategoriesExpanded ? "flex-wrap" : "overflow-x-auto whitespace-nowrap"} max-w-full`, style: { flex: 1 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: activeCategory === "all" ? "default" : "outline",
            size: "sm",
            onClick: () => setActiveCategory("all"),
            className: activeCategory === "all" ? "bg-primary text-primary-foreground" : "",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "w-4 h-4 mr-2" }),
              "All Templates"
            ]
          },
          "all"
        ),
        categories.map((category) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: activeCategory === category.id ? "default" : "outline",
            size: "sm",
            onClick: () => setActiveCategory(category.id),
            className: activeCategory === category.id ? "bg-primary text-primary-foreground" : "",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DynamicIcon, { name: category.icon || category.title, className: "w-4 h-4 mr-2" }),
              category.title
            ]
          },
          category.id
        ))
      ] }),
      categories.length > 5 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "sm",
          onClick: () => setIsCategoriesExpanded(!isCategoriesExpanded),
          className: "text-primary hover:text-primary/80 flex-shrink-0",
          children: isCategoriesExpanded ? "Show Less" : "Show All Categories"
        }
      )
    ] }),
    activeCategory === "all" && searchQuery === "" && featuredTemplates.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-5 h-5 text-amber-500 fill-amber-500" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold", children: "Featured Templates" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-4", children: featuredTemplates.map((template) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Card,
        {
          className: "p-5 bg-gradient-to-br from-card to-card/50 border-primary/20 cursor-pointer hover:border-primary/50 transition-all",
          onClick: () => {
            setSelectedTemplate(template);
            setIsDetailOpen(true);
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-6 h-6 text-white" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-amber-500/20 text-amber-400 border-amber-500/30", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3 h-3 mr-1 fill-amber-400" }),
                "Featured"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-lg mb-2", children: template.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4 line-clamp-2", children: template.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(GitBranch, { className: "w-4 h-4" }),
                template.nodes_count || 0,
                " steps"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4" }),
                (template.views || 0).toLocaleString(),
                " uses"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-amber-400", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4 fill-amber-400" }),
                template.rating
              ] })
            ] })
          ]
        },
        template.id
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold", children: activeCategory === "all" ? "All Templates" : categories.find((c) => c.id === activeCategory)?.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: totalTemplates > 0 ? `${allLoadedTemplates.length} of ${totalTemplates} templates` : `${allLoadedTemplates.length} templates` })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4", children: filteredTemplates.map((template) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Card,
        {
          className: "p-4 bg-card border-border cursor-pointer hover:border-primary/50 transition-all group",
          onClick: () => {
            setSelectedTemplate(template);
            setIsDetailOpen(true);
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(DynamicIcon, { name: template.category?.icon || template.category?.title || "Layers", className: "w-5 h-5 text-white" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-medium truncate group-hover:text-primary transition-colors", children: template.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground truncate", children: [
                  template.nodes_count || 5,
                  " steps"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground line-clamp-2 mb-3", children: template.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: getDifficultyColor(template.difficulty), children: template.difficulty }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-amber-400", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3 h-3 fill-amber-400" }),
                template.rating
              ] })
            ] })
          ]
        },
        template.id
      )) }),
      filteredTemplates.length === 0 && !loading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "w-12 h-12 text-gray-600 mx-auto mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-medium text-gray-400 mb-2", children: "No templates found" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500", children: "Try adjusting your search or filter criteria" })
      ] }),
      loading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "w-12 h-12 text-purple-600 animate-pulse mx-auto mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-medium text-gray-400 mb-2", children: "Loading templates..." })
      ] }),
      !loading && allLoadedTemplates.length < totalTemplates && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          onClick: handleLoadMore,
          disabled: loadingMore,
          className: "min-w-[200px]",
          children: loadingMore ? "Loading..." : `Load More (${Math.max(totalTemplates - allLoadedTemplates.length, 0)} remaining)`
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: isDetailOpen, onOpenChange: setIsDetailOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { className: "max-w-2xl bg-card border-border", children: selectedTemplate && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-7 h-7 text-white" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-xl", children: selectedTemplate.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { className: "mt-1", children: selectedTemplate.description })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 py-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-4 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-3 rounded-lg bg-muted/50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold", children: selectedTemplate.nodes_count || 0 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Steps" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-3 rounded-lg bg-muted/50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold", children: (selectedTemplate.views || 0).toLocaleString() }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Uses" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-3 rounded-lg bg-muted/50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-amber-400", children: selectedTemplate.rating }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Rating" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-3 rounded-lg bg-muted/50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: getDifficultyColor(selectedTemplate.difficulty), children: selectedTemplate.difficulty }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Difficulty" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-medium mb-3 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4 text-cyan-400" }),
            "Triggers"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: Array.isArray(selectedTemplate.workflow_features) && selectedTemplate.workflow_features.length > 0 ? selectedTemplate.workflow_features.map((feature, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 text-cyan-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: typeof feature === "string" ? feature : "Feature" })
          ] }, index)) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-sm", children: "No specific triggers listed." }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setIsDetailOpen(false), children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4 mr-2" }),
          "Preview"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            className: "bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white border-0",
            onClick: () => handleUseTemplate(selectedTemplate),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-2" }),
              "Use This Template"
            ]
          }
        )
      ] })
    ] }) }) })
  ] });
}
export {
  WorkflowTemplates as default
};
