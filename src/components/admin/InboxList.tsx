"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Briefcase, Mail, Paperclip, Trash2, MailOpen, MailCheck, Reply } from "lucide-react";
import type { Submission } from "@/lib/submissions";

function formatDate(iso: string) {
  return new Date(iso).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
}

function formatSize(bytes: number) {
  return bytes >= 1024 * 1024
    ? `${(bytes / 1024 / 1024).toFixed(1)} MB`
    : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

const emailLabel: Record<Submission["emailStatus"], { text: string; className: string }> = {
  sent: { text: "Emailed to the team", className: "text-arclocal-green-strong" },
  pending: { text: "Email sending…", className: "text-slate-gray" },
  not_configured: { text: "Email not configured — saved here only", className: "text-amber-700" },
  failed: { text: "Email failed — saved here only", className: "text-red-600" },
};

export default function InboxList({ items }: { items: Submission[] }) {
  const router = useRouter();
  const [openId, setOpenId] = useState<number | null>(null);
  const [busy, setBusy] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const call = async (id: number, init: RequestInit) => {
    setBusy(id);
    setError(null);
    try {
      const res = await fetch(`/api/admin/submissions/${id}`, init);
      if (res.status === 401) {
        router.push("/admin/login");
        return false;
      }
      if (!res.ok) throw new Error();
      router.refresh();
      return true;
    } catch {
      setError("That didn't work. Please try again.");
      return false;
    } finally {
      setBusy(null);
    }
  };

  const setRead = (id: number, read: boolean) =>
    call(id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read }),
    });

  const toggle = (item: Submission) => {
    const opening = openId !== item.id;
    setOpenId(opening ? item.id : null);
    if (opening && !item.readAt) void setRead(item.id, true);
  };

  const remove = async (item: Submission) => {
    const what = item.kind === "career" ? "application" : "message";
    if (!window.confirm(`Delete this ${what} from ${item.name}? This cannot be undone.`)) return;
    if (await call(item.id, { method: "DELETE" })) setOpenId(null);
  };

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-border-gray bg-surface-white p-10 text-center">
        <Mail size={32} strokeWidth={1.5} className="mx-auto text-slate-gray/50" />
        <p className="mt-3 font-display font-bold text-slate-gray-dark">Nothing here yet</p>
        <p className="mt-1 text-sm text-slate-gray">
          Messages and applications submitted on the website will show up here.
        </p>
      </div>
    );
  }

  return (
    <div>
      {error && (
        <p role="alert" className="mb-4 text-sm font-medium text-red-600">
          {error}
        </p>
      )}
      <ul className="flex flex-col gap-3">
        {items.map((item) => {
          const open = openId === item.id;
          const unread = !item.readAt;
          const Icon = item.kind === "career" ? Briefcase : Mail;
          const status = emailLabel[item.emailStatus];
          return (
            <li
              key={item.id}
              className="overflow-hidden rounded-2xl border border-border-gray bg-surface-white"
            >
              <button
                type="button"
                onClick={() => toggle(item)}
                aria-expanded={open}
                className="flex w-full items-start gap-4 p-5 text-left transition-colors hover:bg-cloud-gray/60"
              >
                <div
                  className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                    item.kind === "career"
                      ? "bg-officetrail-orange-light text-officetrail-orange"
                      : "bg-brand/10 text-brand"
                  }`}
                >
                  <Icon size={18} strokeWidth={1.5} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    {unread && (
                      <span className="h-2 w-2 shrink-0 rounded-full bg-brand" aria-label="Unread" />
                    )}
                    <span
                      className={`truncate text-sm text-slate-gray-dark ${
                        unread ? "font-bold" : "font-semibold"
                      }`}
                    >
                      {item.name}
                    </span>
                    <span className="shrink-0 rounded-full bg-cloud-gray px-2 py-0.5 text-xs font-semibold text-slate-gray">
                      {item.kind === "career" ? "Application" : "Contact"}
                    </span>
                  </div>
                  <p className="mt-0.5 truncate text-sm font-medium text-slate-gray-dark">
                    {item.subject}
                  </p>
                  {!open && (
                    <p className="mt-0.5 truncate text-sm text-slate-gray">{item.message}</p>
                  )}
                </div>
                <time
                  dateTime={item.createdAt}
                  suppressHydrationWarning
                  className="shrink-0 text-xs font-medium text-slate-gray"
                >
                  {formatDate(item.createdAt)}
                </time>
              </button>

              {open && (
                <div className="border-t border-border-gray bg-cloud-gray/40 p-5">
                  <dl className="grid gap-3 text-sm sm:grid-cols-3">
                    <div>
                      <dt className="font-semibold text-slate-gray">Email</dt>
                      <dd className="mt-0.5 break-all">
                        <a href={`mailto:${item.email}`} className="font-medium text-brand hover:underline">
                          {item.email}
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-slate-gray">Phone</dt>
                      <dd className="mt-0.5">
                        <a href={`tel:${item.phone}`} className="font-medium text-brand hover:underline">
                          {item.phone}
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-slate-gray">
                        {item.kind === "career" ? "Position" : "Subject"}
                      </dt>
                      <dd className="mt-0.5 font-medium text-slate-gray-dark">{item.subject}</dd>
                    </div>
                  </dl>

                  <p className="mt-5 text-sm font-semibold text-slate-gray">
                    {item.kind === "career" ? "Cover letter" : "Message"}
                  </p>
                  <p className="mt-1 whitespace-pre-wrap break-words text-sm leading-relaxed text-slate-gray-dark">
                    {item.message}
                  </p>

                  {item.resumeFile && (
                    <a
                      href={`/api/admin/submissions/${item.id}/resume`}
                      className="mt-5 inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-border-gray bg-surface-white px-4 text-sm font-semibold text-slate-gray-dark transition-colors hover:border-brand hover:text-brand"
                    >
                      <Paperclip size={16} strokeWidth={1.5} />
                      {item.resumeName}
                      {item.resumeSize ? (
                        <span className="font-normal text-slate-gray">({formatSize(item.resumeSize)})</span>
                      ) : null}
                    </a>
                  )}

                  <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-border-gray pt-4">
                    <a
                      href={`mailto:${item.email}?subject=${encodeURIComponent(`Re: ${item.subject}`)}`}
                      className="inline-flex min-h-[40px] items-center gap-2 rounded-lg bg-brand px-4 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                    >
                      <Reply size={16} strokeWidth={1.5} /> Reply
                    </a>
                    <button
                      type="button"
                      disabled={busy === item.id}
                      onClick={() => setRead(item.id, !item.readAt)}
                      className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-border-gray bg-surface-white px-4 text-sm font-semibold text-slate-gray-dark disabled:opacity-60"
                    >
                      {item.readAt ? (
                        <>
                          <MailOpen size={16} strokeWidth={1.5} /> Mark as unread
                        </>
                      ) : (
                        <>
                          <MailCheck size={16} strokeWidth={1.5} /> Mark as read
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      disabled={busy === item.id}
                      onClick={() => remove(item)}
                      className="inline-flex min-h-[40px] items-center gap-2 rounded-lg px-3 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:opacity-60"
                    >
                      <Trash2 size={16} strokeWidth={1.5} /> Delete
                    </button>
                    <span className={`ml-auto text-xs font-medium ${status.className}`}>
                      {status.text}
                    </span>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
