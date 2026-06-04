import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { f as useSearch, L as Link } from "../_libs/tanstack__react-router.mjs";
import { B as Button } from "./button-DA2gxxPy.mjs";
import { a as useQuery, b as useQueryClient, u as useMutation } from "../_libs/tanstack__react-query.mjs";
import { f as fetchBackend } from "./fetch-helper-D3HnH3aE.mjs";
import { u as useAuth } from "./use-auth-YByzSFug.mjs";
import { g as getAcademicYearsFn } from "./academic-years.functions-zJEmoTzy.mjs";
import { S as Select, c as SelectTrigger, d as SelectValue, a as SelectContent, b as SelectItem } from "./select-NX1S2Qd-.mjs";
import { L as Label } from "./label-JU3yqRBo.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { S as Switch } from "./switch-CQ4rbtn8.mjs";
import { R as Root, b as Trigger, P as Portal, a as Content, C as Close, T as Title, O as Overlay, D as Description } from "../_libs/radix-ui__react-dialog.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import { j as jsPDF } from "../_libs/jspdf.mjs";
import { h as html2canvas } from "../_libs/html2canvas.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { A as ArrowLeft, p as Search, q as Settings, o as Printer, X } from "../_libs/lucide-react.mjs";
import { R as ResponsiveContainer, a as BarChart, X as XAxis, Y as YAxis, B as Bar, L as LabelList } from "../_libs/recharts.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-switch.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/tailwind-merge.mjs";
import "fs";
import "path";
import "../_libs/fflate.mjs";
import "../_libs/fast-png.mjs";
import "../_libs/iobuffer.mjs";
import "../_libs/pako.mjs";
import "../_libs/dompurify.mjs";
import "../_libs/canvg.mjs";
import "../_libs/core-js.mjs";
import "../_libs/babel__runtime.mjs";
import "../_libs/raf.mjs";
import "../_libs/performance-now.mjs";
import "../_libs/rgbcolor.mjs";
import "../_libs/svg-pathdata.mjs";
import "../_libs/stackblur-canvas.mjs";
import "../_libs/lodash.mjs";
import "../_libs/react-smooth.mjs";
import "../_libs/prop-types.mjs";
import "../_libs/fast-equals.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/react-is.mjs";
import "../_libs/d3-shape.mjs";
import "../_libs/d3-path.mjs";
import "../_libs/victory-vendor.mjs";
import "../_libs/d3-scale.mjs";
import "../_libs/internmap.mjs";
import "../_libs/d3-array.mjs";
import "../_libs/d3-time-format.mjs";
import "../_libs/d3-time.mjs";
import "../_libs/d3-interpolate.mjs";
import "../_libs/d3-color.mjs";
import "../_libs/d3-format.mjs";
import "../_libs/recharts-scale.mjs";
import "../_libs/decimal.js-light.mjs";
import "../_libs/eventemitter3.mjs";
const getPrintSettingsFn = async () => {
  return fetchBackend("/api/print-settings", { method: "GET" });
};
const savePrintSettingsFn = async ({ data }) => {
  return fetchBackend("/api/print-settings/save", { body: data });
};
const getReportCardFn = async ({ data }) => {
  return fetchBackend("/api/reports/card", { body: data });
};
const getStudentsForReportFn = async ({ data }) => {
  return fetchBackend("/api/reports/students", { body: data });
};
const Dialog = Root;
const DialogTrigger = Trigger;
const DialogPortal = Portal;
const DialogOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = Overlay.displayName;
const DialogContent = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = Content.displayName;
const DialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className), ...props });
DialogHeader.displayName = "DialogHeader";
const DialogTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = Title.displayName;
const DialogDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = Description.displayName;
function Rapor() {
  const {
    token
  } = useAuth();
  const search = useSearch({
    from: "/rapor"
  });
  const [yearId, setYearId] = reactExports.useState(search.yearId ?? "");
  const [studentId, setStudentId] = reactExports.useState(search.studentId ?? "");
  const {
    data: years
  } = useQuery({
    queryKey: ["academic-years"],
    queryFn: () => getAcademicYearsFn(),
    enabled: !!token
  });
  reactExports.useEffect(() => {
    if (!yearId && years?.length) {
      const active = years.find((y) => y.is_active) ?? years[0];
      setYearId(active?.id ?? "");
    }
  }, [years, yearId]);
  const {
    data: studentList
  } = useQuery({
    queryKey: ["students-for-report", yearId],
    queryFn: () => getStudentsForReportFn({
      data: {
        token,
        academicYearId: yearId
      }
    }),
    enabled: !!token && !!yearId
  });
  const {
    data: reportCard,
    isLoading,
    error
  } = useQuery({
    queryKey: ["report-card", studentId, yearId],
    queryFn: () => getReportCardFn({
      data: {
        token,
        studentId,
        academicYearId: yearId
      }
    }),
    enabled: !!token && !!studentId && !!yearId
  });
  const [printDate, setPrintDate] = reactExports.useState((/* @__PURE__ */ new Date()).toISOString().split("T")[0]);
  const [headmasterName, setHeadmasterName] = reactExports.useState("");
  const [signatureImage, setSignatureImage] = reactExports.useState("");
  const [showSignature, setShowSignature] = reactExports.useState(true);
  reactExports.useRef(null);
  const qc = useQueryClient();
  const {
    data: dbSettings
  } = useQuery({
    queryKey: ["print-settings"],
    queryFn: () => getPrintSettingsFn(),
    enabled: !!token,
    staleTime: 1e3 * 60 * 5
    // 5 minutes cache
  });
  reactExports.useEffect(() => {
    if (!dbSettings) return;
    if (dbSettings.rapor_date) setPrintDate(dbSettings.rapor_date);
    if (dbSettings.rapor_headmaster) setHeadmasterName(dbSettings.rapor_headmaster);
    if (dbSettings.rapor_signature) setSignatureImage(dbSettings.rapor_signature);
    if (dbSettings.rapor_show_sig !== void 0) setShowSignature(dbSettings.rapor_show_sig !== "false");
  }, [dbSettings]);
  const saveMut = useMutation({
    mutationFn: (settings) => savePrintSettingsFn({
      data: {
        token,
        settings
      }
    }),
    onSuccess: () => qc.invalidateQueries({
      queryKey: ["print-settings"]
    })
  });
  const handleSaveSettings = () => {
    saveMut.mutate({
      rapor_date: printDate,
      rapor_headmaster: headmasterName,
      rapor_signature: signatureImage,
      rapor_show_sig: String(showSignature)
    });
    toast.success("Pengaturan cetak rapor berhasil disimpan!");
  };
  const handleSignatureUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const dataUrl = ev.target?.result;
        setSignatureImage(dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleDownloadPDF = async () => {
    const el = document.getElementById("rapor-print-area");
    if (!el) return;
    toast.info("Sedang membuat PDF...", {
      id: "pdf-toast"
    });
    try {
      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true
      });
      const imgData = canvas.toDataURL("image/jpeg", 1);
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = canvas.height * pdfWidth / canvas.width;
      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Rapor_${reportCard?.student?.full_name?.replace(/\s+/g, "_") || "Santri"}.pdf`);
      toast.success("PDF berhasil diunduh!", {
        id: "pdf-toast"
      });
    } catch (err) {
      console.error(err);
      toast.error("Gagal membuat PDF", {
        id: "pdf-toast"
      });
    }
  };
  const numberToWords = (n) => {
    const ones = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
    const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
    if (n < 20) return ones[n];
    if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? " " + ones[n % 10] : "");
    if (n === 100) return "One Hundred";
    return String(n);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-secondary", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "no-print sticky top-0 z-10 border-b bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[210mm] flex items-center justify-between px-4 py-3 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/dashboard", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4 mr-2" }),
        "Kembali"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-1 justify-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs shrink-0", children: "Tahun Ajaran" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: yearId, onValueChange: (v) => {
            setYearId(v);
            setStudentId("");
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-8 w-36 text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Pilih tahun" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: (years ?? []).map((y) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: y.id, children: y.year }, y.id)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-3.5 w-3.5 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: studentId, onValueChange: setStudentId, disabled: !yearId, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-8 w-52 text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Pilih santri..." }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: (studentList ?? []).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: s.id, children: [
              s.full_name,
              " — Kelas ",
              s.class_level,
              s.rombel_name
            ] }, s.id)) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "h-4 w-4 mr-2" }),
            "Pengaturan Cetak"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Pengaturan Cetak Rapor" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 py-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Tanggal Rapor" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: printDate, onChange: (e) => setPrintDate(e.target.value) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Nama Pimpinan / Penanda Tangan" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: headmasterName, onChange: (e) => setHeadmasterName(e.target.value) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Upload Tanda Tangan (PNG Transparan)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "file", accept: "image/png, image/jpeg", onChange: handleSignatureUpload }),
                signatureImage && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 text-xs text-green-600 flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "✓ Tanda tangan tersimpan" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", className: "h-6 text-red-500", onClick: () => setSignatureImage(""), children: "Hapus" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2 pt-2 border-t", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { id: "show-sig", checked: showSignature, onCheckedChange: setShowSignature }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "show-sig", children: "Tampilkan Tanda Tangan di PDF" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-4 flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleSaveSettings, disabled: saveMut.isPending, children: saveMut.isPending ? "Menyimpan..." : "Simpan Pengaturan" }) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", onClick: handleDownloadPDF, disabled: !reportCard, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "h-4 w-4 mr-2" }),
          "Cetak PDF"
        ] })
      ] })
    ] }) }),
    !studentId && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-32 text-muted-foreground text-sm", children: "Pilih santri untuk melihat rapor." }),
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-32 text-muted-foreground text-sm", children: "Memuat rapor..." }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-32 text-red-500 text-sm", children: error instanceof Error ? error.message : "Gagal memuat rapor" }),
    reportCard && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-8 px-4 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { id: "rapor-print-area", className: "print-area bg-white text-black border shadow-sm", style: {
      width: "210mm",
      minHeight: "297mm",
      padding: "14mm 16mm",
      fontFamily: '"Times New Roman", Times, serif',
      fontSize: "11pt",
      lineHeight: 1.35
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center pb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-[15pt] font-bold tracking-wide", children: "RAUDHATUSSALAM ISLAMIC BOARDING SCHOOL" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10pt] mt-0.5", children: "Gambangan, Mahato, Tambusai Utara, Rokan Hulu" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[12pt] font-bold mt-1", children: "AFTERNOON LESSON ADVISORY COUNCIL" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11pt] mt-0.5", children: "Student Report Sheet" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("hr", { className: "border-black border-y-2 border-x-0 h-1 mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-end mb-4 font-bold italic text-[11pt]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          "Academic Year  :    ",
          reportCard.academicYear?.year || "2025/2026"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mr-8", children: "Semester          :    First" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("table", { className: "w-full text-[11.5pt] mb-6 border-collapse font-serif", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "w-[14%] py-0.5 align-bottom", children: "Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "w-[2%] py-0.5 align-bottom text-center", children: ":" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "w-[84%] py-0.5 align-bottom font-bold border-b border-black", children: reportCard.student?.full_name })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-0.5 align-bottom", children: "Reg. No" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-0.5 align-bottom text-center", children: ":" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-0.5 align-bottom font-bold border-b border-black", children: reportCard.student?.stambuk })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-0.5 align-bottom", children: "Class" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-0.5 align-bottom text-center", children: ":" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-0.5 align-bottom font-bold border-b border-black", children: [
            reportCard.student?.class_level,
            reportCard.student?.rombel_name
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { children: "A. CORE SUBJECT" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full border-collapse text-[10.5pt]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("thead", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-sky-100/50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Th, { w: "6%", rowSpan: 2, children: "No" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Th, { w: "42%", rowSpan: 2, align: "center", children: "Subject" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Th, { colSpan: 2, children: "Study Result Score" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Th, { w: "16%", rowSpan: 2, children: [
              "Class's",
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              "Avg."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-sky-100/50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Th, { w: "18%", children: "Number" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Th, { w: "18%", children: "Letter" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
          reportCard.subjectScores.map((ss, i) => {
            const score = Number(ss.final_score ?? 0);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Td, { center: true, children: i + 1 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Td, { children: ss.subject_name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Td, { center: true, children: score ? score.toFixed(1) : "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Td, { center: true, children: score ? numberToWords(Math.round(score)) : "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Td, { center: true, children: ss.class_avg ? Number(ss.class_avg).toFixed(2) : "—" })
            ] }, ss.id);
          }),
          reportCard.subjectScores.length > 0 && (() => {
            const total = reportCard.subjectScores.reduce((a, b) => a + Number(b.final_score ?? 0), 0);
            const avg = total / reportCard.subjectScores.length;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-gray-100 font-bold", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Td, { colSpan: 2, center: true, children: "Semester Final Grade" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Td, { center: true, className: "font-bold text-[11pt]", children: total.toFixed(0) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Td, { center: true, className: "font-bold text-[11pt]", children: numberToWords(Math.round(total)) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Td, { center: true, className: "bg-white border-none" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-gray-100 font-bold", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Td, { colSpan: 2, center: true, className: "border-none" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Td, { center: true, className: "font-bold text-[11pt]", children: avg.toFixed(1) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Td, { center: true, className: "font-bold text-[11pt]", children: [
                  numberToWords(Math.round(avg)),
                  " point ",
                  Math.round(avg % 1 * 10) === 4 ? "Four" : "Zero"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Td, { center: true, className: "bg-white border-none" })
              ] })
            ] });
          })()
        ] })
      ] }),
      reportCard.speechScores.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { children: "B. Applied Speech Skill" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 px-8 relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
          width: "100%",
          height: 160
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: reportCard.speechScores.map((s) => ({
          lang: s.language + " Speech",
          value: Number(s.final_score ?? 0)
        })), layout: "vertical", margin: {
          left: 100,
          right: 30,
          top: 10,
          bottom: 10
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { type: "number", domain: [0, 9], tickCount: 10, axisLine: false, tickLine: false, tick: {
            fontSize: 10,
            fill: "#666"
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { dataKey: "lang", type: "category", axisLine: false, tickLine: false, tick: {
            fontSize: 11,
            fill: "#333",
            fontStyle: "italic"
          }, width: 120 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "value", fill: "#4f81bd", barSize: 12, children: /* @__PURE__ */ jsxRuntimeExports.jsx(LabelList, { dataKey: "value", position: "right", style: {
            fontSize: 10,
            fill: "#333",
            fontWeight: "bold"
          }, formatter: (val) => val.toFixed(0) }) })
        ] }) }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { children: "C. Student Attendance Record" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full border-collapse text-[10.5pt]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-sky-100/50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Th, { w: "8%", children: "No" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Th, { align: "center", children: "Attendance Details" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Th, { w: "35%", colSpan: 2, children: "Values" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: [["School Days", reportCard.attendance?.school_days ?? "—"], ["Present Days", reportCard.attendance?.present ?? "—"], ["Permission Days", reportCard.attendance?.permission ?? "—"], ["Absent Days", reportCard.attendance?.absent ?? "—"]].map(([label, val], i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Td, { center: true, children: i + 1 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Td, { children: String(label) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Td, { center: true, className: "border-r-0 w-[20%]", children: String(val) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Td, { center: true, className: "border-l-0 text-left w-[15%]", children: "Days" })
          ] }, String(label))) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 flex justify-end mr-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center text-[11pt]", style: {
        minWidth: 280
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "Mahato, ",
          new Date(printDate).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric"
          })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Principal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
          height: 80,
          position: "relative"
        }, className: "flex justify-center items-center", children: showSignature && signatureImage && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: signatureImage, alt: "Signature", style: {
          maxHeight: "80px",
          maxWidth: "200px",
          objectFit: "contain"
        } }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold", children: headmasterName || "________________________" })
      ] }) })
    ] }) })
  ] });
}
function SectionTitle({
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-5 mb-2 text-[11.5pt] font-bold border-b border-black", children });
}
function Th({
  children,
  w,
  align = "center",
  colSpan
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("th", { colSpan, style: {
    width: w,
    textAlign: align
  }, className: "border border-black px-2 py-1 font-semibold", children });
}
function Td({
  children,
  center,
  colSpan
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan, className: "border border-black px-2 py-1", style: {
    textAlign: center ? "center" : "left"
  }, children });
}
export {
  Rapor as component
};
