import { fetchBackend } from "./fetch-helper";

// ── List classes with rombels ──────────────────────────────────
export const getClassesFn = async () => {
  return fetchBackend<any[]>("/api/classes", { method: "GET" });
};

// ── Get rombels flat list ──────────────────────────────────────
export const getRombelsFn = async ({ data }: { data: { classLevel?: number } }) => {
  return fetchBackend<any[]>("/api/rombels", { body: data });
};

// ── Create rombel ──────────────────────────────────────────────
export const createRombelFn = async ({ data }: { data: { token: string; classLevel: number; name: "A" | "B" | "C" | "D"; waliKelasId?: string } }) => {
  return fetchBackend<any>("/api/rombels/create", { body: data });
};

// ── Update rombel (set wali kelas) ─────────────────────────────
export const updateRombelFn = async ({ data }: { data: { token: string; rombelId: string; waliKelasId: string | null } }) => {
  return fetchBackend<any>("/api/rombels/update", { body: data });
};

// ── Delete rombel ──────────────────────────────────────────────
export const deleteRombelFn = async ({ data }: { data: { token: string; rombelId: string } }) => {
  return fetchBackend<{ success: boolean }>("/api/rombels/delete", { body: data });
};
