import { j as jsxDevRuntimeExports } from "./_libs/react.mjs";
import { O as Outlet } from "./_libs/tanstack__react-router.mjs";
import { u as useAuth } from "./_ssr/use-auth-YByzSFug.mjs";
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
function AdminLayout() {
  const {
    isAdmin
  } = useAuth();
  if (!isAdmin) {
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-center py-32 text-muted-foreground", children: "Akses ditolak. Halaman ini hanya untuk admin." }, void 0, false, {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.tsx?tsr-split=component",
      lineNumber: 8,
      columnNumber: 12
    }, this);
  }
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Outlet, {}, void 0, false, {
    fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.tsx?tsr-split=component",
    lineNumber: 12,
    columnNumber: 10
  }, this);
}
export {
  AdminLayout as component
};
