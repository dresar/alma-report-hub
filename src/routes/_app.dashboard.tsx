import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, GraduationCap, LayoutGrid, TrendingUp } from "lucide-react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { getDashboardStatsFn } from "@/lib/api/dashboard.functions";
import { getTopStudentsFn } from "@/lib/api/dashboard.functions";
import { getValueTrendFn } from "@/lib/api/dashboard.functions";
import { getAcademicYearsFn } from "@/lib/api/academic-years.functions";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — SIRA" }] }),
  component: Dashboard,
});

function Dashboard() {
  const { token } = useAuth();

  const { data: years } = useQuery({
    queryKey: ["academic-years"],
    queryFn: () => getAcademicYearsFn(),
    enabled: !!token,
  });

  const activeYear = years?.find((y) => y.is_active);

  const { data: stats } = useQuery({
    queryKey: ["dashboard-stats", activeYear?.id],
    queryFn: () => getDashboardStatsFn({ data: { token: token!, academicYearId: activeYear?.id } }),
    enabled: !!token && !!activeYear,
  });

  const { data: topStudents } = useQuery({
    queryKey: ["top-students", activeYear?.id],
    queryFn: () =>
      getTopStudentsFn({ data: { token: token!, academicYearId: activeYear!.id, limit: 10 } }),
    enabled: !!token && !!activeYear,
  });

  const { data: trend } = useQuery({
    queryKey: ["value-trend"],
    queryFn: () => getValueTrendFn({ data: { token: token! } }),
    enabled: !!token,
  });

  const statCards = [
    {
      label: "Total Santri Aktif",
      value: stats?.totalStudents ?? "—",
      icon: Users,
      color: "text-blue-500",
      bg: "bg-blue-50 dark:bg-blue-950",
    },
    {
      label: "Total Kelas",
      value: stats?.totalClasses ?? "—",
      icon: GraduationCap,
      color: "text-emerald-500",
      bg: "bg-emerald-50 dark:bg-emerald-950",
    },
    {
      label: "Rombel Aktif",
      value: stats?.totalRombels ?? "—",
      icon: LayoutGrid,
      color: "text-violet-500",
      bg: "bg-violet-50 dark:bg-violet-950",
    },
    {
      label: "Rata-rata Nilai",
      value: stats?.avgScore != null ? stats.avgScore.toFixed(1) : "—",
      icon: TrendingUp,
      color: "text-amber-500",
      bg: "bg-amber-50 dark:bg-amber-950",
    },
  ];

  // Format chart data
  const trendData = (trend ?? []).map((t) => ({
    tahun: t.year,
    rataRata: Number(t.rata_rata),
  }));

  const topChartData = (topStudents ?? []).slice(0, 8).map((s) => ({
    nama: s.name?.split(" ").slice(0, 2).join(" "),
    nilai: Number(s.avg_score),
    kelas: s.kelas_rombel,
  }));

  return (
    <div className="space-y-6">
      {/* Active Year Badge */}
      {activeYear && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Tahun Ajaran Aktif:</span>
          <Badge variant="outline" className="font-semibold">{activeYear.year}</Badge>
        </div>
      )}

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s) => (
          <Card key={s.label} className="shadow-none border">
            <CardContent className="p-4 flex items-center gap-4">
              <div className={`h-11 w-11 rounded-xl ${s.bg} flex items-center justify-center`}>
                <s.icon className={`h-5 w-5 ${s.color}`} />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
                <div className="text-2xl font-bold">{s.value}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle className="text-base">Tren Rata-rata Nilai Tahunan</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            {trendData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="tahun" fontSize={11} />
                  <YAxis domain={[0, 100]} fontSize={11} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="rataRata"
                    name="Rata-rata"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-sm text-muted-foreground">
                Belum ada data nilai
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardHeader>
            <CardTitle className="text-base">Top Santri — Nilai Tertinggi</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            {topChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topChartData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} fontSize={11} />
                  <YAxis dataKey="nama" type="category" width={100} fontSize={11} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="nilai" name="Nilai" fill="#10b981" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-sm text-muted-foreground">
                Belum ada data nilai
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Ranking table */}
      <Card className="shadow-none">
        <CardHeader>
          <CardTitle className="text-base">Ranking Santri — {activeYear?.year ?? "Tahun Aktif"}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">#</TableHead>
                <TableHead>Nama Santri</TableHead>
                <TableHead>Kelas</TableHead>
                <TableHead className="text-right">Rata-rata Nilai</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(topStudents ?? []).length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                    Belum ada data nilai untuk tahun ajaran ini.
                  </TableCell>
                </TableRow>
              )}
              {(topStudents ?? []).map((s, i) => (
                <TableRow key={s.id}>
                  <TableCell className="font-bold text-muted-foreground">{i + 1}</TableCell>
                  <TableCell className="font-medium">{s.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{s.kelas_rombel}</Badge>
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    {Number(s.avg_score).toFixed(1)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
