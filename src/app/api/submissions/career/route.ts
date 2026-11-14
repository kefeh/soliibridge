import { randomUUID } from "node:crypto";
import path from "node:path";
import { z } from "zod";
import { clientIp, isLimited } from "@/lib/rate-limit";
import { createSubmission, removeUpload, saveUpload } from "@/lib/submissions";
import { emailInBackground } from "@/lib/submit-helpers";

const MAX_SIZE = 5 * 1024 * 1024;

const text = (min: number, max: number) => z.string().trim().min(min).max(max);
const schema = z.object({
  name: text(2, 120),
  email: z.string().trim().email().max(254),
  phone: text(6, 40),
  position: text(1, 200),
  coverLetter: text(20, 5000),
  company: z.string().max(200).optional(), // honeypot
});

const TYPES: Record<string, { mime: string; check: (b: Buffer) => boolean }> = {
  pdf: { mime: "application/pdf", check: (b) => b.subarray(0, 5).toString("latin1") === "%PDF-" },
  doc: {
    mime: "application/msword",
    check: (b) => b.subarray(0, 4).equals(Buffer.from([0xd0, 0xcf, 0x11, 0xe0])),
  },
  docx: {
    mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    check: (b) => b.subarray(0, 2).toString("latin1") === "PK",
  },
};

function cleanFileName(name: string): string {
  const base = path.basename(name).replace(/[\u0000-\u001f"\\/<>|:*?]/g, "_").trim();
  return base.slice(-120) || "resume";
}

export async function POST(req: Request) {
  if (isLimited(`career:${clientIp(req)}`, 3, 10 * 60 * 1000)) {
    return Response.json({ error: "Too many applications. Please try again in a few minutes." }, { status: 429 });
  }

  const form = await req.formData().catch(() => null);
  if (!form) return Response.json({ error: "Invalid submission." }, { status: 400 });

  const parsed = schema.safeParse({
    name: form.get("name"),
    email: form.get("email"),
    phone: form.get("phone"),
    position: form.get("position"),
    coverLetter: form.get("coverLetter"),
    company: form.get("company") ?? undefined,
  });
  if (!parsed.success) {
    return Response.json({ error: "Please check the form and try again." }, { status: 400 });
  }
  if (parsed.data.company) return Response.json({ ok: true });

  const file = form.get("resume");
  if (!(file instanceof File) || file.size === 0) {
    return Response.json({ error: "Please attach your resume." }, { status: 400 });
  }
  if (file.size > MAX_SIZE) {
    return Response.json({ error: "Resume must be 5MB or smaller." }, { status: 400 });
  }
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  const type = TYPES[ext];
  const buffer = Buffer.from(await file.arrayBuffer());
  if (!type || !type.check(buffer)) {
    return Response.json({ error: "Only PDF, DOC, or DOCX files are accepted." }, { status: 400 });
  }

  const { position, coverLetter, name, email, phone } = parsed.data;
  const storedName = `${randomUUID()}.${ext}`;
  const displayName = cleanFileName(file.name);
  saveUpload(storedName, buffer);

  let id: number;
  try {
    id = createSubmission({
      kind: "career",
      name,
      email,
      phone,
      subject: position,
      message: coverLetter,
      resumeFile: storedName,
      resumeName: displayName,
      resumeMime: type.mime,
      resumeSize: buffer.length,
    });
  } catch (err) {
    removeUpload(storedName);
    throw err;
  }
  emailInBackground(id, { filename: displayName, content: buffer, contentType: type.mime });
  return Response.json({ ok: true });
}
