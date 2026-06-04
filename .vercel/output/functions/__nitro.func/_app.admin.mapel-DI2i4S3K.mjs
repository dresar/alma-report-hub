import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { C as Card, c as CardHeader, d as CardTitle, a as CardContent } from "./_ssr/card-uop7ST8s.mjs";
import { B as Button } from "./_ssr/button-DA2gxxPy.mjs";
import { I as Input } from "./_ssr/input-C0QjszdI.mjs";
import { L as Label } from "./_ssr/label-JU3yqRBo.mjs";
import { S as Select, c as SelectTrigger, d as SelectValue, a as SelectContent, b as SelectItem } from "./_ssr/select-NX1S2Qd-.mjs";
import { T as Table, d as TableHeader, e as TableRow, c as TableHead, a as TableBody, b as TableCell } from "./_ssr/table-DhIrzwGX.mjs";
import { A as AlertDialog, h as AlertDialogTrigger, c as AlertDialogContent, f as AlertDialogHeader, g as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, b as AlertDialogCancel, a as AlertDialogAction } from "./_ssr/alert-dialog-BrzSSKxW.mjs";
import { t as toast } from "./_libs/sonner.mjs";
import { b as useQueryClient, a as useQuery, u as useMutation } from "./_libs/tanstack__react-query.mjs";
import { u as useAuth } from "./_ssr/use-auth-YByzSFug.mjs";
import { f as fetchBackend } from "./_ssr/fetch-helper-D3HnH3aE.mjs";
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
const getSubjectsFn = async ({ data }) => {
  return fetchBackend("/api/subjects", { body: data });
};
const createSubjectFn = async ({ data }) => {
  return fetchBackend("/api/subjects/create", { body: data });
};
const updateSubjectFn = async ({ data }) => {
  return fetchBackend("/api/subjects/update", { body: data });
};
const deleteSubjectFn = async ({ data }) => {
  return fetchBackend("/api/subjects/delete", { body: data });
};
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-5xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold tracking-tight", children: "Mata Pelajaran" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-none border-0 bg-transparent", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "px-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-xl", children: "Manajemen Mata Pelajaran" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Kelas:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: filterKelas, onValueChange: setFilterKelas, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-8 w-24", id: "filter-kelas-mapel", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: [1, 2, 3, 4, 5].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: String(k), children: [
              "Kelas ",
              k
            ] }, k)) })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-6 px-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border p-5 bg-card space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold", children: [
            "Tambah Mata Pelajaran — Kelas ",
            filterKelas
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-4 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-1 space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Nama Mapel" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "add-mapel-name", value: addForm.name, onChange: (e) => setAddForm((p) => ({
                ...p,
                name: e.target.value
              })), placeholder: "Nama mata pelajaran" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Bobot Tugas" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "add-bobot-tugas", type: "number", min: 0, max: 1, step: 0.05, value: addForm.bobotTugas, onChange: (e) => setAddForm((p) => ({
                ...p,
                bobotTugas: e.target.value
              })) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Bobot UTS" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "add-bobot-uts", type: "number", min: 0, max: 1, step: 0.05, value: addForm.bobotUts, onChange: (e) => setAddForm((p) => ({
                ...p,
                bobotUts: e.target.value
              })) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Bobot UAS" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "add-bobot-uas", type: "number", min: 0, max: 1, step: 0.05, value: addForm.bobotUas, onChange: (e) => setAddForm((p) => ({
                ...p,
                bobotUas: e.target.value
              })) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => createMut.mutate(), disabled: !addForm.name || Math.abs(totalBobot - 1) > 0.01 || createMut.isPending, className: "bg-emerald-600 hover:bg-emerald-500", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-1.5" }),
              "Tambah Mapel"
            ] }),
            Math.abs(totalBobot - 1) > 0.01 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-red-500", children: [
              "Total bobot harus tepat 1.0 (saat ini: ",
              totalBobot.toFixed(2),
              ")"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-md border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Nama Mapel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-center", children: "Bobot Tugas" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-center", children: "Bobot UTS" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-center", children: "Bobot UAS" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Aksi" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TableBody, { children: [
            (subjects ?? []).map((s) => editId === s.id ? /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "bg-muted/30", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: `edit-name-${s.id}`, value: editForm.name, onChange: (e) => setEditForm((p) => ({
                ...p,
                name: e.target.value
              })), className: "h-8 min-w-32" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: `edit-bt-${s.id}`, type: "number", min: 0, max: 1, step: 0.05, value: editForm.bobotTugas, onChange: (e) => setEditForm((p) => ({
                ...p,
                bobotTugas: e.target.value
              })), className: "h-8 w-20 mx-auto" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: `edit-bu-${s.id}`, type: "number", min: 0, max: 1, step: 0.05, value: editForm.bobotUts, onChange: (e) => setEditForm((p) => ({
                ...p,
                bobotUts: e.target.value
              })), className: "h-8 w-20 mx-auto" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: `edit-buas-${s.id}`, type: "number", min: 0, max: 1, step: 0.05, value: editForm.bobotUas, onChange: (e) => setEditForm((p) => ({
                ...p,
                bobotUas: e.target.value
              })), className: "h-8 w-20 mx-auto" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "text-right space-x-1 min-w-32", children: [
                Math.abs(editTotal - 1) > 0.01 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-red-500 mb-1", children: "Total ≠ 1" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", onClick: () => updateMut.mutate(s.id), disabled: updateMut.isPending || Math.abs(editTotal - 1) > 0.01, className: "bg-emerald-600 hover:bg-emerald-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-3.5 w-3.5" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", onClick: () => setEditId(null), children: "✕" })
              ] })
            ] }, s.id) : /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: s.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "text-center", children: [
                Math.round(Number(s.bobot_tugas) * 100),
                "%"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "text-center", children: [
                Math.round(Number(s.bobot_uts) * 100),
                "%"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "text-center", children: [
                Math.round(Number(s.bobot_uas) * 100),
                "%"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "text-right space-x-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", onClick: () => startEdit(s), children: "Edit" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogTitle, { children: [
                        "Nonaktifkan ",
                        s.name,
                        "?"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "Mata pelajaran akan dinonaktifkan dan tidak muncul di input nilai." })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "Batal" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { className: "bg-red-600", onClick: () => deleteMut.mutate(s.id), children: "Nonaktifkan" })
                    ] })
                  ] })
                ] })
              ] })
            ] }, s.id)),
            (subjects ?? []).length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 5, className: "text-center text-muted-foreground py-6", children: "Belum ada mata pelajaran untuk kelas ini." }) })
          ] })
        ] }) })
      ] })
    ] })
  ] });
}
export {
  MapelPage as component
};
