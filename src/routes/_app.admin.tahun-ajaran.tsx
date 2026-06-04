import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Check, Trash2, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { getAcademicYearsFn, createAcademicYearFn, setActiveYearFn, deleteAcademicYearFn } from "@/lib/api/academic-years.functions";

export const Route = createFileRoute("/_app/admin/tahun-ajaran")({
  component: TahunAjaranPage,
});

function TahunAjaranPage() {
  const { token } = useAuth();
  const qc = useQueryClient();
  const [newYear, setNewYear] = useState("");

  const { data: years } = useQuery({
    queryKey: ["academic-years"],
    queryFn: () => getAcademicYearsFn(),
  });

  const createMut = useMutation({
    mutationFn: () => createAcademicYearFn({ data: { token: token!, year: newYear } }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["academic-years"] }); setNewYear(""); toast.success("Tahun ajaran ditambahkan"); },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Gagal menambahkan"),
  });

  const setActiveMut = useMutation({
    mutationFn: (yearId: string) => setActiveYearFn({ data: { token: token!, yearId } }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["academic-years"] }); toast.success("Tahun ajaran diaktifkan"); },
  });

  const deleteMut = useMutation({
    mutationFn: (yearId: string) => deleteAcademicYearFn({ data: { token: token!, yearId } }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["academic-years"] }); toast.success("Tahun ajaran dihapus"); },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Gagal menghapus"),
  });

  return (
    <div className="space-y-6 max-w-4xl">
      <Card className="shadow-none border-0 bg-transparent">
        <CardHeader className="px-0"><CardTitle className="text-xl">Manajemen Tahun Ajaran</CardTitle></CardHeader>
        <CardContent className="space-y-4 px-0">
          <div className="flex gap-2">
            <Input
              id="new-year"
              placeholder="e.g. 2026/2027"
              value={newYear}
              onChange={(e) => setNewYear(e.target.value)}
              className="max-w-xs"
            />
            <Button onClick={() => createMut.mutate()} disabled={!newYear || createMut.isPending} className="bg-emerald-600 hover:bg-emerald-500">
              <Plus className="h-4 w-4 mr-1.5" />
              Tambah
            </Button>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tahun Ajaran</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(years ?? []).map((y) => (
                  <TableRow key={y.id}>
                    <TableCell className="font-medium">{y.year}</TableCell>
                    <TableCell>
                      {y.is_active
                        ? <Badge className="bg-emerald-600">Aktif</Badge>
                        : <Badge variant="outline">Tidak Aktif</Badge>}
                    </TableCell>
                    <TableCell className="text-right space-x-1">
                      {!y.is_active && (
                        <Button size="sm" variant="outline" onClick={() => setActiveMut.mutate(y.id)}>
                          <Check className="h-3.5 w-3.5 mr-1" />
                          Aktifkan
                        </Button>
                      )}
                      {!y.is_active && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" variant="outline"><Trash2 className="h-3.5 w-3.5" /></Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Hapus tahun ajaran?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Tahun ajaran <b>{y.year}</b> dan semua data nilai terkait akan dihapus.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction className="bg-red-600" onClick={() => deleteMut.mutate(y.id)}>Hapus</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
