import { r as reactExports, j as jsxDevRuntimeExports } from "./_libs/react.mjs";
import { e as useRouterState, u as useNavigate, O as Outlet, L as Link } from "./_libs/tanstack__react-router.mjs";
import { S as Slot } from "./_libs/radix-ui__react-slot.mjs";
import { c as cva } from "./_libs/class-variance-authority.mjs";
import { c as cn } from "./_ssr/utils-H80jjgLf.mjs";
import { B as Button } from "./_ssr/button-CM0KjKCo.mjs";
import { I as Input } from "./_ssr/input-Dxdu6HuB.mjs";
import { S as Separator } from "./_ssr/separator-B72-6T1L.mjs";
import { R as Root, P as Portal, a as Content, C as Close, T as Title, D as Description, O as Overlay } from "./_libs/radix-ui__react-dialog.mjs";
import { a as Provider, R as Root3, T as Trigger, P as Portal$1, C as Content2 } from "./_libs/radix-ui__react-tooltip.mjs";
import { u as useAuth } from "./_ssr/use-auth-YByzSFug.mjs";
import { t as toast } from "./_libs/sonner.mjs";
import { t as User, m as LogOut, G as GraduationCap, L as LayoutDashboard, v as Users, e as ClipboardList, i as FileText, C as Calendar, B as BookOpen, P as PanelLeft, X } from "./_libs/lucide-react.mjs";
import "./_libs/tanstack__router-core.mjs";
import "./_libs/tanstack__history.mjs";
import "./_libs/cookie-es.mjs";
import "./_libs/seroval.mjs";
import "./_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "./_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "crypto";
import "stream";
import "./_libs/isbot.mjs";
import "./_libs/radix-ui__react-compose-refs.mjs";
import "./_libs/clsx.mjs";
import "./_libs/tailwind-merge.mjs";
import "./_libs/radix-ui__react-separator.mjs";
import "./_libs/radix-ui__react-primitive.mjs";
import "./_libs/radix-ui__primitive.mjs";
import "./_libs/radix-ui__react-context.mjs";
import "./_libs/radix-ui__react-id.mjs";
import "./_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "./_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "./_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "./_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "./_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "./_libs/radix-ui__react-focus-scope.mjs";
import "./_libs/radix-ui__react-portal.mjs";
import "./_libs/radix-ui__react-presence.mjs";
import "./_libs/radix-ui__react-focus-guards.mjs";
import "./_libs/react-remove-scroll.mjs";
import "tslib";
import "./_libs/react-remove-scroll-bar.mjs";
import "./_libs/react-style-singleton.mjs";
import "./_libs/get-nonce.mjs";
import "./_libs/use-sidecar.mjs";
import "./_libs/use-callback-ref.mjs";
import "./_libs/aria-hidden.mjs";
import "./_libs/radix-ui__react-popper.mjs";
import "./_libs/floating-ui__react-dom.mjs";
import "./_libs/floating-ui__dom.mjs";
import "./_libs/floating-ui__core.mjs";
import "./_libs/floating-ui__utils.mjs";
import "./_libs/radix-ui__react-arrow.mjs";
import "./_libs/radix-ui__react-use-size.mjs";
import "./_libs/@radix-ui/react-visually-hidden+[...].mjs";
const MOBILE_BREAKPOINT = 768;
function useIsMobile() {
  const [isMobile, setIsMobile] = reactExports.useState(void 0);
  reactExports.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return !!isMobile;
}
const Sheet = Root;
const SheetPortal = Portal;
const SheetOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
  Overlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  },
  void 0,
  false,
  {
    fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/sheet.tsx",
    lineNumber: 22,
    columnNumber: 3
  },
  void 0
));
SheetOverlay.displayName = Overlay.displayName;
const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
);
const SheetContent = reactExports.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SheetPortal, { children: [
  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SheetOverlay, {}, void 0, false, {
    fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/sheet.tsx",
    lineNumber: 62,
    columnNumber: 5
  }, void 0),
  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Content, { ref, className: cn(sheetVariants({ side }), className), ...props, children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(X, { className: "h-4 w-4" }, void 0, false, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/sheet.tsx",
        lineNumber: 65,
        columnNumber: 9
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "sr-only", children: "Close" }, void 0, false, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/sheet.tsx",
        lineNumber: 66,
        columnNumber: 9
      }, void 0)
    ] }, void 0, true, {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/sheet.tsx",
      lineNumber: 64,
      columnNumber: 7
    }, void 0),
    children
  ] }, void 0, true, {
    fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/sheet.tsx",
    lineNumber: 63,
    columnNumber: 5
  }, void 0)
] }, void 0, true, {
  fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/sheet.tsx",
  lineNumber: 61,
  columnNumber: 3
}, void 0));
SheetContent.displayName = Content.displayName;
const SheetHeader = ({ className, ...props }) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: cn("flex flex-col space-y-2 text-center sm:text-left", className), ...props }, void 0, false, {
  fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/sheet.tsx",
  lineNumber: 75,
  columnNumber: 3
}, void 0);
SheetHeader.displayName = "SheetHeader";
const SheetTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
  Title,
  {
    ref,
    className: cn("text-lg font-semibold text-foreground", className),
    ...props
  },
  void 0,
  false,
  {
    fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/sheet.tsx",
    lineNumber: 91,
    columnNumber: 3
  },
  void 0
));
SheetTitle.displayName = Title.displayName;
const SheetDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
  Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  },
  void 0,
  false,
  {
    fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/sheet.tsx",
    lineNumber: 103,
    columnNumber: 3
  },
  void 0
));
SheetDescription.displayName = Description.displayName;
function Skeleton({ className, ...props }) {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: cn("animate-pulse rounded-md bg-primary/10", className), ...props }, void 0, false, {
    fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/skeleton.tsx",
    lineNumber: 4,
    columnNumber: 10
  }, this);
}
const TooltipProvider = Provider;
const Tooltip = Root3;
const TooltipTrigger = Trigger;
const TooltipContent = reactExports.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Portal$1, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
  Content2,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-tooltip-content-transform-origin)",
      className
    ),
    ...props
  },
  void 0,
  false,
  {
    fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/tooltip.tsx",
    lineNumber: 19,
    columnNumber: 5
  },
  void 0
) }, void 0, false, {
  fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/tooltip.tsx",
  lineNumber: 18,
  columnNumber: 3
}, void 0));
TooltipContent.displayName = Content2.displayName;
const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";
const SidebarContext = reactExports.createContext(null);
function useSidebar() {
  const context = reactExports.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return context;
}
const SidebarProvider = reactExports.forwardRef(
  ({
    defaultOpen = true,
    open: openProp,
    onOpenChange: setOpenProp,
    className,
    style,
    children,
    ...props
  }, ref) => {
    const isMobile = useIsMobile();
    const [openMobile, setOpenMobile] = reactExports.useState(false);
    const [_open, _setOpen] = reactExports.useState(defaultOpen);
    const open = openProp ?? _open;
    const setOpen = reactExports.useCallback(
      (value) => {
        const openState = typeof value === "function" ? value(open) : value;
        if (setOpenProp) {
          setOpenProp(openState);
        } else {
          _setOpen(openState);
        }
        document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
      },
      [setOpenProp, open]
    );
    const toggleSidebar = reactExports.useCallback(() => {
      return isMobile ? setOpenMobile((open2) => !open2) : setOpen((open2) => !open2);
    }, [isMobile, setOpen, setOpenMobile]);
    reactExports.useEffect(() => {
      const handleKeyDown = (event) => {
        if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
          event.preventDefault();
          toggleSidebar();
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [toggleSidebar]);
    const state = open ? "expanded" : "collapsed";
    const contextValue = reactExports.useMemo(
      () => ({
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar
      }),
      [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
    );
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SidebarContext.Provider, { value: contextValue, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TooltipProvider, { delayDuration: 0, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "div",
      {
        style: {
          "--sidebar-width": SIDEBAR_WIDTH,
          "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
          ...style
        },
        className: cn(
          "group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar",
          className
        ),
        ref,
        ...props,
        children
      },
      void 0,
      false,
      {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/sidebar.tsx",
        lineNumber: 129,
        columnNumber: 11
      },
      void 0
    ) }, void 0, false, {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/sidebar.tsx",
      lineNumber: 128,
      columnNumber: 9
    }, void 0) }, void 0, false, {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/sidebar.tsx",
      lineNumber: 127,
      columnNumber: 7
    }, void 0);
  }
);
SidebarProvider.displayName = "SidebarProvider";
const Sidebar = reactExports.forwardRef(
  ({
    side = "left",
    variant = "sidebar",
    collapsible = "offcanvas",
    className,
    children,
    ...props
  }, ref) => {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar();
    if (collapsible === "none") {
      return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "div",
        {
          className: cn(
            "flex h-full w-(--sidebar-width) flex-col bg-sidebar text-sidebar-foreground",
            className
          ),
          ref,
          ...props,
          children
        },
        void 0,
        false,
        {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/sidebar.tsx",
          lineNumber: 176,
          columnNumber: 9
        },
        void 0
      );
    }
    if (isMobile) {
      return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Sheet, { open: openMobile, onOpenChange: setOpenMobile, ...props, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        SheetContent,
        {
          "data-sidebar": "sidebar",
          "data-mobile": "true",
          className: "w-(--sidebar-width) bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden",
          style: {
            "--sidebar-width": SIDEBAR_WIDTH_MOBILE
          },
          side,
          children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SheetHeader, { className: "sr-only", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SheetTitle, { children: "Sidebar" }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/sidebar.tsx",
                lineNumber: 204,
                columnNumber: 15
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SheetDescription, { children: "Displays the mobile sidebar." }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/sidebar.tsx",
                lineNumber: 205,
                columnNumber: 15
              }, void 0)
            ] }, void 0, true, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/sidebar.tsx",
              lineNumber: 203,
              columnNumber: 13
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex h-full w-full flex-col", children }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/sidebar.tsx",
              lineNumber: 207,
              columnNumber: 13
            }, void 0)
          ]
        },
        void 0,
        true,
        {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/sidebar.tsx",
          lineNumber: 192,
          columnNumber: 11
        },
        void 0
      ) }, void 0, false, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/sidebar.tsx",
        lineNumber: 191,
        columnNumber: 9
      }, void 0);
    }
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "div",
      {
        ref,
        className: "group peer hidden text-sidebar-foreground md:block",
        "data-state": state,
        "data-collapsible": state === "collapsed" ? collapsible : "",
        "data-variant": variant,
        "data-side": side,
        children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "div",
            {
              className: cn(
                "relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
                "group-data-[collapsible=offcanvas]:w-0",
                "group-data-[side=right]:rotate-180",
                variant === "floating" || variant === "inset" ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)"
              )
            },
            void 0,
            false,
            {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/sidebar.tsx",
              lineNumber: 223,
              columnNumber: 9
            },
            void 0
          ),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "div",
            {
              className: cn(
                "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
                side === "left" ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]" : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
                // Adjust the padding for floating and inset variants.
                variant === "floating" || variant === "inset" ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
                className
              ),
              ...props,
              children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "div",
                {
                  "data-sidebar": "sidebar",
                  className: "flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow",
                  children
                },
                void 0,
                false,
                {
                  fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/sidebar.tsx",
                  lineNumber: 247,
                  columnNumber: 11
                },
                void 0
              )
            },
            void 0,
            false,
            {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/sidebar.tsx",
              lineNumber: 233,
              columnNumber: 9
            },
            void 0
          )
        ]
      },
      void 0,
      true,
      {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/sidebar.tsx",
        lineNumber: 214,
        columnNumber: 7
      },
      void 0
    );
  }
);
Sidebar.displayName = "Sidebar";
const SidebarTrigger = reactExports.forwardRef(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar } = useSidebar();
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    Button,
    {
      ref,
      "data-sidebar": "trigger",
      variant: "ghost",
      size: "icon",
      className: cn("h-7 w-7", className),
      onClick: (event) => {
        onClick?.(event);
        toggleSidebar();
      },
      ...props,
      children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(PanelLeft, {}, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/sidebar.tsx",
          lineNumber: 279,
          columnNumber: 7
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "sr-only", children: "Toggle Sidebar" }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/sidebar.tsx",
          lineNumber: 280,
          columnNumber: 7
        }, void 0)
      ]
    },
    void 0,
    true,
    {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/sidebar.tsx",
      lineNumber: 267,
      columnNumber: 5
    },
    void 0
  );
});
SidebarTrigger.displayName = "SidebarTrigger";
const SidebarRail = reactExports.forwardRef(
  ({ className, ...props }, ref) => {
    const { toggleSidebar } = useSidebar();
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "button",
      {
        ref,
        "data-sidebar": "rail",
        "aria-label": "Toggle Sidebar",
        tabIndex: -1,
        onClick: toggleSidebar,
        title: "Toggle Sidebar",
        className: cn(
          "absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex",
          "[[data-side=left]_&]:cursor-w-resize [[data-side=right]_&]:cursor-e-resize",
          "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
          "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full group-data-[collapsible=offcanvas]:hover:bg-sidebar",
          "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
          "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
          className
        ),
        ...props
      },
      void 0,
      false,
      {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/sidebar.tsx",
        lineNumber: 291,
        columnNumber: 7
      },
      void 0
    );
  }
);
SidebarRail.displayName = "SidebarRail";
const SidebarInset = reactExports.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "main",
      {
        ref,
        className: cn(
          "relative flex w-full flex-1 flex-col bg-background",
          "md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow",
          className
        ),
        ...props
      },
      void 0,
      false,
      {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/sidebar.tsx",
        lineNumber: 317,
        columnNumber: 7
      },
      void 0
    );
  }
);
SidebarInset.displayName = "SidebarInset";
const SidebarInput = reactExports.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    Input,
    {
      ref,
      "data-sidebar": "input",
      className: cn(
        "h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
        className
      ),
      ...props
    },
    void 0,
    false,
    {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/sidebar.tsx",
      lineNumber: 336,
      columnNumber: 5
    },
    void 0
  );
});
SidebarInput.displayName = "SidebarInput";
const SidebarHeader = reactExports.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "div",
      {
        ref,
        "data-sidebar": "header",
        className: cn("flex flex-col gap-2 p-2", className),
        ...props
      },
      void 0,
      false,
      {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/sidebar.tsx",
        lineNumber: 352,
        columnNumber: 7
      },
      void 0
    );
  }
);
SidebarHeader.displayName = "SidebarHeader";
const SidebarFooter = reactExports.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "div",
      {
        ref,
        "data-sidebar": "footer",
        className: cn("flex flex-col gap-2 p-2", className),
        ...props
      },
      void 0,
      false,
      {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/sidebar.tsx",
        lineNumber: 366,
        columnNumber: 7
      },
      void 0
    );
  }
);
SidebarFooter.displayName = "SidebarFooter";
const SidebarSeparator = reactExports.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    Separator,
    {
      ref,
      "data-sidebar": "separator",
      className: cn("mx-2 w-auto bg-sidebar-border", className),
      ...props
    },
    void 0,
    false,
    {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/sidebar.tsx",
      lineNumber: 382,
      columnNumber: 5
    },
    void 0
  );
});
SidebarSeparator.displayName = "SidebarSeparator";
const SidebarContent = reactExports.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "div",
      {
        ref,
        "data-sidebar": "content",
        className: cn(
          "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
          className
        ),
        ...props
      },
      void 0,
      false,
      {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/sidebar.tsx",
        lineNumber: 395,
        columnNumber: 7
      },
      void 0
    );
  }
);
SidebarContent.displayName = "SidebarContent";
const SidebarGroup = reactExports.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "div",
      {
        ref,
        "data-sidebar": "group",
        className: cn("relative flex w-full min-w-0 flex-col p-2", className),
        ...props
      },
      void 0,
      false,
      {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/sidebar.tsx",
        lineNumber: 412,
        columnNumber: 7
      },
      void 0
    );
  }
);
SidebarGroup.displayName = "SidebarGroup";
const SidebarGroupLabel = reactExports.forwardRef(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "div";
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    Comp,
    {
      ref,
      "data-sidebar": "group-label",
      className: cn(
        "flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
        className
      ),
      ...props
    },
    void 0,
    false,
    {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/sidebar.tsx",
      lineNumber: 430,
      columnNumber: 5
    },
    void 0
  );
});
SidebarGroupLabel.displayName = "SidebarGroupLabel";
const SidebarGroupAction = reactExports.forwardRef(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    Comp,
    {
      ref,
      "data-sidebar": "group-action",
      className: cn(
        "absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring cursor-pointer transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 after:md:hidden",
        "group-data-[collapsible=icon]:hidden",
        className
      ),
      ...props
    },
    void 0,
    false,
    {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/sidebar.tsx",
      lineNumber: 451,
      columnNumber: 5
    },
    void 0
  );
});
SidebarGroupAction.displayName = "SidebarGroupAction";
const SidebarGroupContent = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "div",
    {
      ref,
      "data-sidebar": "group-content",
      className: cn("w-full text-sm", className),
      ...props
    },
    void 0,
    false,
    {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/sidebar.tsx",
      lineNumber: 469,
      columnNumber: 5
    },
    void 0
  )
);
SidebarGroupContent.displayName = "SidebarGroupContent";
const SidebarMenu = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "ul",
    {
      ref,
      "data-sidebar": "menu",
      className: cn("flex w-full min-w-0 flex-col gap-1", className),
      ...props
    },
    void 0,
    false,
    {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/sidebar.tsx",
      lineNumber: 481,
      columnNumber: 5
    },
    void 0
  )
);
SidebarMenu.displayName = "SidebarMenu";
const SidebarMenuItem = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "li",
    {
      ref,
      "data-sidebar": "menu-item",
      className: cn("group/menu-item relative", className),
      ...props
    },
    void 0,
    false,
    {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/sidebar.tsx",
      lineNumber: 493,
      columnNumber: 5
    },
    void 0
  )
);
SidebarMenuItem.displayName = "SidebarMenuItem";
const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring cursor-pointer transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline: "bg-background shadow-[0_0_0_1px_var(--sidebar-border)] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_var(--sidebar-accent)]"
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:!p-0"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const SidebarMenuButton = reactExports.forwardRef(
  ({
    asChild = false,
    isActive = false,
    variant = "default",
    size = "default",
    tooltip,
    className,
    ...props
  }, ref) => {
    const Comp = asChild ? Slot : "button";
    const { isMobile, state } = useSidebar();
    const button = /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      Comp,
      {
        ref,
        "data-sidebar": "menu-button",
        "data-size": size,
        "data-active": isActive,
        className: cn(sidebarMenuButtonVariants({ variant, size }), className),
        ...props
      },
      void 0,
      false,
      {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/sidebar.tsx",
        lineNumber: 549,
        columnNumber: 7
      },
      void 0
    );
    if (!tooltip) {
      return button;
    }
    if (typeof tooltip === "string") {
      tooltip = {
        children: tooltip
      };
    }
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Tooltip, { children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TooltipTrigger, { asChild: true, children: button }, void 0, false, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/sidebar.tsx",
        lineNumber: 571,
        columnNumber: 9
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        TooltipContent,
        {
          side: "right",
          align: "center",
          hidden: state !== "collapsed" || isMobile,
          ...tooltip
        },
        void 0,
        false,
        {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/sidebar.tsx",
          lineNumber: 572,
          columnNumber: 9
        },
        void 0
      )
    ] }, void 0, true, {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/sidebar.tsx",
      lineNumber: 570,
      columnNumber: 7
    }, void 0);
  }
);
SidebarMenuButton.displayName = "SidebarMenuButton";
const SidebarMenuAction = reactExports.forwardRef(({ className, asChild = false, showOnHover = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    Comp,
    {
      ref,
      "data-sidebar": "menu-action",
      className: cn(
        "absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring cursor-pointer transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 after:md:hidden",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        showOnHover && "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0",
        className
      ),
      ...props
    },
    void 0,
    false,
    {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/sidebar.tsx",
      lineNumber: 594,
      columnNumber: 5
    },
    void 0
  );
});
SidebarMenuAction.displayName = "SidebarMenuAction";
const SidebarMenuBadge = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "div",
    {
      ref,
      "data-sidebar": "menu-badge",
      className: cn(
        "pointer-events-none absolute right-1 flex h-5 min-w-5 select-none items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-sidebar-foreground",
        "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        className
      ),
      ...props
    },
    void 0,
    false,
    {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/sidebar.tsx",
      lineNumber: 617,
      columnNumber: 5
    },
    void 0
  )
);
SidebarMenuBadge.displayName = "SidebarMenuBadge";
const SidebarMenuSkeleton = reactExports.forwardRef(({ className, showIcon = false, ...props }, ref) => {
  const width = reactExports.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  }, []);
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "div",
    {
      ref,
      "data-sidebar": "menu-skeleton",
      className: cn("flex h-8 items-center gap-2 rounded-md px-2", className),
      ...props,
      children: [
        showIcon && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Skeleton, { className: "size-4 rounded-md", "data-sidebar": "menu-skeleton-icon" }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/sidebar.tsx",
          lineNumber: 653,
          columnNumber: 20
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          Skeleton,
          {
            className: "h-4 max-w-(--skeleton-width) flex-1",
            "data-sidebar": "menu-skeleton-text",
            style: {
              "--skeleton-width": width
            }
          },
          void 0,
          false,
          {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/sidebar.tsx",
            lineNumber: 654,
            columnNumber: 7
          },
          void 0
        )
      ]
    },
    void 0,
    true,
    {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/sidebar.tsx",
      lineNumber: 647,
      columnNumber: 5
    },
    void 0
  );
});
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton";
const SidebarMenuSub = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "ul",
    {
      ref,
      "data-sidebar": "menu-sub",
      className: cn(
        "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5",
        "group-data-[collapsible=icon]:hidden",
        className
      ),
      ...props
    },
    void 0,
    false,
    {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/sidebar.tsx",
      lineNumber: 670,
      columnNumber: 5
    },
    void 0
  )
);
SidebarMenuSub.displayName = "SidebarMenuSub";
const SidebarMenuSubItem = reactExports.forwardRef(
  ({ ...props }, ref) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { ref, ...props }, void 0, false, {
    fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/sidebar.tsx",
    lineNumber: 685,
    columnNumber: 26
  }, void 0)
);
SidebarMenuSubItem.displayName = "SidebarMenuSubItem";
const SidebarMenuSubButton = reactExports.forwardRef(({ asChild = false, size = "md", isActive, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a";
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    Comp,
    {
      ref,
      "data-sidebar": "menu-sub-button",
      "data-size": size,
      "data-active": isActive,
      className: cn(
        "flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring cursor-pointer hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground",
        "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
        size === "sm" && "text-xs",
        size === "md" && "text-sm",
        "group-data-[collapsible=icon]:hidden",
        className
      ),
      ...props
    },
    void 0,
    false,
    {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/sidebar.tsx",
      lineNumber: 700,
      columnNumber: 5
    },
    void 0
  );
});
SidebarMenuSubButton.displayName = "SidebarMenuSubButton";
const mainItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Manajemen Santri", url: "/santri", icon: Users },
  { title: "Input Nilai", url: "/nilai", icon: ClipboardList },
  { title: "Rapor / Cetak PDF", url: "/rapor", icon: FileText },
  { title: "Profil Pengguna", url: "/profil", icon: Users }
];
const adminItems = [
  { title: "Tahun Ajaran", url: "/admin/tahun-ajaran", icon: Calendar },
  { title: "Kelas & Rombel", url: "/admin/kelas", icon: GraduationCap },
  { title: "Mata Pelajaran", url: "/admin/mapel", icon: BookOpen },
  { title: "Pengguna", url: "/admin/pengguna", icon: Users }
];
function AppSidebar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { isAdmin } = useAuth();
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Sidebar, { collapsible: "icon", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SidebarHeader, { className: "border-b", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-2 px-2 py-3", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex h-9 w-9 items-center justify-center rounded-md bg-emerald-600 text-white shadow-sm", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(GraduationCap, { className: "h-5 w-5" }, void 0, false, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/app-sidebar.tsx",
        lineNumber: 32,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/app-sidebar.tsx",
        lineNumber: 31,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col group-data-[collapsible=icon]:hidden", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-sm font-semibold leading-tight", children: "SIRA" }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/app-sidebar.tsx",
          lineNumber: 35,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-xs text-muted-foreground", children: "Rapor Santri" }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/app-sidebar.tsx",
          lineNumber: 36,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/app-sidebar.tsx",
        lineNumber: 34,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/app-sidebar.tsx",
      lineNumber: 30,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/app-sidebar.tsx",
      lineNumber: 29,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SidebarContent, { children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SidebarGroup, { children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SidebarGroupLabel, { children: "Menu Utama" }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/app-sidebar.tsx",
          lineNumber: 42,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SidebarGroupContent, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SidebarMenu, { children: mainItems.map((item) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SidebarMenuItem, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          SidebarMenuButton,
          {
            asChild: true,
            isActive: path === item.url || item.url !== "/" && path.startsWith(item.url),
            tooltip: item.title,
            children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Link, { to: item.url, children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(item.icon, { className: "h-4 w-4" }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/app-sidebar.tsx",
                lineNumber: 53,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: item.title }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/app-sidebar.tsx",
                lineNumber: 54,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/app-sidebar.tsx",
              lineNumber: 52,
              columnNumber: 21
            }, this)
          },
          void 0,
          false,
          {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/app-sidebar.tsx",
            lineNumber: 47,
            columnNumber: 19
          },
          this
        ) }, item.title, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/app-sidebar.tsx",
          lineNumber: 46,
          columnNumber: 17
        }, this)) }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/app-sidebar.tsx",
          lineNumber: 44,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/app-sidebar.tsx",
          lineNumber: 43,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/app-sidebar.tsx",
        lineNumber: 41,
        columnNumber: 9
      }, this),
      isAdmin && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SidebarGroup, { children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SidebarGroupLabel, { children: "Administrasi" }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/app-sidebar.tsx",
          lineNumber: 65,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SidebarGroupContent, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SidebarMenu, { children: adminItems.map((item) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SidebarMenuItem, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          SidebarMenuButton,
          {
            asChild: true,
            isActive: path.startsWith(item.url),
            tooltip: item.title,
            children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Link, { to: item.url, children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(item.icon, { className: "h-4 w-4" }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/app-sidebar.tsx",
                lineNumber: 76,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: item.title }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/app-sidebar.tsx",
                lineNumber: 77,
                columnNumber: 25
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/app-sidebar.tsx",
              lineNumber: 75,
              columnNumber: 23
            }, this)
          },
          void 0,
          false,
          {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/app-sidebar.tsx",
            lineNumber: 70,
            columnNumber: 21
          },
          this
        ) }, item.title, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/app-sidebar.tsx",
          lineNumber: 69,
          columnNumber: 19
        }, this)) }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/app-sidebar.tsx",
          lineNumber: 67,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/app-sidebar.tsx",
          lineNumber: 66,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/app-sidebar.tsx",
        lineNumber: 64,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/app-sidebar.tsx",
      lineNumber: 40,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/app-sidebar.tsx",
    lineNumber: 28,
    columnNumber: 5
  }, this);
}
const titles = {
  "/dashboard": "Dashboard",
  "/santri": "Manajemen Santri",
  "/nilai": "Input Nilai",
  "/rapor": "Preview Rapor",
  "/profil": "Profil & Pengaturan",
  "/admin": "Panel Admin",
  "/admin/tahun-ajaran": "Tahun Ajaran",
  "/admin/kelas": "Manajemen Kelas",
  "/admin/mapel": "Mata Pelajaran",
  "/admin/pengguna": "Pengguna"
};
function AppLayout() {
  const path = useRouterState({
    select: (s) => s.location.pathname
  });
  const navigate = useNavigate();
  const {
    isLoggedIn,
    user,
    logout
  } = useAuth();
  reactExports.useEffect(() => {
    if (!isLoggedIn) {
      navigate({
        to: "/"
      });
    }
  }, [isLoggedIn, navigate]);
  if (!isLoggedIn) return null;
  function handleLogout() {
    logout();
    toast.success("Berhasil keluar");
    navigate({
      to: "/"
    });
  }
  const title = Object.entries(titles).find(([k]) => path.startsWith(k))?.[1] ?? "SIRA";
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SidebarProvider, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "min-h-screen flex w-full bg-background", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(AppSidebar, {}, void 0, false, {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.tsx?tsr-split=component",
      lineNumber: 49,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SidebarInset, { children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("header", { className: "h-14 flex items-center gap-3 border-b bg-card px-4 sticky top-0 z-10", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SidebarTrigger, {}, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.tsx?tsr-split=component",
          lineNumber: 52,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "h-5 w-px bg-border" }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.tsx?tsr-split=component",
          lineNumber: 53,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h1", { className: "text-sm font-semibold", children: title }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.tsx?tsr-split=component",
          lineNumber: 54,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "ml-auto flex items-center gap-3", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(User, { className: "h-3.5 w-3.5" }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.tsx?tsr-split=component",
              lineNumber: 57,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "hidden sm:inline", children: user?.name }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.tsx?tsr-split=component",
              lineNumber: 58,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium capitalize", children: user?.role?.replace("_", " ") }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.tsx?tsr-split=component",
              lineNumber: 59,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.tsx?tsr-split=component",
            lineNumber: 56,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { variant: "ghost", size: "sm", onClick: handleLogout, className: "text-xs", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(LogOut, { className: "h-3.5 w-3.5 mr-1.5" }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.tsx?tsr-split=component",
              lineNumber: 62,
              columnNumber: 17
            }, this),
            "Keluar"
          ] }, void 0, true, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.tsx?tsr-split=component",
            lineNumber: 61,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.tsx?tsr-split=component",
          lineNumber: 55,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.tsx?tsr-split=component",
        lineNumber: 51,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("main", { className: "flex-1 p-6", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Outlet, {}, void 0, false, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.tsx?tsr-split=component",
        lineNumber: 68,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.tsx?tsr-split=component",
        lineNumber: 67,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.tsx?tsr-split=component",
      lineNumber: 50,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.tsx?tsr-split=component",
    lineNumber: 48,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.tsx?tsr-split=component",
    lineNumber: 47,
    columnNumber: 10
  }, this);
}
export {
  AppLayout as component
};
