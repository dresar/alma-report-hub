import { createServerFn } from "@tanstack/react-start";
import { getDb, verifyToken } from "./_db";
import * as XLSX from "xlsx";

export const exportExcelTemplateFn = createServerFn()
  .inputValidator((data: { token: string; academicYearId: string; classLevel: number }) => data)
  .handler(async ({ data }) => {
    const sql = getDb();
    verifyToken(data.token);

    const { classLevel, academicYearId } = data;

    // 1. Ambil data santri per tingkat kelas
    const students = await sql`
      SELECT s.id, s.stambuk, s.full_name, r.name as rombel_name
      FROM students s
      JOIN student_rombels sr ON sr.student_id = s.id
      JOIN rombels r ON r.id = sr.rombel_id
      WHERE sr.academic_year_id = ${academicYearId}
        AND r.class_level = ${classLevel}
      ORDER BY r.name, s.full_name
    `;

    if (students.length === 0) {
      throw new Error("Tidak ada santri di kelas ini");
    }

    // 2. Ambil data mapel untuk tingkat kelas tersebut
    const subjects = await sql`
      SELECT id, name FROM subjects
      WHERE is_active = true AND class_level = ${classLevel}
      ORDER BY sort_order, name
    `;

    // 3. Ambil data skill aspect labels (menggunakan label_en agar konsisten)
    const skillAspects = await sql`
      SELECT skill_type, aspect_key, label_en
      FROM skill_aspect_configs
    `;
    const speechAspects = skillAspects.filter(a => a.skill_type === 'speech');
    const computerAspects = skillAspects.filter(a => a.skill_type === 'computer');
    const discussionAspects = skillAspects.filter(a => a.skill_type === 'discussion');

    // 4. Ambil nilai existing (supaya jika di-download ulang, nilainya tidak kosong)
    const studentIds = students.map((s) => s.id);
    const subjectScores = await sql`SELECT * FROM subject_scores WHERE academic_year_id = ${academicYearId} AND student_id = ANY(${studentIds})`;
    const speechScores = await sql`SELECT * FROM speech_scores WHERE academic_year_id = ${academicYearId} AND student_id = ANY(${studentIds})`;
    const computerScores = classLevel >= 4 ? await sql`SELECT * FROM computer_scores WHERE academic_year_id = ${academicYearId} AND student_id = ANY(${studentIds})` : [];
    const discussionScores = classLevel >= 5 ? await sql`SELECT * FROM discussion_scores WHERE academic_year_id = ${academicYearId} AND student_id = ANY(${studentIds})` : [];
    const attendances = await sql`SELECT * FROM attendances WHERE academic_year_id = ${academicYearId} AND student_id = ANY(${studentIds})`;

    const wb = XLSX.utils.book_new();

    // ── SHEET 1: AKADEMIK ──────────────────────────────────────────────
    const akademikRows = students.map((student) => {
      const row: any = {
        ID_SANTRI: student.id,
        STAMBUK: student.stambuk,
        NAMA: student.full_name,
        ROMBEL: student.rombel_name,
      };
      
      for (const subj of subjects) {
        const score = subjectScores.find(ss => ss.student_id === student.id && ss.subject_id === subj.id);
        row[`${subj.name} [Tugas]`] = score?.tugas != null ? Number(score.tugas) : "";
        row[`${subj.name} [Ujian]`] = score?.uts != null ? Number(score.uts) : ""; // kita simpan ujian di kolom uts
      }
      return row;
    });
    const wsAkademik = XLSX.utils.json_to_sheet(akademikRows);
    XLSX.utils.book_append_sheet(wb, wsAkademik, "Akademik");

    // ── SHEET 2: PIDATO ────────────────────────────────────────────────
    const speechLanguages = ["Indonesia", "Arab", "Inggris"];
    const pidatoRows = students.map((student) => {
      const row: any = {
        ID_SANTRI: student.id,
        STAMBUK: student.stambuk,
        NAMA: student.full_name,
        ROMBEL: student.rombel_name,
      };
      for (const lang of speechLanguages) {
        const score = speechScores.find(ss => ss.student_id === student.id && ss.language === lang);
        for (const aspect of speechAspects) {
          row[`${lang} - ${aspect.label_en}`] = score?.[aspect.aspect_key] != null ? Number(score[aspect.aspect_key]) : "";
        }
      }
      return row;
    });
    const wsPidato = XLSX.utils.json_to_sheet(pidatoRows);
    XLSX.utils.book_append_sheet(wb, wsPidato, "Pidato");

    // ── SHEET 3: KOMPUTER (Hanya Kelas 4 & 5) ──────────────────────────
    if (classLevel >= 4) {
      const computerRows = students.map((student) => {
        const row: any = {
          ID_SANTRI: student.id,
          STAMBUK: student.stambuk,
          NAMA: student.full_name,
          ROMBEL: student.rombel_name,
        };
        const score = computerScores.find(ss => ss.student_id === student.id);
        for (const aspect of computerAspects) {
          row[`${aspect.label_en}`] = score?.[aspect.aspect_key] != null ? Number(score[aspect.aspect_key]) : "";
        }
        return row;
      });
      const wsComputer = XLSX.utils.json_to_sheet(computerRows);
      XLSX.utils.book_append_sheet(wb, wsComputer, "Komputer");
    }

    // ── SHEET 4: DISKUSI (Hanya Kelas 5) ───────────────────────────────
    if (classLevel >= 5) {
      const discussionRows = students.map((student) => {
        const row: any = {
          ID_SANTRI: student.id,
          STAMBUK: student.stambuk,
          NAMA: student.full_name,
          ROMBEL: student.rombel_name,
        };
        const score = discussionScores.find(ss => ss.student_id === student.id);
        for (const aspect of discussionAspects) {
          row[`${aspect.label_en}`] = score?.[aspect.aspect_key] != null ? Number(score[aspect.aspect_key]) : "";
        }
        return row;
      });
      const wsDiscussion = XLSX.utils.json_to_sheet(discussionRows);
      XLSX.utils.book_append_sheet(wb, wsDiscussion, "Diskusi");
    }

    // ── SHEET 5: KEHADIRAN ─────────────────────────────────────────────
    const kehadiranRows = students.map((student) => {
      const score = attendances.find(ss => ss.student_id === student.id);
      return {
        ID_SANTRI: student.id,
        STAMBUK: student.stambuk,
        NAMA: student.full_name,
        ROMBEL: student.rombel_name,
        Hadir: score?.present != null ? Number(score.present) : "",
        Sakit: score?.sick != null ? Number(score.sick) : "",
        Izin: score?.permission != null ? Number(score.permission) : "",
        Alpa: score?.absent != null ? Number(score.absent) : "",
      };
    });
    const wsKehadiran = XLSX.utils.json_to_sheet(kehadiranRows);
    XLSX.utils.book_append_sheet(wb, wsKehadiran, "Kehadiran");

    // Convert to base64
    const b64 = XLSX.write(wb, { type: "base64", bookType: "xlsx" });

    return { base64: b64, filename: `Template_Nilai_Kelas_${classLevel}_${academicYearId}.xlsx` };
  });

