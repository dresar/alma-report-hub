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
const getDashboardStatsFn_createServerFn_handler = createServerRpc({
  id: "878748079e9e832d22022a4dbd5dc08fc9eaa3323bf78b869a875df6aca0b001",
  name: "getDashboardStatsFn",
  filename: "src/api/dashboard.ts"
}, (opts) => getDashboardStatsFn.__executeServer(opts));
const getDashboardStatsFn = createServerFn().validator((data) => data).handler(getDashboardStatsFn_createServerFn_handler, async ({
  data
}) => {
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
    avgScore: avgScore ? Number(avgScore) : null
  };
});
const getTopStudentsFn_createServerFn_handler = createServerRpc({
  id: "d98d23431d158ea0334a5e801b55e51818193bfbe45ad5d308e9027d4b28434b",
  name: "getTopStudentsFn",
  filename: "src/api/dashboard.ts"
}, (opts) => getTopStudentsFn.__executeServer(opts));
const getTopStudentsFn = createServerFn().validator((data) => data).handler(getTopStudentsFn_createServerFn_handler, async ({
  data
}) => {
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
const getValueTrendFn_createServerFn_handler = createServerRpc({
  id: "7b62f31003d29093ec89391258d659611da670a134ffc141e57219f951677f57",
  name: "getValueTrendFn",
  filename: "src/api/dashboard.ts"
}, (opts) => getValueTrendFn.__executeServer(opts));
const getValueTrendFn = createServerFn().validator((data) => data).handler(getValueTrendFn_createServerFn_handler, async ({
  data
}) => {
  const sql = getDb();
  verifyToken(data.token);
  return await sql`
      SELECT ay.year, ROUND(AVG(ss.final_score)::numeric, 1) as rata_rata
      FROM academic_years ay
      JOIN subject_scores ss ON ss.academic_year_id = ay.id
      WHERE ss.final_score IS NOT NULL GROUP BY ay.year ORDER BY ay.year
    `;
});
const getClassRankingFn_createServerFn_handler = createServerRpc({
  id: "c52d88890e9cdeee6d9ddc04253872daea613898ba109398dc8958d0e44cca17",
  name: "getClassRankingFn",
  filename: "src/api/dashboard.ts"
}, (opts) => getClassRankingFn.__executeServer(opts));
const getClassRankingFn = createServerFn().validator((data) => data).handler(getClassRankingFn_createServerFn_handler, async ({
  data
}) => {
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
export {
  getClassRankingFn_createServerFn_handler,
  getDashboardStatsFn_createServerFn_handler,
  getTopStudentsFn_createServerFn_handler,
  getValueTrendFn_createServerFn_handler
};
