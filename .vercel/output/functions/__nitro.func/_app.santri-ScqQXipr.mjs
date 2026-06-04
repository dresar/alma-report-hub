import { r as reactExports, j as jsxDevRuntimeExports } from "./_libs/react.mjs";
import { L as Link } from "./_libs/tanstack__react-router.mjs";
import { C as Card, c as CardHeader, d as CardTitle, a as CardContent } from "./_ssr/card-BhYvH4ns.mjs";
import { B as Button } from "./_ssr/button-CM0KjKCo.mjs";
import { I as Input } from "./_ssr/input-Dxdu6HuB.mjs";
import { L as Label } from "./_ssr/label-B5xHsmXM.mjs";
import { B as Badge } from "./_ssr/badge-DiP6vzkd.mjs";
import { S as Separator } from "./_ssr/separator-B72-6T1L.mjs";
import { T as Table, d as TableHeader, e as TableRow, c as TableHead, a as TableBody, b as TableCell } from "./_ssr/table-CTsyOdB_.mjs";
import { A as AlertDialog, h as AlertDialogTrigger, c as AlertDialogContent, f as AlertDialogHeader, g as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, b as AlertDialogCancel, a as AlertDialogAction } from "./_ssr/alert-dialog-Bdu3uy0P.mjs";
import { S as Select, c as SelectTrigger, d as SelectValue, a as SelectContent, b as SelectItem } from "./_ssr/select-WXuL3P7I.mjs";
import { u as utils, w as writeFileSync, r as readSync } from "./_libs/xlsx.mjs";
import { j as jsPDF } from "./_libs/jspdf.mjs";
import { a as autoTable } from "./_libs/jspdf-autotable.mjs";
import { t as toast } from "./_libs/sonner.mjs";
import { b as useQueryClient, a as useQuery, u as useMutation } from "./_libs/tanstack__react-query.mjs";
import { u as useAuth } from "./_ssr/use-auth-YByzSFug.mjs";
import { c as createSsrRpc } from "./_ssr/createSsrRpc-_V2Ptgae.mjs";
import { b as createServerFn } from "./_ssr/server-B2xBzUrm.mjs";
import { g as getAcademicYearsFn } from "./_ssr/academic-years-Ctlthb4h.mjs";
import { a as getRombelsFn } from "./_ssr/classes-CAswTOAP.mjs";
import "./_libs/seroval.mjs";
import { A as ArrowLeft, c as ChevronRight, S as Save, X, T as Trash2, p as Search, D as Download, U as Upload, h as FileSpreadsheet, i as FileText, u as UserPlus } from "./_libs/lucide-react.mjs";
import "./_libs/tanstack__router-core.mjs";
import "./_libs/tanstack__history.mjs";
import "./_libs/cookie-es.mjs";
import "./_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "./_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "crypto";
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
import "path";
import "./_libs/fflate.mjs";
import "./_libs/fast-png.mjs";
import "./_libs/iobuffer.mjs";
import "./_libs/pako.mjs";
import "fs";
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
import "node:async_hooks";
import "./_libs/h3-v2.mjs";
import "./_libs/rou3.mjs";
import "./_libs/srvx.mjs";
const getStudentsFn = createServerFn().validator((data) => data).handler(createSsrRpc("56300f58f9fb7e938424ac5ceb1f1083769c8f307dc880a8502761f31f5a8e81"));
createServerFn().validator((data) => data).handler(createSsrRpc("2df384382049059de678b08b145b958783927ddc6fd64689d235333acc72123e"));
const createStudentFn = createServerFn().validator((data) => data).handler(createSsrRpc("49fe1373250a2b8fa2c6be1fc9c71885412852f45d528bc0c44227082e325608"));
const updateStudentFn = createServerFn().validator((data) => data).handler(createSsrRpc("4871087c59dcb9d2cd00b3053af05dc2712008d66ae34d8134c13361dafe490e"));
const deleteStudentFn = createServerFn().validator((data) => data).handler(createSsrRpc("c83e26be213224fdaf501b8781170802760503714870bc72c43249cbfa3391e9"));
const bulkDeleteStudentsFn = createServerFn().validator((data) => data).handler(createSsrRpc("f7bfce5ccc4c949250cc58c49844701236f70ad5bb5613d073980d9486284db2"));
createServerFn().validator((data) => data).handler(createSsrRpc("3246a07ba8483bbbc0a01f2053f0b91a448c60de66255790967befd1e57c29f7"));
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
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "max-w-3xl space-y-6", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { variant: "ghost", size: "sm", onClick: () => {
          setView("list");
          setEditId(null);
        }, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ArrowLeft, { className: "h-4 w-4 mr-1.5" }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
            lineNumber: 308,
            columnNumber: 13
          }, this),
          "Kembali"
        ] }, void 0, true, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
          lineNumber: 304,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ChevronRight, { className: "h-4 w-4 text-muted-foreground" }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
          lineNumber: 311,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-sm font-medium", children: view === "add" ? "Tambah Santri Baru" : "Edit Data Santri" }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
          lineNumber: 312,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
        lineNumber: 303,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Card, { className: "shadow-none", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardHeader, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardTitle, { className: "text-base", children: view === "add" ? "Data Santri Baru" : `Edit: ${form.fullName}` }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
          lineNumber: 319,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
          lineNumber: 318,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardContent, { className: "space-y-6", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide", children: "Identitas" }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
              lineNumber: 326,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid md:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Field, { label: "Stambuk *", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Input, { id: "stambuk", value: form.stambuk, onChange: (e) => setF("stambuk", e.target.value), placeholder: "e.g. 2025001" }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
                lineNumber: 331,
                columnNumber: 19
              }, this) }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
                lineNumber: 330,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Field, { label: "Nama Lengkap *", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Input, { id: "fullName", value: form.fullName, onChange: (e) => setF("fullName", e.target.value), placeholder: "Nama lengkap santri" }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
                lineNumber: 334,
                columnNumber: 19
              }, this) }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
                lineNumber: 333,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Field, { label: "Jenis Kelamin", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Select, { value: form.gender, onValueChange: (v) => setF("gender", v), children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectTrigger, { id: "gender", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectValue, {}, void 0, false, {
                  fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
                  lineNumber: 338,
                  columnNumber: 48
                }, this) }, void 0, false, {
                  fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
                  lineNumber: 338,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectContent, { children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectItem, { value: "L", children: "Laki-laki" }, void 0, false, {
                    fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
                    lineNumber: 340,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectItem, { value: "P", children: "Perempuan" }, void 0, false, {
                    fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
                    lineNumber: 341,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
                  lineNumber: 339,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
                lineNumber: 337,
                columnNumber: 19
              }, this) }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
                lineNumber: 336,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Field, { label: "Status", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Select, { value: form.status, onValueChange: (v) => setF("status", v), children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectTrigger, { id: "status", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectValue, {}, void 0, false, {
                  fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
                  lineNumber: 347,
                  columnNumber: 48
                }, this) }, void 0, false, {
                  fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
                  lineNumber: 347,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectContent, { children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectItem, { value: "Aktif", children: "Aktif" }, void 0, false, {
                    fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
                    lineNumber: 349,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectItem, { value: "Alumni", children: "Alumni" }, void 0, false, {
                    fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
                    lineNumber: 350,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectItem, { value: "Pindah", children: "Pindah" }, void 0, false, {
                    fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
                    lineNumber: 351,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
                  lineNumber: 348,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
                lineNumber: 346,
                columnNumber: 19
              }, this) }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
                lineNumber: 345,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Field, { label: "Tempat Lahir", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Input, { id: "birthPlace", value: form.birthPlace, onChange: (e) => setF("birthPlace", e.target.value), placeholder: "Kota kelahiran" }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
                lineNumber: 356,
                columnNumber: 19
              }, this) }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
                lineNumber: 355,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Field, { label: "Tanggal Lahir", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Input, { id: "birthDate", type: "date", value: form.birthDate, onChange: (e) => setF("birthDate", e.target.value) }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
                lineNumber: 359,
                columnNumber: 19
              }, this) }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
                lineNumber: 358,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
              lineNumber: 329,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
            lineNumber: 325,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Separator, {}, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
            lineNumber: 364,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide", children: "Keluarga" }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
              lineNumber: 368,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid md:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Field, { label: "Nama Orang Tua / Wali", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Input, { id: "parentName", value: form.parentName, onChange: (e) => setF("parentName", e.target.value), placeholder: "Nama orang tua" }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
                lineNumber: 373,
                columnNumber: 19
              }, this) }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
                lineNumber: 372,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Field, { label: "Tahun Masuk", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Input, { id: "entryYear", value: form.entryYear, onChange: (e) => setF("entryYear", e.target.value), placeholder: "e.g. 2025" }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
                lineNumber: 376,
                columnNumber: 19
              }, this) }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
                lineNumber: 375,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "md:col-span-2", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Field, { label: "Alamat", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Input, { id: "address", value: form.address, onChange: (e) => setF("address", e.target.value), placeholder: "Alamat lengkap" }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
                lineNumber: 380,
                columnNumber: 21
              }, this) }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
                lineNumber: 379,
                columnNumber: 19
              }, this) }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
                lineNumber: 378,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
              lineNumber: 371,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
            lineNumber: 367,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Separator, {}, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
            lineNumber: 386,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide", children: [
              "Penempatan Kelas (",
              activeYear?.year,
              ")"
            ] }, void 0, true, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
              lineNumber: 390,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid md:grid-cols-2 gap-4", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Field, { label: "Rombel", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Select, { value: form.rombelId, onValueChange: (v) => setF("rombelId", v), children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectTrigger, { id: "rombelId", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectValue, { placeholder: "Pilih rombel" }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
                lineNumber: 396,
                columnNumber: 50
              }, this) }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
                lineNumber: 396,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectContent, { children: rombelOptions.map((r) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectItem, { value: r.id, children: [
                "Kelas ",
                r.class_level,
                r.name
              ] }, r.id, true, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
                lineNumber: 398,
                columnNumber: 47
              }, this)) }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
                lineNumber: 397,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
              lineNumber: 395,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
              lineNumber: 394,
              columnNumber: 17
            }, this) }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
              lineNumber: 393,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
            lineNumber: 389,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex gap-3 pt-2", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { onClick: handleSave, disabled: createMut.isPending || updateMut.isPending, className: "bg-emerald-600 hover:bg-emerald-500", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Save, { className: "h-4 w-4 mr-2" }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
                lineNumber: 410,
                columnNumber: 17
              }, this),
              createMut.isPending || updateMut.isPending ? "Menyimpan..." : "Simpan"
            ] }, void 0, true, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
              lineNumber: 409,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { variant: "outline", onClick: () => {
              setView("list");
              setEditId(null);
            }, children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(X, { className: "h-4 w-4 mr-2" }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
                lineNumber: 417,
                columnNumber: 17
              }, this),
              "Batal"
            ] }, void 0, true, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
              lineNumber: 413,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
            lineNumber: 408,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
          lineNumber: 323,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
        lineNumber: 317,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
      lineNumber: 301,
      columnNumber: 12
    }, this);
  }
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Card, { className: "shadow-none", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardHeader, { className: "flex flex-row items-center justify-between gap-3 flex-wrap", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardTitle, { className: "text-base", children: "Daftar Santri" }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
          lineNumber: 430,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-xs text-muted-foreground mt-1", children: [
          activeYear?.year,
          " · Total: ",
          totalStudents,
          " santri"
        ] }, void 0, true, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
          lineNumber: 431,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
        lineNumber: 429,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-2 flex-wrap", children: [
        selectedIds.length > 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { variant: "destructive", onClick: handleBulkDelete, disabled: bulkDeleteMut.isPending, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Trash2, { className: "h-4 w-4 mr-2" }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
            lineNumber: 437,
            columnNumber: 15
          }, this),
          "Hapus Terpilih (",
          selectedIds.length,
          ")"
        ] }, void 0, true, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
          lineNumber: 436,
          columnNumber: 38
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "relative", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Search, { className: "absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
            lineNumber: 441,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Input, { id: "search-santri", placeholder: "Cari nama / stambuk", className: "pl-8 w-48", value: q, onChange: (e) => {
            setQ(e.target.value);
            setPage(1);
          } }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
            lineNumber: 442,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
          lineNumber: 440,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { variant: "outline", onClick: downloadTemplate, title: "Download Template Excel", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Download, { className: "h-4 w-4 mr-2" }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
            lineNumber: 449,
            columnNumber: 13
          }, this),
          " Template"
        ] }, void 0, true, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
          lineNumber: 448,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "relative", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Input, { type: "file", accept: ".xlsx, .xls", onChange: handleImport, className: "absolute inset-0 opacity-0 cursor-pointer w-full", title: "Import Data Excel" }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
            lineNumber: 453,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { variant: "outline", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Upload, { className: "h-4 w-4 mr-2" }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
              lineNumber: 455,
              columnNumber: 15
            }, this),
            " Import"
          ] }, void 0, true, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
            lineNumber: 454,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
          lineNumber: 452,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { variant: "outline", onClick: exportExcel, className: "text-green-700 hover:text-green-800 border-green-200 bg-green-50 hover:bg-green-100", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(FileSpreadsheet, { className: "h-4 w-4 mr-2" }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
            lineNumber: 460,
            columnNumber: 13
          }, this),
          " Excel"
        ] }, void 0, true, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
          lineNumber: 459,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { variant: "outline", onClick: exportPDF, className: "text-red-700 hover:text-red-800 border-red-200 bg-red-50 hover:bg-red-100", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(FileText, { className: "h-4 w-4 mr-2" }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
            lineNumber: 464,
            columnNumber: 13
          }, this),
          " PDF"
        ] }, void 0, true, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
          lineNumber: 463,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { onClick: () => {
          setForm(EMPTY_FORM);
          setView("add");
        }, className: "bg-emerald-600 hover:bg-emerald-500", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(UserPlus, { className: "h-4 w-4 mr-2" }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
            lineNumber: 471,
            columnNumber: 13
          }, this),
          "Tambah"
        ] }, void 0, true, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
          lineNumber: 467,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
        lineNumber: 435,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
      lineNumber: 428,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardContent, { children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Table, { children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableHeader, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableRow, { children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableHead, { className: "w-12 text-center", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("input", { type: "checkbox", className: "rounded border-gray-300", checked: students.length > 0 && selectedIds.length === students.length, onChange: toggleSelectAll }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
            lineNumber: 481,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
            lineNumber: 480,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableHead, { children: "Stambuk" }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
            lineNumber: 483,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableHead, { children: "Nama" }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
            lineNumber: 484,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableHead, { children: "JK" }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
            lineNumber: 485,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableHead, { children: "Kelas" }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
            lineNumber: 486,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableHead, { children: "Status" }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
            lineNumber: 487,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableHead, { className: "text-right", children: "Aksi" }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
            lineNumber: 488,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
          lineNumber: 479,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
          lineNumber: 478,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableBody, { children: [
          isLoading && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableRow, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableCell, { colSpan: 6, className: "text-center text-muted-foreground py-8", children: "Memuat data..." }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
            lineNumber: 493,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
            lineNumber: 492,
            columnNumber: 27
          }, this),
          !isLoading && students.length === 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableRow, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableCell, { colSpan: 7, className: "text-center text-muted-foreground py-8", children: "Tidak ada santri ditemukan." }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
            lineNumber: 498,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
            lineNumber: 497,
            columnNumber: 53
          }, this),
          students.map((s) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableRow, { children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableCell, { className: "text-center", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("input", { type: "checkbox", className: "rounded border-gray-300", checked: selectedIds.includes(s.id), onChange: () => toggleSelect(s.id) }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
              lineNumber: 504,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
              lineNumber: 503,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableCell, { className: "font-mono text-xs", children: s.stambuk }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
              lineNumber: 506,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableCell, { className: "font-medium", children: s.full_name }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
              lineNumber: 507,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableCell, { children: s.gender === "L" ? "L" : "P" }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
              lineNumber: 508,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableCell, { children: s.class_level != null ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Badge, { variant: "secondary", children: [
              "Kelas ",
              s.class_level,
              s.rombel_name
            ] }, void 0, true, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
              lineNumber: 510,
              columnNumber: 44
            }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-xs text-muted-foreground", children: "—" }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
              lineNumber: 510,
              columnNumber: 118
            }, this) }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
              lineNumber: 509,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableCell, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Badge, { variant: s.status === "Aktif" ? "default" : "outline", className: s.status === "Aktif" ? "bg-emerald-600" : "", children: s.status }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
              lineNumber: 513,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
              lineNumber: 512,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableCell, { className: "text-right space-x-1", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { variant: "outline", size: "sm", onClick: () => startEdit(s), children: "Edit" }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
                lineNumber: 518,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { variant: "outline", size: "sm", asChild: true, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Link, { to: "/rapor", search: {
                studentId: s.id,
                yearId: activeYear?.id
              }, children: "Rapor" }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
                lineNumber: 522,
                columnNumber: 21
              }, this) }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
                lineNumber: 521,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(AlertDialog, { children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { variant: "outline", size: "sm", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Trash2, { className: "h-3.5 w-3.5" }, void 0, false, {
                  fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
                  lineNumber: 532,
                  columnNumber: 25
                }, this) }, void 0, false, {
                  fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
                  lineNumber: 531,
                  columnNumber: 23
                }, this) }, void 0, false, {
                  fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
                  lineNumber: 530,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(AlertDialogContent, { children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(AlertDialogHeader, { children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(AlertDialogTitle, { children: "Hapus santri?" }, void 0, false, {
                      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
                      lineNumber: 537,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(AlertDialogDescription, { children: [
                      "Data santri ",
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("b", { children: s.full_name }, void 0, false, {
                        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
                        lineNumber: 539,
                        columnNumber: 39
                      }, this),
                      " dan seluruh nilai terkait akan dihapus secara permanen."
                    ] }, void 0, true, {
                      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
                      lineNumber: 538,
                      columnNumber: 25
                    }, this)
                  ] }, void 0, true, {
                    fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
                    lineNumber: 536,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(AlertDialogFooter, { children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(AlertDialogCancel, { children: "Batal" }, void 0, false, {
                      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
                      lineNumber: 544,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(AlertDialogAction, { className: "bg-red-600 hover:bg-red-500", onClick: () => deleteMut.mutate(s.id), children: "Hapus" }, void 0, false, {
                      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
                      lineNumber: 545,
                      columnNumber: 25
                    }, this)
                  ] }, void 0, true, {
                    fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
                    lineNumber: 543,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
                  lineNumber: 535,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
                lineNumber: 529,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
              lineNumber: 517,
              columnNumber: 17
            }, this)
          ] }, s.id, true, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
            lineNumber: 502,
            columnNumber: 39
          }, this))
        ] }, void 0, true, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
          lineNumber: 491,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
        lineNumber: 477,
        columnNumber: 9
      }, this),
      totalPages > 1 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between pt-4 border-t mt-4", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-xs text-muted-foreground", children: [
          "Menampilkan halaman ",
          page,
          " dari ",
          totalPages
        ] }, void 0, true, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
          lineNumber: 558,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { variant: "outline", size: "sm", onClick: () => setPage((p) => Math.max(1, p - 1)), disabled: page === 1, children: "Kembali" }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
            lineNumber: 562,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { variant: "outline", size: "sm", onClick: () => setPage((p) => Math.min(totalPages, p + 1)), disabled: page === totalPages, children: "Lanjut" }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
            lineNumber: 565,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
          lineNumber: 561,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
        lineNumber: 557,
        columnNumber: 28
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
      lineNumber: 476,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
    lineNumber: 427,
    columnNumber: 10
  }, this);
}
function Field({
  label,
  children
}) {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-1.5", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Label, { className: "text-xs font-medium", children: label }, void 0, false, {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
      lineNumber: 581,
      columnNumber: 7
    }, this),
    children
  ] }, void 0, true, {
    fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.santri.tsx?tsr-split=component",
    lineNumber: 580,
    columnNumber: 10
  }, this);
}
export {
  SantriPage as component
};
