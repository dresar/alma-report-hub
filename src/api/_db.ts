/**
 * Server-only: Database connection singleton & JWT helpers.
 * Never imported by client code directly.
 */
import postgres from "postgres";
import jwt from "jsonwebtoken";

// ── Database ─────────────────────────────────────────────────────────

// Singleton pattern — reuse across warm invocations on Vercel
let _sql: ReturnType<typeof postgres> | undefined;

export function getDb() {
  if (!_sql) {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error("DATABASE_URL environment variable is not set");
    }

    _sql = postgres(databaseUrl, {
      ssl: "require",
      max: 5,
      idle_timeout: 20,
      connect_timeout: 10,
      onnotice: () => {},
    });
  }
  return _sql;
}

// ── JWT ───────────────────────────────────────────────────────────────
const JWT_SECRET = process.env.JWT_SECRET ?? "sira-fallback-secret";

export interface TokenPayload {
  userId: string;
  email: string;
  name: string;
  role: "admin" | "wali_kelas" | "guru";
  iat?: number;
  exp?: number;
}

export function signToken(payload: Omit<TokenPayload, "iat" | "exp">): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): TokenPayload {
  try {
    if (!token) throw new Error("Token wajib disertakan");
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch {
    throw new Error("Sesi tidak valid, silakan login kembali");
  }
}
