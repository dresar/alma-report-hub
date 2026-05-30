import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  tahunAjaranList, semesterList, kelasList, rombelList,
  kurikulumMapel, kurikulumSkill, aspekSkill, santriList,
} from "@/lib/dummy-data";
import { Save } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/nilai")({
  head: () => ({ meta: [{ title: "Input Nilai — SIRA" }] }),
  component: NilaiPage,
});

function NilaiPage() {
  const [kelas, setKelas] = useState("4");
  const mapelKelas = kurikulumMapel[Number(kelas)] ?? [];
  const skillKelas = kurikulumSkill[Number(kelas)] ?? [];
  const santriKelas = santriList.filter((s) => s.kelas === Number(kelas));

  return (
    <div className="space-y-6">
      <Card className="shadow-none">
        <CardHeader>
          <CardTitle className="text-base">Periode & Kelas</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-4 gap-4">
          <Field label="Tahun Ajaran">
            <Select defaultValue="2024/2025">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {tahunAjaranList.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Semester">
            <Select defaultValue="Ganjil">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {semesterList.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Kelas">
            <Select value={kelas} onValueChange={setKelas}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {kelasList.map((k) => <SelectItem key={k} value={String(k)}>Kelas {k}</SelectItem>)}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Rombel">
            <Select defaultValue="A">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {rombelList.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
              </SelectContent>
            </Select>
          </Field>
        </CardContent>
      </Card>

      <Tabs defaultValue="akademik">
        <TabsList>
          <TabsTrigger value="akademik">Nilai Akademik</TabsTrigger>
          <TabsTrigger value="skill">Nilai Skill</TabsTrigger>
        </TabsList>

        <TabsContent value="akademik" className="mt-4">
          <Card className="shadow-none">
            <CardHeader>
              <CardTitle className="text-base">Input Tugas, UTS, UAS</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Santri</TableHead>
                    {mapelKelas.map((m) => <TableHead key={m} className="text-center">{m}</TableHead>)}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {santriKelas.map((s) => (
                    <TableRow key={s.id}>
                      <TableCell className="font-medium">{s.nama}</TableCell>
                      {mapelKelas.map((m) => (
                        <TableCell key={m}>
                          <div className="flex gap-1">
                            <Input className="h-8 w-14" placeholder="Tgs" />
                            <Input className="h-8 w-14" placeholder="UTS" />
                            <Input className="h-8 w-14" placeholder="UAS" />
                          </div>
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-4 flex justify-end">
                <Button onClick={() => toast.success("Nilai akademik tersimpan")}>
                  <Save className="h-4 w-4 mr-2" /> Simpan
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skill" className="mt-4">
          <Card className="shadow-none">
            <CardHeader>
              <CardTitle className="text-base">Input Nilai Skill (5 Aspek)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {skillKelas.map((skill) => (
                <div key={skill}>
                  <h3 className="text-sm font-semibold mb-2">{skill}</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Santri</TableHead>
                        {aspekSkill.map((a) => <TableHead key={a} className="text-center">{a}</TableHead>)}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {santriKelas.map((s) => (
                        <TableRow key={s.id}>
                          <TableCell className="font-medium">{s.nama}</TableCell>
                          {aspekSkill.map((a) => (
                            <TableCell key={a}><Input className="h-8 w-16" placeholder="0-100" /></TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ))}
              <div className="flex justify-end">
                <Button onClick={() => toast.success("Nilai skill tersimpan")}>
                  <Save className="h-4 w-4 mr-2" /> Simpan
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs">{label}</Label>
      {children}
    </div>
  );
}
