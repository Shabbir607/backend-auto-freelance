import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { a as useToast, o as useConfirmation, B as Button, C as Card, p as CardHeader, q as CardDescription, r as CardTitle, s as CardContent, I as Input, d as Badge, D as Dialog, i as DialogContent, j as DialogHeader, k as DialogTitle, l as DialogDescription, t as Switch, m as DialogFooter } from "../ssr.js";
import { L as Label } from "./label-Bi_79Mmn.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-DWq9r8gv.js";
import { T as Textarea } from "./textarea-CMsb0E2l.js";
import { p as pageService } from "./pageService-Cxi9cwOM.js";
import { Plus, Search, Loader2, FileText, Edit, Trash2 } from "lucide-react";
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
import "date-fns";
import "react-helmet-async";
import "reactflow";
import "@radix-ui/react-switch";
import "react-i18next";
import "@radix-ui/react-label";
const initialFormData = {
  title: "",
  slug: "",
  content: "",
  meta_title: "",
  meta_description: "",
  meta_keywords: "",
  meta_tags: {},
  og_image: "",
  is_active: true
};
function PageManagement() {
  const { showToast } = useToast();
  const { confirm } = useConfirmation();
  const [pages, setPages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState(initialFormData);
  const [metaTagsJson, setMetaTagsJson] = useState("{}");
  useEffect(() => {
    loadPages();
  }, []);
  const loadPages = async () => {
    setIsLoading(true);
    try {
      const response = await pageService.listPages();
      if (response.success) {
        setPages(response.data);
      }
    } catch (error) {
      console.error("Failed to load pages:", error);
      showToast("Failed to load pages", "error");
    } finally {
      setIsLoading(false);
    }
  };
  const handleOpenDialog = (page) => {
    if (page) {
      setEditingId(page.id);
      setFormData({
        title: page.title,
        slug: page.slug,
        content: page.content,
        meta_title: page.meta_title,
        meta_description: page.meta_description,
        meta_keywords: page.meta_keywords,
        meta_tags: page.meta_tags,
        og_image: page.og_image,
        is_active: page.is_active
      });
      setMetaTagsJson(JSON.stringify(page.meta_tags, null, 2));
    } else {
      setEditingId(null);
      setFormData(initialFormData);
      setMetaTagsJson("{}");
    }
    setIsDialogOpen(true);
  };
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingId(null);
    setFormData(initialFormData);
    setMetaTagsJson("{}");
  };
  const generateSlug = (title) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  };
  const handleTitleChange = (title) => {
    setFormData({ ...formData, title });
    if (!editingId) {
      setFormData((prev) => ({ ...prev, title, slug: generateSlug(title) }));
    } else {
      setFormData((prev) => ({ ...prev, title }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.slug.trim()) {
      showToast("Title and slug are required", "error");
      return;
    }
    let metaTags = {};
    try {
      metaTags = JSON.parse(metaTagsJson);
    } catch (e2) {
      showToast("Invalid JSON in meta tags", "error");
      return;
    }
    setIsSaving(true);
    try {
      const dataToSubmit = {
        ...formData,
        meta_tags: metaTags
      };
      if (editingId) {
        await pageService.updatePage(editingId, dataToSubmit);
        showToast("Page updated successfully", "success");
      } else {
        await pageService.createPage(dataToSubmit);
        showToast("Page created successfully", "success");
      }
      await loadPages();
      handleCloseDialog();
    } catch (error) {
      console.error("Failed to save page:", error);
      showToast(editingId ? "Failed to update page" : "Failed to create page", "error");
    } finally {
      setIsSaving(false);
    }
  };
  const handleDelete = async (id) => {
    const confirmed = await confirm({
      title: "Delete Page",
      message: "Are you sure you want to delete this page? This action cannot be undone.",
      confirmText: "Delete",
      cancelText: "Cancel"
    });
    if (!confirmed) return;
    try {
      await pageService.deletePage(id);
      showToast("Page deleted successfully", "success");
      await loadPages();
    } catch (error) {
      console.error("Failed to delete page:", error);
      showToast("Failed to delete page", "error");
    }
  };
  const filteredPages = pages.filter(
    (page) => page.title.toLowerCase().includes(searchQuery.toLowerCase()) || page.slug.toLowerCase().includes(searchQuery.toLowerCase()) || page.content.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold gradient-text", children: "Page Management" }),
        /* @__PURE__ */ jsx("p", { className: "text-nexus-muted mt-1", children: "Manage static pages for your website" })
      ] }),
      /* @__PURE__ */ jsxs(Button, { onClick: () => handleOpenDialog(), className: "gradient-primary", children: [
        /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4 mr-2" }),
        "Add Page"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsx(Card, { className: "bg-nexus-card border-nexus-border", children: /* @__PURE__ */ jsxs(CardHeader, { className: "pb-3", children: [
        /* @__PURE__ */ jsx(CardDescription, { children: "Total Pages" }),
        /* @__PURE__ */ jsx(CardTitle, { className: "text-3xl", children: pages.length })
      ] }) }),
      /* @__PURE__ */ jsx(Card, { className: "bg-nexus-card border-nexus-border", children: /* @__PURE__ */ jsxs(CardHeader, { className: "pb-3", children: [
        /* @__PURE__ */ jsx(CardDescription, { children: "Active Pages" }),
        /* @__PURE__ */ jsx(CardTitle, { className: "text-3xl", children: pages.filter((p) => p.is_active).length })
      ] }) }),
      /* @__PURE__ */ jsx(Card, { className: "bg-nexus-card border-nexus-border", children: /* @__PURE__ */ jsxs(CardHeader, { className: "pb-3", children: [
        /* @__PURE__ */ jsx(CardDescription, { children: "Inactive Pages" }),
        /* @__PURE__ */ jsx(CardTitle, { className: "text-3xl", children: pages.filter((p) => !p.is_active).length })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(Card, { className: "bg-nexus-card border-nexus-border", children: /* @__PURE__ */ jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-nexus-muted w-4 h-4" }),
      /* @__PURE__ */ jsx(
        Input,
        {
          placeholder: "Search pages...",
          value: searchQuery,
          onChange: (e) => setSearchQuery(e.target.value),
          className: "pl-10"
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsx(Card, { className: "bg-nexus-card border-nexus-border", children: /* @__PURE__ */ jsx(CardContent, { className: "pt-6", children: isLoading ? /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center py-12", children: /* @__PURE__ */ jsx(Loader2, { className: "w-8 h-8 animate-spin text-nexus-blue" }) }) : filteredPages.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "text-center py-12", children: [
      /* @__PURE__ */ jsx(FileText, { className: "w-12 h-12 mx-auto text-nexus-muted mb-4" }),
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium mb-2", children: "No pages found" }),
      /* @__PURE__ */ jsx("p", { className: "text-nexus-muted mb-4", children: searchQuery ? "Try adjusting your search query" : "Get started by creating your first page" }),
      !searchQuery && /* @__PURE__ */ jsxs(Button, { onClick: () => handleOpenDialog(), variant: "outline", children: [
        /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4 mr-2" }),
        "Add Page"
      ] })
    ] }) : /* @__PURE__ */ jsxs(Table, { children: [
      /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsx(TableHead, { children: "Title" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Slug" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Meta Title" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Status" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Updated" }),
        /* @__PURE__ */ jsx(TableHead, { className: "text-right", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsx(TableBody, { children: filteredPages.map((page) => /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsx(TableCell, { className: "font-medium", children: page.title }),
        /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx("code", { className: "text-xs bg-nexus-border px-2 py-1 rounded", children: page.slug }) }),
        /* @__PURE__ */ jsx(TableCell, { className: "max-w-xs truncate", children: page.meta_title }),
        /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(
          Badge,
          {
            variant: page.is_active ? "default" : "secondary",
            className: page.is_active ? "bg-emerald-500/20 text-emerald-500 border-emerald-500/30" : "bg-slate-500/20 text-slate-500 border-slate-500/30",
            children: page.is_active ? "Active" : "Inactive"
          }
        ) }),
        /* @__PURE__ */ jsx(TableCell, { className: "text-nexus-muted text-sm", children: new Date(page.updated_at).toLocaleDateString() }),
        /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-2", children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              onClick: () => handleOpenDialog(page),
              children: /* @__PURE__ */ jsx(Edit, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              onClick: () => handleDelete(page.id),
              className: "text-red-500 hover:text-red-600 hover:bg-red-500/10",
              children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" })
            }
          )
        ] }) })
      ] }, page.id)) })
    ] }) }) }),
    /* @__PURE__ */ jsx(Dialog, { open: isDialogOpen, onOpenChange: setIsDialogOpen, children: /* @__PURE__ */ jsxs(DialogContent, { className: "bg-nexus-card border-nexus-border max-w-4xl max-h-[90vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { children: editingId ? "Edit Page" : "Create Page" }),
        /* @__PURE__ */ jsx(DialogDescription, { children: editingId ? "Update the page details below" : "Add a new page to your website" })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "title", children: "Title *" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "title",
                value: formData.title,
                onChange: (e) => handleTitleChange(e.target.value),
                placeholder: "Enter page title",
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "slug", children: "Slug *" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "slug",
                value: formData.slug,
                onChange: (e) => setFormData({ ...formData, slug: e.target.value }),
                placeholder: "page-slug",
                required: true
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "content", children: "Content *" }),
          /* @__PURE__ */ jsx(
            Textarea,
            {
              id: "content",
              value: formData.content,
              onChange: (e) => setFormData({ ...formData, content: e.target.value }),
              placeholder: "Enter page content (HTML supported)",
              rows: 6,
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "meta_title", children: "Meta Title" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "meta_title",
              value: formData.meta_title,
              onChange: (e) => setFormData({ ...formData, meta_title: e.target.value }),
              placeholder: "SEO title"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "meta_description", children: "Meta Description" }),
          /* @__PURE__ */ jsx(
            Textarea,
            {
              id: "meta_description",
              value: formData.meta_description,
              onChange: (e) => setFormData({ ...formData, meta_description: e.target.value }),
              placeholder: "SEO description",
              rows: 3
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "meta_keywords", children: "Meta Keywords" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "meta_keywords",
              value: formData.meta_keywords,
              onChange: (e) => setFormData({ ...formData, meta_keywords: e.target.value }),
              placeholder: "keyword1, keyword2, keyword3"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "og_image", children: "OG Image URL" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "og_image",
              value: formData.og_image,
              onChange: (e) => setFormData({ ...formData, og_image: e.target.value }),
              placeholder: "https://example.com/image.jpg"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "meta_tags", children: "Meta Tags (JSON)" }),
          /* @__PURE__ */ jsx(
            Textarea,
            {
              id: "meta_tags",
              value: metaTagsJson,
              onChange: (e) => setMetaTagsJson(e.target.value),
              placeholder: '{"robots": "index,follow", "author": "Company Name"}',
              rows: 4,
              className: "font-mono text-sm"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsx(
            Switch,
            {
              id: "is_active",
              checked: formData.is_active,
              onCheckedChange: (checked) => setFormData({ ...formData, is_active: checked })
            }
          ),
          /* @__PURE__ */ jsx(Label, { htmlFor: "is_active", className: "!mt-0", children: formData.is_active ? "Active" : "Inactive" })
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
          ] }) : /* @__PURE__ */ jsx(Fragment, { children: editingId ? "Update Page" : "Create Page" }) })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  PageManagement as default
};
