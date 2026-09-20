"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Search, X } from "lucide-react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/arclocal", label: "ArcLocal" },
  { href: "/officetrail", label: "OfficeTrail" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

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
          ? "bg-white/80 backdrop-blur-md shadow-[0_1px_0_rgba(15,23,42,0.06),0_8px_24px_rgba(15,23,42,0.06)] py-3"
          : "bg-white/0 py-5"
      }`}
    >
      <Container className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
          <span className="font-display text-xl font-extrabold tracking-tight text-corporate-blue">
            Solii<span className="text-tech-cyan">Bridge</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-slate-gray transition-colors hover:text-corporate-blue"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            aria-label="Search"
            className="flex h-11 w-11 items-center justify-center rounded-lg text-slate-gray transition-colors hover:bg-cloud-gray hover:text-corporate-blue"
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
          className="flex h-11 w-11 items-center justify-center rounded-lg text-corporate-blue lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </Container>

      {mobileOpen && (
        <div className="border-t border-border-gray bg-white px-6 py-4 lg:hidden">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-slate-gray"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
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
