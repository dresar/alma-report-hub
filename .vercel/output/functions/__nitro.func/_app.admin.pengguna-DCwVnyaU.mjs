import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { C as Card, c as CardHeader, d as CardTitle, a as CardContent } from "./_ssr/card-uop7ST8s.mjs";
import { B as Button } from "./_ssr/button-DA2gxxPy.mjs";
import { I as Input } from "./_ssr/input-C0QjszdI.mjs";
import { L as Label } from "./_ssr/label-JU3yqRBo.mjs";
import { S as Select, c as SelectTrigger, d as SelectValue, a as SelectContent, b as SelectItem } from "./_ssr/select-NX1S2Qd-.mjs";
import { B as Badge } from "./_ssr/badge-DyfXZgLs.mjs";
import { T as Table, d as TableHeader, e as TableRow, c as TableHead, a as TableBody, b as TableCell } from "./_ssr/table-DhIrzwGX.mjs";
import { A as AlertDialog, h as AlertDialogTrigger, c as AlertDialogContent, f as AlertDialogHeader, g as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, b as AlertDialogCancel, a as AlertDialogAction } from "./_ssr/alert-dialog-BrzSSKxW.mjs";
import { t as toast } from "./_libs/sonner.mjs";
import { b as useQueryClient, a as useQuery, u as useMutation } from "./_libs/tanstack__react-query.mjs";
import { u as useAuth } from "./_ssr/use-auth-YByzSFug.mjs";
import { a as createUserFn, t as toggleUserFn, d as deleteUserFn, g as getUsersFn } from "./_ssr/auth.functions-Do5GG3_w.mjs";
import { n as Plus, T as Trash2 } from "./_libs/lucide-react.mjs";
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
import "./_libs/radix-ui__react-select.mjs";
import "./_libs/radix-ui__number.mjs";
import "./_libs/radix-ui__primitive.mjs";
import "./_libs/radix-ui__react-collection.mjs";
import "./_libs/radix-ui__react-context.mjs";
import "./_libs/radix-ui__react-direction.mjs";
import "./_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "./_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "./_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "./_libs/radix-ui__react-focus-guards.mjs";
import "./_libs/radix-ui__react-focus-scope.mjs";
import "./_libs/radix-ui__react-id.mjs";
import "./_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "./_libs/radix-ui__react-popper.mjs";
import "./_libs/floating-ui__react-dom.mjs";
import "./_libs/floating-ui__dom.mjs";
import "./_libs/floating-ui__core.mjs";
import "./_libs/floating-ui__utils.mjs";
import "./_libs/radix-ui__react-arrow.mjs";
import "./_libs/radix-ui__react-use-size.mjs";
import "./_libs/radix-ui__react-portal.mjs";
import "./_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "./_libs/radix-ui__react-use-previous.mjs";
import "./_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "./_libs/aria-hidden.mjs";
import "./_libs/react-remove-scroll.mjs";
import "tslib";
import "./_libs/react-remove-scroll-bar.mjs";
import "./_libs/react-style-singleton.mjs";
import "./_libs/get-nonce.mjs";
import "./_libs/use-sidecar.mjs";
import "./_libs/use-callback-ref.mjs";
import "./_libs/radix-ui__react-alert-dialog.mjs";
import "./_libs/radix-ui__react-dialog.mjs";
import "./_libs/radix-ui__react-presence.mjs";
import "./_libs/tanstack__query-core.mjs";
import "./_ssr/fetch-helper-D3HnH3aE.mjs";
function PenggunaPage() {
  const {
    token
  } = useAuth();
  const qc = useQueryClient();
  const [addForm, setAddForm] = reactExports.useState({
    name: "",
    email: "",
    password: "",
    role: "guru"
  });
  const {
    data: users
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsersFn({
      data: {
        token
      }
    })
  });
  const createMut = useMutation({
    mutationFn: () => createUserFn({
      data: {
        token,
        ...addForm
      }
    }),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["users"]
      });
      setAddForm({
        name: "",
        email: "",
        password: "",
        role: "guru"
      });
      toast.success("Pengguna ditambahkan");
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Gagal menambahkan pengguna")
  });
  const toggleMut = useMutation({
    mutationFn: ({
      userId,
      isActive
    }) => toggleUserFn({
      data: {
        token,
        userId,
        isActive
      }
    }),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["users"]
      });
      toast.success("Status pengguna diperbarui");
    }
  });
  const deleteMut = useMutation({
    mutationFn: (userId) => deleteUserFn({
      data: {
        token,
        userId
      }
    }),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["users"]
      });
      toast.success("Pengguna dihapus");
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Gagal menghapus pengguna")
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-5xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold tracking-tight", children: "Pengguna" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-none border-0 bg-transparent", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "px-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-xl", children: "Manajemen Pengguna" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-6 px-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border p-5 bg-card space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold", children: "Tambah Pengguna Baru" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Nama Lengkap" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "new-user-name", value: addForm.name, onChange: (e) => setAddForm((p) => ({
                ...p,
                name: e.target.value
              })), placeholder: "Nama lengkap" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Email" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "new-user-email", type: "email", value: addForm.email, onChange: (e) => setAddForm((p) => ({
                ...p,
                email: e.target.value
              })), placeholder: "email@sira.sch.id" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Password" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "new-user-password", type: "password", value: addForm.password, onChange: (e) => setAddForm((p) => ({
                ...p,
                password: e.target.value
              })), placeholder: "Min. 6 karakter" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Role / Peran" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: addForm.role, onValueChange: (v) => setAddForm((p) => ({
                ...p,
                role: v
              })), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "new-user-role", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "admin", children: "Admin" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "wali_kelas", children: "Wali Kelas" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "guru", children: "Guru" })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => createMut.mutate(), disabled: !addForm.name || !addForm.email || !addForm.password || createMut.isPending, className: "bg-emerald-600 hover:bg-emerald-500", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-1.5" }),
            "Tambah Pengguna"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-md border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Nama" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Email" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Role" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Aksi" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TableBody, { children: [
            (users ?? []).map((u) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: u.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground text-sm", children: u.email }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "capitalize", children: String(u.role).replace("_", " ") }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: u.is_active ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-emerald-600", children: "Aktif" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: "Nonaktif" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "text-right space-x-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", onClick: () => toggleMut.mutate({
                  userId: u.id,
                  isActive: !u.is_active
                }), children: u.is_active ? "Nonaktifkan" : "Aktifkan" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Hapus pengguna?" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
                        "Akun ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: u.name }),
                        " akan dihapus permanen."
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "Batal" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { className: "bg-red-600", onClick: () => deleteMut.mutate(u.id), children: "Hapus" })
                    ] })
                  ] })
                ] })
              ] })
            ] }, u.id)),
            (users ?? []).length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 5, className: "text-center text-muted-foreground py-6", children: "Belum ada data pengguna." }) })
          ] })
        ] }) })
      ] })
    ] })
  ] });
}
export {
  PenggunaPage as component
};
