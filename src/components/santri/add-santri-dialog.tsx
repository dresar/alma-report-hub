import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Plus } from "lucide-react";

import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { santriStore } from "@/lib/santri-store";
import { kelasList, rombelList, tahunAjaranList } from "@/lib/dummy-data";

// ---------- Schema (validasi client-side) ----------
const NAMA_REGEX = /^[a-zA-Z .,'-]+$/;
const NIS_REGEX = /^[0-9]{4,12}$/;
const HP_REGEX = /^[0-9+\-\s]{8,16}$/;

const schema = z.object({
  nis: z.string().regex(NIS_REGEX, "NIS 4-12 digit angka"),
  nama: z.string().trim().min(2, "Min 2 karakter").max(80, "Max 80 karakter")
    .regex(NAMA_REGEX, "Hanya huruf, spasi, .,'-"),
  jenisKelamin: z.enum(["L", "P"], { message: "Pilih jenis kelamin" }),
  tempatLahir: z.string().trim().min(2, "Min 2 karakter").max(50),
  tanggalLahir: z.string().min(1, "Wajib diisi"),
  alamat: z.string().trim().min(5, "Min 5 karakter").max(255),
  kelas: z.coerce.number().int().min(1).max(5),
  rombel: z.string().min(1, "Pilih rombel"),
  tahunMasuk: z.string().min(1, "Pilih tahun masuk"),
  status: z.enum(["Aktif", "Alumni", "Pindah"]),
  asalSekolah: z.string().trim().max(80).optional().or(z.literal("")),
  namaAyah: z.string().trim().max(80).optional().or(z.literal("")),
  namaIbu: z.string().trim().max(80).optional().or(z.literal("")),
  namaWali: z.string().trim().max(80).optional().or(z.literal("")),
  noHpWali: z.string().regex(HP_REGEX, "Format HP tidak valid").optional().or(z.literal("")),
  catatan: z.string().trim().max(500).optional().or(z.literal("")),
});

export type AddSantriValues = z.infer<typeof schema>;

const defaultValues: AddSantriValues = {
  nis: "", nama: "", jenisKelamin: "L",
  tempatLahir: "", tanggalLahir: "",
  alamat: "", kelas: 1, rombel: "A",
  tahunMasuk: "2024/2025", status: "Aktif",
  asalSekolah: "", namaAyah: "", namaIbu: "",
  namaWali: "", noHpWali: "", catatan: "",
};

export function AddSantriDialog() {
  const [open, setOpen] = useState(false);
  const form = useForm<AddSantriValues>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onTouched",
  });

  const onSubmit = (values: AddSantriValues) => {
    // Cek duplikat NIS
    if (santriStore.getAll().some((s) => s.nis === values.nis)) {
      form.setError("nis", { message: "NIS sudah terdaftar" });
      return;
    }
    santriStore.add(values);
    toast.success("Santri berhasil ditambahkan", { description: values.nama });
    form.reset(defaultValues);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button><Plus className="h-4 w-4 mr-2" />Tambah Santri</Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Tambah Santri Baru</DialogTitle>
          <DialogDescription>
            Lengkapi data identitas, akademik, dan wali. Field bertanda * wajib diisi.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* IDENTITAS */}
            <Section title="Identitas Santri">
              <div className="grid md:grid-cols-2 gap-4">
                <TextField form={form} name="nis" label="NIS *" placeholder="cth. 2024010" />
                <TextField form={form} name="nama" label="Nama Lengkap *" placeholder="cth. Ahmad Fauzi" />

                <FormField control={form.control} name="jenisKelamin" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jenis Kelamin *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="L">Laki-laki</SelectItem>
                        <SelectItem value="P">Perempuan</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />

                <TextField form={form} name="tanggalLahir" label="Tanggal Lahir *" type="date" />
                <TextField form={form} name="tempatLahir" label="Tempat Lahir *" placeholder="cth. Pekanbaru" />
                <TextField form={form} name="asalSekolah" label="Asal Sekolah" placeholder="cth. SDN 01 Mahato" />
              </div>

              <FormField control={form.control} name="alamat" render={({ field }) => (
                <FormItem>
                  <FormLabel>Alamat *</FormLabel>
                  <FormControl><Textarea rows={2} {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </Section>

            {/* AKADEMIK */}
            <Section title="Data Akademik">
              <div className="grid md:grid-cols-4 gap-4">
                <FormField control={form.control} name="kelas" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kelas *</FormLabel>
                    <Select onValueChange={(v) => field.onChange(Number(v))} value={String(field.value)}>
                      <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                      <SelectContent>
                        {kelasList.map((k) => <SelectItem key={k} value={String(k)}>Kelas {k}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="rombel" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rombel *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                      <SelectContent>
                        {rombelList.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="tahunMasuk" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tahun Masuk *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                      <SelectContent>
                        {tahunAjaranList.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="status" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="Aktif">Aktif</SelectItem>
                        <SelectItem value="Alumni">Alumni</SelectItem>
                        <SelectItem value="Pindah">Pindah</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
            </Section>

            {/* WALI */}
            <Section title="Data Orang Tua / Wali">
              <div className="grid md:grid-cols-2 gap-4">
                <TextField form={form} name="namaAyah" label="Nama Ayah" />
                <TextField form={form} name="namaIbu" label="Nama Ibu" />
                <TextField form={form} name="namaWali" label="Nama Wali" placeholder="Kosongkan jika sama dengan ayah" />
                <TextField form={form} name="noHpWali" label="No. HP Wali" placeholder="cth. 08123456789" />
              </div>
            </Section>

            {/* CATATAN */}
            <FormField control={form.control} name="catatan" render={({ field }) => (
              <FormItem>
                <FormLabel>Catatan Tambahan</FormLabel>
                <FormControl><Textarea rows={2} placeholder="Opsional" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => { form.reset(defaultValues); setOpen(false); }}>
                Batal
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                Simpan Santri
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold border-b pb-1.5">{title}</h3>
      {children}
    </div>
  );
}

function TextField({
  form, name, label, type = "text", placeholder,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any; name: keyof AddSantriValues; label: string; type?: string; placeholder?: string;
}) {
  return (
    <FormField control={form.control} name={name} render={({ field }: { field: { value: unknown } }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input type={type} placeholder={placeholder} {...(field as object)} value={(field.value as string) ?? ""} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )} />
  );
}
