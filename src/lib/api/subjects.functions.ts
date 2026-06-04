import { fetchBackend } from "./fetch-helper";

// ── List subjects per class ────────────────────────────────────
export const getSubjectsFn = async ({ data }: { data: { classLevel?: number } }) => {
  return fetchBackend<any[]>("/api/subjects", { body: data });
};

// ── Create subject ─────────────────────────────────────────────
export const createSubjectFn = async ({ data }: { data: { token: string; name: string; classLevel: number; bobotTugas?: number; bobotUts?: number; bobotUas?: number; sortOrder?: number } }) => {
  return fetchBackend<any>("/api/subjects/create", { body: data });
};

// ── Update subject ─────────────────────────────────────────────
export const updateSubjectFn = async ({ data }: { data: { token: string; subjectId: string; name?: string; bobotTugas?: number; bobotUts?: number; bobotUas?: number; sortOrder?: number; isActive?: boolean } }) => {
  return fetchBackend<any>("/api/subjects/update", { body: data });
};

// ── Delete subject ─────────────────────────────────────────────
export const deleteSubjectFn = async ({ data }: { data: { token: string; subjectId: string } }) => {
  return fetchBackend<{ success: boolean }>("/api/subjects/delete", { body: data });
};
