import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { a as useToast, o as useConfirmation, B as Button, C as Card, p as CardHeader, q as CardDescription, r as CardTitle, s as CardContent, I as Input, d as Badge, D as Dialog, i as DialogContent, j as DialogHeader, k as DialogTitle, l as DialogDescription, t as Switch, m as DialogFooter } from "../ssr.js";
import { L as Label } from "./label-Bi_79Mmn.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-DWq9r8gv.js";
import { T as Textarea } from "./textarea-CMsb0E2l.js";
import { c as courseService } from "./courseService-UHMy8Xl5.js";
import { Plus, Search, Loader2, BookOpen, Settings, Edit, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "react-dom/server";
import "react-router-dom/server.mjs";
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
  description: "",
  level: "beginner",
  is_published: false,
  seo_title: "",
  seo_description: "",
  seo_keywords: "",
  seo_meta_tags: "",
  seo_canonical_url: ""
};
function AdminCoursesPage() {
  const { showToast } = useToast();
  const { confirm } = useConfirmation();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState(initialFormData);
  const [ogImageFile, setOgImageFile] = useState(null);
  const [ogImagePreviewUrl, setOgImagePreviewUrl] = useState(null);
  useEffect(() => {
    loadCourses();
  }, []);
  useEffect(() => {
    return () => {
      if (ogImagePreviewUrl) URL.revokeObjectURL(ogImagePreviewUrl);
    };
  }, [ogImagePreviewUrl]);
  const loadCourses = async () => {
    setIsLoading(true);
    try {
      const response = await courseService.getAdminCourses();
      if (response.success && response.data) {
        setCourses(response.data.data);
      }
    } catch (error) {
      console.error("Failed to load courses:", error);
      showToast("Failed to load courses", "error");
    } finally {
      setIsLoading(false);
    }
  };
  const handleOpenDialog = (course) => {
    setOgImageFile(null);
    setOgImagePreviewUrl(null);
    if (course) {
      setEditingId(course.id);
      setFormData({
        title: course.title || "",
        slug: course.slug || "",
        description: course.description || "",
        level: course.level || "beginner",
        is_published: course.is_published || false,
        seo_title: course.seo?.title || course.seo_title || "",
        seo_description: course.seo?.description || course.seo_description || "",
        seo_keywords: course.seo?.keywords || course.seo_keywords || "",
        seo_meta_tags: course.seo?.meta_tags || course.seo_meta_tags || "",
        seo_canonical_url: course.seo?.canonical_url || course.seo_canonical_url || ""
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
    setOgImageFile(null);
    setOgImagePreviewUrl(null);
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
    if (!formData.title?.trim() || !formData.slug?.trim()) {
      showToast("Title and slug are required", "error");
      return;
    }
    setIsSaving(true);
    try {
      const submitData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (typeof value === "boolean") {
          submitData.append(key, value ? "1" : "0");
        } else {
          submitData.append(key, value !== null && value !== void 0 ? String(value) : "");
        }
      });
      if (ogImageFile) {
        submitData.append("og_image", ogImageFile);
      }
      if (editingId) {
        await courseService.updateCourse(editingId, submitData);
        showToast("Course updated successfully", "success");
      } else {
        await courseService.createCourse(submitData);
        showToast("Course created successfully", "success");
      }
      await loadCourses();
      handleCloseDialog();
    } catch (error) {
      console.error("Failed to save course:", error);
      showToast(editingId ? "Failed to update course" : "Failed to create course", "error");
    } finally {
      setIsSaving(false);
    }
  };
  const handleDelete = async (id) => {
    const confirmed = await confirm({
      title: "Delete Course",
      description: "Are you sure you want to delete this course? This action cannot be undone and will delete all modules and lessons.",
      confirmText: "Delete",
      cancelText: "Cancel"
    });
    if (!confirmed) return;
    try {
      await courseService.deleteCourse(id);
      showToast("Course deleted successfully", "success");
      await loadCourses();
    } catch (error) {
      console.error("Failed to delete course:", error);
      showToast("Failed to delete course", "error");
    }
  };
  const handleTogglePublish = async (id) => {
    try {
      await courseService.togglePublishCourse(id);
      showToast("Course publish status updated", "success");
      await loadCourses();
    } catch (error) {
      console.error("Failed to toggle publish status:", error);
      showToast("Failed to update status", "error");
    }
  };
  const filteredCourses = courses.filter(
    (course) => course.title.toLowerCase().includes(searchQuery.toLowerCase()) || course.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold gradient-text", children: "Course Management" }),
        /* @__PURE__ */ jsx("p", { className: "text-nexus-muted mt-1", children: "Manage your academy courses, modules, and lessons." })
      ] }),
      /* @__PURE__ */ jsxs(Button, { onClick: () => handleOpenDialog(), className: "gradient-primary", children: [
        /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4 mr-2" }),
        "Add Course"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsx(Card, { className: "bg-nexus-card border-nexus-border", children: /* @__PURE__ */ jsxs(CardHeader, { className: "pb-3", children: [
        /* @__PURE__ */ jsx(CardDescription, { children: "Total Courses" }),
        /* @__PURE__ */ jsx(CardTitle, { className: "text-3xl", children: courses.length })
      ] }) }),
      /* @__PURE__ */ jsx(Card, { className: "bg-nexus-card border-nexus-border", children: /* @__PURE__ */ jsxs(CardHeader, { className: "pb-3", children: [
        /* @__PURE__ */ jsx(CardDescription, { children: "Published Courses" }),
        /* @__PURE__ */ jsx(CardTitle, { className: "text-3xl", children: courses.filter((c) => c.is_published).length })
      ] }) }),
      /* @__PURE__ */ jsx(Card, { className: "bg-nexus-card border-nexus-border", children: /* @__PURE__ */ jsxs(CardHeader, { className: "pb-3", children: [
        /* @__PURE__ */ jsx(CardDescription, { children: "Draft Courses" }),
        /* @__PURE__ */ jsx(CardTitle, { className: "text-3xl", children: courses.filter((c) => !c.is_published).length })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(Card, { className: "bg-nexus-card border-nexus-border", children: /* @__PURE__ */ jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-nexus-muted w-4 h-4" }),
      /* @__PURE__ */ jsx(
        Input,
        {
          placeholder: "Search courses...",
          value: searchQuery,
          onChange: (e) => setSearchQuery(e.target.value),
          className: "pl-10"
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsx(Card, { className: "bg-nexus-card border-nexus-border", children: /* @__PURE__ */ jsx(CardContent, { className: "pt-6", children: isLoading ? /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center py-12", children: /* @__PURE__ */ jsx(Loader2, { className: "w-8 h-8 animate-spin text-nexus-blue" }) }) : filteredCourses.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "text-center py-12", children: [
      /* @__PURE__ */ jsx(BookOpen, { className: "w-12 h-12 mx-auto text-nexus-muted mb-4" }),
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium mb-2", children: "No courses found" }),
      /* @__PURE__ */ jsx("p", { className: "text-nexus-muted mb-4", children: searchQuery ? "Try adjusting your search query" : "Get started by creating your first course" }),
      !searchQuery && /* @__PURE__ */ jsxs(Button, { onClick: () => handleOpenDialog(), variant: "outline", children: [
        /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4 mr-2" }),
        "Add Course"
      ] })
    ] }) : /* @__PURE__ */ jsxs(Table, { children: [
      /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsx(TableHead, { children: "Title" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Slug" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Level" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Status" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Reviews" }),
        /* @__PURE__ */ jsx(TableHead, { className: "text-right", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsx(TableBody, { children: filteredCourses.map((course) => /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsx(TableCell, { className: "font-medium cursor-pointer hover:text-nexus-blue", onClick: () => navigate(`/app/courses/${course.id}`), children: course.title }),
        /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx("code", { className: "text-xs bg-nexus-border px-2 py-1 rounded", children: course.slug }) }),
        /* @__PURE__ */ jsx(TableCell, { className: "capitalize", children: course.level }),
        /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(
          Badge,
          {
            variant: course.is_published ? "default" : "secondary",
            className: course.is_published ? "bg-emerald-500/20 text-emerald-500 border-emerald-500/30 cursor-pointer" : "bg-slate-500/20 text-slate-500 border-slate-500/30 cursor-pointer",
            onClick: () => handleTogglePublish(course.id),
            title: "Click to toggle status",
            children: course.is_published ? "Published" : "Draft"
          }
        ) }),
        /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Badge, { variant: "outline", children: course.reviews_count || 0 }) }),
        /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-2", children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              title: "Manage Syllabus",
              onClick: () => navigate(`/app/courses/${course.id}`),
              children: /* @__PURE__ */ jsx(Settings, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              onClick: () => handleOpenDialog(course),
              children: /* @__PURE__ */ jsx(Edit, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              onClick: () => handleDelete(course.id),
              className: "text-red-500 hover:text-red-600 hover:bg-red-500/10",
              children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" })
            }
          )
        ] }) })
      ] }, course.id)) })
    ] }) }) }),
    /* @__PURE__ */ jsx(Dialog, { open: isDialogOpen, onOpenChange: setIsDialogOpen, children: /* @__PURE__ */ jsxs(DialogContent, { className: "bg-nexus-card border-nexus-border max-w-4xl max-h-[90vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { children: editingId ? "Edit Course" : "Create Course" }),
        /* @__PURE__ */ jsx(DialogDescription, { children: editingId ? "Update the course details below" : "Add a new course to your academy" })
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
                placeholder: "Enter course title",
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
                placeholder: "course-slug",
                required: true
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "level", children: "Level" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                id: "level",
                value: formData.level,
                onChange: (e) => setFormData({ ...formData, level: e.target.value }),
                className: "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                children: [
                  /* @__PURE__ */ jsx("option", { value: "beginner", children: "Beginner" }),
                  /* @__PURE__ */ jsx("option", { value: "intermediate", children: "Intermediate" }),
                  /* @__PURE__ */ jsx("option", { value: "advanced", children: "Advanced" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "space-y-2 pt-8", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsx(
              Switch,
              {
                id: "is_published",
                checked: formData.is_published,
                onCheckedChange: (checked) => setFormData({ ...formData, is_published: checked })
              }
            ),
            /* @__PURE__ */ jsx(Label, { htmlFor: "is_published", className: "!mt-0 cursor-pointer", children: formData.is_published ? "Published" : "Draft" })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "description", children: "Description" }),
          /* @__PURE__ */ jsx(
            Textarea,
            {
              id: "description",
              value: formData.description,
              onChange: (e) => setFormData({ ...formData, description: e.target.value }),
              placeholder: "Enter course description",
              rows: 4
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4 pt-4 border-t border-white/10", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold border-b border-white/10 pb-2", children: "SEO Variables" }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "seo_title", children: "SEO Title" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "seo_title",
                  value: formData.seo_title,
                  onChange: (e) => setFormData({ ...formData, seo_title: e.target.value }),
                  placeholder: "Enter SEO title"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "seo_keywords", children: "SEO Keywords" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "seo_keywords",
                  value: formData.seo_keywords,
                  onChange: (e) => setFormData({ ...formData, seo_keywords: e.target.value }),
                  placeholder: "keyword1, keyword2"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "seo_description", children: "SEO Description" }),
            /* @__PURE__ */ jsx(
              Textarea,
              {
                id: "seo_description",
                value: formData.seo_description,
                onChange: (e) => setFormData({ ...formData, seo_description: e.target.value }),
                placeholder: "Brief SEO description",
                rows: 2
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "seo_canonical_url", children: "Canonical URL" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "seo_canonical_url",
                  value: formData.seo_canonical_url,
                  onChange: (e) => setFormData({ ...formData, seo_canonical_url: e.target.value }),
                  placeholder: "https://test.com/..."
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "og_image", className: "cursor-pointer", children: "OG Image Upload" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "og_image",
                  type: "file",
                  accept: "image/png, image/jpeg, image/webp",
                  onChange: (e) => {
                    const file = e.target.files?.[0] || null;
                    setOgImageFile(file);
                    if (file) {
                      setOgImagePreviewUrl(URL.createObjectURL(file));
                    } else {
                      setOgImagePreviewUrl(null);
                    }
                  },
                  className: "cursor-pointer border-nexus-border file:text-white file:bg-transparent file:border-0"
                }
              ),
              ogImagePreviewUrl && /* @__PURE__ */ jsxs("div", { className: "mt-2 rounded-lg overflow-hidden border border-white/10 bg-black flex flex-col justify-center", children: [
                /* @__PURE__ */ jsx("img", { src: ogImagePreviewUrl, alt: "OG Image preview", className: "w-full max-h-[160px] object-contain bg-black/50" }),
                /* @__PURE__ */ jsxs("p", { className: "text-[10px] text-nexus-muted p-2 bg-white/5 truncate", children: [
                  "Ready: ",
                  ogImageFile?.name,
                  " (",
                  ogImageFile && (ogImageFile.size / 1024).toFixed(2),
                  " KB)"
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "seo_meta_tags", children: "Custom Meta Tags" }),
            /* @__PURE__ */ jsx(
              Textarea,
              {
                id: "seo_meta_tags",
                value: formData.seo_meta_tags,
                onChange: (e) => setFormData({ ...formData, seo_meta_tags: e.target.value }),
                placeholder: "<meta property='...' content='...'>",
                className: "font-mono text-sm",
                rows: 2
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs(DialogFooter, { className: "pt-4 border-t border-white/10", children: [
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
          ] }) : /* @__PURE__ */ jsx(Fragment, { children: editingId ? "Update Course" : "Create Course" }) })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  AdminCoursesPage as default
};
