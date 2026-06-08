import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Trash2, Plus, Edit2, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { getClassesFn, createRombelFn, deleteRombelFn, updateRombelFn } from "@/lib/api/classes.functions";
import { getUsersFn } from "@/lib/api/auth.functions";

export const Route = createFileRoute("/_app/admin/kelas")({
  component: KelasPage,
});

function KelasPage() {
  const { token } = useAuth();
  const qc = useQueryClient();
  const [newRombel, setNewRombel] = useState({ classLevel: "", name: "" });
  const [editingRombelId, setEditingRombelId] = useState<string | null>(null);
  const [selectedWaliKelas, setSelectedWaliKelas] = useState<string>("none");

  const { data: classes, isLoading: isClassesLoading } = useQuery({
    queryKey: ["classes"],
    queryFn: () => getClassesFn(),
  });

  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsersFn({ data: { token: token! } }),
    enabled: !!token,
  });

  const createRombelMut = useMutation({
    mutationFn: () =>
      createRombelFn({
        data: { token: token!, classLevel: Number(newRombel.classLevel), name: newRombel.name as "A" | "B" | "C" | "D" },
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["classes"] });
      qc.invalidateQueries({ queryKey: ["rombels"] });
      setNewRombel({ classLevel: "", name: "" });
      toast.success("Rombel ditambahkan");
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Gagal menambahkan rombel"),
  });

  const deleteRombelMut = useMutation({
    mutationFn: (rombelId: string) => deleteRombelFn({ data: { token: token!, rombelId } }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["classes"] }); qc.invalidateQueries({ queryKey: ["rombels"] }); toast.success("Rombel dihapus"); },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Gagal menghapus rombel"),
  });

  const updateRombelMut = useMutation({
    mutationFn: (rombelId: string) => 
      updateRombelFn({ data: { token: token!, rombelId, waliKelasId: selectedWaliKelas === "none" ? null : selectedWaliKelas } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["classes"] });
      qc.invalidateQueries({ queryKey: ["rombels"] });
      setEditingRombelId(null);
      toast.success("Rombel diperbarui");
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Gagal memperbarui rombel"),
  });

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Kelas & Rombel</h2>
      </div>
      <Card className="shadow-none border-0 bg-transparent">
        <CardHeader className="px-0"><CardTitle className="text-xl">Manajemen Kelas & Rombel</CardTitle></CardHeader>
        <CardContent className="space-y-6 px-0">
          <div className="flex gap-2 items-end">
            <div className="space-y-1.5">
              <Label className="text-xs">Kelas</Label>
              <Select value={newRombel.classLevel} onValueChange={(v) => setNewRombel((p) => ({ ...p, classLevel: v }))}>
                <SelectTrigger className="w-28" id="new-rombel-class"><SelectValue placeholder="Kelas" /></SelectTrigger>
                <SelectContent>
                  {[1,2,3,4,5].map((k) => <SelectItem key={k} value={String(k)}>Kelas {k}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Rombel</Label>
              <Select value={newRombel.name} onValueChange={(v) => setNewRombel((p) => ({ ...p, name: v }))}>
                <SelectTrigger className="w-24" id="new-rombel-name"><SelectValue placeholder="A/B/C/D" /></SelectTrigger>
                <SelectContent>
                  {["A","B","C","D"].map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={() => createRombelMut.mutate()} disabled={!newRombel.classLevel || !newRombel.name || createRombelMut.isPending} className="bg-emerald-600 hover:bg-emerald-500">
              <Plus className="h-4 w-4 mr-1.5" />Tambah Rombel
            </Button>
          </div>

          <div className="space-y-4">
            {isClassesLoading ? (
              <div className="flex items-center gap-2 text-muted-foreground text-sm py-4">
                <Loader2 className="h-4 w-4 animate-spin" />
                Memuat data kelas...
              </div>
            ) : (classes ?? []).map((cls) => (
              <div key={cls.id} className="p-4 border rounded-xl bg-card">
                <h3 className="text-sm font-semibold mb-3 text-muted-foreground">Kelas {cls.level}</h3>
                <div className="flex flex-wrap gap-2">
                  {((cls.rombels as Array<Record<string, unknown>>) ?? []).map((r) => (
                    <div key={r.id as string} className="flex items-center gap-1 rounded-lg border bg-background px-3 py-1.5 text-sm">
                      <span className="font-medium">Kelas {cls.level}{r.name as string}</span>
                      {!!r.wali_kelas_name && <span className="text-xs text-muted-foreground ml-2">({r.wali_kelas_name as string})</span>}
                      
                      <div className="flex items-center ml-2 border-l pl-2 gap-1">
                        <Dialog open={editingRombelId === r.id} onOpenChange={(open) => {
                          if (open) {
                            setSelectedWaliKelas(r.wali_kelas_id as string || "none");
                            setEditingRombelId(r.id as string);
                          } else {
                            setEditingRombelId(null);
                          }
                        }}>
                          <DialogTrigger asChild>
                            <button className="text-muted-foreground hover:text-blue-500 transition-colors p-1">
                              <Edit2 className="h-3.5 w-3.5" />
                            </button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Rombel Kelas {cls.level}{r.name as string}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <Label>Wali Kelas</Label>
                                <Select value={selectedWaliKelas} onValueChange={setSelectedWaliKelas}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Pilih Wali Kelas" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="none">-- Belum ada Wali Kelas --</SelectItem>
                                    {(users ?? []).filter((u: any) => u.role === "guru" || u.role === "wali_kelas" || u.role === "admin").map((u: any) => (
                                      <SelectItem key={u.id} value={String(u.id)}>{u.name}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="flex justify-end gap-2 pt-4">
                                <Button variant="outline" onClick={() => setEditingRombelId(null)}>Batal</Button>
                                <Button onClick={() => updateRombelMut.mutate(r.id as string)} disabled={updateRombelMut.isPending}>
                                  {updateRombelMut.isPending ? "Menyimpan..." : "Simpan"}
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <button className="text-muted-foreground hover:text-red-500 transition-colors p-1">
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Hapus rombel Kelas {cls.level}{r.name as string}?</AlertDialogTitle>
                              <AlertDialogDescription>Semua data santri di rombel ini akan kehilangan penempatan.</AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction className="bg-red-600" onClick={() => deleteRombelMut.mutate(r.id as string)}>Hapus</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  ))}
                  {((cls.rombels as Array<unknown>) ?? []).length === 0 && (
                    <span className="text-xs text-muted-foreground px-1 py-1.5">Belum ada rombel</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
