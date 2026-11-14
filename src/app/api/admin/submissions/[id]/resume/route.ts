import { readFileSync } from "node:fs";
import path from "node:path";
import { UPLOADS_DIR, getSubmission } from "@/lib/submissions";
import { hasSession, unauthorized } from "@/lib/require-session";

export async function GET(_req: Request, ctx: RouteContext<"/api/admin/submissions/[id]/resume">) {
  if (!(await hasSession())) return unauthorized();
  const id = Number((await ctx.params).id);
  const submission = Number.isInteger(id) ? getSubmission(id) : null;
  if (!submission?.resumeFile) return Response.json({ error: "Not found" }, { status: 404 });

  let data: Buffer;
  try {
    data = readFileSync(path.join(UPLOADS_DIR, path.basename(submission.resumeFile)));
  } catch {
    return Response.json({ error: "File missing" }, { status: 404 });
  }

  const filename = encodeURIComponent(submission.resumeName ?? "resume");
  return new Response(new Uint8Array(data), {
    headers: {
      "Content-Type": submission.resumeMime ?? "application/octet-stream",
      "Content-Disposition": `attachment; filename*=UTF-8''${filename}`,
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "private, no-store",
    },
  });
}
