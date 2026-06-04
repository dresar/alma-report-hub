import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Trash2, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { getClassesFn, createRombelFn, deleteRombelFn } from "@/lib/api/classes.functions";

export const Route = createFileRoute("/_app/admin/kelas")({
  component: KelasPage,
});

function KelasPage() {
  const { token } = useAuth();
  const qc = useQueryClient();
  const [newRombel, setNewRombel] = useState({ classLevel: "", name: "" });

  const { data: classes } = useQuery({
    queryKey: ["classes"],
    queryFn: () => getClassesFn(),
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
            {(classes ?? []).map((cls) => (
              <div key={cls.id} className="p-4 border rounded-xl bg-card">
                <h3 className="text-sm font-semibold mb-3 text-muted-foreground">Kelas {cls.level}</h3>
                <div className="flex flex-wrap gap-2">
                  {((cls.rombels as Array<Record<string, unknown>>) ?? []).map((r) => (
                    <div key={r.id as string} className="flex items-center gap-1 rounded-lg border bg-background px-3 py-1.5 text-sm">
                      <span className="font-medium">Kelas {cls.level}{r.name as string}</span>
                      {r.wali_kelas_name && <span className="text-xs text-muted-foreground ml-2">({r.wali_kelas_name as string})</span>}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button className="ml-2 text-muted-foreground hover:text-red-500 transition-colors">
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
