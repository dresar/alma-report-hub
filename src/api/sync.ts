import { createServerFn } from "@tanstack/react-start";
import { getDb, verifyToken } from "./_db";

export const getSyncDataFn = createServerFn()
  .inputValidator((data: { token: string }) => data)
  .handler(async ({ data }) => {
    const sql = getDb();
    verifyToken(data.token);

    // Fetch all master data and transaction data in parallel or sequentially.
    // Since postgres.js supports pipelining, doing it sequentially is also fast, 
    // but Promise.all is better.
    
    // Ensure skill aspects table exists
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

    const [
      academicYears,
      classes,
      rombels,
      subjects,
      skillAspects,
      students,
      studentRombels,
      subjectScores,
      speechScores,
      computerScores,
      discussionScores,
      attendance
    ] = await Promise.all([
      sql`SELECT * FROM academic_years ORDER BY start_date DESC`,
      sql`SELECT * FROM classes ORDER BY level, name`,
      sql`SELECT * FROM rombels`,
      sql`SELECT * FROM subjects ORDER BY sort_order, name`,
      sql`SELECT * FROM skill_aspect_configs ORDER BY skill_type, sort_order, aspect_key`,
      sql`SELECT * FROM students`,
      sql`SELECT * FROM student_rombels`,
      sql`SELECT * FROM subject_scores`,
      sql`SELECT * FROM speech_scores`,
      sql`SELECT * FROM computer_scores`,
      sql`SELECT * FROM discussion_scores`,
      sql`SELECT * FROM attendance`
    ]);

    return {
      academicYears: academicYears.map(r => ({ ...r })),
      classes: classes.map(r => ({ ...r })),
      rombels: rombels.map(r => ({ ...r })),
      subjects: subjects.map(r => ({ ...r })),
      skillAspects: skillAspects.map(r => ({ ...r })),
      students: students.map(r => ({ ...r })),
      studentRombels: studentRombels.map(r => ({ ...r })),
      subjectScores: subjectScores.map(r => ({ ...r })),
      speechScores: speechScores.map(r => ({ ...r })),
      computerScores: computerScores.map(r => ({ ...r })),
      discussionScores: discussionScores.map(r => ({ ...r })),
      attendance: attendance.map(r => ({ ...r })),
    };
  });
