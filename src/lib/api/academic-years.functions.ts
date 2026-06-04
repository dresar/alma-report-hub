import { fetchBackend } from "./fetch-helper";

// ── List academic years ────────────────────────────────────────
export const getAcademicYearsFn = async () => {
  return fetchBackend<any[]>("/api/academic-years", { method: "GET" });
};

// ── Create academic year ───────────────────────────────────────
export const createAcademicYearFn = async ({ data }: { data: { token: string; year: string } }) => {
  return fetchBackend<any>("/api/academic-years/create", { body: data });
};

// ── Set active academic year ───────────────────────────────────
export const setActiveYearFn = async ({ data }: { data: { token: string; yearId: string } }) => {
  return fetchBackend<{ success: boolean }>("/api/academic-years/set-active", { body: data });
};

// ── Delete academic year ───────────────────────────────────────
export const deleteAcademicYearFn = async ({ data }: { data: { token: string; yearId: string } }) => {
  return fetchBackend<{ success: boolean }>("/api/academic-years/delete", { body: data });
};
