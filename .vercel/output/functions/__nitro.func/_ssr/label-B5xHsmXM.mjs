import { r as reactExports, j as jsxDevRuntimeExports } from "../_libs/react.mjs";
import { R as Root } from "../_libs/radix-ui__react-label.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
const Label = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Root, { ref, className: cn(labelVariants(), className), ...props }, void 0, false, {
  fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/label.tsx",
  lineNumber: 17,
  columnNumber: 3
}, void 0));
Label.displayName = Root.displayName;
export {
  Label as L
};
