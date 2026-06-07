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

    // Ensure new score tables exist
    await sql`
      CREATE TABLE IF NOT EXISTS speech_scores (
        id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        student_id       UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
        academic_year_id UUID NOT NULL REFERENCES academic_years(id) ON DELETE CASCADE,
        language         TEXT NOT NULL CHECK (language IN ('Indonesia','Arab','Inggris')),
        penguasaan       NUMERIC(5,2),
        kelancaran       NUMERIC(5,2),
        intonasi         NUMERIC(5,2),
        kepercayaan      NUMERIC(5,2),
        penampilan       NUMERIC(5,2),
        final_score      NUMERIC(5,2),
        updated_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
        UNIQUE (student_id, academic_year_id, language)
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS computer_scores (
        id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        student_id       UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
        academic_year_id UUID NOT NULL REFERENCES academic_years(id) ON DELETE CASCADE,
        pengoperasian    NUMERIC(5,2),
        ms_word          NUMERIC(5,2),
        ms_excel         NUMERIC(5,2),
        internet         NUMERIC(5,2),
        presentasi       NUMERIC(5,2),
        final_score      NUMERIC(5,2),
        updated_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
        UNIQUE (student_id, academic_year_id)
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS discussion_scores (
        id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        student_id       UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
        academic_year_id UUID NOT NULL REFERENCES academic_years(id) ON DELETE CASCADE,
        keaktifan        NUMERIC(5,2),
        argumentasi      NUMERIC(5,2),
        kerjasama        NUMERIC(5,2),
        penguasaan       NUMERIC(5,2),
        etika            NUMERIC(5,2),
        final_score      NUMERIC(5,2),
        updated_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
        UNIQUE (student_id, academic_year_id)
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS attendance (
        id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        student_id       UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
        academic_year_id UUID NOT NULL REFERENCES academic_years(id) ON DELETE CASCADE,
        school_days      SMALLINT NOT NULL DEFAULT 0,
        present          SMALLINT NOT NULL DEFAULT 0,
        permission       SMALLINT NOT NULL DEFAULT 0,
        absent           SMALLINT NOT NULL DEFAULT 0,
        updated_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
        UNIQUE (student_id, academic_year_id)
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
      sql`SELECT * FROM academic_years ORDER BY year DESC, semester ASC`,
      sql`SELECT * FROM classes ORDER BY level`,
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
