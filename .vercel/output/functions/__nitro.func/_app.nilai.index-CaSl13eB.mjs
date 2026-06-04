import { r as reactExports, j as jsxDevRuntimeExports } from "./_libs/react.mjs";
import { u as useNavigate } from "./_libs/tanstack__react-router.mjs";
import { C as Card, c as CardHeader, d as CardTitle, a as CardContent } from "./_ssr/card-BhYvH4ns.mjs";
import { S as Select, c as SelectTrigger, d as SelectValue, a as SelectContent, b as SelectItem } from "./_ssr/select-WXuL3P7I.mjs";
import { L as Label } from "./_ssr/label-B5xHsmXM.mjs";
import { T as Table, d as TableHeader, e as TableRow, c as TableHead, a as TableBody, b as TableCell } from "./_ssr/table-CTsyOdB_.mjs";
import { B as Button } from "./_ssr/button-CM0KjKCo.mjs";
import { b as useQueryClient, a as useQuery, u as useMutation } from "./_libs/tanstack__react-query.mjs";
import { u as useAuth } from "./_ssr/use-auth-YByzSFug.mjs";
import { g as getAcademicYearsFn } from "./_ssr/academic-years-Ctlthb4h.mjs";
import { a as getRombelsFn } from "./_ssr/classes-CAswTOAP.mjs";
import { f as fetchBackend } from "./_ssr/fetch-helper-DcxjlWhs.mjs";
import { t as toast } from "./_libs/sonner.mjs";
import { r as readSync, u as utils, w as writeFileSync } from "./_libs/xlsx.mjs";
import "./_libs/seroval.mjs";
import { F as FileDown, h as FileSpreadsheet, j as FileUp, r as SquarePen } from "./_libs/lucide-react.mjs";
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
import "./_libs/radix-ui__react-select.mjs";
import "./_libs/radix-ui__number.mjs";
import "./_libs/radix-ui__primitive.mjs";
import "./_libs/radix-ui__react-collection.mjs";
import "./_libs/radix-ui__react-context.mjs";
import "./_libs/radix-ui__react-compose-refs.mjs";
import "./_libs/radix-ui__react-slot.mjs";
import "./_libs/radix-ui__react-direction.mjs";
import "./_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "./_libs/radix-ui__react-primitive.mjs";
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
import "./_libs/radix-ui__react-label.mjs";
import "./_libs/class-variance-authority.mjs";
import "./_libs/tanstack__query-core.mjs";
import "./_ssr/createSsrRpc-_V2Ptgae.mjs";
import "./_ssr/server-B2xBzUrm.mjs";
import "node:async_hooks";
import "./_libs/h3-v2.mjs";
import "./_libs/rou3.mjs";
import "./_libs/srvx.mjs";
async function exportNilaiToExcel(data, classLevel, isTemplate = false) {
  const wb = utils.book_new();
  const getScore = (scores, matchFn, key) => {
    if (isTemplate) return "";
    const s = scores.find(matchFn);
    return s && s[key] != null ? s[key] : "";
  };
  const akRows = [];
  for (const student of data.students) {
    for (const subj of data.subjects) {
      akRows.push({
        "Student ID": student.id,
        "Nama Santri": student.full_name,
        "Subject ID": subj.id,
        "Mata Pelajaran": subj.name,
        "Tugas": getScore(data.akademik, (s) => s.student_id === student.id && s.subject_id === subj.id, "tugas"),
        "UTS": getScore(data.akademik, (s) => s.student_id === student.id && s.subject_id === subj.id, "uts"),
        "UAS": getScore(data.akademik, (s) => s.student_id === student.id && s.subject_id === subj.id, "uas")
      });
    }
  }
  const wsAk = utils.json_to_sheet(akRows);
  utils.book_append_sheet(wb, wsAk, "Akademik");
  const pidRows = [];
  const LANGUAGES = ["Indonesia", "Arab", "Inggris"];
  for (const student of data.students) {
    for (const lang of LANGUAGES) {
      pidRows.push({
        "Student ID": student.id,
        "Nama Santri": student.full_name,
        "Bahasa": lang,
        "Penguasaan": getScore(data.pidato, (s) => s.student_id === student.id && s.language === lang, "penguasaan"),
        "Kelancaran": getScore(data.pidato, (s) => s.student_id === student.id && s.language === lang, "kelancaran"),
        "Intonasi": getScore(data.pidato, (s) => s.student_id === student.id && s.language === lang, "intonasi"),
        "Kepercayaan": getScore(data.pidato, (s) => s.student_id === student.id && s.language === lang, "kepercayaan"),
        "Penampilan": getScore(data.pidato, (s) => s.student_id === student.id && s.language === lang, "penampilan")
      });
    }
  }
  const wsPid = utils.json_to_sheet(pidRows);
  utils.book_append_sheet(wb, wsPid, "Pidato");
  if (classLevel >= 4) {
    const compRows = data.students.map((student) => ({
      "Student ID": student.id,
      "Nama Santri": student.full_name,
      "Pengoperasian": getScore(data.komputer, (s) => s.student_id === student.id, "pengoperasian"),
      "MsWord": getScore(data.komputer, (s) => s.student_id === student.id, "ms_word"),
      "MsExcel": getScore(data.komputer, (s) => s.student_id === student.id, "ms_excel"),
      "Internet": getScore(data.komputer, (s) => s.student_id === student.id, "internet"),
      "Presentasi": getScore(data.komputer, (s) => s.student_id === student.id, "presentasi")
    }));
    const wsComp = utils.json_to_sheet(compRows);
    utils.book_append_sheet(wb, wsComp, "Komputer");
  }
  if (classLevel >= 5) {
    const discRows = data.students.map((student) => ({
      "Student ID": student.id,
      "Nama Santri": student.full_name,
      "Keaktifan": getScore(data.diskusi, (s) => s.student_id === student.id, "keaktifan"),
      "Argumentasi": getScore(data.diskusi, (s) => s.student_id === student.id, "argumentasi"),
      "Kerjasama": getScore(data.diskusi, (s) => s.student_id === student.id, "kerjasama"),
      "Penguasaan": getScore(data.diskusi, (s) => s.student_id === student.id, "penguasaan"),
      "Etika": getScore(data.diskusi, (s) => s.student_id === student.id, "etika")
    }));
    const wsDisc = utils.json_to_sheet(discRows);
    utils.book_append_sheet(wb, wsDisc, "Diskusi");
  }
  const attRows = data.students.map((student) => ({
    "Student ID": student.id,
    "Nama Santri": student.full_name,
    "Hari Sekolah": getScore(data.kehadiran, (s) => s.student_id === student.id, "school_days"),
    "Hadir": getScore(data.kehadiran, (s) => s.student_id === student.id, "present"),
    "Izin": getScore(data.kehadiran, (s) => s.student_id === student.id, "permission"),
    "Alpha": getScore(data.kehadiran, (s) => s.student_id === student.id, "absent")
  }));
  const wsAtt = utils.json_to_sheet(attRows);
  utils.book_append_sheet(wb, wsAtt, "Kehadiran");
  const fileName = isTemplate ? `Template_Nilai_Kelas_${classLevel}.xlsx` : `Export_Nilai_Kelas_${classLevel}.xlsx`;
  writeFileSync(wb, fileName);
}
async function importNilaiFromExcel(file, classLevel) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const wb = readSync(data, { type: "binary" });
        const parseSheet = (sheetName) => {
          const ws = wb.Sheets[sheetName];
          return ws ? utils.sheet_to_json(ws) : [];
        };
        const numOrNull = (val) => val !== "" && val != null && !isNaN(Number(val)) ? Number(val) : null;
        const akRaw = parseSheet("Akademik");
        const akademik = akRaw.filter((r) => r["Student ID"] && r["Subject ID"]).map((r) => ({
          studentId: r["Student ID"],
          subjectId: r["Subject ID"],
          tugas: numOrNull(r["Tugas"]),
          uts: numOrNull(r["UTS"]),
          uas: numOrNull(r["UAS"])
        }));
        const pidRaw = parseSheet("Pidato");
        const pidato = pidRaw.filter((r) => r["Student ID"] && r["Bahasa"]).map((r) => ({
          studentId: r["Student ID"],
          language: r["Bahasa"],
          penguasaan: numOrNull(r["Penguasaan"]),
          kelancaran: numOrNull(r["Kelancaran"]),
          intonasi: numOrNull(r["Intonasi"]),
          kepercayaan: numOrNull(r["Kepercayaan"]),
          penampilan: numOrNull(r["Penampilan"])
        }));
        const compRaw = parseSheet("Komputer");
        const komputer = compRaw.filter((r) => r["Student ID"]).map((r) => ({
          studentId: r["Student ID"],
          pengoperasian: numOrNull(r["Pengoperasian"]),
          msWord: numOrNull(r["MsWord"]),
          msExcel: numOrNull(r["MsExcel"]),
          internet: numOrNull(r["Internet"]),
          presentasi: numOrNull(r["Presentasi"])
        }));
        const discRaw = parseSheet("Diskusi");
        const diskusi = discRaw.filter((r) => r["Student ID"]).map((r) => ({
          studentId: r["Student ID"],
          keaktifan: numOrNull(r["Keaktifan"]),
          argumentasi: numOrNull(r["Argumentasi"]),
          kerjasama: numOrNull(r["Kerjasama"]),
          penguasaan: numOrNull(r["Penguasaan"]),
          etika: numOrNull(r["Etika"])
        }));
        const attRaw = parseSheet("Kehadiran");
        const kehadiran = attRaw.filter((r) => r["Student ID"]).map((r) => ({
          studentId: r["Student ID"],
          schoolDays: numOrNull(r["Hari Sekolah"]) || 0,
          present: numOrNull(r["Hadir"]) || 0,
          permission: numOrNull(r["Izin"]) || 0,
          absent: numOrNull(r["Alpha"]) || 0
        }));
        resolve({ akademik, pidato, komputer, diskusi, kehadiran });
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = (err) => reject(err);
    reader.readAsBinaryString(file);
  });
}
function Field({
  label,
  children
}) {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-1.5", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Label, { className: "text-xs", children: label }, void 0, false, {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.index.tsx?tsr-split=component",
      lineNumber: 24,
      columnNumber: 7
    }, this),
    children
  ] }, void 0, true, {
    fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.index.tsx?tsr-split=component",
    lineNumber: 23,
    columnNumber: 10
  }, this);
}
function NilaiIndexPage() {
  const {
    token
  } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const fileInputRef = reactExports.useRef(null);
  const [yearId, setYearId] = reactExports.useState("");
  const [rombelId, setRombelId] = reactExports.useState("");
  const {
    data: years
  } = useQuery({
    queryKey: ["academic-years"],
    queryFn: () => getAcademicYearsFn(),
    enabled: !!token
  });
  const {
    data: rombels
  } = useQuery({
    queryKey: ["rombels"],
    queryFn: () => getRombelsFn({
      data: {}
    }),
    enabled: !!token
  });
  reactExports.useEffect(() => {
    if (!yearId && years?.length) {
      const active = years.find((y) => y.is_active) ?? years[0];
      setYearId(active.id);
    }
  }, [years, yearId]);
  reactExports.useEffect(() => {
    if (!rombelId && rombels?.length) setRombelId(rombels[0].id);
  }, [rombels, rombelId]);
  const selectedRombel = rombels?.find((r) => r.id === rombelId);
  const classLevel = selectedRombel?.class_level ?? 0;
  const {
    data: studentsData,
    isLoading
  } = useQuery({
    queryKey: ["students", yearId, rombelId],
    queryFn: () => fetchBackend("/api/students", {
      body: {
        token,
        academicYearId: yearId,
        rombelId,
        limit: 1e3
      }
    }),
    enabled: !!token && !!yearId && !!rombelId
  });
  const students = studentsData?.data ?? [];
  const handleExport = async (isTemplate) => {
    if (!yearId || !rombelId) {
      toast.error("Pilih tahun ajaran dan kelas terlebih dahulu");
      return;
    }
    const loadingToast = toast.loading(isTemplate ? "Menyiapkan template..." : "Menyiapkan data export...");
    try {
      const [akademik, pidato, komputer, diskusi, kehadiran] = await Promise.all([fetchBackend("/api/scores/subject", {
        body: {
          token,
          academicYearId: yearId,
          rombelId
        }
      }), fetchBackend("/api/scores/speech", {
        body: {
          token,
          academicYearId: yearId,
          rombelId
        }
      }), classLevel >= 4 ? fetchBackend("/api/scores/computer", {
        body: {
          token,
          academicYearId: yearId,
          rombelId
        }
      }) : Promise.resolve(null), classLevel >= 5 ? fetchBackend("/api/scores/discussion", {
        body: {
          token,
          academicYearId: yearId,
          rombelId
        }
      }) : Promise.resolve(null), fetchBackend("/api/scores/attendance", {
        body: {
          token,
          academicYearId: yearId,
          rombelId
        }
      })]);
      const data = {
        students: akademik.students,
        // they all return same students
        subjects: akademik.subjects,
        akademik: akademik.scores,
        pidato: pidato.scores,
        komputer: komputer?.scores || [],
        diskusi: diskusi?.scores || [],
        kehadiran: kehadiran.attendance
      };
      await exportNilaiToExcel(data, classLevel, isTemplate);
      toast.success(isTemplate ? "Template berhasil diunduh" : "Data berhasil diexport", {
        id: loadingToast
      });
    } catch (err) {
      toast.error("Gagal melakukan export", {
        id: loadingToast
      });
    }
  };
  const importMutation = useMutation({
    mutationFn: async (file) => {
      const parsed = await importNilaiFromExcel(file);
      if (!parsed) throw new Error("Gagal membaca file Excel");
      const promises = [];
      if (parsed.akademik.length > 0) promises.push(fetchBackend("/api/scores/subject/save", {
        body: {
          token,
          academicYearId: yearId,
          scores: parsed.akademik
        }
      }));
      if (parsed.pidato.length > 0) promises.push(fetchBackend("/api/scores/speech/save", {
        body: {
          token,
          academicYearId: yearId,
          scores: parsed.pidato
        }
      }));
      if (parsed.komputer.length > 0) promises.push(fetchBackend("/api/scores/computer/save", {
        body: {
          token,
          academicYearId: yearId,
          scores: parsed.komputer
        }
      }));
      if (parsed.diskusi.length > 0) promises.push(fetchBackend("/api/scores/discussion/save", {
        body: {
          token,
          academicYearId: yearId,
          scores: parsed.diskusi
        }
      }));
      if (parsed.kehadiran.length > 0) promises.push(fetchBackend("/api/scores/attendance/save", {
        body: {
          token,
          academicYearId: yearId,
          attendance: parsed.kehadiran
        }
      }));
      await Promise.all(promises);
    },
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["subject-scores"]
      });
      qc.invalidateQueries({
        queryKey: ["speech-scores"]
      });
      qc.invalidateQueries({
        queryKey: ["computer-scores"]
      });
      qc.invalidateQueries({
        queryKey: ["discussion-scores"]
      });
      qc.invalidateQueries({
        queryKey: ["attendance"]
      });
      toast.success("Data nilai berhasil diimport!");
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : "Terjadi kesalahan saat import");
    }
  });
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    toast.promise(importMutation.mutateAsync(file), {
      loading: "Sedang mengimport data..."
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Card, { className: "shadow-none", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardHeader, { className: "pb-2 flex flex-row items-center justify-between", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardTitle, { className: "text-base", children: "Filter Periode & Kelas" }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.index.tsx?tsr-split=component",
          lineNumber: 217,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { variant: "outline", size: "sm", onClick: () => handleExport(true), children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(FileDown, { className: "w-4 h-4 mr-2" }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.index.tsx?tsr-split=component",
              lineNumber: 220,
              columnNumber: 15
            }, this),
            " Template"
          ] }, void 0, true, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.index.tsx?tsr-split=component",
            lineNumber: 219,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { variant: "outline", size: "sm", onClick: () => handleExport(false), children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(FileSpreadsheet, { className: "w-4 h-4 mr-2" }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.index.tsx?tsr-split=component",
              lineNumber: 223,
              columnNumber: 15
            }, this),
            " Export"
          ] }, void 0, true, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.index.tsx?tsr-split=component",
            lineNumber: 222,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("input", { type: "file", accept: ".xlsx, .xls", className: "hidden", ref: fileInputRef, onChange: handleFileUpload }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.index.tsx?tsr-split=component",
              lineNumber: 226,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { size: "sm", onClick: () => fileInputRef.current?.click(), disabled: importMutation.isPending, children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(FileUp, { className: "w-4 h-4 mr-2" }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.index.tsx?tsr-split=component",
                lineNumber: 228,
                columnNumber: 17
              }, this),
              " Import"
            ] }, void 0, true, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.index.tsx?tsr-split=component",
              lineNumber: 227,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.index.tsx?tsr-split=component",
            lineNumber: 225,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.index.tsx?tsr-split=component",
          lineNumber: 218,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.index.tsx?tsr-split=component",
        lineNumber: 216,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardContent, { className: "grid md:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Field, { label: "Tahun Ajaran", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Select, { value: yearId, onValueChange: setYearId, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectTrigger, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectValue, { placeholder: "Pilih tahun ajaran" }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.index.tsx?tsr-split=component",
            lineNumber: 236,
            columnNumber: 30
          }, this) }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.index.tsx?tsr-split=component",
            lineNumber: 236,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectContent, { children: (years ?? []).map((y) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectItem, { value: y.id, children: [
            y.year,
            " ",
            y.is_active ? "✓ Aktif" : ""
          ] }, y.id, true, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.index.tsx?tsr-split=component",
            lineNumber: 238,
            columnNumber: 41
          }, this)) }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.index.tsx?tsr-split=component",
            lineNumber: 237,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.index.tsx?tsr-split=component",
          lineNumber: 235,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.index.tsx?tsr-split=component",
          lineNumber: 234,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Field, { label: "Kelas / Rombel", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Select, { value: rombelId, onValueChange: setRombelId, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectTrigger, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectValue, { placeholder: "Pilih kelas" }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.index.tsx?tsr-split=component",
            lineNumber: 246,
            columnNumber: 30
          }, this) }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.index.tsx?tsr-split=component",
            lineNumber: 246,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectContent, { children: (rombels ?? []).map((r) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectItem, { value: r.id, children: [
            "Kelas ",
            r.class_level,
            r.name
          ] }, r.id, true, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.index.tsx?tsr-split=component",
            lineNumber: 248,
            columnNumber: 43
          }, this)) }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.index.tsx?tsr-split=component",
            lineNumber: 247,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.index.tsx?tsr-split=component",
          lineNumber: 245,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.index.tsx?tsr-split=component",
          lineNumber: 244,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.index.tsx?tsr-split=component",
        lineNumber: 233,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.index.tsx?tsr-split=component",
      lineNumber: 215,
      columnNumber: 7
    }, this),
    !yearId || !rombelId ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "rounded-lg border border-dashed p-12 text-center text-muted-foreground", children: "Pilih tahun ajaran dan kelas untuk melihat daftar santri." }, void 0, false, {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.index.tsx?tsr-split=component",
      lineNumber: 257,
      columnNumber: 31
    }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Card, { className: "shadow-none", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardHeader, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardTitle, { className: "text-sm", children: [
        "Daftar Santri — Kelas ",
        classLevel
      ] }, void 0, true, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.index.tsx?tsr-split=component",
        lineNumber: 261,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.index.tsx?tsr-split=component",
        lineNumber: 260,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardContent, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Table, { children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableHeader, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableRow, { children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableHead, { className: "w-12 text-center", children: "No" }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.index.tsx?tsr-split=component",
            lineNumber: 267,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableHead, { children: "Nama Lengkap" }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.index.tsx?tsr-split=component",
            lineNumber: 268,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableHead, { children: "Stambuk" }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.index.tsx?tsr-split=component",
            lineNumber: 269,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableHead, { className: "w-32 text-center", children: "Aksi" }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.index.tsx?tsr-split=component",
            lineNumber: 270,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.index.tsx?tsr-split=component",
          lineNumber: 266,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.index.tsx?tsr-split=component",
          lineNumber: 265,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableBody, { children: isLoading ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableRow, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableCell, { colSpan: 4, className: "text-center py-8", children: "Memuat data..." }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.index.tsx?tsr-split=component",
          lineNumber: 274,
          columnNumber: 40
        }, this) }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.index.tsx?tsr-split=component",
          lineNumber: 274,
          columnNumber: 30
        }, this) : students.length === 0 ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableRow, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableCell, { colSpan: 4, className: "text-center py-8", children: "Tidak ada santri di kelas ini." }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.index.tsx?tsr-split=component",
          lineNumber: 274,
          columnNumber: 166
        }, this) }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.index.tsx?tsr-split=component",
          lineNumber: 274,
          columnNumber: 156
        }, this) : students.map((student, i) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableRow, { children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableCell, { className: "text-center", children: i + 1 }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.index.tsx?tsr-split=component",
            lineNumber: 275,
            columnNumber: 23
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableCell, { className: "font-medium", children: student.full_name }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.index.tsx?tsr-split=component",
            lineNumber: 276,
            columnNumber: 23
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableCell, { children: student.stambuk }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.index.tsx?tsr-split=component",
            lineNumber: 277,
            columnNumber: 23
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableCell, { className: "text-center", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { variant: "outline", size: "sm", onClick: () => navigate({
            to: "/nilai/$studentId",
            params: {
              studentId: student.id
            },
            search: {
              yearId,
              rombelId
            }
          }), children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SquarePen, { className: "w-4 h-4 mr-2" }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.index.tsx?tsr-split=component",
              lineNumber: 289,
              columnNumber: 27
            }, this),
            " Input"
          ] }, void 0, true, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.index.tsx?tsr-split=component",
            lineNumber: 279,
            columnNumber: 25
          }, this) }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.index.tsx?tsr-split=component",
            lineNumber: 278,
            columnNumber: 23
          }, this)
        ] }, student.id, true, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.index.tsx?tsr-split=component",
          lineNumber: 274,
          columnNumber: 316
        }, this)) }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.index.tsx?tsr-split=component",
          lineNumber: 273,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.index.tsx?tsr-split=component",
        lineNumber: 264,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.index.tsx?tsr-split=component",
        lineNumber: 263,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.index.tsx?tsr-split=component",
      lineNumber: 259,
      columnNumber: 18
    }, this)
  ] }, void 0, true, {
    fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.index.tsx?tsr-split=component",
    lineNumber: 214,
    columnNumber: 10
  }, this);
}
export {
  NilaiIndexPage as component
};
