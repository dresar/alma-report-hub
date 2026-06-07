import { createServerFn } from "@tanstack/react-start";
import { getDb, verifyToken } from "./_db";

// ── Subject scores ─────────────────────────────────────────────────────
export const getSubjectScoresFn = createServerFn()
  .inputValidator((data: { token: string; academicYearId: string; rombelId: string }) => data)
  .handler(async ({ data }) => {
    const sql = getDb();
    verifyToken(data.token);
    const students = await sql`
      SELECT s.id, s.full_name, s.stambuk FROM students s
      JOIN student_rombels sr ON sr.student_id = s.id
      WHERE sr.rombel_id = ${data.rombelId} AND sr.academic_year_id = ${data.academicYearId}
      ORDER BY s.full_name
    `;
    const subjects = await sql`
      SELECT s.* FROM subjects s
      JOIN rombels r ON r.id = ${data.rombelId}
      JOIN classes c ON c.id = r.class_id AND c.level = s.class_level
      WHERE s.is_active = true ORDER BY s.sort_order, s.name
    `;
    const scores = await sql`
      SELECT * FROM subject_scores
      WHERE academic_year_id = ${data.academicYearId} AND student_id = ANY(${students.map((s) => s.id)})
    `;
    return {
      students: students.map(r => ({ ...r })),
      subjects: subjects.map(r => ({ ...r })),
      scores: scores.map(r => ({ ...r })),
    };
  });

export const saveSubjectScoresFn = createServerFn({ method: "POST" })
  .inputValidator((data: {
    token: string;
    academicYearId: string;
    // "ujian" adalah gabungan UTS+UAS — disimpan ke kolom uts, uas selalu null
    scores: Array<{ studentId: string; subjectId: string; tugas?: number | null; ujian?: number | null }>;
  }) => data)
  .handler(async ({ data }) => {
    const sql = getDb();
    verifyToken(data.token);

    // Batch: fetch all needed subjects in one query
    const subjectIds = [...new Set(data.scores.map((s) => s.subjectId))];
    const subjects = subjectIds.length > 0
      ? await sql`SELECT id, bobot_tugas, bobot_uts, bobot_uas FROM subjects WHERE id = ANY(${subjectIds})`
      : [];
    const subjectMap = new Map(subjects.map(s => [s.id, s]));

    for (const score of data.scores) {
      const subj = subjectMap.get(score.subjectId);
      if (!subj) continue;
      const tugasVal = score.tugas ?? 0;
      // ujian menggantikan UTS+UAS — bobotnya adalah gabungan keduanya
      const ujianVal = score.ujian ?? 0;
      const bobotUjian = Number(subj.bobot_uts) + Number(subj.bobot_uas);
      const finalScore = Math.round((tugasVal * Number(subj.bobot_tugas) + ujianVal * bobotUjian) * 10) / 10;
      const tugas = score.tugas ?? null;
      const ujian = score.ujian ?? null; // disimpan ke kolom uts
      await sql`
        INSERT INTO subject_scores (student_id, subject_id, academic_year_id, tugas, uts, uas, final_score, updated_at)
        VALUES (${score.studentId}, ${score.subjectId}, ${data.academicYearId}, ${tugas}, ${ujian}, ${null}, ${finalScore}, now())
        ON CONFLICT (student_id, subject_id, academic_year_id) DO UPDATE
          SET tugas = EXCLUDED.tugas, uts = EXCLUDED.uts, uas = EXCLUDED.uas,
              final_score = EXCLUDED.final_score, updated_at = now()
      `;
    }
    for (const sid of subjectIds) {
      await sql`
        UPDATE subject_scores ss SET class_avg = (
          SELECT ROUND(AVG(final_score)::numeric, 2) FROM subject_scores
          WHERE subject_id = ${sid} AND academic_year_id = ${data.academicYearId} AND final_score IS NOT NULL
        ) WHERE subject_id = ${sid} AND academic_year_id = ${data.academicYearId}
      `;
    }
    return { success: true };
  });

// ── Speech scores ──────────────────────────────────────────────────────
export const getSpeechScoresFn = createServerFn()
  .inputValidator((data: { token: string; academicYearId: string; rombelId: string }) => data)
  .handler(async ({ data }) => {
    const sql = getDb();
    verifyToken(data.token);
    const students = await sql`
      SELECT s.id, s.full_name, s.stambuk FROM students s
      JOIN student_rombels sr ON sr.student_id = s.id
      WHERE sr.rombel_id = ${data.rombelId} AND sr.academic_year_id = ${data.academicYearId}
      ORDER BY s.full_name
    `;
    const scores = await sql`
      SELECT * FROM speech_scores
      WHERE academic_year_id = ${data.academicYearId} AND student_id = ANY(${students.map((s) => s.id)})
      ORDER BY language
    `;
    return {
      students: students.map(r => ({ ...r })),
      scores: scores.map(r => ({ ...r })),
    };
  });

