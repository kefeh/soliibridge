import { z } from "zod";
import { clientIp, isLimited } from "@/lib/rate-limit";
import { createSubmission } from "@/lib/submissions";
import { emailInBackground } from "@/lib/submit-helpers";

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().min(6).max(40),
  subject: z.enum(["General", "ArcLocal Support", "OfficeTrail Order"]),
  message: z.string().trim().min(10).max(5000),
  company: z.string().max(200).optional(), // honeypot
});

export async function POST(req: Request) {
  if (isLimited(`contact:${clientIp(req)}`, 5, 10 * 60 * 1000)) {
    return Response.json({ error: "Too many messages. Please try again in a few minutes." }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "Please check the form and try again." }, { status: 400 });
  }

  const { company, ...data } = parsed.data;
  // Bots fill the hidden field: pretend it worked, store nothing.
  if (company) return Response.json({ ok: true });

  const id = createSubmission({ kind: "contact", ...data });
  emailInBackground(id);
  return Response.json({ ok: true });
}
