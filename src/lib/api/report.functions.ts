import { fetchBackend } from "./fetch-helper";

// ── Full report card for one student ─────────────────────────
export const getReportCardFn = async ({ data }: { data: { token: string; studentId: string; academicYearId: string } }) => {
  return fetchBackend<any>("/api/reports/card", { body: data });
};

// ── List students for rapor selection ─────────────────────────
export const getStudentsForReportFn = async ({ data }: { data: { token: string; academicYearId: string; rombelId?: string; classLevel?: number } }) => {
  return fetchBackend<any[]>("/api/reports/students", { body: data });
};
