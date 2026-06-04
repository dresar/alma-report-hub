import { r as reactExports, j as jsxDevRuntimeExports } from "./_libs/react.mjs";
import { C as Card, c as CardHeader, d as CardTitle, a as CardContent } from "./_ssr/card-BhYvH4ns.mjs";
import { B as Button } from "./_ssr/button-CM0KjKCo.mjs";
import { L as Label } from "./_ssr/label-B5xHsmXM.mjs";
import { S as Select, c as SelectTrigger, d as SelectValue, a as SelectContent, b as SelectItem } from "./_ssr/select-WXuL3P7I.mjs";
import { A as AlertDialog, h as AlertDialogTrigger, c as AlertDialogContent, f as AlertDialogHeader, g as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, b as AlertDialogCancel, a as AlertDialogAction } from "./_ssr/alert-dialog-Bdu3uy0P.mjs";
import { t as toast } from "./_libs/sonner.mjs";
import { b as useQueryClient, a as useQuery, u as useMutation } from "./_libs/tanstack__react-query.mjs";
import { u as useAuth } from "./_ssr/use-auth-YByzSFug.mjs";
import { c as createRombelFn, d as deleteRombelFn, g as getClassesFn } from "./_ssr/classes-CAswTOAP.mjs";
import "./_libs/seroval.mjs";
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
import "async_hooks";
import "crypto";
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
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-6 max-w-4xl", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "text-2xl font-bold tracking-tight", children: "Kelas & Rombel" }, void 0, false, {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.kelas.tsx?tsr-split=component",
      lineNumber: 70,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.kelas.tsx?tsr-split=component",
      lineNumber: 69,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Card, { className: "shadow-none border-0 bg-transparent", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardHeader, { className: "px-0", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardTitle, { className: "text-xl", children: "Manajemen Kelas & Rombel" }, void 0, false, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.kelas.tsx?tsr-split=component",
        lineNumber: 73,
        columnNumber: 38
      }, this) }, void 0, false, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.kelas.tsx?tsr-split=component",
        lineNumber: 73,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardContent, { className: "space-y-6 px-0", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex gap-2 items-end", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Label, { className: "text-xs", children: "Kelas" }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.kelas.tsx?tsr-split=component",
              lineNumber: 77,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Select, { value: newRombel.classLevel, onValueChange: (v) => setNewRombel((p) => ({
              ...p,
              classLevel: v
            })), children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectTrigger, { className: "w-28", id: "new-rombel-class", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectValue, { placeholder: "Kelas" }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.kelas.tsx?tsr-split=component",
                lineNumber: 82,
                columnNumber: 71
              }, this) }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.kelas.tsx?tsr-split=component",
                lineNumber: 82,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectContent, { children: [1, 2, 3, 4, 5].map((k) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectItem, { value: String(k), children: [
                "Kelas ",
                k
              ] }, k, true, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.kelas.tsx?tsr-split=component",
                lineNumber: 84,
                columnNumber: 45
              }, this)) }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.kelas.tsx?tsr-split=component",
                lineNumber: 83,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.kelas.tsx?tsr-split=component",
              lineNumber: 78,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.kelas.tsx?tsr-split=component",
            lineNumber: 76,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Label, { className: "text-xs", children: "Rombel" }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.kelas.tsx?tsr-split=component",
              lineNumber: 89,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Select, { value: newRombel.name, onValueChange: (v) => setNewRombel((p) => ({
              ...p,
              name: v
            })), children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectTrigger, { className: "w-24", id: "new-rombel-name", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectValue, { placeholder: "A/B/C/D" }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.kelas.tsx?tsr-split=component",
                lineNumber: 94,
                columnNumber: 70
              }, this) }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.kelas.tsx?tsr-split=component",
                lineNumber: 94,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectContent, { children: ["A", "B", "C", "D"].map((r) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectItem, { value: r, children: r }, r, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.kelas.tsx?tsr-split=component",
                lineNumber: 96,
                columnNumber: 50
              }, this)) }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.kelas.tsx?tsr-split=component",
                lineNumber: 95,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.kelas.tsx?tsr-split=component",
              lineNumber: 90,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.kelas.tsx?tsr-split=component",
            lineNumber: 88,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { onClick: () => createRombelMut.mutate(), disabled: !newRombel.classLevel || !newRombel.name || createRombelMut.isPending, className: "bg-emerald-600 hover:bg-emerald-500", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Plus, { className: "h-4 w-4 mr-1.5" }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.kelas.tsx?tsr-split=component",
              lineNumber: 101,
              columnNumber: 15
            }, this),
            "Tambah Rombel"
          ] }, void 0, true, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.kelas.tsx?tsr-split=component",
            lineNumber: 100,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.kelas.tsx?tsr-split=component",
          lineNumber: 75,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-4", children: (classes ?? []).map((cls) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-4 border rounded-xl bg-card", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-sm font-semibold mb-3 text-muted-foreground", children: [
            "Kelas ",
            cls.level
          ] }, void 0, true, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.kelas.tsx?tsr-split=component",
            lineNumber: 107,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-wrap gap-2", children: [
            (cls.rombels ?? []).map((r) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-1 rounded-lg border bg-background px-3 py-1.5 text-sm", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "font-medium", children: [
                "Kelas ",
                cls.level,
                r.name
              ] }, void 0, true, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.kelas.tsx?tsr-split=component",
                lineNumber: 110,
                columnNumber: 23
              }, this),
              r.wali_kelas_name && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-xs text-muted-foreground ml-2", children: [
                "(",
                r.wali_kelas_name,
                ")"
              ] }, void 0, true, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.kelas.tsx?tsr-split=component",
                lineNumber: 111,
                columnNumber: 45
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(AlertDialog, { children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { className: "ml-2 text-muted-foreground hover:text-red-500 transition-colors", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Trash2, { className: "h-3.5 w-3.5" }, void 0, false, {
                  fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.kelas.tsx?tsr-split=component",
                  lineNumber: 115,
                  columnNumber: 29
                }, this) }, void 0, false, {
                  fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.kelas.tsx?tsr-split=component",
                  lineNumber: 114,
                  columnNumber: 27
                }, this) }, void 0, false, {
                  fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.kelas.tsx?tsr-split=component",
                  lineNumber: 113,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(AlertDialogContent, { children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(AlertDialogHeader, { children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(AlertDialogTitle, { children: [
                      "Hapus rombel Kelas ",
                      cls.level,
                      r.name,
                      "?"
                    ] }, void 0, true, {
                      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.kelas.tsx?tsr-split=component",
                      lineNumber: 120,
                      columnNumber: 29
                    }, this),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(AlertDialogDescription, { children: "Semua data santri di rombel ini akan kehilangan penempatan." }, void 0, false, {
                      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.kelas.tsx?tsr-split=component",
                      lineNumber: 121,
                      columnNumber: 29
                    }, this)
                  ] }, void 0, true, {
                    fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.kelas.tsx?tsr-split=component",
                    lineNumber: 119,
                    columnNumber: 27
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(AlertDialogFooter, { children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(AlertDialogCancel, { children: "Batal" }, void 0, false, {
                      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.kelas.tsx?tsr-split=component",
                      lineNumber: 124,
                      columnNumber: 29
                    }, this),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(AlertDialogAction, { className: "bg-red-600", onClick: () => deleteRombelMut.mutate(r.id), children: "Hapus" }, void 0, false, {
                      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.kelas.tsx?tsr-split=component",
                      lineNumber: 125,
                      columnNumber: 29
                    }, this)
                  ] }, void 0, true, {
                    fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.kelas.tsx?tsr-split=component",
                    lineNumber: 123,
                    columnNumber: 27
                  }, this)
                ] }, void 0, true, {
                  fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.kelas.tsx?tsr-split=component",
                  lineNumber: 118,
                  columnNumber: 25
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.kelas.tsx?tsr-split=component",
                lineNumber: 112,
                columnNumber: 23
              }, this)
            ] }, r.id, true, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.kelas.tsx?tsr-split=component",
              lineNumber: 109,
              columnNumber: 83
            }, this)),
            (cls.rombels ?? []).length === 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-xs text-muted-foreground px-1 py-1.5", children: "Belum ada rombel" }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.kelas.tsx?tsr-split=component",
              lineNumber: 130,
              columnNumber: 74
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.kelas.tsx?tsr-split=component",
            lineNumber: 108,
            columnNumber: 17
          }, this)
        ] }, cls.id, true, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.kelas.tsx?tsr-split=component",
          lineNumber: 106,
          columnNumber: 41
        }, this)) }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.kelas.tsx?tsr-split=component",
          lineNumber: 105,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.kelas.tsx?tsr-split=component",
        lineNumber: 74,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.kelas.tsx?tsr-split=component",
      lineNumber: 72,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.kelas.tsx?tsr-split=component",
    lineNumber: 68,
    columnNumber: 10
  }, this);
}
export {
  KelasPage as component
};
