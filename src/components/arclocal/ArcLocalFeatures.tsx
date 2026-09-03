import {
  MessagesSquare,
  KeyRound,
  BellRing,
  Megaphone,
  Fingerprint,
  BarChart3,
  CalendarClock,
  Sparkles,
} from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeInUp from "@/components/motion/FadeInUp";
import { getContentBlock } from "@/lib/db";
import { arclocalSeed } from "@/lib/cms-seed";

const icons = [
  MessagesSquare,
  KeyRound,
  BellRing,
  Megaphone,
  Fingerprint,
  BarChart3,
  CalendarClock,
];

export default function ArcLocalFeatures() {
  const features = getContentBlock("cms:arclocal:features", arclocalSeed.features);

  return (
    <section className="py-24">
      <Container>
        <SectionHeading
          title="Everything You Need to Reach Your Audience"
          subtitle="A complete toolkit for messaging, alerts, and customer engagement."
        />
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => {
            const Icon = icons[i] ?? Sparkles;
            return (
              <FadeInUp key={`${feature.title}-${i}`} delay={i * 0.05}>
                <div className="flex h-full flex-col gap-4 rounded-2xl border border-border-gray bg-surface-white p-7 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-arclocal-green-light text-arclocal-green">
                    <Icon size={22} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-slate-gray-dark">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-gray">
                      {feature.description}
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