export const importExcelScoresFn = createServerFn()
  .inputValidator((data: { token: string; academicYearId: string; classLevel: number; base64: string }) => data)
  .handler(async ({ data }) => {
    const sql = getDb();
    verifyToken(data.token);

    const { academicYearId, classLevel, base64 } = data;

    // 1. Parse Excel dari base64
    const wb = XLSX.read(base64, { type: "base64" });

    // 2. Ambil referensi mapel dan aspek untuk pencocokan kolom
    const subjects = await sql`SELECT id, name FROM subjects WHERE is_active = true AND class_level = ${classLevel}`;
    const skillAspects = await sql`SELECT skill_type, aspect_key, label_en FROM skill_aspect_configs`;
    
    // --- IMPORT AKADEMIK ---
    const wsAkademik = wb.Sheets["Akademik"];
    if (wsAkademik) {
      const rows = XLSX.utils.sheet_to_json<any>(wsAkademik);
      for (const row of rows) {
        const studentId = row.ID_SANTRI;
        if (!studentId) continue;

        for (const subj of subjects) {
          const colTugas = `${subj.name} [Tugas]`;
          const colUjian = `${subj.name} [Ujian]`;
          
          if (row.hasOwnProperty(colTugas) || row.hasOwnProperty(colUjian)) {
            const rawTugas = row[colTugas];
            const rawUjian = row[colUjian];
            
            const tugas = (rawTugas !== "" && rawTugas != null) ? Number(rawTugas) : null;
            const ujian = (rawUjian !== "" && rawUjian != null) ? Number(rawUjian) : null;

            if (tugas !== null || ujian !== null) {
              // Kita hitung final_score di db trigger atau secara manual
              const subjData = await sql`SELECT bobot_tugas, bobot_uts, bobot_uas FROM subjects WHERE id = ${subj.id}`;
              const bobotTugas = Number(subjData[0].bobot_tugas);
              const bobotUjian = Number(subjData[0].bobot_uts) + Number(subjData[0].bobot_uas);
              const finalScore = Math.round(((tugas ?? 0) * bobotTugas + (ujian ?? 0) * bobotUjian) * 10) / 10;

              await sql`
                INSERT INTO subject_scores (student_id, subject_id, academic_year_id, tugas, uts, uas, final_score, updated_at)
                VALUES (${studentId}, ${subj.id}, ${academicYearId}, ${tugas}, ${ujian}, null, ${finalScore}, now())
                ON CONFLICT (student_id, subject_id, academic_year_id) DO UPDATE
                  SET tugas = EXCLUDED.tugas, uts = EXCLUDED.uts, uas = EXCLUDED.uas,
                      final_score = EXCLUDED.final_score, updated_at = now()
              `;
            }
          }
        }
      }
    }

    // --- IMPORT PIDATO ---
    const wsPidato = wb.Sheets["Pidato"];
    if (wsPidato) {
      const rows = XLSX.utils.sheet_to_json<any>(wsPidato);
      const aspects = skillAspects.filter(a => a.skill_type === 'speech');
      const langs = ["Indonesia", "Arab", "Inggris"];

      for (const row of rows) {
        const studentId = row.ID_SANTRI;
        if (!studentId) continue;

        for (const lang of langs) {
          const updateData: Record<string, any> = {};
          let hasData = false;
          let totalScore = 0;
          let validAspects = 0;

          for (const aspect of aspects) {
            const colName = `${lang} - ${aspect.label_en}`;
            if (row.hasOwnProperty(colName)) {
              const val = row[colName];
              if (val !== "" && val != null) {
                updateData[aspect.aspect_key] = Number(val);
                totalScore += Number(val);
                validAspects++;
                hasData = true;
              }
            }
          }

          if (hasData) {
            const finalScore = validAspects > 0 ? Math.round((totalScore / aspects.length) * 10) / 10 : 0;
            
            // Build dynamic update query using sql builder
            const keys = Object.keys(updateData);
            const vals = Object.values(updateData);
            
            if (keys.length > 0) {
              // UPSERT speech_scores
              // Since dynamic insert is tricky with sql`` tag directly without a helper, 
              // we can select existing row, merge, and upsert.
              const existing = await sql`SELECT * FROM speech_scores WHERE student_id=${studentId} AND academic_year_id=${academicYearId} AND language=${lang}`;
              
              if (existing.length === 0) {
                 await sql`
                   INSERT INTO speech_scores (student_id, academic_year_id, language, final_score)
                   VALUES (${studentId}, ${academicYearId}, ${lang}, ${finalScore})
                 `;
              }
              
              // update dynamic columns
              for (const k of keys) {
                await sql.unsafe(`UPDATE speech_scores SET ${k} = $1 WHERE student_id = $2 AND academic_year_id = $3 AND language = $4`, [updateData[k], studentId, academicYearId, lang]);
              }
              // update final score
              await sql`UPDATE speech_scores SET final_score = ${finalScore} WHERE student_id = ${studentId} AND academic_year_id = ${academicYearId} AND language = ${lang}`;
            }
          }
        }
      }
    }

    // --- IMPORT KOMPUTER ---
    const wsComputer = wb.Sheets["Komputer"];
    if (wsComputer && classLevel >= 4) {
      const rows = XLSX.utils.sheet_to_json<any>(wsComputer);
      const aspects = skillAspects.filter(a => a.skill_type === 'computer');

      for (const row of rows) {
        const studentId = row.ID_SANTRI;
        if (!studentId) continue;

        const updateData: Record<string, any> = {};
        let hasData = false;
        let totalScore = 0;

        for (const aspect of aspects) {
          const colName = aspect.label_en;
          if (row.hasOwnProperty(colName)) {
            const val = row[colName];
            if (val !== "" && val != null) {
              updateData[aspect.aspect_key] = Number(val);
              totalScore += Number(val);
              hasData = true;
            }
          }
        }

        if (hasData) {
          const finalScore = Math.round((totalScore / aspects.length) * 10) / 10;
          const existing = await sql`SELECT id FROM computer_scores WHERE student_id=${studentId} AND academic_year_id=${academicYearId}`;
          if (existing.length === 0) {
             await sql`INSERT INTO computer_scores (student_id, academic_year_id, final_score) VALUES (${studentId}, ${academicYearId}, ${finalScore})`;
          }
          for (const k of Object.keys(updateData)) {
            await sql.unsafe(`UPDATE computer_scores SET ${k} = $1 WHERE student_id = $2 AND academic_year_id = $3`, [updateData[k], studentId, academicYearId]);
          }
          await sql`UPDATE computer_scores SET final_score = ${finalScore} WHERE student_id = ${studentId} AND academic_year_id = ${academicYearId}`;
        }
      }
    }

    // --- IMPORT DISKUSI ---
    const wsDiscussion = wb.Sheets["Diskusi"];
    if (wsDiscussion && classLevel >= 5) {
      const rows = XLSX.utils.sheet_to_json<any>(wsDiscussion);
      const aspects = skillAspects.filter(a => a.skill_type === 'discussion');

      for (const row of rows) {
        const studentId = row.ID_SANTRI;
        if (!studentId) continue;

        const updateData: Record<string, any> = {};
        let hasData = false;
        let totalScore = 0;

        for (const aspect of aspects) {
          const colName = aspect.label_en;
          if (row.hasOwnProperty(colName)) {
            const val = row[colName];
            if (val !== "" && val != null) {
              updateData[aspect.aspect_key] = Number(val);
              totalScore += Number(val);
              hasData = true;
            }
          }
        }

        if (hasData) {
          const finalScore = Math.round((totalScore / aspects.length) * 10) / 10;
          const existing = await sql`SELECT id FROM discussion_scores WHERE student_id=${studentId} AND academic_year_id=${academicYearId}`;
          if (existing.length === 0) {
             await sql`INSERT INTO discussion_scores (student_id, academic_year_id, final_score) VALUES (${studentId}, ${academicYearId}, ${finalScore})`;
          }
          for (const k of Object.keys(updateData)) {
            await sql.unsafe(`UPDATE discussion_scores SET ${k} = $1 WHERE student_id = $2 AND academic_year_id = $3`, [updateData[k], studentId, academicYearId]);
          }
          await sql`UPDATE discussion_scores SET final_score = ${finalScore} WHERE student_id = ${studentId} AND academic_year_id = ${academicYearId}`;
        }
      }
    }

    // --- IMPORT KEHADIRAN ---
    const wsKehadiran = wb.Sheets["Kehadiran"];
    if (wsKehadiran) {
      const rows = XLSX.utils.sheet_to_json<any>(wsKehadiran);
      for (const row of rows) {
        const studentId = row.ID_SANTRI;
        if (!studentId) continue;
        
        const hadir = row.Hadir != null && row.Hadir !== "" ? Number(row.Hadir) : null;
        const sakit = row.Sakit != null && row.Sakit !== "" ? Number(row.Sakit) : null;
        const izin = row.Izin != null && row.Izin !== "" ? Number(row.Izin) : null;
        const alpa = row.Alpa != null && row.Alpa !== "" ? Number(row.Alpa) : null;
        
        const sum = (sakit??0) + (izin??0) + (alpa??0);
        const present = hadir ?? (100 - sum); // Fallback atau kalkulasi standar jika tidak diisi.
        
        if (hadir !== null || sakit !== null || izin !== null || alpa !== null) {
          await sql`
            INSERT INTO attendances (student_id, academic_year_id, school_days, present, sick, permission, absent)
            VALUES (${studentId}, ${academicYearId}, 100, ${present}, ${sakit??0}, ${izin??0}, ${alpa??0})
            ON CONFLICT (student_id, academic_year_id) DO UPDATE
              SET present = EXCLUDED.present, sick = EXCLUDED.sick,
                  permission = EXCLUDED.permission, absent = EXCLUDED.absent
          `;
        }
      }
    }

    // 3. Update class average untuk subject_scores
    const classAvgSubjects = await sql`SELECT id FROM subjects WHERE is_active = true AND class_level = ${classLevel}`;
    for (const sid of classAvgSubjects) {
      await sql`
        UPDATE subject_scores ss SET class_avg = (
          SELECT ROUND(AVG(final_score)::numeric, 2) FROM subject_scores
          WHERE subject_id = ${sid.id} AND academic_year_id = ${academicYearId} AND final_score IS NOT NULL
        ) WHERE subject_id = ${sid.id} AND academic_year_id = ${academicYearId}
      `;
    }

    return { success: true };
  });
