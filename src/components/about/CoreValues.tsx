import { Lightbulb, ShieldCheck, Heart, Lock, Award } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeInUp from "@/components/motion/FadeInUp";

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Constantly improving how organizations communicate and operate.",
  },
  {
    icon: ShieldCheck,
    title: "Reliability",
    description: "Platforms and services businesses can depend on, every time.",
  },
  {
    icon: Heart,
    title: "Customer-Centricity",
    description: "Every decision starts with what serves our customers best.",
  },
  {
    icon: Lock,
    title: "Security",
    description: "Protecting data and communications with rigorous standards.",
  },
  {
    icon: Award,
    title: "Quality Delivery",
    description: "Consistent excellence across every message sent and item printed.",
  },
];

export default function CoreValues() {
  return (
    <section className="bg-cloud-gray py-24">
      <Container>
        <SectionHeading title="Our Core Values" />
        <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {values.map((value, i) => (
            <FadeInUp
              key={value.title}
              delay={i * 0.05}
              className={i === values.length - 1 ? "col-span-2 sm:col-span-1" : ""}
            >
              <div className="flex h-full flex-col items-center gap-4 rounded-2xl border border-border-gray bg-surface-white p-6 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-corporate-blue/10 text-corporate-blue">
                  <value.icon size={22} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-gray-dark">{value.title}</p>
                  <p className="mt-2 text-xs leading-relaxed text-slate-gray">
                    {value.description}
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
