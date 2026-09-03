import { Lightbulb, ShieldCheck, Heart, Lock, Award, Sparkles } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeInUp from "@/components/motion/FadeInUp";
import { getContentBlock } from "@/lib/db";
import { aboutSeed } from "@/lib/cms-seed";

const icons = [Lightbulb, ShieldCheck, Heart, Lock, Award];

export default function CoreValues() {
  const values = getContentBlock("cms:about:coreValues", aboutSeed.coreValues);

  return (
    <section className="bg-cloud-gray py-24">
      <Container>
        <SectionHeading title="Our Core Values" />
        <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {values.map((value, i) => {
            const Icon = icons[i] ?? Sparkles;
            return (
              <FadeInUp
                key={`${value.title}-${i}`}
                delay={i * 0.05}
                className={i === values.length - 1 ? "col-span-2 sm:col-span-1" : ""}
              >
                <div className="flex h-full flex-col items-center gap-4 rounded-2xl border border-border-gray bg-surface-white p-6 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-corporate-blue/10 text-corporate-blue">
                    <Icon size={22} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-gray-dark">{value.title}</p>
                    <p className="mt-2 text-xs leading-relaxed text-slate-gray">
                      {value.description}
                    </p>
                  </div>
                </div>
              </FadeInUp>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
