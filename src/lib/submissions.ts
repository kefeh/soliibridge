import { mkdirSync, unlinkSync, writeFileSync } from "node:fs";
import path from "node:path";
import { db } from "@/lib/db";

export type SubmissionKind = "contact" | "career";
export type EmailStatus = "pending" | "sent" | "failed" | "not_configured";

export type Submission = {
  id: number;
  kind: SubmissionKind;
  name: string;
  email: string;
  phone: string;
  /** Contact: the chosen subject. Career: the position applied for. */
  subject: string;
  /** Contact: the message. Career: the cover letter. */
  message: string;
  resumeFile: string | null;
  resumeName: string | null;
  resumeMime: string | null;
  resumeSize: number | null;
  readAt: string | null;
  emailStatus: EmailStatus;
  emailError: string | null;
  createdAt: string;
};

type Row = {
  id: number;
  kind: SubmissionKind;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  resume_file: string | null;
  resume_name: string | null;
  resume_mime: string | null;
  resume_size: number | null;
  read_at: string | null;
  email_status: EmailStatus;
  email_error: string | null;
  created_at: string;
};

export const UPLOADS_DIR = path.join(process.cwd(), ".data", "uploads");

let ready = false;
function ensureSchema() {
  if (ready) return;
  db.exec(`
    CREATE TABLE IF NOT EXISTS submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      kind TEXT NOT NULL,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      resume_file TEXT,
      resume_name TEXT,
      resume_mime TEXT,
      resume_size INTEGER,
      read_at TEXT,
      email_status TEXT NOT NULL DEFAULT 'pending',
      email_error TEXT,
      created_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS submissions_created_idx ON submissions (created_at DESC);
  `);
  mkdirSync(UPLOADS_DIR, { recursive: true });
  ready = true;
}

function toSubmission(r: Row): Submission {
  return {
    id: r.id,
    kind: r.kind,
    name: r.name,
    email: r.email,
    phone: r.phone,
    subject: r.subject,
    message: r.message,
    resumeFile: r.resume_file,
    resumeName: r.resume_name,
    resumeMime: r.resume_mime,
    resumeSize: r.resume_size,
    readAt: r.read_at,
    emailStatus: r.email_status,
    emailError: r.email_error,
    createdAt: r.created_at,
  };
}

export type NewSubmission = {
  kind: SubmissionKind;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  resumeFile?: string;
  resumeName?: string;
  resumeMime?: string;
  resumeSize?: number;
};

export function createSubmission(input: NewSubmission): number {
  ensureSchema();
  const info = db
    .prepare(
      `INSERT INTO submissions
        (kind, name, email, phone, subject, message, resume_file, resume_name, resume_mime, resume_size, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .run(
      input.kind,
      input.name,
      input.email,
      input.phone,
      input.subject,
      input.message,
      input.resumeFile ?? null,
      input.resumeName ?? null,
      input.resumeMime ?? null,
      input.resumeSize ?? null,
      new Date().toISOString()
    );
  return Number(info.lastInsertRowid);
}

export function setEmailStatus(id: number, status: EmailStatus, error?: string) {
  ensureSchema();
  db.prepare("UPDATE submissions SET email_status = ?, email_error = ? WHERE id = ?").run(
    status,
    error ? error.slice(0, 500) : null,
    id
  );
}

export function getSubmission(id: number): Submission | null {
  ensureSchema();
  const row = db.prepare("SELECT * FROM submissions WHERE id = ?").get(id) as Row | undefined;
  return row ? toSubmission(row) : null;
}

export function listSubmissions(opts: {
  kind?: SubmissionKind;
  limit: number;
  offset: number;
}): Submission[] {
  ensureSchema();
  const rows = (
    opts.kind
      ? db
          .prepare("SELECT * FROM submissions WHERE kind = ? ORDER BY created_at DESC, id DESC LIMIT ? OFFSET ?")
          .all(opts.kind, opts.limit, opts.offset)
      : db
          .prepare("SELECT * FROM submissions ORDER BY created_at DESC, id DESC LIMIT ? OFFSET ?")
          .all(opts.limit, opts.offset)
  ) as Row[];
  return rows.map(toSubmission);
}

export type SubmissionCounts = {
  all: number;
  contact: number;
  career: number;
  unread: number;
};

export function getCounts(): SubmissionCounts {
  ensureSchema();
  const row = db
    .prepare(
      `SELECT
         COUNT(*) AS total,
         COALESCE(SUM(kind = 'contact'), 0) AS contact,
         COALESCE(SUM(kind = 'career'), 0) AS career,
         COALESCE(SUM(read_at IS NULL), 0) AS unread
       FROM submissions`
    )
    .get() as { total: number; contact: number; career: number; unread: number };
  return { all: row.total, contact: row.contact, career: row.career, unread: row.unread };
}

export function getUnreadCount(): number {
  ensureSchema();
  const row = db.prepare("SELECT COUNT(*) AS n FROM submissions WHERE read_at IS NULL").get() as {
    n: number;
  };
  return row.n;
}

export function setRead(id: number, read: boolean): boolean {
  ensureSchema();
  const info = db
    .prepare("UPDATE submissions SET read_at = ? WHERE id = ?")
    .run(read ? new Date().toISOString() : null, id);
  return info.changes > 0;
}

export function deleteSubmission(id: number): boolean {
  ensureSchema();
  const existing = getSubmission(id);
  if (!existing) return false;
  db.prepare("DELETE FROM submissions WHERE id = ?").run(id);
  if (existing.resumeFile) removeUpload(existing.resumeFile);
  return true;
}

export function saveUpload(fileName: string, data: Buffer) {
  ensureSchema();
  writeFileSync(path.join(UPLOADS_DIR, path.basename(fileName)), data, { flag: "wx" });
}

export function removeUpload(fileName: string) {
  // Stored names are generated server-side, but never trust a path anyway.
  const safe = path.basename(fileName);
  try {
    unlinkSync(path.join(UPLOADS_DIR, safe));
  } catch {
    // already gone
  }
}
