import {
  ShieldCheck,
  Wallet,
  Zap,
  Lock,
  Users,
  Headset,
  CloudCog,
  Sparkles,
} from "lucide-react";
import Container from "@/components/ui/Container";
import FadeInUp from "@/components/motion/FadeInUp";
import { getContentBlock } from "@/lib/db";
import { homeSeed } from "@/lib/cms-seed";

const icons = [ShieldCheck, Wallet, Zap, Lock, Users, Headset, CloudCog];

export default function WhyChooseUs() {
  const features = getContentBlock("cms:home:whyChooseUs", homeSeed.whyChooseUs);

  return (
    <section className="py-24">
      <Container>
        <FadeInUp className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-slate-gray-dark sm:text-4xl">
            Why Choose SoliiBridge
          </h2>
        </FadeInUp>

        <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {features.map((feature, i) => {
            const Icon = icons[i] ?? Sparkles;
            return (
              <FadeInUp key={`${feature.label}-${i}`} delay={i * 0.05}>
                <div className="flex h-full flex-col items-center gap-4 rounded-2xl border border-border-gray bg-surface-white p-6 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-corporate-blue/10 text-corporate-blue">
                    <Icon size={22} strokeWidth={1.5} />
                  </div>
                  <p className="text-sm font-semibold text-slate-gray-dark">
                    {feature.label}
                  </p>
                </div>
              </FadeInUp>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
