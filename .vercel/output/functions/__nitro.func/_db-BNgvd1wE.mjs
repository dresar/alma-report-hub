import { T as TSS_SERVER_FUNCTION } from "./_ssr/server-B2xBzUrm.mjs";
import "./_libs/server-only.mjs";
import { P as Postgres } from "./_libs/postgres.mjs";
import { j as jwt } from "./_libs/jsonwebtoken.mjs";
var createServerRpc = (serverFnMeta, splitImportFn) => {
  const url = "/_serverFn/" + serverFnMeta.id;
  return Object.assign(splitImportFn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL environment variable is not set");
}
let _sql;
function getDb() {
  if (!_sql) {
    _sql = Postgres(databaseUrl, {
      ssl: "require",
      max: 5,
      idle_timeout: 20,
      connect_timeout: 10,
      onnotice: () => {
      }
    });
  }
  return _sql;
}
const JWT_SECRET = process.env.JWT_SECRET ?? "sira-fallback-secret";
function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}
function verifyToken(token) {
  try {
    if (!token) throw new Error("Token wajib disertakan");
    return jwt.verify(token, JWT_SECRET);
  } catch {
    throw new Error("Sesi tidak valid, silakan login kembali");
  }
}
export {
  createServerRpc as c,
  getDb as g,
  signToken as s,
  verifyToken as v
};
