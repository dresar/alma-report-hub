import { fetchBackend } from "./fetch-helper";

// ── List students ──────────────────────────────────────────────
export const getStudentsFn = async ({ data }: { data: { token: string; academicYearId?: string; classLevel?: number; rombelId?: string; status?: string; q?: string; page?: number; limit?: number } }) => {
  return fetchBackend<any>("/api/students", { body: data });
};

// ── Get student by id with history ────────────────────────────
export const getStudentByIdFn = async ({ data }: { data: { token: string; studentId: string } }) => {
  return fetchBackend<any>("/api/students/get", { body: data });
};

// ── Create student ─────────────────────────────────────────────
export const createStudentFn = async ({ data }: { data: { token: string; stambuk: string; fullName: string; gender: "L" | "P"; birthPlace?: string; birthDate?: string; parentName?: string; address?: string; entryYear?: string; status?: "Aktif" | "Alumni" | "Pindah"; rombelId?: string; academicYearId?: string } }) => {
  return fetchBackend<any>("/api/students/create", { body: data });
};

// ── Update student ─────────────────────────────────────────────
export const updateStudentFn = async ({ data }: { data: { token: string; studentId: string; stambuk?: string; fullName?: string; gender?: "L" | "P"; birthPlace?: string; birthDate?: string; parentName?: string; address?: string; entryYear?: string; status?: "Aktif" | "Alumni" | "Pindah" } }) => {
  return fetchBackend<any>("/api/students/update", { body: data });
};

// ── Delete student ─────────────────────────────────────────────
export const deleteStudentFn = async ({ data }: { data: { token: string; studentId: string } }) => {
  return fetchBackend<{ success: boolean }>("/api/students/delete", { body: data });
};

// ── Bulk Delete students ───────────────────────────────────────
export const bulkDeleteStudentsFn = async ({ data }: { data: { token: string; studentIds: string[] } }) => {
  return fetchBackend<{ success: boolean }>("/api/students/bulk-delete", { body: data });
};

// ── Assign student to rombel ───────────────────────────────────
export const assignStudentRombelFn = async ({ data }: { data: { token: string; studentId: string; rombelId: string; academicYearId: string } }) => {
  return fetchBackend<any>("/api/students/assign-rombel", { body: data });
};
