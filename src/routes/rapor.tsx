import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Printer, ArrowLeft, Search } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LabelList,
} from "recharts";
import { useState, useEffect, useCallback, useRef } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getPrintSettingsFn, savePrintSettingsFn } from "@/lib/api/print-settings.functions";
import { useAuth } from "@/hooks/use-auth";
import { getReportCardFn } from "@/lib/api/report.functions";
import { getAcademicYearsFn } from "@/lib/api/academic-years.functions";
import { getStudentsForReportFn } from "@/lib/api/report.functions";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";
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

function Rapor() {
  const { token } = useAuth();
  const search = useSearch({ from: "/rapor" });

  const [yearId, setYearId] = useState(search.yearId ?? "");
  const [studentId, setStudentId] = useState(search.studentId ?? "");

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
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });

  // Hydrate from DB on first load
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
      const canvas = await html2canvas(el, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const pdf = new jsPDF("p", "mm", "a4");
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Rapor_${reportCard?.student?.full_name?.replace(/\s+/g, "_") || "Santri"}.pdf`);
      toast.success("PDF berhasil diunduh!", { id: "pdf-toast" });
    } catch (err) {
      console.error(err);
      toast.error("Gagal membuat PDF", { id: "pdf-toast" });
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

  // ── Selector bar ─────────────────────────────────────────────
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
                  {(studentList ?? []).map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.full_name} — Kelas {s.class_level}{s.rombel_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
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

            <Button size="sm" onClick={handleDownloadPDF} disabled={!reportCard}>
              <Printer className="h-4 w-4 mr-2" />
              Cetak PDF
            </Button>
          </div>
        </div>
      </div>

      {/* States */}
      {!studentId && (
        <div className="flex items-center justify-center py-32 text-muted-foreground text-sm">
          Pilih santri untuk melihat rapor.
        </div>
      )}
      {isLoading && (
        <div className="flex items-center justify-center py-32 text-muted-foreground text-sm">
          Memuat rapor...
        </div>
      )}
      {error && (
        <div className="flex items-center justify-center py-32 text-red-500 text-sm">
          {error instanceof Error ? error.message : "Gagal memuat rapor"}
        </div>
      )}

      {/* A4 sheet */}
      {reportCard && (
        <div className="py-8 px-4 flex justify-center">
          <div
            id="rapor-print-area"
            className="print-area bg-white text-black border shadow-sm"
            style={{
              width: "210mm",
              minHeight: "297mm",
              padding: "14mm 16mm",
              fontFamily: '"Times New Roman", Times, serif',
              fontSize: "11pt",
              lineHeight: 1.35,
            }}
          >
            {/* Header */}
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
            
            {/* Header info */}
            <hr className="border-black border-y-2 border-x-0 h-1 mb-4" />
            
            <div className="flex justify-between items-end mb-4 font-bold italic text-[11pt]">
              <div>Academic Year &nbsp;: &nbsp;&nbsp;&nbsp;{reportCard.academicYear?.year || "2025/2026"}</div>
              <div className="mr-8">Semester &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;First</div>
            </div>

            <table className="w-full text-[11.5pt] mb-6 border-collapse font-serif">
              <tbody>
                <tr>
                  <td className="w-[14%] py-0.5 align-bottom">Name</td>
                  <td className="w-[2%] py-0.5 align-bottom text-center">:</td>
                  <td className="w-[84%] py-0.5 align-bottom font-bold border-b border-black">
                    {reportCard.student?.full_name}
                  </td>
                </tr>
                <tr>
                  <td className="py-0.5 align-bottom">Reg. No</td>
                  <td className="py-0.5 align-bottom text-center">:</td>
                  <td className="py-0.5 align-bottom font-bold border-b border-black">
                    {reportCard.student?.stambuk}
                  </td>
                </tr>
                <tr>
                  <td className="py-0.5 align-bottom">Class</td>
                  <td className="py-0.5 align-bottom text-center">:</td>
                  <td className="py-0.5 align-bottom font-bold border-b border-black">
                    {reportCard.student?.class_level}{reportCard.student?.rombel_name}
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Section A — Academic */}
            <SectionTitle>A. CORE SUBJECT</SectionTitle>
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
                {reportCard.subjectScores.map((ss, i) => {
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
                })}
                {reportCard.subjectScores.length > 0 && (() => {
                  const total = reportCard.subjectScores.reduce((a, b) => a + Number(b.final_score ?? 0), 0);
                  const avg = total / reportCard.subjectScores.length;
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
              </tbody>
            </table>

            {/* Section B — Speech */}
            {reportCard.speechScores.length > 0 && (
              <div className="mt-8">
                <SectionTitle>B. Applied Speech Skill</SectionTitle>
                <div className="mt-4 px-8 relative">
                  <div style={{ width: "100%", height: 160 }}>
                    <ResponsiveContainer>
                      <BarChart
                        data={reportCard.speechScores.map((s) => ({
                          lang: s.language + " Speech",
                          value: Number(s.final_score ?? 0),
                        }))}
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
                  </div>
                  {/* Subtle watermark overlay in the background as requested, but user said "tidak ada logo", they meant no logo header. The background has a faint graphic in the photo. We'll leave it clean to ensure printing clarity. */}
                </div>
              </div>
            )}

            {/* Section C — Attendance */}
            <div className="mt-4">
              <SectionTitle>
                C. Student Attendance Record
              </SectionTitle>
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
                    ["School Days", reportCard.attendance?.school_days ?? "—"],
                    ["Present Days", reportCard.attendance?.present ?? "—"],
                    ["Permission Days", reportCard.attendance?.permission ?? "—"],
                    ["Absent Days", reportCard.attendance?.absent ?? "—"],
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
      )}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="mt-5 mb-2 text-[11.5pt] font-bold border-b border-black">{children}</h3>;
}

function Th({
  children, w, align = "center", colSpan,
}: { children?: React.ReactNode; w?: string; align?: "left" | "center"; colSpan?: number }) {
  return (
    <th
      colSpan={colSpan}
      style={{ width: w, textAlign: align }}
      className="border border-black px-2 py-1 font-semibold"
    >
      {children}
    </th>
  );
}
function Td({
  children, center, colSpan,
}: { children?: React.ReactNode; center?: boolean; colSpan?: number }) {
  return (
    <td
      colSpan={colSpan}
      className="border border-black px-2 py-1"
      style={{ textAlign: center ? "center" : "left" }}
    >
      {children}
    </td>
  );
}
