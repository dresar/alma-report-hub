import { c as createServerRpc, g as getDb, v as verifyToken } from "../_db-BNgvd1wE.mjs";
import { b as createServerFn } from "./server-B2xBzUrm.mjs";
import "../_libs/server-only.mjs";
import "../_libs/postgres.mjs";
import "../_libs/jsonwebtoken.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "crypto";
import "stream";
import "../_libs/isbot.mjs";
import "os";
import "fs";
import "net";
import "tls";
import "perf_hooks";
import "../_libs/jws.mjs";
import "../_libs/safe-buffer.mjs";
import "buffer";
import "../_libs/jwa.mjs";
import "../_libs/ecdsa-sig-formatter.mjs";
import "../_libs/buffer-equal-constant-time.mjs";
import "../_libs/ms.mjs";
import "../_libs/semver.mjs";
import "../_libs/lodash.includes.mjs";
import "../_libs/lodash.isboolean.mjs";
import "../_libs/lodash.isinteger.mjs";
import "../_libs/lodash.isnumber.mjs";
import "../_libs/lodash.isplainobject.mjs";
import "../_libs/lodash.isstring.mjs";
import "../_libs/lodash.once.mjs";
const getReportCardFn_createServerFn_handler = createServerRpc({
  id: "02c5b2b7a6bafd8ae75f068a47e31f85f38d0598b728ca196e876ce7b830a76b",
  name: "getReportCardFn",
  filename: "src/api/reports.ts"
}, (opts) => getReportCardFn.__executeServer(opts));
const getReportCardFn = createServerFn().validator((data) => data).handler(getReportCardFn_createServerFn_handler, async ({
  data
}) => {
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
    ranking
  };
});
const getReportStudentsFn_createServerFn_handler = createServerRpc({
  id: "f1829c3ea7c1e27e07b5831819d43408fbbcf70d3e3d1737d7f0e37e36b72350",
  name: "getReportStudentsFn",
  filename: "src/api/reports.ts"
}, (opts) => getReportStudentsFn.__executeServer(opts));
const getReportStudentsFn = createServerFn().validator((data) => data).handler(getReportStudentsFn_createServerFn_handler, async ({
  data
}) => {
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
export {
  getReportCardFn_createServerFn_handler,
  getReportStudentsFn_createServerFn_handler
};
