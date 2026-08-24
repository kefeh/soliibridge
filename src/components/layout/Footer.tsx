import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import Container from "@/components/ui/Container";

const columns = [
  {
    title: "SoliiBridge",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/careers", label: "Careers" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "ArcLocal",
    links: [
      { href: "/arclocal", label: "Overview" },
      { href: "/arclocal", label: "Pricing" },
      { href: "/arclocal", label: "Customer Login" },
      { href: "/arclocal", label: "API Documentation" },
    ],
  },
  {
    title: "OfficeTrail HUB",
    links: [
      { href: "/officetrail", label: "Printing" },
      { href: "/officetrail", label: "Office Supplies" },
      { href: "/officetrail", label: "Branding" },
      { href: "/officetrail", label: "Request a Quote" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-corporate-blue-dark text-white">
      <Container className="grid gap-12 py-16 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <span className="font-display text-xl font-extrabold tracking-tight">
            Solii<span className="text-tech-cyan">Bridge</span>
          </span>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
            Empowering businesses through smart digital communication and office
            solutions across Cameroon and beyond.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-white/70">
            <li className="flex items-start gap-3">
              <MapPin size={16} strokeWidth={1.5} className="mt-0.5 shrink-0 text-tech-cyan" />
              Counselor&apos;s Street Block2B1 Njengang, Bamenda, Cameroon
            </li>
            <li className="flex items-center gap-3">
              <Phone size={16} strokeWidth={1.5} className="shrink-0 text-tech-cyan" />
              +237 675 40 90 73
            </li>
            <li className="flex items-center gap-3">
              <Mail size={16} strokeWidth={1.5} className="shrink-0 text-tech-cyan" />
              info@soliibridge.com
            </li>
          </ul>
        </div>

        {columns.map((column) => (
          <div key={column.title}>
            <h3 className="text-sm font-bold uppercase tracking-wide text-white/50">
              {column.title}
            </h3>
            <ul className="mt-5 space-y-3">
              {column.links.map((link) => (
                <li key={`${column.title}-${link.label}`}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-white/80 transition-colors hover:text-tech-cyan"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>

      <div className="border-t border-white/10 py-6">
        <Container className="flex flex-col items-center justify-between gap-3 text-xs font-medium text-white/50 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} SoliiBridge. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/contact" className="hover:text-tech-cyan">
              Privacy Policy
            </Link>
            <Link href="/contact" className="hover:text-tech-cyan">
              Terms of Service
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
