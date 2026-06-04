import { j as jsxRuntimeExports } from "./_libs/react.mjs";
import { C as Card, a as CardContent, c as CardHeader, d as CardTitle } from "./_ssr/card-uop7ST8s.mjs";
import { T as Table, d as TableHeader, e as TableRow, c as TableHead, a as TableBody, b as TableCell } from "./_ssr/table-DhIrzwGX.mjs";
import { B as Badge } from "./_ssr/badge-DyfXZgLs.mjs";
import { a as useQuery } from "./_libs/tanstack__react-query.mjs";
import { u as useAuth } from "./_ssr/use-auth-YByzSFug.mjs";
import { f as fetchBackend } from "./_ssr/fetch-helper-D3HnH3aE.mjs";
import { g as getAcademicYearsFn } from "./_ssr/academic-years.functions-zJEmoTzy.mjs";
import { v as Users, G as GraduationCap, k as LayoutGrid, s as TrendingUp } from "./_libs/lucide-react.mjs";
import { R as ResponsiveContainer, d as LineChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, c as Line, a as BarChart, b as Legend, B as Bar } from "./_libs/recharts.mjs";
import "./_ssr/utils-H80jjgLf.mjs";
import "./_libs/clsx.mjs";
import "./_libs/tailwind-merge.mjs";
import "./_libs/class-variance-authority.mjs";
import "./_libs/tanstack__query-core.mjs";
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
const getDashboardStatsFn = async ({ data }) => {
  return fetchBackend("/api/dashboard/stats", { body: data });
};
const getTopStudentsFn = async ({ data }) => {
  return fetchBackend("/api/dashboard/top-students", { body: data });
};
const getValueTrendFn = async ({ data }) => {
  return fetchBackend("/api/dashboard/value-trend", { body: data });
};
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    activeYear && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Tahun Ajaran Aktif:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "font-semibold", children: activeYear.year })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: statCards.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "shadow-none border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-11 w-11 rounded-xl ${s.bg} flex items-center justify-center`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: `h-5 w-5 ${s.color}` }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: s.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold", children: s.value })
      ] })
    ] }) }, s.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Tren Rata-rata Nilai Tahunan" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "h-72", children: trendData.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: trendData, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "hsl(var(--border))" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "tahun", fontSize: 11 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { domain: [0, 100], fontSize: 11 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { type: "monotone", dataKey: "rataRata", name: "Rata-rata", stroke: "#10b981", strokeWidth: 2, dot: {
            r: 4
          } })
        ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full flex items-center justify-center text-sm text-muted-foreground", children: "Belum ada data nilai" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Top Santri — Nilai Tertinggi" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "h-72", children: topChartData.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: topChartData, layout: "vertical", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { type: "number", domain: [0, 100], fontSize: 11 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { dataKey: "nama", type: "category", width: 100, fontSize: 11 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "nilai", name: "Nilai", fill: "#10b981", radius: [0, 4, 4, 0] })
        ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full flex items-center justify-center text-sm text-muted-foreground", children: "Belum ada data nilai" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "shadow-none", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base", children: [
        "Ranking Santri — ",
        activeYear?.year ?? "Tahun Aktif"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "w-12", children: "#" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Nama Santri" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Kelas" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Rata-rata Nilai" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TableBody, { children: [
          (topStudents ?? []).length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 4, className: "text-center text-muted-foreground py-8", children: "Belum ada data nilai untuk tahun ajaran ini." }) }),
          (topStudents ?? []).map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-bold text-muted-foreground", children: i + 1 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: s.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: s.kelas_rombel }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right font-semibold", children: Number(s.avg_score).toFixed(1) })
          ] }, s.id))
        ] })
      ] }) })
    ] })
  ] });
}
export {
  Dashboard as component
};
