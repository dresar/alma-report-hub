import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Popover, PopoverContent, PopoverTrigger,
} from "@/components/ui/popover";
import {
  Search, Trash2, UserPlus, ChevronRight, ArrowLeft, Save, X,
  Download, Upload, FileText, FileSpreadsheet, GraduationCap,
} from "lucide-react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useState, useCallback } from "react";
import { toast } from "sonner";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import {
  getStudentsFn, createStudentFn, updateStudentFn, deleteStudentFn, bulkDeleteStudentsFn
} from "@/lib/api/students.functions";
import { getAcademicYearsFn } from "@/lib/api/academic-years.functions";
import { getRombelsFn } from "@/lib/api/classes.functions";

export const Route = createFileRoute("/_app/santri")({
  head: () => ({ meta: [{ title: "Manajemen Santri — SIRA" }] }),
  component: SantriPage,
});

type View = "list" | "add" | "edit";

const EMPTY_FORM = {
  stambuk: "", fullName: "", gender: "L" as "L" | "P",
  birthPlace: "", birthDate: "", parentName: "", address: "",
  entryYear: "", status: "Aktif" as "Aktif" | "Alumni" | "Pindah",
  rombelId: "",
};

function SantriPage() {
  const { token } = useAuth();
  const qc = useQueryClient();
  const [view, setView] = useState<View>("list");
  const [editId, setEditId] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [form, setForm] = useState(EMPTY_FORM);
  // State for inline quick-edit class popover in the table
  const [quickEditId, setQuickEditId] = useState<string | null>(null);
  const [quickRombelId, setQuickRombelId] = useState<string>("");

  // ── Data ────────────────────────────────────────────────────
  const { data: years } = useQuery({
    queryKey: ["academic-years"],
    queryFn: () => getAcademicYearsFn(),
    enabled: !!token,
    staleTime: 5 * 60 * 1000, // 5 menit
  });

  const activeYear = years?.find((y) => y.is_active);

  const { data: rombels } = useQuery({
    queryKey: ["rombels"],
    queryFn: () => getRombelsFn({ data: {} }),
    enabled: !!token,
    staleTime: 5 * 60 * 1000,
  });

  const PAGE_SIZE = 20;

  const { data: studentsRes, isLoading } = useQuery({
    queryKey: ["students", q, page],
    queryFn: () =>
      getStudentsFn({
        data: { token: token!, q: q || undefined, page, limit: PAGE_SIZE },
      }),
    enabled: !!token,
    staleTime: 30 * 1000, // 30 detik
  });

  const students = studentsRes?.data ?? [];
  const totalStudents = studentsRes?.total ?? 0;
  const totalPages = Math.ceil(totalStudents / PAGE_SIZE);

  // ── Mutations ────────────────────────────────────────────────
  const createMut = useMutation({
    mutationFn: (d: typeof form) =>
      createStudentFn({ data: { token: token!, ...d } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["students"] });
      toast.success("Santri berhasil ditambahkan");
      setView("list");
      setForm(EMPTY_FORM);
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Gagal"),
  });

  const updateMut = useMutation({
    mutationFn: (d: Partial<typeof form>) =>
      updateStudentFn({ data: { token: token!, studentId: editId!, ...d } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["students"] });
      toast.success("Data santri diperbarui");
      setView("list");
      setEditId(null);
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Gagal"),
  });

  const deleteMut = useMutation({
    mutationFn: (id: string) =>
      deleteStudentFn({ data: { token: token!, studentId: id } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["students"] });
      toast.success("Santri dihapus");
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Gagal"),
  });

  const bulkDeleteMut = useMutation({
    mutationFn: (ids: string[]) =>
      bulkDeleteStudentsFn({ data: { token: token!, studentIds: ids } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["students"] });
      toast.success("Santri terpilih berhasil dihapus");
      setSelectedIds([]);
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Gagal"),
  });

  // ── Helpers ──────────────────────────────────────────────────
  function startEdit(s: Record<string, unknown>) {
    setEditId(s.id as string);
    setForm({
      stambuk: (s.stambuk as string) ?? "",
      fullName: (s.full_name as string) ?? "",
      gender: (s.gender as "L" | "P") ?? "L",
      birthPlace: (s.birth_place as string) ?? "",
      birthDate: s.birth_date ? String(s.birth_date).slice(0, 10) : "",
      parentName: (s.parent_name as string) ?? "",
      address: (s.address as string) ?? "",
      entryYear: (s.entry_year as string) ?? "",
      status: (s.status as "Aktif" | "Alumni" | "Pindah") ?? "Aktif",
      rombelId: (s.rombel_id as string) ?? "",
    });
    setView("edit");
  }

  function handleSave() {
    if (!form.stambuk || !form.fullName) {
      toast.error("Stambuk dan nama wajib diisi");
      return;
    }
    const yearId = activeYear?.id || "";
    if (view === "add") {
      createMut.mutate({ ...form, academicYearId: yearId } as any);
    } else {
      updateMut.mutate({ ...form, academicYearId: yearId } as any);
    }
  }

  function handleQuickSaveClass(studentId: string) {
    updateMut.mutate(
      { token: token!, studentId, rombelId: quickRombelId, academicYearId: activeYear?.id || "" } as any,
      {
        onSuccess: () => {
          setQuickEditId(null);
          toast.success("Kelas santri diperbarui");
        },
      }
    );
  }

  const setF = useCallback(
    (key: keyof typeof EMPTY_FORM, value: string) =>
      setForm((prev) => ({ ...prev, [key]: value })),
    [],
  );

  // ── Export / Import ──────────────────────────────────────────
  function exportExcel() {
    const data = students.map(s => ({
      Stambuk: s.stambuk,
      "Nama Lengkap": s.full_name,
      "Jenis Kelamin": s.gender,
      "Kelas": s.class_level != null ? `Kelas ${s.class_level}${s.rombel_name}` : "",
      "Status": s.status
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Data Santri");
    XLSX.writeFile(wb, "Data_Santri.xlsx");
  }

  function downloadTemplate() {
    const ws = XLSX.utils.json_to_sheet([{
      "Stambuk": "2025001",
      "Nama Lengkap": "Ahmad Dani",
      "Jenis Kelamin": "L",
      "Tempat Lahir": "Pekanbaru",
      "Tanggal Lahir": "2010-01-01",
      "Nama Orang Tua": "Bapak Budi",
      "Alamat": "Jl. Merdeka",
      "Tahun Masuk": "2025",
      "Status": "Aktif"
    }]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Template Santri");
    XLSX.writeFile(wb, "Template_Import_Santri.xlsx");
  }

  function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (evt) => {
      const bstr = evt.target?.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);
      
      let success = 0;
      toast.info("Mengimpor data, mohon tunggu...");
      for (const row of data as any[]) {
        try {
          await createMut.mutateAsync({
            stambuk: String(row["Stambuk"] ?? ""),
            fullName: row["Nama Lengkap"] ?? "",
            gender: row["Jenis Kelamin"] === "P" ? "P" : "L",
            birthPlace: row["Tempat Lahir"] ?? "",
            birthDate: row["Tanggal Lahir"] ? String(row["Tanggal Lahir"]) : "",
            parentName: row["Nama Orang Tua"] ?? "",
            address: row["Alamat"] ?? "",
            entryYear: String(row["Tahun Masuk"] ?? ""),
            status: (row["Status"] ?? "Aktif") as "Aktif",
            rombelId: "",
            academicYearId: activeYear?.id ?? "",
          } as any);
          success++;
        } catch (err) {
          console.error(err);
        }
      }
      toast.success(`Berhasil mengimpor ${success} data santri`);
      qc.invalidateQueries({ queryKey: ["students"] });
    };
    reader.readAsBinaryString(file);
  }

  function toggleSelectAll() {
    if (selectedIds.length === students.length && students.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(students.map((s: any) => s.id));
    }
  }

  function toggleSelect(id: string) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }

  function handleBulkDelete() {
    if (confirm(`Yakin ingin menghapus ${selectedIds.length} santri terpilih?`)) {
      bulkDeleteMut.mutate(selectedIds);
    }
  }

  function exportPDF() {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Daftar Santri", 14, 22);
    doc.setFontSize(10);
    doc.text(`Tahun Ajaran: Semua`, 14, 30);
    doc.text(`Total: ${totalStudents} santri`, 14, 35);

    autoTable(doc, {
      startY: 40,
      head: [["Stambuk", "Nama Lengkap", "L/P", "Kelas", "Status"]],
      body: students.map((s) => [
        s.stambuk,
        s.full_name,
        s.gender,
        s.class_level != null ? `Kelas ${s.class_level}${s.rombel_name}` : "-",
        s.status,
      ]),
    });
    doc.save("Data_Santri.pdf");
  }

  // ── Rombels grouped by class ─────────────────────────────────
  const rombelOptions = rombels ?? [];

  // ── Views ────────────────────────────────────────────────────
  if (view === "add" || view === "edit") {
    return (
      <div className="max-w-3xl space-y-6">
        {/* Back bar */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => { setView("list"); setEditId(null); }}>
            <ArrowLeft className="h-4 w-4 mr-1.5" />
            Kembali
          </Button>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">
            {view === "add" ? "Tambah Santri Baru" : "Edit Data Santri"}
          </span>
        </div>

        <Card className="shadow-none">
          <CardHeader>
            <CardTitle className="text-base">
              {view === "add" ? "Data Santri Baru" : `Edit: ${form.fullName}`}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Identity */}
            <section>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                Identitas
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Stambuk *">
                  <Input id="stambuk" value={form.stambuk} onChange={(e) => setF("stambuk", e.target.value)} placeholder="e.g. 2025001" />
                </Field>
                <Field label="Nama Lengkap *">
                  <Input id="fullName" value={form.fullName} onChange={(e) => setF("fullName", e.target.value)} placeholder="Nama lengkap santri" />
                </Field>
                <Field label="Jenis Kelamin">
                  <Select value={form.gender} onValueChange={(v) => setF("gender", v)}>
                    <SelectTrigger id="gender"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="L">Laki-laki</SelectItem>
                      <SelectItem value="P">Perempuan</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Status">
                  <Select value={form.status} onValueChange={(v) => setF("status", v)}>
                    <SelectTrigger id="status"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Aktif">Aktif</SelectItem>
                      <SelectItem value="Alumni">Alumni</SelectItem>
                      <SelectItem value="Pindah">Pindah</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Tempat Lahir">
                  <Input id="birthPlace" value={form.birthPlace} onChange={(e) => setF("birthPlace", e.target.value)} placeholder="Kota kelahiran" />
                </Field>
                <Field label="Tanggal Lahir">
                  <Input id="birthDate" type="date" value={form.birthDate} onChange={(e) => setF("birthDate", e.target.value)} />
                </Field>
              </div>
            </section>

            <Separator />

            {/* Keluarga */}
            <section>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                Keluarga
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Nama Orang Tua / Wali">
                  <Input id="parentName" value={form.parentName} onChange={(e) => setF("parentName", e.target.value)} placeholder="Nama orang tua" />
                </Field>
                <Field label="Tahun Masuk">
                  <Input id="entryYear" value={form.entryYear} onChange={(e) => setF("entryYear", e.target.value)} placeholder="e.g. 2025" />
                </Field>
                <div className="md:col-span-2">
                  <Field label="Alamat">
                    <Input id="address" value={form.address} onChange={(e) => setF("address", e.target.value)} placeholder="Alamat lengkap" />
                  </Field>
                </div>
              </div>
            </section>

            <Separator />

            {/* Penempatan */}
            <section>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                Penempatan Kelas
              </h3>
              <p className="text-xs text-muted-foreground mb-3">
                Penempatan kelas menggunakan tahun ajaran aktif: <strong>{activeYear?.year ?? "—"}</strong>
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Kelas / Rombel">
                  <Select value={form.rombelId || "__none__"} onValueChange={(v) => setF("rombelId", v === "__none__" ? "" : v)}>
                    <SelectTrigger id="rombelId"><SelectValue placeholder="Pilih rombel" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="__none__">— Tidak Ada / Kosongkan —</SelectItem>
                      {rombelOptions.map((r) => (
                        <SelectItem key={r.id} value={r.id}>
                          Kelas {r.class_level}{r.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              </div>
            </section>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <Button
                onClick={handleSave}
                disabled={createMut.isPending || updateMut.isPending}
                className="bg-emerald-600 hover:bg-emerald-500"
              >
                <Save className="h-4 w-4 mr-2" />
                {createMut.isPending || updateMut.isPending ? "Menyimpan..." : "Simpan"}
              </Button>
              <Button
                variant="outline"
                onClick={() => { setView("list"); setEditId(null); }}
              >
                <X className="h-4 w-4 mr-2" />
                Batal
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ── List View ────────────────────────────────────────────────
  return (
    <Card className="shadow-none">
      <CardHeader className="flex flex-row items-center justify-between gap-3 flex-wrap">
        <div>
          <CardTitle className="text-base">Daftar Santri</CardTitle>
          <p className="text-xs text-muted-foreground mt-1">
            Total: {totalStudents} santri
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {selectedIds.length > 0 && (
            <Button
              variant="destructive"
              onClick={handleBulkDelete}
              disabled={bulkDeleteMut.isPending}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Hapus Terpilih ({selectedIds.length})
            </Button>
          )}
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="search-santri"
              placeholder="Cari nama / stambuk"
              className="pl-8 w-48"
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setPage(1);
              }}
            />
          </div>
          
          <Button variant="outline" onClick={downloadTemplate} title="Download Template Excel">
            <Download className="h-4 w-4 mr-2" /> Template
          </Button>
          
          <div className="relative">
            <Input 
              type="file" 
              accept=".xlsx, .xls" 
              onChange={handleImport}
              className="absolute inset-0 opacity-0 cursor-pointer w-full" 
              title="Import Data Excel"
            />
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" /> Import
            </Button>
          </div>

          <Button variant="outline" onClick={exportExcel} className="text-green-700 hover:text-green-800 border-green-200 bg-green-50 hover:bg-green-100">
            <FileSpreadsheet className="h-4 w-4 mr-2" /> Excel
          </Button>

          <Button variant="outline" onClick={exportPDF} className="text-red-700 hover:text-red-800 border-red-200 bg-red-50 hover:bg-red-100">
            <FileText className="h-4 w-4 mr-2" /> PDF
          </Button>

          <Button
            onClick={() => { setForm(EMPTY_FORM); setView("add"); }}
            className="bg-emerald-600 hover:bg-emerald-500"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Tambah
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12 text-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300"
                  checked={students.length > 0 && selectedIds.length === students.length}
                  onChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead>Stambuk</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>JK</TableHead>
              <TableHead>Kelas</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                  Memuat data...
                </TableCell>
              </TableRow>
            )}
            {!isLoading && students.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                  Tidak ada santri ditemukan.
                </TableCell>
              </TableRow>
            )}
            {students.map((s: any) => (
              <TableRow key={s.id}>
                <TableCell className="text-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300"
                    checked={selectedIds.includes(s.id)}
                    onChange={() => toggleSelect(s.id)}
                  />
                </TableCell>
                <TableCell className="font-mono text-xs">{s.stambuk}</TableCell>
                <TableCell className="font-medium">{s.full_name}</TableCell>
                <TableCell>{s.gender === "L" ? "L" : "P"}</TableCell>
                <TableCell>
                  <Popover
                    open={quickEditId === s.id}
                    onOpenChange={(open) => {
                      if (open) {
                        setQuickEditId(s.id);
                        setQuickRombelId((s.rombel_id as string) ?? "");
                      } else {
                        setQuickEditId(null);
                      }
                    }}
                  >
                    <PopoverTrigger asChild>
                      <button
                        className="group flex items-center gap-1 rounded px-1 py-0.5 hover:bg-muted transition-colors"
                        title="Klik untuk ganti kelas"
                      >
                        {s.class_level != null ? (
                          <Badge variant="secondary" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                            Kelas {s.class_level}{s.rombel_name}
                          </Badge>
                        ) : (
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <GraduationCap className="h-3 w-3" /> Atur Kelas
                          </span>
                        )}
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-56 p-3 space-y-3" align="start">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Ganti Kelas</p>
                      <Select
                        value={quickRombelId || "__none__"}
                        onValueChange={(v) => setQuickRombelId(v === "__none__" ? "" : v)}
                      >
                        <SelectTrigger className="h-8 text-xs"><SelectValue placeholder="Pilih kelas" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="__none__">— Kosongkan —</SelectItem>
                          {rombelOptions.map((r) => (
                            <SelectItem key={r.id} value={r.id}>
                              Kelas {r.class_level}{r.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button
                        size="sm"
                        className="w-full h-7 text-xs bg-emerald-600 hover:bg-emerald-500"
                        onClick={() => handleQuickSaveClass(s.id)}
                        disabled={updateMut.isPending}
                      >
                        <Save className="h-3 w-3 mr-1" />
                        {updateMut.isPending ? "Menyimpan..." : "Simpan"}
                      </Button>
                    </PopoverContent>
                  </Popover>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={s.status === "Aktif" ? "default" : "outline"}
                    className={s.status === "Aktif" ? "bg-emerald-600" : ""}
                  >
                    {s.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right space-x-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => startEdit(s as Record<string, unknown>)}
                  >
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/rapor" search={{ studentId: s.id, yearId: activeYear?.id }}>
                      Rapor
                    </Link>
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Hapus santri?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Data santri <b>{s.full_name}</b> dan seluruh nilai terkait akan dihapus
                          secara permanen.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-600 hover:bg-red-500"
                          onClick={() => deleteMut.mutate(s.id)}
                        >
                          Hapus
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-4 border-t mt-4">
            <div className="text-xs text-muted-foreground">
              Menampilkan halaman {page} dari {totalPages}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Kembali
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                Lanjut
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium">{label}</Label>
      {children}
    </div>
  );
}
