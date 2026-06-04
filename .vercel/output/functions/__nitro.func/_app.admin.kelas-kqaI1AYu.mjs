import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { C as Card, c as CardHeader, d as CardTitle, a as CardContent } from "./_ssr/card-uop7ST8s.mjs";
import { B as Button } from "./_ssr/button-DA2gxxPy.mjs";
import { L as Label } from "./_ssr/label-JU3yqRBo.mjs";
import { S as Select, c as SelectTrigger, d as SelectValue, a as SelectContent, b as SelectItem } from "./_ssr/select-NX1S2Qd-.mjs";
import { A as AlertDialog, h as AlertDialogTrigger, c as AlertDialogContent, f as AlertDialogHeader, g as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, b as AlertDialogCancel, a as AlertDialogAction } from "./_ssr/alert-dialog-BrzSSKxW.mjs";
import { t as toast } from "./_libs/sonner.mjs";
import { b as useQueryClient, a as useQuery, u as useMutation } from "./_libs/tanstack__react-query.mjs";
import { u as useAuth } from "./_ssr/use-auth-YByzSFug.mjs";
import { c as createRombelFn, d as deleteRombelFn, g as getClassesFn } from "./_ssr/classes.functions-Q6R6FZ_h.mjs";
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
function KelasPage() {
  const {
    token
  } = useAuth();
  const qc = useQueryClient();
  const [newRombel, setNewRombel] = reactExports.useState({
    classLevel: "",
    name: ""
  });
  const {
    data: classes
  } = useQuery({
    queryKey: ["classes"],
    queryFn: () => getClassesFn()
  });
  const createRombelMut = useMutation({
    mutationFn: () => createRombelFn({
      data: {
        token,
        classLevel: Number(newRombel.classLevel),
        name: newRombel.name
      }
    }),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["classes"]
      });
      qc.invalidateQueries({
        queryKey: ["rombels"]
      });
      setNewRombel({
        classLevel: "",
        name: ""
      });
      toast.success("Rombel ditambahkan");
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Gagal menambahkan rombel")
  });
  const deleteRombelMut = useMutation({
    mutationFn: (rombelId) => deleteRombelFn({
      data: {
        token,
        rombelId
      }
    }),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["classes"]
      });
      qc.invalidateQueries({
        queryKey: ["rombels"]
      });
      toast.success("Rombel dihapus");
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Gagal menghapus rombel")
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-4xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold tracking-tight", children: "Kelas & Rombel" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-none border-0 bg-transparent", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "px-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-xl", children: "Manajemen Kelas & Rombel" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-6 px-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Kelas" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: newRombel.classLevel, onValueChange: (v) => setNewRombel((p) => ({
              ...p,
              classLevel: v
            })), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-28", id: "new-rombel-class", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Kelas" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: [1, 2, 3, 4, 5].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: String(k), children: [
                "Kelas ",
                k
              ] }, k)) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Rombel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: newRombel.name, onValueChange: (v) => setNewRombel((p) => ({
              ...p,
              name: v
            })), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-24", id: "new-rombel-name", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "A/B/C/D" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: ["A", "B", "C", "D"].map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: r, children: r }, r)) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => createRombelMut.mutate(), disabled: !newRombel.classLevel || !newRombel.name || createRombelMut.isPending, className: "bg-emerald-600 hover:bg-emerald-500", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-1.5" }),
            "Tambah Rombel"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: (classes ?? []).map((cls) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border rounded-xl bg-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold mb-3 text-muted-foreground", children: [
            "Kelas ",
            cls.level
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
            (cls.rombels ?? []).map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 rounded-lg border bg-background px-3 py-1.5 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
                "Kelas ",
                cls.level,
                r.name
              ] }),
              r.wali_kelas_name && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground ml-2", children: [
                "(",
                r.wali_kelas_name,
                ")"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "ml-2 text-muted-foreground hover:text-red-500 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogTitle, { children: [
                      "Hapus rombel Kelas ",
                      cls.level,
                      r.name,
                      "?"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "Semua data santri di rombel ini akan kehilangan penempatan." })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "Batal" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { className: "bg-red-600", onClick: () => deleteRombelMut.mutate(r.id), children: "Hapus" })
                  ] })
                ] })
              ] })
            ] }, r.id)),
            (cls.rombels ?? []).length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground px-1 py-1.5", children: "Belum ada rombel" })
          ] })
        ] }, cls.id)) })
      ] })
    ] })
  ] });
}
export {
  KelasPage as component
};
