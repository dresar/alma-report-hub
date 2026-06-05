import { createServerFn } from "@tanstack/react-start";
import { getDb, verifyToken } from "./_db";

// ── Get report card data for a student ────────────────────────────────
export const getReportCardFn = createServerFn()
  .inputValidator((data: { token: string; studentId: string; academicYearId: string }) => data)
  .handler(async ({ data }) => {
    const sql = getDb();
    verifyToken(data.token);

    const students = await sql`SELECT * FROM students WHERE id = ${data.studentId}`;
    if (students.length === 0) throw new Error("Santri tidak ditemukan");
    const student = { ...students[0] };

    const years = await sql`SELECT * FROM academic_years WHERE id = ${data.academicYearId}`;
    const academicYear = years[0] ? { ...years[0] } : null;

    const placement = await sql`
      SELECT r.id as rombel_id, r.name as rombel_name, c.level as class_level, u.name as wali_kelas_name
      FROM student_rombels sr
      JOIN rombels r ON r.id = sr.rombel_id
      JOIN classes c ON c.id = r.class_id
      LEFT JOIN users u ON u.id = r.wali_kelas_id
      WHERE sr.student_id = ${data.studentId} AND sr.academic_year_id = ${data.academicYearId}
      LIMIT 1
    `;
    const place = placement[0] ? { ...placement[0] } : null;

    const subjectScoresRaw = await sql`
      SELECT ss.*, s.name as subject_name, s.sort_order
      FROM subject_scores ss
      JOIN subjects s ON s.id = ss.subject_id
      WHERE ss.student_id = ${data.studentId} AND ss.academic_year_id = ${data.academicYearId}
      ORDER BY s.sort_order, s.name
    `;
    const subjectScores = subjectScoresRaw.map(r => ({ ...r }));

    const speechScoresRaw = await sql`
      SELECT * FROM speech_scores
      WHERE student_id = ${data.studentId} AND academic_year_id = ${data.academicYearId}
      ORDER BY language
    `;
    const speechScores = speechScoresRaw.map(r => ({ ...r }));

    const computerScoreRaw = await sql`
      SELECT * FROM computer_scores WHERE student_id = ${data.studentId} AND academic_year_id = ${data.academicYearId} LIMIT 1
    `;
    const compScore = computerScoreRaw[0] ? { ...computerScoreRaw[0] } : null;

    const discussionScoreRaw = await sql`
      SELECT * FROM discussion_scores WHERE student_id = ${data.studentId} AND academic_year_id = ${data.academicYearId} LIMIT 1
    `;
    const discScore = discussionScoreRaw[0] ? { ...discussionScoreRaw[0] } : null;

    const attendanceRaw = await sql`
      SELECT * FROM attendance WHERE student_id = ${data.studentId} AND academic_year_id = ${data.academicYearId} LIMIT 1
    `;
    const att = attendanceRaw[0] ? { ...attendanceRaw[0] } : null;

    // Skill aspect configs (untuk label dinamis di rapor)
    let skillAspects: any[] = [];
    try {
      const skillAspectsRaw = await sql`
        SELECT * FROM skill_aspect_configs
        WHERE is_active = true
        ORDER BY skill_type, sort_order
      `;
      skillAspects = skillAspectsRaw.map(r => ({ ...r }));
    } catch {
      // Tabel belum ada (DB lama) — fallback ke empty, rapor akan pakai label default
    }

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
      const foundRank = rankRows.find((r) => r.student_id === data.studentId);
      ranking = foundRank ? { ...foundRank } : null;
    }

    return {
      student,
      academicYear,
      placement: place,
      subjectScores,
      speechScores,
      computerScore: compScore,
      discussionScore: discScore,
      attendance: att,
      skillAspects,
      ranking,
    };
  });


// ── List students for report ────────────────────────────────────────────
export const getReportStudentsFn = createServerFn()
  .inputValidator((data: { token: string; academicYearId: string; rombelId?: string; classLevel?: number }) => data)
  .handler(async ({ data }) => {
    const sql = getDb();
    verifyToken(data.token);
    const rows = await sql`
      SELECT s.id, s.full_name, s.stambuk, r.name as rombel_name, c.level as class_level
      FROM students s
      JOIN student_rombels sr ON sr.student_id = s.id AND sr.academic_year_id = ${data.academicYearId}
      JOIN rombels r ON r.id = sr.rombel_id
      JOIN classes c ON c.id = r.class_id
      WHERE (${data.rombelId || null}::uuid IS NULL OR r.id = ${data.rombelId || null})
        AND (${data.classLevel ?? null}::int IS NULL OR c.level = ${data.classLevel ?? null})
      ORDER BY c.level, r.name, s.full_name
    `;
    return rows.map(r => ({ ...r }));
  });
