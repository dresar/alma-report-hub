import { useSyncExternalStore, useCallback } from "react";
import type { JwtPayload } from "@/lib/api/auth.functions";

// ── Auth store (localStorage-backed) ──────────────────────────
const TOKEN_KEY = "sira_token";
const USER_KEY = "sira_user";

type AuthUser = Pick<JwtPayload, "userId" | "email" | "name" | "role">;

type AuthState = {
  token: string | null;
  user: AuthUser | null;
};

let cachedState: AuthState | null = null;

function readState(): AuthState {
  if (typeof window === "undefined") return { token: null, user: null };
  if (cachedState) return cachedState;
  
  const token = localStorage.getItem(TOKEN_KEY);
  const raw = localStorage.getItem(USER_KEY);
  const user = raw ? (JSON.parse(raw) as AuthUser) : null;
  
  cachedState = { token, user };
  return cachedState;
}

const listeners = new Set<() => void>();
const emit = () => {
  cachedState = null;
  listeners.forEach((l) => l());
};

export const authStore = {
  getState: readState,
  login(token: string, user: AuthUser) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    emit();
  },
  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    emit();
  },
  subscribe(cb: () => void) {
    listeners.add(cb);
    return () => listeners.delete(cb);
  },
};

const emptyServerState: AuthState = { token: null, user: null };

export function useAuth() {
  const state = useSyncExternalStore(authStore.subscribe, authStore.getState, () => emptyServerState);

  const logout = useCallback(() => authStore.logout(), []);

  return {
    token: state.token,
    user: state.user,
    isLoggedIn: !!state.token,
    isAdmin: state.user?.role === "admin",
    logout,
  };
}
