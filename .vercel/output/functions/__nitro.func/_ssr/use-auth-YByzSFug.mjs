import { r as reactExports } from "../_libs/react.mjs";
const TOKEN_KEY = "sira_token";
const USER_KEY = "sira_user";
let cachedState = null;
function readState() {
  if (typeof window === "undefined") return { token: null, user: null };
  if (cachedState) return cachedState;
  const token = localStorage.getItem(TOKEN_KEY);
  const raw = localStorage.getItem(USER_KEY);
  const user = raw ? JSON.parse(raw) : null;
  cachedState = { token, user };
  return cachedState;
}
const listeners = /* @__PURE__ */ new Set();
const emit = () => {
  cachedState = null;
  listeners.forEach((l) => l());
};
const authStore = {
  getState: readState,
  login(token, user) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    emit();
  },
  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    emit();
  },
  subscribe(cb) {
    listeners.add(cb);
    return () => listeners.delete(cb);
  }
};
const emptyServerState = { token: null, user: null };
function useAuth() {
  const state = reactExports.useSyncExternalStore(authStore.subscribe, authStore.getState, () => emptyServerState);
  const logout = reactExports.useCallback(() => authStore.logout(), []);
  return {
    token: state.token,
    user: state.user,
    isLoggedIn: !!state.token,
    isAdmin: state.user?.role === "admin",
    logout
  };
}
export {
  authStore as a,
  useAuth as u
};
