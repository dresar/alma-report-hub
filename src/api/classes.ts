import { createServerFn } from "@tanstack/react-start";
import { getDb, verifyToken } from "./_db";

// ── Get all classes with rombels ───────────────────────────────────────
export const getClassesFn = createServerFn()
  .handler(async () => {
    const sql = getDb();
    const classes = await sql`SELECT * FROM classes ORDER BY level`;
    const rombels = await sql`
      SELECT r.*, u.name as wali_kelas_name
      FROM rombels r
      LEFT JOIN users u ON u.id = r.wali_kelas_id
      ORDER BY r.name
    `;
    return classes.map((c) => ({
      id: c.id as string,
      level: c.level as number,
      rombels: rombels
        .filter((r) => r.class_id === c.id)
        .map((r) => ({
          id: r.id as string,
          class_id: r.class_id as string,
          name: r.name as string,
          wali_kelas_id: r.wali_kelas_id as string | null,
          wali_kelas_name: r.wali_kelas_name as string | null,
        })),
    }));
  });

// ── Get rombels (optionally filtered by class level) ───────────────────
export const getRombelsFn = createServerFn()
  .inputValidator((data: { classLevel?: number }) => data)
  .handler(async ({ data }) => {
    const sql = getDb();
    if (data.classLevel !== undefined) {
      const rows = await sql`
        SELECT r.*, c.level as class_level
        FROM rombels r
        JOIN classes c ON c.id = r.class_id
        WHERE c.level = ${data.classLevel}
        ORDER BY r.name
      `;
      return rows.map((r) => ({
        id: r.id as string,
        class_id: r.class_id as string,
        name: r.name as string,
        wali_kelas_id: r.wali_kelas_id as string | null,
        class_level: r.class_level as number,
      }));
    }
    const rows = await sql`
      SELECT r.*, c.level as class_level
      FROM rombels r
      JOIN classes c ON c.id = r.class_id
      ORDER BY c.level, r.name
    `;
    return rows.map((r) => ({
      id: r.id as string,
      class_id: r.class_id as string,
      name: r.name as string,
      wali_kelas_id: r.wali_kelas_id as string | null,
      class_level: r.class_level as number,
    }));
  });

// ── Create rombel ──────────────────────────────────────────────────────
export const createRombelFn = createServerFn()
  .inputValidator((data: { token: string; classLevel: number; name: string; waliKelasId?: string }) => data)
  .handler(async ({ data }) => {
    const sql = getDb();
    const me = verifyToken(data.token);
    if (me.role !== "admin") throw new Error("Tidak punya akses");
    const classes = await sql`SELECT id FROM classes WHERE level = ${data.classLevel}`;
    if (classes.length === 0) throw new Error("Kelas tidak ditemukan");
    const rows = await sql`
      INSERT INTO rombels (class_id, name, wali_kelas_id)
      VALUES (${classes[0].id}, ${data.name}, ${data.waliKelasId || null})
      RETURNING *
    `;
    return rows[0]
      ? {
          id: rows[0].id as string,
          class_id: rows[0].class_id as string,
          name: rows[0].name as string,
          wali_kelas_id: rows[0].wali_kelas_id as string | null,
        }
      : null;
  });

// ── Update rombel ──────────────────────────────────────────────────────
export const updateRombelFn = createServerFn()
  .inputValidator((data: { token: string; rombelId: string; waliKelasId: string | null }) => data)
  .handler(async ({ data }) => {
    const sql = getDb();
    const me = verifyToken(data.token);
    if (me.role !== "admin") throw new Error("Tidak punya akses");
    const rows = await sql`
      UPDATE rombels SET wali_kelas_id = ${data.waliKelasId}
      WHERE id = ${data.rombelId} RETURNING *
    `;
    return rows[0]
      ? {
          id: rows[0].id as string,
          class_id: rows[0].class_id as string,
          name: rows[0].name as string,
          wali_kelas_id: rows[0].wali_kelas_id as string | null,
        }
      : null;
  });

// ── Delete rombel ──────────────────────────────────────────────────────
export const deleteRombelFn = createServerFn()
  .inputValidator((data: { token: string; rombelId: string }) => data)
  .handler(async ({ data }) => {
    const sql = getDb();
    const me = verifyToken(data.token);
    if (me.role !== "admin") throw new Error("Tidak punya akses");
    await sql`DELETE FROM rombels WHERE id = ${data.rombelId}`;
    return { success: true };
  });
