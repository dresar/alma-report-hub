import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Printer, ArrowLeft, Search, FileDown } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LabelList,
  PieChart, Pie, Cell, Legend, Tooltip,
} from "recharts";
import { useState, useEffect, useCallback, useRef } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getPrintSettingsFn, savePrintSettingsFn } from "@/lib/api/print-settings.functions";
import { useAuth } from "@/hooks/use-auth";
import { getReportCardFn } from "@/lib/api/report.functions";
import { getAcademicYearsFn } from "@/lib/api/academic-years.functions";
import { getStudentsForReportFn } from "@/lib/api/report.functions";
import { getSubjectsFn } from "@/lib/api/subjects.functions";
import { getRombelsFn } from "@/lib/api/classes.functions";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription,
} from "@/components/ui/dialog";

import jsPDF from "jspdf";
import * as htmlToImage from "html-to-image";
import { toast } from "sonner";
import { Settings as SettingsIcon } from "lucide-react";

export const Route = createFileRoute("/rapor")({
  validateSearch: (s: Record<string, unknown>) => ({
    studentId: s.studentId as string | undefined,
    yearId: s.yearId as string | undefined,
  }),
  head: () => ({ meta: [{ title: "Preview Rapor — SIRA" }] }),
  component: Rapor,
});

// ── Default fallback labels (jika DB belum punya konfigurasi) ──────────
const DEFAULT_SPEECH_LABELS: Record<string, string> = {
  penguasaan: "Content Mastery", kelancaran: "Fluency", intonasi: "Intonation",
  kepercayaan: "Self Confidence", penampilan: "Appearance",
};
const DEFAULT_COMPUTER_LABELS: Record<string, string> = {
  pengoperasian: "Basic Operation", ms_word: "Microsoft Word",
  ms_excel: "Microsoft Excel", internet: "Internet", presentasi: "Presentation",
};
const DEFAULT_DISCUSSION_LABELS: Record<string, string> = {
  keaktifan: "Participation", argumentasi: "Argumentation", kerjasama: "Teamwork",
  penguasaan: "Content Mastery", etika: "Discussion Ethics",
};

// ── Helper: build label map dari skill_aspect_configs ──────────────────
function buildLabelMap(
  skillAspects: Array<{ skill_type: string; aspect_key: string; label_en: string }>,
  skillType: string,
  fallback: Record<string, string>
): Record<string, string> {
  const filtered = skillAspects.filter((a) => a.skill_type === skillType);
  if (filtered.length === 0) return fallback;
  const map: Record<string, string> = {};
  for (const a of filtered) map[a.aspect_key] = a.label_en;
  return map;
}

