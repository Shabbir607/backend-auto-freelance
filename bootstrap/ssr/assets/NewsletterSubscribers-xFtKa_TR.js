import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { a as useToast, o as useConfirmation, B as Button, C as Card, p as CardHeader, q as CardDescription, r as CardTitle, s as CardContent, I as Input, d as Badge } from "../ssr.js";
import { P as PaginationControls } from "./pagination-controls-CgC50Tbv.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-DWq9r8gv.js";
import { n as newsletterService } from "./newsletterService-DXdskxTV.js";
import { formatDistanceToNow } from "date-fns";
import { RefreshCw, Search, Loader2, Mail, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import "react-dom/server";
import "react-router-dom/server.mjs";
import "react-router-dom";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-dialog";
import "@radix-ui/react-icons";
import "zustand";
import "@radix-ui/react-avatar";
import "@radix-ui/react-scroll-area";
import "react-helmet-async";
import "reactflow";
import "@radix-ui/react-switch";
import "react-i18next";
import "./select-H0JYI2nI.js";
import "@radix-ui/react-select";
function NewsletterSubscribers() {
  const { showToast } = useToast();
  const { confirm } = useConfirmation();
  const [subscribers, setSubscribers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalSubscribers, setTotalSubscribers] = useState(0);
  useEffect(() => {
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
      message: `Are you sure you want to delete ${email} from newsletter subscribers?`,
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
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold gradient-text", children: "Newsletter Subscribers" }),
        /* @__PURE__ */ jsx("p", { className: "text-nexus-muted mt-1", children: "Manage newsletter subscribers" })
      ] }),
      /* @__PURE__ */ jsxs(Button, { onClick: loadSubscribers, variant: "outline", className: "gap-2", children: [
        /* @__PURE__ */ jsx(RefreshCw, { className: "w-4 h-4" }),
        "Refresh"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsx(Card, { className: "bg-nexus-card border-nexus-border", children: /* @__PURE__ */ jsxs(CardHeader, { className: "pb-3", children: [
        /* @__PURE__ */ jsx(CardDescription, { children: "Total Subscribers" }),
        /* @__PURE__ */ jsx(CardTitle, { className: "text-3xl", children: totalSubscribers })
      ] }) }),
      /* @__PURE__ */ jsx(Card, { className: "bg-nexus-card border-nexus-border", children: /* @__PURE__ */ jsxs(CardHeader, { className: "pb-3", children: [
        /* @__PURE__ */ jsx(CardDescription, { children: "Current Page Results" }),
        /* @__PURE__ */ jsx(CardTitle, { className: "text-3xl", children: subscribers.length })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(Card, { className: "bg-nexus-card border-nexus-border", children: /* @__PURE__ */ jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-nexus-muted w-4 h-4" }),
      /* @__PURE__ */ jsx(
        Input,
        {
          placeholder: "Search subscribers by email or name...",
          value: searchQuery,
          onChange: (e) => setSearchQuery(e.target.value),
          className: "pl-10"
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsx(Card, { className: "bg-nexus-card border-nexus-border", children: /* @__PURE__ */ jsx(CardContent, { className: "pt-6", children: isLoading ? /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center py-12", children: /* @__PURE__ */ jsx(Loader2, { className: "w-8 h-8 animate-spin text-nexus-blue" }) }) : filteredSubscribers.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "text-center py-12", children: [
      /* @__PURE__ */ jsx(Mail, { className: "w-12 h-12 mx-auto text-nexus-muted mb-4" }),
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium mb-2", children: "No subscribers found" }),
      /* @__PURE__ */ jsx("p", { className: "text-nexus-muted", children: searchQuery ? "Try adjusting your search query" : "No newsletter subscribers yet" })
    ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs(Table, { children: [
        /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableHead, { children: "Email" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Status" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Subscribed" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-right", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsx(TableBody, { children: filteredSubscribers.map((subscriber) => /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableCell, { className: "font-medium", children: subscriber.email }),
          /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "capitalize", children: subscriber.status || "active" }) }),
          /* @__PURE__ */ jsx(TableCell, { children: subscriber.created_at ? formatDistanceToNow(new Date(subscriber.created_at), { addSuffix: true }) : "-" }),
          /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              onClick: () => handleDelete(subscriber.id, subscriber.email),
              className: "text-red-400 hover:text-red-300 hover:bg-red-500/10",
              children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" })
            }
          ) })
        ] }, subscriber.id)) })
      ] }),
      totalPages > 1 && /* @__PURE__ */ jsx(
        PaginationControls,
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
