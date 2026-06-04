const __vite_import_meta_env__ = {};
const BACKEND_URL = typeof import.meta !== "undefined" && __vite_import_meta_env__?.VITE_BACKEND_URL || "http://localhost:3001";
async function fetchBackend(path, options) {
  const method = options?.method ?? "POST";
  const url = `${BACKEND_URL}${path}`;
  const headers = {
    "Content-Type": "application/json"
  };
  const response = await fetch(url, {
    method,
    headers,
    body: method === "POST" ? JSON.stringify(options?.body ?? {}) : void 0
  });
  const resData = await response.json();
  if (!response.ok) {
    throw new Error(resData.error || "Terjadi kesalahan pada server");
  }
  return resData;
}
export {
  fetchBackend as f
};
