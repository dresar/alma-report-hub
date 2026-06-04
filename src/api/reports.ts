import { createServerFn } from "@tanstack/react-start";
import { getDb, verifyToken } from "./_db";

// ── Get report card data for a student ────────────────────────────────
export const getReportCardFn = createServerFn()
  .validator((data: { token: string; studentId: string; academicYearId: string }) => data)
  .handler(async ({ data }) => {
    const sql = getDb();
    verifyToken(data.token);

    const students = await sql`SELECT * FROM students WHERE id = ${data.studentId}`;
    if (students.length === 0) throw new Error("Santri tidak ditemukan");
    const student = students[0];

    const years = await sql`SELECT * FROM academic_years WHERE id = ${data.academicYearId}`;
    const academicYear = years[0];

    const placement = await sql`
      SELECT r.id as rombel_id, r.name as rombel_name, c.level as class_level, u.name as wali_kelas_name
      FROM student_rombels sr
      JOIN rombels r ON r.id = sr.rombel_id
      JOIN classes c ON c.id = r.class_id
      LEFT JOIN users u ON u.id = r.wali_kelas_id
      WHERE sr.student_id = ${data.studentId} AND sr.academic_year_id = ${data.academicYearId}
      LIMIT 1
    `;
    const place = placement[0] ?? null;

    const subjectScores = await sql`
      SELECT ss.*, s.name as subject_name, s.sort_order
      FROM subject_scores ss
      JOIN subjects s ON s.id = ss.subject_id
      WHERE ss.student_id = ${data.studentId} AND ss.academic_year_id = ${data.academicYearId}
      ORDER BY s.sort_order, s.name
    `;

    const speechScores = await sql`
      SELECT * FROM speech_scores
      WHERE student_id = ${data.studentId} AND academic_year_id = ${data.academicYearId}
      ORDER BY language
    `;
    const computerScore = await sql`
      SELECT * FROM computer_scores WHERE student_id = ${data.studentId} AND academic_year_id = ${data.academicYearId} LIMIT 1
    `;
    const discussionScore = await sql`
      SELECT * FROM discussion_scores WHERE student_id = ${data.studentId} AND academic_year_id = ${data.academicYearId} LIMIT 1
    `;
    const attendance = await sql`
      SELECT * FROM attendance WHERE student_id = ${data.studentId} AND academic_year_id = ${data.academicYearId} LIMIT 1
    `;

    let ranking = null;
    if (place) {
      const rankRows = await sql`
        SELECT RANK() OVER (PARTITION BY r.id ORDER BY AVG(ss.final_score) DESC) as rank_rombel,
               RANK() OVER (PARTITION BY c.level ORDER BY AVG(ss.final_score) DESC) as rank_kelas,
               COUNT(*) OVER (PARTITION BY r.id) as total_rombel,
               COUNT(*) OVER (PARTITION BY c.level) as total_kelas,
               sr2.student_id
        FROM student_rombels sr2
        JOIN rombels r ON r.id = sr2.rombel_id
        JOIN classes c ON c.id = r.class_id
        LEFT JOIN subject_scores ss ON ss.student_id = sr2.student_id AND ss.academic_year_id = ${data.academicYearId}
        WHERE sr2.academic_year_id = ${data.academicYearId} AND r.id = ${place.rombel_id}
        GROUP BY sr2.student_id, r.id, c.level
      `;
      ranking = rankRows.find((r) => r.student_id === data.studentId) ?? null;
    }

    return {
      student,
      academicYear,
      placement: place,
      subjectScores,
      speechScores,
      computerScore: computerScore[0] ?? null,
      discussionScore: discussionScore[0] ?? null,
      attendance: attendance[0] ?? null,
      ranking,
    };
  });

// ── List students for report ────────────────────────────────────────────
export const getReportStudentsFn = createServerFn()
  .validator((data: { token: string; academicYearId: string; rombelId?: string; classLevel?: number }) => data)
  .handler(async ({ data }) => {
    const sql = getDb();
    verifyToken(data.token);
    return await sql`
      SELECT s.id, s.full_name, s.stambuk, r.name as rombel_name, c.level as class_level
      FROM students s
      JOIN student_rombels sr ON sr.student_id = s.id AND sr.academic_year_id = ${data.academicYearId}
      JOIN rombels r ON r.id = sr.rombel_id
      JOIN classes c ON c.id = r.class_id
      WHERE (${data.rombelId || null}::uuid IS NULL OR r.id = ${data.rombelId || null})
        AND (${data.classLevel ?? null}::int IS NULL OR c.level = ${data.classLevel ?? null})
      ORDER BY c.level, r.name, s.full_name
    `;
  });
