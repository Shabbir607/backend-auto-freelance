import { r as reactExports, j as jsxRuntimeExports, L as LoaderCircle, s as MessageSquare, a2 as Check, X, bX as Trash2 } from "./vendor-oSjIcCqY.js";
import { a as useToast, q as useConfirmation, C as Card, r as CardHeader, s as CardDescription, t as CardTitle, e as CardContent, d as Badge, B as Button } from "../ssr.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-BVC2gdaa.js";
import { c as courseService } from "./courseService-UHMy8Xl5.js";
import "stream";
import "util";
function AdminCourseReviewsPage() {
  const { showToast } = useToast();
  const { confirm } = useConfirmation();
  const [reviews, setReviews] = reactExports.useState([]);
  const [isLoading, setIsLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    loadReviews();
  }, []);
  const loadReviews = async () => {
    setIsLoading(true);
    try {
      const response = await courseService.getAdminReviews();
      if (response.success && response.data) {
        setReviews(response.data.data);
      }
    } catch (error) {
      console.error("Failed to load reviews:", error);
      showToast("Failed to load reviews", "error");
    } finally {
      setIsLoading(false);
    }
  };
  const handleApprove = async (id) => {
    try {
      await courseService.approveReview(id);
      showToast("Review approved", "success");
      await loadReviews();
    } catch (error) {
      console.error("Failed to approve review:", error);
      showToast("Failed to approve review", "error");
    }
  };
  const handleReject = async (id) => {
    try {
      await courseService.rejectReview(id);
      showToast("Review rejected", "success");
      await loadReviews();
    } catch (error) {
      console.error("Failed to reject review:", error);
      showToast("Failed to reject review", "error");
    }
  };
  const handleDelete = async (id) => {
    const confirmed = await confirm({
      title: "Delete Review",
      description: "Are you sure you want to permanently delete this review?",
      confirmText: "Delete",
      cancelText: "Cancel"
    });
    if (!confirmed) return;
    try {
      await courseService.deleteReview(id);
      showToast("Review deleted successfully", "success");
      await loadReviews();
    } catch (error) {
      console.error("Failed to delete review:", error);
      showToast("Failed to delete review", "error");
    }
  };
  const renderStars = (rating) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center text-amber-500 text-xs", children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: i < rating ? "opacity-100" : "opacity-30", children: "★" }, i)) });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold gradient-text", children: "Course Reviews" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-nexus-muted mt-1", children: "Moderate and manage user reviews for your courses." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-nexus-card border-nexus-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Total Reviews" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-3xl", children: reviews.length })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-nexus-card border-nexus-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Approved" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-3xl", children: reviews.filter((r) => r.is_approved).length })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-nexus-card border-nexus-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Pending / Rejected" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-3xl", children: reviews.filter((r) => !r.is_approved).length })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-nexus-card border-nexus-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-6", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-8 h-8 animate-spin text-nexus-blue" }) }) : reviews.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-12 h-12 mx-auto text-nexus-muted mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-medium mb-2", children: "No reviews found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-nexus-muted mb-4", children: "You don't have any course reviews to moderate right now." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Review" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Course ID" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Reviewer" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: reviews.map((review) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "max-w-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-sm text-white", children: review.title }),
          renderStars(review.rating),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-nexus-muted mt-1 line-clamp-2", title: review.comment, children: review.comment })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", children: [
          "ID: ",
          review.course_id
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", children: review.user?.name || review.guest_email || "Guest" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-nexus-muted", children: new Date(review.created_at).toLocaleDateString() })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Badge,
          {
            variant: review.is_approved ? "default" : "secondary",
            className: review.is_approved ? "bg-emerald-500/20 text-emerald-500 border-emerald-500/30" : "bg-amber-500/20 text-amber-500 border-amber-500/30",
            children: review.is_approved ? "Approved" : "Pending"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-2", children: [
          !review.is_approved ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              title: "Approve Review",
              onClick: () => handleApprove(review.id),
              className: "text-emerald-500 hover:text-emerald-600 hover:bg-emerald-500/10",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4" })
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              title: "Reject Review",
              onClick: () => handleReject(review.id),
              className: "text-amber-500 hover:text-amber-600 hover:bg-amber-500/10",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              title: "Delete Review",
              onClick: () => handleDelete(review.id),
              className: "text-red-500 hover:text-red-600 hover:bg-red-500/10",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
            }
          )
        ] }) })
      ] }, review.id)) })
    ] }) }) })
  ] });
}
export {
  AdminCourseReviewsPage as default
};
