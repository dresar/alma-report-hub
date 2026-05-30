// Dummy data SIRA — master & transaksi
export const tahunAjaranList = ["2023/2024", "2024/2025", "2025/2026"];
export const semesterList = ["Ganjil", "Genap"] as const;
export const kelasList = [1, 2, 3, 4, 5];
export const rombelList = ["A", "B", "C", "D"];

export const mapelMaster = [
  "Al-Qur'an",
  "Hadits",
  "Fiqih",
  "Aqidah",
  "Bahasa Arab",
  "Bahasa Inggris",
  "Matematika",
  "IPA",
  "IPS",
];

export const skillMaster = ["Pidato", "Komputer", "Diskusi"];

// Mapping kurikulum: mapel per kelas
export const kurikulumMapel: Record<number, string[]> = {
  1: ["Al-Qur'an", "Fiqih", "Bahasa Arab", "Matematika"],
  2: ["Al-Qur'an", "Hadits", "Fiqih", "Bahasa Arab", "Matematika", "IPA"],
  3: mapelMaster.slice(0, 7),
  4: mapelMaster,
  5: mapelMaster,
};

export const kurikulumSkill: Record<number, string[]> = {
  1: ["Pidato"],
  2: ["Pidato", "Komputer"],
  3: skillMaster,
  4: skillMaster,
  5: skillMaster,
};

export type Santri = {
  id: string;
  nis: string;
  nama: string;
  kelas: number;
  rombel: string;
  jenisKelamin: "L" | "P";
  riwayatKelas: { tahun: string; kelas: number; rombel: string }[];
};

export const santriList: Santri[] = [
  { id: "1", nis: "2024001", nama: "Ahmad Fauzi", kelas: 4, rombel: "A", jenisKelamin: "L",
    riwayatKelas: [{tahun:"2022/2023",kelas:2,rombel:"A"},{tahun:"2023/2024",kelas:3,rombel:"A"},{tahun:"2024/2025",kelas:4,rombel:"A"}]},
  { id: "2", nis: "2024002", nama: "Muhammad Rizki", kelas: 4, rombel: "A", jenisKelamin: "L",
    riwayatKelas: [{tahun:"2023/2024",kelas:3,rombel:"B"},{tahun:"2024/2025",kelas:4,rombel:"A"}]},
  { id: "3", nis: "2024003", nama: "Abdullah Hakim", kelas: 4, rombel: "A", jenisKelamin: "L",
    riwayatKelas: [{tahun:"2024/2025",kelas:4,rombel:"A"}]},
  { id: "4", nis: "2024004", nama: "Yusuf Ibrahim", kelas: 4, rombel: "B", jenisKelamin: "L",
    riwayatKelas: [{tahun:"2024/2025",kelas:4,rombel:"B"}]},
  { id: "5", nis: "2024005", nama: "Khalid Anwar", kelas: 3, rombel: "A", jenisKelamin: "L",
    riwayatKelas: [{tahun:"2024/2025",kelas:3,rombel:"A"}]},
  { id: "6", nis: "2024006", nama: "Umar Faruq", kelas: 3, rombel: "B", jenisKelamin: "L",
    riwayatKelas: [{tahun:"2024/2025",kelas:3,rombel:"B"}]},
  { id: "7", nis: "2024007", nama: "Bilal Hasan", kelas: 5, rombel: "A", jenisKelamin: "L",
    riwayatKelas: [{tahun:"2024/2025",kelas:5,rombel:"A"}]},
  { id: "8", nis: "2024008", nama: "Zaid Malik", kelas: 2, rombel: "A", jenisKelamin: "L",
    riwayatKelas: [{tahun:"2024/2025",kelas:2,rombel:"A"}]},
];

// Skor mapel per santri (untuk preview rapor: santri id "1")
export const nilaiAkademik = [
  { mapel: "Al-Qur'an", tugas: 88, uts: 85, uas: 90, avgKelas: 82 },
  { mapel: "Hadits", tugas: 84, uts: 80, uas: 86, avgKelas: 79 },
  { mapel: "Fiqih", tugas: 90, uts: 88, uas: 92, avgKelas: 84 },
  { mapel: "Aqidah", tugas: 86, uts: 84, uas: 88, avgKelas: 81 },
  { mapel: "Bahasa Arab", tugas: 82, uts: 78, uas: 85, avgKelas: 76 },
  { mapel: "Bahasa Inggris", tugas: 80, uts: 75, uas: 82, avgKelas: 74 },
  { mapel: "Matematika", tugas: 78, uts: 72, uas: 80, avgKelas: 70 },
  { mapel: "IPA", tugas: 85, uts: 82, uas: 87, avgKelas: 78 },
  { mapel: "IPS", tugas: 83, uts: 80, uas: 85, avgKelas: 77 },
];

export function hitungNilai(t: number, uts: number, uas: number) {
  return Math.round((t * 0.3 + uts * 0.3 + uas * 0.4) * 10) / 10;
}
export function toLetter(n: number) {
  if (n >= 90) return "A";
  if (n >= 80) return "B";
  if (n >= 70) return "C";
  if (n >= 60) return "D";
  return "E";
}

// Skill: 5 aspek penilaian
export const aspekSkill = ["Pronunciation", "Fluency", "Vocabulary", "Content", "Confidence"];

export const nilaiSkill = {
  English: [85, 80, 82, 78, 84],
  Arabic: [88, 86, 90, 85, 87],
  Indonesia: [92, 90, 88, 91, 93],
};

// Tren tahunan
export const trenNilai = [
  { tahun: "2020/2021", rataRata: 75 },
  { tahun: "2021/2022", rataRata: 78 },
  { tahun: "2022/2023", rataRata: 80 },
  { tahun: "2023/2024", rataRata: 82 },
  { tahun: "2024/2025", rataRata: 85 },
];

// Ranking per rombel
export const rankingRombel = [
  { nama: "Ahmad Fauzi", rombel: "4A", nilai: 88 },
  { nama: "Muhammad Rizki", rombel: "4A", nilai: 85 },
  { nama: "Abdullah Hakim", rombel: "4A", nilai: 83 },
  { nama: "Yusuf Ibrahim", rombel: "4B", nilai: 87 },
  { nama: "Khalid Anwar", rombel: "3A", nilai: 84 },
];

export const kehadiran = {
  schoolDays: 120,
  present: 115,
  permission: 3,
  absent: 2,
};
