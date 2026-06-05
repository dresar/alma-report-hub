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

export const saveSubjectScoresFn = createServerFn()
  .inputValidator((data: {
    token: string;
    academicYearId: string;
    // "ujian" adalah gabungan UTS+UAS — disimpan ke kolom uts, uas selalu null
    scores: Array<{ studentId: string; subjectId: string; tugas?: number | null; ujian?: number | null }>;
  }) => data)
  .handler(async ({ data }) => {
    const sql = getDb();
    verifyToken(data.token);
    for (const score of data.scores) {
      const subj = await sql`SELECT bobot_tugas, bobot_uts, bobot_uas FROM subjects WHERE id = ${score.subjectId}`;
      if (subj.length === 0) continue;
      const { bobot_tugas: bt, bobot_uts: bu, bobot_uas: buas } = subj[0];
      const tugasVal = score.tugas ?? 0;
      // ujian menggantikan UTS+UAS — bobotnya adalah gabungan keduanya
      const ujianVal = score.ujian ?? 0;
      const bobotUjian = Number(bu) + Number(buas);
      const finalScore = Math.round((tugasVal * Number(bt) + ujianVal * bobotUjian) * 10) / 10;
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
    const subjectIds = [...new Set(data.scores.map((s) => s.subjectId))];
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

export const saveSpeechScoresFn = createServerFn()
  .inputValidator((data: {
    token: string;
    academicYearId: string;
    scores: Array<{ studentId: string; language: string; penguasaan?: number | null; kelancaran?: number | null; intonasi?: number | null; kepercayaan?: number | null; penampilan?: number | null }>;
  }) => data)
  .handler(async ({ data }) => {
    const sql = getDb();
    verifyToken(data.token);
    for (const s of data.scores) {
      const p = s.penguasaan ?? null;
      const k = s.kelancaran ?? null;
      const i = s.intonasi ?? null;
      const kep = s.kepercayaan ?? null;
      const pen = s.penampilan ?? null;
      const vals = [s.penguasaan ?? 0, s.kelancaran ?? 0, s.intonasi ?? 0, s.kepercayaan ?? 0, s.penampilan ?? 0];
      const finalScore = Math.round((vals.reduce((a, b) => a + b, 0) / 5) * 10) / 10;
      await sql`
        INSERT INTO speech_scores (student_id, academic_year_id, language, penguasaan, kelancaran, intonasi, kepercayaan, penampilan, final_score, updated_at)
        VALUES (${s.studentId}, ${data.academicYearId}, ${s.language}, ${p}, ${k}, ${i}, ${kep}, ${pen}, ${finalScore}, now())
        ON CONFLICT (student_id, academic_year_id, language) DO UPDATE
          SET penguasaan = EXCLUDED.penguasaan, kelancaran = EXCLUDED.kelancaran,
              intonasi = EXCLUDED.intonasi, kepercayaan = EXCLUDED.kepercayaan,
              penampilan = EXCLUDED.penampilan, final_score = EXCLUDED.final_score, updated_at = now()
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

export const saveComputerScoresFn = createServerFn()
  .inputValidator((data: {
    token: string;
    academicYearId: string;
    scores: Array<{ studentId: string; pengoperasian?: number | null; msWord?: number | null; msExcel?: number | null; internet?: number | null; presentasi?: number | null }>;
  }) => data)
  .handler(async ({ data }) => {
    const sql = getDb();
    verifyToken(data.token);
    for (const s of data.scores) {
      const p = s.pengoperasian ?? null;
      const w = s.msWord ?? null;
      const e = s.msExcel ?? null;
      const i = s.internet ?? null;
      const pr = s.presentasi ?? null;
      const vals = [s.pengoperasian ?? 0, s.msWord ?? 0, s.msExcel ?? 0, s.internet ?? 0, s.presentasi ?? 0];
      const finalScore = Math.round((vals.reduce((a, b) => a + b, 0) / 5) * 10) / 10;
      await sql`
        INSERT INTO computer_scores (student_id, academic_year_id, pengoperasian, ms_word, ms_excel, internet, presentasi, final_score, updated_at)
        VALUES (${s.studentId}, ${data.academicYearId}, ${p}, ${w}, ${e}, ${i}, ${pr}, ${finalScore}, now())
        ON CONFLICT (student_id, academic_year_id) DO UPDATE
          SET pengoperasian = EXCLUDED.pengoperasian, ms_word = EXCLUDED.ms_word, ms_excel = EXCLUDED.ms_excel,
              internet = EXCLUDED.internet, presentasi = EXCLUDED.presentasi, final_score = EXCLUDED.final_score, updated_at = now()
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

export const saveDiscussionScoresFn = createServerFn()
  .inputValidator((data: {
    token: string;
    academicYearId: string;
    scores: Array<{ studentId: string; keaktifan?: number | null; argumentasi?: number | null; kerjasama?: number | null; penguasaan?: number | null; etika?: number | null }>;
  }) => data)
  .handler(async ({ data }) => {
    const sql = getDb();
    verifyToken(data.token);
    for (const s of data.scores) {
      const k = s.keaktifan ?? null;
      const a = s.argumentasi ?? null;
      const ks = s.kerjasama ?? null;
      const p = s.penguasaan ?? null;
      const e = s.etika ?? null;
      const vals = [s.keaktifan ?? 0, s.argumentasi ?? 0, s.kerjasama ?? 0, s.penguasaan ?? 0, s.etika ?? 0];
      const finalScore = Math.round((vals.reduce((a, b) => a + b, 0) / 5) * 10) / 10;
      await sql`
        INSERT INTO discussion_scores (student_id, academic_year_id, keaktifan, argumentasi, kerjasama, penguasaan, etika, final_score, updated_at)
        VALUES (${s.studentId}, ${data.academicYearId}, ${k}, ${a}, ${ks}, ${p}, ${e}, ${finalScore}, now())
        ON CONFLICT (student_id, academic_year_id) DO UPDATE
          SET keaktifan = EXCLUDED.keaktifan, argumentasi = EXCLUDED.argumentasi, kerjasama = EXCLUDED.kerjasama,
              penguasaan = EXCLUDED.penguasaan, etika = EXCLUDED.etika, final_score = EXCLUDED.final_score, updated_at = now()
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

export const saveAttendanceFn = createServerFn()
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
