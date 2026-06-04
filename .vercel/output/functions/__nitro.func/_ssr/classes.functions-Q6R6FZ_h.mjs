import { f as fetchBackend } from "./fetch-helper-D3HnH3aE.mjs";
const getClassesFn = async () => {
  return fetchBackend("/api/classes", { method: "GET" });
};
const getRombelsFn = async ({ data }) => {
  return fetchBackend("/api/rombels", { body: data });
};
const createRombelFn = async ({ data }) => {
  return fetchBackend("/api/rombels/create", { body: data });
};
const deleteRombelFn = async ({ data }) => {
  return fetchBackend("/api/rombels/delete", { body: data });
};
export {
  getRombelsFn as a,
  createRombelFn as c,
  deleteRombelFn as d,
  getClassesFn as g
};
