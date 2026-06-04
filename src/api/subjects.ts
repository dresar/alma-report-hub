import { createServerFn } from "@tanstack/react-start";
import { getDb, verifyToken } from "./_db";

// ── List subjects ──────────────────────────────────────────────────────
export const getSubjectsFn = createServerFn()
  .validator((data: { classLevel?: number }) => data)
  .handler(async ({ data }) => {
    const sql = getDb();
    if (data.classLevel !== undefined) {
      return await sql`
        SELECT * FROM subjects
        WHERE class_level = ${data.classLevel} AND is_active = true
        ORDER BY sort_order, name
      `;
    }
    return await sql`SELECT * FROM subjects WHERE is_active = true ORDER BY class_level, sort_order, name`;
  });

// ── Create subject ─────────────────────────────────────────────────────
export const createSubjectFn = createServerFn()
  .validator((data: {
    token: string;
    name: string;
    classLevel: number;
    bobotTugas: number;
    bobotUts: number;
    bobotUas: number;
    sortOrder: number;
  }) => data)
  .handler(async ({ data }) => {
    const sql = getDb();
    const me = verifyToken(data.token);
    if (me.role !== "admin") throw new Error("Tidak punya akses");
    const rows = await sql`
      INSERT INTO subjects (name, class_level, bobot_tugas, bobot_uts, bobot_uas, sort_order)
      VALUES (${data.name}, ${data.classLevel}, ${data.bobotTugas}, ${data.bobotUts}, ${data.bobotUas}, ${data.sortOrder})
      RETURNING *
    `;
    return rows[0];
  });

// ── Update subject ─────────────────────────────────────────────────────
export const updateSubjectFn = createServerFn()
  .validator((data: {
    token: string;
    subjectId: string;
    name?: string;
    bobotTugas?: number;
    bobotUts?: number;
    bobotUas?: number;
    sortOrder?: number;
    isActive?: boolean;
  }) => data)
  .handler(async ({ data }) => {
    const sql = getDb();
    const me = verifyToken(data.token);
    if (me.role !== "admin") throw new Error("Tidak punya akses");

    const updates: string[] = [];
    const values: unknown[] = [];

    if (data.name !== undefined) { updates.push("name"); values.push(data.name); }
    if (data.bobotTugas !== undefined) { updates.push("bobot_tugas"); values.push(data.bobotTugas); }
    if (data.bobotUts !== undefined) { updates.push("bobot_uts"); values.push(data.bobotUts); }
    if (data.bobotUas !== undefined) { updates.push("bobot_uas"); values.push(data.bobotUas); }
    if (data.sortOrder !== undefined) { updates.push("sort_order"); values.push(data.sortOrder); }
    if (data.isActive !== undefined) { updates.push("is_active"); values.push(data.isActive); }

    if (updates.length === 0) throw new Error("Tidak ada field yang diupdate");

    const setClauses = updates.map((col, i) => `${col} = $${i + 1}`).join(", ");
    values.push(data.subjectId);
    const rows = await sql.unsafe(
      `UPDATE subjects SET ${setClauses} WHERE id = $${values.length} RETURNING *`,
      values as any[]
    );
    return rows[0];
  });

// ── Delete (soft) subject ──────────────────────────────────────────────
export const deleteSubjectFn = createServerFn()
  .validator((data: { token: string; subjectId: string }) => data)
  .handler(async ({ data }) => {
    const sql = getDb();
    const me = verifyToken(data.token);
    if (me.role !== "admin") throw new Error("Tidak punya akses");
    await sql`UPDATE subjects SET is_active = false WHERE id = ${data.subjectId}`;
    return { success: true };
  });
