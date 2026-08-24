import Link from "next/link";
import { ComponentPropsWithoutRef } from "react";

type Variant = "primary" | "secondary";
type Tone = "accent" | "green" | "orange" | "white";

type BaseProps = {
  variant?: Variant;
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold " +
  "transition-all duration-200 ease-out min-h-[44px] " +
  "hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 " +
  "focus-visible:outline-2 focus-visible:outline-offset-2";

const solidTones: Record<Tone, string> = {
  accent: "bg-[var(--color-accent)] text-white focus-visible:outline-[var(--color-accent)]",
  green: "bg-arclocal-green text-white focus-visible:outline-arclocal-green",
  orange: "bg-officetrail-orange text-white focus-visible:outline-officetrail-orange",
  white: "bg-white text-corporate-blue focus-visible:outline-white",
};

const outlineTones: Record<Tone, string> = {
  accent:
    "border border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent)]/5 focus-visible:outline-[var(--color-accent)]",
  green:
    "border border-arclocal-green text-arclocal-green hover:bg-arclocal-green-light focus-visible:outline-arclocal-green",
  orange:
    "border border-officetrail-orange text-officetrail-orange hover:bg-officetrail-orange-light focus-visible:outline-officetrail-orange",
  white:
    "border border-white text-white hover:bg-white/10 focus-visible:outline-white",
};

type LinkButtonProps = BaseProps & { href: string } & Omit<
    ComponentPropsWithoutRef<typeof Link>,
    "href" | "className" | "children"
  >;

type NativeButtonProps = BaseProps & { href?: undefined } & Omit<
    ComponentPropsWithoutRef<"button">,
    "className" | "children"
  >;

type ButtonProps = LinkButtonProps | NativeButtonProps;

export default function Button({
  variant = "primary",
  tone = "accent",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const toneClasses = variant === "primary" ? solidTones[tone] : outlineTones[tone];
  const shadow = variant === "primary" ? "shadow-sm" : "";
  const classes = `${base} ${toneClasses} ${shadow} ${className}`;

  if ("href" in props && props.href) {
    const { href, ...rest } = props;
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as ComponentPropsWithoutRef<"button">)}>
      {children}
    </button>
  );
}
