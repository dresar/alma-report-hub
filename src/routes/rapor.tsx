import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Printer, ArrowLeft } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LabelList,
} from "recharts";
import {
  nilaiAkademik, nilaiSkill, hitungNilai, toLetter, kehadiran, santriList,
} from "@/lib/dummy-data";

export const Route = createFileRoute("/rapor")({
  head: () => ({ meta: [{ title: "Preview Rapor — SIRA" }] }),
  component: Rapor,
});

function Rapor() {
  const santri = santriList[0];
  const rows = nilaiAkademik.map((r) => {
    const n = hitungNilai(r.tugas, r.uts, r.uas);
    return { ...r, nilai: n, letter: toLetter(n) };
  });
  const total = Math.round((rows.reduce((a, b) => a + b.nilai, 0) / rows.length) * 10) / 10;

  const avg = (a: number[]) => Math.round((a.reduce((x, y) => x + y, 0) / a.length) * 10) / 10;
  const speechData = [
    { lang: "English", value: avg(nilaiSkill.English) },
    { lang: "Arabic", value: avg(nilaiSkill.Arabic) },
    { lang: "Indonesia", value: avg(nilaiSkill.Indonesia) },
  ];

  const attendance = [
    { label: "School Days", value: kehadiran.schoolDays },
    { label: "Present", value: kehadiran.present },
    { label: "Permission", value: kehadiran.permission },
    { label: "Absent", value: kehadiran.absent },
  ];

  return (
    <div className="min-h-screen bg-secondary">
      {/* Toolbar */}
      <div className="no-print sticky top-0 z-10 border-b bg-card">
        <div className="mx-auto max-w-[210mm] flex items-center justify-between px-4 py-3">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/dashboard"><ArrowLeft className="h-4 w-4 mr-2" />Kembali</Link>
          </Button>
          <h2 className="text-sm font-semibold">Preview Rapor — A4</h2>
          <Button size="sm" onClick={() => window.print()}>
            <Printer className="h-4 w-4 mr-2" />Download PDF
          </Button>
        </div>
      </div>

      {/* A4 sheet */}
      <div className="py-8 px-4 flex justify-center">
        <div
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
          <div className="text-center border-b-2 border-black pb-3">
            <div className="flex items-center justify-center gap-4">
              <div className="h-16 w-16 border-2 border-black rounded-full flex items-center justify-center text-[8pt] font-bold text-center leading-tight">
                RIBS<br/>LOGO
              </div>
              <div>
                <h1 className="text-[16pt] font-bold tracking-wide">
                  RAUDHATUSALAM ISLAMIC BOARDING SCHOOL
                </h1>
                <p className="text-[9pt]">
                  Jl. Pesantren No. 1, Mahato, Kec. Tambusai Utara, Kab. Rokan Hulu, Riau
                </p>
                <p className="text-[9pt]">Telp: (0762) 123-4567 — Email: info@raudhatusalam.sch.id</p>
              </div>
            </div>
            <h2 className="mt-3 text-[13pt] font-bold underline">STUDENT REPORT SHEET</h2>
          </div>

          {/* Student info grid */}
          <table className="w-full mt-4 text-[10.5pt]">
            <tbody>
              <tr>
                <td className="w-[22%] py-0.5">Academic Year</td>
                <td className="w-[28%]">: 2024 / 2025</td>
                <td className="w-[22%]">Name</td>
                <td>: <b>{santri.nama}</b></td>
              </tr>
              <tr>
                <td className="py-0.5">Semester</td>
                <td>: Ganjil (1)</td>
                <td>Reg. No</td>
                <td>: {santri.nis}</td>
              </tr>
              <tr>
                <td className="py-0.5">Class</td>
                <td>: {santri.kelas}{santri.rombel}</td>
                <td>Gender</td>
                <td>: {santri.jenisKelamin === "L" ? "Male" : "Female"}</td>
              </tr>
            </tbody>
          </table>

          {/* Section A */}
          <SectionTitle>A. CORE SUBJECT</SectionTitle>
          <table className="w-full border-collapse text-[10pt]">
            <thead>
              <tr className="bg-gray-100">
                <Th w="6%">No</Th>
                <Th w="40%" align="left">Subject</Th>
                <Th colSpan={2}>Study Result Score</Th>
                <Th w="16%">Class's AVG</Th>
              </tr>
              <tr className="bg-gray-100">
                <Th />
                <Th />
                <Th w="14%">Number</Th>
                <Th w="14%">Letter</Th>
                <Th />
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.mapel}>
                  <Td center>{i + 1}</Td>
                  <Td>{r.mapel}</Td>
                  <Td center>{r.nilai}</Td>
                  <Td center><b>{r.letter}</b></Td>
                  <Td center>{r.avgKelas}</Td>
                </tr>
              ))}
              <tr className="bg-gray-50 font-bold">
                <Td colSpan={2} center>SEMESTER FINAL GRADE</Td>
                <Td center>{total}</Td>
                <Td center>{toLetter(total)}</Td>
                <Td center>—</Td>
              </tr>
            </tbody>
          </table>

          {/* Section B */}
          <SectionTitle>B. APPLIED SPEECH SKILL</SectionTitle>
          <div className="border border-black p-2">
            <div style={{ width: "100%", height: 180 }}>
              <ResponsiveContainer>
                <BarChart data={speechData} layout="vertical" margin={{ left: 30, right: 40 }}>
                  <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10, fill: "#000" }} />
                  <YAxis dataKey="lang" type="category" tick={{ fontSize: 11, fill: "#000" }} width={80} />
                  <Bar dataKey="value" fill="#1f2937" barSize={20}>
                    <LabelList dataKey="value" position="right" style={{ fontSize: 10, fill: "#000" }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[9pt] italic text-center">
              Rata-rata dari 5 aspek: Pronunciation, Fluency, Vocabulary, Content, Confidence.
            </p>
          </div>

          {/* Section C */}
          <SectionTitle>C. STUDENT ATTENDANCE RECORD</SectionTitle>
          <table className="w-full border-collapse text-[10pt]">
            <thead>
              <tr className="bg-gray-100">
                <Th w="8%">No</Th>
                <Th align="left">Attendance Details</Th>
                <Th w="20%">Values</Th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((a, i) => (
                <tr key={a.label}>
                  <Td center>{i + 1}</Td>
                  <Td>{a.label}</Td>
                  <Td center>{a.value}</Td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Footer / Signature */}
          <div className="mt-10 flex justify-end">
            <div className="text-center text-[10.5pt]" style={{ minWidth: 240 }}>
              <p>Mahato, 20 Desember 2024</p>
              <p>Headmaster,</p>
              <div style={{ height: 70 }} />
              <p className="font-bold underline">Alfiyan Syah Miftakhul Arif, M.Pd</p>
              <p className="text-[9pt]">NIP. —</p>
            </div>
          </div>
        </div>
      </div>
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
