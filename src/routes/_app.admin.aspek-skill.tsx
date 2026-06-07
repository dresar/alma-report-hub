import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Save, Info, Pencil, X, CheckCircle2, Trash2, Plus } from "lucide-react";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";
import {
  getSkillAspectsFn,
  updateSkillAspectFn,
  createSkillAspectFn,
  deleteSkillAspectFn,
  type SkillAspect,
} from "@/lib/api/skill-aspects.functions";

export const Route = createFileRoute("/_app/admin/aspek-skill")({
  head: () => ({ meta: [{ title: "Konfigurasi Aspek Skill — SIRA" }] }),
  component: AspekSkillPage,
});

type SkillType = "speech" | "computer" | "discussion";

const SKILL_TYPE_LABELS: Record<SkillType, { id: string; en: string; kelas: string }> = {
  speech:     { id: "Pidato 3 Bahasa",  en: "Speech",     kelas: "Kelas 1–5" },
  computer:   { id: "Praktik Komputer", en: "Computer",   kelas: "Kelas 4–5" },
  discussion: { id: "Diskusi",          en: "Discussion", kelas: "Kelas 4–5" },
};

// ── AspectTable extracted as a stable component to prevent input focus loss ──
function AspectTable({
  skillType, aspects, isLoading, editId, editForm,
  setEditForm, updateMut, deleteMut, startEdit, setEditId,
}: {
  skillType: SkillType;
  aspects: SkillAspect[];
  isLoading: boolean;
  editId: string | null;
  editForm: { labelId: string; labelEn: string; sortOrder: string };
  setEditForm: React.Dispatch<React.SetStateAction<{ labelId: string; labelEn: string; sortOrder: string }>>;
  updateMut: ReturnType<typeof useMutation<unknown, Error, string>>;
  deleteMut: ReturnType<typeof useMutation<unknown, Error, string>>;
  startEdit: (aspect: SkillAspect) => void;
  setEditId: (id: string | null) => void;
}) {
  const filtered = aspects.filter((a) => a.skill_type === skillType);
  const info = SKILL_TYPE_LABELS[skillType];

  return (
    <div className="space-y-4">
      {/* Info banner */}
      <div className="flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm text-blue-800 dark:border-blue-800 dark:bg-blue-950/30 dark:text-blue-300">
        <Info className="h-4 w-4 mt-0.5 shrink-0" />
        <div>
          <p className="font-medium">{info.id} — {info.kelas}</p>
          <p className="mt-0.5 text-xs opacity-80">
            Ubah label aspek di bawah. Label ID digunakan di form input nilai; Label EN digunakan di rapor cetak.
            <strong> Aspect Key tidak bisa diubah</strong> karena terikat ke kolom database.
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-8 text-center">No</TableHead>
              <TableHead className="w-40">Aspect Key</TableHead>
              <TableHead>Label Indonesia</TableHead>
              <TableHead>Label English (Rapor)</TableHead>
              <TableHead className="w-20 text-center">Urutan</TableHead>
              <TableHead className="w-28 text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                  Memuat data...
                </TableCell>
              </TableRow>
            ) : filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                  Belum ada konfigurasi aspek. Jalankan migrasi schema terlebih dahulu.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((aspect, i) =>
                editId === aspect.id ? (
                  <TableRow key={aspect.id} className="bg-amber-50/50 dark:bg-amber-950/20">
                    <TableCell className="text-center text-muted-foreground">{i + 1}</TableCell>
                    <TableCell>
                      <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">
                        {aspect.aspect_key}
                      </code>
                    </TableCell>
                    <TableCell>
                      <Input
                        id={`edit-label-id-${aspect.id}`}
                        value={editForm.labelId}
                        onChange={(e) => setEditForm((p) => ({ ...p, labelId: e.target.value }))}
                        className="h-8 min-w-40"
                        placeholder="Label Bahasa Indonesia"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        id={`edit-label-en-${aspect.id}`}
                        value={editForm.labelEn}
                        onChange={(e) => setEditForm((p) => ({ ...p, labelEn: e.target.value }))}
                        className="h-8 min-w-40"
                        placeholder="Label English"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        id={`edit-order-${aspect.id}`}
                        type="number"
                        min={1}
                        max={99}
                        value={editForm.sortOrder}
                        onChange={(e) => setEditForm((p) => ({ ...p, sortOrder: e.target.value }))}
                        className="h-8 w-16 text-center mx-auto"
                      />
                    </TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button
                        size="sm"
                        onClick={() => updateMut.mutate(aspect.id)}
                        disabled={updateMut.isPending || !editForm.labelId || !editForm.labelEn}
                        className="bg-emerald-600 hover:bg-emerald-500 h-7 px-2"
                      >
                        <Save className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditId(null)}
                        className="h-7 px-2"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow key={aspect.id}>
                    <TableCell className="text-center text-muted-foreground">{i + 1}</TableCell>
                    <TableCell>
                      <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">
                        {aspect.aspect_key}
                      </code>
                    </TableCell>
                    <TableCell className="font-medium">{aspect.label_id}</TableCell>
                    <TableCell className="text-muted-foreground">{aspect.label_en}</TableCell>
                    <TableCell className="text-center text-muted-foreground">
                      {aspect.sort_order}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        id={`edit-aspect-${aspect.id}`}
                        onClick={() => startEdit(aspect)}
                        className="h-7 px-2"
                      >
                        <Pencil className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="h-7 px-2 ml-1"
                        onClick={() => {
                          if (confirm(`Hapus aspek ${aspect.label_id}?`)) {
                            deleteMut.mutate(aspect.id);
                          }
                        }}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              )
            )}
          </TableBody>
        </Table>
      </div>

      {/* Preview */}
      {filtered.length > 0 && (
        <Card className="shadow-none border-dashed">
          <CardHeader className="py-3 px-4">
            <CardTitle className="text-xs text-muted-foreground flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
              Preview Aspek (urutan di rapor)
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-4 px-4">
            <div className="flex flex-wrap gap-2">
              {filtered
                .slice()
                .sort((a, b) => a.sort_order - b.sort_order)
                .map((a) => (
                  <Badge key={a.id} variant="secondary" className="font-normal text-xs">
                    {a.sort_order}. {a.label_en}
                  </Badge>
                ))}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Label di atas yang akan tampil di kolom rapor (Bahasa Inggris).
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function AspekSkillPage() {
  const { token } = useAuth();
  const qc = useQueryClient();
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ labelId: "", labelEn: "", sortOrder: "" });

  const { data: aspects = [], isLoading } = useQuery({
    queryKey: ["skill-aspects"],
    queryFn: () => getSkillAspectsFn(),
    enabled: !!token,
  });

  const updateMut = useMutation({
    mutationFn: (id: string) =>
      updateSkillAspectFn({
        data: {
          token: token!,
          id,
          labelId: editForm.labelId || undefined,
          labelEn: editForm.labelEn || undefined,
          sortOrder: editForm.sortOrder !== "" ? Number(editForm.sortOrder) : undefined,
        },
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["skill-aspects"] });
      setEditId(null);
      toast.success("Aspek skill berhasil diperbarui");
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Gagal memperbarui"),
  });

  const deleteMut = useMutation({
    mutationFn: (id: string) => deleteSkillAspectFn({ data: { token: token!, id } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["skill-aspects"] });
      toast.success("Aspek skill berhasil dihapus");
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Gagal menghapus"),
  });

  const createMut = useMutation({
    mutationFn: (payload: { skillType: SkillType; aspectKey: string; labelId: string; labelEn: string; sortOrder: number }) =>
      createSkillAspectFn({ data: { token: token!, ...payload } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["skill-aspects"] });
      setAddOpen(false);
      setAddForm({ skillType: "speech", aspectKey: "", labelId: "", labelEn: "", sortOrder: "" });
      toast.success("Aspek skill baru berhasil ditambahkan");
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Gagal menambahkan"),
  });

  function startEdit(aspect: SkillAspect) {
    setEditId(aspect.id);
    setEditForm({
      labelId: aspect.label_id,
      labelEn: aspect.label_en,
      sortOrder: String(aspect.sort_order),
    });
  }

  const tableProps = {
    aspects, isLoading, editId, editForm,
    setEditForm, updateMut: updateMut as any, deleteMut: deleteMut as any, startEdit, setEditId,
  };

  const [addOpen, setAddOpen] = useState(false);
  const [addForm, setAddForm] = useState({ skillType: "speech" as SkillType, aspectKey: "", labelId: "", labelEn: "", sortOrder: "" });

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Konfigurasi Aspek Skill</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Atur nama/label aspek penilaian skill yang tampil di form input nilai dan rapor santri.
          </p>
        </div>
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" /> Tambah Aspek</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Tambah Aspek Skill Baru</DialogTitle></DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Tipe Skill</Label>
                <select 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={addForm.skillType}
                  onChange={(e) => setAddForm(p => ({ ...p, skillType: e.target.value as SkillType }))}
                >
                  <option value="speech">Pidato (Speech)</option>
                  <option value="computer">Komputer (Computer)</option>
                  <option value="discussion">Diskusi (Discussion)</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Aspect Key (Nama Kolom DB, a-z_)</Label>
                <Input value={addForm.aspectKey} onChange={(e) => setAddForm(p => ({ ...p, aspectKey: e.target.value }))} placeholder="contoh: listening" />
              </div>
              <div className="space-y-2">
                <Label>Label Bahasa Indonesia</Label>
                <Input value={addForm.labelId} onChange={(e) => setAddForm(p => ({ ...p, labelId: e.target.value }))} placeholder="contoh: Mendengarkan" />
              </div>
              <div className="space-y-2">
                <Label>Label English (Rapor)</Label>
                <Input value={addForm.labelEn} onChange={(e) => setAddForm(p => ({ ...p, labelEn: e.target.value }))} placeholder="contoh: Listening" />
              </div>
              <div className="space-y-2">
                <Label>Urutan</Label>
                <Input type="number" value={addForm.sortOrder} onChange={(e) => setAddForm(p => ({ ...p, sortOrder: e.target.value }))} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setAddOpen(false)}>Batal</Button>
              <Button disabled={createMut.isPending || !addForm.aspectKey || !addForm.labelId} onClick={() => createMut.mutate({ ...addForm, sortOrder: Number(addForm.sortOrder || 1) })}>
                Simpan
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="shadow-none border-0 bg-transparent">
        <CardContent className="px-0">
          <Tabs defaultValue="speech">
            <TabsList className="mb-4">
              <TabsTrigger value="speech" id="tab-aspek-pidato">
                🎤 Pidato
                <Badge variant="outline" className="ml-1.5 text-[10px]">Kelas 1–5</Badge>
              </TabsTrigger>
              <TabsTrigger value="computer" id="tab-aspek-komputer">
                💻 Komputer
                <Badge variant="outline" className="ml-1.5 text-[10px]">Kelas 4–5</Badge>
              </TabsTrigger>
              <TabsTrigger value="discussion" id="tab-aspek-diskusi">
                🗣 Diskusi
                <Badge variant="outline" className="ml-1.5 text-[10px]">Kelas 4–5</Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="speech" className="mt-0">
              <AspectTable skillType="speech" {...tableProps} />
            </TabsContent>
            <TabsContent value="computer" className="mt-0">
              <AspectTable skillType="computer" {...tableProps} />
            </TabsContent>
            <TabsContent value="discussion" className="mt-0">
              <AspectTable skillType="discussion" {...tableProps} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Catatan penting */}
      <Card className="shadow-none bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-800">
        <CardContent className="py-4 px-5 text-sm text-amber-800 dark:text-amber-300 space-y-1.5">
          <p className="font-semibold">⚠️ Catatan Penting</p>
          <ul className="list-disc list-inside space-y-1 text-xs">
            <li>
              <strong>Aspect Key</strong> adalah identifier kolom database. Jika Anda menambah aspek baru, kolom baru akan ditambahkan ke tabel database secara otomatis.
            </li>
            <li>
              Menghapus aspek <strong>tidak akan</strong> menghapus kolom pada database sehingga data historis tetap aman.
            </li>
            <li>
              Perubahan label langsung aktif di rapor setelah halaman rapor di-refresh.
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
