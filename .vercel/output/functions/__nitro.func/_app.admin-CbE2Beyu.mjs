import { j as jsxRuntimeExports } from "./_libs/react.mjs";
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
import "crypto";
import "async_hooks";
import "stream";
import "./_libs/isbot.mjs";
function AdminLayout() {
  const {
    isAdmin
  } = useAuth();
  if (!isAdmin) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-32 text-muted-foreground", children: "Akses ditolak. Halaman ini hanya untuk admin." });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {});
}
export {
  AdminLayout as component
};
