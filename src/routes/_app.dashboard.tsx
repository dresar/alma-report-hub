import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, GraduationCap, BookOpen, TrendingUp } from "lucide-react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { rankingRombel, trenNilai, santriList } from "@/lib/dummy-data";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — SIRA" }] }),
  component: Dashboard,
});

const stats = [
  { label: "Total Santri", value: santriList.length * 32, icon: Users },
  { label: "Total Kelas", value: 5, icon: GraduationCap },
  { label: "Mata Pelajaran", value: 9, icon: BookOpen },
  { label: "Rata-rata Nilai", value: 85.2, icon: TrendingUp },
];

function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="shadow-none">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="h-11 w-11 rounded-md bg-accent flex items-center justify-center text-primary">
                <s.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
                <div className="text-2xl font-semibold">{s.value}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle className="text-base">Tren Rata-rata Nilai Tahunan</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trenNilai}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="tahun" fontSize={12} />
                <YAxis domain={[60, 100]} fontSize={12} />
                <Tooltip />
                <Line type="monotone" dataKey="rataRata" stroke="var(--color-primary)" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardHeader>
            <CardTitle className="text-base">Ranking Santri per Rombel</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={rankingRombel} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} fontSize={12} />
                <YAxis dataKey="nama" type="category" width={120} fontSize={12} />
                <Tooltip />
                <Legend />
                <Bar dataKey="nilai" fill="var(--color-primary)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-none">
        <CardHeader>
          <CardTitle className="text-base">Top Santri Semester Ini</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Rombel</TableHead>
                <TableHead className="text-right">Nilai Akhir</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rankingRombel.map((r, i) => (
                <TableRow key={r.nama}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell className="font-medium">{r.nama}</TableCell>
                  <TableCell><Badge variant="secondary">{r.rombel}</Badge></TableCell>
                  <TableCell className="text-right font-semibold">{r.nilai}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
