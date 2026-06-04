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
async function ensurePrintSettingsTable() {
  const sql = getDb();
  await sql`
    CREATE TABLE IF NOT EXISTS print_settings (
      id TEXT PRIMARY KEY,
      value TEXT NOT NULL DEFAULT '',
      updated_at TIMESTAMPTZ DEFAULT now()
    )
  `;
}
const getPrintSettingsFn_createServerFn_handler = createServerRpc({
  id: "177d130c3ffe872091455b2626b6320243772083af3159ecd08782d86f7e0884",
  name: "getPrintSettingsFn",
  filename: "src/api/print-settings.ts"
}, (opts) => getPrintSettingsFn.__executeServer(opts));
const getPrintSettingsFn = createServerFn().handler(getPrintSettingsFn_createServerFn_handler, async () => {
  await ensurePrintSettingsTable();
  const sql = getDb();
  const rows = await sql`SELECT id, value FROM print_settings`;
  const settings = {};
  for (const row of rows) {
    settings[String(row.id)] = String(row.value);
  }
  return {
    rapor_date: settings.rapor_date || (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    rapor_headmaster: settings.rapor_headmaster || "",
    rapor_signature: settings.rapor_signature || "",
    rapor_show_sig: settings.rapor_show_sig || "true"
  };
});
const savePrintSettingsFn_createServerFn_handler = createServerRpc({
  id: "42e90d44ad3b466567a6fbb9d45eb93a6af4275b7edff56909d78b7eac4c0c04",
  name: "savePrintSettingsFn",
  filename: "src/api/print-settings.ts"
}, (opts) => savePrintSettingsFn.__executeServer(opts));
const savePrintSettingsFn = createServerFn().validator((data) => data).handler(savePrintSettingsFn_createServerFn_handler, async ({
  data
}) => {
  await ensurePrintSettingsTable();
  const sql = getDb();
  verifyToken(data.token);
  for (const [id, value] of Object.entries(data.settings)) {
    await sql`
        INSERT INTO print_settings (id, value, updated_at)
        VALUES (${id}, ${value}, now())
        ON CONFLICT (id) DO UPDATE SET value = EXCLUDED.value, updated_at = now()
      `;
  }
  return {
    success: true
  };
});
export {
  getPrintSettingsFn_createServerFn_handler,
  savePrintSettingsFn_createServerFn_handler
};
