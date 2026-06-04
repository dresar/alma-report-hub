import { createServerFn } from "@tanstack/react-start";
import bcrypt from "bcryptjs";
import { getDb, signToken, verifyToken } from "./_db";

// ── Login ──────────────────────────────────────────────────────────────
export const loginFn = createServerFn()
  .validator((data: { email: string; password: string }) => data)
  .handler(async ({ data }) => {
    const sql = getDb();
    const { email, password } = data;
    if (!email || !password) throw new Error("Email dan password wajib diisi");

    const rows = await sql`
      SELECT id, name, email, password_hash, role
      FROM users
      WHERE email = ${email} AND is_active = true
      LIMIT 1
    `;
    if (rows.length === 0) throw new Error("Email atau password salah");
    const user = rows[0];

    const ok = await bcrypt.compare(password, user.password_hash as string);
    if (!ok) throw new Error("Email atau password salah");

    const payload = { userId: String(user.id), email: String(user.email), name: String(user.name), role: user.role as "admin" | "wali_kelas" | "guru" };
    const token = signToken(payload);
    return { token, user: { id: String(user.id), name: String(user.name), email: String(user.email), role: user.role as "admin" | "wali_kelas" | "guru" } };
  });

// ── Verify session ─────────────────────────────────────────────────────
export const getMeFn = createServerFn()
  .validator((data: { token: string }) => data)
  .handler(async ({ data }) => {
    return verifyToken(data.token);
  });

// ── Change password ────────────────────────────────────────────────────
export const changePasswordFn = createServerFn()
  .validator((data: { token: string; oldPassword: string; newPassword: string }) => data)
  .handler(async ({ data }) => {
    const sql = getDb();
    const { token, oldPassword, newPassword } = data;
    if (!oldPassword || !newPassword) throw new Error("Password wajib diisi");
    if (newPassword.length < 6) throw new Error("Password baru minimal 6 karakter");

    const me = verifyToken(token);
    const rows = await sql`SELECT password_hash FROM users WHERE id = ${me.userId}`;
    if (rows.length === 0) throw new Error("User tidak ditemukan");

    const ok = await bcrypt.compare(oldPassword, rows[0].password_hash as string);
    if (!ok) throw new Error("Password lama salah");

    const hash = await bcrypt.hash(newPassword, 10);
    await sql`UPDATE users SET password_hash = ${hash} WHERE id = ${me.userId}`;
    return { success: true };
  });

// ── Update Profile ─────────────────────────────────────────────────────
export const updateProfileFn = createServerFn()
  .validator((data: { token: string; name: string; email: string }) => data)
  .handler(async ({ data }) => {
    const sql = getDb();
    const { token, name, email } = data;
    if (!name || !email) throw new Error("Nama dan email wajib diisi");

    const me = verifyToken(token);
    const check = await sql`SELECT id FROM users WHERE email = ${email} AND id != ${me.userId}`;
    if (check.length > 0) throw new Error("Email sudah terdaftar untuk pengguna lain");

    await sql`UPDATE users SET name = ${name}, email = ${email} WHERE id = ${me.userId}`;
    const payload = { userId: me.userId, email, name, role: me.role };
    const newToken = signToken(payload);
    return { token: newToken, user: { id: me.userId, name, email, role: me.role } };
  });

// ── List users (admin only) ────────────────────────────────────────────
export const getUsersFn = createServerFn()
  .validator((data: { token: string }) => data)
  .handler(async ({ data }) => {
    const sql = getDb();
    const me = verifyToken(data.token);
    if (me.role !== "admin") throw new Error("Tidak punya akses");
    const rows = await sql`SELECT id, name, email, role, is_active, created_at FROM users ORDER BY created_at DESC`;
    return rows;
  });

// ── Create user (admin only) ───────────────────────────────────────────
export const createUserFn = createServerFn()
  .validator((data: { token: string; name: string; email: string; password: string; role: "admin" | "wali_kelas" | "guru" }) => data)
  .handler(async ({ data }) => {
    const sql = getDb();
    const { token, name, email, password, role } = data;
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

// ── Toggle user active ─────────────────────────────────────────────────
export const toggleUserFn = createServerFn()
  .validator((data: { token: string; userId: string; isActive: boolean }) => data)
  .handler(async ({ data }) => {
    const sql = getDb();
    const me = verifyToken(data.token);
    if (me.role !== "admin") throw new Error("Tidak punya akses");
    await sql`UPDATE users SET is_active = ${data.isActive} WHERE id = ${data.userId}`;
    return { success: true };
  });

// ── Delete user ────────────────────────────────────────────────────────
export const deleteUserFn = createServerFn()
  .validator((data: { token: string; userId: string }) => data)
  .handler(async ({ data }) => {
    const sql = getDb();
    const me = verifyToken(data.token);
    if (me.role !== "admin") throw new Error("Tidak punya akses");
    await sql`DELETE FROM users WHERE id = ${data.userId}`;
    return { success: true };
  });
