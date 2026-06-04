import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FileUp, FileDown, FileSpreadsheet, Edit } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { getAcademicYearsFn } from "@/lib/api/academic-years.functions";
import { getRombelsFn } from "@/lib/api/classes.functions";
import {
  getStudentsFn,
} from "@/lib/api/students.functions";
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

export const Route = createFileRoute("/_app/nilai/")(({
  head: () => ({ meta: [{ title: "Daftar Nilai Santri — SIRA" }] }),
  component: NilaiIndexPage,
} as any));

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs">{label}</Label>
      {children}
    </div>
  );
}

function NilaiIndexPage() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [yearId, setYearId] = useState("");
  const [rombelId, setRombelId] = useState("");

  const { data: years } = useQuery({
    queryKey: ["academic-years"],
    queryFn: () => getAcademicYearsFn(),
    enabled: !!token,
  });

  const { data: rombels } = useQuery({
    queryKey: ["rombels"],
    queryFn: () => getRombelsFn({ data: {} }),
    enabled: !!token,
  });

  useEffect(() => {
    if (!yearId && years?.length) {
      const active = years.find((y) => y.is_active) ?? years[0];
      setYearId(active.id);
    }
  }, [years, yearId]);

  useEffect(() => {
    if (!rombelId && rombels?.length) setRombelId(rombels[0].id);
  }, [rombels, rombelId]);

  const selectedRombel = rombels?.find((r) => r.id === rombelId);
  const classLevel = selectedRombel?.class_level ?? 0;

  // Fetch students for the selected class using server function
  const { data: studentsData, isLoading } = useQuery({
    queryKey: ["students", yearId, rombelId],
    queryFn: () =>
      getStudentsFn({ data: { token: token!, academicYearId: yearId, rombelId, limit: 1000 } }),
    enabled: !!token && !!yearId && !!rombelId,
  });

  const students = studentsData?.data ?? [];

  // Data fetching for Export using server functions
  const handleExport = async (isTemplate: boolean) => {
    if (!yearId || !rombelId) {
      toast.error("Pilih tahun ajaran dan kelas terlebih dahulu");
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

      const data = {
        students: (akademik as any).students,
        subjects: (akademik as any).subjects,
        akademik: (akademik as any).scores,
        pidato: (pidato as any).scores,
        komputer: (komputer as any)?.scores || [],
        diskusi: (diskusi as any)?.scores || [],
        kehadiran: (kehadiran as any).attendance,
      };

      await exportNilaiToExcel(data, classLevel, isTemplate);
      toast.success(isTemplate ? "Template berhasil diunduh" : "Data berhasil diexport", { id: loadingToast });
    } catch (err) {
      toast.error("Gagal melakukan export", { id: loadingToast });
    }
  };

  const importMutation = useMutation({
    mutationFn: async (file: File) => {
      const parsed = await importNilaiFromExcel(file, classLevel);
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
    toast.promise(importMutation.mutateAsync(file), {
      loading: "Sedang mengimport data...",
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-none">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-base">Filter Periode &amp; Kelas</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => handleExport(true)}>
              <FileDown className="w-4 h-4 mr-2" /> Template
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleExport(false)}>
              <FileSpreadsheet className="w-4 h-4 mr-2" /> Export
            </Button>
            <div>
              <input type="file" accept=".xlsx, .xls" className="hidden" ref={fileInputRef} onChange={handleFileUpload} />
              <Button size="sm" onClick={() => fileInputRef.current?.click()} disabled={importMutation.isPending}>
                <FileUp className="w-4 h-4 mr-2" /> Import
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4">
          <Field label="Tahun Ajaran">
            <Select value={yearId} onValueChange={setYearId}>
              <SelectTrigger><SelectValue placeholder="Pilih tahun ajaran" /></SelectTrigger>
              <SelectContent>
                {(years ?? []).map((y) => (
                  <SelectItem key={y.id} value={y.id}>
                    {y.year} {y.is_active ? "✓ Aktif" : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
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
        </CardContent>
      </Card>

      {!yearId || !rombelId ? (
        <div className="rounded-lg border border-dashed p-12 text-center text-muted-foreground">
          Pilih tahun ajaran dan kelas untuk melihat daftar santri.
        </div>
      ) : (
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle className="text-sm">Daftar Santri — Kelas {classLevel}</CardTitle>
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
                  <TableRow><TableCell colSpan={4} className="text-center py-8">Tidak ada santri di kelas ini.</TableCell></TableRow>
                ) : (
                  students.map((student: any, i: number) => (
                    <TableRow key={student.id}>
                      <TableCell className="text-center">{i + 1}</TableCell>
                      <TableCell className="font-medium">{student.full_name}</TableCell>
                      <TableCell>{student.stambuk}</TableCell>
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
    </div>
  );
}
