import Link from "next/link";
import InboxList from "@/components/admin/InboxList";
import { getCounts, listSubmissions, type SubmissionKind } from "@/lib/submissions";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 20;

const tabs: { key: "all" | SubmissionKind; label: string; href: string }[] = [
  { key: "all", label: "All", href: "/admin/inbox" },
  { key: "contact", label: "Contact", href: "/admin/inbox?type=contact" },
  { key: "career", label: "Careers", href: "/admin/inbox?type=career" },
];

export default async function InboxPage(props: PageProps<"/admin/inbox">) {
  const sp = await props.searchParams;
  const typeParam = Array.isArray(sp.type) ? sp.type[0] : sp.type;
  const kind: SubmissionKind | undefined =
    typeParam === "contact" || typeParam === "career" ? typeParam : undefined;
  const pageParam = Number(Array.isArray(sp.page) ? sp.page[0] : sp.page);

  const counts = getCounts();
  const total = kind ? counts[kind] : counts.all;
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const page = Number.isInteger(pageParam) && pageParam >= 1 ? Math.min(pageParam, pages) : 1;
  const items = listSubmissions({ kind, limit: PAGE_SIZE, offset: (page - 1) * PAGE_SIZE });

  const base = kind ? `/admin/inbox?type=${kind}&` : "/admin/inbox?";

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-slate-gray-dark">Inbox</h1>
        <p className="mt-1 text-sm text-slate-gray">
          Every contact message and job application submitted on the website. Each one is
          also emailed to the team, but it is always kept here.
        </p>
      </div>

      <div className="mb-6 flex flex-wrap gap-2" role="tablist" aria-label="Filter messages">
        {tabs.map((tab) => {
          const active = (kind ?? "all") === tab.key;
          return (
            <Link
              key={tab.key}
              href={tab.href}
              role="tab"
              aria-selected={active}
              className={`inline-flex min-h-[40px] items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors ${
                active
                  ? "border-brand bg-brand/10 text-brand"
                  : "border-border-gray bg-surface-white text-slate-gray hover:text-slate-gray-dark"
              }`}
            >
              {tab.label}
              <span className="text-xs font-bold opacity-70">{counts[tab.key]}</span>
            </Link>
          );
        })}
      </div>

      <InboxList items={items} />

      {pages > 1 && (
        <nav className="mt-6 flex items-center justify-between text-sm font-semibold" aria-label="Pagination">
          {page > 1 ? (
            <Link href={`${base}page=${page - 1}`} className="text-brand hover:underline">
              &larr; Newer
            </Link>
          ) : (
            <span />
          )}
          <span className="text-slate-gray">
            Page {page} of {pages}
          </span>
          {page < pages ? (
            <Link href={`${base}page=${page + 1}`} className="text-brand hover:underline">
              Older &rarr;
            </Link>
          ) : (
            <span />
          )}
        </nav>
      )}
    </div>
  );
}
