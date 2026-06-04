// Re-export semua server functions dari src/api/auth.ts
// Client code menggunakan file ini sebagai entry point
export type { TokenPayload } from "@/api/_db";
export {
  loginFn,
  getMeFn,
  changePasswordFn,
  updateProfileFn,
  getUsersFn,
  createUserFn,
  toggleUserFn,
  deleteUserFn,
} from "@/api/auth";

// Backward-compatible type alias
export type JwtPayload = import("@/api/_db").TokenPayload;
