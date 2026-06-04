import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { C as Card, c as CardHeader, d as CardTitle, a as CardContent } from "./_ssr/card-uop7ST8s.mjs";
import { B as Button } from "./_ssr/button-DA2gxxPy.mjs";
import { I as Input } from "./_ssr/input-C0QjszdI.mjs";
import { B as Badge } from "./_ssr/badge-DyfXZgLs.mjs";
import { T as Table, d as TableHeader, e as TableRow, c as TableHead, a as TableBody, b as TableCell } from "./_ssr/table-DhIrzwGX.mjs";
import { A as AlertDialog, h as AlertDialogTrigger, c as AlertDialogContent, f as AlertDialogHeader, g as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, b as AlertDialogCancel, a as AlertDialogAction } from "./_ssr/alert-dialog-BrzSSKxW.mjs";
import { t as toast } from "./_libs/sonner.mjs";
import { b as useQueryClient, a as useQuery, u as useMutation } from "./_libs/tanstack__react-query.mjs";
import { u as useAuth } from "./_ssr/use-auth-YByzSFug.mjs";
import { c as createAcademicYearFn, s as setActiveYearFn, d as deleteAcademicYearFn, g as getAcademicYearsFn } from "./_ssr/academic-years.functions-zJEmoTzy.mjs";
import { n as Plus, a as Check, T as Trash2 } from "./_libs/lucide-react.mjs";
import "./_ssr/utils-H80jjgLf.mjs";
import "./_libs/clsx.mjs";
import "./_libs/tailwind-merge.mjs";
import "./_libs/radix-ui__react-slot.mjs";
import "./_libs/radix-ui__react-compose-refs.mjs";
import "./_libs/class-variance-authority.mjs";
import "./_libs/radix-ui__react-alert-dialog.mjs";
import "./_libs/radix-ui__react-context.mjs";
import "./_libs/radix-ui__react-dialog.mjs";
import "./_libs/radix-ui__primitive.mjs";
import "./_libs/radix-ui__react-id.mjs";
import "./_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "./_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "./_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "./_libs/radix-ui__react-primitive.mjs";
import "./_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
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
import "./_libs/tanstack__query-core.mjs";
import "./_ssr/fetch-helper-D3HnH3aE.mjs";
function TahunAjaranPage() {
  const {
    token
  } = useAuth();
  const qc = useQueryClient();
  const [newYear, setNewYear] = reactExports.useState("");
  const {
    data: years
  } = useQuery({
    queryKey: ["academic-years"],
    queryFn: () => getAcademicYearsFn()
  });
  const createMut = useMutation({
    mutationFn: () => createAcademicYearFn({
      data: {
        token,
        year: newYear
      }
    }),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["academic-years"]
      });
      setNewYear("");
      toast.success("Tahun ajaran ditambahkan");
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Gagal menambahkan")
  });
  const setActiveMut = useMutation({
    mutationFn: (yearId) => setActiveYearFn({
      data: {
        token,
        yearId
      }
    }),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["academic-years"]
      });
      toast.success("Tahun ajaran diaktifkan");
    }
  });
  const deleteMut = useMutation({
    mutationFn: (yearId) => deleteAcademicYearFn({
      data: {
        token,
        yearId
      }
    }),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["academic-years"]
      });
      toast.success("Tahun ajaran dihapus");
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Gagal menghapus")
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6 max-w-4xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-none border-0 bg-transparent", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "px-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-xl", children: "Manajemen Tahun Ajaran" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4 px-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "new-year", placeholder: "e.g. 2026/2027", value: newYear, onChange: (e) => setNewYear(e.target.value), className: "max-w-xs" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => createMut.mutate(), disabled: !newYear || createMut.isPending, className: "bg-emerald-600 hover:bg-emerald-500", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-1.5" }),
          "Tambah"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-md border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Tahun Ajaran" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Aksi" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: (years ?? []).map((y) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: y.year }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: y.is_active ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-emerald-600", children: "Aktif" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: "Tidak Aktif" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "text-right space-x-1", children: [
            !y.is_active && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", onClick: () => setActiveMut.mutate(y.id), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5 mr-1" }),
              "Aktifkan"
            ] }),
            !y.is_active && /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Hapus tahun ajaran?" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
                    "Tahun ajaran ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: y.year }),
                    " dan semua data nilai terkait akan dihapus."
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "Batal" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { className: "bg-red-600", onClick: () => deleteMut.mutate(y.id), children: "Hapus" })
                ] })
              ] })
            ] })
          ] })
        ] }, y.id)) })
      ] }) })
    ] })
  ] }) });
}
export {
  TahunAjaranPage as component
};
