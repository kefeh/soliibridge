"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Home,
  Info,
  MessageSquareText,
  Printer,
  Briefcase,
  Mail,
  LogOut,
  ExternalLink,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/home", label: "Home Page", icon: Home },
  { href: "/admin/about", label: "About Page", icon: Info },
  { href: "/admin/arclocal", label: "ArcLocal", icon: MessageSquareText },
  { href: "/admin/officetrail", label: "OfficeTrail HUB", icon: Printer },
  { href: "/admin/careers", label: "Careers", icon: Briefcase },
  { href: "/admin/contact", label: "Contact", icon: Mail },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const signOut = () => {
    window.localStorage.removeItem("cms_auth");
    router.push("/admin/login");
  };

  return (
    <div className="flex min-h-screen bg-cloud-gray">
      <aside className="fixed inset-y-0 left-0 hidden w-64 shrink-0 flex-col border-r border-border-gray bg-surface-white lg:flex">
        <div className="px-6 py-6">
          <span className="font-display text-lg font-extrabold text-corporate-blue">
            Solii<span className="text-tech-cyan">Bridge</span>
          </span>
          <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-gray/50">
            Content Manager
          </p>
        </div>
        <nav className="flex flex-1 flex-col gap-1 px-3">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex min-h-[44px] items-center gap-3 rounded-lg px-3 text-sm font-semibold transition-colors ${
                  active
                    ? "bg-corporate-blue/10 text-corporate-blue"
                    : "text-slate-gray hover:bg-cloud-gray hover:text-slate-gray-dark"
                }`}
              >
                <item.icon size={18} strokeWidth={1.5} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex flex-col gap-1 border-t border-border-gray px-3 py-4">
          <Link
            href="/"
            target="_blank"
            className="flex min-h-[44px] items-center gap-3 rounded-lg px-3 text-sm font-semibold text-slate-gray transition-colors hover:bg-cloud-gray hover:text-slate-gray-dark"
          >
            <ExternalLink size={18} strokeWidth={1.5} /> View Live Site
          </Link>
          <button
            type="button"
            onClick={signOut}
            className="flex min-h-[44px] items-center gap-3 rounded-lg px-3 text-left text-sm font-semibold text-slate-gray transition-colors hover:bg-cloud-gray hover:text-slate-gray-dark"
          >
            <LogOut size={18} strokeWidth={1.5} /> Sign Out
          </button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col lg:pl-64">
        <header className="flex items-center justify-between border-b border-border-gray bg-surface-white px-6 py-4 lg:hidden">
          <span className="font-display text-lg font-extrabold text-corporate-blue">
            Solii<span className="text-tech-cyan">Bridge</span> CMS
          </span>
          <button
            type="button"
            onClick={signOut}
            className="flex h-11 w-11 items-center justify-center rounded-lg text-slate-gray"
            aria-label="Sign out"
          >
            <LogOut size={20} strokeWidth={1.5} />
          </button>
        </header>

        <nav className="flex gap-1 overflow-x-auto border-b border-border-gray bg-surface-white px-4 py-2 lg:hidden">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`shrink-0 rounded-lg px-3 py-2 text-sm font-semibold ${
                  active ? "bg-corporate-blue/10 text-corporate-blue" : "text-slate-gray"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <main className="flex-1">
          <div className="mx-auto max-w-4xl px-6 py-10 sm:px-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
