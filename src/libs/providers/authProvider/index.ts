import { AuthProvider } from "@refinedev/core";

export const authProvider: AuthProvider = {
  login: async () => {
    return Promise.resolve({ success: true });
  },
  logout: async () => {
    return Promise.resolve({ success: true });
  },
  check: async () => {
    return Promise.resolve({ authenticated: true });
  },
  onError: async () => {
    return Promise.resolve({ redirectTo: "/admin/login" });
  },
};
