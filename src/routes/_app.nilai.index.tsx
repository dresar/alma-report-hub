import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileUp, FileDown, FileSpreadsheet, Edit, Plus, ArrowRightLeft } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { getAcademicYearsFn } from "@/lib/api/academic-years.functions";
import { getRombelsFn } from "@/lib/api/classes.functions";
import { getStudentsFn, migrateRombelsFn } from "@/lib/api/students.functions";
import {
  getSubjectScoresFn,
  saveSubjectScoresFn,
  getSpeechScoresFn,
  saveSpeechScoresFn,
  getComputerScoresFn,
  saveComputerScoresFn,
  getDiscussionScoresFn,
  saveDiscussionScoresFn,
  getAttendanceFn,
  saveAttendanceFn,
} from "@/lib/api/scores.functions";
import { toast } from "sonner";
import { exportNilaiToExcel, importNilaiFromExcel } from "@/lib/excel-helpers";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/_app/nilai/")((({
  head: () => ({ meta: [{ title: "Daftar Nilai Santri — SIRA" }] }),
  component: NilaiIndexPage,
} as any)));

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs">{label}</Label>
      {children}
    </div>
  );
}

function NilaiIndexPage() {
  const { token, isAdmin } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filter: kelas + yearId (mengacu langsung ke academic_years database)
  const [rombelId, setRombelId] = useState("");
  const [yearId, setYearId] = useState("");

  // Dialog state
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogRombelId, setDialogRombelId] = useState("");
  const [dialogYearId, setDialogYearId] = useState("");

  // Copy student state
  const [sourceYearId, setSourceYearId] = useState("");

  const { data: years } = useQuery({
    queryKey: ["academic-years"],
    queryFn: () => getAcademicYearsFn(),
    enabled: !!token,
    staleTime: 5 * 60 * 1000,
  });

  const { data: rombels } = useQuery({
    queryKey: ["rombels"],
    queryFn: () => getRombelsFn({ data: {} }),
    enabled: !!token,
    staleTime: 5 * 60 * 1000,
  });

  // Auto-select first rombel on load
  useEffect(() => {
    if (!rombelId && rombels?.length) setRombelId(rombels[0].id);
  }, [rombels, rombelId]);

  // Auto-detect active yearId on load
  useEffect(() => {
    if (years?.length && !yearId) {
      const active = years.find((y) => y.is_active);
      if (active) {
        setYearId(active.id);
      } else {
        setYearId(years[0].id);
      }
    }
  }, [years, yearId]);

  const openCreateDialog = () => {
    setDialogRombelId(rombelId || (rombels?.[0]?.id ?? ""));
    setDialogYearId(yearId || (years?.find((y) => y.is_active)?.id ?? years?.[0]?.id ?? ""));
    setIsDialogOpen(true);
  };

  const handleStartInput = () => {
    if (dialogRombelId) setRombelId(dialogRombelId);
    if (dialogYearId) setYearId(dialogYearId);
    setIsDialogOpen(false);
    toast.success("Filter berhasil diterapkan");
  };

  const resolvedYear = years?.find((y) => y.id === yearId);
  const selectedRombel = rombels?.find((r) => r.id === rombelId);
  const classLevel = selectedRombel?.class_level ?? 0;

  const { data: studentsData, isLoading } = useQuery({
    queryKey: ["students", yearId, rombelId],
    queryFn: () =>
      getStudentsFn({ data: { token: token!, academicYearId: yearId, rombelId, limit: 1000 } }),
    enabled: !!token && !!yearId && !!rombelId,
  });
  const students = studentsData?.data ?? [];

  // Mutation for copying/migrating students from another year/semester
  const copyStudentsMutation = useMutation({
    mutationFn: async () => {
      if (!sourceYearId || !yearId) throw new Error("Pilih semester asal");
      return migrateRombelsFn({
        data: {
          token: token!,
          sourceYearId,
          targetYearId: yearId,
          mode: "same",
        },
      });
    },
    onSuccess: (res: any) => {
      qc.invalidateQueries({ queryKey: ["students", yearId, rombelId] });
      toast.success(`Berhasil menyalin! ${res?.migratedCount ?? 0} santri dipindahkan.`);
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : "Gagal menyalin penempatan santri");
    },
  });

  const handleCopyStudents = () => {
    toast.promise(copyStudentsMutation.mutateAsync(), {
      loading: "Sedang menyalin penempatan santri...",
    });
  };

  // Set default source semester once empty state is shown and otherYears exist
  const otherYears = (years ?? []).filter((y) => y.id !== yearId);
  useEffect(() => {
    if (otherYears.length > 0 && !sourceYearId) {
      setSourceYearId(otherYears[0].id);
    }
  }, [otherYears, sourceYearId]);

  // ── Export ─────────────────────────────────────────────────────
  const handleExport = async (isTemplate: boolean) => {
    if (!yearId || !rombelId) {
      toast.error("Pilih kelas dan semester terlebih dahulu");
      return;
    }
    const loadingToast = toast.loading(isTemplate ? "Menyiapkan template..." : "Menyiapkan data export...");
    try {
      const [akademik, pidato, komputer, diskusi, kehadiran] = await Promise.all([
        getSubjectScoresFn({ data: { token: token!, academicYearId: yearId, rombelId } }),
        getSpeechScoresFn({ data: { token: token!, academicYearId: yearId, rombelId } }),
        classLevel >= 4 ? getComputerScoresFn({ data: { token: token!, academicYearId: yearId, rombelId } }) : Promise.resolve(null),
        classLevel >= 5 ? getDiscussionScoresFn({ data: { token: token!, academicYearId: yearId, rombelId } }) : Promise.resolve(null),
        getAttendanceFn({ data: { token: token!, academicYearId: yearId, rombelId } }),
      ]);
      await exportNilaiToExcel({
        students: (akademik as any).students,
        subjects: (akademik as any).subjects,
        akademik: (akademik as any).scores,
        pidato: (pidato as any).scores,
        komputer: (komputer as any)?.scores || [],
        diskusi: (diskusi as any)?.scores || [],
        kehadiran: (kehadiran as any).attendance,
      }, classLevel, isTemplate);
      toast.success(isTemplate ? "Template berhasil diunduh" : "Data berhasil diexport", { id: loadingToast });
    } catch {
      toast.error("Gagal melakukan export", { id: loadingToast });
    }
  };

  // ── Import ─────────────────────────────────────────────────────
  const importMutation = useMutation({
    mutationFn: async (file: File) => {
      if (!yearId || !rombelId) {
        throw new Error("Pilih kelas dan semester terlebih dahulu");
      }
      const akademik = await getSubjectScoresFn({ data: { token: token!, academicYearId: yearId, rombelId } });
      const parsed = await importNilaiFromExcel(file, classLevel, akademik.students, akademik.subjects);
      if (!parsed) throw new Error("Gagal membaca file Excel");
      const promises = [];
      if (parsed.akademik.length > 0) promises.push(saveSubjectScoresFn({ data: { token: token!, academicYearId: yearId, scores: parsed.akademik } }));
      if (parsed.pidato.length > 0) promises.push(saveSpeechScoresFn({ data: { token: token!, academicYearId: yearId, scores: parsed.pidato } }));
      if (parsed.komputer.length > 0) promises.push(saveComputerScoresFn({ data: { token: token!, academicYearId: yearId, scores: parsed.komputer } }));
      if (parsed.diskusi.length > 0) promises.push(saveDiscussionScoresFn({ data: { token: token!, academicYearId: yearId, scores: parsed.diskusi } }));
      if (parsed.kehadiran.length > 0) promises.push(saveAttendanceFn({ data: { token: token!, academicYearId: yearId, attendance: parsed.kehadiran } }));
      await Promise.all(promises);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["subject-scores"] });
      qc.invalidateQueries({ queryKey: ["speech-scores"] });
      qc.invalidateQueries({ queryKey: ["computer-scores"] });
      qc.invalidateQueries({ queryKey: ["discussion-scores"] });
      qc.invalidateQueries({ queryKey: ["attendance"] });
      toast.success("Data nilai berhasil diimport!");
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : "Terjadi kesalahan saat import");
    },
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    toast.promise(importMutation.mutateAsync(file), { loading: "Sedang mengimport data..." });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // ── Render ─────────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      {/* Filter Card */}
      <Card className="shadow-none">
        <CardHeader className="pb-2 flex flex-row items-center justify-between flex-wrap gap-3">
          <div>
            <CardTitle className="text-base">Filter Kelas &amp; Semester</CardTitle>
            {resolvedYear && (
              <p className="text-xs text-muted-foreground mt-0.5">
                Tahun Ajaran: <strong>{resolvedYear.year}</strong>
                {resolvedYear.is_active && <span className="ml-1 text-emerald-600 font-medium">✓ Aktif</span>}
              </p>
            )}
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button variant="default" size="sm" className="bg-emerald-600 hover:bg-emerald-500" onClick={openCreateDialog}>
              <Plus className="w-4 h-4 mr-2" /> Mulai Input Nilai
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleExport(true)}>
              <FileDown className="w-4 h-4 mr-2" /> Template
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleExport(false)}>
              <FileSpreadsheet className="w-4 h-4 mr-2" /> Export
            </Button>
            <div>
              <input type="file" accept=".xlsx, .xls" className="hidden" ref={fileInputRef} onChange={handleFileUpload} />
              <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} disabled={importMutation.isPending}>
                <FileUp className="w-4 h-4 mr-2" /> Import
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4">
          <Field label="Kelas / Rombel">
            <Select value={rombelId} onValueChange={setRombelId}>
              <SelectTrigger><SelectValue placeholder="Pilih kelas" /></SelectTrigger>
              <SelectContent>
                {(rombels ?? []).map((r) => (
                  <SelectItem key={r.id} value={r.id}>
                    Kelas {r.class_level}{r.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Semester / Tahun Ajaran">
            <Select value={yearId} onValueChange={setYearId}>
              <SelectTrigger><SelectValue placeholder="Pilih semester" /></SelectTrigger>
              <SelectContent>
                {(years ?? []).map((y) => (
                  <SelectItem key={y.id} value={y.id}>
                    {y.year} — Semester {y.semester === 1 ? "1 (Ganjil)" : "2 (Genap)"} {y.is_active ? "(Aktif)" : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </CardContent>
      </Card>

      {/* Student list */}
      {!rombelId ? (
        <div className="rounded-lg border border-dashed p-12 text-center text-muted-foreground">
          Pilih kelas untuk melihat daftar santri.
        </div>
      ) : !yearId ? (
        <div className="rounded-lg border border-dashed p-12 text-center text-amber-600 bg-amber-50">
          ⚠ Silakan buat tahun ajaran terlebih dahulu di menu <strong>Admin → Tahun Ajaran</strong>.
        </div>
      ) : (
        <Card className="shadow-none">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">
              Daftar Santri — {selectedRombel ? `Kelas ${selectedRombel.class_level}${selectedRombel.name}` : ""}
            </CardTitle>
            <Badge variant="outline" className="text-xs font-normal">
              {resolvedYear?.year} · Semester {resolvedYear?.semester === 1 ? "1" : "2"}
            </Badge>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12 text-center">No</TableHead>
                  <TableHead>Nama Lengkap</TableHead>
                  <TableHead>Stambuk</TableHead>
                  <TableHead className="w-32 text-center">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow><TableCell colSpan={4} className="text-center py-8">Memuat data...</TableCell></TableRow>
                ) : students.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="py-8">
                      <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <p className="text-muted-foreground text-sm">
                          Tidak ada santri di kelas ini untuk semester yang dipilih.
                        </p>
                        {isAdmin && otherYears.length > 0 && (
                          <Card className="border p-4 max-w-md bg-muted/30 shadow-none text-left">
                            <CardHeader className="p-0 pb-2">
                              <CardTitle className="text-xs font-semibold flex items-center gap-1.5">
                                <ArrowRightLeft className="w-3.5 h-3.5 text-emerald-600" />
                                Salin Penempatan Kelas
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0 space-y-3">
                              <p className="text-xs text-muted-foreground">
                                Santri dari semester lain dapat disalin langsung ke semester ini dengan rombel yang sama.
                              </p>
                              <div className="flex gap-2 items-center">
                                <Select value={sourceYearId} onValueChange={setSourceYearId}>
                                  <SelectTrigger className="h-8 text-xs max-w-[200px]">
                                    <SelectValue placeholder="Pilih semester asal" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {otherYears.map((y) => (
                                      <SelectItem key={y.id} value={y.id} className="text-xs">
                                        {y.year} — Sem. {y.semester}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <Button
                                  size="sm"
                                  className="h-8 text-xs bg-emerald-600 hover:bg-emerald-500"
                                  onClick={handleCopyStudents}
                                  disabled={copyStudentsMutation.isPending}
                                >
                                  Salin Santri
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        )}
                        {!isAdmin && (
                          <p className="text-xs text-muted-foreground">
                            Silakan hubungi Admin untuk melakukan penempatan kelas atau migrasi santri.
                          </p>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  students.map((student: any, i: number) => (
                    <TableRow key={student.id}>
                      <TableCell className="text-center text-muted-foreground">{i + 1}</TableCell>
                      <TableCell className="font-medium">{student.full_name}</TableCell>
                      <TableCell className="font-mono text-xs">{student.stambuk}</TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate({
                            to: "/nilai/$studentId",
                            params: { studentId: student.id },
                            search: { yearId, rombelId }
                          })}
                        >
                          <Edit className="w-4 h-4 mr-2" /> Input
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Dialog Mulai Input Nilai */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-base font-semibold">Mulai Input Nilai Baru</DialogTitle>
            <DialogDescription className="text-xs">
              Pilih kelas dan semester untuk memulai atau melanjutkan penginputan nilai santri.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="dialog-rombel" className="text-xs font-medium">Kelas / Rombel</Label>
              <Select value={dialogRombelId} onValueChange={setDialogRombelId}>
                <SelectTrigger id="dialog-rombel"><SelectValue placeholder="Pilih kelas" /></SelectTrigger>
                <SelectContent>
                  {(rombels ?? []).map((r) => (
                    <SelectItem key={r.id} value={r.id}>
                      Kelas {r.class_level}{r.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="dialog-semester" className="text-xs font-medium">Semester / Tahun Ajaran</Label>
              <Select value={dialogYearId} onValueChange={setDialogYearId}>
                <SelectTrigger id="dialog-semester"><SelectValue placeholder="Pilih semester" /></SelectTrigger>
                <SelectContent>
                  {(years ?? []).map((y) => (
                    <SelectItem key={y.id} value={y.id}>
                      {y.year} — Semester {y.semester === 1 ? "1 (Ganjil)" : "2 (Genap)"} {y.is_active ? "(Aktif)" : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setIsDialogOpen(false)}>Batal</Button>
            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-500" onClick={handleStartInput}>Mulai Input</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

