"use strict";
const ssr = require("../ssr.cjs");
const Table = ssr.reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("div", { className: "relative w-full overflow-auto", children: /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(
  "table",
  {
    ref,
    className: ssr.cn("w-full caption-bottom text-sm", className),
    ...props
  }
) }));
Table.displayName = "Table";
const TableHeader = ssr.reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ ssr.jsxRuntimeExports.jsx("thead", { ref, className: ssr.cn("[&_tr]:border-b", className), ...props }));
TableHeader.displayName = "TableHeader";
const TableBody = ssr.reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(
  "tbody",
  {
    ref,
    className: ssr.cn("[&_tr:last-child]:border-0", className),
    ...props
  }
));
TableBody.displayName = "TableBody";
const TableFooter = ssr.reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(
  "tfoot",
  {
    ref,
    className: ssr.cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    ),
    ...props
  }
));
TableFooter.displayName = "TableFooter";
const TableRow = ssr.reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(
  "tr",
  {
    ref,
    className: ssr.cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    ),
    ...props
  }
));
TableRow.displayName = "TableRow";
const TableHead = ssr.reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(
  "th",
  {
    ref,
    className: ssr.cn(
      "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    ),
    ...props
  }
));
TableHead.displayName = "TableHead";
const TableCell = ssr.reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(
  "td",
  {
    ref,
    className: ssr.cn(
      "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    ),
    ...props
  }
));
TableCell.displayName = "TableCell";
const TableCaption = ssr.reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(
  "caption",
  {
    ref,
    className: ssr.cn("mt-4 text-sm text-muted-foreground", className),
    ...props
  }
));
TableCaption.displayName = "TableCaption";
exports.Table = Table;
exports.TableBody = TableBody;
exports.TableCell = TableCell;
exports.TableHead = TableHead;
exports.TableHeader = TableHeader;
exports.TableRow = TableRow;
