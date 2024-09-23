"use server";

import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

export async function setCookies(cookieItems: ResponseCookie[]) {
  const cookieStore = cookies();
  cookieItems.forEach((cookie) => cookieStore.set(cookie));
}

export async function getCookies(keys: string[]) {
  const cookieStore = cookies();
  return keys.map((key) => cookieStore.get(key));
}
