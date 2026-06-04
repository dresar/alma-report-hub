import { r as reactExports, j as jsxDevRuntimeExports } from "./_libs/react.mjs";
import { C as Card, c as CardHeader, d as CardTitle, a as CardContent } from "./_ssr/card-BhYvH4ns.mjs";
import { B as Button } from "./_ssr/button-CM0KjKCo.mjs";
import { I as Input } from "./_ssr/input-Dxdu6HuB.mjs";
import { B as Badge } from "./_ssr/badge-DiP6vzkd.mjs";
import { T as Table, d as TableHeader, e as TableRow, c as TableHead, a as TableBody, b as TableCell } from "./_ssr/table-CTsyOdB_.mjs";
import { A as AlertDialog, h as AlertDialogTrigger, c as AlertDialogContent, f as AlertDialogHeader, g as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, b as AlertDialogCancel, a as AlertDialogAction } from "./_ssr/alert-dialog-Bdu3uy0P.mjs";
import { t as toast } from "./_libs/sonner.mjs";
import { b as useQueryClient, a as useQuery, u as useMutation } from "./_libs/tanstack__react-query.mjs";
import { u as useAuth } from "./_ssr/use-auth-YByzSFug.mjs";
import { c as createAcademicYearFn, s as setActiveAcademicYearFn, d as deleteAcademicYearFn, g as getAcademicYearsFn } from "./_ssr/academic-years-Ctlthb4h.mjs";
import "./_libs/seroval.mjs";
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
import "async_hooks";
import "crypto";
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
    mutationFn: (yearId) => setActiveAcademicYearFn({
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
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-6 max-w-4xl", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Card, { className: "shadow-none border-0 bg-transparent", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardHeader, { className: "px-0", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardTitle, { className: "text-xl", children: "Manajemen Tahun Ajaran" }, void 0, false, {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.tahun-ajaran.tsx?tsr-split=component",
      lineNumber: 72,
      columnNumber: 38
    }, this) }, void 0, false, {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.tahun-ajaran.tsx?tsr-split=component",
      lineNumber: 72,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardContent, { className: "space-y-4 px-0", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Input, { id: "new-year", placeholder: "e.g. 2026/2027", value: newYear, onChange: (e) => setNewYear(e.target.value), className: "max-w-xs" }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.tahun-ajaran.tsx?tsr-split=component",
          lineNumber: 75,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { onClick: () => createMut.mutate(), disabled: !newYear || createMut.isPending, className: "bg-emerald-600 hover:bg-emerald-500", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Plus, { className: "h-4 w-4 mr-1.5" }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.tahun-ajaran.tsx?tsr-split=component",
            lineNumber: 77,
            columnNumber: 15
          }, this),
          "Tambah"
        ] }, void 0, true, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.tahun-ajaran.tsx?tsr-split=component",
          lineNumber: 76,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.tahun-ajaran.tsx?tsr-split=component",
        lineNumber: 74,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "rounded-md border", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Table, { children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableHeader, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableRow, { children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableHead, { children: "Tahun Ajaran" }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.tahun-ajaran.tsx?tsr-split=component",
            lineNumber: 85,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableHead, { children: "Status" }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.tahun-ajaran.tsx?tsr-split=component",
            lineNumber: 86,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableHead, { className: "text-right", children: "Aksi" }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.tahun-ajaran.tsx?tsr-split=component",
            lineNumber: 87,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.tahun-ajaran.tsx?tsr-split=component",
          lineNumber: 84,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.tahun-ajaran.tsx?tsr-split=component",
          lineNumber: 83,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableBody, { children: (years ?? []).map((y) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableRow, { children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableCell, { className: "font-medium", children: y.year }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.tahun-ajaran.tsx?tsr-split=component",
            lineNumber: 92,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableCell, { children: y.is_active ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Badge, { className: "bg-emerald-600", children: "Aktif" }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.tahun-ajaran.tsx?tsr-split=component",
            lineNumber: 94,
            columnNumber: 38
          }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Badge, { variant: "outline", children: "Tidak Aktif" }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.tahun-ajaran.tsx?tsr-split=component",
            lineNumber: 94,
            columnNumber: 88
          }, this) }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.tahun-ajaran.tsx?tsr-split=component",
            lineNumber: 93,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableCell, { className: "text-right space-x-1", children: [
            !y.is_active && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { size: "sm", variant: "outline", onClick: () => setActiveMut.mutate(y.id), children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Check, { className: "h-3.5 w-3.5 mr-1" }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.tahun-ajaran.tsx?tsr-split=component",
                lineNumber: 98,
                columnNumber: 27
              }, this),
              "Aktifkan"
            ] }, void 0, true, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.tahun-ajaran.tsx?tsr-split=component",
              lineNumber: 97,
              columnNumber: 40
            }, this),
            !y.is_active && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(AlertDialog, { children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { size: "sm", variant: "outline", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Trash2, { className: "h-3.5 w-3.5" }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.tahun-ajaran.tsx?tsr-split=component",
                lineNumber: 103,
                columnNumber: 65
              }, this) }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.tahun-ajaran.tsx?tsr-split=component",
                lineNumber: 103,
                columnNumber: 29
              }, this) }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.tahun-ajaran.tsx?tsr-split=component",
                lineNumber: 102,
                columnNumber: 27
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(AlertDialogContent, { children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(AlertDialogHeader, { children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(AlertDialogTitle, { children: "Hapus tahun ajaran?" }, void 0, false, {
                    fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.tahun-ajaran.tsx?tsr-split=component",
                    lineNumber: 107,
                    columnNumber: 31
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(AlertDialogDescription, { children: [
                    "Tahun ajaran ",
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("b", { children: y.year }, void 0, false, {
                      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.tahun-ajaran.tsx?tsr-split=component",
                      lineNumber: 109,
                      columnNumber: 46
                    }, this),
                    " dan semua data nilai terkait akan dihapus."
                  ] }, void 0, true, {
                    fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.tahun-ajaran.tsx?tsr-split=component",
                    lineNumber: 108,
                    columnNumber: 31
                  }, this)
                ] }, void 0, true, {
                  fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.tahun-ajaran.tsx?tsr-split=component",
                  lineNumber: 106,
                  columnNumber: 29
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(AlertDialogFooter, { children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(AlertDialogCancel, { children: "Batal" }, void 0, false, {
                    fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.tahun-ajaran.tsx?tsr-split=component",
                    lineNumber: 113,
                    columnNumber: 31
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(AlertDialogAction, { className: "bg-red-600", onClick: () => deleteMut.mutate(y.id), children: "Hapus" }, void 0, false, {
                    fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.tahun-ajaran.tsx?tsr-split=component",
                    lineNumber: 114,
                    columnNumber: 31
                  }, this)
                ] }, void 0, true, {
                  fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.tahun-ajaran.tsx?tsr-split=component",
                  lineNumber: 112,
                  columnNumber: 29
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.tahun-ajaran.tsx?tsr-split=component",
                lineNumber: 105,
                columnNumber: 27
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.tahun-ajaran.tsx?tsr-split=component",
              lineNumber: 101,
              columnNumber: 40
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.tahun-ajaran.tsx?tsr-split=component",
            lineNumber: 96,
            columnNumber: 21
          }, this)
        ] }, y.id, true, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.tahun-ajaran.tsx?tsr-split=component",
          lineNumber: 91,
          columnNumber: 41
        }, this)) }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.tahun-ajaran.tsx?tsr-split=component",
          lineNumber: 90,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.tahun-ajaran.tsx?tsr-split=component",
        lineNumber: 82,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.tahun-ajaran.tsx?tsr-split=component",
        lineNumber: 81,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.tahun-ajaran.tsx?tsr-split=component",
      lineNumber: 73,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.tahun-ajaran.tsx?tsr-split=component",
    lineNumber: 71,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.tahun-ajaran.tsx?tsr-split=component",
    lineNumber: 70,
    columnNumber: 10
  }, this);
}
export {
  TahunAjaranPage as component
};
