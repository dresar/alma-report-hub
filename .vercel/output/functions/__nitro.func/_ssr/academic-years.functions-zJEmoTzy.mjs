import { f as fetchBackend } from "./fetch-helper-D3HnH3aE.mjs";
const getAcademicYearsFn = async () => {
  return fetchBackend("/api/academic-years", { method: "GET" });
};
const createAcademicYearFn = async ({ data }) => {
  return fetchBackend("/api/academic-years/create", { body: data });
};
const setActiveYearFn = async ({ data }) => {
  return fetchBackend("/api/academic-years/set-active", { body: data });
};
const deleteAcademicYearFn = async ({ data }) => {
  return fetchBackend("/api/academic-years/delete", { body: data });
};
export {
  createAcademicYearFn as c,
  deleteAcademicYearFn as d,
  getAcademicYearsFn as g,
  setActiveYearFn as s
};
