import { r as reactExports, j as jsxDevRuntimeExports } from "../_libs/react.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
const Input = reactExports.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "input",
      {
        type,
        className: cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      },
      void 0,
      false,
      {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/input.tsx",
        lineNumber: 8,
        columnNumber: 7
      },
      void 0
    );
  }
);
Input.displayName = "Input";
export {
  Input as I
};
