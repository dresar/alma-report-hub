import { r as reactExports, j as jsxDevRuntimeExports } from "./_libs/react.mjs";
import { C as Card, c as CardHeader, d as CardTitle, a as CardContent } from "./_ssr/card-BhYvH4ns.mjs";
import { B as Button } from "./_ssr/button-CM0KjKCo.mjs";
import { I as Input } from "./_ssr/input-Dxdu6HuB.mjs";
import { L as Label } from "./_ssr/label-B5xHsmXM.mjs";
import { S as Select, c as SelectTrigger, d as SelectValue, a as SelectContent, b as SelectItem } from "./_ssr/select-WXuL3P7I.mjs";
import { T as Table, d as TableHeader, e as TableRow, c as TableHead, a as TableBody, b as TableCell } from "./_ssr/table-CTsyOdB_.mjs";
import { A as AlertDialog, h as AlertDialogTrigger, c as AlertDialogContent, f as AlertDialogHeader, g as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, b as AlertDialogCancel, a as AlertDialogAction } from "./_ssr/alert-dialog-Bdu3uy0P.mjs";
import { t as toast } from "./_libs/sonner.mjs";
import { b as useQueryClient, a as useQuery, u as useMutation } from "./_libs/tanstack__react-query.mjs";
import { u as useAuth } from "./_ssr/use-auth-YByzSFug.mjs";
import { c as createSsrRpc } from "./_ssr/createSsrRpc-_V2Ptgae.mjs";
import { b as createServerFn } from "./_ssr/server-B2xBzUrm.mjs";
import "./_libs/seroval.mjs";
import { n as Plus, S as Save, T as Trash2 } from "./_libs/lucide-react.mjs";
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
const getSubjectsFn = createServerFn().validator((data) => data).handler(createSsrRpc("38b1e7145c4f4ccf24e7929555d3c40bba0594e51cb868ffeaaccfec57c00987"));
const createSubjectFn = createServerFn().validator((data) => data).handler(createSsrRpc("aece1b4106b8589059d9d6b49a1d7589878e13766766209cce51f7aa5c911735"));
const updateSubjectFn = createServerFn().validator((data) => data).handler(createSsrRpc("1b94285088d192c8f7b0bc0a637b6477d2d8c54fd78da463e7b12260d3016f3e"));
const deleteSubjectFn = createServerFn().validator((data) => data).handler(createSsrRpc("5933a61ab511e82b12da3ce9c5121484fe0d4559b228edcb87f8b1485bec8c46"));
function MapelPage() {
  const {
    token
  } = useAuth();
  const qc = useQueryClient();
  const [filterKelas, setFilterKelas] = reactExports.useState("1");
  const [editId, setEditId] = reactExports.useState(null);
  const [editForm, setEditForm] = reactExports.useState({
    name: "",
    bobotTugas: "",
    bobotUts: "",
    bobotUas: ""
  });
  const [addForm, setAddForm] = reactExports.useState({
    name: "",
    bobotTugas: "0.3",
    bobotUts: "0.3",
    bobotUas: "0.4"
  });
  const {
    data: subjects
  } = useQuery({
    queryKey: ["subjects", filterKelas],
    queryFn: () => getSubjectsFn({
      data: {
        classLevel: Number(filterKelas)
      }
    })
  });
  const createMut = useMutation({
    mutationFn: () => createSubjectFn({
      data: {
        token,
        name: addForm.name,
        classLevel: Number(filterKelas),
        bobotTugas: Number(addForm.bobotTugas),
        bobotUts: Number(addForm.bobotUts),
        bobotUas: Number(addForm.bobotUas)
      }
    }),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["subjects"]
      });
      setAddForm({
        name: "",
        bobotTugas: "0.3",
        bobotUts: "0.3",
        bobotUas: "0.4"
      });
      toast.success("Mata pelajaran ditambahkan");
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Gagal menambahkan mata pelajaran")
  });
  const updateMut = useMutation({
    mutationFn: (subjectId) => updateSubjectFn({
      data: {
        token,
        subjectId,
        name: editForm.name || void 0,
        bobotTugas: editForm.bobotTugas !== "" ? Number(editForm.bobotTugas) : void 0,
        bobotUts: editForm.bobotUts !== "" ? Number(editForm.bobotUts) : void 0,
        bobotUas: editForm.bobotUas !== "" ? Number(editForm.bobotUas) : void 0
      }
    }),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["subjects"]
      });
      setEditId(null);
      toast.success("Mata pelajaran diperbarui");
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Gagal memperbarui")
  });
  const deleteMut = useMutation({
    mutationFn: (subjectId) => deleteSubjectFn({
      data: {
        token,
        subjectId
      }
    }),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["subjects"]
      });
      toast.success("Mata pelajaran dinonaktifkan");
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Gagal menonaktifkan")
  });
  function startEdit(s) {
    setEditId(s.id);
    setEditForm({
      name: s.name ?? "",
      bobotTugas: String(s.bobot_tugas ?? 0.3),
      bobotUts: String(s.bobot_uts ?? 0.3),
      bobotUas: String(s.bobot_uas ?? 0.4)
    });
  }
  const totalBobot = Number(addForm.bobotTugas) + Number(addForm.bobotUts) + Number(addForm.bobotUas);
  const editTotal = editId ? Number(editForm.bobotTugas) + Number(editForm.bobotUts) + Number(editForm.bobotUas) : 1;
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-6 max-w-5xl", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "text-2xl font-bold tracking-tight", children: "Mata Pelajaran" }, void 0, false, {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
      lineNumber: 116,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
      lineNumber: 115,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Card, { className: "shadow-none border-0 bg-transparent", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardHeader, { className: "px-0", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardTitle, { className: "text-xl", children: "Manajemen Mata Pelajaran" }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
          lineNumber: 121,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Label, { className: "text-xs", children: "Kelas:" }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
            lineNumber: 123,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Select, { value: filterKelas, onValueChange: setFilterKelas, children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectTrigger, { className: "h-8 w-24", id: "filter-kelas-mapel", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectValue, {}, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
              lineNumber: 125,
              columnNumber: 77
            }, this) }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
              lineNumber: 125,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectContent, { children: [1, 2, 3, 4, 5].map((k) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectItem, { value: String(k), children: [
              "Kelas ",
              k
            ] }, k, true, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
              lineNumber: 127,
              columnNumber: 45
            }, this)) }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
              lineNumber: 126,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
            lineNumber: 124,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
          lineNumber: 122,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
        lineNumber: 120,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
        lineNumber: 119,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardContent, { className: "space-y-6 px-0", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "rounded-xl border p-5 bg-card space-y-4", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-sm font-semibold", children: [
            "Tambah Mata Pelajaran — Kelas ",
            filterKelas
          ] }, void 0, true, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
            lineNumber: 136,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid md:grid-cols-4 gap-4", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "md:col-span-1 space-y-1.5", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Label, { className: "text-xs", children: "Nama Mapel" }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
                lineNumber: 139,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Input, { id: "add-mapel-name", value: addForm.name, onChange: (e) => setAddForm((p) => ({
                ...p,
                name: e.target.value
              })), placeholder: "Nama mata pelajaran" }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
                lineNumber: 140,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
              lineNumber: 138,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Label, { className: "text-xs", children: "Bobot Tugas" }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
                lineNumber: 146,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Input, { id: "add-bobot-tugas", type: "number", min: 0, max: 1, step: 0.05, value: addForm.bobotTugas, onChange: (e) => setAddForm((p) => ({
                ...p,
                bobotTugas: e.target.value
              })) }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
                lineNumber: 147,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
              lineNumber: 145,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Label, { className: "text-xs", children: "Bobot UTS" }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
                lineNumber: 153,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Input, { id: "add-bobot-uts", type: "number", min: 0, max: 1, step: 0.05, value: addForm.bobotUts, onChange: (e) => setAddForm((p) => ({
                ...p,
                bobotUts: e.target.value
              })) }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
                lineNumber: 154,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
              lineNumber: 152,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Label, { className: "text-xs", children: "Bobot UAS" }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
                lineNumber: 160,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Input, { id: "add-bobot-uas", type: "number", min: 0, max: 1, step: 0.05, value: addForm.bobotUas, onChange: (e) => setAddForm((p) => ({
                ...p,
                bobotUas: e.target.value
              })) }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
                lineNumber: 161,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
              lineNumber: 159,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
            lineNumber: 137,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { onClick: () => createMut.mutate(), disabled: !addForm.name || Math.abs(totalBobot - 1) > 0.01 || createMut.isPending, className: "bg-emerald-600 hover:bg-emerald-500", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Plus, { className: "h-4 w-4 mr-1.5" }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
                lineNumber: 169,
                columnNumber: 17
              }, this),
              "Tambah Mapel"
            ] }, void 0, true, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
              lineNumber: 168,
              columnNumber: 15
            }, this),
            Math.abs(totalBobot - 1) > 0.01 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm font-medium text-red-500", children: [
              "Total bobot harus tepat 1.0 (saat ini: ",
              totalBobot.toFixed(2),
              ")"
            ] }, void 0, true, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
              lineNumber: 172,
              columnNumber: 51
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
            lineNumber: 167,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
          lineNumber: 135,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "rounded-md border", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Table, { children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableHeader, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableRow, { children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableHead, { children: "Nama Mapel" }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
              lineNumber: 181,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableHead, { className: "text-center", children: "Bobot Tugas" }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
              lineNumber: 182,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableHead, { className: "text-center", children: "Bobot UTS" }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
              lineNumber: 183,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableHead, { className: "text-center", children: "Bobot UAS" }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
              lineNumber: 184,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableHead, { className: "text-right", children: "Aksi" }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
              lineNumber: 185,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
            lineNumber: 180,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
            lineNumber: 179,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableBody, { children: [
            (subjects ?? []).map((s) => editId === s.id ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableRow, { className: "bg-muted/30", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableCell, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Input, { id: `edit-name-${s.id}`, value: editForm.name, onChange: (e) => setEditForm((p) => ({
                ...p,
                name: e.target.value
              })), className: "h-8 min-w-32" }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
                lineNumber: 191,
                columnNumber: 25
              }, this) }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
                lineNumber: 190,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableCell, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Input, { id: `edit-bt-${s.id}`, type: "number", min: 0, max: 1, step: 0.05, value: editForm.bobotTugas, onChange: (e) => setEditForm((p) => ({
                ...p,
                bobotTugas: e.target.value
              })), className: "h-8 w-20 mx-auto" }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
                lineNumber: 197,
                columnNumber: 25
              }, this) }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
                lineNumber: 196,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableCell, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Input, { id: `edit-bu-${s.id}`, type: "number", min: 0, max: 1, step: 0.05, value: editForm.bobotUts, onChange: (e) => setEditForm((p) => ({
                ...p,
                bobotUts: e.target.value
              })), className: "h-8 w-20 mx-auto" }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
                lineNumber: 203,
                columnNumber: 25
              }, this) }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
                lineNumber: 202,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableCell, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Input, { id: `edit-buas-${s.id}`, type: "number", min: 0, max: 1, step: 0.05, value: editForm.bobotUas, onChange: (e) => setEditForm((p) => ({
                ...p,
                bobotUas: e.target.value
              })), className: "h-8 w-20 mx-auto" }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
                lineNumber: 209,
                columnNumber: 25
              }, this) }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
                lineNumber: 208,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableCell, { className: "text-right space-x-1 min-w-32", children: [
                Math.abs(editTotal - 1) > 0.01 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-[10px] text-red-500 mb-1", children: "Total ≠ 1" }, void 0, false, {
                  fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
                  lineNumber: 215,
                  columnNumber: 60
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { size: "sm", onClick: () => updateMut.mutate(s.id), disabled: updateMut.isPending || Math.abs(editTotal - 1) > 0.01, className: "bg-emerald-600 hover:bg-emerald-500", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Save, { className: "h-3.5 w-3.5" }, void 0, false, {
                  fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
                  lineNumber: 217,
                  columnNumber: 27
                }, this) }, void 0, false, {
                  fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
                  lineNumber: 216,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { size: "sm", variant: "outline", onClick: () => setEditId(null), children: "✕" }, void 0, false, {
                  fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
                  lineNumber: 219,
                  columnNumber: 25
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
                lineNumber: 214,
                columnNumber: 23
              }, this)
            ] }, s.id, true, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
              lineNumber: 189,
              columnNumber: 62
            }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableRow, { children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableCell, { className: "font-medium", children: s.name }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
                lineNumber: 222,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableCell, { className: "text-center", children: [
                Math.round(Number(s.bobot_tugas) * 100),
                "%"
              ] }, void 0, true, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
                lineNumber: 223,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableCell, { className: "text-center", children: [
                Math.round(Number(s.bobot_uts) * 100),
                "%"
              ] }, void 0, true, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
                lineNumber: 224,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableCell, { className: "text-center", children: [
                Math.round(Number(s.bobot_uas) * 100),
                "%"
              ] }, void 0, true, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
                lineNumber: 225,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableCell, { className: "text-right space-x-1", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { size: "sm", variant: "outline", onClick: () => startEdit(s), children: "Edit" }, void 0, false, {
                  fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
                  lineNumber: 227,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(AlertDialog, { children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { size: "sm", variant: "outline", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Trash2, { className: "h-3.5 w-3.5" }, void 0, false, {
                    fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
                    lineNumber: 230,
                    columnNumber: 65
                  }, this) }, void 0, false, {
                    fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
                    lineNumber: 230,
                    columnNumber: 29
                  }, this) }, void 0, false, {
                    fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
                    lineNumber: 229,
                    columnNumber: 27
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(AlertDialogContent, { children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(AlertDialogHeader, { children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(AlertDialogTitle, { children: [
                        "Nonaktifkan ",
                        s.name,
                        "?"
                      ] }, void 0, true, {
                        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
                        lineNumber: 234,
                        columnNumber: 31
                      }, this),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(AlertDialogDescription, { children: "Mata pelajaran akan dinonaktifkan dan tidak muncul di input nilai." }, void 0, false, {
                        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
                        lineNumber: 235,
                        columnNumber: 31
                      }, this)
                    ] }, void 0, true, {
                      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
                      lineNumber: 233,
                      columnNumber: 29
                    }, this),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(AlertDialogFooter, { children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(AlertDialogCancel, { children: "Batal" }, void 0, false, {
                        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
                        lineNumber: 238,
                        columnNumber: 31
                      }, this),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(AlertDialogAction, { className: "bg-red-600", onClick: () => deleteMut.mutate(s.id), children: "Nonaktifkan" }, void 0, false, {
                        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
                        lineNumber: 239,
                        columnNumber: 31
                      }, this)
                    ] }, void 0, true, {
                      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
                      lineNumber: 237,
                      columnNumber: 29
                    }, this)
                  ] }, void 0, true, {
                    fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
                    lineNumber: 232,
                    columnNumber: 27
                  }, this)
                ] }, void 0, true, {
                  fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
                  lineNumber: 228,
                  columnNumber: 25
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
                lineNumber: 226,
                columnNumber: 23
              }, this)
            ] }, s.id, true, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
              lineNumber: 221,
              columnNumber: 35
            }, this)),
            (subjects ?? []).length === 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableRow, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableCell, { colSpan: 5, className: "text-center text-muted-foreground py-6", children: "Belum ada mata pelajaran untuk kelas ini." }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
              lineNumber: 246,
              columnNumber: 21
            }, this) }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
              lineNumber: 245,
              columnNumber: 51
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
            lineNumber: 188,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
          lineNumber: 178,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
          lineNumber: 177,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
        lineNumber: 133,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
      lineNumber: 118,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.admin.mapel.tsx?tsr-split=component",
    lineNumber: 114,
    columnNumber: 10
  }, this);
}
export {
  MapelPage as component
};
