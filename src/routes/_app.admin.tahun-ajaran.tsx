import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, Trash2, Plus, DatabaseZap, ArrowRightLeft } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import {
  getAcademicYearsFn,
  createAcademicYearFn,
  setActiveYearFn,
  deleteAcademicYearFn,
  migrateSemesterColumnFn,
  SEMESTER_LABELS,
} from "@/lib/api/academic-years.functions";
import { migrateRombelsFn } from "@/lib/api/students.functions";

export const Route = createFileRoute("/_app/admin/tahun-ajaran")({
  component: TahunAjaranPage,
});

// Tahun ajaran format di pesantren
const CURRENT_YEAR = new Date().getFullYear();
const SUGGESTED_YEARS = Array.from({ length: 5 }, (_, i) => {
  const y = CURRENT_YEAR - 1 + i;
  return `${y}/${y + 1}`;
});

function TahunAjaranPage() {
  const { token } = useAuth();
  const qc = useQueryClient();
  const [newYear, setNewYear] = useState("");
  const [newSemester, setNewSemester] = useState<"1" | "2">("1");
  const [migrateSource, setMigrateSource] = useState("");
  const [migrateTarget, setMigrateTarget] = useState("");
  const [migrateMode, setMigrateMode] = useState<"same" | "naik">("same");

  const { data: years } = useQuery({
    queryKey: ["academic-years"],
    queryFn: () => getAcademicYearsFn(),
  });

  const createMut = useMutation({
    mutationFn: () =>
      createAcademicYearFn({
        data: { token: token!, year: newYear, semester: Number(newSemester) },
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["academic-years"] });
      setNewYear("");
      setNewSemester("1");
      toast.success("Tahun ajaran & semester berhasil ditambahkan");
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Gagal menambahkan"),
  });

  const setActiveMut = useMutation({
    mutationFn: (yearId: string) => setActiveYearFn({ data: { token: token!, yearId } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["academic-years"] });
      toast.success("Tahun ajaran diaktifkan");
    },
  });

  const deleteMut = useMutation({
    mutationFn: (yearId: string) => deleteAcademicYearFn({ data: { token: token!, yearId } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["academic-years"] });
      toast.success("Tahun ajaran dihapus");
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Gagal menghapus"),
  });

  const migrateMut = useMutation({
    mutationFn: () => migrateSemesterColumnFn({ data: { token: token! } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["academic-years"] });
      toast.success("Migrasi kolom semester berhasil!");
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Gagal migrasi"),
  });

  const migrateRombelMut = useMutation({
    mutationFn: () => migrateRombelsFn({
      data: { token: token!, sourceYearId: migrateSource, targetYearId: migrateTarget, mode: migrateMode },
    }),
    onSuccess: (result: any) => {
      qc.invalidateQueries({ queryKey: ["students"] });
      toast.success(`Berhasil! ${result.migratedCount} santri dipindahkan, ${result.skippedCount} dilewati.`);
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Gagal migrasi rombel"),
  });

  // Group by year untuk tampilan yang lebih rapi
  const groupedYears = (years ?? []).reduce<Record<string, any[]>>((acc, y) => {
    const key = y.year as string;
    if (!acc[key]) acc[key] = [];
    acc[key].push(y);
    return acc;
  }, {});

  const semesterLabel = (sem: number) =>
    SEMESTER_LABELS[sem]?.id ?? `Semester ${sem}`;

  const semesterBadgeColor = (sem: number) =>
    sem === 1 ? "bg-sky-600" : "bg-violet-600";

  return (
    <div className="space-y-6 max-w-4xl">
      <Card className="shadow-none border-0 bg-transparent">
        <CardHeader className="px-0">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">Manajemen Tahun Ajaran & Semester</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => migrateMut.mutate()}
              disabled={migrateMut.isPending}
              className="text-xs gap-1.5"
            >
              <DatabaseZap className="h-3.5 w-3.5" />
              {migrateMut.isPending ? "Migrasi..." : "Sinkronisasi DB"}
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Di pesantren, setiap tahun ajaran memiliki 2 semester: <b>Ula/Ganjil</b> dan <b>Tsaniyah/Genap</b>.
          </p>
        </CardHeader>
        <CardContent className="space-y-6 px-0">

          {/* Form Tambah */}
          <Card className="border shadow-none bg-muted/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">Tambah Tahun Ajaran</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Input tahun */}
                <div className="space-y-1.5 sm:col-span-1">
                  <Label htmlFor="new-year" className="text-xs">Tahun Ajaran</Label>
                  <Input
                    id="new-year"
                    placeholder="e.g. 2026/2027"
                    value={newYear}
                    onChange={(e) => setNewYear(e.target.value)}
                    list="year-suggestions"
                  />
                  <datalist id="year-suggestions">
                    {SUGGESTED_YEARS.map((y) => (
                      <option key={y} value={y} />
                    ))}
                  </datalist>
                </div>

                {/* Pilih semester */}
                <div className="space-y-1.5 sm:col-span-1">
                  <Label className="text-xs">Semester</Label>
                  <Select value={newSemester} onValueChange={(v) => setNewSemester(v as "1" | "2")}>
                    <SelectTrigger id="new-semester">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">
                        <div className="flex flex-col">
                          <span className="font-medium">Semester 1 — Ula</span>
                          <span className="text-xs text-muted-foreground">Ganjil · First Semester</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="2">
                        <div className="flex flex-col">
                          <span className="font-medium">Semester 2 — Tsaniyah</span>
                          <span className="text-xs text-muted-foreground">Genap · Second Semester</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Tombol tambah */}
                <div className="flex items-end sm:col-span-1">
                  <Button
                    id="btn-tambah-tahun"
                    onClick={() => createMut.mutate()}
                    disabled={!newYear || createMut.isPending}
                    className="bg-emerald-600 hover:bg-emerald-500 w-full"
                  >
                    <Plus className="h-4 w-4 mr-1.5" />
                    Tambah
                  </Button>
                </div>
              </div>

              {/* Info semester pesantren */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="rounded-lg border bg-sky-50 dark:bg-sky-950 p-3 text-sm">
                  <div className="font-semibold text-sky-700 dark:text-sky-300">Semester 1 — Ula (Ganjil)</div>
                  <div className="text-xs text-muted-foreground mt-0.5">Juli — Desember · First Semester</div>
                </div>
                <div className="rounded-lg border bg-violet-50 dark:bg-violet-950 p-3 text-sm">
                  <div className="font-semibold text-violet-700 dark:text-violet-300">Semester 2 — Tsaniyah (Genap)</div>
                  <div className="text-xs text-muted-foreground mt-0.5">Januari — Juni · Second Semester</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Migrasi Santri */}
          <Card className="border shadow-none bg-muted/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <ArrowRightLeft className="h-4 w-4" />
                Migrasi Santri ke Tahun Ajaran Baru
              </CardTitle>
              <p className="text-xs text-muted-foreground">
                Salin penempatan rombel santri dari tahun ajaran lama ke baru. Tidak perlu input ulang satu per satu.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs">Tahun Sumber</Label>
                  <Select value={migrateSource} onValueChange={setMigrateSource}>
                    <SelectTrigger><SelectValue placeholder="Pilih sumber" /></SelectTrigger>
                    <SelectContent>
                      {(years ?? []).map((y) => (
                        <SelectItem key={y.id} value={y.id}>
                          {y.year} — {semesterLabel(y.semester ?? 1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Tahun Tujuan</Label>
                  <Select value={migrateTarget} onValueChange={setMigrateTarget}>
                    <SelectTrigger><SelectValue placeholder="Pilih tujuan" /></SelectTrigger>
                    <SelectContent>
                      {(years ?? []).filter(y => y.id !== migrateSource).map((y) => (
                        <SelectItem key={y.id} value={y.id}>
                          {y.year} — {semesterLabel(y.semester ?? 1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Mode</Label>
                  <Select value={migrateMode} onValueChange={(v) => setMigrateMode(v as "same" | "naik")}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="same">
                        <span className="font-medium">Rombel Sama</span>
                      </SelectItem>
                      <SelectItem value="naik">
                        <span className="font-medium">Naik Kelas</span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button
                    onClick={() => migrateRombelMut.mutate()}
                    disabled={!migrateSource || !migrateTarget || migrateRombelMut.isPending}
                    className="bg-blue-600 hover:bg-blue-500 w-full"
                  >
                    <ArrowRightLeft className="h-4 w-4 mr-1.5" />
                    {migrateRombelMut.isPending ? "Memproses..." : "Migrasi"}
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border bg-blue-50 dark:bg-blue-950 p-3 text-sm">
                  <div className="font-semibold text-blue-700 dark:text-blue-300">Rombel Sama</div>
                  <div className="text-xs text-muted-foreground mt-0.5">Salin santri ke rombel yang sama di tahun baru</div>
                </div>
                <div className="rounded-lg border bg-emerald-50 dark:bg-emerald-950 p-3 text-sm">
                  <div className="font-semibold text-emerald-700 dark:text-emerald-300">Naik Kelas</div>
                  <div className="text-xs text-muted-foreground mt-0.5">Kelas 1→2, 2→3, dst. Kelas 5 dilewati (lulus)</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabel daftar */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tahun Ajaran</TableHead>
                  <TableHead>Semester</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(years ?? []).length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground py-8 text-sm">
                      Belum ada data tahun ajaran. Klik <b>Sinkronisasi DB</b> jika baru migrasi.
                    </TableCell>
                  </TableRow>
                )}
                {(years ?? []).map((y) => (
                  <TableRow key={y.id}>
                    <TableCell className="font-medium">{y.year}</TableCell>
                    <TableCell>
                      <Badge className={`${semesterBadgeColor(y.semester ?? 1)} text-white text-xs`}>
                        {semesterLabel(y.semester ?? 1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {y.is_active
                        ? <Badge className="bg-emerald-600">Aktif</Badge>
                        : <Badge variant="outline">Tidak Aktif</Badge>}
                    </TableCell>
                    <TableCell className="text-right space-x-1">
                      {!y.is_active && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setActiveMut.mutate(y.id)}
                          id={`btn-aktifkan-${y.id}`}
                        >
                          <Check className="h-3.5 w-3.5 mr-1" />
                          Aktifkan
                        </Button>
                      )}
                      {!y.is_active && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" variant="outline" id={`btn-hapus-${y.id}`}>
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Hapus tahun ajaran?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Tahun ajaran <b>{y.year}</b> {semesterLabel(y.semester ?? 1)} dan semua data nilai terkait akan dihapus permanen.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-red-600"
                                onClick={() => deleteMut.mutate(y.id)}
                              >
                                Hapus
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
