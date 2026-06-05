import { createServerFn } from "@tanstack/react-start";
import { getDb, verifyToken } from "./_db";

export type StudentQuery = {
  token: string;
  academicYearId?: string;
  classLevel?: number;
  rombelId?: string;
  status?: string;
  q?: string;
  page?: number;
  limit?: number;
};

// ── List students ──────────────────────────────────────────────────────
export const getStudentsFn = createServerFn()
  .inputValidator((data: StudentQuery) => data)
  .handler(async ({ data }) => {
    const sql = getDb();
    verifyToken(data.token);

    const parsedPage = data.page ?? 1;
    const parsedLimit = data.limit ?? 999999;
    const offset = (parsedPage - 1) * parsedLimit;

    if (data.academicYearId || data.classLevel !== undefined || data.rombelId) {
      const rows = await sql`
        SELECT s.*, r.id as rombel_id, r.name as rombel_name, c.level as class_level,
               ay.year as academic_year, COUNT(*) OVER() as full_count
        FROM students s
        JOIN student_rombels sr ON sr.student_id = s.id
        JOIN rombels r ON r.id = sr.rombel_id
        JOIN classes c ON c.id = r.class_id
        JOIN academic_years ay ON ay.id = sr.academic_year_id
        WHERE (${data.academicYearId || null}::uuid IS NULL OR ay.id = ${data.academicYearId || null})
          AND (${data.classLevel ?? null}::int IS NULL OR c.level = ${data.classLevel ?? null})
          AND (${data.rombelId || null}::uuid IS NULL OR r.id = ${data.rombelId || null})
          AND (${data.status || null}::text IS NULL OR s.status = ${data.status || null})
          AND (${data.q || null}::text IS NULL
               OR s.full_name ILIKE ${"%" + (data.q || "") + "%"}
               OR s.stambuk ILIKE ${"%" + (data.q || "") + "%"})
        ORDER BY c.level, r.name, s.full_name
        LIMIT ${parsedLimit} OFFSET ${offset}
      `;
      const totalCount = rows.length > 0 ? parseInt(String(rows[0].full_count)) : 0;
      return { data: rows.map(r => ({ ...r })), total: totalCount, page: parsedPage, limit: parsedLimit };
    }

    const rows = await sql`
      SELECT *, COUNT(*) OVER() as full_count FROM students
      WHERE (${data.status || null}::text IS NULL OR status = ${data.status || null})
        AND (${data.q || null}::text IS NULL
             OR full_name ILIKE ${"%" + (data.q || "") + "%"}
             OR stambuk ILIKE ${"%" + (data.q || "") + "%"})
      ORDER BY full_name
      LIMIT ${parsedLimit} OFFSET ${offset}
    `;
    const totalCount = rows.length > 0 ? parseInt(String(rows[0].full_count)) : 0;
    return { data: rows.map(r => ({ ...r })), total: totalCount, page: parsedPage, limit: parsedLimit };
  });

// ── Get single student ─────────────────────────────────────────────────
export const getStudentFn = createServerFn()
  .inputValidator((data: { token: string; studentId: string }) => data)
  .handler(async ({ data }) => {
    const sql = getDb();
    verifyToken(data.token);
    const students = await sql`SELECT * FROM students WHERE id = ${data.studentId}`;
    if (students.length === 0) throw new Error("Santri tidak ditemukan");
    const history = await sql`
      SELECT sr.id, ay.year, c.level as class_level, r.name as rombel_name, r.id as rombel_id
      FROM student_rombels sr
      JOIN academic_years ay ON ay.id = sr.academic_year_id
      JOIN rombels r ON r.id = sr.rombel_id
      JOIN classes c ON c.id = r.class_id
      WHERE sr.student_id = ${data.studentId}
      ORDER BY ay.year DESC
    `;
    return {
      id: students[0].id as string,
      stambuk: students[0].stambuk as string,
      full_name: students[0].full_name as string,
      gender: students[0].gender as string,
      birth_place: students[0].birth_place as string | null,
      birth_date: students[0].birth_date as string | null,
      parent_name: students[0].parent_name as string | null,
      address: students[0].address as string | null,
      entry_year: students[0].entry_year as string | null,
      status: students[0].status as string,
      created_at: students[0].created_at as string,
      history: history.map(r => ({
        id: r.id as string,
        year: r.year as string,
        class_level: r.class_level as number,
        rombel_name: r.rombel_name as string,
        rombel_id: r.rombel_id as string,
      })),
    };
  });

