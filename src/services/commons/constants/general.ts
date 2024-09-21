export enum CLIENT_IDS_ENUM {
  prasetyaApp = "PRASETYA-APP",
}

export const CLIENT_IDS = [CLIENT_IDS_ENUM.prasetyaApp];
export const CLIENT_ID_KEY = "X-Client-Id";

export const AUTH_TOKENS = {
  [CLIENT_IDS_ENUM.prasetyaApp]: {
    accessTokenKey: "pa_access_token",
    refreshTokenKey: "pa_refresh_token",
  },
};
