import Container from "@/components/ui/Container";
import FadeInUp from "@/components/motion/FadeInUp";
import AnimatedCounter from "@/components/home/AnimatedCounter";
import { getContentBlock } from "@/lib/db";
import { homeSeed } from "@/lib/cms-seed";

export default function Stats() {
  const stats = getContentBlock("cms:home:stats", homeSeed.stats);

  return (
    <section className="bg-corporate-blue-dark py-20">
      <Container>
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-6">
          {stats.map((stat, i) => (
            <FadeInUp key={`${stat.label}-${i}`} delay={i * 0.05} className="text-center">
              <div className="font-display text-3xl font-extrabold text-white sm:text-4xl">
                <AnimatedCounter target={Number(stat.target) || 0} suffix={stat.suffix} />
              </div>
              <p className="mt-2 text-sm font-medium text-white/60">{stat.label}</p>
            </FadeInUp>
          ))}
        </div>
      </Container>
    </section>
  );
}
