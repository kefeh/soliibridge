import nodemailer from "nodemailer";
import { getContentBlock } from "@/lib/db";
import { contactSeed } from "@/lib/cms-seed";
import type { Submission } from "@/lib/submissions";

const EMAIL_RE = /^[^\s@<>,;]+@[^\s@<>,;]+\.[^\s@<>,;]+$/;

/**
 * Recipients come from the "Email" field of the CMS contact details (Admin > Contact),
 * read at send time so edits apply immediately. Several addresses may be separated by
 * commas or semicolons.
 */
export function getSubmissionRecipients(): string[] {
  const info = getContentBlock("cms:contact:info", contactSeed.info);
  return String(info.email ?? "")
    .split(/[,;]/)
    .map((address) => address.trim())
    .filter((address) => EMAIL_RE.test(address));
}

export function isMailConfigured(): boolean {
  return Boolean(process.env.SMTP_HOST);
}

function singleLine(text: string): string {
  return text.replace(/[\r\n]+/g, " ").trim();
}

function fromAddress(fallback: string): string {
  if (process.env.MAIL_FROM) return process.env.MAIL_FROM;
  const user = process.env.SMTP_USER;
  return `"SoliiBridge Website" <${user && user.includes("@") ? user : fallback}>`;
}

function buildText(s: Submission): string {
  const lines =
    s.kind === "career"
      ? [
          "New job application from the SoliiBridge website",
          "",
          `Position: ${s.subject}`,
          `Name: ${s.name}`,
          `Email: ${s.email}`,
          `Phone: ${s.phone}`,
          s.resumeName ? `Resume: ${s.resumeName} (attached)` : "Resume: none",
          "",
          "Cover letter:",
          s.message,
        ]
      : [
          "New message from the SoliiBridge contact form",
          "",
          `Subject: ${s.subject}`,
          `Name: ${s.name}`,
          `Email: ${s.email}`,
          `Phone: ${s.phone}`,
          "",
          "Message:",
          s.message,
        ];
  lines.push("", "---", "Also available in the CMS inbox: /admin/inbox");
  return lines.join("\n");
}

export type MailResult = { ok: true } | { ok: false; reason: "not_configured" | "failed"; error?: string };

export async function sendSubmissionEmail(
  s: Submission,
  attachment?: { filename: string; content: Buffer; contentType?: string }
): Promise<MailResult> {
  if (!isMailConfigured()) return { ok: false, reason: "not_configured" };

  const recipients = getSubmissionRecipients();
  if (recipients.length === 0) {
    return {
      ok: false,
      reason: "failed",
      error: "No valid email address is set in the CMS contact details (Admin > Contact).",
    };
  }

  const port = Number(process.env.SMTP_PORT) || 587;
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465,
    auth:
      process.env.SMTP_USER && process.env.SMTP_PASS
        ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
        : undefined,
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });

  const subject =
    s.kind === "career"
      ? `[Careers] ${singleLine(s.subject)} - ${singleLine(s.name)}`
      : `[Contact] ${singleLine(s.subject)} - ${singleLine(s.name)}`;

  try {
    await transport.sendMail({
      from: fromAddress(recipients[0]),
      to: recipients,
      replyTo: { name: singleLine(s.name), address: s.email },
      subject,
      text: buildText(s),
      attachments: attachment ? [attachment] : undefined,
    });
    return { ok: true };
  } catch (err) {
    return { ok: false, reason: "failed", error: err instanceof Error ? err.message : String(err) };
  } finally {
    transport.close();
  }
}
