import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import FadeInUp from "@/components/motion/FadeInUp";
import { getContentBlock } from "@/lib/db";
import { homeSeed } from "@/lib/cms-seed";

const nodes = [
  { top: "18%", left: "12%", size: 10, delay: "0s" },
  { top: "30%", left: "82%", size: 14, delay: "0.4s" },
  { top: "68%", left: "20%", size: 8, delay: "0.8s" },
  { top: "78%", left: "70%", size: 12, delay: "1.2s" },
  { top: "12%", left: "58%", size: 6, delay: "1.6s" },
  { top: "50%", left: "92%", size: 8, delay: "2s" },
];

export default function Hero() {
  const hero = getContentBlock("cms:home:hero", homeSeed.hero);

  return (
    <section className="relative overflow-hidden bg-corporate-blue">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(circle at 18% 20%, rgba(0,194,255,0.35), transparent 45%), radial-gradient(circle at 82% 70%, rgba(0,194,255,0.25), transparent 40%)",
        }}
      />
      {nodes.map((node, i) => (
        <span
          key={i}
          className="animate-node-pulse pointer-events-none absolute rounded-full bg-tech-cyan"
          style={{
            top: node.top,
            left: node.left,
            width: node.size,
            height: node.size,
            animationDelay: node.delay,
          }}
        />
      ))}

      <Container className="relative flex flex-col items-center gap-8 py-28 text-center lg:py-36">
        <FadeInUp>
          <span className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-wide text-tech-cyan">
            {hero.eyebrow}
          </span>
        </FadeInUp>

        <FadeInUp delay={0.1}>
          <h1 className="max-w-4xl text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl lg:text-6xl">
            {hero.headline}
          </h1>
        </FadeInUp>

        <FadeInUp delay={0.2}>
          <p className="max-w-2xl text-lg leading-relaxed text-white/70">
            {hero.subheading}
          </p>
        </FadeInUp>

        <FadeInUp delay={0.3}>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button href="/arclocal" variant="primary" tone="green">
              {hero.primaryCtaLabel}
            </Button>
            <Button href="/officetrail" variant="secondary" tone="white">
              {hero.secondaryCtaLabel}
            </Button>
          </div>
        </FadeInUp>
      </Container>
    </section>
  );
}
