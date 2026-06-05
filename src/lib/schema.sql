-- SIRA (Sistem Informasi Rapor Santri)
-- Schema PostgreSQL for Neon Database

-- ─────────────────────────────────────────────────────────────
-- 1. USERS (Admin, Wali Kelas, Guru)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  email       TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role        TEXT NOT NULL DEFAULT 'guru' CHECK (role IN ('admin','wali_kelas','guru')),
  is_active   BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─────────────────────────────────────────────────────────────
-- 2. TAHUN AJARAN
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS academic_years (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  year        TEXT NOT NULL,              -- e.g. "2025/2026"
  semester    SMALLINT NOT NULL DEFAULT 1 CHECK (semester IN (1, 2)), -- 1 = Ganjil/Ula, 2 = Genap/Tsaniyah
  is_active   BOOLEAN NOT NULL DEFAULT false,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (year, semester)
);

-- ─────────────────────────────────────────────────────────────
-- 3. KELAS (tingkat 1-5)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS classes (
  id    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  level SMALLINT UNIQUE NOT NULL CHECK (level BETWEEN 1 AND 5)
);

-- ─────────────────────────────────────────────────────────────
-- 4. ROMBEL (maks 4 per kelas: A, B, C, D)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS rombels (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id   UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  name       TEXT NOT NULL CHECK (name IN ('A','B','C','D')),
  wali_kelas_id UUID REFERENCES users(id) ON DELETE SET NULL,
  UNIQUE (class_id, name)
);

-- ─────────────────────────────────────────────────────────────
-- 5. SUBJECTS (Mata Pelajaran per kelas)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS subjects (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name         TEXT NOT NULL,
  class_level  SMALLINT NOT NULL CHECK (class_level BETWEEN 1 AND 5),
  bobot_tugas  NUMERIC(4,2) NOT NULL DEFAULT 0.30,
  bobot_uts    NUMERIC(4,2) NOT NULL DEFAULT 0.30,
  bobot_uas    NUMERIC(4,2) NOT NULL DEFAULT 0.40,
  is_active    BOOLEAN NOT NULL DEFAULT true,
  sort_order   SMALLINT NOT NULL DEFAULT 0,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (name, class_level)
);

