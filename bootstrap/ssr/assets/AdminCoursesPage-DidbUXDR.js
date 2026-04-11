import { d as distExports, r as reactExports, j as jsxRuntimeExports, P as Plus, y as Search, L as LoaderCircle, a8 as BookOpen, R as Settings, bW as SquarePen, bX as Trash2 } from "./vendor-oSjIcCqY.js";
import { a as useToast, q as useConfirmation, B as Button, C as Card, r as CardHeader, s as CardDescription, t as CardTitle, e as CardContent, I as Input, d as Badge, D as Dialog, j as DialogContent, k as DialogHeader, l as DialogTitle, m as DialogDescription, v as Switch, n as DialogFooter } from "../ssr.js";
import { L as Label } from "./label-BSMxPeZT.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-BVC2gdaa.js";
import { T as Textarea } from "./textarea-yWepkaAh.js";
import { c as courseService } from "./courseService-UHMy8Xl5.js";
import "stream";
import "util";
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
  const navigate = distExports.useNavigate();
  const [courses, setCourses] = reactExports.useState([]);
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const [isDialogOpen, setIsDialogOpen] = reactExports.useState(false);
  const [isSaving, setIsSaving] = reactExports.useState(false);
  const [editingId, setEditingId] = reactExports.useState(null);
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [formData, setFormData] = reactExports.useState(initialFormData);
  const [ogImageFile, setOgImageFile] = reactExports.useState(null);
  const [ogImagePreviewUrl, setOgImagePreviewUrl] = reactExports.useState(null);
  reactExports.useEffect(() => {
    loadCourses();
  }, []);
  reactExports.useEffect(() => {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold gradient-text", children: "Course Management" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-nexus-muted mt-1", children: "Manage your academy courses, modules, and lessons." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => handleOpenDialog(), className: "gradient-primary", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-2" }),
        "Add Course"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-nexus-card border-nexus-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Total Courses" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-3xl", children: courses.length })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-nexus-card border-nexus-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Published Courses" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-3xl", children: courses.filter((c) => c.is_published).length })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-nexus-card border-nexus-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Draft Courses" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-3xl", children: courses.filter((c) => !c.is_published).length })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-nexus-card border-nexus-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-nexus-muted w-4 h-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          placeholder: "Search courses...",
          value: searchQuery,
          onChange: (e) => setSearchQuery(e.target.value),
          className: "pl-10"
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-nexus-card border-nexus-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-6", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-8 h-8 animate-spin text-nexus-blue" }) }) : filteredCourses.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-12 h-12 mx-auto text-nexus-muted mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-medium mb-2", children: "No courses found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-nexus-muted mb-4", children: searchQuery ? "Try adjusting your search query" : "Get started by creating your first course" }),
      !searchQuery && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => handleOpenDialog(), variant: "outline", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-2" }),
        "Add Course"
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Title" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Slug" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Level" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Reviews" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: filteredCourses.map((course) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium cursor-pointer hover:text-nexus-blue", onClick: () => navigate(`/app/courses/${course.id}`), children: course.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-xs bg-nexus-border px-2 py-1 rounded", children: course.slug }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "capitalize", children: course.level }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Badge,
          {
            variant: course.is_published ? "default" : "secondary",
            className: course.is_published ? "bg-emerald-500/20 text-emerald-500 border-emerald-500/30 cursor-pointer" : "bg-slate-500/20 text-slate-500 border-slate-500/30 cursor-pointer",
            onClick: () => handleTogglePublish(course.id),
            title: "Click to toggle status",
            children: course.is_published ? "Published" : "Draft"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: course.reviews_count || 0 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              title: "Manage Syllabus",
              onClick: () => navigate(`/app/courses/${course.id}`),
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              onClick: () => handleOpenDialog(course),
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              onClick: () => handleDelete(course.id),
              className: "text-red-500 hover:text-red-600 hover:bg-red-500/10",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
            }
          )
        ] }) })
      ] }, course.id)) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: isDialogOpen, onOpenChange: setIsDialogOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "bg-nexus-card border-nexus-border max-w-4xl max-h-[90vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: editingId ? "Edit Course" : "Create Course" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: editingId ? "Update the course details below" : "Add a new course to your academy" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "title", children: "Title *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
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
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "slug", children: "Slug *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
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
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "level", children: "Level" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                id: "level",
                value: formData.level,
                onChange: (e) => setFormData({ ...formData, level: e.target.value }),
                className: "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "beginner", children: "Beginner" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "intermediate", children: "Intermediate" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "advanced", children: "Advanced" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 pt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Switch,
              {
                id: "is_published",
                checked: formData.is_published,
                onCheckedChange: (checked) => setFormData({ ...formData, is_published: checked })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "is_published", className: "!mt-0 cursor-pointer", children: formData.is_published ? "Published" : "Draft" })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "description", children: "Description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
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
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 pt-4 border-t border-white/10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold border-b border-white/10 pb-2", children: "SEO Variables" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "seo_title", children: "SEO Title" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "seo_title",
                  value: formData.seo_title,
                  onChange: (e) => setFormData({ ...formData, seo_title: e.target.value }),
                  placeholder: "Enter SEO title"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "seo_keywords", children: "SEO Keywords" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
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
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "seo_description", children: "SEO Description" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
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
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "seo_canonical_url", children: "Canonical URL" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "seo_canonical_url",
                  value: formData.seo_canonical_url,
                  onChange: (e) => setFormData({ ...formData, seo_canonical_url: e.target.value }),
                  placeholder: "https://test.com/..."
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "og_image", className: "cursor-pointer", children: "OG Image Upload" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
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
              ogImagePreviewUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 rounded-lg overflow-hidden border border-white/10 bg-black flex flex-col justify-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: ogImagePreviewUrl, alt: "OG Image preview", className: "w-full max-h-[160px] object-contain bg-black/50" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-nexus-muted p-2 bg-white/5 truncate", children: [
                  "Ready: ",
                  ogImageFile?.name,
                  " (",
                  ogImageFile && (ogImageFile.size / 1024).toFixed(2),
                  " KB)"
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "seo_meta_tags", children: "Custom Meta Tags" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
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
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "pt-4 border-t border-white/10", children: [
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
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: editingId ? "Update Course" : "Create Course" }) })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  AdminCoursesPage as default
};
