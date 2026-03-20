"use strict";
const ssr = require("../ssr.cjs");
const select = require("./select-pTnym9L9.cjs");
const ChevronsLeft = ssr.createLucideIcon("ChevronsLeft", [
  ["path", { d: "m11 17-5-5 5-5", key: "13zhaf" }],
  ["path", { d: "m18 17-5-5 5-5", key: "h8a8et" }]
]);
const ChevronsRight = ssr.createLucideIcon("ChevronsRight", [
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
  return /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs(
    "div",
    {
      className: ssr.cn(
        "flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-nexus-border",
        className
      ),
      children: [
        /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center gap-4 text-sm text-nexus-muted", children: [
          showPageInfo && /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "whitespace-nowrap", children: [
            "Showing ",
            /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("span", { className: "font-medium text-white", children: from }),
            " to",
            " ",
            /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("span", { className: "font-medium text-white", children: to }),
            " of",
            " ",
            /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("span", { className: "font-medium text-white", children: total }),
            " items"
          ] }),
          showPerPageSelector && onPerPageChange && /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("span", { className: "whitespace-nowrap", children: "Items per page:" }),
            /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs(
              select.Select,
              {
                value: perPage.toString(),
                onValueChange: handlePerPageChange,
                disabled: isLoading,
                children: [
                  /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(select.SelectTrigger, { className: "w-20 h-8", children: /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(select.SelectValue, {}) }),
                  /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(select.SelectContent, { children: ssr.PAGINATION_CONFIG.pageSizeOptions.map((size) => /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(select.SelectItem, { value: size.toString(), children: size }, size)) })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          showFirstLastButtons && /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(
            ssr.Button,
            {
              variant: "outline",
              size: "icon",
              className: "h-8 w-8",
              onClick: () => handlePageChange(1),
              disabled: !canGoToPrevious || isLoading,
              title: "First page",
              children: /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ChevronsLeft, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(
            ssr.Button,
            {
              variant: "outline",
              size: "icon",
              className: "h-8 w-8",
              onClick: () => handlePageChange(currentPage - 1),
              disabled: !canGoToPrevious || isLoading,
              title: "Previous page",
              children: /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.ChevronLeft, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1", children: pageNumbers.map((page, index) => {
            if (page === "...") {
              return /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(
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
            return /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(
              ssr.Button,
              {
                variant: isActive ? "default" : "outline",
                size: "icon",
                className: ssr.cn(
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
          /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(
            ssr.Button,
            {
              variant: "outline",
              size: "icon",
              className: "h-8 w-8",
              onClick: () => handlePageChange(currentPage + 1),
              disabled: !canGoToNext || isLoading,
              title: "Next page",
              children: /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.ChevronRight, { className: "h-4 w-4" })
            }
          ),
          showFirstLastButtons && /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(
            ssr.Button,
            {
              variant: "outline",
              size: "icon",
              className: "h-8 w-8",
              onClick: () => handlePageChange(totalPages),
              disabled: !canGoToNext || isLoading,
              title: "Last page",
              children: /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ChevronsRight, { className: "h-4 w-4" })
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
  return /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("div", { className: ssr.cn("flex items-center justify-between gap-2", className), children: [
    /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs(
      ssr.Button,
      {
        variant: "outline",
        size: "sm",
        onClick: () => onPageChange(currentPage - 1),
        disabled: !canGoToPrevious || isLoading,
        children: [
          /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.ChevronLeft, { className: "h-4 w-4 mr-1" }),
          "Previous"
        ]
      }
    ),
    /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs("span", { className: "text-sm text-nexus-muted", children: [
      "Page ",
      /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("span", { className: "font-medium text-white", children: currentPage }),
      " of",
      " ",
      /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("span", { className: "font-medium text-white", children: totalPages })
    ] }),
    /* @__PURE__ */ ssr.jsxRuntimeExports.jsxs(
      ssr.Button,
      {
        variant: "outline",
        size: "sm",
        onClick: () => onPageChange(currentPage + 1),
        disabled: !canGoToNext || isLoading,
        children: [
          "Next",
          /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(ssr.ChevronRight, { className: "h-4 w-4 ml-1" })
        ]
      }
    )
  ] });
}
exports.CompactPagination = CompactPagination;
exports.PaginationControls = PaginationControls;
