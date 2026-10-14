"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Search, X } from "lucide-react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

type NavItem = {
  href: string;
  label: string;
  /** Present only for the two main products. */
  dot?: string;
  /** Underline / left-bar color for the active (and hover) indicator. */
  bar: string;
  border: string;
};

const productLinks: NavItem[] = [
  { href: "/arclocal", label: "ArcLocal", dot: "bg-arclocal-green", bar: "bg-arclocal-green", border: "border-arclocal-green" },
  { href: "/officetrail", label: "OfficeTrail", dot: "bg-officetrail-orange", bar: "bg-officetrail-orange", border: "border-officetrail-orange" },
];

const companyLinks: NavItem[] = [
  { href: "/about", label: "About", bar: "bg-brand", border: "border-brand" },
  { href: "/careers", label: "Careers", bar: "bg-brand", border: "border-brand" },
  { href: "/contact", label: "Contact", bar: "bg-brand", border: "border-brand" },
];

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function DesktopNavLink({ item, pathname }: { item: NavItem; pathname: string }) {
  const active = isActive(pathname, item.href);
  const product = Boolean(item.dot);

  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      className={`group relative inline-flex items-center gap-2 py-2 text-sm transition-colors ${
        product
          ? "font-bold text-slate-gray-dark"
          : active
            ? "font-semibold text-brand"
            : "font-medium text-slate-gray hover:text-brand"
      }`}
    >
      {item.dot && <span className={`h-2 w-2 rounded-full ${item.dot}`} aria-hidden />}
      {item.label}
      <span
        aria-hidden
        className={`absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full transition-opacity duration-200 ${item.bar} ${
          active ? "opacity-100" : "opacity-0 group-hover:opacity-40"
        }`}
      />
    </Link>
  );
}

function MobileNavLink({
  item,
  pathname,
  onNavigate,
}: {
  item: NavItem;
  pathname: string;
  onNavigate: () => void;
}) {
  const active = isActive(pathname, item.href);
  const product = Boolean(item.dot);

  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      onClick={onNavigate}
      className={`flex min-h-[44px] items-center gap-3 rounded-lg border-l-[3px] px-3 text-sm ${
        active ? `${item.border} bg-cloud-gray` : "border-transparent"
      } ${product ? "font-bold text-slate-gray-dark" : active ? "font-semibold text-brand" : "font-medium text-slate-gray"}`}
    >
      {item.dot && <span className={`h-2 w-2 rounded-full ${item.dot}`} aria-hidden />}
      {item.label}
    </Link>
  );
}

function Logo() {
  return (
    <Image
      src="/logo.png"
      alt="SoliiBridge logo"
      width={40}
      height={40}
      className="h-9 w-9 shrink-0 rounded-md object-contain sm:h-10 sm:w-10"
      priority
    />
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ease-out ${
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-[0_1px_0_rgba(6,42,48,0.06),0_8px_24px_rgba(6,42,48,0.06)] py-3"
          : "bg-white/0 py-5"
      }`}
    >
      <Container className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
          <span className="font-display text-xl font-extrabold tracking-tight text-brand-dark">
            Solii<span className="text-brand">Bridge</span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-6 lg:flex">
          {productLinks.map((item) => (
            <DesktopNavLink key={item.href} item={item} pathname={pathname} />
          ))}
          <span aria-hidden className="h-5 w-px bg-border-gray" />
          {companyLinks.map((item) => (
            <DesktopNavLink key={item.href} item={item} pathname={pathname} />
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            aria-label="Search"
            className="flex h-11 w-11 items-center justify-center rounded-lg text-slate-gray transition-colors hover:bg-cloud-gray hover:text-brand"
          >
            <Search size={18} strokeWidth={1.5} />
          </button>
          <Button href="/contact" variant="secondary">
            Customer Login
          </Button>
          <Button href="/contact" variant="primary">
            Request Quote
          </Button>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation"
          className="flex h-11 w-11 items-center justify-center rounded-lg text-brand lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </Container>

      {mobileOpen && (
        <div className="border-t border-border-gray bg-white px-6 py-4 lg:hidden">
          <nav aria-label="Mobile" className="flex flex-col gap-1">
            {productLinks.map((item) => (
              <MobileNavLink
                key={item.href}
                item={item}
                pathname={pathname}
                onNavigate={() => setMobileOpen(false)}
              />
            ))}
            <div aria-hidden className="my-2 h-px bg-border-gray" />
            {companyLinks.map((item) => (
              <MobileNavLink
                key={item.href}
                item={item}
                pathname={pathname}
                onNavigate={() => setMobileOpen(false)}
              />
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-3">
            <Button href="/contact" variant="secondary" className="w-full">
              Customer Login
            </Button>
            <Button href="/contact" variant="primary" className="w-full">
              Request Quote
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
