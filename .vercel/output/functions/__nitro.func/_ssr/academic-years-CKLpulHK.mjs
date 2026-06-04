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
const getAcademicYearsFn_createServerFn_handler = createServerRpc({
  id: "9611de7b963f3895b1109843b15c9b1fc7ad5ab82990d5af529378907ff0ac82",
  name: "getAcademicYearsFn",
  filename: "src/api/academic-years.ts"
}, (opts) => getAcademicYearsFn.__executeServer(opts));
const getAcademicYearsFn = createServerFn().handler(getAcademicYearsFn_createServerFn_handler, async () => {
  const sql = getDb();
  const rows = await sql`SELECT * FROM academic_years ORDER BY year DESC`;
  return rows;
});
const createAcademicYearFn_createServerFn_handler = createServerRpc({
  id: "9c2a64d59a1f02b6f05e92cc6e77564b5a774827dedcde79adcef70d1e16a5e6",
  name: "createAcademicYearFn",
  filename: "src/api/academic-years.ts"
}, (opts) => createAcademicYearFn.__executeServer(opts));
const createAcademicYearFn = createServerFn().validator((data) => data).handler(createAcademicYearFn_createServerFn_handler, async ({
  data
}) => {
  const sql = getDb();
  const me = verifyToken(data.token);
  if (me.role !== "admin") throw new Error("Tidak punya akses");
  const rows = await sql`INSERT INTO academic_years (year) VALUES (${data.year}) RETURNING *`;
  return rows[0];
});
const setActiveAcademicYearFn_createServerFn_handler = createServerRpc({
  id: "2bdd38139eeca6e30b2a66faa03f46fb49a91c1d064e61a1382ffe970ee69fe4",
  name: "setActiveAcademicYearFn",
  filename: "src/api/academic-years.ts"
}, (opts) => setActiveAcademicYearFn.__executeServer(opts));
const setActiveAcademicYearFn = createServerFn().validator((data) => data).handler(setActiveAcademicYearFn_createServerFn_handler, async ({
  data
}) => {
  const sql = getDb();
  const me = verifyToken(data.token);
  if (me.role !== "admin") throw new Error("Tidak punya akses");
  await sql`UPDATE academic_years SET is_active = false`;
  await sql`UPDATE academic_years SET is_active = true WHERE id = ${data.yearId}`;
  return {
    success: true
  };
});
const deleteAcademicYearFn_createServerFn_handler = createServerRpc({
  id: "5cb2ac8aaf83688410fa5793e8365e63f21fb04021042643addabf4f33797733",
  name: "deleteAcademicYearFn",
  filename: "src/api/academic-years.ts"
}, (opts) => deleteAcademicYearFn.__executeServer(opts));
const deleteAcademicYearFn = createServerFn().validator((data) => data).handler(deleteAcademicYearFn_createServerFn_handler, async ({
  data
}) => {
  const sql = getDb();
  const me = verifyToken(data.token);
  if (me.role !== "admin") throw new Error("Tidak punya akses");
  await sql`DELETE FROM academic_years WHERE id = ${data.yearId}`;
  return {
    success: true
  };
});
export {
  createAcademicYearFn_createServerFn_handler,
  deleteAcademicYearFn_createServerFn_handler,
  getAcademicYearsFn_createServerFn_handler,
  setActiveAcademicYearFn_createServerFn_handler
};
