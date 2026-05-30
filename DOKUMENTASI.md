# 📘 DOKUMENTASI FITUR — TAMBAH SANTRI

**Aplikasi:** SIRA (Sistem Informasi Rapor Santri)
**Modul:** Manajemen Santri → Tambah Santri
**Versi:** 1.0.0

---

## 1. Gambaran Umum

Fitur **Tambah Santri** memungkinkan admin/operator mendaftarkan santri baru ke dalam sistem SIRA. Form terbagi menjadi 4 seksi: **Identitas**, **Data Akademik**, **Data Wali**, dan **Catatan**. Data divalidasi penuh di sisi klien menggunakan **Zod + React Hook Form**, lalu disimpan ke *santri store* (in-memory) yang langsung memperbarui tabel daftar santri secara reaktif (`useSyncExternalStore`).

> ⚠️ Saat ini data disimpan in-memory (RAM browser). Untuk persistensi permanen, aktifkan **Lovable Cloud** dan ganti `santriStore` menjadi tabel database (lihat Bagian 9 — Rencana Migrasi).

---

## 2. Lokasi & Akses

| Hal              | Detail                                         |
| ---------------- | ---------------------------------------------- |
| Halaman          | `/santri`                                      |
| Tombol pemicu    | Tombol **"+ Tambah Santri"** di header tabel   |
| Komponen dialog  | `src/components/santri/add-santri-dialog.tsx`  |
| Halaman induk    | `src/routes/_app.santri.tsx`                   |
| Store data       | `src/lib/santri-store.ts`                      |
| Schema validasi  | Inline di file dialog (Zod)                    |

---

## 3. Struktur Form

### 3.1 Identitas Santri

| Field           | Tipe       | Wajib | Aturan Validasi                                              |
| --------------- | ---------- | :---: | ------------------------------------------------------------ |
| NIS             | text       |   ✅  | 4–12 digit angka (`/^[0-9]{4,12}$/`). **Unik** (cek duplikat). |
| Nama Lengkap    | text       |   ✅  | 2–80 karakter, hanya huruf, spasi, `.`, `,`, `'`, `-`.       |
| Jenis Kelamin   | select     |   ✅  | `L` (Laki-laki) atau `P` (Perempuan).                        |
| Tanggal Lahir   | date       |   ✅  | Format `YYYY-MM-DD`.                                         |
| Tempat Lahir    | text       |   ✅  | 2–50 karakter.                                               |
| Asal Sekolah    | text       |   —   | Maks 80 karakter.                                            |
| Alamat          | textarea   |   ✅  | 5–255 karakter.                                              |

### 3.2 Data Akademik

| Field        | Tipe   | Wajib | Pilihan                                  |
| ------------ | ------ | :---: | ---------------------------------------- |
| Kelas        | select |   ✅  | 1 – 5                                    |
| Rombel       | select |   ✅  | A, B, C, D                               |
| Tahun Masuk  | select |   ✅  | Diambil dari master `tahunAjaranList`    |
| Status       | select |   ✅  | Aktif / Alumni / Pindah                  |

### 3.3 Data Orang Tua / Wali

| Field         | Tipe | Wajib | Aturan                              |
| ------------- | ---- | :---: | ----------------------------------- |
| Nama Ayah     | text |   —   | Maks 80 karakter.                   |
| Nama Ibu      | text |   —   | Maks 80 karakter.                   |
| Nama Wali     | text |   —   | Kosongkan jika sama dengan ayah.    |
| No. HP Wali   | text |   —   | 8–16 karakter angka/`+`/`-`/spasi.  |

### 3.4 Catatan

| Field   | Tipe     | Wajib | Aturan          |
| ------- | -------- | :---: | --------------- |
| Catatan | textarea |   —   | Maks 500 karakter. |

---

## 4. Alur Pengguna

```
[Daftar Santri]
      │
      │ klik "+ Tambah Santri"
      ▼
[Dialog Form Terbuka]
      │
      │ isi field (validasi real-time onTouched)
      ▼
[Klik "Simpan Santri"]
      │
      ├─ Validasi Zod → gagal? tampilkan pesan di bawah field
      │
      ├─ Cek NIS duplikat → gagal? error pada field NIS
      │
      ▼
[santriStore.add() → emit() → useSantriList() re-render]
      │
      ▼
[Toast sukses + dialog tertutup + reset form]
```

---

## 5. Aturan Bisnis

1. **NIS bersifat unik** — sistem menolak NIS yang sudah ada di store.
2. **Riwayat kelas otomatis** — saat santri baru dibuat, satu entri riwayat otomatis ditambahkan dengan `{ tahun: tahunMasuk, kelas, rombel }`.
3. **Status default** = `Aktif`.
4. **ID santri** di-generate via `crypto.randomUUID()`.
5. Field opsional yang dikosongkan disimpan sebagai string kosong, bukan `null`.

---

## 6. Validasi & Keamanan

| Lapis             | Mekanisme                                                       |
| ----------------- | --------------------------------------------------------------- |
| **Client-side**   | Zod schema + React Hook Form (`mode: "onTouched"`)              |
| **Sanitasi**      | `z.string().trim()` pada semua input teks                       |
| **Batas panjang** | Setiap string punya `.max()` → cegah payload besar / DoS        |
| **Regex strict**  | NIS, Nama, HP punya pola regex eksplisit                        |
| **Cek duplikat**  | Validasi NIS unik pada `onSubmit`                               |

