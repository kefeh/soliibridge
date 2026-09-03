import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import FadeInUp from "@/components/motion/FadeInUp";
import { getContentBlock } from "@/lib/db";
import { homeSeed } from "@/lib/cms-seed";

function initials(name: string) {
  return name
    .split(" ")
    .filter((word) => /^[A-Z]/.test(word))
    .slice(0, 2)
    .map((word) => word[0])
    .join("");
}

export default function Testimonials() {
  const testimonials = getContentBlock("cms:home:testimonials", homeSeed.testimonials);

  return (
    <section className="bg-cloud-gray py-24">
      <Container>
        <FadeInUp className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-slate-gray-dark sm:text-4xl">
            Trusted Across Every Sector
          </h2>
          <p className="mt-4 text-lg text-slate-gray">
            Schools, NGOs, hospitals, businesses, churches, and government
            institutions rely on SoliiBridge.
          </p>
        </FadeInUp>

        <div className="mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 lg:grid lg:grid-cols-3 lg:overflow-visible">
          {testimonials.map((testimonial, i) => (
            <FadeInUp
              key={`${testimonial.name}-${i}`}
              delay={i * 0.05}
              className="w-[85%] shrink-0 snap-start sm:w-[60%] lg:w-auto"
            >
              <div className="flex h-full flex-col rounded-2xl border border-border-gray bg-surface-white p-8">
                <Badge tone="blue" className="self-start">
                  {testimonial.category}
                </Badge>
                <p className="mt-5 flex-1 text-slate-gray leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-corporate-blue text-xs font-bold text-white">
                    {initials(testimonial.name)}
                  </div>
                  <p className="text-sm font-semibold text-slate-gray-dark">
                    {testimonial.name}
                  </p>
                </div>
              </div>
            </FadeInUp>
          ))}
        </div>
      </Container>
    </section>
  );
}
