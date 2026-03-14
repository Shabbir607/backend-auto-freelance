import { jsxs, jsx } from "react/jsx-runtime";
import { E as PAGINATION_CONFIG, B as Button, c as cn } from "../ssr.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-H0JYI2nI.js";
import { ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from "lucide-react";
function PaginationControls({
  data,
  onPageChange,
  onPerPageChange,
  showPerPageSelector = true,
  showPageInfo = true,
  showFirstLastButtons = true,
  className,
  isLoading = false
}) {
  if (!data || data.total === 0) {
    return null;
  }
  const currentPage = data.current_page;
  const totalPages = data.last_page;
  const perPage = data.per_page;
  const total = data.total;
  const from = data.from || 0;
  const to = data.to || 0;
  const canGoToPrevious = currentPage > 1;
  const canGoToNext = currentPage < totalPages;
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    onPageChange(page);
  };
  const handlePerPageChange = (value) => {
    if (onPerPageChange) {
      onPerPageChange(parseInt(value, 10));
    }
  };
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 7;
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage <= 3) {
        for (let i = 2; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };
  const pageNumbers = getPageNumbers();
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-nexus-border",
        className
      ),
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-center gap-4 text-sm text-nexus-muted", children: [
          showPageInfo && /* @__PURE__ */ jsxs("div", { className: "whitespace-nowrap", children: [
            "Showing ",
            /* @__PURE__ */ jsx("span", { className: "font-medium text-white", children: from }),
            " to",
            " ",
            /* @__PURE__ */ jsx("span", { className: "font-medium text-white", children: to }),
            " of",
            " ",
            /* @__PURE__ */ jsx("span", { className: "font-medium text-white", children: total }),
            " items"
          ] }),
          showPerPageSelector && onPerPageChange && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "whitespace-nowrap", children: "Items per page:" }),
            /* @__PURE__ */ jsxs(
              Select,
              {
                value: perPage.toString(),
                onValueChange: handlePerPageChange,
                disabled: isLoading,
                children: [
                  /* @__PURE__ */ jsx(SelectTrigger, { className: "w-20 h-8", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
                  /* @__PURE__ */ jsx(SelectContent, { children: PAGINATION_CONFIG.pageSizeOptions.map((size) => /* @__PURE__ */ jsx(SelectItem, { value: size.toString(), children: size }, size)) })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          showFirstLastButtons && /* @__PURE__ */ jsx(
            Button,
            {
              variant: "outline",
              size: "icon",
              className: "h-8 w-8",
              onClick: () => handlePageChange(1),
              disabled: !canGoToPrevious || isLoading,
              title: "First page",
              children: /* @__PURE__ */ jsx(ChevronsLeft, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "outline",
              size: "icon",
              className: "h-8 w-8",
              onClick: () => handlePageChange(currentPage - 1),
              disabled: !canGoToPrevious || isLoading,
              title: "Previous page",
              children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1", children: pageNumbers.map((page, index) => {
            if (page === "...") {
              return /* @__PURE__ */ jsx(
                "span",
                {
                  className: "px-2 text-nexus-muted",
                  children: "..."
                },
                `ellipsis-${index}`
              );
            }
            const pageNum = page;
            const isActive = pageNum === currentPage;
            return /* @__PURE__ */ jsx(
              Button,
              {
                variant: isActive ? "default" : "outline",
                size: "icon",
                className: cn(
                  "h-8 w-8",
                  isActive && "gradient-primary text-white border-0"
                ),
                onClick: () => handlePageChange(pageNum),
                disabled: isLoading,
                children: pageNum
              },
              pageNum
            );
          }) }),
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "outline",
              size: "icon",
              className: "h-8 w-8",
              onClick: () => handlePageChange(currentPage + 1),
              disabled: !canGoToNext || isLoading,
              title: "Next page",
              children: /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4" })
            }
          ),
          showFirstLastButtons && /* @__PURE__ */ jsx(
            Button,
            {
              variant: "outline",
              size: "icon",
              className: "h-8 w-8",
              onClick: () => handlePageChange(totalPages),
              disabled: !canGoToNext || isLoading,
              title: "Last page",
              children: /* @__PURE__ */ jsx(ChevronsRight, { className: "h-4 w-4" })
            }
          )
        ] })
      ]
    }
  );
}
export {
  PaginationControls as P
};
