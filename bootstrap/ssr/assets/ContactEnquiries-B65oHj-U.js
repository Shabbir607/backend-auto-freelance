import { e as createLucideIcon, r as reactExports, j as jsxRuntimeExports, b as Button, h as Card, aQ as Skeleton, M as Mail, g as Badge, av as formatDistanceToNow, aw as Dialog, ax as DialogContent, ay as DialogHeader, az as DialogTitle, aA as DialogDescription, v as CircleCheck } from "../ssr.js";
import { T as Textarea } from "./textarea-DZtg9ezc.js";
import { c as contactService } from "./contactService-D_MD-cyw.js";
import { R as RefreshCw } from "./refresh-cw-Bi_GhDfH.js";
import "stream";
import "util";
const MailOpen = createLucideIcon("MailOpen", [
  [
    "path",
    {
      d: "M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z",
      key: "1jhwl8"
    }
  ],
  ["path", { d: "m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10", key: "1qfld7" }]
]);
const Reply = createLucideIcon("Reply", [
  ["polyline", { points: "9 17 4 12 9 7", key: "hvgpf2" }],
  ["path", { d: "M20 18v-2a4 4 0 0 0-4-4H4", key: "5vmcpk" }]
]);
function ContactEnquiries() {
  const [messages, setMessages] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [page, setPage] = reactExports.useState(1);
  const [totalPages, setTotalPages] = reactExports.useState(1);
  const [selectedMessage, setSelectedMessage] = reactExports.useState(null);
  const [replyText, setReplyText] = reactExports.useState("");
  const [isReplying, setIsReplying] = reactExports.useState(false);
  const [replySuccess, setReplySuccess] = reactExports.useState(false);
  reactExports.useEffect(() => {
    loadMessages();
  }, [page]);
  const loadMessages = async () => {
    setLoading(true);
    const result = await contactService.getAllMessages(page);
    console.log("API Response:", result);
    if (result.success && result.data) {
      if (Array.isArray(result.data)) {
        console.log("Setting messages from array:", result.data);
        setMessages(result.data);
        setTotalPages(1);
      } else {
        console.log("Setting messages from paginated:", result.data.data);
        setMessages(result.data.data || []);
        setTotalPages(result.data.last_page || 1);
      }
    } else {
      console.log("API call failed or no data");
      setMessages([]);
      setTotalPages(1);
    }
    setLoading(false);
  };
  const handleReply = async () => {
    if (!selectedMessage || !replyText.trim()) return;
    setIsReplying(true);
    const result = await contactService.replyToMessage(selectedMessage.id, replyText);
    setIsReplying(false);
    if (result.success) {
      setReplySuccess(true);
      setReplyText("");
      setTimeout(() => {
        setReplySuccess(false);
        setSelectedMessage(null);
        loadMessages();
      }, 2e3);
    }
  };
  const openMessageDialog = async (message) => {
    setSelectedMessage(message);
    setReplyText("");
    setReplySuccess(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-white mb-2", children: "Contact Enquiries" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400", children: "Manage and respond to customer inquiries" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: loadMessages, variant: "outline", className: "gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4" }),
        "Refresh"
      ] })
    ] }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: Array.from({ length: 5 }).map((_, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-4 bg-[#0c0d12] border-white/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-full h-20 bg-white/5" }) }, idx)) }) : !messages || messages.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-12 text-center bg-[#0c0d12] border-white/5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-12 h-12 text-slate-500 mx-auto mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400", children: "No contact enquiries yet" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: messages.map((message) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Card,
      {
        className: "p-6 bg-[#0c0d12] border-white/5 hover:border-white/15 transition-all cursor-pointer",
        onClick: () => openMessageDialog(message),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${message.is_read ? "bg-slate-800" : "bg-cyan-500/20"}`, children: message.is_read ? /* @__PURE__ */ jsxRuntimeExports.jsx(MailOpen, { className: "w-5 h-5 text-slate-400" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-5 h-5 text-cyan-400" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-white", children: message.name }),
                !message.is_read && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30 text-xs", children: "New" }),
                message.reply_status && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-green-500/20 text-green-400 border-green-500/30 text-xs", children: "Replied" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-400 mb-1", children: message.email }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-slate-300 mb-2", children: message.subject }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-400 line-clamp-2", children: message.message }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 mt-2", children: formatDistanceToNow(new Date(message.created_at), { addSuffix: true }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              variant: "outline",
              className: "gap-2",
              onClick: (e) => {
                e.stopPropagation();
                openMessageDialog(message);
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Reply, { className: "w-4 h-4" }),
                "Reply"
              ]
            }
          )
        ] })
      },
      message.id
    )) }),
    totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          size: "sm",
          disabled: page === 1,
          onClick: () => setPage(page - 1),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-slate-400", children: [
        "Page ",
        page,
        " of ",
        totalPages
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          size: "sm",
          disabled: page >= totalPages,
          onClick: () => setPage(page + 1),
          children: "Next"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!selectedMessage, onOpenChange: () => setSelectedMessage(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "bg-[#0c0d12] border-white/10 text-white max-w-2xl max-h-[90vh] overflow-hidden flex flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-xl", children: "Contact Enquiry Details" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { className: "text-slate-400", children: "View and respond to customer inquiry" })
      ] }),
      selectedMessage && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 overflow-y-auto pr-2 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 p-4 rounded-lg bg-white/5 border border-white/5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-white mb-1", children: selectedMessage.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-400", children: selectedMessage.email })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              !selectedMessage.is_read && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30", children: "New" }),
              selectedMessage.reply_status && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-green-500/20 text-green-400 border-green-500/30", children: "Replied" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 mb-1", children: "Subject" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-white", children: selectedMessage.subject })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 mb-1", children: "Message" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-300 whitespace-pre-wrap", children: selectedMessage.message })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-slate-500", children: [
            "Received ",
            formatDistanceToNow(new Date(selectedMessage.created_at), { addSuffix: true })
          ] })
        ] }),
        selectedMessage.reply_status && selectedMessage.reply_message && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 p-4 rounded-lg bg-green-500/10 border border-green-500/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-green-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-green-300", children: "Previous Reply" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-300 whitespace-pre-wrap", children: selectedMessage.reply_message }),
          selectedMessage.replied_at && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-slate-500", children: [
            "Sent ",
            formatDistanceToNow(new Date(selectedMessage.replied_at), { addSuffix: true })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium text-slate-300 mb-2 block", children: "Your Reply" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                value: replyText,
                onChange: (e) => setReplyText(e.target.value),
                placeholder: "Type your reply here...",
                className: "min-h-[120px] bg-white/5 border-white/10 text-white",
                disabled: isReplying
              }
            )
          ] }),
          replySuccess && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5 text-green-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-green-300", children: "Reply sent successfully!" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: handleReply,
                disabled: !replyText.trim() || isReplying,
                className: "flex-1 bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white",
                children: isReplying ? "Sending..." : "Send Reply"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                onClick: () => setSelectedMessage(null),
                disabled: isReplying,
                children: "Cancel"
              }
            )
          ] })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  ContactEnquiries as default
};
