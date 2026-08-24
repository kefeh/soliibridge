import Container from "@/components/ui/Container";
import FadeInUp from "@/components/motion/FadeInUp";

const partners = [
  "Regional Banks",
  "Telecom Operators",
  "Corporate Clients",
  "Universities",
  "NGOs & Nonprofits",
  "Government Agencies",
];

const loop = [...partners, ...partners];

export default function Partners() {
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
