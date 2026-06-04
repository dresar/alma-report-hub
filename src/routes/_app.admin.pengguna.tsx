import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Trash2, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { getUsersFn, createUserFn, toggleUserFn, deleteUserFn } from "@/lib/api/auth.functions";

export const Route = createFileRoute("/_app/admin/pengguna")({
  component: PenggunaPage,
});

function PenggunaPage() {
  const { token } = useAuth();
  const qc = useQueryClient();
  const [addForm, setAddForm] = useState({ name: "", email: "", password: "", role: "guru" as "admin" | "wali_kelas" | "guru" });

  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsersFn({ data: { token: token! } }),
  });

  const createMut = useMutation({
    mutationFn: () => createUserFn({ data: { token: token!, ...addForm } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["users"] });
      setAddForm({ name: "", email: "", password: "", role: "guru" });
      toast.success("Pengguna ditambahkan");
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Gagal menambahkan pengguna"),
  });

  const toggleMut = useMutation({
    mutationFn: ({ userId, isActive }: { userId: string; isActive: boolean }) =>
      toggleUserFn({ data: { token: token!, userId, isActive } }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["users"] }); toast.success("Status pengguna diperbarui"); },
  });

  const deleteMut = useMutation({
    mutationFn: (userId: string) => deleteUserFn({ data: { token: token!, userId } }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["users"] }); toast.success("Pengguna dihapus"); },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Gagal menghapus pengguna"),
  });

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Pengguna</h2>
      </div>
      <Card className="shadow-none border-0 bg-transparent">
        <CardHeader className="px-0"><CardTitle className="text-xl">Manajemen Pengguna</CardTitle></CardHeader>
        <CardContent className="space-y-6 px-0">
          {/* Add user form */}
          <div className="rounded-xl border p-5 bg-card space-y-4">
            <h3 className="text-sm font-semibold">Tambah Pengguna Baru</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs">Nama Lengkap</Label>
                <Input id="new-user-name" value={addForm.name} onChange={(e) => setAddForm((p) => ({ ...p, name: e.target.value }))} placeholder="Nama lengkap" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Email</Label>
                <Input id="new-user-email" type="email" value={addForm.email} onChange={(e) => setAddForm((p) => ({ ...p, email: e.target.value }))} placeholder="email@sira.sch.id" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Password</Label>
                <Input id="new-user-password" type="password" value={addForm.password} onChange={(e) => setAddForm((p) => ({ ...p, password: e.target.value }))} placeholder="Min. 6 karakter" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Role / Peran</Label>
                <Select value={addForm.role} onValueChange={(v) => setAddForm((p) => ({ ...p, role: v as typeof addForm.role }))}>
                  <SelectTrigger id="new-user-role"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="wali_kelas">Wali Kelas</SelectItem>
                    <SelectItem value="guru">Guru</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={() => createMut.mutate()} disabled={!addForm.name || !addForm.email || !addForm.password || createMut.isPending} className="bg-emerald-600 hover:bg-emerald-500">
              <Plus className="h-4 w-4 mr-1.5" />
              Tambah Pengguna
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(users ?? []).map((u) => (
                  <TableRow key={u.id}>
                    <TableCell className="font-medium">{u.name}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{u.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">{String(u.role).replace("_", " ")}</Badge>
                    </TableCell>
                    <TableCell>
                      {u.is_active
                        ? <Badge className="bg-emerald-600">Aktif</Badge>
                        : <Badge variant="outline">Nonaktif</Badge>}
                    </TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button size="sm" variant="outline" onClick={() => toggleMut.mutate({ userId: u.id, isActive: !u.is_active })}>
                        {u.is_active ? "Nonaktifkan" : "Aktifkan"}
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="outline"><Trash2 className="h-3.5 w-3.5" /></Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Hapus pengguna?</AlertDialogTitle>
                            <AlertDialogDescription>Akun <b>{u.name}</b> akan dihapus permanen.</AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Batal</AlertDialogCancel>
                            <AlertDialogAction className="bg-red-600" onClick={() => deleteMut.mutate(u.id)}>Hapus</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
                {(users ?? []).length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground py-6">
                      Belum ada data pengguna.
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
