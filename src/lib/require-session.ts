import { cookies } from "next/headers";
import { SESSION_COOKIE, isValidSessionToken } from "@/lib/auth";

export async function hasSession(): Promise<boolean> {
  const store = await cookies();
  return isValidSessionToken(store.get(SESSION_COOKIE)?.value);
}

export function unauthorized() {
  return Response.json({ error: "Unauthorized" }, { status: 401 });
}
