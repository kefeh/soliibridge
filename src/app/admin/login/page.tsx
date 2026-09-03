"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { LockKeyhole } from "lucide-react";
import Button from "@/components/ui/Button";
import { inputClass, labelClass } from "@/components/ui/formStyles";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Enter an email and password to continue.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        setError("Invalid email or password.");
        return;
      }

      router.push("/admin");
      router.refresh();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-corporate-blue px-6">
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-surface-white p-8 shadow-[0_16px_48px_rgba(0,0,0,0.25)]">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-corporate-blue/10 text-corporate-blue">
            <LockKeyhole size={22} strokeWidth={1.5} />
          </div>
          <div>
            <span className="font-display text-xl font-extrabold tracking-tight text-corporate-blue">
              Solii<span className="text-tech-cyan">Bridge</span>
            </span>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-gray/60">
              Content Manager
            </p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-5" noValidate>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className={labelClass}>
              Email
            </label>
            <input
              id="email"
              type="email"
              className={inputClass}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@soliibridge.com"
              autoComplete="username"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className={labelClass}>
              Password
            </label>
            <input
              id="password"
              type="password"
              className={inputClass}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>
          {error && <p className="text-xs font-medium text-red-600">{error}</p>}
          <Button
            type="submit"
            variant="primary"
            tone="accent"
            className="w-full disabled:opacity-60"
            disabled={submitting}
          >
            {submitting ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
}
