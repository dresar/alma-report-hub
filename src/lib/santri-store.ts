import { useSyncExternalStore } from "react";
import { santriList as seed, type Santri } from "./dummy-data";

// Extended santri model (backward compatible — old fields tetap ada)
export type SantriDetail = Santri & {
  tempatLahir?: string;
  tanggalLahir?: string; // ISO yyyy-mm-dd
  alamat?: string;
  namaAyah?: string;
  namaIbu?: string;
  namaWali?: string;
  noHpWali?: string;
  tahunMasuk?: string;
  asalSekolah?: string;
  status?: "Aktif" | "Alumni" | "Pindah";
  catatan?: string;
};

let data: SantriDetail[] = seed.map((s) => ({
  ...s,
  status: "Aktif",
  tahunMasuk: s.riwayatKelas[0]?.tahun ?? "2024/2025",
}));

const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

export const santriStore = {
  getAll: () => data,
  add(s: Omit<SantriDetail, "id" | "riwayatKelas"> & { id?: string }) {
    const id = s.id ?? crypto.randomUUID();
    const newItem: SantriDetail = {
      ...s,
      id,
      riwayatKelas: [
        { tahun: s.tahunMasuk ?? "2024/2025", kelas: s.kelas, rombel: s.rombel },
      ],
    };
    data = [newItem, ...data];
    emit();
    return newItem;
  },
  remove(id: string) {
    data = data.filter((s) => s.id !== id);
    emit();
  },
  subscribe(cb: () => void) {
    listeners.add(cb);
    return () => listeners.delete(cb);
  },
};

export function useSantriList(): SantriDetail[] {
  return useSyncExternalStore(
    santriStore.subscribe,
    santriStore.getAll,
    santriStore.getAll,
  );
}