// ── Create student ─────────────────────────────────────────────────────
export const createStudentFn = createServerFn()
  .inputValidator((data: {
    token: string;
    stambuk: string;
    fullName: string;
    gender: string;
    birthPlace?: string;
    birthDate?: string;
    parentName?: string;
    address?: string;
    entryYear?: string;
    status?: string;
    rombelId?: string;
    academicYearId?: string;
  }) => data)
  .handler(async ({ data }) => {
    const sql = getDb();
    verifyToken(data.token);
    const rows = await sql`
      INSERT INTO students (stambuk, full_name, gender, birth_place, birth_date, parent_name, address, entry_year, status)
      VALUES (${data.stambuk}, ${data.fullName}, ${data.gender}, ${data.birthPlace || null},
              ${data.birthDate || null}, ${data.parentName || null}, ${data.address || null},
              ${data.entryYear || null}, ${data.status || "Aktif"})
      RETURNING *
    `;
    const student = rows[0];
    if (data.rombelId && data.academicYearId) {
      await sql`
        INSERT INTO student_rombels (student_id, rombel_id, academic_year_id)
        VALUES (${student.id}, ${data.rombelId}, ${data.academicYearId})
        ON CONFLICT (student_id, academic_year_id) DO UPDATE SET rombel_id = EXCLUDED.rombel_id
      `;
    }
    return student ? { ...student } : null;
  });

// ── Update student ─────────────────────────────────────────────────────
export const updateStudentFn = createServerFn()
  .inputValidator((data: {
    token: string;
    studentId: string;
    stambuk?: string;
    fullName?: string;
    gender?: string;
    birthPlace?: string;
    birthDate?: string;
    parentName?: string;
    address?: string;
    entryYear?: string;
    status?: string;
  }) => data)
  .handler(async ({ data }) => {
    const sql = getDb();
    verifyToken(data.token);
    const rows = await sql`
      UPDATE students SET
        stambuk     = COALESCE(${data.stambuk || null}, stambuk),
        full_name   = COALESCE(${data.fullName || null}, full_name),
        gender      = COALESCE(${data.gender || null}, gender),
        birth_place = COALESCE(${data.birthPlace || null}, birth_place),
        birth_date  = COALESCE(${data.birthDate || null}::date, birth_date),
        parent_name = COALESCE(${data.parentName || null}, parent_name),
        address     = COALESCE(${data.address || null}, address),
        entry_year  = COALESCE(${data.entryYear || null}, entry_year),
        status      = COALESCE(${data.status || null}, status)
      WHERE id = ${data.studentId}
      RETURNING *
    `;
    return rows[0] ? { ...rows[0] } : null;
  });

// ── Delete student ─────────────────────────────────────────────────────
export const deleteStudentFn = createServerFn()
  .inputValidator((data: { token: string; studentId: string }) => data)
  .handler(async ({ data }) => {
    const sql = getDb();
    const me = verifyToken(data.token);
    if (me.role !== "admin") throw new Error("Tidak punya akses");
    await sql`DELETE FROM students WHERE id = ${data.studentId}`;
    return { success: true };
  });

// ── Bulk delete students ───────────────────────────────────────────────
export const bulkDeleteStudentsFn = createServerFn()
  .inputValidator((data: { token: string; studentIds: string[] }) => data)
  .handler(async ({ data }) => {
    const sql = getDb();
    const me = verifyToken(data.token);
    if (me.role !== "admin") throw new Error("Tidak punya akses");
    if (!data.studentIds || data.studentIds.length === 0) return { success: true };
    await sql`DELETE FROM students WHERE id = ANY(${data.studentIds})`;
    return { success: true };
  });

// ── Assign rombel to student ───────────────────────────────────────────
export const assignRombelFn = createServerFn()
  .inputValidator((data: { token: string; studentId: string; rombelId: string; academicYearId: string }) => data)
  .handler(async ({ data }) => {
    const sql = getDb();
    verifyToken(data.token);
    const rows = await sql`
      INSERT INTO student_rombels (student_id, rombel_id, academic_year_id)
      VALUES (${data.studentId}, ${data.rombelId}, ${data.academicYearId})
      ON CONFLICT (student_id, academic_year_id) DO UPDATE SET rombel_id = EXCLUDED.rombel_id
      RETURNING *
    `;
    return rows[0];
  });
