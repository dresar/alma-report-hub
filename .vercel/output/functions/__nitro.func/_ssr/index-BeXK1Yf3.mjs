import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { C as Card, c as CardHeader, d as CardTitle, b as CardDescription, a as CardContent } from "./card-uop7ST8s.mjs";
import { B as Button } from "./button-DA2gxxPy.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { L as Label } from "./label-JU3yqRBo.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { l as loginFn } from "./auth.functions-Do5GG3_w.mjs";
import { a as authStore } from "./use-auth-YByzSFug.mjs";
import { G as GraduationCap, g as EyeOff, E as Eye, l as LogIn } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
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
import "./fetch-helper-D3HnH3aE.mjs";
function LoginPage() {
  const navigate = useNavigate();
  const isDev = false;
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pointer-events-none absolute inset-0 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-40 -left-40 h-96 w-96 rounded-full bg-emerald-600/20 blur-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-teal-600/15 blur-3xl" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500 shadow-lg shadow-emerald-500/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-8 w-8 text-white" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-white", children: "SIRA" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-slate-400", children: "Sistem Informasi Rapor Santri" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500", children: "Raudhatusalam Islamic Boarding School" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-slate-800 bg-slate-900/80 backdrop-blur-sm shadow-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-lg text-white", children: "Masuk ke Akun" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { className: "text-slate-400", children: "Masukkan kredensial Anda untuk mengakses sistem" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", className: "text-slate-300 text-sm", children: "Email" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "email", type: "email", placeholder: "admin@sira.sch.id", value: email, onChange: (e) => setEmail(e.target.value), className: "border-slate-700 bg-slate-800 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:ring-emerald-500/20", autoComplete: "email" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "password", className: "text-slate-300 text-sm", children: "Password" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "password", type: showPwd ? "text" : "password", placeholder: "••••••••", value: password, onChange: (e) => setPassword(e.target.value), className: "border-slate-700 bg-slate-800 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:ring-emerald-500/20 pr-10", autoComplete: "current-password" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShowPwd(!showPwd), className: "absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors", children: showPwd ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "w-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/25 transition-all", disabled: loading, children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" }),
            "Memproses..."
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "h-4 w-4" }),
            "Masuk"
          ] }) }),
          isDev
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-center text-xs text-slate-600", children: "© 2025 SIRA — Raudhatusalam Islamic Boarding School" })
    ] })
  ] });
}
export {
  LoginPage as component
};