-- ─────────────────────────────────────────────────────────────
-- 6. STUDENTS (Data Santri)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS students (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stambuk      TEXT UNIQUE NOT NULL,
  full_name    TEXT NOT NULL,
  gender       TEXT NOT NULL CHECK (gender IN ('L','P')),
  birth_place  TEXT,
  birth_date   DATE,
  parent_name  TEXT,
  address      TEXT,
  entry_year   TEXT,
  status       TEXT NOT NULL DEFAULT 'Aktif' CHECK (status IN ('Aktif','Alumni','Pindah')),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─────────────────────────────────────────────────────────────
-- 7. STUDENT ROMBEL (riwayat penempatan per tahun ajaran)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS student_rombels (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id       UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  rombel_id        UUID NOT NULL REFERENCES rombels(id) ON DELETE CASCADE,
  academic_year_id UUID NOT NULL REFERENCES academic_years(id) ON DELETE CASCADE,
  UNIQUE (student_id, academic_year_id)
);

-- ─────────────────────────────────────────────────────────────
-- 8. SUBJECT SCORES (Nilai Akademik)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS subject_scores (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id       UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  subject_id       UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  academic_year_id UUID NOT NULL REFERENCES academic_years(id) ON DELETE CASCADE,
  tugas            NUMERIC(5,2),
  uts              NUMERIC(5,2),
  uas              NUMERIC(5,2),
  final_score      NUMERIC(5,2),
  class_avg        NUMERIC(5,2),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (student_id, subject_id, academic_year_id)
);

-- ─────────────────────────────────────────────────────────────
-- 9. SPEECH SCORES (Nilai Pidato 3 Bahasa — Kelas 1-5)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS speech_scores (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id       UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  academic_year_id UUID NOT NULL REFERENCES academic_years(id) ON DELETE CASCADE,
  language         TEXT NOT NULL CHECK (language IN ('Indonesia','Arab','Inggris')),
  penguasaan       NUMERIC(5,2),
  kelancaran       NUMERIC(5,2),
  intonasi         NUMERIC(5,2),
  kepercayaan      NUMERIC(5,2),
  penampilan       NUMERIC(5,2),
  final_score      NUMERIC(5,2),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (student_id, academic_year_id, language)
);

-- ─────────────────────────────────────────────────────────────
-- 10. COMPUTER SCORES (Nilai Praktik Komputer — Kelas 4-5)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS computer_scores (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id       UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  academic_year_id UUID NOT NULL REFERENCES academic_years(id) ON DELETE CASCADE,
  pengoperasian    NUMERIC(5,2),
  ms_word          NUMERIC(5,2),
  ms_excel         NUMERIC(5,2),
  internet         NUMERIC(5,2),
  presentasi       NUMERIC(5,2),
  final_score      NUMERIC(5,2),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (student_id, academic_year_id)
);

-- ─────────────────────────────────────────────────────────────
-- 11. DISCUSSION SCORES (Nilai Diskusi — Kelas 5)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS discussion_scores (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id       UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  academic_year_id UUID NOT NULL REFERENCES academic_years(id) ON DELETE CASCADE,
  keaktifan        NUMERIC(5,2),
  argumentasi      NUMERIC(5,2),
  kerjasama        NUMERIC(5,2),
  penguasaan       NUMERIC(5,2),
  etika            NUMERIC(5,2),
  final_score      NUMERIC(5,2),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (student_id, academic_year_id)
);

-- ─────────────────────────────────────────────────────────────
-- 12. ATTENDANCE (Kehadiran)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS attendance (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id       UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  academic_year_id UUID NOT NULL REFERENCES academic_years(id) ON DELETE CASCADE,
  school_days      SMALLINT NOT NULL DEFAULT 0,
  present          SMALLINT NOT NULL DEFAULT 0,
  permission       SMALLINT NOT NULL DEFAULT 0,
  absent           SMALLINT NOT NULL DEFAULT 0,
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (student_id, academic_year_id)
);

-- ─────────────────────────────────────────────────────────────
-- 13. SKILL ASPECT CONFIGS (Konfigurasi Aspek Penilaian Skill)
-- Admin dapat mengubah label aspek tanpa mengubah kode
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS skill_aspect_configs (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  skill_type  TEXT NOT NULL CHECK (skill_type IN ('speech','computer','discussion')),
  aspect_key  TEXT NOT NULL,   -- kolom di tabel skor, e.g. "penguasaan", "ms_word"
  label_id    TEXT NOT NULL,   -- label Bahasa Indonesia
  label_en    TEXT NOT NULL,   -- label Bahasa Inggris (untuk rapor)
  sort_order  SMALLINT NOT NULL DEFAULT 0,
  is_active   BOOLEAN NOT NULL DEFAULT true,
  UNIQUE (skill_type, aspect_key)
);

-- ─────────────────────────────────────────────────────────────
-- SEED DATA
-- ─────────────────────────────────────────────────────────────

-- Kelas 1-5
INSERT INTO classes (level) VALUES (1),(2),(3),(4),(5)
ON CONFLICT (level) DO NOTHING;

-- Rombel default (A untuk semua kelas)
INSERT INTO rombels (class_id, name)
SELECT c.id, r.name
FROM classes c
CROSS JOIN (VALUES ('A'),('B')) r(name)
ON CONFLICT (class_id, name) DO NOTHING;

-- Tahun ajaran
INSERT INTO academic_years (year, semester, is_active) VALUES
  ('2023/2024', 1, false),
  ('2023/2024', 2, false),
  ('2024/2025', 1, false),
  ('2024/2025', 2, false),
  ('2025/2026', 1, true)
ON CONFLICT (year, semester) DO NOTHING;

-- Admin default (password: admin123)
INSERT INTO users (name, email, password_hash, role) VALUES
  ('Administrator', 'admin@sira.sch.id',
   '$2b$10$P0EzqsaY.Bu/zrxKeZlRKuvIMIJ5u9roBzCpTJe0br.NbZIJ2jxiy',
   'admin')
ON CONFLICT (email) DO NOTHING;

-- Mata Pelajaran default per kelas
INSERT INTO subjects (name, class_level, sort_order) VALUES
  -- Kelas 1 (5 mapel)
  ('Al-Qur''an',      1, 1),
  ('Hadits',          1, 2),
  ('Fiqih',           1, 3),
  ('Bahasa Arab',     1, 4),
  ('Matematika',      1, 5),
  -- Kelas 2 (5 mapel)
  ('Al-Qur''an',      2, 1),
  ('Hadits',          2, 2),
  ('Fiqih',           2, 3),
  ('Bahasa Arab',     2, 4),
  ('Matematika',      2, 5),
  -- Kelas 3 (5 mapel)
  ('Al-Qur''an',      3, 1),
  ('Hadits',          3, 2),
  ('Fiqih',           3, 3),
  ('Bahasa Arab',     3, 4),
  ('Bahasa Inggris',  3, 5),
  -- Kelas 4 (4 mapel)
  ('Al-Qur''an',      4, 1),
  ('Fiqih',           4, 2),
  ('Bahasa Arab',     4, 3),
  ('Bahasa Inggris',  4, 4),
  -- Kelas 5 (2 mapel)
  ('Al-Qur''an',      5, 1),
  ('Bahasa Arab',     5, 2)
ON CONFLICT (name, class_level) DO NOTHING;

-- Aspek Penilaian Skill default
INSERT INTO skill_aspect_configs (skill_type, aspect_key, label_id, label_en, sort_order) VALUES
  -- Pidato 3 Bahasa
  ('speech', 'penguasaan',   'Penguasaan Materi',  'Content Mastery',       1),
  ('speech', 'kelancaran',   'Kelancaran',          'Fluency',               2),
  ('speech', 'intonasi',     'Intonasi',            'Intonation',            3),
  ('speech', 'kepercayaan',  'Kepercayaan Diri',    'Self Confidence',       4),
  ('speech', 'penampilan',   'Penampilan',          'Appearance',            5),
  -- Praktik Komputer (Kelas 4 & 5)
  ('computer', 'pengoperasian', 'Pengoperasian Dasar', 'Basic Operation',    1),
  ('computer', 'ms_word',       'Microsoft Word',      'Microsoft Word',     2),
  ('computer', 'ms_excel',      'Microsoft Excel',     'Microsoft Excel',    3),
  ('computer', 'internet',      'Internet',            'Internet',           4),
  ('computer', 'presentasi',    'Presentasi',          'Presentation',       5),
  -- Diskusi (Kelas 4 & 5)
  ('discussion', 'keaktifan',   'Keaktifan',           'Participation',      1),
  ('discussion', 'argumentasi', 'Argumentasi',         'Argumentation',      2),
  ('discussion', 'kerjasama',   'Kerjasama',           'Teamwork',           3),
  ('discussion', 'penguasaan',  'Penguasaan Materi',   'Content Mastery',   4),
  ('discussion', 'etika',       'Etika Diskusi',       'Discussion Ethics',  5)
ON CONFLICT (skill_type, aspect_key) DO NOTHING;
