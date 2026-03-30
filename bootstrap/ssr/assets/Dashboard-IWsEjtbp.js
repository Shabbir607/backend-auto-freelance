import { u as useAuth, a as useToast, r as reactExports, aa as Workflow, n as BookOpen, ab as Target, m as CircleHelp, z as FileText, i as MessageSquare, ac as Users, j as jsxRuntimeExports, g as Badge, ad as Circle, L as LoaderCircle, d as distExports, h as Card, c as cn, b as Button, C as ChevronRight, w as workflowService, ae as adminBlogService, af as faqService } from "../ssr.js";
import { c as courseService } from "./courseService-BvPIQTiW.js";
import { p as pageService } from "./pageService-mJqNpZ7Z.js";
import { c as contactService } from "./contactService-D_MD-cyw.js";
import { n as newsletterService } from "./newsletterService-A9YTC_wA.js";
import "stream";
import "util";
function Dashboard() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const [stats, setStats] = reactExports.useState({
    workflows: 0,
    blogs: 0,
    courses: 0,
    faqs: 0,
    pages: 0,
    contactEnquiries: 0,
    subscribers: 0
  });
  reactExports.useEffect(() => {
    const fetchDashboardStats = async () => {
      setIsLoading(true);
      try {
        const [
          workflowsRes,
          blogsRes,
          coursesRes,
          faqsRes,
          pagesRes,
          contactRes,
          subscribersRes
        ] = await Promise.allSettled([
          workflowService.listWorkflows(1, 1),
          adminBlogService.getAll(1, 1),
          courseService.getAdminCourses({ page: 1, per_page: 1 }),
          faqService.listFAQs(1, 1),
          pageService.listPages(),
          contactService.getAllMessages(1),
          newsletterService.getAllSubscribers(1)
        ]);
        setStats({
          workflows: workflowsRes.status === "fulfilled" ? workflowsRes.value.data?.total || 0 : 0,
          blogs: blogsRes.status === "fulfilled" ? blogsRes.value.data?.total || 0 : 0,
          courses: coursesRes.status === "fulfilled" ? coursesRes.value.data?.total || 0 : 0,
          faqs: faqsRes.status === "fulfilled" ? faqsRes.value.data?.total || 0 : 0,
          pages: pagesRes.status === "fulfilled" ? pagesRes.value.data?.length || 0 : 0,
          // Handle potential inconsistencies in pagination wrappers for these services
          contactEnquiries: contactRes.status === "fulfilled" ? contactRes.value.data?.total || (Array.isArray(contactRes.value.data) ? contactRes.value.data.length : 0) : 0,
          subscribers: subscribersRes.status === "fulfilled" ? subscribersRes.value.data?.total || (Array.isArray(subscribersRes.value.data) ? subscribersRes.value.data.length : 0) : 0
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        showToast("Failed to load dashboard statistics", "error");
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboardStats();
  }, [showToast]);
  const statCards = [
    {
      label: "Workflows",
      value: stats.workflows,
      icon: Workflow,
      link: "/app/workflows",
      color: "text-blue-500",
      bgPrefix: "bg-blue-500/10"
    },
    {
      label: "Published Blogs",
      value: stats.blogs,
      icon: BookOpen,
      link: "/app/blogs",
      color: "text-emerald-500",
      bgPrefix: "bg-emerald-500/10"
    },
    {
      label: "Available Courses",
      value: stats.courses,
      icon: Target,
      link: "/app/courses",
      color: "text-purple-500",
      bgPrefix: "bg-purple-500/10"
    },
    {
      label: "FAQs",
      value: stats.faqs,
      icon: CircleHelp,
      link: "/app/faqs",
      color: "text-amber-500",
      bgPrefix: "bg-amber-500/10"
    },
    {
      label: "Static Pages",
      value: stats.pages,
      icon: FileText,
      link: "/app/pages",
      color: "text-indigo-500",
      bgPrefix: "bg-indigo-500/10"
    },
    {
      label: "Contact Enquiries",
      value: stats.contactEnquiries,
      icon: MessageSquare,
      link: "/app/contact-enquiries",
      color: "text-pink-500",
      bgPrefix: "bg-pink-500/10"
    },
    {
      label: "Newsletter Subscribers",
      value: stats.subscribers,
      icon: Users,
      link: "/app/newsletter-subscribers",
      color: "text-orange-500",
      bgPrefix: "bg-orange-500/10"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 md:p-6 space-y-6 max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-xl md:text-2xl font-bold mb-1", children: [
          "Welcome back",
          user?.name ? `, ${user.name.split(" ")[0]}` : "",
          "!"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Here's an overview of your platform contents." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "border-emerald-500/30 text-emerald-400 bg-emerald-500/10 w-fit px-3 py-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "w-2 h-2 fill-emerald-500 mr-2" }),
        "System Online"
      ] })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center items-center py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-8 h-8 animate-spin text-primary" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4", children: statCards.map((stat, index) => {
      const Icon = stat.icon;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(distExports.Link, { to: stat.link, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-5 bg-card border-border hover:border-primary/50 transition-all duration-300 h-full group", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-between h-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("p-3 rounded-xl transition-colors duration-300 group-hover:bg-primary/20", stat.bgPrefix), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: cn("w-6 h-6", stat.color) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "group-hover:translate-x-1 transition-transform h-8 w-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 text-muted-foreground" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold tracking-tight mb-1", children: stat.value.toLocaleString() }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-muted-foreground", children: stat.label })
        ] })
      ] }) }) }, stat.label);
    }) }) })
  ] });
}
export {
  Dashboard as default
};
