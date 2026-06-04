import { r as reactExports, j as jsxDevRuntimeExports } from "../_libs/react.mjs";
import { R as Root } from "../_libs/radix-ui__react-separator.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
const Separator = reactExports.forwardRef(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
  Root,
  {
    ref,
    decorative,
    orientation,
    className: cn(
      "shrink-0 bg-border",
      orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
      className
    ),
    ...props
  },
  void 0,
  false,
  {
    fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/separator.tsx",
    lineNumber: 10,
    columnNumber: 3
  },
  void 0
));
Separator.displayName = Root.displayName;
export {
  Separator as S
};
