import { r as reactExports, j as jsxDevRuntimeExports } from "../_libs/react.mjs";
import { R as Root2, b as Trigger2, P as Portal2, a as Content2, T as Title2, D as Description2, C as Cancel, A as Action, O as Overlay2 } from "../_libs/radix-ui__react-alert-dialog.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import { b as buttonVariants } from "./button-CM0KjKCo.mjs";
const AlertDialog = Root2;
const AlertDialogTrigger = Trigger2;
const AlertDialogPortal = Portal2;
const AlertDialogOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
  Overlay2,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  },
  void 0,
  false,
  {
    fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/alert-dialog.tsx",
    lineNumber: 17,
    columnNumber: 3
  },
  void 0
));
AlertDialogOverlay.displayName = Overlay2.displayName;
const AlertDialogContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(AlertDialogPortal, { children: [
  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(AlertDialogOverlay, {}, void 0, false, {
    fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/alert-dialog.tsx",
    lineNumber: 33,
    columnNumber: 5
  }, void 0),
  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    Content2,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      ),
      ...props
    },
    void 0,
    false,
    {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/alert-dialog.tsx",
      lineNumber: 34,
      columnNumber: 5
    },
    void 0
  )
] }, void 0, true, {
  fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/alert-dialog.tsx",
  lineNumber: 32,
  columnNumber: 3
}, void 0));
AlertDialogContent.displayName = Content2.displayName;
const AlertDialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: cn("flex flex-col space-y-2 text-center sm:text-left", className), ...props }, void 0, false, {
  fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/alert-dialog.tsx",
  lineNumber: 47,
  columnNumber: 3
}, void 0);
AlertDialogHeader.displayName = "AlertDialogHeader";
const AlertDialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
  "div",
  {
    className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
    ...props
  },
  void 0,
  false,
  {
    fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/alert-dialog.tsx",
    lineNumber: 52,
    columnNumber: 3
  },
  void 0
);
AlertDialogFooter.displayName = "AlertDialogFooter";
const AlertDialogTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
  Title2,
  {
    ref,
    className: cn("text-lg font-semibold", className),
    ...props
  },
  void 0,
  false,
  {
    fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/alert-dialog.tsx",
    lineNumber: 63,
    columnNumber: 3
  },
  void 0
));
AlertDialogTitle.displayName = Title2.displayName;
const AlertDialogDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
  Description2,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  },
  void 0,
  false,
  {
    fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/alert-dialog.tsx",
    lineNumber: 75,
    columnNumber: 3
  },
  void 0
));
AlertDialogDescription.displayName = Description2.displayName;
const AlertDialogAction = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Action, { ref, className: cn(buttonVariants(), className), ...props }, void 0, false, {
  fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/alert-dialog.tsx",
  lineNumber: 87,
  columnNumber: 3
}, void 0));
AlertDialogAction.displayName = Action.displayName;
const AlertDialogCancel = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
  Cancel,
  {
    ref,
    className: cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className),
    ...props
  },
  void 0,
  false,
  {
    fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/alert-dialog.tsx",
    lineNumber: 95,
    columnNumber: 3
  },
  void 0
));
AlertDialogCancel.displayName = Cancel.displayName;
export {
  AlertDialog as A,
  AlertDialogAction as a,
  AlertDialogCancel as b,
  AlertDialogContent as c,
  AlertDialogDescription as d,
  AlertDialogFooter as e,
  AlertDialogHeader as f,
  AlertDialogTitle as g,
  AlertDialogTrigger as h
};
