import Container from "@/components/ui/Container";
import FadeInUp from "@/components/motion/FadeInUp";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  tone?: "corporate" | "accent";
  children?: React.ReactNode;
};

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  tone = "corporate",
  children,
}: PageHeroProps) {
  const bgClass = tone === "accent" ? "bg-[var(--color-accent)]" : "bg-corporate-blue";

  return (
    <section className={`relative overflow-hidden ${bgClass}`}>
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(circle at 15% 20%, rgba(255,255,255,0.14), transparent 45%), radial-gradient(circle at 85% 80%, rgba(255,255,255,0.1), transparent 40%)",
        }}
      />
      <Container className="relative flex flex-col items-center gap-6 py-24 text-center lg:py-28">
        {eyebrow && (
          <FadeInUp>
            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-wide text-white/80">
              {eyebrow}
            </span>
          </FadeInUp>
        )}
        <FadeInUp delay={0.1}>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-white sm:text-5xl">
            {title}
          </h1>
        </FadeInUp>
        {subtitle && (
          <FadeInUp delay={0.2}>
            <p className="max-w-2xl text-lg leading-relaxed text-white/75">{subtitle}</p>
          </FadeInUp>
        )}
        {children && <FadeInUp delay={0.3}>{children}</FadeInUp>}
      </Container>
    </section>
  );
}
