import { AuthProvider } from "@refinedev/core";

import { loginAdminUser, logoutAdminUser, verifyAdminUser } from "./handler";

export const authProvider: AuthProvider = {
  login: async ({ username, password, redirectPath }) => {
    const loginResponse = await loginAdminUser(
      { username, password },
      redirectPath
    );
    return Promise.resolve(loginResponse);
  },
  logout: async ({ redirectPath }) => {
    const logoutResponse = await logoutAdminUser(
      redirectPath || "/admin/login"
    );
    return Promise.resolve(logoutResponse);
  },
  check: async () => {
    const checkResponse = await verifyAdminUser();
    return Promise.resolve(checkResponse);
  },
  onError: async () => {
    return Promise.resolve({ redirectTo: "/admin" });
  },
};
