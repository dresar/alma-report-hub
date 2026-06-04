import { r as reactExports, j as jsxDevRuntimeExports } from "./_libs/react.mjs";
import { u as useNavigate } from "./_libs/tanstack__react-router.mjs";
import { C as Card, c as CardHeader, d as CardTitle, a as CardContent } from "./_ssr/card-BhYvH4ns.mjs";
import { R as Root2, L as List, T as Trigger, C as Content } from "./_libs/radix-ui__react-tabs.mjs";
import { c as cn } from "./_ssr/utils-H80jjgLf.mjs";
import { I as Input } from "./_ssr/input-Dxdu6HuB.mjs";
import { L as Label } from "./_ssr/label-B5xHsmXM.mjs";
import { B as Button } from "./_ssr/button-CM0KjKCo.mjs";
import { S as Switch } from "./_ssr/switch-Br5LMiLZ.mjs";
import { T as Table, d as TableHeader, e as TableRow, c as TableHead, a as TableBody, b as TableCell } from "./_ssr/table-CTsyOdB_.mjs";
import { b as useQueryClient, a as useQuery, u as useMutation } from "./_libs/tanstack__react-query.mjs";
import { u as useAuth } from "./_ssr/use-auth-YByzSFug.mjs";
import { t as toast } from "./_libs/sonner.mjs";
import { f as fetchBackend } from "./_ssr/fetch-helper-DcxjlWhs.mjs";
import { R as Route$4 } from "./_ssr/router-l0I_kZ8p.mjs";
import { A as ArrowLeft, f as Clock, S as Save } from "./_libs/lucide-react.mjs";
import "./_libs/tanstack__router-core.mjs";
import "./_libs/tanstack__history.mjs";
import "./_libs/cookie-es.mjs";
import "./_libs/seroval.mjs";
import "./_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "./_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "crypto";
import "stream";
import "./_libs/isbot.mjs";
import "./_libs/radix-ui__primitive.mjs";
import "./_libs/radix-ui__react-context.mjs";
import "./_libs/radix-ui__react-roving-focus.mjs";
import "./_libs/radix-ui__react-collection.mjs";
import "./_libs/radix-ui__react-compose-refs.mjs";
import "./_libs/radix-ui__react-slot.mjs";
import "./_libs/radix-ui__react-id.mjs";
import "./_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "./_libs/radix-ui__react-primitive.mjs";
import "./_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "./_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "./_libs/radix-ui__react-direction.mjs";
import "./_libs/radix-ui__react-presence.mjs";
import "./_libs/clsx.mjs";
import "./_libs/tailwind-merge.mjs";
import "./_libs/radix-ui__react-label.mjs";
import "./_libs/class-variance-authority.mjs";
import "./_libs/radix-ui__react-switch.mjs";
import "./_libs/radix-ui__react-use-previous.mjs";
import "./_libs/radix-ui__react-use-size.mjs";
import "./_libs/tanstack__query-core.mjs";
const Tabs = Root2;
const TabsList = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
  List,
  {
    ref,
    className: cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    ),
    ...props
  },
  void 0,
  false,
  {
    fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/tabs.tsx",
    lineNumber: 12,
    columnNumber: 3
  },
  void 0
));
TabsList.displayName = List.displayName;
const TabsTrigger = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
  Trigger,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className
    ),
    ...props
  },
  void 0,
  false,
  {
    fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/tabs.tsx",
    lineNumber: 27,
    columnNumber: 3
  },
  void 0
));
TabsTrigger.displayName = Trigger.displayName;
const TabsContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
  Content,
  {
    ref,
    className: cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    ),
    ...props
  },
  void 0,
  false,
  {
    fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/tabs.tsx",
    lineNumber: 42,
    columnNumber: 3
  },
  void 0
));
TabsContent.displayName = Content.displayName;
const LANGUAGES = ["Indonesia", "Arab", "Inggris"];
const SPEECH_ASPECTS = ["penguasaan", "kelancaran", "intonasi", "kepercayaan", "penampilan"];
const SPEECH_LABELS = {
  penguasaan: "Penguasaan Materi",
  kelancaran: "Kelancaran",
  intonasi: "Intonasi",
  kepercayaan: "Kepercayaan Diri",
  penampilan: "Penampilan"
};
const COMPUTER_ASPECTS = ["pengoperasian", "msWord", "msExcel", "internet", "presentasi"];
const COMPUTER_LABELS = {
  pengoperasian: "Pengoperasian Dasar",
  msWord: "Microsoft Word",
  msExcel: "Microsoft Excel",
  internet: "Internet",
  presentasi: "Presentasi"
};
const DISCUSSION_ASPECTS = ["keaktifan", "argumentasi", "kerjasama", "penguasaan", "etika"];
const DISCUSSION_LABELS = {
  keaktifan: "Keaktifan",
  argumentasi: "Argumentasi",
  kerjasama: "Kerjasama",
  penguasaan: "Penguasaan Materi",
  etika: "Etika Diskusi"
};
function ScoreInput({
  value,
  onChange,
  id
}) {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Input, { id, className: "h-8 w-16 text-center px-1 mx-auto", placeholder: "—", value, onChange: (e) => {
    const v = e.target.value;
    if (v === "" || /^\d*\.?\d*$/.test(v) && Number(v) <= 100) onChange(v);
  } }, void 0, false, {
    fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
    lineNumber: 50,
    columnNumber: 10
  }, this);
}
function NilaiStudentPage() {
  const {
    studentId
  } = Route$4.useParams();
  const {
    yearId,
    rombelId
  } = Route$4.useSearch();
  const navigate = useNavigate();
  const {
    token
  } = useAuth();
  const qc = useQueryClient();
  const [activeTab, setActiveTab] = reactExports.useState("akademik");
  const [autoSave, setAutoSave] = reactExports.useState(() => {
    if (typeof window !== "undefined") return localStorage.getItem("sira_autosave") === "true";
    return false;
  });
  const isDirtyRef = reactExports.useRef(false);
  const markDirty = () => {
    isDirtyRef.current = true;
  };
  reactExports.useEffect(() => {
    localStorage.setItem("sira_autosave", String(autoSave));
  }, [autoSave]);
  const {
    data: studentInfo
  } = useQuery({
    queryKey: ["student", studentId],
    queryFn: () => fetchBackend("/api/students/get", {
      body: {
        token,
        studentId
      }
    }),
    enabled: !!token
  });
  const {
    data: rombelData
  } = useQuery({
    queryKey: ["rombels"],
    queryFn: () => fetchBackend("/api/rombels", {
      body: {}
    }),
    enabled: !!token
  });
  const classLevel = rombelData?.find((r) => r.id === rombelId)?.class_level ?? 0;
  const {
    data: akademikData
  } = useQuery({
    queryKey: ["subject-scores", yearId, rombelId],
    queryFn: () => fetchBackend("/api/scores/subject", {
      body: {
        token,
        academicYearId: yearId,
        rombelId
      }
    }),
    enabled: !!token && !!yearId && !!rombelId
  });
  const {
    data: speechData
  } = useQuery({
    queryKey: ["speech-scores", yearId, rombelId],
    queryFn: () => fetchBackend("/api/scores/speech", {
      body: {
        token,
        academicYearId: yearId,
        rombelId
      }
    }),
    enabled: !!token && !!yearId && !!rombelId
  });
  const {
    data: compData
  } = useQuery({
    queryKey: ["computer-scores", yearId, rombelId],
    queryFn: () => fetchBackend("/api/scores/computer", {
      body: {
        token,
        academicYearId: yearId,
        rombelId
      }
    }),
    enabled: !!token && !!yearId && !!rombelId && classLevel >= 4
  });
  const {
    data: discData
  } = useQuery({
    queryKey: ["discussion-scores", yearId, rombelId],
    queryFn: () => fetchBackend("/api/scores/discussion", {
      body: {
        token,
        academicYearId: yearId,
        rombelId
      }
    }),
    enabled: !!token && !!yearId && !!rombelId && classLevel >= 5
  });
  const {
    data: attData
  } = useQuery({
    queryKey: ["attendance", yearId, rombelId],
    queryFn: () => fetchBackend("/api/scores/attendance", {
      body: {
        token,
        academicYearId: yearId,
        rombelId
      }
    }),
    enabled: !!token && !!yearId && !!rombelId
  });
  const [akademikState, setAkademikState] = reactExports.useState({});
  const [speechState, setSpeechState] = reactExports.useState({});
  const [compState, setCompState] = reactExports.useState({});
  const [discState, setDiscState] = reactExports.useState({});
  const [attState, setAttState] = reactExports.useState({});
  reactExports.useEffect(() => {
    if (!akademikData) return;
    const init = {};
    for (const subj of akademikData.subjects) {
      const existing = akademikData.scores.find((s) => s.student_id === studentId && s.subject_id === subj.id);
      init[`${subj.id}_tugas`] = existing?.tugas != null ? String(existing.tugas) : "";
      init[`${subj.id}_uts`] = existing?.uts != null ? String(existing.uts) : "";
      init[`${subj.id}_uas`] = existing?.uas != null ? String(existing.uas) : "";
    }
    setAkademikState(init);
  }, [akademikData, studentId]);
  reactExports.useEffect(() => {
    if (!speechData) return;
    const init = {};
    for (const lang of LANGUAGES) {
      init[lang] = {};
      const existing = speechData.scores.find((s) => s.student_id === studentId && s.language === lang);
      for (const asp of SPEECH_ASPECTS) {
        init[lang][asp] = existing?.[asp] != null ? String(existing[asp]) : "";
      }
    }
    setSpeechState(init);
  }, [speechData, studentId]);
  reactExports.useEffect(() => {
    if (!compData) return;
    const ex = compData.scores.find((s) => s.student_id === studentId);
    setCompState({
      pengoperasian: ex?.pengoperasian != null ? String(ex.pengoperasian) : "",
      msWord: ex?.ms_word != null ? String(ex.ms_word) : "",
      msExcel: ex?.ms_excel != null ? String(ex.ms_excel) : "",
      internet: ex?.internet != null ? String(ex.internet) : "",
      presentasi: ex?.presentasi != null ? String(ex.presentasi) : ""
    });
  }, [compData, studentId]);
  reactExports.useEffect(() => {
    if (!discData) return;
    const ex = discData.scores.find((s) => s.student_id === studentId);
    setDiscState({
      keaktifan: ex?.keaktifan != null ? String(ex.keaktifan) : "",
      argumentasi: ex?.argumentasi != null ? String(ex.argumentasi) : "",
      kerjasama: ex?.kerjasama != null ? String(ex.kerjasama) : "",
      penguasaan: ex?.penguasaan != null ? String(ex.penguasaan) : "",
      etika: ex?.etika != null ? String(ex.etika) : ""
    });
  }, [discData, studentId]);
  reactExports.useEffect(() => {
    if (!attData) return;
    const ex = attData.attendance.find((a) => a.student_id === studentId);
    setAttState({
      schoolDays: ex?.school_days != null ? String(ex.school_days) : "",
      present: ex?.present != null ? String(ex.present) : "",
      permission: ex?.permission != null ? String(ex.permission) : "",
      absent: ex?.absent != null ? String(ex.absent) : ""
    });
  }, [attData, studentId]);
  const saveAkademikMut = useMutation({
    mutationFn: () => {
      const scores = (akademikData?.subjects ?? []).map((subj) => ({
        studentId,
        subjectId: subj.id,
        tugas: akademikState[`${subj.id}_tugas`] !== "" ? Number(akademikState[`${subj.id}_tugas`]) : null,
        uts: akademikState[`${subj.id}_uts`] !== "" ? Number(akademikState[`${subj.id}_uts`]) : null,
        uas: akademikState[`${subj.id}_uas`] !== "" ? Number(akademikState[`${subj.id}_uas`]) : null
      }));
      return fetchBackend("/api/scores/subject/save", {
        body: {
          token,
          academicYearId: yearId,
          scores
        }
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["subject-scores"]
      });
      if (!autoSave) toast.success("Nilai akademik tersimpan");
      isDirtyRef.current = false;
    },
    onError: (e) => {
      toast.error("Gagal menyimpan akademik");
      isDirtyRef.current = true;
    }
  });
  const saveSpeechMut = useMutation({
    mutationFn: () => {
      const scores = LANGUAGES.map((lang) => {
        const row = speechState[lang] ?? {};
        return {
          studentId,
          language: lang,
          penguasaan: row.penguasaan !== "" ? Number(row.penguasaan) : null,
          kelancaran: row.kelancaran !== "" ? Number(row.kelancaran) : null,
          intonasi: row.intonasi !== "" ? Number(row.intonasi) : null,
          kepercayaan: row.kepercayaan !== "" ? Number(row.kepercayaan) : null,
          penampilan: row.penampilan !== "" ? Number(row.penampilan) : null
        };
      });
      return fetchBackend("/api/scores/speech/save", {
        body: {
          token,
          academicYearId: yearId,
          scores
        }
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["speech-scores"]
      });
      if (!autoSave) toast.success("Nilai pidato tersimpan");
      isDirtyRef.current = false;
    },
    onError: (e) => {
      toast.error("Gagal menyimpan pidato");
      isDirtyRef.current = true;
    }
  });
  const saveCompMut = useMutation({
    mutationFn: () => {
      const scores = [{
        studentId,
        pengoperasian: compState.pengoperasian !== "" ? Number(compState.pengoperasian) : null,
        msWord: compState.msWord !== "" ? Number(compState.msWord) : null,
        msExcel: compState.msExcel !== "" ? Number(compState.msExcel) : null,
        internet: compState.internet !== "" ? Number(compState.internet) : null,
        presentasi: compState.presentasi !== "" ? Number(compState.presentasi) : null
      }];
      return fetchBackend("/api/scores/computer/save", {
        body: {
          token,
          academicYearId: yearId,
          scores
        }
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["computer-scores"]
      });
      if (!autoSave) toast.success("Nilai komputer tersimpan");
      isDirtyRef.current = false;
    },
    onError: (e) => {
      toast.error("Gagal menyimpan komputer");
      isDirtyRef.current = true;
    }
  });
  const saveDiscMut = useMutation({
    mutationFn: () => {
      const scores = [{
        studentId,
        keaktifan: discState.keaktifan !== "" ? Number(discState.keaktifan) : null,
        argumentasi: discState.argumentasi !== "" ? Number(discState.argumentasi) : null,
        kerjasama: discState.kerjasama !== "" ? Number(discState.kerjasama) : null,
        penguasaan: discState.penguasaan !== "" ? Number(discState.penguasaan) : null,
        etika: discState.etika !== "" ? Number(discState.etika) : null
      }];
      return fetchBackend("/api/scores/discussion/save", {
        body: {
          token,
          academicYearId: yearId,
          scores
        }
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["discussion-scores"]
      });
      if (!autoSave) toast.success("Nilai diskusi tersimpan");
      isDirtyRef.current = false;
    },
    onError: (e) => {
      toast.error("Gagal menyimpan diskusi");
      isDirtyRef.current = true;
    }
  });
  const saveAttMut = useMutation({
    mutationFn: () => {
      const attendance = [{
        studentId,
        schoolDays: Number(attState.schoolDays || 0),
        present: Number(attState.present || 0),
        permission: Number(attState.permission || 0),
        absent: Number(attState.absent || 0)
      }];
      return fetchBackend("/api/scores/attendance/save", {
        body: {
          token,
          academicYearId: yearId,
          attendance
        }
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["attendance"]
      });
      if (!autoSave) toast.success("Data kehadiran tersimpan");
      isDirtyRef.current = false;
    },
    onError: (e) => {
      toast.error("Gagal menyimpan kehadiran");
      isDirtyRef.current = true;
    }
  });
  const saveAkademikMutRef = reactExports.useRef(saveAkademikMut);
  const saveSpeechMutRef = reactExports.useRef(saveSpeechMut);
  const saveCompMutRef = reactExports.useRef(saveCompMut);
  const saveDiscMutRef = reactExports.useRef(saveDiscMut);
  const saveAttMutRef = reactExports.useRef(saveAttMut);
  reactExports.useEffect(() => {
    saveAkademikMutRef.current = saveAkademikMut;
  }, [saveAkademikMut]);
  reactExports.useEffect(() => {
    saveSpeechMutRef.current = saveSpeechMut;
  }, [saveSpeechMut]);
  reactExports.useEffect(() => {
    saveCompMutRef.current = saveCompMut;
  }, [saveCompMut]);
  reactExports.useEffect(() => {
    saveDiscMutRef.current = saveDiscMut;
  }, [saveDiscMut]);
  reactExports.useEffect(() => {
    saveAttMutRef.current = saveAttMut;
  }, [saveAttMut]);
  reactExports.useEffect(() => {
    if (!autoSave) return;
    const interval = setInterval(() => {
      if (!isDirtyRef.current) return;
      if (activeTab === "akademik") saveAkademikMutRef.current.mutate();
      else if (activeTab === "pidato") saveSpeechMutRef.current.mutate();
      else if (activeTab === "komputer") saveCompMutRef.current.mutate();
      else if (activeTab === "diskusi") saveDiscMutRef.current.mutate();
      else if (activeTab === "kehadiran") saveAttMutRef.current.mutate();
    }, 5e3);
    return () => clearInterval(interval);
  }, [autoSave, activeTab]);
  if (!yearId || !rombelId) {
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-12 text-center", children: "Data tahun ajaran atau rombel tidak valid." }, void 0, false, {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
      lineNumber: 416,
      columnNumber: 12
    }, this);
  }
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { variant: "outline", size: "icon", onClick: () => navigate({
        to: "/nilai"
      }), children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ArrowLeft, { className: "w-4 h-4" }, void 0, false, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
        lineNumber: 423,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
        lineNumber: 420,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h1", { className: "text-2xl font-bold tracking-tight", children: [
          "Input Nilai: ",
          studentInfo?.full_name
        ] }, void 0, true, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
          lineNumber: 426,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm text-muted-foreground", children: [
          "Stambuk: ",
          studentInfo?.stambuk,
          " | Kelas ",
          classLevel
        ] }, void 0, true, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
          lineNumber: 427,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
        lineNumber: 425,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
      lineNumber: 419,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Card, { className: "shadow-none relative", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardTitle, { className: "text-base", children: "Pengaturan Penyimpanan" }, void 0, false, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
        lineNumber: 433,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center space-x-2 border rounded-md px-3 py-1.5 bg-muted/20", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Switch, { id: "auto-save", checked: autoSave, onCheckedChange: setAutoSave }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
          lineNumber: 435,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Label, { htmlFor: "auto-save", className: "text-xs flex items-center cursor-pointer", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Clock, { className: "w-3.5 h-3.5 mr-1 text-muted-foreground" }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
            lineNumber: 437,
            columnNumber: 15
          }, this),
          " Auto-Save (5s)"
        ] }, void 0, true, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
          lineNumber: 436,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
        lineNumber: 434,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
      lineNumber: 432,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
      lineNumber: 431,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Tabs, { value: activeTab, onValueChange: setActiveTab, children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TabsList, { className: "mb-2", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TabsTrigger, { value: "akademik", children: "Nilai Akademik" }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
          lineNumber: 445,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TabsTrigger, { value: "pidato", children: "Pidato 3 Bahasa" }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
          lineNumber: 446,
          columnNumber: 11
        }, this),
        classLevel >= 4 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TabsTrigger, { value: "komputer", children: "Praktik Komputer" }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
          lineNumber: 447,
          columnNumber: 31
        }, this),
        classLevel >= 5 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TabsTrigger, { value: "diskusi", children: "Diskusi" }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
          lineNumber: 448,
          columnNumber: 31
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TabsTrigger, { value: "kehadiran", children: "Kehadiran" }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
          lineNumber: 449,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
        lineNumber: 444,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TabsContent, { value: "akademik", className: "mt-4", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Card, { className: "shadow-none", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardHeader, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardTitle, { className: "text-sm", children: "Nilai Akademik" }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
          lineNumber: 454,
          columnNumber: 25
        }, this) }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
          lineNumber: 454,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardContent, { children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Table, { children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableHeader, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableRow, { children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableHead, { children: "Mata Pelajaran" }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
                lineNumber: 460,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableHead, { className: "text-center", children: "Tugas" }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
                lineNumber: 461,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableHead, { className: "text-center", children: "UTS" }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
                lineNumber: 462,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableHead, { className: "text-center", children: "UAS" }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
                lineNumber: 463,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
              lineNumber: 459,
              columnNumber: 21
            }, this) }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
              lineNumber: 458,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableBody, { children: (akademikData?.subjects ?? []).map((subj) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableRow, { children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableCell, { className: "font-medium", children: [
                subj.name,
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-[10px] text-muted-foreground font-normal", children: [
                  "Bobot: T:",
                  Math.round(Number(subj.bobot_tugas) * 100),
                  "% U:",
                  Math.round(Number(subj.bobot_uts) * 100),
                  "% A:",
                  Math.round(Number(subj.bobot_uas) * 100),
                  "%"
                ] }, void 0, true, {
                  fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
                  lineNumber: 470,
                  columnNumber: 27
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
                lineNumber: 468,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableCell, { className: "text-center", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ScoreInput, { id: `${subj.id}-tugas`, value: akademikState[`${subj.id}_tugas`] ?? "", onChange: (v) => {
                markDirty();
                setAkademikState((p) => ({
                  ...p,
                  [`${subj.id}_tugas`]: v
                }));
              } }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
                lineNumber: 475,
                columnNumber: 27
              }, this) }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
                lineNumber: 474,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableCell, { className: "text-center", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ScoreInput, { id: `${subj.id}-uts`, value: akademikState[`${subj.id}_uts`] ?? "", onChange: (v) => {
                markDirty();
                setAkademikState((p) => ({
                  ...p,
                  [`${subj.id}_uts`]: v
                }));
              } }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
                lineNumber: 484,
                columnNumber: 27
              }, this) }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
                lineNumber: 483,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableCell, { className: "text-center", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ScoreInput, { id: `${subj.id}-uas`, value: akademikState[`${subj.id}_uas`] ?? "", onChange: (v) => {
                markDirty();
                setAkademikState((p) => ({
                  ...p,
                  [`${subj.id}_uas`]: v
                }));
              } }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
                lineNumber: 493,
                columnNumber: 27
              }, this) }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
                lineNumber: 492,
                columnNumber: 25
              }, this)
            ] }, subj.id, true, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
              lineNumber: 467,
              columnNumber: 72
            }, this)) }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
              lineNumber: 466,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
            lineNumber: 457,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
            lineNumber: 456,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-4 flex justify-end", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { onClick: () => saveAkademikMut.mutate(), disabled: saveAkademikMut.isPending, className: "bg-emerald-600", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Save, { className: "h-4 w-4 mr-2" }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
              lineNumber: 507,
              columnNumber: 19
            }, this),
            " Simpan Nilai Akademik"
          ] }, void 0, true, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
            lineNumber: 506,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
            lineNumber: 505,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
          lineNumber: 455,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
        lineNumber: 453,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
        lineNumber: 452,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TabsContent, { value: "pidato", className: "mt-4", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-4", children: [
        LANGUAGES.map((lang) => {
          const row = speechState[lang] ?? {};
          const vals = SPEECH_ASPECTS.map((a) => Number(row[a] || 0));
          const avg = vals.every((v) => v === 0) ? "—" : (vals.reduce((a, b) => a + b, 0) / 5).toFixed(1);
          return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Card, { className: "shadow-none", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardHeader, { className: "flex flex-row items-center justify-between py-3", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardTitle, { className: "text-sm", children: [
                "Pidato Bahasa ",
                lang
              ] }, void 0, true, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
                lineNumber: 522,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-sm font-semibold", children: [
                "Rata-rata: ",
                avg
              ] }, void 0, true, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
                lineNumber: 523,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
              lineNumber: 521,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardContent, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-2 md:grid-cols-5 gap-4", children: SPEECH_ASPECTS.map((asp) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-1 text-center", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Label, { className: "text-xs", children: SPEECH_LABELS[asp] }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
                lineNumber: 528,
                columnNumber: 27
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ScoreInput, { id: `speech-${lang}-${asp}`, value: row[asp] ?? "", onChange: (v) => {
                markDirty();
                setSpeechState((p) => ({
                  ...p,
                  [lang]: {
                    ...p[lang],
                    [asp]: v
                  }
                }));
              } }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
                lineNumber: 529,
                columnNumber: 27
              }, this)
            ] }, asp, true, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
              lineNumber: 527,
              columnNumber: 50
            }, this)) }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
              lineNumber: 526,
              columnNumber: 21
            }, this) }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
              lineNumber: 525,
              columnNumber: 19
            }, this)
          ] }, lang, true, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
            lineNumber: 520,
            columnNumber: 20
          }, this);
        }),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { onClick: () => saveSpeechMut.mutate(), disabled: saveSpeechMut.isPending, className: "bg-emerald-600", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Save, { className: "h-4 w-4 mr-2" }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
            lineNumber: 546,
            columnNumber: 17
          }, this),
          " Simpan Nilai Pidato"
        ] }, void 0, true, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
          lineNumber: 545,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
          lineNumber: 544,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
        lineNumber: 515,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
        lineNumber: 514,
        columnNumber: 9
      }, this),
      classLevel >= 4 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TabsContent, { value: "komputer", className: "mt-4", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Card, { className: "shadow-none", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardHeader, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardTitle, { className: "text-sm", children: "Nilai Praktik Komputer" }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
          lineNumber: 554,
          columnNumber: 27
        }, this) }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
          lineNumber: 554,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardContent, { children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-2 md:grid-cols-5 gap-4", children: COMPUTER_ASPECTS.map((asp) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-1 text-center", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Label, { className: "text-xs", children: COMPUTER_LABELS[asp] }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
              lineNumber: 558,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ScoreInput, { id: `comp-${asp}`, value: compState[asp] ?? "", onChange: (v) => {
              markDirty();
              setCompState((p) => ({
                ...p,
                [asp]: v
              }));
            } }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
              lineNumber: 559,
              columnNumber: 23
            }, this)
          ] }, asp, true, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
            lineNumber: 557,
            columnNumber: 48
          }, this)) }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
            lineNumber: 556,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-4 flex justify-end", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { onClick: () => saveCompMut.mutate(), disabled: saveCompMut.isPending, className: "bg-emerald-600", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Save, { className: "h-4 w-4 mr-2" }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
              lineNumber: 570,
              columnNumber: 21
            }, this),
            " Simpan Nilai Komputer"
          ] }, void 0, true, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
            lineNumber: 569,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
            lineNumber: 568,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
          lineNumber: 555,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
        lineNumber: 553,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
        lineNumber: 552,
        columnNumber: 29
      }, this),
      classLevel >= 5 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TabsContent, { value: "diskusi", className: "mt-4", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Card, { className: "shadow-none", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardHeader, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardTitle, { className: "text-sm", children: "Nilai Diskusi" }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
          lineNumber: 579,
          columnNumber: 27
        }, this) }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
          lineNumber: 579,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardContent, { children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-2 md:grid-cols-5 gap-4", children: DISCUSSION_ASPECTS.map((asp) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-1 text-center", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Label, { className: "text-xs", children: DISCUSSION_LABELS[asp] }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
              lineNumber: 583,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ScoreInput, { id: `disc-${asp}`, value: discState[asp] ?? "", onChange: (v) => {
              markDirty();
              setDiscState((p) => ({
                ...p,
                [asp]: v
              }));
            } }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
              lineNumber: 584,
              columnNumber: 23
            }, this)
          ] }, asp, true, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
            lineNumber: 582,
            columnNumber: 50
          }, this)) }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
            lineNumber: 581,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-4 flex justify-end", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { onClick: () => saveDiscMut.mutate(), disabled: saveDiscMut.isPending, className: "bg-emerald-600", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Save, { className: "h-4 w-4 mr-2" }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
              lineNumber: 595,
              columnNumber: 21
            }, this),
            " Simpan Nilai Diskusi"
          ] }, void 0, true, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
            lineNumber: 594,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
            lineNumber: 593,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
          lineNumber: 580,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
        lineNumber: 578,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
        lineNumber: 577,
        columnNumber: 29
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TabsContent, { value: "kehadiran", className: "mt-4", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Card, { className: "shadow-none", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardHeader, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardTitle, { className: "text-sm", children: "Data Kehadiran" }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
          lineNumber: 604,
          columnNumber: 25
        }, this) }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
          lineNumber: 604,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardContent, { children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-4 gap-4 max-w-lg", children: ["schoolDays", "present", "permission", "absent"].map((key) => {
            const labels = {
              schoolDays: "Hari Sekolah",
              present: "Hadir",
              permission: "Izin",
              absent: "Alpha"
            };
            return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-1 text-center", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Label, { className: "text-xs", children: labels[key] }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
                lineNumber: 615,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Input, { id: `att-${key}`, className: "h-8 w-16 text-center mx-auto px-1", placeholder: "0", value: attState[key] ?? "", onChange: (e) => {
                const v = e.target.value;
                if (v === "" || /^\d+$/.test(v)) {
                  markDirty();
                  setAttState((p) => ({
                    ...p,
                    [key]: v
                  }));
                }
              } }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
                lineNumber: 616,
                columnNumber: 23
              }, this)
            ] }, key, true, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
              lineNumber: 614,
              columnNumber: 24
            }, this);
          }) }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
            lineNumber: 606,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-4 flex justify-end", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { onClick: () => saveAttMut.mutate(), disabled: saveAttMut.isPending, className: "bg-emerald-600", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Save, { className: "h-4 w-4 mr-2" }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
              lineNumber: 631,
              columnNumber: 19
            }, this),
            " Simpan Kehadiran"
          ] }, void 0, true, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
            lineNumber: 630,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
            lineNumber: 629,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
          lineNumber: 605,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
        lineNumber: 603,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
        lineNumber: 602,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
      lineNumber: 443,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.nilai.$studentId.tsx?tsr-split=component",
    lineNumber: 418,
    columnNumber: 10
  }, this);
}
export {
  NilaiStudentPage as component
};
