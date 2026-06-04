import process from "node:process";

// Server-only config — never reaches the browser.
export function getServerConfig() {
  return {
    nodeEnv: process.env.NODE_ENV,
    databaseUrl: process.env.DATABASE_URL,
    jwtSecret: process.env.JWT_SECRET ?? "sira-fallback-secret",
  };
}
