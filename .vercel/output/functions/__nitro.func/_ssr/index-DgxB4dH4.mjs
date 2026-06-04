import { r as reactExports, j as jsxDevRuntimeExports } from "../_libs/react.mjs";
import { u as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { C as Card, c as CardHeader, d as CardTitle, b as CardDescription, a as CardContent } from "./card-BhYvH4ns.mjs";
import { B as Button } from "./button-CM0KjKCo.mjs";
import { I as Input } from "./input-Dxdu6HuB.mjs";
import { L as Label } from "./label-B5xHsmXM.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { l as loginFn } from "./auth-B4fflKSl.mjs";
import { a as authStore } from "./use-auth-YByzSFug.mjs";
import "../_libs/seroval.mjs";
import { G as GraduationCap, g as EyeOff, E as Eye, l as LogIn } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "crypto";
import "stream";
import "../_libs/isbot.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "./createSsrRpc-_V2Ptgae.mjs";
import "./server-B2xBzUrm.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
const DEV_CREDS = {
  email: "admin@sira.sch.id",
  password: "admin123"
};
function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [showPwd, setShowPwd] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Email dan password wajib diisi");
      return;
    }
    setLoading(true);
    try {
      const result = await loginFn({
        data: {
          email,
          password
        }
      });
      authStore.login(result.token, result.user);
      toast.success(`Selamat datang, ${result.user.name}!`);
      await navigate({
        to: "/dashboard"
      });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Login gagal");
    } finally {
      setLoading(false);
    }
  }
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 p-4", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "pointer-events-none absolute inset-0 overflow-hidden", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute -top-40 -left-40 h-96 w-96 rounded-full bg-emerald-600/20 blur-3xl" }, void 0, false, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/index.tsx?tsr-split=component",
        lineNumber: 51,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-teal-600/15 blur-3xl" }, void 0, false, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/index.tsx?tsr-split=component",
        lineNumber: 52,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/index.tsx?tsr-split=component",
      lineNumber: 50,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "relative w-full max-w-md", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-8 text-center", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500 shadow-lg shadow-emerald-500/30", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(GraduationCap, { className: "h-8 w-8 text-white" }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/index.tsx?tsr-split=component",
          lineNumber: 59,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/index.tsx?tsr-split=component",
          lineNumber: 58,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h1", { className: "text-2xl font-bold text-white", children: "SIRA" }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/index.tsx?tsr-split=component",
          lineNumber: 61,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mt-1 text-sm text-slate-400", children: "Sistem Informasi Rapor Santri" }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/index.tsx?tsr-split=component",
          lineNumber: 62,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xs text-slate-500", children: "Raudhatusalam Islamic Boarding School" }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/index.tsx?tsr-split=component",
          lineNumber: 63,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/index.tsx?tsr-split=component",
        lineNumber: 57,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Card, { className: "border-slate-800 bg-slate-900/80 backdrop-blur-sm shadow-2xl", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardHeader, { className: "pb-4", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardTitle, { className: "text-lg text-white", children: "Masuk ke Akun" }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/index.tsx?tsr-split=component",
            lineNumber: 68,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardDescription, { className: "text-slate-400", children: "Masukkan kredensial Anda untuk mengakses sistem" }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/index.tsx?tsr-split=component",
            lineNumber: 69,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/index.tsx?tsr-split=component",
          lineNumber: 67,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardContent, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Label, { htmlFor: "email", className: "text-slate-300 text-sm", children: "Email" }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/index.tsx?tsr-split=component",
              lineNumber: 76,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Input, { id: "email", type: "email", placeholder: "admin@sira.sch.id", value: email, onChange: (e) => setEmail(e.target.value), className: "border-slate-700 bg-slate-800 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:ring-emerald-500/20", autoComplete: "email" }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/index.tsx?tsr-split=component",
              lineNumber: 77,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/index.tsx?tsr-split=component",
            lineNumber: 75,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Label, { htmlFor: "password", className: "text-slate-300 text-sm", children: "Password" }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/index.tsx?tsr-split=component",
              lineNumber: 81,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "relative", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Input, { id: "password", type: showPwd ? "text" : "password", placeholder: "••••••••", value: password, onChange: (e) => setPassword(e.target.value), className: "border-slate-700 bg-slate-800 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:ring-emerald-500/20 pr-10", autoComplete: "current-password" }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/index.tsx?tsr-split=component",
                lineNumber: 83,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { type: "button", onClick: () => setShowPwd(!showPwd), className: "absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors", children: showPwd ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(EyeOff, { className: "h-4 w-4" }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/index.tsx?tsr-split=component",
                lineNumber: 85,
                columnNumber: 32
              }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Eye, { className: "h-4 w-4" }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/index.tsx?tsr-split=component",
                lineNumber: 85,
                columnNumber: 65
              }, this) }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/index.tsx?tsr-split=component",
                lineNumber: 84,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/index.tsx?tsr-split=component",
              lineNumber: 82,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/index.tsx?tsr-split=component",
            lineNumber: 80,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { type: "submit", className: "w-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/25 transition-all", disabled: loading, children: loading ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/index.tsx?tsr-split=component",
              lineNumber: 92,
              columnNumber: 21
            }, this),
            "Memproses..."
          ] }, void 0, true, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/index.tsx?tsr-split=component",
            lineNumber: 91,
            columnNumber: 28
          }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(LogIn, { className: "h-4 w-4" }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/index.tsx?tsr-split=component",
              lineNumber: 95,
              columnNumber: 21
            }, this),
            "Masuk"
          ] }, void 0, true, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/index.tsx?tsr-split=component",
            lineNumber: 94,
            columnNumber: 29
          }, this) }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/index.tsx?tsr-split=component",
            lineNumber: 90,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "rounded-lg border border-amber-800/40 bg-amber-950/20 p-3 text-xs text-amber-300/80 space-y-2", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "font-semibold text-amber-400 flex items-center gap-1", children: "🔧 Mode Development" }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/index.tsx?tsr-split=component",
                lineNumber: 102,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-slate-400 mt-0.5", children: "Klik tombol di bawah untuk memasukkan kredensial otomatis:" }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/index.tsx?tsr-split=component",
                lineNumber: 103,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/index.tsx?tsr-split=component",
              lineNumber: 101,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { type: "button", variant: "outline", onClick: () => {
              setEmail(DEV_CREDS.email);
              setPassword(DEV_CREDS.password);
              toast.success("Kredensial dev berhasil dimasukkan!");
            }, className: "w-full border-amber-600/40 hover:border-amber-500 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-xs py-1.5 h-auto transition-all", children: "Masuk Kredensial Dev (Admin)" }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/index.tsx?tsr-split=component",
              lineNumber: 105,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/index.tsx?tsr-split=component",
            lineNumber: 100,
            columnNumber: 25
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/index.tsx?tsr-split=component",
          lineNumber: 74,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/index.tsx?tsr-split=component",
          lineNumber: 73,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/index.tsx?tsr-split=component",
        lineNumber: 66,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mt-6 text-center text-xs text-slate-600", children: "© 2025 SIRA — Raudhatusalam Islamic Boarding School" }, void 0, false, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/index.tsx?tsr-split=component",
        lineNumber: 117,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/index.tsx?tsr-split=component",
      lineNumber: 55,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/index.tsx?tsr-split=component",
    lineNumber: 48,
    columnNumber: 10
  }, this);
}
export {
  LoginPage as component
};