function Rapor() {
  const { token } = useAuth();
  const search = useSearch({ from: "/rapor" });

  const [yearId, setYearId] = useState(search.yearId ?? "");
  const [studentId, setStudentId] = useState(search.studentId ?? "");
  const [blangkoOpen, setBlangkoOpen] = useState(false);
  const [blangkoKelas, setBlangkoKelas] = useState("4");
  const [blangkoRombel, setBlangkoRombel] = useState("");
  const [blangkoPrinting, setBlangkoPrinting] = useState(false);
  const [isBlangkoMode, setIsBlangkoMode] = useState(false); // Default false, will print actual filled report cards
  const [batchReportCards, setBatchReportCards] = useState<any[]>([]);

  const { data: years } = useQuery({
    queryKey: ["academic-years"],
    queryFn: () => getAcademicYearsFn(),
    enabled: !!token,
  });

  useEffect(() => {
    if (!yearId && years?.length) {
      const active = years.find((y) => y.is_active) ?? years[0];
      setYearId(active?.id ?? "");
    }
  }, [years, yearId]);

  const { data: studentList } = useQuery({
    queryKey: ["students-for-report", yearId],
    queryFn: () =>
      getStudentsForReportFn({ data: { token: token!, academicYearId: yearId } }),
    enabled: !!token && !!yearId,
  });

  const { data: reportCard, isLoading, error } = useQuery({
    queryKey: ["report-card", studentId, yearId],
    queryFn: () =>
      getReportCardFn({ data: { token: token!, studentId, academicYearId: yearId } }),
    enabled: !!token && !!studentId && !!yearId,
  });

  // Rombel list untuk blangko
  const { data: rombelList } = useQuery({
    queryKey: ["rombels"],
    queryFn: () => getRombelsFn({ data: {} }),
    enabled: !!token && blangkoOpen,
  });

  const { data: subjectList } = useQuery({
    queryKey: ["subjects", blangkoKelas],
    queryFn: () => getSubjectsFn({ data: { classLevel: Number(blangkoKelas) } }),
    enabled: !!token && blangkoOpen,
  });

  const [printDate, setPrintDate] = useState(new Date().toISOString().split("T")[0]);
  const [headmasterName, setHeadmasterName] = useState("");
  const [signatureImage, setSignatureImage] = useState("");
  const [showSignature, setShowSignature] = useState(true);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const qc = useQueryClient();

  const { data: dbSettings } = useQuery({
    queryKey: ["print-settings"],
    queryFn: () => getPrintSettingsFn(),
    enabled: !!token,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (!dbSettings) return;
    if (dbSettings.rapor_date) setPrintDate(dbSettings.rapor_date);
    if (dbSettings.rapor_headmaster) setHeadmasterName(dbSettings.rapor_headmaster);
    if (dbSettings.rapor_signature) setSignatureImage(dbSettings.rapor_signature);
    if (dbSettings.rapor_show_sig !== undefined) setShowSignature(dbSettings.rapor_show_sig !== "false");
  }, [dbSettings]);

  const saveMut = useMutation({
    mutationFn: (settings: Record<string, string>) =>
      savePrintSettingsFn({ data: { token: token!, settings } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["print-settings"] }),
  });

  const handleSaveSettings = () => {
    saveMut.mutate({
      rapor_date: printDate,
      rapor_headmaster: headmasterName,
      rapor_signature: signatureImage,
      rapor_show_sig: String(showSignature),
    });
    toast.success("Pengaturan cetak rapor berhasil disimpan!");
  };

  const handleSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const dataUrl = ev.target?.result as string;
        setSignatureImage(dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownloadPDF = async () => {
    const el = document.getElementById("rapor-print-area");
    if (!el) return;
    toast.info("Sedang membuat PDF...", { id: "pdf-toast" });
    try {
      const pdf = new jsPDF("p", "mm", "a4");
      const pages = el.querySelectorAll(".print-page");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      let firstPage = true;
      for (let i = 0; i < pages.length; i++) {
        const canvas = await htmlToImage.toCanvas(pages[i] as HTMLElement, { pixelRatio: 2 });
        const imgData = canvas.toDataURL("image/jpeg", 0.95);
        if (!firstPage) pdf.addPage();
        pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
        firstPage = false;
      }
      
      pdf.save(`Rapor_${(reportCard as any)?.student?.full_name?.replace(/\s+/g, "_") || "Santri"}.pdf`);
      toast.success("PDF berhasil diunduh!", { id: "pdf-toast" });
    } catch (err) {
      console.error(err);
      toast.error("Gagal membuat PDF", { id: "pdf-toast" });
    }
  };

  // ── Cetak Blangko ─────────────────────────────────────────────────────
  const handleCetakBlangko = async () => {
    if (!blangkoRombel) {
      toast.error("Pilih rombel terlebih dahulu");
      return;
    }
    // Cari santri di rombel yang dipilih
    const studentsInRombel = (studentList ?? []).filter((s: any) => {
      const rombel = rombelList?.find((r: any) => r.id === blangkoRombel);
      return rombel && String(s.class_level) === blangkoKelas;
    });
    if (studentsInRombel.length === 0) {
      toast.error("Tidak ada santri di rombel ini untuk tahun ajaran yang dipilih");
      return;
    }

    setBlangkoPrinting(true);

    try {
      if (!isBlangkoMode) {
        toast.info(`Mengambil data nilai untuk ${studentsInRombel.length} santri...`, { id: "blangko-toast" });
        const results = await Promise.all(
          studentsInRombel.map((s: any) =>
            getReportCardFn({ data: { token: token!, studentId: s.id, academicYearId: yearId } })
          )
        );
        setBatchReportCards(results);
        // Wait for React to render the hidden elements
        await new Promise((r) => setTimeout(r, 2000));
      } else {
        toast.info(`Membuat blangko untuk ${studentsInRombel.length} santri...`, { id: "blangko-toast" });
      }

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      let firstPage = true;

      for (const student of studentsInRombel) {
        const elId = isBlangkoMode ? `blangko-${student.id}` : `batch-${student.id}`;
        const targetEl = document.getElementById(elId);
        if (!targetEl) continue;

        const pages = targetEl.querySelectorAll(".print-page");
        for (let i = 0; i < pages.length; i++) {
          const canvas = await htmlToImage.toCanvas(pages[i] as HTMLElement, { pixelRatio: 2 });
          const imgData = canvas.toDataURL("image/jpeg", 0.95);
          const pdfHeight = pdf.internal.pageSize.getHeight();

          if (!firstPage) pdf.addPage();
          pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
          firstPage = false;
        }
      }

      const rombelInfo = rombelList?.find((r: any) => r.id === blangkoRombel);
      const rombelLabel = rombelInfo ? `Kelas${rombelInfo.class_level}${rombelInfo.name}` : `Kelas${blangkoKelas}`;
      const prefix = isBlangkoMode ? "Blangko_Rapor" : "Rapor";
      pdf.save(`${prefix}_${rombelLabel}.pdf`);
      toast.success(`${isBlangkoMode ? "Blangko" : "Rapor"} berhasil diunduh!`, { id: "blangko-toast" });
    } catch (err) {
      console.error(err);
      toast.error(`Gagal membuat ${isBlangkoMode ? "blangko" : "rapor"}`, { id: "blangko-toast" });
    } finally {
      setBlangkoPrinting(false);
      setBatchReportCards([]);
    }
  };

  const numberToWords = (n: number): string => {
    const ones = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
                  "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
    const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
    if (n < 20) return ones[n];
    if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? " " + ones[n % 10] : "");
    if (n === 100) return "One Hundred";
    return String(n);
  };

  // Build label maps dari skillAspects dinamis
  const skillAspects = ((reportCard as any)?.skillAspects as any[]) ?? [];
  const speechLabels = buildLabelMap(skillAspects, "speech", DEFAULT_SPEECH_LABELS);
  const computerLabels = buildLabelMap(skillAspects, "computer", DEFAULT_COMPUTER_LABELS);
  const discussionLabels = buildLabelMap(skillAspects, "discussion", DEFAULT_DISCUSSION_LABELS);

  const classLevel = (reportCard as any)?.placement?.class_level ?? 0;

  // ── Section rendering helpers ─────────────────────────────────────────

  // Determine section letters dynamically based on class level
  const getSectionLetters = (level: number): Record<string, string> => {
    // A = Academic (all), B = Speech (all), C = Computer (4+), D = Discussion (4+), E = Attendance
    if (level >= 4) return { academic: "A", speech: "B", computer: "C", discussion: "D", attendance: "E" };
    return { academic: "A", speech: "B", attendance: "C" };
  };
  const sections = getSectionLetters(classLevel);

  // ── Selector bar ─────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-secondary">
      {/* Toolbar */}
      <div className="no-print sticky top-0 z-10 border-b bg-card">
        <div className="mx-auto max-w-[210mm] flex items-center justify-between px-4 py-3 gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali
            </Link>
          </Button>
          <div className="flex items-center gap-3 flex-1 justify-center">
            <div className="flex items-center gap-2">
              <Label className="text-xs shrink-0">Tahun Ajaran</Label>
              <Select value={yearId} onValueChange={(v) => { setYearId(v); setStudentId(""); }}>
                <SelectTrigger className="h-8 w-36 text-xs">
                  <SelectValue placeholder="Pilih tahun" />
                </SelectTrigger>
                <SelectContent>
                  {(years ?? []).map((y) => (
                    <SelectItem key={y.id} value={y.id}>{y.year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Search className="h-3.5 w-3.5 text-muted-foreground" />
              <Select value={studentId} onValueChange={setStudentId} disabled={!yearId}>
                <SelectTrigger className="h-8 w-52 text-xs">
                  <SelectValue placeholder="Pilih santri..." />
                </SelectTrigger>
                <SelectContent>
                  {(studentList ?? []).map((s: any) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.full_name} — Kelas {s.class_level}{s.rombel_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Pengaturan Cetak */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <SettingsIcon className="h-4 w-4 mr-2" />
                  Pengaturan Cetak
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Pengaturan Cetak Rapor</DialogTitle>
                  <DialogDescription className="hidden">Konfigurasi tanggal dan penanda tangan rapor</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Tanggal Rapor</Label>
                    <Input type="date" value={printDate} onChange={(e) => setPrintDate(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Nama Pimpinan / Penanda Tangan</Label>
                    <Input value={headmasterName} onChange={(e) => setHeadmasterName(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Upload Tanda Tangan (PNG Transparan)</Label>
                    <Input type="file" accept="image/png, image/jpeg" onChange={handleSignatureUpload} />
                    {signatureImage && (
                      <div className="mt-2 text-xs text-green-600 flex items-center gap-2">
                        <span>✓ Tanda tangan tersimpan</span>
                        <Button variant="ghost" size="sm" className="h-6 text-red-500" onClick={() => setSignatureImage("")}>
                          Hapus
                        </Button>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 pt-2 border-t">
                    <Switch id="show-sig" checked={showSignature} onCheckedChange={setShowSignature} />
                    <Label htmlFor="show-sig">Tampilkan Tanda Tangan di PDF</Label>
                  </div>
                  <div className="pt-4 flex justify-end">
                    <Button onClick={handleSaveSettings} disabled={saveMut.isPending}>
                      {saveMut.isPending ? "Menyimpan..." : "Simpan Pengaturan"}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* Cetak Blangko / Rombel */}
            <Dialog open={blangkoOpen} onOpenChange={setBlangkoOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" id="btn-cetak-blangko" disabled={!yearId}>
                  <FileDown className="h-4 w-4 mr-2" />
                  Cetak Rombel / Blangko
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Cetak Rapor Rombel</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <DialogDescription className="text-sm text-muted-foreground">
                    Cetak rapor untuk satu rombel penuh.
                  </DialogDescription>
                  <div className="flex items-center space-x-2 bg-muted p-2 rounded-md">
                    <Switch id="is-blangko" checked={isBlangkoMode} onCheckedChange={setIsBlangkoMode} />
                    <Label htmlFor="is-blangko" className="font-semibold text-xs">Cetak Blangko Saja (Hanya Template, Tanpa Nilai)</Label>
                  </div>
                  <div className="space-y-2">
                    <Label>Kelas</Label>
                    <Select value={blangkoKelas} onValueChange={(v) => { setBlangkoKelas(v); setBlangkoRombel(""); }}>
                      <SelectTrigger id="blangko-kelas">
                        <SelectValue placeholder="Pilih kelas" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1,2,3,4,5].map((k) => (
                          <SelectItem key={k} value={String(k)}>Kelas {k}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Rombel</Label>
                    <Select value={blangkoRombel} onValueChange={setBlangkoRombel}>
                      <SelectTrigger id="blangko-rombel">
                        <SelectValue placeholder="Pilih rombel" />
                      </SelectTrigger>
                      <SelectContent>
                        {(rombelList ?? [])
                          .filter((r: any) => String(r.class_level) === blangkoKelas)
                          .map((r: any) => (
                            <SelectItem key={r.id} value={r.id}>
                              Kelas {r.class_level}{r.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="pt-2 border-t flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      {blangkoRombel
                        ? `${(studentList ?? []).filter((s: any) => {
                            const rombel = rombelList?.find((r: any) => r.id === blangkoRombel);
                            return rombel && String(s.class_level) === blangkoKelas;
                          }).length} santri ditemukan`
                        : "Pilih rombel untuk melihat jumlah santri"}
                    </div>
                    <Button
                      id="btn-generate-blangko"
                      onClick={handleCetakBlangko}
                      disabled={!blangkoRombel || blangkoPrinting}
                      className="bg-emerald-600 hover:bg-emerald-500"
                    >
                      <Printer className="h-4 w-4 mr-2" />
                      {blangkoPrinting ? "Membuat PDF..." : (isBlangkoMode ? "Unduh Blangko" : "Unduh Rapor")}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Button size="sm" onClick={handleDownloadPDF} disabled={!reportCard}>
              <Printer className="h-4 w-4 mr-2" />
              Cetak PDF
            </Button>
          </div>
        </div>
      </div>

      {/* States */}
      {Boolean(!studentId) && (
        <div className="flex items-center justify-center py-32 text-muted-foreground text-sm">
          Pilih santri untuk melihat rapor.
        </div>
      )}
      {Boolean(isLoading) && (
        <div className="flex items-center justify-center py-32 text-muted-foreground text-sm">
          Memuat rapor...
        </div>
      )}
      {Boolean(error) && (
        <div className="flex items-center justify-center py-32 text-red-500 text-sm">
          {error instanceof Error ? error.message : "Gagal memuat rapor"}
        </div>
      )}

      {/* A4 sheet */}
      {reportCard && (
        <div className="py-8 px-4 flex justify-center">
          <RaporSheet
            reportCard={reportCard}
            classLevel={classLevel}
            sections={sections}
            speechLabels={speechLabels}
            computerLabels={computerLabels}
            discussionLabels={discussionLabels}
            printDate={printDate}
            headmasterName={headmasterName}
            signatureImage={signatureImage}
            showSignature={showSignature}
            numberToWords={numberToWords}
            id="rapor-print-area"
          />
        </div>
      )}

      {/* Hidden elements for printing — rendered off-screen */}
      {blangkoOpen && blangkoRombel && (
        <div
          style={{ position: "absolute", left: "-9999px", top: 0, pointerEvents: "none" }}
          aria-hidden="true"
        >
          {isBlangkoMode ? (
            (studentList ?? [])
              .filter((s: any) => {
                const rombel = rombelList?.find((r: any) => r.id === blangkoRombel);
                return rombel && String(s.class_level) === blangkoKelas;
              })
              .map((student: any) => (
                <RaporSheet
                  key={student.id}
                  id={`blangko-${student.id}`}
                  isBlangko
                  blangkoStudent={student}
                  blangkoSubjects={subjectList}
                  classLevel={Number(blangkoKelas)}
                  sections={getSectionLetters(Number(blangkoKelas))}
                  speechLabels={DEFAULT_SPEECH_LABELS}
                  computerLabels={DEFAULT_COMPUTER_LABELS}
                  discussionLabels={DEFAULT_DISCUSSION_LABELS}
                  printDate={printDate}
                  headmasterName={headmasterName}
                  signatureImage={signatureImage}
                  showSignature={showSignature}
                  numberToWords={numberToWords}
                  reportCard={null}
                />
              ))
          ) : (
            batchReportCards.map((rc: any) => (
              <RaporSheet
                key={rc.student.id}
                id={`batch-${rc.student.id}`}
                isBlangko={false}
                reportCard={rc}
                classLevel={Number(blangkoKelas)}
                sections={getSectionLetters(Number(blangkoKelas))}
                speechLabels={speechLabels}
                computerLabels={computerLabels}
                discussionLabels={discussionLabels}
                printDate={printDate}
                headmasterName={headmasterName}
                signatureImage={signatureImage}
                showSignature={showSignature}
                numberToWords={numberToWords}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}

// ── RaporSheet Component ───────────────────────────────────────────────
interface RaporSheetProps {
  id: string;
  reportCard: any;
  classLevel: number;
  sections: Record<string, string>;
  speechLabels: Record<string, string>;
  computerLabels: Record<string, string>;
  discussionLabels: Record<string, string>;
  printDate: string;
  headmasterName: string;
  signatureImage: string;
  showSignature: boolean;
  numberToWords: (n: number) => string;
  isBlangko?: boolean;
  blangkoStudent?: any;
  blangkoSubjects?: any[];
}

function RaporSheet({
  id, reportCard, classLevel, sections, speechLabels, computerLabels, discussionLabels,
  printDate, headmasterName, signatureImage, showSignature, numberToWords,
  isBlangko = false, blangkoStudent, blangkoSubjects,
}: RaporSheetProps) {
  const student = isBlangko ? blangkoStudent : reportCard?.student;
  const subjectScores = isBlangko ? [] : (reportCard?.subjectScores ?? []);
  const speechScores = isBlangko ? [] : (reportCard?.speechScores ?? []);
  const computerScore = isBlangko ? null : reportCard?.computerScore;
  const discussionScore = isBlangko ? null : reportCard?.discussionScore;
  const attendance = isBlangko ? null : reportCard?.attendance;
  const academicYear = isBlangko ? null : reportCard?.academicYear;

  const showComputer = classLevel >= 4;
  const showDiscussion = classLevel >= 4;

  // Build bar chart data for speech
  const speechChartData = speechScores.map((s: any) => ({
    lang: s.language + " Speech",
    name: s.language + " Speech",
    value: Number(s.final_score ?? 0),
  }));

  // Build bar chart data for computer
  const computerAspectOrder = ["pengoperasian", "ms_word", "ms_excel", "internet", "presentasi"];
  const computerChartData = computerAspectOrder.map((key) => ({
    aspect: computerLabels[key] ?? key,
    name: computerLabels[key] ?? key,
    value: computerScore ? Number(computerScore[key] ?? 0) : 0,
  }));

  // Build bar chart data for discussion
  const discussionAspectOrder = ["keaktifan", "argumentasi", "kerjasama", "penguasaan", "etika"];
  const discussionChartData = discussionAspectOrder.map((key) => ({
    aspect: discussionLabels[key] ?? key,
    name: discussionLabels[key] ?? key,
    value: discussionScore ? Number(discussionScore[key] ?? 0) : 0,
  }));

  const renderHeaderInfo = () => (
    <>
      <div className="text-center pb-2">
        <h1 className="text-[15pt] font-bold tracking-wide">
          RAUDHATUSSALAM ISLAMIC BOARDING SCHOOL
        </h1>
        <p className="text-[10pt] mt-0.5">
          Gambangan, Mahato, Tambusai Utara, Rokan Hulu
        </p>
        <h2 className="text-[12pt] font-bold mt-1">
          AFTERNOON LESSON ADVISORY COUNCIL
        </h2>
        <p className="text-[11pt] mt-0.5">Student Report Sheet</p>
      </div>

      <hr className="border-black border-y-2 border-x-0 h-1 mb-4" />

      <div className="flex justify-between items-end mb-4 font-bold italic text-[11pt]">
        <div>Academic Year &nbsp;: &nbsp;&nbsp;&nbsp;{academicYear?.year || "2025/2026"}</div>
        <div className="mr-8">Semester &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;First</div>
      </div>

      <table className="w-full text-[11.5pt] mb-6 border-collapse font-serif">
        <tbody>
          <tr>
            <td className="w-[14%] py-0.5 align-bottom">Name</td>
            <td className="w-[2%] py-0.5 align-bottom text-center">:</td>
            <td className="w-[84%] py-0.5 align-bottom font-bold border-b border-black">
              {student?.full_name}
            </td>
          </tr>
          <tr>
            <td className="py-0.5 align-bottom">Reg. No</td>
            <td className="py-0.5 align-bottom text-center">:</td>
            <td className="py-0.5 align-bottom font-bold border-b border-black">
              {student?.stambuk}
            </td>
          </tr>
          <tr>
            <td className="py-0.5 align-bottom">Class</td>
            <td className="py-0.5 align-bottom text-center">:</td>
            <td className="py-0.5 align-bottom font-bold border-b border-black">
              {isBlangko
                ? `${classLevel}${student?.rombel_name ?? ""}`
                : `${reportCard?.placement?.class_level ?? ""}${reportCard?.placement?.rombel_name ?? ""}`}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );

  const pageStyle = {
    width: "210mm",
    height: "297mm",
    padding: "14mm 16mm",
    fontFamily: '"Times New Roman", Times, serif',
    fontSize: "11pt",
    lineHeight: 1.35,
  };

  return (
    <div id={id} className="flex flex-col gap-4">
      {/* PAGE 1 */}
      <div className="print-page print-area bg-white text-black border shadow-sm relative overflow-hidden" style={pageStyle}>
        {renderHeaderInfo()}

        {/* Section A — Academic */}
      <SectionTitle>{sections.academic}. CORE SUBJECT</SectionTitle>
      <table className="w-full border-collapse text-[10.5pt]">
        <thead>
          <tr className="bg-sky-100/50">
            <Th w="6%" rowSpan={2}>No</Th>
            <Th w="42%" rowSpan={2} align="center">Subject</Th>
            <Th colSpan={2}>Study Result Score</Th>
            <Th w="16%" rowSpan={2}>Class's<br/>Avg.</Th>
          </tr>
          <tr className="bg-sky-100/50">
            <Th w="18%">Number</Th>
            <Th w="18%">Letter</Th>
          </tr>
        </thead>
        <tbody>
          {isBlangko ? (
            // Blangko: baris berdasarkan mapel kelas tersebut
            (blangkoSubjects?.length ? blangkoSubjects : Array.from({ length: 12 })).map((subj: any, i) => (
              <tr key={i}>
                <Td center>{i + 1}</Td>
                <Td>{subj?.name || "\u00A0"}</Td>
                <Td center>&nbsp;</Td>
                <Td center>&nbsp;</Td>
                <Td center>&nbsp;</Td>
              </tr>
            ))
          ) : (
            subjectScores.map((ss: any, i: number) => {
              const score = Number(ss.final_score ?? 0);
              return (
                <tr key={ss.id}>
                  <Td center>{i + 1}</Td>
                  <Td>{ss.subject_name}</Td>
                  <Td center>{score ? score.toFixed(1) : "—"}</Td>
                  <Td center>{score ? numberToWords(Math.round(score)) : "—"}</Td>
                  <Td center>{ss.class_avg ? Number(ss.class_avg).toFixed(2) : "—"}</Td>
                </tr>
              );
            })
          )}
          {!isBlangko && subjectScores.length > 0 && (() => {
            const total = subjectScores.reduce((a: number, b: any) => a + Number(b.final_score ?? 0), 0);
            const avg = total / subjectScores.length;
            return (
              <>
                <tr className="bg-gray-100 font-bold">
                  <Td colSpan={2} center>Semester Final Grade</Td>
                  <Td center className="font-bold text-[11pt]">{total.toFixed(0)}</Td>
                  <Td center className="font-bold text-[11pt]">{numberToWords(Math.round(total))}</Td>
                  <Td center className="bg-white border-none"></Td>
                </tr>
                <tr className="bg-gray-100 font-bold">
                  <Td colSpan={2} center className="border-none"></Td>
                  <Td center className="font-bold text-[11pt]">{avg.toFixed(1)}</Td>
                  <Td center className="font-bold text-[11pt]">{numberToWords(Math.round(avg))} point {Math.round((avg % 1)*10) === 4 ? "Four" : "Zero"}</Td>
                  <Td center className="bg-white border-none"></Td>
                </tr>
              </>
            );
          })()}
          {isBlangko && (
            <>
              <tr className="bg-gray-100 font-bold">
                <Td colSpan={2} center>Semester Final Grade</Td>
                <Td center></Td>
                <Td center></Td>
                <Td center className="bg-white border-none"></Td>
              </tr>
              <tr className="bg-gray-100 font-bold">
                <Td colSpan={2} center className="border-none"></Td>
                <Td center></Td>
                <Td center></Td>
                <Td center className="bg-white border-none"></Td>
              </tr>
            </>
          )}
        </tbody>
      </table>

      {/* Section B — Speech */}
      <div className="mt-6">
        <SectionTitle>{sections.speech}. Applied Speech Skill</SectionTitle>
        {isBlangko ? (
          <BlangkoSkillSection
            aspects={Object.entries(speechLabels).map(([k, v]) => v)}
            languages={["Indonesia", "Arab", "Inggris"]}
          />
        ) : (
          speechScores.length > 0 && (
            <div className="mt-2 px-6 relative">
              <div style={{ width: "100%", height: 160 }}>
                {classLevel >= 4 ? (
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={speechScores.map((s: any) => ({
                          name: s.language + " Speech",
                          value: Number(s.final_score ?? 0),
                        }))}
                        cx="40%"
                        cy="50%"
                        labelLine={false}
                        label={({ cx, cy, midAngle, innerRadius, outerRadius, value }: any) => {
                          if (!value) return null;
                          const RADIAN = Math.PI / 180;
                          const radius = innerRadius + (outerRadius - innerRadius) * 0.55;
                          const x = cx + radius * Math.cos(-midAngle * RADIAN);
                          const y = cy + radius * Math.sin(-midAngle * RADIAN);
                          return (
                            <g>
                              <rect x={x - 14} y={y - 10} width={28} height={20} rx={3} fill="#333" />
                              <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" style={{ fontSize: "9px", fontWeight: "bold" }}>
                                {value.toFixed(0)}
                              </text>
                            </g>
                          );
                        }}
                        outerRadius={70}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {speechScores.map((_: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={["#4f81bd", "#c0504d", "#9bbb59"][index % 3]} />
                        ))}
                      </Pie>
                      <Legend
                        layout="vertical"
                        align="right"
                        verticalAlign="middle"
                        iconType="square"
                        iconSize={8}
                        wrapperStyle={{ fontSize: "9.5pt", fontFamily: 'serif', paddingLeft: "10px" }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <ResponsiveContainer>
                    <BarChart
                      data={speechChartData}
                      layout="vertical"
                      margin={{ left: 100, right: 30, top: 10, bottom: 10 }}
                    >
                      <XAxis type="number" domain={[0, 9]} tickCount={10} axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#666" }} />
                      <YAxis dataKey="lang" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#333", fontStyle: "italic" }} width={120} />
                      <Bar dataKey="value" fill="#4f81bd" barSize={12}>
                        <LabelList dataKey="value" position="right" style={{ fontSize: 10, fill: "#333", fontWeight: "bold" }} formatter={(val: number) => val.toFixed(0)} />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
              {/* Detail aspek pidato */}
              <table className="w-full border-collapse text-[9.5pt] mt-2">
                <thead>
                  <tr className="bg-sky-50">
                    <Th w="22%">Language</Th>
                    {Object.values(speechLabels).map((label) => (
                      <Th key={label}>{label}</Th>
                    ))}
                    <Th w="10%">Avg</Th>
                  </tr>
                </thead>
                <tbody>
                  {speechScores.map((s: any) => {
                    const aspectKeys = Object.keys(speechLabels);
                    const vals = aspectKeys.map((k) => Number(s[k] ?? 0));
                    const avg = vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
                    return (
                      <tr key={s.language}>
                        <Td>{s.language}</Td>
                        {aspectKeys.map((k) => (
                          <Td key={k} center>{s[k] != null ? Number(s[k]).toFixed(1) : "—"}</Td>
                        ))}
                        <Td center className="font-bold">{avg > 0 ? avg.toFixed(1) : "—"}</Td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )
        )}
      </div>
      </div>

      {/* PAGE 2 */}
      <div className="print-page print-area bg-white text-black border shadow-sm relative overflow-hidden" style={pageStyle}>
        {renderHeaderInfo()}

        {/* Section C — Computer (Kelas 4 & 5) */}
      {showComputer && (
        <div className="mt-6">
          <SectionTitle>{sections.computer}. Computer Practical Skill</SectionTitle>
          {isBlangko ? (
            <BlangkoSkillBarTable labels={Object.values(computerLabels)} />
          ) : (
            computerScore ? (
              <SkillPieSection
                data={computerChartData}
                score={computerScore.final_score}
              />
            ) : (
              <p className="text-[10pt] italic text-gray-400 mt-2 px-2">
                — Belum ada nilai praktik komputer —
              </p>
            )
          )}
        </div>
      )}

      {/* Section D — Discussion (Kelas 4 & 5) */}
      {showDiscussion && (
        <div className="mt-6">
          <SectionTitle>{sections.discussion}. Discussion Skill</SectionTitle>
          {isBlangko ? (
            <BlangkoSkillBarTable labels={Object.values(discussionLabels)} />
          ) : (
            discussionScore ? (
              <SkillPieSection
                data={discussionChartData}
                score={discussionScore.final_score}
              />
            ) : (
              <p className="text-[10pt] italic text-gray-400 mt-2 px-2">
                — Belum ada nilai diskusi —
              </p>
            )
          )}
        </div>
      )}

      {/* Section — Attendance */}
      <div className="mt-6">
        <SectionTitle>{sections.attendance ?? sections.attendance ?? "C"}. Student Attendance Record</SectionTitle>
        <table className="w-full border-collapse text-[10.5pt]">
          <thead>
            <tr className="bg-sky-100/50">
              <Th w="8%">No</Th>
              <Th align="center">Attendance Details</Th>
              <Th w="35%" colSpan={2}>Values</Th>
            </tr>
          </thead>
          <tbody>
            {[
              ["School Days", attendance?.school_days ?? "—"],
              ["Present Days", attendance?.present ?? "—"],
              ["Permission Days", attendance?.permission ?? "—"],
              ["Absent Days", attendance?.absent ?? "—"],
            ].map(([label, val], i) => (
              <tr key={String(label)}>
                <Td center>{i + 1}</Td>
                <Td>{String(label)}</Td>
                <Td center className="border-r-0 w-[20%]">{String(val)}</Td>
                <Td center className="border-l-0 text-left w-[15%]">Days</Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Signature */}
      <div className="mt-10 flex justify-end mr-4">
        <div className="text-center text-[11pt]" style={{ minWidth: 280 }}>
          <p>Mahato, {new Date(printDate).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</p>
          <p>Principal</p>
          <div style={{ height: 80, position: "relative" }} className="flex justify-center items-center">
            {showSignature && signatureImage && (
              <img src={signatureImage} alt="Signature" style={{ maxHeight: "80px", maxWidth: "200px", objectFit: "contain" }} />
            )}
          </div>
          <p className="font-bold">{headmasterName || "________________________"}</p>
        </div>
      </div>
      </div>
    </div>
  );
}

// ── Skill pie chart section untuk rapor berisi nilai (Kelas 4 & 5) ─────
function SkillPieSection({
  data, score,
}: {
  data: { name: string; value: number }[];
  score: number | null;
}) {
  const COLORS = ["#4f81bd", "#c0504d", "#9bbb59", "#8064a2", "#4bacc6", "#f79646", "#3b82f6", "#10b981", "#f59e0b"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, value
  }: any) => {
    if (!value) return null;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.55;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <g>
        <rect
          x={x - 14}
          y={y - 10}
          width={28}
          height={20}
          rx={3}
          fill="#333"
        />
        <text
          x={x}
          y={y}
          fill="white"
          textAnchor="middle"
          dominantBaseline="central"
          style={{ fontSize: "9px", fontWeight: "bold" }}
        >
          {value.toFixed(0)}
        </text>
      </g>
    );
  };

  return (
    <div className="mt-2 px-6 flex items-center justify-center">
      <div style={{ width: "100%", height: 180 }} className="flex justify-center items-center">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="40%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={75}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend
              layout="vertical"
              align="right"
              verticalAlign="middle"
              iconType="square"
              iconSize={8}
              wrapperStyle={{ fontSize: "9pt", fontFamily: 'serif', paddingLeft: "10px" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      {score != null && (
        <p className="text-right text-[10pt] font-semibold pr-4 whitespace-nowrap self-end pb-2">
          Average Score: {Number(score).toFixed(1)}
        </p>
      )}
    </div>
  );
}

// ── Blangko: tabel kosong untuk skill bar (speech multi-language) ─────
function BlangkoSkillSection({
  aspects, languages,
}: { aspects: string[]; languages: string[] }) {
  return (
    <table className="w-full border-collapse text-[9.5pt] mt-2">
      <thead>
        <tr className="bg-sky-50">
          <Th w="22%">Language</Th>
          {aspects.map((a) => <Th key={a}>{a}</Th>)}
          <Th w="10%">Avg</Th>
        </tr>
      </thead>
      <tbody>
        {languages.map((lang) => (
          <tr key={lang}>
            <Td>{lang}</Td>
            {aspects.map((a) => <Td key={a} center>&nbsp;</Td>)}
            <Td center>&nbsp;</Td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// ── Blangko: tabel kosong untuk computer/discussion ───────────────────
function BlangkoSkillBarTable({ labels }: { labels: string[] }) {
  return (
    <table className="w-full border-collapse text-[9.5pt] mt-2">
      <thead>
        <tr className="bg-sky-50">
          <Th w="6%">No</Th>
          <Th align="center">Aspect</Th>
          <Th w="20%">Score</Th>
        </tr>
      </thead>
      <tbody>
        {labels.map((label, i) => (
          <tr key={label}>
            <Td center>{i + 1}</Td>
            <Td>{label}</Td>
            <Td center>&nbsp;</Td>
          </tr>
        ))}
        <tr className="bg-gray-100 font-bold">
          <Td colSpan={2} center>Average</Td>
          <Td center>&nbsp;</Td>
        </tr>
      </tbody>
    </table>
  );
}

// ── Reusable table primitives ─────────────────────────────────────────
function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="mt-5 mb-2 text-[11.5pt] font-bold border-b border-black">{children}</h3>;
}

function Th({
  children, w, align = "center", colSpan, rowSpan,
}: { children?: React.ReactNode; w?: string; align?: "left" | "center"; colSpan?: number; rowSpan?: number }) {
  return (
    <th
      colSpan={colSpan}
      rowSpan={rowSpan}
      style={{ width: w, textAlign: align }}
      className="border border-black px-2 py-1 font-semibold"
    >
      {children}
    </th>
  );
}

function Td({
  children, center, colSpan, className,
}: { children?: React.ReactNode; center?: boolean; colSpan?: number; className?: string }) {
  return (
    <td
      colSpan={colSpan}
      className={`border border-black px-2 py-1 ${className ?? ""}`}
      style={{ textAlign: center ? "center" : "left" }}
    >
      {children}
    </td>
  );
}
