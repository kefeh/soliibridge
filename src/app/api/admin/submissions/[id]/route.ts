import { deleteSubmission, setRead } from "@/lib/submissions";
import { hasSession, unauthorized } from "@/lib/require-session";

function parseId(raw: string): number | null {
  const n = Number(raw);
  return Number.isInteger(n) && n > 0 ? n : null;
}

export async function PATCH(req: Request, ctx: RouteContext<"/api/admin/submissions/[id]">) {
  if (!(await hasSession())) return unauthorized();
  const id = parseId((await ctx.params).id);
  const body = await req.json().catch(() => null);
  if (id === null || typeof body?.read !== "boolean") {
    return Response.json({ error: "Expected { read: boolean }" }, { status: 400 });
  }
  if (!setRead(id, body.read)) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json({ ok: true });
}

export async function DELETE(_req: Request, ctx: RouteContext<"/api/admin/submissions/[id]">) {
  if (!(await hasSession())) return unauthorized();
  const id = parseId((await ctx.params).id);
  if (id === null || !deleteSubmission(id)) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }
  return Response.json({ ok: true });
}
