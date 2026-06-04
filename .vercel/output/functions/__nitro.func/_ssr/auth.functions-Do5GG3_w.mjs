import { f as fetchBackend } from "./fetch-helper-D3HnH3aE.mjs";
const loginFn = async ({ data }) => {
  return fetchBackend("/api/auth/login", { body: data });
};
const changePasswordFn = async ({ data }) => {
  return fetchBackend("/api/auth/change-password", { body: data });
};
const updateProfileFn = async ({ data }) => {
  return fetchBackend("/api/auth/update-profile", { body: data });
};
const getUsersFn = async ({ data }) => {
  return fetchBackend("/api/auth/users", { body: data });
};
const createUserFn = async ({ data }) => {
  return fetchBackend("/api/auth/users/create", { body: data });
};
const toggleUserFn = async ({ data }) => {
  return fetchBackend("/api/auth/users/toggle", { body: data });
};
const deleteUserFn = async ({ data }) => {
  return fetchBackend("/api/auth/users/delete", { body: data });
};
export {
  createUserFn as a,
  changePasswordFn as c,
  deleteUserFn as d,
  getUsersFn as g,
  loginFn as l,
  toggleUserFn as t,
  updateProfileFn as u
};