export const saveSpeechScoresFn = createServerFn({ method: "POST" })
  .inputValidator((data: {
    token: string;
    academicYearId: string;
    scores: Array<{ studentId: string; language: string; [key: string]: any }>;
  }) => data)
  .handler(async ({ data }) => {
    const sql = getDb();
    verifyToken(data.token);

    const aspects = await sql`SELECT aspect_key FROM skill_aspect_configs WHERE skill_type = 'speech' AND is_active = true`;
    const aspectKeys = aspects.map(a => String(a.aspect_key));

    for (const s of data.scores) {
      let sum = 0;
      const values: Record<string, any> = {};
      
      for (const key of aspectKeys) {
        const val = s[key];
        values[key] = val ?? null;
        sum += Number(val ?? 0);
      }
      
      const finalScore = aspectKeys.length > 0 ? Math.round((sum / aspectKeys.length) * 10) / 10 : 0;
      
      const obj = {
        student_id: s.studentId,
        academic_year_id: data.academicYearId,
        language: s.language,
        final_score: finalScore,
        updated_at: new Date(),
        ...values
      };

      await sql`
        INSERT INTO speech_scores ${sql(obj)}
        ON CONFLICT (student_id, academic_year_id, language) DO UPDATE SET
        final_score = EXCLUDED.final_score, updated_at = EXCLUDED.updated_at
        ${aspectKeys.length > 0 ? sql.unsafe(", " + aspectKeys.map(k => `${k} = EXCLUDED.${k}`).join(", ")) : sql.unsafe("")}
      `;
    }
    return { success: true };
  });

// ── Computer scores ────────────────────────────────────────────────────
export const getComputerScoresFn = createServerFn()
  .inputValidator((data: { token: string; academicYearId: string; rombelId: string }) => data)
  .handler(async ({ data }) => {
    const sql = getDb();
    verifyToken(data.token);
    const students = await sql`
      SELECT s.id, s.full_name, s.stambuk FROM students s
      JOIN student_rombels sr ON sr.student_id = s.id
      WHERE sr.rombel_id = ${data.rombelId} AND sr.academic_year_id = ${data.academicYearId}
      ORDER BY s.full_name
    `;
    const scores = await sql`
      SELECT * FROM computer_scores
      WHERE academic_year_id = ${data.academicYearId} AND student_id = ANY(${students.map((s) => s.id)})
    `;
    return {
      students: students.map(r => ({ ...r })),
      scores: scores.map(r => ({ ...r })),
    };
  });

export const saveComputerScoresFn = createServerFn({ method: "POST" })
  .inputValidator((data: {
    token: string;
    academicYearId: string;
    scores: Array<{ studentId: string; [key: string]: any }>;
  }) => data)
  .handler(async ({ data }) => {
    const sql = getDb();
    verifyToken(data.token);

    const aspects = await sql`SELECT aspect_key FROM skill_aspect_configs WHERE skill_type = 'computer' AND is_active = true`;
    const aspectKeys = aspects.map(a => String(a.aspect_key));

    for (const s of data.scores) {
      let sum = 0;
      const values: Record<string, any> = {};
      
      for (const key of aspectKeys) {
        const val = s[key];
        values[key] = val ?? null;
        sum += Number(val ?? 0);
      }
      
      const finalScore = aspectKeys.length > 0 ? Math.round((sum / aspectKeys.length) * 10) / 10 : 0;
      
      const obj = {
        student_id: s.studentId,
        academic_year_id: data.academicYearId,
        final_score: finalScore,
        updated_at: new Date(),
        ...values
      };

      await sql`
        INSERT INTO computer_scores ${sql(obj)}
        ON CONFLICT (student_id, academic_year_id) DO UPDATE SET
        final_score = EXCLUDED.final_score, updated_at = EXCLUDED.updated_at
        ${aspectKeys.length > 0 ? sql.unsafe(", " + aspectKeys.map(k => `${k} = EXCLUDED.${k}`).join(", ")) : sql.unsafe("")}
      `;
    }
    return { success: true };
  });

