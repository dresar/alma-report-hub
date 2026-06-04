import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { C as Card, c as CardHeader, d as CardTitle, b as CardDescription, a as CardContent } from "./_ssr/card-uop7ST8s.mjs";
import { B as Button } from "./_ssr/button-DA2gxxPy.mjs";
import { I as Input } from "./_ssr/input-C0QjszdI.mjs";
import { L as Label } from "./_ssr/label-JU3yqRBo.mjs";
import { t as toast } from "./_libs/sonner.mjs";
import { u as useMutation } from "./_libs/tanstack__react-query.mjs";
import { u as useAuth, a as authStore } from "./_ssr/use-auth-YByzSFug.mjs";
import { c as changePasswordFn, u as updateProfileFn } from "./_ssr/auth.functions-Do5GG3_w.mjs";
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
import "crypto";
import "async_hooks";
import "stream";
import "./_libs/tanstack__query-core.mjs";
import "./_ssr/fetch-helper-D3HnH3aE.mjs";
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold tracking-tight", children: "Profil Pengguna" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Informasi Akun" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Detail profil yang sedang digunakan" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "name", children: "Nama Lengkap" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "name", value: profileForm.name, onChange: (e) => setProfileForm((p) => ({
            ...p,
            name: e.target.value
          })) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "email", type: "email", value: profileForm.email, onChange: (e) => setProfileForm((p) => ({
            ...p,
            email: e.target.value
          })) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Peran / Role" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: String(user?.role || "").replace("_", " ").toUpperCase(), disabled: true, className: "bg-muted/50" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => profileMut.mutate(), disabled: !profileForm.name || !profileForm.email || profileMut.isPending, className: "w-full mt-2", children: profileMut.isPending ? "Menyimpan..." : "Simpan Profil" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Ganti Password" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Ubah password akun Anda secara berkala" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "old-password", children: "Password Lama" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "old-password", type: "password", value: form.oldPassword, onChange: (e) => setForm((p) => ({
            ...p,
            oldPassword: e.target.value
          })) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "new-password", children: "Password Baru" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "new-password", type: "password", placeholder: "Minimal 6 karakter", value: form.newPassword, onChange: (e) => setForm((p) => ({
            ...p,
            newPassword: e.target.value
          })) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "confirm-password", children: "Konfirmasi Password Baru" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "confirm-password", type: "password", value: form.confirmPassword, onChange: (e) => setForm((p) => ({
            ...p,
            confirmPassword: e.target.value
          })) }),
          form.newPassword && form.confirmPassword && form.newPassword !== form.confirmPassword && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-red-500 font-medium", children: "Password baru tidak cocok" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => mut.mutate(), disabled: !isFormValid || mut.isPending, className: "w-full bg-emerald-600 hover:bg-emerald-500 mt-2", children: "Simpan Password" })
      ] })
    ] })
  ] });
}
export {
  ProfilPage as component
};
