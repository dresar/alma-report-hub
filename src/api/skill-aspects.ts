import { createServerFn } from "@tanstack/react-start";
import { getDb, verifyToken } from "./_db";

export interface SkillAspect {
  id: string;
  skill_type: "speech" | "computer" | "discussion";
  aspect_key: string;
  label_id: string;
  label_en: string;
  sort_order: number;
  is_active: boolean;
}

/** Pastikan tabel ada (auto-migrate ringan) */
async function ensureSkillAspectsTable() {
  const sql = getDb();
  await sql`
    CREATE TABLE IF NOT EXISTS skill_aspect_configs (
      id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      skill_type  TEXT NOT NULL CHECK (skill_type IN ('speech','computer','discussion')),
      aspect_key  TEXT NOT NULL,
      label_id    TEXT NOT NULL,
      label_en    TEXT NOT NULL,
      sort_order  SMALLINT NOT NULL DEFAULT 0,
      is_active   BOOLEAN NOT NULL DEFAULT true,
      UNIQUE (skill_type, aspect_key)
    )
  `;
  // Seed default jika tabel baru (tidak ada data)
  const count = await sql`SELECT COUNT(*) as n FROM skill_aspect_configs`;
  if (Number(count[0].n) === 0) {
    await sql`
      INSERT INTO skill_aspect_configs (skill_type, aspect_key, label_id, label_en, sort_order) VALUES
        ('speech', 'penguasaan',      'Penguasaan Materi',  'Content Mastery',      1),
        ('speech', 'kelancaran',      'Kelancaran',          'Fluency',              2),
        ('speech', 'intonasi',        'Intonasi',            'Intonation',           3),
        ('speech', 'kepercayaan',     'Kepercayaan Diri',    'Self Confidence',      4),
        ('speech', 'penampilan',      'Penampilan',          'Appearance',           5),
        ('computer', 'pengoperasian', 'Pengoperasian Dasar', 'Basic Operation',     1),
        ('computer', 'ms_word',       'Microsoft Word',      'Microsoft Word',      2),
        ('computer', 'ms_excel',      'Microsoft Excel',     'Microsoft Excel',     3),
        ('computer', 'internet',      'Internet',            'Internet',            4),
        ('computer', 'presentasi',    'Presentasi',          'Presentation',        5),
        ('discussion', 'keaktifan',   'Keaktifan',           'Participation',       1),
        ('discussion', 'argumentasi', 'Argumentasi',         'Argumentation',       2),
        ('discussion', 'kerjasama',   'Kerjasama',           'Teamwork',            3),
        ('discussion', 'penguasaan',  'Penguasaan Materi',   'Content Mastery',    4),
        ('discussion', 'etika',       'Etika Diskusi',       'Discussion Ethics',   5)
      ON CONFLICT (skill_type, aspect_key) DO NOTHING
    `;
  }
}

// ── Get all skill aspect configs ───────────────────────────────────────
export const getSkillAspectsFn = createServerFn().handler(async () => {
  await ensureSkillAspectsTable();
  const sql = getDb();
  const rows = await sql`
    SELECT * FROM skill_aspect_configs
    ORDER BY skill_type, sort_order, aspect_key
  `;
  return rows as unknown as SkillAspect[];
});

// ── Update label for a skill aspect (admin only) ───────────────────────
export const updateSkillAspectFn = createServerFn()
  .inputValidator(
    (data: {
      token: string;
      id: string;
      labelId?: string;
      labelEn?: string;
      sortOrder?: number;
      isActive?: boolean;
    }) => data
  )
  .handler(async ({ data }) => {
    const sql = getDb();
    const me = verifyToken(data.token);
    if (me.role !== "admin") throw new Error("Tidak punya akses");

    await ensureSkillAspectsTable();

    const updates: string[] = [];
    const values: unknown[] = [];

    if (data.labelId !== undefined) {
      updates.push("label_id");
      values.push(data.labelId);
    }
    if (data.labelEn !== undefined) {
      updates.push("label_en");
      values.push(data.labelEn);
    }
    if (data.sortOrder !== undefined) {
      updates.push("sort_order");
      values.push(data.sortOrder);
    }
    if (data.isActive !== undefined) {
      updates.push("is_active");
      values.push(data.isActive);
    }

    if (updates.length === 0) throw new Error("Tidak ada field yang diupdate");

    const setClauses = updates.map((col, i) => `${col} = $${i + 1}`).join(", ");
    values.push(data.id);

    const rows = await sql.unsafe(
      `UPDATE skill_aspect_configs SET ${setClauses} WHERE id = $${values.length} RETURNING *`,
      values as any[]
    );
    return rows[0] as unknown as SkillAspect;
  });
