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
const getClassesFn_createServerFn_handler = createServerRpc({
  id: "435ce2062fe92c765d66f882e26ad481339857b57117cb54a6aba4e0f9662cba",
  name: "getClassesFn",
  filename: "src/api/classes.ts"
}, (opts) => getClassesFn.__executeServer(opts));
const getClassesFn = createServerFn().handler(getClassesFn_createServerFn_handler, async () => {
  const sql = getDb();
  const classes = await sql`SELECT * FROM classes ORDER BY level`;
  const rombels = await sql`
      SELECT r.*, u.name as wali_kelas_name
      FROM rombels r
      LEFT JOIN users u ON u.id = r.wali_kelas_id
      ORDER BY r.name
    `;
  return classes.map((c) => ({
    ...c,
    rombels: rombels.filter((r) => r.class_id === c.id)
  }));
});
const getRombelsFn_createServerFn_handler = createServerRpc({
  id: "3336b8080f8b2a02d6549b7bd359b0c60feb032ed5078f69068814331599336c",
  name: "getRombelsFn",
  filename: "src/api/classes.ts"
}, (opts) => getRombelsFn.__executeServer(opts));
const getRombelsFn = createServerFn().validator((data) => data).handler(getRombelsFn_createServerFn_handler, async ({
  data
}) => {
  const sql = getDb();
  if (data.classLevel !== void 0) {
    return await sql`
        SELECT r.*, c.level as class_level
        FROM rombels r
        JOIN classes c ON c.id = r.class_id
        WHERE c.level = ${data.classLevel}
        ORDER BY r.name
      `;
  }
  return await sql`
      SELECT r.*, c.level as class_level
      FROM rombels r
      JOIN classes c ON c.id = r.class_id
      ORDER BY c.level, r.name
    `;
});
const createRombelFn_createServerFn_handler = createServerRpc({
  id: "231742f70c36c72f4e68314d58b1ab123c34da290259ba948318fc96359efcb4",
  name: "createRombelFn",
  filename: "src/api/classes.ts"
}, (opts) => createRombelFn.__executeServer(opts));
const createRombelFn = createServerFn().validator((data) => data).handler(createRombelFn_createServerFn_handler, async ({
  data
}) => {
  const sql = getDb();
  const me = verifyToken(data.token);
  if (me.role !== "admin") throw new Error("Tidak punya akses");
  const classes = await sql`SELECT id FROM classes WHERE level = ${data.classLevel}`;
  if (classes.length === 0) throw new Error("Kelas tidak ditemukan");
  const rows = await sql`
      INSERT INTO rombels (class_id, name, wali_kelas_id)
      VALUES (${classes[0].id}, ${data.name}, ${data.waliKelasId || null})
      RETURNING *
    `;
  return rows[0];
});
const updateRombelFn_createServerFn_handler = createServerRpc({
  id: "712e2034d3e2a505dca10c4474263f8496d4dda6e757e4b950474755f2d9a38a",
  name: "updateRombelFn",
  filename: "src/api/classes.ts"
}, (opts) => updateRombelFn.__executeServer(opts));
const updateRombelFn = createServerFn().validator((data) => data).handler(updateRombelFn_createServerFn_handler, async ({
  data
}) => {
  const sql = getDb();
  const me = verifyToken(data.token);
  if (me.role !== "admin") throw new Error("Tidak punya akses");
  const rows = await sql`
      UPDATE rombels SET wali_kelas_id = ${data.waliKelasId}
      WHERE id = ${data.rombelId} RETURNING *
    `;
  return rows[0];
});
const deleteRombelFn_createServerFn_handler = createServerRpc({
  id: "4bf6a541f0c481826768b5d6ff4dd2e98f9266b87935027c5f77eafab8ea7036",
  name: "deleteRombelFn",
  filename: "src/api/classes.ts"
}, (opts) => deleteRombelFn.__executeServer(opts));
const deleteRombelFn = createServerFn().validator((data) => data).handler(deleteRombelFn_createServerFn_handler, async ({
  data
}) => {
  const sql = getDb();
  const me = verifyToken(data.token);
  if (me.role !== "admin") throw new Error("Tidak punya akses");
  await sql`DELETE FROM rombels WHERE id = ${data.rombelId}`;
  return {
    success: true
  };
});
export {
  createRombelFn_createServerFn_handler,
  deleteRombelFn_createServerFn_handler,
  getClassesFn_createServerFn_handler,
  getRombelsFn_createServerFn_handler,
  updateRombelFn_createServerFn_handler
};