> Saat migrasi ke backend: WAJIB tambahkan validasi yang sama di server (`createServerFn` + Zod) dan unique constraint di kolom `nis`.

---

## 7. Arsitektur Teknis

```
┌───────────────────────────┐
│ AddSantriDialog (UI)      │
│  ├─ react-hook-form       │
│  ├─ zodResolver(schema)   │
│  └─ onSubmit ──┐          │
└────────────────┼──────────┘
                 ▼
        ┌──────────────────┐
        │ santriStore.add()│  in-memory + pub/sub
        └────────┬─────────┘
                 │ emit()
                 ▼
        ┌──────────────────┐
        │ useSantriList()  │  useSyncExternalStore
        └────────┬─────────┘
                 ▼
        ┌──────────────────┐
        │ Tabel di /santri │  re-render otomatis
        └──────────────────┘
```

**Mengapa `useSyncExternalStore`?**
- Tidak butuh dependency tambahan (zustand/redux).
- Aman untuk React 19 + concurrent rendering.
- Re-render hanya komponen yang `subscribe`.

---

## 8. Contoh Penggunaan Programatik

```ts
import { santriStore } from "@/lib/santri-store";

// Tambah santri secara manual (mis. dari import CSV)
santriStore.add({
  nis: "2024099",
  nama: "Ali Akbar",
  jenisKelamin: "L",
  tempatLahir: "Mahato",
  tanggalLahir: "2014-05-10",
  alamat: "Jl. Pesantren No. 5",
  kelas: 2,
  rombel: "A",
  tahunMasuk: "2024/2025",
  status: "Aktif",
  asalSekolah: "SDN 02",
  namaAyah: "Hasan",
  namaIbu: "Aminah",
  namaWali: "",
  noHpWali: "08123456789",
  catatan: "",
});

// Hapus
santriStore.remove("uuid-xxxx");

// Subscribe manual
const unsub = santriStore.subscribe(() => {
  console.log("Daftar santri berubah:", santriStore.getAll().length);
});
unsub();
```

---

## 9. Rencana Migrasi ke Database (Lovable Cloud)

Saat siap pakai backend nyata:

1. Aktifkan **Lovable Cloud**.
2. Buat tabel `santri` dengan kolom mengikuti schema Zod + `UNIQUE(nis)`.
3. Buat tabel `riwayat_kelas` (relasi 1-N).
4. Aktifkan **RLS**: hanya `authenticated` role yang bisa SELECT/INSERT/UPDATE/DELETE.
5. Ganti `santriStore.add()` → `createServerFn({ method: "POST" }).inputValidator(schema).handler(...)`.
6. Ganti `useSantriList()` → `useSuspenseQuery({ queryKey: ["santri"], queryFn: getSantri })`.
7. Invalidate query setelah mutation: `queryClient.invalidateQueries({ queryKey: ["santri"] })`.

---

## 10. Pengujian Manual (Checklist QA)

- [ ] Buka `/santri`, klik **+ Tambah Santri** → dialog muncul.
- [ ] Submit form kosong → semua field wajib menampilkan error.
- [ ] Isi NIS = `abc` → error "NIS 4-12 digit angka".
- [ ] Isi NIS yang sudah ada (mis. `2024001`) → error "NIS sudah terdaftar".
- [ ] Isi semua field valid → toast sukses, dialog tertutup, baris baru muncul **di paling atas tabel**.
- [ ] Refresh halaman → data baru hilang (in-memory). ✅ *expected*
- [ ] Cari nama santri baru di kolom search → muncul.
- [ ] Klik **Riwayat** pada santri baru → 1 entri sesuai tahun masuk.
- [ ] Klik **🗑️** → konfirmasi → santri terhapus + toast.

---

## 11. Aksesibilitas (a11y)

- Semua input terhubung ke `<label>` via shadcn `<FormLabel>`.
- Dialog menggunakan Radix UI → focus-trap + ESC untuk close.
- Pesan error diumumkan via `<FormMessage>` (aria-live).
- Kontras warna mengikuti token design system (sudah lulus WCAG AA).

---

## 12. Troubleshooting

| Masalah                                  | Penyebab & Solusi                                                   |
| ---------------------------------------- | ------------------------------------------------------------------- |
| Dialog tidak terbuka                     | Pastikan `<Toaster />` & provider Radix terpasang di `__root.tsx`.  |
| Toast tidak muncul                       | Cek `Toaster` di `src/routes/__root.tsx`.                           |
| Field "Tanggal Lahir" kosong di Safari   | Gunakan format ISO `YYYY-MM-DD` (sudah default).                    |
| Data hilang setelah refresh              | Wajar — store in-memory. Migrasi ke Cloud (Bagian 9).               |
| Error "NIS sudah terdaftar" terus muncul | Hapus santri lama dengan NIS sama, atau gunakan NIS berbeda.        |

---

**Dibuat untuk:** Raudhatusalam Islamic Boarding School
**Maintainer:** Tim SIRA