// ── Discussion scores ──────────────────────────────────────────────────
export const getDiscussionScoresFn = createServerFn()
  .inputValidator((data: { token: string; academicYearId: string; rombelId: string }) => data)
  .handler(async ({ data }) => {
    const sql = getDb();
    verifyToken(data.token);
    const students = await sql`
      SELECT s.id, s.full_name, s.stambuk FROM students s
      JOIN student_rombels sr ON sr.student_id = s.id
      WHERE sr.rombel_id = ${data.rombelId} AND sr.academic_year_id = ${data.academicYearId}
      ORDER BY s.full_name
    `;
    const scores = await sql`
      SELECT * FROM discussion_scores
      WHERE academic_year_id = ${data.academicYearId} AND student_id = ANY(${students.map((s) => s.id)})
    `;
    return {
      students: students.map(r => ({ ...r })),
      scores: scores.map(r => ({ ...r })),
    };
  });

export const saveDiscussionScoresFn = createServerFn({ method: "POST" })
  .inputValidator((data: {
    token: string;
    academicYearId: string;
    scores: Array<{ studentId: string; [key: string]: any }>;
  }) => data)
  .handler(async ({ data }) => {
    const sql = getDb();
    verifyToken(data.token);

    const aspects = await sql`SELECT aspect_key FROM skill_aspect_configs WHERE skill_type = 'discussion' AND is_active = true`;
    const aspectKeys = aspects.map(a => String(a.aspect_key));

    for (const s of data.scores) {
      let sum = 0;
      const values: Record<string, any> = {};
      
      for (const key of aspectKeys) {
        const val = s[key];
        values[key] = val ?? null;
        sum += Number(val ?? 0);
      }
      
      const finalScore = aspectKeys.length > 0 ? Math.round((sum / aspectKeys.length) * 10) / 10 : 0;
      
      const obj = {
        student_id: s.studentId,
        academic_year_id: data.academicYearId,
        final_score: finalScore,
        updated_at: new Date(),
        ...values
      };

      await sql`
        INSERT INTO discussion_scores ${sql(obj)}
        ON CONFLICT (student_id, academic_year_id) DO UPDATE SET
        final_score = EXCLUDED.final_score, updated_at = EXCLUDED.updated_at
        ${aspectKeys.length > 0 ? sql.unsafe(", " + aspectKeys.map(k => `${k} = EXCLUDED.${k}`).join(", ")) : sql.unsafe("")}
      `;
    }
    return { success: true };
  });

// ── Attendance ─────────────────────────────────────────────────────────
export const getAttendanceFn = createServerFn()
  .inputValidator((data: { token: string; academicYearId: string; rombelId: string }) => data)
  .handler(async ({ data }) => {
    const sql = getDb();
    verifyToken(data.token);
    const students = await sql`
      SELECT s.id, s.full_name, s.stambuk FROM students s
      JOIN student_rombels sr ON sr.student_id = s.id
      WHERE sr.rombel_id = ${data.rombelId} AND sr.academic_year_id = ${data.academicYearId}
      ORDER BY s.full_name
    `;
    const attendance = await sql`
      SELECT * FROM attendance
      WHERE academic_year_id = ${data.academicYearId} AND student_id = ANY(${students.map((s) => s.id)})
    `;
    return {
      students: students.map(r => ({ ...r })),
      attendance: attendance.map(r => ({ ...r })),
    };
  });

export const saveAttendanceFn = createServerFn({ method: "POST" })
  .inputValidator((data: {
    token: string;
    academicYearId: string;
    attendance: Array<{ studentId: string; schoolDays?: number; present?: number; permission?: number; absent?: number }>;
  }) => data)
  .handler(async ({ data }) => {
    const sql = getDb();
    verifyToken(data.token);
    for (const a of data.attendance) {
      const schoolDays = a.schoolDays ?? null;
      const present = a.present ?? null;
      const permission = a.permission ?? null;
      const absent = a.absent ?? null;
      await sql`
        INSERT INTO attendance (student_id, academic_year_id, school_days, present, permission, absent, updated_at)
        VALUES (${a.studentId}, ${data.academicYearId}, ${schoolDays}, ${present}, ${permission}, ${absent}, now())
        ON CONFLICT (student_id, academic_year_id) DO UPDATE
          SET school_days = EXCLUDED.school_days, present = EXCLUDED.present,
              permission = EXCLUDED.permission, absent = EXCLUDED.absent, updated_at = now()
      `;
    }
    return { success: true };
  });
