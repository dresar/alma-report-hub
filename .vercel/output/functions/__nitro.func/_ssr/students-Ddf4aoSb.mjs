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
const getStudentsFn_createServerFn_handler = createServerRpc({
  id: "56300f58f9fb7e938424ac5ceb1f1083769c8f307dc880a8502761f31f5a8e81",
  name: "getStudentsFn",
  filename: "src/api/students.ts"
}, (opts) => getStudentsFn.__executeServer(opts));
const getStudentsFn = createServerFn().validator((data) => data).handler(getStudentsFn_createServerFn_handler, async ({
  data
}) => {
  const sql = getDb();
  verifyToken(data.token);
  const parsedPage = data.page ?? 1;
  const parsedLimit = data.limit ?? 999999;
  const offset = (parsedPage - 1) * parsedLimit;
  if (data.academicYearId || data.classLevel !== void 0 || data.rombelId) {
    const rows2 = await sql`
        SELECT s.*, r.id as rombel_id, r.name as rombel_name, c.level as class_level,
               ay.year as academic_year, COUNT(*) OVER() as full_count
        FROM students s
        JOIN student_rombels sr ON sr.student_id = s.id
        JOIN rombels r ON r.id = sr.rombel_id
        JOIN classes c ON c.id = r.class_id
        JOIN academic_years ay ON ay.id = sr.academic_year_id
        WHERE (${data.academicYearId || null}::uuid IS NULL OR ay.id = ${data.academicYearId || null})
          AND (${data.classLevel ?? null}::int IS NULL OR c.level = ${data.classLevel ?? null})
          AND (${data.rombelId || null}::uuid IS NULL OR r.id = ${data.rombelId || null})
          AND (${data.status || null}::text IS NULL OR s.status = ${data.status || null})
          AND (${data.q || null}::text IS NULL
               OR s.full_name ILIKE ${"%" + (data.q || "") + "%"}
               OR s.stambuk ILIKE ${"%" + (data.q || "") + "%"})
        ORDER BY c.level, r.name, s.full_name
        LIMIT ${parsedLimit} OFFSET ${offset}
      `;
    const totalCount2 = rows2.length > 0 ? parseInt(String(rows2[0].full_count)) : 0;
    return {
      data: rows2,
      total: totalCount2,
      page: parsedPage,
      limit: parsedLimit
    };
  }
  const rows = await sql`
      SELECT *, COUNT(*) OVER() as full_count FROM students
      WHERE (${data.status || null}::text IS NULL OR status = ${data.status || null})
        AND (${data.q || null}::text IS NULL
             OR full_name ILIKE ${"%" + (data.q || "") + "%"}
             OR stambuk ILIKE ${"%" + (data.q || "") + "%"})
      ORDER BY full_name
      LIMIT ${parsedLimit} OFFSET ${offset}
    `;
  const totalCount = rows.length > 0 ? parseInt(String(rows[0].full_count)) : 0;
  return {
    data: rows,
    total: totalCount,
    page: parsedPage,
    limit: parsedLimit
  };
});
const getStudentFn_createServerFn_handler = createServerRpc({
  id: "2df384382049059de678b08b145b958783927ddc6fd64689d235333acc72123e",
  name: "getStudentFn",
  filename: "src/api/students.ts"
}, (opts) => getStudentFn.__executeServer(opts));
const getStudentFn = createServerFn().validator((data) => data).handler(getStudentFn_createServerFn_handler, async ({
  data
}) => {
  const sql = getDb();
  verifyToken(data.token);
  const students = await sql`SELECT * FROM students WHERE id = ${data.studentId}`;
  if (students.length === 0) throw new Error("Santri tidak ditemukan");
  const history = await sql`
      SELECT sr.id, ay.year, c.level as class_level, r.name as rombel_name, r.id as rombel_id
      FROM student_rombels sr
      JOIN academic_years ay ON ay.id = sr.academic_year_id
      JOIN rombels r ON r.id = sr.rombel_id
      JOIN classes c ON c.id = r.class_id
      WHERE sr.student_id = ${data.studentId}
      ORDER BY ay.year DESC
    `;
  return {
    ...students[0],
    history
  };
});
const createStudentFn_createServerFn_handler = createServerRpc({
  id: "49fe1373250a2b8fa2c6be1fc9c71885412852f45d528bc0c44227082e325608",
  name: "createStudentFn",
  filename: "src/api/students.ts"
}, (opts) => createStudentFn.__executeServer(opts));
const createStudentFn = createServerFn().validator((data) => data).handler(createStudentFn_createServerFn_handler, async ({
  data
}) => {
  const sql = getDb();
  verifyToken(data.token);
  const rows = await sql`
      INSERT INTO students (stambuk, full_name, gender, birth_place, birth_date, parent_name, address, entry_year, status)
      VALUES (${data.stambuk}, ${data.fullName}, ${data.gender}, ${data.birthPlace || null},
              ${data.birthDate || null}, ${data.parentName || null}, ${data.address || null},
              ${data.entryYear || null}, ${data.status || "Aktif"})
      RETURNING *
    `;
  const student = rows[0];
  if (data.rombelId && data.academicYearId) {
    await sql`
        INSERT INTO student_rombels (student_id, rombel_id, academic_year_id)
        VALUES (${student.id}, ${data.rombelId}, ${data.academicYearId})
        ON CONFLICT (student_id, academic_year_id) DO UPDATE SET rombel_id = EXCLUDED.rombel_id
      `;
  }
  return student;
});
const updateStudentFn_createServerFn_handler = createServerRpc({
  id: "4871087c59dcb9d2cd00b3053af05dc2712008d66ae34d8134c13361dafe490e",
  name: "updateStudentFn",
  filename: "src/api/students.ts"
}, (opts) => updateStudentFn.__executeServer(opts));
const updateStudentFn = createServerFn().validator((data) => data).handler(updateStudentFn_createServerFn_handler, async ({
  data
}) => {
  const sql = getDb();
  verifyToken(data.token);
  const rows = await sql`
      UPDATE students SET
        stambuk     = COALESCE(${data.stambuk || null}, stambuk),
        full_name   = COALESCE(${data.fullName || null}, full_name),
        gender      = COALESCE(${data.gender || null}, gender),
        birth_place = COALESCE(${data.birthPlace || null}, birth_place),
        birth_date  = COALESCE(${data.birthDate || null}::date, birth_date),
        parent_name = COALESCE(${data.parentName || null}, parent_name),
        address     = COALESCE(${data.address || null}, address),
        entry_year  = COALESCE(${data.entryYear || null}, entry_year),
        status      = COALESCE(${data.status || null}, status)
      WHERE id = ${data.studentId}
      RETURNING *
    `;
  return rows[0];
});
const deleteStudentFn_createServerFn_handler = createServerRpc({
  id: "c83e26be213224fdaf501b8781170802760503714870bc72c43249cbfa3391e9",
  name: "deleteStudentFn",
  filename: "src/api/students.ts"
}, (opts) => deleteStudentFn.__executeServer(opts));
const deleteStudentFn = createServerFn().validator((data) => data).handler(deleteStudentFn_createServerFn_handler, async ({
  data
}) => {
  const sql = getDb();
  const me = verifyToken(data.token);
  if (me.role !== "admin") throw new Error("Tidak punya akses");
  await sql`DELETE FROM students WHERE id = ${data.studentId}`;
  return {
    success: true
  };
});
const bulkDeleteStudentsFn_createServerFn_handler = createServerRpc({
  id: "f7bfce5ccc4c949250cc58c49844701236f70ad5bb5613d073980d9486284db2",
  name: "bulkDeleteStudentsFn",
  filename: "src/api/students.ts"
}, (opts) => bulkDeleteStudentsFn.__executeServer(opts));
const bulkDeleteStudentsFn = createServerFn().validator((data) => data).handler(bulkDeleteStudentsFn_createServerFn_handler, async ({
  data
}) => {
  const sql = getDb();
  const me = verifyToken(data.token);
  if (me.role !== "admin") throw new Error("Tidak punya akses");
  if (!data.studentIds || data.studentIds.length === 0) return {
    success: true
  };
  await sql`DELETE FROM students WHERE id = ANY(${data.studentIds})`;
  return {
    success: true
  };
});
const assignRombelFn_createServerFn_handler = createServerRpc({
  id: "3246a07ba8483bbbc0a01f2053f0b91a448c60de66255790967befd1e57c29f7",
  name: "assignRombelFn",
  filename: "src/api/students.ts"
}, (opts) => assignRombelFn.__executeServer(opts));
const assignRombelFn = createServerFn().validator((data) => data).handler(assignRombelFn_createServerFn_handler, async ({
  data
}) => {
  const sql = getDb();
  verifyToken(data.token);
  const rows = await sql`
      INSERT INTO student_rombels (student_id, rombel_id, academic_year_id)
      VALUES (${data.studentId}, ${data.rombelId}, ${data.academicYearId})
      ON CONFLICT (student_id, academic_year_id) DO UPDATE SET rombel_id = EXCLUDED.rombel_id
      RETURNING *
    `;
  return rows[0];
});
export {
  assignRombelFn_createServerFn_handler,
  bulkDeleteStudentsFn_createServerFn_handler,
  createStudentFn_createServerFn_handler,
  deleteStudentFn_createServerFn_handler,
  getStudentFn_createServerFn_handler,
  getStudentsFn_createServerFn_handler,
  updateStudentFn_createServerFn_handler
};
