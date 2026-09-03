import { Tag, LogIn, FileCode2, ArrowRight, FileText } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import FadeInUp from "@/components/motion/FadeInUp";
import { getContentBlock } from "@/lib/db";
import { arclocalSeed } from "@/lib/cms-seed";

const icons = [Tag, LogIn, FileCode2];

export default function ArcLocalResources() {
  const resources = getContentBlock("cms:arclocal:resources", arclocalSeed.resources);

  return (
    <section className="bg-cloud-gray py-24">
      <Container>
        <SectionHeading
          title="Resources &amp; Portal"
          subtitle="Pricing, account access, and developer documentation."
        />
        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {resources.map((resource, i) => {
            const Icon = icons[i] ?? FileText;
            return (
              <FadeInUp key={`${resource.title}-${i}`} delay={i * 0.08}>
                <a
                  href="/contact"
                  className="group flex h-full flex-col rounded-2xl border border-border-gray bg-surface-white p-8 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)]"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-arclocal-green-light text-arclocal-green">
                      <Icon size={22} strokeWidth={1.5} />
                    </div>
                    {resource.comingSoon === "yes" && <Badge tone="green">Coming Soon</Badge>}
                  </div>
                  <h3 className="mt-6 font-display text-lg font-bold text-slate-gray-dark">
                    {resource.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-gray">
                    {resource.description}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-arclocal-green">
                    {resource.ctaLabel}
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </span>
                </a>
              </FadeInUp>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
