import { r as reactExports, j as jsxDevRuntimeExports } from "./_libs/react.mjs";
import { C as Card, c as CardHeader, d as CardTitle, a as CardContent } from "./_ssr/card-BhYvH4ns.mjs";
import { B as Button } from "./_ssr/button-CM0KjKCo.mjs";
import { I as Input } from "./_ssr/input-Dxdu6HuB.mjs";
import { L as Label } from "./_ssr/label-B5xHsmXM.mjs";
import { S as Select, c as SelectTrigger, d as SelectValue, a as SelectContent, b as SelectItem } from "./_ssr/select-WXuL3P7I.mjs";
import { B as Badge } from "./_ssr/badge-DiP6vzkd.mjs";
import { T as Table, d as TableHeader, e as TableRow, c as TableHead, a as TableBody, b as TableCell } from "./_ssr/table-CTsyOdB_.mjs";
import { A as AlertDialog, h as AlertDialogTrigger, c as AlertDialogContent, f as AlertDialogHeader, g as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, b as AlertDialogCancel, a as AlertDialogAction } from "./_ssr/alert-dialog-Bdu3uy0P.mjs";
import { t as toast } from "./_libs/sonner.mjs";
import { b as useQueryClient, a as useQuery, u as useMutation } from "./_libs/tanstack__react-query.mjs";
import { u as useAuth } from "./_ssr/use-auth-YByzSFug.mjs";
import { a as createUserFn, t as toggleUserFn, d as deleteUserFn, g as getUsersFn } from "./_ssr/auth-B4fflKSl.mjs";
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
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-6 max-w-5xl", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "text-2xl font-bold tracking-tight", children: "Pengguna" }, void 0, false, {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.pengguna.tsx?tsr-split=component",
      lineNumber: 95,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.pengguna.tsx?tsr-split=component",
      lineNumber: 94,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Card, { className: "shadow-none border-0 bg-transparent", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardHeader, { className: "px-0", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardTitle, { className: "text-xl", children: "Manajemen Pengguna" }, void 0, false, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.pengguna.tsx?tsr-split=component",
        lineNumber: 98,
        columnNumber: 38
      }, this) }, void 0, false, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.pengguna.tsx?tsr-split=component",
        lineNumber: 98,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardContent, { className: "space-y-6 px-0", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "rounded-xl border p-5 bg-card space-y-4", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-sm font-semibold", children: "Tambah Pengguna Baru" }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.pengguna.tsx?tsr-split=component",
            lineNumber: 102,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Label, { className: "text-xs", children: "Nama Lengkap" }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.pengguna.tsx?tsr-split=component",
                lineNumber: 105,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Input, { id: "new-user-name", value: addForm.name, onChange: (e) => setAddForm((p) => ({
                ...p,
                name: e.target.value
              })), placeholder: "Nama lengkap" }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.pengguna.tsx?tsr-split=component",
                lineNumber: 106,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.pengguna.tsx?tsr-split=component",
              lineNumber: 104,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Label, { className: "text-xs", children: "Email" }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.pengguna.tsx?tsr-split=component",
                lineNumber: 112,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Input, { id: "new-user-email", type: "email", value: addForm.email, onChange: (e) => setAddForm((p) => ({
                ...p,
                email: e.target.value
              })), placeholder: "email@sira.sch.id" }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.pengguna.tsx?tsr-split=component",
                lineNumber: 113,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.pengguna.tsx?tsr-split=component",
              lineNumber: 111,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Label, { className: "text-xs", children: "Password" }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.pengguna.tsx?tsr-split=component",
                lineNumber: 119,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Input, { id: "new-user-password", type: "password", value: addForm.password, onChange: (e) => setAddForm((p) => ({
                ...p,
                password: e.target.value
              })), placeholder: "Min. 6 karakter" }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.pengguna.tsx?tsr-split=component",
                lineNumber: 120,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.pengguna.tsx?tsr-split=component",
              lineNumber: 118,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Label, { className: "text-xs", children: "Role / Peran" }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.pengguna.tsx?tsr-split=component",
                lineNumber: 126,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Select, { value: addForm.role, onValueChange: (v) => setAddForm((p) => ({
                ...p,
                role: v
              })), children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectTrigger, { id: "new-user-role", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectValue, {}, void 0, false, {
                  fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.pengguna.tsx?tsr-split=component",
                  lineNumber: 131,
                  columnNumber: 53
                }, this) }, void 0, false, {
                  fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.pengguna.tsx?tsr-split=component",
                  lineNumber: 131,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectContent, { children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectItem, { value: "admin", children: "Admin" }, void 0, false, {
                    fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.pengguna.tsx?tsr-split=component",
                    lineNumber: 133,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectItem, { value: "wali_kelas", children: "Wali Kelas" }, void 0, false, {
                    fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.pengguna.tsx?tsr-split=component",
                    lineNumber: 134,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectItem, { value: "guru", children: "Guru" }, void 0, false, {
                    fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.pengguna.tsx?tsr-split=component",
                    lineNumber: 135,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.pengguna.tsx?tsr-split=component",
                  lineNumber: 132,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.pengguna.tsx?tsr-split=component",
                lineNumber: 127,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.pengguna.tsx?tsr-split=component",
              lineNumber: 125,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.pengguna.tsx?tsr-split=component",
            lineNumber: 103,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { onClick: () => createMut.mutate(), disabled: !addForm.name || !addForm.email || !addForm.password || createMut.isPending, className: "bg-emerald-600 hover:bg-emerald-500", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Plus, { className: "h-4 w-4 mr-1.5" }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.pengguna.tsx?tsr-split=component",
              lineNumber: 141,
              columnNumber: 15
            }, this),
            "Tambah Pengguna"
          ] }, void 0, true, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.pengguna.tsx?tsr-split=component",
            lineNumber: 140,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.pengguna.tsx?tsr-split=component",
          lineNumber: 101,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "rounded-md border", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Table, { children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableHeader, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableRow, { children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableHead, { children: "Nama" }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.pengguna.tsx?tsr-split=component",
              lineNumber: 150,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableHead, { children: "Email" }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.pengguna.tsx?tsr-split=component",
              lineNumber: 151,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableHead, { children: "Role" }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.pengguna.tsx?tsr-split=component",
              lineNumber: 152,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableHead, { children: "Status" }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.pengguna.tsx?tsr-split=component",
              lineNumber: 153,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableHead, { className: "text-right", children: "Aksi" }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.pengguna.tsx?tsr-split=component",
              lineNumber: 154,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.pengguna.tsx?tsr-split=component",
            lineNumber: 149,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.pengguna.tsx?tsr-split=component",
            lineNumber: 148,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableBody, { children: [
            (users ?? []).map((u) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableRow, { children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableCell, { className: "font-medium", children: u.name }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.pengguna.tsx?tsr-split=component",
                lineNumber: 159,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableCell, { className: "text-muted-foreground text-sm", children: u.email }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.pengguna.tsx?tsr-split=component",
                lineNumber: 160,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableCell, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Badge, { variant: "outline", className: "capitalize", children: String(u.role).replace("_", " ") }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.pengguna.tsx?tsr-split=component",
                lineNumber: 162,
                columnNumber: 23
              }, this) }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.pengguna.tsx?tsr-split=component",
                lineNumber: 161,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableCell, { children: u.is_active ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Badge, { className: "bg-emerald-600", children: "Aktif" }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.pengguna.tsx?tsr-split=component",
                lineNumber: 165,
                columnNumber: 38
              }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Badge, { variant: "outline", children: "Nonaktif" }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.pengguna.tsx?tsr-split=component",
                lineNumber: 165,
                columnNumber: 88
              }, this) }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.pengguna.tsx?tsr-split=component",
                lineNumber: 164,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableCell, { className: "text-right space-x-1", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { size: "sm", variant: "outline", onClick: () => toggleMut.mutate({
                  userId: u.id,
                  isActive: !u.is_active
                }), children: u.is_active ? "Nonaktifkan" : "Aktifkan" }, void 0, false, {
                  fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.pengguna.tsx?tsr-split=component",
                  lineNumber: 168,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(AlertDialog, { children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { size: "sm", variant: "outline", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Trash2, { className: "h-3.5 w-3.5" }, void 0, false, {
                    fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.pengguna.tsx?tsr-split=component",
                    lineNumber: 176,
                    columnNumber: 63
                  }, this) }, void 0, false, {
                    fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.pengguna.tsx?tsr-split=component",
                    lineNumber: 176,
                    columnNumber: 27
                  }, this) }, void 0, false, {
                    fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.pengguna.tsx?tsr-split=component",
                    lineNumber: 175,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(AlertDialogContent, { children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(AlertDialogHeader, { children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(AlertDialogTitle, { children: "Hapus pengguna?" }, void 0, false, {
                        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.pengguna.tsx?tsr-split=component",
                        lineNumber: 180,
                        columnNumber: 29
                      }, this),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(AlertDialogDescription, { children: [
                        "Akun ",
                        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("b", { children: u.name }, void 0, false, {
                          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.pengguna.tsx?tsr-split=component",
                          lineNumber: 181,
                          columnNumber: 58
                        }, this),
                        " akan dihapus permanen."
                      ] }, void 0, true, {
                        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.pengguna.tsx?tsr-split=component",
                        lineNumber: 181,
                        columnNumber: 29
                      }, this)
                    ] }, void 0, true, {
                      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.pengguna.tsx?tsr-split=component",
                      lineNumber: 179,
                      columnNumber: 27
                    }, this),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(AlertDialogFooter, { children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(AlertDialogCancel, { children: "Batal" }, void 0, false, {
                        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.pengguna.tsx?tsr-split=component",
                        lineNumber: 184,
                        columnNumber: 29
                      }, this),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(AlertDialogAction, { className: "bg-red-600", onClick: () => deleteMut.mutate(u.id), children: "Hapus" }, void 0, false, {
                        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.pengguna.tsx?tsr-split=component",
                        lineNumber: 185,
                        columnNumber: 29
                      }, this)
                    ] }, void 0, true, {
                      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.pengguna.tsx?tsr-split=component",
                      lineNumber: 183,
                      columnNumber: 27
                    }, this)
                  ] }, void 0, true, {
                    fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.pengguna.tsx?tsr-split=component",
                    lineNumber: 178,
                    columnNumber: 25
                  }, this)
                ] }, void 0, true, {
                  fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.pengguna.tsx?tsr-split=component",
                  lineNumber: 174,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.pengguna.tsx?tsr-split=component",
                lineNumber: 167,
                columnNumber: 21
              }, this)
            ] }, u.id, true, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.pengguna.tsx?tsr-split=component",
              lineNumber: 158,
              columnNumber: 41
            }, this)),
            (users ?? []).length === 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableRow, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableCell, { colSpan: 5, className: "text-center text-muted-foreground py-6", children: "Belum ada data pengguna." }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.pengguna.tsx?tsr-split=component",
              lineNumber: 192,
              columnNumber: 21
            }, this) }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.pengguna.tsx?tsr-split=component",
              lineNumber: 191,
              columnNumber: 48
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.pengguna.tsx?tsr-split=component",
            lineNumber: 157,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.pengguna.tsx?tsr-split=component",
          lineNumber: 147,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.pengguna.tsx?tsr-split=component",
          lineNumber: 146,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.pengguna.tsx?tsr-split=component",
        lineNumber: 99,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.pengguna.tsx?tsr-split=component",
      lineNumber: 97,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.pengguna.tsx?tsr-split=component",
    lineNumber: 93,
    columnNumber: 10
  }, this);
}
export {
  PenggunaPage as component
};
