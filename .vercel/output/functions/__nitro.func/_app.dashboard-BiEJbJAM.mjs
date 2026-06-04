import { j as jsxDevRuntimeExports } from "./_libs/react.mjs";
import { C as Card, a as CardContent, c as CardHeader, d as CardTitle } from "./_ssr/card-BhYvH4ns.mjs";
import { T as Table, d as TableHeader, e as TableRow, c as TableHead, a as TableBody, b as TableCell } from "./_ssr/table-CTsyOdB_.mjs";
import { B as Badge } from "./_ssr/badge-DiP6vzkd.mjs";
import { a as useQuery } from "./_libs/tanstack__react-query.mjs";
import { u as useAuth } from "./_ssr/use-auth-YByzSFug.mjs";
import { c as createSsrRpc } from "./_ssr/createSsrRpc-_V2Ptgae.mjs";
import { b as createServerFn } from "./_ssr/server-B2xBzUrm.mjs";
import { g as getAcademicYearsFn } from "./_ssr/academic-years-Ctlthb4h.mjs";
import "./_libs/seroval.mjs";
import { v as Users, G as GraduationCap, k as LayoutGrid, s as TrendingUp } from "./_libs/lucide-react.mjs";
import { R as ResponsiveContainer, d as LineChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, c as Line, a as BarChart, b as Legend, B as Bar } from "./_libs/recharts.mjs";
import "./_ssr/utils-H80jjgLf.mjs";
import "./_libs/clsx.mjs";
import "./_libs/tailwind-merge.mjs";
import "./_libs/class-variance-authority.mjs";
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
import "./_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "crypto";
import "stream";
import "./_libs/isbot.mjs";
import "./_libs/lodash.mjs";
import "./_libs/react-smooth.mjs";
import "./_libs/prop-types.mjs";
import "./_libs/fast-equals.mjs";
import "./_libs/tiny-invariant.mjs";
import "./_libs/react-is.mjs";
import "./_libs/d3-shape.mjs";
import "./_libs/d3-path.mjs";
import "./_libs/victory-vendor.mjs";
import "./_libs/d3-scale.mjs";
import "./_libs/internmap.mjs";
import "./_libs/d3-array.mjs";
import "./_libs/d3-time-format.mjs";
import "./_libs/d3-time.mjs";
import "./_libs/d3-interpolate.mjs";
import "./_libs/d3-color.mjs";
import "./_libs/d3-format.mjs";
import "./_libs/recharts-scale.mjs";
import "./_libs/decimal.js-light.mjs";
import "./_libs/eventemitter3.mjs";
const getDashboardStatsFn = createServerFn().validator((data) => data).handler(createSsrRpc("878748079e9e832d22022a4dbd5dc08fc9eaa3323bf78b869a875df6aca0b001"));
const getTopStudentsFn = createServerFn().validator((data) => data).handler(createSsrRpc("d98d23431d158ea0334a5e801b55e51818193bfbe45ad5d308e9027d4b28434b"));
const getValueTrendFn = createServerFn().validator((data) => data).handler(createSsrRpc("7b62f31003d29093ec89391258d659611da670a134ffc141e57219f951677f57"));
createServerFn().validator((data) => data).handler(createSsrRpc("c52d88890e9cdeee6d9ddc04253872daea613898ba109398dc8958d0e44cca17"));
function Dashboard() {
  const {
    token
  } = useAuth();
  const {
    data: years
  } = useQuery({
    queryKey: ["academic-years"],
    queryFn: () => getAcademicYearsFn(),
    enabled: !!token
  });
  const activeYear = years?.find((y) => y.is_active);
  const {
    data: stats
  } = useQuery({
    queryKey: ["dashboard-stats", activeYear?.id],
    queryFn: () => getDashboardStatsFn({
      data: {
        token,
        academicYearId: activeYear?.id
      }
    }),
    enabled: !!token && !!activeYear
  });
  const {
    data: topStudents
  } = useQuery({
    queryKey: ["top-students", activeYear?.id],
    queryFn: () => getTopStudentsFn({
      data: {
        token,
        academicYearId: activeYear.id,
        limit: 10
      }
    }),
    enabled: !!token && !!activeYear
  });
  const {
    data: trend
  } = useQuery({
    queryKey: ["value-trend"],
    queryFn: () => getValueTrendFn({
      data: {
        token
      }
    }),
    enabled: !!token
  });
  const statCards = [{
    label: "Total Santri Aktif",
    value: stats?.totalStudents ?? "—",
    icon: Users,
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-950"
  }, {
    label: "Total Kelas",
    value: stats?.totalClasses ?? "—",
    icon: GraduationCap,
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-950"
  }, {
    label: "Rombel Aktif",
    value: stats?.totalRombels ?? "—",
    icon: LayoutGrid,
    color: "text-violet-500",
    bg: "bg-violet-50 dark:bg-violet-950"
  }, {
    label: "Rata-rata Nilai",
    value: stats?.avgScore != null ? stats.avgScore.toFixed(1) : "—",
    icon: TrendingUp,
    color: "text-amber-500",
    bg: "bg-amber-50 dark:bg-amber-950"
  }];
  const trendData = (trend ?? []).map((t) => ({
    tahun: t.year,
    rataRata: Number(t.rata_rata)
  }));
  const topChartData = (topStudents ?? []).slice(0, 8).map((s) => ({
    nama: s.name?.split(" ").slice(0, 2).join(" "),
    nilai: Number(s.avg_score),
    kelas: s.kelas_rombel
  }));
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-6", children: [
    activeYear && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: "Tahun Ajaran Aktif:" }, void 0, false, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.dashboard.tsx?tsr-split=component",
        lineNumber: 99,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Badge, { variant: "outline", className: "font-semibold", children: activeYear.year }, void 0, false, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.dashboard.tsx?tsr-split=component",
        lineNumber: 100,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.dashboard.tsx?tsr-split=component",
      lineNumber: 98,
      columnNumber: 22
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: statCards.map((s) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Card, { className: "shadow-none border", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardContent, { className: "p-4 flex items-center gap-4", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: `h-11 w-11 rounded-xl ${s.bg} flex items-center justify-center`, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(s.icon, { className: `h-5 w-5 ${s.color}` }, void 0, false, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.dashboard.tsx?tsr-split=component",
        lineNumber: 108,
        columnNumber: 17
      }, this) }, void 0, false, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.dashboard.tsx?tsr-split=component",
        lineNumber: 107,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-xs text-muted-foreground", children: s.label }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.dashboard.tsx?tsr-split=component",
          lineNumber: 111,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-2xl font-bold", children: s.value }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.dashboard.tsx?tsr-split=component",
          lineNumber: 112,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.dashboard.tsx?tsr-split=component",
        lineNumber: 110,
        columnNumber: 15
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.dashboard.tsx?tsr-split=component",
      lineNumber: 106,
      columnNumber: 13
    }, this) }, s.label, false, {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.dashboard.tsx?tsr-split=component",
      lineNumber: 105,
      columnNumber: 29
    }, this)) }, void 0, false, {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.dashboard.tsx?tsr-split=component",
      lineNumber: 104,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid lg:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Card, { className: "shadow-none", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardHeader, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardTitle, { className: "text-base", children: "Tren Rata-rata Nilai Tahunan" }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.dashboard.tsx?tsr-split=component",
          lineNumber: 122,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.dashboard.tsx?tsr-split=component",
          lineNumber: 121,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardContent, { className: "h-72", children: trendData.length > 0 ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(LineChart, { data: trendData, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CartesianGrid, { strokeDasharray: "3 3", stroke: "hsl(var(--border))" }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.dashboard.tsx?tsr-split=component",
            lineNumber: 127,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(XAxis, { dataKey: "tahun", fontSize: 11 }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.dashboard.tsx?tsr-split=component",
            lineNumber: 128,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(YAxis, { domain: [0, 100], fontSize: 11 }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.dashboard.tsx?tsr-split=component",
            lineNumber: 129,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Tooltip, {}, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.dashboard.tsx?tsr-split=component",
            lineNumber: 130,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Line, { type: "monotone", dataKey: "rataRata", name: "Rata-rata", stroke: "#10b981", strokeWidth: 2, dot: {
            r: 4
          } }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.dashboard.tsx?tsr-split=component",
            lineNumber: 131,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.dashboard.tsx?tsr-split=component",
          lineNumber: 126,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.dashboard.tsx?tsr-split=component",
          lineNumber: 125,
          columnNumber: 37
        }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "h-full flex items-center justify-center text-sm text-muted-foreground", children: "Belum ada data nilai" }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.dashboard.tsx?tsr-split=component",
          lineNumber: 135,
          columnNumber: 40
        }, this) }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.dashboard.tsx?tsr-split=component",
          lineNumber: 124,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.dashboard.tsx?tsr-split=component",
        lineNumber: 120,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Card, { className: "shadow-none", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardHeader, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardTitle, { className: "text-base", children: "Top Santri — Nilai Tertinggi" }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.dashboard.tsx?tsr-split=component",
          lineNumber: 143,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.dashboard.tsx?tsr-split=component",
          lineNumber: 142,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardContent, { className: "h-72", children: topChartData.length > 0 ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(BarChart, { data: topChartData, layout: "vertical", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CartesianGrid, { strokeDasharray: "3 3" }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.dashboard.tsx?tsr-split=component",
            lineNumber: 148,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(XAxis, { type: "number", domain: [0, 100], fontSize: 11 }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.dashboard.tsx?tsr-split=component",
            lineNumber: 149,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(YAxis, { dataKey: "nama", type: "category", width: 100, fontSize: 11 }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.dashboard.tsx?tsr-split=component",
            lineNumber: 150,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Tooltip, {}, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.dashboard.tsx?tsr-split=component",
            lineNumber: 151,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Legend, {}, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.dashboard.tsx?tsr-split=component",
            lineNumber: 152,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Bar, { dataKey: "nilai", name: "Nilai", fill: "#10b981", radius: [0, 4, 4, 0] }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.dashboard.tsx?tsr-split=component",
            lineNumber: 153,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.dashboard.tsx?tsr-split=component",
          lineNumber: 147,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.dashboard.tsx?tsr-split=component",
          lineNumber: 146,
          columnNumber: 40
        }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "h-full flex items-center justify-center text-sm text-muted-foreground", children: "Belum ada data nilai" }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.dashboard.tsx?tsr-split=component",
          lineNumber: 155,
          columnNumber: 40
        }, this) }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.dashboard.tsx?tsr-split=component",
          lineNumber: 145,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.dashboard.tsx?tsr-split=component",
        lineNumber: 141,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.dashboard.tsx?tsr-split=component",
      lineNumber: 119,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Card, { className: "shadow-none", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardHeader, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardTitle, { className: "text-base", children: [
        "Ranking Santri — ",
        activeYear?.year ?? "Tahun Aktif"
      ] }, void 0, true, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.dashboard.tsx?tsr-split=component",
        lineNumber: 165,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.dashboard.tsx?tsr-split=component",
        lineNumber: 164,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CardContent, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Table, { children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableHeader, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableRow, { children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableHead, { className: "w-12", children: "#" }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.dashboard.tsx?tsr-split=component",
            lineNumber: 171,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableHead, { children: "Nama Santri" }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.dashboard.tsx?tsr-split=component",
            lineNumber: 172,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableHead, { children: "Kelas" }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.dashboard.tsx?tsr-split=component",
            lineNumber: 173,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableHead, { className: "text-right", children: "Rata-rata Nilai" }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.dashboard.tsx?tsr-split=component",
            lineNumber: 174,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.dashboard.tsx?tsr-split=component",
          lineNumber: 170,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.dashboard.tsx?tsr-split=component",
          lineNumber: 169,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableBody, { children: [
          (topStudents ?? []).length === 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableRow, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableCell, { colSpan: 4, className: "text-center text-muted-foreground py-8", children: "Belum ada data nilai untuk tahun ajaran ini." }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.dashboard.tsx?tsr-split=component",
            lineNumber: 179,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.dashboard.tsx?tsr-split=component",
            lineNumber: 178,
            columnNumber: 52
          }, this),
          (topStudents ?? []).map((s, i) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableRow, { children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableCell, { className: "font-bold text-muted-foreground", children: i + 1 }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.dashboard.tsx?tsr-split=component",
              lineNumber: 184,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableCell, { className: "font-medium", children: s.name }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.dashboard.tsx?tsr-split=component",
              lineNumber: 185,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableCell, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Badge, { variant: "secondary", children: s.kelas_rombel }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.dashboard.tsx?tsr-split=component",
              lineNumber: 187,
              columnNumber: 21
            }, this) }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.dashboard.tsx?tsr-split=component",
              lineNumber: 186,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TableCell, { className: "text-right font-semibold", children: Number(s.avg_score).toFixed(1) }, void 0, false, {
              fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.dashboard.tsx?tsr-split=component",
              lineNumber: 189,
              columnNumber: 19
            }, this)
          ] }, s.id, true, {
            fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.dashboard.tsx?tsr-split=component",
            lineNumber: 183,
            columnNumber: 50
          }, this))
        ] }, void 0, true, {
          fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.dashboard.tsx?tsr-split=component",
          lineNumber: 177,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.dashboard.tsx?tsr-split=component",
        lineNumber: 168,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.dashboard.tsx?tsr-split=component",
        lineNumber: 167,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.dashboard.tsx?tsr-split=component",
      lineNumber: 163,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "C:/Users/NCN0C/Documents/GitHub/alma-report-hub/src/routes/_app.dashboard.tsx?tsr-split=component",
    lineNumber: 96,
    columnNumber: 10
  }, this);
}
export {
  Dashboard as component
};
