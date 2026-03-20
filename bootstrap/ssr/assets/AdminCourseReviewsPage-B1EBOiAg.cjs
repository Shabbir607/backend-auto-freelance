"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const ssr = require("../ssr.cjs");
const table = require("./table-BghVgMLi.cjs");
const courseService = require("./courseService-DHzi5qpu.cjs");
const trash2 = require("./trash-2-BfBBcNrN.cjs");
require("stream");
require("util");
function AdminCourseReviewsPage() {
  const { showToast } = ssr.useToast();
  const { confirm } = ssr.useConfirmation();
  const [reviews, setReviews] = ssr.reactExports.useState([]);
  const [isLoading, setIsLoading] = ssr.reactExports.useState(true);
  ssr.reactExports.useEffect(() => {
    loadReviews();
  }, []);
  const loadReviews = async () => {
    setIsLoading(true);
    try {
      const response = await courseService.courseService.getAdminReviews();
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
      await courseService.courseService.approveReview(id);
      showToast("Review approved", "success");
      await loadReviews();
    } catch (error) {
      console.error("Failed to approve review:", error);
      showToast("Failed to approve review", "error");
    }
  };
  const handleReject = async (id) => {
    try {
      await courseService.courseService.rejectReview(id);
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
      await courseService.courseService.deleteReview(id);
      showToast("Review deleted successfully", "success");
      await loadReviews();
    } catch (error) {
      console.error("Failed to delete review:", error);
      showToast("Failed to delete review", "error");
    }
  };
  const renderStars = (rating) => {
    return /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("div", { className: "flex items-center text-amber-500 text-xs", children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("span", { className: i < rating ? "opacity-100" : "opacity-30", children: "★" }, i)) });
  };
  return /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold gradient-text", children: "Course Reviews" }),
      /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("p", { className: "text-nexus-muted mt-1", children: "Moderate and manage user reviews for your courses." })
    ] }) }),
    /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.Card, { className: "bg-nexus-card border-nexus-border", children: /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs(ssr.CardHeader, { className: "pb-3", children: [
        /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.CardDescription, { children: "Total Reviews" }),
        /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.CardTitle, { className: "text-3xl", children: reviews.length })
      ] }) }),
      /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.Card, { className: "bg-nexus-card border-nexus-border", children: /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs(ssr.CardHeader, { className: "pb-3", children: [
        /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.CardDescription, { children: "Approved" }),
        /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.CardTitle, { className: "text-3xl", children: reviews.filter((r) => r.is_approved).length })
      ] }) }),
      /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.Card, { className: "bg-nexus-card border-nexus-border", children: /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs(ssr.CardHeader, { className: "pb-3", children: [
        /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.CardDescription, { children: "Pending / Rejected" }),
        /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.CardTitle, { className: "text-3xl", children: reviews.filter((r) => !r.is_approved).length })
      ] }) })
    ] }),
    /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.Card, { className: "bg-nexus-card border-nexus-border", children: /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.CardContent, { className: "pt-6", children: isLoading ? /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-12", children: /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.LoaderCircle, { className: "w-8 h-8 animate-spin text-nexus-blue" }) }) : reviews.length === 0 ? /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "text-center py-12", children: [
      /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.MessageSquare, { className: "w-12 h-12 mx-auto text-nexus-muted mb-4" }),
      /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("h3", { className: "text-lg font-medium mb-2", children: "No reviews found" }),
      /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("p", { className: "text-nexus-muted mb-4", children: "You don't have any course reviews to moderate right now." })
    ] }) : /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs(table.Table, { children: [
      /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(table.TableHeader, { children: /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs(table.TableRow, { children: [
        /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(table.TableHead, { children: "Review" }),
        /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(table.TableHead, { children: "Course ID" }),
        /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(table.TableHead, { children: "Reviewer" }),
        /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(table.TableHead, { children: "Status" }),
        /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(table.TableHead, { className: "text-right", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(table.TableBody, { children: reviews.map((review) => /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs(table.TableRow, { children: [
        /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs(table.TableCell, { className: "max-w-xs", children: [
          /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("div", { className: "font-medium text-sm text-white", children: review.title }),
          renderStars(review.rating),
          /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("p", { className: "text-xs text-nexus-muted mt-1 line-clamp-2", title: review.comment, children: review.comment })
        ] }),
        /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(table.TableCell, { children: /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs(ssr.Badge, { variant: "outline", children: [
          "ID: ",
          review.course_id
        ] }) }),
        /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs(table.TableCell, { children: [
          /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", children: review.user?.name || review.guest_email || "Guest" }),
          /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("div", { className: "text-xs text-nexus-muted", children: new Date(review.created_at).toLocaleDateString() })
        ] }),
        /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(table.TableCell, { children: /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(
          ssr.Badge,
          {
            variant: review.is_approved ? "default" : "secondary",
            className: review.is_approved ? "bg-emerald-500/20 text-emerald-500 border-emerald-500/30" : "bg-amber-500/20 text-amber-500 border-amber-500/30",
            children: review.is_approved ? "Approved" : "Pending"
          }
        ) }),
        /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(table.TableCell, { className: "text-right", children: /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-2", children: [
          !review.is_approved ? /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(
            ssr.Button,
            {
              variant: "ghost",
              size: "icon",
              title: "Approve Review",
              onClick: () => handleApprove(review.id),
              className: "text-emerald-500 hover:text-emerald-600 hover:bg-emerald-500/10",
              children: /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.Check, { className: "w-4 h-4" })
            }
          ) : /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(
            ssr.Button,
            {
              variant: "ghost",
              size: "icon",
              title: "Reject Review",
              onClick: () => handleReject(review.id),
              className: "text-amber-500 hover:text-amber-600 hover:bg-amber-500/10",
              children: /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.X, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(
            ssr.Button,
            {
              variant: "ghost",
              size: "icon",
              title: "Delete Review",
              onClick: () => handleDelete(review.id),
              className: "text-red-500 hover:text-red-600 hover:bg-red-500/10",
              children: /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(trash2.Trash2, { className: "w-4 h-4" })
            }
          )
        ] }) })
      ] }, review.id)) })
    ] }) }) })
  ] });
}
exports.default = AdminCourseReviewsPage;
