import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { a as useToast, o as useConfirmation, B as Button, C as Card, p as CardHeader, q as CardDescription, r as CardTitle, s as CardContent, d as Badge, c as cn, D as Dialog, i as DialogContent, j as DialogHeader, k as DialogTitle, l as DialogDescription, A as adminSupportChatService } from "../ssr.js";
import { C as CompactPagination } from "./pagination-controls-Bz09fOze.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-DWq9r8gv.js";
import { T as Textarea } from "./textarea-CMsb0E2l.js";
import { formatDistanceToNow } from "date-fns";
import { Loader2, RefreshCw, MessageSquare, Trash2, AlertCircle, Send } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import "react-dom/server";
import "react-router";
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
const getStatusLabel = (ticket) => String(ticket.status || ticket.ticket_status || "open").toLowerCase();
const getStatsValue = (stats, keys) => {
  for (const key of keys) {
    const value = stats[key];
    if (typeof value === "number") return value;
    if (typeof value === "string" && !Number.isNaN(Number(value))) return Number(value);
  }
  return 0;
};
const normalizeTicket = (item) => ({
  id: Number(item?.id),
  name: item?.name || item?.customer_name || item?.user_name,
  email: item?.email || item?.customer_email || item?.user_email,
  status: item?.status || item?.ticket_status,
  subject: item?.subject,
  created_at: item?.created_at,
  updated_at: item?.updated_at,
  last_message_at: item?.last_message_at,
  messages_count: item?.messages_count,
  ...item
});
const normalizeMessage = (item) => ({
  id: item?.id,
  message: item?.message || item?.content,
  sender_type: item?.sender_type || item?.sender,
  created_at: item?.created_at || item?.timestamp,
  ...item
});
const extractTicketsPayload = (payload) => {
  if (!payload) return { items: [], lastPage: 1, total: 0 };
  const source = payload.data && !Array.isArray(payload.data) ? payload.data : payload;
  const list = Array.isArray(source.data) ? source.data : Array.isArray(source.tickets) ? source.tickets : Array.isArray(source) ? source : [];
  return {
    items: list.map(normalizeTicket).filter((item) => Number.isFinite(item.id)),
    lastPage: Number(source.last_page || source.total_pages || 1),
    total: Number(source.total || list.length || 0)
  };
};
const extractDetailPayload = (payload) => {
  const source = payload?.data ?? payload;
  const ticketRaw = source?.ticket ?? source;
  const messagesRaw = source?.ticket?.messages ?? ticketRaw?.messages ?? [];
  return {
    ticket: ticketRaw ? normalizeTicket(ticketRaw) : null,
    messages: Array.isArray(messagesRaw) ? messagesRaw.map(normalizeMessage) : []
  };
};
function SupportChatAdmin() {
  const { showToast } = useToast();
  const { confirm } = useConfirmation();
  const [stats, setStats] = useState({});
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalTickets, setTotalTickets] = useState(0);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [selectedTicketMessages, setSelectedTicketMessages] = useState([]);
  const [isDialogLoading, setIsDialogLoading] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");
  const [isReplying, setIsReplying] = useState(false);
  const [isMutatingStatus, setIsMutatingStatus] = useState(false);
  const statsCards = useMemo(
    () => [
      { title: "Total Tickets", value: getStatsValue(stats, ["total_tickets", "total"]) },
      { title: "Open Tickets", value: getStatsValue(stats, ["open_tickets", "open"]) },
      { title: "Closed Tickets", value: getStatsValue(stats, ["closed_tickets", "closed"]) },
      { title: "Today Tickets", value: getStatsValue(stats, ["today_tickets", "today"]) }
    ],
    [stats]
  );
  const loadStats = async () => {
    const response = await adminSupportChatService.getStats();
    if (response.success && response.data) {
      setStats(response.data?.data ?? response.data);
      return;
    }
  };
  const loadTickets = async (page = currentPage, silent = false) => {
    if (!silent) setIsLoading(true);
    const response = await adminSupportChatService.getTickets(page);
    if (response.success && response.data) {
      const parsed = extractTicketsPayload(response.data);
      setTickets(parsed.items);
      setTotalPages(parsed.lastPage > 0 ? parsed.lastPage : 1);
      setTotalTickets(parsed.total);
    } else {
      setTickets([]);
      showToast(response.message || "Failed to load tickets", "error");
    }
    if (!silent) setIsLoading(false);
  };
  const loadTicketDetail = async (id) => {
    setIsDialogLoading(true);
    const response = await adminSupportChatService.getTicketById(id);
    if (response.success && response.data) {
      const parsed = extractDetailPayload(response.data);
      if (parsed.ticket) setSelectedTicket(parsed.ticket);
      setSelectedTicketMessages(parsed.messages);
    } else {
      showToast(response.message || "Failed to load ticket details", "error");
    }
    setIsDialogLoading(false);
  };
  const refreshAll = async () => {
    setIsRefreshing(true);
    await Promise.all([loadStats(), loadTickets(currentPage, true)]);
    setIsRefreshing(false);
  };
  useEffect(() => {
    loadStats();
  }, []);
  useEffect(() => {
    loadTickets(currentPage);
  }, [currentPage]);
  const handleOpenDetail = async (ticket) => {
    setSelectedTicket(ticket);
    setReplyMessage("");
    setSelectedTicketMessages([]);
    await loadTicketDetail(ticket.id);
  };
  const handleReply = async () => {
    if (!selectedTicket || !replyMessage.trim()) return;
    setIsReplying(true);
    const response = await adminSupportChatService.replyToTicket(selectedTicket.id, {
      message: replyMessage.trim()
    });
    setIsReplying(false);
    if (response.success) {
      setReplyMessage("");
      showToast(response.message || "Reply sent successfully", "success");
      await Promise.all([
        loadTicketDetail(selectedTicket.id),
        loadTickets(currentPage, true),
        loadStats()
      ]);
      return;
    }
    showToast(response.message || "Failed to send reply", "error");
  };
  const handleTicketStatus = async (action) => {
    if (!selectedTicket) return;
    setIsMutatingStatus(true);
    const response = action === "close" ? await adminSupportChatService.closeTicket(selectedTicket.id) : await adminSupportChatService.reopenTicket(selectedTicket.id);
    setIsMutatingStatus(false);
    if (response.success) {
      showToast(response.message || `Ticket ${action}d successfully`, "success");
      await Promise.all([
        loadTicketDetail(selectedTicket.id),
        loadTickets(currentPage, true),
        loadStats()
      ]);
      return;
    }
    showToast(response.message || `Failed to ${action} ticket`, "error");
  };
  const handleDeleteTicket = async (ticket) => {
    const accepted = await confirm({
      title: "Delete Ticket",
      description: `Are you sure you want to delete ticket #${ticket.id}? This will also delete all messages.`,
      confirmText: "Delete",
      cancelText: "Cancel"
    });
    if (!accepted) return;
    const response = await adminSupportChatService.deleteTicket(ticket.id);
    if (response.success) {
      showToast(response.message || "Ticket deleted successfully", "success");
      if (selectedTicket?.id === ticket.id) {
        setSelectedTicket(null);
        setSelectedTicketMessages([]);
        setReplyMessage("");
      }
      await Promise.all([loadTickets(currentPage, true), loadStats()]);
      return;
    }
    showToast(response.message || "Failed to delete ticket", "error");
  };
  const isTicketClosed = selectedTicket ? getStatusLabel(selectedTicket) === "closed" : false;
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold gradient-text", children: "Support Chat" }),
        /* @__PURE__ */ jsx("p", { className: "text-nexus-muted mt-1", children: "Manage customer support tickets and replies" })
      ] }),
      /* @__PURE__ */ jsxs(Button, { onClick: refreshAll, variant: "outline", className: "gap-2", disabled: isRefreshing, children: [
        isRefreshing ? /* @__PURE__ */ jsx(Loader2, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsx(RefreshCw, { className: "w-4 h-4" }),
        "Refresh"
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4", children: statsCards.map((card) => /* @__PURE__ */ jsx(Card, { className: "bg-nexus-card border-nexus-border", children: /* @__PURE__ */ jsxs(CardHeader, { className: "pb-3", children: [
      /* @__PURE__ */ jsx(CardDescription, { children: card.title }),
      /* @__PURE__ */ jsx(CardTitle, { className: "text-3xl", children: card.value })
    ] }) }, card.title)) }),
    /* @__PURE__ */ jsx(Card, { className: "bg-nexus-card border-nexus-border", children: /* @__PURE__ */ jsx(CardContent, { className: "pt-6", children: isLoading ? /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center py-12", children: /* @__PURE__ */ jsx(Loader2, { className: "w-8 h-8 animate-spin text-nexus-blue" }) }) : tickets.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "text-center py-12", children: [
      /* @__PURE__ */ jsx(MessageSquare, { className: "w-12 h-12 mx-auto text-nexus-muted mb-4" }),
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium mb-2", children: "No support tickets found" }),
      /* @__PURE__ */ jsx("p", { className: "text-nexus-muted", children: "New customer tickets will appear here." })
    ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs(Table, { children: [
        /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableHead, { children: "ID" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Customer" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Status" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Messages" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Updated" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-right", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsx(TableBody, { children: tickets.map((ticket) => /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxs(TableCell, { className: "font-medium", children: [
            "#",
            ticket.id
          ] }),
          /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "font-medium text-white", children: ticket.name || "N/A" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-nexus-muted", children: ticket.email || "-" })
          ] }) }),
          /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(
            Badge,
            {
              variant: "outline",
              className: cn("capitalize", getStatusLabel(ticket) === "closed" ? "text-slate-400 border-slate-600" : "text-green-400 border-green-400/30"),
              children: getStatusLabel(ticket)
            }
          ) }),
          /* @__PURE__ */ jsx(TableCell, { children: ticket.messages_count ?? "-" }),
          /* @__PURE__ */ jsx(TableCell, { className: "text-nexus-muted", children: ticket.updated_at ? formatDistanceToNow(new Date(ticket.updated_at), { addSuffix: true }) : "-" }),
          /* @__PURE__ */ jsxs(TableCell, { className: "text-right space-x-2", children: [
            /* @__PURE__ */ jsx(Button, { size: "sm", variant: "outline", onClick: () => handleOpenDetail(ticket), children: "View" }),
            /* @__PURE__ */ jsx(
              Button,
              {
                size: "sm",
                variant: "ghost",
                onClick: () => handleDeleteTicket(ticket),
                className: "text-red-400 hover:text-red-300 hover:bg-red-500/10",
                children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" })
              }
            )
          ] })
        ] }, ticket.id)) })
      ] }),
      totalPages > 1 && /* @__PURE__ */ jsx(
        CompactPagination,
        {
          currentPage,
          totalPages,
          onPageChange: setCurrentPage,
          className: "mt-6"
        }
      ),
      /* @__PURE__ */ jsxs("p", { className: "text-sm text-nexus-muted mt-4", children: [
        "Total Tickets: ",
        totalTickets
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx(Dialog, { open: !!selectedTicket, onOpenChange: (open) => !open && setSelectedTicket(null), children: /* @__PURE__ */ jsxs(DialogContent, { className: "bg-[#0c0d12] border-white/10 text-white max-w-3xl max-h-[90vh] overflow-hidden flex flex-col", children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxs(DialogTitle, { children: [
          "Support Ticket ",
          selectedTicket ? `#${selectedTicket.id}` : ""
        ] }),
        /* @__PURE__ */ jsx(DialogDescription, { className: "text-slate-400", children: "Review conversation and reply to the customer." })
      ] }),
      !selectedTicket ? null : isDialogLoading ? /* @__PURE__ */ jsx("div", { className: "py-10 flex items-center justify-center", children: /* @__PURE__ */ jsx(Loader2, { className: "w-6 h-6 animate-spin text-nexus-blue" }) }) : /* @__PURE__ */ jsxs("div", { className: "space-y-4 overflow-y-auto pr-2 flex-1 flex flex-col h-full", children: [
        /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between shrink-0", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "font-semibold text-white", children: selectedTicket.name || "Unknown Customer" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-400", children: selectedTicket.email || "-" })
          ] }),
          /* @__PURE__ */ jsx(Badge, { variant: "outline", className: cn("capitalize", isTicketClosed ? "text-slate-400 border-slate-600" : "text-green-400 border-green-400/30"), children: getStatusLabel(selectedTicket) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex-1 space-y-4 max-h-[350px] overflow-y-auto p-2 bg-nexus-black/30 rounded-lg border border-white/5", children: selectedTicketMessages.length === 0 ? /* @__PURE__ */ jsx("div", { className: "h-full flex items-center justify-center", children: /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-400", children: "No messages yet." }) }) : selectedTicketMessages.map((message, index) => {
          const senderType = String(message.sender_type || message.sender || "").toLowerCase();
          const isAdmin = senderType.includes("admin") || senderType.includes("agent");
          return /* @__PURE__ */ jsx(
            "div",
            {
              className: cn("flex w-full", isAdmin ? "justify-end" : "justify-start"),
              children: /* @__PURE__ */ jsxs(
                "div",
                {
                  className: cn(
                    "max-w-[80%] p-3 rounded-2xl",
                    isAdmin ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-tr-sm" : "bg-nexus-card border border-nexus-border text-white rounded-tl-sm"
                  ),
                  children: [
                    /* @__PURE__ */ jsx("p", { className: cn("text-[10px] mb-1 font-medium", isAdmin ? "text-white/80" : "text-cyan-400"), children: isAdmin ? "You (Admin)" : selectedTicket.name }),
                    /* @__PURE__ */ jsx("p", { className: "text-sm whitespace-pre-wrap leading-relaxed", children: message.message || message.content || "-" }),
                    /* @__PURE__ */ jsx("p", { className: cn("text-[10px] mt-2 text-right", isAdmin ? "text-white/70" : "text-slate-500"), children: message.created_at ? formatDistanceToNow(new Date(message.created_at), { addSuffix: true }) : "" })
                  ]
                }
              )
            },
            String(message.id ?? `${index}-${message.created_at ?? Date.now()}`)
          );
        }) }),
        /* @__PURE__ */ jsxs("div", { className: "shrink-0 space-y-3", children: [
          isTicketClosed ? /* @__PURE__ */ jsxs("div", { className: "p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg flex items-center justify-center gap-2 text-yellow-500", children: [
            /* @__PURE__ */ jsx(AlertCircle, { className: "w-5 h-5" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "Cannot reply to a closed ticket. Please reopen it first." })
          ] }) : /* @__PURE__ */ jsx(
            Textarea,
            {
              placeholder: "Write your reply to the customer...",
              value: replyMessage,
              onChange: (e) => setReplyMessage(e.target.value),
              className: "min-h-[100px] bg-nexus-black border-nexus-border text-white focus:ring-cyan-500/50",
              disabled: isReplying || isMutatingStatus
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/10", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-x-2", children: [
              isTicketClosed ? /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "outline",
                  onClick: () => handleTicketStatus("reopen"),
                  disabled: isMutatingStatus || isReplying,
                  className: "bg-green-500/10 text-green-400 hover:bg-green-500/20 hover:text-green-300 border-green-500/30",
                  children: "Reopen Ticket"
                }
              ) : /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "outline",
                  onClick: () => handleTicketStatus("close"),
                  disabled: isMutatingStatus || isReplying,
                  children: "Close Ticket"
                }
              ),
              /* @__PURE__ */ jsxs(
                Button,
                {
                  variant: "ghost",
                  onClick: () => handleDeleteTicket(selectedTicket),
                  disabled: isMutatingStatus || isReplying,
                  className: "text-red-400 hover:text-red-300 hover:bg-red-500/10",
                  children: [
                    /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4 mr-2" }),
                    "Delete"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxs(
              Button,
              {
                onClick: handleReply,
                disabled: !replyMessage.trim() || isReplying || isMutatingStatus || isTicketClosed,
                className: "bg-gradient-to-r from-cyan-500 to-purple-500 text-white border-0",
                children: [
                  isReplying ? /* @__PURE__ */ jsx(Loader2, { className: "w-4 h-4 mr-2 animate-spin" }) : /* @__PURE__ */ jsx(Send, { className: "w-4 h-4 mr-2" }),
                  "Send Reply"
                ]
              }
            )
          ] })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  SupportChatAdmin as default
};
