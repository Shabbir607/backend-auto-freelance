import { e as createLucideIcon, j as jsxRuntimeExports, aR as PAGINATION_CONFIG, b as Button, y as ChevronLeft, c as cn, C as ChevronRight } from "../ssr.js";
import { S as Select, b as SelectTrigger, d as SelectValue, e as SelectContent, f as SelectItem } from "./select-D2P8LlRo.js";
const ChevronsLeft = createLucideIcon("ChevronsLeft", [
  ["path", { d: "m11 17-5-5 5-5", key: "13zhaf" }],
  ["path", { d: "m18 17-5-5 5-5", key: "h8a8et" }]
]);
const ChevronsRight = createLucideIcon("ChevronsRight", [
  ["path", { d: "m6 17 5-5-5-5", key: "xnjwq" }],
  ["path", { d: "m13 17 5-5-5-5", key: "17xmmf" }]
]);
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-nexus-border",
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center gap-4 text-sm text-nexus-muted", children: [
          showPageInfo && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "whitespace-nowrap", children: [
            "Showing ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-white", children: from }),
            " to",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-white", children: to }),
            " of",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-white", children: total }),
            " items"
          ] }),
          showPerPageSelector && onPerPageChange && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "whitespace-nowrap", children: "Items per page:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: perPage.toString(),
                onValueChange: handlePerPageChange,
                disabled: isLoading,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-20 h-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: PAGINATION_CONFIG.pageSizeOptions.map((size) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: size.toString(), children: size }, size)) })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          showFirstLastButtons && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "icon",
              className: "h-8 w-8",
              onClick: () => handlePageChange(1),
              disabled: !canGoToPrevious || isLoading,
              title: "First page",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronsLeft, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "icon",
              className: "h-8 w-8",
              onClick: () => handlePageChange(currentPage - 1),
              disabled: !canGoToPrevious || isLoading,
              title: "Previous page",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1", children: pageNumbers.map((page, index) => {
            if (page === "...") {
              return /* @__PURE__ */ jsxRuntimeExports.jsx(
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
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
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
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "icon",
              className: "h-8 w-8",
              onClick: () => handlePageChange(currentPage + 1),
              disabled: !canGoToNext || isLoading,
              title: "Next page",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" })
            }
          ),
          showFirstLastButtons && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "icon",
              className: "h-8 w-8",
              onClick: () => handlePageChange(totalPages),
              disabled: !canGoToNext || isLoading,
              title: "Last page",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronsRight, { className: "h-4 w-4" })
            }
          )
        ] })
      ]
    }
  );
}
function CompactPagination({
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
  className
}) {
  const canGoToPrevious = currentPage > 1;
  const canGoToNext = currentPage < totalPages;
  if (totalPages <= 1) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("flex items-center justify-between gap-2", className), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        variant: "outline",
        size: "sm",
        onClick: () => onPageChange(currentPage - 1),
        disabled: !canGoToPrevious || isLoading,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4 mr-1" }),
          "Previous"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-nexus-muted", children: [
      "Page ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-white", children: currentPage }),
      " of",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-white", children: totalPages })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        variant: "outline",
        size: "sm",
        onClick: () => onPageChange(currentPage + 1),
        disabled: !canGoToNext || isLoading,
        children: [
          "Next",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4 ml-1" })
        ]
      }
    )
  ] });
}
export {
  CompactPagination as C,
  PaginationControls as P
};
