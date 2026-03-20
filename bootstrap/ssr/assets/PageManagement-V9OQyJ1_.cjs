"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const ssr = require("../ssr.cjs");
const label = require("./label-BST6Rr9i.cjs");
const table = require("./table-BghVgMLi.cjs");
const textarea = require("./textarea-CHua6wZE.cjs");
const pageService = require("./pageService-Cr3ChvZU.cjs");
const squarePen = require("./square-pen-DNzlKH8s.cjs");
const trash2 = require("./trash-2-BfBBcNrN.cjs");
require("stream");
require("util");
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
  const { showToast } = ssr.useToast();
  const { confirm } = ssr.useConfirmation();
  const [pages, setPages] = ssr.reactExports.useState([]);
  const [isLoading, setIsLoading] = ssr.reactExports.useState(true);
  const [isDialogOpen, setIsDialogOpen] = ssr.reactExports.useState(false);
  const [isSaving, setIsSaving] = ssr.reactExports.useState(false);
  const [editingId, setEditingId] = ssr.reactExports.useState(null);
  const [searchQuery, setSearchQuery] = ssr.reactExports.useState("");
  const [formData, setFormData] = ssr.reactExports.useState(initialFormData);
  const [metaTagsJson, setMetaTagsJson] = ssr.reactExports.useState("{}");
  ssr.reactExports.useEffect(() => {
    loadPages();
  }, []);
  const loadPages = async () => {
    setIsLoading(true);
    try {
      const response = await pageService.pageService.listPages();
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
        await pageService.pageService.updatePage(editingId, dataToSubmit);
        showToast("Page updated successfully", "success");
      } else {
        await pageService.pageService.createPage(dataToSubmit);
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
      description: "Are you sure you want to delete this page? This action cannot be undone.",
      confirmText: "Delete",
      cancelText: "Cancel"
    });
    if (!confirmed) return;
    try {
      await pageService.pageService.deletePage(id);
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
  return /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold gradient-text", children: "Page Management" }),
        /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("p", { className: "text-nexus-muted mt-1", children: "Manage static pages for your website" })
      ] }),
      /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs(ssr.Button, { onClick: () => handleOpenDialog(), className: "gradient-primary", children: [
        /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.Plus, { className: "w-4 h-4 mr-2" }),
        "Add Page"
      ] })
    ] }),
    /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.Card, { className: "bg-nexus-card border-nexus-border", children: /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs(ssr.CardHeader, { className: "pb-3", children: [
        /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.CardDescription, { children: "Total Pages" }),
        /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.CardTitle, { className: "text-3xl", children: pages.length })
      ] }) }),
      /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.Card, { className: "bg-nexus-card border-nexus-border", children: /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs(ssr.CardHeader, { className: "pb-3", children: [
        /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.CardDescription, { children: "Active Pages" }),
        /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.CardTitle, { className: "text-3xl", children: pages.filter((p) => p.is_active).length })
      ] }) }),
      /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.Card, { className: "bg-nexus-card border-nexus-border", children: /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs(ssr.CardHeader, { className: "pb-3", children: [
        /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.CardDescription, { children: "Inactive Pages" }),
        /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.CardTitle, { className: "text-3xl", children: pages.filter((p) => !p.is_active).length })
      ] }) })
    ] }),
    /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.Card, { className: "bg-nexus-card border-nexus-border", children: /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.CardContent, { className: "pt-6", children: /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-nexus-muted w-4 h-4" }),
      /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(
        ssr.Input,
        {
          placeholder: "Search pages...",
          value: searchQuery,
          onChange: (e) => setSearchQuery(e.target.value),
          className: "pl-10"
        }
      )
    ] }) }) }),
    /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.Card, { className: "bg-nexus-card border-nexus-border", children: /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.CardContent, { className: "pt-6", children: isLoading ? /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-12", children: /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.LoaderCircle, { className: "w-8 h-8 animate-spin text-nexus-blue" }) }) : filteredPages.length === 0 ? /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "text-center py-12", children: [
      /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.FileText, { className: "w-12 h-12 mx-auto text-nexus-muted mb-4" }),
      /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("h3", { className: "text-lg font-medium mb-2", children: "No pages found" }),
      /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("p", { className: "text-nexus-muted mb-4", children: searchQuery ? "Try adjusting your search query" : "Get started by creating your first page" }),
      !searchQuery && /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs(ssr.Button, { onClick: () => handleOpenDialog(), variant: "outline", children: [
        /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.Plus, { className: "w-4 h-4 mr-2" }),
        "Add Page"
      ] })
    ] }) : /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs(table.Table, { children: [
      /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(table.TableHeader, { children: /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs(table.TableRow, { children: [
        /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(table.TableHead, { children: "Title" }),
        /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(table.TableHead, { children: "Slug" }),
        /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(table.TableHead, { children: "Meta Title" }),
        /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(table.TableHead, { children: "Status" }),
        /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(table.TableHead, { children: "Updated" }),
        /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(table.TableHead, { className: "text-right", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(table.TableBody, { children: filteredPages.map((page) => /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs(table.TableRow, { children: [
        /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(table.TableCell, { className: "font-medium", children: page.title }),
        /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(table.TableCell, { children: /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("code", { className: "text-xs bg-nexus-border px-2 py-1 rounded", children: page.slug }) }),
        /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(table.TableCell, { className: "max-w-xs truncate", children: page.meta_title }),
        /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(table.TableCell, { children: /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(
          ssr.Badge,
          {
            variant: page.is_active ? "default" : "secondary",
            className: page.is_active ? "bg-emerald-500/20 text-emerald-500 border-emerald-500/30" : "bg-slate-500/20 text-slate-500 border-slate-500/30",
            children: page.is_active ? "Active" : "Inactive"
          }
        ) }),
        /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(table.TableCell, { className: "text-nexus-muted text-sm", children: new Date(page.updated_at).toLocaleDateString() }),
        /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(table.TableCell, { className: "text-right", children: /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-2", children: [
          /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(
            ssr.Button,
            {
              variant: "ghost",
              size: "icon",
              onClick: () => handleOpenDialog(page),
              children: /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(squarePen.SquarePen, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(
            ssr.Button,
            {
              variant: "ghost",
              size: "icon",
              onClick: () => handleDelete(page.id),
              className: "text-red-500 hover:text-red-600 hover:bg-red-500/10",
              children: /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(trash2.Trash2, { className: "w-4 h-4" })
            }
          )
        ] }) })
      ] }, page.id)) })
    ] }) }) }),
    /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.Dialog, { open: isDialogOpen, onOpenChange: setIsDialogOpen, children: /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs(ssr.DialogContent, { className: "bg-nexus-card border-nexus-border max-w-4xl max-h-[90vh] overflow-y-auto", children: [
      /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs(ssr.DialogHeader, { children: [
        /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.DialogTitle, { children: editingId ? "Edit Page" : "Create Page" }),
        /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.DialogDescription, { children: editingId ? "Update the page details below" : "Add a new page to your website" })
      ] }),
      /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(label.Label, { htmlFor: "title", children: "Title *" }),
            /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(
              ssr.Input,
              {
                id: "title",
                value: formData.title,
                onChange: (e) => handleTitleChange(e.target.value),
                placeholder: "Enter page title",
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(label.Label, { htmlFor: "slug", children: "Slug *" }),
            /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(
              ssr.Input,
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
        /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(label.Label, { htmlFor: "content", children: "Content *" }),
          /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(
            textarea.Textarea,
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
        /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(label.Label, { htmlFor: "meta_title", children: "Meta Title" }),
          /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(
            ssr.Input,
            {
              id: "meta_title",
              value: formData.meta_title,
              onChange: (e) => setFormData({ ...formData, meta_title: e.target.value }),
              placeholder: "SEO title"
            }
          )
        ] }),
        /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(label.Label, { htmlFor: "meta_description", children: "Meta Description" }),
          /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(
            textarea.Textarea,
            {
              id: "meta_description",
              value: formData.meta_description,
              onChange: (e) => setFormData({ ...formData, meta_description: e.target.value }),
              placeholder: "SEO description",
              rows: 3
            }
          )
        ] }),
        /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(label.Label, { htmlFor: "meta_keywords", children: "Meta Keywords" }),
          /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(
            ssr.Input,
            {
              id: "meta_keywords",
              value: formData.meta_keywords,
              onChange: (e) => setFormData({ ...formData, meta_keywords: e.target.value }),
              placeholder: "keyword1, keyword2, keyword3"
            }
          )
        ] }),
        /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(label.Label, { htmlFor: "og_image", children: "OG Image URL" }),
          /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(
            ssr.Input,
            {
              id: "og_image",
              value: formData.og_image,
              onChange: (e) => setFormData({ ...formData, og_image: e.target.value }),
              placeholder: "https://example.com/image.jpg"
            }
          )
        ] }),
        /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(label.Label, { htmlFor: "meta_tags", children: "Meta Tags (JSON)" }),
          /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(
            textarea.Textarea,
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
        /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(
            ssr.Switch,
            {
              id: "is_active",
              checked: formData.is_active,
              onCheckedChange: (checked) => setFormData({ ...formData, is_active: checked })
            }
          ),
          /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(label.Label, { htmlFor: "is_active", className: "!mt-0", children: formData.is_active ? "Active" : "Inactive" })
        ] }),
        /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs(ssr.DialogFooter, { children: [
          /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(
            ssr.Button,
            {
              type: "button",
              variant: "outline",
              onClick: handleCloseDialog,
              disabled: isSaving,
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.Button, { type: "submit", disabled: isSaving, className: "gradient-primary", children: isSaving ? /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs(ssr.jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }),
            editingId ? "Updating..." : "Creating..."
          ] }) : /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.jsxRuntimeExports.Fragment, { children: editingId ? "Update Page" : "Create Page" }) })
        ] })
      ] })
    ] }) })
  ] });
}
exports.default = PageManagement;
