"use strict";
const ssr = require("../ssr.cjs");
const Textarea = ssr.reactExports.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ ssr.jsxRuntimeExports.jsx(
      "textarea",
      {
        className: ssr.cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Textarea.displayName = "Textarea";
exports.Textarea = Textarea;
