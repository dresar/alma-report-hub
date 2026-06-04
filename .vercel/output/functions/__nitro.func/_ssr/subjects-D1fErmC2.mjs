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
const getSubjectsFn_createServerFn_handler = createServerRpc({
  id: "38b1e7145c4f4ccf24e7929555d3c40bba0594e51cb868ffeaaccfec57c00987",
  name: "getSubjectsFn",
  filename: "src/api/subjects.ts"
}, (opts) => getSubjectsFn.__executeServer(opts));
const getSubjectsFn = createServerFn().validator((data) => data).handler(getSubjectsFn_createServerFn_handler, async ({
  data
}) => {
  const sql = getDb();
  if (data.classLevel !== void 0) {
    return await sql`
        SELECT * FROM subjects
        WHERE class_level = ${data.classLevel} AND is_active = true
        ORDER BY sort_order, name
      `;
  }
  return await sql`SELECT * FROM subjects WHERE is_active = true ORDER BY class_level, sort_order, name`;
});
const createSubjectFn_createServerFn_handler = createServerRpc({
  id: "aece1b4106b8589059d9d6b49a1d7589878e13766766209cce51f7aa5c911735",
  name: "createSubjectFn",
  filename: "src/api/subjects.ts"
}, (opts) => createSubjectFn.__executeServer(opts));
const createSubjectFn = createServerFn().validator((data) => data).handler(createSubjectFn_createServerFn_handler, async ({
  data
}) => {
  const sql = getDb();
  const me = verifyToken(data.token);
  if (me.role !== "admin") throw new Error("Tidak punya akses");
  const rows = await sql`
      INSERT INTO subjects (name, class_level, bobot_tugas, bobot_uts, bobot_uas, sort_order)
      VALUES (${data.name}, ${data.classLevel}, ${data.bobotTugas}, ${data.bobotUts}, ${data.bobotUas}, ${data.sortOrder})
      RETURNING *
    `;
  return rows[0];
});
const updateSubjectFn_createServerFn_handler = createServerRpc({
  id: "1b94285088d192c8f7b0bc0a637b6477d2d8c54fd78da463e7b12260d3016f3e",
  name: "updateSubjectFn",
  filename: "src/api/subjects.ts"
}, (opts) => updateSubjectFn.__executeServer(opts));
const updateSubjectFn = createServerFn().validator((data) => data).handler(updateSubjectFn_createServerFn_handler, async ({
  data
}) => {
  const sql = getDb();
  const me = verifyToken(data.token);
  if (me.role !== "admin") throw new Error("Tidak punya akses");
  const updates = [];
  const values = [];
  if (data.name !== void 0) {
    updates.push("name");
    values.push(data.name);
  }
  if (data.bobotTugas !== void 0) {
    updates.push("bobot_tugas");
    values.push(data.bobotTugas);
  }
  if (data.bobotUts !== void 0) {
    updates.push("bobot_uts");
    values.push(data.bobotUts);
  }
  if (data.bobotUas !== void 0) {
    updates.push("bobot_uas");
    values.push(data.bobotUas);
  }
  if (data.sortOrder !== void 0) {
    updates.push("sort_order");
    values.push(data.sortOrder);
  }
  if (data.isActive !== void 0) {
    updates.push("is_active");
    values.push(data.isActive);
  }
  if (updates.length === 0) throw new Error("Tidak ada field yang diupdate");
  const setClauses = updates.map((col, i) => `${col} = $${i + 1}`).join(", ");
  values.push(data.subjectId);
  const rows = await sql.unsafe(`UPDATE subjects SET ${setClauses} WHERE id = $${values.length} RETURNING *`, values);
  return rows[0];
});
const deleteSubjectFn_createServerFn_handler = createServerRpc({
  id: "5933a61ab511e82b12da3ce9c5121484fe0d4559b228edcb87f8b1485bec8c46",
  name: "deleteSubjectFn",
  filename: "src/api/subjects.ts"
}, (opts) => deleteSubjectFn.__executeServer(opts));
const deleteSubjectFn = createServerFn().validator((data) => data).handler(deleteSubjectFn_createServerFn_handler, async ({
  data
}) => {
  const sql = getDb();
  const me = verifyToken(data.token);
  if (me.role !== "admin") throw new Error("Tidak punya akses");
  await sql`UPDATE subjects SET is_active = false WHERE id = ${data.subjectId}`;
  return {
    success: true
  };
});
export {
  createSubjectFn_createServerFn_handler,
  deleteSubjectFn_createServerFn_handler,
  getSubjectsFn_createServerFn_handler,
  updateSubjectFn_createServerFn_handler
};
