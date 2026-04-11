import { bG as Root2, bH as Trigger, r as reactExports, j as jsxRuntimeExports, bI as Portal2, bJ as Content2, bK as Item2, bL as SubTrigger2, bM as ChevronRightIcon, bN as SubContent2, bO as CheckboxItem2, bP as ItemIndicator2, br as CheckIcon, bQ as RadioItem2, bR as DotFilledIcon, bS as Label2, bT as Separator2, L as LoaderCircle, a8 as BookOpen, bU as FolderPlus, bA as RefreshCw, P as Plus, b1 as CircleCheckBig, I as Eye, ad as Tag, y as Search, bV as EllipsisVertical, bW as SquarePen, bX as Trash2, a0 as Calendar, a1 as formatDistanceToNow, H as Clock } from "./vendor-oSjIcCqY.js";
import { c as cn, a as useToast, B as Button, C as Card, I as Input, d as Badge, D as Dialog, j as DialogContent, k as DialogHeader, l as DialogTitle, m as DialogDescription, n as DialogFooter, h as adminBlogService, o as adminBlogCategoryService } from "../ssr.js";
import { L as Label } from "./label-BSMxPeZT.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-gs7DqEWs.js";
import { T as Textarea } from "./textarea-yWepkaAh.js";
import "stream";
import "util";
const DropdownMenu = Root2;
const DropdownMenuTrigger = Trigger;
const DropdownMenuSubTrigger = reactExports.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  SubTrigger2,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRightIcon, { className: "ml-auto h-4 w-4" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = SubTrigger2.displayName;
const DropdownMenuSubContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  SubContent2,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent.displayName = SubContent2.displayName;
const DropdownMenuContent = reactExports.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Portal2, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content2,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent.displayName = Content2.displayName;
const DropdownMenuItem = reactExports.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Item2,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = Item2.displayName;
const DropdownMenuCheckboxItem = reactExports.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  CheckboxItem2,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ItemIndicator2, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CheckIcon, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = CheckboxItem2.displayName;
const DropdownMenuRadioItem = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  RadioItem2,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ItemIndicator2, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DotFilledIcon, { className: "h-4 w-4 fill-current" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = RadioItem2.displayName;
const DropdownMenuLabel = reactExports.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Label2,
  {
    ref,
    className: cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuLabel.displayName = Label2.displayName;
const DropdownMenuSeparator = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Separator2,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = Separator2.displayName;
function BlogManagement() {
  const { showToast } = useToast();
  const [blogs, setBlogs] = reactExports.useState([]);
  const [blogCategories, setBlogCategories] = reactExports.useState([]);
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [selectedCategory, setSelectedCategory] = reactExports.useState("All");
  const [selectedStatus, setSelectedStatus] = reactExports.useState("all");
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const [isFetchingDetails, setIsFetchingDetails] = reactExports.useState(false);
  const [currentPage, setCurrentPage] = reactExports.useState(1);
  const [totalPages, setTotalPages] = reactExports.useState(1);
  const [totalBlogs, setTotalBlogs] = reactExports.useState(0);
  const [showBlogDialog, setShowBlogDialog] = reactExports.useState(false);
  const [editingBlog, setEditingBlog] = reactExports.useState(null);
  const [blogForm, setBlogForm] = reactExports.useState({
    category_id: 0,
    title: "",
    slug: "",
    description: "",
    content: "",
    image_url: "",
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
    status: "draft",
    is_featured: false,
    published_at: "",
    // Advanced SEO fields
    seo_title: "",
    seo_description: "",
    seo_keywords: "",
    seo_canonical: "",
    seo_og_image: "",
    seo_twitter_card: "",
    seo_twitter_site: ""
  });
  const [isSavingBlog, setIsSavingBlog] = reactExports.useState(false);
  const [imageFile, setImageFile] = reactExports.useState(null);
  const [imagePreview, setImagePreview] = reactExports.useState("");
  const [showCategoryDialog, setShowCategoryDialog] = reactExports.useState(false);
  const [categoryForm, setCategoryForm] = reactExports.useState({
    title: "",
    description: "",
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
    sort_order: 1,
    is_active: true
  });
  const [isSavingCategory, setIsSavingCategory] = reactExports.useState(false);
  const [showViewDialog, setShowViewDialog] = reactExports.useState(false);
  const [viewingBlog, setViewingBlog] = reactExports.useState(null);
  const fetchBlogs = async (page = 1) => {
    setIsLoading(true);
    try {
      const result = await adminBlogService.getAll(page, 20);
      if (result.success && result.data) {
        setBlogs(result.data.data);
        setCurrentPage(result.data.current_page);
        setTotalPages(result.data.last_page);
        setTotalBlogs(result.data.total);
      } else {
        showToast(result.message || "Failed to fetch blogs", "error");
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      showToast("An error occurred while fetching blogs", "error");
    } finally {
      setIsLoading(false);
    }
  };
  const fetchCategories = async () => {
    try {
      const result = await adminBlogCategoryService.getAll();
      if (result.success && result.data && result.data.data) {
        setBlogCategories(result.data.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  reactExports.useEffect(() => {
    fetchBlogs();
    fetchCategories();
  }, []);
  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const categoryId = selectedCategory !== "All" ? blogCategories.find((c) => c.title === selectedCategory)?.id : void 0;
      const result = await adminBlogService.search(searchQuery, {
        category_id: categoryId,
        status: selectedStatus,
        page: 1
      });
      if (result.success && result.data) {
        setBlogs(result.data.data);
        setCurrentPage(result.data.current_page);
        setTotalPages(result.data.last_page);
        setTotalBlogs(result.data.total);
      } else {
        showToast(result.message || "Search failed", "error");
      }
    } catch (error) {
      console.error("Error searching blogs:", error);
      showToast("An error occurred while searching", "error");
    } finally {
      setIsLoading(false);
    }
  };
  reactExports.useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery || selectedCategory !== "All" || selectedStatus !== "all") {
        handleSearch();
      } else {
        fetchBlogs(1);
      }
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, selectedCategory, selectedStatus]);
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    try {
      const result = await adminBlogService.delete(id);
      if (result.success) {
        setBlogs(blogs.filter((b) => b.id !== id));
        showToast("Blog post deleted successfully", "success");
      } else {
        showToast(result.message || "Failed to delete blog post", "error");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      showToast("An error occurred while deleting", "error");
    }
  };
  const handleCreateBlog = () => {
    setEditingBlog(null);
    setImageFile(null);
    setImagePreview("");
    setBlogForm({
      category_id: blogCategories.length > 0 ? blogCategories[0].id : 0,
      title: "",
      slug: "",
      description: "",
      content: "",
      image_url: "",
      meta_title: "",
      meta_description: "",
      meta_keywords: "",
      status: "draft",
      is_featured: false,
      published_at: "",
      seo_title: "",
      seo_description: "",
      seo_keywords: "",
      seo_canonical: "",
      seo_og_image: "",
      seo_twitter_card: "",
      seo_twitter_site: ""
    });
    setShowBlogDialog(true);
  };
  const handleEditBlog = async (blog) => {
    setIsFetchingDetails(true);
    try {
      const baseUrl = "http://localhost:8000/api";
      const fetchUrl = baseUrl ? `${baseUrl}/blogs/${blog.slug || blog.id}` : `/api/blogs/${blog.slug || blog.id}`;
      const response = await fetch(fetchUrl, {
        headers: {
          "x-app-key": "739f77912fa0ca22538ad067e284545d5cd541a7c13cacebb5e3e4a8fdec9c8"
        }
      });
      const result = await response.json();
      const fullBlogData = result.success ? result.data : blog;
      const seoData = result.success ? result.seo : null;
      setEditingBlog(fullBlogData);
      setImageFile(null);
      setImagePreview("");
      setBlogForm({
        category_id: fullBlogData.category_id || 0,
        title: fullBlogData.title || "",
        slug: fullBlogData.slug || "",
        description: fullBlogData.description || "",
        content: fullBlogData.content || "",
        image_url: fullBlogData.image_url || "",
        meta_title: fullBlogData.meta_title || "",
        meta_description: fullBlogData.meta_description || "",
        meta_keywords: fullBlogData.meta_keywords || "",
        status: fullBlogData.status || "draft",
        is_featured: fullBlogData.is_featured || false,
        published_at: fullBlogData.published_at ? fullBlogData.published_at.slice(0, 16) : "",
        seo_title: seoData?.title || "",
        seo_description: seoData?.description || "",
        seo_keywords: seoData?.keywords || "",
        seo_canonical: seoData?.canonical || "",
        seo_og_image: seoData?.og_image || "",
        seo_twitter_card: seoData?.twitter_card || "",
        seo_twitter_site: seoData?.twitter_site || ""
      });
      setShowBlogDialog(true);
    } catch (error) {
      console.error("Error fetching full blog details:", error);
      showToast("Failed to fetch full blog details. Loading partial data.", "error");
      setEditingBlog(blog);
      setImageFile(null);
      setImagePreview("");
      setBlogForm({
        category_id: blog.category_id,
        title: blog.title,
        slug: blog.slug || "",
        description: blog.description,
        content: blog.content,
        image_url: blog.image_url || "",
        meta_title: blog.meta_title,
        meta_description: blog.meta_description,
        meta_keywords: blog.meta_keywords,
        status: blog.status,
        is_featured: blog.is_featured,
        published_at: "",
        seo_title: "",
        seo_description: "",
        seo_keywords: "",
        seo_canonical: "",
        seo_og_image: "",
        seo_twitter_card: "",
        seo_twitter_site: ""
      });
      setShowBlogDialog(true);
    } finally {
      setIsFetchingDetails(false);
    }
  };
  const handleSaveBlog = async () => {
    if (!blogForm.title || !blogForm.description || !blogForm.content) {
      showToast("Please fill in all required fields", "error");
      return;
    }
    if (!blogForm.category_id || blogForm.category_id === 0) {
      showToast("Please select a category", "error");
      return;
    }
    setIsSavingBlog(true);
    try {
      let result;
      if (imageFile) {
        result = editingBlog ? await adminBlogService.updateWithImage(editingBlog.id, blogForm, imageFile) : await adminBlogService.createWithImage(blogForm, imageFile);
      } else {
        result = editingBlog ? await adminBlogService.update(editingBlog.id, blogForm) : await adminBlogService.create(blogForm);
      }
      if (result.success) {
        showToast(`Blog ${editingBlog ? "updated" : "created"} successfully`, "success");
        setShowBlogDialog(false);
        setImageFile(null);
        setImagePreview("");
        fetchBlogs(currentPage);
      } else {
        showToast(result.message || "Failed to save blog", "error");
      }
    } catch (error) {
      console.error("Error saving blog:", error);
      showToast("An error occurred while saving", "error");
    } finally {
      setIsSavingBlog(false);
    }
  };
  const handleCreateCategory = () => {
    setCategoryForm({
      title: "",
      description: "",
      meta_title: "",
      meta_description: "",
      meta_keywords: "",
      sort_order: blogCategories.length + 1,
      is_active: true
    });
    setShowCategoryDialog(true);
  };
  const handleSaveCategory = async () => {
    if (!categoryForm.title || !categoryForm.description) {
      showToast("Please fill in title and description", "error");
      return;
    }
    setIsSavingCategory(true);
    try {
      const result = await adminBlogCategoryService.create(categoryForm);
      if (result.success) {
        showToast("Category created successfully", "success");
        setShowCategoryDialog(false);
        fetchCategories();
      } else {
        showToast(result.message || "Failed to create category", "error");
      }
    } catch (error) {
      console.error("Error creating category:", error);
      showToast("An error occurred while creating category", "error");
    } finally {
      setIsSavingCategory(false);
    }
  };
  const handleViewBlog = (blog) => {
    setViewingBlog(blog);
    setShowViewDialog(true);
  };
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const getStatusBadge = (status) => {
    switch (status) {
      case "published":
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-emerald-500/10 text-emerald-500 border-emerald-500/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3 h-3 mr-1" }),
          "Published"
        ] });
      case "draft":
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-slate-500/10 text-slate-400 border-slate-500/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "w-3 h-3 mr-1" }),
          "Draft"
        ] });
      case "scheduled":
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-blue-500/10 text-blue-400 border-blue-500/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3 mr-1" }),
          "Scheduled"
        ] });
    }
  };
  const totalViews = blogs.reduce((sum, blog) => sum + blog.views, 0);
  const publishedCount = blogs.filter((b) => b.status === "published").length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 md:p-6 space-y-6 max-w-7xl mx-auto relative", children: [
    isFetchingDetails && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-background/50 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-8 h-8 text-primary animate-spin" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-xl md:text-2xl font-bold mb-1 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-6 h-6 text-primary" }),
          "Blog Management"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Create and manage your blog content" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: handleCreateCategory, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FolderPlus, { className: "w-4 h-4 mr-2" }),
          "New Category"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: () => fetchBlogs(currentPage), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4 mr-2" }),
          "Refresh"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "bg-primary hover:bg-primary/90", onClick: handleCreateBlog, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-2" }),
          "New Article"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [
      { label: "Total Posts", value: totalBlogs, icon: BookOpen, color: "text-blue-500" },
      { label: "Published", value: publishedCount, icon: CircleCheckBig, color: "text-emerald-500" },
      { label: "Total Views", value: totalViews.toLocaleString(), icon: Eye, color: "text-purple-500" },
      { label: "Categories", value: blogCategories.length, icon: Tag, color: "text-pink-500" }
    ].map((stat) => {
      const Icon = stat.icon;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-4 bg-card border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: stat.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold", children: stat.value })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("p-2.5 rounded-lg bg-muted", stat.color), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5" }) })
      ] }) }, stat.label);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-4 bg-card border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Search articles...",
            value: searchQuery,
            onChange: (e) => setSearchQuery(e.target.value),
            className: "pl-10 bg-background"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: selectedCategory, onValueChange: setSelectedCategory, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-full md:w-[180px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Category" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "All", children: "All Categories" }),
          blogCategories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: cat.title, children: cat.title }, cat.id))
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: selectedStatus, onValueChange: setSelectedStatus, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-full md:w-[150px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Status" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "published", children: "Published" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "draft", children: "Draft" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "scheduled", children: "Scheduled" })
        ] })
      ] })
    ] }) }),
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-12 bg-card border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-12 h-12 text-primary mx-auto mb-4 animate-spin" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Loading blogs..." })
    ] }) }),
    !isLoading && blogs.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-4", children: blogs.map((blog) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border overflow-hidden hover:border-primary/30 transition-all duration-200", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row gap-4 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full md:w-48 h-32 rounded-lg overflow-hidden flex-shrink-0 bg-muted", children: blog.image_url ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: blog.image_url,
          alt: blog.title,
          className: "w-full h-full object-cover"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-12 h-12 text-muted-foreground" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold mb-1 truncate", children: blog.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground line-clamp-2", children: blog.description })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EllipsisVertical, { className: "w-4 h-4" }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "end", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: () => handleViewBlog(blog), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4 mr-2" }),
                "View"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: () => handleEditBlog(blog), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "w-4 h-4 mr-2" }),
                "Edit"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { className: "text-red-500", onClick: () => handleDelete(blog.id), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4 mr-2" }),
                "Delete"
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-[10px]", children: (blog.author?.name || "U").charAt(0).toUpperCase() }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: blog.author?.name || "Unknown" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3.5 h-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatDistanceToNow(new Date(blog.published_at || blog.created_at || Date.now()), { addSuffix: true }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-3 h-3 mr-1" }),
            blog.category?.title || "Uncategorized"
          ] }),
          getStatusBadge(blog.status),
          blog.is_featured && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-amber-500/10 text-amber-500 border-amber-500/30 text-xs", children: "Featured" })
        ] }),
        blog.status === "published" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-4 text-xs text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3.5 h-3.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            blog.views.toLocaleString(),
            " views"
          ] })
        ] }) }),
        blog.meta_keywords && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mt-3", children: blog.meta_keywords.split(",").map((tag, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: tag.trim() }, index)) })
      ] })
    ] }) }, blog.id)) }),
    !isLoading && totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: () => fetchBlogs(currentPage - 1),
          disabled: currentPage === 1,
          children: "Previous"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1", children: Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
        const page = i + 1;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: currentPage === page ? "default" : "outline",
            size: "sm",
            onClick: () => fetchBlogs(page),
            children: page
          },
          page
        );
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: () => fetchBlogs(currentPage + 1),
          disabled: currentPage === totalPages,
          children: "Next"
        }
      )
    ] }),
    !isLoading && blogs.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-12 bg-card border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-12 h-12 text-muted-foreground mx-auto mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold mb-2", children: "No articles found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: searchQuery || selectedCategory !== "All" || selectedStatus !== "all" ? "Try adjusting your filters" : "Get started by creating your first article" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleCreateBlog, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-2" }),
        "Create Article"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showBlogDialog, onOpenChange: setShowBlogDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-3xl max-h-[90vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: editingBlog ? "Edit Article" : "Create New Article" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: editingBlog ? "Update the complete article details below" : "Fill in the details to create a new blog article" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 py-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "blog-category", children: "Category *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: blogForm.category_id.toString(),
              onValueChange: (value) => setBlogForm({ ...blogForm, category_id: parseInt(value) }),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select a category" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: blogCategories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: cat.id.toString(), children: cat.title }, cat.id)) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "blog-title", children: "Title *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "blog-title",
              value: blogForm.title,
              onChange: (e) => setBlogForm({ ...blogForm, title: e.target.value }),
              placeholder: "Enter article title"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "blog-description", children: "Description *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "blog-description",
              value: blogForm.description,
              onChange: (e) => setBlogForm({ ...blogForm, description: e.target.value }),
              placeholder: "Brief description of the article",
              rows: 3
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "blog-content", children: "Content *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "blog-content",
              value: blogForm.content,
              onChange: (e) => setBlogForm({ ...blogForm, content: e.target.value }),
              placeholder: "Full article content (HTML supported)",
              rows: 8
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "blog-image", children: "Featured Image (Upload)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "blog-image",
              type: "file",
              accept: "image/*",
              onChange: handleImageChange,
              className: "cursor-pointer"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "blog-image-url", children: "Or Image URL" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "blog-image-url",
              type: "text",
              value: blogForm.image_url,
              onChange: (e) => setBlogForm({ ...blogForm, image_url: e.target.value }),
              placeholder: "https://example.com/image.jpg"
            }
          ),
          (imagePreview || blogForm.image_url) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: imagePreview || blogForm.image_url,
              alt: "Preview",
              className: "w-full max-w-sm h-40 object-cover rounded-lg border border-border",
              onError: (e) => {
                e.target.style.display = "none";
              },
              onLoad: (e) => {
                e.target.style.display = "block";
              }
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "blog-status", children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: blogForm.status,
                onValueChange: (value) => setBlogForm({ ...blogForm, status: value }),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "draft", children: "Draft" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "published", children: "Published" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "scheduled", children: "Scheduled" })
                  ] })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2 pt-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "checkbox",
                id: "blog-featured",
                checked: blogForm.is_featured,
                onChange: (e) => setBlogForm({ ...blogForm, is_featured: e.target.checked }),
                className: "w-4 h-4 rounded border-gray-300"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "blog-featured", className: "cursor-pointer", children: "Featured Article" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "blog-meta-title", children: "Meta Title (Basic SEO)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "blog-meta-title",
              value: blogForm.meta_title,
              onChange: (e) => setBlogForm({ ...blogForm, meta_title: e.target.value }),
              placeholder: "Basic SEO meta title"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "blog-meta-description", children: "Meta Description (Basic SEO)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "blog-meta-description",
              value: blogForm.meta_description,
              onChange: (e) => setBlogForm({ ...blogForm, meta_description: e.target.value }),
              placeholder: "Basic SEO meta description",
              rows: 2
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "blog-meta-keywords", children: "Meta Keywords (Basic SEO)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "blog-meta-keywords",
              value: blogForm.meta_keywords,
              onChange: (e) => setBlogForm({ ...blogForm, meta_keywords: e.target.value }),
              placeholder: "keyword1, keyword2, keyword3"
            }
          )
        ] }),
        editingBlog && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 pt-6 border-t border-border space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-lg font-semibold flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "w-5 h-5 text-primary" }),
              " Advanced Edit Fields"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Modify advanced URL settings and publish timings." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "blog-slug", children: "Slug (URL Route)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "blog-slug",
                value: blogForm.slug,
                onChange: (e) => setBlogForm({ ...blogForm, slug: e.target.value }),
                placeholder: "e.g. your-article-slug"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "blog-published-at", children: "Published At" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "blog-published-at",
                type: "datetime-local",
                value: blogForm.published_at,
                onChange: (e) => setBlogForm({ ...blogForm, published_at: e.target.value })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-2 mt-4 border-t border-border pt-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-lg font-semibold flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-5 h-5 text-primary" }),
              " Advanced SEO Settings"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Manage dedicated SEO properties for this blog." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "seo-title", children: "SEO Title" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "seo-title",
                value: blogForm.seo_title,
                onChange: (e) => setBlogForm({ ...blogForm, seo_title: e.target.value }),
                placeholder: "SEO specific title"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "seo-description", children: "SEO Description" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "seo-description",
                value: blogForm.seo_description,
                onChange: (e) => setBlogForm({ ...blogForm, seo_description: e.target.value }),
                placeholder: "SEO specific description",
                rows: 2
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "seo-keywords", children: "SEO Keywords" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "seo-keywords",
                  value: blogForm.seo_keywords,
                  onChange: (e) => setBlogForm({ ...blogForm, seo_keywords: e.target.value }),
                  placeholder: "keyword1, keyword2"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "seo-canonical", children: "Canonical URL" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "seo-canonical",
                  value: blogForm.seo_canonical,
                  onChange: (e) => setBlogForm({ ...blogForm, seo_canonical: e.target.value }),
                  placeholder: "https://example.com/canonical-url"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "seo-og-image", children: "OG Image URL" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "seo-og-image",
                  value: blogForm.seo_og_image,
                  onChange: (e) => setBlogForm({ ...blogForm, seo_og_image: e.target.value }),
                  placeholder: "https://example.com/image.png"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "seo-twitter", children: "Twitter Card Type" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "seo-twitter",
                  value: blogForm.seo_twitter_card,
                  onChange: (e) => setBlogForm({ ...blogForm, seo_twitter_card: e.target.value }),
                  placeholder: "summary_large_image"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2 md:col-span-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "seo-twitter-site", children: "Twitter Site Username" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "seo-twitter-site",
                  value: blogForm.seo_twitter_site,
                  onChange: (e) => setBlogForm({ ...blogForm, seo_twitter_site: e.target.value }),
                  placeholder: "@username"
                }
              )
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setShowBlogDialog(false), disabled: isSavingBlog, children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleSaveBlog, disabled: isSavingBlog, children: isSavingBlog ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }),
          "Saving..."
        ] }) : editingBlog ? "Update Article" : "Create Article" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showCategoryDialog, onOpenChange: setShowCategoryDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Create New Category" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Add a new blog category to organize your articles" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 py-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "cat-title", children: "Category Title *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "cat-title",
              value: categoryForm.title,
              onChange: (e) => setCategoryForm({ ...categoryForm, title: e.target.value }),
              placeholder: "Enter category title"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "cat-description", children: "Description *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "cat-description",
              value: categoryForm.description,
              onChange: (e) => setCategoryForm({ ...categoryForm, description: e.target.value }),
              placeholder: "Brief description of this category",
              rows: 3
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "cat-meta-title", children: "Meta Title (SEO)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "cat-meta-title",
              value: categoryForm.meta_title,
              onChange: (e) => setCategoryForm({ ...categoryForm, meta_title: e.target.value }),
              placeholder: "SEO meta title"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "cat-meta-description", children: "Meta Description (SEO)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "cat-meta-description",
              value: categoryForm.meta_description,
              onChange: (e) => setCategoryForm({ ...categoryForm, meta_description: e.target.value }),
              placeholder: "SEO meta description",
              rows: 2
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "cat-meta-keywords", children: "Meta Keywords (SEO)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "cat-meta-keywords",
              value: categoryForm.meta_keywords,
              onChange: (e) => setCategoryForm({ ...categoryForm, meta_keywords: e.target.value }),
              placeholder: "keyword1, keyword2, keyword3"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "cat-sort-order", children: "Sort Order" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "cat-sort-order",
                type: "number",
                value: categoryForm.sort_order,
                onChange: (e) => setCategoryForm({ ...categoryForm, sort_order: parseInt(e.target.value) || 1 })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2 pt-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "checkbox",
                id: "cat-active",
                checked: categoryForm.is_active,
                onChange: (e) => setCategoryForm({ ...categoryForm, is_active: e.target.checked }),
                className: "w-4 h-4 rounded border-gray-300"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "cat-active", className: "cursor-pointer", children: "Active" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setShowCategoryDialog(false), disabled: isSavingCategory, children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleSaveCategory, disabled: isSavingCategory, children: isSavingCategory ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }),
          "Creating..."
        ] }) : "Create Category" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showViewDialog, onOpenChange: setShowViewDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-4xl max-h-[90vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-2xl", children: viewingBlog?.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3 mt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-xs", children: (viewingBlog?.author?.name || "U").charAt(0).toUpperCase() }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: viewingBlog?.author?.name || "Unknown Author" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "•" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3.5 h-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: viewingBlog?.published_at ? formatDistanceToNow(new Date(viewingBlog.published_at), { addSuffix: true }) : formatDistanceToNow(new Date(viewingBlog?.created_at || Date.now()), { addSuffix: true }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "•" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: viewingBlog?.category?.title || "Uncategorized" }),
          viewingBlog?.is_featured && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "•" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-amber-500/10 text-amber-500 border-amber-500/30 text-xs", children: "Featured" })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 py-4", children: [
        viewingBlog?.image_url && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-64 rounded-lg overflow-hidden bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: viewingBlog.image_url,
            alt: viewingBlog.title,
            className: "w-full h-full object-cover"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-muted-foreground uppercase", children: "Description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base", children: viewingBlog?.description })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-muted-foreground uppercase", children: "Content" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "prose prose-sm dark:prose-invert max-w-none",
              dangerouslySetInnerHTML: { __html: viewingBlog?.content || "" }
            }
          )
        ] }),
        viewingBlog?.meta_keywords && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-muted-foreground uppercase", children: "Tags" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: viewingBlog.meta_keywords.split(",").map((tag, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: tag.trim() }, index)) })
        ] }),
        viewingBlog?.status === "published" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6 pt-4 border-t", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm", children: [
              viewingBlog?.views?.toLocaleString() || 0,
              " views"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: getStatusBadge(viewingBlog.status) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setShowViewDialog(false), children: "Close" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => {
          setShowViewDialog(false);
          if (viewingBlog) handleEditBlog(viewingBlog);
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "w-4 h-4 mr-2" }),
          "Edit Article"
        ] })
      ] })
    ] }) })
  ] });
}
export {
  BlogManagement as default
};
