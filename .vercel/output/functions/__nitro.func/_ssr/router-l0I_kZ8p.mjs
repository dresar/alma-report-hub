import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { b as createRouter, a as createRootRouteWithContext, d as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, c as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { J as redirect } from "../_libs/tanstack__router-core.mjs";
import { r as reactExports, j as jsxDevRuntimeExports } from "../_libs/react.mjs";
import { T as Toaster$1 } from "../_libs/sonner.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "crypto";
import "stream";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
const appCss = "/assets/styles-CG6_4vVz.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    },
    void 0,
    false,
    {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/sonner.tsx",
      lineNumber: 7,
      columnNumber: 5
    },
    void 0
  );
};
function NotFoundComponent() {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h1", { className: "text-7xl font-bold text-foreground", children: "404" }, void 0, false, {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/__root.tsx",
      lineNumber: 20,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }, void 0, false, {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/__root.tsx",
      lineNumber: 21,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }, void 0, false, {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/__root.tsx",
      lineNumber: 22,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-6", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      },
      void 0,
      false,
      {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/__root.tsx",
        lineNumber: 26,
        columnNumber: 11
      },
      this
    ) }, void 0, false, {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/__root.tsx",
      lineNumber: 25,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/__root.tsx",
    lineNumber: 19,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/__root.tsx",
    lineNumber: 18,
    columnNumber: 5
  }, this);
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }, void 0, false, {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/__root.tsx",
      lineNumber: 48,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }, void 0, false, {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/__root.tsx",
      lineNumber: 51,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        },
        void 0,
        false,
        {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/__root.tsx",
          lineNumber: 55,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        },
        void 0,
        false,
        {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/__root.tsx",
          lineNumber: 64,
          columnNumber: 11
        },
        this
      )
    ] }, void 0, true, {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/__root.tsx",
      lineNumber: 54,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/__root.tsx",
    lineNumber: 47,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/__root.tsx",
    lineNumber: 46,
    columnNumber: 5
  }, this);
}
const Route$e = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Lovable App" },
      { name: "description", content: "SIRA Report Builder is a web application for generating and managing student academic reports." },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "Lovable App" },
      { property: "og:description", content: "SIRA Report Builder is a web application for generating and managing student academic reports." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "Lovable App" },
      { name: "twitter:description", content: "SIRA Report Builder is a web application for generating and managing student academic reports." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/6c170c78-0ebe-4fec-8cbd-3933e29d19f0/id-preview-4e8ae7bb--de4cc0f1-9e4b-4b35-bfa7-6ca1ced80367.lovable.app-1780121556598.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/6c170c78-0ebe-4fec-8cbd-3933e29d19f0/id-preview-4e8ae7bb--de4cc0f1-9e4b-4b35-bfa7-6ca1ced80367.lovable.app-1780121556598.png" }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("html", { lang: "en", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("head", { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(HeadContent, {}, void 0, false, {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/__root.tsx",
      lineNumber: 111,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/__root.tsx",
      lineNumber: 110,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("body", { children: [
      children,
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Scripts, {}, void 0, false, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/__root.tsx",
        lineNumber: 115,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/__root.tsx",
      lineNumber: 113,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/__root.tsx",
    lineNumber: 109,
    columnNumber: 5
  }, this);
}
function RootComponent() {
  const { queryClient } = Route$e.useRouteContext();
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(QueryClientProvider, { client: queryClient, children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Outlet, {}, void 0, false, {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/__root.tsx",
      lineNumber: 126,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Toaster, {}, void 0, false, {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/__root.tsx",
      lineNumber: 127,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/__root.tsx",
    lineNumber: 125,
    columnNumber: 5
  }, this);
}
const $$splitComponentImporter$c = () => import("./rapor-D29XHj_z.mjs");
const Route$d = createFileRoute("/rapor")({
  validateSearch: (s) => ({
    studentId: s.studentId,
    yearId: s.yearId
  }),
  head: () => ({
    meta: [{
      title: "Preview Rapor — SIRA"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("../_app-Cz5Y8q7t.mjs");
const Route$c = createFileRoute("/_app")({
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./index-DgxB4dH4.mjs");
const Route$b = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "Login — SIRA"
    }, {
      name: "description",
      content: "Sistem Informasi Rapor Santri (SIRA) — Login"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("../_app.santri-ScqQXipr.mjs");
const Route$a = createFileRoute("/_app/santri")({
  head: () => ({
    meta: [{
      title: "Manajemen Santri — SIRA"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("../_app.profil-uTeY9VyG.mjs");
const Route$9 = createFileRoute("/_app/profil")({
  head: () => ({
    meta: [{
      title: "Profil & Pengaturan — SIRA"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("../_app.dashboard-BiEJbJAM.mjs");
const Route$8 = createFileRoute("/_app/dashboard")({
  head: () => ({
    meta: [{
      title: "Dashboard — SIRA"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("../_app.admin-BXI-4QDS.mjs");
const Route$7 = createFileRoute("/_app/admin")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("../_app.nilai.index-CaSl13eB.mjs");
const Route$6 = createFileRoute("/_app/nilai/")({
  head: () => ({
    meta: [{
      title: "Daftar Nilai Santri — SIRA"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const Route$5 = createFileRoute("/_app/admin/")({
  beforeLoad: () => {
    throw redirect({ to: "/admin/tahun-ajaran" });
  }
});
const $$splitComponentImporter$4 = () => import("../_app.nilai._studentId-BebnL0nj.mjs");
const Route$4 = createFileRoute("/_app/nilai/$studentId")({
  validateSearch: (search) => {
    return {
      yearId: search.yearId || "",
      rombelId: search.rombelId || ""
    };
  },
  head: () => ({
    meta: [{
      title: "Input Nilai Santri — SIRA"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("../_app.admin.tahun-ajaran-BKUwLBCO.mjs");
const Route$3 = createFileRoute("/_app/admin/tahun-ajaran")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("../_app.admin.pengguna-DE0Uh87g.mjs");
const Route$2 = createFileRoute("/_app/admin/pengguna")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("../_app.admin.mapel-BUy2mUSe.mjs");
const Route$1 = createFileRoute("/_app/admin/mapel")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("../_app.admin.kelas-CVgfaLFQ.mjs");
const Route = createFileRoute("/_app/admin/kelas")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const RaporRoute = Route$d.update({
  id: "/rapor",
  path: "/rapor",
  getParentRoute: () => Route$e
});
const AppRoute = Route$c.update({
  id: "/_app",
  getParentRoute: () => Route$e
});
const IndexRoute = Route$b.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$e
});
const AppSantriRoute = Route$a.update({
  id: "/santri",
  path: "/santri",
  getParentRoute: () => AppRoute
});
const AppProfilRoute = Route$9.update({
  id: "/profil",
  path: "/profil",
  getParentRoute: () => AppRoute
});
const AppDashboardRoute = Route$8.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => AppRoute
});
const AppAdminRoute = Route$7.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => AppRoute
});
const AppNilaiIndexRoute = Route$6.update({
  id: "/nilai/",
  path: "/nilai/",
  getParentRoute: () => AppRoute
});
const AppAdminIndexRoute = Route$5.update({
  id: "/",
  path: "/",
  getParentRoute: () => AppAdminRoute
});
const AppNilaiStudentIdRoute = Route$4.update({
  id: "/nilai/$studentId",
  path: "/nilai/$studentId",
  getParentRoute: () => AppRoute
});
const AppAdminTahunAjaranRoute = Route$3.update({
  id: "/tahun-ajaran",
  path: "/tahun-ajaran",
  getParentRoute: () => AppAdminRoute
});
const AppAdminPenggunaRoute = Route$2.update({
  id: "/pengguna",
  path: "/pengguna",
  getParentRoute: () => AppAdminRoute
});
const AppAdminMapelRoute = Route$1.update({
  id: "/mapel",
  path: "/mapel",
  getParentRoute: () => AppAdminRoute
});
const AppAdminKelasRoute = Route.update({
  id: "/kelas",
  path: "/kelas",
  getParentRoute: () => AppAdminRoute
});
const AppAdminRouteChildren = {
  AppAdminKelasRoute,
  AppAdminMapelRoute,
  AppAdminPenggunaRoute,
  AppAdminTahunAjaranRoute,
  AppAdminIndexRoute
};
const AppAdminRouteWithChildren = AppAdminRoute._addFileChildren(
  AppAdminRouteChildren
);
const AppRouteChildren = {
  AppAdminRoute: AppAdminRouteWithChildren,
  AppDashboardRoute,
  AppProfilRoute,
  AppSantriRoute,
  AppNilaiStudentIdRoute,
  AppNilaiIndexRoute
};
const AppRouteWithChildren = AppRoute._addFileChildren(AppRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AppRoute: AppRouteWithChildren,
  RaporRoute
};
const routeTree = Route$e._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$4 as R,
  router as r
};
