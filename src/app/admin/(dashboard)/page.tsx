import Link from "next/link";
import {
  Home,
  Info,
  MessageSquareText,
  Printer,
  Briefcase,
  Mail,
  ArrowRight,
} from "lucide-react";

const sections = [
  {
    href: "/admin/home",
    icon: Home,
    title: "Home Page",
    description: "Hero, stats, services, testimonials, partners, and news.",
  },
  {
    href: "/admin/about",
    icon: Info,
    title: "About Page",
    description: "Company story, vision, mission, and core values.",
  },
  {
    href: "/admin/arclocal",
    icon: MessageSquareText,
    title: "ArcLocal",
    description: "Hero, feature list, and resource links.",
  },
  {
    href: "/admin/officetrail",
    icon: Printer,
    title: "OfficeTrail",
    description: "Hero, categories, catalog, and portal teaser.",
  },
  {
    href: "/admin/careers",
    icon: Briefcase,
    title: "Careers",
    description: "Intro copy and job vacancy listings.",
  },
  {
    href: "/admin/contact",
    icon: Mail,
    title: "Contact",
    description: "Address, phone, email, and office hours.",
  },
];

export default function AdminDashboardPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-slate-gray-dark">
          Welcome back
        </h1>
        <p className="mt-1 text-sm text-slate-gray">
          Manage the content shown across the SoliiBridge website. Changes save
          immediately and appear on the live site.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="group flex flex-col gap-4 rounded-2xl border border-border-gray bg-surface-white p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)]"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-corporate-blue/10 text-corporate-blue">
              <section.icon size={20} strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="font-display font-bold text-slate-gray-dark">
                {section.title}
              </h2>
              <p className="mt-1 text-sm text-slate-gray">{section.description}</p>
            </div>
            <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-corporate-blue">
              Manage content
              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
