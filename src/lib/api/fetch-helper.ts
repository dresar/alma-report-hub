const BACKEND_URL = (typeof import.meta !== "undefined" && (import.meta as any).env?.VITE_BACKEND_URL) || "http://localhost:3001";

export async function fetchBackend<T>(
  path: string,
  options?: { method?: "GET" | "POST"; body?: unknown },
): Promise<T> {
  const method = options?.method ?? "POST";
  const url = `${BACKEND_URL}${path}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const response = await fetch(url, {
    method,
    headers,
    body: method === "POST" ? JSON.stringify(options?.body ?? {}) : undefined,
  });

  const resData = await response.json();
  if (!response.ok) {
    throw new Error(resData.error || "Terjadi kesalahan pada server");
  }
  return resData as T;
}
