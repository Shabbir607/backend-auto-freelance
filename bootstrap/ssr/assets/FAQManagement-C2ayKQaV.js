import { r as reactExports, j as jsxRuntimeExports, P as Plus, y as Search, L as LoaderCircle, aL as CircleHelp, bW as SquarePen, bX as Trash2 } from "./vendor-oSjIcCqY.js";
import { a as useToast, q as useConfirmation, i as faqService, B as Button, C as Card, r as CardHeader, s as CardDescription, t as CardTitle, e as CardContent, I as Input, d as Badge, D as Dialog, j as DialogContent, k as DialogHeader, l as DialogTitle, m as DialogDescription, v as Switch, n as DialogFooter } from "../ssr.js";
import { L as Label } from "./label-BSMxPeZT.js";
import { P as PaginationControls } from "./pagination-controls-CPrxOJir.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-gs7DqEWs.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-BVC2gdaa.js";
import { T as Textarea } from "./textarea-yWepkaAh.js";
import "stream";
import "util";
const initialFormData = {
  question: "",
  answer: "",
  faqable_type: "page",
  faqable_id: 1,
  status: true,
  sort_order: 1
};
function FAQManagement() {
  const { showToast } = useToast();
  const { confirm } = useConfirmation();
  const [paginatedData, setPaginatedData] = reactExports.useState(null);
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const [isDialogOpen, setIsDialogOpen] = reactExports.useState(false);
  const [isSaving, setIsSaving] = reactExports.useState(false);
  const [editingId, setEditingId] = reactExports.useState(null);
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [formData, setFormData] = reactExports.useState(initialFormData);
  const [currentPage, setCurrentPage] = reactExports.useState(1);
  const [perPage, setPerPage] = reactExports.useState(15);
  reactExports.useEffect(() => {
    loadFAQs();
  }, [currentPage, perPage]);
  const loadFAQs = async () => {
    setIsLoading(true);
    try {
      const response = await faqService.listFAQs(currentPage, perPage);
      if (response.success) {
        setPaginatedData(response.data);
      }
    } catch (error) {
      console.error("Failed to load FAQs:", error);
      showToast("Failed to load FAQs", "error");
    } finally {
      setIsLoading(false);
    }
  };
  const handleOpenDialog = (faq) => {
    if (faq) {
      setEditingId(faq.id);
      setFormData({
        question: faq.question,
        answer: faq.answer,
        faqable_type: faq.faqable_type.replace("App\\\\Models\\\\", "").toLowerCase(),
        faqable_id: faq.faqable_id,
        status: faq.status,
        sort_order: faq.sort_order
      });
    } else {
      setEditingId(null);
      setFormData(initialFormData);
    }
    setIsDialogOpen(true);
  };
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingId(null);
    setFormData(initialFormData);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.question.trim() || !formData.answer.trim()) {
      showToast("Question and answer are required", "error");
      return;
    }
    setIsSaving(true);
    try {
      if (editingId) {
        await faqService.updateFAQ(editingId, formData);
        showToast("FAQ updated successfully", "success");
      } else {
        await faqService.createFAQ(formData);
        showToast("FAQ created successfully", "success");
      }
      await loadFAQs();
      handleCloseDialog();
    } catch (error) {
      console.error("Failed to save FAQ:", error);
      showToast(editingId ? "Failed to update FAQ" : "Failed to create FAQ", "error");
    } finally {
      setIsSaving(false);
    }
  };
  const handleDelete = async (id) => {
    const confirmed = await confirm({
      title: "Delete FAQ",
      description: "Are you sure you want to delete this FAQ? This action cannot be undone.",
      confirmText: "Delete",
      cancelText: "Cancel"
    });
    if (!confirmed) return;
    try {
      await faqService.deleteFAQ(id);
      showToast("FAQ deleted successfully", "success");
      await loadFAQs();
    } catch (error) {
      console.error("Failed to delete FAQ:", error);
      showToast("Failed to delete FAQ", "error");
    }
  };
  const faqs = paginatedData?.data || [];
  const totalFAQs = paginatedData?.total || 0;
  const filteredFAQs = faqs.filter(
    (faq) => faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const getFaqableTypeLabel = (type) => {
    if (!type) return "Unknown";
    const parts = type.split("\\");
    return parts[parts.length - 1];
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold gradient-text", children: "FAQ Management" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-nexus-muted mt-1", children: "Manage frequently asked questions for your platform" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => handleOpenDialog(), className: "gradient-primary", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-2" }),
        "Add FAQ"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-nexus-card border-nexus-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Total FAQs" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-3xl", children: totalFAQs })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-nexus-card border-nexus-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Active FAQs" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-3xl", children: faqs.filter((f) => f.status).length })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-nexus-card border-nexus-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Inactive FAQs" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-3xl", children: faqs.filter((f) => !f.status).length })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-nexus-card border-nexus-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-nexus-muted w-4 h-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          placeholder: "Search FAQs...",
          value: searchQuery,
          onChange: (e) => setSearchQuery(e.target.value),
          className: "pl-10"
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-nexus-card border-nexus-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-6", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-8 h-8 animate-spin text-nexus-blue" }) }) : filteredFAQs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleHelp, { className: "w-12 h-12 mx-auto text-nexus-muted mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-medium mb-2", children: "No FAQs found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-nexus-muted mb-4", children: searchQuery ? "Try adjusting your search query" : "Get started by creating your first FAQ" }),
      !searchQuery && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => handleOpenDialog(), variant: "outline", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-2" }),
        "Add FAQ"
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Question" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Answer" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Sort Order" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: filteredFAQs.map((faq) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium max-w-xs", children: faq.question }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "max-w-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "line-clamp-2 text-nexus-muted", children: faq.answer }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: getFaqableTypeLabel(faq.faqable_type) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: faq.status ? "default" : "secondary",
              className: faq.status ? "bg-emerald-500/20 text-emerald-500 border-emerald-500/30" : "bg-slate-500/20 text-slate-500 border-slate-500/30",
              children: faq.status ? "Active" : "Inactive"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: faq.sort_order }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                onClick: () => handleOpenDialog(faq),
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "w-4 h-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                onClick: () => handleDelete(faq.id),
                className: "text-red-500 hover:text-red-600 hover:bg-red-500/10",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
              }
            )
          ] }) })
        ] }, faq.id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        PaginationControls,
        {
          data: paginatedData,
          onPageChange: setCurrentPage,
          onPerPageChange: (newPerPage) => {
            setPerPage(newPerPage);
            setCurrentPage(1);
          },
          isLoading,
          showFirstLastButtons: true,
          showPageInfo: true,
          showPerPageSelector: true
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: isDialogOpen, onOpenChange: setIsDialogOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "bg-nexus-card border-nexus-border max-w-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: editingId ? "Edit FAQ" : "Create FAQ" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: editingId ? "Update the FAQ details below" : "Add a new frequently asked question" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "question", children: "Question *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "question",
              value: formData.question,
              onChange: (e) => setFormData({ ...formData, question: e.target.value }),
              placeholder: "Enter the question",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "answer", children: "Answer *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "answer",
              value: formData.answer,
              onChange: (e) => setFormData({ ...formData, answer: e.target.value }),
              placeholder: "Enter the answer",
              rows: 5,
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "faqable_type", children: "Type" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: formData.faqable_type,
                onValueChange: (value) => setFormData({ ...formData, faqable_type: value }),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "page", children: "Page" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "blog", children: "Blog" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "workflow", children: "Workflow" })
                  ] })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "faqable_id", children: "Related ID" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "faqable_id",
                type: "number",
                value: formData.faqable_id,
                onChange: (e) => setFormData({
                  ...formData,
                  faqable_id: parseInt(e.target.value) || 1
                }),
                placeholder: "Enter related ID",
                required: true
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "sort_order", children: "Sort Order" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "sort_order",
                type: "number",
                value: formData.sort_order,
                onChange: (e) => setFormData({
                  ...formData,
                  sort_order: parseInt(e.target.value) || 1
                }),
                placeholder: "Enter sort order",
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "status", children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2 h-10", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Switch,
                {
                  id: "status",
                  checked: formData.status,
                  onCheckedChange: (checked) => setFormData({ ...formData, status: checked })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "status", className: "!mt-0", children: formData.status ? "Active" : "Inactive" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: handleCloseDialog,
              disabled: isSaving,
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: isSaving, className: "gradient-primary", children: isSaving ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }),
            editingId ? "Updating..." : "Creating..."
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: editingId ? "Update FAQ" : "Create FAQ" }) })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  FAQManagement as default
};
