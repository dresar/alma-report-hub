import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Search, History, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { AddSantriDialog } from "@/components/santri/add-santri-dialog";
import { santriStore, useSantriList } from "@/lib/santri-store";

export const Route = createFileRoute("/_app/santri")({
  head: () => ({ meta: [{ title: "Manajemen Santri — SIRA" }] }),
  component: SantriPage,
});

function SantriPage() {
  const santri = useSantriList();
  const [q, setQ] = useState("");
  const filtered = santri.filter((s) =>
    s.nama.toLowerCase().includes(q.toLowerCase()) || s.nis.includes(q),
  );

  return (
    <Card className="shadow-none">
      <CardHeader className="flex flex-row items-center justify-between gap-3 flex-wrap">
        <div>
          <CardTitle className="text-base">Daftar Santri</CardTitle>
          <p className="text-xs text-muted-foreground mt-1">
            Total: {santri.length} santri
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari nama / NIS"
              className="pl-8 w-56"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
          <AddSantriDialog />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>NIS</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>JK</TableHead>
              <TableHead>Kelas</TableHead>
              <TableHead>Rombel</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                  Tidak ada santri ditemukan.
                </TableCell>
              </TableRow>
            )}
            {filtered.map((s) => (
              <TableRow key={s.id}>
                <TableCell className="font-mono text-xs">{s.nis}</TableCell>
                <TableCell className="font-medium">{s.nama}</TableCell>
                <TableCell>{s.jenisKelamin}</TableCell>
                <TableCell>{s.kelas}</TableCell>
                <TableCell><Badge variant="secondary">{s.rombel}</Badge></TableCell>
                <TableCell>
                  <Badge variant={s.status === "Aktif" ? "default" : "outline"}>
                    {s.status ?? "Aktif"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right space-x-1">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <History className="h-3.5 w-3.5 mr-1" />Riwayat
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Riwayat Kenaikan Kelas — {s.nama}</DialogTitle>
                      </DialogHeader>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Tahun Ajaran</TableHead>
                            <TableHead>Kelas</TableHead>
                            <TableHead>Rombel</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {s.riwayatKelas.map((r) => (
                            <TableRow key={r.tahun}>
                              <TableCell>{r.tahun}</TableCell>
                              <TableCell>{r.kelas}</TableCell>
                              <TableCell>{r.rombel}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </DialogContent>
                  </Dialog>

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
                          Data santri <b>{s.nama}</b> akan dihapus dari daftar.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => {
                            santriStore.remove(s.id);
                            toast.success("Santri dihapus");
                          }}
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
      </CardContent>
    </Card>
  );
}
