import { Timestamp } from "firebase-admin/firestore";
import { NextRequest, userAgent } from "next/server";

import {
  AUTH_TOKENS,
  CLIENT_ID_KEY,
  CLIENT_IDS_ENUM,
} from "../constants/general";
import { RouteContextParams } from "../types/general";

export function routeToRegex(route: string) {
  // Convert route params (e.g., :id) to regex capture groups (e.g., (\w+))
  const params: string[] = [];
  const pattern = route.replace(/:([^\s/]+)/g, (_, paramName) => {
    params.push(paramName);
    return "([^/]+)"; // Convert to regex capture group
  });
  return { regex: new RegExp(`^${pattern}$`), params };
}

export type GetCredentialProps = {
  request: NextRequest;
};
export function getCredentials({ request }: GetCredentialProps) {
  const clientId = request.headers.get(CLIENT_ID_KEY) || "";
  const authHeaders = request.headers.get("Authorization")?.split(" ") || "";
  const isBearerAuth = authHeaders?.[0] === "Bearer";
  const accessToken = authHeaders?.[1] || "";
  const refreshToken =
    request.cookies.get(
      AUTH_TOKENS[clientId as CLIENT_IDS_ENUM]?.refreshTokenKey || ""
    )?.value || "";

  const userAgents = userAgent(request);

  return {
    accessToken: isBearerAuth ? accessToken : "",
    refreshToken,
    clientId,
    userAgent: userAgents,
  };
}

export function isPublicEndpoint(params: RouteContextParams) {
  const publicParams = params.endpoint[0];

  return publicParams === "public";
}

export function convertTimestampToDate(value: Timestamp) {
  return value.toDate();
}

export function convertTimestampToDateString(value: Timestamp) {
  return value.toDate().toISOString();
}

export function convertDateToTimestamp(value: Date) {
  return Timestamp.fromDate(value);
}
