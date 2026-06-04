import { createServerFn } from "@tanstack/react-start";
import { getDb, verifyToken } from "./_db";

// ── List academic years ────────────────────────────────────────────────
export const getAcademicYearsFn = createServerFn()
  .handler(async () => {
    const sql = getDb();
    const rows = await sql`SELECT * FROM academic_years ORDER BY year DESC`;
    return rows;
  });

// ── Create academic year ───────────────────────────────────────────────
export const createAcademicYearFn = createServerFn()
  .validator((data: { token: string; year: string }) => data)
  .handler(async ({ data }) => {
    const sql = getDb();
    const me = verifyToken(data.token);
    if (me.role !== "admin") throw new Error("Tidak punya akses");
    const rows = await sql`INSERT INTO academic_years (year) VALUES (${data.year}) RETURNING *`;
    return rows[0];
  });

// ── Set active academic year ───────────────────────────────────────────
export const setActiveAcademicYearFn = createServerFn()
  .validator((data: { token: string; yearId: string }) => data)
  .handler(async ({ data }) => {
    const sql = getDb();
    const me = verifyToken(data.token);
    if (me.role !== "admin") throw new Error("Tidak punya akses");
    await sql`UPDATE academic_years SET is_active = false`;
    await sql`UPDATE academic_years SET is_active = true WHERE id = ${data.yearId}`;
    return { success: true };
  });

// ── Delete academic year ───────────────────────────────────────────────
export const deleteAcademicYearFn = createServerFn()
  .validator((data: { token: string; yearId: string }) => data)
  .handler(async ({ data }) => {
    const sql = getDb();
    const me = verifyToken(data.token);
    if (me.role !== "admin") throw new Error("Tidak punya akses");
    await sql`DELETE FROM academic_years WHERE id = ${data.yearId}`;
    return { success: true };
  });
