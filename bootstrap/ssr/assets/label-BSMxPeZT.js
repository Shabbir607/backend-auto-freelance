import { r as reactExports, j as jsxRuntimeExports, bY as Root, i as cva } from "./vendor-oSjIcCqY.js";
import { c as cn } from "../ssr.js";
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
const Label = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Root,
  {
    ref,
    className: cn(labelVariants(), className),
    ...props
  }
));
Label.displayName = Root.displayName;
export {
  Label as L
};
