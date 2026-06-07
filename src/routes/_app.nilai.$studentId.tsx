import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Save, Clock, ArrowLeft } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";
import { getStudentByIdFn } from "@/lib/api/students.functions";
import { getRombelsFn } from "@/lib/api/classes.functions";
import {
  getSubjectScoresFn,
  getSpeechScoresFn,
  getComputerScoresFn,
  getDiscussionScoresFn,
  getAttendanceFn,
  saveSubjectScoresFn,
  saveSpeechScoresFn,
  saveComputerScoresFn,
  saveDiscussionScoresFn,
  saveAttendanceFn,
} from "@/lib/api/scores.functions";
import { getSkillAspectsFn } from "@/lib/api/skill-aspects.functions";

export const Route = createFileRoute("/_app/nilai/$studentId")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      yearId: (search.yearId as string) || "",
      rombelId: (search.rombelId as string) || "",
    };
  },
  head: () => ({ meta: [{ title: "Input Nilai Santri — SIRA" }] }),
  component: NilaiStudentPage,
});

const LANGUAGES = ["Indonesia", "Arab", "Inggris"] as const;
const SPEECH_ASPECTS = ["penguasaan", "kelancaran", "intonasi", "kepercayaan", "penampilan"] as const;
const COMPUTER_ASPECTS = ["pengoperasian", "msWord", "msExcel", "internet", "presentasi"] as const;
// Map antara key input state dan kolom DB (untuk komputer)
const COMPUTER_KEY_TO_DB: Record<string, string> = {
  pengoperasian: "pengoperasian", msWord: "ms_word", msExcel: "ms_excel",
  internet: "internet", presentasi: "presentasi",
};
const DISCUSSION_ASPECTS = ["keaktifan", "argumentasi", "kerjasama", "penguasaan", "etika"] as const;

// Default labels (fallback jika DB belum punya konfigurasi)
const DEFAULT_SPEECH_LABELS: Record<string, string> = {
  penguasaan: "Penguasaan Materi", kelancaran: "Kelancaran",
  intonasi: "Intonasi", kepercayaan: "Kepercayaan Diri", penampilan: "Penampilan",
};
const DEFAULT_COMPUTER_LABELS: Record<string, string> = {
  pengoperasian: "Pengoperasian Dasar", msWord: "Microsoft Word",
  msExcel: "Microsoft Excel", internet: "Internet", presentasi: "Presentasi",
};
const DEFAULT_DISCUSSION_LABELS: Record<string, string> = {
  keaktifan: "Keaktifan", argumentasi: "Argumentasi", kerjasama: "Kerjasama",
  penguasaan: "Penguasaan Materi", etika: "Etika Diskusi",
};

/** Bangun label map dari skill_aspect_configs, fallback ke default jika kosong */
function buildLabelMap(
  aspects: Array<{ skill_type: string; aspect_key: string; label_id: string }>,
  skillType: string,
  fallback: Record<string, string>,
  keyMapping?: Record<string, string> // map dari input key ke DB key
): Record<string, string> {
  const filtered = aspects.filter((a) => a.skill_type === skillType);
  if (filtered.length === 0) return fallback;
  const map: Record<string, string> = {};
  // Untuk komputer: key di state bisa berbeda dengan key di DB
  if (keyMapping) {
    for (const [stateKey, dbKey] of Object.entries(keyMapping)) {
      const found = filtered.find((a) => a.aspect_key === dbKey);
      map[stateKey] = found?.label_id ?? fallback[stateKey] ?? stateKey;
    }
  } else {
    for (const a of filtered) map[a.aspect_key] = a.label_id;
  }
  return map;
}

function ScoreInput({ value, onChange, id }: { value: string; onChange: (v: string) => void; id: string; }) {
  return (
    <Input
      id={id} className="h-8 w-16 text-center px-1 mx-auto" placeholder="—"
      value={value}
      onChange={(e) => {
        const v = e.target.value;
        if (v === "" || (/^\d*\.?\d*$/.test(v) && Number(v) <= 100)) onChange(v);
      }}
    />
  );
}

