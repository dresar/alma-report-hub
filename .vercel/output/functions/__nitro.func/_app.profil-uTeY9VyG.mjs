import { r as reactExports, j as jsxDevRuntimeExports } from "./_libs/react.mjs";
import { C as Card, c as CardHeader, d as CardTitle, b as CardDescription, a as CardContent } from "./_ssr/card-BhYvH4ns.mjs";
import { B as Button } from "./_ssr/button-CM0KjKCo.mjs";
import { I as Input } from "./_ssr/input-Dxdu6HuB.mjs";
import { L as Label } from "./_ssr/label-B5xHsmXM.mjs";
import { t as toast } from "./_libs/sonner.mjs";
import { u as useMutation } from "./_libs/tanstack__react-query.mjs";
import { u as useAuth, a as authStore } from "./_ssr/use-auth-YByzSFug.mjs";
import { c as changePasswordFn, u as updateProfileFn } from "./_ssr/auth-B4fflKSl.mjs";
import "./_libs/seroval.mjs";
import "./_ssr/utils-H80jjgLf.mjs";
import "./_libs/clsx.mjs";
import "./_libs/tailwind-merge.mjs";
import "./_libs/radix-ui__react-slot.mjs";
import "./_libs/radix-ui__react-compose-refs.mjs";
import "./_libs/class-variance-authority.mjs";
import "./_libs/radix-ui__react-label.mjs";
import "./_libs/radix-ui__react-primitive.mjs";
import "./_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "crypto";
import "stream";
import "./_libs/tanstack__query-core.mjs";
import "./_ssr/createSsrRpc-_V2Ptgae.mjs";
import "./_ssr/server-B2xBzUrm.mjs";
import "node:async_hooks";
import "./_libs/h3-v2.mjs";
import "./_libs/rou3.mjs";
import "./_libs/srvx.mjs";
import "node:stream";
import "./_libs/tanstack__router-core.mjs";
import "./_libs/tanstack__history.mjs";
import "./_libs/cookie-es.mjs";
import "./_libs/seroval-plugins.mjs";
import "node:stream/web";
import "./_libs/tanstack__react-router.mjs";
import "./_libs/isbot.mjs";
function ProfilPage() {
  const {
    token,
    user
  } = useAuth();
  const [form, setForm] = reactExports.useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [profileForm, setProfileForm] = reactExports.useState({
    name: user?.name || "",
    email: user?.email || ""
  });
  const mut = useMutation({
    mutationFn: () => changePasswordFn({
      data: {
        token,
        oldPassword: form.oldPassword,
        newPassword: form.newPassword
      }
    }),
    onSuccess: () => {
      setForm({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
      toast.success("Password berhasil diubah");
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Gagal mengubah password")
  });
  const profileMut = useMutation({
    mutationFn: () => updateProfileFn({
      data: {
        token,
        name: profileForm.name,
        email: profileForm.email
      }
    }),
    onSuccess: (data) => {
      authStore.login(data.token, data.user);
      toast.success("Profil berhasil diperbarui");
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Gagal memperbarui profil")
  });
  const isFormValid = form.oldPassword && form.newPassword.length >= 6 && form.newPassword === form.confirmPassword;
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "max-w-2xl mx-auto space-y-6", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "text-2xl font-bold tracking-tight", children: "Profil Pengguna" }, void 0, false, {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.profil.tsx?tsr-split=component",
      lineNumber: 58,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Card, { children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardHeader, { children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardTitle, { children: "Informasi Akun" }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.profil.tsx?tsr-split=component",
          lineNumber: 62,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardDescription, { children: "Detail profil yang sedang digunakan" }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.profil.tsx?tsr-split=component",
          lineNumber: 63,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.profil.tsx?tsr-split=component",
        lineNumber: 61,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Label, { htmlFor: "name", children: "Nama Lengkap" }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.profil.tsx?tsr-split=component",
            lineNumber: 67,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Input, { id: "name", value: profileForm.name, onChange: (e) => setProfileForm((p) => ({
            ...p,
            name: e.target.value
          })) }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.profil.tsx?tsr-split=component",
            lineNumber: 68,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.profil.tsx?tsr-split=component",
          lineNumber: 66,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Label, { htmlFor: "email", children: "Email" }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.profil.tsx?tsr-split=component",
            lineNumber: 74,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Input, { id: "email", type: "email", value: profileForm.email, onChange: (e) => setProfileForm((p) => ({
            ...p,
            email: e.target.value
          })) }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.profil.tsx?tsr-split=component",
            lineNumber: 75,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.profil.tsx?tsr-split=component",
          lineNumber: 73,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Label, { children: "Peran / Role" }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.profil.tsx?tsr-split=component",
            lineNumber: 81,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Input, { value: String(user?.role || "").replace("_", " ").toUpperCase(), disabled: true, className: "bg-muted/50" }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.profil.tsx?tsr-split=component",
            lineNumber: 82,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.profil.tsx?tsr-split=component",
          lineNumber: 80,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { onClick: () => profileMut.mutate(), disabled: !profileForm.name || !profileForm.email || profileMut.isPending, className: "w-full mt-2", children: profileMut.isPending ? "Menyimpan..." : "Simpan Profil" }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.profil.tsx?tsr-split=component",
          lineNumber: 84,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.profil.tsx?tsr-split=component",
        lineNumber: 65,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.profil.tsx?tsr-split=component",
      lineNumber: 60,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Card, { children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardHeader, { children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardTitle, { children: "Ganti Password" }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.profil.tsx?tsr-split=component",
          lineNumber: 92,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardDescription, { children: "Ubah password akun Anda secara berkala" }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.profil.tsx?tsr-split=component",
          lineNumber: 93,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.profil.tsx?tsr-split=component",
        lineNumber: 91,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Label, { htmlFor: "old-password", children: "Password Lama" }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.profil.tsx?tsr-split=component",
            lineNumber: 97,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Input, { id: "old-password", type: "password", value: form.oldPassword, onChange: (e) => setForm((p) => ({
            ...p,
            oldPassword: e.target.value
          })) }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.profil.tsx?tsr-split=component",
            lineNumber: 98,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.profil.tsx?tsr-split=component",
          lineNumber: 96,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Label, { htmlFor: "new-password", children: "Password Baru" }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.profil.tsx?tsr-split=component",
            lineNumber: 104,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Input, { id: "new-password", type: "password", placeholder: "Minimal 6 karakter", value: form.newPassword, onChange: (e) => setForm((p) => ({
            ...p,
            newPassword: e.target.value
          })) }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.profil.tsx?tsr-split=component",
            lineNumber: 105,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.profil.tsx?tsr-split=component",
          lineNumber: 103,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Label, { htmlFor: "confirm-password", children: "Konfirmasi Password Baru" }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.profil.tsx?tsr-split=component",
            lineNumber: 111,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Input, { id: "confirm-password", type: "password", value: form.confirmPassword, onChange: (e) => setForm((p) => ({
            ...p,
            confirmPassword: e.target.value
          })) }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.profil.tsx?tsr-split=component",
            lineNumber: 112,
            columnNumber: 13
          }, this),
          form.newPassword && form.confirmPassword && form.newPassword !== form.confirmPassword && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xs text-red-500 font-medium", children: "Password baru tidak cocok" }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.profil.tsx?tsr-split=component",
            lineNumber: 116,
            columnNumber: 103
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.profil.tsx?tsr-split=component",
          lineNumber: 110,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { onClick: () => mut.mutate(), disabled: !isFormValid || mut.isPending, className: "w-full bg-emerald-600 hover:bg-emerald-500 mt-2", children: "Simpan Password" }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.profil.tsx?tsr-split=component",
          lineNumber: 118,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.profil.tsx?tsr-split=component",
        lineNumber: 95,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.profil.tsx?tsr-split=component",
      lineNumber: 90,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.profil.tsx?tsr-split=component",
    lineNumber: 57,
    columnNumber: 10
  }, this);
}
export {
  ProfilPage as component
};
