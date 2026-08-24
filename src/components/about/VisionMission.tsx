import { Compass, Target } from "lucide-react";
import Container from "@/components/ui/Container";
import FadeInUp from "@/components/motion/FadeInUp";

export default function VisionMission() {
  return (
    <section className="py-24">
      <Container className="grid gap-8 lg:grid-cols-2">
        <FadeInUp>
          <div className="flex h-full flex-col gap-4 rounded-2xl border border-border-gray bg-surface-white p-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-corporate-blue/10 text-corporate-blue">
              <Compass size={24} strokeWidth={1.5} />
            </div>
            <h2 className="font-display text-2xl font-bold text-slate-gray-dark">
              Our Vision
            </h2>
            <p className="leading-relaxed text-slate-gray">
              To be the leading digital ecosystem where businesses seamlessly access
              world-class SaaS solutions alongside top-tier physical documentation
              services, empowering them to scale without friction.
            </p>
          </div>
        </FadeInUp>

        <FadeInUp delay={0.1}>
          <div className="flex h-full flex-col gap-4 rounded-2xl border border-border-gray bg-surface-white p-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-tech-cyan/10 text-corporate-blue">
              <Target size={24} strokeWidth={1.5} />
            </div>
            <h2 className="font-display text-2xl font-bold text-slate-gray-dark">
              Our Mission
            </h2>
            <p className="leading-relaxed text-slate-gray">
              To deliver fast, secure, and highly reliable digital communication
              platforms and office supply services under one unified,
              customer-centric hub.
            </p>
          </div>
        </FadeInUp>
      </Container>
    </section>
  );
}
