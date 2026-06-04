import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { L as Link } from "./_libs/tanstack__react-router.mjs";
import { C as Card, c as CardHeader, d as CardTitle, a as CardContent } from "./_ssr/card-uop7ST8s.mjs";
import { B as Button } from "./_ssr/button-DA2gxxPy.mjs";
import { I as Input } from "./_ssr/input-C0QjszdI.mjs";
import { L as Label } from "./_ssr/label-JU3yqRBo.mjs";
import { B as Badge } from "./_ssr/badge-DyfXZgLs.mjs";
import { S as Separator } from "./_ssr/separator-DGgIueqr.mjs";
import { T as Table, d as TableHeader, e as TableRow, c as TableHead, a as TableBody, b as TableCell } from "./_ssr/table-DhIrzwGX.mjs";
import { A as AlertDialog, h as AlertDialogTrigger, c as AlertDialogContent, f as AlertDialogHeader, g as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, b as AlertDialogCancel, a as AlertDialogAction } from "./_ssr/alert-dialog-BrzSSKxW.mjs";
import { S as Select, c as SelectTrigger, d as SelectValue, a as SelectContent, b as SelectItem } from "./_ssr/select-NX1S2Qd-.mjs";
import { u as utils, w as writeFileSync, r as readSync } from "./_libs/xlsx.mjs";
import { j as jsPDF } from "./_libs/jspdf.mjs";
import { a as autoTable } from "./_libs/jspdf-autotable.mjs";
import { t as toast } from "./_libs/sonner.mjs";
import { b as useQueryClient, a as useQuery, u as useMutation } from "./_libs/tanstack__react-query.mjs";
import { u as useAuth } from "./_ssr/use-auth-YByzSFug.mjs";
import { f as fetchBackend } from "./_ssr/fetch-helper-D3HnH3aE.mjs";
import { g as getAcademicYearsFn } from "./_ssr/academic-years.functions-zJEmoTzy.mjs";
import { a as getRombelsFn } from "./_ssr/classes.functions-Q6R6FZ_h.mjs";
import { A as ArrowLeft, c as ChevronRight, S as Save, X, T as Trash2, p as Search, D as Download, U as Upload, h as FileSpreadsheet, i as FileText, u as UserPlus } from "./_libs/lucide-react.mjs";
import "./_libs/tanstack__router-core.mjs";
import "./_libs/tanstack__history.mjs";
import "./_libs/cookie-es.mjs";
import "./_libs/seroval.mjs";
import "./_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "./_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./_libs/isbot.mjs";
import "./_ssr/utils-H80jjgLf.mjs";
import "./_libs/clsx.mjs";
import "./_libs/tailwind-merge.mjs";
import "./_libs/radix-ui__react-slot.mjs";
import "./_libs/radix-ui__react-compose-refs.mjs";
import "./_libs/class-variance-authority.mjs";
import "./_libs/radix-ui__react-label.mjs";
import "./_libs/radix-ui__react-primitive.mjs";
import "./_libs/radix-ui__react-separator.mjs";
import "./_libs/radix-ui__react-alert-dialog.mjs";
import "./_libs/radix-ui__react-context.mjs";
import "./_libs/radix-ui__react-dialog.mjs";
import "./_libs/radix-ui__primitive.mjs";
import "./_libs/radix-ui__react-id.mjs";
import "./_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "./_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "./_libs/@radix-ui/react-dismissable-layer+[...].mjs";
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
import "./_libs/radix-ui__react-select.mjs";
import "./_libs/radix-ui__number.mjs";
import "./_libs/radix-ui__react-collection.mjs";
import "./_libs/radix-ui__react-direction.mjs";
import "./_libs/radix-ui__react-popper.mjs";
import "./_libs/floating-ui__react-dom.mjs";
import "./_libs/floating-ui__dom.mjs";
import "./_libs/floating-ui__core.mjs";
import "./_libs/floating-ui__utils.mjs";
import "./_libs/radix-ui__react-arrow.mjs";
import "./_libs/radix-ui__react-use-size.mjs";
import "./_libs/radix-ui__react-use-previous.mjs";
import "./_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "fs";
import "path";
import "./_libs/fflate.mjs";
import "./_libs/fast-png.mjs";
import "./_libs/iobuffer.mjs";
import "./_libs/pako.mjs";
import "./_libs/html2canvas.mjs";
import "./_libs/dompurify.mjs";
import "./_libs/canvg.mjs";
import "./_libs/core-js.mjs";
import "./_libs/babel__runtime.mjs";
import "./_libs/raf.mjs";
import "./_libs/performance-now.mjs";
import "./_libs/rgbcolor.mjs";
import "./_libs/svg-pathdata.mjs";
import "./_libs/stackblur-canvas.mjs";
import "./_libs/tanstack__query-core.mjs";
const getStudentsFn = async ({ data }) => {
  return fetchBackend("/api/students", { body: data });
};
const createStudentFn = async ({ data }) => {
  return fetchBackend("/api/students/create", { body: data });
};
const updateStudentFn = async ({ data }) => {
  return fetchBackend("/api/students/update", { body: data });
};
const deleteStudentFn = async ({ data }) => {
  return fetchBackend("/api/students/delete", { body: data });
};
const bulkDeleteStudentsFn = async ({ data }) => {
  return fetchBackend("/api/students/bulk-delete", { body: data });
};
const EMPTY_FORM = {
  stambuk: "",
  fullName: "",
  gender: "L",
  birthPlace: "",
  birthDate: "",
  parentName: "",
  address: "",
  entryYear: "",
  status: "Aktif",
  rombelId: "",
  academicYearId: ""
};
function SantriPage() {
  const {
    token
  } = useAuth();
  const qc = useQueryClient();
  const [view, setView] = reactExports.useState("list");
  const [editId, setEditId] = reactExports.useState(null);
  const [q, setQ] = reactExports.useState("");
  const [page, setPage] = reactExports.useState(1);
  const [selectedIds, setSelectedIds] = reactExports.useState([]);
  const [form, setForm] = reactExports.useState(EMPTY_FORM);
  const {
    data: years
  } = useQuery({
    queryKey: ["academic-years"],
    queryFn: () => getAcademicYearsFn(),
    enabled: !!token
  });
  const activeYear = years?.find((y) => y.is_active);
  const {
    data: rombels
  } = useQuery({
    queryKey: ["rombels"],
    queryFn: () => getRombelsFn({
      data: {}
    }),
    enabled: !!token
  });
  const {
    data: studentsRes,
    isLoading
  } = useQuery({
    queryKey: ["students", activeYear?.id, q],
    // removed page dependency
    queryFn: () => getStudentsFn({
      data: {
        token,
        academicYearId: activeYear?.id,
        q: q || void 0,
        page: 1,
        limit: 999999
      }
    }),
    enabled: !!token && !!activeYear
  });
  const allStudents = studentsRes?.data ?? [];
  const totalStudents = allStudents.length;
  const totalPages = Math.ceil(totalStudents / 20);
  const students = allStudents.slice((page - 1) * 20, page * 20);
  const createMut = useMutation({
    mutationFn: (d) => createStudentFn({
      data: {
        token,
        ...d
      }
    }),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["students"]
      });
      toast.success("Santri berhasil ditambahkan");
      setView("list");
      setForm(EMPTY_FORM);
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Gagal")
  });
  const updateMut = useMutation({
    mutationFn: (d) => updateStudentFn({
      data: {
        token,
        studentId: editId,
        ...d
      }
    }),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["students"]
      });
      toast.success("Data santri diperbarui");
      setView("list");
      setEditId(null);
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Gagal")
  });
  const deleteMut = useMutation({
    mutationFn: (id) => deleteStudentFn({
      data: {
        token,
        studentId: id
      }
    }),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["students"]
      });
      toast.success("Santri dihapus");
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Gagal")
  });
  const bulkDeleteMut = useMutation({
    mutationFn: (ids) => bulkDeleteStudentsFn({
      data: {
        token,
        studentIds: ids
      }
    }),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["students"]
      });
      toast.success("Santri terpilih berhasil dihapus");
      setSelectedIds([]);
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Gagal")
  });
  function startEdit(s) {
    setEditId(s.id);
    setForm({
      stambuk: s.stambuk ?? "",
      fullName: s.full_name ?? "",
      gender: s.gender ?? "L",
      birthPlace: s.birth_place ?? "",
      birthDate: s.birth_date ? String(s.birth_date).slice(0, 10) : "",
      parentName: s.parent_name ?? "",
      address: s.address ?? "",
      entryYear: s.entry_year ?? "",
      status: s.status ?? "Aktif",
      rombelId: s.rombel_id ?? "",
      academicYearId: activeYear?.id ?? ""
    });
    setView("edit");
  }
  function handleSave() {
    if (!form.stambuk || !form.fullName) {
      toast.error("Stambuk dan nama wajib diisi");
      return;
    }
    if (view === "add") {
      createMut.mutate({
        ...form,
        academicYearId: activeYear?.id ?? ""
      });
    } else {
      updateMut.mutate(form);
    }
  }
  const setF = reactExports.useCallback((key, value) => setForm((prev) => ({
    ...prev,
    [key]: value
  })), []);
  function exportExcel() {
    const data = allStudents.map((s) => ({
      Stambuk: s.stambuk,
      "Nama Lengkap": s.full_name,
      "Jenis Kelamin": s.gender,
      "Kelas": s.class_level != null ? `Kelas ${s.class_level}${s.rombel_name}` : "",
      "Status": s.status
    }));
    const ws = utils.json_to_sheet(data);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Data Santri");
    writeFileSync(wb, "Data_Santri.xlsx");
  }
  function downloadTemplate() {
    const ws = utils.json_to_sheet([{
      "Stambuk": "2025001",
      "Nama Lengkap": "Ahmad Dani",
      "Jenis Kelamin": "L",
      "Tempat Lahir": "Pekanbaru",
      "Tanggal Lahir": "2010-01-01",
      "Nama Orang Tua": "Bapak Budi",
      "Alamat": "Jl. Merdeka",
      "Tahun Masuk": "2025",
      "Status": "Aktif"
    }]);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Template Santri");
    writeFileSync(wb, "Template_Import_Santri.xlsx");
  }
  function handleImport(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (evt) => {
      const bstr = evt.target?.result;
      const wb = readSync(bstr, {
        type: "binary"
      });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = utils.sheet_to_json(ws);
      let success = 0;
      toast.info("Mengimpor data, mohon tunggu...");
      for (const row of data) {
        try {
          await createMut.mutateAsync({
            stambuk: String(row["Stambuk"] ?? ""),
            fullName: row["Nama Lengkap"] ?? "",
            gender: row["Jenis Kelamin"] === "P" ? "P" : "L",
            birthPlace: row["Tempat Lahir"] ?? "",
            birthDate: row["Tanggal Lahir"] ? String(row["Tanggal Lahir"]) : "",
            parentName: row["Nama Orang Tua"] ?? "",
            address: row["Alamat"] ?? "",
            entryYear: String(row["Tahun Masuk"] ?? ""),
            status: row["Status"] ?? "Aktif",
            rombelId: "",
            academicYearId: activeYear?.id ?? ""
          });
          success++;
        } catch (err) {
          console.error(err);
        }
      }
      toast.success(`Berhasil mengimpor ${success} data santri`);
      qc.invalidateQueries({
        queryKey: ["students"]
      });
    };
    reader.readAsBinaryString(file);
  }
  function toggleSelectAll() {
    if (selectedIds.length === students.length && students.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(students.map((s) => s.id));
    }
  }
  function toggleSelect(id) {
    setSelectedIds((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  }
  function handleBulkDelete() {
    if (confirm(`Yakin ingin menghapus ${selectedIds.length} santri terpilih?`)) {
      bulkDeleteMut.mutate(selectedIds);
    }
  }
  function exportPDF() {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Daftar Santri", 14, 22);
    doc.setFontSize(10);
    doc.text(`Tahun Ajaran: ${activeYear?.year || "-"}`, 14, 30);
    doc.text(`Total: ${totalStudents} santri`, 14, 35);
    autoTable(doc, {
      startY: 40,
      head: [["Stambuk", "Nama Lengkap", "L/P", "Kelas", "Status"]],
      body: allStudents.map((s) => [s.stambuk, s.full_name, s.gender, s.class_level != null ? `Kelas ${s.class_level}${s.rombel_name}` : "-", s.status])
    });
    doc.save("Data_Santri.pdf");
  }
  const rombelOptions = rombels ?? [];
  if (view === "add" || view === "edit") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", onClick: () => {
          setView("list");
          setEditId(null);
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4 mr-1.5" }),
          "Kembali"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: view === "add" ? "Tambah Santri Baru" : "Edit Data Santri" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: view === "add" ? "Data Santri Baru" : `Edit: ${form.fullName}` }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide", children: "Identitas" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Stambuk *", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "stambuk", value: form.stambuk, onChange: (e) => setF("stambuk", e.target.value), placeholder: "e.g. 2025001" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Nama Lengkap *", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "fullName", value: form.fullName, onChange: (e) => setF("fullName", e.target.value), placeholder: "Nama lengkap santri" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Jenis Kelamin", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: form.gender, onValueChange: (v) => setF("gender", v), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "gender", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "L", children: "Laki-laki" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "P", children: "Perempuan" })
                ] })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Status", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: form.status, onValueChange: (v) => setF("status", v), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "status", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Aktif", children: "Aktif" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Alumni", children: "Alumni" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Pindah", children: "Pindah" })
                ] })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Tempat Lahir", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "birthPlace", value: form.birthPlace, onChange: (e) => setF("birthPlace", e.target.value), placeholder: "Kota kelahiran" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Tanggal Lahir", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "birthDate", type: "date", value: form.birthDate, onChange: (e) => setF("birthDate", e.target.value) }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide", children: "Keluarga" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Nama Orang Tua / Wali", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "parentName", value: form.parentName, onChange: (e) => setF("parentName", e.target.value), placeholder: "Nama orang tua" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Tahun Masuk", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "entryYear", value: form.entryYear, onChange: (e) => setF("entryYear", e.target.value), placeholder: "e.g. 2025" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Alamat", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "address", value: form.address, onChange: (e) => setF("address", e.target.value), placeholder: "Alamat lengkap" }) }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide", children: [
              "Penempatan Kelas (",
              activeYear?.year,
              ")"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Rombel", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: form.rombelId, onValueChange: (v) => setF("rombelId", v), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "rombelId", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Pilih rombel" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: rombelOptions.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: r.id, children: [
                "Kelas ",
                r.class_level,
                r.name
              ] }, r.id)) })
            ] }) }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleSave, disabled: createMut.isPending || updateMut.isPending, className: "bg-emerald-600 hover:bg-emerald-500", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4 mr-2" }),
              createMut.isPending || updateMut.isPending ? "Menyimpan..." : "Simpan"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: () => {
              setView("list");
              setEditId(null);
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4 mr-2" }),
              "Batal"
            ] })
          ] })
        ] })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-none", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between gap-3 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Daftar Santri" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
          activeYear?.year,
          " · Total: ",
          totalStudents,
          " santri"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
        selectedIds.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "destructive", onClick: handleBulkDelete, disabled: bulkDeleteMut.isPending, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 mr-2" }),
          "Hapus Terpilih (",
          selectedIds.length,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "search-santri", placeholder: "Cari nama / stambuk", className: "pl-8 w-48", value: q, onChange: (e) => {
            setQ(e.target.value);
            setPage(1);
          } })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: downloadTemplate, title: "Download Template Excel", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4 mr-2" }),
          " Template"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "file", accept: ".xlsx, .xls", onChange: handleImport, className: "absolute inset-0 opacity-0 cursor-pointer w-full", title: "Import Data Excel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-4 w-4 mr-2" }),
            " Import"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: exportExcel, className: "text-green-700 hover:text-green-800 border-green-200 bg-green-50 hover:bg-green-100", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileSpreadsheet, { className: "h-4 w-4 mr-2" }),
          " Excel"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: exportPDF, className: "text-red-700 hover:text-red-800 border-red-200 bg-red-50 hover:bg-red-100", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4 mr-2" }),
          " PDF"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => {
          setForm(EMPTY_FORM);
          setView("add");
        }, className: "bg-emerald-600 hover:bg-emerald-500", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "h-4 w-4 mr-2" }),
          "Tambah"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "w-12 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", className: "rounded border-gray-300", checked: students.length > 0 && selectedIds.length === students.length, onChange: toggleSelectAll }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Stambuk" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Nama" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "JK" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Kelas" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Aksi" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TableBody, { children: [
          isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 6, className: "text-center text-muted-foreground py-8", children: "Memuat data..." }) }),
          !isLoading && students.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 7, className: "text-center text-muted-foreground py-8", children: "Tidak ada santri ditemukan." }) }),
          students.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", className: "rounded border-gray-300", checked: selectedIds.includes(s.id), onChange: () => toggleSelect(s.id) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-mono text-xs", children: s.stambuk }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: s.full_name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: s.gender === "L" ? "L" : "P" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: s.class_level != null ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", children: [
              "Kelas ",
              s.class_level,
              s.rombel_name
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "—" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: s.status === "Aktif" ? "default" : "outline", className: s.status === "Aktif" ? "bg-emerald-600" : "", children: s.status }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "text-right space-x-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", onClick: () => startEdit(s), children: "Edit" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/rapor", search: {
                studentId: s.id,
                yearId: activeYear?.id
              }, children: "Rapor" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Hapus santri?" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
                      "Data santri ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: s.full_name }),
                      " dan seluruh nilai terkait akan dihapus secara permanen."
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "Batal" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { className: "bg-red-600 hover:bg-red-500", onClick: () => deleteMut.mutate(s.id), children: "Hapus" })
                  ] })
                ] })
              ] })
            ] })
          ] }, s.id))
        ] })
      ] }),
      totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-4 border-t mt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
          "Menampilkan halaman ",
          page,
          " dari ",
          totalPages
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", onClick: () => setPage((p) => Math.max(1, p - 1)), disabled: page === 1, children: "Kembali" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", onClick: () => setPage((p) => Math.min(totalPages, p + 1)), disabled: page === totalPages, children: "Lanjut" })
        ] })
      ] })
    ] })
  ] });
}
function Field({
  label,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-medium", children: label }),
    children
  ] });
}
export {
  SantriPage as component
};