function NilaiStudentPage() {
  const { studentId } = Route.useParams();
  const { yearId, rombelId } = Route.useSearch();
  const navigate = useNavigate();
  const { token } = useAuth();
  const qc = useQueryClient();

  const [activeTab, setActiveTab] = useState("akademik");
  const [autoSave, setAutoSave] = useState(() => {
    if (typeof window !== "undefined") return localStorage.getItem("sira_autosave") === "true";
    return false;
  });
  const isDirtyRef = useRef(false);
  const markDirty = () => { isDirtyRef.current = true; };

  useEffect(() => {
    localStorage.setItem("sira_autosave", String(autoSave));
  }, [autoSave]);

  // Fetch Student Info & Rombel info
  const { data: studentInfo } = useQuery({
    queryKey: ["student", studentId],
    queryFn: () => getStudentByIdFn({ data: { token: token!, studentId } }),
    enabled: !!token,
  });

  const { data: rombelData } = useQuery({
    queryKey: ["rombels"],
    queryFn: () => getRombelsFn({ data: {} }),
    enabled: !!token,
  });

  const classLevel = rombelData?.find((r: any) => r.id === rombelId)?.class_level ?? 0;

  // Fetch all scores for the rombel (we will filter locally)
  const { data: akademikData } = useQuery({
    queryKey: ["subject-scores", yearId, rombelId],
    queryFn: () => getSubjectScoresFn({ data: { token: token!, academicYearId: yearId, rombelId } }),
    enabled: !!token && !!yearId && !!rombelId,
  });
  const { data: speechData } = useQuery({
    queryKey: ["speech-scores", yearId, rombelId],
    queryFn: () => getSpeechScoresFn({ data: { token: token!, academicYearId: yearId, rombelId } }),
    enabled: !!token && !!yearId && !!rombelId,
  });
  const { data: compData } = useQuery({
    queryKey: ["computer-scores", yearId, rombelId],
    queryFn: () => getComputerScoresFn({ data: { token: token!, academicYearId: yearId, rombelId } }),
    enabled: !!token && !!yearId && !!rombelId && classLevel >= 4,
  });
  const { data: discData } = useQuery({
    queryKey: ["discussion-scores", yearId, rombelId],
    queryFn: () => getDiscussionScoresFn({ data: { token: token!, academicYearId: yearId, rombelId } }),
    enabled: !!token && !!yearId && !!rombelId && classLevel >= 5,  // Diskusi hanya Kelas 5
  });
  // Skill aspect configs (untuk label dinamis)
  const { data: skillAspects = [] } = useQuery({
    queryKey: ["skill-aspects"],
    queryFn: () => getSkillAspectsFn(),
    enabled: !!token,
    staleTime: 1000 * 60 * 10,
  });
  const speechLabels = buildLabelMap(skillAspects as any[], "speech", DEFAULT_SPEECH_LABELS);
  const computerLabels = buildLabelMap(skillAspects as any[], "computer", DEFAULT_COMPUTER_LABELS, COMPUTER_KEY_TO_DB);
  const discussionLabels = buildLabelMap(skillAspects as any[], "discussion", DEFAULT_DISCUSSION_LABELS);
  const { data: attData } = useQuery({
    queryKey: ["attendance", yearId, rombelId],
    queryFn: () => getAttendanceFn({ data: { token: token!, academicYearId: yearId, rombelId } }),
    enabled: !!token && !!yearId && !!rombelId,
  });

  // Local States for Inputs
  const [akademikState, setAkademikState] = useState<Record<string, string>>({});
  const [speechState, setSpeechState] = useState<Record<string, Record<string, string>>>({});
  const [compState, setCompState] = useState<Record<string, string>>({});
  const [discState, setDiscState] = useState<Record<string, string>>({});
  const [attState, setAttState] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!akademikData) return;
    const init: Record<string, string> = {};
    for (const subj of akademikData.subjects) {
      const existing = akademikData.scores.find((s: any) => s.student_id === studentId && s.subject_id === subj.id);
      init[`${subj.id}_tugas`] = existing?.tugas != null ? String(existing.tugas) : "";
      // ujian = gabungan UTS+UAS, nilai lama diambil dari kolom uts
      init[`${subj.id}_ujian`] = existing?.uts != null ? String(existing.uts) : "";
    }
    setAkademikState(init);
  }, [akademikData, studentId]);

  useEffect(() => {
    if (!speechData) return;
    const init: Record<string, Record<string, string>> = {};
    for (const lang of LANGUAGES) {
      init[lang] = {};
      const existing = speechData.scores.find((s: any) => s.student_id === studentId && s.language === lang);
      for (const asp of SPEECH_ASPECTS) {
        init[lang][asp] = existing?.[asp] != null ? String(existing[asp]) : "";
      }
    }
    setSpeechState(init);
  }, [speechData, studentId]);

  useEffect(() => {
    if (!compData) return;
    const ex = compData.scores.find((s: any) => s.student_id === studentId);
    setCompState({
      pengoperasian: ex?.pengoperasian != null ? String(ex.pengoperasian) : "",
      msWord: ex?.ms_word != null ? String(ex.ms_word) : "",
      msExcel: ex?.ms_excel != null ? String(ex.ms_excel) : "",
      internet: ex?.internet != null ? String(ex.internet) : "",
      presentasi: ex?.presentasi != null ? String(ex.presentasi) : "",
    });
  }, [compData, studentId]);

  useEffect(() => {
    if (!discData) return;
    const ex = discData.scores.find((s: any) => s.student_id === studentId);
    setDiscState({
      keaktifan: ex?.keaktifan != null ? String(ex.keaktifan) : "",
      argumentasi: ex?.argumentasi != null ? String(ex.argumentasi) : "",
      kerjasama: ex?.kerjasama != null ? String(ex.kerjasama) : "",
      penguasaan: ex?.penguasaan != null ? String(ex.penguasaan) : "",
      etika: ex?.etika != null ? String(ex.etika) : "",
    });
  }, [discData, studentId]);

  useEffect(() => {
    if (!attData) return;
    const ex = attData.attendance.find((a: any) => a.student_id === studentId);
    setAttState({
      schoolDays: ex?.school_days != null ? String(ex.school_days) : "",
      present: ex?.present != null ? String(ex.present) : "",
      permission: ex?.permission != null ? String(ex.permission) : "",
      absent: ex?.absent != null ? String(ex.absent) : "",
    });
  }, [attData, studentId]);

  // Mutations
  const saveAkademikMut = useMutation({
    mutationFn: () => {
      const scores = (akademikData?.subjects ?? []).map((subj: any) => ({
        studentId, subjectId: subj.id,
        tugas: akademikState[`${subj.id}_tugas`] !== "" ? Number(akademikState[`${subj.id}_tugas`]) : null,
        // ujian menggantikan UTS+UAS
        ujian: akademikState[`${subj.id}_ujian`] !== "" ? Number(akademikState[`${subj.id}_ujian`]) : null,
      }));
      return saveSubjectScoresFn({ data: { token: token!, academicYearId: yearId, scores } });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["subject-scores"] });
      if (!autoSave) toast.success("Nilai akademik tersimpan");
      isDirtyRef.current = false;
    },
    onError: (e) => { toast.error("Gagal menyimpan akademik"); isDirtyRef.current = true; },
  });

  const saveSpeechMut = useMutation({
    mutationFn: () => {
      const scores = LANGUAGES.map((lang) => {
        const row = speechState[lang] ?? {};
        return {
          studentId, language: lang,
          penguasaan: row.penguasaan !== "" ? Number(row.penguasaan) : null,
          kelancaran: row.kelancaran !== "" ? Number(row.kelancaran) : null,
          intonasi: row.intonasi !== "" ? Number(row.intonasi) : null,
          kepercayaan: row.kepercayaan !== "" ? Number(row.kepercayaan) : null,
          penampilan: row.penampilan !== "" ? Number(row.penampilan) : null,
        };
      });
      return saveSpeechScoresFn({ data: { token: token!, academicYearId: yearId, scores } });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["speech-scores"] });
      if (!autoSave) toast.success("Nilai pidato tersimpan");
      isDirtyRef.current = false;
    },
    onError: (e) => { toast.error("Gagal menyimpan pidato"); isDirtyRef.current = true; },
  });

  const saveCompMut = useMutation({
    mutationFn: () => {
      const scores = [{
        studentId,
        pengoperasian: compState.pengoperasian !== "" ? Number(compState.pengoperasian) : null,
        msWord: compState.msWord !== "" ? Number(compState.msWord) : null,
        msExcel: compState.msExcel !== "" ? Number(compState.msExcel) : null,
        internet: compState.internet !== "" ? Number(compState.internet) : null,
        presentasi: compState.presentasi !== "" ? Number(compState.presentasi) : null,
      }];
      return saveComputerScoresFn({ data: { token: token!, academicYearId: yearId, scores } });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["computer-scores"] });
      if (!autoSave) toast.success("Nilai komputer tersimpan");
      isDirtyRef.current = false;
    },
    onError: (e) => { toast.error("Gagal menyimpan komputer"); isDirtyRef.current = true; },
  });

  const saveDiscMut = useMutation({
    mutationFn: () => {
      const scores = [{
        studentId,
        keaktifan: discState.keaktifan !== "" ? Number(discState.keaktifan) : null,
        argumentasi: discState.argumentasi !== "" ? Number(discState.argumentasi) : null,
        kerjasama: discState.kerjasama !== "" ? Number(discState.kerjasama) : null,
        penguasaan: discState.penguasaan !== "" ? Number(discState.penguasaan) : null,
        etika: discState.etika !== "" ? Number(discState.etika) : null,
      }];
      return saveDiscussionScoresFn({ data: { token: token!, academicYearId: yearId, scores } });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["discussion-scores"] });
      if (!autoSave) toast.success("Nilai diskusi tersimpan");
      isDirtyRef.current = false;
    },
    onError: (e) => { toast.error("Gagal menyimpan diskusi"); isDirtyRef.current = true; },
  });

  const saveAttMut = useMutation({
    mutationFn: () => {
      const attendance = [{
        studentId,
        schoolDays: Number(attState.schoolDays || 0),
        present: Number(attState.present || 0),
        permission: Number(attState.permission || 0),
        absent: Number(attState.absent || 0),
      }];
      return saveAttendanceFn({ data: { token: token!, academicYearId: yearId, attendance } });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["attendance"] });
      if (!autoSave) toast.success("Data kehadiran tersimpan");
      isDirtyRef.current = false;
    },
    onError: (e) => { toast.error("Gagal menyimpan kehadiran"); isDirtyRef.current = true; },
  });

  const saveAkademikMutRef = useRef(saveAkademikMut);
  const saveSpeechMutRef = useRef(saveSpeechMut);
  const saveCompMutRef = useRef(saveCompMut);
  const saveDiscMutRef = useRef(saveDiscMut);
  const saveAttMutRef = useRef(saveAttMut);

  useEffect(() => { saveAkademikMutRef.current = saveAkademikMut; }, [saveAkademikMut]);
  useEffect(() => { saveSpeechMutRef.current = saveSpeechMut; }, [saveSpeechMut]);
  useEffect(() => { saveCompMutRef.current = saveCompMut; }, [saveCompMut]);
  useEffect(() => { saveDiscMutRef.current = saveDiscMut; }, [saveDiscMut]);
  useEffect(() => { saveAttMutRef.current = saveAttMut; }, [saveAttMut]);

  useEffect(() => {
    if (!autoSave) return;
    const interval = setInterval(() => {
      if (!isDirtyRef.current) return;
      if (activeTab === "akademik") saveAkademikMutRef.current.mutate();
      else if (activeTab === "pidato") saveSpeechMutRef.current.mutate();
      else if (activeTab === "komputer") saveCompMutRef.current.mutate();
      else if (activeTab === "diskusi") saveDiscMutRef.current.mutate();
      else if (activeTab === "kehadiran") saveAttMutRef.current.mutate();
    }, 5000);
    return () => clearInterval(interval);
  }, [autoSave, activeTab]);

  if (!yearId || !rombelId) {
    return <div className="p-12 text-center">Data tahun ajaran atau rombel tidak valid.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate({ to: "/nilai" })}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Input Nilai: {studentInfo?.full_name}</h1>
          <p className="text-sm text-muted-foreground">Stambuk: {studentInfo?.stambuk} | Kelas {classLevel}</p>
        </div>
      </div>

      <Card className="shadow-none relative">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base">Pengaturan Penyimpanan</CardTitle>
          <div className="flex items-center space-x-2 border rounded-md px-3 py-1.5 bg-muted/20">
            <Switch id="auto-save" checked={autoSave} onCheckedChange={setAutoSave} />
            <Label htmlFor="auto-save" className="text-xs flex items-center cursor-pointer">
              <Clock className="w-3.5 h-3.5 mr-1 text-muted-foreground" /> Auto-Save (5s)
            </Label>
          </div>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-2">
          <TabsTrigger value="akademik">Nilai Akademik</TabsTrigger>
          <TabsTrigger value="pidato">Pidato 3 Bahasa</TabsTrigger>
          {classLevel >= 4 && <TabsTrigger value="komputer">Praktik Komputer</TabsTrigger>}
          {classLevel >= 5 && <TabsTrigger value="diskusi">Diskusi</TabsTrigger>}
          <TabsTrigger value="kehadiran">Kehadiran</TabsTrigger>
        </TabsList>

        <TabsContent value="akademik" className="mt-4">
          <Card className="shadow-none">
            <CardHeader><CardTitle className="text-sm">Nilai Akademik</CardTitle></CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Mata Pelajaran</TableHead>
                      <TableHead className="text-center">Tugas</TableHead>
                      <TableHead className="text-center">Ujian</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(akademikData?.subjects ?? []).map((subj: any) => (
                      <TableRow key={subj.id}>
                        <TableCell className="font-medium">
                          {subj.name}
                          <div className="text-[10px] text-muted-foreground font-normal">
                            Bobot: Tugas {Math.round(Number(subj.bobot_tugas)*100)}%, Ujian {Math.round((Number(subj.bobot_uts)+Number(subj.bobot_uas))*100)}%
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <ScoreInput
                            id={`${subj.id}-tugas`}
                            value={akademikState[`${subj.id}_tugas`] ?? ""}
                            onChange={(v) => { markDirty(); setAkademikState(p => ({ ...p, [`${subj.id}_tugas`]: v })); }}
                          />
                        </TableCell>
                        <TableCell className="text-center">
                          <ScoreInput
                            id={`${subj.id}-ujian`}
                            value={akademikState[`${subj.id}_ujian`] ?? ""}
                            onChange={(v) => { markDirty(); setAkademikState(p => ({ ...p, [`${subj.id}_ujian`]: v })); }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="mt-4 flex justify-end">
                <Button onClick={() => saveAkademikMut.mutate()} disabled={saveAkademikMut.isPending} className="bg-emerald-600">
                  <Save className="h-4 w-4 mr-2" /> Simpan Nilai Akademik
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pidato" className="mt-4">
          <div className="space-y-4">
            {LANGUAGES.map((lang) => {
              const row = speechState[lang] ?? {};
              const vals = SPEECH_ASPECTS.map((a) => Number(row[a] || 0));
              const avg = vals.every((v) => v === 0) ? "—" : (vals.reduce((a, b) => a + b, 0) / 5).toFixed(1);
              return (
                <Card key={lang} className="shadow-none">
                  <CardHeader className="flex flex-row items-center justify-between py-3">
                    <CardTitle className="text-sm">Pidato Bahasa {lang}</CardTitle>
                    <div className="text-sm font-semibold">Rata-rata: {avg}</div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      {SPEECH_ASPECTS.map((asp) => (
                        <div key={asp} className="space-y-1 text-center">
                          <Label className="text-xs">{speechLabels[asp] ?? asp}</Label>
                          <ScoreInput
                            id={`speech-${lang}-${asp}`}
                            value={row[asp] ?? ""}
                            onChange={(v) => { markDirty(); setSpeechState(p => ({ ...p, [lang]: { ...p[lang], [asp]: v } })); }}
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
            <div className="flex justify-end">
              <Button onClick={() => saveSpeechMut.mutate()} disabled={saveSpeechMut.isPending} className="bg-emerald-600">
                <Save className="h-4 w-4 mr-2" /> Simpan Nilai Pidato
              </Button>
            </div>
          </div>
        </TabsContent>

        {classLevel >= 4 && (
          <TabsContent value="komputer" className="mt-4">
            <Card className="shadow-none">
              <CardHeader><CardTitle className="text-sm">Nilai Praktik Komputer</CardTitle></CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {COMPUTER_ASPECTS.map((asp) => (
                    <div key={asp} className="space-y-1 text-center">
                      <Label className="text-xs">{computerLabels[asp] ?? asp}</Label>
                      <ScoreInput
                        id={`comp-${asp}`}
                        value={compState[asp] ?? ""}
                        onChange={(v) => { markDirty(); setCompState(p => ({ ...p, [asp]: v })); }}
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-end">
                  <Button onClick={() => saveCompMut.mutate()} disabled={saveCompMut.isPending} className="bg-emerald-600">
                    <Save className="h-4 w-4 mr-2" /> Simpan Nilai Komputer
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {classLevel >= 5 && (
          <TabsContent value="diskusi" className="mt-4">
            <Card className="shadow-none">
              <CardHeader><CardTitle className="text-sm">Nilai Diskusi</CardTitle></CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {DISCUSSION_ASPECTS.map((asp) => (
                    <div key={asp} className="space-y-1 text-center">
                      <Label className="text-xs">{discussionLabels[asp] ?? asp}</Label>
                      <ScoreInput
                        id={`disc-${asp}`}
                        value={discState[asp] ?? ""}
                        onChange={(v) => { markDirty(); setDiscState(p => ({ ...p, [asp]: v })); }}
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-end">
                  <Button onClick={() => saveDiscMut.mutate()} disabled={saveDiscMut.isPending} className="bg-emerald-600">
                    <Save className="h-4 w-4 mr-2" /> Simpan Nilai Diskusi
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        <TabsContent value="kehadiran" className="mt-4">
          <Card className="shadow-none">
            <CardHeader><CardTitle className="text-sm">Data Kehadiran</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4 max-w-lg">
                {(["schoolDays", "present", "permission", "absent"] as const).map((key) => {
                  const labels: Record<string, string> = { schoolDays: "Hari Sekolah", present: "Hadir", permission: "Izin", absent: "Alpha" };
                  return (
                    <div key={key} className="space-y-1 text-center">
                      <Label className="text-xs">{labels[key]}</Label>
                      <Input
                        id={`att-${key}`}
                        className="h-8 w-16 text-center mx-auto px-1"
                        placeholder="0"
                        value={attState[key] ?? ""}
                        onChange={(e) => {
                          const v = e.target.value;
                          if (v === "" || /^\d+$/.test(v)) {
                            markDirty();
                            setAttState(p => ({ ...p, [key]: v }));
                          }
                        }}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 flex justify-end">
                <Button onClick={() => saveAttMut.mutate()} disabled={saveAttMut.isPending} className="bg-emerald-600">
                  <Save className="h-4 w-4 mr-2" /> Simpan Kehadiran
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
