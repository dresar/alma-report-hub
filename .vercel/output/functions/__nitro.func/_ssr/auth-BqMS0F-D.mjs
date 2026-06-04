import { c as createServerRpc, g as getDb, s as signToken, v as verifyToken } from "../_db-BNgvd1wE.mjs";
import { b as createServerFn } from "./server-B2xBzUrm.mjs";
import { b as bcrypt } from "../_libs/bcryptjs.mjs";
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
const loginFn_createServerFn_handler = createServerRpc({
  id: "e18bff70a16fc4542841e46b562fa67cd8c1ef8455738ee913280cc629bff424",
  name: "loginFn",
  filename: "src/api/auth.ts"
}, (opts) => loginFn.__executeServer(opts));
const loginFn = createServerFn().validator((data) => data).handler(loginFn_createServerFn_handler, async ({
  data
}) => {
  const sql = getDb();
  const {
    email,
    password
  } = data;
  if (!email || !password) throw new Error("Email dan password wajib diisi");
  const rows = await sql`
      SELECT id, name, email, password_hash, role
      FROM users
      WHERE email = ${email} AND is_active = true
      LIMIT 1
    `;
  if (rows.length === 0) throw new Error("Email atau password salah");
  const user = rows[0];
  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) throw new Error("Email atau password salah");
  const payload = {
    userId: String(user.id),
    email: String(user.email),
    name: String(user.name),
    role: user.role
  };
  const token = signToken(payload);
  return {
    token,
    user: {
      id: String(user.id),
      name: String(user.name),
      email: String(user.email),
      role: user.role
    }
  };
});
const getMeFn_createServerFn_handler = createServerRpc({
  id: "e8e06ff860d1930ea22710367f0df4d6bce3aac088893acaa56d9cfbc2fcfc71",
  name: "getMeFn",
  filename: "src/api/auth.ts"
}, (opts) => getMeFn.__executeServer(opts));
const getMeFn = createServerFn().validator((data) => data).handler(getMeFn_createServerFn_handler, async ({
  data
}) => {
  return verifyToken(data.token);
});
const changePasswordFn_createServerFn_handler = createServerRpc({
  id: "887f56ebd23b4905a5d67ace11f3c4eefdef22825f66f227414be017ea69b6f6",
  name: "changePasswordFn",
  filename: "src/api/auth.ts"
}, (opts) => changePasswordFn.__executeServer(opts));
const changePasswordFn = createServerFn().validator((data) => data).handler(changePasswordFn_createServerFn_handler, async ({
  data
}) => {
  const sql = getDb();
  const {
    token,
    oldPassword,
    newPassword
  } = data;
  if (!oldPassword || !newPassword) throw new Error("Password wajib diisi");
  if (newPassword.length < 6) throw new Error("Password baru minimal 6 karakter");
  const me = verifyToken(token);
  const rows = await sql`SELECT password_hash FROM users WHERE id = ${me.userId}`;
  if (rows.length === 0) throw new Error("User tidak ditemukan");
  const ok = await bcrypt.compare(oldPassword, rows[0].password_hash);
  if (!ok) throw new Error("Password lama salah");
  const hash = await bcrypt.hash(newPassword, 10);
  await sql`UPDATE users SET password_hash = ${hash} WHERE id = ${me.userId}`;
  return {
    success: true
  };
});
const updateProfileFn_createServerFn_handler = createServerRpc({
  id: "71c1880e4d827eff34bff83a011bd4ffebfd507bee103c4dc806921ec19ee28d",
  name: "updateProfileFn",
  filename: "src/api/auth.ts"
}, (opts) => updateProfileFn.__executeServer(opts));
const updateProfileFn = createServerFn().validator((data) => data).handler(updateProfileFn_createServerFn_handler, async ({
  data
}) => {
  const sql = getDb();
  const {
    token,
    name,
    email
  } = data;
  if (!name || !email) throw new Error("Nama dan email wajib diisi");
  const me = verifyToken(token);
  const check = await sql`SELECT id FROM users WHERE email = ${email} AND id != ${me.userId}`;
  if (check.length > 0) throw new Error("Email sudah terdaftar untuk pengguna lain");
  await sql`UPDATE users SET name = ${name}, email = ${email} WHERE id = ${me.userId}`;
  const payload = {
    userId: me.userId,
    email,
    name,
    role: me.role
  };
  const newToken = signToken(payload);
  return {
    token: newToken,
    user: {
      id: me.userId,
      name,
      email,
      role: me.role
    }
  };
});
const getUsersFn_createServerFn_handler = createServerRpc({
  id: "8bd0613363d21bbf16a879929eb9c00600a291aa82c4ca42ba2a8f36ef72e222",
  name: "getUsersFn",
  filename: "src/api/auth.ts"
}, (opts) => getUsersFn.__executeServer(opts));
const getUsersFn = createServerFn().validator((data) => data).handler(getUsersFn_createServerFn_handler, async ({
  data
}) => {
  const sql = getDb();
  const me = verifyToken(data.token);
  if (me.role !== "admin") throw new Error("Tidak punya akses");
  const rows = await sql`SELECT id, name, email, role, is_active, created_at FROM users ORDER BY created_at DESC`;
  return rows;
});
const createUserFn_createServerFn_handler = createServerRpc({
  id: "fc3163788c15aff1c2e290d35756bc459551f8171d77d9ae86d9da7cef7519a1",
  name: "createUserFn",
  filename: "src/api/auth.ts"
}, (opts) => createUserFn.__executeServer(opts));
const createUserFn = createServerFn().validator((data) => data).handler(createUserFn_createServerFn_handler, async ({
  data
}) => {
  const sql = getDb();
  const {
    token,
    name,
    email,
    password,
    role
  } = data;
  if (!name || !email || !password || !role) throw new Error("Semua field wajib diisi");
  const me = verifyToken(token);
  if (me.role !== "admin") throw new Error("Tidak punya akses");
  const hash = await bcrypt.hash(password, 10);
  const rows = await sql`
      INSERT INTO users (name, email, password_hash, role)
      VALUES (${name}, ${email}, ${hash}, ${role})
      RETURNING id, name, email, role, is_active, created_at
    `;
  return rows[0];
});
const toggleUserFn_createServerFn_handler = createServerRpc({
  id: "6a38eae3e4319b22e1704426c89876d6663b69f71ec627ab4a0a18fd5f7e96e8",
  name: "toggleUserFn",
  filename: "src/api/auth.ts"
}, (opts) => toggleUserFn.__executeServer(opts));
const toggleUserFn = createServerFn().validator((data) => data).handler(toggleUserFn_createServerFn_handler, async ({
  data
}) => {
  const sql = getDb();
  const me = verifyToken(data.token);
  if (me.role !== "admin") throw new Error("Tidak punya akses");
  await sql`UPDATE users SET is_active = ${data.isActive} WHERE id = ${data.userId}`;
  return {
    success: true
  };
});
const deleteUserFn_createServerFn_handler = createServerRpc({
  id: "50e99733fc00951ed94cfc360ff63fc6de9cc83ce40e103200b14a373d6d4b56",
  name: "deleteUserFn",
  filename: "src/api/auth.ts"
}, (opts) => deleteUserFn.__executeServer(opts));
const deleteUserFn = createServerFn().validator((data) => data).handler(deleteUserFn_createServerFn_handler, async ({
  data
}) => {
  const sql = getDb();
  const me = verifyToken(data.token);
  if (me.role !== "admin") throw new Error("Tidak punya akses");
  await sql`DELETE FROM users WHERE id = ${data.userId}`;
  return {
    success: true
  };
});
export {
  changePasswordFn_createServerFn_handler,
  createUserFn_createServerFn_handler,
  deleteUserFn_createServerFn_handler,
  getMeFn_createServerFn_handler,
  getUsersFn_createServerFn_handler,
  loginFn_createServerFn_handler,
  toggleUserFn_createServerFn_handler,
  updateProfileFn_createServerFn_handler
};
