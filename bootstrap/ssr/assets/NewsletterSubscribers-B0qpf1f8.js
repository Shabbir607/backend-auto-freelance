import { a as useToast, aD as useConfirmation, r as reactExports, j as jsxRuntimeExports, b as Button, h as Card, aE as CardHeader, aF as CardDescription, aG as CardTitle, aH as CardContent, q as Search, I as Input, L as LoaderCircle, M as Mail, g as Badge, av as formatDistanceToNow } from "../ssr.js";
import { C as CompactPagination } from "./pagination-controls-BDasQ1IR.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-BVLYlhcV.js";
import { n as newsletterService } from "./newsletterService-A9YTC_wA.js";
import { R as RefreshCw } from "./refresh-cw-Bi_GhDfH.js";
import { T as Trash2 } from "./trash-2-Cu4B9ujU.js";
import "stream";
import "util";
import "./select-D43oyr7W.js";
import "./index-sGgg5_n-.js";
function NewsletterSubscribers() {
  const { showToast } = useToast();
  const { confirm } = useConfirmation();
  const [subscribers, setSubscribers] = reactExports.useState([]);
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [currentPage, setCurrentPage] = reactExports.useState(1);
  const [totalPages, setTotalPages] = reactExports.useState(1);
  const [totalSubscribers, setTotalSubscribers] = reactExports.useState(0);
  reactExports.useEffect(() => {
    loadSubscribers();
  }, [currentPage]);
  const loadSubscribers = async () => {
    setIsLoading(true);
    try {
      const response = await newsletterService.getAllSubscribers(currentPage);
      if (response.success && response.data) {
        if (Array.isArray(response.data)) {
          setSubscribers(response.data);
          setTotalPages(1);
          setTotalSubscribers(response.data.length);
        } else {
          setSubscribers(response.data.data || []);
          setTotalPages(response.data.last_page || 1);
          setTotalSubscribers(response.data.total || 0);
        }
      } else {
        setSubscribers([]);
        setTotalPages(1);
        setTotalSubscribers(0);
      }
    } catch (error) {
      console.error("Failed to load newsletter subscribers:", error);
      showToast("Failed to load newsletter subscribers", "error");
    } finally {
      setIsLoading(false);
    }
  };
  const handleDelete = async (id, email) => {
    const confirmed = await confirm({
      title: "Delete Subscriber",
      description: `Are you sure you want to delete ${email} from newsletter subscribers?`,
      confirmText: "Delete",
      cancelText: "Cancel"
    });
    if (!confirmed) return;
    try {
      const response = await newsletterService.deleteSubscriber(id);
      if (response.success) {
        showToast("Subscriber deleted successfully", "success");
        await loadSubscribers();
      } else {
        showToast(response.message || "Failed to delete subscriber", "error");
      }
    } catch (error) {
      console.error("Failed to delete subscriber:", error);
      showToast("Failed to delete subscriber", "error");
    }
  };
  const filteredSubscribers = subscribers.filter((subscriber) => {
    const query = searchQuery.toLowerCase();
    return subscriber.email?.toLowerCase().includes(query) || subscriber.name?.toLowerCase().includes(query);
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold gradient-text", children: "Newsletter Subscribers" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-nexus-muted mt-1", children: "Manage newsletter subscribers" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: loadSubscribers, variant: "outline", className: "gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4" }),
        "Refresh"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-nexus-card border-nexus-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Total Subscribers" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-3xl", children: totalSubscribers })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-nexus-card border-nexus-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Current Page Results" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-3xl", children: subscribers.length })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-nexus-card border-nexus-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-nexus-muted w-4 h-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          placeholder: "Search subscribers by email or name...",
          value: searchQuery,
          onChange: (e) => setSearchQuery(e.target.value),
          className: "pl-10"
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-nexus-card border-nexus-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-6", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-8 h-8 animate-spin text-nexus-blue" }) }) : filteredSubscribers.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-12 h-12 mx-auto text-nexus-muted mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-medium mb-2", children: "No subscribers found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-nexus-muted", children: searchQuery ? "Try adjusting your search query" : "No newsletter subscribers yet" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Subscribed" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: filteredSubscribers.map((subscriber) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: subscriber.email }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "capitalize", children: subscriber.status || "active" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: subscriber.created_at ? formatDistanceToNow(new Date(subscriber.created_at), { addSuffix: true }) : "-" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              onClick: () => handleDelete(subscriber.id, subscriber.email),
              className: "text-red-400 hover:text-red-300 hover:bg-red-500/10",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
            }
          ) })
        ] }, subscriber.id)) })
      ] }),
      totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        CompactPagination,
        {
          currentPage,
          totalPages,
          onPageChange: setCurrentPage,
          className: "mt-6"
        }
      )
    ] }) }) })
  ] });
}
export {
  NewsletterSubscribers as default
};
