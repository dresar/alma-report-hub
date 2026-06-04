import { r as reactExports, j as jsxDevRuntimeExports } from "../_libs/react.mjs";
import { f as useSearch, L as Link } from "../_libs/tanstack__react-router.mjs";
import { B as Button } from "./button-CM0KjKCo.mjs";
import { a as useQuery, b as useQueryClient, u as useMutation } from "../_libs/tanstack__react-query.mjs";
import { c as createSsrRpc } from "./createSsrRpc-_V2Ptgae.mjs";
import { b as createServerFn } from "./server-B2xBzUrm.mjs";
import { u as useAuth } from "./use-auth-YByzSFug.mjs";
import { g as getAcademicYearsFn } from "./academic-years-Ctlthb4h.mjs";
import { S as Select, c as SelectTrigger, d as SelectValue, a as SelectContent, b as SelectItem } from "./select-WXuL3P7I.mjs";
import { L as Label } from "./label-B5xHsmXM.mjs";
import { I as Input } from "./input-Dxdu6HuB.mjs";
import { S as Switch } from "./switch-Br5LMiLZ.mjs";
import { R as Root, b as Trigger, P as Portal, a as Content, C as Close, T as Title, O as Overlay, D as Description } from "../_libs/radix-ui__react-dialog.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import { j as jsPDF } from "../_libs/jspdf.mjs";
import { h as html2canvas } from "../_libs/html2canvas.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { A as ArrowLeft, p as Search, q as Settings, o as Printer, X } from "../_libs/lucide-react.mjs";
import { R as ResponsiveContainer, a as BarChart, X as XAxis, Y as YAxis, B as Bar, L as LabelList } from "../_libs/recharts.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "crypto";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tanstack__query-core.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
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
import "path";
import "../_libs/fflate.mjs";
import "../_libs/fast-png.mjs";
import "../_libs/iobuffer.mjs";
import "../_libs/pako.mjs";
import "fs";
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
const getPrintSettingsFn = createServerFn().handler(createSsrRpc("177d130c3ffe872091455b2626b6320243772083af3159ecd08782d86f7e0884"));
const savePrintSettingsFn = createServerFn().validator((data) => data).handler(createSsrRpc("42e90d44ad3b466567a6fbb9d45eb93a6af4275b7edff56909d78b7eac4c0c04"));
const getReportCardFn = createServerFn().validator((data) => data).handler(createSsrRpc("02c5b2b7a6bafd8ae75f068a47e31f85f38d0598b728ca196e876ce7b830a76b"));
const getReportStudentsFn = createServerFn().validator((data) => data).handler(createSsrRpc("f1829c3ea7c1e27e07b5831819d43408fbbcf70d3e3d1737d7f0e37e36b72350"));
const Dialog = Root;
const DialogTrigger = Trigger;
const DialogPortal = Portal;
const DialogOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
  Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  },
  void 0,
  false,
  {
    fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/dialog.tsx",
    lineNumber: 21,
    columnNumber: 3
  },
  void 0
));
DialogOverlay.displayName = Overlay.displayName;
const DialogContent = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(DialogPortal, { children: [
  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(DialogOverlay, {}, void 0, false, {
    fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/dialog.tsx",
    lineNumber: 37,
    columnNumber: 5
  }, void 0),
  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
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
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(X, { className: "h-4 w-4" }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/dialog.tsx",
            lineNumber: 48,
            columnNumber: 9
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "sr-only", children: "Close" }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/dialog.tsx",
            lineNumber: 49,
            columnNumber: 9
          }, void 0)
        ] }, void 0, true, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/dialog.tsx",
          lineNumber: 47,
          columnNumber: 7
        }, void 0)
      ]
    },
    void 0,
    true,
    {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/dialog.tsx",
      lineNumber: 38,
      columnNumber: 5
    },
    void 0
  )
] }, void 0, true, {
  fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/dialog.tsx",
  lineNumber: 36,
  columnNumber: 3
}, void 0));
DialogContent.displayName = Content.displayName;
const DialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className), ...props }, void 0, false, {
  fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/dialog.tsx",
  lineNumber: 57,
  columnNumber: 3
}, void 0);
DialogHeader.displayName = "DialogHeader";
const DialogTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
  Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  },
  void 0,
  false,
  {
    fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/dialog.tsx",
    lineNumber: 73,
    columnNumber: 3
  },
  void 0
));
DialogTitle.displayName = Title.displayName;
const DialogDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
  Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  },
  void 0,
  false,
  {
    fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/components/ui/dialog.tsx",
    lineNumber: 85,
    columnNumber: 3
  },
  void 0
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
    queryFn: () => getReportStudentsFn({
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
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "min-h-screen bg-secondary", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "no-print sticky top-0 z-10 border-b bg-card", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mx-auto max-w-[210mm] flex items-center justify-between px-4 py-3 gap-3", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { variant: "ghost", size: "sm", asChild: true, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Link, { to: "/dashboard", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ArrowLeft, { className: "h-4 w-4 mr-2" }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
          lineNumber: 167,
          columnNumber: 15
        }, this),
        "Kembali"
      ] }, void 0, true, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
        lineNumber: 166,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
        lineNumber: 165,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-3 flex-1 justify-center", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Label, { className: "text-xs shrink-0", children: "Tahun Ajaran" }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
            lineNumber: 173,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Select, { value: yearId, onValueChange: (v) => {
            setYearId(v);
            setStudentId("");
          }, children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectTrigger, { className: "h-8 w-36 text-xs", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectValue, { placeholder: "Pilih tahun" }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
              lineNumber: 179,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
              lineNumber: 178,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectContent, { children: (years ?? []).map((y) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectItem, { value: y.id, children: y.year }, y.id, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
              lineNumber: 182,
              columnNumber: 43
            }, this)) }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
              lineNumber: 181,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
            lineNumber: 174,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
          lineNumber: 172,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Search, { className: "h-3.5 w-3.5 text-muted-foreground" }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
            lineNumber: 187,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Select, { value: studentId, onValueChange: setStudentId, disabled: !yearId, children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectTrigger, { className: "h-8 w-52 text-xs", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectValue, { placeholder: "Pilih santri..." }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
              lineNumber: 190,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
              lineNumber: 189,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectContent, { children: (studentList ?? []).map((s) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectItem, { value: s.id, children: [
              s.full_name,
              " — Kelas ",
              s.class_level,
              s.rombel_name
            ] }, s.id, true, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
              lineNumber: 193,
              columnNumber: 49
            }, this)) }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
              lineNumber: 192,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
            lineNumber: 188,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
          lineNumber: 186,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
        lineNumber: 171,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Dialog, { children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { variant: "outline", size: "sm", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Settings, { className: "h-4 w-4 mr-2" }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
              lineNumber: 205,
              columnNumber: 19
            }, this),
            "Pengaturan Cetak"
          ] }, void 0, true, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
            lineNumber: 204,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
            lineNumber: 203,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(DialogContent, { children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(DialogHeader, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(DialogTitle, { children: "Pengaturan Cetak Rapor" }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
              lineNumber: 211,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
              lineNumber: 210,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-4 py-4", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Label, { children: "Tanggal Rapor" }, void 0, false, {
                  fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
                  lineNumber: 215,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Input, { type: "date", value: printDate, onChange: (e) => setPrintDate(e.target.value) }, void 0, false, {
                  fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
                  lineNumber: 216,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
                lineNumber: 214,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Label, { children: "Nama Pimpinan / Penanda Tangan" }, void 0, false, {
                  fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
                  lineNumber: 219,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Input, { value: headmasterName, onChange: (e) => setHeadmasterName(e.target.value) }, void 0, false, {
                  fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
                  lineNumber: 220,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
                lineNumber: 218,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Label, { children: "Upload Tanda Tangan (PNG Transparan)" }, void 0, false, {
                  fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
                  lineNumber: 223,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Input, { type: "file", accept: "image/png, image/jpeg", onChange: handleSignatureUpload }, void 0, false, {
                  fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
                  lineNumber: 224,
                  columnNumber: 21
                }, this),
                signatureImage && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-2 text-xs text-green-600 flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: "✓ Tanda tangan tersimpan" }, void 0, false, {
                    fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
                    lineNumber: 226,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { variant: "ghost", size: "sm", className: "h-6 text-red-500", onClick: () => setSignatureImage(""), children: "Hapus" }, void 0, false, {
                    fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
                    lineNumber: 227,
                    columnNumber: 25
                  }, this)
                ] }, void 0, true, {
                  fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
                  lineNumber: 225,
                  columnNumber: 40
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
                lineNumber: 222,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center space-x-2 pt-2 border-t", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Switch, { id: "show-sig", checked: showSignature, onCheckedChange: setShowSignature }, void 0, false, {
                  fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
                  lineNumber: 233,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Label, { htmlFor: "show-sig", children: "Tampilkan Tanda Tangan di PDF" }, void 0, false, {
                  fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
                  lineNumber: 234,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
                lineNumber: 232,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "pt-4 flex justify-end", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { onClick: handleSaveSettings, disabled: saveMut.isPending, children: saveMut.isPending ? "Menyimpan..." : "Simpan Pengaturan" }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
                lineNumber: 237,
                columnNumber: 21
              }, this) }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
                lineNumber: 236,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
              lineNumber: 213,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
            lineNumber: 209,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
          lineNumber: 202,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { size: "sm", onClick: handleDownloadPDF, disabled: !reportCard, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Printer, { className: "h-4 w-4 mr-2" }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
            lineNumber: 246,
            columnNumber: 15
          }, this),
          "Cetak PDF"
        ] }, void 0, true, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
          lineNumber: 245,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
        lineNumber: 201,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
      lineNumber: 164,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
      lineNumber: 163,
      columnNumber: 7
    }, this),
    !studentId && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-center py-32 text-muted-foreground text-sm", children: "Pilih santri untuk melihat rapor." }, void 0, false, {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
      lineNumber: 254,
      columnNumber: 22
    }, this),
    isLoading && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-center py-32 text-muted-foreground text-sm", children: "Memuat rapor..." }, void 0, false, {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
      lineNumber: 257,
      columnNumber: 21
    }, this),
    error && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-center py-32 text-red-500 text-sm", children: error instanceof Error ? error.message : "Gagal memuat rapor" }, void 0, false, {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
      lineNumber: 260,
      columnNumber: 17
    }, this),
    reportCard && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "py-8 px-4 flex justify-center", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { id: "rapor-print-area", className: "print-area bg-white text-black border shadow-sm", style: {
      width: "210mm",
      minHeight: "297mm",
      padding: "14mm 16mm",
      fontFamily: '"Times New Roman", Times, serif',
      fontSize: "11pt",
      lineHeight: 1.35
    }, children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center pb-2", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h1", { className: "text-[15pt] font-bold tracking-wide", children: "RAUDHATUSSALAM ISLAMIC BOARDING SCHOOL" }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
          lineNumber: 276,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-[10pt] mt-0.5", children: "Gambangan, Mahato, Tambusai Utara, Rokan Hulu" }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
          lineNumber: 279,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "text-[12pt] font-bold mt-1", children: "AFTERNOON LESSON ADVISORY COUNCIL" }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
          lineNumber: 282,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-[11pt] mt-0.5", children: "Student Report Sheet" }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
          lineNumber: 285,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
        lineNumber: 275,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("hr", { className: "border-black border-y-2 border-x-0 h-1 mb-4" }, void 0, false, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
        lineNumber: 289,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex justify-between items-end mb-4 font-bold italic text-[11pt]", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
          "Academic Year  :    ",
          reportCard.academicYear?.year || "2025/2026"
        ] }, void 0, true, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
          lineNumber: 292,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mr-8", children: "Semester          :    First" }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
          lineNumber: 293,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
        lineNumber: 291,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("table", { className: "w-full text-[11.5pt] mb-6 border-collapse font-serif", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("tbody", { children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("tr", { children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("td", { className: "w-[14%] py-0.5 align-bottom", children: "Name" }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
            lineNumber: 299,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("td", { className: "w-[2%] py-0.5 align-bottom text-center", children: ":" }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
            lineNumber: 300,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("td", { className: "w-[84%] py-0.5 align-bottom font-bold border-b border-black", children: reportCard.student?.full_name }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
            lineNumber: 301,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
          lineNumber: 298,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("tr", { children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("td", { className: "py-0.5 align-bottom", children: "Reg. No" }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
            lineNumber: 306,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("td", { className: "py-0.5 align-bottom text-center", children: ":" }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
            lineNumber: 307,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("td", { className: "py-0.5 align-bottom font-bold border-b border-black", children: reportCard.student?.stambuk }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
            lineNumber: 308,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
          lineNumber: 305,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("tr", { children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("td", { className: "py-0.5 align-bottom", children: "Class" }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
            lineNumber: 313,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("td", { className: "py-0.5 align-bottom text-center", children: ":" }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
            lineNumber: 314,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("td", { className: "py-0.5 align-bottom font-bold border-b border-black", children: [
            reportCard.student?.class_level,
            reportCard.student?.rombel_name
          ] }, void 0, true, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
            lineNumber: 315,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
          lineNumber: 312,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
        lineNumber: 297,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
        lineNumber: 296,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SectionTitle, { children: "A. CORE SUBJECT" }, void 0, false, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
        lineNumber: 323,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("table", { className: "w-full border-collapse text-[10.5pt]", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("thead", { children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("tr", { className: "bg-sky-100/50", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Th, { w: "6%", rowSpan: 2, children: "No" }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
              lineNumber: 327,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Th, { w: "42%", rowSpan: 2, align: "center", children: "Subject" }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
              lineNumber: 328,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Th, { colSpan: 2, children: "Study Result Score" }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
              lineNumber: 329,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Th, { w: "16%", rowSpan: 2, children: [
              "Class's",
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("br", {}, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
                lineNumber: 330,
                columnNumber: 50
              }, this),
              "Avg."
            ] }, void 0, true, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
              lineNumber: 330,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
            lineNumber: 326,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("tr", { className: "bg-sky-100/50", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Th, { w: "18%", children: "Number" }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
              lineNumber: 333,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Th, { w: "18%", children: "Letter" }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
              lineNumber: 334,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
            lineNumber: 332,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
          lineNumber: 325,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("tbody", { children: [
          reportCard.subjectScores.map((ss, i) => {
            const score = Number(ss.final_score ?? 0);
            return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("tr", { children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Td, { center: true, children: i + 1 }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
                lineNumber: 341,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Td, { children: ss.subject_name }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
                lineNumber: 342,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Td, { center: true, children: score ? score.toFixed(1) : "—" }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
                lineNumber: 343,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Td, { center: true, children: score ? numberToWords(Math.round(score)) : "—" }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
                lineNumber: 344,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Td, { center: true, children: ss.class_avg ? Number(ss.class_avg).toFixed(2) : "—" }, void 0, false, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
                lineNumber: 345,
                columnNumber: 23
              }, this)
            ] }, ss.id, true, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
              lineNumber: 340,
              columnNumber: 22
            }, this);
          }),
          reportCard.subjectScores.length > 0 && (() => {
            const total = reportCard.subjectScores.reduce((a, b) => a + Number(b.final_score ?? 0), 0);
            const avg = total / reportCard.subjectScores.length;
            return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("tr", { className: "bg-gray-100 font-bold", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Td, { colSpan: 2, center: true, children: "Semester Final Grade" }, void 0, false, {
                  fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
                  lineNumber: 353,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Td, { center: true, className: "font-bold text-[11pt]", children: total.toFixed(0) }, void 0, false, {
                  fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
                  lineNumber: 354,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Td, { center: true, className: "font-bold text-[11pt]", children: numberToWords(Math.round(total)) }, void 0, false, {
                  fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
                  lineNumber: 355,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Td, { center: true, className: "bg-white border-none" }, void 0, false, {
                  fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
                  lineNumber: 356,
                  columnNumber: 25
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
                lineNumber: 352,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("tr", { className: "bg-gray-100 font-bold", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Td, { colSpan: 2, center: true, className: "border-none" }, void 0, false, {
                  fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
                  lineNumber: 359,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Td, { center: true, className: "font-bold text-[11pt]", children: avg.toFixed(1) }, void 0, false, {
                  fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
                  lineNumber: 360,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Td, { center: true, className: "font-bold text-[11pt]", children: [
                  numberToWords(Math.round(avg)),
                  " point ",
                  Math.round(avg % 1 * 10) === 4 ? "Four" : "Zero"
                ] }, void 0, true, {
                  fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
                  lineNumber: 361,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Td, { center: true, className: "bg-white border-none" }, void 0, false, {
                  fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
                  lineNumber: 362,
                  columnNumber: 25
                }, this)
              ] }, void 0, true, {
                fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
                lineNumber: 358,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
              lineNumber: 351,
              columnNumber: 22
            }, this);
          })()
        ] }, void 0, true, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
          lineNumber: 337,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
        lineNumber: 324,
        columnNumber: 13
      }, this),
      reportCard.speechScores.length > 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-8", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SectionTitle, { children: "B. Applied Speech Skill" }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
          lineNumber: 371,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-4 px-8 relative", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
          width: "100%",
          height: 160
        }, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ResponsiveContainer, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(BarChart, { data: reportCard.speechScores.map((s) => ({
          lang: s.language + " Speech",
          value: Number(s.final_score ?? 0)
        })), layout: "vertical", margin: {
          left: 100,
          right: 30,
          top: 10,
          bottom: 10
        }, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(XAxis, { type: "number", domain: [0, 9], tickCount: 10, axisLine: false, tickLine: false, tick: {
            fontSize: 10,
            fill: "#666"
          } }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
            lineNumber: 387,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(YAxis, { dataKey: "lang", type: "category", axisLine: false, tickLine: false, tick: {
            fontSize: 11,
            fill: "#333",
            fontStyle: "italic"
          }, width: 120 }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
            lineNumber: 391,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Bar, { dataKey: "value", fill: "#4f81bd", barSize: 12, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(LabelList, { dataKey: "value", position: "right", style: {
            fontSize: 10,
            fill: "#333",
            fontWeight: "bold"
          }, formatter: (val) => val.toFixed(0) }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
            lineNumber: 397,
            columnNumber: 27
          }, this) }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
            lineNumber: 396,
            columnNumber: 25
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
          lineNumber: 378,
          columnNumber: 23
        }, this) }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
          lineNumber: 377,
          columnNumber: 21
        }, this) }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
          lineNumber: 373,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
          lineNumber: 372,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
        lineNumber: 370,
        columnNumber: 52
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SectionTitle, { children: "C. Student Attendance Record" }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
          lineNumber: 412,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("table", { className: "w-full border-collapse text-[10.5pt]", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("thead", { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("tr", { className: "bg-sky-100/50", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Th, { w: "8%", children: "No" }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
              lineNumber: 418,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Th, { align: "center", children: "Attendance Details" }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
              lineNumber: 419,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Th, { w: "35%", colSpan: 2, children: "Values" }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
              lineNumber: 420,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
            lineNumber: 417,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
            lineNumber: 416,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("tbody", { children: [["School Days", reportCard.attendance?.school_days ?? "—"], ["Present Days", reportCard.attendance?.present ?? "—"], ["Permission Days", reportCard.attendance?.permission ?? "—"], ["Absent Days", reportCard.attendance?.absent ?? "—"]].map(([label, val], i) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("tr", { children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Td, { center: true, children: i + 1 }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
              lineNumber: 425,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Td, { children: String(label) }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
              lineNumber: 426,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Td, { center: true, className: "border-r-0 w-[20%]", children: String(val) }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
              lineNumber: 427,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Td, { center: true, className: "border-l-0 text-left w-[15%]", children: "Days" }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
              lineNumber: 428,
              columnNumber: 23
            }, this)
          ] }, String(label), true, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
            lineNumber: 424,
            columnNumber: 281
          }, this)) }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
            lineNumber: 423,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
          lineNumber: 415,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
        lineNumber: 411,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-10 flex justify-end mr-4", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-center text-[11pt]", style: {
        minWidth: 280
      }, children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { children: [
          "Mahato, ",
          new Date(printDate).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric"
          })
        ] }, void 0, true, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
          lineNumber: 439,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { children: "Principal" }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
          lineNumber: 444,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: {
          height: 80,
          position: "relative"
        }, className: "flex justify-center items-center", children: showSignature && signatureImage && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("img", { src: signatureImage, alt: "Signature", style: {
          maxHeight: "80px",
          maxWidth: "200px",
          objectFit: "contain"
        } }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
          lineNumber: 449,
          columnNumber: 55
        }, this) }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
          lineNumber: 445,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "font-bold", children: headmasterName || "________________________" }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
          lineNumber: 455,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
        lineNumber: 436,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
        lineNumber: 435,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
      lineNumber: 266,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
      lineNumber: 265,
      columnNumber: 22
    }, this)
  ] }, void 0, true, {
    fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
    lineNumber: 161,
    columnNumber: 10
  }, this);
}
function SectionTitle({
  children
}) {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "mt-5 mb-2 text-[11.5pt] font-bold border-b border-black", children }, void 0, false, {
    fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
    lineNumber: 467,
    columnNumber: 10
  }, this);
}
function Th({
  children,
  w,
  align = "center",
  colSpan
}) {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("th", { colSpan, style: {
    width: w,
    textAlign: align
  }, className: "border border-black px-2 py-1 font-semibold", children }, void 0, false, {
    fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
    lineNumber: 480,
    columnNumber: 10
  }, this);
}
function Td({
  children,
  center,
  colSpan
}) {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("td", { colSpan, className: "border border-black px-2 py-1", style: {
    textAlign: center ? "center" : "left"
  }, children }, void 0, false, {
    fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/rapor.tsx?tsr-split=component",
    lineNumber: 496,
    columnNumber: 10
  }, this);
}
export {
  Rapor as component
};
