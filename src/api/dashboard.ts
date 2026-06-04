import { createServerFn } from "@tanstack/react-start";
import { getDb, verifyToken } from "./_db";

// ── Dashboard stats ────────────────────────────────────────────────────
export const getDashboardStatsFn = createServerFn()
  .validator((data: { token: string; academicYearId?: string }) => data)
  .handler(async ({ data }) => {
    const sql = getDb();
    verifyToken(data.token);

    let yearId = data.academicYearId;
    if (!yearId) {
      const activeYear = await sql`SELECT id FROM academic_years WHERE is_active = true LIMIT 1`;
      yearId = activeYear[0]?.id;
    }

    const [totalStudents] = await sql`SELECT COUNT(*) as count FROM students WHERE status = 'Aktif'`;
    const [totalClasses] = await sql`SELECT COUNT(*) as count FROM classes`;
    const [totalRombels] = await sql`SELECT COUNT(*) as count FROM rombels`;

    let avgScore = null;
    if (yearId) {
      const [avg] = await sql`
        SELECT ROUND(AVG(final_score)::numeric, 1) as avg
        FROM subject_scores WHERE academic_year_id = ${yearId} AND final_score IS NOT NULL
      `;
      avgScore = avg?.avg;
    }

    return {
      totalStudents: Number(totalStudents.count),
      totalClasses: Number(totalClasses.count),
      totalRombels: Number(totalRombels.count),
      avgScore: avgScore ? Number(avgScore) : null,
    };
  });

// ── Top students ───────────────────────────────────────────────────────
export const getTopStudentsFn = createServerFn()
  .validator((data: { token: string; academicYearId: string; limit?: number }) => data)
  .handler(async ({ data }) => {
    const sql = getDb();
    verifyToken(data.token);
    return await sql`
      SELECT s.id, s.full_name as name, c.level as class_level, r.name as rombel_name,
             CONCAT('Kelas ', c.level, r.name) as kelas_rombel,
             ROUND(AVG(ss.final_score)::numeric, 1) as avg_score
      FROM students s
      JOIN student_rombels sr ON sr.student_id = s.id AND sr.academic_year_id = ${data.academicYearId}
      JOIN rombels r ON r.id = sr.rombel_id
      JOIN classes c ON c.id = r.class_id
      JOIN subject_scores ss ON ss.student_id = s.id AND ss.academic_year_id = ${data.academicYearId}
      WHERE ss.final_score IS NOT NULL
      GROUP BY s.id, s.full_name, c.level, r.name
      ORDER BY avg_score DESC LIMIT ${data.limit || 10}
    `;
  });

// ── Value trend (by year) ──────────────────────────────────────────────
export const getValueTrendFn = createServerFn()
  .validator((data: { token: string }) => data)
  .handler(async ({ data }) => {
    const sql = getDb();
    verifyToken(data.token);
    return await sql`
      SELECT ay.year, ROUND(AVG(ss.final_score)::numeric, 1) as rata_rata
      FROM academic_years ay
      JOIN subject_scores ss ON ss.academic_year_id = ay.id
      WHERE ss.final_score IS NOT NULL GROUP BY ay.year ORDER BY ay.year
    `;
  });

// ── Class ranking ──────────────────────────────────────────────────────
export const getClassRankingFn = createServerFn()
  .validator((data: { token: string; academicYearId: string; classLevel?: number }) => data)
  .handler(async ({ data }) => {
    const sql = getDb();
    verifyToken(data.token);
    return await sql`
      SELECT s.id, s.full_name as name, c.level as class_level, r.name as rombel_name,
             ROUND(AVG(ss.final_score)::numeric, 1) as avg_score,
             RANK() OVER (PARTITION BY c.level, r.id ORDER BY AVG(ss.final_score) DESC) as rank_rombel,
             RANK() OVER (PARTITION BY c.level ORDER BY AVG(ss.final_score) DESC) as rank_kelas
      FROM students s
      JOIN student_rombels sr ON sr.student_id = s.id AND sr.academic_year_id = ${data.academicYearId}
      JOIN rombels r ON r.id = sr.rombel_id
      JOIN classes c ON c.id = r.class_id
      JOIN subject_scores ss ON ss.student_id = s.id AND ss.academic_year_id = ${data.academicYearId}
      WHERE ss.final_score IS NOT NULL
        AND (${data.classLevel ?? null}::int IS NULL OR c.level = ${data.classLevel ?? null})
      GROUP BY s.id, s.full_name, c.level, r.id, r.name
      ORDER BY c.level, r.name, avg_score DESC
    `;
  });
