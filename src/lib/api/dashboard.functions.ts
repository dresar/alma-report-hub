import { fetchBackend } from "./fetch-helper";

// ── Dashboard statistics ───────────────────────────────────────
export const getDashboardStatsFn = async ({ data }: { data: { token: string; academicYearId?: string } }) => {
  return fetchBackend<any>("/api/dashboard/stats", { body: data });
};

// ── Top students per rombel ────────────────────────────────────
export const getTopStudentsFn = async ({ data }: { data: { token: string; academicYearId: string; limit?: number } }) => {
  return fetchBackend<any[]>("/api/dashboard/top-students", { body: data });
};

// ── Value trend per academic year ─────────────────────────────
export const getValueTrendFn = async ({ data }: { data: { token: string } }) => {
  return fetchBackend<any[]>("/api/dashboard/value-trend", { body: data });
};

// ── Ranking per class ─────────────────────────────────────────
export const getClassRankingFn = async ({ data }: { data: { token: string; academicYearId: string; classLevel?: number } }) => {
  return fetchBackend<any[]>("/api/dashboard/class-ranking", { body: data });
};
