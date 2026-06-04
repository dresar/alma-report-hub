import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Trash2, Plus, Save } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { getSubjectsFn, createSubjectFn, updateSubjectFn, deleteSubjectFn } from "@/lib/api/subjects.functions";

export const Route = createFileRoute("/_app/admin/mapel")({
  component: MapelPage,
});

function MapelPage() {
  const { token } = useAuth();
  const qc = useQueryClient();
  const [filterKelas, setFilterKelas] = useState("1");
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: "", bobotTugas: "", bobotUts: "", bobotUas: "" });
  const [addForm, setAddForm] = useState({ name: "", bobotTugas: "0.3", bobotUts: "0.3", bobotUas: "0.4" });

  const { data: subjects } = useQuery({
    queryKey: ["subjects", filterKelas],
    queryFn: () => getSubjectsFn({ data: { classLevel: Number(filterKelas) } }),
  });

  const createMut = useMutation({
    mutationFn: () =>
      createSubjectFn({
        data: {
          token: token!,
          name: addForm.name,
          classLevel: Number(filterKelas),
          bobotTugas: Number(addForm.bobotTugas),
          bobotUts: Number(addForm.bobotUts),
          bobotUas: Number(addForm.bobotUas),
        },
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["subjects"] });
      setAddForm({ name: "", bobotTugas: "0.3", bobotUts: "0.3", bobotUas: "0.4" });
      toast.success("Mata pelajaran ditambahkan");
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Gagal menambahkan mata pelajaran"),
  });

  const updateMut = useMutation({
    mutationFn: (subjectId: string) =>
      updateSubjectFn({
        data: {
          token: token!,
          subjectId,
          name: editForm.name || undefined,
          bobotTugas: editForm.bobotTugas !== "" ? Number(editForm.bobotTugas) : undefined,
          bobotUts: editForm.bobotUts !== "" ? Number(editForm.bobotUts) : undefined,
          bobotUas: editForm.bobotUas !== "" ? Number(editForm.bobotUas) : undefined,
        },
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["subjects"] });
      setEditId(null);
      toast.success("Mata pelajaran diperbarui");
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Gagal memperbarui"),
  });

  const deleteMut = useMutation({
    mutationFn: (subjectId: string) => deleteSubjectFn({ data: { token: token!, subjectId } }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["subjects"] }); toast.success("Mata pelajaran dinonaktifkan"); },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Gagal menonaktifkan"),
  });

  function startEdit(s: Record<string, unknown>) {
    setEditId(s.id as string);
    setEditForm({
      name: (s.name as string) ?? "",
      bobotTugas: String(s.bobot_tugas ?? 0.3),
      bobotUts: String(s.bobot_uts ?? 0.3),
      bobotUas: String(s.bobot_uas ?? 0.4),
    });
  }

  const totalBobot = Number(addForm.bobotTugas) + Number(addForm.bobotUts) + Number(addForm.bobotUas);
  const editTotal = editId ? Number(editForm.bobotTugas) + Number(editForm.bobotUts) + Number(editForm.bobotUas) : 1;

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Mata Pelajaran</h2>
      </div>
      <Card className="shadow-none border-0 bg-transparent">
        <CardHeader className="px-0">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">Manajemen Mata Pelajaran</CardTitle>
            <div className="flex items-center gap-2">
              <Label className="text-xs">Kelas:</Label>
              <Select value={filterKelas} onValueChange={setFilterKelas}>
                <SelectTrigger className="h-8 w-24" id="filter-kelas-mapel"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {[1,2,3,4,5].map((k) => <SelectItem key={k} value={String(k)}>Kelas {k}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 px-0">
          {/* Add form */}
          <div className="rounded-xl border p-5 bg-card space-y-4">
            <h3 className="text-sm font-semibold">Tambah Mata Pelajaran — Kelas {filterKelas}</h3>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="md:col-span-1 space-y-1.5">
                <Label className="text-xs">Nama Mapel</Label>
                <Input id="add-mapel-name" value={addForm.name} onChange={(e) => setAddForm((p) => ({ ...p, name: e.target.value }))} placeholder="Nama mata pelajaran" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Bobot Tugas</Label>
                <Input id="add-bobot-tugas" type="number" min={0} max={1} step={0.05} value={addForm.bobotTugas} onChange={(e) => setAddForm((p) => ({ ...p, bobotTugas: e.target.value }))} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Bobot UTS</Label>
                <Input id="add-bobot-uts" type="number" min={0} max={1} step={0.05} value={addForm.bobotUts} onChange={(e) => setAddForm((p) => ({ ...p, bobotUts: e.target.value }))} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Bobot UAS</Label>
                <Input id="add-bobot-uas" type="number" min={0} max={1} step={0.05} value={addForm.bobotUas} onChange={(e) => setAddForm((p) => ({ ...p, bobotUas: e.target.value }))} />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={() => createMut.mutate()}
                disabled={!addForm.name || Math.abs(totalBobot - 1) > 0.01 || createMut.isPending}
                className="bg-emerald-600 hover:bg-emerald-500"
              >
                <Plus className="h-4 w-4 mr-1.5" />
                Tambah Mapel
              </Button>
              {Math.abs(totalBobot - 1) > 0.01 && (
                <p className="text-sm font-medium text-red-500">Total bobot harus tepat 1.0 (saat ini: {totalBobot.toFixed(2)})</p>
              )}
            </div>
          </div>

          {/* Subject list */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama Mapel</TableHead>
                  <TableHead className="text-center">Bobot Tugas</TableHead>
                  <TableHead className="text-center">Bobot UTS</TableHead>
                  <TableHead className="text-center">Bobot UAS</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(subjects ?? []).map((s) =>
                  editId === s.id ? (
                    <TableRow key={s.id} className="bg-muted/30">
                      <TableCell>
                        <Input id={`edit-name-${s.id}`} value={editForm.name} onChange={(e) => setEditForm((p) => ({ ...p, name: e.target.value }))} className="h-8 min-w-32" />
                      </TableCell>
                      <TableCell>
                        <Input id={`edit-bt-${s.id}`} type="number" min={0} max={1} step={0.05} value={editForm.bobotTugas} onChange={(e) => setEditForm((p) => ({ ...p, bobotTugas: e.target.value }))} className="h-8 w-20 mx-auto" />
                      </TableCell>
                      <TableCell>
                        <Input id={`edit-bu-${s.id}`} type="number" min={0} max={1} step={0.05} value={editForm.bobotUts} onChange={(e) => setEditForm((p) => ({ ...p, bobotUts: e.target.value }))} className="h-8 w-20 mx-auto" />
                      </TableCell>
                      <TableCell>
                        <Input id={`edit-buas-${s.id}`} type="number" min={0} max={1} step={0.05} value={editForm.bobotUas} onChange={(e) => setEditForm((p) => ({ ...p, bobotUas: e.target.value }))} className="h-8 w-20 mx-auto" />
                      </TableCell>
                      <TableCell className="text-right space-x-1 min-w-32">
                        {Math.abs(editTotal - 1) > 0.01 && (
                          <div className="text-[10px] text-red-500 mb-1">Total ≠ 1</div>
                        )}
                        <Button size="sm" onClick={() => updateMut.mutate(s.id)} disabled={updateMut.isPending || Math.abs(editTotal - 1) > 0.01} className="bg-emerald-600 hover:bg-emerald-500">
                          <Save className="h-3.5 w-3.5" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setEditId(null)}>✕</Button>
                      </TableCell>
                    </TableRow>
                  ) : (
                    <TableRow key={s.id}>
                      <TableCell className="font-medium">{s.name}</TableCell>
                      <TableCell className="text-center">{Math.round(Number(s.bobot_tugas) * 100)}%</TableCell>
                      <TableCell className="text-center">{Math.round(Number(s.bobot_uts) * 100)}%</TableCell>
                      <TableCell className="text-center">{Math.round(Number(s.bobot_uas) * 100)}%</TableCell>
                      <TableCell className="text-right space-x-1">
                        <Button size="sm" variant="outline" onClick={() => startEdit(s as Record<string, unknown>)}>Edit</Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" variant="outline"><Trash2 className="h-3.5 w-3.5" /></Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Nonaktifkan {s.name}?</AlertDialogTitle>
                              <AlertDialogDescription>Mata pelajaran akan dinonaktifkan dan tidak muncul di input nilai.</AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction className="bg-red-600" onClick={() => deleteMut.mutate(s.id)}>Nonaktifkan</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ),
                )}
                {(subjects ?? []).length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground py-6">
                      Belum ada mata pelajaran untuk kelas ini.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
