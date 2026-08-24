"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // The CMS auth flag lives in localStorage, unavailable during server
    // rendering. Rendering null until after mount keeps the first client
    // render identical to the server render, avoiding a hydration mismatch;
    // this effect then reveals the real auth state (or redirects).
    /* eslint-disable react-hooks/set-state-in-effect */
    const authed = window.localStorage.getItem("cms_auth") === "true";
    setAuthorized(authed);
    setMounted(true);
    /* eslint-enable react-hooks/set-state-in-effect */
    if (!authed) {
      router.replace("/admin/login");
    }
  }, [router]);

  if (!mounted || !authorized) return null;

  return <AdminShell>{children}</AdminShell>;
}
