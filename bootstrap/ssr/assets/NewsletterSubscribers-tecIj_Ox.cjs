"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const ssr = require("../ssr.cjs");
const paginationControls = require("./pagination-controls-B5AkcLuC.cjs");
const table = require("./table-BghVgMLi.cjs");
const newsletterService = require("./newsletterService-DBtprxc6.cjs");
const refreshCw = require("./refresh-cw-lsuzTtbP.cjs");
const trash2 = require("./trash-2-BfBBcNrN.cjs");
require("stream");
require("util");
require("./select-pTnym9L9.cjs");
require("./index-CwsyZJiJ.cjs");
function NewsletterSubscribers() {
  const { showToast } = ssr.useToast();
  const { confirm } = ssr.useConfirmation();
  const [subscribers, setSubscribers] = ssr.reactExports.useState([]);
  const [isLoading, setIsLoading] = ssr.reactExports.useState(true);
  const [searchQuery, setSearchQuery] = ssr.reactExports.useState("");
  const [currentPage, setCurrentPage] = ssr.reactExports.useState(1);
  const [totalPages, setTotalPages] = ssr.reactExports.useState(1);
  const [totalSubscribers, setTotalSubscribers] = ssr.reactExports.useState(0);
  ssr.reactExports.useEffect(() => {
    loadSubscribers();
  }, [currentPage]);
  const loadSubscribers = async () => {
    setIsLoading(true);
    try {
      const response = await newsletterService.newsletterService.getAllSubscribers(currentPage);
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
      const response = await newsletterService.newsletterService.deleteSubscriber(id);
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
  return /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold gradient-text", children: "Newsletter Subscribers" }),
        /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("p", { className: "text-nexus-muted mt-1", children: "Manage newsletter subscribers" })
      ] }),
      /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs(ssr.Button, { onClick: loadSubscribers, variant: "outline", className: "gap-2", children: [
        /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(refreshCw.RefreshCw, { className: "w-4 h-4" }),
        "Refresh"
      ] })
    ] }),
    /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.Card, { className: "bg-nexus-card border-nexus-border", children: /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs(ssr.CardHeader, { className: "pb-3", children: [
        /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.CardDescription, { children: "Total Subscribers" }),
        /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.CardTitle, { className: "text-3xl", children: totalSubscribers })
      ] }) }),
      /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.Card, { className: "bg-nexus-card border-nexus-border", children: /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs(ssr.CardHeader, { className: "pb-3", children: [
        /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.CardDescription, { children: "Current Page Results" }),
        /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.CardTitle, { className: "text-3xl", children: subscribers.length })
      ] }) })
    ] }),
    /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.Card, { className: "bg-nexus-card border-nexus-border", children: /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.CardContent, { className: "pt-6", children: /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-nexus-muted w-4 h-4" }),
      /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(
        ssr.Input,
        {
          placeholder: "Search subscribers by email or name...",
          value: searchQuery,
          onChange: (e) => setSearchQuery(e.target.value),
          className: "pl-10"
        }
      )
    ] }) }) }),
    /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.Card, { className: "bg-nexus-card border-nexus-border", children: /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.CardContent, { className: "pt-6", children: isLoading ? /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-12", children: /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.LoaderCircle, { className: "w-8 h-8 animate-spin text-nexus-blue" }) }) : filteredSubscribers.length === 0 ? /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "text-center py-12", children: [
      /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.Mail, { className: "w-12 h-12 mx-auto text-nexus-muted mb-4" }),
      /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("h3", { className: "text-lg font-medium mb-2", children: "No subscribers found" }),
      /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("p", { className: "text-nexus-muted", children: searchQuery ? "Try adjusting your search query" : "No newsletter subscribers yet" })
    ] }) : /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs(ssr.jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs(table.Table, { children: [
        /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(table.TableHeader, { children: /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs(table.TableRow, { children: [
          /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(table.TableHead, { children: "Email" }),
          /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(table.TableHead, { children: "Status" }),
          /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(table.TableHead, { children: "Subscribed" }),
          /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(table.TableHead, { className: "text-right", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(table.TableBody, { children: filteredSubscribers.map((subscriber) => /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs(table.TableRow, { children: [
          /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(table.TableCell, { className: "font-medium", children: subscriber.email }),
          /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(table.TableCell, { children: /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.Badge, { variant: "outline", className: "capitalize", children: subscriber.status || "active" }) }),
          /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(table.TableCell, { children: subscriber.created_at ? ssr.formatDistanceToNow(new Date(subscriber.created_at), { addSuffix: true }) : "-" }),
          /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(table.TableCell, { className: "text-right", children: /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(
            ssr.Button,
            {
              variant: "ghost",
              size: "icon",
              onClick: () => handleDelete(subscriber.id, subscriber.email),
              className: "text-red-400 hover:text-red-300 hover:bg-red-500/10",
              children: /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(trash2.Trash2, { className: "w-4 h-4" })
            }
          ) })
        ] }, subscriber.id)) })
      ] }),
      totalPages > 1 && /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(
        paginationControls.CompactPagination,
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
exports.default = NewsletterSubscribers;
