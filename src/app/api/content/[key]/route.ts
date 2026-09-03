import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { getContentBlock, hasContentBlock, setContentBlock } from "@/lib/db";
import { SESSION_COOKIE, isValidSessionToken } from "@/lib/auth";

export async function GET(
  _req: NextRequest,
  ctx: RouteContext<"/api/content/[key]">
) {
  const { key } = await ctx.params;

  if (!hasContentBlock(key)) {
    return Response.json({ value: null });
  }

  const value = getContentBlock(key, null);
  return Response.json({ value });
}

export async function PUT(req: NextRequest, ctx: RouteContext<"/api/content/[key]">) {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!isValidSessionToken(token)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { key } = await ctx.params;
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object" || !("value" in body)) {
    return Response.json({ error: "Request body must be { value: ... }" }, { status: 400 });
  }

  setContentBlock(key, body.value);
  return Response.json({ ok: true });
}
