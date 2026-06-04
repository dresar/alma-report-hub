import { fetchBackend } from "./fetch-helper";

export type JwtPayload = {
  userId: string;
  email: string;
  name: string;
  role: "admin" | "wali_kelas" | "guru";
  iat?: number;
  exp?: number;
};

// ── Login ──────────────────────────────────────────────────────
export const loginFn = async ({ data }: { data: { email: string; password: string } }) => {
  return fetchBackend<{ token: string; user: JwtPayload }>("/api/auth/login", { body: data });
};

// ── Verify session ─────────────────────────────────────────────
export const getMeFn = async ({ data }: { data: { token: string } }) => {
  return fetchBackend<JwtPayload>("/api/auth/me", { body: data });
};

// ── Change password ────────────────────────────────────────────
export const changePasswordFn = async ({ data }: { data: { token: string; oldPassword: string; newPassword: string } }) => {
  return fetchBackend<{ success: boolean }>("/api/auth/change-password", { body: data });
};

// ── Update Profile ─────────────────────────────────────────────
export const updateProfileFn = async ({ data }: { data: { token: string; name: string; email: string } }) => {
  return fetchBackend<{ token: string; user: JwtPayload }>("/api/auth/update-profile", { body: data });
};

// ── List users (admin only) ────────────────────────────────────
export const getUsersFn = async ({ data }: { data: { token: string } }) => {
  return fetchBackend<any[]>("/api/auth/users", { body: data });
};

// ── Create user (admin only) ───────────────────────────────────
export const createUserFn = async ({ data }: { data: { token: string; name: string; email: string; password: string; role: "admin" | "wali_kelas" | "guru" } }) => {
  return fetchBackend<any>("/api/auth/users/create", { body: data });
};

// ── Toggle user active ─────────────────────────────────────────
export const toggleUserFn = async ({ data }: { data: { token: string; userId: string; isActive: boolean } }) => {
  return fetchBackend<{ success: boolean }>("/api/auth/users/toggle", { body: data });
};

// ── Delete user ────────────────────────────────────────────────
export const deleteUserFn = async ({ data }: { data: { token: string; userId: string } }) => {
  return fetchBackend<{ success: boolean }>("/api/auth/users/delete", { body: data });
};
