import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { a as useToast, o as useConfirmation, h as faqService, B as Button, C as Card, p as CardHeader, q as CardDescription, r as CardTitle, s as CardContent, I as Input, d as Badge, D as Dialog, i as DialogContent, j as DialogHeader, k as DialogTitle, l as DialogDescription, t as Switch, m as DialogFooter } from "../ssr.js";
import { L as Label } from "./label-Bi_79Mmn.js";
import { P as PaginationControls } from "./pagination-controls-Bz09fOze.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-H0JYI2nI.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-DWq9r8gv.js";
import { T as Textarea } from "./textarea-CMsb0E2l.js";
import { Plus, Search, Loader2, HelpCircle, Edit, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
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
import "date-fns";
import "react-helmet-async";
import "reactflow";
import "@radix-ui/react-switch";
import "react-i18next";
import "@radix-ui/react-label";
import "@radix-ui/react-select";
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
  const [paginatedData, setPaginatedData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState(initialFormData);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(15);
  useEffect(() => {
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
    const cleanType = type.replace("App\\\\Models\\\\", "");
    return cleanType.charAt(0).toUpperCase() + cleanType.slice(1);
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold gradient-text", children: "FAQ Management" }),
        /* @__PURE__ */ jsx("p", { className: "text-nexus-muted mt-1", children: "Manage frequently asked questions for your platform" })
      ] }),
      /* @__PURE__ */ jsxs(Button, { onClick: () => handleOpenDialog(), className: "gradient-primary", children: [
        /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4 mr-2" }),
        "Add FAQ"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsx(Card, { className: "bg-nexus-card border-nexus-border", children: /* @__PURE__ */ jsxs(CardHeader, { className: "pb-3", children: [
        /* @__PURE__ */ jsx(CardDescription, { children: "Total FAQs" }),
        /* @__PURE__ */ jsx(CardTitle, { className: "text-3xl", children: totalFAQs })
      ] }) }),
      /* @__PURE__ */ jsx(Card, { className: "bg-nexus-card border-nexus-border", children: /* @__PURE__ */ jsxs(CardHeader, { className: "pb-3", children: [
        /* @__PURE__ */ jsx(CardDescription, { children: "Active FAQs" }),
        /* @__PURE__ */ jsx(CardTitle, { className: "text-3xl", children: faqs.filter((f) => f.status).length })
      ] }) }),
      /* @__PURE__ */ jsx(Card, { className: "bg-nexus-card border-nexus-border", children: /* @__PURE__ */ jsxs(CardHeader, { className: "pb-3", children: [
        /* @__PURE__ */ jsx(CardDescription, { children: "Inactive FAQs" }),
        /* @__PURE__ */ jsx(CardTitle, { className: "text-3xl", children: faqs.filter((f) => !f.status).length })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(Card, { className: "bg-nexus-card border-nexus-border", children: /* @__PURE__ */ jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-nexus-muted w-4 h-4" }),
      /* @__PURE__ */ jsx(
        Input,
        {
          placeholder: "Search FAQs...",
          value: searchQuery,
          onChange: (e) => setSearchQuery(e.target.value),
          className: "pl-10"
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsx(Card, { className: "bg-nexus-card border-nexus-border", children: /* @__PURE__ */ jsx(CardContent, { className: "pt-6", children: isLoading ? /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center py-12", children: /* @__PURE__ */ jsx(Loader2, { className: "w-8 h-8 animate-spin text-nexus-blue" }) }) : filteredFAQs.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "text-center py-12", children: [
      /* @__PURE__ */ jsx(HelpCircle, { className: "w-12 h-12 mx-auto text-nexus-muted mb-4" }),
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium mb-2", children: "No FAQs found" }),
      /* @__PURE__ */ jsx("p", { className: "text-nexus-muted mb-4", children: searchQuery ? "Try adjusting your search query" : "Get started by creating your first FAQ" }),
      !searchQuery && /* @__PURE__ */ jsxs(Button, { onClick: () => handleOpenDialog(), variant: "outline", children: [
        /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4 mr-2" }),
        "Add FAQ"
      ] })
    ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs(Table, { children: [
        /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableHead, { children: "Question" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Answer" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Type" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Status" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Sort Order" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-right", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsx(TableBody, { children: filteredFAQs.map((faq) => /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableCell, { className: "font-medium max-w-xs", children: faq.question }),
          /* @__PURE__ */ jsx(TableCell, { className: "max-w-md", children: /* @__PURE__ */ jsx("p", { className: "line-clamp-2 text-nexus-muted", children: faq.answer }) }),
          /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Badge, { variant: "outline", children: getFaqableTypeLabel(faq.faqable_type) }) }),
          /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(
            Badge,
            {
              variant: faq.status ? "default" : "secondary",
              className: faq.status ? "bg-emerald-500/20 text-emerald-500 border-emerald-500/30" : "bg-slate-500/20 text-slate-500 border-slate-500/30",
              children: faq.status ? "Active" : "Inactive"
            }
          ) }),
          /* @__PURE__ */ jsx(TableCell, { children: faq.sort_order }),
          /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-2", children: [
            /* @__PURE__ */ jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                onClick: () => handleOpenDialog(faq),
                children: /* @__PURE__ */ jsx(Edit, { className: "w-4 h-4" })
              }
            ),
            /* @__PURE__ */ jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                onClick: () => handleDelete(faq.id),
                className: "text-red-500 hover:text-red-600 hover:bg-red-500/10",
                children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" })
              }
            )
          ] }) })
        ] }, faq.id)) })
      ] }),
      /* @__PURE__ */ jsx(
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
    /* @__PURE__ */ jsx(Dialog, { open: isDialogOpen, onOpenChange: setIsDialogOpen, children: /* @__PURE__ */ jsxs(DialogContent, { className: "bg-nexus-card border-nexus-border max-w-2xl", children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { children: editingId ? "Edit FAQ" : "Create FAQ" }),
        /* @__PURE__ */ jsx(DialogDescription, { children: editingId ? "Update the FAQ details below" : "Add a new frequently asked question" })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "question", children: "Question *" }),
          /* @__PURE__ */ jsx(
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
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "answer", children: "Answer *" }),
          /* @__PURE__ */ jsx(
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
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "faqable_type", children: "Type" }),
            /* @__PURE__ */ jsxs(
              Select,
              {
                value: formData.faqable_type,
                onValueChange: (value) => setFormData({ ...formData, faqable_type: value }),
                children: [
                  /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
                  /* @__PURE__ */ jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsx(SelectItem, { value: "page", children: "Page" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "blog", children: "Blog" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "workflow", children: "Workflow" })
                  ] })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "faqable_id", children: "Related ID" }),
            /* @__PURE__ */ jsx(
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
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "sort_order", children: "Sort Order" }),
            /* @__PURE__ */ jsx(
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
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "status", children: "Status" }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2 h-10", children: [
              /* @__PURE__ */ jsx(
                Switch,
                {
                  id: "status",
                  checked: formData.status,
                  onCheckedChange: (checked) => setFormData({ ...formData, status: checked })
                }
              ),
              /* @__PURE__ */ jsx(Label, { htmlFor: "status", className: "!mt-0", children: formData.status ? "Active" : "Inactive" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(DialogFooter, { children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: handleCloseDialog,
              disabled: isSaving,
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsx(Button, { type: "submit", disabled: isSaving, className: "gradient-primary", children: isSaving ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(Loader2, { className: "w-4 h-4 mr-2 animate-spin" }),
            editingId ? "Updating..." : "Creating..."
          ] }) : /* @__PURE__ */ jsx(Fragment, { children: editingId ? "Update FAQ" : "Create FAQ" }) })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  FAQManagement as default
};
