import { fetchBackend } from "./fetch-helper";

// ── Get subject scores ─────────────────────────────────────────
export const getSubjectScoresFn = async ({ data }: { data: { token: string; academicYearId: string; rombelId: string } }) => {
  return fetchBackend<any>("/api/scores/subject", { body: data });
};

// ── Save subject scores ────────────────────────────────────────
export const saveSubjectScoresFn = async ({ data }: { data: { token: string; academicYearId: string; scores: any[] } }) => {
  return fetchBackend<{ success: boolean }>("/api/scores/subject/save", { body: data });
};

// ── Get speech scores ──────────────────────────────────────────
export const getSpeechScoresFn = async ({ data }: { data: { token: string; academicYearId: string; rombelId: string } }) => {
  return fetchBackend<any>("/api/scores/speech", { body: data });
};

// ── Save speech scores ─────────────────────────────────────────
export const saveSpeechScoresFn = async ({ data }: { data: { token: string; academicYearId: string; scores: any[] } }) => {
  return fetchBackend<{ success: boolean }>("/api/scores/speech/save", { body: data });
};

// ── Get computer scores ────────────────────────────────────────
export const getComputerScoresFn = async ({ data }: { data: { token: string; academicYearId: string; rombelId: string } }) => {
  return fetchBackend<any>("/api/scores/computer", { body: data });
};

// ── Save computer scores ───────────────────────────────────────
export const saveComputerScoresFn = async ({ data }: { data: { token: string; academicYearId: string; scores: any[] } }) => {
  return fetchBackend<{ success: boolean }>("/api/scores/computer/save", { body: data });
};

// ── Get discussion scores ──────────────────────────────────────
export const getDiscussionScoresFn = async ({ data }: { data: { token: string; academicYearId: string; rombelId: string } }) => {
  return fetchBackend<any>("/api/scores/discussion", { body: data });
};

// ── Save discussion scores ─────────────────────────────────────
export const saveDiscussionScoresFn = async ({ data }: { data: { token: string; academicYearId: string; scores: any[] } }) => {
  return fetchBackend<{ success: boolean }>("/api/scores/discussion/save", { body: data });
};

// ── Get attendance ─────────────────────────────────────────────
export const getAttendanceFn = async ({ data }: { data: { token: string; academicYearId: string; rombelId: string } }) => {
  return fetchBackend<any>("/api/scores/attendance", { body: data });
};

// ── Save attendance ────────────────────────────────────────────
export const saveAttendanceFn = async ({ data }: { data: { token: string; academicYearId: string; attendance: any[] } }) => {
  return fetchBackend<{ success: boolean }>("/api/scores/attendance/save", { body: data });
};
