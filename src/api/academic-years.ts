import { createServerFn } from "@tanstack/react-start";
import { getDb, verifyToken } from "./_db";

// Label semester sesuai tradisi pesantren
export const SEMESTER_LABELS: Record<number, { id: string; en: string }> = {
  1: { id: "Semester Ganjil (Ula)", en: "First Semester" },
  2: { id: "Semester Genap (Tsaniyah)", en: "Second Semester" },
};

// ── List academic years ────────────────────────────────────────────────
export const getAcademicYearsFn = createServerFn()
  .handler(async () => {
    const sql = getDb();
    const rows = await sql`SELECT * FROM academic_years ORDER BY year DESC, semester ASC`;
    return rows;
  });

// ── Create academic year ───────────────────────────────────────────────
export const createAcademicYearFn = createServerFn()
  .inputValidator((data: { token: string; year: string; semester: number }) => data)
  .handler(async ({ data }) => {
    const sql = getDb();
    const me = verifyToken(data.token);
    if (me.role !== "admin") throw new Error("Tidak punya akses");
    if (data.semester !== 1 && data.semester !== 2) throw new Error("Semester harus 1 atau 2");
    const rows = await sql`
      INSERT INTO academic_years (year, semester)
      VALUES (${data.year}, ${data.semester})
      RETURNING *
    `;
    return rows[0];
  });

// ── Set active academic year ───────────────────────────────────────────
export const setActiveAcademicYearFn = createServerFn()
  .inputValidator((data: { token: string; yearId: string }) => data)
  .handler(async ({ data }) => {
    const sql = getDb();
    const me = verifyToken(data.token);
    if (me.role !== "admin") throw new Error("Tidak punya akses");
    await sql`UPDATE academic_years SET is_active = false`;
    await sql`UPDATE academic_years SET is_active = true WHERE id = ${data.yearId}`;
    return { success: true };
  });

// ── Update semester label ──────────────────────────────────────────────
export const updateAcademicYearSemesterFn = createServerFn()
  .inputValidator((data: { token: string; yearId: string; semester: number }) => data)
  .handler(async ({ data }) => {
    const sql = getDb();
    const me = verifyToken(data.token);
    if (me.role !== "admin") throw new Error("Tidak punya akses");
    if (data.semester !== 1 && data.semester !== 2) throw new Error("Semester harus 1 atau 2");
    await sql`UPDATE academic_years SET semester = ${data.semester} WHERE id = ${data.yearId}`;
    return { success: true };
  });

// ── Delete academic year ───────────────────────────────────────────────
export const deleteAcademicYearFn = createServerFn()
  .inputValidator((data: { token: string; yearId: string }) => data)
  .handler(async ({ data }) => {
    const sql = getDb();
    const me = verifyToken(data.token);
    if (me.role !== "admin") throw new Error("Tidak punya akses");
    await sql`DELETE FROM academic_years WHERE id = ${data.yearId}`;
    return { success: true };
  });

// ── Migrate: add semester column if not exists (safe to run multiple times) ──
export const migrateSemesterColumnFn = createServerFn()
  .inputValidator((data: { token: string }) => data)
  .handler(async ({ data }) => {
    const sql = getDb();
    const me = verifyToken(data.token);
    if (me.role !== "admin") throw new Error("Tidak punya akses");
    try {
      await sql`ALTER TABLE academic_years ADD COLUMN IF NOT EXISTS semester SMALLINT NOT NULL DEFAULT 1 CHECK (semester IN (1, 2))`;
      // Hapus unique constraint lama jika ada
      await sql`ALTER TABLE academic_years DROP CONSTRAINT IF EXISTS academic_years_year_key`;
      // Tambah unique constraint baru (year, semester)
      await sql`ALTER TABLE academic_years ADD CONSTRAINT IF NOT EXISTS academic_years_year_semester_key UNIQUE (year, semester)`;
    } catch (e) {
      // Ignore jika sudah ada
    }
    return { success: true };
  });
