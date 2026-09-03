import Container from "@/components/ui/Container";
import FadeInUp from "@/components/motion/FadeInUp";
import { getContentBlock } from "@/lib/db";
import { homeSeed } from "@/lib/cms-seed";

export default function Partners() {
  const partners = getContentBlock("cms:home:partners", homeSeed.partners).map(
    (p) => p.name
  );
  const loop = [...partners, ...partners];

  return (
    <section className="border-y border-border-gray py-14">
      <Container>
        <FadeInUp className="text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-gray/70">
            Trusted by organizations across sectors
          </p>
        </FadeInUp>
      </Container>

      <div className="mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="animate-marquee flex w-max gap-16">
          {loop.map((partner, i) => (
            <span
              key={`${partner}-${i}`}
              className="whitespace-nowrap text-lg font-bold text-slate-gray/40"
            >
              {partner}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
