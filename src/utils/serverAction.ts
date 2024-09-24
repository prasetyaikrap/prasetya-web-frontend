"use server";

import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

export async function setCookies(cookieItems: ResponseCookie[]) {
  const cookieStore = cookies();
  const defaultMaxAge = 60 * 60 * 24 * 365;
  cookieItems.forEach((cookie) =>
    cookieStore.set({
      path: "/",
      httpOnly: true,
      secure: true,
      maxAge: defaultMaxAge,
      ...cookie,
    })
  );
}

export async function getCookies(keys: string[]) {
  const cookieStore = cookies();
  return keys.map((key) => cookieStore.get(key));
}

export async function deleteCookies(keys: string[]) {
  const cookieStore = cookies();
  return keys.map((key) => cookieStore.delete(key));
}
