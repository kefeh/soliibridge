import { ArrowRight, MessageSquareText, Printer } from "lucide-react";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import FadeInUp from "@/components/motion/FadeInUp";

export default function Services() {
  return (
    <section className="bg-cloud-gray py-24">
      <Container>
        <FadeInUp className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-slate-gray-dark sm:text-4xl">
            Two Platforms, One Ecosystem
          </h2>
          <p className="mt-4 text-lg text-slate-gray">
            Tailored solutions for your digital communication and physical
            operations needs.
          </p>
        </FadeInUp>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <FadeInUp delay={0.1}>
            <Card className="group h-full">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-arclocal-green-light text-arclocal-green">
                <MessageSquareText size={24} strokeWidth={1.5} />
              </div>
              <h3 className="mt-6 font-display text-2xl font-bold text-slate-gray-dark">
                ArcLocal
              </h3>
              <p className="mt-3 leading-relaxed text-slate-gray">
                Cloud-based bulk SMS platform for marketing, alerts, OTPs,
                appointments &amp; notifications.
              </p>
              <div className="mt-8 flex items-center justify-between">
                <Button href="/arclocal" variant="primary" tone="green">
                  Launch Platform
                </Button>
                <ArrowRight
                  size={20}
                  className="text-arclocal-green opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100"
                />
              </div>
            </Card>
          </FadeInUp>

          <FadeInUp delay={0.2}>
            <Card className="group h-full">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-officetrail-orange-light text-officetrail-orange">
                <Printer size={24} strokeWidth={1.5} />
              </div>
              <h3 className="mt-6 font-display text-2xl font-bold text-slate-gray-dark">
                OfficeTrail HUB
              </h3>
              <p className="mt-3 leading-relaxed text-slate-gray">
                Professional documentation services, business branding,
                printing, office stationery, and digital design.
              </p>
              <div className="mt-8 flex items-center justify-between">
                <Button href="/officetrail" variant="primary" tone="orange">
                  Explore Services
                </Button>
                <ArrowRight
                  size={20}
                  className="text-officetrail-orange opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100"
                />
              </div>
            </Card>
          </FadeInUp>
        </div>
      </Container>
    </section>
  );
}
